import axios  from 'axios';

const sheetID = "1edV6fClneqRbkZ29fhAbXRcC0XJbwPd9g8N8gwb4IRE";

// const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;
// const googleSheetUrl = `https://spreadsheets.google.com/feeds/cells/${sheetID}/1/public/full?alt=json`;
// const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&gid=${0}`;
const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;


export const getData = async () => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting content from ${googleSheetUrl}`);
    axios.get(googleSheetUrl, {
      headers: { 'X-DataSource-Auth': '' }
    })
      .then(response => {
        const data = JSON.parse(response.data.replace(/^\)]\}'\n/, ''));
        let compiledData = [];

        data.table.rows.forEach((item, idx) => {
          if (idx > 0) {
            compiledData.push({
              "title": item.c[0].v,
              "url": item.c[1].v,
            })
          }
        });

        // resolve the promise and return the data
        resolve(compiledData);
      })
      // uh-oh. Handle any errrors we might encounter
      .catch(error => {
        console.log('Error :', error);
        reject(error);
      });
  })
}
