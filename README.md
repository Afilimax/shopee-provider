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