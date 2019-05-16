export function getStageRows() {
    const seatsPerRow = [14, 15, 16, 16, 16, 16, 16, 16, 16, 12, 14];
    return seatsPerRow.map((seatsNum, i) => {
        const row = i + 1;
        return {
            number: row,
            seats: createSeatArray(seatsNum).map(seat => {
                return {
                    number: seat,
                    isBought: false
                }
            })
        }
    });
}

function createSeatArray(num) {
    const result = [];
    for (let i = 1; i <= num; i++) {
        result.push(i);
    }
    return result;
}
