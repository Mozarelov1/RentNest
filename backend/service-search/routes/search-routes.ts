import { Router } from 'express';

const searchController = require("../controllers/searchController")

const router = Router();

router.post('/index', (req, res, next) => searchController.index(req, res, next));
router.get('/search', (req, res, next) => searchController.search(req, res, next));

module.exports = router