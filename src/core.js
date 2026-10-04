export const MODEL = 'jev-1.13.0';

function toSeconds(raw) {
  const match = /^(\d{2}):(\d{2}):(\d{2})[,.](\d{3})$/.exec(raw);
  if (!match) throw new TypeError(`Invalid SRT timecode: ${raw}`);
  const [, h, m, s, ms] = match.map(Number);
  if (m > 59 || s > 59) throw new TypeError(`Invalid SRT timecode: ${raw}`);
  return h * 3600 + m * 60 + s + ms / 1000;
}

export function parseSrt(text) {
  const captions = [];
  for (const block of String(text).replaceAll('\r\n', '\n').trim().split(/\n{2,}/)) {
    const rows = block.split('\n'); const index = rows.findIndex(row => row.includes('-->'));
    if (index < 0) continue;
    const [start, end] = rows[index].split('-->').map(part => part.trim().split(/\s+/)[0]);
    const value = rows.slice(index + 1).join(' ').trim();
    if (!value) continue;
    captions.push({ id: `caption_${captions.length + 1}`, start: toSeconds(start), end: toSeconds(end), text: value });
  }
  if (!captions.length) throw new TypeError('No captions found');
  if (captions.length > 255) throw new TypeError('Review accepts at most 255 captions per pass');
  return captions;
}

export function validatePack(pack) {
  if (!pack?.id || !Array.isArray(pack.issues) || !pack.issues.length) throw new TypeError('Pack needs id and issues');
  for (const issue of pack.issues) if (!issue.id || !issue.label || !issue.instructions || !(issue.markAbove >= 0 && issue.markAbove <= 1)) throw new TypeError('Issue needs id, label, instructions and markAbove');
  return pack;
}

export function buildDetectionRequest(captions, pack) {
  validatePack(pack);
  return { model: MODEL, state: { captions: captions.map(({ id, text }) => ({ id, text })) }, questions: Object.fromEntries(pack.issues.map(issue => [issue.id, { type: 'noul', instructions: issue.instructions }])) };
}

export function issuesToLocate(response, pack) {
  return pack.issues.filter(issue => response?.answers?.[issue.id]?.type === 'noul' && response.answers[issue.id].noul >= issue.markAbove);
}

export function buildLocationRequest(captions, issues) {
  const criteria = Object.fromEntries(captions.map(({ id, text }) => [id, { text }]));
  return { model: MODEL, state: { captions: captions.map(({ id, text }) => ({ id, text })) }, questions: Object.fromEntries(issues.map(issue => [issue.id, { type: 'choice', instructions: `Select the exact caption that most strongly demonstrates: ${issue.instructions}`, criteria }])) };
}

export function markerPlan(captions, issues, response, { frameRate = 24 } = {}) {
  const byId = new Map(captions.map(caption => [caption.id, caption]));
  return issues.flatMap(issue => {
    const answer = response?.answers?.[issue.id]; const caption = answer?.type === 'choice' ? byId.get(answer.choice) : null;
    if (!caption) return [];
    return [{ id: `jev_${issue.id}_${caption.id}`, issueId: issue.id, label: `Jev: ${issue.label}`, frame: Math.round(caption.start * frameRate), durationFrames: Math.max(1, Math.round((caption.end - caption.start) * frameRate)), note: caption.text, color: issue.color ?? 'Yellow' }];
  });
}

export function fakeDetection(pack) { return { model: MODEL, answers: Object.fromEntries(pack.issues.map((issue, index) => [issue.id, { type: 'noul', noul: index === 0 ? 0.88 : 0.2 }])) }; }
export function fakeLocation(issues, captions) { return { model: MODEL, answers: Object.fromEntries(issues.map(issue => [issue.id, { type: 'choice', choice: captions.at(-1).id }])) }; }
