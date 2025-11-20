// 1. 路由系统
class Router {
	constructor() {
		this.routes = {};
		this.currentRoute = null;
		this.init();
		// setTimeout(() => this.handleHashChange(), 0);
		setTimeout(() => {
			// 如果没有哈希值，自动添加 #home
			if (!window.location.hash) {
				window.location.hash = 'home';
			} else {
				this.handleHashChange();
			}
		}, 0);
	}

	init() {
		// 监听哈希变化
		window.addEventListener('hashchange', () => this.handleHashChange());
		// 初始加载
		this.handleHashChange();
		// 绑定导航链接事件
		document.querySelectorAll('.nav-link').forEach(link => {
			link.addEventListener('click', (e) => {
				if (link.getAttribute('href').startsWith('mailto:')) return;
				e.preventDefault();
				const hash = link.getAttribute('href');
				window.location.hash = hash;
				// ------ 新增 （作用：不会在历史记录中新增条目，而是替换当前记录）-------
				// const routeName = hash.substring(1);
				// window.history.replaceState(null, '', hash); // 使用replaceState替换当前历史记录，而不是新增
				// this.handleHashChange(); // 手动触发路由处理
				// -------------------------- 结束 ---------------------------------
			});
		});
	}

	handleHashChange() {
		const hash = window.location.hash || '#home';
		const routeName = hash.substring(1);

		// 隐藏所有页面
		document.querySelectorAll('.page').forEach(page => {
			page.classList.remove('active');
		});

		// 显示当前页面
		const currentPage = document.getElementById(`${routeName}Page`);
		if (currentPage) {
			currentPage.classList.add('active');
			this.currentRoute = routeName;
			this.updatePageTitle(routeName);
			this.highlightNav(routeName);

			// 触发页面初始化
			if (this.routes[routeName] && typeof this.routes[routeName] === 'function') {
				this.routes[routeName]();
			}
		}
	}

	addRoute(name, callback) {
		this.routes[name] = callback;
	}

	updatePageTitle(routeName) {
		const titles = {
			'home': '首页',
			'about': '关于我们',
			'help': '帮助',
			'mail': '联系邮箱',
		};
		// 动态更新 <h1> 标签的内容
		const pageTitleElement = document.getElementById('pageTitle');
		if (pageTitleElement) {
			pageTitleElement.textContent = titles[routeName] || '首页';
		}
		// 同时也更新浏览器标签页的标题
		document.title = titles[routeName] || '首页';
	}

	highlightNav(routeName) {
		document.querySelectorAll('.nav-link').forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${routeName}`) {
				link.classList.add('active');
			}
		});
	}
}

// 2. 公共功能
let globalVideoElement = null;

function setPageTitle(title) {
	document.getElementById('pageTitle').textContent = title;
}

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

window.addEventListener('beforeunload', () => {
	if (globalVideoElement) {
		globalVideoElement.style.display = "none";
	}
});

// 3. 链接卡片功能
function createLinkCard(link) {
	const card = document.createElement('div');
	card.className = 'link-card';

	const anchor = document.createElement('a');
	anchor.href = link.url;
	anchor.textContent = link.text;

	if (link.target) {
		anchor.target = link.target;
	}

	if (link.url.startsWith('javascript:')) {
		anchor.onclick = function () {
			location.href = link.url.replace('javascript:void(0);', '');
			return false;
		};
	}

	card.appendChild(anchor);
	return card;
}

function appendLinks(links, containerId) {
	const container = document.getElementById(containerId);
	if (!container) return;

	// 清空容器
	container.innerHTML = '';

	const fragment = document.createDocumentFragment();
	links.forEach(link => {
		fragment.appendChild(createLinkCard(link));
	});
	container.appendChild(fragment);
}

// 4. 鼠标效果
function initMouseEffects() {
	const cards = document.querySelectorAll('.link-card');
	const cursorGlow = document.getElementById('cursor-glow');

	// 鼠标移动效果
	document.addEventListener('mousemove', (e) => {
		if (cursorGlow) {
			cursorGlow.style.left = `${e.clientX}px`;
			cursorGlow.style.top = `${e.clientY}px`;
		}
	});

	cards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;

			const lightIntensity = 0.6;
			const glowSize = 0.3;

			const leftGlow = Math.max(0, 1 - x / glowSize) * lightIntensity;
			const rightGlow = Math.max(0, (x - (1 - glowSize)) / glowSize) * lightIntensity;
			const topGlow = Math.max(0, 1 - y / glowSize) * lightIntensity;
			const bottomGlow = Math.max(0, (y - (1 - glowSize)) / glowSize) * lightIntensity;

			const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;
			const gradient = `
            conic-gradient(
                from ${angle - 45}deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, ${leftGlow}) ${(leftGlow * 100) + 30}%,
                rgba(255, 255, 255, ${topGlow}) ${(topGlow * 100) + 60}%,
                rgba(255, 255, 255, ${rightGlow}) ${(rightGlow * 100) + 120}%,
                rgba(255, 255, 255, ${bottomGlow}) ${(bottomGlow * 100) + 180}%,
                rgba(255, 255, 255, 0) 100%
            )
        `;

			const beforeElement = window.getComputedStyle(card, '::before');
			if (beforeElement) {
				card.style.setProperty('--edge-glow', gradient);
				card.style.setProperty('--before-background', gradient);
				// 实际项目中可能需要使用CSS变量配合伪元素
			}
		});

		card.addEventListener('mouseleave', () => {
			const beforeElement = window.getComputedStyle(card, '::before');
			if (beforeElement) {
				card.style.setProperty('--before-background', 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)');
			}
		});
	});
}

// 5. 内容区调整
function adjustContentPadding() {
	const footer = document.querySelector('footer');
	const contentWrapper = document.querySelector('.content-wrapper');
	if (footer && contentWrapper) {
		contentWrapper.style.paddingBottom = `${footer.offsetHeight + 20}px`;
	}
}

// 6. 自动布局计算
function initAutoLayout() {
	// 计算适合的网格列数
	function calculateGridColumns() {
		const container = document.querySelector('.content-wrapper');
		if (!container) return;

		const containerWidth = container.offsetWidth;
		const baseCardWidth = 180; // 基础卡片宽度
		const gap = 18; // 间距
		const maxColumns = 6; // 最大列数

		// 计算可容纳的列数
		let columns = Math.floor((containerWidth + gap) / (baseCardWidth + gap));
		return Math.min(Math.max(columns, 1), maxColumns);
	}

	// 应用网格布局
	function applyGridLayout() {
		const columns = calculateGridColumns();
		document.querySelectorAll('.link-grid').forEach(grid => {
			grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
		});
	}

	// 初始化布局
	applyGridLayout();

	// 监听窗口大小变化，动态调整布局
	window.addEventListener('resize', applyGridLayout);

	// 调整内容区高度
	function adjustContentHeight() {
		const header = document.querySelector('header');
		const nav = document.querySelector('nav');
		const footer = document.querySelector('footer');
		const contentWrapper = document.querySelector('.content-wrapper');

		if (header && nav && footer && contentWrapper) {
			const headerHeight = header.offsetHeight;
			const navHeight = nav.offsetHeight;
			const footerHeight = footer.offsetHeight;
			const totalOffset = headerHeight + navHeight + footerHeight + 40; // 40为额外间距

			contentWrapper.style.height = `calc(100vh - ${totalOffset}px)`;
		}
	}

	// 初始化高度
	adjustContentHeight();

	// 窗口大小变化时调整高度
	window.addEventListener('resize', adjustContentHeight);
}
