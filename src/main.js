import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// icon
import "./assets/icon/iconfont.css";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

// import * as Icons from '@element-plus/icons'
// // 全局引入icon图标 不推荐
// Object.keys(Icons).forEach(key => {
//     app.component(key, Icons[key])
//   })
