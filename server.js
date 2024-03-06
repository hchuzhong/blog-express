const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const pageSize = 5;
  const currentPage = req.query?.page ?? 1;
  const sort = req.query?.sort ?? 'desc';
  const skip = pageSize * (currentPage - 1)
  const articles = await Article.find().sort({ createdAt: sort }).skip(skip).limit(pageSize);
  const allArticlesLength = await Article.find().count();
  const totalPages = Math.round(allArticlesLength / pageSize);
  res.render('articles/index', { articles: articles, currentPage, totalPages, sort })
})

app.use('/articles', articleRouter)

app.listen(5001)