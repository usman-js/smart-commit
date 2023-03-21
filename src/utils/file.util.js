const chalk = require("chalk");
const fs = require("fs");
const os = require("os");

/**
 * @description write data on specific file path
 * @param filename
 * @param writeData
 * @returns Promise<boolean>
 */
const writeFile = async (filename, writeData) => {
  try {
    await fs.promises.writeFile(
      filename,
      JSON.stringify(writeData, null, 4),
      "utf8"
    );
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * @description read data from specific file path
 * @param filePath
 * @returns Promise<any>
 */
const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return false;
  }
};

/**
 * @description check file exist or not
 * @param filePath
 * @returns boolean
 */
const isFileExist = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * @description get home directory
 * @returns string
 */
const getHomeDir = () => {
  const homeDir = os.homedir();
  if (!homeDir) {
    console.log(chalk.red.bold("Please provide open api key"));
    process.exit(1);
  }

  return homeDir;
};

module.exports = {
  writeFile,
  readFile,
  isFileExist,
  getHomeDir
}