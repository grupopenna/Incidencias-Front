import { COMMENTS_TYPES, JIRA_MARKS } from "../const"

/**
 * 
 * @param {Date} date 
 * @returns { Date }
 */
export const FormatDate = (date) => {
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

    return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
}


const DICTONARY_JIRA = {
    'h1.': '#',
    'h2.': '##',
    'h3.': '###',
    'h4.': '####',
    'h5.': '#####',
    'h6.': '######',
    '\\n\\n': '\n'
}

/**
 * 
 * @param {string} input 
 * @returns {string}
 */
export const parseTextToJiraFormatt = (input) => {

    if (!input) return ''

    const lines = input.split('\n')
    const jiraLines = []

    for(const line of lines) {

        // h1
        if (/^#[^#]./.test(line)) {
            const value = {
                "type": "heading",
                "attrs": {
                    "level": 1
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(2)    
                }]
            }
            
            jiraLines.push(value)
            continue
        }

         // h2
         if (/^##[^#]./.test(line)) {
            const value = {
                "type": "heading",
                "attrs": {
                    "level": 2
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(3)  
                }]
            }
            
            jiraLines.push(value)
            continue

        }

         // h3
         if (/^###[^#]./.test(line)) {
            const value = {
                "type": "heading",
                "attrs": {
                    "level": 3
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(4)
                }]
            }

            jiraLines.push(value)

            continue

        }

         // h4
         if (/^####[^#]./.test(line)) {
                 const value = {
                "type": "heading",
                "attrs": {
                    "level": 4
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(5)
                }]
            }
            
            jiraLines.push(value)
            continue

        }

         // h5
         if (/^#####[^#]./.test(line)) {
            const value = {
                "type": "heading",
                "attrs": {
                    "level": 5
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(6)
                }]
            }
            
            jiraLines.push(value)
            continue

        }

         // h6
         if (/^######[^#]./.test(line)) {
            const value = {
                "type": "heading",
                "attrs": {
                    "level": 6
                },
                "content": [{
                    "type": "text",
                    "text": line.slice(7)
                }]
            }
            
            jiraLines.push(value)
            continue

        }

        // bold
        if (/^\*\*[a-zA-Z0-9]+\*\*$/.test(line)) {
            const value = {
                "type": "paragraph",
                "content": [
                    {
                    "type": "text",
                    "text": line.replaceAll('**', ''),
                    "marks": [
                        {
                            "type": "strong"
                        }
                    ]   
                }
            ]
            }
            
            jiraLines.push(value)
            continue
        }

        // italic

        if (/^\*[a-zA-Z0-9]+\*$/.test(line)) {
            const value = {
                "type": "paragraph",
                "content": [
                    {
                    "type": "text",
                    "text": line.replaceAll('*', ''),
                    "marks": [
                        {
                            "type": "em"
                        }
                    ]   
                }
            ]
            }
            
            jiraLines.push(value)
            continue
        }

        // strike
        if (/^~~[a-zA-Z0-9]+~~$/.test(line)) {
            const value = {
                "type": "paragraph",
                "content": [
                    {
                    "type": "text",
                    "text": line.replaceAll('~', ''),
                    "marks": [
                        {
                            "type": "strike"
                        }
                    ]   
                }
            ]
            }
            
            jiraLines.push(value)
            continue
        }

         // quote
        if (line.startsWith('> ')) {
            const value = {
                "type": "blockquote",
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "type": "text",
                                "text": line.slice(2)
                            }
                        ]
                    }
                ]
            }
            
            jiraLines.push(value)
            continue
        }

        if (line !== '') {

            const value = {
                "type": "paragraph",
                "content": [
                    {
                    "type": "text",
                    "text": line,  
                }
            ]
            }
            
            jiraLines.push(value)
        }

    }

    return jiraLines

}


/**
 * 
 * @param {string} inputText 
 * @returns {string}
 */
export  const parseTextToMarkdown = (inputText) => {
  // Dividir el texto en líneas
  if (!inputText) return ''
  
  const lines = inputText.split('\n');
  const markdownLines = [];
  
  for (const line of lines) {

    let formattChar
    const character  = line.split(' ')
    if (line.startsWith('--') ) {
        markdownLines.push('***')
        continue
    }

    if (line.startsWith('# ')) {
       const listNumeric = line.split('\n')

       const newList = listNumeric.map((char, index) =>  char.replace('# ', `${index+1}. `))
    
       markdownLines.push(newList.join('\n'))
       continue

    }

    if (/\{quote}[\s\S]+\{quote\}/.test(line)) {
        formattChar = line.replace('{quote}', '>')
        formattChar = formattChar.replace('{quote}', '')

        markdownLines.push(formattChar)
        continue

    }

    if (line.startsWith('* ')) {
        markdownLines.push(line)
        continue

    }
    if (line.startsWith('*') && line.endsWith('*')) {
        formattChar = line.replaceAll('*', '**')

        markdownLines.push(formattChar)
        continue

    }

    if (line.startsWith('_') && line.endsWith('_')) {
        formattChar = line.replaceAll('_', '*')
        markdownLines.push(formattChar)
        continue

    }

    if (/^-[a-zA-Z0-9]+-$/.test(line)) {
        formattChar = line.replaceAll('-', '~~')
        markdownLines.push(formattChar)
        continue

    }

    if (line.startsWith('||')) {
        markdownLines.push(line)
        continue

    }

    if (/\{code:[a-zA-Z]+\}[\s\S]+\{code\}/.test(line)) {
        
        const splittedCode = line.split('}')
        const language = splittedCode[0].split(':')[1]
        const content = splittedCode[1].split('{')[0]
        const code = `
          \`\`\`${language}

          ${content}

          \`\`\`
        `
        markdownLines.push(code)
        continue
    }


    if (Object.prototype.hasOwnProperty.call(DICTONARY_JIRA, character[0])) {
        markdownLines.push(`${DICTONARY_JIRA[character[0]]} ${character[1]}`)
        continue

    }

    markdownLines.push(line)
  }

  // Unir las líneas en una cadena de texto Markdown
  const markdownText = markdownLines.join('\n');

  return markdownText;
}

/**
 * 
 * @param {string} text 
 * @param {string} type 
 * @param {Object} attrs 
 * @returns {string}
 */
export const convertTextToMarkdown = (text, type, attrs) => {
    if (type === COMMENTS_TYPES.HEADING) {
        return `${'#'.repeat(attrs.level)} ${text}`
    }
    
    
    if (type === COMMENTS_TYPES.BLOCKQUOTE) {
        return `> ${text}`
    }
    
    if (type === COMMENTS_TYPES.PARAGRAPH) {
        if (attrs?.marks) {
            if (attrs.marks === JIRA_MARKS.STRONG) {
                return `**${text}**`
            }

            if (attrs.marks === JIRA_MARKS.EM) {
                return `*${text}*`
            }

            if (attrs.marks === JIRA_MARKS.STRIKE) {
                return `~~${text}~~`
            }
        }

        return text
    }
}


export const commentTime = (data) => {
    let fechaAntigua = new Date(data);
    let fechaActual = new Date();
    let diferenciaEnMilisegundos = fechaActual - fechaAntigua;
    let minutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);
    return dias > 0 ? `Hace ${dias} dias` :
      horas > 0 ? `Hace ${horas} horas` :
        minutos > 1 ? `Hace ${minutos} minutos` :
          'Hace 1 minuto'
  }


export const clientName = (str) => {
    return str.substring(1)
}