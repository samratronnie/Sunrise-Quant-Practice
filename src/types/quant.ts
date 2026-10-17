export type TargetExam = 
  | 'ALL_EXAMS'
  | 'SSC_CGL'
  | 'RAILWAY_NTPC'
  | 'LIC_AAO'
  | 'FCI'
  | 'WBPSC';

export type SolverMode = 'TO_EXAM_TOPPER' | 'CONVENTIONAL' | 'DUAL_METHOD' | 'CONCEPT_BUILDER';

export interface QuantTopic {
  id: string;
  name: string;
  category: 'Arithmetic' | 'Advanced Math' | 'Data Interpretation';
  examWeightage: {
    ssc: string;
    railway: string;
    lic: string;
    wbpsc: string;
    fci: string;
  };
  overview: string;
  keyFormulas: Array<{
    title: string;
    formula: string;
    latex: string;
    note: string;
  }>;
  shortcutsAndTricks: string[];
  sampleQuestions: SampleQuestion[];
}

export interface SampleQuestion {
  id: string;
  topicId: string;
  exam: string;
  year?: string;
  question: string;
  options?: string[];
  correctOption?: string;
  answer: string;
  examShortcut: string;
  conventionalMethod: string;
  formulaUsed: string;
  trapWarning: string;
}

export interface SolverResult {
  problemAnalysis: string;
  topicDetected: string;
  targetExamFit: string;
  formulaUsed: string;
  latexFormulas?: string[];
  examShortcut: {
    methodName: string;
    speedEstimate: string;
    stepByStep: string[];
    topperTip: string;
  };
  conventionalMethod: {
    stepByStep: string[];
    explanation: string;
  };
  finalAnswer: string;
  correctOptionLetter?: string;
  examTips: string[];
  similarQuestions: Array<{
    question: string;
    hint: string;
    answer: string;
  }>;
}

export interface MockQuestion {
  id: number;
  topic: string;
  exam: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: {
    shortcut: string;
    detail: string;
  };
}

export interface MockExamTest {
  id: string;
  title: string;
  exam: TargetExam;
  totalQuestions: number;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarking: number;
  questions: MockQuestion[];
}
