interface BakeServerApiOptions {
    host?: string;
}
export declare class BakeServerApi {
    private OAuthToken;
    private client;
    constructor(OAuthToken: string, options?: BakeServerApiOptions);
    checkAuth: () => Promise<{
        name: string;
        email: string;
        provider: string;
    }>;
    listApi: () => Promise<{
        [key: string]: {
            lastUpdate: string;
        };
    }>;
}
export {};
