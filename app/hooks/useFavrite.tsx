"use client"
import { useMutation } from '@apollo/client/react';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '@/libs/graphql';
import { FAVORITE_MOVIES } from '@/libs/graphql';


const useFavorite = () => {

    //mutation for adding and removing favorite movies
    const [addFavorite] = useMutation(ADD_FAVORITE, {
        refetchQueries: [{ query: FAVORITE_MOVIES }]
    });

    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [{ query: FAVORITE_MOVIES }]
    });

    // functions to add and remove favorite movie
    const addFav = async (imdbID: string) => {
        const res = await addFavorite({ variables: { imdbID } });
        return res.data?.addFavorite;
    }

    const removeFav = async (imdbID: string) => {
        const res = await removeFavorite({ variables: { imdbID } });
        return res.data?.removeFavorite;
    }

    const removeFavoriteMovie = async (imdbID: string) => {
        const remove = await removeFav(imdbID)
        return remove
    }

    return { addFav , removeFavoriteMovie}
}

export default useFavorite
