import { Router } from "express";
import { getMovies } from "./handlers/movies.js";
import { getGenres } from "./handlers/genres.js";

const router = Router();

router.get('/movies', getMovies);
router.get('/genres', getGenres);

export default router;