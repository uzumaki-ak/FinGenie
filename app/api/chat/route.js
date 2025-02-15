
import { FinancialAdvisorChain } from '@/app/lib/langchain/chains';
import { auth } from '@clerk/nextjs/server';

const advisorChain = new FinancialAdvisorChain();

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      );
    }

    const { query, context = {} } = await req.json();
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }), 
        { status: 400 }
      );
    }

    const response = await advisorChain.run(userId, query, context);

    return new Response(
      JSON.stringify({ response }), 
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }), 
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
}