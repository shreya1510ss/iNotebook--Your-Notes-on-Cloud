const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get All the Notes  using :GET "/"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//Route 2: Add a new Note using POST "/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    // Validate title field
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),

    // Validate description field
    body("description").isLength({ min: 5 }).withMessage("Email is not valid"),
  ],
  async (req, res) => {
    // Check for validation errors
    //if there are errors return bad request and the errors

    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3 update  AN Existing note using PUT: '/updatenote login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  //Create a newNote object

  const newNote = {};

  try {
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the Note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});



//Router 4- delete an existing note using DELETE: "/api/note/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    console.log(note.user.toString());

    //Allow deletetion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "note deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

module.exports = router;
