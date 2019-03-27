module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const activation = ff('./lib/nn/neuron/activation.js')

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
        , test("activation output not rounded for small and large numbers", async () => {
            const smallest_output = await activation(Number.MIN_VALUE)
            const max_output = await activation(Number.MAX_SAFE_INTEGER)

            assert(true, smallest_output > 0)
            assert(true, max_output < 1)

            assert(true, smallest_output < Number.MIN_VALUE * 2)
            assert(true, max_output > 1 - (1 / 1e15))
        })
    ]

    return [activation_tests]
}