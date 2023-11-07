import axios from "axios";
import { BASE_URL, GET_COMMENT_ISSUES, CLEAR_COMMENT_STATE } from '../../action-type';

const COMMENTS_TYPES = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  BLOCKQUOTE: 'blockquote'
}

export const getCommentIssues = (key) => {
  // const userId = "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"

  // const bodyData = {
  //   "jql": `reporter=${userId} order by created DESC`
  // }

  const bodyData = {
    "jql": `issue=${key}`,
    "fields": [
        "key",
        "summary",
        "comment",
        "updateAuthor",
        "author",
        "created",
        "updated"
    ]
}

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getComment/`, bodyData)).data;
      const res = response.issues[0].fields.comment.comments
      const comments = res.reverse();

      const values = comments.map((comment) => {
        const { body:{ content }, author, updated } = comment

        const commenToRender = {  
          author,
          isMention: false ,
          mentionUser: null,
          updated,
          comment: ''
        }
        const commentValues = content.map((values) => {

          if (values.type === COMMENTS_TYPES.HEADING) {
            const { text } =  values.content[0]
            return text
          }

          if (values.type === COMMENTS_TYPES.PARAGRAPH) {
            const { text, type, attrs } =  values.content[0]

            if (type === 'mention') {
              commenToRender.isMention = true
              commenToRender.mentionUser = attrs.text
              return ''
            }
            return text
          }

          if (values.type === COMMENTS_TYPES.BLOCKQUOTE) {
            const { content} =  values.content[0]
            const { text } =  content[0]
  
            return text
          }
        })


        commenToRender.comment = commentValues?.join('\n')
        return commenToRender
      })

      dispatch({ type: GET_COMMENT_ISSUES, payload: values.reverse() })
      return response
    } catch (error) {
      console.log(error)
      console.log('Error al realizar la solicitud getCommentIssues');

    }
  };
}

export const clearAllCommentState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COMMENT_STATE })
  }
}