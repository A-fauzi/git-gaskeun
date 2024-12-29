#!/usr/bin/env node

const inquirer = require("inquirer");
const simpleGit = require("simple-git");

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
    console.log("\n📂 Files to be added:");
    status.not_added.forEach(file => console.log(`- ${file}`));
    await git.add(".");

    // Step 2: Commit Message
    const { commitMessage } = await inquirer.prompt([
      {
        type: "input",
        name: "commitMessage",
        message: "💬 Enter commit message (leave empty for default):",
        default: "Auto commit with gaskeun"
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