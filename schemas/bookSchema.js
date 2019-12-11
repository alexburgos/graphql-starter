import { gql } from 'apollo-server';

export default gql`
	type Book {
		id: ID!
		title: String!
		author: String!
	}

	extend type Query {
		book(id: ID!): Book!
		books: [Book!]!
	}

	extend type Mutation {
		createBook(title: String!, author: String!): Book!
	}
`;
