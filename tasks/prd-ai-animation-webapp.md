# PRD: AI-Powered Animation Webapp (MVP)

## 1. Introduction/Overview

This document outlines the requirements for the Minimum Viable Product (MVP) of an AI-Powered Animation Webapp. The application will allow users to generate, preview, and download animations created from simple text descriptions. The core of this product is to translate user input into Python scripts for the Manim animation engine using an AI model, render the animation, and present it back to the user in a seamless, web-based experience.

## 2. Goals

- **User Input:** Allow users to submit animation descriptions via a simple text input.
- **AI Script Generation:** Utilize an AI service (like OpenAI's GPT models) to convert the user's text description into a functional Manim script.
- **Backend Rendering:** Process the generated script to render a video file (MP4).
- **Playback & Download:** Enable users to watch the generated animation directly in the browser and download the MP4 file.
- **User Authentication:** Secure the application with a robust authentication system for user registration, login, and session management.

## 3. User Stories

- **As a new user, I want to** sign up for an account using my email and password so that I can create and save my animations.
- **As a logged-in user, I want to** enter a text description of an animation (e.g., "A blue square transforms into a red circle") so that I can generate a video.
- **As a logged-in user, I want to** see the status of my animation rendering (e.g., pending, rendering, complete) so that I know when to expect the result.
- **As a logged-in user, I want to** preview the final animation on the website so that I can check if it matches my description.
- **As a logged-in user, I want to** download my generated animation as an MP4 file so that I can use it elsewhere.

## 4. Functional Requirements

### 4.1. Authentication

1.  The system must allow users to sign up using an email and password.
2.  The system must allow users to log in and log out.
3.  The system must support OAuth providers (e.g., Google) for signup and login.
4.  API routes for animation generation must be protected and accessible only to authenticated users.
5.  User session data must be stored securely in the PostgreSQL database.

### 4.2. Animation Generation

1.  The user interface must provide a text area for users to input their animation description.
2.  On submission, the text prompt must be sent to a backend service.
3.  The backend service must call an AI API (OpenAI-compatible) to convert the text prompt into a Manim Python script.
4.  The backend service must use the generated Manim script to render an MP4 video file.
5.  An `AnimationJob` record must be created in the database with a "pending" status when a user submits a request.
6.  The job status must be updated throughout the process (e.g., "rendering", "completed", "failed").
7.  The final MP4 file must be uploaded to Appwrite Storage.
8.  The `AnimationJob` record must be updated with the storage file ID upon successful upload.

### 4.3. User Interface

1.  The UI must display a loading indicator while the animation is being rendered.
2.  Once rendering is complete, the UI must display the generated animation in an HTML5 `<video>` player.
3.  The UI must provide a download button for the user to save the MP4 file.

## 5. Non-Goals (Out of Scope for MVP)

- Real-time collaboration or sharing features.
- Advanced animation editing tools (e.g., timeline, keyframes).
- A library of pre-made animation templates.
- User profiles or a gallery of public animations.
- Support for input formats other than plain text (e.g., structured JSON).
- Customization of rendering parameters (e.g., resolution, frame rate) through the UI.
- Saving or editing previously generated Manim scripts.

## 6. Design Considerations

- The UI should feature a split-screen layout.
- The left side of the screen will contain the user input form (text prompt area).
- The right side of the screen will be dedicated to the output: displaying the progress, the final animation preview, and the download button.
- The design should be clean, modern, and minimalist, similar to interfaces like ChatGPT or bolt.dev, to focus the user on the core task of creating animations.
- The interface must be responsive and work well on both desktop and mobile devices.

## 7. Technical Considerations

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Authentication:** Better-Auth with PostgreSQL and Prisma.
- **Backend:** Appwrite Cloud for serverless functions (Python runtime) and file storage.
- **Database:** PostgreSQL (e.g., Neon) with Prisma ORM.
- **AI Integration:** An OpenAI-compatible API.
- **Animation Engine:** Manim Community Edition.
- Dependencies like Manim, FFmpeg, and Cairo must be packaged in the Appwrite Function environment.

## 8. Success Metrics

- **User Activation:** Number of users who successfully generate at least one animation within their first week.
- **Core Task Completion Rate:** Percentage of animation jobs that complete successfully versus those that fail.
- **User Retention:** Number of users returning to the app on a weekly basis.

## 9. Open Questions

- **Target Audience:** Who is the primary user? (e.g., students, developers, marketers). This will influence future feature prioritization.
- **Structured JSON Input:** What specific parameters would an advanced user want to control via JSON?
- **Error Handling:** What is the desired user experience when a script generation or rendering process fails? Should we provide technical error logs, simplified messages, or suggestions to revise the prompt?
