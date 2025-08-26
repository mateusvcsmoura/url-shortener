import { HttpError } from "../errors/HttpError.js";

export function normalizeUrl(urlString: string) {
    if (!urlString || typeof urlString !== 'string') {
        throw new HttpError(400, "Invalid URL");
    }

    let cleanUrl = urlString.trim();

    if (!/^https?:\/\//i.test(cleanUrl)) {
        cleanUrl = 'https://' + cleanUrl;
    } else if (cleanUrl.startsWith('http://')) {
        cleanUrl = 'https://' + cleanUrl.slice(7);
    }

    try {
        const urlObject = new URL(cleanUrl);

        if (!urlObject.hostname.includes('.')) {
            throw new HttpError(400, 'Invalid hostname, URL must have a top domain.');
        }

        let hostname = urlObject.hostname.toLowerCase();
        if (hostname.startsWith('www.')) {
            hostname = hostname.slice(4);
        }

        let pathname = urlObject.pathname;
        if (pathname.length > 1 && pathname.endsWith('/')) {
            pathname = pathname.slice(0, -1);
        }

        const normalized = `${urlObject.protocol}//${hostname}${pathname}`;

        return normalized;
    } catch (error) {
        console.error(`Error trying to normalize URL "${urlString}":`, error);
        throw new HttpError(400, 'URL Format is invalid.');
    }
}

