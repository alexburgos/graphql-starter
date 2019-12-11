import React, { useState, useEffect } from 'react';
import bookService from './services/';

function App() {
	const [books, setBooks] = useState(null);

	useEffect(() => {
		if (!books) {
			getBooks();
		}
	});

	const getBooks = async () => {
		let res = await bookService.getAll();
		setBooks(res);
	};

	const renderBook = book => {
		return (
			<li key={book._id} className="list__item book">
				<h3 className="book__name">{book.title}</h3>
				<p className="book__description">{book.author}</p>
			</li>
		);
	};

	return (
		<div className="App">
			<ul className="list">
				{books && books.length > 0 ? (
					books.map(book => renderBook(book))
				) : (
					<p>No books found</p>
				)}
			</ul>
		</div>
	);
}

export default App;
