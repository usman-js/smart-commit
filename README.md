# Smart-Commit
Smart-Commit is a Node.js CLI package that uses AI to optimize the commit process for Git users. This package allows developers to generate AI commit messages using OpenAI and makes the commit process more efficient.

## Installation
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/usman-js/smart-commit?branch=main)
To install the package, run the following command:


```sh
npm install -g @usman_khan/smart-commit
```

## Usage
### To use the package, run the following command:

```sh
smart-commit
```

When running the package for the first time, it will check if the user has an OpenAI API key. If not, the package will prompt the user to enter the API key and store it in the user's path.

After verifying the OpenAI API key, the package will check if the user is in a Git repository and if all files are added to Git. If not, the package will prompt the user to add the files.

Once all files are added, the package will generate five AI commit messages using OpenAI and prompt the user to select one of them.

### To update the OpenAI API key, use the following command:

```sh
smart-commit -k <openai-key>
```

## License
This package is licensed under the MIT License.

## Credits
This package is created and maintained by Muhammad Usman Khan.