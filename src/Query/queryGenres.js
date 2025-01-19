import {gql} from '@apollo/client';

export const GET_ALL_GENRES = gql` 
    query {
        getAllGenres {
            _id, genre, genreEn
        }
    }
`

export const GET_GENRE_BY_GENRE_EN = gql`
    query getGenreByGenreEn($genreEn: String!) {
        getGenreByGenreEn(genreEn: $genreEn) {
            _id, genre, genreEn
        }
    }
`

export const CREATE_GENRE = gql`
    mutation createGenre($genre: String!, $genreEn: String!) {
        createGenre(genre: $genre, genreEn: $genreEn) {
            genre
            genreEn
        }
    }
`;

export const UPDATE_GENRE = gql`
    mutation updateGenre($_id: ID, $genre: String, $genreEn: String) {
        updateGenre(_id: $_id, genre: $genre, genreEn: $genreEn) {
            _id
            genre
            genreEn
        }
    }
`;

export const DELETE_GENRE = gql`
    mutation deleteGenre($_id: ID!) {
        deleteGenre(_id: $_id)
    }
`;
