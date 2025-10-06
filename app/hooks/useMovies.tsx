"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import { toaster } from "@/components/ui/toaster"
import { NetworkStatus } from "@apollo/client"
import { SEARCH_MOVIES } from "@/libs/graphql"
import useFavorite from "./useFavrite"

const useMovies = () => {
    const [query, setQuery] = useState('');
    const [input, setInput] = useState('');
    const [hydrated, setHydrated] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [fav, setFav] = useState<Set<string>>(new Set());
    const { addFav } = useFavorite()

    const {data, error, loading, networkStatus, fetchMore} = useQuery(SEARCH_MOVIES, {
        variables: { query, page: 1 },
        fetchPolicy: "cache-and-network",
        skip: !query,
    })

    const movies = data?.searchMovies.movies ?? []
    const hasMore = data?.searchMovies.hasMore ?? false;
    const currentPage = data?.searchMovies.page ?? 1;

    const loadMoreRef = useRef(null)
    const loadMore = networkStatus === NetworkStatus.fetchMore; 

    // ─── FUNCTIONS ──────────────────────────────────────────────

    //searching movies
    const searchMovies = (e: React.FormEvent) => {
        e.preventDefault();

        const searchMovie = input.trim();

        if(searchMovie.length < 2) {
            toaster.create({
                title: "Please enter at least 2 characters",
                type: "warning",
                duration: 3000,
            })
            return
        }
        setQuery(searchMovie); // set query with the searched movie
        setInput("") // resest input after search
    }

    // infintty scroll
    const loadMoreMovies = async () => {
        if (!hasMore || loadMore || !query) return;

        setLoadingMore(true);
        try {
            await fetchMore({
                variables: { query, page: currentPage + 1 },
                updateQuery: ({ ...query }, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return query;
                    return {
                        searchMovies: {
                            ...fetchMoreResult.searchMovies,
                            movies: [
                                ...query.searchMovies.movies,
                                ...fetchMoreResult.searchMovies.movies,
                            ]
                        }
                    }
                }
            })
        } catch (error) {
            toaster.create({
                title: "Error loading more movies",
                type: "error",
                duration: 3000,
            });
        }
    }

    const getMoreMovie = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                loadMoreMovies()
            }
        },
        [hasMore, query, currentPage, loadMore]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(getMoreMovie, {
            root: null,
            rootMargin: "300px",
            threshold: 0,
        })
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => observer.disconnect()
    }, [getMoreMovie])


    //add favorite movie
    const addFavoriteMovie = async (imdbID: string) => {

        // check if movie is already in favorites
        if (fav.has(imdbID)) return;

        //optimistic
        setFav((prev) => new Set([...prev, imdbID]))
        try {
            await addFav(imdbID);
            toaster.create({
                title: "Movie added to favorites",
                type: "success",
                duration: 2000,
            });
        } catch (error) {
            // Rollback on error
            setFav((prev) => {
                const newSet = new Set(prev);
                newSet.delete(imdbID);
                return newSet;
            });
            toaster.create({
                title: "Failed to add to favorites",
                type: "error",
                duration: 3000,
            });
        }
    }

    // persist searched movies on browser after refresh
    useEffect(() => {
        // First run after mount: mark hydrated and restore once
        if (!hydrated) {
            setHydrated(true);
            const saved = sessionStorage.getItem("lastSearchQuery");
            if (saved) setQuery(saved);
            return; // stop here on the first run
        }

        // Subsequent runs (after hydration): persist changes
        if (query) {
            sessionStorage.setItem("lastSearchQuery", query);
        } else {
            sessionStorage.removeItem("lastSearchQuery");
        }
    }, [hydrated, query]);

    return {
        data,
        movies,
        error,
        loading,
        input,
        query,
        fav,
        hydrated,
        loadingMore,
        loadMoreRef,
        hasMore,
        setInput,
        searchMovies,
        addFavoriteMovie
    }
}

export default useMovies