interface UrlRegister {
    id: number;
    longUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
}

export { UrlRegister };