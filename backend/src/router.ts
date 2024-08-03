import { Router } from "express";
import { getMovies } from "./handlers/movies.js";
import { getGenres } from "./handlers/genres.js";
import { signUp } from "./handlers/users.js";

const router = Router();

router.get('/movies', getMovies);
router.get('/genres', getGenres);
router.post('/users', signUp);

export default router;