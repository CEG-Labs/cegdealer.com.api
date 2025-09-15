"use strict";

// const Q = require("@nmq/q/client");

/** Class representing a generic mongo model. */
class Model {
  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * JSON Schema
   * @returns {*}
   */
  jsonSchema() {
    return typeof this.schema.jsonSchema === "function" ? this.schema.jsonSchema() : {};
  }

  /**
   * Retrieves one or more records
   * @param _id {string} optional mongo record id
   * @returns {*}
   */
  get(queryObject = {}) {
    return this.schema.find(queryObject);
  }

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  create(record) {
    let newRecord = new this.schema(record);
    // Q.publish("database", "create", {
    //   action: "create",
    //   collection: this.schema.modelName,
    //   record: newRecord,
    // });
    return newRecord.save();
  }

  /**
   * Replaces a record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  update(_id, record) {
    // Q.publish("database", "update", {
    //   action: "update",
    //   collection: this.schema.modelName,
    //   id: _id,
    //   record: record,
    // });
    return this.schema.findOneAndUpdate({ _id }, record, { new: true, upsert: true });
  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    // Q.publish("database", "delete", {
    //   action: "delete",
    //   collection: this.schema.modelName,
    //   id: _id,
    // });
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
