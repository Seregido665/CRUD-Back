// AL CREAR EL PROYECTO --> npm instal PARA INSTALAR node_modules Y ACTUALIZAR package-lock.json

//  npm install express      --> Framework para crear servidores y APIs de manera sencilla y rápida.
//  npm install dotenv       --> Permite crear un .env
//  npm install mongoose     --> Para conectarme con MongoDB
//  npm install cors         --> Hace que la API sea accesibles desde otros dominios. 
//  npm install bcryptjs     --> Para encriptar contraseñas
//  npm install -D nodemon   --> Actualiza el localhost ante cualquier cambio.
// --> npm run dev


require("dotenv").config();                        // CARGA LOS DATOS DE .env
const mongoose = require("mongoose");              // IMPORTA LA LIBRERIA DE Node.js --> Mongoose
                                                      // LUEGO ESCRIBIR mongosh para comprobar que este instalado
                                                      // CREAR CUENTA EN CHROME EN MongoAtlas

const express = require("express");                 // IMPORTA LAS LIBRERIAS DE Express
const cors = require("cors");
const BookModel = require("./models/Book.model");
const LibraryModel = require("./models/Library.model");
const UserModel = require("./models/User.model");
const app = express();
const PORT = process.env.PORT || 3000;              // COGE EL DATO "PORT" DE .env

// --- CONFIGURACIÓN CORS ---
app.use(cors()); // <-- Aquí lo añadimos
app.use(express.json()); // middleware para parsear JSON

// --- IMPORTA LOS DATOS DE NUESTROS .json ---
/*
const path = require("path");          // IMPORTA path, LO CUAL PERMITE LLAMAR .jsons DEL PROYECTO
const dataBooks = require(path.join(__dirname, "data.json"));
const dataLibraries = require(path.join(__dirname, "libraries.json"));
*/

// --- CONEXION A LA BASE DE DATOS DE MongoDB ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });

app.use(express.json());







// --- RUTA RAIZ ---
app.get("/", (req, res, next) => {
  res.send("Hello, this is the Book API!");
});

// -- BOOKS --
// - MUESTRA TODOS LOS LIBROS -
app.get("/books", (req, res, next) => {
  BookModel.find()
    //.populate("user")   // PARA BUSCAR UN LIBROS POR EL USUARIO
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
});
// -- PARA BUSCAR UN LIBRO POR EL AUTOR :React --
app.get("/books/search", (req, res, next) => {
  const authorQuery = req.query.author;
  BookModel.findOne({ author: authorQuery })
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json(err);
    });
});
// - BUSCA UN LIBRO POR id -
app.get("/books/:id", (req, res, next) => {
  const id = req.params.id;
  BookModel.findById(id)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
});
// - CREA UN LIBRO
app.post("/books", (req, res, next) => {
  BookModel.create(req.body)
    .then(() => {
      res.json("Book created successfully!!");
    })
    .catch((err) => {
      res.json(err);
    });
});

// -- BORRAR UN LIBRO :React ---
app.delete("/books/:id", (req, res, next) => {
  const id = req.params.id;
  BookModel.findByIdAndDelete(id)
    .then(() => {
      res.json("Book deleted successfully");
    })
    .catch((err) => {
      res.json(err);
    });
});
// -- ACTUALIZAR UN LIBRO :React --
app.patch("/books/:id", (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  BookModel.findByIdAndUpdate(id, updates, { new: true })
    .then((updatedBook) => {
      res.json(updatedBook);
    })
    .catch((err) => {
      res.json(err);
    });
});







// -- USERS --
app.post("/users", (req, res, next) => {
  UserModel.create(req.body)
    .then(() => {
      res.json("Usuario creado correctamente");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/users", (req, res, next) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});


// -- LIBRARIES --
app.get("/libraries", (req, res) => {
  LibraryModel.find()
    .then((library) => {
      res.json(library);  
    })
    .catch((error) => {
      console.error(error);
      res.json(error);
    });
});

app.get("/libraries/:id", (req, res) => {
  const id = req.params.id;
  LibraryModel.findById(id)
    .then((library) => {
      res.json(library);  
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/libraries", (req, res) => {
  LibraryModel.create(req.body)
    .then((createdLibrary) => {
      res.json("Libreria creada!");  
    })
    .catch((error) => {
      res.json(error);
    });
});

app.delete("/libraries/:id", (req, res) => {
  const id = req.params.id;
  LibraryModel.findByIdAndDelete(id)
    .then(() => {
      res.json("Libreria borrada!");  
    })
    .catch((error) => {
      res.json(error);
    });
});



// -- CONSULTA EL PORT DE .env Y POR SI TARDA APARECE UN MENSAJE. --
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
