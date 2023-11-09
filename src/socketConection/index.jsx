import { getCommentIssues, getIssue } from '../redux/actions';
import io from 'socket.io-client';

const socketUrl = 'http://localhost:3001';

export function initializeJiraSocket(dispatch, jiraAccountId) {

  const socket = io(socketUrl, {
    withCredentials: true,
  });

  socket.on('cambio-en-jira', (data) => {
    const key = window.location.pathname.split('/').slice(-1);
    dispatch(getIssue(key, jiraAccountId));
    if (data.webhookEvent === 'comment_created') {
      let issueKey = data.issue.key;
      dispatch(getCommentIssues(issueKey));
    }
  })

  return socket;
}