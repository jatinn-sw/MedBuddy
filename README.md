# MedBuddy

MedBuddy is a lightweight, browser-based medical assistant chat UI built with plain HTML, CSS, and JavaScript.

- Floating chat window with responsive layout
- Voice-to-text input (where supported by the browser)
- Conversation history with multi-chat support and delete
- Mini chat button (FAB) that appears on scroll
- Zero-build setup (static files)

## Quickstart

### Option A: Open directly
- Open `front end/bot/bot/index.html` in a modern browser (Chrome recommended for voice input).

### Option B: Serve locally (recommended)
- Python 3 (from project root):
  - macOS/Linux:
    ```bash
    python3 -m http.server 8000
    ```
  - Windows:
    ```bash
    py -m http.server 8000
    ```
- Visit:
  ```text
  http://localhost:8000/front%20end/bot/bot/index.html
  ```

### Usage tips
- Click “Let’s Talk” to open the chat window.
- Use the mic button to dictate messages (allow microphone access).
- Use the sidebar to create/switch/delete conversations.
- Toggle the sidebar with the “☰” button in the chat header.

## Using with Ollama (local LLM)

MedBuddy can talk to a local LLM via Ollama. By default, the frontend calls:

```text
http://localhost:11434/api/chat
```

and uses the `phi3` model.

### 1) Install and start Ollama
- Download and install: https://ollama.com/download
- Start the service:
```bash
ollama serve
```

### 2) Pull a model
- Default used in this project:
```bash
ollama pull phi3
```
- To use another model (e.g., `llama3`), pull it and update the model name in the code.

### 3) Run the site
- Open the HTML directly or serve the folder:
```bash
python3 -m http.server 8000
# then open http://localhost:8000/front%20end/bot/bot/index.html
```

### 4) Configure the model used
- In `front end/bot/bot/index.html`, find the request body and change the model name if needed:
```js
body: JSON.stringify({
  model: 'phi3',
  messages: conversationHistory,
  stream: false
})
```

### Troubleshooting (Ollama)
- Service not running:
  - Error shows “Ollama not responding.” Start with:
  ```bash
  ollama serve
  ```
- Model not found:
  ```bash
  ollama pull <model>
  ```
  Then update the model name in the code.
- CORS issues:
  - Serve the site via a local server (see Quickstart).
  - If needed, allow origins in Ollama:
  ```bash
  OLLAMA_ORIGINS="*" ollama serve
  ```
- Slow first response:
  - The first call loads the model into memory; subsequent calls will be faster.

## Troubleshooting (General)

- Voice input not working:
  - Use Chrome/Edge; some browsers have limited Web Speech API support.
  - Ensure microphone permission is granted.

- Replies hidden behind the input:
  - Only the messages area scrolls; if needed, refresh after layout changes.

- Sidebar toggle or chat switching issues:
  - Refresh to reload state.
  - Clear site data/localStorage for a clean slate via browser DevTools → Application/Storage.

- Assets not loading:
  - Prefer running a local static server (Option B) to avoid path/permission issues in direct file mode.

## License

This project is licensed under the terms specified in `LICENSE`.
