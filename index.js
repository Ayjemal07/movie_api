const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path');

const app = express();

let movies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    director: 'Chris Columbus',
    year: "2001"
  },

  {
    title: "Singin' in the Rain",
    director: "Gene Kelly",
    year: "1951"
  },
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
    year: "2001"
  },
  {
    title: 'Twilight',
    director: 'Catherine Hardwicke',
    year: "2008"
  }
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/', (req, res) => {
  res.send("Welcome to my app");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const bodyParser = require('body-parser'),
methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.use(methodOverride());

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});