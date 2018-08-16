import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 30px;
  line-height: 30px;
`

const StyledButton = styled.button`
  outline: 1px solid transparent;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  height: 25;
  position: absolute;
  
  svg {
    fill: #0092E3;
  }
  .clap-count {
    color: white;
    background: #0092E3;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    line-height: 30px;
  }
`

const Counter = styled.div`
  position: absolute;
  left: 30;
  width: 15px;
  height: 25px;
  color: inherit;
`

class Applause extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countTotal: 0,
      isClicked: false,
    }
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    const triangleBurst = new mojs.Burst({
      parent: '#clap' + this.props.id,
      radius: { 10: 30 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 5: 0 },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 50,
        speed: 0.5,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: 600
      }
    })
    const circleBurst = new mojs.Burst({
      parent: '#clap' + this.props.id,
      radius: { 20: 40 },
      angle: 50,
      duration: 600,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      }
    })
    const countAnimation = new mojs.Html({
      el: '#clap-count' + this.props.id,
      isShowStart: false,
      y: { '-30': -65 },
      opacity: { 0: 1 },
      duration: 200,
      delay: 0
    }).then({
      opacity: { 1: 0 },
      y: -130,
      delay: 800,
      duration: 700
    })

    const scaleButton = new mojs.Html({
      el: '#clap' + this.props.id,
      duration: 300,
      scale: { 1.5: 1 },
      easing: mojs.easing.out
    })
    const clap = document.getElementById('clap' + this.props.id);
    clap.style.transform = "scale(1, 1)";
    this._animationTimeline = new mojs.Timeline()
    this._animationTimeline.add([
      countAnimation,
      scaleButton,
      circleBurst,
      triangleBurst
    ])
  }

  _handleClick() {
    this._animationTimeline.replay();
    this.setState(function (prevState, nextState) {
      return {
        countTotal: prevState.isClicked ? prevState.countTotal - 1 : prevState.countTotal + 1,
        isClicked: !prevState.isClicked
      }
    });
  }

  render() {
    const { countTotal, isClicked } = this.state;
    const count = isClicked ? `+1` : `-1`; // 这里要注意点击之后上面的状态先变为true，此时+1
    return (
      <ButtonWrapper>
        <StyledButton id={`clap${this.props.id}`} onClick={this._handleClick}>
          <span style={{ display: isClicked ? "inline" : "none" }}>
            <svg width="25" height="25" >
              <g fillRule="evenodd">
                <path d="M11.738 0l.762 2.966L13.262 0z"></path>
                <path d="M16.634 1.224l-1.432-.47-.408 3.022z"></path>
                <path d="M9.79.754l-1.431.47 1.84 2.552z"></path>
                <path d="M22.472 13.307l-3.023-5.32c-.287-.426-.689-.705-1.123-.776a1.16 1.16 0 0 0-.911.221c-.297.231-.474.515-.535.84.017.022.036.04.053.063l2.843 5.001c1.95 3.564 1.328 6.973-1.843 10.144a8.46 8.46 0 0 1-.549.501c1.205-.156 2.328-.737 3.351-1.76 3.268-3.268 3.041-6.749 1.737-8.914"></path>
                <path d="M12.58 9.887c-.156-.83.096-1.569.692-2.142L10.78 5.252c-.5-.504-1.378-.504-1.879 0-.178.18-.273.4-.329.63l4.008 4.005z"></path>
                <path d="M15.812 9.04c-.218-.323-.539-.55-.88-.606a.814.814 0 0 0-.644.153c-.176.137-.713.553-.24 1.566l1.43 3.025a.539.539 0 1 1-.868.612L7.2 6.378a.986.986 0 1 0-1.395 1.395l4.401 4.403a.538.538 0 1 1-.762.762L5.046 8.54 3.802 7.295a.99.99 0 0 0-1.396 0 .981.981 0 0 0 0 1.394L3.647 9.93l4.402 4.403a.537.537 0 0 1 0 .761.535.535 0 0 1-.762 0L2.89 10.696a.992.992 0 0 0-1.399-.003.983.983 0 0 0 0 1.395l1.855 1.854 2.763 2.765a.538.538 0 0 1-.76.761l-2.765-2.764a.982.982 0 0 0-1.395 0 .989.989 0 0 0 0 1.395l5.32 5.32c3.371 3.372 6.64 4.977 10.49 1.126C19.74 19.8 20.271 17 18.62 13.982L15.812 9.04z"></path>
              </g>
            </svg>
          </span>
          <span style={{ display: isClicked ? "none" : "inline" }}>
            <svg width="25" height="25" >
              <g fillRule="evenodd">
                <path d="M11.739 0l.761 2.966L13.261 0z"></path>
                <path d="M14.815 3.776l1.84-2.551-1.43-.471z"></path>
                <path d="M8.378 1.224l1.84 2.551L9.81.753z"></path>
                <path d="M20.382 21.622c-1.04 1.04-2.115 1.507-3.166 1.608.168-.14.332-.29.492-.45 2.885-2.886 3.456-5.982 1.69-9.211l-1.101-1.937-.955-2.02c-.315-.676-.235-1.185.245-1.556a.836.836 0 0 1 .66-.16c.342.056.66.28.879.605l2.856 5.023c1.179 1.962 1.379 5.119-1.6 8.098m-13.29-.528l-5.02-5.02a1 1 0 0 1 .707-1.701c.255 0 .512.098.707.292l2.607 2.607a.442.442 0 0 0 .624-.624L4.11 14.04l-1.75-1.75a.998.998 0 1 1 1.41-1.413l4.154 4.156a.44.44 0 0 0 .624 0 .44.44 0 0 0 0-.624l-4.152-4.153-1.172-1.171a.998.998 0 0 1 0-1.41 1.018 1.018 0 0 1 1.41 0l1.172 1.17 4.153 4.152a.437.437 0 0 0 .624 0 .442.442 0 0 0 0-.624L6.43 8.222a.988.988 0 0 1-.291-.705.99.99 0 0 1 .29-.706 1 1 0 0 1 1.412 0l6.992 6.993a.443.443 0 0 0 .71-.501l-1.35-2.856c-.315-.676-.235-1.185.246-1.557a.85.85 0 0 1 .66-.16c.342.056.659.28.879.606L18.628 14c1.573 2.876 1.067 5.545-1.544 8.156-1.396 1.397-3.144 1.966-5.063 1.652-1.713-.286-3.463-1.248-4.928-2.714zM10.99 5.976l2.562 2.562c-.497.607-.563 1.414-.155 2.284l.265.562-4.257-4.257a.98.98 0 0 1-.117-.445c0-.267.104-.517.292-.706a1.023 1.023 0 0 1 1.41 0zm8.887 2.06c-.375-.557-.902-.916-1.486-1.011a1.738 1.738 0 0 0-1.342.332c-.376.29-.61.656-.712 1.065a2.1 2.1 0 0 0-1.095-.562 1.776 1.776 0 0 0-.992.128l-2.636-2.636a1.883 1.883 0 0 0-2.658 0 1.862 1.862 0 0 0-.478.847 1.886 1.886 0 0 0-2.671-.012 1.867 1.867 0 0 0-.503.909c-.754-.754-1.992-.754-2.703-.044a1.881 1.881 0 0 0 0 2.658c-.288.12-.605.288-.864.547a1.884 1.884 0 0 0 0 2.659l.624.622a1.879 1.879 0 0 0-.91 3.16l5.019 5.02c1.595 1.594 3.515 2.645 5.408 2.959a7.16 7.16 0 0 0 1.173.098c1.026 0 1.997-.24 2.892-.7.279.04.555.065.828.065 1.53 0 2.969-.628 4.236-1.894 3.338-3.338 3.083-6.928 1.738-9.166l-2.868-5.043z"></path>
              </g>
            </svg>
          </span>
          <div id={`clap-count${this.props.id}`} className="clap-count" >{count}</div>
        </StyledButton>
        <Counter id={`clap-count-total${this.props.id}`}>
          {countTotal === 0 ? "" : countTotal}
        </Counter>
      </ButtonWrapper>
    );
  }
}

export default Applause;