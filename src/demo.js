import { buildDetectionRequest, buildLocationRequest, fakeDetection, fakeLocation, issuesToLocate, markerPlan, parseSrt } from './core.js';
const srt = `1\n00:00:01,000 --> 00:00:03,000\nWelcome to the product.\n\n2\n00:00:04,000 --> 00:00:08,000\nThis result is guaranteed for everyone.`;
const pack = { id: 'editorial', issues: [{ id: 'unsupported_claim', label: 'Unsupported claim', instructions: 'Does a caption state a broad guarantee without evidence?', markAbove: .7, color: 'Red' }, { id: 'unclear', label: 'Unclear passage', instructions: 'Is the passage difficult to understand?', markAbove: .7 }] };
const captions = parseSrt(srt); const detection = fakeDetection(pack); const issues = issuesToLocate(detection, pack);
buildDetectionRequest(captions, pack); buildLocationRequest(captions, issues);
console.log(JSON.stringify(markerPlan(captions, issues, fakeLocation(issues, captions), { frameRate: 24 }), null, 2));
