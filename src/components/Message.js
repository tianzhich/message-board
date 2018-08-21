import React from 'react'
import styled from 'styled-components'
import MainMessage from './MessageItem'
import ReplyItem from './MessageItem'
import Input from './Input'
import { InputType } from "../constants";

const MessageWrapper = styled.li`
  padding: 20px 0;
  border-top: 1px dotted rgb(236, 236, 236);
`

const ReplyList = styled.ul`
  display: ${props => props.showReply ? "block" : "none"};
  padding: 0;
  & div {
    margin: 0;
  }
`

const ShowReplyButton = styled.div`
  color: inherit;
  svg {
    fill: inherit;
  }

  &:hover {
    cursor: pointer;
    color: rgba(0,0,0,.68);
    svg {
      fill: rgba(0,0,0,.68);
    }
  }
`

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReply: false, // 该楼回复框是否展开（每楼回复框在最底下）
      replyTo: props.message.author, // 表示回复对象，默认回复楼主
    }
    this.textInput = React.createRef();
  }

  // 展开楼层列表，默认回复楼主，同时需要关闭其他楼层
  // replyTo存在则说明回复层主
  toggleReplyList = (replyTo) => {
    this.textInput.current.handleBlur();

    if (replyTo) {
      window.location.href = `#${this.props.message._id}`;
      this.textInput.current.handleFocus(); // focus必须发生在hash跳转之后！！！
    } else {
      this.setState(prevState => ({
        showReply: !prevState.showReply
      }));
    }

    this.setState({
      replyTo: replyTo ? replyTo : this.props.message.author
    });
  }

  onReply = (content) => {
    this.props.onReply(this.props.message._id, this.state.replyTo, content);
  }

  render() {
    const { replyList } = this.props.message;
    const { showReply } = this.state;
    return (
      <MessageWrapper>
        <MainMessage {...this.props.message}>
          <ShowReplyButton onClick={() => this.toggleReplyList()} >
            <span>{replyList ? `${replyList.length} response` : ``}</span>
            <div>
              <span className="reply">reply</span>
              <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" width="12px" height="12px"
                style={{ transform: showReply ? 'rotateZ(180deg)' : '' }} >
                <g><path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" /></g>
              </svg>
            </div>
          </ShowReplyButton>
        </MainMessage>
        <ReplyList showReply={showReply}>
          {
            replyList ? replyList.map(reply =>
              <ReplyItem key={reply._id} {...reply}>
                <ShowReplyButton style={{ justifyContent: 'flex-end' }}>
                  <span className="reply"
                    onClick={() => this.toggleReplyList(reply.author)}
                  >
                    reply
                  </span>
                </ShowReplyButton>
              </ReplyItem>
            ) : null
          }
          <Input
            ref={this.textInput}
            id={this.props.message._id}
            type={InputType.REPLY_INPUT}
            onReply={(content) => this.onReply(content)}
          />
        </ReplyList>
      </MessageWrapper>
    );
  }
}

export default Message;