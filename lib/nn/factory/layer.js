(layer_size) => {
    const neurons = await ff('./lib/operations/array/range.js')(layer_size)
    const rnd_neuron = () => ff('./lib/nn/factory/neuron.js')(layer_size)
    return {
        neurons: await Promise.all(neurons.map(rnd_neuron))
    }
}