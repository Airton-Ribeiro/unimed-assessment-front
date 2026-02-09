# 🏗️ Arquitetura e Padrões de Projeto

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Camadas](#arquitetura-de-camadas)
3. [Padrões de Projeto](#padrões-de-projeto)
4. [Fluxo de Dados](#fluxo-de-dados)
5. [Princípios SOLID](#princípios-solid)

## 🎯 Visão Geral

O frontend foi desenvolvido seguindo princípios de **Clean Architecture** adaptados para React, com foco em:

- **Separação de responsabilidades**
- **Independência de frameworks**
- **Testabilidade**
- **Manutenibilidade**
- **Escalabilidade**

## Arquitetura de Camadas

### 1. Camada de Apresentação (UI Layer)

**Responsabilidade**: Renderização e interação com o usuário

**Componentes**:

- `pages/`: Páginas completas da aplicação
- `components/`: Componentes reutilizáveis
- Estilos CSS específicos

**Princípios**:

- Componentes "burros" (apresentacionais)
- Recebem dados via props
- Emitem eventos via callbacks
- Não contêm lógica de negócio

### 2. Camada de Lógica de Aplicação

**Responsabilidade**: Orquestração de casos de uso e estado

**Componentes**:

- `hooks/`: Custom hooks com lógica reutilizável
- `contexts/`: Estado global da aplicação
- Gerenciamento de formulários

**Exemplo - useContatos Hook**:

```typescript
export function useContatos(filtrosIniciais?: FiltrosContato) {
  // Estado local
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Lógica de negócio
  const carregarContatos = async () => {
    const resposta = await contatoService.listar(filtros);
    setContatos(resposta.data);
  };

  return { contatos, carregando, carregarContatos };
}
```

### 3. Camada de Serviços (Service Layer)

**Responsabilidade**: Comunicação com APIs externas

**Componentes**:

- `services/`: Classes de serviço para cada domínio
- Tratamento de requisições HTTP
- Transformação de dados

**Exemplo - ContatoService**:

```typescript
class ContatoService {
  async listar(filtros?: FiltrosContato): Promise<RespostaPaginada<Contato>> {
    const response = await api.get("/contatos", { params: filtros });
    return response.data;
  }

  async criar(dados: CriarContatoDTO): Promise<Contato> {
    const response = await api.post("/contatos", dados);
    return response.data;
  }
}
```

### 4. Camada de Tipos (Type Layer)

**Responsabilidade**: Definições de tipos e contratos

**Componentes**:

- `types/`: Interfaces e tipos TypeScript
- DTOs (Data Transfer Objects)
- Modelos de domínio

## Padrões de Projeto

### 1. **Singleton Pattern** - Instâncias Únicas de Serviços

```typescript
// services/contato.service.ts
class ContatoService {
  // Métodos do serviço
}

export default new ContatoService(); // ← Singleton
```

**Por quê?**

- Uma única instância compartilhada
- Evita múltiplas conexões HTTP
- Consistência de estado

### 2. **Provider Pattern** - Context API

```typescript
export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Por quê?**

- Estado global acessível
- Evita prop drilling
- Facilita testes

### 3. **Custom Hooks Pattern** - Lógica Reutilizável

```typescript
export function useContatos(filtros?: FiltrosContato) {
  // Encapsula toda a lógica de gerenciamento de contatos
  return { contatos, carregarContatos, removerContato, ... };
}
```

**Por quê?**

- Reutilização de lógica
- Separação de responsabilidades
- Facilita testes

### 4. **Container/Presentational Pattern**

**Container (Smart Component)**:

```typescript
// pages/Contatos/Contatos.tsx
export function Contatos() {
  const { contatos, carregando } = useContatos();

  return <ContatoLista contatos={contatos} carregando={carregando} />;
}
```

**Presentational (Dumb Component)**:

```typescript
// components/ContatoCard.tsx
export function ContatoCard({ contato, onEditar }: ContatoCardProps) {
  return <Card>{/* Apenas apresentação */}</Card>;
}
```

### 5. **Facade Pattern** - API Client

```typescript
// services/api.ts
const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

// Interceptors simplificam o uso
api.interceptors.request.use(/* adiciona token */);
api.interceptors.response.use(/* trata erros */);
```

### 6. **Strategy Pattern** - Validação de Formulários

```typescript
const validationSchema = Yup.object({
  nome: Yup.string().required().min(3).max(100),
  email: Yup.string().required().email(),
  celular: Yup.string()
    .required()
    .matches(/^\d{11}$/),
});
```

## Fluxo de Dados

### Fluxo de Leitura (Read Flow)

```
1. Componente (UI)
   ↓
2. Custom Hook (useContatos)
   ↓
3. Service (contatoService.listar)
   ↓
4. API Client (axios)
   ↓
5. Backend API
   ↓
6. Response transformado em DTO
   ↓
7. Estado atualizado no Hook
   ↓
8. Componente re-renderiza
```

### Fluxo de Escrita (Write Flow)

```
1. Usuário preenche formulário
   ↓
2. Validação (Formik + Yup)
   ↓
3. Submit do formulário
   ↓
4. Service (contatoService.criar)
   ↓
5. API Client (axios POST)
   ↓
6. Backend processa
   ↓
7. Response retorna
   ↓
8. Estado local atualizado
   ↓
9. Toast de sucesso exibido
   ↓
10. Lista recarregada
```

## Princípios SOLID Aplicados

### **S** - Single Responsibility Principle

Cada classe/função tem **uma única responsabilidade**:

```typescript
// ✅ BOM - Cada serviço cuida de um domínio
class ContatoService {
  // Apenas operações de contato
}

class AuthService {
  // Apenas operações de autenticação
}

// ❌ RUIM - Classe fazendo tudo
class ApiService {
  listarContatos() {}
  fazerLogin() {}
  enviarEmail() {}
}
```

### **O** - Open/Closed Principle

Aberto para extensão, fechado para modificação:

```typescript
// ✅ BOM - Extensível via props
interface ContatoCardProps {
  contato: Contato;
  renderActions?: (contato: Contato) => ReactNode; // Customizável
}

// Posso adicionar novas ações sem modificar o componente
<ContatoCard
  contato={contato}
  renderActions={(c) => <CustomButton id={c.id} />}
/>
```

### **L** - Liskov Substitution Principle

Subtipos devem ser substituíveis:

```typescript
// ✅ BOM - Qualquer implementação de AuthContextData funciona
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Posso trocar a implementação sem quebrar o código
function MockAuthProvider({ children }: Props) {
  return (
    <AuthContext.Provider value={mockAuthData}>
      {children}
    </AuthContext.Provider>
  );
}
```

### **I** - Interface Segregation Principle

Interfaces específicas são melhores que genéricas:

```typescript
// ✅ BOM - Interfaces pequenas e específicas
interface CriarContatoDTO {
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
}

interface AtualizarContatoDTO {
  nome?: string;
  email?: string;
  telefone?: string;
  // celular não pode ser atualizado
}

// ❌ RUIM - Interface genérica demais
interface ContatoDTO {
  id?: number;
  nome?: string;
  email?: string;
  // ... todos os campos opcionais
}
```

### **D** - Dependency Inversion Principle

Dependa de abstrações, não de implementações:

```typescript
// ✅ BOM - Componente depende da interface, não da implementação
function Contatos() {
  const { contatos } = useContatos(); // Interface abstrata
  // Não sabemos/importamos como os dados são buscados
}

// A implementação pode mudar (GraphQL, REST, mock) sem afetar o componente
```

## 🧪 Testabilidade

A arquitetura facilita testes em todos os níveis:

### Testes de Componentes

```typescript
test('ContatoCard renderiza corretamente', () => {
  render(<ContatoCard contato={mockContato} />);
  expect(screen.getByText('João Silva')).toBeInTheDocument();
});
```

### Testes de Hooks

```typescript
test("useContatos carrega dados", async () => {
  const { result } = renderHook(() => useContatos());
  await waitFor(() => expect(result.current.contatos).toHaveLength(5));
});
```

### Testes de Serviços

```typescript
test("ContatoService lista contatos", async () => {
  const contatos = await contatoService.listar();
  expect(contatos).toBeInstanceOf(Array);
});
```

## 📦 Organização de Imports

Seguimos uma ordem consistente:

```typescript
// 1. Imports de bibliotecas externas
import { useState } from "react";
import { toast } from "react-toastify";

// 2. Imports de tipos
import { Contato } from "@types/contato.types";

// 3. Imports de serviços
import contatoService from "@services/contato.service";

// 4. Imports de componentes
import { ContatoCard } from "@components/ContatoCard";

// 5. Imports de estilos
import "./Contatos.css";
```

## Tratamento de Erros

Centralizado em múltiplos níveis:

### 1. Interceptor do Axios

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento global de erros HTTP
    if (error.response?.status === 401) {
      // Redireciona para login
    }
    return Promise.reject(error);
  },
);
```

### 2. Try/Catch em Serviços

```typescript
async buscarPorCelular(celular: string): Promise<Contato | null> {
  try {
    const response = await api.get(`/contatos/celular/${celular}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // Tratamento específico
    }
    throw error; // Propaga outros erros
  }
}
```

### 3. Error Boundaries (futuro)

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Performance

### 1. Code Splitting

```typescript
// Lazy loading de rotas (pode ser implementado)
const Contatos = lazy(() => import("@pages/Contatos/Contatos"));
```

### 2. Memoization

```typescript
// Evita re-renderizações desnecessárias
const ContatoCard = memo(({ contato }: ContatoCardProps) => {
  return <Card>...</Card>;
});
```

### 3. Debounce em Buscas

```typescript
// Evita requisições excessivas
const debouncedBusca = useMemo(
  () => debounce((termo) => buscarContatos(termo), 500),
  [],
);
```

---

Esta arquitetura proporciona:
✅ Código limpo e organizado
✅ Fácil manutenção
✅ Alta testabilidade
✅ Escalabilidade
✅ Baixo acoplamento
✅ Alta coesão
