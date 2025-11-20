1. 此页面内的所有网页中的链接都是通用的，统一使用common.css和common.js。
2. 链接使用.script中的link-card.js。
3. 如果想要调整背景图等，请在common.js中调整，调整后全局自动使用,此页面使用动态背景图，通过以下内容中的```video.src = "/.icon/昔涟.mp4";```进行设置：
```
function createVideoElement() {
	if (globalVideoElement) return;
	const video = document.createElement('video');
	video.src = "/.icon/昔涟.mp4";
	video.autoplay = true;
	video.loop = true;
	video.muted = true;
	video.setAttribute('playsinline', true);
	video.classList.add('bg-video');
	document.body.appendChild(video);
	globalVideoElement = video;
}
```
4.以下内容为index.html中的内容，且相互对应，例如：```<div class="page" id="homePage">```中的id和```<div class="link-grid first-row" id="homeFirstRow"></div>```中的```id```对应```router.addRoute('home', ()```中的'home+Page'和```appendLinks(firstRowLinks, 'homeFirstRow');```中的```homeFirstRow```。
```
<div class="page" id="homePage">
    <div class="content-wrapper">
        <div class="link-grid first-row" id="homeFirstRow"></div>
        <div class="link-grid" id="homeOtherRows"></div>
    </div>
</div>
```
5.页面脚本如下（此脚本不需要特定的ip地址，只要修改```text: "百度"```和```url: "http://www.baidu.com"```中的名称和路径即可。页面使用了单页应用(SPA，Single Page Application)模式，所有页面均通过LinkCard.js保证页面内容，common.css和common.js保证页面样式：
```
router.addRoute('home', () => {
	// 首页链接数据
	const firstRowLinks = [
		{
			text: "工具",
			url: "#tool"
		},
	];

	const otherLinks = [
		{
			text: "百度",
			url: "http://www.baidu.com"
		},
	];
	appendLinks(firstRowLinks, 'homeFirstRow');
	appendLinks(otherLinks, 'homeOtherRows');
	refreshLayout(); // 添加这一行
});
```
6.除链接外请不要再LinkCard.js中写入。

