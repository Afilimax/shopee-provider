<a href="https://afilimax.net"><img src="https://raw.githubusercontent.com/Afilimax/.github/main/assets/npm-banner.svg" alt="Afilimax — Encontre a oferta. Gere o link. Divulgue sozinho." width="100%" /></a>

[![npm version](https://img.shields.io/npm/v/%40afilimax%2Fshopee-provider?logo=npm)](https://www.npmjs.com/package/@afilimax/shopee-provider)
[![npm downloads](https://img.shields.io/npm/dm/%40afilimax%2Fshopee-provider?logo=npm)](https://www.npmjs.com/package/@afilimax/shopee-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Afilimax/shopee-provider/blob/HEAD/LICENSE)
[![Website](https://img.shields.io/badge/website-afilimax.net-7857FF)](https://afilimax.net)

# @afilimax/shopee-provider

Provedor de links de afiliados para a Shopee, integrado ao ecossistema Afilimax. Este pacote permite converter URLs de produtos da Shopee em links de afiliados encurtados utilizando a API oficial de parcerias da Shopee.

## Instalação

```bash
npm install @afilimax/shopee-provider
```

> [!IMPORTANT]
> Este pacote requer `@afilimax/core` como dependência de par (peer dependency).

## Como usar

O `ShopeeProvider` utiliza autenticação baseada em `appId` e `appSecret` fornecidos pelo portal de afiliados da Shopee.

```typescript
import { ShopeeProvider } from "@afilimax/shopee-provider";

const provider = new ShopeeProvider({
    appId: "seu_app_id",
    appSecret: "seu_app_secret",
    subIds: ["seu_sub_id_opcional"]
});

async function run() {
    const originalUrl = "https://shopee.com.br/produto-exemplo-i.123456.7891011";
    
    try {
        const affiliateUrl = await provider.createAffiliateUrl(originalUrl);
        console.log("Link de Afiliado:", affiliateUrl); // Retorna o link encurtado (Ex: https://shpe.ee/...)
    } catch (error) {
        console.error("Erro ao gerar link:", error.message);
    }
}

run();
```

## Configurações

A interface `ShopeeProviderOptions` aceita as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `appId` | `string` | Seu App ID obtido no portal de Afiliados da Shopee. |
| `appSecret` | `string` | Sua App Secret correspondente para assinatura de requisições. |
| `subIds` | `string[]` | (Opcional) Sub IDs para rastreamento interno (máximo de 5). |

## Domínios Suportados

O provedor identifica automaticamente URLs dos seguintes domínios:
- `shopee.com.br`
- `shopee.com`
- `sho.pe`
- `shp.ee`

## Desenvolvimento

### Scripts Disponíveis

- `npm run build`: Compila o projeto para o diretório `dist`.
- `npm run dev`: Executa o projeto em ambiente de desenvolvimento usando `ts-node`.
- `npm run test`: Executa os testes unitários com Vitest.
- `npm run lint`: Verifica e corrige problemas de estilo de código.
- `npm run format`: Formata o código fonte usando Prettier.

---

Produzido com ❤️ pela equipe **Afilimax**.
---

## Automatize sua operação de afiliados

> Use este pacote para automatizar sua operação de afiliados. Conheça a plataforma Afilimax e transforme ofertas em links e divulgação automática.

[Conheça a Afilimax](https://afilimax.net) · [Pacote no npm](https://www.npmjs.com/package/@afilimax/shopee-provider) · [Repositório no GitHub](https://github.com/Afilimax/shopee-provider)
