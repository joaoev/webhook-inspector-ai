# Webhook Generator AI

Uma aplicação full-stack para capturar, inspecionar e analisar requisições de webhook utilizando inteligência artificial.

## 📦 Tecnologias

### Backend
- **Fastify** - Framework web de alta performance
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas TypeScript
- **TypeScript** - Type safety na aplicação

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool e dev server
- **TypeScript** - Type safety

### Ferramentas
- **pnpm** - Gerenciador de pacotes
- **Biome** - Linter e formatter
- **Docker** - Containerização do banco de dados

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm 10+
- Docker e Docker Compose (para o banco de dados)

### Passos

1. **Clone o repositório**
```bash
git clone <seu-repo>
cd webhook_generator_ai
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cd api
cp .env.example .env
# Edite o arquivo .env com seus dados
```

4. **Inicie o PostgreSQL**
```bash
docker compose up -d
```

5. **Crie e migre o banco de dados**
```bash
pnpm run db:generate
pnpm run db:migrate
```

## 📋 Uso

### Desenvolvimento

Inicie ambos os servidores simultaneamente na raiz do projeto:

```bash
# Terminal 1: Backend (api)
cd api
pnpm run dev
# Backend rodará em http://localhost:3000

# Terminal 2: Frontend (web)
cd web
pnpm run dev
# Frontend rodará em http://localhost:5173
```

### Produção

```bash
# Build
pnpm run build

# Start backend
cd api
pnpm start
```

## 🛠️ Scripts Disponíveis

### Projeto Root
- `pnpm install` - Instala dependências de todos os workspaces
- `pnpm run build` - Build de todos os workspaces

### API (`api/`)
- `pnpm run dev` - Inicia servidor em desenvolvimento
- `pnpm start` - Inicia servidor em produção
- `pnpm run format` - Formata código com Biome
- `pnpm run db:generate` - Gera migrações do banco
- `pnpm run db:migrate` - Executa migrações
- `pnpm run db:studio` - Abre Drizzle Studio (UI do banco)

### Web (`web/`)
- `pnpm run dev` - Inicia dev server
- `pnpm run build` - Build para produção
- `pnpm run preview` - Preview do build

## 📁 Estrutura do Projeto

```
webhook_generator_ai/
├── api/                 # Backend Fastify
│   ├── src/
│   │   ├── server.ts   # Configuração do servidor
│   │   ├── env.ts      # Validação de variáveis
│   │   ├── db/         # Drizzle ORM & schemas
│   │   └── routes/     # Rotas da API
│   ├── drizzle.config.ts
│   └── package.json
├── web/                 # Frontend React + Vite
│   ├── src/
│   │   ├── app.tsx     # Componente principal
│   │   └── main.tsx    # Entry point
│   ├── vite.config.ts
│   └── package.json
└── docker-compose.yml  # PostgreSQL container
```

## 🔗 Endereços Úteis

- **API**: http://localhost:3000
- **API Docs (Swagger)**: http://localhost:3000/docs
- **Frontend**: http://localhost:5173
- **PostgreSQL**: localhost:5432
- **Drizzle Studio**: http://localhost:4983

## 📝 Notas

- WSL + Chrome: Se tiver bloco de CORS ao acessar Drizzle Studio, permita acesso local em `chrome://settings/content/localNetworkAccess`
- Certifique-se de que o Docker está rodando antes de iniciar o projeto
- Use `docker compose down` para parar os serviços

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no projeto.
