## Relevant Files

- `app/page.tsx` - The main page component with the split-screen layout.
- `app/api/auth/[...betterauth]/route.ts` - Existing Better-Auth routes.
- `app/api/animations/route.ts` - API route for creating and managing animation jobs.
- `components/AnimationForm.tsx` - The form for submitting the animation prompt.
- `components/AnimationPreview.tsx` - Component to display animation status, video preview, and download button.
- `lib/auth.ts` - Better-Auth configuration and session utilities.
- `lib/db.ts` - Prisma client instance.
- `lib/appwrite.ts` - Appwrite client configuration and service functions.
- `prisma/schema.prisma` - The database schema.
- `appwrite/functions/render-animation/main.py` - Appwrite serverless function for rendering videos.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Project Setup & Authentication
  - [x] 1.1 Review existing authentication setup (better-auth, Prisma) and list required `.env` variables.
  - [x] 1.2 Implement OAuth with Google as a provider for login/signup.
  - [ ] 1.3 Create a protected API route `/api/animations` that only authenticated users can access.
  - [ ] 1.4 Set up an Appwrite Cloud project and configure the Appwrite client (`lib/appwrite.ts`).
- [ ] 2.0 Core UI Layout
  - [ ] 2.1 Create the main page (`app/page.tsx`) with a responsive split-screen layout using Tailwind CSS.
  - [ ] 2.2 Create `components/AnimationForm.tsx` with a textarea for the prompt and a submit button.
  - [ ] 2.3 Create `components/AnimationPreview.tsx` with placeholders for status, video, and download button.
- [ ] 3.0 Animation Submission and Status Tracking
  - [ ] 3.1 Implement client-side logic in `AnimationForm.tsx` to call the `/api/animations` endpoint.
  - [ ] 3.2 Implement the `POST` handler in `/api/animations/route.ts` to create an `AnimationJob` in the database with "pending" status.
  - [ ] 3.3 Implement a mechanism on the frontend to poll `/api/animations/[jobId]` for status updates.
  - [ ] 3.4 Dynamically display the job status in `AnimationPreview.tsx`.
- [ ] 4.0 Backend Animation Rendering Service
  - [ ] 4.1 Create an Appwrite serverless function (Python) for animation rendering.
  - [ ] 4.2 In the `/api/animations` `POST` handler, trigger the Appwrite function, passing the `jobId`.
  - [ ] 4.3 Implement the Appwrite function to:
    - a. Update job status to "rendering".
    - b. Call an AI service to generate a Manim script.
    - c. Execute Manim to render the video.
    - d. Upload the MP4 to Appwrite Storage.
    - e. Update `AnimationJob` with "completed" status and file ID.
    - f. Handle errors and update status to "failed".
- [ ] 5.0 Displaying and Downloading the Animation
  - [ ] 5.1 When job is "completed", fetch the video from Appwrite Storage in `AnimationPreview.tsx`.
  - [ ] 5.2 Display the video in an HTML5 `<video>` player.
  - [ ] 5.3 Enable the download button with a link to the video file.
