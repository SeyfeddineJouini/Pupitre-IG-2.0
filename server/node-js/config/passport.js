const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
          return done(null, false, {
            message: "Cet email n'est pas enregistré.",
          });
        }

        // Utilisez bcrypt.compare pour comparer le mot de passe entré par l'utilisateur avec le mot de passe haché
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return done(null, false, { message: "Mot de passe incorrect." });
        }

        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Admin.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
