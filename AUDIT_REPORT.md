# Stage 2 Technical Audit — GBSBFORYOU Publications

**Date:** 2026-11-05  
**Repository:** https://github.com/ajaysingh132/gbsbforyou-publications

## Verified root items
- `README.md`
- `index.html`
- `free-apis.html`
- `vidyaguru-app/` directory

## Findings
1. The current README contains only the repository title; it does not explain the app, setup, data model, publishing workflow or deployment.
2. The main page title is "GBS Publications - AI Writer & KDP Tool". The inspected HTML includes book-editor/print styling, API configuration UI, tabs for paid/free APIs, and an API-key input field.
3. The separate `free-apis.html` contains a client-side list of API providers and their stated free-tier descriptions. These claims may become outdated and should be verified against each provider's official documentation before relying on them.
4. A password-type input is not, by itself, secure secret storage. Do not commit real API keys in HTML/JavaScript, localStorage, public repository files, screenshots or issue comments.
5. The root listing contains `vidyaguru-app/`; its internal files were not audited in this pass.
6. This audit did not verify whether book content is saved locally, exported reliably, or backed up.

## Priority actions
- Replace the minimal README with setup, supported features, export formats and limitations.
- Inspect JavaScript for key persistence and network requests before using real credentials.
- Move privileged API calls behind a backend/proxy and store credentials in server-side environment secrets.
- Add an explicit privacy warning before users enter manuscript or personal data.
- Test PDF/print output, manuscript export, backup/restore and mobile editing.
- Add timestamps and official source links to the free-API catalogue.

## Status
**Security and workflow review required.** No existing source files were modified in this audit.
