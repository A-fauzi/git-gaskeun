# 🚀 Git Gaskeun

[![npm version](https://img.shields.io/npm/v/git-gaskeun.svg)](https://www.npmjs.com/package/git-gaskeun)
[![Downloads](https://img.shields.io/npm/dm/git-gaskeun.svg)](https://www.npmjs.com/package/git-gaskeun)
[![License](https://img.shields.io/npm/l/git-gaskeun.svg)](https://github.com/username/git-gaskeun/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/username/git-gaskeun/pulls)

**Git Gaskeun** adalah library Node.js sederhana untuk mempermudah proses git seperti `add`, `commit`, dan `push` hanya dengan satu keyword aja: **gaskeun**.  
Hemat waktu, less effort, dan full auto!  

## 🌟 Features  
- **Auto Add Files**: Tambahkan semua file dalam repository secara otomatis.  
- **Custom Commit Message**: Pilih antara pesan otomatis berdasarkan file yang diubah atau buat pesan custom.  
- **Branch Selector**: Pilih branch untuk push (e.g., `main`, `master`, atau custom branch).  
- **Friendly Feedback**: Setelah selesai, dapatkan pesan semangat seperti "Yeayy mantap!🚀".  
- **Error Handling**: Menampilkan error jika digunakan di luar repository git.  

---

## 🚀 Installation  

### Install Secara Global  
```bash
npm install -g git-gaskeun
```

### Install di Proyek Lokal  
```bash
npm install git-gaskeun
```

---

## 🛠️ Usage

### Global Usage

1. Navigasi ke folder proyek Git lo.

2. Jalankan command berikut:
```bash
gaskeun
```

3. Ikuti instruksi interaktif di CLI.

### Local Usage

1. Tambahkan script ke package.json proyek lo:
```json
{
  "scripts": {
    "gaskeun": "git-gaskeun"
  }
}
```

2. Jalankan di terminal:
```bash
npm run gaskeun
```

---

## 📖 Example

```bash
$ gaskeun
🚀 Welcome to Git Gaskeun!

🎨 [Step 1] Adding all files...
✅ Files added: 
- src/index.js  
- package.json  

✍️ [Step 2] Commit your changes  
➡️ Choose a commit message:  
1) Auto-generated commit message  
2) Custom message  

➡️ Commit Message: "Fix bug on index.js"  

🌲 [Step 3] Select branch to push:  
➡️ Branch: main  

🎉 Yeayy mantap!🚀 All changes pushed successfully!
```

---

## ❌ Error Handling

Contoh:
```bash
🚀 Welcome to Git Gaskeun!  
❌ Error: This is not a Git repository.
```

---

## 🤝 Contributing

Feel free to fork and create pull requests. Let's make Git workflows easier for everyone!

---

## 🏷️ License

Git Gaskeun is licensed under the ISC License.

---

Created with ❤️ by Zi