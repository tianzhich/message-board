import React from 'react';
import styled from 'styled-components'
import MessageInput from '../components/Input'
import MessageBoard from '../components/MessageBoard'
import EmailInput from '../components/EmailInput';
import { InputType } from "../constants";
import { addMessage, addReply, getMessages, removeDB, loadTemplate } from '../tools.js'

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  background-color: rgb(250, 250, 250);
`

const Button = styled.button`
  font-size: 13px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [], // 所有的留言
      inputType: null, // 当前输入是在留言（response）还是回复楼主的留言（reply）
      showEmailInput: false, // 是否弹出邮件输入框
      // 保留当前输入内容，因为输入内容之后需要输入邮箱和姓名，前者需要保存，后两者直接传入submit回调函数即可
      inputContent: {
        [InputType.REPLY_INPUT]: {},
        [InputType.RESPONSE_INPUT]: {}
      }
    }
  }


  closeModal = () => {
    this.setState({
      showEmailInput: false
    });
  }

  componentDidMount() {
    // 点击其他地方关闭输入框
    document.addEventListener('click', this.closeModal, false);

    getMessages().then(messageList => {
      this.setState({
        messageList
      });
    }).catch(err => {
      console.log("暂时无法获取留言板信息！" + err);
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal, false);
  }

  loadTemplate = () => {
    if (window.confirm('载入模板会删除您现在所有的留言板数据，确认载入吗？')) {
      loadTemplate().then(() => {
        getMessages().then(messageList => {
          console.log("获取模板信息成功！");
          this.setState({
            messageList
          });
        }).catch(err => {
          console.log("暂时无法获取模板信息！" + err);
        })
      }).catch(err => {
        console.log('加载模板失败，请稍后重试' + err)
      });
    }
  }

  removeTemplate = () => {
    if (window.confirm('删除模板会删除包括模板在内的所有的留言板数据，确认删除吗？')) {
      removeDB().then(() => {
        getMessages().then(messageList => {
          console.log("模板删除成功！");
          this.setState({
            messageList
          });
        }).catch(err => {
          console.log("模板删除成功，但是暂时无法获取模板信息！" + err);
        })
      }).catch((err) => {
        console.log('删除失败，请稍后重试!' + err);
      });
    }
  }

  handleSubmit = (author, email) => {
    let content, response_id, reply_to;
    if (this.state.inputType === InputType.RESPONSE_INPUT) {
      content = this.state.inputContent[InputType.RESPONSE_INPUT].content;

      addMessage(author, email, content).
        then(() => {
          console.log("添加成功!");
          getMessages().then(messageList => {
            console.log("获取最新留言板成功！");
            this.setState({
              messageList
            });
          }).catch(err => {
            console.log("暂时无法获取最新留言！" + err);
          })
        }).catch(err => {
          console.log("添加留言失败，请稍后重试！" + err);
        });;

    } else if (this.state.inputType === InputType.REPLY_INPUT) {
      content = this.state.inputContent[InputType.REPLY_INPUT].content;
      response_id = this.state.inputContent[InputType.REPLY_INPUT].response_id;
      reply_to = this.state.inputContent[InputType.REPLY_INPUT].reply_to;

      addReply(response_id, author, reply_to, email, content).
        then(() => {
          console.log("添加回复成功!");
          getMessages().then(messageList => {
            console.log("获取最新回复成功！");
            this.setState({
              messageList
            });
          }).catch(err => {
            console.log("暂时无法获取最新回复！" + err);
          })
        }).catch(err => {
          console.log("添加回复失败，请稍后重试！" + err);
        })
    }
    // 回到初始状态
    this.setState({
      inputType: null,
      showEmailInput: false,
      inputContent: {
        [InputType.REPLY_INPUT]: {},
        [InputType.RESPONSE_INPUT]: {}
      }
    });
  }

  handleResponse = (content) => {
    this.setState({
      inputType: InputType.RESPONSE_INPUT,
      showEmailInput: true,
      inputContent: {
        ...this.state.inputContent,
        [InputType.RESPONSE_INPUT]: {
          content
        }
      }
    });
  }

  handleReply = (response_id, reply_to, content) => {
    this.setState({
      inputType: InputType.REPLY_INPUT,
      showEmailInput: true,
      inputContent: {
        ...this.state.inputContent,
        [InputType.REPLY_INPUT]: {
          response_id, reply_to, content
        }
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <h1>Message Board</h1>
        <Button onClick={this.loadTemplate}>载入模板</Button>
        <Button onClick={this.removeTemplate}>删除模板</Button>
        <MessageInput
          type={InputType.RESPONSE_INPUT}
          onResponse={(content) =>
            this.handleResponse(content)}
        />
        <MessageBoard
          messages={this.state.messageList}
          onReply={(response_id, reply_to, content) =>
            this.handleReply(response_id, reply_to, content)}
        />
        <EmailInput
          onSubmit={(author, email) =>
            this.handleSubmit(author, email)}
          show={this.state.showEmailInput}
        />
      </Wrapper>
    );
  }
}

export default App;