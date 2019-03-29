(network_input, network) => {
    const activation = ff('./lib/nn/neuron/activation.js')
    const squished_input = await Promise.all(network_input.map(activation))

    const layer_transform = ff('./lib/nn/transform/layer.js')

    return await network.layers.reduce(async (acc, next) =>
        layer_transform(await acc, next)
        , squished_input)
}