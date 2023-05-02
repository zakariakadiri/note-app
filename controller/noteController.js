// Import dependencies
var generator = require ('../util/generator'); // for generating unique IDs
var memStorage = require('../util/memory.storage'); // for storing notes in memory
var model = require ('../model/note.model'); // for defining the structure of the note object

// Define function to get all notes
exports.getAllNotes = (req, res) => {

  // Uncomment the following lines if you want to generate some sample notes for testing
  // var seqId_1   = generator.generate();
  // memStorage.store.setItem(seqId_1, "1st_Key")
  // var seqId_2   = generator.generate();
  // memStorage.store.setItem(seqId_2, "2nd_Key")

  // Retrieve all notes stored in memory using the getValues method of memory.storage
  var values = memStorage.getValues(memStorage.store);

  // Log the values to the console
  console.log("values : "+ JSON.stringify(values));

  // Return the values as a JSON string in the response
  return  res.status(200).send(JSON.stringify(values));
}

// Define function to save a new note
exports.saveNote = (req, res) => {
  // Generate a unique ID for the new note
  var seqId_1 = generator.generate();
  // Extract the title and content from the request body
  var title = req.body.title;
  var content = req.body.content;
  // Set the hard-coded username of the note's creator
  var createdBy = "Zakaria";
  // Set the current date and time as the note's creation date
  var createdOn = new Date();

  // Check that the title and content are not empty
  if (!title || !content) {
    return res.status(500).send('Title and Content should not be empty!')
  }

  // Create a new note object with the given values
  var Note = model.note;
  var noteObj = new Note(seqId_1, title, content, createdBy, createdOn)

  // Store the note object in memory using the generated ID as the key
  memStorage.store.setItem(seqId_1, noteObj)

  // Return a success message as the response
  return res.status(201).send("Successfully note saved!");
}

// Define function to update an existing note
exports.updateNote = (req, res) => {
  // Extract the title, content, and note ID from the request body
  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "Zakaria"; // not used in the function
  var createdOn = new Date(); // not used in the function
  var noteId = req.body.noteId;

  // Check that the note ID is not empty
  if (!noteId) {
    return res.status(500).send('noteId should not be empty!')
  }

  // Check that the title and content are not empty
  if (!title || !content) {
    return res.status(500).send('Title and Content should not be empty!')
  }

  // Get the note object with the given ID from memory
  var noteItem = memStorage.store.getItem(noteId);

  // Check that the note object exists in memory
  if (!noteItem) {
    return res.status(500).send("noteId is not exist!");
  }

  // Create a new note object with the given values
  var Note = model.note;
  var noteObj = new Note(noteId, title, content, createdBy, createdOn)

  // Store the note object in memory using the given ID

    memStorage.store.setItem(noteId, noteObj)
    return res.status(200).send("Successfully note Updated!");
}

exports.deleteNote = (req, res) => {
    var noteId = req.params.noteId;
    
    // Check if noteId is provided
    if (!noteId) {
        return res.status(500).send('can not delete empty noteId!')
    }

    // Get the note object from the in-memory storage using the noteId
    var noteItem = memStorage.store.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send("noteId is not exist!");
    }

    // Remove the note object from the in-memory storage
    memStorage.store.removeItem(noteId);

    // Return a success message
    return res.status(200).send(noteId + " Deleted!");
}