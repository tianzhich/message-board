import { ADD_RESPONSE, ADD_REPLY } from '../actions'

const rootReducer = (state = [], action) => {
  let now = new Date();
  let yyyy = now.getFullYear();
  let mm = now.getMonth() < 9 ? `0${now.getMonth()+1}` : now.getMonth()+1;
  let dd = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  let hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  let min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();

  let id = now.getTime(); // 随机生成id

  switch (action.type) {
    case ADD_RESPONSE:
      return [...state, {
        id,
        author: action.author,
        date: `${yyyy}/${mm}/${dd}`,
        time: `${hour}:${min}`,
        email: action.email,
        content: action.content,
        replyList: []
      }];
    case ADD_REPLY: 
      return state.map(response => {
        console.log(response, action);
        if (response.id === action.response_id) {
          return {
            ...response,
            replyList: [...response.replyList, {
              id,
              author: action.author,
              email: action.email,
              replyTo: action.reply_to,
              content: action.content,
              date: `${yyyy}/${mm}/${dd}`,
              time: `${hour}:${min}`,
            }]
          }
        } else {
          return response;
        }
      });

    default:
      return state;
  }
}

export default rootReducer;