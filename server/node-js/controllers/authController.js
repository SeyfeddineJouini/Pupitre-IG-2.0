const localPassport = require("../config/passport");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const { sendResetPasswordEmail } = require("../services/emailService");

exports.login = (req, res, next) => {
  localPassport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: info.message || "Login failed" });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json({ success: true, message: "Connexion réussie." });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  res.clearCookie("connect.sid");
  res.redirect("/");
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    //console.log("Admin found:", admin);
    if (!admin) {
      return res
        .status(200)
        .json({ message: "Si votre compte existe, un email a été envoyé." });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString("hex");
    //console.log("Reset token:", resetToken); // Log the reset token

    // Stocker le token hashé (pour des raisons de sécurité) dans la base de données
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    //console.log("Hashed token:", hashedToken); // Log the hashed token

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await admin.save();
    //console.log("Admin saved:", admin);

    // Envoyer l'email
    await sendResetPasswordEmail(admin, resetToken); // Notez l'utilisation du token non hashé ici
    //console.log("Email sent");

    res
      .status(200)
      .json({ message: "Si votre compte existe, un email a été envoyé." });
  } catch (err) {
    console.error("Error in /forgot-password:", err);
    res.status(500).json({ message: "Une erreur s’est produite." });
  }
};

exports.getResetPassword = async (req, res) => {
  const { token } = req.params;
  //console.log("Token:", token); // Log the token

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //console.log("Hashed token:", hashedToken); // Log the hashed token

  const admin = await Admin.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!admin) {
    return res.status(400).json({ message: "Token invalide ou expiré." });
  }

  // Redirection vers la page de réinitialisation du mot de passe (optionnel)
  res.redirect(`${process.env.FRONT_URL}/new-password/${token}`);
};

exports.postResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body; // Assurez-vous que c'est le mot de passe en clair
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res
        .status(400)
        .json({ message: "Token de réinitialisation invalide ou expiré." });
    }

    // Ici, vous définissez simplement le nouveau mot de passe en clair,
    // le hook `pre('save')` s'occupera de le hasher correctement avant la sauvegarde
    admin.password = password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save(); // Le hook `pre('save')` est appelé ici pour hasher le mot de passe

    res.json({
      success: true,
      message: "Le mot de passe a été réinitialisé avec succès.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe." });
  }
};
