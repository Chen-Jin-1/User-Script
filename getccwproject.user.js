// ==UserScript==
// @name         CCW 作品源码下载器
// @namespace    https://www.ccw.site/student/678cc9343778fc282d6252c5
// @homepage     https://www.ccw.site/student/678cc9343778fc282d6252c5
// @version      0.1.3
// @description  获取 CCW 作品源码
// @author       Chen-Jin
// @match        https://www.ccw.site/detail/*
// @match        https://www.ccw.site/player/*
// @icon         https://m.ccw.site/user_projects_assets/6df19377-8e84-4929-9e9c-93ddca968dcc.png
// @grant        none
// @updateURL    https://bgithub.xyz/Chen-Jin-1/User-Script/raw/refs/heads/main/getccwproject.user.js
// @downloadURL  https://bgithub.xyz/Chen-Jin-1/User-Script/raw/refs/heads/main/getccwproject.user.js
// ==/UserScript==

var vm = null;
var hasMoved = 0;
var box = document.createElement('div');
box.style.background = "#ffffff60";
box.style.position = "fixed"
box.style.bottom = "1rem";
box.style.left = "1rem";
box.style.borderRadius = "0.3rem";
box.style.backdropFilter = "blur(1rem)";
box.style.padding = "0.1rem 0.3rem";
box.style.userSelect = "none";
box.style.zIndex = "9999";
box.style.title = "CCW 作品源码下载器 by Chen-Jin";
box.innerText = "正在获取 Scratch vm.";
document.documentElement.appendChild(box);

function save(name) {
    vm.saveProjectSb3().then((content) => {
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.sb3`;
        a.click();
        URL.revokeObjectURL(url);
    }).catch((error) => {
        console.error('保存失败:', error);
        window.alert('保存失败');
    });
}


function main(){
    vm = window.Scratch.vm.runtime.extensionManager.vm;
    window.vm=vm;
    box.innerText = "点击下载";
    box.addEventListener("click", (e) => {
        if (!hasMoved) {
            var title = document.title.split(" - ")[0]
            if (title == "共创世界(ccw.site)") {
                title = "作品";
            }
            save(title);
        }
    })
}

function onMouseDrag(e) {
    e.preventDefault();
    hasMoved = true;
    let getContainerStyle = window.getComputedStyle(box);
    let leftValue = parseInt(getContainerStyle.left);
    let bottomValue = parseInt(getContainerStyle.bottom);
    box.style.left = `${leftValue + e.movementX}px`;
    box.style.bottom = `${bottomValue - e.movementY}px`;
}

box.addEventListener("mousedown", (e) => {
    e.preventDefault();
    hasMoved = false;
    document.addEventListener("mousemove", onMouseDrag);
    document.addEventListener("mouseup", () => {
        setTimeout(() => {
            hasMoved = false;
        }, 10);
        document.removeEventListener("mousemove", onMouseDrag);
    }, { once: true });
});

var getvm = setInterval(() => {
    if (window.Scratch?.vm) {
        clearInterval(getvm);
        main();
    } else {
        box.innerText = box.innerText === "正在获取 Scratch vm..."
            ? "正在获取 Scratch vm."
            : box.innerText + ".";
    }
},100)
