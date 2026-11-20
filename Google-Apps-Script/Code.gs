/*****************************************************************
 * PTE GENERAL PRACTICE — PREMIUM MASTER BACKEND
 * ONE Code.gs for the complete project
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1mAFV5s3i0szE8sPthN8ui8T19AV5G8yxmm8uAaOpLrw/
 *
 * IMPORTANT:
 * - This backend supports all modules.
 * - Transcript and Template Image URL are optional.
 * - Audio-first tasks can keep their visible text hidden in HTML.
 * - Transcript is returned separately for Show/Hide practice mode.
 * - Respond to a Situation, Repeat Sentence, Retell Lecture,
 *   Answer Short Question and Summarize Group Discussion all support
 *   Audio URL + Transcript + Answer + optional Template Image URL.
 *****************************************************************/

const CONFIG = {
  SPREADSHEET_ID: '1mAFV5s3i0szE8sPthN8ui8T19AV5G8yxmm8uAaOpLrw',
  RESULTS_SHEET: 'Results',
  STUDENTS_SHEET: 'Students',
  QUESTION_PROGRESS_SHEET: 'QuestionProgress',
  CACHE_SECONDS: 15
};


// Vocabulary TTS configuration.
// The Vocabulary page can also use a user-pasted API key directly in the browser.
// This backend remains available as a future server-side/proxy path and supports
// either Apps Script OAuth or an API key supplied by a caller.
const VOCABULARY_TTS = {
  enabled: false,
  provider: 'google-cloud-tts',
  fallback: 'browser',
  englishLanguageCode: 'en-IN',
  teluguLanguageCode: 'te-IN',
  englishVoiceName: 'en-IN-Chirp3-HD-Achernar',
  teluguVoiceName: 'te-IN-Chirp3-HD-Achernar',
  audioEncoding: 'MP3'
};


/*****************************************************************
 * TASK / SHEET CONFIGURATION
 *****************************************************************/

const TASKS = {
  personalIntroduction: {
    sheets: ['Personal Introduction', 'PersonalIntroduction'],
    label: 'Personal Introduction'
  },

  readAloud: {
    sheets: ['Read Aloud', 'ReadAloud', 'Questions'],
    label: 'Read Aloud'
  },

  repeatSentence: {
    sheets: ['Repeat Sentence', 'RepeatSentence', 'Repeat Sentences'],
    label: 'Repeat Sentence'
  },

  describeImage: {
    sheets: ['Describe Image', 'DescribeImage'],
    label: 'Describe Image'
  },

  retellLecture: {
    sheets: ['Retell Lecture', 'Retell Talk', 'RetellTalk', 'Retell'],
    label: 'Retell Lecture'
  },

  answerShortQuestion: {
    sheets: [
      'Answer Short Question',
      'Short Answer',
      'ShortAnswer',
      'Answer Short Questions'
    ],
    label: 'Answer Short Question'
  },

  summarizeGroupDiscussion: {
    sheets: [
      'Summarize Group Discussion',
      'Summarise Group Discussion',
      'Group Discussion',
      'Summarize Group',
      'Group Discussion Summary'
    ],
    label: 'Summarize Group Discussion'
  },

  respondSituation: {
    sheets: [
      'Respond to a Situation',
      'Respond to Situation',
      'Respond Situation',
      'Response to a Situation',
      'Situation Response'
    ],
    label: 'Respond to a Situation'
  },

  summarizeWrittenText: {
    sheets: [
      'Summarize Written Text',
      'Summarise Written Text',
      'SummarizeWrittenText',
      'Written Text Summary'
    ],
    label: 'Summarize Written Text'
  },

  essay: {
    sheets: [
      'Write Essay',
      'Essay',
      'Essay Writing',
      'Write an Essay'
    ],
    label: 'Write Essay'
  },


  /* ---------------- READING ---------------- */

  readingRWBlanks: {
    sheets: [
      'Reading - R&W Fill Blanks',
      'R&W Fill in the Blanks',
      'Reading R&W Fill Blanks'
    ],
    label: 'Reading & Writing: Fill in the Blanks'
  },

  readingMCQMultiple: {
    sheets: [
      'Reading - MCQ Multiple',
      'Reading MCQ Multiple',
      'Reading MCMA'
    ],
    label: 'Reading MCQ Multiple'
  },

  reorderParagraph: {
    sheets: [
      'Reading - Reorder Paragraph',
      'Reorder Paragraph',
      'Reading Reorder'
    ],
    label: 'Reorder Paragraph'
  },

  readingBlanks: {
    sheets: [
      'Reading - Fill Blanks',
      'Reading Fill in the Blanks',
      'Reading Drag Drop'
    ],
    label: 'Reading Fill in the Blanks'
  },

  readingMCQSingle: {
    sheets: [
      'Reading - MCQ Single',
      'Reading MCQ Single'
    ],
    label: 'Reading MCQ Single'
  },


  /* ---------------- LISTENING ---------------- */

  summarizeSpoken: {
    sheets: [
      'Listening - Summarize Spoken',
      'Summarize Spoken Text',
      'Listening Summarize Spoken'
    ],
    label: 'Summarize Spoken Text'
  },

  listeningMCQMultiple: {
    sheets: [
      'Listening - MCQ Multiple',
      'Listening MCQ Multiple'
    ],
    label: 'Listening MCQ Multiple'
  },

  listeningBlanks: {
    sheets: [
      'Listening - Fill Blanks',
      'Listening Fill in the Blanks',
      'Listening Blanks'
    ],
    label: 'Listening Fill in the Blanks'
  },

  highlightSummary: {
    sheets: [
      'Listening - Highlight Summary',
      'Highlight Correct Summary',
      'Listening Highlight Summary'
    ],
    label: 'Highlight Correct Summary'
  },

  listeningMCQSingle: {
    sheets: [
      'Listening - MCQ Single',
      'Listening MCQ Single'
    ],
    label: 'Listening MCQ Single'
  },

  missingWord: {
    sheets: [
      'Listening - Missing Word',
      'Select Missing Word',
      'Listening Missing Word'
    ],
    label: 'Select Missing Word'
  },

  incorrectWords: {
    sheets: [
      'Listening - Incorrect Words',
      'Highlight Incorrect Words',
      'Listening Incorrect Words'
    ],
    label: 'Highlight Incorrect Words'
  },

  dictation: {
    sheets: [
      'Listening - Dictation',
      'Write from Dictation',
      'Dictation'
    ],
    label: 'Write from Dictation'
  },


  /* ---------------- OTHER ---------------- */

  grammar: {
    sheets: ['Grammar', 'Grammar Questions'],
    label: 'Grammar'
  },

  /* ---------------- GRAMMAR TOPICS ---------------- */
  grammarPartsOfSpeech: {
    sheets: ['Grammar - Parts of Speech'],
    label: 'Parts of Speech'
  },
  grammarTenses: {
    sheets: ['Grammar - Tenses'],
    label: 'Tenses'
  },
  grammarSubjectVerbAgreement: {
    sheets: ['Grammar - Subject Verb Agreement', 'Grammar - Subject Verb Agreemen'],
    label: 'Subject Verb Agreement'
  },
  grammarArticles: {
    sheets: ['Grammar - Articles'],
    label: 'Articles'
  },
  grammarPrepositions: {
    sheets: ['Grammar - Prepositions'],
    label: 'Prepositions'
  },
  grammarSentenceStructure: {
    sheets: ['Grammar - Sentence Structure'],
    label: 'Sentence Structure'
  },
  grammarErrorIdentification: {
    sheets: ['Grammar - Error Identification'],
    label: 'Error Identification'
  },
  grammarSentenceCorrection: {
    sheets: ['Grammar - Sentence Correction'],
    label: 'Sentence Correction'
  },
  grammarActivePassive: {
    sheets: ['Grammar - Active Passive'],
    label: 'Active Passive'
  },
  grammarReportedSpeech: {
    sheets: ['Grammar - Reported Speech'],
    label: 'Reported Speech'
  },
  grammarConditionals: {
    sheets: ['Grammar - Conditionals'],
    label: 'Conditionals'
  },
  grammarLinkingWords: {
    sheets: ['Grammar - Linking Words'],
    label: 'Linking Words'
  },
  grammarMixedChallenge: {
    sheets: ['Grammar - Mixed Challenge'],
    label: 'Mixed Challenge'
  },

  /* ---------------- VOCABULARY TOPICS ---------------- */
  vocabularyDailyUse: { sheets: ['Vocabulary - Daily Use'], label: 'Daily Use Vocabulary' },
  vocabularyAcademic: { sheets: ['Vocabulary - Academic'], label: 'Academic Vocabulary' },
  vocabularyPteHighFrequency: { sheets: ['Vocabulary - PTE High Frequency'], label: 'PTE High-Frequency Words' },
  vocabularySynonymsAntonyms: { sheets: ['Vocabulary - Synonyms & Antonyms', 'Vocabulary - Synonyms & Antonym'], label: 'Synonyms & Antonyms' },
  vocabularyBusinessWork: { sheets: ['Vocabulary - Business & Work'], label: 'Business & Work' },
  vocabularyEducation: { sheets: ['Vocabulary - Education'], label: 'Education' },
  vocabularyScienceTechnology: { sheets: ['Vocabulary - Science & Technology', 'Vocabulary - Science & Technolo'], label: 'Science & Technology' },
  vocabularyEnvironment: { sheets: ['Vocabulary - Environment'], label: 'Environment' },
  vocabularyHealthLifestyle: { sheets: ['Vocabulary - Health & Lifestyle'], label: 'Health & Lifestyle' },
  vocabularyTravelSociety: { sheets: ['Vocabulary - Travel & Society'], label: 'Travel & Society' },
  vocabularyAdvanced: { sheets: ['Vocabulary - Advanced'], label: 'Advanced Vocabulary' },
  vocabularyConfusingWords: { sheets: ['Vocabulary - Confusing Words'], label: 'Confusing Words' },

  vocabulary: {
    sheets: ['Vocabulary', 'Vocabulary Questions'],
    label: 'Vocabulary'
  },

  mock: {
    sheets: ['Full Mock Test', 'Full Mock', 'Mock Test'],
    label: 'Full Mock Test'
  }
};


/*****************************************************************
 * WEB APP GET
 *
 * Supports:
 * ?action=speaking
 * ?action=answerShortQuestion
 * ?action=reading
 * ?action=listening
 * ?action=writing
 * ?action=grammar
 * ?action=vocabulary
 * ?action=mock
 * ?action=progress
 * ?action=diagnose
 *
 * JSONP is supported using:
 * ?callback=myFunction
 *****************************************************************/

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};

  // Cross-browser Apps Script bridge.
  // The practice pages load this hidden bridge in an iframe and communicate
  // with postMessage. The bridge itself calls google.script.run, avoiding
  // JSONP/CORS/privacy-blocker differences between Chrome, Edge and Brave.
  if (String(p.teacher || '') === '1') {
    return HtmlService.createHtmlOutputFromFile('Teacher').setTitle('PTE Teacher Dashboard');
  }
  if (String(p.bridge || '') === '1') {
    return HtmlService
      .createHtmlOutputFromFile('Bridge')
      .setTitle('PTE Backend Bridge')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  /*
   * IMPORTANT:
   * Do NOT use only .toLowerCase() as the TASKS keys are camelCase
   * (for example grammarTenses). The browser may send grammarTenses,
   * while the old code converted it to grammartenses and could no longer
   * find the TASKS entry.
   */
  const rawAction = String(p.action || 'dashboard').trim();
  const action = rawAction.toLowerCase();
  const taskKey = resolveTaskKey_(rawAction);

  try {
    let data;

    if (action === 'health' || action === 'ping') {
      data = {
        ok: true,
        service: 'PTE Practice Backend',
        status: 'online',
        version: 'bridge-v1',
        action: rawAction,
        time: new Date().toISOString()
      };

    } else if (action === 'dashboard') {
      data = getDashboard();

    } else if (action === 'speaking') {
      data = getSpeaking();

    } else if (action === 'reading') {
      data = getSection([
        'readingRWBlanks',
        'readingMCQMultiple',
        'reorderParagraph',
        'readingBlanks',
        'readingMCQSingle'
      ]);

    } else if (action === 'listening') {
      data = getSection([
        'summarizeSpoken',
        'listeningMCQMultiple',
        'listeningBlanks',
        'highlightSummary',
        'listeningMCQSingle',
        'missingWord',
        'incorrectWords',
        'dictation'
      ]);

    } else if (action === 'writing') {
      data = getSection([
        'summarizeWrittenText',
        'essay'
      ]);

    } else if (action === 'mockrandom' || action === 'fullmock' || action === 'mock') {
      data = getRandomFullMock_(p);

    } else if (action === 'studentmeaninglanguage') {
      data = studentMeaningLanguage_(p);

    } else if (action === 'studentdirectory') {
      data = studentDirectory_();

    } else if (action === 'mockresume') {
      studentAuth_(p.studentToken,p.studentId);
      data = mockResumeV3_(p);

    } else if (action === 'mockhistory') {
      studentAuth_(p.studentToken,p.studentId);
      data = getMockHistory_(p);

    } else if (action === 'studentprogress') {
      data = getStudentProgress_(p);

    } else if (action === 'adminresults') {
      data = {ok:false,error:'Use the password-protected Teacher Dashboard'};

    } else if (action === 'progresscounts') {
      data = getProgressCounts_();

    } else if (action === 'questioncatalog') {
      data = getQuestionCatalog_(p);

    } else if (action === 'progress') {
      data = getProgress();

    } else if (action === 'diagnose') {
      data = diagnose();

    } else if (action === 'vocabularyttsconfig') {
      data = getVocabularyTtsConfig_();

    } else if (action === 'vocabularytts') {
      data = synthesizeVocabularyTts_(p);

    /*
     * This now supports all task keys case-insensitively, including:
     * grammarTenses / grammartenses
     * grammarPartsOfSpeech / grammarpartsofspeech
     * and every other existing task.
     */
    } else if (taskKey) {
      data = getQuestions(taskKey);

    } else {
      data = {
        ok: false,
        error: 'Unknown action: ' + rawAction
      };
    }

    return output_(data, p.callback);

  } catch (err) {
    return output_({
      ok: false,
      error: String(err && err.message ? err.message : err),
      action: rawAction
    }, p.callback);
  }
}




/*****************************************************************
 * CROSS-BROWSER BRIDGE SERVER FUNCTION
 *
 * Called only by Bridge.html through google.script.run.
 * It reuses the same API routing as doGet but returns a plain object.
 *****************************************************************/
function bridgeRequest(request) {
  request = request || {};
  const p = request.params || request || {};

  const rawAction = String(p.action || 'dashboard').trim();
  const action = rawAction.toLowerCase();
  const taskKey = resolveTaskKey_(rawAction);

  try {
    let data;

    if (action === 'health' || action === 'ping') {
      data = {
        ok: true,
        service: 'PTE Practice Backend',
        status: 'online',
        version: 'bridge-v1',
        action: rawAction,
        time: new Date().toISOString()
      };

    } else if (action === 'dashboard') {
      data = getDashboard();

    } else if (action === 'speaking') {
      data = getSpeaking();

    } else if (action === 'reading') {
      data = getSection([
        'readingRWBlanks',
        'readingMCQMultiple',
        'reorderParagraph',
        'readingBlanks',
        'readingMCQSingle'
      ]);

    } else if (action === 'listening') {
      data = getSection([
        'summarizeSpoken',
        'listeningMCQMultiple',
        'listeningBlanks',
        'highlightSummary',
        'listeningMCQSingle',
        'missingWord',
        'incorrectWords',
        'dictation'
      ]);

    } else if (action === 'writing') {
      data = getSection([
        'summarizeWrittenText',
        'essay'
      ]);

    } else if (action === 'mockrandom' || action === 'fullmock' || action === 'mock') {
      data = getRandomFullMock_(p);

    } else if (action === 'studentmeaninglanguage') {
      data = studentMeaningLanguage_(p);

    } else if (action === 'studentdirectory') {
      data = studentDirectory_();

    } else if (action === 'mockresume') {
      studentAuth_(p.studentToken,p.studentId);
      data = mockResumeV3_(p);

    } else if (action === 'mockhistory') {
      studentAuth_(p.studentToken,p.studentId);
      data = getMockHistory_(p);

    } else if (action === 'studentprogress') {
      data = getStudentProgress_(p);

    } else if (action === 'adminresults') {
      data = {ok:false,error:'Use the password-protected Teacher Dashboard'};

    } else if (action === 'progresscounts') {
      data = getProgressCounts_();

    } else if (action === 'questioncatalog') {
      data = getQuestionCatalog_(p);

    } else if (action === 'progress') {
      data = getProgress();

    } else if (action === 'diagnose') {
      data = diagnose();

    } else if (action === 'vocabularyttsconfig') {
      data = getVocabularyTtsConfig_();

    } else if (action === 'vocabularytts') {
      data = synthesizeVocabularyTts_(p);

    } else if (taskKey) {
      data = getQuestions(taskKey);

    } else {
      data = {
        ok: false,
        error: 'Unknown action: ' + rawAction
      };
    }

    return data;

  } catch (err) {
    return {
      ok: false,
      error: String(err && err.message ? err.message : err),
      action: rawAction
    };
  }
}


/*****************************************************************
 * VOCABULARY TTS
 *
 * Browser TTS is the default and always remains the fallback.
 *
 * To activate Google Cloud TTS:
 * 1. Open Apps Script Project Settings.
 * 2. Open the linked Google Cloud project.
 * 3. Enable Cloud Text-to-Speech API.
 * 4. Ensure the script can obtain the project OAuth token.
 * 5. Change VOCABULARY_TTS.enabled to true.
 *
 * No API key is stored in vocabulary.html.
 *****************************************************************/

function getVocabularyTtsConfig_() {
  return {
    ok: true,
    cloudEnabled: !!VOCABULARY_TTS.enabled,
    provider: VOCABULARY_TTS.enabled
      ? VOCABULARY_TTS.provider
      : VOCABULARY_TTS.fallback,
    fallback: VOCABULARY_TTS.fallback,
    englishLanguageCode: VOCABULARY_TTS.englishLanguageCode,
    teluguLanguageCode: VOCABULARY_TTS.teluguLanguageCode
  };
}


function synthesizeVocabularyTts_(p) {
  const suppliedApiKey = String(p && p.apiKey ? p.apiKey : '').trim();
  const text = String(p && p.text ? p.text : '').trim();
  if (!text) return {ok:false, fallback:true, provider:'browser', error:'Missing text.'};

  if (!VOCABULARY_TTS.enabled && !suppliedApiKey) {
    return {ok:false, fallback:true, provider:'browser', error:'Google Cloud TTS is disabled and no API key was supplied.'};
  }

  const requestedLang = String(p && p.lang ? p.lang : '').trim();
  const isTelugu = requestedLang.toLowerCase().indexOf('te') === 0;
  const languageCode = isTelugu ? VOCABULARY_TTS.teluguLanguageCode : VOCABULARY_TTS.englishLanguageCode;
  const suppliedVoiceName = String(p && p.voiceName ? p.voiceName : '').trim();

  const naturalVoices = isTelugu
    ? ['te-IN-Chirp3-HD-Achernar','te-IN-Chirp3-HD-Aoede','te-IN-Chirp3-HD-Despina','te-IN-Standard-A']
    : ['en-IN-Chirp3-HD-Achernar','en-IN-Chirp3-HD-Aoede','en-IN-Neural2-A','en-IN-Wavenet-A','en-IN-Standard-A'];

  const configuredVoice = isTelugu ? VOCABULARY_TTS.teluguVoiceName : VOCABULARY_TTS.englishVoiceName;
  const candidates = [...new Set([suppliedVoiceName, configuredVoice].concat(naturalVoices).filter(Boolean))];

  const requestUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  let lastError = null;

  for (let i = 0; i < candidates.length; i++) {
    const voiceName = candidates[i];
    const payload = {
      input: { text: text },
      voice: { languageCode: languageCode, name: voiceName },
      audioConfig: { audioEncoding: VOCABULARY_TTS.audioEncoding || 'MP3' }
    };

    try {
      const requestOptions = {
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
        headers: suppliedApiKey
          ? {'X-Goog-Api-Key': suppliedApiKey}
          : {Authorization: 'Bearer ' + ScriptApp.getOAuthToken()}
      };

      const response = UrlFetchApp.fetch(requestUrl, requestOptions);
      const status = response.getResponseCode();
      const body = response.getContentText();
      let result = null;
      try { result = JSON.parse(body); } catch (ignore) {}

      if (status >= 200 && status < 300 && result && result.audioContent) {
        return {ok:true, provider:'google-cloud-tts', status:status, voiceName:voiceName, audioContent:result.audioContent};
      }

      const message = result && result.error && result.error.message ? result.error.message : body;
      lastError = {status:status, message:String(message || 'Google Cloud TTS request failed.')};

      // Authentication/quota/billing errors won't improve by changing the voice.
      if (status === 401 || status === 403 || status === 429 || /quota|billing|permission|api key/i.test(lastError.message)) break;
    } catch (err) {
      lastError = {status:0, message:String(err && err.message ? err.message : err)};
      break;
    }
  }

  return {
    ok:false,
    fallback:true,
    provider:'browser',
    status:lastError ? lastError.status : 0,
    error:lastError ? lastError.message : 'Google Cloud TTS failed.'
  };
}

/*****************************************************************
 * RESOLVE TASK KEY
 *
 * Keeps all existing camelCase task names working while also accepting
 * lowercase action values sent by browsers or older HTML files.
 *****************************************************************/
function resolveTaskKey_(rawAction) {
  const value = String(rawAction || '').trim();

  if (!value) return '';

  // Exact key first.
  if (TASKS[value]) return value;

  // Case-insensitive fallback.
  const lower = value.toLowerCase();

  const keys = Object.keys(TASKS);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === lower) {
      return keys[i];
    }
  }

  return '';
}


/*****************************************************************
 * WEB APP POST
 * Saves practice results.
 *****************************************************************/

function doPost(e) {
  try {
    const p = Object.assign({}, (e && e.parameter) || {});
    if (e && e.postData && e.postData.contents) {
      try { Object.assign(p, JSON.parse(e.postData.contents)); } catch (ignore) {}
    }
    const action = String(p.action || 'saveResult').toLowerCase();
    let result;
    if (action === 'savequestionprogress' || action === 'syncprogress') {
      studentAuth_(p.studentToken,p.studentId);
      result = saveQuestionProgress_(p);
    } else if (action === 'studentlogin') {
      result = studentLogin_(p);
    } else if (action === 'registerstudent') {
      throw new Error('Only teachers can register students');
    } else if (action === 'mockstart') {
      studentAuth_(p.studentToken,p.studentId);
      result = mockStartV3_(p);
    } else if (action === 'mockcheckpoint') {
      studentAuth_(p.studentToken,p.studentId);
      result = mockCheckpointV3_(p);
    } else if (action === 'mockabandon') {
      studentAuth_(p.studentToken,p.studentId);
      result = mockAbandonV3_(p);
    } else if (action === 'mockfinish') {
      studentAuth_(p.studentToken,p.studentId);
      result = mockFinishV3_(p);
    } else if (action === 'savemockattempt') {
      studentAuth_(p.studentToken,p.studentId);
      result = saveMockAttempt_(p);
    } else if (action === 'saveresult') {
      studentAuth_(p.studentToken,p.studentId);
      saveResult_(p);
      result = {ok:true, saved:true};
    } else {
      throw new Error('Unknown POST action');
    }
    return output_(result);
  } catch (err) {
    return output_({ok:false,error:String(err.message || err)});
  }
}

// For Bridge.html google.script.run, use bridgeWrite({action:..., ...}).
function bridgeWrite(p) {
  p = p || {};
  const action = String(p.action || '').toLowerCase();
  if (action === 'savequestionprogress' || action === 'syncprogress') { studentAuth_(p.studentToken,p.studentId); return saveQuestionProgress_(p); }
  if (action === 'studentlogin') return studentLogin_(p);
  if (action === 'studentmeaninglanguage') return studentMeaningLanguage_(p);
  if (action === 'registerstudent') throw new Error('Only teachers can register students');
  if (action === 'mockstart') { studentAuth_(p.studentToken,p.studentId); return mockStartV3_(p); }
  if (action === 'mockcheckpoint') { studentAuth_(p.studentToken,p.studentId); return mockCheckpointV3_(p); }
  if (action === 'mockabandon') { studentAuth_(p.studentToken,p.studentId); return mockAbandonV3_(p); }
  if (action === 'mockfinish') { studentAuth_(p.studentToken,p.studentId); return mockFinishV3_(p); }
  if (action === 'savemockattempt') { studentAuth_(p.studentToken,p.studentId); return saveMockAttempt_(p); }
  if (action === 'saveresult') { studentAuth_(p.studentToken,p.studentId); saveResult_(p); return {ok:true,saved:true}; }
  return {ok:false,error:'Unknown write action'};
}

/*****************************************************************
 * JSON / JSONP OUTPUT
 *****************************************************************/

function output_(obj, callbackName) {
  const json = JSON.stringify(obj);

  if (callbackName) {
    const safeCallback = String(callbackName)
      .replace(/[^\w.$]/g, '');

    return ContentService
      .createTextOutput(safeCallback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}


/*****************************************************************
 * DASHBOARD
 *****************************************************************/

function getDashboard() {
  const progressData = getProgress();

  return {
    ok: true,
    project: 'PTE General Practice',
    spreadsheetId: CONFIG.SPREADSHEET_ID,
    progress: progressData.progress
  };
}


/*****************************************************************
 * SPEAKING + WRITING
 *****************************************************************/

function getSpeaking() {
  const keys = [
    'personalIntroduction',
    'readAloud',
    'repeatSentence',
    'describeImage',
    'retellLecture',
    'answerShortQuestion',
    'summarizeGroupDiscussion',
    'respondSituation',
    'summarizeWrittenText',
    'essay'
  ];

  const out = {};

  keys.forEach(function(key) {
    out[key] = getQuestions(key);
  });

  return {
    ok: true,
    speaking: out
  };
}


/*****************************************************************
 * GENERIC SECTION LOADER
 *****************************************************************/

function getSection(keys) {
  const out = {};

  keys.forEach(function(key) {
    out[key] = getQuestions(key);
  });

  return {
    ok: true,
    section: out
  };
}


/*****************************************************************
 * LOAD QUESTIONS FOR ONE TASK
 *****************************************************************/

function getQuestions(key) {
  const cfg = TASKS[key];

  if (!cfg) {
    return {
      ok: false,
      questions: [],
      count: 0,
      error: 'Task not configured'
    };
  }

  const found = findSheet_(cfg.sheets);

  if (!found.sheet) {
    return {
      ok: true,
      questions: [],
      count: 0,
      sheetName: '',
      warning: 'Sheet not found',
      task: key,
      label: cfg.label
    };
  }

  const cache = CacheService.getScriptCache();
  const cacheKey =
    'pte_questions_resources_20261028_v4_' +
    normalize_(found.sheet.getName());

  const cached = cache.get(cacheKey);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (ignore) {}
  }

  const values = found.sheet
    .getDataRange()
    .getDisplayValues();

  if (!values.length) {
    return {
      ok: true,
      questions: [],
      count: 0,
      sheetName: found.sheet.getName(),
      task: key,
      label: cfg.label
    };
  }

  const headerMode = isHeaderRow_(values[0]);

  const headers = headerMode
    ? values[0].map(normalize_)
    : [];

  const rows = headerMode
    ? values.slice(1)
    : values;

  const questions = [];

  rows.forEach(function(row, i) {
    const isEmpty = row.every(function(v) {
      return String(v).trim() === '';
    });

    if (isEmpty) return;

    const q = rowToQuestion_(
      row,
      headers,
      headerMode,
      i + (headerMode ? 2 : 1),
      key
    );

    /*
     * Accept audio-only tasks such as:
     * Answer Short Question
     * Repeat Sentence
     * Retell Lecture
     */
    /*
     * Keep all normal task rows AND Vocabulary rows.
     *
     * Vocabulary sheets use fields such as:
     * ID | Word | Example Sentence | Telugu Word Meaning |
     * Telugu Sentence Meaning | Part of Speech | Resource URL
     *
     * The previous condition did not include q.word, so valid
     * Vocabulary rows were converted correctly but discarded here.
     */
    if (
      q.word ||
      q.text ||
      q.question ||
      q.prompt ||
      q.audioUrl ||
      q.imageUrl ||
      q.transcript
    ) {
      questions.push(q);
    }
  });

  const result = {
    ok: true,
    questions: questions,
    count: questions.length,
    sheetName: found.sheet.getName(),
    task: key,
    label: cfg.label
  };

  try {
    cache.put(
      cacheKey,
      JSON.stringify(result),
      CONFIG.CACHE_SECONDS
    );
  } catch (ignore) {}

  return result;
}


/*****************************************************************
 * DETECT HEADER ROW
 *****************************************************************/

function isHeaderRow_(row) {
  const normalized = row.map(normalize_);

  const headerWords = [
    'id',
    'no',
    'number',
    'question',
    'questionno',
    'prompt',
    'text',
    'paragraph',
    'sentence',
    'content',
    'topic',
    'scenario',
    'situation',
    'instruction',

    'audio',
    'audiourl',
    'audiolink',
    'soundurl',

    'image',
    'imageurl',
    'picture',
    'pictureurl',

    'transcript',
    'audioTranscript',
    'questiontranscript',

    'answer',
    'correctanswer',
    'modelanswer',
    'sampleanswer',

    'templateimage',
    'templateimageurl',
    'templateurl',
    'resourceimage',
    'extraimage',

    'optiona',
    'optionb',
    'optionc',
    'optiond',
    'options',
    'option',
    'choices',
    'choice',

    'explanation',
    'reason',
    'feedback',

    'type',
    'task',
    'questiontype',

    // Vocabulary sheet headers
    'word',
    'vocabularyword',
    'vocabulary',
    'term',
    'examplesentence',
    'example',
    'hindiwordmeaning', 'hindisentencemeaning',
    'kannadawordmeaning', 'kannadasentencemeaning',
    'tamilwordmeaning', 'tamilsentencemeaning',
    'teluguwordmeaning',
    'telugumeaning',
    'telugumeaningofword',
    'wordmeaningtelugu',
    'telugusentencemeaning',
    'telugusentence',
    'sentencemeaningtelugu',
    'examplesentencetelugu',
    'partofspeech',
    'pos',
    'wordtype',
    'resourceurl',
    'resource',
    'resourcelink',
    'link',
    'url'
  ].map(normalize_);

  return normalized.some(function(value) {
    return headerWords.indexOf(value) >= 0;
  });
}


/*****************************************************************
 * CONVERT ONE SHEET ROW INTO ONE QUESTION OBJECT
 *
 * UNIVERSAL OUTPUT FIELDS:
 *
 * id
 * text
 * question
 * prompt
 * audioUrl
 * imageUrl
 * transcript
 * answer
 * explanation
 * templateImageUrl
 * resourceUrl
 * options
 *****************************************************************/

function rowToQuestion_(
  row,
  headers,
  headerMode,
  rowNum,
  key
) {

  function get(names) {

    if (headerMode) {

      for (let n = 0; n < names.length; n++) {

        const wanted = normalize_(names[n]);
        const index = headers.indexOf(wanted);

        if (
          index >= 0 &&
          index < row.length &&
          String(row[index]).trim() !== ''
        ) {
          return String(row[index]).trim();
        }
      }

    } else {

      /*
       * Fallback for sheets without headers.
       * Recommended order:
       *
       * A ID
       * B Question/Text
       * C Audio URL
       * D Transcript
       * E Answer
       * F Image URL
       * G Template Image URL
       */

      const fallback = {
        id: 0,

        text: 1,
        question: 1,
        prompt: 1,
        paragraph: 1,
        sentence: 1,

        audioUrl: 2,

        transcript: 3,

        answer: 4,

        // Common grammar-sheet fallback:
        // A ID | B Question | C Answer | D Options | E Explanation | F Template Image URL
        options: 3,
        explanation: 4,

        imageUrl: 5,

        templateImageUrl: 6,

        // Vocabulary fallback order:
        // A ID | B Word | C Example Sentence | D Telugu Word Meaning |
        // E Telugu Sentence Meaning | F Part of Speech | G Resource URL
        word: 1,
        exampleSentence: 2,
        teluguWordMeaning: 3,
        teluguSentenceMeaning: 4,
        partOfSpeech: 5,
        resourceUrl: 6
      };

      for (let n = 0; n < names.length; n++) {

        const normalizedName = normalize_(names[n]);

        let fallbackKey = null;

        if (
          normalizedName === 'id' ||
          normalizedName === 'no' ||
          normalizedName === 'number'
        ) {
          fallbackKey = 'id';

        } else if (
          normalizedName === 'text' ||
          normalizedName === 'question' ||
          normalizedName === 'prompt' ||
          normalizedName === 'paragraph' ||
          normalizedName === 'sentence'
        ) {
          fallbackKey = 'text';

        } else if (
          normalizedName === 'audiourl' ||
          normalizedName === 'audio'
        ) {
          fallbackKey = 'audioUrl';

        } else if (
          normalizedName === 'transcript'
        ) {
          fallbackKey = 'transcript';

        } else if (
          normalizedName === 'answer'
        ) {
          fallbackKey = 'answer';

        } else if (
          normalizedName === 'imageurl' ||
          normalizedName === 'image'
        ) {
          fallbackKey = 'imageUrl';

        } else if (
          normalizedName === 'templateimageurl' ||
          normalizedName === 'templateimage'
        ) {
          fallbackKey = 'templateImageUrl';

        } else if (
          normalizedName === 'word' ||
          normalizedName === 'vocabularyword' ||
          normalizedName === 'vocabulary' ||
          normalizedName === 'term'
        ) {
          fallbackKey = 'word';

        } else if (
          normalizedName === 'examplesentence' ||
          normalizedName === 'example'
        ) {
          fallbackKey = 'exampleSentence';

        } else if (
          normalizedName === 'teluguwordmeaning' ||
          normalizedName === 'telugumeaning' ||
          normalizedName === 'wordmeaningtelugu'
        ) {
          fallbackKey = 'teluguWordMeaning';

        } else if (
          normalizedName === 'telugusentencemeaning' ||
          normalizedName === 'telugusentence' ||
          normalizedName === 'sentencemeaningtelugu'
        ) {
          fallbackKey = 'teluguSentenceMeaning';

        } else if (normalizedName === 'hindiwordmeaning' || normalizedName === 'hindimeaning') {
          fallbackKey = 'hindiWordMeaning';
        } else if (normalizedName === 'hindisentencemeaning' || normalizedName === 'hindisentence') {
          fallbackKey = 'hindiSentenceMeaning';
        } else if (normalizedName === 'kannadawordmeaning' || normalizedName === 'kannadameaning') {
          fallbackKey = 'kannadaWordMeaning';
        } else if (normalizedName === 'kannadasentencemeaning' || normalizedName === 'kannadasentence') {
          fallbackKey = 'kannadaSentenceMeaning';
        } else if (normalizedName === 'tamilwordmeaning' || normalizedName === 'tamilmeaning') {
          fallbackKey = 'tamilWordMeaning';
        } else if (normalizedName === 'tamilsentencemeaning' || normalizedName === 'tamilsentence') {
          fallbackKey = 'tamilSentenceMeaning';
        } else if (
          normalizedName === 'partofspeech' ||
          normalizedName === 'pos' ||
          normalizedName === 'wordtype'
        ) {
          fallbackKey = 'partOfSpeech';

        } else if (
          normalizedName === 'resourceurl' ||
          normalizedName === 'resource' ||
          normalizedName === 'resourcelink' ||
          normalizedName === 'link' ||
          normalizedName === 'url'
        ) {
          fallbackKey = 'resourceUrl';
        }

        if (
          fallbackKey &&
          fallback[fallbackKey] !== undefined &&
          fallback[fallbackKey] < row.length
        ) {

          const value =
            String(row[fallback[fallbackKey]] || '').trim();

          if (value) return value;
        }
      }
    }

    return '';
  }


  const q = {

    /*
     * VOCABULARY FIELDS
     */
    word: get(['word', 'vocabulary word', 'vocabulary', 'term']),
    exampleSentence: get(['example sentence', 'examplesentence', 'sentence', 'example']),
    teluguWordMeaning: get([
      'telugu word meaning',
      'teluguwordmeaning',
      'telugu meaning',
      'telugu meaning of word',
      'word meaning telugu'
    ]),
    teluguSentenceMeaning: get([
      'telugu sentence meaning',
      'telugusentencemeaning',
      'telugu sentence',
      'sentence meaning telugu',
      'example sentence telugu'
    ]),
    hindiWordMeaning: get(['hindi word meaning','hindiwordmeaning','hindi meaning']),
    hindiSentenceMeaning: get(['hindi sentence meaning','hindisentencemeaning','hindi sentence']),
    kannadaWordMeaning: get(['kannada word meaning','kannadawordmeaning','kannada meaning']),
    kannadaSentenceMeaning: get(['kannada sentence meaning','kannadasentencemeaning','kannada sentence']),
    tamilWordMeaning: get(['tamil word meaning','tamilwordmeaning','tamil meaning']),
    tamilSentenceMeaning: get(['tamil sentence meaning','tamilsentencemeaning','tamil sentence']),
    partOfSpeech: get(['part of speech', 'partofspeech', 'pos', 'word type']),

    id:
      get([
        'id',
        'no',
        'number',
        'question no',
        'question number'
      ]) ||
      String(rowNum),


    /* Optional per-question marks. Spreadsheet header can be Marks, Mark, Points or Score. */
    marks: get([
      'marks',
      'mark',
      'points',
      'point',
      'score',
      'practice score'
    ]) || 1,


    text: get([
      'text',
      'paragraph',
      'sentence',
      'prompt',
      'question',
      'content',
      'topic',
      'scenario',
      'situation',
      'instruction'
    ]),


    question: get([
      'question',
      'question text',
      'prompt',
      'text',
      'paragraph',
      'sentence',
      'scenario',
      'situation'
    ]),


    prompt: get([
      'prompt',
      'question',
      'question text',
      'text',
      'topic'
    ]),


    audioUrl: get([
      'audio url',
      'audio',
      'audio url link',
      'audio link',
      'audiourl',
      'audiolink',
      'sound url',
      'sound'
    ]),


    imageUrl: get([
      'image url',
      'image',
      'imageurl',
      'picture url',
      'picture',
      'pictureurl'
    ]),


    /*
     * IMPORTANT FOR:
     * - Retell Lecture
     * - Answer Short Question
     * - Listening tasks
     *
     * This is returned to HTML even when hidden.
     */
    transcript: get([
      'transcript',
      'audio transcript',
      'audio transcript text',
      'question transcript',
      'reference transcript',
      'script',
      'transcription',
      'situation transcript',
      'discussion transcript',
      'lecture transcript'
    ]),


    answer: get([
      'answer',
      'correct answer',
      'correct',
      'key',
      'model answer',
      'sample answer',
      'model solution',
      'reference answer',
      'solution'
    ]),


    explanation: get([
      'explanation',
      'reason',
      'feedback',
      'answer explanation',
      'solution explanation', 'solution'
    ]),


    /*
     * OPTIONAL EXTRA RESOURCE.
     * This is NOT the main Describe Image image.
     *
     * The HTML should show the Template Image button
     * only when this value is not empty.
     */
    templateImageUrl: get([
      'template image url',
      'template image',
      'templateimageurl',
      'templateimage',
      'template url',
      'templateurl',
      'extra template image url'
    ]),

    /*
     * OPTIONAL EXTERNAL RESOURCE
     * Can be an image, PDF, video, webpage, or any normal URL.
     * Recommended spreadsheet column name: Resource URL
     */
    resourcePdfUrl: get(['Resource PDF URL','PDF URL','PDF Resource URL','PDF Link','Resource PDF','PDF']),
    resourceYoutubeUrl: get(['Resource YouTube URL','YouTube URL','Youtube Video URL','Video URL','YouTube Link','Youtube Link','Video Link','YouTube']),
    resourceImageUrl: get(['Resource Image URL','Additional Image URL','Learning Image URL','Resource Image','Image Resource URL']),
    resourceWebUrl: get(['Resource Web Page URL','Web Page URL','Website URL','Web Resource URL','Web URL','Web Link','Website','Resource Website']),
    resourceTitle: get(['Resource Title','Learning Resource Title','Resource Name','Learning Material Title']),

    resourceUrl: get([
      'resource url',
      'resourceurl',
      'resource',
      'extra resource url',
      'extra resource',
      'reference url',
      'reference',
      'learn more url',
      'learn more',
      'external resource url',
      'external resource',
      'resource link',
      'learning resource',
      'resources',
      'reference link',
      'study material',
      'material url',
      'resource links'
    ]),


    type:
      get([
        'type',
        'task',
        'question type'
      ]) ||
      key,


    row: rowNum,


    options: []
  };
  q.solution = get(['solution', 'detailed solution', 'explanation']);


  /*
   * Also support common lowercase aliases.
   * This helps older HTML versions.
   */
  q.templateImage = q.templateImageUrl;
  q.templateimageurl = q.templateImageUrl;
  q.resource = q.resourceUrl;
  q.resourceURL = q.resourceUrl;
  q.sentence = q.exampleSentence;
  q.teluguMeaning = q.teluguWordMeaning;
  q.teluguSentence = q.teluguSentenceMeaning;
  q.audio = q.audioUrl;
  q.image = q.imageUrl;


  /*
   * OPTIONS
   *
   * Supports BOTH formats:
   * 1. Separate columns: Option A, Option B, Option C...
   * 2. One packed column: Options
   *    Example: A. is|B. are|C. was|D. were
   *
   * IMPORTANT:
   * The old code used:
   *   if (headerMode) { ... } else if (headerMode) { ... }
   * which made the packed Options branch impossible to reach.
   */
  if (headerMode) {

    // First try separate Option A–F / Choice A–F columns.
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(function(letter) {

      const value = get([
        'option ' + letter,
        'option' + letter,
        'choice ' + letter,
        'choice' + letter,
        letter
      ]);

      if (String(value || '').trim()) {
        q.options.push(String(value).trim());
      }
    });

    // If separate option columns are not present, read one Options column.
    if (!q.options.length) {
      const packedOptions = get([
        'options',
        'option',
        'choices',
        'choice'
      ]);

      if (String(packedOptions || '').trim()) {
        q.options = String(packedOptions)
          .split(/\s*\|\s*|\r?\n+/)
          .map(function(value) {
            return String(value || '').trim();
          })
          .filter(function(value) {
            return value !== '';
          });
      }
    }

  } else {

    /*
     * Basic fallback when no headers exist.
     * Reads remaining cells as answer choices.
     */
    for (let j = 7; j < row.length; j++) {

      const value = String(row[j] || '').trim();

      if (value) {
        q.options.push(value);
      }
    }
  }


  return q;
}


/*****************************************************************
 * FULL RANDOM PTE MOCK
 *
 * Builds one stable, seeded question set from the existing completed
 * PTE task sheets. It does not require a separate "Full Mock" sheet.
 *
 * The selection is intentionally task-aware so a mock keeps the same
 * PTE practice structure as the completed Speaking, Reading, Writing
 * and Listening sections.
 *****************************************************************/

const FULL_MOCK_TASKS_ = [
  // Personal introduction is unscored; excluded from the weighted mock set.
  { key: 'readAloud', section: 'Speaking & Writing', max: 7 },
  { key: 'repeatSentence', section: 'Speaking & Writing', max: 10 },
  { key: 'describeImage', section: 'Speaking & Writing', max: 6 },
  { key: 'retellLecture', section: 'Speaking & Writing', max: 2 },
  { key: 'answerShortQuestion', section: 'Speaking & Writing', max: 6 },
  { key: 'summarizeGroupDiscussion', section: 'Speaking & Writing', max: 3 },
  { key: 'respondSituation', section: 'Speaking & Writing', max: 3 },
  { key: 'summarizeWrittenText', section: 'Speaking & Writing', max: 2 },
  { key: 'essay', section: 'Speaking & Writing', max: 1 },

  { key: 'readingRWBlanks', section: 'Reading', max: 6 },
  { key: 'readingMCQMultiple', section: 'Reading', max: 3 },
  { key: 'reorderParagraph', section: 'Reading', max: 2 },
  { key: 'readingBlanks', section: 'Reading', max: 5 },
  { key: 'readingMCQSingle', section: 'Reading', max: 3 },

  { key: 'summarizeSpoken', section: 'Listening', max: 1 },
  { key: 'listeningMCQMultiple', section: 'Listening', max: 3 },
  { key: 'listeningBlanks', section: 'Listening', max: 3 },
  { key: 'highlightSummary', section: 'Listening', max: 2 },
  { key: 'listeningMCQSingle', section: 'Listening', max: 3 },
  { key: 'missingWord', section: 'Listening', max: 2 },
  { key: 'incorrectWords', section: 'Listening', max: 3 },
  { key: 'dictation', section: 'Listening', max: 4 }
];

function getRandomFullMock_(params) {
  params = params || {};

  const seed = String(params.seed || (
    new Date().getTime() + '-' + Math.random()
  ));

  const mode = String(params.mode || 'full').toLowerCase();
  const sectionNames = {speaking:'Speaking', writing:'Writing', reading:'Reading', listening:'Listening'};
  const shortSections = {
    speaking:['readAloud','repeatSentence','describeImage','retellLecture','answerShortQuestion','summarizeGroupDiscussion','respondSituation'],
    writing:['summarizeWrittenText','essay'],
    reading:['readingRWBlanks','readingMCQMultiple','reorderParagraph','readingBlanks','readingMCQSingle'],
    listening:['summarizeSpoken','listeningMCQMultiple','listeningBlanks','highlightSummary','listeningMCQSingle','missingWord','incorrectWords','dictation']
  };
  if(mode !== 'full' && !shortSections[mode]) return {ok:false,error:'Unknown mock section'};
  const selectedSpecs = mode === 'full' ? FULL_MOCK_TASKS_ : FULL_MOCK_TASKS_.filter(function(spec){return shortSections[mode].indexOf(spec.key) >= 0;}).map(function(spec){return {key:spec.key, section:sectionNames[mode], max:mode==='writing'?2:3};});
  const random = seededRandom_(seed);
  const questions = [];
  const diagnostics = [];

  selectedSpecs.forEach(function(spec) {
    const result = getQuestions(spec.key);

    if (!result || !result.ok) {
      diagnostics.push({
        task: spec.key,
        label: (TASKS[spec.key] || {}).label || spec.key,
        status: 'error',
        message: result && result.error ? result.error : 'Could not load task'
      });
      return;
    }

    const pool = Array.isArray(result.questions)
      ? result.questions.slice()
      : [];

    if (!pool.length) {
      diagnostics.push({
        task: spec.key,
        label: (TASKS[spec.key] || {}).label || spec.key,
        status: 'empty',
        sheetName: result.sheetName || ''
      });
      return;
    }

    shuffleSeeded_(pool, random);

    const take = Math.min(
      Math.max(1, Number(spec.max) || pool.length),
      pool.length
    );

    pool.slice(0, take).forEach(function(question) {
      const copy = JSON.parse(JSON.stringify(question || {}));

      copy.sourceTask = spec.key;
      copy.taskKey = spec.key;
      copy.taskLabel = (TASKS[spec.key] || {}).label || spec.key;
      copy.section = spec.section;
      copy.marks = Number(copy.marks);
      if (!isFinite(copy.marks) || copy.marks <= 0) copy.marks = 1;

      questions.push(copy);
    });

    diagnostics.push({
      task: spec.key,
      label: (TASKS[spec.key] || {}).label || spec.key,
      status: 'loaded',
      selected: take,
      available: pool.length,
      sheetName: result.sheetName || ''
    });
  });

  // Keep section order realistic while retaining fresh random order inside
  // each task. The front end therefore never jumps between unrelated task
  // sections unexpectedly.
  const order = {
    'Speaking & Writing': 1,
    'Reading': 2,
    'Listening': 3
  };

  questions.sort(function(a, b) {
    const ao = order[a.section] || 99;
    const bo = order[b.section] || 99;
    if (ao !== bo) return ao - bo;

    const ai = selectedSpecs.findIndex(function(x) {
      return x.key === a.sourceTask;
    });
    const bi = selectedSpecs.findIndex(function(x) {
      return x.key === b.sourceTask;
    });

    return ai - bi;
  });

  if (!questions.length) {
    return {
      ok: false,
      error:
        'No completed PTE questions were found. Add data to the existing task sheets and try again.',
      mock: {
        seed: seed,
        questions: [],
        diagnostics: diagnostics
      }
    };
  }

  return {
    ok: true,
    mock: {
      seed: seed,
      durationSeconds: mode === 'full' ? 129 * 60 : 50 * 60,
      mode: mode,
      questions: questions,
      count: questions.length,
      diagnostics: diagnostics
    }
  };
}

function seededRandom_(seed) {
  let h = 2166136261 >>> 0;
  const text = String(seed || '');

  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  return function() {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleSeeded_(array, random) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}


/*****************************************************************
 * FIND A SHEET USING ALIASES
 *****************************************************************/

function findSheet_(aliases) {

  const ss = SpreadsheetApp.openById(
    CONFIG.SPREADSHEET_ID
  );

  const allSheets = ss.getSheets();

  const normalizedSheets = allSheets.map(function(sheet) {
    return {
      sheet: sheet,
      normalizedName: normalize_(sheet.getName())
    };
  });


  /*
   * Exact normalized match.
   */
  for (let i = 0; i < aliases.length; i++) {

    const wanted = normalize_(aliases[i]);

    const match = normalizedSheets.find(function(item) {
      return item.normalizedName === wanted;
    });

    if (match) {
      return match;
    }
  }


  /*
   * Partial match.
   */
  for (let i = 0; i < aliases.length; i++) {

    const wanted = normalize_(aliases[i]);

    const match = normalizedSheets.find(function(item) {
      return (
        (wanted.length >= 14 && item.normalizedName.indexOf(wanted) === 0) ||
        (item.normalizedName.length >= 14 && wanted.indexOf(item.normalizedName) === 0)
      );
    });

    if (match) {
      return match;
    }
  }


  return {
    sheet: null
  };
}


/*****************************************************************
 * SAVE PRACTICE RESULT
 *****************************************************************/

function saveResult_(p) {

  const ss = SpreadsheetApp.openById(
    CONFIG.SPREADSHEET_ID
  );

  let sheet = ss.getSheetByName(
    CONFIG.RESULTS_SHEET
  );

  if (!sheet) {
    sheet = ss.insertSheet(
      CONFIG.RESULTS_SHEET
    );
  }


  if (sheet.getLastRow() === 0) {

    sheet.appendRow([
      'Timestamp',
      'Task',
      'Question ID',
      'Expected',
      'Response',
      'Practice Score',
      'Content',
      'Fluency',
      'Pronunciation',
      'Accuracy',
      'Duration',
      'Words', 'Student ID', 'Student Name'
    ]);
  }


  ensureColumns_(sheet, ['Student ID','Student Name']);
  sheet.appendRow([
    new Date(),

    p.task || '',

    p.questionId || '',

    p.expectedText || '',

    p.response ||
      p.spokenText ||
      p.answer ||
      '',

    num_(p.pteScore),

    num_(p.content),

    num_(p.fluency),

    num_(p.pronunciation),

    num_(p.accuracy),

    num_(p.duration),

    num_(p.words),
    safeCell_(p.studentId),
    safeCell_(p.studentName)
  ]);
}


/*****************************************************************
 * OVERALL PROGRESS
 *****************************************************************/

function getProgress() {

  const progress = {
    attempts: 0,
    average: null,
    best: null,
    recent: []
  };


  const found = findSheet_([
    CONFIG.RESULTS_SHEET,
    'Practice Results',
    'Score Results'
  ]);


  if (!found.sheet) {
    return {
      ok: true,
      progress: progress
    };
  }


  const values = found.sheet
    .getDataRange()
    .getDisplayValues();


  if (values.length < 2) {
    return {
      ok: true,
      progress: progress
    };
  }


  const headers = values[0].map(normalize_);


  const taskIndex = firstIndex_(
    headers,
    ['task', 'module']
  );


  const scoreIndex = firstIndex_(
    headers,
    [
      'practice score',
      'practicescore',
      'score',
      'overall'
    ]
  );


  const dateIndex = firstIndex_(
    headers,
    ['timestamp', 'date']
  );


  const scores = [];


  progress.attempts = values.length - 1;


  values.slice(1).forEach(function(row) {

    const raw =
      scoreIndex >= 0
        ? row[scoreIndex]
        : '';

    const score = Number(raw);

    if (String(raw).trim() !== '' && isFinite(score)) {
      scores.push(score);
    }
  });


  if (scores.length) {

    progress.average = Math.round(
      scores.reduce(function(total, value) {
        return total + value;
      }, 0) / scores.length
    );


    progress.best = Math.max.apply(
      null,
      scores
    );
  }


  progress.recent = values
    .slice(Math.max(1, values.length - 6))
    .reverse()
    .map(function(row) {

      return {
        date:
          dateIndex >= 0
            ? row[dateIndex]
            : '',

        task:
          taskIndex >= 0
            ? row[taskIndex]
            : '',

        score:
          scoreIndex >= 0
            ? row[scoreIndex]
            : ''
      };
    });


  return {
    ok: true,
    progress: progress
  };
}


/*****************************************************************
 * DIAGNOSE
 *
 * Open:
 * ?action=diagnose
 *
 * Useful for checking sheet names and matching.
 *****************************************************************/

function diagnose() {

  const ss = SpreadsheetApp.openById(
    CONFIG.SPREADSHEET_ID
  );


  const sheetNames =
    ss.getSheets()
      .map(function(sheet) {
        return sheet.getName();
      });


  const matched = {};


  Object.keys(TASKS)
    .forEach(function(key) {

      const found =
        findSheet_(TASKS[key].sheets);

      matched[key] =
        found.sheet
          ? found.sheet.getName()
          : null;
    });


  return {
    ok: true,

    spreadsheetId:
      CONFIG.SPREADSHEET_ID,

    sheets:
      sheetNames,

    matched:
      matched
  };
}


/*****************************************************************
 * CLEAR QUESTION CACHE
 *
 * Run this function manually after changing:
 * - Transcript
 * - Template Image URL
 * - Audio URL
 * - Answers
 * - Any question data
 *****************************************************************/

function clearQuestionCache() {

  const cache =
    CacheService.getScriptCache();

  const ss =
    SpreadsheetApp.openById(
      CONFIG.SPREADSHEET_ID
    );


  ss.getSheets()
    .forEach(function(sheet) {

      cache.remove(
        'pte_questions_' +
        normalize_(sheet.getName())
      );
    });


  return 'Question cache cleared successfully.';
}


/*****************************************************************
 * NORMALIZE TEXT
 *****************************************************************/

function normalize_(value) {

  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}


/*****************************************************************
 * FIND FIRST MATCHING HEADER
 *****************************************************************/

function firstIndex_(headers, names) {

  for (let i = 0; i < names.length; i++) {

    const index =
      headers.indexOf(
        normalize_(names[i])
      );

    if (index >= 0) {
      return index;
    }
  }

  return -1;
}


/*****************************************************************
 * SAFE NUMBER
 *****************************************************************/

function num_(value) {

  const number = Number(value);

  return isFinite(number)
    ? number
    : '';
}


/*****************************************************************
 * STUDENT / QUESTION PROGRESS SYNC (UPDATE 7)
 * NOTE: Student IDs are identifiers, NOT authentication.
 * Keep admin access secret; do not deploy public student data without auth.
 *****************************************************************/
const PTE_STUDENT_HEADERS_ = ['Student ID','Student Name','Created At','Updated At','Password Salt','Password Hash','Meaning Language'];
const PTE_PROGRESS_HEADERS_ = ['Student ID','Student Name','Task','Question ID','Status','Score','Updated At','Completed At'];
function pteSheet_(name, headers) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  ensureColumns_(sh, headers);
  return sh;
}
function ensureColumns_(sh, headers) {
  if (sh.getLastRow() === 0) {sh.getRange(1,1,1,headers.length).setValues([headers]); return;}
  const current = sh.getRange(1,1,1,Math.max(sh.getLastColumn(),1)).getDisplayValues()[0];
  headers.forEach(function(h) {if (current.indexOf(h) < 0) {current.push(h); sh.getRange(1,current.length).setValue(h);}});
}
function safeCell_(value) {
  const s = String(value == null ? '' : value).trim().slice(0,500);
  return /^[=+@\-\t\r]/.test(s) ? "'" + s : s;
}
function cleanId_(value, label) {
  const s = String(value || '').trim();
  if (!s || s.length > 120 || !/^[a-zA-Z0-9_.:-]+$/.test(s)) throw new Error('Invalid ' + label);
  return s;
}
function registerStudent_(p) {
  const id = cleanId_(p.studentId,'studentId');
  const name = safeCell_(p.studentName);
  if (!name) throw new Error('Student name is required');
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_);
    const data = sh.getDataRange().getValues();
    let row = 0;
    for (let i=1;i<data.length;i++) if(String(data[i][0])===id) {row=i+1;break;}
    if (row) {sh.getRange(row,2).setValue(name);sh.getRange(row,4).setValue(new Date());}
    else sh.appendRow([id,name,new Date(),new Date(),'','','te']);
    return {ok:true,studentId:id,studentName:name};
  } finally {lock.releaseLock();}
}
function saveQuestionProgress_(p) {
  const id = cleanId_(p.studentId,'studentId');
  const task = cleanId_(p.task || p.section,'task');
  const qid = cleanId_(p.questionId,'questionId');
  const status = String(p.status || '').toLowerCase().trim();
  if (['finished','attempted','not_attempted'].indexOf(status)<0) throw new Error('Invalid status');
  const students = pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getDataRange().getValues();
  const matched = students.slice(1).find(function(r){return String(r[0])===id;});
  if(!matched) throw new Error('Student ID not registered. Ask your teacher to add it.');
  const name = safeCell_(matched[1]);
  const score = p.score === '' || p.score == null ? '' : Number(p.score);
  if (score !== '' && !isFinite(score)) throw new Error('Invalid score');
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
    const data = sh.getDataRange().getValues();
    let row = 0;
    for (let i=1;i<data.length;i++) if(String(data[i][0])===id && String(data[i][2])===task && String(data[i][3])===qid) {row=i+1;break;}
    const now = new Date();
    const previousCompletion = row ? data[row-1][7] : '';
    const completedAt = status === 'finished' ? (previousCompletion || now) : '';
    const record = [id,name,task,qid,status,score,now,completedAt];
    if (row) sh.getRange(row,1,1,record.length).setValues([record]);
    else sh.appendRow(record);
    return {ok:true,saved:true,studentId:id,task:task,questionId:qid,status:status};
  } finally {lock.releaseLock();}
}
function getStudentProgress_(p) {
  const id = cleanId_(p.studentId,'studentId');
  studentAuth_(p.studentToken,id);
  const sh = pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
  const rows = sh.getDataRange().getValues().slice(1)
    .filter(function(r){return String(r[0])===id;})
    .map(progressRecord_);
  return {ok:true,studentId:id,records:rows,count:rows.length};
}
function progressRecord_(r) {
  return {studentId:String(r[0]),studentName:String(r[1]),task:String(r[2]),questionId:String(r[3]),status:String(r[4]),score:r[5],updatedAt:r[6] instanceof Date ? r[6].toISOString() : String(r[6]),completedAt:r[7] instanceof Date ? r[7].toISOString() : (r[7]?String(r[7]):'')};
}
function adminAuthorized_(p) {
  const expected = PropertiesService.getScriptProperties().getProperty('PTE_ADMIN_KEY');
  return !!expected && String(p.adminKey || '') === expected;
}
function getAdminResults_(p) {
  if (!adminAuthorized_(p)) return {ok:false,error:'Unauthorized'};
  const sh = pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
  const records = sh.getDataRange().getValues().slice(1).filter(function(r){return r[0];}).map(progressRecord_);
  const summary = {};
  records.forEach(function(r){
    const x=summary[r.studentId] || (summary[r.studentId]={studentId:r.studentId,studentName:r.studentName,finished:0,attempted:0,notAttempted:0});
    if(r.status==='finished')x.finished++;
    else if(r.status==='attempted')x.attempted++;
    else x.notAttempted++;
  });
  return {ok:true,students:Object.values(summary),records:records};
}
function getQuestionCatalog_(p) {
  const task = resolveTaskKey_(p.task);
  if (!task) return {ok:false,error:'Unknown task'};
  const q = getQuestions(task);
  return {ok:true,task:task,questions:(q.questions||[]).map(function(x){return {id:String(x.id),task:task};}),count:q.count};
}
function setupStudentSync() {
  pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_);
  pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
  return 'Student sync sheets created';
}

/** Teacher dashboard: server-side authentication. Never embed the password in HTML. */
function teacherLogin(password) {
  const expected=PropertiesService.getScriptProperties().getProperty('PTE_ADMIN_KEY');
  if(!expected || String(password||'')!==expected) throw new Error('Incorrect password or teacher password not configured');
  const token=Utilities.getUuid()+Utilities.getUuid();
  CacheService.getScriptCache().put('teacher_'+token,'yes',21600);
  return token;
}
function teacherAuth_(token) {
  if(!token || !CacheService.getScriptCache().get('teacher_'+String(token))) throw new Error('Teacher session expired. Sign in again.');
}
function teacherLogout(token){if(token)CacheService.getScriptCache().remove('teacher_'+String(token));return true;}
function teacherDashboardData(token) {
  teacherAuth_(token);
  const students=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getDataRange().getValues().slice(1)
    .filter(r=>r[0]).map(r=>({id:String(r[0]),name:String(r[1]),meaningLanguage:meaningLanguage_(r[6])}));
  const records=pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_).getDataRange().getValues().slice(1)
    .filter(r=>r[0]).map(progressRecord_);
  return {students,records,serverTime:new Date().toISOString()};
}
const PTE_MEANING_LANGUAGES_ = ['te','hi','kn','ta'];
function meaningLanguage_(value){
  const code=String(value||'te').trim().toLowerCase();
  return PTE_MEANING_LANGUAGES_.indexOf(code)>=0 ? code : 'te';
}
/** Only a signed-in teacher can change the student's meaning language. */
function teacherSetStudentLanguage(token,id,language){
  teacherAuth_(token);
  id=cleanId_(id,'studentId');
  language=String(language||'').trim().toLowerCase();
  if(PTE_MEANING_LANGUAGES_.indexOf(language)<0)throw new Error('Unsupported meaning language');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const student=studentRow_(id);
    pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getRange(student.rowIndex,7).setValue(language);
    return {ok:true,studentId:id,meaningLanguage:language};
  }finally{lock.releaseLock()}
}
/** Return only the authenticated student's own language; never trust an arbitrary ID. */
function studentMeaningLanguage_(p){
  const id=cleanId_(p.studentId,'studentId');
  studentAuth_(p.studentToken,id);
  return {ok:true,meaningLanguage:meaningLanguage_(studentRow_(id).row[6])};
}
function teacherAddStudent(token,id,name,password){
  teacherAuth_(token);
  if(!String(password||'').length) throw new Error('Student password cannot be empty');
  id=cleanId_(id,'studentId');
  if(pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getDataRange().getValues().slice(1).some(r=>String(r[0])===id))throw new Error('Student ID already exists. Edit the existing student instead.');
  const result=registerStudent_({studentId:id,studentName:name});
  teacherSetStudentPassword(token,id,password);
  return result;
}
function teacherSetStudentPassword(token,id,password){
  teacherAuth_(token);
  id=cleanId_(id,'studentId');
  if(!String(password||'').length || String(password).length>200) throw new Error('Password must be 1–200 characters');
  const sh=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_);
  const rows=sh.getDataRange().getValues();
  const row=rows.findIndex((r,i)=>i>0&&String(r[0])===id)+1;
  if(!row)throw new Error('Student not found');
  const salt=Utilities.getUuid()+Utilities.getUuid();
  sh.getRange(row,5,1,2).setValues([[salt,studentHash_(salt,String(password))]]);
  return {ok:true};
}



/** Teacher-only student management. Passwords are never returned to clients. */
function teacherEditStudent(token,id,newName){
  teacherAuth_(token);id=cleanId_(id,'studentId');
  const name=safeCell_(newName);
  if(!name)throw new Error('Student name is required');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const sh=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_);
    const rows=sh.getDataRange().getValues();
    const index=rows.findIndex((r,i)=>i>0&&String(r[0])===id);
    if(index<0)throw new Error('Student not found');
    sh.getRange(index+1,2).setValue(name);
    sh.getRange(index+1,4).setValue(new Date());
    const progress=pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
    const values=progress.getDataRange().getValues();
    for(let i=1;i<values.length;i++)if(String(values[i][0])===id)progress.getRange(i+1,2).setValue(name);
    return {ok:true};
  }finally{lock.releaseLock()}
}
function teacherDeleteStudent(token,id,deleteProgress){
  teacherAuth_(token);id=cleanId_(id,'studentId');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const sh=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_);
    const rows=sh.getDataRange().getValues();
    const index=rows.findIndex((r,i)=>i>0&&String(r[0])===id);
    if(index<0)throw new Error('Student not found');
    sh.deleteRow(index+1);
    let deleted=0;
    if(deleteProgress){
      const progress=pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
      const values=progress.getDataRange().getValues();
      for(let i=values.length-1;i>=1;i--)if(String(values[i][0])===id){progress.deleteRow(i+1);deleted++}
    }
    return {ok:true,deletedProgress:deleted};
  }finally{lock.releaseLock()}
}
function teacherClearStudentProgress(token,id){
  teacherAuth_(token);id=cleanId_(id,'studentId');studentRow_(id);
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const sh=pteSheet_(CONFIG.QUESTION_PROGRESS_SHEET,PTE_PROGRESS_HEADERS_);
    const rows=sh.getDataRange().getValues();let removed=0;
    for(let i=rows.length-1;i>=1;i--)if(String(rows[i][0])===id){sh.deleteRow(i+1);removed++}
    return {ok:true,removed};
  }finally{lock.releaseLock()}
}

// Student authentication. Passwords are salted/peppered hashes, not plain text.
// HMAC-signed sessions expire after 30 days and are invalidated by password changes.
function studentSecret_(){
  const props=PropertiesService.getScriptProperties();
  let v=props.getProperty('PTE_STUDENT_SECRET');
  if(!v){const lock=LockService.getScriptLock();lock.waitLock(20000);try{
    v=props.getProperty('PTE_STUDENT_SECRET');
    if(!v){v=Utilities.getUuid()+Utilities.getUuid()+Utilities.getUuid();props.setProperty('PTE_STUDENT_SECRET',v)}
  }finally{lock.releaseLock()}}
  return v;
}
function studentHash_(salt,password){
  const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,salt+'|'+password+'|'+studentSecret_());
  return Utilities.base64EncodeWebSafe(bytes);
}
function studentRow_(id){
  const rows=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getDataRange().getValues();
  const i=rows.findIndex((r,j)=>j>0&&String(r[0])===id);
  if(i<0)throw new Error('Student not found');
  return {row:rows[i],rowIndex:i+1};
}
function studentSign_(message){
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(message,studentSecret_()));
}
function studentAuth_(token,id){
  id=cleanId_(id,'studentId');
  const parts=String(token||'').split('.');
  if(parts.length!==4||parts[0]!==id||!/^[0-9]{10,15}$/.test(parts[1])||Number(parts[1])<Date.now())throw new Error('Student login required');
  const record=studentRow_(id).row;
  if(!record[5])throw new Error('Student password not configured');
  const payload=parts.slice(0,3).join('.')+'|'+String(record[5]);
  if(studentSign_(payload)!==parts[3])throw new Error('Student session expired. Sign in again.');
  return true;
}
function studentLogin_(p){
  const id=cleanId_(p.studentId,'studentId');
  const password=String(p.password||'');
  const record=studentRow_(id).row;
  if(!record[4]||!record[5]||studentHash_(String(record[4]),password)!==String(record[5]))throw new Error('Invalid student password');
  const expires=Date.now()+30*24*60*60*1000;
  const payload=[id,expires,Utilities.getUuid()].join('.');
  return {ok:true,studentId:id,studentName:String(record[1]),meaningLanguage:meaningLanguage_(record[6]),studentToken:payload+'.'+studentSign_(payload+'|'+String(record[5])),expiresAt:new Date(expires).toISOString()};
}
function studentDirectory_(){
  const rows=pteSheet_(CONFIG.STUDENTS_SHEET,PTE_STUDENT_HEADERS_).getDataRange().getValues().slice(1);
  return {ok:true,students:rows.filter(r=>r[0]&&r[5]).map(r=>({id:String(r[0]),name:String(r[1])}))};
}


/** Update 31: count every configured topic directly from its Google Sheet.
 * Returns counts only; no student information or question text. */
function getProgressCounts_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('pte_progress_counts_v32');
  if (cached) { try { return JSON.parse(cached); } catch(e) {} }
  const topicCounts = {};
  const sections = {};
  const labels = {};
  const speaking = ['personalIntroduction','readAloud','repeatSentence','describeImage','retellLecture','answerShortQuestion','summarizeGroupDiscussion','respondSituation','summarizeWrittenText','essay'];
  const reading = ['readingRWBlanks','readingMCQMultiple','reorderParagraph','readingBlanks','readingMCQSingle'];
  const listening = ['summarizeSpoken','listeningMCQMultiple','listeningBlanks','highlightSummary','listeningMCQSingle','missingWord','incorrectWords','dictation'];
  Object.keys(TASKS).forEach(function(key) {
    let section = speaking.indexOf(key)>=0 ? 'Speaking & Writing' : reading.indexOf(key)>=0 ? 'Reading' : listening.indexOf(key)>=0 ? 'Listening' : /^grammar/.test(key) ? 'Grammar' : /^vocabulary/.test(key) ? 'Vocabulary' : '';
    if (!section) return;
    // An unavailable sheet must not make all progress counts fail.
    let count = 0;
    try {
      const result = getQuestions(key);
      count = Array.isArray(result.questions) ? result.questions.length : 0;
    } catch (err) {
      console.warn('Progress count failed for '+key+': '+err);
      // Leave topic as zero until its bank can be read; never invent a total.
    }
    topicCounts[section+'|'+key] = count;
    labels[key] = TASKS[key].label || key;
    sections[section] = (sections[section] || 0) + count;
  });
  // Full Mock is a sampled test of the same banks, not additional unique questions.
  const total = Object.values(sections).reduce(function(a,b){return a+b;},0);
  const data = {ok:true,topics:topicCounts,sections:sections,labels:labels,total:total,updatedAt:new Date().toISOString()};
  try {cache.put('pte_progress_counts_v32',JSON.stringify(data),300);} catch(e) {}
  return data;
}


/*****************************************************************
 * MOCK ATTEMPT HISTORY — authenticated, per-student, append-only
 * A completed attempt is unique by student ID + attempt ID.
 * Percentages are practice-only and supplied by the client;
 * they are NOT authoritative Pearson scores.
 *****************************************************************/
const PTE_MOCK_HISTORY_HEADERS_ = [
  'Student ID','Attempt ID','Completed At','Mode','Slot',
  'Questions','Answered','Objective Earned','Objective Possible',
  'Objective Percent','Ungraded Count','Elapsed Seconds','Question Details JSON'
];
function mockAttemptsSheet_(){
  return pteSheet_('Mock Test Attempts',PTE_MOCK_HISTORY_HEADERS_);
}
function saveMockAttempt_(p){
  const studentId=cleanId_(p.studentId,'studentId');
  const r=typeof p.attempt==='string'?JSON.parse(p.attempt):p.attempt;
  if(!r||typeof r!=='object')throw new Error('Missing completed mock attempt');
  const id=String(r.id||'');
  if(!/^[a-zA-Z0-9_:.\-]{8,220}$/.test(id))throw new Error('Invalid attempt identifier');
  const mode=String(r.mode||'').toLowerCase();
  if(['full','speaking','writing','reading','listening'].indexOf(mode)<0)throw new Error('Invalid mock mode');
  const slot=Number(r.slot);
  if(!Number.isInteger(slot)||slot<1||slot>4)throw new Error('Invalid mock slot');
  const num=function(v,max){const n=Number(v);if(!Number.isFinite(n)||n<0||n>max)throw new Error('Invalid numeric mock result');return n;};
  const questions=num(r.questions,250),answered=num(r.answered,questions);
  const earned=num(r.earned,100000),possible=num(r.possible,100000);
  if(earned>possible)throw new Error('Earned marks exceed available marks');
  const ungraded=num(r.ungradedCount,questions),elapsed=num(r.elapsed,20000);
  const percentage=possible>0?Math.round(100*earned/possible):'';
  const details=Array.isArray(r.details)?r.details.slice(0,250).map(function(d){
    return {task:String(d.task||'').slice(0,120),id:String(d.id||'').slice(0,100),
      answered:!!d.answered,percentage:d.percentage===null||d.percentage===undefined?null:Math.max(0,Math.min(100,Number(d.percentage)||0)),status:String(d.status||'').slice(0,35)};
  }):[];
  const sheet=mockAttemptsSheet_();
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  try{
    const rows=sheet.getDataRange().getValues();
    if(rows.some(function(row,i){return i>0&&String(row[0])===studentId&&String(row[1])===id;}))return {ok:true,saved:true,duplicate:true};
    sheet.appendRow([studentId,id,new Date(),mode,slot,questions,answered,earned,possible,percentage,ungraded,elapsed,JSON.stringify(details)]);
  }finally{lock.releaseLock();}
  return {ok:true,saved:true};
}
function getMockHistory_(p){
  const id=cleanId_(p.studentId,'studentId');
  const rows=mockAttemptsSheet_().getDataRange().getValues().slice(1);
  const attempts=rows.filter(function(r){return String(r[0])===id;}).map(function(r){
    let details=[];try{details=JSON.parse(r[12]||'[]');}catch(ignore){}
    return {id:String(r[1]),when:r[2] instanceof Date?r[2].toISOString():String(r[2]),mode:String(r[3]),slot:Number(r[4]),questions:Number(r[5]),answered:Number(r[6]),earned:Number(r[7]),possible:Number(r[8]),objectivePercent:r[9]===''?null:Number(r[9]),ungradedCount:Number(r[10]),elapsed:Number(r[11]),details:details};
  }).sort(function(a,b){return String(b.when).localeCompare(String(a.when));});
  const fresh=mockV3Sheet_('results').getDataRange().getValues().slice(1)
    .filter(function(r){return String(r[1])===id;})
    .map(function(r){
      let a={};try{a=JSON.parse(String(r[11]||'{}')).attempt||{};}catch(e){}
      return {id:String(a.id||r[0]),when:r[3] instanceof Date?r[3].toISOString():String(r[3]),
        mode:String(r[2]).split('-')[0],slot:Number(String(r[2]).split('-')[1])||1,
        questions:Number(a.questions)||0,answered:Number(a.answered)||0,
        earned:Number(a.earned)||0,possible:Number(a.possible)||0,
        objectivePercent:r[8]===''?null:Number(r[8]),ungradedCount:Number(a.ungradedCount)||0,
        elapsed:Number(a.elapsed)||0,details:Array.isArray(a.details)?a.details:[]};
    });
  const merged=new Map();attempts.concat(fresh).forEach(function(a){merged.set(a.id,a);});
  return {ok:true,attempts:Array.from(merged.values()).sort(function(a,b){return String(b.when).localeCompare(String(a.when));}).slice(0,250)};
}



/*****************************************************************
 * MOCK V3 — CLOUD SESSIONS / FROZEN QUESTIONS / ANSWER CHECKPOINTS
 * Uses six tabs in the EXISTING CONFIG.SPREADSHEET_ID workbook.
 * Compatibility: keeps Mock Test Attempts history and all topic APIs.
 * Scores are practice estimates, NOT official Pearson scoring.
 *****************************************************************/
const MOCK_V3_ = {
  sessions: ['Session ID','Student ID','Test ID','Started At','Updated At','Expires At','Status','Current Question Index','Remaining Seconds','Question Set Hash','Completed At'],
  questions: ['Session ID','Question Order','Topic','Source Sheet','Question ID','Question Snapshot JSON','Preparation Seconds','Answer Seconds'],
  answers: ['Session ID','Question Order','Question ID','Student ID','Response JSON','Submitted At','Score Earned','Score Possible','Scoring Status','Scoring Details JSON'],
  results: ['Session ID','Student ID','Test ID','Completed At','Speaking Percent','Writing Percent','Reading Percent','Listening Percent','Objective Percent','Scored Questions','Pending Questions','Result JSON'],
  history: ['Student ID','Session ID','Test ID','Completed At','Overall Objective Percent','Speaking Percent','Writing Percent','Reading Percent','Listening Percent','Attempt Number','Improvement Percentage Points']
};
function mockV3Sheet_(key){return pteSheet_({sessions:'Mock Test Sessions',questions:'Mock Test Questions',answers:'Mock Test Answers',results:'Mock Test Results',history:'Mock Test History'}[key],MOCK_V3_[key]);}
function mockV3Find_(sh,col,val){
  const n=sh.getLastRow(); if(n<2)return 0;
  const ix=sh.getRange(2,col,n-1,1).getDisplayValues().findIndex(function(r){return r[0]===val;});
  return ix<0?0:ix+2;
}
function mockV3ModeSlot_(p){
  const mode=String(p.mode||'full').toLowerCase(),slot=Number(p.test||p.slot||1);
  if(['full','speaking','writing','reading','listening'].indexOf(mode)<0||!Number.isInteger(slot)||slot<1||slot>4)throw new Error('Invalid mock selection');
  return {mode:mode,slot:slot,testId:mode+'-'+slot};
}
function mockV3Session_(p){
  const id=cleanId_(p.sessionId,'sessionId'),student=cleanId_(p.studentId,'studentId');
  const sh=mockV3Sheet_('sessions'),row=mockV3Find_(sh,1,id);
  if(!row||String(sh.getRange(row,2).getValue())!==student)throw new Error('Mock session unavailable');
  return {sh:sh,row:row,values:sh.getRange(row,1,1,11).getValues()[0],id:id,student:student};
}
function mockV3Questions_(id){
  return mockV3Sheet_('questions').getDataRange().getValues().slice(1)
    .filter(function(r){return String(r[0])===id;})
    .sort(function(a,b){return Number(a[1])-Number(b[1]);})
    .map(function(r){try{return JSON.parse(String(r[5]));}catch(e){return null;}})
    .filter(Boolean);
}
function mockV3Answers_(id){
  const out={};mockV3Sheet_('answers').getDataRange().getValues().slice(1).forEach(function(r){
    if(String(r[0])!==id)return;
    try{out[String(Number(r[1])-1)]=JSON.parse(String(r[4]||'null'));}catch(e){}
  });return out;
}
function mockStartV3_(p){
  const student=cleanId_(p.studentId,'studentId'),m=mockV3ModeSlot_(p);
  const sessions=mockV3Sheet_('sessions');
  const old=sessions.getDataRange().getValues().slice(1).filter(function(r){return String(r[1])===student&&String(r[2])===m.testId&&String(r[6])==='in_progress';}).pop();
  if(old)return mockResumeV3_({studentId:student,sessionId:String(old[0])});
  const selected=getRandomFullMock_({mode:m.mode,test:m.slot,seed:String(p.seed||Utilities.getUuid())});
  if(!selected.ok||!selected.mock||!selected.mock.questions.length)return selected;
  const now=new Date(),sessionId='mock_'+Utilities.getUuid().replace(/-/g,'');
  const duration=selected.mock.durationSeconds;
  const questions=selected.mock.questions;
  const digest=Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,questions.map(function(q){return String(q.sourceTask)+':'+String(q.id);}).join('|'))).slice(0,32);
  const qsh=mockV3Sheet_('questions');
  const rows=questions.map(function(q,i){
    const t={readAloud:[35,40],repeatSentence:[0,15],describeImage:[25,40],retellLecture:[10,40],answerShortQuestion:[0,10],summarizeGroupDiscussion:[10,120],respondSituation:[10,40],summarizeWrittenText:[0,600],essay:[0,1200],summarizeSpoken:[0,600]};
    const limits=t[q.sourceTask]||[0,90];
    const snap=JSON.stringify(q);
    if(snap.length>45000)throw new Error('Question '+(i+1)+' exceeds Google Sheets cell limit');
    return [sessionId,i+1,String(q.sourceTask),String((TASKS[q.sourceTask]||{}).sheets?.[0]||''),String(q.id||''),snap,limits[0],limits[1]];
  });
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    // A second start from the same student/test must not create a duplicate.
    const existing=sessions.getDataRange().getValues().slice(1).filter(function(r){return String(r[1])===student&&String(r[2])===m.testId&&String(r[6])==='in_progress';}).pop();
    if(existing)return mockResumeV3_({studentId:student,sessionId:String(existing[0])});
    sessions.appendRow([sessionId,student,m.testId,now,now,new Date(now.getTime()+duration*1000),'in_progress',0,duration,digest,'']);
    if(rows.length)qsh.getRange(qsh.getLastRow()+1,1,rows.length,8).setValues(rows);
  }finally{lock.releaseLock();}
  return {ok:true,sessionId:sessionId,resumed:false,mock:selected.mock,answers:{},index:0,remaining:duration,started:true};
}
function mockResumeV3_(p){
  const student=cleanId_(p.studentId,'studentId');let id=String(p.sessionId||'');
  if(!id){const m=mockV3ModeSlot_(p),rows=mockV3Sheet_('sessions').getDataRange().getValues().slice(1);
    const latest=rows.filter(function(r){return String(r[1])===student&&String(r[2])===m.testId&&String(r[6])==='in_progress';}).pop();
    if(!latest)return {ok:true,found:false};id=String(latest[0]);}
  const session=mockV3Session_({sessionId:id,studentId:student});
  const v=session.values,questions=mockV3Questions_(id),duration=String(v[2]).startsWith('full')?129*60:50*60;
  const expires=v[5] instanceof Date?v[5].getTime():new Date(v[5]).getTime();
  const remaining=Math.max(0,Math.min(Number(v[8])||0,Math.ceil((expires-Date.now())/1000)));
  return {ok:true,found:true,sessionId:id,resumed:true,finished:String(v[6])==='completed',mock:{questions:questions,seed:id,durationSeconds:duration},answers:mockV3Answers_(id),index:Number(v[7])||0,remaining:remaining,started:true};
}
function mockCheckpointV3_(p){
  const st=mockV3Session_(p);if(String(st.values[6])!=='in_progress')return {ok:true,completed:true};
  const i=Math.max(0,Math.min(249,Math.floor(Number(p.index)||0))),seconds=Math.max(0,Math.min(10000,Math.floor(Number(p.remaining)||0)));
  const all=mockV3Questions_(st.id);if(i>=all.length)throw new Error('Invalid question position');
  let answers=typeof p.answers==='string'?JSON.parse(p.answers):p.answers;
  if(!answers||typeof answers!=='object'||Array.isArray(answers))throw new Error('Invalid answers object');
  const newRows=[];
  const sh=mockV3Sheet_('answers'),old=sh.getDataRange().getValues();
  const existing={};old.forEach(function(r,idx){if(idx>0&&String(r[0])===st.id)existing[Number(r[1])]=idx+1;});
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    Object.keys(answers).forEach(function(key){const idx=Number(key);if(!Number.isInteger(idx)||idx<0||idx>=all.length)return;
      const str=JSON.stringify(answers[key]);if(str.length>45000)throw new Error('Answer too long for Google Sheets');
      const row=[st.id,idx+1,String(all[idx].id||''),st.student,str,new Date(),'','','pending',''];
      if(existing[idx+1])sh.getRange(existing[idx+1],1,1,10).setValues([row]);else newRows.push(row);
    });
    if(newRows.length)sh.getRange(sh.getLastRow()+1,1,newRows.length,10).setValues(newRows);
    st.sh.getRange(st.row,5).setValue(new Date());st.sh.getRange(st.row,8,1,2).setValues([[i,seconds]]);
  }finally{lock.releaseLock();}
  return {ok:true,saved:true,sessionId:st.id};
}
function mockFinishV3_(p){
  const st=mockV3Session_(p);
  if(String(st.values[6])==='completed')return {ok:true,saved:true,duplicate:true};
  const checkpoint=mockCheckpointV3_(p);
  if(!checkpoint.ok)return checkpoint;
  // The client result is displayed as a PRACTICE estimate, not a trusted exam score.
  const attempt=typeof p.attempt==='string'?JSON.parse(p.attempt):p.attempt;
  if(!attempt||typeof attempt!=='object')throw new Error('Missing result');
  const count=mockV3Questions_(st.id).length;
  const details=Array.isArray(attempt.details)?attempt.details:[];
  if(details.length!==count)throw new Error('Result does not match frozen questions');
  const mode=String(st.values[2]).split('-')[0],earned=Math.max(0,Number(attempt.earned)||0),possible=Math.max(0,Number(attempt.possible)||0);
  if(!Number.isFinite(earned)||!Number.isFinite(possible)||earned>possible||possible>100000)throw new Error('Invalid score totals');
  const pct=possible?Math.round(earned/possible*100):'';
  const now=new Date(),results=mockV3Sheet_('results'),history=mockV3Sheet_('history');
  const records=history.getDataRange().getValues().slice(1).filter(function(r){return String(r[0])===st.student&&String(r[2])===st.values[2];});
  const prev=records.length?Number(records[records.length-1][4]):NaN;
  const change=Number.isFinite(prev)&&pct!==''?pct-prev:'';
  const out=JSON.stringify({scoringMethod:'client_practice_estimate',attempt:attempt});
  if(out.length>45000)throw new Error('Result data too large');
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    if(mockV3Find_(results,1,st.id))return {ok:true,saved:true,duplicate:true};
    results.appendRow([st.id,st.student,st.values[2],now,'','','','',pct,details.filter(function(d){return d.percentage!==null;}).length,details.filter(function(d){return d.percentage===null;}).length,out]);
    history.appendRow([st.student,st.id,st.values[2],now,pct,'','','','',records.length+1,change]);
    st.sh.getRange(st.row,5).setValue(now);st.sh.getRange(st.row,7).setValue('completed');st.sh.getRange(st.row,11).setValue(now);
  }finally{lock.releaseLock();}
  return {ok:true,saved:true,sessionId:st.id,objectivePercent:pct};
}

function mockAbandonV3_(p){
  const student=cleanId_(p.studentId,'studentId');
  const sh=mockV3Sheet_('sessions');
  const sessionId=String(p.sessionId||'').trim();
  const matching=[];
  if(sessionId){
    const row=mockV3Find_(sh,1,sessionId);
    if(row){
      const record=sh.getRange(row,1,1,11).getValues()[0];
      if(String(record[1])!==student)throw new Error('Not authorized for this mock session');
      matching.push(row);
    }
  }
  // A stale session ID must not block starting another test. Clear only the
  // authenticated student's active attempt for the explicitly selected test.
  if(p.mode && (p.test||p.slot)){
    const mode=mockV3ModeSlot_(p),rows=sh.getDataRange().getValues();
    rows.forEach(function(r,i){
      if(i>0&&String(r[1])===student&&String(r[2])===mode.testId&&String(r[6])==='in_progress')matching.push(i+1);
    });
  }
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    Array.from(new Set(matching)).forEach(function(row){
      if(String(sh.getRange(row,7).getValue())==='in_progress'){
        sh.getRange(row,7).setValue('abandoned');
        sh.getRange(row,5).setValue(new Date());
      }
    });
  }finally{lock.releaseLock();}
  return {ok:true,abandoned:matching.length,alreadyUnavailable:matching.length===0};
}
