# PTE Mock Upgrade 4 — timing, audio cues, per-task review, cloud reset

## What changed

- PTE Academic-like preparation and attempt timing for seven Speaking question types. Audio-first Speaking questions start preparation (where applicable) only after audio playback has finished.
- Short beep cues at the start of timed spoken responses, once the browser has been unlocked by a student action. Beeps depend on browser audio policies; the exact Pearson examination sound is not bundled.
- Writing: Summarize Written Text 10 minutes, Write Essay 20 minutes.
- Summarize Spoken Text: 10 minutes including audio. Reading and other Listening tasks use a **shared countdown**, no invented mandatory per-item timeout. Reading pace guidance is advisory.
- The user-configured section mock is still 50 minutes; full mock is still 129 minutes. Two SWT and two essays would require 60 minutes at their individual limits, so the 50-minute Writing section can expire before all four reach their full limits. This is a custom practice configuration, not an official Pearson full-test section.
- Preserved existing question presentation, template image, model answer, transcript, microphone and live transcript features.
- Result review now shows grouped *question-type* practice performance; automatically gradable objective items are scored while open speaking/writing tasks remain marked **Not auto-scored / review needed**. Percentages are not official PTE scoring.
- `mockAbandon` now tolerates stale/missing session IDs and also resets any active session for the same authenticated student and selected test. This fixes `Mock session unavailable` during reset without bypassing the student authorization check.

## Deploy safely

1. Back up your live site and Apps Script project.
2. Replace ALL website files with this package (especially `full-mock.html`).
3. Replace the complete Google Apps Script `Code.gs`. Preserve `Bridge.html` and `Teacher.html` from this ZIP in your Apps Script project.
4. Save, then Deploy > Manage deployments > Edit existing web app > New version > Deploy. Confirm the deployed `/exec` URL matches `sync-config.js` and `full-mock.html`.
5. Hard-refresh the website. Sign in with a student account, run one section mock, attempt reset, then verify `Mock Test Sessions` and `Mock Test Results` in your current Google Sheet.

## What was checked

- JavaScript syntax of `Code.gs` and embedded script in `full-mock.html`.
- The package includes all original 46 project files (plus this setup guide).
- Does not perform a live Apps Script authentication / microphone test here. No existing Sheets data was deleted or edited.

## Limits and follow-up engineering

- **Not an official scored practice test.** Speaking and essay scoring require separate qualified evaluation; objective scores are practice estimates and depend on how source answer keys are formatted.
- Web app still sends answer keys with practice question objects to enable existing learning controls. For secure examination mode, answers must be withheld and grading moved server-side.
- Browser refresh may restart the currently displayed question's preparation phase, although the cloud stores the overall remaining time and answers. Exact interruption recovery needs question-phase checkpoints.
- Some browsers block audio autoplay or WebAudio until a tap. The visible audio control remains usable.
- Pearson may vary Read Aloud preparation and recording lengths by question; this practice site uses 35 seconds prep and 40 seconds recording as a fixed practical default.
