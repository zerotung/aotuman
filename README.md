# 煎蛋凹凸曼H5小游戏

## 项目介绍

本 H5 小游戏使用原生 JavaScript 进行代码编写。将怪兽、凹凸曼、子弹等进行模块化封装，通过 import 导入舞台中进行渲染。

`src/index.html` 作为静态基页，不同游戏页面通过 JavaScript 进行动态生成。

## 技术栈

- ES6 + Babel
- Gulp
- Sass

## 目录介绍

```
new-year-game
├─┬ dist  # 生产文件
│ ├── static  # 静态文件(css,img,js)
│ └── index.html  # 入口HTML
├── src  # 编写的源文件
├── node_modules  # npm安装的nodejs的模块包
├── gulpfile.js  # gulp配置文件
├── package.json  # npm配置文件
├── README.md  # 介绍文件
├── .gitignore  # git配置文件
└── .babelrc  # babel配置文件
```

## 使用方法

1. 使用 npm install 安装生产环境
2. 使用 npm run dev 进入开发环境
3. 使用 npm run build 将代码打包

