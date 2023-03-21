const chalk = require("chalk");
const { API_KEY, FILE_PATH } = require("../constants/config.constant");
const { writeFile, readFile, getHomeDir } = require("../utils/file.util");

/**
 * @description set openai api key in home directory
 * @param apiKey
 */
const setOpenAIApiKey = async (apiKey) => {
  if (!apiKey) {
    console.log(
      chalk.red.bold("Please provide open api key by using -k option.")
    );
    process.exit(1);
  }

  await writeFile(`${getHomeDir()}/${FILE_PATH}`, { [API_KEY]: apiKey });
  console.log(chalk.greenBright.bold("API key initialized."));
};

/**
 * @description get openai key from home directory
 * @returns string | boolean
 */
const getOpenAIApiKey = async () => {
  const key = await readFile(`${getHomeDir()}/${FILE_PATH}`);

  return key ? chalk.greenBright.bold(key[API_KEY]) : undefined;
};

module.exports = {setOpenAIApiKey,getOpenAIApiKey}