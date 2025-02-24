export const SIN_COMENZAR = 'status in ("Priorizado", "Sin Priorizar")'

export const WORKLOADS = 'project = ERP AND issuetype != epic AND status != Cerrado'

export const PRIORIZADOS_POR_AREA = "(@areas) AND (status = Priorizado OR status = 'Sin Priorizar')"

export const APROBADOS = `labels = APROBADO AND status != Cerrado AND TOP = NULL`

export const TOP_FIVE = `(TOP = TOP1 OR TOP = TOP2 OR TOP = TOP3 OR TOP = TOP4 OR TOP = TOP5) AND status != Cerrado AND (@ids)`

export const ALEJANDRO_JIRA = {
  "accountId": "qm:c0387339-02b1-4e0d-8f36-3232066900ca:cf762601-8fa8-4c76-ba13-b749978052bd",
  "displayName": "Alejandro Guerrero"
}