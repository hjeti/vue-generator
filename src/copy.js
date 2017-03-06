#!/usr/bin/env node

const fs = require('fs-extra');

module.exports = function copy(source, destination) {
  fs.copySync(source, destination);
};







