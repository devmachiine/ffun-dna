(inputs, layer) => await Promise.all(
    layer.neurons.map(n =>
        ff('./lib/nn/transform/neuron.js')(inputs, n)))