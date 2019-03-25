(total_or_start = 0, end = undefined) => {
    const n = end ? end - total_or_start + 1 : total_or_start
    const offset = end ? total_or_start : 1
    return [...Array(n).keys()].map(i => i + offset)
}