import AuthApiBuilder from './api/auth';
import BaseApi from './api/base-api';
import listApiBuilder from './api/list-api';
import ModelApiBuilder from './api/model';
import PredictionsApiBuilder from './api/prediction';

interface BakeServerApiOptions {
    host?: string;
}

export class BakeServerApi extends BaseApi {
    constructor(OAuthToken: string, options?: BakeServerApiOptions) {
        super(OAuthToken, options);
    }

    public list = listApiBuilder(this);
    
    public auth = AuthApiBuilder(this);

    public model = ModelApiBuilder(this);

    public prediction = PredictionsApiBuilder(this);
}
