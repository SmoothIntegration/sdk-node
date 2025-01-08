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

export default class QuickBooks {
    _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    public async getConsentUrl(companyId: string, sandBox: boolean = false): Promise<string> {
        let url = '/quickbooks/connect?company_id=' + companyId;
        if (sandBox) {
            url += '&sandbox=true';
        }
        const response = await this._client.http.fetch<GetConsentUrlResponse>(url.toString());
        return response.result.consentUrl;
    }

    public async startImport(dataSourceId: string): Promise<void> {
        await this._client.http.fetch<StartImportResponse>('/data/import/' + dataSourceId, {
            method: 'POST',
        });
    }
}
