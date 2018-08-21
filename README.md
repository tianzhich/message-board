## MessageBoard (留言板)

### 简介

这是一个基于React+[PouchDB](https://pouchdb.com/)实现的留言板，模仿Medium社区，使用[mo-js](http://mojs.io/)实现鼓掌点赞动画，用户需要填写邮箱和姓名进行留言，用户头像使用[gravatar](https://en.gravatar.com/)获取

本来最初使用了Redux，加入PouchDB后，数据统一存储在这里面，而且目前的功能来讲，状态树较为简单，交互也很简单，因此我割掉了Redux。当然，使用Redux也可以的。但是，当时看阮一峰老师的文章提到，曾经有人说过

> 如果你不知道是否需要 Redux，那就是不需要它。

Redux 的创造者 Dan Abramov 又补充了一句

> 只有遇到 React 实在解决不了的问题，你才需要 Redux。

对于简单应用，使用Redux或许可以让你学习它，但是无法最大化了解它

### 安装与运行

```bash
> $ git clone https://github.com/tianzhich/message-board.git
> $ npm install
> $ npm start
```

### 部署

```bash
> $ npm build
> $ npm deploy
```

### 项目网址

[https://tianzhich.github.io/message-board/](https://tianzhich.github.io/message-board/)

