(async () => {

    const { run } = require('t3st')
    const ff = require('nano-module')

    console.log('-'.repeat(40))

    await run('./tests/nn', { label: 'nn' })

})()