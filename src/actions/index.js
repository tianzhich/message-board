export const ADD_RESPONSE = "ADD_RESPONSE";
export const ADD_REPLY = "ADD_REPLY";

export const addResponse = (author, email, content, replyList = []) => ({
  type: ADD_RESPONSE,
  author,
  email,
  content,
  replyList
});

export const addReply = (response_id, email, author, reply_to, content) => ({
  type: ADD_REPLY,
  response_id,
  author,
  email,
  reply_to,
  content
});
