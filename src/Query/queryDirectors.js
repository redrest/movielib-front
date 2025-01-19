import {gql} from '@apollo/client';

export const GET_ALL_DIRECTORS = gql`
    query {
        getAllDirectors {
            _id, fullName, fullNameEn, dateOfBirth, placeOfBirth, career, poster
        }
    }
`

export const GET_DIRECTOR_BY_NAME = gql`
    query getDirectorByName($fullNameEn: String!) {
        getDirectorByName(fullNameEn: $fullNameEn) {
            _id, fullName, fullNameEn, dateOfBirth, placeOfBirth, career, poster
        }
    }
`

export const CREATE_DIRECTOR = gql`
    mutation createDirector(
        $fullName: String!
        $fullNameEn: String!
        $dateOfBirth: String!
        $placeOfBirth: String!
        $career: [String!]!
        $poster: String!
    ) {
        createDirector(
            fullName: $fullName
            fullNameEn: $fullNameEn
            dateOfBirth: $dateOfBirth
            placeOfBirth: $placeOfBirth
            career: $career
            poster: $poster
        ) {
            fullName
            fullNameEn
            dateOfBirth
            placeOfBirth
            career
            poster
        }
    }
`;

export const UPDATE_DIRECTOR = gql`
    mutation updateDirector(
        $_id: ID
        $fullName: String
        $fullNameEn: String
        $dateOfBirth: String
        $placeOfBirth: String
        $career: [String]
        $poster: String
    ) {
        updateDirector(
            _id: $_id
            fullName: $fullName
            fullNameEn: $fullNameEn
            dateOfBirth: $dateOfBirth
            placeOfBirth: $placeOfBirth
            career: $career
            poster: $poster
        ) {
            _id
            fullName
            fullNameEn
            dateOfBirth
            placeOfBirth
            career
            poster
        }
    }
`;

export const DELETE_DIRECTOR = gql`
    mutation deleteDirector($_id: ID!) {
        deleteDirector(_id: $_id)
    }
`;

