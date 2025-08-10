// ==UserScript==
// @name         CCW 遮罩取消器
// @namespace    https://www.ccw.site/student/678cc9343778fc282d6252c5
// @homepage     https://www.ccw.site/student/678cc9343778fc282d6252c5
// @version      0.3.1
// @description  取消 CCW 遮罩，避免页面覆盖
// @author       Chen-Jin
// @match        https://*.ccw.site/*
// @icon         https://m.ccw.site/user_projects_assets/6df19377-8e84-4929-9e9c-93ddca968dcc.png
// @grant        none
// @updateURL    https://bgithub.xyz/Chen-Jin-1/User-Script/raw/refs/heads/main/ccwmask.user.js
// @downloadURL  https://bgithub.xyz/Chen-Jin-1/User-Script/raw/refs/heads/main/ccwmask.user.js
// ==/UserScript==

(function() {
    'use strict';

    const processedElements = new WeakSet();

    function processElement(element) {
        if (processedElements.has(element)) return;

        const style = window.getComputedStyle(element);
        if (style.position === 'fixed' && element.closest('.tui-editor-contents')) {
            element.style.position = '';
            element.style.zIndex = '';

            if (!element.nextElementSibling || !element.nextElementSibling.matches('.ccw-unmask-notice')) {
                const notice = document.createElement('div');
                notice.className = 'ccw-unmask-notice';
                notice.style.cssText = `
                    border-radius: 0.3rem;
                    background: white;
                    color: black;
                    width: fit-content;
                    padding: 0px 0.3rem;
                    transition-duration: 0.3s;
                    margin-top: 5px;
                `;
                notice.textContent = '已取消遮罩';
                notice.title = 'CCW 遮罩取消器 by Chen-Jin';

                notice.addEventListener('mouseover', () => {
                    notice.style.background = '#00aeff';
                });

                notice.addEventListener('mouseout', () => {
                    notice.style.background = 'white';
                });

                element.parentNode.insertBefore(notice, element.nextSibling);
            }

            processedElements.add(element);
        }
    }

    function initialScan() {
        document.querySelectorAll('*').forEach(element => {
            processElement(element);
        });
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processElement(node);
                    node.querySelectorAll('*').forEach(child => {
                        processElement(child);
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    initialScan();
})();
