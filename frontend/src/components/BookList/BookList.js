import './BookList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
	deleteBook,
	toggleFavorite,
	selectBooks,
} from '../redux/slices/bookSlices';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
	selectTitleFilter,
	selectAuthorFilter,
	selectOnlyFavoriteFilter,
} from '../redux/slices/filterSlice';

const BookList = () => {
	const books = useSelector(selectBooks);

	const titleFilter = useSelector(selectTitleFilter);
	const authorFilter = useSelector(selectAuthorFilter);
	const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

	const dispatch = useDispatch();

	const handleDeleteBook = (id) => {
		dispatch(deleteBook(id));
	};

	const handletoggleFavorite = (id) => {
		dispatch(toggleFavorite(id));
	};

	const filteredBooks = books.filter((book) => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase());
		const matchesAuthor = book.author
			.toLowerCase()
			.includes(authorFilter.toLowerCase());
		const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
		return matchesTitle && matchesAuthor && matchesFavorite;
	});

	const highLightMatch = (text, filter) => {
		if (!filter) return text;

		const regex = new RegExp(`(${filter})`, 'gi');
		// console.log(text.split(regex));
		return text.split(regex).map((substring, i) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span key={i} className='highlight'>
						{substring}
					</span>
				);
			}
			return substring;
		});
	};

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, i) => (
						<li key={book.id}>
							<div className='book-info'>
								{++i}. {highLightMatch(book.title, titleFilter)}{' '}
								by{' '}
								<strong>
									{highLightMatch(book.author, authorFilter)}
								</strong>{' '}
								({book.source})
							</div>
							<div className='book-actions'>
								<span
									onClick={() =>
										handletoggleFavorite(book.id)
									}
								>
									{book.isFavorite ? (
										<BsBookmarkStarFill className='star-icon' />
									) : (
										<BsBookmarkStar className='star-icon' />
									)}
								</span>
								<button
									onClick={() => handleDeleteBook(book.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default BookList;
