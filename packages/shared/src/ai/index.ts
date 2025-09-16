export async function generateTodo(prompt: string): Promise<string[]> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
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
