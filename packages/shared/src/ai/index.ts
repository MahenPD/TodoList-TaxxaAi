export async function generateTodo(prompt: string): Promise<string[]> {
  // const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer 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`,
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'user', content: prompt }],
  //     max_tokens: 150,
  //   }),
  // });

  // const data = await res.json();
  // const content = data.choices?.[0]?.message?.content ?? '';
  const content =
    '1. Define the research question or hypothesis\n2. Conduct a literature review to explore previous studies on the topic\n3. Develop a research methodology and experimental design\n4. Obtain necessary materials and equipment for the study\n5. Recruit participants or obtain samples for the study\n6. Conduct experiments or observations according to the research protocol\n7. Collect and analyze data\n8. Interpret results and draw conclusions\n9. Write up a report or research paper detailing the study\n10. Present findings at conferences or submit manuscript for publication.';

  return content
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean);
}
