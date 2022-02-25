const express = require("express");
const router = express.Router();
const { add, display, searchByID, search, bestSellerDisplay, updateStocks } = require("../../controllers/product");
const { ADD, DISPLAY, SEARCHBYID, SEARCH, BESTSELLER, UPDATE } = require("../../utils/config").ROUTES.PRODUCT;

router.post(ADD, add);
router.get(DISPLAY, display);
router.get(BESTSELLER, bestSellerDisplay);
router.post(SEARCHBYID, searchByID);
router.post(SEARCH, search);
router.post(UPDATE,updateStocks)
module.exports = router;
