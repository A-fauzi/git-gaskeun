import { GitGaskeun } from './index.js';

// Run the application
const gitGaskeun = new GitGaskeun();
gitGaskeun.run().catch(error => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});