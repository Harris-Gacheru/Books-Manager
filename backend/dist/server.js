"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const apiRoute = '/api';
const PORT = process.env.PORT || 5690;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => { res.send('Welcome to books manager'); });
app.use(apiRoute, books_routes_1.default);
app.use(apiRoute, users_routes_1.default);
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map