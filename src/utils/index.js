/**
 * 
 * @param {Date} date 
 * @returns { Date }
 */
export const FormatDate = (date) => {
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

    return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
}