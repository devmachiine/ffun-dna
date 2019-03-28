module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const zip = ff('./lib/operations/array/zip.js')

    const neuron_factory = ff('./lib/nn/factory/neuron.js')
    const layer_factory = ff('./lib/nn/factory/layer.js')
    const network_factory = ff('./lib/nn/factory/network.js')

    const neuron_transform = ff('./lib/nn/transform/neuron.js')
    const layer_transform = ff('./lib/nn/transform/layer.js')
    const network_transform = ff('./lib/nn/transform/network.js')

    const inputs = [43, 43, 5, 6, 4325, 32.34, 0.0045, 123445, Number.MIN_VALUE, Number.MAX_SAFE_INTEGER] // max int makes layer output almost 1

    const transform_tests = [
        test("neuron transform outputs between -1 and 1", async () => {
            const neuron = await neuron_factory(inputs.length)
            const transform = await neuron_transform(inputs, neuron)
            affirm(transform, (t) => t >= -1 && t <= 1)
        })
        , test("layer transform all neurons between -1 and 1 output", async () => {
            const layer = await layer_factory(inputs.length)
            const transform = await layer_transform(inputs, layer)
            affirm(transform, (t) => t.every(n => n >= -1 && n <= 1))
        })
        , test("network transform with 0 layers squashes inputs", async () => {
            const network_sizes = []

            const network = await network_factory(network_sizes)
            const transform = await network_transform(inputs, network)

            const squished_inputs = await Promise.all(inputs.map(i => ff('./lib/nn/neuron/activation.js')(i)))

            const diff = await zip(transform, squished_inputs, (t, s) => t - s)

            affirm(diff, d => d.every(output => output === 0))
        })
        , test("network transform with layers yields output between -1 and 1", async () => {
            const network_sizes = [inputs.length, 4, 2, 3]

            const network = await network_factory(network_sizes)
            const transform = await network_transform(inputs, network)

            affirm(transform, (t) => t.every(n => n >= -1 && n <= 1))
        })
        , test("network is not mutated by tranform", async () => {
            const last_layer_size = Math.floor(Math.random() * 5)
            const network_sizes = [inputs.length, 4, 2, last_layer_size]

            const network = await network_factory(network_sizes)
            const transform = await network_transform(inputs, network)

            assert(transform.length, last_layer_size)

            affirm(network_sizes.reduce((a, b) => a + b), network.layers.flatMap(l => l.neurons).length,
                (network_size, post_transform_size) => network_size === post_transform_size)
        })

    ]

    return [transform_tests]
}