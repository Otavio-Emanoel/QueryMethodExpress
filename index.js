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

app.query('/movies', (req, res) => {
  const searchParams= req.body;
  const filteredMovies = movies.filter(movie => {
    for (const key in searchParams) {
      if (movie[key] === undefined || movie[key] != searchParams[key]) {
        return false;
      }
    }
    return true;
  });
  if (filteredMovies.length === 0) {
    return res.status(404).json({ message: 'Nenhum filme encontrado com os parâmetros fornecidos.' });
  }
  res.json(filteredMovies);
});

app.get('/movies', (req, res) => {
  res.json(movies);
})

app.listen(PORTA, () => {
  console.log('Servidor ta rodando na porta ' + PORTA);
});