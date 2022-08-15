import BaseApi from '../../base-api';
import getModelConfigApiBuilder from './get-config';
// import 

const ModelConfigApiBuilder = (baseApi: BaseApi) => ({
    get: getModelConfigApiBuilder(baseApi)
});

export default ModelConfigApiBuilder;
