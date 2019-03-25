module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const sigmoid = ff('./lib/nn/activation/sigmoid.js')

    const sigmoid_tests = [
        test("sigmoid zero outputs zero", async () => {
            const zero = await sigmoid(0)
            assert(0, zero)
        })
        , test("sigmoid function thresholds between -1 and 1", async () => {
            const large_positive = (Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_VALUE
            const large_negative = large_positive * -1

            const expected_positive = await Promise.all([1, 123, large_positive].map(n => sigmoid(n)))
            const expected_negative = await Promise.all([-1, -123, large_negative].map(n => sigmoid(n)))

            assert(true, expected_positive.every(n => n > 0))
            assert(true, expected_negative.every(n => n < 0))
        })
    ]

    return [sigmoid_tests]
}