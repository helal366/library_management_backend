"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BookControllers_1 = require("./app/controllers/BookControllers");
const BorrowBookControllers_1 = require("./app/controllers/BorrowBookControllers");
exports.app = (0, express_1.default)();
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("CLIENT_URL2:", process.env.CLIENT_URL2);
exports.app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL2, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use('/api/books', BookControllers_1.booksRoutes);
exports.app.use('/api/borrow_books', BorrowBookControllers_1.borrowBooksRoutes);
exports.app.get('/', (req, res, next) => {
    try {
        res.send('Welcome to Library Management System.');
    }
    catch (error) {
        next(error);
    }
});
exports.app.use((error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
        error
    });
});
//# sourceMappingURL=app.js.map