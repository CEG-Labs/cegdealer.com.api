"use strict";
const fs = require("fs");

const modelsFolder = `${__dirname}`;

// TODO: Make this hack proof, faster, etc.
function fetchModels() {
  const contents = fs.readdirSync(modelsFolder);
  return contents.reduce((acc, entry) => {
    if (
      fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() &&
      fs.existsSync(`${modelsFolder}/${entry}/model.js`)
    ) {
      acc[entry] = require(`${modelsFolder}/${entry}/model.js`);
    }
    return acc;
  }, {});
}

// Singleton pattern to fetch models only once, at server initiallization
module.exports = fetchModels();
