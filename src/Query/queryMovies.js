import {gql} from '@apollo/client';

export const GET_ALL_MOVIES = gql` 
    query {
        getAllMovies {
           _id, title, titleEn, year, rating, genres {_id, genre, genreEn}, director {_id, fullName, fullNameEn}, poster, description
        }
    }
`

export const GET_MOVIE_BY_TITLE = gql`
    query getMoviesByTitle($titleEn: String!) {
        getMovieByTitle( titleEn: $titleEn) {
            _id, title, titleEn, year, rating, genres {_id, genre, genreEn}, director {_id, fullName, fullNameEn}, poster, description
        }
    }
`

export const GET_MOVIES_BY_DIRECTOR = gql`
    query getMoviesByDirector($fullNameEn: String!) {
        getMoviesByDirector( fullNameEn: $fullNameEn) {
            _id, title, titleEn, year, rating, genres {_id, genre, genreEn}, director {_id, fullName, fullNameEn}, poster, description
        }
    }
`

export const GET_MOVIES_BY_GENRE = gql`
    query getMoviesByGenre($genreEn: String!) {
        getMoviesByGenre( genreEn: $genreEn) {
            _id, title, titleEn, year, rating, genres {_id, genre, genreEn}, director {_id, fullName, fullNameEn}, poster, description
        }
    }
`
export const CREATE_MOVIE = gql`
    mutation createMovie(
        $title: String!
        $titleEn: String!
        $year: Int!
        $rating: Float!
        $genres: [InputGenre]!
        $director: [InputDirector]!
        $description: String!
        $poster: String!
    ) {
        createMovie(
            title: $title
            titleEn: $titleEn
            year: $year
            rating: $rating
            genres: $genres
            director: $director
            description: $description
            poster: $poster
        ) {
            title
            titleEn
            year
            rating
            genres { genre genreEn }
            director { fullName fullNameEn }
            poster
            description
        }
    }
`;

export const UPDATE_MOVIE = gql`
    mutation updateMovie(
        $_id: ID
        $title: String
        $titleEn: String
        $year: Int
        $rating: Float
        $genres: [InputGenre]
        $director: [InputDirector]
        $description: String
        $poster: String
    ) {
        updateMovie(
            _id: $_id
            title: $title
            titleEn: $titleEn
            year: $year
            rating: $rating
            genres: $genres
            director: $director
            description: $description
            poster: $poster
        ) {
            _id
            title
            titleEn
            year
            rating
            genres { genre }
            director { fullName }
            poster
            description
        }
    }
`;

export const DELETE_MOVIE = gql`
    mutation deleteMovie($_id: ID!) {
        deleteMovie(_id: $_id)
    }
`;