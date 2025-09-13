import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * Handle root entry file
       */
      build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
        return { path: args.path, namespace: 'a' };
      });

      /**
       * Handle relative paths inside a package
       */
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}`).href,
        };
      });

      /**
       * Handle package imports
       */
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'react') {
          return {
            path: 'https://unpkg.com/react@17.0.2/index.js',
            namespace: 'a',
          };
        }

        if (args.path === 'react-dom') {
          return {
            path: 'https://unpkg.com/react-dom@17.0.2/index.js',
            namespace: 'a',
          };
        }

        // all other packages → latest
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
    },
  };
};
