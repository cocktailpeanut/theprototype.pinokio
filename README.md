# theprototype.app for Pinokio

A one-click launcher for the official [theprototype.app](https://theprototype.app) [core repository](https://github.com/theprototype-app/core). It runs the upstream Svelte / Three.js browser editor unchanged. Create primitives, edit materials and transforms, build behaviours, and export scenes. AI is optional.

This launcher repository is **private** under `cocktailpeanut`. It is not registered or published publicly. Access requires an existing GitHub account authorized for this repository.

## Use

Use current Pinokio 8 with its managed **Node.js 24 or newer** and npm. The install script enforces upstream's Node requirement through npm engine checks. If Pinokio's Node is older, update its managed tools before installing.

1. In Pinokio, download `https://github.com/cocktailpeanut/theprototype.pinokio.git` using existing authorized GitHub access.
2. Open the launcher and click **Install**. It clones upstream into `app/` and runs `npm install`.
3. Click **Start**. **Open Editor** appears automatically when Vite is ready. The server binds to `127.0.0.1`; Vite chooses another port if its default is busy.
4. Use the official menus to add an object, change its transform or material, and save/export a `.tpscene`. Keep exported scenes outside `app/`. Reopen with the editor's file menu.

Stop the server with Pinokio's native Stop control. **Update** pulls the launcher and upstream with `git pull --ff-only`, then refreshes dependencies. Stop first. **Reinstall** reruns npm installation. **Reset** removes `app/` including any files you placed there; export scenes first, then Install again. Browser storage belongs to the browser and origin (host + port); keep `.tpscene` backups, particularly if the port changes.

## HTTP, VR and voice

A fresh checkout has no local certificate files, so upstream's own Vite config falls back to ordinary localhost HTTP. This launcher does not generate certificates, bypass browser warnings, or change OS trust. Ordinary desktop editing is the default tested route.

Upstream documents HTTPS for WebXR and voice chat. Treat VR/voice as optional and unvalidated here. For headset/network access, follow upstream's certificate and hosting documentation separately and use an appropriately trusted HTTPS setup. Do not place self-signed certificates in this managed checkout while using its HTTP-only readiness capture.

## Optional AI

Configure your own authorized endpoint and key in **Settings > AI**. Upstream supports a scene assistant and text-to-3D providers such as ComfyUI/TRELLIS or Meshy. No AI model, model server, paid API, or credentials are installed or configured by this launcher. AI generation is not claimed tested without a working authorized endpoint. Keep keys out of Git and screenshots. On localhost, upstream selects a local signalling server at `wss://localhost:9001`; no signalling server is installed by this launcher. Local editing and scene files work without it. For collaboration, configure your own existing authorised signalling server under Settings > Connection.

## CLI and integration

The editor is a client-side application, with no scene CRUD REST backend. Use its official UI and `.tpscene` files; do not invent scene endpoints. Pinokio's supported CLI can install/start the same launcher:

```sh
pterm download https://github.com/cocktailpeanut/theprototype.pinokio.git
pterm run <PINOKIO_HOME>/api/theprototype.pinokio
pterm status theprototype.pinokio --probe
```

Given the ready URL printed by Pinokio, basic availability checks work in these clients (replace the example port):

```sh
curl -I http://127.0.0.1:5173/
```

```js
const response = await fetch('http://127.0.0.1:5173/');
console.log(response.status);
```

```python
from urllib.request import urlopen
print(urlopen('http://127.0.0.1:5173/').status)
```

## Validation

See [TESTING.md](TESTING.md) for exact commits, commands, environment and results. Windows, macOS and Linux use the same cross-platform launcher scripts. Runtime support is not proof of UI validation on every platform. No GitHub Actions workflow is enabled; a future private CI matrix should be explicitly authorized for runner usage and is supplementary to actual Pinokio UI checks.

## Attribution

Upstream is MIT licensed; see [LICENSE](LICENSE) and `app/LICENSE`. `icon.png` is copied unchanged from upstream `static/favicon.png`. Bundled upstream sample assets retain their own licences. Launcher code is MIT licensed. This is a launcher for theprototype.app, not AI Three.js Studio.
