function playVideo() {
    var videoType = document.getElementById("videoType").value;
    var videoPlayer = document.getElementById("videoPlayer");
    var videoSource = document.createElement("source");

    if (videoType === "local") {
        var localVideo = document.getElementById("localVideo").files[0];
        if (localVideo) {
            var videoURL = URL.createObjectURL(localVideo);
            videoSource.setAttribute("src", videoURL);
            videoPlayer.innerHTML = "";
            videoPlayer.appendChild(videoSource);
            videoPlayer.load();
        } else {
            alert("请选择本地视频文件！");
        }
    } else if (videoType === "website") {
        var websiteVideo = document.getElementById("websiteVideo").value;
        if (websiteVideo) {
            videoSource.setAttribute("src", websiteVideo);
            videoPlayer.innerHTML = "";
            videoPlayer.appendChild(videoSource);
            videoPlayer.load();
        } else {
            alert("请输入网站视频链接！");
        }
    }
}

document.getElementById("videoType").addEventListener("change", function () {
    var videoType = this.value;
    if (videoType === "local") {
        document.getElementById("localVideoInput").style.display = "block";
        document.getElementById("websiteVideoInput").style.display = "none";
    } else if (videoType === "website") {
        document.getElementById("localVideoInput").style.display = "none";
        document.getElementById("websiteVideoInput").style.display = "block";
    }
});
