# MyDeezer App

A music browser built with Angular 21, powered by the Deezer API. Browse charts, search for artists and albums, view track listings, and manage personal playlists — all behind Google authentication.

---

## Features

- **Home** — Deezer top chart with trending tracks, albums, and artists
- **Search** — Live search across artists, albums, and tracks with debounced input
- **Artist page** — Profile, fan count, top 10 tracks, and discography
- **Album page** — Full tracklist with duration, rank, and release info
- **Playlists** — Create, rename, and delete personal playlists; add and remove tracks
- **Authentication** — Google sign-in via Firebase; all routes are protected
- **Responsive** — Mobile navigation with burger menu; responsive image sizes via `srcset`
- **Performance** — CDK virtual scroll for tracklists with more than 10 tracks; skeleton loading states

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, signals) |
| Styling | Tailwind CSS v4 |
| State management | NgRx Signals (`signalStore`) |
| Persistence | IndexedDB via `idb-keyval` |
| Authentication | Firebase Authentication (Google OAuth) |
| API | Deezer REST API (via `corsproxy.io`) |
| Virtual scroll | Angular CDK `CdkVirtualScrollViewport` |
| HTTP | Angular `HttpClient` |

---

## Project Structure

```
src/
├── app/
│   ├── features/
│   │   ├── home/                 # Chart page
│   │   ├── search/               # Live search
│   │   ├── album/                # Album detail
│   │   ├── artist/               # Artist detail
│   │   ├── playlist/
│   │   │   ├── playlist-list/    # All user playlists
│   │   │   └── user-playlist/    # Single playlist view
│   │   ├── login/                # Google sign-in page
│   │   └── not-found/
│   └── shared/
│       ├── components/     # Header, footer, track, artist-card, album-card, skeletons
│       ├── directives/     # AutofocusDirective
│       ├── guards/         # authGuard
│       ├── models/         # TypeScript interfaces (Track, Album, Artist, etc.)
│       ├── services/       # DeezerService, AuthService
│       └── store/          # PlaylistStore (NgRx Signals)
├── environments/
│   └── environment.ts      # Firebase config (gitignored — fill in locally)
└── styles.css
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 11+
- A Firebase project with Google Authentication enabled

### 1. Clone and install

```bash
git clone <repo-url>
cd final-angular-assesment
npm install
```

### 2. Configure Firebase

Create your Firebase project at [console.firebase.google.com](https://console.firebase.google.com):

1. **Authentication** → Sign-in method → enable **Google**
2. **Project settings** → Your apps → Add web app → copy the config

Paste the config into `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```

> `environment.ts` is in `.gitignore` — your credentials will not be committed.

### 3. Run

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200). You will be redirected to the login page and prompted to sign in with Google.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server at `localhost:4200` |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm test` | Unit tests (Vitest) |

---

## Authentication

All routes except `/login` are protected by `authGuard`. The guard resolves Firebase's auth state before activating any route, so deep links work correctly after sign-in.

---

## Playlist Storage

Playlists are stored in the browser's **IndexedDB** (key: `"playlists"`) using `idb-keyval`. They are device-local — playlists created in one browser are not synced to another. This is intentional for the current scope and can be migrated to remote storage (e.g. Firestore) in a future versions.

---

## API

Data is fetched from the [Deezer API](https://developers.deezer.com/api) via `corsproxy.io` to work around browser CORS restrictions in development. The proxy is configured in `DeezerService`:

```typescript
private BASE_URL = 'https://corsproxy.io/?https://api.deezer.com';
```

---

## Screenshots

### Login page

#### Mobile 
![Mobile view of Login Page](/public/screenshots/Mobile_View/Loginpage_MobileView.png)

#### Desktop
![Desktop view of Login Page](/public/screenshots/Desktop_View/LoginPage_DesktopView.png)

### Search page

#### Mobile 
![Mobile view of Search Page](/public/screenshots/Mobile_View/SearchPage_Mobile.png)

#### Desktop
![Desktop view of Search Page](/public/screenshots/Desktop_View/SearchPage_Desktop.png)

### Artist page 

#### Mobile 
![Mobile view of Artist Page](/public/screenshots/Mobile_View/ArtistPage_Mobile.png)

#### Desktop
![Desktop view of Artist Page](/public/screenshots/Desktop_View/ArtistPage_desktop.png)


### Album page

#### Mobile 
![Mobile view of Album Page](/public/screenshots/Mobile_View/AlbumPage_Mobile.png)

#### Desktop
![Desktop view of Album Page](/public/screenshots/Desktop_View/AlbumPage_Desktop.png)


### Playlists page

#### Mobile 
![Mobile view of Playlist Page](/public/screenshots/Mobile_View/PlaylistPage_Mobile.png)

#### Desktop
![Desktop view of Playlist Page](/public/screenshots/Desktop_View/PlaylistPage_Desktop.png)


### User Detail page

#### Mobile 
![Mobile view of User Playlist Page](/public/screenshots/Mobile_View/UserPlaylist_Mobile.png)

#### Desktop
![Desktop view of User Playlist Page](/public/screenshots/Desktop_View/UserPlaylist_Desktop.png)



