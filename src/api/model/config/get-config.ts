import { METHODS } from '../../../lib/http-client';
import BaseApi from '../../base-api';

const ENDPOINT = '/model/config/:metric';

const getModelConfigApiBuilder = (baseApi: BaseApi) => async (metric: string) => {
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

export default getModelConfigApiBuilder;
