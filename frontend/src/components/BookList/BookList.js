import './BookList.css';
import { useSelector } from 'react-redux';

const BookList = () => {
	const books = useSelector((state) => state.books);
	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.lenght === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, i) => (
						<li key={i}>
							<div className='book-info'>
								{++i}. {book.title} by{' '}
								<strong>{book.autor}</strong>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default BookList;
