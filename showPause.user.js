// ==UserScript==
// @name                显示暂停
// @namespace           cj-show-pause
// @match               https://www.ccw.site/detail/*
// @grant               none
// @version             1.0.0
// @author              Chen-Jin
// @description         防止作品隐藏暂停按钮
// @icon                https://m.ccw.site/user_projects_assets/6df19377-8e84-4929-9e9c-93ddca968dcc.png
// @updateURL           https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/showPause.user.js
// @downloadURL         https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/showPause.user.js
// ==/UserScript==

var style = document.createElement('style');
style.innerHTML = '.action-item-P9SP6.action-control-8nmb9 {visibility: visible !important;}';
document.head.appendChild(style);
