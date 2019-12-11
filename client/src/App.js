import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const client = new ApolloClient();

console.log(client);

const GET_BOOKS = gql`
	query GetBooks {
		books {
			title
			author
		}
	}
`;

const ADD_BOOK = gql`
	mutation AddBook($title: String!, $author: String!) {
		createBook(title: $title, author: $author) {
			title
			author
		}
	}
`;

function Books() {
	const { loading, data } = useQuery(GET_BOOKS);
	if (loading) return <p>Loading...</p>;

	if (data && data.books) {
		return data.books.map(({ title, author }, index) => (
			<div key={index}>
				<p>
					{title} by {author}
				</p>
			</div>
		));
	} else {
		return <p>No books :(</p>
	}
}

function AddBook() {
	let titleInput, authorInput;
	const [addBook, { data }] = useMutation(ADD_BOOK, {
		refetchQueries: ['GetBooks']
	});

	return (
		<div>
			<h3>
				Add a book!{' '}
				<span role="img" aria-label>
					📖
				</span>
			</h3>
			<form
				onSubmit={e => {
					e.preventDefault();
					addBook({
						variables: { title: titleInput.value, author: authorInput.value }
					});
					authorInput.value = '';
					titleInput.value = '';
				}}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'row', margin: '20px 0'}}>
					<input
						ref={el => {
							titleInput = el;
						}}
					/>
					<span style={{margin: '0 7px'}}>by: </span>
					<input
						ref={el => {
							authorInput = el;
						}}
					/>
				</div>
				<button
					type="submit"
					style={{
						marginTop: '10px',
						border: 'none',
						borderRadius: '4px',
						background: 'black',
						color: 'white',
						cursor: 'pointer',
						padding: '10px 30px',
						fontSize: '1em'
					}}
				>
					Add Book
				</button>
			</form>
		</div>
	);
}

const App = () => (
	<ApolloProvider client={client}>
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
		>
			<h1>
				I{' '}
				<span role="img" aria-label>
					Love 💖
				</span>{' '}
				Books!{' '}
				<span role="img" aria-label>
					💫
				</span>
			</h1>
			<AddBook />
			<h3>
				Books in the Library{' '}
				<span role="img" aria-label>
					📚
				</span>
			</h3>
			<Books />
		</div>
	</ApolloProvider>
);

export default App;
