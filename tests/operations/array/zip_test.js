module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const zip = ff('./lib/operations/array/zip.js')

    const zip_tests = [
        test("empty lists return empty", async () => {
            const empty = await zip([], [])
            assert(0, empty.length)
        })
    ]

    return [zip_tests]
}