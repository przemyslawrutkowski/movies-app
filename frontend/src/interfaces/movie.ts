export default interface MovieI {
    _id: string;
    title: string;
    year: string;
    released: string;
    runtime: string;
    genres: string[];
    directors: string[];
    writers: string[];
    actors: string[];
    plot: string;
    countries: string[];
    awards: string;
    poster: string;
    rating: number | null;
}