const db = require("../util/database");

// untuk mengemabil semua data
const getToDoList = (req, res) => {
  db.query("select * from todos", (error, result) => {
    if (error) {
      console.log(error);
      return res.json({ success: false, message: "query error", error: error });
    }
    console.log(result);
    res.json({ success: true, data: result });
  });
};

// untuk menambhakan data
const addItem = (req, res) => {
  const { title, status } = req.body;
  if (title === "") {
    return res.json({ success: false, message: "input tidak boleh kosong" });
  }
  db.query(
    "INSERT INTO todos (title,status) VALUES(?,?)",
    [title, status],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "query error",
          error: error,
        });
      }
      console.log(result);
      res.json({ success: true, message: "data berhasil ditambahkan" });
    }
  );
};

// untuk delete data
const deleteItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE ID=?", [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "query error",
        error: error,
      });
    }
    const { affectedRows } = result;
    if (affectedRows == 0) {
      return res.json({ success: false, message: "data tidak ada" });
    }
    console.log(result);
    res.json({ success: true, message: "data berhasil dihapus" });
  });
};

//untuk update data
const updateItem = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    "UPDATE todos SET status=? WHERE id=?",
    [status, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "query error",
          error: error,
        });
      }
      console.log(result);
      const { affectedRows } = result;
      if (affectedRows == 0) {
        return res.json({ success: false, message: "data tidak ada" });
      }
      console.log(result);
      res.json({ success: true, message: "data berhasil di update" });
    }
  );
};

// untuk memghitung spesifik data
const countDoneItem = (req, res) => {
  const status = req.params.status;
  db.query(
    "SELECT * FROM todos WHERE status like ?",
    [status],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      const temp = result;
      res.send({ success: true, data: temp.length });
    }
  );
};

module.exports = {
  getToDoList,
  addItem,
  deleteItem,
  updateItem,
  countDoneItem,
};
