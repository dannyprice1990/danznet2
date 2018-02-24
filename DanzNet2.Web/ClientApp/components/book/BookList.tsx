import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as BooksStore from '../../store/Books';
import axios from 'axios';
import { BookModel } from './models';

type BookListProps =
    BooksStore.BooksState
    & typeof BooksStore.actionCreators
    & RouteComponentProps<{}>;

export class BookList extends React.Component<BookListProps, {}> {
    componentWillMount() {
        this.props.fetchBooks();
    }
    renderBookItem(book: BookModel) {
        return <li key={book.id}>{book.title}</li>;
    }
    public render() {
        const { books } = this.props;

        // Renders Books
        const listItems = books.map((book) =>
            this.renderBookItem(book)
        );

        return (
            <ul>{listItems}</ul>
            );
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
    BooksStore.actionCreators                 // Selects which action creators are merged into the component's props
)(BookList) as typeof BookList;