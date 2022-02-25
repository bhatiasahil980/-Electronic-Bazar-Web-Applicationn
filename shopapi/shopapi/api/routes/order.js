const express = require("express");
const router = express.Router();
const { add, history, search, filter } = require("../../controllers/order");
const {  ADD, HISTORY, SEARCH, FILTER } = require("../../utils/config").ROUTES.ORDER;

router.post(ADD , add);
router.post(HISTORY, history);
router.post(SEARCH,search);
router.post(FILTER,filter);

module.exports = router;
