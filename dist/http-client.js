"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHODS = void 0;
const superagent_1 = __importDefault(require("superagent"));
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
})(METHODS = exports.METHODS || (exports.METHODS = {}));
class HTTPClient {
    constructor(options) {
        this.authHeaders = {};
        this.getAgent = () => {
            const agent = superagent_1.default.agent();
            return agent;
        };
        this.makeApiCall = (method, endpoint, options) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const useJSON = (_a = options === null || options === void 0 ? void 0 : options.json) !== null && _a !== void 0 ? _a : true;
            let response;
            const request = this.getAgent();
            if (options === null || options === void 0 ? void 0 : options.query) {
                request.query(options.query);
            }
            if (useJSON) {
                request.set('Accept', 'application/json');
            }
            if (options === null || options === void 0 ? void 0 : options.useAuth) {
                const authHeaders = this.authHeaders;
                for (const key in authHeaders) {
                    console.log({ authHeaders });
                    request.set(key, authHeaders[key]);
                }
            }
            try {
                if (method === METHODS.GET) {
                    response = yield request.get(`${this.host}${endpoint}`);
                }
                else if (method === METHODS.POST) {
                    response = yield request
                        .post(`${this.host}${endpoint}`)
                        .send(options === null || options === void 0 ? void 0 : options.data);
                }
                else {
                    response = null;
                }
                if (response !== null) {
                    if (useJSON && response.body) {
                        return response.body;
                    }
                    return response.text;
                }
                else {
                    console.warn('HTTPClient error: response is null');
                }
            }
            catch (error) {
                throw error;
            }
        });
        const { host } = options;
        this.host = host;
        if (options.authHeaders) {
            this.authHeaders = options.authHeaders;
        }
    }
}
exports.default = HTTPClient;
