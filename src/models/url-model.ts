import { prisma } from "../database";
import { UrlRegister } from "../interfaces/url";

class UrlModel {
    findUrlByLong = async (longUrlTarget: string) => {
        const url = prisma.url.findUnique({ where: { longUrl: longUrlTarget } });

        return url;
    }

    findUrlByShortCode = async (shortCodeTarget: string) => {
        const url = await prisma.url.findUnique({ where: { shortCode: shortCodeTarget } });

        return url;
    }

    findUrlById = async (id: number) => {
        const url = await prisma.url.findUnique({ where: { id: id } });

        return url;
    }

    saveUrl = async (longUrl: string, shortCode: string): Promise<UrlRegister> => {
        const newUrl = await prisma.url.create({ data: { longUrl: longUrl, shortCode: shortCode } });

        return newUrl;
    }

    deleteUrl = async (id: number) => {
        const deletedUrl = await prisma.url.delete({ where: { id: id } });

        return deletedUrl;
    }
};

export { UrlModel };

