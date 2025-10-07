// ==UserScript==
// @name                No Cookies
// @namespace           cj-no-cookies
// @match               *://*/*
// @grant               none
// @version             0.0.1
// @author              Chen-Jin
// @description         不显示 Cookies 窗口
// @icon                https://m.ccw.site/user_projects_assets/6df19377-8e84-4929-9e9c-93ddca968dcc.png
// @updateURL           https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/noCookies.user.js
// @downloadURL         https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/noCookies.user.js
// ==/UserScript==

var style = document.createElement('style');
style.innerHTML = '.LBktY > .GssDD, #cookieConsentContainer, .mw-cookiewarning-container {display: none !important;}';
document.head.appendChild(style);
