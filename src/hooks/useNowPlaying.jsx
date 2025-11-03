import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NowPlaying } from "../reducer/moviesSlice";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const { nowPlaying } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [allNowPlayingMovies, setAllNowPlayingMovies] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial data
  useEffect(() => {
    dispatch(NowPlaying(1));
    const timer = setTimeout(() => setLoadingInitial(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Combine pages
  useEffect(() => {
    if (nowPlaying.length > 0) {
      if (currentPage === 1) {
        setAllNowPlayingMovies(nowPlaying);
      } else {
        setTimeout(() => {
          setAllNowPlayingMovies((prev) => [...prev, ...nowPlaying]);
          setLoadingMore(false);
        }, 1000);
      }
    }
  }, [nowPlaying, currentPage]);

  // Load more
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadingMore(true);
    dispatch(NowPlaying(nextPage));
  };

  return {
    allNowPlayingMovies,
    loadingInitial,
    loadingMore,
    handleLoadMore,
  };
};

export default useNowPlaying;
