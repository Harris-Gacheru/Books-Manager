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
exports.login = exports.register = void 0;
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mssql_1 = __importDefault(require("mssql"));
const sqlconfig_1 = __importDefault(require("../config/sqlconfig"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
        const { username, email, password } = req.body;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const user = yield pool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getuser');
        if (user.recordset[0]) {
            res.status(400).json({ message: `User already exists` });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.VarChar, id)
                .input('username', mssql_1.default.VarChar, username)
                .input('email', mssql_1.default.VarChar, email)
                .input('password', mssql_1.default.VarChar, password)
                .execute('registeruser');
            res.status(200).json({ message: 'User created successfully' });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let pool = yield mssql_1.default.connect(sqlconfig_1.default);
        const user = yield pool.request()
            .input('email', mssql_1.default.VarChar, email)
            .execute('getuser');
        if (user.recordset[0]) {
            res.send('User exists');
            if (user.recordset[0].password === password) {
                const payload = yield pool.request().query(`select username, email from users where email = '${email}'`);
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
                res.status(200).json({ message: 'Logged in successfully', user: user.recordset[0], token: token });
            }
            else {
                res.status(400).send({ message: 'Invalid credentials' });
            }
        }
        else {
            res.status(400).send({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.login = login;
//# sourceMappingURL=users.controller.js.map