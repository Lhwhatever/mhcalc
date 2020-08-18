/* eslint @typescript-eslint/no-var-requires: "off"
   -------------
    Disabled as this file uses CommonJS imports. */
const { CLIEngine } = require('eslint')

const cli = new CLIEngine({})

module.exports = {
    '**/*.{js,jsx,ts,tsx}': (filenames) =>
        filenames.length
            ? ['tsc --noEmit', `eslint --cache --fix ${filenames.filter((file) => !cli.isPathIgnored(file)).join(' ')}`]
            : []
}
