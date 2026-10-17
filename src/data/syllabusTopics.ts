import { QuantTopic } from '../types/quant';

export const SYLLABUS_TOPICS: QuantTopic[] = [
  {
    id: 'numbers-fractions',
    name: 'Whole Number, Decimal and Fractions',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '2-4 Questions (Tier 1 & 2)',
      railway: '3-5 Questions (RRB NTPC / Group D)',
      lic: '2-3 Questions',
      wbpsc: '3-4 Questions',
      fci: '2-3 Questions'
    },
    overview: 'Foundation of Quant. Covers divisibility rules, unit digit cyclicity, remainder theorem (Euler / Fermat / Wilson), fractions comparison, recurring decimals to p/q form, BODMAS and simplification.',
    keyFormulas: [
      {
        title: 'Divisor Division Identity',
        formula: 'Dividend = (Divisor × Quotient) + Remainder',
        latex: 'D = d \\times Q + R \\quad (0 \\le R < d)',
        note: 'Crucial for questions where a number divided by d1 leaves r1, what remainder when divided by d2.'
      },
      {
        title: 'Cyclicity of Unit Digits',
        formula: 'Power mod 4 rule for digits 2, 3, 7, 8 (cyclicity 4); 4, 9 (cyclicity 2); 0, 1, 5, 6 (cyclicity 1)',
        latex: 'a^n \\equiv a^{n \\pmod 4} \\pmod{10} \\quad (\\text{if } n \\pmod 4 = 0, \\text{ use } 4)',
        note: 'Always take the last 2 digits of the exponent divided by 4.'
      },
      {
        title: 'Recurring Decimal to Fraction',
        formula: '0.a̅b̅ = ab / 99; 0.ab̅ = (ab - a) / 90',
        latex: '0.a\\overline{b} = \\frac{ab - a}{90}, \\quad 0.\\overline{ab} = \\frac{ab}{99}',
        note: 'Number of 9s = count of repeating digits; Number of 0s = count of non-repeating digits after decimal.'
      },
      {
        title: 'Sum of first n natural numbers and powers',
        formula: '∑n = n(n+1)/2, ∑n² = n(n+1)(2n+1)/6, ∑n³ = [n(n+1)/2]²',
        latex: '\\sum_{i=1}^n i = \\frac{n(n+1)}{2}, \\quad \\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}',
        note: 'Frequently asked directly in Railway & WBPSC.'
      }
    ],
    shortcutsAndTricks: [
      'Digital Root Method: Cast out 9s to verify arithmetic operations in 5 seconds without full calculation.',
      'Unit Digit Elimination: When option choices have different last digits, calculate only unit digit.',
      'Cross-Multiplication for Fractions: To compare a/b vs c/d, compare a×d with b×c. If ad > bc, then a/b > c/d.',
      'Remainder of (x - 1)^n / x: Remainder is (-1)^n. If n is odd, remainder is x - 1; if n is even, remainder is 1.'
    ],
    sampleQuestions: [
      {
        id: 'q-num-1',
        topicId: 'numbers-fractions',
        exam: 'SSC CGL',
        year: '2023',
        question: 'Find the unit digit in the expression: (2137)^753.',
        options: ['1', '3', '7', '9'],
        correctOption: 'C',
        answer: '7',
        examShortcut: 'Unit digit depends only on base unit digit (7). Take exponent 753. Last 2 digits 53 divided by 4 gives remainder 1 (53 = 13 × 4 + 1). Therefore, unit digit = 7^1 = 7. Solved in 5 seconds!',
        conventionalMethod: 'Cyclicity of 7 is 4: 7^1=7, 7^2=49 (9), 7^3=343 (3), 7^4=2401 (1). 753 = 4 × 188 + 1. Thus 7^753 = (7^4)^188 × 7^1 = 1^188 × 7 = 7.',
        formulaUsed: 'a^n mod 10 with cyclicity of 4',
        trapWarning: 'Do not divide the entire base 2137. Only consider unit digit 7 and last two digits of exponent.'
      },
      {
        id: 'q-num-2',
        topicId: 'numbers-fractions',
        exam: 'Railway NTPC',
        year: '2022',
        question: 'Convert 0.4777... (0.47̅) into a simple fraction in lowest terms.',
        options: ['47/100', '43/90', '47/90', '43/99'],
        correctOption: 'B',
        answer: '43/90',
        examShortcut: 'Formula: (Full number - non repeating part) / 9 followed by zeros. Here: (47 - 4) / 90 = 43/90. Done in 3 seconds!',
        conventionalMethod: 'Let x = 0.4777... Multiply by 10: 10x = 4.777... Multiply by 100: 100x = 47.777... Subtracting gives: 90x = 43 => x = 43/90.',
        formulaUsed: '0.a(b̅) = (ab - a) / 90',
        trapWarning: 'Do not write 47/99, as only 7 is repeating, 4 is not repeating.'
      }
    ]
  },
  {
    id: 'percentage',
    name: 'Percentage',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '2-3 Questions',
      railway: '3-4 Questions',
      lic: '3-4 Questions',
      wbpsc: '2-3 Questions',
      fci: '2-3 Questions'
    },
    overview: 'The backbone of commercial arithmetic. Master fraction-to-percentage tables, successive percentage change, price-consumption-expenditure relations, population growth, and election/voting math.',
    keyFormulas: [
      {
        title: 'Successive Percentage Change',
        formula: 'Net % change = a + b + (ab / 100)%',
        latex: '\\text{Net Change} = \\left( a + b + \\frac{ab}{100} \\right)\\%',
        note: 'Use negative signs for decrease / discount / depreciation.'
      },
      {
        title: 'Price, Consumption and Expenditure',
        formula: 'If price increases by r%, consumption must decrease by [r / (100 + r)] × 100% to keep expenditure constant.',
        latex: '\\Delta C = -\\frac{r}{100 + r} \\times 100\\%',
        note: 'If price decreases by r%, consumption increases by [r / (100 - r)] × 100%.'
      },
      {
        title: 'Fraction to Percentage Table',
        formula: '1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%, 1/12=8.33%',
        latex: '\\frac{1}{6} = 16.67\\%, \\quad \\frac{1}{7} = 14.28\\%, \\quad \\frac{1}{8} = 12.5\\%',
        note: 'Memorize up to 1/20 for lightning fast speed without decimal division.'
      }
    ],
    shortcutsAndTricks: [
      'Ratio Multiplier: An increase of 20% means multiplying by 6/5; a decrease of 12.5% means multiplying by 7/8.',
      'AB Rule: If A is r% more than B, B is [r / (100+r)]% less than A.',
      'Splitting method for quick calculation: 36% of 450 = 45% of 360 = 50% of 360 - 5% of 360 = 180 - 18 = 162.'
    ],
    sampleQuestions: [
      {
        id: 'q-pct-1',
        topicId: 'percentage',
        exam: 'SSC CGL',
        year: '2023',
        question: 'If the price of sugar increases by 25%, by what percent must a housewife decrease her consumption so that expenditure remains unchanged?',
        options: ['20%', '25%', '16.67%', '15%'],
        correctOption: 'A',
        answer: '20%',
        examShortcut: 'Fraction Method: +25% = +1/4. When Price increases by +a/b (+1/4), Consumption must decrease by -a/(a+b) = -1/(1+4) = -1/5 = 20%. 2-second answer!',
        conventionalMethod: 'Let initial Price = 100, Consumption = 100, Expenditure = 10000. New Price = 125. New Consumption = 10000 / 125 = 80. Reduction = 100 - 80 = 20%.',
        formulaUsed: '[r / (100 + r)] × 100%',
        trapWarning: 'Do not simply say 25% decrease. Expenditure balance requires harmonic adjustment.'
      }
    ]
  },
  {
    id: 'average',
    name: 'Average',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '1-3 Questions',
      railway: '2-3 Questions',
      lic: '2 Questions',
      wbpsc: '2 Questions',
      fci: '1-2 Questions'
    },
    overview: 'Covers arithmetic mean, weighted average, deviation method, replacement of members, age based averages, batting & bowling averages in cricket.',
    keyFormulas: [
      {
        title: 'Deviation / Shift Method',
        formula: 'New Member Value = Old Average + (Total Members × Change in Average)',
        latex: '\\text{New Value} = A_{\\text{old}} + n \\times \\Delta A',
        note: 'Works whether an element joins, leaves, or replaces.'
      },
      {
        title: 'Weighted Average',
        formula: 'A_w = (n1·A1 + n2·A2) / (n1 + n2)',
        latex: 'A_w = \\frac{n_1 A_1 + n_2 A_2}{n_1 + n_2}',
        note: 'Can also be solved in seconds using Alligation!'
      },
      {
        title: 'Batting vs Bowling Average in Cricket',
        formula: 'Batting Avg = Total Runs / Innings Out; Bowling Avg = Total Runs Conceded / Total Wickets Taken',
        latex: '\\text{Bowling Avg} = \\frac{\\text{Runs Given}}{\\text{Wickets}}',
        note: 'In bowling, a decrease in average means improvement!'
      }
    ],
    shortcutsAndTricks: [
      'Net Deviation must equal Zero: If some numbers are above the assumed mean, the rest must compensate with equal negative deviation.',
      'Consecutive AP Average: The average of an AP is always the median: (First Term + Last Term) / 2.',
      'Replacement Shortcut: Replaced Weight = Removed Weight ± (Total Members × Shift in Avg).'
    ],
    sampleQuestions: [
      {
        id: 'q-avg-1',
        topicId: 'average',
        exam: 'WBPSC',
        year: '2022',
        question: 'The average age of 24 students and the teacher is 15 years. If the teacher’s age is excluded, the average decreases by 1 year. What is the teacher’s age?',
        options: ['38 years', '39 years', '40 years', '35 years'],
        correctOption: 'B',
        answer: '39 years',
        examShortcut: 'Teacher’s age = Base average (15) + Contribution to 24 students (24 × 1) = 15 + 24 = 39 years. Instant mental math!',
        conventionalMethod: 'Total initial members = 25. Total age = 25 × 15 = 375. After teacher leaves, remaining 24 students have avg 14. Total age = 24 × 14 = 336. Teacher’s age = 375 - 336 = 39 years.',
        formulaUsed: 'Teacher Age = Old Avg + n × Drop',
        trapWarning: 'Remember initial count is 24 + 1 = 25, not 24.'
      }
    ]
  },
  {
    id: 'profit-loss',
    name: 'Profits and Loss',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '3-4 Questions',
      railway: '3-4 Questions',
      lic: '3-4 Questions',
      wbpsc: '2-3 Questions',
      fci: '2-3 Questions'
    },
    overview: 'Includes Cost Price (CP), Selling Price (SP), Marked Price (MP), Successive Discounts, Dishonest Shopkeeper tricks (false weights), and equal SP with profit/loss.',
    keyFormulas: [
      {
        title: 'Profit & Loss Percent',
        formula: 'Profit% = (Profit / CP) × 100, Loss% = (Loss / CP) × 100',
        latex: 'P\\% = \\frac{SP - CP}{CP} \\times 100\\%',
        note: 'Profit/Loss is always calculated on CP unless explicitly stated on SP.'
      },
      {
        title: 'Relationship Between CP and MP',
        formula: 'CP / MP = (100 - Discount%) / (100 + Profit%)',
        latex: '\\frac{CP}{MP} = \\frac{100 - D\\%}{100 + P\\%}',
        note: 'The most powerful formula for SSC CGL Tier 1 & Tier 2.'
      },
      {
        title: 'Dishonest Shopkeeper False Weight Formula',
        formula: 'Gain% = [Error / (True Value - Error)] × 100%',
        latex: '\\text{Gain}\\% = \\frac{\\text{Claimed} - \\text{Actual}}{\\text{Actual}} \\times 100\\%',
        note: 'Example: Giving 900g instead of 1000g => (100 / 900) × 100 = 11.11% gain.'
      },
      {
        title: 'Two Articles Sold at Same SP, one at x% gain, other at x% loss',
        formula: 'Always an overall loss of (x / 10)² %',
        latex: '\\text{Overall Loss}\\% = \\left( \\frac{x}{10} \\right)^2\\%',
        note: 'Never 0% profit/loss! It is always a net loss.'
      }
    ],
    shortcutsAndTricks: [
      'Ratio method (CP : SP : MP): Convert percentages to fractions, equate common terms across ratios.',
      'Dishonest Dealer Multiplier: Gain factor = (Claimed Weight / Real Weight) × (SP factor / CP factor).',
      'Free Item Discount: "Buy 3 Get 2 Free" => Discount% = [Free items / Total items given] × 100 = (2 / 5) × 100 = 40%.'
    ],
    sampleQuestions: [
      {
        id: 'q-pl-1',
        topicId: 'profit-loss',
        exam: 'SSC CGL',
        year: '2023',
        question: 'A shopkeeper marks his goods 40% above the cost price and allows a discount of 25% on the marked price. What is his profit or loss percentage?',
        options: ['5% Profit', '10% Profit', '5% Loss', '12% Profit'],
        correctOption: 'A',
        answer: '5% Profit',
        examShortcut: 'Net change formula: a = +40, b = -25. Net% = 40 - 25 - (40 × 25)/100 = 15 - 10 = +5% (Profit). 4 seconds!',
        conventionalMethod: 'Let CP = 100. MP = 140. Discount = 25% of 140 = 35. SP = 140 - 35 = 105. Profit = SP - CP = 105 - 100 = 5%.',
        formulaUsed: 'Net % = a + b + ab/100',
        trapWarning: 'Discount is applied on Marked Price (140), not Cost Price (100).'
      }
    ]
  },
  {
    id: 'partnership',
    name: 'Partnership',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '1-2 Questions',
      railway: '1-2 Questions',
      lic: '1-2 Questions',
      wbpsc: '1 Question',
      fci: '1-2 Questions'
    },
    overview: 'Ratio of profit distribution among partners. Simple vs compound partnership, sleeping vs working partners with management salary deductions.',
    keyFormulas: [
      {
        title: 'Profit Sharing Ratio',
        formula: 'Profit Ratio = (Investment_1 × Time_1) : (Investment_2 × Time_2) : (Investment_3 × Time_3)',
        latex: 'P_1 : P_2 = (I_1 \\times T_1) : (I_2 \\times T_2)',
        note: 'Time must be in the same units (e.g. all in months).'
      },
      {
        title: 'Working Partner Salary Rule',
        formula: 'Distributable Profit = Total Profit - Working Partner Salary / Allowance',
        latex: 'P_{\\text{distributable}} = P_{\\text{total}} - \\text{Salary}',
        note: 'Working partner gets both salary + their share from the remaining profit.'
      }
    ],
    shortcutsAndTricks: [
      'Month-Investment Product: Always convert investments to simplest ratio first, then multiply by months active.',
      'Finding Ratio of Time: T1 : T2 = (P1 / I1) : (P2 / I2).'
    ],
    sampleQuestions: [
      {
        id: 'q-part-1',
        topicId: 'partnership',
        exam: 'LIC AAO',
        year: '2021',
        question: 'A and B invest in a business in the ratio 3 : 5. After 6 months, C joins with an amount equal to that of B. At the end of the year, what is the ratio of their profits?',
        options: ['6 : 10 : 5', '3 : 5 : 5', '6 : 5 : 10', '3 : 5 : 2.5'],
        correctOption: 'A',
        answer: '6 : 10 : 5',
        examShortcut: 'Let investments be A=3, B=5, C=5. Times: A=12, B=12, C=6. Product = (3×12) : (5×12) : (5×6) = 36 : 60 : 30. Divide by 6 => 6 : 10 : 5. Done in 10 seconds!',
        conventionalMethod: 'Profit ∝ Investment × Time. A active 12 months = 3 × 12 = 36. B active 12 months = 5 × 12 = 60. C active 6 months = 5 × 6 = 30. Ratio = 36 : 60 : 30 = 6 : 10 : 5.',
        formulaUsed: 'P = I × T',
        trapWarning: 'C joined AFTER 6 months, so C is invested for only 12 - 6 = 6 months.'
      }
    ]
  },
  {
    id: 'mixture-alligations',
    name: 'Mixture and Alligations',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '1-3 Questions',
      railway: '2 Questions',
      lic: '2-3 Questions',
      wbpsc: '2 Questions',
      fci: '2 Questions'
    },
    overview: 'Universal problem-solving tool! Applies to mixtures, profit/loss, simple interest, speed, and averages. Also covers repeated replacement/dilution of liquids.',
    keyFormulas: [
      {
        title: 'Rule of Alligation Cross',
        formula: 'Ratio (Cheaper : Dearer) = (d - m) : (m - c)',
        latex: '\\frac{q_c}{q_d} = \\frac{d - m}{m - c}',
        note: 'c = cheaper price, d = dearer price, m = mean/mixture price (c < m < d).'
      },
      {
        title: 'Repeated Dilution / Replacement',
        formula: 'Final Pure Liquid = Initial Qty × (1 - x / C)^n',
        latex: 'Q_{\\text{final}} = Q_{\\text{initial}} \\left(1 - \\frac{x}{C}\\right)^n',
        note: 'x = quantity drawn out each time, C = total capacity, n = number of operations.'
      }
    ],
    shortcutsAndTricks: [
      'Alligation in Profit and Loss: Put % Profit on article 1 and article 2 on top, overall profit% in the center. The resulting ratio is the ratio of their Cost Prices!',
      'Alligation in Simple Interest: Put rate% 1 and rate% 2 on top, overall effective rate% in center. Result gives ratio of Principal invested!',
      'Alligation in Speed: Put Speed 1 and Speed 2 on top, Average Speed in center. Result gives ratio of Time taken!'
    ],
    sampleQuestions: [
      {
        id: 'q-mix-1',
        topicId: 'mixture-alligations',
        exam: 'FCI',
        year: '2021',
        question: 'In what ratio must rice at Rs.9.30 per kg be mixed with rice at Rs.10.80 per kg so that the mixture is worth Rs.10 per kg?',
        options: ['8 : 7', '7 : 8', '5 : 6', '6 : 5'],
        correctOption: 'A',
        answer: '8 : 7',
        examShortcut: 'Alligation Cross:\nDearer - Mean = 10.80 - 10.00 = 0.80\nMean - Cheaper = 10.00 - 9.30 = 0.70\nRatio = 0.80 : 0.70 = 8 : 7. Direct 5-second answer!',
        conventionalMethod: 'Let x kg of Rs.9.30 rice and y kg of Rs.10.80 rice be mixed. 9.30x + 10.80y = 10(x + y) => 9.30x + 10.80y = 10x + 10y => 0.80y = 0.70x => x/y = 0.80/0.70 = 8/7.',
        formulaUsed: '(d - m) / (m - c)',
        trapWarning: 'Ensure mean price is placed strictly between cheaper and dearer values.'
      }
    ]
  },
  {
    id: 'time-distance',
    name: 'Time & Distance',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '2-4 Questions',
      railway: '3-5 Questions',
      lic: '2-3 Questions',
      wbpsc: '2-3 Questions',
      fci: '2-3 Questions'
    },
    overview: 'High-weightage topic across all Indian exams. Speed-Time-Distance, km/h to m/s conversions, Trains crossing poles/platforms/trains, Relative Speed, Boats and Streams, Circular Tracks and Linear Races.',
    keyFormulas: [
      {
        title: 'Unit Conversion Factor',
        formula: '1 km/h = 5/18 m/s; 1 m/s = 18/5 km/h',
        latex: '1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s}',
        note: 'Multiply by 5/18 when going from large (km/h) to small (m/s).'
      },
      {
        title: 'Average Speed for Equal Distance',
        formula: 'Avg Speed = (2xy) / (x + y)',
        latex: 'v_{\\text{avg}} = \\frac{2xy}{x + y}',
        note: 'Harmonic mean. If 3 equal parts at speeds x, y, z: 3xyz / (xy + yz + zx).'
      },
      {
        title: 'Train Crossing Formula',
        formula: 'Time = (Length_train + Length_object) / Relative Speed',
        latex: 'T = \\frac{L_1 + L_2}{S_{\\text{rel}}}',
        note: 'Pole or standing man has length = 0.'
      },
      {
        title: 'Boats & Streams Relations',
        formula: 'Downstream = u + v, Upstream = u - v; Boat Speed u = (D + U)/2, Stream Speed v = (D - U)/2',
        latex: 'u = \\frac{D + U}{2}, \\quad v = \\frac{D - U}{2}',
        note: 'D = Downstream speed, U = Upstream speed.'
      },
      {
        title: 'Meeting Time After Starting Towards Each Other',
        formula: 'Ratio of speeds S1 / S2 = √(T2 / T1)',
        latex: '\\frac{S_1}{S_2} = \\sqrt{\\frac{T_2}{T_1}}',
        note: 'Where T1 and T2 are times taken to reach destination after crossing each other.'
      }
    ],
    shortcutsAndTricks: [
      'Inverse Ratio Rule: When distance is constant, Speed ratio is inversely proportional to Time ratio (S1 : S2 = T2 : T1).',
      'Early & Late Trick: Distance = [Product of speeds / Difference of speeds] × [Total difference in time].',
      'Circular Track Meeting: First meeting time at starting point = LCM of individual round times.'
    ],
    sampleQuestions: [
      {
        id: 'q-tsd-1',
        topicId: 'time-distance',
        exam: 'Railway NTPC',
        year: '2022',
        question: 'A train 150m long passes a pole in 15 seconds and another train of the same length travelling in opposite direction in 12 seconds. What is the speed of the second train?',
        options: ['45 km/h', '54 km/h', '60 km/h', '36 km/h'],
        correctOption: 'B',
        answer: '54 km/h',
        examShortcut: 'Speed of Train 1 = 150 / 15 = 10 m/s. Relative speed opposite direction = (150 + 150) / 12 = 300 / 12 = 25 m/s. Speed of Train 2 = 25 - 10 = 15 m/s. In km/h: 15 × (18/5) = 54 km/h. Clean 15 seconds!',
        conventionalMethod: 'Train 1 speed S1 = 150/15 = 10 m/s. In opposite direction, total distance = L1 + L2 = 150 + 150 = 300m. Relative speed = S1 + S2 = 300/12 = 25 m/s. S2 = 25 - 10 = 15 m/s = 15 × 18/5 = 54 km/h.',
        formulaUsed: 'S_rel = (L1 + L2) / T',
        trapWarning: 'Convert m/s to km/h by multiplying by 18/5, do not confuse with 5/18.'
      }
    ]
  },
  {
    id: 'square-cube',
    name: 'Square/Cube',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '1-2 Questions',
      railway: '2-3 Questions',
      lic: '1-2 Questions',
      wbpsc: '2 Questions',
      fci: '1-2 Questions'
    },
    overview: 'Fast evaluation of squares and cubes, square roots and cube roots via Vedic math methods, finding least number to multiply/divide/add/subtract to make a perfect square.',
    keyFormulas: [
      {
        title: 'Squaring Numbers Ending in 5',
        formula: '(a5)² = [a × (a + 1)] followed by 25',
        latex: '(10a + 5)^2 = a(a+1) \\times 100 + 25',
        note: 'Example: 65² = 6×7 | 25 = 4225.'
      },
      {
        title: 'Base 100 Squaring Trick',
        formula: '(100 ± x)² = (100 ± 2x) × 100 + x²',
        latex: '(100 + x)^2 = (100 + 2x) \\cdot 100 + x^2',
        note: 'Example: 106² = (106 + 6) | 6² = 11236. 96² = (96 - 4) | 4² = 9216.'
      },
      {
        title: 'Cube of (a + b) and (a - b)',
        formula: '(a + b)³ = a³ + b³ + 3ab(a + b); (a - b)³ = a³ - b³ - 3ab(a - b)',
        latex: '(a \\pm b)^3 = a^3 \\pm b^3 \\pm 3ab(a \\pm b)',
        note: 'If x + 1/x = k, then x³ + 1/x³ = k³ - 3k.'
      }
    ],
    shortcutsAndTricks: [
      'Vedic Cube Root in 2 seconds: Split number at 3 digits from right. Ending digit uniquely maps to cube root (1->1, 2->8, 3->7, 4->4, 5->5, 6->6, 7->3, 8->2, 9->9).',
      'Square Root Last Digit: Unit digit 1 -> 1 or 9; 4 -> 2 or 8; 5 -> 5; 6 -> 4 or 6; 9 -> 3 or 7; 0 -> 0. Perfect squares NEVER end in 2, 3, 7, or 8.',
      'Algebraic Shortcut: If x + 1/x = 3, then x² + 1/x² = 3² - 2 = 7, and x³ + 1/x³ = 3³ - 3(3) = 18.'
    ],
    sampleQuestions: [
      {
        id: 'q-sc-1',
        topicId: 'square-cube',
        exam: 'SSC CGL',
        year: '2023',
        question: 'If x + 1/x = 4, find the value of x³ + 1/x³.',
        options: ['52', '64', '76', '48'],
        correctOption: 'A',
        answer: '52',
        examShortcut: 'Formula: k³ - 3k. Here k = 4. 4³ - 3(4) = 64 - 12 = 52. Instant 3-second solve!',
        conventionalMethod: '(x + 1/x)³ = x³ + 1/x³ + 3·x·(1/x)·(x + 1/x) => 4³ = x³ + 1/x³ + 3(4) => 64 = x³ + 1/x³ + 12 => x³ + 1/x³ = 52.',
        formulaUsed: 'x³ + 1/x³ = k³ - 3k',
        trapWarning: 'Do not forget the -3k term! 4³ = 64 is the classic wrong trap option.'
      }
    ]
  },
  {
    id: 'elementary-surds',
    name: 'Elementary Surds',
    category: 'Advanced Math',
    examWeightage: {
      ssc: '2-3 Questions',
      railway: '1-2 Questions',
      lic: '1 Question',
      wbpsc: '1-2 Questions',
      fci: '1 Question'
    },
    overview: 'Surds and Indices, Rationalization of denominators, comparison of surds (e.g. ∛4 vs ⁴√6), conjugate surds, square root of a binomial surd √(a ± √b).',
    keyFormulas: [
      {
        title: 'Square root of Binomial Surd √(a ± 2√b)',
        formula: '√(a ± 2√b) = √x ± √y where x + y = a and x × y = b',
        latex: '\\sqrt{a \\pm 2\\sqrt{b}} = \\sqrt{x} \\pm \\sqrt{y} \\quad (x+y=a, xy=b)',
        note: 'Ensure coefficient of inside root is 2. Example: √(7 + 2√10) = √5 + √2.'
      },
      {
        title: 'Rationalizing Denominator',
        formula: '1 / (√a + √b) = (√a - √b) / (a - b)',
        latex: '\\frac{1}{\\sqrt{a} + \\sqrt{b}} = \\frac{\\sqrt{a} - \\sqrt{b}}{a - b}',
        note: 'When a - b = 1, reciprocal simply flips the sign!'
      },
      {
        title: 'Comparing Surds',
        formula: 'Equate the order of surds by taking LCM of indices',
        latex: '\\sqrt[n]{a} = \\sqrt[n \\cdot m]{a^m}',
        note: 'To compare ∛3 and ⁴√4, take LCM(3, 4) = 12 => ¹²√81 vs ¹²√64.'
      }
    ],
    shortcutsAndTricks: [
      'Infinite Nested Radical: √(a + √(a + √(a...))) = [√(4a + 1) + 1] / 2. If a = n(n+1), the answer is simply n+1!',
      'Negative Infinite Radical: √(a - √(a - √(a...))) = [√(4a + 1) - 1] / 2. If a = n(n+1), answer is n.',
      'Infinite Multiplication Radical: √(a × √(a × √(a...))) = a.'
    ],
    sampleQuestions: [
      {
        id: 'q-surd-1',
        topicId: 'elementary-surds',
        exam: 'SSC CGL',
        year: '2022',
        question: 'Find the square root of (8 + 2√15).',
        options: ['√5 + √3', '√6 + √2', '√5 - √3', '5 + √3'],
        correctOption: 'A',
        answer: '√5 + √3',
        examShortcut: 'Look for two numbers whose sum is 8 and product is 15. The numbers are 5 and 3 (5+3=8, 5×3=15). Therefore the square root is √5 + √3. Solved in 3 seconds!',
        conventionalMethod: '(√x + √y)² = x + y + 2√(xy). Equating with 8 + 2√15 gives x + y = 8 and xy = 15. (x - y)² = (x+y)² - 4xy = 64 - 60 = 4 => x - y = 2. Adding gives 2x = 10 => x = 5, y = 3. Root is √5 + √3.',
        formulaUsed: '√(a + 2√b) = √x + √y',
        trapWarning: 'Ensure the multiplier outside the inner square root is 2. If it is 4, push a factor of 2 inside the root.'
      }
    ]
  },
  {
    id: 'number-series',
    name: 'Arithmetic number series',
    category: 'Arithmetic',
    examWeightage: {
      ssc: '2-3 Questions (Reasoning & Quant)',
      railway: '3-4 Questions',
      lic: '4-5 Questions (Number Series Section)',
      wbpsc: '2-3 Questions',
      fci: '2-3 Questions'
    },
    overview: 'Arithmetic Progression (AP), Geometric Progression (GP), Missing Number Series, Wrong Number Series, Two-tier difference series, alternating series.',
    keyFormulas: [
      {
        title: 'nth term of an AP',
        formula: 'T_n = a + (n - 1)d',
        latex: 'T_n = a + (n - 1)d',
        note: 'a = first term, d = common difference, n = term position.'
      },
      {
        title: 'Sum of n terms of an AP',
        formula: 'S_n = (n / 2)[2a + (n - 1)d] = (n / 2)[First Term + Last Term]',
        latex: 'S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)',
        note: 'Average of AP = (a + l) / 2.'
      },
      {
        title: 'Sum of n terms of GP',
        formula: 'S_n = a(r^n - 1) / (r - 1) for r > 1',
        latex: 'S_n = \\frac{a(r^n - 1)}{r - 1}',
        note: 'Infinite GP sum S_∞ = a / (1 - r) for |r| < 1.'
      }
    ],
    shortcutsAndTricks: [
      'Two-Tier Difference: When numbers increase steadily without clear multiplication, write down the first differences. If not constant, write second differences (difference of difference).',
      'Cube/Square Offset Pattern: Look for n³ ± 1, n² ± n, or n³ - n (e.g., 0, 6, 24, 60, 120 are 1³-1, 2³-2, 3³-3, 4³-4, 5³-5).',
      'Decimal Multiplication Pattern in Banking/LIC: ×0.5 + 0.5, ×1 + 1, ×1.5 + 1.5, ×2 + 2.'
    ],
    sampleQuestions: [
      {
        id: 'q-series-1',
        topicId: 'number-series',
        exam: 'Railway NTPC',
        year: '2022',
        question: 'Find the missing number in the series: 6, 13, 28, 59, ?',
        options: ['118', '120', '122', '124'],
        correctOption: 'C',
        answer: '122',
        examShortcut: 'Pattern: ×2 + 1, ×2 + 2, ×2 + 3, ×2 + 4.\n6 × 2 + 1 = 13\n13 × 2 + 2 = 28\n28 × 2 + 3 = 59\n59 × 2 + 4 = 118 + 4 = 122. Direct mental calculation!',
        conventionalMethod: 'Differences: 13 - 6 = 7; 28 - 13 = 15; 59 - 28 = 31. Notice differences are 2^3 - 1, 2^4 - 1, 2^5 - 1... Next difference = 2^6 - 1 = 63. 59 + 63 = 122.',
        formulaUsed: 'T_n = 2 · T_{n-1} + (n-1)',
        trapWarning: 'Do not stop at doubling (59 × 2 = 118); the additive increment increases by 1 each step.'
      }
    ]
  },
  {
    id: 'triangle-centers',
    name: 'Triangle and its centers',
    category: 'Advanced Math',
    examWeightage: {
      ssc: '3-5 Questions (Tier 1 & Tier 2)',
      railway: '2-3 Questions',
      lic: '1 Question',
      wbpsc: '2-3 Questions',
      fci: '1-2 Questions'
    },
    overview: 'Core Advanced Geometry. Incenter (angle bisectors), Circumcenter (perpendicular bisectors), Centroid (medians), Orthocenter (altitudes). Angle relations, inradius/circumradius, Apollonius theorem, similarity and congruence.',
    keyFormulas: [
      {
        title: 'Incenter Angle Theorem',
        formula: '∠BOC = 90° + ∠A / 2 (where O is Incenter)',
        latex: '\\angle BOC = 90^\\circ + \\frac{\\angle A}{2}',
        note: 'Excenter angle: 90° - ∠A / 2.'
      },
      {
        title: 'Circumcenter & Orthocenter Angles',
        formula: 'Circumcenter: ∠BOC = 2∠A; Orthocenter: ∠BOC = 180° - ∠A',
        latex: '\\angle BOC_{\\text{circum}} = 2\\angle A, \\quad \\angle BOC_{\\text{ortho}} = 180^\\circ - \\angle A',
        note: 'Super high frequency in SSC CGL Tier 1 and 2.'
      },
      {
        title: 'Inradius and Circumradius Formulas',
        formula: 'Inradius r = Δ / s; Circumradius R = abc / (4Δ)',
        latex: 'r = \\frac{\\Delta}{s}, \\quad R = \\frac{abc}{4\\Delta}',
        note: 's = semi-perimeter (a+b+c)/2. Right triangle: r = (a + b - c) / 2, R = hypotenuse / 2.'
      },
      {
        title: 'Equilateral Triangle Geometry',
        formula: 'Inradius r = a / (2√3), Circumradius R = a / √3, Height h = (√3 / 2)a',
        latex: 'r = \\frac{a}{2\\sqrt{3}}, \\quad R = \\frac{a}{\\sqrt{3}}, \\quad R = 2r',
        note: 'Area ratio of circumcircle to incircle is always 4 : 1.'
      },
      {
        title: 'Centroid Median Division Ratio',
        formula: 'Centroid (G) divides each median in the ratio 2 : 1 from vertex to opposite side.',
        latex: 'AG : GD = 2 : 1',
        note: 'Centroid divides the triangle into 3 triangles of equal area.'
      }
    ],
    shortcutsAndTricks: [
      'Euler Line Relation: Orthocenter (H), Centroid (G), and Circumcenter (O) are collinear, with HG : GO = 2 : 1.',
      'Right Triangle Inradius: Simply add the two legs and subtract hypotenuse, then divide by 2: r = (P + B - H) / 2.',
      'Median Apollonius Theorem: AB² + AC² = 2(AD² + BD²).'
    ],
    sampleQuestions: [
      {
        id: 'q-tri-1',
        topicId: 'triangle-centers',
        exam: 'SSC CGL',
        year: '2023',
        question: 'In a triangle ABC, I is the incenter. If ∠BAC = 70°, find the measure of ∠BIC.',
        options: ['125°', '140°', '110°', '135°'],
        correctOption: 'A',
        answer: '125°',
        examShortcut: 'Incenter formula: ∠BIC = 90° + ∠A / 2 = 90° + 70° / 2 = 90° + 35° = 125°. 3-second instant answer!',
        conventionalMethod: 'I is the intersection of angle bisectors of B and C. In ΔABC, ∠B + ∠C = 180° - 70° = 110°. In ΔBIC, ∠IBC + ∠ICB = (∠B + ∠C)/2 = 110°/2 = 55°. Thus ∠BIC = 180° - 55° = 125°.',
        formulaUsed: '∠BIC = 90° + ∠A / 2',
        trapWarning: 'If O were the circumcenter, the answer would be 2 × 70° = 140°. Do not confuse Incenter with Circumcenter!'
      }
    ]
  },
  {
    id: 'height-distance',
    name: 'Height and distance',
    category: 'Advanced Math',
    examWeightage: {
      ssc: '1-3 Questions',
      railway: '2-3 Questions',
      lic: '1 Question',
      wbpsc: '1-2 Questions',
      fci: '1 Question'
    },
    overview: 'Angles of elevation and depression, multi-tower problems, shadow lengthening/shortening, standard ratio tricks (30°-60°-90° and 45°-45°-90°), complementary angles.',
    keyFormulas: [
      {
        title: '30°-60°-90° Special Right Triangle',
        formula: 'Opposite to 30° : Opposite to 60° : Hypotenuse = 1 : √3 : 2',
        latex: '1 : \\sqrt{3} : 2 \\quad (\\tan 30^\\circ = 1/\\sqrt{3}, \\tan 60^\\circ = \\sqrt{3})',
        note: 'Eliminates all trigonometry calculations in 90% of exam questions.'
      },
      {
        title: '45°-45°-90° Special Right Triangle',
        formula: 'Opposite to 45° : Opposite to 45° : Hypotenuse = 1 : 1 : √2',
        latex: '1 : 1 : \\sqrt{2}',
        note: 'Base equals Height when angle of elevation is 45°.'
      },
      {
        title: 'Complementary Angles Tower Formula',
        formula: 'Height of Tower h = √(a × b)',
        latex: 'h = \\sqrt{ab}',
        note: 'When angles of elevation from points at distances a and b are complementary (θ and 90°-θ).'
      },
      {
        title: 'Moving towards/away from tower (30° to 60°)',
        formula: 'Distance walked d = h(√3 - 1/√3) = (2h) / √3 => h = (d√3) / 2',
        latex: 'd = \\frac{2h}{\\sqrt{3}} \\implies h = \\frac{d\\sqrt{3}}{2}',
        note: 'Base at 60° is d/2.'
      }
    ],
    shortcutsAndTricks: [
      'Ratio Method: Never write sin, cos, or tan equations. Directly label sides with 1, √3, 2 or 1, 1, √2.',
      'Complementary rule h = √(ab): Instantaneous calculation without writing tanθ = h/a and cotθ = h/b.',
      'Flagstaff on Tower: If a flagstaff of height p on a tower of height h subtends equal angle at distance x, use standard double angle identity.'
    ],
    sampleQuestions: [
      {
        id: 'q-hd-1',
        topicId: 'height-distance',
        exam: 'SSC CGL',
        year: '2023',
        question: 'The angles of elevation of the top of a tower from two points on the ground at distances of 9 m and 16 m from the base of the tower and in the same straight line with it are complementary. The height of the tower is:',
        options: ['12 m', '144 m', '25 m', '7 m'],
        correctOption: 'A',
        answer: '12 m',
        examShortcut: 'Complementary angles shortcut: Height h = √(a × b) = √(9 × 16) = √144 = 12 m. Solved in 2 seconds!',
        conventionalMethod: 'Let height be h. Point 1: tanθ = h / 9. Point 2: tan(90° - θ) = cotθ = h / 16. Multiplying gives: tanθ × cotθ = (h/9) × (h/16) => 1 = h² / 144 => h² = 144 => h = 12 m.',
        formulaUsed: 'h = √(ab)',
        trapWarning: 'Check that angles are complementary (sum to 90°). If they are, √(ab) is guaranteed.'
      }
    ]
  },
  {
    id: 'trigonometric-ratios',
    name: 'Trigonometric Ratios',
    category: 'Advanced Math',
    examWeightage: {
      ssc: '3-5 Questions (Tier 1 & Tier 2)',
      railway: '2-4 Questions',
      lic: '1-2 Questions',
      wbpsc: '2 Questions',
      fci: '1 Question'
    },
    overview: 'Sine, Cosine, Tangent, Cosecant, Secant, Cotangent. Pythagorean identities, complementary angles (sin(90-θ) = cosθ), minimum and maximum values of trigonometric expressions, value putting tricks (θ = 0°, 45°, 90°).',
    keyFormulas: [
      {
        title: 'Fundamental Pythagorean Identities',
        formula: 'sin²θ + cos²θ = 1; sec²θ - tan²θ = 1; cosec²θ - cot²θ = 1',
        latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad \\sec^2\\theta - \\tan^2\\theta = 1',
        note: 'secθ + tanθ = k => secθ - tanθ = 1/k. Super important!'
      },
      {
        title: 'Min and Max Values of a·sinθ + b·cosθ',
        formula: 'Maximum = +√(a² + b²); Minimum = -√(a² + b²)',
        latex: '\\text{Max} = +\\sqrt{a^2 + b^2}, \\quad \\text{Min} = -\\sqrt{a^2 + b^2}',
        note: 'Min value of a·sin²θ + b·cosec²θ is 2√(ab).'
      },
      {
        title: 'Complementary Angle Product Identities',
        formula: 'If A + B = 90°, then tan A · tan B = 1, cot A · cot B = 1, sin²A + sin²B = 1',
        latex: 'A + B = 90^\\circ \\implies \\tan A \\tan B = 1, \\quad \\sin^2 A + \\sin^2 B = 1',
        note: 'Example: tan 1° · tan 2° ... tan 89° = 1.'
      }
    ],
    shortcutsAndTricks: [
      'Value Putting Method: If the question has no conditions and options are numerical, substitute θ = 45° (or 0° or 90° where terms do not become undefined 1/0).',
      'Sec + Tan reciprocal trick: If secθ + tanθ = 3, then secθ - tanθ = 1/3 => 2secθ = 3 + 1/3 = 10/3 => secθ = 5/3.',
      'Symmetric Equations: If sinθ + cosθ = √2 cos(45-θ), value substitution makes it a 5-second problem.'
    ],
    sampleQuestions: [
      {
        id: 'q-trig-1',
        topicId: 'trigonometric-ratios',
        exam: 'SSC CGL',
        year: '2023',
        question: 'If sec θ + tan θ = 5, find the value of sin θ.',
        options: ['12/13', '5/13', '24/25', '7/25'],
        correctOption: 'A',
        answer: '12/13',
        examShortcut: 'If secθ + tanθ = x, then secθ = (x² + 1) / (2x) and sinθ = (x² - 1) / (x² + 1).\nHere x = 5:\nsinθ = (5² - 1) / (5² + 1) = (25 - 1) / (25 + 1) = 24 / 26 = 12 / 13. Done in 5 seconds!',
        conventionalMethod: 'secθ + tanθ = 5 (1). sec²θ - tan²θ = 1 => (secθ + tanθ)(secθ - tanθ) = 1 => secθ - tanθ = 1/5 (2). Adding (1) & (2): 2secθ = 5 + 1/5 = 26/5 => secθ = 13/5 => cosθ = 5/13. Using Pythagorean triplet (5, 12, 13), sinθ = 12/13.',
        formulaUsed: 'sinθ = (x² - 1)/(x² + 1)',
        trapWarning: 'Do not accidentally compute cosθ (5/13) instead of sinθ (12/13).'
      }
    ]
  },
  {
    id: 'degree-radian',
    name: 'Degree and Radian',
    category: 'Advanced Math',
    examWeightage: {
      ssc: '1-2 Questions',
      railway: '1-2 Questions',
      lic: '1 Question',
      wbpsc: '1 Question',
      fci: '1 Question'
    },
    overview: 'Conversion between sexagesimal (degrees, minutes, seconds) and circular measure (radians), Arc length formula s = rθ, Area of sector A = (1/2)r²θ, clock angle problems.',
    keyFormulas: [
      {
        title: 'Conversion Formula',
        formula: 'π radians = 180°; 1 radian = 180° / π ≈ 57° 16′ 22″; 1° = π / 180 radians',
        latex: '\\theta_{\\text{rad}} = \\theta^\\circ \\times \\frac{\\pi}{180^\\circ}, \\quad 1 \\text{ rad} \\approx 57^\\circ 16\' 22\'\'',
        note: 'Always convert θ to radians when using calculus or arc formulas.'
      },
      {
        title: 'Arc Length & Sector Area',
        formula: 'Arc Length s = r · θ (where θ is in radians); Area of Sector = (1/2)r²θ = (1/2) · s · r',
        latex: 's = r\\theta, \\quad A = \\frac{1}{2}r^2\\theta',
        note: 'If θ is in degrees: s = (θ/360) × 2πr, Area = (θ/360) × πr².'
      },
      {
        title: 'Clock Hand Angle Formula',
        formula: 'Angle θ = |30H - (11/2)M|',
        latex: '\\theta = \\left| 30H - \\frac{11}{2}M \\right|',
        note: 'H = hours, M = minutes. If > 180°, reflex angle is 360° - θ.'
      }
    ],
    shortcutsAndTricks: [
      'Fraction of π trick: Divide the degree by 180 and simplify fraction: 150° / 180° = 5/6 => (5/6)π radians.',
      'Clock Angle in seconds: At 3:40 => |30(3) - 5.5(40)| = |90 - 220| = 130°.'
    ],
    sampleQuestions: [
      {
        id: 'q-rad-1',
        topicId: 'degree-radian',
        exam: 'WBPSC',
        year: '2021',
        question: 'Express 135° in circular measure (radians).',
        options: ['3π/4', '2π/3', '5π/6', '4π/3'],
        correctOption: 'A',
        answer: '3π/4',
        examShortcut: 'Divide 135 by 180. 135/180 = (45 × 3) / (45 × 4) = 3/4. Therefore 3π/4 radians. 2-second answer!',
        conventionalMethod: 'Radian measure = Degree × (π / 180). 135 × (π / 180) = (135/180)π = (3/4)π = 3π/4 radians.',
        formulaUsed: 'R = D × π / 180',
        trapWarning: 'Ensure you reduce to lowest terms by cancelling common factor 45.'
      }
    ]
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation',
    category: 'Data Interpretation',
    examWeightage: {
      ssc: '4-5 Questions (Mandatory block in Tier 1 & 2)',
      railway: '4-6 Questions',
      lic: '5-10 Questions (Huge weightage in LIC AAO)',
      wbpsc: '3-5 Questions',
      fci: '4-5 Questions'
    },
    overview: 'High scoring section! Tables, Bar Graphs, Line Graphs, Pie Charts (degrees vs percentages), Mixed DI, and Caselets. Speed calculation tricks for percentage share, ratios, and year-on-year growth.',
    keyFormulas: [
      {
        title: 'Pie Chart Degree to Percentage Conversion',
        formula: '360° = 100% => 1% = 3.6°; Degree = Percentage × 3.6; Percentage = Degree / 3.6',
        latex: '360^\\circ = 100\\% \\implies 1\\% = 3.6^\\circ, \\quad \\text{Deg} = \\% \\times 3.6',
        note: 'Example: 72° = 72 / 3.6 = 20%; 54° = 54 / 3.6 = 15%.'
      },
      {
        title: 'Percentage Increase / Decrease in DI',
        formula: '% Change = [(Final - Initial) / Initial] × 100%',
        latex: '\\% \\text{ Change} = \\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}} \\times 100\\%',
        note: 'Denom is ALWAYS the base (initial) year value.'
      },
      {
        title: 'Ratio Comparison without Division',
        formula: 'Compare a/b vs c/d by cross-multiplying or finding percentage deviation from baseline.',
        latex: '\\frac{a}{b} \\gtrless \\frac{c}{d} \\iff ad \\gtrless bc',
        note: 'Saves 30 seconds per question in DI!'
      }
    ],
    shortcutsAndTricks: [
      'Never calculate absolute values when asked for ratios or percentages: Compare degrees or percentages directly without multiplying by total population!',
      'Approximation / Rounding: In DI questions with wide option gaps, round numbers to 2 significant digits (e.g. 43,892 / 87,411 ≈ 44 / 87 ≈ 50%).',
      'Average of DI table column: Use deviation from an assumed round number (e.g., assume 500, sum deviations, divide by count).'
    ],
    sampleQuestions: [
      {
        id: 'q-di-1',
        topicId: 'data-interpretation',
        exam: 'LIC AAO',
        year: '2023',
        question: 'In a pie chart representing budget distribution, the central angle for Education is 54° and for Health is 72°. What percentage of the total budget is allocated to Education and Health combined?',
        options: ['35%', '30%', '40%', '32%'],
        correctOption: 'A',
        answer: '35%',
        examShortcut: 'Sum of angles = 54° + 72° = 126°. Since 360° = 100%, 126° / 3.6 = 1260 / 36 = 35%. Instant 5-second answer!',
        conventionalMethod: 'Total angle in a pie chart = 360°. Combined angle = 54° + 72° = 126°. Percentage = (126° / 360°) × 100% = (7 / 20) × 100% = 35%.',
        formulaUsed: '% = (Angle / 360) × 100',
        trapWarning: 'Do not calculate percentage for 54° and 72° separately and then add. Add angles first to avoid double calculation.'
      }
    ]
  }
];
