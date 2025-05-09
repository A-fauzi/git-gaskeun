import simpleGit from 'simple-git';
import { MESSAGES } from './constants.js';

export class GitService {
  constructor() {
    this.git = simpleGit();
  }

  async isGitRepository() {
    return await this.git.checkIsRepo();
  }

  async getModifiedFiles() {
    const status = await this.git.status();
    return [
      ...status.not_added,
      ...status.modified,
      ...status.deleted
    ];
  }

  async addAllFiles() {
    await this.git.add(".");
  }
  
  async commit(message) {
    await this.git.commit(message);
  }

  async getBranchInfo() {
    const branchSummary = await this.git.branch();
    return {
      current: branchSummary.current,
      all: Object.keys(branchSummary.branches).filter(branch => !branch.startsWith('remotes/'))
    };
  }

  async pushToBranch(branch) {
    await this.git.push("origin", branch);
  }

  async createAndPushBranch(branch) {
    await this.git.checkoutLocalBranch(branch);
    await this.git.push("origin", branch, ["--set-upstream"]);
  }
}