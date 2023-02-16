import fs from 'fs';
import sites from '../src/data/sites.json' assert { type: "json" };
import { unfurl } from'unfurl.js';

// TODO: check the base json file against existing computed/generated file, only process new urls
// ^ might be good to run against all urls from time to time to get updated info

const getAllSiteMetaData = async () => {
  const data = [];

  await Promise.all(sites.map(async (site) => {
    const { url, title } = site;
    const response = await unfurl(url);

    // TODO: catch error and log to console, pass raw data through

    response.computedUrl = url;
    response.curated = { title };
    data.push(response);
  }));

  return data;
}

const main = async function() {
  console.log('computeSiteData...')
  const siteData = (await getAllSiteMetaData());
  let computedSites = [];

  // get computedImage
  siteData.forEach((el) => {
    if (el.oEmbed && el.oEmbed.images && el.oEmbed.images.length > 0) {
      el.computedImage = el.twitter_card.images[0].url;
    }

    if (el.twitter_card && el.twitter_card.images && el.twitter_card.images.length > 0) {
      el.computedImage = el.twitter_card.images[0].url;
    }

    if (el.open_graph && el.open_graph.images && el.open_graph.images.length > 0) {
      if (el.open_graph.images[0].secure_url) {
        el.computedImage = el.open_graph.images[0].secure_url;
      } else {
        el.computedImage = el.open_graph.images[0].url;
      }
    }

    // check computedImage for a legit file extension (.jpg, .png, etc) to weed out bad data (zaba art)
    if (el.computedImage && !el.computedImage.includes('.jpg') && !el.computedImage.includes('.jpeg') && !el.computedImage.includes('.png') && !el.computedImage.includes('.webp')) {
      delete el.computedImage;
    }

    computedSites.push(el);
  });

  computedSites = computedSites.sort(function(a, b) { return a.curated.title.localeCompare(b.curated.title) });

  fs.writeFileSync(`./src/data/generated/sites-generated.json`, `${JSON.stringify(computedSites, null, 2)}\n`);

  return computedSites;
};

main();
