import axios from 'axios';

const config = IS_DEV ? {
    baseURL: 'http://localhost:3000',
    crossDomain: true
} : {};

export function getActors() {
    return axios.get('/api/actors', config)
        .then(response => response.data);
}
