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
    
    // Get all modified files
    const modifiedFiles = [
      ...status.not_added,
      ...status.modified,
      ...status.deleted
    ];

    console.log("\n📂 Files to be added:");
    modifiedFiles.forEach(file => console.log(`- ${file}`));
    await git.add(".");

    // Create default commit message
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

    // Get list of available branches
    const branchSummary = await git.branch();
    const availableBranches = Object.keys(branchSummary.branches);
    const currentBranch = branchSummary.current;

    console.log("\n🌿 Available branches:", availableBranches.join(", "));
    console.log("📌 Current branch:", currentBranch);

    // Step 3: Select Branch
    const { branchName } = await inquirer.prompt([
      {
        type: "list",
        name: "branchName",
        message: "🔀 Select branch to push:",
        choices: [...availableBranches, "custom"],
        default: currentBranch
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
    try {
      await git.push("origin", finalBranch);
      console.log("\n✨ Yeayy mantap!🚀");
    } catch (pushErr) {
      if (pushErr.message.includes("src refspec") || pushErr.message.includes("does not match any")) {
        console.error(`\n❌ Error: Branch '${finalBranch}' does not exist or hasn't been set up for pushing.`);
        console.log("\n💡 Suggestion:");
        console.log(`1. Create and switch to branch '${finalBranch}':
           git checkout -b ${finalBranch}`);
        console.log(`2. Or use one of these existing branches: ${availableBranches.join(", ")}`);
        console.log("\n3. If this is a new branch, you might need to:");
        console.log(`   git push --set-upstream origin ${finalBranch}`);
      } else {
        console.error("❌ An error occurred:", pushErr.message);
      }
    }

  } catch (err) {
    console.error("❌ An error occurred:", err.message);
  }
}

main();