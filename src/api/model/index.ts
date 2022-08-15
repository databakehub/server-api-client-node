import BaseApi from '../base-api';
import backupModelApiBuilder from './backup-model';
import ModelConfigApiBuilder from './config';
import pauseModelApiBuilder from './pause-model';
import predictModelApiBuilder from './predict-model';
import trainModelApiBuilder from './train-model';
// import 

const ModelApiBuilder = (baseApi: BaseApi) => ({
    config: ModelConfigApiBuilder(baseApi),
    train: trainModelApiBuilder(baseApi),
    pause: pauseModelApiBuilder(baseApi),
    backup: backupModelApiBuilder(baseApi),
    predict: predictModelApiBuilder(baseApi),
});

export default ModelApiBuilder;
