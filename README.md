# Comparação de Métodos de Consulta: GET vs. QUERY

Este projeto demonstra na prática a diferença e o comportamento do método HTTP tradicional **GET** (usando parâmetros de busca na URL) comparado ao novo padrão **HTTP QUERY** (usando um corpo JSON estruturado, conforme especificado na RFC 10008).

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

Aqui estão exemplos práticos usando `curl` para você executar no terminal e observar a diferença de envio de parâmetros e cabeçalhos.

### 1. Busca Simples por Ano

#### Via **GET** (Query Params na URL)
Os parâmetros são passados diretamente na string da URL.
```bash
curl -i -s "http://localhost:3000/movies?year=2019"
```

#### Via **QUERY** (JSON no Corpo da Requisição)
Os parâmetros são passados de forma mais limpa em um corpo de requisição JSON estruturado.
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"year": 2019}'
```

---

### 2. Busca Combinada (Ano + Nota)

#### Via **GET**
Múltiplos parâmetros precisam ser unidos por `&` na URL, o que pode se tornar difícil de ler e formatar.
```bash
curl -i -s "http://localhost:3000/movies?year=2019&rate=7.3"
```

#### Via **QUERY**
Múltiplos parâmetros se tornam campos adicionais no objeto JSON.
```bash
curl -i -s -X QUERY http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"year": 2019, "rate": 7.3}'
```

---

### 3. Validação de Cabeçalhos (Apenas no QUERY)

A RFC 10008 exige que as requisições `QUERY` forneçam o cabeçalho `Content-Type` correto para indicar o formato da query.

#### Caso A: Faltando o `Content-Type` (Retorna `400 Bad Request`)
```bash
curl -i -s -X QUERY http://localhost:3000/movies -H "Content-Type:" -d '{"year": 2019}'
```

#### Caso B: Content-Type incorreto (Retorna `415 Unsupported Media Type`)
```bash
curl -i -s -X QUERY http://localhost:3000/movies -H "Content-Type: text/plain" -d '{"year": 2019}'
```

---

## Principais Diferenças Observadas

| Característica | Método `GET` | Método `QUERY` |
| :--- | :--- | :--- |
| **Localização dos Filtros** | Parâmetros de consulta na URL (`?year=2019`) | Corpo da Requisição (`{"year": 2019}`) |
| **Tipagem dos Dados** | Sempre recebido como string (`"2019"`), exigindo conversão manual no backend. | Tipos nativos preservados pelo JSON (`2019` é number, `true` é boolean). |
| **Segurança / Logs** | Filtros ficam expostos no histórico do navegador, logs de proxy/servidor e cabeçalhos `Referer`. | Filtros ficam protegidos dentro do corpo da requisição (útil para dados sensíveis). |
| **Limite de Tamanho** | Limitado pelo tamanho máximo de URL do servidor/navegador (geralmente ~2KB a 8KB). | Sem limitações de tamanho de URL, suportando queries gigantescas ou filtros muito aninhados. |
| **Semântica de Cache** | Seguro e cacheável. | Seguro, idempotente e cacheável (diferente do `POST`). |
| **Anúncio de Suporte** | O servidor responde com o cabeçalho `Accept-Query: application/json` informando que aceita o método QUERY. | O servidor responde com o cabeçalho `Accept-Query: application/json`. |
