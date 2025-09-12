export async function generateTodo(prompt: string): Promise<string[]> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }),
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return content
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean);
}
