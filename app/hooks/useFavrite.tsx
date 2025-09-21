"use client"
import { useMutation } from '@apollo/client/react';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '@/libs/graphql';
import { FAVORITE_MOVIES } from '@/libs/graphql';
const useFavorite = () => {

    const [addFavorite] = useMutation(ADD_FAVORITE, {
        refetchQueries: [{ query: FAVORITE_MOVIES }]
    });
    const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
        refetchQueries: [{ query: FAVORITE_MOVIES }]
    });

    const addFav = async (imdbID: string) => {
        const res = await addFavorite({ variables: { imdbID } });
        return res.data?.addFavorite;
    }
    const removeFav = async (imdbID: string) => {
        const res = await removeFavorite({ variables: { imdbID } });
        return res.data?.removeFavorite;
    }
    return { addFav , removeFav}
    
}

export default useFavorite
