// ==UserScript==
// @name                No Obstacles
// @namespace           cj-no-obstacles
// @match               *://*/*
// @grant               none
// @version             0.0.2
// @author              Chen-Jin
// @description         隐藏网页障碍
// @icon                https://m.ccw.site/user_projects_assets/6df19377-8e84-4929-9e9c-93ddca968dcc.png
// @updateURL           https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/noObstacles.user.js
// @downloadURL         https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/noObstacles.user.js
// ==/UserScript==

var style = document.createElement('style');
style.innerHTML = '.LBktY > .GssDD, #cookieConsentContainer, .mw-cookiewarning-container, #wcpConsentBannerCtrl, banner-3yTl4 {display: none !important;}';
document.head.appendChild(style);
