# web

Frontend React + Vite da plataforma Z5 Esportes, responsável pelo domínio raiz `z5esportes.com.br`.

## O que foi feito

- Ajuste da aplicação para o contexto de monorepo.
- Realocação do app para `apps/web`, alinhando a estrutura aos subdomínios do projeto.
- Remoção da injeção da `GEMINI_API_KEY` no bundle do frontend.
- Padronização das variáveis públicas do frontend para API e mapa.
- Documentação das próximas etapas de produto com foco em corridas de rua e mobile first.

## O que será feito nas próximas etapas

1. Substituir os dados mockados por dados reais da API.
2. Implementar busca e filtros reais por cidade, data, distância, lotes e preço.
3. Integrar visualização em mapa para eventos com coordenadas reais.
4. Converter o detalhe do evento em fluxo de inscrição mobile-first.
5. Conectar autenticação e área do organizador.

## Variáveis de ambiente

Use o arquivo `.env.example` como referência.

```env
VITE_API_URL=http://localhost:3333
VITE_MAP_PROVIDER=google-maps
VITE_MAPS_API_KEY=YOUR_PUBLIC_MAPS_KEY
```

## Desenvolvimento local

1. Instale as dependências na raiz do monorepo com `npm install`.
2. Rode a API com `npm run dev:api` na raiz.
3. Rode o frontend com `npm run dev:web` na raiz.
