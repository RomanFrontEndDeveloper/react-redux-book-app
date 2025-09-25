import './BookForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/actionCreators';

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [autor, setAutor] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title && autor) {
			const book = {
				title,
				autor,
			};

			dispatch(addBook(book));
			setTitle('');
			setAutor('');
		}
	};

	return (
		<div className='app-block book-form'>
			<h2>Add new Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='autor'>Autor: </label>
					<input
						type='text'
						id='autor'
						value={autor}
						onChange={(e) => setAutor(e.target.value)}
					/>
				</div>
				<button type='submit'>Add Book</button>
			</form>
		</div>
	);
};

export default BookForm;
