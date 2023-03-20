import chalk from "chalk";
import fs from "fs";
import os from "os";

/**
 * @description write data on specific file path
 * @param filename
 * @param writeData
 * @returns Promise<boolean>
 */
export const writeFile = async (filename: string, writeData: any) => {
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
export const readFile = async (filePath: string) => {
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
export const isFileExist = (filePath: string) => {
  return fs.existsSync(filePath);
};

/**
 * @description get home directory
 * @returns string
 */
export const getHomeDir = () => {
  const homeDir = os.homedir();
  if (!homeDir) {
    console.log(chalk.red.bold("Please provide open api key"));
    process.exit(1);
  }

  return homeDir;
};
