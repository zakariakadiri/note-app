var express = require ('express');
var noteCtrl= require('../controller/noteController');
const router = express.Router();

router.get("/notes", noteCtrl.getAllNotes);
router.post("/notes/save", noteCtrl.saveNote);
router.put("/notes/update", noteCtrl.updateNote);
router.delete("/notes/delete/:noteId", noteCtrl.deleteNote);

module.exports = router;