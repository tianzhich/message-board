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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseID: "", // 当前展开楼层
    }
  }

  handleShowReply = (id) => {
    this.setState({
      responseID: id
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <BoardWrapper>
        <MessageList>
          {
            messages.map(message =>
              <Message message={message} key={message.id}
                showReplyList={this.state.responseID === message.id ? true : false}
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

export default Board;