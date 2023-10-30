/**
 * 
 * @param {Date} date 
 * @returns { Date }
 */
export const FormatDate = (date) => {
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

    return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
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
      if (line.startsWith('* ')) {
          // Se asume que las líneas que comienzan con "* " son elementos de lista
          markdownLines.push(`- ${line.substring(2)}`);
      } else if (line.startsWith('h1.')) {
          // Encabezado de nivel 1
          markdownLines.push(`# ${line.substring(4)}`);
      } else if (line.startsWith('h2.')) {
          // Encabezado de nivel 2
          markdownLines.push(`## ${line.substring(4)}`);
      } else if (line.startsWith('h4.')) {
          // Encabezado de nivel 4
          markdownLines.push(`#### ${line.substring(4)}`);
      } else if (line.startsWith('!')) {
          // Imagen
          markdownLines.push(line);
      } else {
        markdownLines.push(line)
      }
  }

  // Unir las líneas en una cadena de texto Markdown
  const markdownText = markdownLines.join('\n');


  return markdownText;
}