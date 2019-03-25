module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const range = ff('./lib/operations/array/range.js')

    const range_tests = [
        test("range 0 return empty",
            range(0),
            (empty) => {
                assert(0, empty.length)
            })
        , test("range 5 returns 1,2,3,4,5",
            range(5),
            (range5) => {
                const up_to_5 = [1, 2, 3, 4, 5]
                assert(true, range5.every((v, i) => v === up_to_5[i]))
            })
        , test("range 1,1 returns 1",
            range(1, 1),
            (actual) => {
                const expected = [1]
                affirm(actual, (a) => expected.every(
                    (e, i) => e === a[i]))
            })
        , test("range 7,9 returns 7..9",
            range(7, 9),
            (actual) => {
                const expected = [7, 8, 9]
                affirm(actual, (a) => expected.every(
                    (e, i) => e === a[i]))
            })
        , test("range -2,2 returns -2..2",
            range(-2, 2),
            (actual) => {
                const expected = [-2, -1, 0, 1, 2]

                affirm(actual, (a) => expected.every(
                    (e, i) => e === a[i]))

                affirm(expected, (e) => actual.every(
                    (a, i) => a === e[i]))
            })
    ]

    return [range_tests]
}