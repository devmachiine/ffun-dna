(a, b, join = a => b => [a, b]) =>
        a.length < b.length
        ? a.map((va, i) => join(va, b[i]))
        : b.map((vb, i) => join(a[i], vb))