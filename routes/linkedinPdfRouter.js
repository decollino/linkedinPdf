const express = require('express');
const multer = require('multer');
const Parser = require('../parser');
const isAuth = require('../authentication/utils.js');

const linkedinPdfRouter = express.Router();

linkedinPdfRouter.get(
  '/',
  isAuth,
  multer().single('file'),
  async (req, res) => {
    const parser = new Parser();

    try {
      const output = await parser.parse(req.file.buffer);
      return res.json(JSON.parse(output));
    } catch (err) {
      console.error(err);
      return res.end;
    }
  }
);

module.exports = linkedinPdfRouter;
