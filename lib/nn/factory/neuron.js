(total_weights) => {
    const rnd = () => (2 * Math.random()) - 1
    const weights = await ff('./lib/operations/array/range.js')(total_weights)
    return {
        bias: rnd(),
        weights: weights.map(rnd)
    }
}