// 创建链接卡片的函数
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

// 使用文档片段批量创建 DOM 元素
function appendLinks(links, containerId) {
    const container = document.getElementById(containerId);
    const fragment = document.createDocumentFragment();
    links.forEach(link => {
        fragment.appendChild(createLinkCard(link));
    });
    container.appendChild(fragment);
}