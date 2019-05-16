import actors from './actors';

export function getActors() {
    return new Promise(resolve => {
        setTimeout(() => resolve(actors), 1000);
    });
}
