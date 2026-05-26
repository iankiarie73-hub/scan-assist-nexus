# Implementation Plan: Study & Research Assistant Web App

A multi-purpose web application designed for students and researchers. The primary feature is a seamless mobile-to-web workflow where users can scan (OCR) or capture content on their phones and have it appear on the application for immediate assistance (summarization, explanation, etc.).

## Scope Summary
- **Frontend**: A responsive React/Vite/Tailwind application.
- **Key Features**:
  - Dashboard for organizing study/research tasks.
  - "Scan & Paste" bridge: A mechanism to transfer text/images from a mobile device to the web app.
  - AI Assistant Integration: Mocked or simulated assistant that processes "pasted" content.
  - Persistence: Client-side storage (localStorage) for saved notes and research snippets.
- **Non-Goals**:
  - Native mobile app development (will be a mobile-responsive web view).
  - Real-time backend database (Supabase/Postgres is excluded per session constraints).
  - Production-grade OCR engine (will use browser-native APIs or lightweight JS libraries like `tesseract.js` if necessary, or simulated "capture" for this MVP).

## Assumptions & Open Questions
- **Assumption**: The "Scan" feature will use the device's camera via the browser (`getUserMedia` or `<input type="file" accept="image/*" capture="environment">`).
- **Assumption**: Since there's no backend, data synchronization between phone and desktop will be simulated or handled via QR codes/URL params for the demo session, as true cross-device sync usually requires a database.
- **Question**: How to bridge Mobile to Desktop without a database?
  - *Solution*: We will implement a "Receiver" mode. The desktop displays a QR code containing a unique session ID. The mobile scans it, opens the same URL with that ID, and uses `localStorage` (if on same domain) or a public peer-to-peer relay (if possible) or simply a "Mock" upload that the desktop "polls" or simulates. Given constraints, we will focus on the **Mobile Web UI** being the "Scanner" and the **Desktop UI** being the "Workspace".

## Affected Areas
- `src/App.tsx`: Main routing and layout.
- `src/components/`: New components for Camera/Scanner, Assistant Chat, and Research Dashboard.
- `src/hooks/`: Custom hooks for managing local state and simulated "sync".

## Ordered Phases

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up a clean, modern UI using Tailwind and Shadcn UI components.
- Implement a Sidebar/Navigation for "Study", "Research", and "Assistant".
- Create the main "Workspace" area.

### Phase 2: Mobile Scanner Interface (frontend_engineer)
- Build a mobile-optimized view for capturing images.
- Use `tesseract.js` or similar for client-side OCR (Optical Character Recognition) to extract text from photos.
- Implement a "Paste to Assistant" button that transitions from image capture to text processing.

### Phase 3: AI Assistant & Task Management (frontend_engineer)
- Create a chat-like interface for the "Assistant".
- Implement local storage logic to save "Pastes" and "Research Notes".
- Add category tagging (e.g., "Biology", "History", "Project X").

### Phase 4: Integration & UX Polish (quick_fix_engineer)
- Refine responsive behavior (ensure scan workflow is intuitive on small screens).
- Add "Copy to Clipboard" and "Export to PDF/Text" features.
- Polish animations and feedback (e.g., loading states during OCR).

## Deliverables
1. **Responsive Dashboard**: A central hub for all research activities.
2. **Web-based OCR Scanner**: Ability to take a photo of a textbook/paper and get text.
3. **Persistent Notes**: Users can save their scanned snippets and assistant responses locally.
