import { GetUserData, Weather, SearchMoviesData, SearchMoviesVars, FavMovie } from "./types/graphql.types";
import { gql, type TypedDocumentNode } from "@apollo/client";

export const SIGNUP = gql`
    mutation Signup ($input: SignupInput!) {
        signup(input:$input){
            user{
                id
                name
                email
                city
            }
            token
        }
    }
`

export const GET_USER:TypedDocumentNode<GetUserData> = gql`
    query getUser {
        me {
            id
            email
            name
            city
        }
    }
`

export const GET_WEATHER:TypedDocumentNode<Weather> = gql`
    query GetWeather {
        getWeather {
            city
            humidity
            windSpeed
            temp
            description
            iconUrl
            feelsLike
        }
    }
`
export const SEARCH_MOVIES: TypedDocumentNode<SearchMoviesData, SearchMoviesVars> = gql`
    query SearchMovies($query: String!, $page: Int) {
        searchMovies(query: $query, page: $page) {
            movies {
                id
                imdbID
                title
                year
                type
                poster
            }
            total
        }
    }
`

export const FAVORITE_MOVIES:TypedDocumentNode<FavMovie> = gql`
    query favoriteMovies {
        favoriteMovies {
            movie {
                id
                title
                poster
                year
                type
            }
        }
    }

`