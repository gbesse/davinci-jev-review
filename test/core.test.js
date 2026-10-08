import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLocationRequest, issuesToLocate, markerPlan, parseSrt } from '../src/core.js';

const captions = parseSrt('1\n00:00:01,000 --> 00:00:02,500\nFirst\n\n2\n00:00:03,000 --> 00:00:04,000\nExact quote');
const pack = { id: 'p', issues: [{ id: 'x', label: 'Issue', instructions: 'Is there an issue?', markAbove: .7 }] };

test('parses SRT timing and exact text', () => assert.deepEqual(captions[1], { id: 'caption_2', start: 3, end: 4, text: 'Exact quote' }));
test('second pass runs only above threshold', () => assert.equal(issuesToLocate({ answers: { x: { type: 'noul', noul: .69 } } }, pack).length, 0));
test('location choices are bounded to caption ids', () => assert.deepEqual(Object.keys(buildLocationRequest(captions, pack.issues).questions.x.criteria), ['caption_1', 'caption_2']));
test('marker preserves exact caption and frame', () => { const result = markerPlan(captions, pack.issues, { answers: { x: { type: 'choice', choice: 'caption_2' } } }, { frameRate: 25 }); assert.equal(result[0].frame, 75); assert.equal(result[0].note, 'Exact quote'); });
test('invented caption creates no marker', () => assert.equal(markerPlan(captions, pack.issues, { answers: { x: { type: 'choice', choice: 'invented' } } }).length, 0));
test('reversed and empty subtitle intervals are rejected', () => {
  for (const end of ['00:00:01,000', '00:00:00,500']) assert.throws(() => parseSrt(`1\n00:00:01,000 --> ${end}\nText`), /Invalid SRT interval/);
});
test('marker plan rejects invalid frame rates', () => assert.throws(() => markerPlan(captions, pack.issues, {}, { frameRate: 0 }), /frameRate/));
