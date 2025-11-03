import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/Details'
import Movie from './pages/Movie'
// import NowPlaying from './pages/NowPlaying'
import Upcoming from './pages/Upcoming'
import TopRated from './pages/TopRated'
import Tv from './pages/Tv'
import AiringToday from './pages/AiringToday'
import OnTv from './pages/OnTv'
import TvTopRated from './pages/TvTopRated'
import PopularPeople from './pages/PopularPeople'
import MovieDetails from './pages/MovieDetails'
import NowPlayings from './pages/NowPlayings'
import TvDetails from './pages/TvDetails'
import Details from './pages/Details'

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
         { path: '/', element: <Home /> },
      { path: '/details/:media_type/:id/:name', element: <Details /> },
      // ----- Navbar Movie Routes ---- 
      { path: '/movie', element: <Movie /> },
      { path: '/movie/:id', element:<MovieDetails />},
      { path: '/movie/now-playing', element: <NowPlayings /> },
      { path: '/movie/upcoming', element: <Upcoming /> },
      { path: '/movies/top-rated', element: <TopRated /> },

      // ---- Navbar TV shows------
      { path: '/tv', element: <Tv />},
      { path: '/tv/:id', element: <TvDetails />},
      { path: '/tv/airing-today', element: <AiringToday />},
      { path : '/tv/on-the-air', element : <OnTv />},
      { path : '/tv/top-rated', element: <TvTopRated />},

      // ---- Navbar Popular People ---
      { path : '/person', element : <PopularPeople />}
      ]
    }
  ])
  return (
    <RouterProvider router={routes}>App</RouterProvider>
  )
}

export default App