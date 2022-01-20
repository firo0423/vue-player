# vue-player
用js的AudioContext写的音乐播放器，采用input[file] 上传MP3文件，然后用AudioContext解析播放
技术栈：Vue3 + element Plus + vuex + iconfont + AudioContext + fileReader <br>
学习来源：<br> 
https://www.bilibili.com/video/BV1xE411Y7TA?spm_id_from=333.1007.top_right_bar_window_history.content.click up主lizzzled<br> 
原项目地址：<br> 
https://github.com/lizzz0523/limni/tree/master/music-player<br> 
https://github.com/pengnima/music-vue 这位大佬写的太强了，注释写的很清楚，js的后台处理学这位大佬<br>

## 效果展示
<img width="661" alt="4587c6660367b336a0658f5bf229b46" src="https://user-images.githubusercontent.com/93251384/150303493-9a1f4281-2765-4e1e-ad90-15c96c976a9f.png">
## 项目结构
```
vue-player
├── public
│   ├── music
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   ├── icon
│   │   └── logo.png
│   ├── components
│   │   ├── controls.vue       // 功能组件
│   │   ├── panel.vue          // 信息显示组件
│   │   └── progressBar.vue    // 进度条和调节音量组件
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── utiles
│   │   └── player.js          // js音乐播放功能核心
│   ├── views
│   │   ├── Home.vue
│   │   └── Home1.vue          // 仅含功能页-没写样式前
│   ├── App.vue
│   └── main.js
├── babel.config.js
├── package-lock.json
├── package.json
├── player.js                  // 大佬写的js音乐播放功能核心
├── raft-player.js
├── README.md
└── test.html
```

## 使用
```
npm install

npm run serve
```
