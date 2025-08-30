import {genkit, NextJSPlugin} from '@genkit-ai/next';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI(), NextJSPlugin()],
  model: 'googleai/gemini-2.5-flash',
  enableTracing: false,
});
