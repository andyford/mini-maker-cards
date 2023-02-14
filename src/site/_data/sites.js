// const sites = require('../../data/sites.json');
const sitesStatic = require('../../data/sites-static.json');
// const { unfurl } = require('unfurl.js');

// const getAllSiteData = async () => {
//   const data = [];

//   await Promise.all(sites.map(async (site) => {
//     const { url } = site;
//     const response = await unfurl(url);
//     response.computedUrl = url;
//     data.push(response);
//   }));

//   return data;
// }


module.exports = async function() {
  // return (await getAllSiteData());

  // const siteData = (await getAllSiteData());

  // const computedSites = [];

  // siteData.forEach((el, idx, arr) => {
  //   if (el.oEmbed && el.oEmbed.images && el.oEmbed.images.length > 0) {
  //     el.computedImage = el.twitter_card.images[0].url;
  //   }

  //   if (el.twitter_card && el.twitter_card.images && el.twitter_card.images.length > 0) {
  //     el.computedImage = el.twitter_card.images[0].url;
  //   }

  //   if (el.open_graph && el.open_graph.images && el.open_graph.images.length > 0) {
  //     el.computedImage = el.open_graph.images[0].url;
  //   }

  //   computedSites.push(el);
  //   console.log({ computedSites })
  // });

  let computedSites = sitesStatic;

  computedSites = computedSites.sort(function(a, b) { return a.curated.title.localeCompare(b.curated.title) });



  console.log({ computedSites })

  return computedSites;
};
