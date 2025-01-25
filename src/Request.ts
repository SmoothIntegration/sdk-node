import Client from './Client';
import type { ConnectionId } from './types';

export default class Request {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    /**
     * Make a HTTP request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to get invoices from a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} any additional request options you want to pass to the request.
     */
    public async request<T>(connectionId: ConnectionId, url: string, input: RequestInit): Promise<T> {
        return this._client.http.fetch<T>('/v1/request/' + connectionId + url, input);
    }

    /**
     * Make a HTTP GET request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to get invoices from a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async get<T>(connectionId: ConnectionId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(connectionId, url, {
            ...input,
            method: 'GET',
        });
    }

    /**
     * Make a HTTP POST request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to create an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async post<T>(connectionId: ConnectionId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(connectionId, url, {
            ...input,
            method: 'POST',
        });
    }

    /**
     * Make a HTTP PUT request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to update an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async put<T>(connectionId: ConnectionId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(connectionId, url, {
            ...input,
            method: 'PUT',
        });
    }

    /**
     * Make a HTTP PATCH request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to update an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async patch<T>(connectionId: ConnectionId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(connectionId, url, {
            ...input,
            method: 'PATCH',
        });
    }

    /**
     * Make a HTTP DELETE request to the external API for a specific data source.
     * @param connectionId {ConnectionId} the SmoothIntegration ID for the DataSource you want to make a request on behalf of.
     * @param url {string} The path to the endpoint. IE you want to delete an invoice on a Xero DataSource, this would be '/Invoices'
     * @param input {RequestInit} Optional, any additional request options you want to pass to the request.
     */
    public async delete<T>(connectionId: ConnectionId, url: string, input: RequestInit = {}): Promise<T> {
        return this.request<T>(connectionId, url, {
            ...input,
            method: 'DELETE',
        });
    }
}
