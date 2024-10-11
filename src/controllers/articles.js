const  {createArticle}= require('../models/articles-model');
  
  
  exports.createArticleController = async (req, res) => {
    const {  authors_id,title,content } = req.body;
    switch (true) {
      case !authors_id:
        return res.status(400).json({ error: 'Authors ID is required' });
      case !title:
        return res.status(400).json({ error: 'Title is required' });
     case !content:
        return res.status(400).json({error:"content is required"})
      default:
        
    }
  
    try {
  
      const newArticle = await createArticle( authors_id,title,content);
      res.status(201).json(newArticle);
    } catch (err) {
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  };
  
  