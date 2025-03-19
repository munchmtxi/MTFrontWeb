module.exports = async () => {
  const { greenScale, yellowScale, grayScale, tokens } = await import('./src/styles/themeTokens.js');

  return {
    content: [
      "./index.html",              // Scan index.html
      "./src/**/*.{js,jsx,ts,tsx}" // Scan all JS/JSX/TS/TSX files in src
    ],
    important: "#root",
    theme: {
      extend: {
        colors: {
          green: greenScale,
          yellow: yellowScale,
          gray: grayScale,
        },
        spacing: tokens.spacing,
        fontSize: tokens.fontSizes,
        borderRadius: tokens.radii,
        boxShadow: tokens.shadows,
      },
    },
    plugins: [],
  };
};