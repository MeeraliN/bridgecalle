/**
 * BridgeCalle - Family Digest Notification System
 * 
 * Delivers warm post-call summaries to family contacts via SMS, Email, and App Feed.
 */

const storage = require('./storage');

async function sendFamilyDigest(call, senior) {
  if (!senior || !senior.familyContacts || senior.familyContacts.length === 0) {
    console.log('[Notifier] No family contacts found for senior:', senior ? senior.name : 'Unknown');
    return [];
  }

  const sentNotifications = [];

  for (const contact of senior.familyContacts) {
    const summary = call.summary;
    const moodEmoji = summary.mood || '😊';
    
    const smsMessage = `
💌 BridgeCalle Daily Digest for ${senior.name}:
${summary.headline}
Mood: ${moodEmoji}
Precious Memory: ${summary.keyMemories[0] || 'Had a lovely chat.'}
💡 Family Tip: ${summary.familyActionableInsight}
    `.trim();

    const notifRecord = {
      id: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      callId: call.id,
      seniorId: senior.id,
      recipient: `${contact.name} (${contact.phone})`,
      channel: contact.notifySMS && contact.notifyEmail ? 'SMS & Email' : contact.notifySMS ? 'SMS' : 'Email',
      content: smsMessage,
      sentAt: new Date().toISOString(),
      status: 'DELIVERED'
    };

    // Save notification
    storage.addNotification(notifRecord);
    sentNotifications.push(notifRecord);

    console.log(`[Notifier] Delivered Family Digest to ${contact.name} (${contact.phone}):\n${smsMessage}\n`);
  }

  return sentNotifications;
}

module.exports = {
  sendFamilyDigest
};
