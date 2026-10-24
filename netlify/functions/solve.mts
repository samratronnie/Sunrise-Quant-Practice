import { GoogleGenAI, Type } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are India's top Quantitative Aptitude master, AIR-1 mentor, and senior faculty specializing in competitive exams: SSC CGL, Railway (RRB NTPC, Group D, ALP), LIC AAO, FCI, and WBPSC.

For ANY question submitted:
1. Identify the exact syllabus topic and exam pattern.
2. Provide METHOD 1: The EXAM TOPPER SPEED SHORTCUT / TRICK (Vedic trick, ratio method, digital root, unit digit, alligation cross, 30-second option elimination).
3. Provide METHOD 2: The CONVENTIONAL STEP-BY-STEP METHOD.
4. State the core formula in clean LaTeX notation.
5. Provide the FINAL ANSWER clearly, with correct option letter if options are present.
6. List EXAM TRAPS & SILLY MISTAKES.
7. Provide 2 SIMILAR PRACTICE QUESTIONS with hints and answers.
`;

const SOLVE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    problemAnalysis: { type: Type.STRING },
    topicDetected: { type: Type.STRING },
    targetExamFit: { type: Type.STRING },
    formulaUsed: { type: Type.STRING },
    examShortcut: {
      type: Type.OBJECT,
      properties: {
        methodName: { type: Type.STRING },
        speedEstimate: { type: Type.STRING },
        stepByStep: { type: Type.ARRAY, items: { type: Type.STRING } },
        topperTip: { type: Type.STRING },
      },
      required: ['methodName', 'speedEstimate', 'stepByStep', 'topperTip'],
    },
    conventionalMethod: {
      type: Type.OBJECT,
      properties: {
        stepByStep: { type: Type.ARRAY, items: { type: Type.STRING } },
        explanation: { type: Type.STRING },
      },
      required: ['stepByStep', 'explanation'],
    },
    finalAnswer: { type: Type.STRING },
    correctOptionLetter: { type: Type.STRING },
    examTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    similarQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          hint: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ['question', 'hint', 'answer'],
      },
    },
  },
  required: [
    'problemAnalysis',
    'topicDetected',
    'targetExamFit',
    'formulaUsed',
    'examShortcut',
    'conventionalMethod',
    'finalAnswer',
    'examTips',
    'similarQuestions',
  ],
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-gemini-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  try {
    const key =
      req.headers.get('x-gemini-key') ||
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY;

    if (!key) {
      return new Response(
        JSON.stringify({
          error:
            'GEMINI_API_KEY is not configured in Netlify environment variables or request headers. Please add GEMINI_API_KEY in Netlify Site Configuration > Environment Variables.',
          code: 'MISSING_API_KEY',
        }),
        {
          status: 503,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const body = await req.json();
    const { question, exam = 'ALL_EXAMS', mode = 'DUAL_METHOD', imageBase64, mimeType = 'image/png' } = body;

    if (!question && !imageBase64) {
      return new Response(JSON.stringify({ error: 'Please provide a question' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const parts: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/png',
          data: cleanBase64,
        },
      });
    }

    const promptText = `
Solve the following Quant question for exam: ${exam}.
Solving Mode: ${mode}.
${question ? `Question:\n${question}` : 'Please read the mathematical question from the attached image, transcribe it accurately, and solve it.'}
`;
    parts.push({ text: promptText });

    // Try primary recommended model first, then fallback
    let responseText = '';
    const modelsToTry = ['gemini-2.5-flash', 'gemini-3.8-flash'];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts },
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: SOLVE_RESPONSE_SCHEMA,
          },
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} attempt failed in Netlify function:`, err.message);
      }
    }

    if (!responseText) {
      throw lastError || new Error('No response generated by model');
    }

    return new Response(responseText, {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Netlify solve function error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
        code: error.status === 403 || error.message?.includes('API key') ? 'INVALID_API_KEY' : 'SERVER_ERROR',
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  }
};
