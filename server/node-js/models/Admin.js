const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  }, // Utilisez `email` au lieu de `username`
  password: { type: String, required: true },
  resetPasswordToken: String, // Toujours utile pour la réinitialisation du mot de passe
  resetPasswordExpires: Date, // Idem pour l'expiration du token
});

// Hash le mot de passe avant de sauvegarder un nouvel administrateur ou de mettre à jour son mot de passe
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Méthode pour comparer le mot de passe entré avec le hash stocké
AdminSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;


