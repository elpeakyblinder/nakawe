/** @type {import('postcss-load-config').ConfigFn} */
export default () => {
  return {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  };
};