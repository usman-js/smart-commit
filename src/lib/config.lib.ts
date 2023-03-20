import chalk from "chalk";
import { API_KEY, FILE_PATH } from "../constants/config.constant";
import { writeFile, readFile, getHomeDir } from "../utils/file.util";

/**
 * @description set openai api key in home directory
 * @param apiKey
 */
export const setOpenAIApiKey = async (apiKey: string) => {
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
export const getOpenAIApiKey = async () => {
  const key = await readFile(`${getHomeDir()}/${FILE_PATH}`);

  return key ? chalk.greenBright.bold(key[API_KEY]) : undefined;
};
