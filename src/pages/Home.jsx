import React, { useState } from "react";
import TrendingMovies from "./TrendingMovies";
import LatestTrailer from "./LatestTrailer";
import FreeToWatchCard from "./FreeToWatchCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchBtn = () => {
    if (searchQuery) {
      navigate(`/details/search/0/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center text-white"
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/16/19/24/93/240_F_1619249309_o2txqhAskqsXcKy8Vm7nwalM54nOJPWg.jpg')",
        }}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Welcome.</h1>
          <p className="text-xl sm:text-2xl mb-6">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          {/* Search Box */}
          <div className="flex w-full max-w-3xl bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search for a movie, TV show, or person..."
              className="flex-1 px-5 py-3 text-gray-700 text-base outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchBtn()}
            />
            <button
              onClick={handleSearchBtn}
              className="bg-[#00b4d8] hover:bg-[#0096c7] text-white px-6 sm:px-8 text-base font-medium transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 mt-8">
        <TrendingMovies />
        <FreeToWatchCard />
        {/* <LatestTrailer /> */}
      </div>
    </div>
  );
};

export default Home;
