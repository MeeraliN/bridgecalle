# CALL-E Technical Integration Architecture — BridgeCalle

> Submitted for **CALL-E: Your Code Is Calling** Hackathon 2026

## 1. How BridgeCalle Uses CALL-E

BridgeCalle leverages CALL-E's outbound voice API, SDK, and prompt engine to deliver a specialized active listening agent tailored for elderly conversation.

```
+------------------+         +------------------+         +-----------------------+
| Senior Phone     | <-----> | CALL-E AI Agent  | <-----> | BridgeCalle Core      |
| (+1 555-234-5678)|  Voice  | Engine & Voice   |  SDK/   | Express + Summarizer  |
+------------------+         +------------------+  API    +-----------------------+
                                                                      |
                                                                      v
                                                          +-----------------------+
                                                          | Family SMS/Email      |
                                                          | Daily Digest Feed     |
                                                          +-----------------------+
```

---

## 2. CALL-E API & SDK Endpoint Specifications

### Outbound Call Initialization
* **URL:** `POST https://api.heycall-e.com/v1/calls/outbound`
* **Authorization:** `Bearer CALLE_API_KEY`
* **Payload Structure:**

```json
{
  "phone_number": "+15552345678",
  "agent_name": "BridgeCalle Active Listener",
  "voice_settings": {
    "accent": "warm_gentle_us",
    "speaking_rate": 0.88,
    "emotional_tone": "empathetic_caring"
  },
  "system_instruction": "You are 'BridgeCalle Companion'. 90% LISTEN, 10% SPEAK. Use gentle verbal nods: 'Mmhmm', 'How lovely!', 'Tell me more'.",
  "initial_greeting": "Hello Eleanor! How are you doing today?",
  "call_options": {
    "max_duration_seconds": 600,
    "silence_detection_threshold_ms": 3500,
    "enable_transcript_logging": true,
    "enable_sentiment_analysis": true
  }
}
```

---

## 3. Key Innovations in CALL-E Prompting

### Active Listening 90/10 Rule
Standard LLMs tend to over-explain and interrupt. BridgeCalle configures CALL-E's agent with explicit low-turn rules:
1. Max 1-2 sentence responses per turn.
2. High empathy verbal nods (`"Mmhmm"`, `"That's so lovely"`, `"Tell me more"`).
3. Patient silence threshold (3,500ms) to accommodate senior pause intervals.

### Post-Call Digest Pipeline
Once CALL-E returns the full call transcript and audio metrics:
1. **Summary Engine:** Extracts key memories (e.g. childhood garden, vinyl records, family stories).
2. **Sentiment & Health Check:** Monitors for physical complaints or distress.
3. **Family Dispatcher:** Generates and delivers SMS / Email digests to loved ones.
