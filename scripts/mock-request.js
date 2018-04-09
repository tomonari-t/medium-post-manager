const fs = require('fs');
const minimist = require('minimist');
const request = require('request-promise-native');
const colors = require('colors');

/**
 * Post GitHub Webhood data
 *
 * url: to post url
 * path: path to post body data
 */
const main = () => {
  const args = minimist(process.argv.slice(2));
  const {
    path,
    url,
  } = args;

  console.log(`path: ${colors.red(path)}`);
  console.log(`url: ${colors.red(url)}`);

  const bufData = fs.readFileSync(path, 'utf8');
  const requestOption = {
    heqders: {
      'Content-Type': 'application/json',
    },
    url,
    form: bufData,
  };
  request.post(requestOption, (err, res) => {
    if (err) console.error(err);
    console.log(res);
  });
};

main();
