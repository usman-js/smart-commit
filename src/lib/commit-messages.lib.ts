import { AI_MODEL, MODEL } from "../constants/openai.constant";
import { Configuration, OpenAIApi } from "openai";
import chalk from "chalk";
import ansiRegex from "ansi-regex";
import ora from 'ora';

export const generateCommitMessages = async ({
  apiKey,
  prompt,
  model = MODEL,
}: {
  apiKey: string;
  prompt: string;
  model?: AI_MODEL;
}) => {
  try {
   
    const spinner = ora('Generating ...');
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
   return completion.data.choices[0].text!.trim().split('\n');
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
      console.log(
        chalk.redBright.bold(
          `ERROR:[OPEN_AI] => status: ${error.response.status} data: ${error.response.data}`
        )
      );
    } else {
      console.log(error.message);
      console.log(
        chalk.redBright.bold(`ERROR:[OPEN_AI] => status: ${error.message}`)
      );
    }
  }
};
