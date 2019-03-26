module.exports = async ({ test, assert, affirm }) => {

    const ff = require('nano-module')

    const neuron_factory = ff('./lib/nn/factory/neuron.js')
    const layer_factory = ff('./lib/nn/factory/layer.js')
    const network_factory = ff('./lib/nn/factory/network.js')

    const factory_tests = [
        test("neuron weights are between -1 and 1", async () => {
            const neuron = await neuron_factory(10)
            affirm(neuron.weights, (n) => n.length === 10)
            affirm(neuron.weights, (n) => n.every(w => w >= -1 && w <= 1))
        })
        , test("layer size n has total n*n weights", async () => {
            const n = Math.floor(Math.random(10))
            const layer = await layer_factory(n)
            const total_weights = layer.neurons.flatMap(n => n.weights)
            assert(total_weights.length, n * n)
        })
        , test("network has neurons equal to sum of layer sizes", async () => {
            const network_sizes = [6, 5, 4, 2, 2]
            const network = await network_factory(network_sizes)
            const neurons = network.layers.flatMap(l => l.neurons)
            assert(neurons.length, network_sizes.reduce((a, b) => a + b))
        })
    ]

    return [factory_tests]
}