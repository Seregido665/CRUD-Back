const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida!"],
    minLength: [8, "Almenos 8 caracteres!"],
  },
});


/*
// --- HASHEO DE contraseñas --> SOLO PARA React ---
// .pre PARA INDICAR QUE SE HACE ANTES DE save
userSchema.pre("save", function (next) {   
  const user = this;

  // PARA COMPROBAR QUE NO SE HA CAMBIADO LA CONTRASEÑA
  // Y QUE NO SE hashee DE NUEVO.
  if (!user.isModified("password")) {  
    return next();
  }

  // VALOR ALEATORIO UNICO A MI CONTRASEÑA
  // CON 10 RONDAS DE ENCRIPTACION.
  const salt = bcrypt.genSaltSync(10);

  // ENCRIPTA LA CONTRASEÑA
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  
  // Y CAMBIAMOS NUESTRA CONTRASEÑA POR EL hasheo RESULTANTE
  user.password = hashedPassword;
});
*/

module.exports = mongoose.model("User", userSchema);
