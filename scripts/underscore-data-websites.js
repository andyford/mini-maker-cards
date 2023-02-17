const axios  = require('axios');
const fs = require("fs");

const sheetID = "1edV6fClneqRbkZ29fhAbXRcC0XJbwPd9g8N8gwb4IRE";
// const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;

// const googleSheetUrl = `https://spreadsheets.google.com/feeds/cells/${sheetID}/1/public/full?alt=json`;

// const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&gid=${0}`;
const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;
                        // https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json


const main = () => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting content from ${googleSheetUrl}`);
    axios.get(googleSheetUrl, {
      headers: { 'X-DataSource-Auth': '' }
    })
      .then(response => {
        // console.log({
        //   responsebody: response.data
        // })

        const data = JSON.parse(response.data.replace(/^\)]\}'\n/, ''));
        // console.log({ data: data.table.rows })

        let compiledData = [];

        // massage the data from the Google Sheets API into
        // a shape that will more convenient for us in our SSG.
        // var data = {
        //   "content": []
        // };
        data.table.rows.forEach((item, idx) => {
          if (idx > 0) {
            compiledData.push({
              "title": item.c[0].v,
              "url": item.c[1].v,
            })
          }
        });

        console.log({ compiledData })
        // stash the data locally for developing without
        // needing to hit the API each time.
        // seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);

        fs.writeFileSync('./src/data/generated/websites-generated.json', `${JSON.stringify(compiledData, null, 2)}\n`);

        // resolve the promise and return the data
        resolve(data);
      })
      // uh-oh. Handle any errrors we might encounter
      .catch(error => {
        console.log('Error :', error);
        reject(error);
      });
  })
}

main();