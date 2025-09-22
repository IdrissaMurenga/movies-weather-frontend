import { GetUserData, Weather, SearchMoviesData, SearchMoviesVars, FavMovie, AddFavType, RemoveFavoriteData } from "./types/graphql.types";
import { gql, type TypedDocumentNode } from "@apollo/client";

//QUERIES
export const SIGNUP = gql`
    mutation Signup ($input: SignupInput!) {
        signup(input:$input){
            user{
                id
                name
                email
                city
                weather {
                    city
                    humidity
                    windSpeed
                    temp
                    description
                    iconUrl
                    feelsLike
                }
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
                imdbID
                title
                poster
                year
                type
            }
        }
    }

`

// MUTATIONS
export const ADD_FAVORITE:TypedDocumentNode<AddFavType> = gql`
    mutation AddFavorite ($imdbID:String!){
        addFavorite(imdbID:$imdbID) {
            movie{
                id
                imdbID
                title
                year
                type
                poster
            }
        }
    }
`

export const REMOVE_FAVORITE:TypedDocumentNode<RemoveFavoriteData> = gql`
    mutation removeFavorite($imdbID: String!) {
        removeFavorite(imdbID:$imdbID)
    }
`