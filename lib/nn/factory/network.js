(layer_sizes) => {
    const rnd_layer = (layer_size) => ff('./lib/nn/factory/layer.js')(layer_size)
    return {
        layers: await Promise.all(layer_sizes.map(rnd_layer))
    }
}