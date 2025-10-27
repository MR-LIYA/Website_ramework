1. 此页面内的所有网页中的链接都是通用的，统一使用common.css和common.js。
2. 链接使用.script中的link-card.js。
3. 如果想要调整背景图等，请在common.css中调整，调整后全局自动使用。
4.页面脚本如下（此脚本不需要特定的ip地址，只要修改```url: "http://www.baidu.com"```中的路径以及名称和后面的```image:"/.icon/图片名称（带后缀名）"```）：
```
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                setPageTitle('首页'); // 设置页面标题
                
                // 第一行链接数据
                const firstRowLinks = [
                    { text: "百度", url: "https://www.baidu.com", target: "_blank" }, //点击后在新标签页打开，链接没有图片
                ];

                // 其他行链接数据
                const otherLinks = [
                    { text: "百度", url: "https://www.baidu.com", image:"/.icon/图片名称（带后缀名）" }, //点击后在当前标签页打开，且链接带有图片
                ];

                // 生成链接
                appendLinks(firstRowLinks, 'firstRow');
                appendLinks(otherLinks, 'otherRows');
            }, 100);
        });
    </script>
```
