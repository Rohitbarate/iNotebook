const { toHaveErrorMessage } = require('@testing-library/jest-dom/dist/matchers');
const express = require('express');
const Notes = require('../modules/Note');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../modules/Note');
const { body, validationResult } = require('express-validator');
const router = express();  //const router = express.Router();

// ROUTE 1: Get notes of  loggedin Users using: GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id })
            res.json(notes)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 2: Add a new note of  loggedin that User using: POST "/api/notes/addnotes". Login required

router.post('/addnote', fetchuser,
    [
        body('title', 'title must be 3 characters').isLength({ min: 3 }),
        body('description', 'description must be 5 characters  ').isLength({ min: 5 }),
        body('tag', 'tag must be less than 10 characters  ').isLength({ max: 10 })
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;

        try {
            
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savenote = await note.save();

        res.json(savenote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })


// ROUTE 3: Edit a note of  loggedin that User using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
try{
    const newnote = {}
    if (title) { newnote.title = title }
    if (description) { newnote.description = description }
    if (tag) { newnote.tag = tag }

    // find the note to update
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found");
    }

    //  check the user is correct 
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("NOt Allowed");
    }

    note = await Notes.findOneAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json({ note })
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

// ROUTE 4: delete a note of  loggedin that User using: DELETE "/api/notes/daletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try{
    // find the note to update
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("not found"); }
    //     check the correct user the first argument in the if loop is come from req.params.id and sec is from fetchuser middleware
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("NOt Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)

    res.json({ "success": "note has been deleted" })
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

})


module.exports = router;