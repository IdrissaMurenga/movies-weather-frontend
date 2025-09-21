export type Weather = {
    getWeather: {
        temp: number;
        city: string;
        iconUrl: string
        description: string;
        humidity: number;
        windSpeed: number;
        feelsLike: number;
    } | null
};

export type GetUserData = {
    me: {
        id: string;
        email: string;
        name: string | null;
        city: string | null;
    };
};

export type Movie = {
    id: string;
    imdbID: string;
    title: string;
    year: string;
    type: string;
    poster?: string | null;
    provider: string;
};
export type SearchMoviesData = {
    searchMovies: {
        total: number;
        movies: Movie[];
    };
};
export type SearchMoviesVars = {
    query: string;
    page?: number | null;
};
export type FavMovie = {
    favoriteMovies: {
        movie: {
            id: string;
            imdbID: string;
            title: string;
            year: string;
            type: string;
            poster?: string | null;
            provider: string;
        }
    }[]
}

export type AddFavType = {
    addFavorite : {
            movie :{
                imdbID : string
                title : string
                year: string
                type : string
                poster : string
            }
        }
}

export type RemoveFavoriteData = { removeFavorite: boolean };
