#! /usr/bin/env node

import { Command } from "commander";
import { getOpenAIApiKey, setOpenAIApiKey } from "./lib/config.lib";
import inquirer from "inquirer";
import chalk from "chalk";
import { getPromptMessage } from "./lib/prompt.lib";
import { generateCommitMessages } from "./lib/commit-messages.lib";
import simpleGit, { SimpleGit } from "simple-git";

(async () => {
  const program = new Command();

  program
    .name("smart-commit")
    .description("CLI to generate smart git commits.")
    .option("-k, --api-key <key>", "OpenAi Api Key")
    .version("1.0.0");

  program.parse();

  const options = program.opts();

  if (options.apiKey) {
    await setOpenAIApiKey(options.apiKey);
    return;
  }

  const apiKey = await getOpenAIApiKey();
  if (apiKey == undefined) {
    const res = await inquirer.prompt({
      name: "apiKey",
      message:
        "Please add your OpenAI API key for configuring the Smart Commit. Thank you.",
    });
    if (!res.apiKey) {
      console.log(
        chalk.red.bold(
          "Please provide your OpenAI API key for configuring the Smart Commit."
        )
      );
    } else {
      await setOpenAIApiKey(res.apiKey);
    }
  }
  const prompt = await getPromptMessage();
  const aiCommits = await generateCommitMessages({
    apiKey: apiKey!,
    prompt: prompt.trim().replace(/\"/g, "'"),
  });
  
  const commit = await inquirer.prompt({
    name: "commitMessage",
    type: "list",
    choices: aiCommits,
    message:
      "Pick a commit message to use:",
  });
  // const git: SimpleGit = simpleGit();
  // git.commit(commit.commitMessage);
  chalk.greenBright.bold(`Commit successful with message: ${commit.commitMessage}`) 
})();
