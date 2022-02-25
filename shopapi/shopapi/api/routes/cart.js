const express = require("express");
const router = express.Router();
const { add, display, remove, removeAll, update} = require("../../controllers/cart");
const { ADD, DISPLAY, REMOVE, REMOVEALL, UPDATE } = require("../../utils/config").ROUTES.CART;

router.post(ADD, add);
router.post(DISPLAY, display);
router.post(REMOVE, remove);
router.post(REMOVEALL, removeAll);
router.post(UPDATE, update);

module.exports = router;
