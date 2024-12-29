#!/usr/bin/env node

import inquirer from 'inquirer';
import simpleGit from 'simple-git';

const git = simpleGit();

async function main() {
  console.log("🚀 Welcome to Git Gaskeun!");

  try {
    // Check if current directory is a Git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.error("❌ Error: This is not a Git repository!");
      process.exit(1);
    }

    // Step 1: Git Add
    const status = await git.status();
    
    // Get all modified files (including new, modified, and deleted)
    const modifiedFiles = [
      ...status.not_added,
      ...status.modified,
      ...status.deleted
    ];

    console.log("\n📂 Files to be added:");
    modifiedFiles.forEach(file => console.log(`- ${file}`));
    await git.add(".");

    // Create default commit message from modified files
    const defaultMessage = modifiedFiles.length > 0
      ? `Updated: ${modifiedFiles.join(", ")}`
      : "No files changed";

    // Step 2: Commit Message
    const { commitMessage } = await inquirer.prompt([
      {
        type: "input",
        name: "commitMessage",
        message: "💬 Enter commit message (leave empty for default):",
        default: defaultMessage
      }
    ]);
    await git.commit(commitMessage);

    // Step 3: Select Branch
    const { branchName } = await inquirer.prompt([
      {
        type: "list",
        name: "branchName",
        message: "🔀 Select branch to push:",
        choices: ["main", "master", "custom"]
      }
    ]);

    let finalBranch = branchName;
    if (branchName === "custom") {
      const { customBranch } = await inquirer.prompt([
        {
          type: "input",
          name: "customBranch",
          message: "📂 Enter custom branch name:"
        }
      ]);
      finalBranch = customBranch;
    }

    // Step 4: Push to Branch
    await git.push("origin", finalBranch);

    console.log("\n✨ Yeayy mantap!🚀");
  } catch (err) {
    console.error("❌ An error occurred:", err.message);
  }
}

main();