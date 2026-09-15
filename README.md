# 📞 BridgeCalle

> **Active-Listening Voice Companion for Seniors & Automated Family Digest System**  
> Built for the **CALL-E: Your Code Is Calling** Hackathon 2026

[![Demo Video](https://img.shields.io/badge/YouTube-Watch%20Demo%20Video-red?style=for-the-badge&logo=youtube)](https://youtu.be/L7YI09l1_S0)
[![Live Demo](https://img.shields.io/badge/Live%20Web%20App-https%3A%2F%2Fmeeralin.github.io%2Fbridgecalle%2F-emerald?style=for-the-badge&logo=github)](https://meeralin.github.io/bridgecalle/)
[![Powered By CALL-E](https://img.shields.io/badge/Powered%20By-CALL--E%20API%20%26%20SDK-6366f1?style=for-the-badge)](https://open.heycall-e.com)
[![Devpost Hackathon](https://img.shields.io/badge/Hackathon-Devpost%20CALL--E-f59e0b?style=for-the-badge)](https://call-e.devpost.com)

---

## 🎬 Demonstration Video & Live App

### ▶️ **[Watch the 3-Minute Demonstration Video on YouTube (youtu.be/L7YI09l1_S0)](https://youtu.be/L7YI09l1_S0)**
### 🌐 **[Open BridgeCalle Live Web App (meeralin.github.io/bridgecalle)](https://meeralin.github.io/bridgecalle/)**

> **How Anyone Can Test:**
> 1. Click the live web link above on your **Mobile, Tablet, or PC**.
> 2. Add or edit any elderly person using the **`+` button** at the top or the **✏️ pencil icon**.
> 3. **Tap anywhere on the photo, name, or card** to immediately dispatch a CALL-E AI phone call!
> 4. **Click the Person's Name** or top **📋 Summary Icon** to view call digests and **💬 Share to WhatsApp**!

---

## 💡 The Inspiration & Problem Space

Over **70 Million seniors worldwide** experience chronic loneliness and social isolation. Many seniors may be non-literate or struggle with complex smartphone menus, making dialing or navigating messaging apps difficult.

Existing AI voice agents fail seniors because **they talk too much**, interrupting, lecturing, or offering unsolicited advice.

**BridgeCalle** flips the script:
> An experimental prompt-guided active-listening phone companion powered by CALL-E that instructs the AI agent to listen quietly and minimize speaking duration, letting seniors speak freely. Designed with a **photo-first 1-tap card layout** so even illiterate users can simply tap a familiar picture to receive a phone call! (Note: Active-listening turn ratios are prompt-guided system instruction directives, subject to provider model adherence.)

---

## ✨ Key Senior Accessibility & Product Features

### 1. 🖼️ Big Photo & Tap Anywhere Dialing
* Each person card displays a **Big Picture at the top**, followed by a **Small Name** and **Phone Number below the picture**.
* **Illiterate-Friendly Usability:** Clicking or tapping anywhere on the card/photo instantly triggers the CALL-E phone call!
* **✏️ Pencil Icon:** Small, non-intrusive pencil icon on the top right for editing details or uploading custom photos.

### 2. 📋 Top Summary Icon & Click Name to View Summary
* Top header features a **📋 Summary Icon** right next to the **`+` Plus Button**.
* **Click Any Person's Name** to open their specific call summary modal window.

### 3. 💬 Presaved WhatsApp Export
* Configure a **Presaved Family WhatsApp Number** for each person in the edit modal.
* **1-Tap WhatsApp Share:** Export call summaries and mood digests directly to family WhatsApp chats via `https://wa.me/` integration!

### 4. ➕ Auto-Adapting Grid Layout
* Plus **`+`** button at the top header to easily add new family members.
* **Smart Auto-Layout**:
  - **1 Person:** Single clean hero card.
  - **2-3 Persons:** Clean vertical stack.
  - **4+ Persons:** Dual stack (2x2 side-by-side grid) for quick browsing.

---

## 🏆 Devpost Judging Criteria Alignment

### 🎯 1. Real World Impact
* **Target Problem:** Solves senior loneliness, non-literate phone usability barriers, and family caregiver strain through real phone calls.
* **Credible Solution:** Enables non-tech-savvy or non-literate seniors to receive comforting voice companion calls by tapping a photo, while family members receive automated post-call digests via SMS and WhatsApp.

### 💡 2. Quality of the Idea
* **Non-Obvious Approach:** Flips the traditional AI paradigm. Instead of an AI that talks at you, BridgeCalle uses CALL-E to build an AI that **listens to you**, paired with picture-based 1-tap dialing and WhatsApp export.
* **Reusable Agent Skill:** Includes a fully modular CALL-E Agent Skill package (`src/agent-skill/`) reusable by developers building healthcare, wellness, or senior care voice bots.

### 🛠️ 3. Technical Implementation
* **Live Runtime CALL-E Execution:** Uses CALL-E's REST API (`POST /v1/calls`) at runtime—actually placing real phone calls to real users.
* **Full Multi-Modal CALL-E Coverage:**
  1. **CALL-E REST API & SDK (`src/server/calle.js`)**: Real outbound dialing with task prompts and locale settings.
  2. **CALL-E MCP (`bridgecalle-mcp.json`)**: Streamable HTTP Model Context Protocol integration.
  3. **CALL-E CLI (`src/cli/call-e-cli.js`)**: Command-line tool to trigger calls (`npm run call-e:cli`).
  4. **CALL-E Agent SKILL (`src/agent-skill/`)**: Pre-formatted `SKILL.md` and schema for the CALL-E ecosystem.
* **Locale & Accent Adaptation:** Automatically detects country codes (e.g. `en-IN` for `+91` India, `en-US` for `+1` US) and applies gentle voice settings.

### 📱 4. Product Experience & Demo
* **Complete Coherent Experience:** Live web application deployed on GitHub Pages with instant 1-tap photo call dispatching, grid layouts, avatar photo upload, persistent memory storage, WhatsApp sharing, and real-time status banners.
* **Cross-Device Ready:** Perfectly responsive on smartphones, tablets, and desktop computers.

---

## 🛠️ Architecture & Tech Stack

```
   ┌──────────────────────┐         ┌─────────────────────────┐
   │    Senior Citizen    │ ◄─────► │   CALL-E Voice Platform │
   │  (+91 9265408610)    │  Voice  │ (SDK / API / MCP Engine)│
   └──────────────────────┘         └────────────┬────────────┘
                                                 │ Call Transcript
                                                 ▼
   ┌──────────────────────────────────────────────────────────┐
   │                     BridgeCalle Core                     │
   │  ┌──────────────────────┐    ┌────────────────────────┐  │
   │  │ Express REST Server  │    │ AI Transcript Processor│  │
   │  └──────────────────────┘    └────────────────────────┘  │
   └─────────────────────────────┬────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
   ┌───────────────────────────┐   ┌───────────────────────────┐
   │ Live Senior Web App       │   │ Family WhatsApp Digest    │
   │ (GitHub Pages / Express)  │   │ (Delivered to Loved Ones) │
   └───────────────────────────┘   └───────────────────────────┘
```

---

<p align="center">BridgeCalle — Connecting generations through the power of active listening voice AI. 👵☎️❤️</p>
