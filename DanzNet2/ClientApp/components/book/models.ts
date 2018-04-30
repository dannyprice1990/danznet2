export interface BookModel {
    id: number;
    title: string;
    rating: number;
    review: string;
    author: string;
    url: string;
    imageUrl: string;
    status: BookStatus;
    readDate: Date | null;
}
export enum BookStatus {
    read = 1,
    reading = 2,
    toRead = 3
}