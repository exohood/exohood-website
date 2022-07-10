/* eslint-disable no-console */

/**
Steps:
 - Checkout to `gh-pages` branch
 - Calculate branch creation date in days for each folder under `/branch` path
 - Delete folder(s) if creation date is bigger than threshold date
 - Then Commit & Push those changes
 - Checkout to original branch
 */

const { execSync } = require('child_process');
const path = require('path');

const glob = require('glob');
const inquirer = require('inquirer');
const shell = require('shelljs');

const fetchSettings = () => {
  const questions = [
    {
      name: 'days',
      type: 'number',
      message: 'Delete files older than (please specify number of days): ',
    },
  ];
  return inquirer.prompt(questions);
};

const resume = (removed) => {
  const questions = [
    {
      name: 'confirm',
      type: 'confirm',
      message: `Are you sure you want to delete the following folders? \n\n${removed.join(
        '\n',
      )}\n\n`,
      default: false,
    },
  ];
  return inquirer.prompt(questions);
};

const execSyncWithMessage = ({ command, message }) => {
  execSync(command, (error, output, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
  });
  console.log(message);
};

const run = async () => {
  const { days } = await fetchSettings();

  const currentBranch = execSync(`git rev-parse --abbrev-ref HEAD`).toString();

  execSync(`git checkout gh-pages`);

  const root = path.join(process.cwd(), `branch/*`);

  const removed = [];
  try {
    await Promise.all(
      glob.sync(root).map((branchPath) => {
        const gitModified = execSync(`git log -1 --format="%ad" -- ${branchPath}`).toString();
        const differenceInTime = new Date().getTime() - new Date(gitModified).getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays >= days) {
          removed.push(`${branchPath.match(/branch\/(.*)/g)[0]} - days: ${differenceInDays}`);
          shell.rm('-rf', branchPath);
        }
        return true;
      }),
    );

    if (removed.length > 0) {
      const { confirm } = await resume(removed);
      if (confirm) {
        execSyncWithMessage({
          command: `git commit -am "chore: deploy-to-github-pages cleanup"`,
          message: `Commit chore: deploy-to-github-pages cleanup`,
        });
        execSyncWithMessage({
          command: `git push`,
          message: `Push cleanup deletion`,
        });
        console.log(`Done deleted ${removed.length} ${removed.length > 1 ? 'folders' : 'folder'}`);
      }
    } else {
      console.log('No matching folders has been found');
    }

    execSync(`git checkout ${currentBranch}`);
  } catch (error) {
    console.log(error);
  }
};

run();
