import { fakeDetection, fakeLocation, issuesToLocate, markerPlan, parseSrt } from '../src/core.js';
const pack = { id: 'editorial', issues: [{ id: 'claim', label: 'Unsupported claim', instructions: 'Does this caption contain a broad guarantee without evidence?', markAbove: .7, color: 'Red' }] };
let plan = [];
preview.onclick = () => { try { const captions = parseSrt(source.value); const issues = issuesToLocate(fakeDetection(pack), pack); plan = markerPlan(captions, issues, fakeLocation(issues, captions)); markers.replaceChildren(...plan.map(marker => Object.assign(document.createElement('li'), { textContent: `${marker.frame}f · ${marker.label} · ${marker.note}` }))); apply.disabled = !plan.length; } catch (error) { markers.textContent = error.message; } };
apply.onclick = async () => {
  if (!globalThis.resolve?.getCurrentTimeline) return alert('Resolve workflow bridge is unavailable. Use preview mode or install as a Workflow Integration.');
  const timeline = await globalThis.resolve.getCurrentTimeline();
  for (const marker of plan) await timeline.addMarker(marker.frame, marker.color, marker.label, marker.note, marker.durationFrames, marker.id);
};
