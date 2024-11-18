interface RequestHeaders {
    [key: string]: string;
}
declare class RestApiClient {
    private baseURL;
    constructor(baseURL: string);
    private request;
    get<T>(endpoint: string, headers?: RequestHeaders): Promise<T>;
    post<T>(endpoint: string, data: object, headers?: RequestHeaders): Promise<T>;
    put<T>(endpoint: string, data: object, headers?: RequestHeaders): Promise<T>;
    delete<T>(endpoint: string, headers?: RequestHeaders): Promise<T>;
}
export default RestApiClient;
