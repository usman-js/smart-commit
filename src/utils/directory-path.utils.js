const { execSync } = require("child_process");
const path = require("path");

(() => {
  // Get the bin directory path
  const binPath = path.join(__dirname, "bin");

  // Check if the bin directory path is already in the PATH environment variable
  if (process.env.PATH.split(":").indexOf(binPath) === -1) {
    // Add the bin directory path to the PATH environment variable
    if (process.platform === "win32") {
      execSync(`setx PATH "%PATH%;${binPath}"`);
    } else {
      execSync(`export PATH="$PATH:${binPath}"`);
    }

    //   console.log('Path added to the PATH environment variable.');
  } else {
    //   console.log('Path is already in the PATH environment variable.');
  }
})();
