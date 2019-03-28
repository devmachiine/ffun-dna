(inputs, neuron) => {
    const zip = ff('./lib/operations/array/zip.js')
    const activation = ff('./lib/nn/neuron/activation.js')

    const weighted_inputs = await zip(inputs, neuron.weights, (i, w) => i * w)

    const weighted_sum = weighted_inputs.reduce((a, b) => a + b, neuron.bias)

    return await activation(weighted_sum)
}