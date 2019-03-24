module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const activation = ff('./lib/nn/activation.js')

    const activation_tests = [
        test("activation zero outputs zero", async () => {
            const zero = await activation(0)
            assert(0, zero)
        })
        , test("activation function thresholds between -1 and 1", async () => {
            const large_positive = (Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_VALUE
            const large_negative = large_positive * -1

            const expected_positive = await Promise.all([1, 123, large_positive].map(n => activation(n)))
            const expected_negative = await Promise.all([-1, -123, large_negative].map(n => activation(n)))

            assert(true, expected_positive.every(n => n > 0))
            assert(true, expected_negative.every(n => n < 0))
        })
    ]

    return [activation_tests]
}