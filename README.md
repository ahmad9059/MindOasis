# Mind Oasis - Therapist Finder Prototype

This is a Next.js application built for a 30-hour hackathon challenge. The application, "Mind Oasis," serves as a single-page application (SPA) to help users in Pakistan find and filter mental health professionals based on a provided dataset.

## Live Demo

A live demo of the application is available at: [Your Live Demo URL Here]

---

## Technology Choices & Architecture

### Frontend Framework: Next.js (App Router)
- **Why:** The Next.js App Router with Server Components by default allows for excellent performance and a modern, robust architecture. It enables a clear separation of concerns between server-rendered static content and interactive client-side components. This choice aligns with the recommendation for a modern React-based solution and simplifies deployment on Vercel.

### Styling: Tailwind CSS + shadcn/ui
- **Why:** This combination provides a powerful and efficient way to build a professional, responsive, and visually appealing UI. Tailwind's utility-first approach allows for rapid development, while shadcn/ui offers a set of beautifully designed, accessible, and customizable components that can be easily integrated into the project.

### Backend & Database: Static JSON File
- **Why:** The dataset contains only 79 records. For a hackathon and a dataset of this size, setting up a full-fledged database and backend API would be overly complex. A static JSON file (`src/data/therapists.json`) is simple, performant, and sufficient. All data fetching, searching, and filtering are handled on the client-side, simplifying the architecture significantly. This approach allows for a focus on frontend and UX, which are key evaluation criteria.

### Language: TypeScript
- **Why:** TypeScript was used to ensure type safety, improve code quality, and enhance developer confidence. Defining clear types for the therapist data (`src/lib/types.ts`) prevents common errors and makes the codebase easier to maintain and understand.

### State Management: React Hooks + URL State
- **Why:** For managing filter and search states, a combination of React's built-in `useState`, `useMemo`, and the `useSearchParams` hook is employed. This approach is lightweight and powerful. By storing the filter state in the URL search parameters, we achieve a key bonus feature: **URL state persistence**. This means users can share links to their specific filtered results.

### AI Feature: Genkit with Google Gemini
- **Why:** The project leverages Firebase Genkit to integrate a "Smart Insights Generator". This feature uses a Google Gemini model to generate a concise summary of a therapist's profile on demand. It showcases the ability to integrate modern AI capabilities to add value for the user. The flow is defined in `src/ai/flows/generate-profile-summary.ts`.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd [repo-name]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Google AI API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```

4.  **Run the development server:**
    The application runs on `http://localhost:9002`.
    ```bash
    npm run dev
    ```

## Known Issues & Limitations

- **Data Source:** The application relies on a static JSON file. It does not connect to a live database, so the data is not updated dynamically.
- **Search:** The search is a simple client-side text match. It is case-insensitive but does not implement advanced features like fuzzy matching.
- **AI Generation:** The AI summary is generated on each request and is not cached. For a production application, caching these results would be beneficial to reduce API calls and improve performance.
- **Contact Actions:** The "Call Now" and "Send Email" buttons are implemented using `tel:` and `mailto:` links, which rely on the user having correctly configured applications on their device.
