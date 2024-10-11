const {createAuthor} = require('../models/authors-model');


exports.createAuthorController = async (req, res) => {
    const {  author_name } = req.body;
  if(!author_name){
    console.log("Author name required")
  }
  
    try {
      const newAuthor = await createAuthor( author_name);
      res.status(201).json(newAuthor);
    } catch (err) {
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  };