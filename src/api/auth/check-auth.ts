import { METHODS } from '../../lib/http-client';
import BaseApi from '../base-api';

const ENDPOINT = '/authcheck/:token';

const checkAuthApiBuilder = (baseApi: BaseApi) => async () => {
    const response = await baseApi.client.makeApiCall(
        METHODS.GET,
        ENDPOINT.replace(':token', baseApi.OAuthToken),
        {
            json: false
        }
    );
    return JSON.parse(response);
}

export default checkAuthApiBuilder;
