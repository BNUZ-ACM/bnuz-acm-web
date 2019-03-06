/*
 * @Author: yhy
 * @Date: 2018-10-15 09:20:19
 * @Last Modified by: yhy
 * @Last Modified time: 2019-03-06 10:27:08
 */

function getConfig() {
  const env = process.env.NODE_ENV;
  let config = require('./production');
  try {
    config = require(`./${env}`);
  } catch (err) {
    console.log(`failed to load the env config for ${env}`);
  }
  return config;
}

module.exports = getConfig();