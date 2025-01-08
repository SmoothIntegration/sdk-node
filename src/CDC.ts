import Client, { CDCConfig, CDCResponse, CDCStreamConfig } from '.';

const POLL_INTERVAL_MS = 5000;

export default class CDC {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    public async get(config: CDCConfig): Promise<CDCResponse> {
        const params = new URLSearchParams({
            from: config.from || '0',
            structure: config.structure,
        });
        if (config.limit) {
            params.append('limit', config.limit.toString());
        }
        if (config.document_type) {
            params.append('document_type', config.document_type.join(','));
        }
        if (config.company) {
            params.append('company', config.company);
        }
        if (config.data_source) {
            params.append('data_source', config.data_source);
        }
        if (config.meta) {
            params.append('meta', config.meta);
        }
        return this._client.http.fetch<CDCResponse>('/cdc?' + params.toString());
    }

    /**
     * Starts a non-blocking poll of CDC events.
     * @param {CDCStreamConfig} config - Define events to retrieve and how to handle them.
     * @returns {() => void} - A function that can be called to stop the polling.
     */
    public stream(config: CDCStreamConfig): () => void {
        let timeout: NodeJS.Timeout;
        let active: boolean = true;
        // eslint-disable-next-line prefer-const
        let { from = '0', ...restConfig } = config;

        const doRequest = async () => {
            if (!active) {
                return;
            }
            let response: CDCResponse;
            try {
                response = await this.get({ from, ...restConfig });
                if (response.last_event_id === null) {
                    // No results, sleep and check again
                    timeout = setTimeout(doRequest, POLL_INTERVAL_MS);
                } else {
                    from = response.last_event_id;
                    await Promise.all(response.events.map(config.onEvent));
                    // When we have results immediately check again
                    timeout = setTimeout(doRequest);
                }
            } catch (e) {
                if (!config.onFailure || config.onFailure === 'ignore') {
                    // Do nothing
                } else if (config.onFailure === 'throw') {
                    throw e;
                } else if (config.onFailure === 'log') {
                    console.error(e);
                } else {
                    await config.onFailure(e);
                }
                // If something went wrong, sleep and try again
                timeout = setTimeout(doRequest, POLL_INTERVAL_MS);
            }
        };

        // Start polling
        timeout = setTimeout(doRequest);
        return () => {
            active = false;
            clearInterval(timeout);
        };
    }
}
