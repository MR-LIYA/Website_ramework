<?php
if(isset($_GET['viewInfo'])){
    phpinfo();
}else{
    ?>
<html>
<head>
    <meta charset="UTF-8" meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=2.0,minimum-scale=1.0,user-scalable=no">
    <title>name</title>
    <link rel="icon" type="image/x-icon" href="url">
    <!-- 共通样式 -->
    <link rel="stylesheet" href="/.script/common.css">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="/.script/bootstrap.min.css">
</head>
<body>
    <!-- 内容区域（特有部分） -->
    <div class="content-wrapper">
        <div class="link-grid first-row" id="firstRow"></div>
        <div class="link-grid" id="otherRows"></div>
    </div>

    <!-- 共通脚本 -->
    <script src="/.script/common.js"></script>
    <script src="/.script/jquery.min.js"></script>
    <script src="/.script/popper.min.js"></script>
    <script src="/.script/bootstrap.min.js"></script>
    <!-- 页面特有脚本 -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                setPageTitle('name'); // 设置页面标题
                
                // 第一行链接数据
                const firstRowLinks = [
                    //{ text: "example01", url: "IP address (optional) / Folder where the web page is located / web page.html", target: "_blank" },
                ];

                // 其他行链接数据（适配8080端口路径）
                const otherLinks = [
                    //{ text: "", url: "" },
                ];

                // 生成链接
                appendLinks(firstRowLinks, 'firstRow');
                appendLinks(otherLinks, 'otherRows');
            }, 100);
        });
    </script>
</body>
</html>
<?php
}
?>
