module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const zip = ff('./lib/operations/array/zip.js')

    const range = ff('./lib/operations/array/range.js')

    const zip_tests = [
        test("empty lists return empty", async () => {
            const empty = await zip([], [])
            assert(0, empty.length)
        })
        , test("smallest array size mapped", async () => {
            const a = await range(3)
            const b = await range(10)
            const size3 = await zip(a, b)
            assert(3, size3.length)
        })
        , test("zip with join function", async () => {
            const n = Math.floor(Math.random() * 10)
            const up_to_n = await range(n)
            const n_to_1 = (await range(n)).reverse()
            const tens = await zip(up_to_n, n_to_1, (a, b) => a + b)
            affirm(tens, (tens) => tens.every(i => i === n + 1))
        })
        , test("function gives tuple in order (a,b) to join function", async () => {
            const a_small = 'a'.repeat(2).split('')
            const z_large = 'z'.repeat(10).split('')
            const a_map_z = await zip(a_small, z_large, (a, z) => a + '2' + z)

            const a_large = 'a'.repeat(10).split('')
            const z_small = 'z'.repeat(2).split('')
            const z_map_a = await zip(a_large, z_small, (a, z) => a + '2' + z)

            assert(true, a_map_z.every(az => az === 'a2z'))
            assert(true, z_map_a.every(az => az === 'a2z'))
        })
    ]

    return [zip_tests]
}