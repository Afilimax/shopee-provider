import crypto from "node:crypto"

import { AffiliateProvider } from "@afilimax/core"

export type ShopeeProviderOptions = {
    appId: string
    appSecret: string
    subIds: string[]
}

export class ShopeeProvider extends AffiliateProvider<ShopeeProviderOptions> {
    readonly name = "Shopee"

    readonly domains = ["shopee.com.br", "shopee.com", "sho.pe", "shp.ee"]

    constructor(options: ShopeeProviderOptions) {
        super(options)
    }

    private generateSignature(rawBody: string, timestamp: number): string {
        const payload = `${this.options.appId}${timestamp}${rawBody}${this.options.appSecret}`
        return crypto.createHash("sha256").update(payload).digest("hex")
    }

    async createAffiliateUrl(url: string): Promise<string> {
        const cleanUrl = url.split("?")[0]
        const timestamp = Math.floor(Date.now() / 1000)
        const subIds = JSON.stringify(this.options.subIds)
        const rawQuery = `mutation{\ngenerateShortLink(input:{originUrl:\"${cleanUrl}\",subIds:${subIds}}){shortLink}\n}`
        const rawBody = JSON.stringify({ query: rawQuery })
        const signature = this.generateSignature(rawBody, timestamp)
        const authorizationHeader = `SHA256 Credential=${this.options.appId}, Signature=${signature}, Timestamp=${timestamp}`

        const response = await fetch("https://open-api.affiliate.shopee.com.br/graphql", {
            method: "POST",
            body: rawBody,
            headers: {
                "Content-Type": "application/json",
                Authorization: authorizationHeader,
            },
        })

        const data = (await response.json()) as any

        if (data.errors) {
            const errorMessage = data.errors.map((err: any) => err.message).join(" ")
            throw new Error(`Shopee Error: ${response.status} - ${errorMessage}`)
        }

        const shortLinkResult = data.data.generateShortLink

        if (!shortLinkResult || !shortLinkResult.shortLink) {
            throw new Error(`Shopee API response missing shortLink: ${JSON.stringify(data)}`)
        }

        return shortLinkResult.shortLink
    }
}
