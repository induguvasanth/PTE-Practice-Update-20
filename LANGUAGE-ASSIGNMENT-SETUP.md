# Teacher-controlled vocabulary meaning languages

## Supported languages
Telugu (`te`, default), Hindi (`hi`), Kannada (`kn`), and Tamil (`ta`). Only the meaning language changes; the English vocabulary words and English example sentences remain in English.

## Google Sheets columns
For **each Vocabulary sheet**, add these exact headers and fill in the translations:

- `Hindi Word Meaning`
- `Hindi Sentence Meaning`
- `Kannada Word Meaning`
- `Kannada Sentence Meaning`
- `Tamil Word Meaning`
- `Tamil Sentence Meaning`

Keep existing `Telugu Word Meaning` and `Telugu Sentence Meaning` columns unchanged. The application does **not** automatically translate existing vocabulary; missing translated cells display "Translation not available" rather than showing the wrong language. Translation quality should be reviewed by a speaker of the relevant language.

## Teacher workflow
1. Update and redeploy **Google-Apps-Script/Code.gs** and **Google-Apps-Script/Teacher.html** as a new Apps Script web app version.
2. Publish updated **vocabulary.html** alongside the other static site files.
3. Sign in to the Teacher Dashboard.
4. Under **Manage student**, choose the student, select their **Vocabulary meaning language**, then click **Save language**.
5. Newly added students default to Telugu. Existing students with no language saved also default to Telugu.
6. The student's vocabulary page reads the assigned language from the authenticated backend, on login and when the page receives focus. Students cannot change their own assigned language through the UI.

## Voice playback
The app uses device/browser speech voices for Hindi, Kannada and Tamil, if available. Cloud TTS presets remain for English/Telugu. Voice availability depends on device/browser. The original Telugu settings are retained for Telugu learners.

## Deployment validation
- Add one test student per language and populate test vocabulary translations in each relevant sheet.
- Log in as each student and verify both word and sentence meanings, playback, and topic navigation.
- Change an assignment while the student is logged in; refocus or reload their vocabulary page to confirm the update.
- Verify missing translations show the placeholder and that students cannot alter their language through requests.
- Confirm existing Telugu students, student logins, progress, and mock tests continue to work.

**Note:** Static inspection and JavaScript syntax checks were performed. Live Apps Script, Google Sheets, and browser integration have not been tested in this environment.
