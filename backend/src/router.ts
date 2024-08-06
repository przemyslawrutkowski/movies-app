import { Router } from "express";
import { getMovies } from "./handlers/movies.js";
import { getMovie } from "./handlers/movies.js";
import { getGenres } from "./handlers/genres.js";
import { signUp } from "./handlers/users.js";
import { getReviews } from "./handlers/reviews.js";
import { createReview } from "./handlers/reviews.js";
import { protect } from "./modules/auth.js";

const router = Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);
router.get('/genres', getGenres);
router.post('/users', signUp);
router.get('/reviews/:id', getReviews);
router.post('/reviews', protect, createReview);

export default router;