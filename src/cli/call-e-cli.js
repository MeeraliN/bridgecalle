#!/usr/bin/env node

/**
 * BridgeCalle CLI Tool
 * Command-line interface for triggering CALL-E active listening phone calls.
 */

const { triggerCalleCall } = require('../server/calle');
const storage = require('../server/storage');

async function main() {
  const args = process.argv.slice(2);
  const topic = args[0] || 'gardening';

  console.log(`
===========================================================
  📞 BridgeCalle CLI — CALL-E Outbound Call Trigger
===========================================================
  Triggering Active Listening Call [Topic: ${topic}]...
  `);

  const senior = storage.getSeniors()[0];
  const result = await triggerCalleCall(senior, topic);

  console.log('✅ Call Dispatched Successfully via CALL-E!');
  console.log(`   Call ID: ${result.calleCallId}`);
  console.log(`   Senior: ${senior.name} (${senior.phone})`);
  console.log(`   Status: ${result.status}`);
}

main().catch(err => {
  console.error('❌ CLI Error:', err.message);
  process.exit(1);
});
