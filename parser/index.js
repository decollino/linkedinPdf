"use strict";

const { PdfReader } = require("pdfreader");
const parse = require("./parse.js");

class Parser {
  constructor(options) {
    this.reader = new PdfReader();
  }

  async parse(buffer) {
    //console.log("buffer: ", buffer);
    //console.log("this.reader: ", this.reader);
    try {
      const data = await parse(buffer, this.reader);
      const outputString = JSON.stringify(data, null, 2);

      //console.log("data: ", data);
      //console.log("outputString: ", outputString);
      return outputString;
    } catch (err) {
      console.error(error);
    }
  }
}

module.exports = Parser;

if (!module.parent) require("./standalone.js");
