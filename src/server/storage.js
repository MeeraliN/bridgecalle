const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', '..', 'data', 'bridgecalle_db.json');

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial seed database
const initialData = {
  seniors: [
    {
      id: 'sen_001',
      name: 'Eleanor Vance',
      age: 82,
      phone: '+1 (555) 234-5678',
      preferredTime: '10:30 AM',
      interests: ['Gardening', '1960s Classic Jazz', 'Baking Apple Pie', 'Grandchildren Stories'],
      familyContacts: [
        {
          name: 'Sarah Vance (Daughter)',
          relation: 'Daughter',
          phone: '+1 (555) 987-6543',
          email: 'sarah.vance@example.com',
          notifySMS: true,
          notifyEmail: true
        }
      ],
      healthNotes: 'Slight arthritis, very cheerful, loves telling stories about her trip to Italy in 1972.'
    },
    {
      id: 'sen_002',
      name: 'Ramesh Patel',
      age: 78,
      phone: '+919265408610',
      language: 'English (India) / en-IN',
      preferredTime: '05:00 PM',
      interests: ['Indian Classical Music', 'Cricket Memories', 'Morning Walks in Park', 'Family Festival Stories'],
      familyContacts: [
        {
          name: 'Priya Patel (Daughter)',
          relation: 'Daughter',
          phone: '+919327312286',
          email: 'priya.patel@example.com',
          notifySMS: true,
          notifyEmail: true
        }
      ],
      healthNotes: 'Enjoys evening tea, loves talking about 1983 Cricket World Cup and old family gatherings.'
    }
  ],
  calls: [
    {
      id: 'call_101',
      seniorId: 'sen_001',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      durationSeconds: 412,
      seniorTalkTimeRatio: 0.92, // 92% senior talking, 8% AI gentle listening
      status: 'completed',
      calleCallId: 'calle_ref_9823412',
      transcript: [
        { speaker: 'AI Agent (BridgeCalle)', text: 'Hello Eleanor! How are you doing on this beautiful morning?' },
        { speaker: 'Eleanor', text: 'Oh hello dear! I was just sitting by my garden window watching the sparrows. My yellow roses are finally blooming after all that rain we had on Tuesday!' },
        { speaker: 'AI Agent (BridgeCalle)', text: 'That sounds delightful! Tell me more about your roses.' },
        { speaker: 'Eleanor', text: 'Well, my mother taught me how to prune rose bushes back in 1958 in Ohio. I remember using bone meal and coffee grounds. Today I clipped three stems to put in a vase for the dining table. Sarah used to help me with them when she was a little girl.' },
        { speaker: 'AI Agent (BridgeCalle)', text: 'What a sweet memory of Sarah. How did the roses look in the dining room?' },
        { speaker: 'Eleanor', text: 'They brighten up the whole room! I made a nice cup of chamomile tea after that. My knees ache a tiny bit from bending over, but sitting down helped. I hope Sarah has time to visit this weekend.' },
        { speaker: 'AI Agent (BridgeCalle)', text: 'I am so glad you enjoyed your morning in the garden, Eleanor. I will make sure Sarah gets your warm thoughts!' }
      ],
      summary: {
        headline: 'Eleanor enjoyed morning rose gardening & recalled childhood memories with Sarah.',
        mood: 'Upbeat & Nostalgic 😊',
        sentimentScore: 0.88,
        keyMemories: [
          'Pruned yellow roses blooming in her window garden.',
          'Remembered her mother teaching her rose gardening back in 1958 Ohio.',
          'Recalled daughter Sarah helping with rose bushes as a young girl.'
        ],
        healthAndWellness: {
          physicalNote: 'Mild knee discomfort after gardening, rested with chamomile tea.',
          emotionalState: 'Warm, missing Sarah, hoping for a weekend visit.',
          alertLevel: 'LOW'
        },
        familyActionableInsight: 'Consider dropping by or sending a text about weekend visit plans!'
      },
      familyDigestSent: true,
      deliveredAt: new Date(Date.now() - 86000000).toISOString()
    }
  ],
  notifications: [
    {
      id: 'notif_001',
      callId: 'call_101',
      recipient: 'Sarah Vance (+1 555-987-6543)',
      channel: 'SMS & Email',
      content: '💌 BridgeCalle Update for Eleanor (Today, 10:30 AM):\nEleanor was in high spirits reminiscing about gardening with you! She harvested yellow roses today. Mild knee stiffness, resting well. Mood: Upbeat (88%).',
      sentAt: new Date(Date.now() - 86000000).toISOString(),
      status: 'DELIVERED'
    }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading BridgeCalle DB:', err);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing BridgeCalle DB:', err);
  }
}

module.exports = {
  getSeniors: () => readDb().seniors,
  getSeniorById: (id) => readDb().seniors.find(s => s.id === id),
  saveSenior: (senior) => {
    const db = readDb();
    const index = db.seniors.findIndex(s => s.id === senior.id);
    if (index >= 0) {
      db.seniors[index] = senior;
    } else {
      senior.id = senior.id || `sen_${Date.now()}`;
      db.seniors.push(senior);
    }
    writeDb(db);
    return senior;
  },
  getCalls: () => readDb().calls,
  getCallsForSenior: (seniorId) => readDb().calls.filter(c => c.seniorId === seniorId),
  getCallById: (id) => readDb().calls.find(c => c.id === id),
  saveCall: (call) => {
    const db = readDb();
    const index = db.calls.findIndex(c => c.id === call.id);
    if (index >= 0) {
      db.calls[index] = call;
    } else {
      call.id = call.id || `call_${Date.now()}`;
      db.calls.unshift(call); // newest first
    }
    writeDb(db);
    return call;
  },
  getNotifications: () => readDb().notifications,
  addNotification: (notif) => {
    const db = readDb();
    notif.id = notif.id || `notif_${Date.now()}`;
    db.notifications.unshift(notif);
    writeDb(db);
    return notif;
  }
};
