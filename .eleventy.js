const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/site/_style/");

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPassthroughCopy({ "src/public": "/"}, { debug: false } );

  eleventyConfig.setServerOptions({
    port: 8083,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "md",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
    dir: {
      input: "src/site",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  };
};
