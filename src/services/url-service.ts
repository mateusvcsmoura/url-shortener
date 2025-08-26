import { nanoid } from "nanoid";
import { UrlModel } from "../models/url-model";
import { normalizeUrl } from "../utils/functions";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "../generated/prisma";

const urlModel = new UrlModel();

class UrlService {
    shorten = async (longUrl: string) => {
        const normalizedUrl = normalizeUrl(longUrl);

        try {
            let shortCode: string | undefined;
            const maxAttempts = 5;
            let isUnique = false;
            let attempts = 0;

            while (!isUnique && attempts < maxAttempts) {
                const candidateCode = nanoid(8);

                const shortCodeExists = await urlModel.findUrlByShortCode(candidateCode);
                if (!shortCodeExists) {
                    isUnique = true;
                    shortCode = candidateCode;
                }

                attempts++;
            }

            if (!shortCode) throw new HttpError(500, "Could not create an unique short code after many attempts.");

            const newUrl = await urlModel.saveUrl(normalizedUrl, shortCode);
            return newUrl;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new HttpError(409, "URL is already shortened, check URL list.");
                }
            }

            throw new HttpError(500, "An unexpected error occurred while saving the URL.");
        }
    }

    getUrlToRedirect = async (shortCode: string) => {
        try {
            const url = await urlModel.findUrlByShortCode(shortCode);
            if (!url) throw new HttpError(404, "Short code not found");

            await urlModel.incrementClicks(url.shortCode);

            return url.longUrl;
        } catch (e) {
            throw new HttpError(500, "An unexpected error ocurred while getting URL.");
        }
    }

    deleteUrlRegister = async (urlId: number) => {
        try {
            const deletedUrl = await urlModel.deleteUrl(urlId);

            return deletedUrl;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2025") {
                    throw new HttpError(404, "URL register not found");
                }
            }
        }
    }
};

export { UrlService };

