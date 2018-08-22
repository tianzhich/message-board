import md5 from 'md5'
import { MessagesTemp } from './constants'

export const getGravatar = (emailStr) => {
  return md5(emailStr.trim().toLowerCase());
}

var db = null;

const initPouchDB = () => {
  return import(/* webpackChunkName: 'pouchdb' */ 'pouchdb').then(PouchDB => {
    if (!db) {
      db = PouchDB.default('messageList');
    }
  });
}

const getRandomCount = (left, right) => {
  return Math.floor(left + Math.random() * (right - left + 1));
}

export const removeDB = () => {
  return initPouchDB().then(() => {
    return db.allDocs().then(results => {
      return Promise.all(results.rows.map((row) => {
        return db.remove(row.id, row.value.rev);
      }))
    });
  })

}

export const loadTemplate = () => {
  return removeDB().then(() => {
    return Promise.all(MessagesTemp.map(message => {
      db.put({
        ...message,
        gravatar: getGravatar(message.email),
        applause: getRandomCount(50, 100),
        replyList: message.replyList.map(reply => (
          {
            ...reply,
            gravatar: getGravatar(reply.email),
            applause: getRandomCount(5, 20),
          }
        ))
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
    applause: 0,
    replyList: []
  }
  return initPouchDB().then(() => {
    db.put(message);
  })
}

export const addReply = (messageId, author, replyTo, email, text) => {
  let reply = {
    _id: new Date().getTime().toString(),
    author,
    gravatar: getGravatar(email),
    replyTo,
    email,
    applause: 0,
    text
  };
  return initPouchDB().then(() => {
    return db.get(messageId).then(message => {
      return db.put({
        ...message,
        replyList: [...message.replyList, reply]
      });
    });
  })
}

export const getMessages = () => {
  let messages = [];
  return initPouchDB().then(() => {
    return db.allDocs({
      include_docs: true,
      descending: true,
    }).then(results => {
      results.rows.forEach(result => {
        messages.push({ ...result.doc });
      });
      return messages;
    });
  })
}