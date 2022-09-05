module.exports = {
  resolve: {
    fallback: {
      //  "stream": false,
      //  "zlib": false,
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
