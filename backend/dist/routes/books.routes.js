"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mssql_1 = __importDefault(require("mssql"));
const sqlconfig_1 = __importDefault(require("../config/sqlconfig"));
const books_controller_1 = require("../controller/books.controller");
const verifytoken_1 = require("../middleware/verifytoken");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Getting books');
    try {
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const books = yield pool.request().execute('getbooks');
        if (!books.recordset[0]) {
            res.json({ message: 'No books available' });
        }
        res.json(books.recordset).send('Books');
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
router.post('/create', verifytoken_1.verifyToken, books_controller_1.createBook);
router.get('/books', books_controller_1.getBooks);
router.get('/books/:id', verifytoken_1.verifyToken, books_controller_1.getBook);
router.patch('/books/:id', verifytoken_1.verifyToken, books_controller_1.updateBook);
router.delete('/books/:id', verifytoken_1.verifyToken, books_controller_1.deleteBook);
exports.default = router;
//# sourceMappingURL=books.routes.js.map