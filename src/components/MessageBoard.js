import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const BoardWrapper = styled.div`
  width: 600px;
  margin: 20px auto;
`

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`

class MessageBoard extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <BoardWrapper>
        <MessageList>
          {
            messages.map(message =>
              <Message message={message} key={message._id}
                onReply={(response_id, reply_to, content) =>
                  this.props.onReply(response_id, reply_to, content)}
              />
            )
          }
        </MessageList>
      </BoardWrapper>
    );
  }
}

export default MessageBoard;