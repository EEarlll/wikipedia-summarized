import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash`;
  instruction =
    'Your task is to create a concise, engaging summary of a parsed Wikipedia article. The summary must be structured into exactly four paragraphs, each covering a distinct key point of the original content. Given that most readers have a short attention span, keep each paragraph to no more than 2–3 sentences, ensuring that the entire summary is clear, direct, and focused on the most essential information.';

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
