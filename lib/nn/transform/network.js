(network_input, network) => {
    const activation = ff('./lib/nn/neuron/activation.js')
    const squished_input = await Promise.all(network_input.map(activation))

    const layer_transform = ff('./lib/nn/transform/layer.js')

    const async_fold = async ([x, ...xs], combine, acc) =>
        typeof x === 'undefined' ? acc
        : await async_fold(xs, combine, (await combine(acc, x)))

    return await async_fold(network.layers, layer_transform, squished_input)
}