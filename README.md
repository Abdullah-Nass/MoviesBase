# MoviesBase

MoviesBase is a movie discovery app built with Next.js, TypeScript, Tailwind CSS, next-intl, and the TMDB API. I built it as a hands-on practice project to work through real App Router patterns: localized routes, server-side API fetching, pagination, search, dynamic pages, loading states, and reusable UI components.

🔗 **Live Demo:** [moviesbase-a.netlify.app](https://moviesbase-a.netlify.app)

## Features

- Browse trending, top-rated, and discover movie sections
- Live search dropdown with debounced TanStack Query fetching, result caching, and full keyboard navigation (↑ ↓ Enter Escape)
- Full search results page with server-side pagination
- View movie detail pages
- Browse movies by genre
- Localized routes and messages for English, Arabic, and Spanish
- Automatic RTL/LTR layout switching for Arabic
- Responsive dark UI with reusable cards, sections, navbar, footer, and pagination
- Graceful fallback UI when TMDB data is unavailable

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- next-intl
- Axios
- TMDB API
- Font Awesome icons

## Routes

```txt
/:locale
/:locale/trending
/:locale/top_rated
/:locale/discover
/:locale/discover/:genreId
/:locale/search?q=movie&page=1
/:locale/movie/:movieId
```

Supported locales:

```txt
en
ar
es
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
TMDB_TOKEN=your_tmdb_bearer_token
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```txt
app/[locale]/            Localized App Router pages
app/api/                 Next.js API routes (search endpoint for client-side querying)
components/              Reusable UI components
hooks/                   Custom hooks (useDebounce)
i18n/                    next-intl routing and request config
lib/tmdb.ts              Server-side TMDB API helpers
lib/tmdb-client.ts       Client-side fetch wrapper for TanStack Query
messages/                Translation files
types/                   TMDB TypeScript types
```

## What I Practiced

- App Router file-based routing
- Dynamic route segments
- Server Components and Client Components
- TanStack Query for client-side data fetching, caching, and deduplication
- Debounced search with a custom hook
- Keyboard-accessible dropdown UI
- Next.js API routes as a bridge between client components and server-side logic
- Query-string pagination
- API error handling and fallback rendering
- Locale-aware links and redirects
- Reusable component design
- Production build and lint checks

## Search Architecture

The search feature has two layers:

- **Search results page** (`/[locale]/search?q=...`) — server-side fetch with pagination, no client state
- **Live search dropdown** — client component using TanStack Query with a 400ms debounce hook; queries hit `/api/search`, results are cached by query key for 5 minutes, and the dropdown supports full keyboard navigation

## API

Movie data comes from [The Movie Database API](https://developer.themoviedb.org/docs/getting-started). This project uses a TMDB bearer token stored locally as `TMDB_TOKEN`.

## Status

This is a practice project, but it is built like a real app: it passes linting and production builds, handles missing API data gracefully, and includes multiple localized user flows.
