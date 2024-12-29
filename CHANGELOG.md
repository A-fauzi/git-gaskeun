# Changelog

## [1.1.0] - 2024-12-29
### Added
- **AI Commit Message**: Added Gemini AI integration for generating smart commit messages
- **Auto Add Files**: Automatically add all modified files in the repository
- **Interactive Commit Options**: 
  - Manual commit message input
  - AI-generated commit messages using Gemini
  - Auto-generated messages based on file changes
- **Branch Management**: 
  - Interactive branch selector
  - Support for custom branch creation
  - Proper handling of remote branches
- **Enhanced Error Handling**:
  - Detailed API error messages
  - Network error handling
  - Git repository validation
  - Branch push error recovery
- **User Experience**:
  - Emoji-rich interface
  - Clear success/error messages
  - Interactive confirmations
  - Progress indicators

### Changed
- Improved branch selection to filter out remote branches
- Enhanced commit message validation
- Better error messages with detailed feedback

### Fixed
- Fixed Gemini API integration and response handling
- Improved error handling for branch push failures
- Better handling of non-Git repositories

## [1.0.0] - 2024-12-29
### Added
- New Release