import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
const require = createRequire(import.meta.url);
const source = dirname(require.resolve('@mediapipe/pose/package.json'));
const output = new URL('../public/pose/', import.meta.url);
await mkdir(output, { recursive: true });
const files = [
  'pose.js',
  'pose_web.binarypb',
  'pose_landmark_lite.tflite',
  'pose_solution_packed_assets_loader.js',
  'pose_solution_packed_assets.data',
  'pose_solution_simd_wasm_bin.js',
  'pose_solution_simd_wasm_bin.wasm',
  'pose_solution_simd_wasm_bin.data',
  'pose_solution_wasm_bin.js',
  'pose_solution_wasm_bin.wasm',
];
await Promise.all(files.map((f) => copyFile(join(source, f), new URL(f, output))));
await writeFile(
  new URL('NOTICE.txt', output),
  'MediaPipe Pose, Google. Apache License 2.0.\nhttps://github.com/google-ai-edge/mediapipe\nhttps://www.apache.org/licenses/LICENSE-2.0\nVersion 0.5.1675469404; copied unchanged from the integrity-checked npm package.\n',
);
await copyFile(
  new URL('../public/mediapipe-license.txt', import.meta.url),
  new URL('LICENSE.txt', output),
);
console.log(
  'Prepared local MediaPipe Pose runtime and lite model. No external runtime download needed.',
);
