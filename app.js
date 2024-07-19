import express from 'express';
import bodyParser from 'body-parser';



const app = express();
const PORT = 3000;

app.use('/source', express.static('source'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts });
});



app.get('/create', (req, res) => {
  res.render('create', { posts }); // Pass posts to the create view
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts[req.params.id];
  res.render('edit', { post, id: req.params.id });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  posts[req.params.id] = { title, content };
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
