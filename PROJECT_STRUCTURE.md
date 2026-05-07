# 项目结构说明

当前先保持 `index.html`、`styles.css`、`script.js` 三个核心文件不拆分，因为首屏水面、入口动画、Services 滚动和作品画廊依赖执行顺序、后置 CSS 覆盖和共享状态。

## 现在怎么改

- 改视觉优先看 `styles.css` 里的分段注释。
- 改文案、作品分类、联系表单，优先看 `script.js` 前半部分和对应分段注释。
- 不要直接移动 `initWaterSurface`、`enterSite`、Hero wheel-step、Services scroll story 相关代码。
- 后续如果要拆文件，先做截图对照，再一次只拆一个低风险模块。

## 高风险冻结区

- 首屏入口和包装盒开启动画
- `hero-kinetic-canvas` / `initWaterSurface`
- Hero 滚轮分步浏览逻辑
- Services 白场滚动切换
- Work gallery 弹层、横向滚动和详情页

## 推荐后续顺序

1. 继续完善分段注释和重复覆盖说明。
2. 只抽离联系表单或作品数据这类低风险模块。
3. 补一个本地截图验证脚本。
4. 最后再做字体、视频和图片瘦身。