import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite`;
  instruction =
    'Your task is to generate a structured summary of a parsed Wikipedia article without altering the original wording of key phrases and sentences. The summary must be exactly four paragraphs, with each paragraph covering a distinct key point of the article. Each paragraph should be limited to 3–5 sentences, ensuring readability while preserving the essential meaning and structure of the original text. Do not rephrase or modify critical terms, as the output will be compared against a list of links.';

  async gemini(prompt: string): Promise<string> {
    const endPoint = `${this.geminiUrl}:generateContent?key=${environment.geminiKey}`;

    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: {
              text: this.instruction,
            },
          },
          contents: {
            parts: {
              text: prompt,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!output) {
        throw new Error('No output returned from the API');
      }

      return output;
    } catch (error) {
      console.error('Error in gemini:', error);
      throw error;
    }
  }

  constructor() {}
}
