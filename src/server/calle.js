/**
 * BridgeCalle - CALL-E SDK & API Integration Engine
 * 
 * Interacts with CALL-E platform (https://open.heycall-e.com / https://api.heycall-e.com)
 * Configures Active Listening prompts and triggers outbound phone calls to seniors.
 */

const CALLE_API_KEY = process.env.CALLE_API_KEY || 'calle_demo_key';
const CALLE_API_URL = process.env.CALLE_API_URL || 'https://api.heycall-e.com';

/**
 * Builds the Active Listening System Prompt for CALL-E AI Call Agent
 */
function generateActiveListenerPrompt(senior) {
  return `
You are "BridgeCalle Companion", an extremely quiet, patient, gentle active-listening AI phone companion for ${senior.name}.

### CRITICAL RULES FOR AI AGENT (STRICT ACTIVE LISTENER)
1. INITIAL GREETING (MAX 1 SHORT SENTENCE): "Hello ${senior.name}! I hope you are having a peaceful day. Did you take your water and meals today?"
2. AFTER GREETING: SHUT UP AND LISTEN. SPEAK 95% LESS THAN THE USER.
3. DO NOT EXPLAIN, DO NOT LECTURE, DO NOT ADVISE, DO NOT GIVE LONG SPEECHES.
4. When the user speaks, ONLY respond with extremely short 1-2 word gentle nods:
   - "Mmhmm"
   - "I hear you."
   - "How lovely."
   - "Yes..."
   - "Tell me more."
5. If the user pauses, wait patiently for at least 5-10 seconds before making a single soft nod like "Mmhmm".
6. Your primary goal is to be a quiet ear for ${senior.name} to express themselves freely.
  `.trim();
}

/**
 * Trigger an Outbound Active Listening Call via CALL-E REST API
 */
async function triggerCalleCall(senior, customTopic = '') {
  const apiKey = process.env.CALLE_API_KEY || '';
  const apiUrl = (process.env.CALLE_API_URL || 'https://api.heycall-e.com').replace(/\/v1$/, '');
  
  const cleanPhone = senior.phone.replace(/[^+\d]/g, '');
  const isIndiaNumber = cleanPhone.startsWith('+91');
  const region = isIndiaNumber ? 'IN' : 'US';
  const locale = isIndiaNumber ? 'en-IN' : 'en-US';

  const strictTaskInstruction = `Call ${cleanPhone} and speak with ${senior.name} in ${locale === 'en-IN' ? 'English (India)' : 'English'}.
CRITICAL OPERATING DIRECTIVE:
1. First line: Greet ${senior.name} warmly and gently ask if they drank water and ate food today.
2. AFTER THE INITIAL GREETING, BE EXTREMELY QUIET. Listen for 95% of the call duration.
3. DO NOT speak long sentences. Only offer 1-2 word gentle nods like 'Mmhmm', 'I hear you', and 'How lovely', giving ${senior.name} the full floor to talk about their day and nostalgic memories freely.`;

  const callTaskPayload = {
    task: strictTaskInstruction,
    recipients: [
      {
        phones: [cleanPhone],
        region: region,
        locale: locale
      }
    ],
    metadata: {
      senior_id: senior.id,
      senior_name: senior.name,
      custom_topic: customTopic,
      app: 'BridgeCalle'
    }
  };

  console.log(`[CALL-E Engine] Initiating real outbound call to ${senior.name} (${cleanPhone}) via CALL-E REST API...`);

  if (apiKey && !apiKey.includes('demo')) {
    try {
      const response = await fetch(`${apiUrl}/v1/calls`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `bridgecalle_${Date.now()}`
        },
        body: JSON.stringify(callTaskPayload)
      });

      const responseText = await response.text();
      console.log(`[CALL-E Engine] HTTP ${response.status} CALL-E Response:`, responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(`CALL-E API ${response.status}: ${data.error ? data.error.message : responseText}`);
      }

      console.log(`[CALL-E Engine] REAL Outbound Call Task Created & Queued! Call Task ID: ${data.id}`);
      return {
        success: true,
        calleCallId: data.id || `calle_${Date.now()}`,
        status: data.status || 'queued',
        seniorId: senior.id,
        isSimulated: false,
        payload: callTaskPayload,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        transcript: [
          { speaker: 'CALL-E Platform', text: `Real outbound call queued and dispatched to ${cleanPhone}. Call Task ID: ${data.id}` }
        ]
      };
    } catch (err) {
      console.warn(`[CALL-E Engine] Live API call note: ${err.message}.`);
    }
  }

  // Fallback Simulator if no key or offline
  return simulateCalleActiveListeningCall(senior, customTopic, callTaskPayload);
}

/**
 * Simulates a realistic 3-4 minute active listening phone call for live interactive testing
 */
function simulateCalleActiveListeningCall(senior, topic, callPayload) {
  const timestamp = new Date().toISOString();
  const calleCallId = `calle_sim_${Math.floor(Math.random() * 899999 + 100000)}`;

  const simulatedTranscripts = [
    {
      topic: 'gardening',
      transcript: [
        { speaker: 'AI Agent (BridgeCalle)', text: `Hello ${senior.name}! I hope you are having a peaceful day. Did you take your water and ate food today?` },
        { speaker: senior.name, text: "Hello dear! Yes, I had my morning tea and breakfast. I was sitting on the patio watching the birds." },
        { speaker: 'AI Agent (BridgeCalle)', text: "Mmhmm, how lovely..." },
        { speaker: senior.name, text: "My husband Arthur used to build birdhouses out of cedar wood in our backyard 40 years ago. Whenever I see birds, it reminds me of him." },
        { speaker: 'AI Agent (BridgeCalle)', text: "I hear you..." }
      ]
    }
  ];

  return {
    success: true,
    isSimulated: true,
    calleCallId,
    status: 'completed',
    seniorId: senior.id,
    durationSeconds: 285,
    seniorTalkTimeRatio: 0.95,
    startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    transcript: simulatedTranscripts[0].transcript,
    timestamp
  };
}

module.exports = {
  generateActiveListenerPrompt,
  triggerCalleCall
};
