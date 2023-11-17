import axios from "axios";
import { BASE_URL, GET_WORKLOG } from '../../action-type';
import { formatDateWorklog, formatHours, getTime } from "../../../utils";

export const getWorklog = (idUser, fromDate, toDate, selectedArea) => {
  const JQL = fromDate === toDate
    ? `worklogAuthor = ${idUser} AND timespent != EMPTY AND worklogDate = ${fromDate} ORDER BY timespent DESC`
    : `worklogAuthor = ${idUser} AND timespent != EMPTY AND worklogDate >= ${fromDate} AND worklogDate <=  ${toDate} ORDER BY timespent DESC`

  let bodyData = {
    "fields": [
      "id",
      "issuetype",
      "status",
      "summary",
      "assignee",
      "description"
    ],
    "jql": JQL
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/worklog/search/?area=${selectedArea}`, bodyData));
      const { worklogs: data } = response.data


      data?.map((item) => {

          item.worklogs = item.worklogs?.filter((worklog) => {
  
            let worklogDateStarted = worklog.started
  
            if (fromDate === toDate) {
            const worklogIssue = new Date(worklogDateStarted)
            const formatDate = formatDateWorklog(worklogIssue)
  
            return formatDate === fromDate && worklog.author.accountId === idUser
          }
  
          const worklogIssue = new Date(worklogDateStarted)
          const splittedDateFrom = fromDate.split('-')
          const splittedDateTo = toDate.split('-')
  
  
          const convertFromDate = new Date(splittedDateFrom[0], splittedDateFrom[1]-1, splittedDateFrom[2], 6)
          const convertToDate = new Date(splittedDateTo[0], splittedDateTo[1]-1, splittedDateTo[2], 23)
  
            return worklogIssue >= convertFromDate && worklogIssue <= convertToDate && worklog.author.accountId === idUser  
        }) 
      })


      const userWorklogs = data.reduce((acc, current) => {
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



      let dataBarChart = userWorklogs?.reduce((acc, current) => {
           Object.keys(current).map(key => {
            if (acc[key]) {
              acc[key] = acc[key] + current[key]
            } else {
              acc[key] = current[key]
            }
           })

           return acc
      }, {})
      
      dataBarChart = Object.keys(dataBarChart).map(key => {
        return {
          date: key,
          horas: formatHours(dataBarChart[key])
        }
      })


      const issue = data.map((item) => {
         const result =  item.worklogs.map((worklog) => {
          return {
            key: item.key,
            summary: item.summary,
            status: item.status,
            worklogAuthor: worklog.author.displayName,
            worklogTime: getTime(worklog.timeSpentSeconds),
            comment: worklog.comment
          }
         })
        return result
      })?.flat()


      if (response.status === 200) dispatch({ type: GET_WORKLOG, payload: {worklog: dataBarChart, issue} })
      return response.data
    } catch (error) {
      console.log(error)
      console.log('Error al realizar la solicitud getWorklog');
    }
  };
};