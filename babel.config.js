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
      {
        // react17之后才用了新的jsx解析器，不再需要导入React对象，开启这个选项，可以是babel用新的jsx解析器
        // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
        runtime: "automatic",
      }
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