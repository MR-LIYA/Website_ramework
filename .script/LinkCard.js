// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
	createVideoElement(); // 创建视频背景
	const router = new Router(); // 初始化路由

	function refreshLayout() {
		// 触发窗口大小变化事件，强制刷新布局
		window.dispatchEvent(new Event('resize'));
	}

	// 注册页面路由
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

	initMouseEffects(); // 初始化鼠标效果
	adjustContentPadding(); // 初始化内容区调整
	refreshLayout(); // 初始加载时刷新

	window.addEventListener('scroll', adjustContentPadding);
	window.addEventListener('resize', adjustContentPadding);
});
