export interface SummaryResult {
  actionItems: string[];
  decisions: string[];
  nextSteps: string[];
  keyPoints: string[];
}

export function summarizeNotes(text: string): SummaryResult {
  const lines = text.split('\n');
  const summary: SummaryResult = {
    actionItems: [],
    decisions: [],
    nextSteps: [],
    keyPoints: [],
  };

  // Keywords for simple classification
  const actionKeywords = ['action', 'todo', 'to-do', '@', 'follow-up', 'owner'];
  const decisionKeywords = ['decision', 'decided', 'agreed', 'consensus', 'approved'];
  const nextStepKeywords = ['next step', 'moving forward', 'plan'];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Remove existing bullet points for cleaner processing
    const content = trimmed.replace(/^[-*•]\s*/, '').replace(/^\[[ x]\]\s*/i, '');
    const lower = content.toLowerCase();

    // Classification Logic
    if (actionKeywords.some(k => lower.includes(k)) || line.match(/\[[ ]\]/)) {
      summary.actionItems.push(content);
    } else if (decisionKeywords.some(k => lower.includes(k))) {
      summary.decisions.push(content);
    } else if (nextStepKeywords.some(k => lower.includes(k))) {
      summary.nextSteps.push(content);
    } else {
      // If it's a significant line (not just a short connector), add to key points
      // Heuristic: line length > 10 chars usually implies content
      if (content.length > 10) {
          summary.keyPoints.push(content);
      }
    }
  });

  return summary;
}
