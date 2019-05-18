import axios from 'axios';
import actors from './actors';

export function getActors() {
    axios.get('/api/actors')
        .then(response => {
            console.log(response);
        });
    return new Promise(resolve => {
        setTimeout(() => resolve(actors), 1000);
    });
}
