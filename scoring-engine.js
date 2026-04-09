/* ================================================================
   TrustScore — AI Intelligent Credit Scoring Engine v2.0
   ================================================================
   ARCHITECTURE:
     1. SentimentAnalyzer  — NLP-lite review → score
     2. HeuristicScorer    — Weighted, time-decayed, factor scoring
     3. TrustEngine        — Agent: evaluates state + decides trust
     4. ExplainabilityLayer— Generates reasons, penalties, suggestions
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   MODULE 1 · SENTIMENT ANALYZER
   Converts text reviews → sentiment score –1.0 … +1.0
   Uses a curated lexicon with intensity modifiers and negation
---------------------------------------------------------------- */
const SentimentAnalyzer = (() => {

  /* Positive and negative lexicon with weights */
  const LEXICON = {
    // Strong positives (0.8–1.0)
    excellent: 0.9, outstanding: 0.95, exceptional: 0.95, superb: 0.90,
    brilliant: 0.85, fantastic: 0.85, trustworthy: 1.0, reliable: 0.9,
    professional: 0.8, punctual: 0.85, dedicated: 0.8, honest: 0.9,
    amazing: 0.85, wonderful: 0.80, perfect: 0.95, 'highly recommended': 0.9,
    recommend: 0.75, 'great work': 0.85, 'great job': 0.85,
    // Moderate positives (0.4–0.7)
    good: 0.5, nice: 0.4, helpful: 0.55, capable: 0.5, decent: 0.35,
    satisfactory: 0.4, efficient: 0.6, diligent: 0.65, prompt: 0.6,
    friendly: 0.45, cooperative: 0.55, consistent: 0.65, skilled: 0.6,
    // Strong negatives (−0.7 to −1.0)
    terrible: -0.9, awful: -0.9, horrible: -0.85, worst: -0.95,
    fraud: -1.0, dishonest: -0.95, unreliable: -0.9, irresponsible: -0.85,
    unprofessional: -0.85, incompetent: -0.8, scam: -1.0,
    // Moderate negatives (−0.3 to −0.6)
    bad: -0.55, poor: -0.5, late: -0.45, slow: -0.35, rude: -0.6,
    careless: -0.55, absent: -0.45, cancelled: -0.4, disappointing: -0.6,
    inconsistent: -0.5, unpunctual: -0.55, messy: -0.4, average: -0.15,
  };

  /* Intensity multipliers */
  const INTENSIFIERS = {
    very: 1.4, extremely: 1.6, absolutely: 1.5, highly: 1.35,
    quite: 1.2, rather: 1.15, somewhat: 0.8, slightly: 0.6,
  };

  /* Negation window — 2 words before target flips polarity */
  const NEGATORS = new Set(['not', "don't", "didn't", "doesn't", "wasn't",
    "weren't", "isn't", "aren't", 'no', 'never', 'neither', 'hardly']);

  /**
   * analyze(text) → { score: number, sentiment: string, confidence: number }
   */
  function analyze(text) {
    if (!text || typeof text !== 'string') return { score: 0, sentiment: 'neutral', confidence: 0 };

    const words = text.toLowerCase()
      .replace(/[^\w\s']/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    let totalScore = 0;
    let hits = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Try bigrams first (e.g. "great work")
      const bigram = i < words.length - 1 ? `${word} ${words[i + 1]}` : null;
      let lexScore = bigram && LEXICON[bigram] !== undefined ? LEXICON[bigram] : LEXICON[word];
      if (lexScore === undefined) continue;

      // Check negation in a 2-word window behind
      const prevTwo = [words[i - 1], words[i - 2]].filter(Boolean);
      const isNegated = prevTwo.some(w => NEGATORS.has(w));
      if (isNegated) lexScore *= -0.8;

      // Check intensifiers in 3-word window behind
      let multiplier = 1.0;
      const prevThree = [words[i - 1], words[i - 2], words[i - 3]].filter(Boolean);
      for (const pw of prevThree) {
        if (INTENSIFIERS[pw]) { multiplier = INTENSIFIERS[pw]; break; }
      }

      totalScore += lexScore * multiplier;
      hits++;
    }

    if (hits === 0) return { score: 0, sentiment: 'neutral', confidence: 0 };

    // Normalize to −1 … +1
    const raw = totalScore / hits;
    const score = Math.max(-1, Math.min(1, raw));
    const confidence = Math.min(1, hits / 5); // more words → more confident
    const sentiment = score >= 0.35 ? 'positive' : score <= -0.25 ? 'negative' : 'neutral';

    return { score: parseFloat(score.toFixed(3)), sentiment, confidence };
  }

  /**
   * analyzeMultiple(reviews[]) → aggregate sentiment score (0–10)
   */
  function analyzeMultiple(reviews) {
    if (!reviews || reviews.length === 0) return { score: 5, breakdown: [] };
    const results = reviews.map((r, i) => {
      const res = analyze(r.text || r);
      return { text: r.text || r, ...res, weight: r.weight || 1 };
    });
    const totalWeight = results.reduce((s, r) => s + r.weight, 0);
    const weightedSum = results.reduce((s, r) => s + r.score * r.weight, 0);
    const normalized = ((weightedSum / totalWeight) + 1) / 2; // –1…+1 → 0…1
    return {
      score: parseFloat((normalized * 10).toFixed(2)), // 0–10
      breakdown: results,
    };
  }

  return { analyze, analyzeMultiple };
})();


/* ----------------------------------------------------------------
   MODULE 2 · HEURISTIC SCORER
   Assigns weighted scores with temporal decay and asymmetric
   penalty/reward logic (bad > good in impact)
---------------------------------------------------------------- */
const HeuristicScorer = (() => {

  /* Base weights for each factor (must sum to 1.0) */
  const BASE_WEIGHTS = {
    jobCompletion:       0.25,   // reliability core signal
    employerRating:      0.20,   // quality of service
    incomeConsistency:   0.18,   // financial predictability
    cancellationRate:    0.17,   // PENALIZED — asymmetric
    responseTime:        0.10,   // engagement signal
    sentimentScore:      0.10,   // NLP review quality
  };

  /* Asymmetric penalty multiplier for negative signals */
  const PENALTY_AMPLIFIER = 1.6;  // bad events penalize 60% harder than good events reward

  /* Temporal decay: recent data (last 30 days) has full weight */
  /* Older buckets get progressively discounted */
  function temporalDecayWeight(monthsAgo) {
    if (monthsAgo <= 1)  return 1.00;
    if (monthsAgo <= 3)  return 0.85;
    if (monthsAgo <= 6)  return 0.65;
    if (monthsAgo <= 12) return 0.45;
    return 0.25;
  }

  /**
   * computeJobCompletionScore(rate: 0–100) → 0–100
   * Steep drop below 75%; bonus for >95% ("reliability champion")
   */
  function computeJobCompletionScore(rate) {
    if (rate >= 98) return 100;
    if (rate >= 95) return 95 + (rate - 95) * 1.0;
    if (rate >= 85) return 80 + (rate - 85) * 1.5;
    if (rate >= 75) return 60 + (rate - 75) * 2.0;
    if (rate >= 60) return 35 + (rate - 60) * 1.67;
    return Math.max(0, rate * 0.5); // very poor completion → severe penalty
  }

  /**
   * computeRatingScore(avgRating: 1–5) → 0–100
   * Exponential scaling to reward high ratings
   */
  function computeRatingScore(avgRating) {
    const clamped = Math.max(1, Math.min(5, avgRating));
    // Maps: 1→0, 3→45, 4→72, 4.5→87, 5→100
    return parseFloat((Math.pow((clamped - 1) / 4, 0.75) * 100).toFixed(1));
  }

  /**
   * computeIncomeConsistencyScore(monthlyIncomes: number[]) → 0–100
   * Uses Coefficient of Variation (σ/μ) — lower CV → higher score
   * Also weights recency: later months matter more
   */
  function computeIncomeConsistencyScore(monthlyIncomes) {
    if (!monthlyIncomes || monthlyIncomes.length < 2) return 50;

    // Apply temporal weights (last month = highest weight)
    const n = monthlyIncomes.length;
    const weights = monthlyIncomes.map((_, i) => temporalDecayWeight(n - 1 - i));
    const totalW = weights.reduce((s, w) => s + w, 0);

    const weightedMean = monthlyIncomes.reduce((s, v, i) => s + v * weights[i], 0) / totalW;
    if (weightedMean === 0) return 0;

    const weightedVar = monthlyIncomes.reduce((s, v, i) =>
      s + weights[i] * Math.pow(v - weightedMean, 2), 0) / totalW;
    const cv = Math.sqrt(weightedVar) / weightedMean; // coefficient of variation

    // cv=0 (perfect consistency)→100, cv=1 (very erratic)→10, cv>1.5→0
    const score = Math.max(0, 100 - cv * 65);

    // Bonus: check if recent trend is improving
    const recentHalf = monthlyIncomes.slice(Math.floor(n / 2));
    const earlierHalf = monthlyIncomes.slice(0, Math.floor(n / 2));
    const recentAvg = recentHalf.reduce((s, v) => s + v, 0) / recentHalf.length;
    const earlierAvg = earlierHalf.reduce((s, v) => s + v, 0) / earlierHalf.length;
    const trendBonus = earlierAvg > 0 ? Math.min(8, ((recentAvg - earlierAvg) / earlierAvg) * 20) : 0;

    return parseFloat(Math.min(100, score + trendBonus).toFixed(1));
  }

  /**
   * computeCancellationPenalty(rate: 0–100) → 0–100
   * Asymmetric: cancellations penalize HARDER than good ratings reward
   * A 5% cancellation rate → score already at 60
   */
  function computeCancellationPenalty(rate) {
    const clampedRate = Math.max(0, Math.min(100, rate));
    if (clampedRate === 0)   return 100;
    if (clampedRate <= 1)    return 92;
    if (clampedRate <= 3)    return 78;
    if (clampedRate <= 5)    return 60;
    if (clampedRate <= 10)   return 38;
    if (clampedRate <= 20)   return 18;
    return Math.max(0, 18 - (clampedRate - 20) * 0.9);
  }

  /**
   * computeResponseTimeScore(avgMinutes: number) → 0–100
   * Faster response = better score. >60 min is penalized.
   */
  function computeResponseTimeScore(avgMinutes) {
    if (avgMinutes <= 2)   return 100;
    if (avgMinutes <= 5)   return 92;
    if (avgMinutes <= 10)  return 82;
    if (avgMinutes <= 20)  return 70;
    if (avgMinutes <= 30)  return 58;
    if (avgMinutes <= 60)  return 42;
    if (avgMinutes <= 120) return 22;
    return 8;
  }

  /**
   * Main scoring function
   * @param {Object} workerData - contains all 5 input fields
   * @returns {Object} - detailed scores per factor + raw weighted total
   */
  function scoreWorker(workerData) {
    const {
      incomeHistory,       // number[] (monthly amounts, oldest first)
      jobCompletionRate,   // 0–100
      employerRatingAvg,   // 1–5
      responseTimeMinutes, // average response time in minutes
      cancellationRate,    // 0–100 (percentage)
      textReviews,         // string[] or {text, weight}[]
    } = workerData;

    // Step 1: Compute raw factor scores (each 0–100)
    const completionScore = computeJobCompletionScore(jobCompletionRate ?? 80);
    const ratingScore     = computeRatingScore(employerRatingAvg ?? 4.0);
    const incomeScore     = computeIncomeConsistencyScore(incomeHistory ?? []);
    const cancelScore     = computeCancellationPenalty(cancellationRate ?? 5);
    const responseScore   = computeResponseTimeScore(responseTimeMinutes ?? 20);

    // Step 2: Sentiment analysis on text reviews
    const sentimentResult = SentimentAnalyzer.analyzeMultiple(textReviews ?? []);
    const sentimentScore  = sentimentResult.score * 10; // 0–10 → 0–100

    // Step 3: Identify which are negative factors for asymmetric penalty
    // Negative indicators: cancellation < 60, completion < 70, rating < 50
    const negativeSignals = [];
    const positiveSignals = [];

    const factorScores = {
      jobCompletion:     completionScore,
      employerRating:    ratingScore,
      incomeConsistency: incomeScore,
      cancellationRate:  cancelScore,
      responseTime:      responseScore,
      sentimentScore:    sentimentScore,
    };

    for (const [key, val] of Object.entries(factorScores)) {
      if (val < 50) negativeSignals.push({ factor: key, score: val });
      else          positiveSignals.push({ factor: key, score: val });
    }

    // Step 4: Apply dynamic weights — amplify penalties
    let dynamicWeights = { ...BASE_WEIGHTS };
    for (const neg of negativeSignals) {
      dynamicWeights[neg.factor] = BASE_WEIGHTS[neg.factor] * PENALTY_AMPLIFIER;
    }
    // Re-normalize weights to sum = 1
    const totalW = Object.values(dynamicWeights).reduce((s, w) => s + w, 0);
    for (const k of Object.keys(dynamicWeights)) {
      dynamicWeights[k] = dynamicWeights[k] / totalW;
    }

    // Step 5: Weighted aggregate
    let rawScore = 0;
    for (const [key, score] of Object.entries(factorScores)) {
      rawScore += score * dynamicWeights[key];
    }
    rawScore = Math.max(0, Math.min(100, rawScore));

    return {
      rawScore: parseFloat(rawScore.toFixed(1)),
      factorScores,
      dynamicWeights,
      negativeSignals,
      positiveSignals,
      sentimentResult,
    };
  }

  return { scoreWorker, computeJobCompletionScore, computeRatingScore,
           computeIncomeConsistencyScore, computeCancellationPenalty,
           computeResponseTimeScore, BASE_WEIGHTS };
})();


/* ----------------------------------------------------------------
   MODULE 3 · TRUST ENGINE (THE AGENT)
   Evaluates the heuristic output, applies adaptive rule-based logic,
   and decides: trust level, recommendation, and final adjusted score
---------------------------------------------------------------- */
const TrustEngine = (() => {

  /* Adaptive rules — special case overrides */
  const ADAPTIVE_RULES = [
    {
      id: 'INCONSISTENT_INCOME_EXCELLENT_RELIABILITY',
      condition: (d, s) =>
        s.factorScores.incomeConsistency < 55 &&
        s.factorScores.jobCompletion >= 85 &&
        s.factorScores.cancellationRate >= 75,
      adjustment: +5,
      flag: 'income_unstable_reliable',
      description: 'Despite inconsistent income, strong reliability signals moderate trust upward',
    },
    {
      id: 'HIGH_INCOME_POOR_BEHAVIOR',
      condition: (d, s) =>
        s.factorScores.incomeConsistency >= 70 &&
        (s.factorScores.cancellationRate < 45 || s.factorScores.jobCompletion < 60),
      adjustment: -10,
      flag: 'high_income_poor_behavior',
      description: 'High income cannot offset significantly poor behavioral signals',
    },
    {
      id: 'EXCELLENT_ALL_AROUND',
      condition: (d, s) =>
        s.factorScores.jobCompletion >= 90 &&
        s.factorScores.employerRating >= 85 &&
        s.factorScores.cancellationRate >= 88,
      adjustment: +4,
      flag: 'exemplary_worker',
      description: 'All major behavioral signals are excellent — exemplary profile',
    },
    {
      id: 'POOR_REVIEWS_OVERRIDE',
      condition: (d, s) => s.sentimentResult && s.sentimentResult.score < 3,
      adjustment: -8,
      flag: 'poor_review_sentiment',
      description: 'Text reviews contain strongly negative language — trust reduced',
    },
    {
      id: 'VERY_NEW_WORKER',
      condition: (d, s) =>
        d.incomeHistory && d.incomeHistory.length <= 2 &&
        s.rawScore >= 60,
      adjustment: -6,
      flag: 'insufficient_history',
      description: 'Limited work history available — uncertainty premium applied',
    },
    {
      id: 'LONG_TRACK_RECORD',
      condition: (d, s) =>
        d.incomeHistory && d.incomeHistory.length >= 10 &&
        s.rawScore >= 65,
      adjustment: +3,
      flag: 'proven_track_record',
      description: 'Extensive work history provides strong predictive confidence',
    },
  ];

  function determineTrustCategory(score) {
    if (score >= 75) return { category: 'HIGH',   label: 'High Trust',   color: '#22c55e', bgColor: 'rgba(34,197,94,0.15)',   icon: '✦' };
    if (score >= 50) return { category: 'MEDIUM', label: 'Medium Trust', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.15)',  icon: '◈' };
    return              { category: 'LOW',    label: 'Low Trust',    color: '#ef4444', bgColor: 'rgba(239,68,68,0.15)',   icon: '⚠' };
  }

  function determineRecommendation(score, trustCategory, workerData) {
    const { category } = trustCategory;
    const amount = workerData.requestedLoanAmount || 5000;

    if (category === 'HIGH') {
      const maxLoan = Math.min(25000, Math.round(score * 250 / 100) * 100);
      return {
        action: 'APPROVE',
        label: 'Approve Loan',
        detail: `Full approval recommended. Max eligible: ₹${maxLoan.toLocaleString('en-IN')}`,
        interestRate: score >= 88 ? '0.6%' : '0.9%',
        maxEligible: maxLoan,
        confidence: score >= 80 ? 'High' : 'Moderate',
      };
    }

    if (category === 'MEDIUM') {
      if (score >= 62) {
        const maxLoan = Math.min(10000, Math.round(score * 120 / 100) * 100);
        return {
          action: 'CONDITIONAL',
          label: 'Conditional Approval',
          detail: `Partial approval with conditions. Max eligible: ₹${maxLoan.toLocaleString('en-IN')}`,
          interestRate: '1.4%',
          maxEligible: maxLoan,
          confidence: 'Moderate',
        };
      }
      return {
        action: 'CONDITIONAL',
        label: 'Conditional Approval',
        detail: 'Approve only for small amounts (≤₹3,000) with mandatory auto-repayment',
        interestRate: '1.8%',
        maxEligible: 3000,
        confidence: 'Low',
      };
    }

    return {
      action: 'REJECT',
      label: 'Reject Application',
      detail: 'Trust score insufficient. Advise worker to improve reliability metrics.',
      interestRate: 'N/A',
      maxEligible: 0,
      confidence: 'High',
    };
  }

  /**
   * evaluate(workerData) → full AI decision object
   */
  function evaluate(workerData) {
    // Step 1: Run heuristic scoring
    const scoringResult = HeuristicScorer.scoreWorker(workerData);

    // Step 2: Apply adaptive rules
    let adjustedScore = scoringResult.rawScore;
    const appliedRules = [];

    for (const rule of ADAPTIVE_RULES) {
      if (rule.condition(workerData, scoringResult)) {
        adjustedScore += rule.adjustment;
        appliedRules.push({
          id: rule.id,
          adjustment: rule.adjustment,
          flag: rule.flag,
          description: rule.description,
        });
      }
    }
    adjustedScore = Math.max(0, Math.min(100, parseFloat(adjustedScore.toFixed(1))));

    // Step 3: Determine trust category
    const trustCategory = determineTrustCategory(adjustedScore);

    // Step 4: Generate recommendation
    const recommendation = determineRecommendation(adjustedScore, trustCategory, workerData);

    return {
      trustScore: adjustedScore,
      rawScore: scoringResult.rawScore,
      trustCategory,
      recommendation,
      factorScores: scoringResult.factorScores,
      dynamicWeights: scoringResult.dynamicWeights,
      negativeSignals: scoringResult.negativeSignals,
      positiveSignals: scoringResult.positiveSignals,
      appliedRules,
      sentimentResult: scoringResult.sentimentResult,
    };
  }

  return { evaluate, determineTrustCategory };
})();


/* ----------------------------------------------------------------
   MODULE 4 · EXPLAINABILITY LAYER
   Generates human-readable explanations, key factors, penalties,
   and actionable improvement suggestions
---------------------------------------------------------------- */
const ExplainabilityLayer = (() => {

  const FACTOR_LABELS = {
    jobCompletion:     'Job Completion Rate',
    employerRating:    'Employer Rating Quality',
    incomeConsistency: 'Income Stability',
    cancellationRate:  'Cancellation Behavior',
    responseTime:      'Response Time',
    sentimentScore:    'Review Sentiment',
  };

  const FACTOR_THRESHOLDS = {
    jobCompletion:     { excellent: 90, good: 75, poor: 60 },
    employerRating:    { excellent: 82, good: 65, poor: 45 },
    incomeConsistency: { excellent: 78, good: 58, poor: 40 },
    cancellationRate:  { excellent: 88, good: 68, poor: 48 },
    responseTime:      { excellent: 80, good: 60, poor: 40 },
    sentimentScore:    { excellent: 75, good: 55, poor: 35 },
  };

  function classifyFactor(factor, score) {
    const t = FACTOR_THRESHOLDS[factor];
    if (!t) return 'neutral';
    if (score >= t.excellent) return 'excellent';
    if (score >= t.good)      return 'good';
    if (score >= t.poor)      return 'average';
    return 'poor';
  }

  function generateKeyFactors(agentResult) {
    const { factorScores, dynamicWeights } = agentResult;
    const factors = Object.entries(factorScores)
      .map(([key, score]) => ({
        factor: key,
        label: FACTOR_LABELS[key],
        score: parseFloat(score.toFixed(1)),
        weight: parseFloat((dynamicWeights[key] * 100).toFixed(1)),
        classification: classifyFactor(key, score),
        impact: parseFloat((score * dynamicWeights[key]).toFixed(1)),
      }))
      .sort((a, b) => Math.abs(b.impact - 50 * b.weight) - Math.abs(a.impact - 50 * a.weight));
    return factors;
  }

  function generatePenalties(agentResult) {
    const penalties = [];
    const { factorScores, negativeSignals, appliedRules } = agentResult;

    for (const neg of negativeSignals) {
      const label = FACTOR_LABELS[neg.factor] || neg.factor;
      const severity = neg.score < 30 ? 'critical' : neg.score < 50 ? 'high' : 'moderate';
      penalties.push({
        factor: neg.factor,
        label,
        severity,
        score: neg.score,
        message: getPenaltyMessage(neg.factor, neg.score),
      });
    }

    for (const rule of appliedRules) {
      if (rule.adjustment < 0) {
        penalties.push({
          factor: rule.flag,
          label: 'Adaptive Rule',
          severity: 'moderate',
          score: rule.adjustment,
          message: rule.description,
        });
      }
    }

    return penalties.sort((a, b) =>
      (a.severity === 'critical' ? 0 : a.severity === 'high' ? 1 : 2) -
      (b.severity === 'critical' ? 0 : b.severity === 'high' ? 1 : 2));
  }

  function getPenaltyMessage(factor, score) {
    const msgs = {
      jobCompletion:     `Completion rate maps to ${score.toFixed(0)}/100 — workers below 75% are considered unreliable`,
      employerRating:    `Rating quality at ${score.toFixed(0)}/100 — consistently low ratings reduce lender confidence`,
      incomeConsistency: `Income inconsistency score ${score.toFixed(0)}/100 — erratic earnings increase repayment risk`,
      cancellationRate:  `Cancellation penalty at ${score.toFixed(0)}/100 — cancellations are penalized 1.6× harder than good ratings reward`,
      responseTime:      `Response time score ${score.toFixed(0)}/100 — slow response suggests low platform engagement`,
      sentimentScore:    `Review sentiment at ${score.toFixed(0)}/100 — negative text reviews signal poor service quality`,
    };
    return msgs[factor] || `${factor} scored ${score.toFixed(0)}/100 — below acceptable threshold`;
  }

  function generateSuggestions(agentResult) {
    const { factorScores, trustCategory, recommendation, appliedRules } = agentResult;
    const suggestions = [];

    // Factor-based suggestions
    if (factorScores.jobCompletion < 80) {
      suggestions.push({
        priority: 'high',
        icon: '📋',
        title: 'Improve Job Completion Rate',
        action: 'Accept only jobs you can complete. Avoid over-committing to multiple platforms simultaneously. Even 5 more completions this week will boost this metric.',
      });
    }
    if (factorScores.cancellationRate < 70) {
      suggestions.push({
        priority: 'critical',
        icon: '🚫',
        title: 'Reduce Cancellation Rate',
        action: 'This factor carries 1.6\u00d7 penalty weight. Eliminating 3\u20134 cancellations can significantly lift your score. Only accept jobs you are confident about.',
      });
    }
    if (factorScores.employerRating < 70) {
      suggestions.push({
        priority: 'high',
        icon: '⭐',
        title: 'Improve Client Ratings',
        action: 'Focus on communication and quality. Ask clients for feedback after each job. A single 5-star week can shift your average meaningfully.',
      });
    }
    if (factorScores.incomeConsistency < 55) {
      suggestions.push({
        priority: 'medium',
        icon: '📈',
        title: 'Build Income Consistency',
        action: 'Aim for at least 4–5 regular income days per week. Seasonal fluctuations are understood, but zero-income weeks hurt consistency scores.',
      });
    }
    if (factorScores.responseTime < 60) {
      suggestions.push({
        priority: 'low',
        icon: '⚡',
        title: 'Improve Response Speed',
        action: 'Enable notifications for job requests. Responding within 5 minutes puts you in the top tier for this signal.',
      });
    }
    if (factorScores.sentimentScore < 55) {
      suggestions.push({
        priority: 'medium',
        icon: '💬',
        title: 'Improve Review Quality',
        action: 'Be polite, proactive, and go the extra mile. Ask satisfied clients to leave detailed reviews — specific and positive language improves your sentiment score.',
      });
    }

    // Rule-triggered suggestions
    for (const rule of appliedRules) {
      if (rule.flag === 'insufficient_history') {
        suggestions.push({
          priority: 'medium',
          icon: '📅',
          title: 'Build Work History',
          action: 'Complete at least 3–4 months of consistent work. Longer track records unlock higher loan eligibility and better interest rates.',
        });
      }
    }

    // If already high trust
    if (trustCategory.category === 'HIGH' && suggestions.length === 0) {
      suggestions.push({
        priority: 'info',
        icon: '🏆',
        title: 'Excellent Profile — Maintain Momentum',
        action: 'Your profile is in excellent standing. Continue your current work habits and explore higher loan tiers or premium platform opportunities.',
      });
    }

    return suggestions.sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      return (order[a.priority] || 3) - (order[b.priority] || 3);
    });
  }

  function generateNarrative(agentResult) {
    const { trustScore, trustCategory, recommendation, factorScores, appliedRules, negativeSignals } = agentResult;
    const { category } = trustCategory;

    let topStrengths = Object.entries(factorScores)
      .filter(([, v]) => v >= 75)
      .map(([k]) => FACTOR_LABELS[k]);
    let topWeaknesses = negativeSignals
      .map(n => FACTOR_LABELS[n.factor]);

    let narrative = '';

    if (category === 'HIGH') {
      narrative = `This worker demonstrates strong credibility (${trustScore}/100). `;
      if (topStrengths.length) narrative += `Key strengths include ${topStrengths.slice(0,2).join(' and ')}. `;
      if (topWeaknesses.length) narrative += `Minor areas to monitor: ${topWeaknesses.join(', ')}. `;
      narrative += `The AI engine recommends full loan approval with confidence.`;
    } else if (category === 'MEDIUM') {
      narrative = `Mixed signals detected for this worker (score: ${trustScore}/100). `;
      if (topStrengths.length) narrative += `Positive indicators: ${topStrengths.join(', ')}. `;
      if (topWeaknesses.length) narrative += `Concerns: ${topWeaknesses.join(', ')} are dragging the score. `;
      narrative += `Conditional approval with capped loan amount is recommended.`;
    } else {
      narrative = `This profile poses elevated risk (score: ${trustScore}/100). `;
      if (topWeaknesses.length) narrative += `Critical issues: ${topWeaknesses.join(', ')}. `;
      narrative += `Loan approval is not recommended at this time. `;
      narrative += `The worker should focus on the improvement suggestions to rebuild trust.`;
    }

    if (appliedRules.length) {
      const ruleDesc = appliedRules.map(r => r.description).join('. ');
      narrative += ` Adaptive reasoning applied: ${ruleDesc}.`;
    }

    return narrative;
  }

  /**
   * explain(agentResult) → complete explainability object
   */
  function explain(agentResult) {
    return {
      keyFactors:   generateKeyFactors(agentResult),
      penalties:    generatePenalties(agentResult),
      suggestions:  generateSuggestions(agentResult),
      narrative:    generateNarrative(agentResult),
      adaptiveRules: agentResult.appliedRules,
    };
  }

  return { explain, FACTOR_LABELS, classifyFactor };
})();


/* ================================================================
   PUBLIC API — TrustScoreAI
   Single entry point for all pages
================================================================= */
window.TrustScoreAI = {

  /**
   * analyze(workerData) → complete AI assessment
   * workerData: {
   *   incomeHistory: number[],       // monthly amounts, oldest first
   *   jobCompletionRate: number,     // 0–100
   *   employerRatingAvg: number,     // 1.0–5.0
   *   responseTimeMinutes: number,   // average in minutes
   *   cancellationRate: number,      // 0–100 (percent)
   *   textReviews: string[],         // or [{text, weight}]
   *   requestedLoanAmount: number,   // optional
   * }
   */
  analyze(workerData) {
    const agentResult  = TrustEngine.evaluate(workerData);
    const explanation  = ExplainabilityLayer.explain(agentResult);
    return {
      trustScore:    agentResult.trustScore,
      rawScore:      agentResult.rawScore,
      trustCategory: agentResult.trustCategory,
      recommendation: agentResult.recommendation,
      factorScores:  agentResult.factorScores,
      explanation,
      _debug: {
        dynamicWeights: agentResult.dynamicWeights,
        negativeSignals: agentResult.negativeSignals,
        positiveSignals: agentResult.positiveSignals,
        sentimentResult: agentResult.sentimentResult,
        appliedRules: agentResult.appliedRules,
      },
    };
  },

  /* Helper: analyze from existing WORKERS[] data format (dashboard.js) */
  analyzeFromWorkerRecord(worker) {
    const workerData = {
      incomeHistory:       worker.earnings6m || worker.earnings14 || [],
      jobCompletionRate:   worker.completion || 80,
      employerRatingAvg:   worker.rating || 4.0,
      responseTimeMinutes: worker.responseTimeMinutes || 20,
      cancellationRate:    worker.cancellationRatePct || (100 - (worker.dispute || 90)),
      textReviews:         worker.textReviews || [],
      requestedLoanAmount: 5000,
    };
    return this.analyze(workerData);
  },
};

console.log('TrustScore AI Engine v2.0 loaded ✓ — Modules: SentimentAnalyzer | HeuristicScorer | TrustEngine | ExplainabilityLayer');
