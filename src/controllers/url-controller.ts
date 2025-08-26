import { Handler, NextFunction } from "express";
import { HttpError } from "../errors/HttpError.js";
import { deleteUrlSchema, saveUrlSchema, shortCodeSchema } from "../schemas/url-schema.js";
import { UrlService } from "../services/url-service.js";

const urlService = new UrlService();

class UrlController {
    save: Handler = async (req, res, next: NextFunction) => {
        if (!req.body) throw new HttpError(400, "No body req");

        try {
            const validatedData = saveUrlSchema.parse(req.body);
            const newUrl = await urlService.shorten(validatedData.longUrl);

            return res.status(201).json(newUrl);
        } catch (e) {
            next(e);
        }
    }

    redirect: Handler = async (req, res, next: NextFunction) => {
        if (!req.params.shortCode) throw new HttpError(400, "No short code provided");

        try {
            const validatedData = shortCodeSchema.parse(req.params);
            const longUrl = await urlService.getUrlToRedirect(validatedData.shortCode);

            return res.redirect(longUrl);
        } catch (e) {
            next(e);
        }
    }

    delete: Handler = async (req, res, next: NextFunction) => {
        if (!req.body) throw new HttpError(400, "No body req");

        try {
            const validatedData = deleteUrlSchema.parse(req.body);
            const deletedUrl = await urlService.deleteUrlRegister(validatedData.id);

            return res.status(204).json(deletedUrl);
        } catch (e) {
            next(e);
        }
    }
};

export { UrlController };
