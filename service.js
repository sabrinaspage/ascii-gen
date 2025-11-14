const OpenAI = require("openai");
require("dotenv").config();

const practice_prompt = "Create ASCII art of a tree on the grass. Make it as huge as you can.";

class OpenAIService {
    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async hello(prompt) {
        const response = await this.client.responses.create({
            model: "gpt-5.1",
            input: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            reasoning: { "effort": "low" },
            max_output_tokens: 10000,
        });

        console.log(response.output_text);
        return response;
    }
}

const openAiSvc = new OpenAIService();
openAiSvc.hello(practice_prompt);