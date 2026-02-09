# Sistema de Agendamento Telefônico - Unimed

Sistema frontend desenvolvido em React + TypeScript para gerenciamento de contatos telefônicos, consumindo uma API REST construída com Node.js e arquitetura DDD (Domain-Driven Design).

## Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Vite 7** - Build tool e dev server ultra-rápido
- **React Router DOM v7** - Gerenciamento de rotas
- **Bootstrap 5.3** & **React Bootstrap** - Framework CSS e componentes UI
- **Axios** - Cliente HTTP para requisições à API
- **Formik** & **Yup** - Gerenciamento e validação de formulários
- **React Icons** - Biblioteca de ícones
- **React Toastify** - Notificações toast elegantes
- **Vitest 4** - Framework de testes unitários
- **Testing Library** - Utilitários para testes de componentes React

## Funcionalidades

### Implementadas

- [x] **Autenticação de Usuários**
  - Autenticação passwordless (código via email)
  - Fluxo em duas etapas: email → código de 6 dígitos
  - Proteção de rotas privadas
  - Persistência de sessão com localStorage

- [x] **Gerenciamento de Contatos**
  - Listagem de todos os contatos (ativos + inativos)
  - Cadastro de novos contatos
  - Edição de contatos existentes
  - Inativação e reativação de contatos (soft delete)
  - Busca em tempo real por nome, email, celular ou telefone
  - Filtro específico para contatos inativos

- [x] **Sistema de Favoritos**
  - Marcar/desmarcar contatos como favoritos
  - Página dedicada para listar favoritos
  - Indicadores visuais para contatos favoritos

- [x] **Validações**
  - Validação de celular único (impede duplicação)
  - Validação de formato de email
  - Validação de formato de celular (11 dígitos)
  - Validação de formato de telefone (10 dígitos)
  - Feedback visual de erros em formulários

- [xTema Unimed (verde #00a859)
  - Logo oficial da Unimed Recife
  - Cards de contatos com hover effects
  - Modals para criação/edição
  - Loading states e spinners
  - Indicadores visuais de status (ativo/inativo)er effects
  - Modals para criação/edição
  - Loading states e spinners

- [x] **Testes Unitários**
  - Testes de componentes
  - Testes de serviços
  - Testes de validações
  - Cobertura de código

## Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ContatoCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── RotaPrivada.tsx
├── contexts/            # Contexts da aplicação
│   └── AuthContext.tsx
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   └── useContatos.ts
├── pages/               # Páginas da aplicação
│   ├── Contatos/
│   │   ├── Contatos.tsx
│   │   └── components/
│   │       ├── ContatoModal.tsx
│   │       └── ConfirmacaoModal.tsx
│   ├── Favoritos/
│   │   └── Favoritos.tsx
│   └── Login/
│       ├── Login.tsx
│       └── Login.css
├── services/            # Serviços de API
│   ├── api.ts
│   ├── auth.service.ts
│   └── contato.service.ts
├── tests/               # Testes unitários
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── setup.ts
├── types/               # Definições de tipos TypeScript
│   ├── auth.types.ts
│   └── contato.types.ts
├── utils/               # Utilitários
│   ├── constantes.ts
│   ├── formatadores.ts
│   └── validacoes.ts
├── App.tsx              # Componente principal
├── App.css              # Estilos globais + tema Unimed
├── main.tsx             # Entry point
└── vite-env.d.ts        # Tipagens do Vite

```

## Padrões e Boas Práticas

### Clean Code

- Nomes descritivos para variáveis e funções
- Funções pequenas e com responsabilidade única
- Componentização adequada
- Separação de responsabilidades

### TypeScript

- Tipagem forte em toda a aplicação
- Interfaces bem definidas
- Tipos personalizados para entidades
- Uso de generics quando apropriado

### React Best Practices

- Hooks personalizados para lógica reutilizável
- Context API para estado global
- Componentes funcionais com hooks
- Lazy loading de rotas (pode ser implementado)

### API Integration

- Axios com interceptors
- Tratamento centralizado de erros
- Tipagem de requests e responses
- Timeout configurável

## Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- API backend rodando (veja repositório da API)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd projeto-unimed-front
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo .env.example
cp .env.example .env

# Edite o arquivo .env com as configurações da sua API
VITE_API_URL=http://localhost:3333
VITE_API_TIMEOUT=30000
```

4. **Execute a aplicação em modo de desenvolvimento**

```bash
npm run dev5173
```

A aplicação estará disponível em `http://localhost:3000`

## Executando os Testes

```bash
# Executar todos os testes
npm run test

# Executar testes uma vez (CI)
npm run test:run

# Executar testes com interface UI
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage
```

## Build para Produção

```bash
# Criar build otimizado
npm run build

# Visualizar preview do build
npm run preview
```

## Estrutura de Rotas

| Rota              | Componente | Proteção | Descrição                      |
| ----------------- | ---------- | -------- | ------------------------------ |
| `/login`          | Login      | Pública  | Página de autenticação         |
| `/`               | Contatos   | Privada  | Lista todos os contatos        |
| `/?inativos=true` | Contatos   | Privada  | Lista apenas contatos inativos |
| `/favoritos`      | Favoritos  | Privada  | Lista contatos favoritos       |

## Autenticação

passwordless baseada em JWT (JSON Web Token):

**Fluxo de Autenticação:**

1. Usuário informa o email
2. Backend envia código de 6 dígitos para o email (válido por 10 minutos)
3. Usuário digita o código recebido
4. API valida o código e retorna token JWT
5. Token é armazenado no localStorage
6. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer {token}`
7. Todas as requisições subsequentes incluem o token no header `Authorization`
8. Ao fazer logout, o token é removido

### Proteção de Rotas

Componente `RotaPrivada` verifica se o usuário está autenticado antes de renderizar a página. Caso contrário, redireciona para `/login`.

## Integração com a API

pi/auth/send-code` - Enviar código de verificação

- `POST /api/auth/verify-code` - Validar código e realizar login

#### Contatos

- `GET /api/contatos?apenasAtivos=false&apenasFavoritos=false&apenasInativos=false` - Listar contatos com filtros
- `GET /api/contatos/:id` - Buscar contato por ID
- `POST /api/contatos` - Criar novo contato
- `PUT /api/contatos/:id` - Atualizar contato
- `PATCH /api/contatos/:id/favorito` - Alternar favorito
- `DELETE /api/contatos/:id` - Inativar contato (soft delete)
- `PATCH /api/contatos/:id/reativar` - Reativar contato inativr por celular
- `GET /contatos/favoritos` - Listar favoritos
- `POST /contatos` - Criar novo contato
- `PUT /contatos/:id` - Atualizar contato
- `PATCH /contatos/:id/favorito` - Alternar favorito
- `DELETE /contatos/:id` - Inativar contato

### Tratamento de Erros

A aplicação possui tratamento centralizado de erros no interceptor do Axios:

- **401 Unauthorized**: Redireciona para login
- **403 Forbidden**: Exibe mensagem de acesso negado
- **404 Not Found**: Informa recurso não encontrado
- **500 Internal Server Error**: Erro do servidor
- **Network Error**: Problema de conexão

## Validações de Formulário

### Cadastro/Edição de Contato

| Campo | Regras                        | Mensagem de Erro     |
| ----- | ----------------------------- | -------------------- |
| Nome  | Obrigatório, 3-100 caracteres | "Nome é obrigatório" |
| Email | Obrigatório, formato válido   | "Email inválido"     |

O backend valida automaticamente se o celular já está cadastrado, prevenindo duplicação. Em caso de celular duplicado, uma mensagem de erro é exibida
| Telefone | Opcional, 10 dígitos | "Telefone inválido" |

### Validação de Celular Único

Antes de criar um novo contato, o sistema verifica se já existe outro contato com o mesmo número de celular, prevenindo duplicação.

## Componentes Principais

### Contvisual de "Inativo" quando aplicável

- Ícone de coração verde para favoritos
- Botões para editar, inativar ou ativar
- Click no ícone de coração para favoritar/desões de um contato com ações rápidas:

- Exibição de nome, email, celular e telefone
- Badge de favorito e status ativo
- Botões para editar e inativar
- Click no ícone de coração para favoritar

### ContatoModal

Modal para criação e edição de contatos:

- Formulário com validações
- Formatação automática de telefones
- Verificação de celular duplicado
- Feedback visual de erros
  oficial da Unimed Recife
- Links de navegação: Contatos, Favoritos, Inativos
- Informações do usuário logado
- Botão de logout
- Tema verde Unimed (#00a859)o superior:

- Logo e nome da aplicação
- Links de navegação
- Informações do usuário logado
- Botão de logout

### Layout

Componente wrapper que fornece estrutura comum:

- Header
- Área de conteúdo principal
- Footer

## Responsividade

O sistema é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:

- **Mobile** (< 768px): 1 coluna de cards
- **Tablet** (768px - 992px): 2 colunas de cards
- **Desktop** (> 992px): 3 colunas de cards

## Estado da Aplicação

### Estado Global (Context)

- **AuthContext**: Gerencia autenticação e dados do usuário

### Estado Local (Hooks)

- **useContatos**: Gerencia listagem e operações de contatos
- **useState**: Estado local de componentes

### Persistência

data de cadastro)

- [ ] Adicionar ordenação de contatos (A-Z, data)
- [ ] Implementar export de contatos (CSV, PDF)
- [ ] Adicionar modo escuro (dark mode)
- [ ] Adicionar foto/avatar para contatos
- [ ] Implementar histórico de alterações
- [ ] Adicionar testes E2E com Playwright
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar internacionalização (i18n)
- [ ] Implementar debounce na busca para otimização
- [ ] Implementar export de contatos (CSV, PDF)
- [ ] Adicionar modo escuro (dark mode)
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar testes E2E com Playwright
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar internacionalização (i18n)

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Autor

Desenvolvido como parte do desafio técnico Unimed.

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Nota**: Este é um projeto de demonstração. Em produção, implemente medidas adicionais de segurança e otimização.
