const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    // send back blank on error for security
    res.status(500).send();
  }
});

// Post to server with Title, Description, and Code
router.post("/", async (req, res) => {
  // try catch for server errors
  try {
    const { title, description, code } = req.body;
    // validation
    if (!description && !code) {
      return res
        .status(400)
        .json({ errorMessage: "You need to provide description or some code" });
    }
    const newSnippet = new Snippet({
      title,
      description,
      code,
    });
    const savedSnippet = await newSnippet.save();
    // respond back with saved data
    res.json(savedSnippet);
  } catch (err) {
    // send back blank on error for security
    res.status(500).send();
  }
});

// update snippet
router.put("/:id", async (req, res) => {
  try {
    const { title, description, code } = req.body;
    const snippetId = req.params.id;
    // validation
    if (!description && !code) {
      return res
        .status(400)
        .json({ errorMessage: "You need to provide description or some code" });
    }
    if (!snippetId) {
      return res
        .status(400)
        .json({ errorMessage: "You need to provide a product (snippet) ID" });
    }
    // wait on id to be found then recode properties
    const originalSnippet = await Snippet.findById(snippetId);
    if (!originalSnippet) {
      return res.status(400).json({ errorMessage: "No Id was found" });
    }
    originalSnippet.title = title;
    originalSnippet.description = description;
    originalSnippet.code = code;
    // save to database and respond with the snippet of information
    const savedSnippet = await originalSnippet.save();
    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

// delete snippet
router.delete("/:id", async (req, res) => {
  try {
    const snippetId = req.params.id;
    // validation
    if (!snippetId) {
      return res
        .status(400)
        .json({ errorMessage: "You need to provide a product (snippet) ID" });
    }
    // find id
    const existingSnippet = await Snippet.findById(snippetId);
    if (!existingSnippet) {
      return res.status(400).json({ errorMessage: "No Id was found" });
    }
    await existingSnippet.delete();
    res.json(existingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
