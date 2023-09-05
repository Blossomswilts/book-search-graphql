import { gql } from '@apollo/client';
// Queries for front-end

// Query for logged in user
export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// // Query for all books
// export const QUERY_BOOKS = gql`
//     query books {
//         books {
//             _id
//             authors
//             description
//             title
//             image
//             link
//         }
//     }
// `;

// // Query for a single book
// export const QUERY_SINGLE_BOOK = gql`
//     query book($bookId: ID!) {
//         book(bookId: $bookId) {
//             _id
//             authors
//             description
//             title
//             image
//             link
//         }
//     }
// `;

