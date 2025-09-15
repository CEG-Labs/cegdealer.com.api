"use strict";

const Model = require("../data-model.js");
const schema = require("./schema.js");

/**
 * Class representing a Player.
 * @extends Model
 */
class Users extends Model {}

module.exports = new Users(schema);
