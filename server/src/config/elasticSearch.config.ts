import { Client } from '@elastic/elasticsearch';
import { ES_BASE_URL } from './config';

const elasticSearch = new Client({
    node: ES_BASE_URL
})

export default elasticSearch;