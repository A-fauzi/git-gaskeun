#!/usr/bin/env node

import { GitGaskeun } from '../src/index';

// Run the application
const gitGaskeun = new GitGaskeun();
gitGaskeun.run().catch(error => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});