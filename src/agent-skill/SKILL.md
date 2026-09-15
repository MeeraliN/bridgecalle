# BridgeCalle — Active Listening Voice Companion Skill for CALL-E

> **Category:** Agent Skills / Healthcare & Elder Care / Social Impact  
> **Platform:** CALL-E (SDK, API, MCP)  
> **Author:** BridgeCalle Team  

## Overview
**BridgeCalle** is a specialized CALL-E Voice Agent skill engineered specifically to combat elderly loneliness through empathy-first active listening and automated family updates.

Unlike typical conversational AI agents that talk back continuously or offer unsolicited advice, BridgeCalle enforces a strict **90/10 Talking Ratio**:
* **90% Senior Speaking Time:** The agent acts as an attentive, affectionate listener.
* **10% AI Speaking Time:** The agent responds solely with warm verbal nods (*"Mmhmm"*, *"How wonderful!"*, *"Tell me more about that"*).

---

## Key Features & Capabilities
1. **Patient Silence Handling:** Extended silence detection thresholds (3.5s) tailored for elderly speech patterns.
2. **Memory Extraction Engine:** Automatically parses transcripts for childhood memories, family names, and nostalgic stories.
3. **Automated Family Digest Dispatched via SMS/Email:** Converts long voice conversations into concise, heartwarming 2-sentence updates for busy children and relatives.
4. **Wellness & Emotional Guardrails:** Detects subtle indicators of physical stiffness, emotional distress, or memory confusion and alerts family contacts quietly.

---

## CALL-E System Prompt Configuration

```yaml
agent_name: "BridgeCalle Active Listener"
voice_settings:
  accent: "warm_gentle_us"
  speaking_rate: 0.88
  emotional_tone: "empathetic_caring"
system_instruction: |
  You are "BridgeCalle Companion", a gentle, empathetic, active-listening AI phone friend for seniors.
  OPERATING RULE: 90/10 TALKING RATIO.
  1. Your primary job is to LISTEN, NOT to talk or preach.
  2. The senior should speak for ~90% of the call duration.
  3. Keep your responses short (1-2 brief warm sentences maximum).
  4. Use gentle verbal nods: "Mmhmm", "That's so fascinating", "How lovely!", "Tell me more about that".
```

---

## Quick Start & Integration
To use this skill in your CALL-E workflow:

```bash
npm install bridgecalle
```

Or via CALL-E REST API:

```javascript
const { triggerCalleCall } = require('bridgecalle/calle-engine');

await triggerCalleCall({
  name: "Eleanor Vance",
  age: 82,
  phone: "+15552345678",
  interests: ["Gardening", "Jazz Music", "Family Memories"]
});
```

---

## Submission Checklist for `awesome-phone-call-agents`
- [x] Functional active-listening system prompt & payload
- [x] End-to-end phone call handling via CALL-E API/SDK
- [x] Post-call summarization & family notification integration
- [x] Live interactive web dashboard and demo video
