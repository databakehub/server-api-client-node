import { METHODS } from '../../lib/http-client';
import BaseApi from '../base-api';

const ENDPOINT = '/model/pause/:metric';

const pauseModelApiBuilder = (baseApi: BaseApi) => async (metric: string) => {
    if (!baseApi.OAuthToken) {
        return {};
    }

    const response = await baseApi.client.makeApiCall(
        METHODS.GET,
        ENDPOINT.replace(':metric', metric),
        {
            useAuth: true,
            json: false
        }
    );
    return JSON.parse(response);
}

export default pauseModelApiBuilder;
