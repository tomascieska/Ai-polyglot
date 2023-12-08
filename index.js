import OpenAI from "openai"

const translateForm = document.getElementById('submit-form')
const translationString = document.getElementById('result')


function submitTranslation(e){
  e.preventDefault()

  const translateData = new FormData(translateForm)

  const stringToTranslate = translateData.get('to_translate')
  const language = translateData.get('languages')

  fetchReport(stringToTranslate, language)
}

async function fetchReport(stringToTranslate, language) {
  const messages = [
      {
          role: 'system',
          content: `You are plyglot. Translate in to ${language}`
      },
      {
          role: 'user',
          content: stringToTranslate
      }
  ]
  try{
      const openai = new OpenAI({
          apiKey: '',
          dangerouslyAllowBrowser: true
      })
      const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
          temperature: 1,
          presence_penalty: 0,
          frequency_penalty: 0
          
      })
      
       translationString.innerHTML = `<h2>${response.choices[0].message.content}</h2>`

  } catch (err) {
      console.log('Error:', err)
      loadingArea.innerHTML = 'Unable to access AI. Please refresh and try again'
  }
}





translateForm.addEventListener('submit', submitTranslation)
