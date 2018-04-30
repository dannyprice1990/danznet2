import * as React from 'react';
import { BookModel } from '../book/models';
import { BookListRow } from './BookListRow';
import './book.css';

export const BookList = (props: { books: BookModel[] }) =>
    <div className="row">
   
        <table className="table">
            <tbody>
                {
                    props.books.map((book: BookModel) =>
                        <BookListRow key={book.id} book={book} />
                    )
                }
            </tbody>
        </table>
    </div>