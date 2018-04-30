import delay from './delay';
import { BookModel } from '../components/book/models';
import { BookStatus } from '../components/book/models';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const books: BookModel[] = [
    {
        id: 1,
        title: "The Obstacle is the Way",
        rating: 5,
        review: "",
        author: "Ryan Holiday",
        url: "http://www.google.com",
        imageUrl: "https://images-fe.ssl-images-amazon.com/images/I/517Zp0Ul6OL.jpg",
        status: BookStatus.toRead,
        readDate: null
    },
    {
        id: 2,
        title: "How to Win Friends & Influence People",
        rating: 4,
        review: "",
        author: "Dale Carnegie",
        url: "http://www.google.com",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/718%2Bbq5ApRL.jpg",
        status: BookStatus.toRead,
        readDate: null
    },
    {
        id: 3,
        title: "Clean Code: Writing Code for Humans",
        rating: 5,
        review: "",
        author: "Ryan Holiday",
        url: "http://www.google.com",
        imageUrl: "http://www.google.com",
        status: BookStatus.toRead,
        readDate: null
    },
    {
        id: 4,
        title: "Architecting Applications for the Real World",
        rating: 5,
        review: "",
        author: "Ryan Holiday",
        url: "http://www.google.com",
        imageUrl: "http://www.google.com",
        status: BookStatus.toRead,
        readDate: null
    },
    {
        id: 5,
        title: "Becoming an Outlier: Reprogramming the Developer Mind",
        rating: 5,
        review: "",
        author: "Ryan Holiday",
        url: "http://www.google.com",
        imageUrl: "http://www.google.com",
        status: BookStatus.toRead,
        readDate: null
    },
    {
        id: 6,
        title: "Web Component Fundamentals",
        rating: 5,
        review: "",
        author: "Ryan Holiday",
        url: "http://www.google.com",
        imageUrl: "http://www.google.com",
        status: BookStatus.toRead,
        readDate: null
    }
];

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
function generateId(book: any) {
    return replaceAll(book.title, ' ', '-');
};

class BookApi {

    static getAll(): Promise<BookModel[]> {
        return new Promise((resolve: Function, reject: Function) => {
            setTimeout(() => {
                resolve(Object.assign([], books));
            }, delay);
        });
    }

    static savebook(book: any) {
        book = Object.assign({}, book); // to avoid manipulating object passed in.
        return new Promise((resolve: Function, reject: Function) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minbookTitleLength = 1;
                if (book.title.length < minbookTitleLength) {
                    reject(`Title must be at least ${minbookTitleLength} characters.`);
                }

                if (book.id) {
                    const existingbookIndex = books.findIndex(a => a.id == book.id);
                    books.splice(existingbookIndex, 1, book);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids and watchHref's for new books in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    book.id = generateId(book);
                    book.watchHref = `http://www.pluralsight.com/books/${book.id}`;
                    books.push(book);
                }

                resolve(book);
            }, delay);
        });
    }

    static deletebook(bookId: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfbookToDelete = books.findIndex(book => {
                    return book.id == bookId;
                });
                books.splice(indexOfbookToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default BookApi;