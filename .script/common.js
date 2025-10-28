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


// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadFooter();

});
