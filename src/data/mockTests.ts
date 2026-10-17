import { MockExamTest } from '../types/quant';

export const MOCK_EXAMS: MockExamTest[] = [
  {
    id: 'ssc-cgl-sprint-1',
    title: 'SSC CGL Tier 1: Quant Sprint Mock Test',
    exam: 'SSC_CGL',
    totalQuestions: 10,
    durationMinutes: 12,
    marksPerQuestion: 2,
    negativeMarking: 0.5,
    questions: [
      {
        id: 1,
        topic: 'Whole Number, Decimal and Fractions',
        exam: 'SSC CGL',
        question: 'Find the remainder when (7^84) is divided by 342.',
        options: ['1', '49', '341', '7'],
        correctIndex: 0,
        explanation: {
          shortcut: '342 is close to 7³ = 343. Write 7^84 = (7³)^28 = (343)^28. When 343 is divided by 342, remainder is +1. (1)^28 = 1. Wait, let us check 7^84: (7³)^28 = 343^28 = (342 + 1)^28 ≡ 1 mod 342. If options have 1, correct answer is 1.',
          detail: 'By Binomial expansion, (342 + 1)^28 = 342·k + 1^28 = 342k + 1. Remainder is 1.'
        }
      },
      {
        id: 2,
        topic: 'Percentage',
        exam: 'SSC CGL',
        question: 'A number is first increased by 20% and then decreased by 20%. What is the net percentage change in the number?',
        options: ['No change', '4% increase', '4% decrease', '2% decrease'],
        correctIndex: 2,
        explanation: {
          shortcut: 'Successive % rule: a + b + ab/100 = 20 - 20 - (20×20)/100 = -4% (4% decrease). Formula: x²/100% loss.',
          detail: 'Let number be 100. After +20% it becomes 120. Decreasing 120 by 20% (120 × 0.2 = 24) gives 120 - 24 = 96. Net change = 96 - 100 = -4%.'
        }
      },
      {
        id: 3,
        topic: 'Profits and Loss',
        exam: 'SSC CGL',
        question: 'By selling an article for Rs.960, a man incurs a loss of 20%. At what price should he sell it to gain 20%?',
        options: ['Rs.1200', 'Rs.1440', 'Rs.1350', 'Rs.1500'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Direct ratio: 80% represents Rs.960 (960 / 80 = Rs.12 per %). To gain 20%, target is 120%. 120 × 12 = Rs.1440. Solved in 5 seconds!',
          detail: 'CP = SP / (1 - 0.20) = 960 / 0.8 = Rs.1200. Desired SP = 1200 × 1.20 = Rs.1440.'
        }
      },
      {
        id: 4,
        topic: 'Mixture and Alligations',
        exam: 'SSC CGL',
        question: 'A vessel contains 60 litres of pure milk. 12 litres of milk is taken out and replaced with water. This process is repeated once more. How much milk is left in the vessel?',
        options: ['38.4 litres', '36.8 litres', '40.2 litres', '34.5 litres'],
        correctIndex: 0,
        explanation: {
          shortcut: 'Remaining milk = Initial × (1 - 12/60)² = 60 × (1 - 1/5)² = 60 × (4/5)² = 60 × (16/25) = 2.4 × 16 = 38.4 litres.',
          detail: 'After 1st operation: Milk = 48 L, Water = 12 L. 2nd operation takes 12 L of mixture containing (48/60)×12 = 9.6 L milk. Milk remaining = 48 - 9.6 = 38.4 litres.'
        }
      },
      {
        id: 5,
        topic: 'Time & Distance',
        exam: 'SSC CGL',
        question: 'Walking at 3/4 of his usual speed, a man reaches his office 20 minutes late. Find his usual time to cover the distance.',
        options: ['45 minutes', '60 minutes', '50 minutes', '80 minutes'],
        correctIndex: 1,
        explanation: {
          shortcut: 'If speed is a/b of usual speed, new time is b/a of usual time. Time increases by (b/a - 1) = (4/3 - 1) = 1/3 of usual time. 1/3 of Usual Time = 20 min => Usual Time = 60 minutes.',
          detail: 'Let usual speed = S, usual time = T. Distance = S·T. New speed = (3/4)S, so new time = D / [(3/4)S] = (4/3)T. Delay = (4/3)T - T = T/3 = 20 min => T = 60 min.'
        }
      },
      {
        id: 6,
        topic: 'Square/Cube',
        exam: 'SSC CGL',
        question: 'If x + 1/x = 3, what is the value of x² + 1/x² and x³ + 1/x³ respectively?',
        options: ['7 and 18', '9 and 27', '7 and 24', '11 and 18'],
        correctIndex: 0,
        explanation: {
          shortcut: 'x² + 1/x² = k² - 2 = 3² - 2 = 7. x³ + 1/x³ = k³ - 3k = 3³ - 3(3) = 27 - 9 = 18. Instant 2-second answer: 7 and 18.',
          detail: 'Squaring (x + 1/x): x² + 1/x² + 2 = 9 => x² + 1/x² = 7. Cubing (x + 1/x): x³ + 1/x³ + 3(x + 1/x) = 27 => x³ + 1/x³ + 3(3) = 27 => 18.'
        }
      },
      {
        id: 7,
        topic: 'Triangle and its centers',
        exam: 'SSC CGL',
        question: 'In ΔABC, O is the circumcenter. If ∠BOC = 130°, then find ∠BAC.',
        options: ['50°', '65°', '75°', '85°'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Circumcenter angle at center is twice the angle at vertex: ∠BOC = 2 × ∠BAC. Therefore ∠BAC = 130° / 2 = 65°.',
          detail: 'By circle theorem, the angle subtended by an arc at the center (O) is double the angle subtended by the same arc at any point on the remaining circumference (A).'
        }
      },
      {
        id: 8,
        topic: 'Height and distance',
        exam: 'SSC CGL',
        question: 'A 15 m tall tree casts a shadow of 15√3 m on the ground. What is the angle of elevation of the sun?',
        options: ['30°', '45°', '60°', '90°'],
        correctIndex: 0,
        explanation: {
          shortcut: 'tan θ = Height / Base = 15 / (15√3) = 1 / √3. Since tan 30° = 1/√3, θ = 30°.',
          detail: 'In the right triangle formed by the tree, ground shadow, and sun rays: tan(angle) = Perpendicular / Base = 15 / (15√3) = 1/√3 => θ = 30°.'
        }
      },
      {
        id: 9,
        topic: 'Trigonometric Ratios',
        exam: 'SSC CGL',
        question: 'Evaluate: tan 10° · tan 25° · tan 45° · tan 65° · tan 80°.',
        options: ['0', '1', '√3', '1/√3'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Pair complementary angles: tan 10° · tan 80° = 1; tan 25° · tan 65° = 1. And tan 45° = 1. Product = 1 × 1 × 1 = 1.',
          detail: 'Since tan(90° - θ) = cot θ, tan 80° = cot 10°. Thus tan 10° · cot 10° = 1. Similarly for 25° and 65°.'
        }
      },
      {
        id: 10,
        topic: 'Data Interpretation',
        exam: 'SSC CGL',
        question: 'A company spends 25% on Raw Material, 20% on Labour, 15% on Rent, and the remaining Rs.8,00,000 on Miscellaneous. What is the total expenditure of the company?',
        options: ['Rs.18,00,000', 'Rs.20,00,000', 'Rs.24,00,000', 'Rs.16,00,000'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Spent = 25% + 20% + 15% = 60%. Remaining = 40%. 40% = Rs.8,00,000 => 10% = Rs.2,00,000 => 100% = Rs.20,00,000.',
          detail: 'Total % = 100%. Remaining % = 100 - (25 + 20 + 15) = 40%. Total = 8,00,000 / 0.40 = Rs.20,00,000.'
        }
      }
    ]
  },
  {
    id: 'railway-ntpc-sprint-1',
    title: 'Railway NTPC & Group D: 10-Min Speed Drill',
    exam: 'RAILWAY_NTPC',
    totalQuestions: 10,
    durationMinutes: 10,
    marksPerQuestion: 1,
    negativeMarking: 0.33,
    questions: [
      {
        id: 1,
        topic: 'Whole Number, Decimal and Fractions',
        exam: 'Railway NTPC',
        question: 'Find the greatest fraction among: 2/3, 3/5, 7/9, 5/8.',
        options: ['2/3', '3/5', '7/9', '5/8'],
        correctIndex: 2,
        explanation: {
          shortcut: 'Convert to decimals or cross-multiply: 2/3 ≈ 0.67, 3/5 = 0.60, 7/9 ≈ 0.77, 5/8 = 0.625. Largest is 7/9.',
          detail: 'Difference method: in 2/3 (diff 1), 7/9 (diff 2). Cross compare 2/3 with 7/9: 2×9=18 vs 3×7=21. Since 21 > 18, 7/9 is larger.'
        }
      },
      {
        id: 2,
        topic: 'Average',
        exam: 'Railway NTPC',
        question: 'The average of 5 consecutive odd numbers is 61. What is the difference between the highest and lowest numbers?',
        options: ['4', '6', '8', '10'],
        correctIndex: 2,
        explanation: {
          shortcut: 'For any n consecutive odd (or even) numbers, the difference between highest and lowest is always 2 × (n - 1). Here n = 5 => 2 × (5 - 1) = 8. Solved without writing down the numbers!',
          detail: 'Numbers are 57, 59, 61, 63, 65. Difference = 65 - 57 = 8.'
        }
      },
      {
        id: 3,
        topic: 'Partnership',
        exam: 'Railway NTPC',
        question: 'A, B and C start a business with investments in ratio 2 : 3 : 5. If total annual profit is Rs.45,000, find B’s share.',
        options: ['Rs.9,000', 'Rs.13,500', 'Rs.22,500', 'Rs.15,000'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Total parts = 2 + 3 + 5 = 10 parts. 1 part = 45000 / 10 = Rs.4500. B has 3 parts = 3 × 4500 = Rs.13,500.',
          detail: 'B’s share = (3/10) × 45,000 = Rs.13,500.'
        }
      },
      {
        id: 4,
        topic: 'Time & Distance',
        exam: 'Railway NTPC',
        question: 'A train 240 m long crosses a platform of length 360 m in 30 seconds. Find the speed of the train in km/h.',
        options: ['72 km/h', '60 km/h', '54 km/h', '90 km/h'],
        correctIndex: 0,
        explanation: {
          shortcut: 'Total distance = 240 + 360 = 600 m. Speed in m/s = 600 / 30 = 20 m/s. Convert to km/h: 20 × (18/5) = 72 km/h.',
          detail: 'Train must cover its own length plus platform length. Speed = (240 + 360)/30 = 20 m/s. 20 × 18/5 = 72 km/h.'
        }
      },
      {
        id: 5,
        topic: 'Elementary Surds',
        exam: 'Railway NTPC',
        question: 'Simplify: √(12 + √(12 + √(12 + ... ∞)))',
        options: ['3', '4', '6', '12'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Direct Topper Trick: Factor 12 into consecutive integers n(n+1) => 12 = 3 × 4. Since the sign is +, the answer is the larger number: 4. (If sign was -, answer would be 3). 1-second answer!',
          detail: 'Let x = √(12 + x) => x² = 12 + x => x² - x - 12 = 0 => (x - 4)(x + 3) = 0 => x = 4 (positive root).'
        }
      },
      {
        id: 6,
        topic: 'Arithmetic number series',
        exam: 'Railway NTPC',
        question: 'What is the sum of the first 20 terms of the AP: 4, 9, 14, 19... ?',
        options: ['1030', '1050', '980', '1020'],
        correctIndex: 0,
        explanation: {
          shortcut: 'a = 4, d = 5, n = 20. S_20 = (20/2)[2(4) + (19)(5)] = 10[8 + 95] = 10 × 103 = 1030.',
          detail: 'Formula S_n = (n/2)[2a + (n-1)d]. Here 2a = 8, (n-1)d = 95. Sum = 10 × 103 = 1030.'
        }
      },
      {
        id: 7,
        topic: 'Triangle and its centers',
        exam: 'Railway NTPC',
        question: 'In an equilateral triangle with side 12 cm, what is the inradius?',
        options: ['2√3 cm', '4√3 cm', '3√3 cm', '6 cm'],
        correctIndex: 0,
        explanation: {
          shortcut: 'Inradius of equilateral triangle = side / (2√3) = 12 / (2√3) = 6 / √3 = 2√3 cm.',
          detail: 'Formula r = a / (2√3). 12 / (2√3) = 6/√3 = (6√3)/3 = 2√3 cm.'
        }
      },
      {
        id: 8,
        topic: 'Degree and Radian',
        exam: 'Railway NTPC',
        question: 'Convert 5π/6 radians into degrees.',
        options: ['120°', '150°', '135°', '160°'],
        correctIndex: 1,
        explanation: {
          shortcut: 'Replace π with 180°: 5 × (180° / 6) = 5 × 30° = 150°. 2 seconds!',
          detail: 'Degree = Radian × (180 / π) = (5π/6) × (180/π) = 5 × 30 = 150°.'
        }
      },
      {
        id: 9,
        topic: 'Trigonometric Ratios',
        exam: 'Railway NTPC',
        question: 'If sin θ = 3/5, what is the value of (tan θ + sec θ)?',
        options: ['2', '1/2', '4/3', '5/4'],
        correctIndex: 0,
        explanation: {
          shortcut: 'Pythagorean triplet 3 - 4 - 5. Perpendicular = 3, Base = 4, Hypotenuse = 5. tan θ = 3/4, sec θ = 5/4. Sum = 3/4 + 5/4 = 8/4 = 2.',
          detail: 'cos θ = √(1 - 9/25) = 4/5. tan θ = 3/4, sec θ = 5/4. 3/4 + 5/4 = 8/4 = 2.'
        }
      },
      {
        id: 10,
        topic: 'Data Interpretation',
        exam: 'Railway NTPC',
        question: 'In a bar graph showing sales over 5 years (20, 25, 30, 45, 60 in thousands), what is the percentage increase in sales from Year 1 to Year 5?',
        options: ['100%', '150%', '200%', '300%'],
        correctIndex: 2,
        explanation: {
          shortcut: 'Year 1 = 20, Year 5 = 60. Increase = 60 - 20 = 40. % Increase = (40 / 20) × 100% = 200%.',
          detail: 'Formula: [(Final - Initial) / Initial] × 100 = (60 - 20)/20 × 100 = 2 × 100 = 200%.'
        }
      }
    ]
  }
];
