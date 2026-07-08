/**
 * Regenera la demo de voz natural (Python + edge-tts SSML).
 * Uso: node scripts/generate-voice-demo.mjs
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const py = path.join(path.dirname(fileURLToPath(import.meta.url)), 'generate-voice-demo.py');
const r = spawnSync('python', [py], { stdio: 'inherit', shell: true });
process.exit(r.status ?? 1);
