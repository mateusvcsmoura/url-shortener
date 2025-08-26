import { Router } from "express";
import { UrlController } from "./controllers/url-controller";

const urlController = new UrlController();
const router = Router();

router.post('/shorten', urlController.save);
router.get('/:shortCode', urlController.redirect);

export { router };