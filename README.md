# MoviesBase

MoviesBase is a movie discovery app built with Next.js, TypeScript, Tailwind CSS, next-intl, and the TMDB API. I built it as a hands-on practice project to work through real App Router patterns: localized routes, server-side API fetching, pagination, search, dynamic pages, loading states, and reusable UI components.

🔗 **Live Demo:** [moviesbase-a.netlify.app](https://moviesbase-a.netlify.app)

## Features

- Browse trending, top-rated, and discover movie sections
- Search movies by title
- View movie detail pages
- Browse movies by genre
- Pagination for list pages
- Localized routes and messages for English, Arabic, and Spanish
- Responsive dark UI with reusable cards, sections, navbar, footer, and pagination
- Graceful fallback UI when TMDB data is unavailable

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
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
components/              Reusable UI components
i18n/                    next-intl routing and request config
lib/tmdb.ts              TMDB API helpers
messages/                Translation files
types/                   TMDB TypeScript types
```

## What I Practiced

- App Router file-based routing
- Dynamic route segments
- Server Components and Client Components
- Query-string pagination
- API error handling and fallback rendering
- Locale-aware links and redirects
- Reusable component design
- Production build and lint checks

## API

Movie data comes from [The Movie Database API](https://developer.themoviedb.org/docs/getting-started). This project uses a TMDB bearer token stored locally as `TMDB_TOKEN`.

## Status

This is a practice project, but it is built like a real app: it passes linting and production builds, handles missing API data gracefully, and includes multiple localized user flows.
