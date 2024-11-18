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
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
class RestApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    request(method, endpoint, data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const url = new url_1.URL(endpoint, this.baseURL);
            const options = {
                method,
                headers,
            };
            const client = url.protocol === "https:" ? https_1.default : http_1.default;
            const req = client.request(url, options, (res) => {
                let responseData = "";
                res.on("data", (chunk) => {
                    responseData += chunk;
                });
                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(responseData);
                        resolve(parsedData);
                    }
                    catch (err) {
                        resolve(responseData);
                    }
                });
            });
            req.on("error", (err) => {
                reject(err);
            });
            if (data) {
                const payload = JSON.stringify(data);
                req.write(payload);
            }
            req.end();
        });
    }
    get(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, headers = {}) {
            return this.request("GET", endpoint, null, headers);
        });
    }
    post(endpoint_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, data, headers = {}) {
            headers["Content-Type"] = "application/json";
            return this.request("POST", endpoint, data, headers);
        });
    }
    put(endpoint_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, data, headers = {}) {
            headers["Content-Type"] = "application/json";
            return this.request("PUT", endpoint, data, headers);
        });
    }
    delete(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, headers = {}) {
            return this.request("DELETE", endpoint, null, headers);
        });
    }
}
exports.default = RestApiClient;
