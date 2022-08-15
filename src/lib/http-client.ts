import superagent from 'superagent';
import type { Response } from 'superagent';

export interface HTTPClientOptions {
  host: string;
  authHeaders?: { [key: string]: string };
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST'
}

export default class HTTPClient {
  private host: string;
  private authHeaders: { [key: string]: string } = {}

  constructor(options: HTTPClientOptions) {
    const { host } = options;
    this.host = host;
    if (options.authHeaders) {
      this.authHeaders = options.authHeaders;
    }
  }

  private getAgent = () => {
    const agent = superagent.agent();
    return agent;
  }

  public makeApiCall = async (
    method: METHODS,
    endpoint: string,
    options?: {
      /** Override host from API call. Do not remove. Required for upload endpoint */
      apiHost?: string;
      data?: object;
      query?: { [key: string]: string | number };
      /** Whether or not to use authentication headers from login result or not. Default is `false` */
      useAuth?: boolean;
      /** Whether to add `Accept: application/json` in header. Default is `true` */
      json?: boolean;
    }) => {
    const useJSON = options?.json ?? true;
    let response: Response | null;

    const request = this.getAgent();

    if (options?.query) {
      request.query(options.query);
    }

    if (useJSON) {
      request.set('Accept', 'application/json');
    }

    if (options?.useAuth) {
      const authHeaders = this.authHeaders;
      for (const key in authHeaders) {
        request.set(key, authHeaders[key]);
      }
    }

    try {
      if (method === METHODS.GET) {
        const joined = new URL(endpoint, this.host).toString();
        response = await request.get(joined);
      } else if (method === METHODS.POST) {
        response = await request
          .post(`${this.host}${endpoint}`)
          .send(options?.data);
      } else {
        response = null;
      }

      if (response !== null) {
        if (useJSON && response.body) {
          return response.body;
        }
        return response.text;
      } else {
        console.warn('HTTPClient error: response is null');
      }
    } catch (error) {
      throw error;
    }
  };
}
