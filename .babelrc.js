module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 versions', 'ie >= 11'] },
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
    'react-hot-loader/babel',
  ],
};
