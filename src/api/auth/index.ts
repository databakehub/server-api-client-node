import BaseApi from '../base-api';
import checkAuthApiBuilder from './check-auth';

const AuthApiBuilder = (baseApi: BaseApi) => ({
    check: checkAuthApiBuilder(baseApi)
});

export default AuthApiBuilder;
