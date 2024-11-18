import http from "http";
import https from "https";
import { URL } from "url";

interface RequestHeaders {
  [key: string]: string;
}

class RestApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private request<T>(
    method: string,
    endpoint: string,
    data: object | null = null,
    headers: RequestHeaders = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.baseURL);
      const options: http.RequestOptions | https.RequestOptions = {
        method,
        headers,
      };

      const client = url.protocol === "https:" ? https : http;
      const req = client.request(url, options, (res) => {
        let responseData = "";

        res.on("data", (chunk) => {
          responseData += chunk;
        });

        res.on("end", () => {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData as T);
          } catch (err) {
            resolve(responseData as unknown as T);
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

  async get<T>(endpoint: string, headers: RequestHeaders = {}): Promise<T> {
    return this.request<T>("GET", endpoint, null, headers);
  }

  async post<T>(
    endpoint: string,
    data: object,
    headers: RequestHeaders = {}
  ): Promise<T> {
    headers["Content-Type"] = "application/json";
    return this.request<T>("POST", endpoint, data, headers);
  }

  async put<T>(
    endpoint: string,
    data: object,
    headers: RequestHeaders = {}
  ): Promise<T> {
    headers["Content-Type"] = "application/json";
    return this.request<T>("PUT", endpoint, data, headers);
  }

  async delete<T>(endpoint: string, headers: RequestHeaders = {}): Promise<T> {
    return this.request<T>("DELETE", endpoint, null, headers);
  }
}

export default RestApiClient;
