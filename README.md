# Movie Explorer Web App

**Movie Explorer** is a web application built using **React.js** that allows users to browse, search, and view detailed information about movies using the **TMDB API**. Users can also mark movies as favorites, with the favorites list persisted in **localStorage** across sessions.

---

## Live Demo

You can view the live demo of the project here:

[Live Demo - Movie Explorer](https://tmdb-movie-site.vercel.app/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Key Setup](#api-key-setup)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)

---

## Project Overview

**Movie Explorer** provides an intuitive platform to discover trending movies, search for movies by title, and view detailed information such as the movie’s poster, rating, release date, runtime, and description. The app also allows users to **favorite** movies, which are saved to **localStorage** for persistent access.

### Key Features:
- **Browse Trending & Popular Movies**: Fetches and displays movies from the TMDB API.
- **Search Movies by Title**: Allows users to search movies.
- **Movie Details Page**: Provides detailed information such as poster, overview, release date, genre, and rating.
- **Favorites**: Save and manage favorite movies in the browser's **localStorage**.
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Error Handling**: Display loading spinners, error states, and empty states (e.g., no search results found).

---

## Tech Stack

- **Frontend**: React.js 
- **Styling**: Tailwind CSS
- **Routing**: React Router (or Next.js routing)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **API**: TMDB API
- **Local Storage**: For saving and retrieving favorite movies
- **Other Libraries**: Axios (or Fetch API), React Skeleton (for loading states)

---

## Features

### 1. **Home / Trending Page**
- Fetches popular or trending movies from the TMDB API.
- Displays movie posters, titles, release years, ratings.
- Includes a **search bar** to query movies by title.
- Category tabs: **Popular**, **Top Rated**, **Upcoming**.

### 2. **Movie Details Page**
- When a user clicks on a movie, detailed information is shown:
  - Poster, title, release date, genre, description, rating, and runtime.
  - **Add to Favorites** / **Remove from Favorites** button.

### 3. **Favorites Page**
- Displays a list of movies marked as favorites.
- Movies are stored in **localStorage**, and the list persists even after page refreshes.
- Users can remove movies from their favorites.

### 4. **UI/UX Features**
- **Responsive Layout**: Optimized for mobile, tablet, and desktop.
- **Loading State**: Skeleton loaders for smoother user experience.
- **Error State**: If the API fails, an error message is displayed.
- **Empty State**: Displays "No results found" when no movies match search criteria.

### 5. **Optional Features (Bonus)**
- **Infinite Scroll** for the movie list.
- **Sorting**: Sort by release date or rating.
- **Lazy Loading** of images.
- **Show Similar Movies** on the movie details page.

---

