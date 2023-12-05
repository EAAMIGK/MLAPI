const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const analyzeRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const {
	createAnalyze,
	getAllAnayzesByUser,
} = require('../controllers/analyze');

analyzeRouter.post('/', protect, upload.single('image'), createAnalyze); // http://localhost:3001/api/analysis/
analyzeRouter.get('/', protect, getAllAnayzesByUser); // http://localhost:3001/api/analysis/

module.exports = analyzeRouter;
