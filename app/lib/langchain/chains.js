
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { FinancialAnalysisTool, InvestmentAdvisorTool } from "./tools";

export class FinancialAdvisorChain {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-pro",
      temperature: 0.7,
    });

    this.tools = {
      financialAnalysis: new FinancialAnalysisTool(),
      investmentAdvisor: new InvestmentAdvisorTool()
    };

    const promptTemplate = PromptTemplate.fromTemplate(`
      You are a sophisticated financial advisor with expertise in personal finance,
      investment planning, budgeting, debt management, and tax planning.

      Financial Analysis:
      {financialAnalysis}

      {investmentAdvice}

      User Query: {userQuery}

      Based on the user's financial data and query, provide specific, actionable advice.
      Focus on practical steps they can take to improve their financial situation.
      Use bullet points for key recommendations and explain the reasoning behind each suggestion.
    `);

    this.chain = RunnableSequence.from([
      {
        financialAnalysis: async (input) => {
          return await this.tools.financialAnalysis._call({ userId: input.userId });
        },
        investmentAdvice: async (input) => {
          if (input.userQuery.toLowerCase().includes("invest")) {
            return await this.tools.investmentAdvisor._call({
              userId: input.userId,
              riskProfile: input.context?.riskProfile || "moderate",
              investmentAmount: input.context?.investmentAmount || 0,
              goals: input.context?.goals || []
            });
          }
          return "";
        },
        userQuery: (input) => input.userQuery
      },
      promptTemplate,
      this.llm,
      new StringOutputParser()
    ]);
  }

  async run(userId, query, context = {}) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await this.chain.invoke({
        userId,
        userQuery: query,
        context
      });

      return response;
    } catch (error) {
      console.error("Error in advisor chain:", error);
      throw new Error(`Error in financial advisor chain: ${error.message}`);
    }
  }
}