import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import bookApi from '../../api/mockBookApi';
import { BookModel } from '../book/models';
import { BookList } from './BookList';

interface BooksState {
    Books: BookModel[];
}

export class BooksContainer extends React.Component<RouteComponentProps<{}>, BooksState> {
    constructor() {
        super();

        this.state = { Books: [] };

        this.fetchBooks();
    }

    public render() {
        return <div>
            <h1>Books</h1>

            <BookList books={this.state.Books} />
        </div>;
    }

    fetchBooks() {
        return bookApi.getAll()
            .then(books => {
                this.setState({
                    Books: books
                })
            }).catch(error => {
                throw (error);
            });
    }
}