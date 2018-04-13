import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import bookApi from 'ClientApp/api/mockBookApi';
import { BookModel } from '../book/models';

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
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

          

           
        </div>;
    }

    fetchBooks() {
        return bookApi.getAll()
            .then(books => {
                
            }).catch(error => {
                throw (error);
            });
    }
}