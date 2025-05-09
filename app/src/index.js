import { GitService } from './GitService.js';
import { AIService } from './AIService.js';
import { UserInterface } from './UserInterface.js';
import { MESSAGES, PUSH_ERROR_ACTIONS } from './constants.js';

export class GitGaskeun {
  constructor() {
    this.gitService = new GitService();
    this.aiService = new AIService();
    this.ui = new UserInterface(this.gitService, this.aiService);
  }

  async run() {
    try {

      // Verify Git repository
      const isRepo = await this.gitService.isGitRepository();
      if (!isRepo) {
        throw new Error(MESSAGES.NO_REPO);
      }

      // Get modified files
      const modifiedFiles = await this.gitService.getModifiedFiles();
      if (modifiedFiles.length === 0) {
        console.log(MESSAGES.NO_FILES);
        return;
      }
      
      this.ui.displayWelcomeMessage();
      // Display modified files
      this.ui.displayModifiedFiles(modifiedFiles);
      
      // Add files
      await this.gitService.addAllFiles();

      // Get commit message
      const commitMessage = await this.ui.promptForCommitMessage(modifiedFiles);
      await this.gitService.commit(commitMessage);

      // Get branch information
      const { current, all } = await this.gitService.getBranchInfo();
      this.ui.displayBranchInfo(current, all);

      // Select and push to branch
      const finalBranch = await this.ui.selectBranch(current, all);
      
      try {
        await this.gitService.pushToBranch(finalBranch);
        this.ui.displaySuccess();
      } catch (pushError) {
        const action = await this.ui.handlePushError(finalBranch, all);
        
        switch (action) {
          case PUSH_ERROR_ACTIONS.CREATE:
            await this.gitService.createAndPushBranch(finalBranch);
            this.ui.displaySuccess();
            break;
            case PUSH_ERROR_ACTIONS.SELECT:
            const newBranch = await this.ui.selectBranch(all[0], all);
            await this.gitService.pushToBranch(newBranch);
            this.ui.displaySuccess();
            break;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}