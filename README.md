<a href="https://afilimax.net"><img src="https://raw.githubusercontent.com/Afilimax/.github/main/assets/npm-banner.svg" alt="Afilimax — Encontre a oferta. Gere o link. Divulgue sozinho." width="100%" /></a>

[![npm version](https://img.shields.io/npm/v/%40afilimax%2Fshopee-provider?logo=npm)](https://www.npmjs.com/package/@afilimax/shopee-provider)
[![npm downloads](https://img.shields.io/npm/dm/%40afilimax%2Fshopee-provider?logo=npm)](https://www.npmjs.com/package/@afilimax/shopee-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Afilimax/shopee-provider/blob/HEAD/LICENSE)
[![Website](https://img.shields.io/badge/website-afilimax.net-7857FF)](https://afilimax.net)

# @afilimax/shopee-provider

Provedor de links de afiliado da Shopee para o ecossistema Afilimax. O pacote chama a API GraphQL do programa de afiliados e converte URLs de produtos em links curtos de divulgação.

## Recursos

- Geração de links pela mutation `generateShortLink` da Shopee.
- Autenticação com App ID e App Secret do programa de afiliados.
- Assinatura SHA-256 das requisições com timestamp.
- Sub IDs para rastreamento interno das conversões.
- Remoção da query string da URL antes do envio.
- Comunicação por requisições HTTP, sem navegador automatizado.
- Compatibilidade com `AffiliateProvider` e `AffiliateManager`.

## Instalação

```bash
npm install @afilimax/shopee-provider @afilimax/core
```

O `@afilimax/core` fornece a classe `AffiliateProvider` usada pelo pacote.

## Como usar

Informe as credenciais do programa de afiliados e um array de Sub IDs. O array pode ser vazio:

```typescript
import { ShopeeProvider } from "@afilimax/shopee-provider"

const provider = new ShopeeProvider({
    appId: process.env.SHOPEE_APP_ID!,
    appSecret: process.env.SHOPEE_APP_SECRET!,
    subIds: ["your-sub-id"],
})

async function main() {
    const productUrl = "https://shopee.com.br/product-example-i.123456.7891011"

    try {
        const affiliateUrl = await provider.createAffiliateUrl(productUrl)
        console.log("Affiliate URL:", affiliateUrl)
    } catch (error) {
        console.error("Failed to create affiliate URL:", error)
    }
}

main()
```

### Uso com AffiliateManager

```typescript
import { AffiliateManager } from "@afilimax/core"
import { ShopeeProvider } from "@afilimax/shopee-provider"

const manager = new AffiliateManager([
    new ShopeeProvider({
        appId: process.env.SHOPEE_APP_ID!,
        appSecret: process.env.SHOPEE_APP_SECRET!,
        subIds: [],
    }),
])

const affiliateUrl = await manager.createAffiliateUrl(
    "https://shopee.com.br/product-example-i.123456.7891011",
)

console.log("Affiliate URL:", affiliateUrl)
```

O gerenciador retorna `null` quando nenhum provedor registrado aceita a URL.

## Configuração

A interface `ShopeeProviderOptions` possui três campos obrigatórios:

| Opção | Tipo | Descrição |
| :--- | :--- | :--- |
| `appId` | `string` | App ID obtido no portal de afiliados da Shopee. |
| `appSecret` | `string` | Segredo usado para assinar as requisições com SHA-256. |
| `subIds` | `string[]` | Identificadores adicionais de rastreamento; use `[]` quando não precisar deles. |

Mantenha o App Secret em variáveis de ambiente ou em outro armazenamento seguro, fora do controle de versão.

## Referência da API

### `new ShopeeProvider(options)`

Cria um provedor com as credenciais e os Sub IDs informados.

### `createAffiliateUrl(url: string): Promise<string>`

Remove os parâmetros de consulta da URL, assina a requisição e chama a API GraphQL. Retorna o campo `shortLink` ou lança um erro quando a API informa falhas ou não retorna o link.

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `url` | `string` | URL do produto ou página aceita pela API de afiliados. |

### `supportsUrl(url: string): boolean`

Método herdado de `AffiliateProvider` que verifica o hostname e seus subdomínios.

### Domínios suportados

- `shopee.com.br`
- `shopee.com`
- `sho.pe`
- `shp.ee`

### Erros comuns

| Erro | Causa provável |
| :--- | :--- |
| `Shopee Error` | A API retornou erros GraphQL; o status HTTP e as mensagens são incluídos no erro. |
| `Shopee API response missing shortLink` | A resposta não contém um link curto no caminho esperado. |

## Desenvolvimento

Instale as dependências com `npm install`. Os scripts disponíveis são:

| Comando | Finalidade |
| :--- | :--- |
| `npm run dev` | Executa `src/index.ts` com `ts-node`. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm test` | Executa os testes uma vez com Vitest. |
| `npm run test:watch` | Executa os testes em modo de observação. |
| `npm run test:cov` | Executa os testes com cobertura. |
| `npm run lint` | Executa o ESLint com correção automática. |
| `npm run format` | Formata os arquivos de `src/` com Prettier. |

O teste prático incluído em `npm test` lê `__tests__/auth.json` e é ignorado quando as credenciais estão ausentes:

```json
{
    "appId": "your-app-id",
    "appSecret": "your-app-secret",
    "subIds": ["your-sub-id"]
}
```

Não versione esse arquivo nem credenciais reais.

## Licença

Distribuído sob a licença [MIT](./LICENSE).

---

## Automatize sua operação de afiliados

> Use este pacote para automatizar sua operação de afiliados. Conheça a plataforma Afilimax e transforme ofertas em links e divulgação automática.

[Conheça a Afilimax](https://afilimax.net) · [Pacote no npm](https://www.npmjs.com/package/@afilimax/shopee-provider) · [Repositório no GitHub](https://github.com/Afilimax/shopee-provider)
