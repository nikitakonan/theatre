const random = (from, to) => Math.floor(Math.random() * (to - from) + from);

const fillArray = (n, value) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(JSON.parse(JSON.stringify(value)));
    }
    return arr;
}

const getActorList = (actors) => {
    return actors
        .map(a => {
            a.actors = fillArray(a.limit, a);
            return a;
        })
        .map(a => a.actors)
        .reduce((acc, curr) => acc.concat(curr), [])
        .map(a => {
            delete a.limit;
            delete a.actors;
            return a;
        });
}

/**
 * Randomize seats between actors
 * @param {Array<{ id: string, name: string, color: string }>} actors - actors
 * @param {Array<{ id: string }>} seats - seats
 * @returns {Array<{ id: string, actor: { id: string, name: string, color: string } }>}
 */
const randomize = (actors, seats) => {
    const seatsPerActor = seats.length / actors.length;
    const seatsPerActorInt = Math.floor(seatsPerActor);

    let numberOfActorsWithExtraSeats = seats.length - seatsPerActorInt * actors.length;
    actors = actors.map(actor => {
        let limit;
        if (numberOfActorsWithExtraSeats !== 0) {
            limit = seatsPerActorInt + 1;
            numberOfActorsWithExtraSeats--;
        } else {
            limit = seatsPerActorInt;
        }
        return {
            ...actor,
            limit
        };
    });

    let seatIds = seats.map(s => s.id);
    const actorList = getActorList(actors);

    for (let i = 0; i < actorList.length; i++) {
        const seatId = random(0, seatIds.length - 1);
        const sId = seatIds[seatId];
        actorList[i].seatId = sId;
        seatIds.splice(seatId, 1);
    }

    const result = actorList.map(({ seatId, ...rest }) => {
        return {
            id: seatId,
            actor: rest
        }
    });

    return result;
}

export { randomize };
