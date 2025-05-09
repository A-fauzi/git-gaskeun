import inquirer from 'inquirer';
import { MESSAGES, COMMIT_OPTIONS, PUSH_ERROR_ACTIONS } from './constants.js';

export class UserInterface {
  constructor(gitService, aiService) {
    this.gitService = gitService;
    this.aiService = aiService;
  }

  displayWelcomeMessage() {
    console.log(MESSAGES.WELCOME);
  }

  displayModifiedFiles(files) {
    console.log(`\n${MESSAGES.FILES_TO_ADD}`);
    files.forEach(file => console.log(`- ${file}`));
  }

  displayBranchInfo(current, all) {
    console.log(`\n${MESSAGES.BRANCHES_AVAILABLE} ${all.join(", ")}`);
    console.log(`${MESSAGES.CURRENT_BRANCH} ${current}`);
  }

  displaySuccess() {
    console.log(`\n${MESSAGES.SUCCESS}`);
  }
  async promptForCommitMessage(modifiedFiles) {
    const { commitOption } = await inquirer.prompt([{
      type: "list",
      name: "commitOption",
      message: "💬 Pilih jenis commit message:",
      choices: Object.values(COMMIT_OPTIONS),
      default: COMMIT_OPTIONS.MANUAL
    }]);

    switch (commitOption) {
      case COMMIT_OPTIONS.MANUAL:
        return this.promptForManualCommit();
      
      case COMMIT_OPTIONS.AI:
        return this.promptForAICommit(modifiedFiles);
      
      case COMMIT_OPTIONS.FILES:
        return `update: ${modifiedFiles.join(", ")}`;
    }
  }
  async promptForManualCommit() {
    const { userCommitMessage } = await inquirer.prompt([{
      type: "input",
      name: "userCommitMessage",
      message: "💬 Masukkan commit message:",
      validate: input => input.trim().length > 0
    }]);
    return userCommitMessage;
  }

  async promptForAICommit(modifiedFiles) {
    const { apiKey } = await inquirer.prompt([{
      type: "input",
      name: "apiKey",
      message: "🔑 Masukkan Gemini API Key:",
      validate: input => {
        if (!input.trim()) return "API Key tidak boleh kosong";
        if (!input.startsWith("AIza")) return "Format API Key tidak valid";
        return true;
      }
    }]);
    console.log(`\n${MESSAGES.AI_GENERATING}`);
    const aiMessage = await this.aiService.generateCommitMessage(modifiedFiles, apiKey);
    console.log(`\n${MESSAGES.AI_GENERATED} ${aiMessage}`);
    
    // Confirm commit message
    const { confirmMessage } = await inquirer.prompt([{
      type: "confirm",
      name: "confirmMessage",
      message: "Gunakan commit message ini?",
      default: true
    }]);

    if (!confirmMessage) {
      return this.promptForCommitMessage(modifiedFiles);
    }

    return aiMessage;
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
      return this.promptForCustomBranch();
    }

    return branchName;
  }

  async promptForCustomBranch() {
    const { customBranch } = await inquirer.prompt([{
      type: "input",
      name: "customBranch",
      message: "📂 Enter custom branch name:",
      validate: input => input.trim().length > 0
    }]);
    return customBranch;
  }

  async handlePushError(branch, availableBranches) {
    console.error(`\n❌ Error: Branch '${branch}' does not exist or hasn't been set up for pushing.`);
    
    const { action } = await inquirer.prompt([{
      type: "list",
      name: "action",
      message: "How would you like to proceed?",
      choices: Object.values(PUSH_ERROR_ACTIONS)
    }]);

    return action;
  }
}