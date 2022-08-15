export interface HTTPClientOptions {
    host: string;
    authHeaders?: {
        [key: string]: string;
    };
}
export declare enum METHODS {
    GET = "GET",
    POST = "POST"
}
export default class HTTPClient {
    private host;
    private authHeaders;
    constructor(options: HTTPClientOptions);
    private getAgent;
    makeApiCall: (method: METHODS, endpoint: string, options?: {
        /** Override host from API call. Do not remove. Required for upload endpoint */
        apiHost?: string | undefined;
        data?: object | undefined;
        query?: {
            [key: string]: string | number;
        } | undefined;
        /** Whether or not to use authentication headers from login result or not. Default is `false` */
        useAuth?: boolean | undefined;
        /** Whether to add `Accept: application/json` in header. Default is `true` */
        json?: boolean | undefined;
    } | undefined) => Promise<any>;
}
