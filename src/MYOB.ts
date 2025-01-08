import Client from '.';

type GetConsentUrlResponse = {
    message: string;
    result: {
        consentUrl: string;
    };
};

type StartImportResponse = {
    message: string;
};

export default class MYOB {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    public async getConsentUrl(companyId: string): Promise<string> {
        const response = await this._client.http.fetch<GetConsentUrlResponse>('/myob/connect?company_id=' + companyId);
        return response.result.consentUrl;
    }

    public async startImport(dataSourceId: string): Promise<void> {
        await this._client.http.fetch<StartImportResponse>('/data/import/' + dataSourceId, {
            method: 'POST',
        });
    }
}
