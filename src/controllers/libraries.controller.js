// -- LIBRARIES --
/*app.get("/libraries", (req, res) => {
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
*/