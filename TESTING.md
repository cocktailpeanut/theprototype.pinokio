# Validation record

## Production launcher - Windows passed, 2026-10-14

Implementation: local-only commit `5fd5d6a444b301634e795cc5ea46ab5738271f63`, based on `80e601c8819d6a5329a339580a5b90e3d20cdd39`. No production change was pushed. The owner confirmed publishing the GitHub repository publicly; its visibility was left public.

Actual installed Pinokio 8.2.2 executed `pterm run C:\pinokio\api\theprototype.pinokio` for Install, `pterm start C:\pinokio\api\theprototype.pinokio\update.js` for Update, then `pterm run C:\pinokio\api\theprototype.pinokio` for Start. All passed. Install reused the existing upstream checkout to preserve data; Reset was not run. Update built the same upstream commit `21c1ece16e70f036abce32adacc097d19efda781` (1.33.0); its working tree remains clean.

Start executed root **npm start**, serving `app/build/` with pinned `serve@14.2.6`. The OS allocated port 55324. Pinokio reported online/ready at `http://127.0.0.1:55324`; Windows `Get-NetTCPConnection` verified the listener bound only to **127.0.0.1**, process 9944. The server's printed Network URL is not proof of binding; the actual socket was checked.

Pinned `compression@1.8.2` overrides serve's affected 1.8.1 dependency, fixing GHSA-vc2v-76pw-4v95. Root npm audit reports **zero vulnerabilities** after this patch. Upstream dependencies were unchanged and retain the previously recorded 14 audit findings.

Focused UI test: existing Edge 155.0.4283.45, headless Playwright, 1440x900, `C:\pinokio\bin\miniforge\node.exe production-smoke.cjs`. Only upstream's opt-in debug diagnostics were seeded; creation, editing, saving, loading and exporting used official visible UI controls.

- `/`, `/kit`, `/export-manifest.json` and `/version.json` returned HTTP 200. `/@vite/client` returned 404. The build manifest contains 571 files and 19,327,738 bytes.
- Added Cube, renamed it **Pinokio Production Cube**, set X=2 and Y scale=1.5, then saved a `.tpscene`.
- Loaded the file in a fresh browser context and re-exported it. The complete object JSON was identical.
- Used official **Export > itch.io > Build & download zip**. The generated `pinokio-production-smoke-itch.zip` has 575 files, 7,801,998 compressed bytes and 18.64 MB extracted. Upstream `scripts/check-export.cjs --preset itch` passed.
- Extracted the game ZIP locally and served it on a second loopback origin using the same pinned static server. It booted into **Play**, loaded the Cube, hid editor chrome, displayed the attribution badge, and made no external requests. This verifies a simple exported scene, not a complex authored game.
- No browser page errors occurred. The upstream export checker warned that `play.js` contains ignored key `gameId`; this was preserved and did not block validation.

Evidence: [loaded scene](evidence/windows-production/02-reloaded.png), [export result](evidence/windows-production/04-export-complete.png), [exported Play mode](evidence/windows-production/05-exported-game.png), [structured results](evidence/windows-production/result.json), and [server audit](evidence/windows-production/server-audit.json). The exported game ZIP remains local at `C:\Users\Shadow\Documents\codex\2026-10-14\task\evidence\windows-production\game-itch.zip`.

Production Mac/Linux validation remains pending. AI/model calls, collaboration, VR and voice were not tested. No model, credential, certificate or OS trust changes were made.

## Windows - passed, 2026-10-14

Launcher implementation tested: `0a114b0b3cbd3dbf0298fb33197b5850ee5d20c5`.
Upstream: `21c1ece16e70f036abce32adacc097d19efda781` (`theprototype.app` 1.33.0).
Final report commit adds evidence and corrects documentation; install/start/update/reset scripts are unchanged. The unverified `confirm` menu field was removed; Reset's data-loss warning is in README.

The launcher was executed by **the real installed Pinokio engine through pterm**, not a replacement install/start harness. Editor interaction used **Playwright driving existing Microsoft Edge**, headless, against that Pinokio-started localhost server. Pinokio desktop GUI clicks were not independently automated: the browser automation runtime could not initialize (`MXC launcher: cannot locate required Windows platform directory`, HRESULT 0x80070003). `pterm open` succeeded and selected the system-browser fallback.

Environment:

- Microsoft Windows 11 Home, 10.0.26200.9457, x64; Shadow Computer.
- AMD EPYC 7543P, 4 visible cores / 8 logical processors; 30,044,250,112 bytes RAM.
- NVIDIA RTX A4500 (driver 32.0.15.9686), plus Red Hat QXL virtual display.
- Pinokio 8.2.2; script schema 8.0.0; managed Node 24.18.0; npm 11.16.0.
- Microsoft Edge 155.0.4283.45, 1440x900 test viewport.
- Launcher folder: `C:\pinokio\api\theprototype.pinokio`.
- Evidence scripts/folder: `C:\Users\Shadow\Documents\codex\2026-10-14\task`.

### Commands actually executed

```powershell
# pterm resolves to C:\pinokio\bin\npm\pterm.cmd
pterm version pinokio
pterm version script
pterm which node
pterm home

# Empty private launcher checkout; app/ and node_modules did not exist.
pterm run C:\pinokio\api\theprototype.pinokio
# Pinokio install.js: git clone https://github.com/theprototype-app/core.git app
# Pinokio install.js in app/: node --version; npm install
# Installed 339 packages and audited 340 in approximately 1 minute; exit success.

pterm run C:\pinokio\api\theprototype.pinokio
# Pinokio start.js in app/: npm run dev -- --host 127.0.0.1
# Vite ready in 37053 ms; local.set captured http://127.0.0.1:5173.
pterm status theprototype.pinokio --probe --timeout=5000
# online, running=true, ready=true, probe=true, last_error=null.
pterm open http://127.0.0.1:5173
# success=true, surface_used=browser.

# Existing Edge engine, upstream's installed Playwright package; no new browser install.
C:\pinokio\bin\miniforge\node.exe smoke-editor.cjs
C:\pinokio\bin\miniforge\node.exe reload-editor.cjs

git -C C:\pinokio\api\theprototype.pinokio\app rev-parse HEAD
git -C C:\pinokio\api\theprototype.pinokio\app status --porcelain
# Exact upstream commit above; clean working tree after installation and UI tests.
```

### UI checks actually passed

1. Opened the official Add menu, hovered Add > Mesh, and clicked **Cube**; a BoxGeometry rendered in the 3D viewport.
2. Opened Objects with O, hovered the object row, and clicked Properties. Renamed it **Pinokio Windows Cube**, set Position X to **2**, and Scale Y to **1.5**, using visible inputs.
3. Opened the official menu and Save options, chose Scene, and saved a **.tpscene** (4345 bytes).
4. Created a fresh browser context with empty scene/storage; dismissed the first-visit welcome UI; clicked official Load and selected the saved file.
5. Verified the restored name, X=2, and Y scale=1.5 in visible Properties controls. The UI reported **Session loaded: Scene export (1 objects)**.
6. Re-exported through the official save controls. Independently unzipped both scene files and asserted identical object count (1), name, full transform matrix, geometry and material data. Both files are 4345 bytes. No browser page errors occurred during the successful edit/save/load test.

Only `debugStores=true` was seeded for upstream's existing test diagnostics. Scene creation/editing/save/load all went through UI controls; no scene was inserted or mutated through internal stores.

Evidence: [modified object](evidence/windows/editor-modified.png), [loaded scene](evidence/windows/editor-reloaded.png), [structured result](evidence/windows/windows-result.json), [saved scene](evidence/windows/windows-smoke.tpscene), [re-export](evidence/windows/windows-reloaded.tpscene), [install output](evidence/windows/install-log.txt), [start excerpt](evidence/windows/start-log-excerpt.txt).

### Errors and corrections

- The first viewport screenshot was white while the dev client initialized; subsequent interaction rendered the grid and Cube. No source change was needed.
- The first test used **Box** as a menu label; current UI calls it **Cube**. Corrected the test selector.
- Properties controls are hover-revealed; corrected the test to hover the object row.
- Fresh-context loading initially hit the welcome backdrop; corrected the test to click Start building first.
- Vite emitted a JSON-import/config-loader warning, Svelte deprecation/accessibility warnings, and SSR `window is not defined` warnings for escape/minigolf/targettoss modules. These were preserved upstream; desktop scene editing still passed.
- Localhost attempts `wss://localhost:9001/peerjs`; no server listens there. Collaboration was not tested. No certificate warning was bypassed.
- npm reported 14 upstream dependency vulnerabilities: 3 low, 4 moderate, 6 high, 1 critical. No automatic or breaking audit fixes were applied.

Update and Reset scripts are provided and syntax-checked, but were not executed in this run. AI generation, collaboration, VR, voice, and browser auto-recovery were not tested. Save/load here means reopening the exported scene in a fresh context, not asserting browser autosave recovery.

## macOS and Linux

Both use the same cross-platform scripts. Dedicated testers are preparing; **no macOS or Linux pass is asserted by this Windows report**. Each must use an authorised machine/session, existing private-repository access, current Pinokio with Node 24+, and perform the same actual launcher installation plus create/edit/save/load UI checks. Record OS, hardware, launcher/upstream commits, logs and screenshots. Results should be added only after actual execution.

## AI / HTTPS / future CI

No model endpoint or key was supplied/configured for the test. The UI offers **Set one up in Settings > AI**. AI requires an existing authorised provider/model endpoint and, where required, its key. No model downloads or paid API requests occurred.

Fresh-clone HTTP follows upstream's own certificate-absent fallback. No certificates were generated, security interstitials bypassed, or OS trust settings changed. Optional VR/voice needs a suitable HTTPS setup and separate hardware/permission testing.

No Actions workflow or paid runner was started. A future private, manual-only CI matrix could check launcher syntax and upstream npm install/build on already authorised Windows/macOS/Linux self-hosted runners. Enable only after runner use is authorised. CI is supplementary; it does not establish actual Pinokio UI validation.
