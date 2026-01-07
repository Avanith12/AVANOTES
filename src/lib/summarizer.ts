import nlp from 'compromise';

export interface SummaryResult {
  actionItems: string[];
  decisions: string[];
  nextSteps: string[];
  keyPoints: string[];
}

export function summarizeNotes(text: string): SummaryResult {
  const doc = nlp(text);
  const summary: SummaryResult = {
    actionItems: [],
    decisions: [],
    nextSteps: [],
    keyPoints: [],
  };

  const sentences = doc.sentences().json();
  const allInfoSentences: string[] = [];

  sentences.forEach((sent: any) => {
    const sentenceText = sent.text.trim();
    const sentenceDoc = nlp(sentenceText);
    const lower = sentenceText.toLowerCase();

    // --- 1. STRICTER ACTION DETECTION ---

    // Explicit keywords are safe: "Action:", "TODO", "@John"
    const hasActionKeyword = ['action:', 'todo', 'to-do', '@'].some(k => lower.includes(k));

    // "Needs to": Strong signal, but check subject. 
    // "Text files need to be..." -> Passive/Info. "John needs to..." -> Action.
    // We check if the subject is a Person or ProperNoun.
    const strictSubjectAction = sentenceDoc.match('(#Person|#ProperNoun) (will|must|should|needs) (to)? #Verb').found;

    // Imperatives: "Fix the bug". 
    // Filter out long "instructional" text vs short "tasks".
    // Also, "Avoid" or "Consider" usually start bad advice sentences. 
    // We strictly look for strong verbs: "Email", "Deploy", "Call", "Schedule", "Fix".
    const strongImperativeVerbs = '(email|call|schedule|deploy|fix|buy|send|write|create|update|delete|remove|add)';
    const isStrongImperative = sentenceDoc.match(`^${strongImperativeVerbs} .`).found;

    // --- 2. DECISION DETECTION ---
    const isDecision = sentenceDoc.match('(we|I|group|team) (decided|agreed|approved)').found ||
      sentenceDoc.match('(decision|consensus) (was|is)').found ||
      ['decision:', 'consensus:'].some(k => lower.includes(k)); // Explicit prefixes

    // --- 3. NEXT STEPS ---
    const isNextStep = lower.includes('next step') || lower.includes('moving forward');

    // --- CLASSIFICATION ---
    if (hasActionKeyword || strictSubjectAction || isStrongImperative) {
      summary.actionItems.push(sentenceText);
    } else if (isDecision) {
      summary.decisions.push(sentenceText);
    } else if (isNextStep) {
      summary.nextSteps.push(sentenceText);
    } else {
      // Collect for "Extractive Summarization" later
      if (sentenceText.length > 20) {
        allInfoSentences.push(sentenceText);
      }
    }
  });

  // --- 4. EXTRACTIVE SUMMARIZATION (SMART CUTTING) ---
  // If we have too many info sentences, pick the best ones.
  // Heuristic: First sentence (Context), Last sentence (Conclusion), and sentences with "important" keywords.

  if (allInfoSentences.length <= 5) {
    summary.keyPoints = allInfoSentences;
  } else {
    // Always keep the first one
    summary.keyPoints.push(allInfoSentences[0]);

    // Score the middle ones
    const importantKeywords = ['significant', 'key', 'important', 'crucial', 'main', 'issue', 'problem', 'goal', 'objective'];
    const middleSentences = allInfoSentences.slice(1, allInfoSentences.length - 1);

    const scored = middleSentences.filter(s => {
      return importantKeywords.some(k => s.toLowerCase().includes(k));
    });

    // Add up to 3 scored/important sentences
    summary.keyPoints.push(...scored.slice(0, 3));

    // Always keep the last one (if it's not the same as first)
    if (allInfoSentences.length > 1) {
      summary.keyPoints.push(allInfoSentences[allInfoSentences.length - 1]);
    }
  }

  // Fallback: If absolutely nothing was found (short text), just use the input
  if (summary.actionItems.length === 0 && summary.keyPoints.length === 0 && text.trim().length > 0) {
    // Just put plain text as a key point if it's short
    if (text.length < 200) summary.keyPoints.push(text);
  }

  return summary;
}
