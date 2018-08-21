import md5 from 'md5'
import PouchDB from 'pouchdb';
import { MessagesTemp } from './constants'

export const getGravatar = (emailStr) => {
  return md5(emailStr.trim().toLowerCase());
}

const db = new PouchDB('messageList');

export const removeDB = () => {
  return db.allDocs().then(results => {
    return Promise.all(results.rows.map((row) => {
      return db.remove(row.id, row.value.rev);
    }))
  });
}

export const loadTemplate = () => {
  return removeDB().then(() => {
    return Promise.all(MessagesTemp.map(message => {
      db.put({
        ...message,
        gravatar: getGravatar(message.email),
        replyList: message.replyList.map(reply => ({ ...reply, gravatar: getGravatar(reply.email) }))
      });
    }));
  });
}

export const addMessage = (author, email, text) => {
  let message = {
    _id: new Date().getTime().toString(),
    author,
    email,
    gravatar: getGravatar(email),
    text,
    replyList: []
  }
  return db.put(message);
}

export const addReply = (messageId, author, replyTo, email, text) => {
  let reply = {
    _id: new Date().getTime().toString(),
    author,
    gravatar: getGravatar(email),
    replyTo,
    email,
    text
  };
  return db.get(messageId).then(message => {
    return db.put({
      ...message,
      replyList: [...message.replyList, reply]
    });
  });
}

export const getMessages = () => {
  let messages = [];
  return db.allDocs({
    include_docs: true,
    descending: true,
  }).then(results => {
    results.rows.forEach(result => {
      messages.push({ ...result.doc });
    });
    return messages;
  });
}