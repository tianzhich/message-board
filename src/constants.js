const RESPONSE_INPUT = "RESPONSE_INPUT"; // 主留言输入框
const REPLY_INPUT = "REPLY_INPUT"; // 楼层回复输入框

export const InputType = {
  RESPONSE_INPUT,
  REPLY_INPUT
}

export const MessagesTemp = [
  {
    _id: "1534847608367",
    author: "Ting",
    email: "Ting@yahoo.com",
    text: "这个留言板做的不错啊！",
    replyList: [{
      _id: "1534846749920",
      author: "田志",
      email: "zhi.tian@yahoo.com",
      replyTo: "Ting",
      text: "哈哈还可以，一般吧，有些功能还没实现的",
    }]
  },
  {
    _id: "1534848608367",
    author: "小泽",
    email: "xiaoze@yahoo.com",
    text: "React最近学得怎么样了?",
    replyList: [{
      _id: "1534849749920",
      author: "田志",
      email: "zhi.tian@yahoo.com",
      replyTo: "小泽",
      text: "全家桶差不多了吧，你不是在学Vue吗？",
    }, {
      _id: "1534849759920",
      author: "Ting",
      email: "ting@yahoo.com",
      replyTo: "田志",
      text: "嗯，我和小皇帝都在学vue",
    }]
  },
  {
    _id: "1534849608367",
    author: "比比",
    email: "bibi@yahoo.com",
    text: "真的是个菜鸡",
    replyList: [{
      _id: "1534849609367",
      author: "xingfeng",
      email: "xingfeng@yahoo.com",
      replyTo: "比比",
      text: "我最强",
    }, {
      _id: "1534849609467",
      author: "晨光",
      email: "chenguang@yahoo.com",
      replyTo: "xingfeng",
      text: "牛逼...",
    }]
  },
  {
    _id: "1534850608367",
    author: "松平",
    email: "songping@yahoo.com",
    text: "哇，好强啊！",
    replyList: [{
      _id: "1534869609467",
      author: "liupei",
      email: "liupei@yahoo.com",
      replyTo: "松平",
      text: "爱你么么哒",
    }]
  },
  {
    _id: "1534858154751",
    author: "田志",
    email: "zhi.tian@yahoo.com",
    text: "最近过得怎么样？",
    replyList: [{
      _id: "1534846638820",
      author: "Zhi Tian",
      email: "tianzhichn@yahoo.com",
      replyTo: "田志",
      text: "那你呢？怎么样",
    }, {
      _id: "1534846639820",
      author: "小泽",
      email: "xiaoze@yahoo.com",
      replyTo: "田志",
      text: "田志牛逼",
    }, {
      _id: "1534846649820",
      author: "Ting",
      email: "ting@yahoo.com",
      replyTo: "田志",
      text: "田志是真的牛逼",
    }, {
      _id: "1534846739820",
      author: "Ting",
      email: "ting@yahoo.com",
      replyTo: "小泽",
      text: "小皇帝是真的辣鸡",
    }, {
      _id: "1534846749820",
      author: "小泽",
      email: "xiaoze@yahoo.com",
      replyTo: "Ting",
      text: "日...",
    }]
  },
]