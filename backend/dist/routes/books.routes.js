"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controller/books.controller");
const verifytoken_1 = require("../middleware/verifytoken");
const router = express_1.default.Router();
router.get('/', (req, res) => { res.send('Get books'); });
router.post('/create', verifytoken_1.verifyToken, books_controller_1.createBook);
router.get('/books', books_controller_1.getBooks);
router.get('/books/:id', verifytoken_1.verifyToken, books_controller_1.getBook);
router.patch('/books/:id', verifytoken_1.verifyToken, books_controller_1.updateBook);
router.delete('/books/:id', verifytoken_1.verifyToken, books_controller_1.deleteBook);
exports.default = router;
//# sourceMappingURL=books.routes.js.map