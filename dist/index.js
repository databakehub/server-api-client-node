"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BakeServerApi = void 0;
const http_client_1 = __importStar(require("./http-client"));
const DEFAULT_HOST = 'https://api.databake.xyz';
const ENDPOINTS = {
    AUTH_CHECK: '/authcheck/:token',
    LIST: '/list'
};
class BakeServerApi {
    constructor(OAuthToken, options) {
        var _a;
        this.checkAuth = () => __awaiter(this, void 0, void 0, function* () {
            if (this.OAuthToken) {
                try {
                    const response = yield this.client.makeApiCall(http_client_1.METHODS.GET, ENDPOINTS.AUTH_CHECK.replace(':token', this.OAuthToken), {
                        json: false
                    });
                    return JSON.parse(response);
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                throw new Error('No OAuth token provided');
            }
        });
        this.listApi = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.OAuthToken) {
                return {};
            }
            const response = yield this.client.makeApiCall(http_client_1.METHODS.GET, ENDPOINTS.LIST, {
                useAuth: true,
                json: false
            });
            return JSON.parse(response);
        });
        this.OAuthToken = OAuthToken;
        this.client = new http_client_1.default({
            host: (_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : DEFAULT_HOST,
            authHeaders: {
                Authorization: `${this.OAuthToken}`
            }
        });
    }
}
exports.BakeServerApi = BakeServerApi;
