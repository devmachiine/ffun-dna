(a, b, join = a => b => [a, b]) =>
    a.length < b.length
        ? a.map((v, i) => join(v, b[i]))
        : b.map((v, i) => join(a[i], v))