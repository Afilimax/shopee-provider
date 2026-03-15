import { expect, it, describe, vi, beforeEach } from "vitest"
import { ShopeeProvider } from "../src/index"

describe("ShopeeProvider", () => {
    const options = {
        appId: "test-app-id",
        appSecret: "test-app-secret",
        subIds: ["sub1", "sub2"]
    }
    const provider = new ShopeeProvider(options)

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("should have the correct name", () => {
        expect(provider.name).toBe("Shopee")
    })

    it("should have valid domains", () => {
        expect(provider.domains).toContain("shopee.com.br")
        expect(provider.domains).toContain("shopee.com")
        expect(provider.domains).toContain("sho.pe")
        expect(provider.domains).toContain("shp.ee")
    })

    it("should create an affiliate URL successfully", async () => {
        const mockResponse = {
            data: {
                generateShortLink: {
                    shortLink: "https://shpe.ee/test-short"
                }
            }
        }

        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse),
            status: 200,
            ok: true
        })

        const url = "https://shopee.com.br/product-123"
        const result = await provider.createAffiliateUrl(url)

        expect(result).toBe("https://shpe.ee/test-short")
        expect(global.fetch).toHaveBeenCalledWith(
            "https://open-api.affiliate.shopee.com.br/graphql",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    Authorization: expect.stringContaining("SHA256 Credential=test-app-id"),
                }),
                body: expect.stringContaining("generateShortLink")
            })
        )
    })

    it("should throw error when API returns errors", async () => {
        const mockErrorResponse = {
            errors: [
                { message: "Invalid App ID" }
            ]
        }

        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve(mockErrorResponse),
            status: 200,
            ok: true
        })

        const url = "https://shopee.com.br/product-123"
        
        await expect(provider.createAffiliateUrl(url)).rejects.toThrow("Shopee Error: 200 - Invalid App ID")
    })

    it("should throw error when shortLink is missing in response", async () => {
        const mockResponse = {
            data: {
                generateShortLink: null
            }
        }

        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse),
            status: 200,
            ok: true
        })

        const url = "https://shopee.com.br/product-123"
        
        await expect(provider.createAffiliateUrl(url)).rejects.toThrow("Shopee API response missing shortLink")
    })
})
