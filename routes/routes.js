const express = require("express");
const router = express.Router();
const {
  getToDoList,
  addItem,
  deleteItem,
  updateItem,
  countDoneItem,
} = require("../controllers/todo");

router.get("/toDoList", getToDoList);
router.post("/addItem", addItem);
router.post("/deleteItem/:id", deleteItem);
router.post("/updateItem/:id", updateItem);
router.get("/countDoneItem", countDoneItem);

module.exports = router;
