import Client, { DataSourceId } from '.';

export default class Request {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    /**
     * Make a HTTP request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to get invoices from a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} any additional request options you want to pass to the request.
     */
    public async request<T>(dataSourceId: DataSourceId, url: string, input: RequestInit): Promise<T> {
        return this._client.http.fetch<T>('/v1/request/' + dataSourceId + url, input);
    }

    /**
     * Make a HTTP GET request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to get invoices from a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async get<T>(dataSourceId: DataSourceId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(dataSourceId, url, {
            ...input,
            method: 'GET',
        });
    }

    /**
     * Make a HTTP POST request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to create an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async post<T>(dataSourceId: DataSourceId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(dataSourceId, url, {
            ...input,
            method: 'POST',
        });
    }

    /**
     * Make a HTTP PUT request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to update an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async put<T>(dataSourceId: DataSourceId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(dataSourceId, url, {
            ...input,
            method: 'PUT',
        });
    }

    /**
     * Make a HTTP PATCH request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to update an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async patch<T>(dataSourceId: DataSourceId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(dataSourceId, url, {
            ...input,
            method: 'PATCH',
        });
    }

    /**
     * Make a HTTP DELETE request to the external API for a specific data source.
     * @param dataSourceId {DataSourceId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to delete an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async delete<T>(dataSourceId: DataSourceId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(dataSourceId, url, {
            ...input,
            method: 'DELETE',
        });
    }
}
