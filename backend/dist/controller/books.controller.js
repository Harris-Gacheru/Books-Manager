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
exports.deleteBook = exports.updateBook = exports.getBook = exports.getBooks = exports.createBook = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlconfig_1 = __importDefault(require("../config/sqlconfig"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
        const { name, pages, image, author } = req.body;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('name', mssql_1.default.VarChar, name)
            .input('pages', mssql_1.default.Int, pages)
            .input('image', mssql_1.default.VarChar, image)
            .input('author', mssql_1.default.VarChar, author)
            .execute('createBook');
        res.json({ message: 'Book created successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createBook = createBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const books = yield pool.request().execute('getbooks');
        if (!books.recordset[0]) {
            res.json({ message: 'No books available' });
        }
        res.json(books.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const book = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getbook');
        if (!book.recordset[0]) {
            res.json({ message: `Book with id ${id} does not exist` });
        }
        else {
            res.json(book.recordset[0]);
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getBook = getBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { pages, image } = req.body;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const book = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getbook');
        if (book.recordset[0]) {
            yield pool.request()
                .input('id', mssql_1.default.VarChar, id)
                .input('pages', mssql_1.default.Int, pages)
                .input('image', mssql_1.default.VarChar, image)
                .execute('updatebook');
            res.json({ message: 'Updated successfully' });
        }
        else {
            res.json({ message: `Book with id ${id} does not exist` });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        let book = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getbook');
        if (book.recordset[0]) {
            yield pool.request()
                .input('id', mssql_1.default.VarChar, id)
                .execute('deletebook');
            res.json({ message: 'Deleted successfully' });
        }
        else {
            res.json({ message: `Book with id ${id} does not exist` });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteBook = deleteBook;
//# sourceMappingURL=books.controller.js.map