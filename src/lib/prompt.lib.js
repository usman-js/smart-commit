const { simpleGit } = require("simple-git");
const chalk = require("chalk");
const inquirer = require("inquirer");

/**
 * @description create prompt message for openai
 * check git repo
 * check untracked files
 * get git diff
 * format the message
 * @returns 
 */
const getPromptMessage = async () => {
  const git = simpleGit();
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    console.log(
      chalk.redBright.bold(
        "You are not in a git repository.Move to a git repository."
      )
    );
    process.exit(1);
  }

  let status = await git.status();
  if (status.modified.length == 0) {
    console.log(
      chalk.yellowBright.bold("Nothing to commit, working directory is clean.")
    );
    process.exit(1);
  }

  if (status.modified.length != status.staged.length) {
    console.log(chalk.yellowBright.bold("Untracked files present."));

    status.modified.forEach((modified) => {
      !status.staged.includes(modified) &&
        console.log(chalk.redBright.bold(`* ${modified}`));
    });

    const res = await inquirer.prompt({
      name: "untrackedFiles",
      type: "confirm",
      default: true,
      message:
        "Your working tree is dirty, do you want me to stage the changes first?",
    });
    if (res.untrackedFiles) {
      await git.add("./*");
      status = await git.status();
    } else {
      console.log(
        chalk.yellowBright.bold("Add untracked files on git and try again.")
      );
      process.exit(1);
    }
  }

  const diff = await git.diff(["--staged"]);

  return `
        Please generate 5 commit messages based on the following git diff:
        ${diff}
        To help ensure that the commit message is as informative and helpful as possible, please include a summary of the changes made, the files that were modified, and any relevant context or details. Additionally, please provide any additional information or explanations that may be useful to others who may be reviewing or working with this code in the future. Thank you!`;
};


module.exports = {getPromptMessage}