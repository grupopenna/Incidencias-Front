import axios from "axios";
import { BASE_URL, GET_WORKLOG } from '../../action-type';
import { formatDateWorklog, formatHours } from "../../../utils";

export const getWorklog = (idUser, fromDate, toDate) => {
  let bodyData = {
    "expand": [ "operations","versionedRepresentations","editmeta","changelog","renderedFields"],
    "fields": [
      "id",
      "description",
      "issuetype",
      "summary",
      "status",
      "assignee",
      "accountId",
      "timetracking",
      "timeoriginalestimate",
      "aggregatetimeestimate",
      "aggregatetimespent",
      "customfield_10019",
      "worklog",
      "attachment",
      "transitions"
    ],
    "jql": `worklogAuthor = ${idUser} AND timespent != EMPTY AND worklogDate >=${fromDate} AND worklogDate <= ${toDate} ORDER BY timespent DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/worklog/search/`, bodyData));

      const filterWorklogs = response.data?.issues?.map((item) => {
        const response = {
          key: item.key,
          summary: item.versionedRepresentations.summary[1],
          status: item.versionedRepresentations.status[1].name,
          worklogs: item.versionedRepresentations.worklog[1].worklogs.filter((worklog) => {
                      // Valido que la fecha del worklog este entre la pedida por el usuario

                    if (fromDate === toDate) {
                      const worklogIssue = new Date(worklog.started)
                      const formatDate = formatDateWorklog(worklogIssue)

                      return formatDate === fromDate 
                    }

                    const worklogIssue = new Date(worklog.started)
                    const splittedDateFrom = fromDate.split('-')
                    const splittedDateTo = toDate.split('-')


                    const convertFromDate = new Date(splittedDateFrom[0], splittedDateFrom[1]-1, splittedDateFrom[2], 6)
                    const convertToDate = new Date(splittedDateTo[0], splittedDateTo[1]-1, splittedDateTo[2], 23)


                    return worklogIssue >= convertFromDate && worklogIssue <= convertToDate && worklog.author.accountId === idUser
                    })
        }

        return response
      })

      const userWorklogs = filterWorklogs.reduce((acc, current) => {
         const worklogs = current?.worklogs.reduce((prev, currentValue) => {

              const date = formatDateWorklog(new Date(currentValue.started))
              if (prev[date]) {
                prev[date] = prev[date] + currentValue?.timeSpentSeconds
              } else {
                prev[date] = currentValue?.timeSpentSeconds
              }

           return prev
         }, {})
        
         acc.push(worklogs)

         return acc
      }, [])



      let data = userWorklogs?.reduce((acc, current) => {
           Object.keys(current).map(key => {
            if (acc[key]) {
              acc[key] = acc[key] + current[key]
            } else {
              acc[key] = current[key]
            }
           })

           return acc
      }, {})

      data = Object.keys(data).map(key => {
        return {
          date: key,
          horas: formatHours(data[key])
        }
      })

      const issue = filterWorklogs.map((item) => {
         const result =  item.worklogs.map((worklog) => {
          return {
            key: item.key,
            summary: item.summary,
            status: item.status,
            worklogAuthor: worklog.author.displayName,
            worklogTime: formatHours(worklog.timeSpentSeconds),
            comment: worklog.comment
          }
         })
        return result
      })?.flat()



      if (response.status === 200) dispatch({ type: GET_WORKLOG, payload: {worklog: data, issue} })
      return response.data
    } catch (error) {
      console.log(error)
      console.log('Error al realizar la solicitud getWorklog');
    }
  };
};