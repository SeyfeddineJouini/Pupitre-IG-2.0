const express = require("express");
const router = express.Router();
const localPassport = require("../config/passport");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");
const { getDashboard } = require("../controllers/dashboardController");
const {
  getResetPassword,
  postResetPassword,
  login,
  logout,
  forgotPassword,
} = require("../controllers/authController");

router.get("/logout", logout);
router.get("/dashboard-admin", ensureAuthenticated, getDashboard);
router.post("/login", localPassport.authenticate("local"), login);
router.post("/forgot-password", forgotPassword);

router.get("/reset-password/:token", getResetPassword);
router.post("/reset-password/:token", postResetPassword);

module.exports = router;
