# Comparação de Métodos de Consulta: GET vs. QUERY (Com Consultas Complexas)

Este projeto demonstra na prática a diferença e o comportamento do método HTTP tradicional **GET** (usando parâmetros de busca na URL) comparado ao novo padrão **HTTP QUERY** (usando um corpo JSON estruturado, conforme especificado na RFC 10008).

O projeto suporta consultas complexas utilizando operadores semelhantes aos do MongoDB:
*   `$eq` (ou correspondência exata): Igualdade.
*   `$ne`: Diferente de.
*   `$gt` / `$gte`: Maior que / maior ou igual a.
*   `$lt` / `$lte`: Menor que / menor ou igual a.
*   `$contains`: Contém uma substring específica (busca case-insensitive).
*   `$in`: O valor deve estar na lista informada.

---

## Como Iniciar o Servidor

Primeiramente, instale as dependências e inicie o servidor:

```bash
# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento (usa nodemon)
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

---

## Consultas de Teste (GET vs. QUERY)

Aqui estão exemplos práticos usando `curl` para você executar no terminal e observar a diferença de legibilidade, tipagem e flexibilidade de ambas as abordagens.

### 1. Busca por Faixa de Anos (ex: filmes entre 2000 e 2010)

#### Via **GET** (Query Params na URL)
É necessário usar anotações de objeto como `year[gte]` e `year[lte]`, que viram strings codificadas na URL:
```bash
curl -i -s "http://localhost:3000/movies?year\[gte\]=2000&year\[lte\]=2010"
```

#### Via **QUERY** (JSON no Corpo da Requisição)
Sintaxe JSON limpa, estruturada e de fácil leitura, onde os tipos numéricos são preservados:
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "year": {
      "$gte": 2000,
      "$lte": 2010
    }
  }'
```

---

### 2. Busca por Nota Alta E Exclusão de Anos

Vamos buscar filmes com nota (`rate`) maior ou igual a `8.0`, mas que **não** tenham sido lançados em `2002` ou `2007`.

#### Via **GET**
```bash
curl -i -s "http://localhost:3000/movies?rate\[gte\]=8.0&year\[ne\]=2002&year\[ne\]=2007"
```

#### Via **QUERY**
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "rate": { "$gte": 8.0 },
    "year": { "$ne": 2002, "$ne": 2007 }
  }'
```

---

### 3. Busca de Substring (`$contains` no Título)

Busca por filmes que contenham a palavra "Elite" (ou qualquer outra substring, sem diferenciar maiúsculas/minúsculas).

#### Via **GET**
```bash
curl -i -s "http://localhost:3000/movies?title\[contains\]=elite"
```

#### Via **QUERY**
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": { "$contains": "elite" }
  }'
```

---

### 4. Busca por Lista de Valores (`$in` para Diretores)

Busca filmes dirigidos por "José Padilha" ou "Kleber Mendonça Filho".

#### Via **GET**
Passar arrays via string URL do GET pode variar dependendo do parser do servidor (ex: `author[in][0]=...&author[in][1]=...`):
```bash
curl -i -s "http://localhost:3000/movies?author\[in\]\[0\]=Jos%C3%A9%20Padilha&author\[in\]\[1\]=Kleber%20Mendon%C3%A7a%20Filho"
```

#### Via **QUERY**
Com o JSON do QUERY, basta passar uma lista padrão:
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "author": {
      "$in": ["José Padilha", "Kleber Mendonça Filho"]
    }
  }'
```

---

## Diferenças Técnicas Críticas

1. **Facilidade com Estruturas Aninhadas**: Como mostrado no Exemplo 4 (`$in`), passar listas ou filtros complexos em URLs do `GET` exige codificar caracteres especiais (`%20`, `%C3`...) e representações de arrays confusas. O `QUERY` aceita arrays e estruturas JSON profundas sem qualquer tipo de codificação de URL.
2. **Preservação de Tipos de Dados**: Parâmetros no `GET` sempre chegam ao servidor como strings. O parser precisa converter `"8.0"` para número no backend. No `QUERY`, os tipos nativos do JSON (`number`, `boolean`, `null`) chegam intactos ao servidor.
3. **Segurança de Logs**: As URLs executadas via `GET` ficam gravadas nos logs de roteadores, CDNs, proxies reversos e históricos do navegador. Parâmetros enviados via `QUERY` ficam encapsulados no corpo da requisição, ideal para buscas que envolvem dados sensíveis (ex: CPF, dados médicos, dados financeiros).
4. **Limites Físicos**: URLs têm limites de comprimento que variam de acordo com o cliente ou proxy (normalmente entre 2KB e 8KB). O corpo de uma requisição `QUERY` não tem esse limite estrito, permitindo filtros massivos.
