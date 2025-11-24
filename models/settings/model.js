"use strict";

const Model = require("../data-model.js");
const schema = require("./schema.js");

/**
 * Class representing a Player.
 * @extends Model
 */
class Settings extends Model {}

module.exports = new Settings(schema);
