const loose = true;
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose,
        targets: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        // modules: 'cjs',
        useBuiltIns: "usage",
        corejs: {
          version: "3",
          proposals: true
        }
      }
    ],
    [
      "@babel/preset-react",
    ],
    [
      "@babel/preset-typescript",
    ]
  ],
  plugins: [
    // [
    //   "@babel/plugin-transform-modules-commonjs",
    //   {
    //     loose,
    //   }
    // ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
      }
    ]
  ]

};