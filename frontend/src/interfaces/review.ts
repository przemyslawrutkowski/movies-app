export default interface ReviewI {
    _id: string;
    movieId: string;
    userId: string;
    userUsername: string;
    rating: number;
    content: string;
    creationDate: string;
}