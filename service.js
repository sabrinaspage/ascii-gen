const OpenAI = require("openai");
const { startLoader, stopLoader } = require("./loader-helpers");
require("dotenv").config();

const practice_prompt = "Create ASCII art of a tree on grass. Make it as big as you can";

class OpenAIService {
    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async ascii_gen(prompt) {
        const loader = startLoader();
        try {
            const response = await this.client.responses.create({
                model: "gpt-5.1",
                input: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                reasoning: { "effort": "medium" },
                max_output_tokens: 1000,
            });
            stopLoader(loader);
            console.log(response.output_text);

            return response;
        } catch (error) {
            stopLoader(loader);
            throw error;
        }
    }
}

const openAiSvc = new OpenAIService();
openAiSvc.ascii_gen(practice_prompt);