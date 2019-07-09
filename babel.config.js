module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '72'
                }
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
};
