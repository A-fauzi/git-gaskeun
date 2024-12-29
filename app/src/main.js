#!/usr/bin/env node

import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import axios from 'axios';

// Constants
const MESSAGES = {
  WELCOME: "🚀 Welcome to Git Gaskeun!",
  NO_REPO: "❌ Error: This is not a Git repository!",
  NO_FILES: "❌ No modified files to commit.",
  SUCCESS: "✨ Yeayy mantap! 🚀",
  FILES_TO_ADD: "📂 Files to be added:",
  BRANCHES_AVAILABLE: "🌿 Available branches:",
  CURRENT_BRANCH: "📌 Current branch:",
};

class GitGaskeun {
  constructor() {
    this.git = simpleGit();
  }

  async generateCommitMessageAI(files, apiKey) {
    try {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

      const response = await axios.post(
        `${apiUrl}?key=${apiKey}`,
        {
          contents: [{
            parts: [{
              text: `Generate a concise and descriptive commit message for these modified files: ${files.join(", ")}`
            }]
          }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.data?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini API");
      }

      return response.data.parts[0].text.trim();
    } catch (error) {
      console.error("❌ AI Commit Generation Error:", error.message);
      return "feat: update files (AI generation failed)";
    }
  }

  async getModifiedFiles() {
    const status = await this.git.status();
    return [
      ...status.not_added,
      ...status.modified,
      ...status.deleted
    ];
  }

  async promptForCommitMessage(modifiedFiles) {
    const { commitOption } = await inquirer.prompt([{
      type: "list",
      name: "commitOption",
      message: "💬 Pilih jenis commit message:",
      choices: [
        "1. Manual ✍️",
        "2. AI Gemini 🤖",
        "3. File Changes 📂"
      ],
      default: "1. Manual ✍️"
    }]);

    switch (commitOption) {
      case "1. Manual ✍️":
        const { userCommitMessage } = await inquirer.prompt([{
          type: "input",
          name: "userCommitMessage",
          message: "💬 Masukkan commit message:",
          validate: input => input.trim().length > 0
        }]);
        return userCommitMessage;

      case "2. AI Gemini 🤖":
        const { apiKey } = await inquirer.prompt([{
          type: "input",
          name: "apiKey",
          message: "🔑 Gemini API Key:",
          validate: input => input.trim().length > 0
        }]);
        
        console.log("\n⏳ Generating commit message with AI...");
        const aiMessage = await this.generateCommitMessageAI(modifiedFiles, apiKey);
        console.log(`\n💬 Generated commit message: ${aiMessage}`);
        return aiMessage;

      case "3. File Changes 📂":
        return `update: ${modifiedFiles.join(", ")}`;
    }
  }

  async selectBranch(currentBranch, availableBranches) {
    const { branchName } = await inquirer.prompt([{
      type: "list",
      name: "branchName",
      message: "🔀 Select branch to push:",
      choices: [...availableBranches, "custom"],
      default: currentBranch
    }]);

    if (branchName === "custom") {
      const { customBranch } = await inquirer.prompt([{
        type: "input",
        name: "customBranch",
        message: "📂 Enter custom branch name:",
        validate: input => input.trim().length > 0
      }]);
      return customBranch;
    }

    return branchName;
  }

  async handlePushError(error, finalBranch, availableBranches) {
    if (error.message.includes("src refspec") || error.message.includes("does not match any")) {
      console.error(`\n❌ Error: Branch '${finalBranch}' does not exist or hasn't been set up for pushing.`);
      
      const { action } = await inquirer.prompt([{
        type: "list",
        name: "action",
        message: "How would you like to proceed?",
        choices: [
          "Create new branch and push",
          "Select existing branch",
          "Cancel"
        ]
      }]);

      switch (action) {
        case "Create new branch and push":
          await this.git.checkoutLocalBranch(finalBranch);
          await this.git.push("origin", finalBranch, ["--set-upstream"]);
          return true;
        
        case "Select existing branch":
          const newBranch = await this.selectBranch(availableBranches[0], availableBranches);
          await this.git.push("origin", newBranch);
          return true;

        default:
          return false;
      }
    }
    
    throw error;
  }

  async run() {
    try {
      console.log(MESSAGES.WELCOME);

      // Verify Git repository
      const isRepo = await this.git.checkIsRepo();
      if (!isRepo) {
        throw new Error(MESSAGES.NO_REPO);
      }

      // Get modified files
      const modifiedFiles = await this.getModifiedFiles();
      if (modifiedFiles.length === 0) {
        console.log(MESSAGES.NO_FILES);
        return;
      }

      // Display modified files
      console.log(`\n${MESSAGES.FILES_TO_ADD}`);
      modifiedFiles.forEach(file => console.log(`- ${file}`));
      
      // Add files
      await this.git.add(".");

      // Get commit message
      const commitMessage = await this.promptForCommitMessage(modifiedFiles);
      await this.git.commit(commitMessage);

      // Get branch information
      const branchSummary = await this.git.branch();
      const availableBranches = Object.keys(branchSummary.branches);
      const currentBranch = branchSummary.current;

      console.log(`\n${MESSAGES.BRANCHES_AVAILABLE} ${availableBranches.join(", ")}`);
      console.log(`${MESSAGES.CURRENT_BRANCH} ${currentBranch}`);

      // Select and push to branch
      const finalBranch = await this.selectBranch(currentBranch, availableBranches);
      
      try {
        await this.git.push("origin", finalBranch);
        console.log(`\n${MESSAGES.SUCCESS}`);
      } catch (pushError) {
        const resolved = await this.handlePushError(pushError, finalBranch, availableBranches);
        if (resolved) {
          console.log(`\n${MESSAGES.SUCCESS}`);
        }
      }

    } catch (error) {
      console.error("❌ Error:", error.message);
      process.exit(1);
    }
  }
}

// Run the application
new GitGaskeun().run();