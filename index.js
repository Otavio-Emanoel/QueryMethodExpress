import express from 'express';
const app = express();
const PORTA = 3000;
app.use(express.json());

const movies = [
  { title: "Cidade de Deus", year: 2002, author: "Fernando Meirelles", rate: 8.6 },
  { title: "Tropa de Elite", year: 2007, author: "José Padilha", rate: 8.0 },
  { title: "Central do Brasil", year: 1998, author: "Walter Salles", rate: 8.0 },
  { title: "Bacurau", year: 2019, author: "Kleber Mendonça Filho", rate: 7.3 },
  { title: "O Pagador de Promessas", year: 1962, author: "Anselmo Duarte", rate: 7.7 },
  { title: "Aquarius", year: 2016, author: "Kleber Mendonça Filho", rate: 7.4 },
  { title: "O Auto da Compadecida", year: 2000, author: "Guel Arraes", rate: 8.6 },
  { title: "Carandiru", year: 2003, author: "Hector Babenco", rate: 7.6 },
  { title: "Diários de Motocicleta", year: 2004, author: "Walter Salles", rate: 7.8 },
  { title: "Democracia em Vertigem", year: 2019, author: "Petra Costa", rate: 7.3 }
];

app.use((req, res, next) => {
  if (req.method === 'QUERY') {
    res.setHeader('Accept-Query', 'application/json');
    const contentType = req.headers['content-type'];
    if (!contentType) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'O cabeçalho Content-Type é obrigatório para requisições QUERY.'
      });
    }
    if (!contentType.includes('application/json')) {
      return res.status(415).json({
        error: 'Unsupported Media Type',
        message: 'Apenas application/json é suportado para requisições QUERY.'
      });
    }
  }
  next();
});

const movieSchema = {
  title: 'string',
  year: 'number',
  author: 'string',
  rate: 'number'
};

function parseParams(params) {
  const parsed = {};
  for (const [key, value] of Object.entries(params)) {
    const expectedType = movieSchema[key];
    if (!expectedType || value === undefined || value === null) continue;

    if (expectedType === 'number') {
      const num = Number(value);
      if (!isNaN(num)) {
        parsed[key] = num;
      }
    } else {
      parsed[key] = String(value);
    }
  }
  return parsed;
}

function searchMovies(searchParams) {
  const parsed = parseParams(searchParams);
  const criteria = Object.entries(parsed);

  if (criteria.length === 0) {
    return movies;
  }

  return movies.filter(movie => {
    for (let i = 0; i < criteria.length; i++) {
      const [key, val] = criteria[i];
      if (movie[key] !== val) {
        return false;
      }
    }
    return true;
  });
}

app.query('/movies', (req, res) => {
  const filteredMovies = searchMovies(req.body);
  res.json(filteredMovies);
});

app.get('/movies', (req, res) => {
  res.setHeader('Accept-Query', 'application/json');
  const filteredMovies = searchMovies(req.query);
  res.json(filteredMovies);
});

app.listen(PORTA, () => {
  console.log('Servidor ta rodando na porta ' + PORTA);
});