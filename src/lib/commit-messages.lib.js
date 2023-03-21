const { MODEL } = require("../constants/openai.constant");
const { Configuration, OpenAIApi } = require("openai");
const chalk = require("chalk");
const ansiRegex = require("ansi-regex");
const ora = require("ora");

/**
 * @description call openai and get the ai commit message
 * @param {*} param0 
 * @returns 
 */
const generateCommitMessages = async ({
  apiKey,
  prompt,
  model = MODEL,
}) => {
  try {
    const spinner = ora("Generating ...");
    spinner.start();

    const sanitizedApiKey = apiKey.replace(ansiRegex(), "");
    const encodedApiKey = encodeURIComponent(sanitizedApiKey);
    const configuration = new Configuration({
      apiKey: encodedApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0.75,
      max_tokens: 2048,
    });
    spinner.succeed();
    return completion.data.choices[0].text.trim().split("\n");
  } catch (error) {
    if (error.response) {
      console.log(
        chalk.redBright.bold(
          `ERROR:[OPEN_AI] => status: ${error.response.status} data: ${error.response.data}`
        )
      );
    } else {
      console.log(
        chalk.redBright.bold(`ERROR:[OPEN_AI] => status: ${error.message}`)
      );
    }
  }
};

module.exports ={generateCommitMessages}