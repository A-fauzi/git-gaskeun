# 🚀 Git Gaskeun

[![npm version](https://img.shields.io/npm/v/git-gaskeun.svg)](https://www.npmjs.com/package/git-gaskeun)
[![Downloads](https://img.shields.io/npm/dm/git-gaskeun.svg)](https://www.npmjs.com/package/git-gaskeun)
[![License](https://img.shields.io/npm/l/git-gaskeun.svg)](https://github.com/username/git-gaskeun/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/username/git-gaskeun/pulls)

**Git Gaskeun** adalah CLI tool Node.js yang bikin proses git jadi super gampang! Cukup ketik **gaskeun** dan semua proses git (`add`, `commit`, `push`) akan dihandle secara interaktif. 

## 🌟 Features

### 💫 Commit Message Generator
- **Manual Input**: Tulis commit message sendiri
- **AI-Powered**: Generate commit message pake Gemini AI
- **Auto-Generate**: Buat commit message otomatis berdasarkan file yang diubah

### 🔄 Git Workflow
- **Auto File Detection**: Deteksi semua file yang berubah secara otomatis
- **Smart Branch Management**: Pilih branch dengan mudah
- **Interactive Push**: Push ke branch yang dipilih dengan konfirmasi

### 🎨 User Experience
- **Emoji-Rich Interface**: Interface yang friendly dan eye-catching
- **Interactive Prompts**: Panduan step-by-step yang jelas
- **Clear Feedback**: Pesan sukses/error yang informatif

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g gaskeun-git
```

### Local Project Installation
```bash
npm install gaskeun-git
```

## 🚀 Usage

1. Buka terminal di folder Git project
2. Jalankan command:
```bash
gaskeun
```
3. Ikuti langkah-langkah interaktif di terminal

## 📝 Example Usage

```bash
$ gaskeun
🚀 Welcome to Git Gaskeun!

📂 Files to be added:
- src/main.js
- package.json

💬 Pilih jenis commit message:
❯ 1. Manual
  2. AI Gemini 🤖
  3. Perubahan File

✨ Yeayy mantap! 🚀
```

## 🔧 AI Commit Message

Untuk menggunakan fitur AI commit message:
1. Dapatkan API key dari [Google Cloud Console](https://console.cloud.google.com)
2. Pilih opsi "2. AI Gemini 🤖"
3. Masukkan API key saat diminta
4. Konfirmasi commit message yang digenerate

## ❌ Error Handling

Tool ini dilengkapi dengan handling untuk berbagai error:
- Repository validation
- API errors
- Network issues
- Branch conflicts
- Push failures

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create your feature branch
- Submit a pull request

## 📜 License

ISC License - see LICENSE file for details

---

Made with ❤️ by Zi