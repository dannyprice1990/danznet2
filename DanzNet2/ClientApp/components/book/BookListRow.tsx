import * as React from 'react';
import { BookModel } from '../book/models';
import ReactStars from 'react-stars'

export const BookListRow = (props: { book: BookModel }) =>
    <tr>
        <td>
            <img className='book-list-row-image' src={props.book.imageUrl} />
        </td>
        <td>
            <h3>{props.book.title}</h3>
            <h5>{props.book.author}</h5>
            <ReactStars count={5} size={24} color2={'#ffd700'} />
        </td>
        <td>
            <span>{props.book.rating}</span>
        </td>
    </tr>