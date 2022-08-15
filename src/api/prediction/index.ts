import BaseApi from '../base-api';
import addPredictionApiBuilder from './add-prediction';
import getPredictionApiBuilder from './get-prediction';
import removePredictionApiBuilder from './remove-prediction';

const PredictionsApiBuilder = (baseApi: BaseApi) => ({
    get: getPredictionApiBuilder(baseApi),
    add: addPredictionApiBuilder(baseApi),
    remove: removePredictionApiBuilder(baseApi),
});

export default PredictionsApiBuilder;
