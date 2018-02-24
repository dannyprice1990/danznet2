import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import { BookModel } from '../components/book/models';
import bookApi from '../api/mockBookApi';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BooksState {
    books: BookModel[];
    isLoading: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddBookAction {
    type: 'ADD_BOOK';
    book: BookModel;
}
interface FetchBooksAction {
    type: 'FETCH_BOOKS';
}
interface FetchBooksSuccessAction {
    type: 'FETCH_BOOKS_SUCCESS';
    books: BookModel[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = AddBookAction | FetchBooksAction | FetchBooksSuccessAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    fetchBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        return bookApi.getAll()
            .then(books => {
                dispatch({ type: 'FETCH_BOOKS_SUCCESS', books });
            }).catch(error => {
                throw (error);
            });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: BooksState = { books: [], isLoading: false };

export const reducer: Reducer<BooksState> = (state: BooksState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_BOOK':
            return state;
        case 'FETCH_BOOKS':
            return {
                books: state.books,
                isLoading: true
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                books: action.books,
                isLoading: true
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};
