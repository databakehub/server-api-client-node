import HTTPClient from '../lib/http-client';

const DEFAULT_HOST = 'https://api.databake.xyz';

interface ServerApiOptions {
    host?: string;
}

export default class BaseApi {
    public OAuthToken: string;
    public client: HTTPClient;

    constructor(OAuthToken: string, options?: ServerApiOptions) {
        this.OAuthToken = OAuthToken;

        this.client = new HTTPClient({
            host: options?.host ?? DEFAULT_HOST,
            authHeaders: {
                Authorization: `${this.OAuthToken}`
            }
        });
    }
}