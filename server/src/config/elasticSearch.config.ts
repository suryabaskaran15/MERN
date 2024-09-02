import { Client } from '@elastic/elasticsearch';
import { ES_BASE_URL } from './config';

export enum ESIndexName {
    Accounts = 'accounts',
}

const elasticSearch = new Client({
    node: ES_BASE_URL
})

export default elasticSearch;