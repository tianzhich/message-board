import React from 'react'
import styled from 'styled-components'
import MainMessage from './MessageItem'
import ReplyItem from './MessageItem'
import downArrow from '../images/down-arrow.svg'
import upArrow from '../images/up-arrow.svg'
import Input from './Input'
import { InputType } from "../constants";

const MessageWrapper = styled.li`
  padding: 40px 0;
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

  & span:hover, & > img {
    cursor: pointer;
    color: rgba(0,0,0,.68);
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

  static getDerivedStateFromProps(nextProps) {
    return {
      showReply: nextProps.showReplyList
    }
  }

  // 展开楼层列表，默认回复楼主，同时需要关闭其他楼层
  toggleReplyList = () => {
    this.textInput.current.handleBlur();
    this.setState({
      replyTo: this.props.message.author
    });

    if (!this.state.showReply) {
      this.props.onShowReply(this.props.message.id);
    } else {
      this.props.onShowReply("");
    }
  }

  /* 回复层主 */
  handleReply = (replyTo) => {
    this.setState({
      replyTo
    });
    window.location.href = `#${this.props.message.id}`;
    this.textInput.current.handleFocus(); // focus必须发生在hash跳转之后！！！
  }

  handleOnReply = (content) => {
    this.props.onReply(this.props.message.id, this.state.replyTo, content);
  }

  render() {
    const { replyList } = this.props.message;
    const { showReply } = this.state;
    return (
      <MessageWrapper>
        <MainMessage {...this.props.message}>
          <ShowReplyButton onClick={this.toggleReplyList} >
            <span>{replyList ? `${replyList.length} response` : ``}</span>
            <div>
              <span className="reply">reply</span>
              <img src={downArrow} alt=""
                style={{
                  display: showReply ? "none" : "inline-block",
                  height: 12
                }}
              />
              <img src={upArrow} alt=""
                style={{
                  display: showReply ? "inline-block" : "none",
                  height: 12,
                }}
              />
            </div>
          </ShowReplyButton>
        </MainMessage>
        <ReplyList showReply={showReply}>
          {
            replyList ? replyList.map(reply =>
              <ReplyItem key={reply.id} {...reply}>
                <ShowReplyButton>
                  <span className="reply" onClick={() => this.handleReply(reply.author)}>reply</span>
                </ShowReplyButton>
              </ReplyItem>
            ) : null
          }
          <Input
            ref={this.textInput}
            id={this.props.message.id}
            type={InputType.REPLY_INPUT}
            onReply={(content) => this.handleOnReply(content)}
          />
        </ReplyList>
      </MessageWrapper>
    );
  }
}

export default Message;