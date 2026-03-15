import { describe, it, expect } from "vitest"
import { ShopeeProvider } from "../src/index"
import fs from "node:fs"
import path from "node:path"

// O arquivo auth.json deve estar na raiz do pacote ou ser passado o caminho absoluto.
const AUTH_PATH = path.join(__dirname, "auth.json")

let AUTH_DATA = {
    appId: "",
    appSecret: "",
    subIds: ["shopee-test"]
}

if (fs.existsSync(AUTH_PATH)) {
    try {
        AUTH_DATA = JSON.parse(fs.readFileSync(AUTH_PATH, "utf-8"))
    } catch (error: any) {
        console.error("❌ Erro ao ler auth.json:", error.message)
    }
}

describe("ShopeeProvider Practical Test", () => {
    it("should create a real affiliate URL (integration)", async () => {
        if (!AUTH_DATA.appId || !AUTH_DATA.appSecret) {
            console.warn(`⚠️ Pulando teste prático: Arquivo auth.json não encontrado ou incompleto em: ${AUTH_PATH}`)
            return
        }

        const provider = new ShopeeProvider(AUTH_DATA)

        const testUrl = "https://shopee.com.br/Celular-IPhone-13-13-Pro-13-Pro-Max-128gb-100-Original-Com-Garantia-i.1372532408.22293490123?extraParams=%7B%22display_model_id%22%3A189167696858%2C%22model_selection_logic%22%3A3%7D"

        try {
            console.log(`Gerando link para: ${testUrl}`)
            const affiliateUrl = await provider.createAffiliateUrl(testUrl)

            expect(affiliateUrl).toMatch(/https:\/\/(shpe\.ee|sho\.pe|s\.shopee\.com\.br)\/.*/)
            
            console.log("✅ Sucesso!")
            console.log(`🔗 Link gerado: ${affiliateUrl}`)
        } catch (error: any) {
            console.error("❌ Falha no teste prático:")
            console.error(error.message)
            throw error
        }
    })
})
