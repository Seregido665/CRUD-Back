const BookModel = require("../models/Book.model");
const UserModel = require("../models/User.model");

// --- CONJUNTO DE OPERACIONES HECHAS CON LA BASE DE DATOS "books" ---
// ----- A --> routes.config.js
// - MUESTRA TODOS LOS LIBROS -
module.exports.getBooks = (req, res, next) => {
  BookModel.find()
    .populate("user")
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.log("entro", err);
      res.json(err);
    });
};

// -- PARA BUSCAR UN LIBRO POR EL AUTOR :React --
module.exports.searchBooks = (req, res, next) => {
  const authorQuery = req.query.author;
  BookModel.findOne({ author: authorQuery })
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
};

// - BUSCA UN LIBRO POR id -
module.exports.getBookById = (req, res, next) => {
  const id = req.params.id;

  BookModel.findById(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
};

// - CREA UN LIBRO -
module.exports.createBook = (req, res, next) => {
  const newBook = req.body;

  BookModel.create(newBook)
    .then((bookCreated) => {
      res.json("Book created successfully!!");
    })
    .catch((err) => {
      res.json(err);
    });
};

// -- BORRAR UN LIBRO :React ---
module.exports.deleteBook = (req, res, next) => {
  const id = req.params.id;

  BookModel.findByIdAndDelete(id)
    .then(() => {
      res.json("Book deleted successfully");
    })
    .catch((err) => {
      res.json(err);
    });
};

// -- ACTUALIZAR UN LIBRO :React --
module.exports.updateBook = (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;

  BookModel.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      res.json(err);
    });
};