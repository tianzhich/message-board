import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const BoardWrapper = styled.div`
  width: 600px;
  margin: 10% auto;
`

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: "", // 当前展开楼层, 表示当前正在浏览或回复楼层(messageID表示)
    }
  }

  handleShowReply = (messageId) => {
    this.setState({
      messageId
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <BoardWrapper>
        <MessageList>
          {
            messages.map(message =>
              <Message message={message} key={message._id}
                showReplyList={this.state.messageId === message._id ? true : false}
                onShowReply= {(id) => this.handleShowReply(id)}
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