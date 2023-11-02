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
            console.log(`h1.${line.split(' ')[1]}`)
            jiraLines.push(`h1.  ${line.split(' ')[1]}`)
            continue
        }

         // h2
         if (/^##[^#]./.test(line)) {
            jiraLines.push(`h2.  ${line.split(' ')[1]}`)
            continue

        }

         // h3
         if (/^###[^#]./.test(line)) {
            jiraLines.push(`h3.  ${line.split(' ')[1]}`)
            continue

        }

         // h4
         if (/^####[^#]./.test(line)) {
            jiraLines.push(`h4.  ${line.split(' ')[1]}`)
            continue

        }

         // h5
         if (/^#####[^#]./.test(line)) {
            jiraLines.push(`h5.  ${line.split(' ')[1]}`)
            continue

        }

         // h6
         if (/^######[^#]./.test(line)) {
            jiraLines.push(`h6.  ${line.split(' ')[1]}`)
            continue

        }

        // bold
        if (/^\*\*[a-zA-Z0-9]+\*\*$/.test(line)) {
            jiraLines.push(line.replaceAll('**', '*'))
            continue
        }

        // italic

        if (/^\*[a-zA-Z0-9]+\*$/.test(line)) {
            jiraLines.push(line.replaceAll('*', '_'))
            continue
        }

        jiraLines.push(line)

    }

    const jiraText = jiraLines.join('\\n\\n')

    return jiraText

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