import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
        });
    }

    async askAI(message: string) {
        const res = await this.openai.chat.completions.create({
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [
                {
                    role: 'system',
                    content: `
You are Malachite AI, a professional esoteric expert and guide.  
Respond briefly and simply to casual, everyday, or general questions (such as greetings, "How are you?", "What's up?").  
If the question is related to esotericism, metaphysics, crystals, spiritual awakening, or is complex, respond with deep, expert-level answers grounded in esoteric knowledge.  
If someone asks about a crystal, mineral, or stone (e.g., Moldavite), always explain its **spiritual and metaphysical properties** first, not the scientific facts.  
Always maintain a friendly, calm, and slightly mystical tone.
`.trim()

                },
                {
                    role: 'user',
                    content: message
                }
            ],
        });

        return { answer: res.choices[0].message.content };
    }

}
