import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import type { Movie, TMovieDetails } from '../types/movie.d'

const axiosInstance = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: "41710fef",
  },
  timeout: 5000,
});

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  { status?: number; message: string }
> = async ({ url, method = 'GET', params }) => {
  try {
    const result = await axiosInstance({ url, method, params });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        message: err.message || 'Unknown API error',
      },
    };
  }
};


export const omdbApi = createApi({
  reducerPath: 'omdbApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<{ Search: Movie[]; totalResults: string }, number>({
      query: (page) => ({
        url: '',
        params: { s: 'movie', page },
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        if (newItems.Search) {
          currentCache.Search = [...(currentCache.Search || []), ...newItems.Search];
          currentCache.totalResults = newItems.totalResults;
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    
    searchMovies: builder.query<{ Search: Movie[]; totalResults: string }, { term: string; page: number }>({
      query: ({ term, page }) => ({
        url: '',
        params: { s: term, page },
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.term,
      merge: (currentCache, newItems) => {
        if (newItems.Search) {
          currentCache.Search = [...(currentCache.Search || []), ...newItems.Search];
          currentCache.totalResults = newItems.totalResults;
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => 
        currentArg?.term !== previousArg?.term || 
        currentArg?.page !== previousArg?.page,
    }),
    
    getMovieById: builder.query<TMovieDetails, string>({
      query: (id) => ({
        url: '',
        params: { i: id, plot: 'full' },
      }),
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetPopularMoviesQuery,
} = omdbApi;