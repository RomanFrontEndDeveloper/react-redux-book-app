import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
	books: [],
	isLoadingByAPI: false,
};

export const fetchBook = createAsyncThunk(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (error) {
			thunkAPI.dispatch(setError(error.message));
			throw error;
		}
	}
);

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.books.push(action.payload);
		},
		deleteBook: (state, action) => {
			state.books = state.books.filter(
				(book) => book.id !== action.payload
			);
		},
		toggleFavorite: (state, action) => {
			state.books.forEach((book) => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite;
				}
			});
		},
	},

	// ✅ Новий формат extraReducers (builder callback)
	extraReducers: (builder) => {
		builder
			.addCase(fetchBook.pending, (state) => {
				state.isLoadingByAPI = true;
			})
			.addCase(fetchBook.fulfilled, (state, action) => {
				state.isLoadingByAPI = false;
				if (action.payload.title && action.payload.author) {
					state.books.push(createBookWithId(action.payload, 'API'));
				}
			})
			.addCase(fetchBook.rejected, (state) => {
				state.isLoadingByAPI = false;
			});
	},
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingByAPI;

export default booksSlice.reducer;
