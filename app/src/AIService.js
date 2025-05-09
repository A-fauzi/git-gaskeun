import axios from 'axios';

export class AIService {
  async generateCommitMessage(files, apiKey) {
    try {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

      const response = await axios.post(
        `${apiUrl}?key=${apiKey}`,
        {
          contents: [{
            parts: [{
              text: `Sebagai git commit message generator, analisa perubahan code/file berikut:
${files.join(", ")}
Buatkan commit message dengan ketentuan:
1. Baca dan pahami perubahan pada file/code tersebut
2. Gunakan format conventional commit (feat/fix/chore/etc)
3. Deskripsikan perubahan dengan bahasa Indonesia santai + jaksel style
4. Maksimal 72 karakter
5. Harus mencerminkan perubahan yang sebenarnya di code

Contoh good commit message:
- feat: nambahin dark mode di navbar
- fix: benerin infinite loop di useEffect
- style: update warna primary jadi lebih fresh`
            }]
          }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // Check for valid response format
      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return response.data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      this.handleApiError(error);
      return "chore: update files (AI generation failed)";
    }
  }

  handleApiError(error) {
    if (error.response) {
      const errorMessage = error.response.data?.error?.message || 
                           error.response.data?.message || 
                           error.message;
      console.error("❌ Gemini API Error:", errorMessage);
    } else {
      console.error("❌ Network Error:", error.message);
    }
  }
}