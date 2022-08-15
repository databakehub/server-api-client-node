import { METHODS } from '../lib/http-client';
import BaseApi from './base-api';

const ENDPOINT = '/list';

const listApiBuilder = (baseApi: BaseApi) => async () => {
    const response = await baseApi.client.makeApiCall(
        METHODS.GET,
        ENDPOINT,
        {
            useAuth: true,
            json: false
        }
    );
    return JSON.parse(response);
}

export default listApiBuilder;
