# Z5 Esportes Monorepo

Monorepo inicial da plataforma Z5 Esportes com foco em corridas de rua, priorizando a experiência mobile do corredor e a base administrativa para organizadores.

## Estrutura

```text
.
├── apps/
│   ├── web       # z5esportes.com.br
│   ├── store     # loja.z5esportes.com.br
│   └── api       # api.z5esportes.com.br
├── packages/     # código compartilhado entre apps
├── docker-compose.yml
├── .env.example
└── README.md
```

## Subdomínios

- `z5esportes.com.br` aponta para `apps/web`.
- `loja.z5esportes.com.br` aponta para `apps/store`.
- `api.z5esportes.com.br` aponta para `apps/api`.

## O que foi feito

- Estruturação do projeto como monorepo com `npm workspaces`.
- Criação da API em `apps/api` para centralizar integrações sensíveis.
- Reorganização das aplicações dentro de `apps/` para refletir os subdomínios do produto.
- Preparação de `apps/store` como frente desacoplada para a loja.
- Criação de `packages/` para futura extração de tipos, UI, clientes HTTP e utilitários compartilhados.
- Preparação do PostgreSQL via `docker-compose`, sem visualizador embutido.
- Padronização inicial de variáveis compartilhadas em `.env.example` e `.env.local`.
- Remoção da exposição direta de segredo do Gemini no frontend.
- Documentação do plano técnico para evolução do produto.

## Próximas etapas previstas

1. Modelar entidades reais de corridas, lotes, kits, adicionais, organizadores e inscrições.
2. Implementar autenticação separando corredor e organizador.
3. Integrar mapa real com coordenadas, geocoding e filtros por proximidade.
4. Construir área administrativa para gestão de eventos, localidade, valores e brindes.
5. Substituir dados mockados do frontend por dados vindos da API e do banco.
6. Adicionar testes de fluxo crítico mobile e otimizações de bundle.

## Ambiente local

1. Copie `.env.example` para `.env.local` e ajuste os valores.
2. Suba o banco:
   `npm run db:up`
3. Instale as dependências na raiz:
   `npm install`
4. Rode a API:
   `npm run dev:api`
5. Rode o frontend:
   `npm run dev:web`
6. Rode a store quando ela estiver implementada:
   `npm run dev:store`

## Observações de arquitetura

- O banco fica disponível para uso via extensões do VS Code, conforme solicitado.
- Chaves privadas devem permanecer apenas na API.
- A chave de mapa prevista para o frontend deve ser pública e restrita por domínio quando for provisionada.
- A estrutura `apps/*` + `packages/*` é a base mais segura para crescer com novos frontends, painéis administrativos e bibliotecas internas sem acoplamento indevido.
