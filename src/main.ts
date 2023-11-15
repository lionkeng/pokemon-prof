import OpenAI from 'openai'
import { inspect } from 'util'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function main(): Promise<void> {
  // const chatCompletion = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: 'Say this is a test' }],
  //   model: 'gpt-3.5-turbo',
  //   stream: false,
  // })
  // result when not streaming will be in the content field
  // console.log(chatCompletion.choices[0].message.content)

  const stream = await openai.beta.chat.completions.stream({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  })

  // stream.on('content', (delta, snapshot) => {
  //   process.stdout.write(delta)
  // })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '\n')
  }

  const chatCompletion = await stream.finalChatCompletion()
  console.log(inspect(chatCompletion, false, null, true)) // {id: "…", choices: […], …}
}

main()
