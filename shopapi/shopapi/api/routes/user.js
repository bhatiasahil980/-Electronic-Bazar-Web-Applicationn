const express = require("express");
const router = express.Router();
const { show, login, register, update } = require("../../controllers/user");
const { LOGIN, REGISTER, PROFILE, UPDATE } = require("../../utils/config").ROUTES.USER;
router.post(PROFILE, show);
router.post(LOGIN, login);
router.post(UPDATE, update);
router.post(REGISTER, register);
module.exports = router;
