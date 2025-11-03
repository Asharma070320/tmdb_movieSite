import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_KEY,
  Popular_Api,
  NowPlaying_Api,
  Upcomig_Api,
  SearchBarApi,
  TopRatedApi,
  Tv_Api,
  AiringTodayApi,
  OnTvApi,
  TvTopRatedApi,
  PopularPeopleApi,
} from "../config";

// ------------------- Popular Movies -------------------
export const popularMovies = createAsyncThunk(
  "movies/popularMovies",
  async (page = 1) => {
    const response = await axios.get(
      `${Popular_Api}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- Now Playing Movies -------------------
export const NowPlaying = createAsyncThunk(
  "movies/nowPlaying",
  async (page = 1) => {
    const response = await axios.get(
      `${NowPlaying_Api}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- Upcoming Movies -------------------
export const UpComing = createAsyncThunk(
  "movies/upcoming",
  async (page = 1) => {
    const response = await axios.get(
      `${Upcomig_Api}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- Top Rated Movies -------------------
export const topRatedMovies = createAsyncThunk(
  "movies/topRated",
  async (page = 1) => {
    const response = await axios.get(
      `${TopRatedApi}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- TV List -------------------
export const allTvList = createAsyncThunk("movie/tvList", async (page = 1) => {
  const response = await axios.get(`${Tv_Api}?api_key=${API_KEY}&page=${page}`);
  return {
    results: response.data.results,
    page: response.data.page,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
});

// ------------------- Airing Today TV Shows -------------------
export const fetchAiringToday = createAsyncThunk(
  "movie/airingToday",
  async (page = 1) => {
    const response = await axios.get(
      `${AiringTodayApi}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ---------------- On the Air --------------------

export const fetchOnTv = createAsyncThunk("movie/onTv", async (page = 1) => {
  const response = await axios.get(
    `${OnTvApi}?api_key=${API_KEY}&page=${page}`
  );
  return {
    results: response.data.results,
    page: response.data.page,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
  };
});

// ---------- Tv Top Rated -----------------------
// ---------------- TV Top Rated --------------------
export const fetchTvTopRated = createAsyncThunk(
  "movie/tvTopRated",
  async (page = 1) => {
    const response = await axios.get(
      `${TvTopRatedApi}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- Popular People -------------------
export const fetchPopularPeople = createAsyncThunk(
  "movie/popularPeople",
  async (page = 1) => {
    const response = await axios.get(
      `${PopularPeopleApi}?api_key=${API_KEY}&page=${page}`
    );
    return {
      results: response.data.results,
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    };
  }
);

// ------------------- Search Bar -------------------
export const searchBar = createAsyncThunk("movie/searchBar", async () => {
  const response = await axios.get(`${SearchBarApi}?api_key=${API_KEY}`);
  return response.data.results;
});

// ------------------- Slice -------------------
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    nowPlaying: [],
    upcoming: [],
    toprate: [],
    tvlist: [],
    airingToday: [],
    onTv: [],
    tvTopRated: [],
    popularPeople: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    hasMore: true,
  },
  reducers: {
    resetMovies: (state) => {
      state.popular = [];
      state.nowPlaying = [];
      state.upcoming = [];
      state.toprate = [];
      state.tvlist = [];
      state.airingToday = [];
      state.onTv = [];
      state.tvTopRated = [];
      state.popularPeople = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(popularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(popularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular =
          action.payload.page === 1
            ? action.payload.results
            : [...state.popular, ...action.payload.results];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(popularMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch popular movies";
      })

      // Now Playing
      .addCase(NowPlaying.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(NowPlaying.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlaying =
          action.payload.page === 1
            ? action.payload.results
            : [...state.nowPlaying, ...action.payload.results];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(NowPlaying.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch now playing movies";
      })

      // Upcoming
      .addCase(UpComing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpComing.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming =
          action.payload.page === 1
            ? action.payload.results
            : [...state.upcoming, ...action.payload.results];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(UpComing.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch upcoming movies";
      })

      // Top Rated
      .addCase(topRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.toprate =
          action.payload.page === 1
            ? action.payload.results
            : [...state.toprate, ...action.payload.results];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(topRatedMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch top-rated movies";
      })

      // All TV Shows
      .addCase(allTvList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTvList.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.tvlist.map((tv) => tv.id));
        const uniqueResults = action.payload.results.filter(
          (tv) => !existingIds.has(tv.id)
        );
        state.tvlist =
          action.payload.page === 1
            ? action.payload.results
            : [...state.tvlist, ...uniqueResults];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(allTvList.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch TV shows";
      })

      // Airing Today
      .addCase(fetchAiringToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiringToday.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.airingToday.map((tv) => tv.id));
        const uniqueResults = action.payload.results.filter(
          (tv) => !existingIds.has(tv.id)
        );
        state.airingToday =
          action.payload.page === 1
            ? action.payload.results
            : [...state.airingToday, ...uniqueResults];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(fetchAiringToday.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch airing today TV shows";
      })

      // On TV
      .addCase(fetchOnTv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnTv.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.onTv.map((tv) => tv.id));
        const uniqueResults = action.payload.results.filter(
          (tv) => !existingIds.has(tv.id)
        );
        state.onTv =
          action.payload.page === 1
            ? action.payload.results
            : [...state.onTv, ...uniqueResults];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(fetchOnTv.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch On TV shows";
      })

      // TV Top Rated
      .addCase(fetchTvTopRated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvTopRated.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.tvTopRated.map((tv) => tv.id));
        const uniqueResults = action.payload.results.filter(
          (tv) => !existingIds.has(tv.id)
        );
        state.tvTopRated =
          action.payload.page === 1
            ? action.payload.results
            : [...state.tvTopRated, ...uniqueResults];
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(fetchTvTopRated.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch top-rated TV shows";
      })

      // Popular People
      .addCase(fetchPopularPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.popularPeople = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })

      .addCase(fetchPopularPeople.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch popular people";
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
