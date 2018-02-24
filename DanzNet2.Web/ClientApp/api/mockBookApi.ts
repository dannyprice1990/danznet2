import delay from './delay';
import { BookModel } from '../components/book/models';


// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const books: BookModel[] = [
    {
        id: 1,
        title: "Building Applications in React and Flux"
    },
    {
        id: 2,
        title: "Building Applications in React and Flux"
    },
    {
        id: 3,
        title: "Clean Code: Writing Code for Humans"
    },
    {
        id: 4,
        title: "Architecting Applications for the Real World"
    },
    {
        id: 5,
        title: "Becoming an Outlier: Reprogramming the Developer Mind"
    },
    {
        id: 6,
        title: "Web Component Fundamentals"
    }
];

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (book: any) => {
    return replaceAll(book.title, ' ', '-');
};

class BookApi {
    static getAll(): Promise<BookModel[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], books));
            }, delay);
        });
    }

    static savebook(book: any) {
        book = Object.assign({}, book); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
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