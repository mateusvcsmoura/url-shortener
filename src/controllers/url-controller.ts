import { Handler, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { saveUrlSchema } from "../schemas/url-schema";
import { UrlService } from "../services/url-service";

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
};

export { UrlController };
