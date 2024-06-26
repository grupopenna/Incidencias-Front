export const BOARD_STATUS = {
    SIN_PRIORIZAR: "sin priorizar",
    PRIORIZADO: "priorizado"
}

export const WRITABLE_COLUMS = ['tareas por hacer', 'sin priorizar', 'priorizado', 'en curso']

export const ATTACHABLE_COLUMNS = ['tareas por hacer', 'sin priorizar', 'priorizado', 'en proceso', 'en curso']

export const COMMENTS_TYPES = {
    HEADING: 'heading',
    PARAGRAPH: 'paragraph',
    BLOCKQUOTE: 'blockquote'
}

export const JIRA_MARKS = {
    EM: 'em',
    STRONG: 'strong',
    STRIKE: 'strike'
}

export const ALLOW_CONTENT_LENGHT = 60

export const STATUS = {
    ...BOARD_STATUS,
    VALIDAR: 'validar',
    VALIDADO: 'validado',
    EN_CURSO: 'en curso',
    EN_PROCESO: 'en proceso'
}

export const STATU_COLOR = {
    [STATUS.EN_CURSO]: 'green',
    [STATUS.EN_PROCESO]: 'green',
    [STATUS.PRIORIZADO]: 'red',
    [STATUS.SIN_PRIORIZAR]: 'yellow',
    [STATUS.VALIDADO]: 'blue',
    [STATUS.VALIDAR]: 'slate',
}

export const WORKERS = [
    "Sebastian Almiron",
    "Carolina Garzon",
    "Luciano Gimenez",
    "David Forastieri",
    "Leandro",
    "Matias Gomez",
    "Julian Lopez",
    "Federico Ludueña",
    "Alcides"
]

export const AREAS = {
    SISTEMAS: 'sistemas',
    ADM: 'administracion'
}

export const A2REAS = {
    ADM: "Administración",
    AGRB: "Agro Brandsen",
    AGRT: "Agro Tandil",
    COM: "Compras",
    CONT: "Contable",
    DIR: "Dirección",
    EESS: "Estación Varela",
    IT: "Sistemas",
    LOGI: "Logística",
    RRHH: "Recursos Humanos",
    TALL: "Taller",
    TESO: "Tesorería"
}

export const ISSUETYPE_COD = {
    TRABAGESTION: '10135',
    TAREA: '10049'
}

export const ORDER_BY = {
    ASC: 'asc',
    DESC: 'desc'
}
