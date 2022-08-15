import HTTPClient, { METHODS } from './http-client';

const DEFAULT_HOST = 'https://api.databake.xyz';

const ENDPOINTS = {
    AUTH_CHECK: '/authcheck/:token',
    LIST: '/list'
}

interface BakeServerApiOptions {
    host?: string;
}


export class BakeServerApi {
    private OAuthToken: string;
    private client: HTTPClient;

    constructor(OAuthToken: string, options?: BakeServerApiOptions) {
        this.OAuthToken = OAuthToken;

        this.client = new HTTPClient({
            host: options?.host ?? DEFAULT_HOST,
            authHeaders: {
                Authorization: `${this.OAuthToken}`
            }
        });
    }

    public checkAuth = async (): Promise<{
        name: string;
        email: string;
        provider: string;
    }> => {
        if (this.OAuthToken) {
            try {
                const response = await this.client.makeApiCall(
                    METHODS.GET,
                    ENDPOINTS.AUTH_CHECK.replace(':token', this.OAuthToken),
                    {
                        json: false
                    }
                );

                return JSON.parse(response);
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error('No OAuth token provided');
        }
    };

    public listApi = async (): Promise<{
        [key: string]: {
            lastUpdate: string;
        }
    }> => {
        if (!this.OAuthToken) {
            return {};
        }
        const response = await this.client.makeApiCall(
            METHODS.GET,
            ENDPOINTS.LIST,
            {
                useAuth: true,
                json: false
            }
        );
        return JSON.parse(response);
    };
}
