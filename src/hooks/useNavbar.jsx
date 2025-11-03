// src/hooks/useNavbar.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_KEY, SearchBarApi } from "../config";

const useNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Handle dropdown open/close
  const handleDropdownEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Navigate on dropdown option click
  const handleOptionClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Fetch search results from API
  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `${SearchBarApi}?api_key=${API_KEY}&query=${searchQuery}`
      );
      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error("Search request failed:", error.message);
      setSearchResults([]);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Filter only valid results (movie, tv, person)
  const filteredResults = searchResults.filter((item) =>
    ["movie", "tv", "person"].includes(item.media_type)
  );

  // Dropdown menu data
  const dropdownArray = [
    {
      key: "movies",
      label: "Movies",
      options: [
        { label: "Popular", path: "/movie" },
        { label: "Now Playing", path: "/movie/now-playing" },
        { label: "Upcoming", path: "/movie/upcoming" },
        { label: "Top Rated", path: "/movies/top-rated" },
      ],
    },
    {
      key: "tvshows",
      label: "TV Shows",
      options: [
        { label: "Popular", path: "/tv" },
        { label: "Airing Today", path: "/tv/airing-today" },
        { label: "On TV", path: "/tv/on-the-air" },
        { label: "Top Rated", path: "/tv/top-rated" },
      ],
    },
    {
      key: "people",
      label: "People",
      options: [{ label: "Popular People", path: "/person" }],
    },
    {
      key: "more",
      label: "More",
      options: [
        { label: "Discussions", path: "/discussions" },
        { label: "Leaderboard", path: "/leaderboard" },
        { label: "Support", path: "/support" },
        { label: "API Documentation", path: "/api-docs" },
        { label: "API for Business", path: "/api-business" },
      ],
    },
  ];

  // Return everything needed by Navbar component
  return {
    activeDropdown,
    searchQuery,
    setSearchQuery,
    filteredResults,
    dropdownArray,
    handleDropdownEnter,
    handleDropdownLeave,
    handleOptionClick,
    handleSearchSubmit,
    navigate,
    setSearchResults,
  };
};

export default useNavbar;
