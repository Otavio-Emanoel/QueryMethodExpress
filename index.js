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
  { title: "Democracia em Vertigem", year: 2019, author: "Petra Costa", rate: 7.3 },
  { title: "Que Horas Ela Volta?", year: 2015, author: "Anna Muylaert", rate: 7.9 },
  { title: "Hoje Eu Quero Voltar Sozinho", year: 2014, author: "Daniel Ribeiro", rate: 7.9 },
  { title: "O Cheiro do Ralo", year: 2006, author: "Heitor Dhalia", rate: 7.2 },
  { title: "Tropa de Elite 2: O Inimigo Agora é Outro", year: 2010, author: "José Padilha", rate: 8.4 },
  { title: "Lisbela e o Prisioneiro", year: 2003, author: "Guel Arraes", rate: 7.6 },
  { title: "O Homem do Futuro", year: 2011, author: "Cláudio Torres", rate: 7.0 },
  { title: "Estômago", year: 2007, author: "Marcos Jorge", rate: 7.8 },
  { title: "Elena", year: 2012, author: "Petra Costa", rate: 7.7 },
  { title: "Bingo: O Rei das Manhãs", year: 2017, author: "Daniel Rezende", rate: 7.9 },
  { title: "O Som ao Redor", year: 2012, author: "Kleber Mendonça Filho", rate: 7.1 },
  { title: "Cidade de Deus", year: 2002, author: "Fernando Meirelles", rate: 8.6 },
  { title: "Tropa de Elite", year: 2007, author: "José Padilha", rate: 8.0 },
  { title: "Central do Brasil", year: 1998, author: "Walter Salles", rate: 8.0 },
  { title: "Bacurau", year: 2019, author: "Kleber Mendonça Filho", rate: 7.3 },
  { title: "O Pagador de Promessas", year: 1962, author: "Anselmo Duarte", rate: 7.7 },
  { title: "Aquarius", year: 2016, author: "Kleber Mendonça Filho", rate: 7.4 },
  { title: "O Auto da Compadecida", year: 2000, author: "Guel Arraes", rate: 8.6 },
  { title: "Carandiru", year: 2003, author: "Hector Babenco", rate: 7.6 },
  { title: "Diários de Motocicleta", year: 2004, author: "Walter Salles", rate: 7.8 },
  { title: "Democracia em Vertigem", year: 2019, author: "Petra Costa", rate: 7.3 },
  { title: "Que Horas Ela Volta?", year: 2015, author: "Anna Muylaert", rate: 7.9 },
  { title: "Hoje Eu Quero Voltar Sozinho", year: 2014, author: "Daniel Ribeiro", rate: 7.9 },
  { title: "O Cheiro do Ralo", year: 2006, author: "Heitor Dhalia", rate: 7.2 },
  { title: "Tropa de Elite 2: O Inimigo Agora é Outro", year: 2010, author: "José Padilha", rate: 8.4 },
  { title: "Lisbela e o Prisioneiro", year: 2003, author: "Guel Arraes", rate: 7.6 },
  { title: "O Homem do Futuro", year: 2011, author: "Cláudio Torres", rate: 7.0 },
  { title: "Estômago", year: 2007, author: "Marcos Jorge", rate: 7.8 },
  { title: "Elena", year: 2012, author: "Petra Costa", rate: 7.7 },
  { title: "Bingo: O Rei das Manhãs", year: 2017, author: "Daniel Rezende", rate: 7.9 },
  { title: "Cidade de Deus", year: 2002, author: "Fernando Meirelles", rate: 8.6 },
  { title: "Tropa de Elite", year: 2007, author: "José Padilha", rate: 8.0 },
  { title: "Central do Brasil", year: 1998, author: "Walter Salles", rate: 8.0 },
  { title: "Bacurau", year: 2019, author: "Kleber Mendonça Filho", rate: 7.3 },
  { title: "O Pagador de Promessas", year: 1962, author: "Anselmo Duarte", rate: 7.7 },
  { title: "Aquarius", year: 2016, author: "Kleber Mendonça Filho", rate: 7.4 },
  { title: "O Auto da Compadecida", year: 2000, author: "Guel Arraes", rate: 8.6 },
  { title: "Carandiru", year: 2003, author: "Hector Babenco", rate: 7.6 },
  { title: "Diários de Motocicleta", year: 2004, author: "Walter Salles", rate: 7.8 },
  { title: "Democracia em Vertigem", year: 2019, author: "Petra Costa", rate: 7.3 },
  { title: "Que Horas Ela Volta?", year: 2015, author: "Anna Muylaert", rate: 7.9 },
  { title: "Hoje Eu Quero Voltar Sozinho", year: 2014, author: "Daniel Ribeiro", rate: 7.9 },
  { title: "O Cheiro do Ralo", year: 2006, author: "Heitor Dhalia", rate: 7.2 },
  { title: "Tropa de Elite 2: O Inimigo Agora é Outro", year: 2010, author: "José Padilha", rate: 8.4 },
  { title: "Lisbela e o Prisioneiro", year: 2003, author: "Guel Arraes", rate: 7.6 },
  { title: "O Homem do Futuro", year: 2011, author: "Cláudio Torres", rate: 7.0 },
  { title: "Estômago", year: 2007, author: "Marcos Jorge", rate: 7.8 },
  { title: "Elena", year: 2012, author: "Petra Costa", rate: 7.7 },
  { title: "Bingo: O Rei das Manhãs", year: 2017, author: "Daniel Rezende", rate: 7.9 },
  { title: "Cidade de Deus", year: 2002, author: "Fernando Meirelles", rate: 8.6 },
  { title: "Tropa de Elite", year: 2007, author: "José Padilha", rate: 8.0 },
  { title: "Central do Brasil", year: 1998, author: "Walter Salles", rate: 8.0 },
  { title: "Bacurau", year: 2019, author: "Kleber Mendonça Filho", rate: 7.3 },
  { title: "O Pagador de Promessas", year: 1962, author: "Anselmo Duarte", rate: 7.7 },
  { title: "Aquarius", year: 2016, author: "Kleber Mendonça Filho", rate: 7.4 },
  { title: "O Auto da Compadecida", year: 2000, author: "Guel Arraes", rate: 8.6 },
  { title: "Carandiru", year: 2003, author: "Hector Babenco", rate: 7.6 },
  { title: "Diários de Motocicleta", year: 2004, author: "Walter Salles", rate: 7.8 },
  { title: "Democracia em Vertigem", year: 2019, author: "Petra Costa", rate: 7.3 },
  { title: "Que Horas Ela Volta?", year: 2015, author: "Anna Muylaert", rate: 7.9 },
  { title: "Hoje Eu Quero Voltar Sozinho", year: 2014, author: "Daniel Ribeiro", rate: 7.9 },
  { title: "O Cheiro do Ralo", year: 2006, author: "Heitor Dhalia", rate: 7.2 },
  { title: "Tropa de Elite 2: O Inimigo Agora é Outro", year: 2010, author: "José Padilha", rate: 8.4 },
  { title: "Lisbela e o Prisioneiro", year: 2003, author: "Guel Arraes", rate: 7.6 },
  { title: "O Homem do Futuro", year: 2011, author: "Cláudio Torres", rate: 7.0 },
  { title: "Estômago", year: 2007, author: "Marcos Jorge", rate: 7.8 },
  { title: "Elena", year: 2012, author: "Petra Costa", rate: 7.7 },
  { title: "Bingo: O Rei das Manhãs", year: 2017, author: "Daniel Rezende", rate: 7.9 }
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

function parseValue(value, expectedType) {
  if (value === undefined || value === null) return value;
  if (expectedType === 'number') {
    const num = Number(value);
    return isNaN(num) ? value : num;
  }
  return String(value);
}

function parseParams(params) {
  const parsed = {};
  for (const [key, value] of Object.entries(params)) {
    const expectedType = movieSchema[key];
    if (!expectedType) continue;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const parsedOperators = {};
      for (const [op, opVal] of Object.entries(value)) {
        const normalizedOp = op.startsWith('$') ? op : `$${op}`;
        if (normalizedOp === '$in' && Array.isArray(opVal)) {
          parsedOperators[normalizedOp] = opVal.map(val => parseValue(val, expectedType));
        } else {
          parsedOperators[normalizedOp] = parseValue(opVal, expectedType);
        }
      }
      parsed[key] = parsedOperators;
    } else {
      parsed[key] = { $eq: parseValue(value, expectedType) };
    }
  }
  return parsed;
}

function evaluateCriteria(movieValue, criteria) {
  for (const [op, val] of Object.entries(criteria)) {
    switch (op) {
      case '$eq':
        if (movieValue !== val) return false;
        break;
      case '$ne':
        if (movieValue === val) return false;
        break;
      case '$gt':
        if (!(movieValue > val)) return false;
        break;
      case '$gte':
        if (!(movieValue >= val)) return false;
        break;
      case '$lt':
        if (!(movieValue < val)) return false;
        break;
      case '$lte':
        if (!(movieValue <= val)) return false;
        break;
      case '$contains':
        if (typeof movieValue !== 'string' || typeof val !== 'string') return false;
        if (!movieValue.toLowerCase().includes(val.toLowerCase())) return false;
        break;
      case '$in':
        if (!Array.isArray(val) || !val.includes(movieValue)) return false;
        break;
      default:
        return false;
    }
  }
  return true;
}

function searchMovies(searchParams) {
  const parsed = parseParams(searchParams);
  const criteria = Object.entries(parsed);

  if (criteria.length === 0) {
    return movies;
  }

  return movies.filter(movie => {
    for (let i = 0; i < criteria.length; i++) {
      const [key, opCriteria] = criteria[i];
      if (!evaluateCriteria(movie[key], opCriteria)) {
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