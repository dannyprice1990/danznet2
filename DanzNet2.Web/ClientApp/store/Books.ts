import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BooksState {
    count: number;
}
export interface Book {
    title: string;
    imageUrl: string;
}
