# 🚀 Guia de Início Rápido

## ⚡ Passos Iniciais

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

O arquivo `.env` já está criado com as configurações padrão:

```env
VITE_API_URL=http://localhost:3333
VITE_API_TIMEOUT=30000
```

**Importante**: Ajuste `VITE_API_URL` para o endereço da sua API backend se for diferente.

### 3. Iniciar o Projeto

```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:3000`

## 📋 Scripts Disponíveis

| Comando                 | Descrição                            |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Inicia o servidor de desenvolvimento |
| `npm run build`         | Cria build de produção               |
| `npm run preview`       | Preview do build de produção         |
| `npm run lint`          | Executa o linter                     |
| `npm test`              | Executa os testes                    |
| `npm run test:ui`       | Executa testes com interface         |
| `npm run test:coverage` | Gera relatório de cobertura          |

## 🔑 Autenticação (Demo)

Para fins de demonstração, você pode fazer login com qualquer email e senha.

**Exemplo**:

- Email: `usuario@unimed.com`
- Senha: `123456`

⚠️ **Nota**: Em produção, você precisará ter uma API backend rodando com sistema de autenticação real.

## 📡 Requisitos da API Backend

O frontend espera que a API backend esteja rodando e disponível nas seguintes rotas:

### Autenticação

- `POST /auth/login` - Fazer login

### Contatos

- `GET /contatos` - Listar contatos
- `GET /contatos/:id` - Buscar contato por ID
- `GET /contatos/celular/:celular` - Buscar por celular
- `GET /contatos/favoritos` - Listar favoritos
- `POST /contatos` - Criar contato
- `PUT /contatos/:id` - Atualizar contato
- `PATCH /contatos/:id/favorito` - Alternar favorito
- `DELETE /contatos/:id` - Inativar contato

## 🎯 Estrutura de Resposta da API

### Contato

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "celular": "11999887766",
  "telefone": "1133334444",
  "favorito": false,
  "ativo": true,
  "criadoEm": "2024-01-01T00:00:00.000Z"
}
```

### Login Response

```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "token": "jwt-token-aqui"
}
```

### Lista Paginada

```json
{
  "data": [...],
  "total": 100,
  "pagina": 1,
  "limite": 12,
  "totalPaginas": 9
}
```

## 🧪 Executar Testes

### Testes Unitários

```bash
npm test
```

### Testes com Interface

```bash
npm run test:ui
```

### Cobertura de Código

```bash
npm run test:coverage
```

## 🏗️ Build para Produção

```bash
# Criar build otimizado
npm run build

# Testar o build localmente
npm run preview
```

Os arquivos serão gerados na pasta `dist/`.

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

### Outras Plataformas

- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting

## 🔧 Solução de Problemas

### Porta 3000 já está em uso

```bash
# Use outra porta
npm run dev -- --port 3001
```

### Erro de CORS

Se você tiver problemas de CORS, configure o backend para aceitar requisições do frontend:

```javascript
// Backend (Express.js)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
```

### API não responde

Verifique se:

1. A API backend está rodando
2. A URL no `.env` está correta
3. Não há firewall bloqueando

## 📚 Próximos Passos

1. ✅ **Configurar API Backend**: Certifique-se de que sua API está rodando
2. ✅ **Testar Autenticação**: Faça login no sistema
3. ✅ **Criar Contatos**: Adicione alguns contatos de teste
4. ✅ **Explorar Funcionalidades**: Teste busca, favoritos, edição
5. ✅ **Executar Testes**: Rode os testes unitários
6. ✅ **Personalizar**: Ajuste cores, textos, logo conforme necessário

## 🆘 Precisa de Ajuda?

- Consulte o [README.md](README.md) para documentação completa
- Consulte o [ARQUITETURA.md](ARQUITETURA.md) para entender a estrutura
- Abra uma issue no repositório

---

**Bom desenvolvimento! 🚀**
