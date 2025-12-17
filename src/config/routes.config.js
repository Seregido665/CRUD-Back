const express = require("express");
const router = express.Router();

// --- AGRUPAMOS TODAS LAS LLAMADAS DE LA APLICACION ---
// -- Aqui traemos las operacion especificas de cada MODEL --
const booksController = require("../controllers/book.controller");
const usersController = require("../controllers/users.controller");
const librariesController = require("../controllers/libraries.controller");

// -- Y aqui las rutas especificas de cada llamada --
// --- BOOKS ---
router.get("/books", booksController.getBooks);
router.get("/books/search", booksController.searchBooks);
router.get("/books/:id", booksController.getBookById);
router.post("/books", booksController.createBook);
router.delete("/books/:id", booksController.deleteBook);
router.patch("/books/:id", booksController.updateBook);

// --- USERS --- 
router.post("/register", usersController.registerUser);
router.get("/users", usersController.getUsers);
router.post("/login", usersController.loginUser);

// --- LIBRARIES --- 
//router.get("/libraries", librariesController.getLibraries);

module.exports = router;
