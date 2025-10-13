// 动态设置页面标题
function setPageTitle(title) {
    document.getElementById('pageTitle').textContent = title;
}

// 加载公共导航
function loadNav() {
    fetch('/.common/nav.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            //highlightCurrentNav(); // 高亮当前导航
        })
        .catch(error => console.error('加载导航失败:', error));
}

// 加载公共底部
function loadFooter() {
    fetch('/.common/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
        })
        .catch(error => console.error('加载底部失败:', error));
}

// 高亮当前页面对应的导航项
function highlightCurrentNav() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        const href = link.getAttribute('onclick') || '';
        if (href.includes(currentPath.split('/').pop())) {
            link.style.fontWeight = 'bold';
        }
    });
}

// 创建链接卡片
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

// 批量添加链接
function appendLinks(links, containerId) {
    const container = document.getElementById(containerId);
    const fragment = document.createDocumentFragment();
    links.forEach(link => {
        fragment.appendChild(createLinkCard(link));
    });
    container.appendChild(fragment);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadFooter();
});