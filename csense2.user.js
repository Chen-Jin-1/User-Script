// ==UserScript==
// @name         CSense2
// @namespace    CSense2
// @version      0.1.3
// @license      CC0-1.0
// @downloadURL  https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/csense2.user.js
// @updateURL    https://bgithub.xyz/Chen-Jin-1/User-Scripts/raw/refs/heads/main/csense2.user.js
// @description  一个 CCW 安全审计工具
// @author       axolotl
// @match        https://www.ccw.site/*
// @icon         https://m.ccw.site/community/images/logo-ccw.png
// @grant        none
// @run-at       document-start
// ==/UserScript==
// 不想上学、Chen-Jin 修改版
// 此文件由 Chen-Jin 上传
// 2025-8-28

'use strict';

(() => {
  function A(n) {
    const T = Function.prototype.bind;
    Function.prototype.bind = function (o, ...J) {
      if (typeof o === "object" && o !== null && Object.prototype.hasOwnProperty.call(o, "editingTarget") && Object.prototype.hasOwnProperty.call(o, "runtime")) {
        Function.prototype.bind = T;
        n(o);
        return T.call(this, o, ...J);
      }
      return T.call(this, o, ...J);
    };
  }
  globalThis.__CSense_vm_trap = new Promise(A);
  var X = Object.create;
  var m = Object.defineProperty;
  var I = Object.getOwnPropertyDescriptor;
  var V = Object.getOwnPropertyNames;
  var E = Object.getPrototypeOf;
  var W = Object.prototype.hasOwnProperty;
  var C = (XP => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(XP, {
    get: (XF, Xq) => (typeof require !== "undefined" ? require : XF)[Xq]
  }) : XP)(function (XP) {
    if (typeof require !== "undefined") {
      return require.apply(this, arguments);
    }
    throw Error("Dynamic require of \"" + XP + "\" is not supported");
  });
  var K = (XP, XF) => () => {
    if (!XF) {
      XP((XF = {
        exports: {}
      }).exports, XF);
    }
    return XF.exports;
  };
  var U = (XP, XF, Xq, XS) => {
    if (XF && typeof XF == "object" || typeof XF == "function") {
      for (let m0 of V(XF)) {
        if (!W.call(XP, m0) && m0 !== Xq) {
          m(XP, m0, {
            get: () => XF[m0],
            enumerable: !(XS = I(XF, m0)) || XS.enumerable
          });
        }
      }
    }
    return XP;
  };
  var v = (XP, XF, Xq) => {
    Xq = XP != null ? X(E(XP)) : {};
    return U(XF || !XP || !XP.__esModule ? m(Xq, "default", {
      value: XP,
      enumerable: true
    }) : Xq, XP);
  };
  var M = K((XP, XF) => {
    'use strict';

    XF.exports = {
      options: {
        usePureJavaScript: false
      }
    };
  });
  var d = K((XP, XF) => {
    'use strict';

    var Xq = {};
    XF.exports = Xq;
    var XS = {};
    Xq.encode = function (m1, m2, m3) {
      if (typeof m2 != "string") {
        throw new TypeError("\"alphabet\" must be a string.");
      }
      if (m3 !== undefined && typeof m3 != "number") {
        throw new TypeError("\"maxline\" must be a number.");
      }
      var m4 = "";
      if (!(m1 instanceof Uint8Array)) {
        m4 = m0(m1, m2);
      } else {
        var m5 = 0;
        var m6 = m2.length;
        var m7 = m2.charAt(0);
        var m8 = [0];
        for (m5 = 0; m5 < m1.length; ++m5) {
          for (var m9 = 0, mX = m1[m5]; m9 < m8.length; ++m9) {
            mX += m8[m9] << 8;
            m8[m9] = mX % m6;
            mX = mX / m6 | 0;
          }
          while (mX > 0) {
            m8.push(mX % m6);
            mX = mX / m6 | 0;
          }
        }
        for (m5 = 0; m1[m5] === 0 && m5 < m1.length - 1; ++m5) {
          m4 += m7;
        }
        for (m5 = m8.length - 1; m5 >= 0; --m5) {
          m4 += m2[m8[m5]];
        }
      }
      if (m3) {
        var mm = new RegExp(".{1," + m3 + "}", "g");
        m4 = m4.match(mm).join("\r\n");
      }
      return m4;
    };
    Xq.decode = function (m1, m2) {
      if (typeof m1 != "string") {
        throw new TypeError("\"input\" must be a string.");
      }
      if (typeof m2 != "string") {
        throw new TypeError("\"alphabet\" must be a string.");
      }
      var m3 = XS[m2];
      if (!m3) {
        m3 = XS[m2] = [];
        for (var m4 = 0; m4 < m2.length; ++m4) {
          m3[m2.charCodeAt(m4)] = m4;
        }
      }
      m1 = m1.replace(/\s/g, "");
      var m5 = m2.length;
      var m6 = m2.charAt(0);
      var m7 = [0];
      for (var m4 = 0; m4 < m1.length; m4++) {
        var m8 = m3[m1.charCodeAt(m4)];
        if (m8 === undefined) {
          return;
        }
        for (var m9 = 0, mX = m8; m9 < m7.length; ++m9) {
          mX += m7[m9] * m5;
          m7[m9] = mX & 255;
          mX >>= 8;
        }
        while (mX > 0) {
          m7.push(mX & 255);
          mX >>= 8;
        }
      }
      for (var mm = 0; m1[mm] === m6 && mm < m1.length - 1; ++mm) {
        m7.push(0);
      }
      if (typeof Buffer !== "undefined") {
        return Buffer.from(m7.reverse());
      } else {
        return new Uint8Array(m7.reverse());
      }
    };
    function m0(m1, m2) {
      var m3 = 0;
      var m4 = m2.length;
      var m5 = m2.charAt(0);
      var m6 = [0];
      for (m3 = 0; m3 < m1.length(); ++m3) {
        for (var m7 = 0, m8 = m1.at(m3); m7 < m6.length; ++m7) {
          m8 += m6[m7] << 8;
          m6[m7] = m8 % m4;
          m8 = m8 / m4 | 0;
        }
        while (m8 > 0) {
          m6.push(m8 % m4);
          m8 = m8 / m4 | 0;
        }
      }
      var m9 = "";
      for (m3 = 0; m1.at(m3) === 0 && m3 < m1.length() - 1; ++m3) {
        m9 += m5;
      }
      for (m3 = m6.length - 1; m3 >= 0; --m3) {
        m9 += m2[m6[m3]];
      }
      return m9;
    }
  });
  var B = K((XP, XF) => {
    'use strict';

    var Xq = M();
    var XS = d();
    var m0 = XF.exports = Xq.util = Xq.util || {};
    (function () {
      if (typeof process !== "undefined" && process.nextTick && !process.browser) {
        m0.nextTick = process.nextTick;
        if (typeof setImmediate == "function") {
          m0.setImmediate = setImmediate;
        } else {
          m0.setImmediate = m0.nextTick;
        }
        return;
      }
      if (typeof setImmediate == "function") {
        m0.setImmediate = function () {
          return setImmediate.apply(undefined, arguments);
        };
        m0.nextTick = function (mM) {
          return setImmediate(mM);
        };
        return;
      }
      m0.setImmediate = function (mM) {
        setTimeout(mM, 0);
      };
      if (typeof window !== "undefined" && typeof window.postMessage == "function") {
        let mM = function (md) {
          if (md.source === window && md.data === mC) {
            md.stopPropagation();
            var mB = mH.slice();
            mH.length = 0;
            mB.forEach(function (ms) {
              ms();
            });
          }
        };
        var mW = mM;
        var mC = "forge.setImmediate";
        var mH = [];
        m0.setImmediate = function (md) {
          mH.push(md);
          if (mH.length === 1) {
            window.postMessage(mC, "*");
          }
        };
        window.addEventListener("message", mM, true);
      }
      if (typeof MutationObserver !== "undefined") {
        var me = Date.now();
        var mK = true;
        var mU = document.createElement("div");
        var mH = [];
        new MutationObserver(function () {
          var md = mH.slice();
          mH.length = 0;
          md.forEach(function (mB) {
            mB();
          });
        }).observe(mU, {
          attributes: true
        });
        var mv = m0.setImmediate;
        m0.setImmediate = function (md) {
          if (Date.now() - me > 15) {
            me = Date.now();
            mv(md);
          } else {
            mH.push(md);
            if (mH.length === 1) {
              mU.setAttribute("a", mK = !mK);
            }
          }
        };
      }
      m0.nextTick = m0.setImmediate;
    })();
    m0.isNodejs = typeof process !== "undefined" && process.versions && process.versions.node;
    m0.globalScope = function () {
      if (m0.isNodejs) {
        return global;
      } else if (typeof self === "undefined") {
        return window;
      } else {
        return self;
      }
    }();
    m0.isArray = Array.isArray || function (mW) {
      return Object.prototype.toString.call(mW) === "[object Array]";
    };
    m0.isArrayBuffer = function (mW) {
      return typeof ArrayBuffer !== "undefined" && mW instanceof ArrayBuffer;
    };
    m0.isArrayBufferView = function (mW) {
      return mW && m0.isArrayBuffer(mW.buffer) && mW.byteLength !== undefined;
    };
    function m1(mW) {
      if (mW !== 8 && mW !== 16 && mW !== 24 && mW !== 32) {
        throw new Error("Only 8, 16, 24, or 32 bits supported: " + mW);
      }
    }
    m0.ByteBuffer = m2;
    function m2(mW) {
      this.data = "";
      this.read = 0;
      if (typeof mW == "string") {
        this.data = mW;
      } else if (m0.isArrayBuffer(mW) || m0.isArrayBufferView(mW)) {
        if (typeof Buffer !== "undefined" && mW instanceof Buffer) {
          this.data = mW.toString("binary");
        } else {
          var mC = new Uint8Array(mW);
          try {
            this.data = String.fromCharCode.apply(null, mC);
          } catch {
            for (var mH = 0; mH < mC.length; ++mH) {
              this.putByte(mC[mH]);
            }
          }
        }
      } else if (mW instanceof m2 || typeof mW == "object" && typeof mW.data == "string" && typeof mW.read == "number") {
        this.data = mW.data;
        this.read = mW.read;
      }
      this._constructedStringLength = 0;
    }
    m0.ByteStringBuffer = m2;
    var m3 = 4096;
    m0.ByteStringBuffer.prototype._optimizeConstructedString = function (mW) {
      this._constructedStringLength += mW;
      if (this._constructedStringLength > m3) {
        this.data.substr(0, 1);
        this._constructedStringLength = 0;
      }
    };
    m0.ByteStringBuffer.prototype.length = function () {
      return this.data.length - this.read;
    };
    m0.ByteStringBuffer.prototype.isEmpty = function () {
      return this.length() <= 0;
    };
    m0.ByteStringBuffer.prototype.putByte = function (mW) {
      return this.putBytes(String.fromCharCode(mW));
    };
    m0.ByteStringBuffer.prototype.fillWithByte = function (mW, mC) {
      mW = String.fromCharCode(mW);
      var mH = this.data;
      for (; mC > 0;) {
        if (mC & 1) {
          mH += mW;
        }
        mC >>>= 1;
        if (mC > 0) {
          mW += mW;
        }
      }
      this.data = mH;
      this._optimizeConstructedString(mC);
      return this;
    };
    m0.ByteStringBuffer.prototype.putBytes = function (mW) {
      this.data += mW;
      this._optimizeConstructedString(mW.length);
      return this;
    };
    m0.ByteStringBuffer.prototype.putString = function (mW) {
      return this.putBytes(m0.encodeUtf8(mW));
    };
    m0.ByteStringBuffer.prototype.putInt16 = function (mW) {
      return this.putBytes(String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW & 255));
    };
    m0.ByteStringBuffer.prototype.putInt24 = function (mW) {
      return this.putBytes(String.fromCharCode(mW >> 16 & 255) + String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW & 255));
    };
    m0.ByteStringBuffer.prototype.putInt32 = function (mW) {
      return this.putBytes(String.fromCharCode(mW >> 24 & 255) + String.fromCharCode(mW >> 16 & 255) + String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW & 255));
    };
    m0.ByteStringBuffer.prototype.putInt16Le = function (mW) {
      return this.putBytes(String.fromCharCode(mW & 255) + String.fromCharCode(mW >> 8 & 255));
    };
    m0.ByteStringBuffer.prototype.putInt24Le = function (mW) {
      return this.putBytes(String.fromCharCode(mW & 255) + String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW >> 16 & 255));
    };
    m0.ByteStringBuffer.prototype.putInt32Le = function (mW) {
      return this.putBytes(String.fromCharCode(mW & 255) + String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW >> 16 & 255) + String.fromCharCode(mW >> 24 & 255));
    };
    m0.ByteStringBuffer.prototype.putInt = function (mW, mC) {
      m1(mC);
      var mH = "";
      do {
        mC -= 8;
        mH += String.fromCharCode(mW >> mC & 255);
      } while (mC > 0);
      return this.putBytes(mH);
    };
    m0.ByteStringBuffer.prototype.putSignedInt = function (mW, mC) {
      if (mW < 0) {
        mW += 2 << mC - 1;
      }
      return this.putInt(mW, mC);
    };
    m0.ByteStringBuffer.prototype.putBuffer = function (mW) {
      return this.putBytes(mW.getBytes());
    };
    m0.ByteStringBuffer.prototype.getByte = function () {
      return this.data.charCodeAt(this.read++);
    };
    m0.ByteStringBuffer.prototype.getInt16 = function () {
      var mW = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      this.read += 2;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt24 = function () {
      var mW = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      this.read += 3;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt32 = function () {
      var mW = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      this.read += 4;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt16Le = function () {
      var mW = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      this.read += 2;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt24Le = function () {
      var mW = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      this.read += 3;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt32Le = function () {
      var mW = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      this.read += 4;
      return mW;
    };
    m0.ByteStringBuffer.prototype.getInt = function (mW) {
      m1(mW);
      var mC = 0;
      do {
        mC = (mC << 8) + this.data.charCodeAt(this.read++);
        mW -= 8;
      } while (mW > 0);
      return mC;
    };
    m0.ByteStringBuffer.prototype.getSignedInt = function (mW) {
      var mC = this.getInt(mW);
      var mH = 2 << mW - 2;
      if (mC >= mH) {
        mC -= mH << 1;
      }
      return mC;
    };
    m0.ByteStringBuffer.prototype.getBytes = function (mW) {
      var mC;
      if (mW) {
        mW = Math.min(this.length(), mW);
        mC = this.data.slice(this.read, this.read + mW);
        this.read += mW;
      } else if (mW === 0) {
        mC = "";
      } else {
        mC = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return mC;
    };
    m0.ByteStringBuffer.prototype.bytes = function (mW) {
      if (typeof mW === "undefined") {
        return this.data.slice(this.read);
      } else {
        return this.data.slice(this.read, this.read + mW);
      }
    };
    m0.ByteStringBuffer.prototype.at = function (mW) {
      return this.data.charCodeAt(this.read + mW);
    };
    m0.ByteStringBuffer.prototype.setAt = function (mW, mC) {
      this.data = this.data.substr(0, this.read + mW) + String.fromCharCode(mC) + this.data.substr(this.read + mW + 1);
      return this;
    };
    m0.ByteStringBuffer.prototype.last = function () {
      return this.data.charCodeAt(this.data.length - 1);
    };
    m0.ByteStringBuffer.prototype.copy = function () {
      var mW = m0.createBuffer(this.data);
      mW.read = this.read;
      return mW;
    };
    m0.ByteStringBuffer.prototype.compact = function () {
      if (this.read > 0) {
        this.data = this.data.slice(this.read);
        this.read = 0;
      }
      return this;
    };
    m0.ByteStringBuffer.prototype.clear = function () {
      this.data = "";
      this.read = 0;
      return this;
    };
    m0.ByteStringBuffer.prototype.truncate = function (mW) {
      var mC = Math.max(0, this.length() - mW);
      this.data = this.data.substr(this.read, mC);
      this.read = 0;
      return this;
    };
    m0.ByteStringBuffer.prototype.toHex = function () {
      var mW = "";
      for (var mC = this.read; mC < this.data.length; ++mC) {
        var mH = this.data.charCodeAt(mC);
        if (mH < 16) {
          mW += "0";
        }
        mW += mH.toString(16);
      }
      return mW;
    };
    m0.ByteStringBuffer.prototype.toString = function () {
      return m0.decodeUtf8(this.bytes());
    };
    function m4(mW, mC) {
      mC = mC || {};
      this.read = mC.readOffset || 0;
      this.growSize = mC.growSize || 1024;
      var mH = m0.isArrayBuffer(mW);
      var me = m0.isArrayBufferView(mW);
      if (mH || me) {
        if (mH) {
          this.data = new DataView(mW);
        } else {
          this.data = new DataView(mW.buffer, mW.byteOffset, mW.byteLength);
        }
        this.write = "writeOffset" in mC ? mC.writeOffset : this.data.byteLength;
        return;
      }
      this.data = new DataView(new ArrayBuffer(0));
      this.write = 0;
      if (mW != null) {
        this.putBytes(mW);
      }
      if ("writeOffset" in mC) {
        this.write = mC.writeOffset;
      }
    }
    m0.DataBuffer = m4;
    m0.DataBuffer.prototype.length = function () {
      return this.write - this.read;
    };
    m0.DataBuffer.prototype.isEmpty = function () {
      return this.length() <= 0;
    };
    m0.DataBuffer.prototype.accommodate = function (mW, mC) {
      if (this.length() >= mW) {
        return this;
      }
      mC = Math.max(mC || this.growSize, mW);
      var mH = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength);
      var me = new Uint8Array(this.length() + mC);
      me.set(mH);
      this.data = new DataView(me.buffer);
      return this;
    };
    m0.DataBuffer.prototype.putByte = function (mW) {
      this.accommodate(1);
      this.data.setUint8(this.write++, mW);
      return this;
    };
    m0.DataBuffer.prototype.fillWithByte = function (mW, mC) {
      this.accommodate(mC);
      for (var mH = 0; mH < mC; ++mH) {
        this.data.setUint8(mW);
      }
      return this;
    };
    m0.DataBuffer.prototype.putBytes = function (mW, mC) {
      if (m0.isArrayBufferView(mW)) {
        var mH = new Uint8Array(mW.buffer, mW.byteOffset, mW.byteLength);
        var me = mH.byteLength - mH.byteOffset;
        this.accommodate(me);
        var mK = new Uint8Array(this.data.buffer, this.write);
        mK.set(mH);
        this.write += me;
        return this;
      }
      if (m0.isArrayBuffer(mW)) {
        var mH = new Uint8Array(mW);
        this.accommodate(mH.byteLength);
        var mK = new Uint8Array(this.data.buffer);
        mK.set(mH, this.write);
        this.write += mH.byteLength;
        return this;
      }
      if (mW instanceof m0.DataBuffer || typeof mW == "object" && typeof mW.read == "number" && typeof mW.write == "number" && m0.isArrayBufferView(mW.data)) {
        var mH = new Uint8Array(mW.data.byteLength, mW.read, mW.length());
        this.accommodate(mH.byteLength);
        var mK = new Uint8Array(mW.data.byteLength, this.write);
        mK.set(mH);
        this.write += mH.byteLength;
        return this;
      }
      if (mW instanceof m0.ByteStringBuffer) {
        mW = mW.data;
        mC = "binary";
      }
      mC = mC || "binary";
      if (typeof mW == "string") {
        var mU;
        if (mC === "hex") {
          this.accommodate(Math.ceil(mW.length / 2));
          mU = new Uint8Array(this.data.buffer, this.write);
          this.write += m0.binary.hex.decode(mW, mU, this.write);
          return this;
        }
        if (mC === "base64") {
          this.accommodate(Math.ceil(mW.length / 4) * 3);
          mU = new Uint8Array(this.data.buffer, this.write);
          this.write += m0.binary.base64.decode(mW, mU, this.write);
          return this;
        }
        if (mC === "utf8") {
          mW = m0.encodeUtf8(mW);
          mC = "binary";
        }
        if (mC === "binary" || mC === "raw") {
          this.accommodate(mW.length);
          mU = new Uint8Array(this.data.buffer, this.write);
          this.write += m0.binary.raw.decode(mU);
          return this;
        }
        if (mC === "utf16") {
          this.accommodate(mW.length * 2);
          mU = new Uint16Array(this.data.buffer, this.write);
          this.write += m0.text.utf16.encode(mU);
          return this;
        }
        throw new Error("Invalid encoding: " + mC);
      }
      throw Error("Invalid parameter: " + mW);
    };
    m0.DataBuffer.prototype.putBuffer = function (mW) {
      this.putBytes(mW);
      mW.clear();
      return this;
    };
    m0.DataBuffer.prototype.putString = function (mW) {
      return this.putBytes(mW, "utf16");
    };
    m0.DataBuffer.prototype.putInt16 = function (mW) {
      this.accommodate(2);
      this.data.setInt16(this.write, mW);
      this.write += 2;
      return this;
    };
    m0.DataBuffer.prototype.putInt24 = function (mW) {
      this.accommodate(3);
      this.data.setInt16(this.write, mW >> 8 & 65535);
      this.data.setInt8(this.write, mW >> 16 & 255);
      this.write += 3;
      return this;
    };
    m0.DataBuffer.prototype.putInt32 = function (mW) {
      this.accommodate(4);
      this.data.setInt32(this.write, mW);
      this.write += 4;
      return this;
    };
    m0.DataBuffer.prototype.putInt16Le = function (mW) {
      this.accommodate(2);
      this.data.setInt16(this.write, mW, true);
      this.write += 2;
      return this;
    };
    m0.DataBuffer.prototype.putInt24Le = function (mW) {
      this.accommodate(3);
      this.data.setInt8(this.write, mW >> 16 & 255);
      this.data.setInt16(this.write, mW >> 8 & 65535, true);
      this.write += 3;
      return this;
    };
    m0.DataBuffer.prototype.putInt32Le = function (mW) {
      this.accommodate(4);
      this.data.setInt32(this.write, mW, true);
      this.write += 4;
      return this;
    };
    m0.DataBuffer.prototype.putInt = function (mW, mC) {
      m1(mC);
      this.accommodate(mC / 8);
      do {
        mC -= 8;
        this.data.setInt8(this.write++, mW >> mC & 255);
      } while (mC > 0);
      return this;
    };
    m0.DataBuffer.prototype.putSignedInt = function (mW, mC) {
      m1(mC);
      this.accommodate(mC / 8);
      if (mW < 0) {
        mW += 2 << mC - 1;
      }
      return this.putInt(mW, mC);
    };
    m0.DataBuffer.prototype.getByte = function () {
      return this.data.getInt8(this.read++);
    };
    m0.DataBuffer.prototype.getInt16 = function () {
      var mW = this.data.getInt16(this.read);
      this.read += 2;
      return mW;
    };
    m0.DataBuffer.prototype.getInt24 = function () {
      var mW = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
      this.read += 3;
      return mW;
    };
    m0.DataBuffer.prototype.getInt32 = function () {
      var mW = this.data.getInt32(this.read);
      this.read += 4;
      return mW;
    };
    m0.DataBuffer.prototype.getInt16Le = function () {
      var mW = this.data.getInt16(this.read, true);
      this.read += 2;
      return mW;
    };
    m0.DataBuffer.prototype.getInt24Le = function () {
      var mW = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, true) << 8;
      this.read += 3;
      return mW;
    };
    m0.DataBuffer.prototype.getInt32Le = function () {
      var mW = this.data.getInt32(this.read, true);
      this.read += 4;
      return mW;
    };
    m0.DataBuffer.prototype.getInt = function (mW) {
      m1(mW);
      var mC = 0;
      do {
        mC = (mC << 8) + this.data.getInt8(this.read++);
        mW -= 8;
      } while (mW > 0);
      return mC;
    };
    m0.DataBuffer.prototype.getSignedInt = function (mW) {
      var mC = this.getInt(mW);
      var mH = 2 << mW - 2;
      if (mC >= mH) {
        mC -= mH << 1;
      }
      return mC;
    };
    m0.DataBuffer.prototype.getBytes = function (mW) {
      var mC;
      if (mW) {
        mW = Math.min(this.length(), mW);
        mC = this.data.slice(this.read, this.read + mW);
        this.read += mW;
      } else if (mW === 0) {
        mC = "";
      } else {
        mC = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return mC;
    };
    m0.DataBuffer.prototype.bytes = function (mW) {
      if (typeof mW === "undefined") {
        return this.data.slice(this.read);
      } else {
        return this.data.slice(this.read, this.read + mW);
      }
    };
    m0.DataBuffer.prototype.at = function (mW) {
      return this.data.getUint8(this.read + mW);
    };
    m0.DataBuffer.prototype.setAt = function (mW, mC) {
      this.data.setUint8(mW, mC);
      return this;
    };
    m0.DataBuffer.prototype.last = function () {
      return this.data.getUint8(this.write - 1);
    };
    m0.DataBuffer.prototype.copy = function () {
      return new m0.DataBuffer(this);
    };
    m0.DataBuffer.prototype.compact = function () {
      if (this.read > 0) {
        var mW = new Uint8Array(this.data.buffer, this.read);
        var mC = new Uint8Array(mW.byteLength);
        mC.set(mW);
        this.data = new DataView(mC);
        this.write -= this.read;
        this.read = 0;
      }
      return this;
    };
    m0.DataBuffer.prototype.clear = function () {
      this.data = new DataView(new ArrayBuffer(0));
      this.read = this.write = 0;
      return this;
    };
    m0.DataBuffer.prototype.truncate = function (mW) {
      this.write = Math.max(0, this.length() - mW);
      this.read = Math.min(this.read, this.write);
      return this;
    };
    m0.DataBuffer.prototype.toHex = function () {
      var mW = "";
      for (var mC = this.read; mC < this.data.byteLength; ++mC) {
        var mH = this.data.getUint8(mC);
        if (mH < 16) {
          mW += "0";
        }
        mW += mH.toString(16);
      }
      return mW;
    };
    m0.DataBuffer.prototype.toString = function (mW) {
      var mC = new Uint8Array(this.data, this.read, this.length());
      mW = mW || "utf8";
      if (mW === "binary" || mW === "raw") {
        return m0.binary.raw.encode(mC);
      }
      if (mW === "hex") {
        return m0.binary.hex.encode(mC);
      }
      if (mW === "base64") {
        return m0.binary.base64.encode(mC);
      }
      if (mW === "utf8") {
        return m0.text.utf8.decode(mC);
      }
      if (mW === "utf16") {
        return m0.text.utf16.decode(mC);
      }
      throw new Error("Invalid encoding: " + mW);
    };
    m0.createBuffer = function (mW, mC) {
      mC = mC || "raw";
      if (mW !== undefined && mC === "utf8") {
        mW = m0.encodeUtf8(mW);
      }
      return new m0.ByteBuffer(mW);
    };
    m0.fillString = function (mW, mC) {
      var mH = "";
      for (; mC > 0;) {
        if (mC & 1) {
          mH += mW;
        }
        mC >>>= 1;
        if (mC > 0) {
          mW += mW;
        }
      }
      return mH;
    };
    m0.xorBytes = function (mW, mC, mH) {
      var me = "";
      var mK = "";
      var mU = "";
      for (var mv = 0, mM = 0; mH > 0; --mH, ++mv) {
        mK = mW.charCodeAt(mv) ^ mC.charCodeAt(mv);
        if (mM >= 10) {
          me += mU;
          mU = "";
          mM = 0;
        }
        mU += String.fromCharCode(mK);
        ++mM;
      }
      me += mU;
      return me;
    };
    m0.hexToBytes = function (mW) {
      var mC = "";
      var mH = 0;
      for (mW.length & true && (mH = 1, mC += String.fromCharCode(parseInt(mW[0], 16))); mH < mW.length; mH += 2) {
        mC += String.fromCharCode(parseInt(mW.substr(mH, 2), 16));
      }
      return mC;
    };
    m0.bytesToHex = function (mW) {
      return m0.createBuffer(mW).toHex();
    };
    m0.int32ToBytes = function (mW) {
      return String.fromCharCode(mW >> 24 & 255) + String.fromCharCode(mW >> 16 & 255) + String.fromCharCode(mW >> 8 & 255) + String.fromCharCode(mW & 255);
    };
    var m5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var m6 = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    var m7 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    m0.encode64 = function (mW, mC) {
      for (var mH = "", me = "", mK, mU, mv, mM = 0; mM < mW.length;) {
        mK = mW.charCodeAt(mM++);
        mU = mW.charCodeAt(mM++);
        mv = mW.charCodeAt(mM++);
        mH += m5.charAt(mK >> 2);
        mH += m5.charAt((mK & 3) << 4 | mU >> 4);
        if (isNaN(mU)) {
          mH += "==";
        } else {
          mH += m5.charAt((mU & 15) << 2 | mv >> 6);
          mH += isNaN(mv) ? "=" : m5.charAt(mv & 63);
        }
        if (mC && mH.length > mC) {
          me += mH.substr(0, mC) + "\r\n";
          mH = mH.substr(mC);
        }
      }
      me += mH;
      return me;
    };
    m0.decode64 = function (mW) {
      mW = mW.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      for (var mC = "", mH, me, mK, mU, mv = 0; mv < mW.length;) {
        mH = m6[mW.charCodeAt(mv++) - 43];
        me = m6[mW.charCodeAt(mv++) - 43];
        mK = m6[mW.charCodeAt(mv++) - 43];
        mU = m6[mW.charCodeAt(mv++) - 43];
        mC += String.fromCharCode(mH << 2 | me >> 4);
        if (mK !== 64) {
          mC += String.fromCharCode((me & 15) << 4 | mK >> 2);
          if (mU !== 64) {
            mC += String.fromCharCode((mK & 3) << 6 | mU);
          }
        }
      }
      return mC;
    };
    m0.encodeUtf8 = function (mW) {
      return unescape(encodeURIComponent(mW));
    };
    m0.decodeUtf8 = function (mW) {
      return decodeURIComponent(escape(mW));
    };
    m0.binary = {
      raw: {},
      hex: {},
      base64: {},
      base58: {},
      baseN: {
        encode: XS.encode,
        decode: XS.decode
      }
    };
    m0.binary.raw.encode = function (mW) {
      return String.fromCharCode.apply(null, mW);
    };
    m0.binary.raw.decode = function (mW, mC, mH) {
      var me = mC;
      me ||= new Uint8Array(mW.length);
      mH = mH || 0;
      var mK = mH;
      for (var mU = 0; mU < mW.length; ++mU) {
        me[mK++] = mW.charCodeAt(mU);
      }
      if (mC) {
        return mK - mH;
      } else {
        return me;
      }
    };
    m0.binary.hex.encode = m0.bytesToHex;
    m0.binary.hex.decode = function (mW, mC, mH) {
      var me = mC;
      me ||= new Uint8Array(Math.ceil(mW.length / 2));
      mH = mH || 0;
      var mK = 0;
      var mU = mH;
      for (mW.length & 1 && (mK = 1, me[mU++] = parseInt(mW[0], 16)); mK < mW.length; mK += 2) {
        me[mU++] = parseInt(mW.substr(mK, 2), 16);
      }
      if (mC) {
        return mU - mH;
      } else {
        return me;
      }
    };
    m0.binary.base64.encode = function (mW, mC) {
      for (var mH = "", me = "", mK, mU, mv, mM = 0; mM < mW.byteLength;) {
        mK = mW[mM++];
        mU = mW[mM++];
        mv = mW[mM++];
        mH += m5.charAt(mK >> 2);
        mH += m5.charAt((mK & 3) << 4 | mU >> 4);
        if (isNaN(mU)) {
          mH += "==";
        } else {
          mH += m5.charAt((mU & 15) << 2 | mv >> 6);
          mH += isNaN(mv) ? "=" : m5.charAt(mv & 63);
        }
        if (mC && mH.length > mC) {
          me += mH.substr(0, mC) + "\r\n";
          mH = mH.substr(mC);
        }
      }
      me += mH;
      return me;
    };
    m0.binary.base64.decode = function (mW, mC, mH) {
      var me = mC;
      me ||= new Uint8Array(Math.ceil(mW.length / 4) * 3);
      mW = mW.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      mH = mH || 0;
      var mK;
      var mU;
      var mv;
      var mM;
      for (var md = 0, mB = mH; md < mW.length;) {
        mK = m6[mW.charCodeAt(md++) - 43];
        mU = m6[mW.charCodeAt(md++) - 43];
        mv = m6[mW.charCodeAt(md++) - 43];
        mM = m6[mW.charCodeAt(md++) - 43];
        me[mB++] = mK << 2 | mU >> 4;
        if (mv !== 64) {
          me[mB++] = (mU & 15) << 4 | mv >> 2;
          if (mM !== 64) {
            me[mB++] = (mv & 3) << 6 | mM;
          }
        }
      }
      if (mC) {
        return mB - mH;
      } else {
        return me.subarray(0, mB);
      }
    };
    m0.binary.base58.encode = function (mW, mC) {
      return m0.binary.baseN.encode(mW, m7, mC);
    };
    m0.binary.base58.decode = function (mW, mC) {
      return m0.binary.baseN.decode(mW, m7, mC);
    };
    m0.text = {
      utf8: {},
      utf16: {}
    };
    m0.text.utf8.encode = function (mW, mC, mH) {
      mW = m0.encodeUtf8(mW);
      var me = mC;
      me ||= new Uint8Array(mW.length);
      mH = mH || 0;
      var mK = mH;
      for (var mU = 0; mU < mW.length; ++mU) {
        me[mK++] = mW.charCodeAt(mU);
      }
      if (mC) {
        return mK - mH;
      } else {
        return me;
      }
    };
    m0.text.utf8.decode = function (mW) {
      return m0.decodeUtf8(String.fromCharCode.apply(null, mW));
    };
    m0.text.utf16.encode = function (mW, mC, mH) {
      var me = mC;
      me ||= new Uint8Array(mW.length * 2);
      var mK = new Uint16Array(me.buffer);
      mH = mH || 0;
      var mU = mH;
      var mv = mH;
      for (var mM = 0; mM < mW.length; ++mM) {
        mK[mv++] = mW.charCodeAt(mM);
        mU += 2;
      }
      if (mC) {
        return mU - mH;
      } else {
        return me;
      }
    };
    m0.text.utf16.decode = function (mW) {
      return String.fromCharCode.apply(null, new Uint16Array(mW.buffer));
    };
    m0.deflate = function (mW, mC, mH) {
      mC = m0.decode64(mW.deflate(m0.encode64(mC)).rval);
      if (mH) {
        var me = 2;
        var mK = mC.charCodeAt(1);
        if (mK & 32) {
          me = 6;
        }
        mC = mC.substring(me, mC.length - 4);
      }
      return mC;
    };
    m0.inflate = function (mW, mC, mH) {
      var me = mW.inflate(m0.encode64(mC)).rval;
      if (me === null) {
        return null;
      } else {
        return m0.decode64(me);
      }
    };
    function m8(mW, mC, mH) {
      if (!mW) {
        throw new Error("WebStorage not available.");
      }
      var me;
      if (mH === null) {
        me = mW.removeItem(mC);
      } else {
        mH = m0.encode64(JSON.stringify(mH));
        me = mW.setItem(mC, mH);
      }
      if (typeof me !== "undefined" && me.rval !== true) {
        var mK = new Error(me.error.message);
        mK.id = me.error.id;
        mK.name = me.error.name;
        throw mK;
      }
    }
    function m9(mW, mC) {
      if (!mW) {
        throw new Error("WebStorage not available.");
      }
      var mH = mW.getItem(mC);
      if (mW.init) {
        if (mH.rval === null) {
          if (mH.error) {
            var me = new Error(mH.error.message);
            me.id = mH.error.id;
            me.name = mH.error.name;
            throw me;
          }
          mH = null;
        } else {
          mH = mH.rval;
        }
      }
      if (mH !== null) {
        mH = JSON.parse(m0.decode64(mH));
      }
      return mH;
    }
    function mX(mW, mC, mH, me) {
      var mK = m9(mW, mC);
      if (mK === null) {
        mK = {};
      }
      mK[mH] = me;
      m8(mW, mC, mK);
    }
    function mm(mW, mC, mH) {
      var me = m9(mW, mC);
      if (me !== null) {
        me = mH in me ? me[mH] : null;
      }
      return me;
    }
    function mI(mW, mC, mH) {
      var me = m9(mW, mC);
      if (me !== null && mH in me) {
        delete me[mH];
        var mK = true;
        for (var mU in me) {
          mK = false;
          break;
        }
        if (mK) {
          me = null;
        }
        m8(mW, mC, me);
      }
    }
    function mV(mW, mC) {
      m8(mW, mC, null);
    }
    function mE(mW, mC, mH) {
      var me = null;
      if (typeof mH === "undefined") {
        mH = ["web", "flash"];
      }
      var mK;
      var mU = false;
      var mv = null;
      for (var mM in mH) {
        mK = mH[mM];
        try {
          if (mK === "flash" || mK === "both") {
            if (mC[0] === null) {
              throw new Error("Flash local storage not available.");
            }
            me = mW.apply(this, mC);
            mU = mK === "flash";
          }
          if (mK === "web" || mK === "both") {
            mC[0] = localStorage;
            me = mW.apply(this, mC);
            mU = true;
          }
        } catch (md) {
          mv = md;
        }
        if (mU) {
          break;
        }
      }
      if (!mU) {
        throw mv;
      }
      return me;
    }
    m0.setItem = function (mW, mC, mH, me, mK) {
      mE(mX, arguments, mK);
    };
    m0.getItem = function (mW, mC, mH, me) {
      return mE(mm, arguments, me);
    };
    m0.removeItem = function (mW, mC, mH, me) {
      mE(mI, arguments, me);
    };
    m0.clearItems = function (mW, mC, mH) {
      mE(mV, arguments, mH);
    };
    m0.isEmpty = function (mW) {
      for (var mC in mW) {
        if (mW.hasOwnProperty(mC)) {
          return false;
        }
      }
      return true;
    };
    m0.format = function (mW) {
      for (var mC = /%./g, mH, me, mK = 0, mU = [], mv = 0; mH = mC.exec(mW);) {
        me = mW.substring(mv, mC.lastIndex - 2);
        if (me.length > 0) {
          mU.push(me);
        }
        mv = mC.lastIndex;
        var mM = mH[0][1];
        switch (mM) {
          case "s":
          case "o":
            if (mK < arguments.length) {
              mU.push(arguments[mK++ + 1]);
            } else {
              mU.push("<?>");
            }
            break;
          case "%":
            mU.push("%");
            break;
          default:
            mU.push("<%" + mM + "?>");
        }
      }
      mU.push(mW.substring(mv));
      return mU.join("");
    };
    m0.formatNumber = function (mW, mC, mH, me) {
      var mK = mW;
      var mU = isNaN(mC = Math.abs(mC)) ? 2 : mC;
      var mv = mH === undefined ? "," : mH;
      var mM = me === undefined ? "." : me;
      var md = mK < 0 ? "-" : "";
      var mB = parseInt(mK = Math.abs(+mK || 0).toFixed(mU), 10) + "";
      var ms = mB.length > 3 ? mB.length % 3 : 0;
      return md + (ms ? mB.substr(0, ms) + mM : "") + mB.substr(ms).replace(/(\d{3})(?=\d)/g, "$1" + mM) + (mU ? mv + Math.abs(mK - mB).toFixed(mU).slice(2) : "");
    };
    m0.formatSize = function (mW) {
      if (mW >= 1073741824) {
        mW = m0.formatNumber(mW / 1073741824, 2, ".", "") + " GiB";
      } else if (mW >= 1048576) {
        mW = m0.formatNumber(mW / 1048576, 2, ".", "") + " MiB";
      } else if (mW >= 1024) {
        mW = m0.formatNumber(mW / 1024, 0) + " KiB";
      } else {
        mW = m0.formatNumber(mW, 0) + " bytes";
      }
      return mW;
    };
    m0.bytesFromIP = function (mW) {
      if (mW.indexOf(".") !== -1) {
        return m0.bytesFromIPv4(mW);
      } else if (mW.indexOf(":") !== -1) {
        return m0.bytesFromIPv6(mW);
      } else {
        return null;
      }
    };
    m0.bytesFromIPv4 = function (mW) {
      mW = mW.split(".");
      if (mW.length !== 4) {
        return null;
      }
      var mC = m0.createBuffer();
      for (var mH = 0; mH < mW.length; ++mH) {
        var me = parseInt(mW[mH], 10);
        if (isNaN(me)) {
          return null;
        }
        mC.putByte(me);
      }
      return mC.getBytes();
    };
    m0.bytesFromIPv6 = function (mW) {
      var mC = 0;
      mW = mW.split(":").filter(function (mv) {
        if (mv.length === 0) {
          ++mC;
        }
        return true;
      });
      var mH = (8 - mW.length + mC) * 2;
      var me = m0.createBuffer();
      for (var mK = 0; mK < 8; ++mK) {
        if (!mW[mK] || mW[mK].length === 0) {
          me.fillWithByte(0, mH);
          mH = 0;
          continue;
        }
        var mU = m0.hexToBytes(mW[mK]);
        if (mU.length < 2) {
          me.putByte(0);
        }
        me.putBytes(mU);
      }
      return me.getBytes();
    };
    m0.bytesToIP = function (mW) {
      if (mW.length === 4) {
        return m0.bytesToIPv4(mW);
      } else if (mW.length === 16) {
        return m0.bytesToIPv6(mW);
      } else {
        return null;
      }
    };
    m0.bytesToIPv4 = function (mW) {
      if (mW.length !== 4) {
        return null;
      }
      var mC = [];
      for (var mH = 0; mH < mW.length; ++mH) {
        mC.push(mW.charCodeAt(mH));
      }
      return mC.join(".");
    };
    m0.bytesToIPv6 = function (mW) {
      if (mW.length !== 16) {
        return null;
      }
      var mC = [];
      var mH = [];
      var me = 0;
      for (var mK = 0; mK < mW.length; mK += 2) {
        for (var mU = m0.bytesToHex(mW[mK] + mW[mK + 1]); mU[0] === "0" && mU !== "0";) {
          mU = mU.substr(1);
        }
        if (mU === "0") {
          var mv = mH[mH.length - 1];
          var mM = mC.length;
          if (!mv || mM !== mv.end + 1) {
            mH.push({
              start: mM,
              end: mM
            });
          } else {
            mv.end = mM;
            if (mv.end - mv.start > mH[me].end - mH[me].start) {
              me = mH.length - 1;
            }
          }
        }
        mC.push(mU);
      }
      if (mH.length > 0) {
        var md = mH[me];
        if (md.end - md.start > 0) {
          mC.splice(md.start, md.end - md.start + 1, "");
          if (md.start === 0) {
            mC.unshift("");
          }
          if (md.end === 7) {
            mC.push("");
          }
        }
      }
      return mC.join(":");
    };
    m0.estimateCores = function (mW, mC) {
      if (typeof mW == "function") {
        mC = mW;
        mW = {};
      }
      mW = mW || {};
      if ("cores" in m0 && !mW.update) {
        return mC(null, m0.cores);
      }
      if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) {
        m0.cores = navigator.hardwareConcurrency;
        return mC(null, m0.cores);
      }
      if (typeof Worker === "undefined") {
        m0.cores = 1;
        return mC(null, m0.cores);
      }
      if (typeof Blob === "undefined") {
        m0.cores = 2;
        return mC(null, m0.cores);
      }
      var mH = URL.createObjectURL(new Blob(["(", function () {
        self.addEventListener("message", function (mv) {
          var mM = Date.now();
          for (var md = mM + 4; Date.now() < md;);
          self.postMessage({
            st: mM,
            et: md
          });
        });
      }.toString(), ")()"], {
        type: "application/javascript"
      }));
      me([], 5, 16);
      function me(mv, mM, md) {
        if (mM === 0) {
          var mB = Math.floor(mv.reduce(function (ms, mA) {
            return ms + mA;
          }, 0) / mv.length);
          m0.cores = Math.max(1, mB);
          URL.revokeObjectURL(mH);
          return mC(null, m0.cores);
        }
        mK(md, function (ms, mA) {
          mv.push(mU(md, mA));
          me(mv, mM - 1, md);
        });
      }
      function mK(mv, mM) {
        var md = [];
        var mB = [];
        for (var ms = 0; ms < mv; ++ms) {
          var mA = new Worker(mH);
          mA.addEventListener("message", function (mG) {
            mB.push(mG.data);
            if (mB.length === mv) {
              for (var mf = 0; mf < mv; ++mf) {
                md[mf].terminate();
              }
              mM(null, mB);
            }
          });
          md.push(mA);
        }
        for (var ms = 0; ms < mv; ++ms) {
          md[ms].postMessage(ms);
        }
      }
      function mU(mv, mM) {
        var md = [];
        for (var mB = 0; mB < mv; ++mB) {
          var ms = mM[mB];
          var mA = md[mB] = [];
          for (var mG = 0; mG < mv; ++mG) {
            if (mB !== mG) {
              var mf = mM[mG];
              if (ms.st > mf.st && ms.st < mf.et || mf.st > ms.st && mf.st < ms.et) {
                mA.push(mG);
              }
            }
          }
        }
        return md.reduce(function (mb, mT) {
          return Math.max(mb, mT.length);
        }, 0);
      }
    };
  });
  var s = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    XF.exports = Xq.cipher = Xq.cipher || {};
    Xq.cipher.algorithms = Xq.cipher.algorithms || {};
    Xq.cipher.createCipher = function (m0, m1) {
      var m2 = m0;
      if (typeof m2 == "string") {
        m2 = Xq.cipher.getAlgorithm(m2);
        m2 &&= m2();
      }
      if (!m2) {
        throw new Error("Unsupported algorithm: " + m0);
      }
      return new Xq.cipher.BlockCipher({
        algorithm: m2,
        key: m1,
        decrypt: false
      });
    };
    Xq.cipher.createDecipher = function (m0, m1) {
      var m2 = m0;
      if (typeof m2 == "string") {
        m2 = Xq.cipher.getAlgorithm(m2);
        m2 &&= m2();
      }
      if (!m2) {
        throw new Error("Unsupported algorithm: " + m0);
      }
      return new Xq.cipher.BlockCipher({
        algorithm: m2,
        key: m1,
        decrypt: true
      });
    };
    Xq.cipher.registerAlgorithm = function (m0, m1) {
      m0 = m0.toUpperCase();
      Xq.cipher.algorithms[m0] = m1;
    };
    Xq.cipher.getAlgorithm = function (m0) {
      m0 = m0.toUpperCase();
      if (m0 in Xq.cipher.algorithms) {
        return Xq.cipher.algorithms[m0];
      } else {
        return null;
      }
    };
    var XS = Xq.cipher.BlockCipher = function (m0) {
      this.algorithm = m0.algorithm;
      this.mode = this.algorithm.mode;
      this.blockSize = this.mode.blockSize;
      this._finish = false;
      this._input = null;
      this.output = null;
      this._op = m0.decrypt ? this.mode.decrypt : this.mode.encrypt;
      this._decrypt = m0.decrypt;
      this.algorithm.initialize(m0);
    };
    XS.prototype.start = function (m0) {
      m0 = m0 || {};
      var m1 = {};
      for (var m2 in m0) {
        m1[m2] = m0[m2];
      }
      m1.decrypt = this._decrypt;
      this._finish = false;
      this._input = Xq.util.createBuffer();
      this.output = m0.output || Xq.util.createBuffer();
      this.mode.start(m1);
    };
    XS.prototype.update = function (m0) {
      for (m0 && this._input.putBuffer(m0); !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish;);
      this._input.compact();
    };
    XS.prototype.finish = function (m0) {
      if (m0 && (this.mode.name === "ECB" || this.mode.name === "CBC")) {
        this.mode.pad = function (m2) {
          return m0(this.blockSize, m2, false);
        };
        this.mode.unpad = function (m2) {
          return m0(this.blockSize, m2, true);
        };
      }
      var m1 = {
        decrypt: this._decrypt
      };
      m1.overflow = this._input.length() % this.blockSize;
      return (!!this._decrypt || !this.mode.pad || !!this.mode.pad(this._input, m1)) && !(this._finish = true, this.update(), this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, m1)) && (!this.mode.afterFinish || !!this.mode.afterFinish(this.output, m1));
    };
  });
  var A = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    Xq.cipher = Xq.cipher || {};
    var XS = XF.exports = Xq.cipher.modes = Xq.cipher.modes || {};
    XS.ecb = function (m3) {
      m3 = m3 || {};
      this.name = "ECB";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    XS.ecb.prototype.start = function (m3) { };
    XS.ecb.prototype.encrypt = function (m3, m4, m5) {
      if (m3.length() < this.blockSize && (!m5 || !(m3.length() > 0))) {
        return true;
      }
      for (var m6 = 0; m6 < this._ints; ++m6) {
        this._inBlock[m6] = m3.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var m6 = 0; m6 < this._ints; ++m6) {
        m4.putInt32(this._outBlock[m6]);
      }
    };
    XS.ecb.prototype.decrypt = function (m3, m4, m5) {
      if (m3.length() < this.blockSize && (!m5 || !(m3.length() > 0))) {
        return true;
      }
      for (var m6 = 0; m6 < this._ints; ++m6) {
        this._inBlock[m6] = m3.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var m6 = 0; m6 < this._ints; ++m6) {
        m4.putInt32(this._outBlock[m6]);
      }
    };
    XS.ecb.prototype.pad = function (m3, m4) {
      var m5 = m3.length() === this.blockSize ? this.blockSize : this.blockSize - m3.length();
      m3.fillWithByte(m5, m5);
      return true;
    };
    XS.ecb.prototype.unpad = function (m3, m4) {
      if (m4.overflow > 0) {
        return false;
      }
      var m5 = m3.length();
      var m6 = m3.at(m5 - 1);
      if (m6 > this.blockSize << 2) {
        return false;
      } else {
        m3.truncate(m6);
        return true;
      }
    };
    XS.cbc = function (m3) {
      m3 = m3 || {};
      this.name = "CBC";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    XS.cbc.prototype.start = function (m3) {
      if (m3.iv === null) {
        if (!this._prev) {
          throw new Error("Invalid IV parameter.");
        }
        this._iv = this._prev.slice(0);
      } else if ("iv" in m3) {
        this._iv = m0(m3.iv, this.blockSize);
        this._prev = this._iv.slice(0);
      } else {
        throw new Error("Invalid IV parameter.");
      }
    };
    XS.cbc.prototype.encrypt = function (m3, m4, m5) {
      if (m3.length() < this.blockSize && (!m5 || !(m3.length() > 0))) {
        return true;
      }
      for (var m6 = 0; m6 < this._ints; ++m6) {
        this._inBlock[m6] = this._prev[m6] ^ m3.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var m6 = 0; m6 < this._ints; ++m6) {
        m4.putInt32(this._outBlock[m6]);
      }
      this._prev = this._outBlock;
    };
    XS.cbc.prototype.decrypt = function (m3, m4, m5) {
      if (m3.length() < this.blockSize && (!m5 || !(m3.length() > 0))) {
        return true;
      }
      for (var m6 = 0; m6 < this._ints; ++m6) {
        this._inBlock[m6] = m3.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var m6 = 0; m6 < this._ints; ++m6) {
        m4.putInt32(this._prev[m6] ^ this._outBlock[m6]);
      }
      this._prev = this._inBlock.slice(0);
    };
    XS.cbc.prototype.pad = function (m3, m4) {
      var m5 = m3.length() === this.blockSize ? this.blockSize : this.blockSize - m3.length();
      m3.fillWithByte(m5, m5);
      return true;
    };
    XS.cbc.prototype.unpad = function (m3, m4) {
      if (m4.overflow > 0) {
        return false;
      }
      var m5 = m3.length();
      var m6 = m3.at(m5 - 1);
      if (m6 > this.blockSize << 2) {
        return false;
      } else {
        m3.truncate(m6);
        return true;
      }
    };
    XS.cfb = function (m3) {
      m3 = m3 || {};
      this.name = "CFB";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialBlock = new Array(this._ints);
      this._partialOutput = Xq.util.createBuffer();
      this._partialBytes = 0;
    };
    XS.cfb.prototype.start = function (m3) {
      if (!("iv" in m3)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = m0(m3.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    XS.cfb.prototype.encrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m6 === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && m6 >= this.blockSize) {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._inBlock[m7] = m3.getInt32() ^ this._outBlock[m7];
          m4.putInt32(this._inBlock[m7]);
        }
        return;
      }
      var m8 = (this.blockSize - m6) % this.blockSize;
      if (m8 > 0) {
        m8 = this.blockSize - m8;
      }
      this._partialOutput.clear();
      for (var m7 = 0; m7 < this._ints; ++m7) {
        this._partialBlock[m7] = m3.getInt32() ^ this._outBlock[m7];
        this._partialOutput.putInt32(this._partialBlock[m7]);
      }
      if (m8 > 0) {
        m3.read -= this.blockSize;
      } else {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._inBlock[m7] = this._partialBlock[m7];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (m8 > 0 && !m5) {
        m4.putBytes(this._partialOutput.getBytes(m8 - this._partialBytes));
        this._partialBytes = m8;
        return true;
      }
      m4.putBytes(this._partialOutput.getBytes(m6 - this._partialBytes));
      this._partialBytes = 0;
    };
    XS.cfb.prototype.decrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m6 === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && m6 >= this.blockSize) {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._inBlock[m7] = m3.getInt32();
          m4.putInt32(this._inBlock[m7] ^ this._outBlock[m7]);
        }
        return;
      }
      var m8 = (this.blockSize - m6) % this.blockSize;
      if (m8 > 0) {
        m8 = this.blockSize - m8;
      }
      this._partialOutput.clear();
      for (var m7 = 0; m7 < this._ints; ++m7) {
        this._partialBlock[m7] = m3.getInt32();
        this._partialOutput.putInt32(this._partialBlock[m7] ^ this._outBlock[m7]);
      }
      if (m8 > 0) {
        m3.read -= this.blockSize;
      } else {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._inBlock[m7] = this._partialBlock[m7];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (m8 > 0 && !m5) {
        m4.putBytes(this._partialOutput.getBytes(m8 - this._partialBytes));
        this._partialBytes = m8;
        return true;
      }
      m4.putBytes(this._partialOutput.getBytes(m6 - this._partialBytes));
      this._partialBytes = 0;
    };
    XS.ofb = function (m3) {
      m3 = m3 || {};
      this.name = "OFB";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = Xq.util.createBuffer();
      this._partialBytes = 0;
    };
    XS.ofb.prototype.start = function (m3) {
      if (!("iv" in m3)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = m0(m3.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    XS.ofb.prototype.encrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m3.length() === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && m6 >= this.blockSize) {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          m4.putInt32(m3.getInt32() ^ this._outBlock[m7]);
          this._inBlock[m7] = this._outBlock[m7];
        }
        return;
      }
      var m8 = (this.blockSize - m6) % this.blockSize;
      if (m8 > 0) {
        m8 = this.blockSize - m8;
      }
      this._partialOutput.clear();
      for (var m7 = 0; m7 < this._ints; ++m7) {
        this._partialOutput.putInt32(m3.getInt32() ^ this._outBlock[m7]);
      }
      if (m8 > 0) {
        m3.read -= this.blockSize;
      } else {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._inBlock[m7] = this._outBlock[m7];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (m8 > 0 && !m5) {
        m4.putBytes(this._partialOutput.getBytes(m8 - this._partialBytes));
        this._partialBytes = m8;
        return true;
      }
      m4.putBytes(this._partialOutput.getBytes(m6 - this._partialBytes));
      this._partialBytes = 0;
    };
    XS.ofb.prototype.decrypt = XS.ofb.prototype.encrypt;
    XS.ctr = function (m3) {
      m3 = m3 || {};
      this.name = "CTR";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = Xq.util.createBuffer();
      this._partialBytes = 0;
    };
    XS.ctr.prototype.start = function (m3) {
      if (!("iv" in m3)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = m0(m3.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    XS.ctr.prototype.encrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m6 === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && m6 >= this.blockSize) {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          m4.putInt32(m3.getInt32() ^ this._outBlock[m7]);
        }
      } else {
        var m8 = (this.blockSize - m6) % this.blockSize;
        if (m8 > 0) {
          m8 = this.blockSize - m8;
        }
        this._partialOutput.clear();
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._partialOutput.putInt32(m3.getInt32() ^ this._outBlock[m7]);
        }
        if (m8 > 0) {
          m3.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (m8 > 0 && !m5) {
          m4.putBytes(this._partialOutput.getBytes(m8 - this._partialBytes));
          this._partialBytes = m8;
          return true;
        }
        m4.putBytes(this._partialOutput.getBytes(m6 - this._partialBytes));
        this._partialBytes = 0;
      }
      m1(this._inBlock);
    };
    XS.ctr.prototype.decrypt = XS.ctr.prototype.encrypt;
    XS.gcm = function (m3) {
      m3 = m3 || {};
      this.name = "GCM";
      this.cipher = m3.cipher;
      this.blockSize = m3.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
      this._partialOutput = Xq.util.createBuffer();
      this._partialBytes = 0;
      this._R = 3774873600;
    };
    XS.gcm.prototype.start = function (m3) {
      if (!("iv" in m3)) {
        throw new Error("Invalid IV parameter.");
      }
      var m4 = Xq.util.createBuffer(m3.iv);
      this._cipherLength = 0;
      var m5;
      if ("additionalData" in m3) {
        m5 = Xq.util.createBuffer(m3.additionalData);
      } else {
        m5 = Xq.util.createBuffer();
      }
      if ("tagLength" in m3) {
        this._tagLength = m3.tagLength;
      } else {
        this._tagLength = 128;
      }
      this._tag = null;
      if (m3.decrypt && (this._tag = Xq.util.createBuffer(m3.tag).getBytes(), this._tag.length !== this._tagLength / 8)) {
        throw new Error("Authentication tag does not match tag length.");
      }
      this._hashBlock = new Array(this._ints);
      this.tag = null;
      this._hashSubkey = new Array(this._ints);
      this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey);
      this.componentBits = 4;
      this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
      var m6 = m4.length();
      if (m6 === 12) {
        this._j0 = [m4.getInt32(), m4.getInt32(), m4.getInt32(), 1];
      } else {
        for (this._j0 = [0, 0, 0, 0]; m4.length() > 0;) {
          this._j0 = this.ghash(this._hashSubkey, this._j0, [m4.getInt32(), m4.getInt32(), m4.getInt32(), m4.getInt32()]);
        }
        this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(m2(m6 * 8)));
      }
      this._inBlock = this._j0.slice(0);
      m1(this._inBlock);
      this._partialBytes = 0;
      m5 = Xq.util.createBuffer(m5);
      this._aDataLength = m2(m5.length() * 8);
      var m7 = m5.length() % this.blockSize;
      if (m7) {
        m5.fillWithByte(0, this.blockSize - m7);
      }
      this._s = [0, 0, 0, 0];
      while (m5.length() > 0) {
        this._s = this.ghash(this._hashSubkey, this._s, [m5.getInt32(), m5.getInt32(), m5.getInt32(), m5.getInt32()]);
      }
    };
    XS.gcm.prototype.encrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m6 === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && m6 >= this.blockSize) {
        for (var m7 = 0; m7 < this._ints; ++m7) {
          m4.putInt32(this._outBlock[m7] ^= m3.getInt32());
        }
        this._cipherLength += this.blockSize;
      } else {
        var m8 = (this.blockSize - m6) % this.blockSize;
        if (m8 > 0) {
          m8 = this.blockSize - m8;
        }
        this._partialOutput.clear();
        for (var m7 = 0; m7 < this._ints; ++m7) {
          this._partialOutput.putInt32(m3.getInt32() ^ this._outBlock[m7]);
        }
        if (m8 <= 0 || m5) {
          if (m5) {
            var m9 = m6 % this.blockSize;
            this._cipherLength += m9;
            this._partialOutput.truncate(this.blockSize - m9);
          } else {
            this._cipherLength += this.blockSize;
          }
          for (var m7 = 0; m7 < this._ints; ++m7) {
            this._outBlock[m7] = this._partialOutput.getInt32();
          }
          this._partialOutput.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (m8 > 0 && !m5) {
          m3.read -= this.blockSize;
          m4.putBytes(this._partialOutput.getBytes(m8 - this._partialBytes));
          this._partialBytes = m8;
          return true;
        }
        m4.putBytes(this._partialOutput.getBytes(m6 - this._partialBytes));
        this._partialBytes = 0;
      }
      this._s = this.ghash(this._hashSubkey, this._s, this._outBlock);
      m1(this._inBlock);
    };
    XS.gcm.prototype.decrypt = function (m3, m4, m5) {
      var m6 = m3.length();
      if (m6 < this.blockSize && (!m5 || !(m6 > 0))) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      m1(this._inBlock);
      this._hashBlock[0] = m3.getInt32();
      this._hashBlock[1] = m3.getInt32();
      this._hashBlock[2] = m3.getInt32();
      this._hashBlock[3] = m3.getInt32();
      this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
      for (var m7 = 0; m7 < this._ints; ++m7) {
        m4.putInt32(this._outBlock[m7] ^ this._hashBlock[m7]);
      }
      if (m6 < this.blockSize) {
        this._cipherLength += m6 % this.blockSize;
      } else {
        this._cipherLength += this.blockSize;
      }
    };
    XS.gcm.prototype.afterFinish = function (m3, m4) {
      var m5 = true;
      if (m4.decrypt && m4.overflow) {
        m3.truncate(this.blockSize - m4.overflow);
      }
      this.tag = Xq.util.createBuffer();
      var m6 = this._aDataLength.concat(m2(this._cipherLength * 8));
      this._s = this.ghash(this._hashSubkey, this._s, m6);
      var m7 = [];
      this.cipher.encrypt(this._j0, m7);
      for (var m8 = 0; m8 < this._ints; ++m8) {
        this.tag.putInt32(this._s[m8] ^ m7[m8]);
      }
      this.tag.truncate(this.tag.length() % (this._tagLength / 8));
      if (m4.decrypt && this.tag.bytes() !== this._tag) {
        m5 = false;
      }
      return m5;
    };
    XS.gcm.prototype.multiply = function (m3, m4) {
      var m5 = [0, 0, 0, 0];
      var m6 = m4.slice(0);
      for (var m7 = 0; m7 < 128; ++m7) {
        var m8 = m3[m7 / 32 | 0] & 1 << 31 - m7 % 32;
        if (m8) {
          m5[0] ^= m6[0];
          m5[1] ^= m6[1];
          m5[2] ^= m6[2];
          m5[3] ^= m6[3];
        }
        this.pow(m6, m6);
      }
      return m5;
    };
    XS.gcm.prototype.pow = function (m3, m4) {
      var m5 = m3[3] & 1;
      for (var m6 = 3; m6 > 0; --m6) {
        m4[m6] = m3[m6] >>> 1 | (m3[m6 - 1] & 1) << 31;
      }
      m4[0] = m3[0] >>> 1;
      if (m5) {
        m4[0] ^= this._R;
      }
    };
    XS.gcm.prototype.tableMultiply = function (m3) {
      var m4 = [0, 0, 0, 0];
      for (var m5 = 0; m5 < 32; ++m5) {
        var m6 = m5 / 8 | 0;
        var m7 = m3[m6] >>> (7 - m5 % 8) * 4 & 15;
        var m8 = this._m[m5][m7];
        m4[0] ^= m8[0];
        m4[1] ^= m8[1];
        m4[2] ^= m8[2];
        m4[3] ^= m8[3];
      }
      return m4;
    };
    XS.gcm.prototype.ghash = function (m3, m4, m5) {
      m4[0] ^= m5[0];
      m4[1] ^= m5[1];
      m4[2] ^= m5[2];
      m4[3] ^= m5[3];
      return this.tableMultiply(m4);
    };
    XS.gcm.prototype.generateHashTable = function (m3, m4) {
      var m5 = 8 / m4;
      var m6 = m5 * 4;
      for (var m7 = m5 * 16, m8 = new Array(m7), m9 = 0; m9 < m7; ++m9) {
        var mX = [0, 0, 0, 0];
        var mm = m9 / m6 | 0;
        var mI = (m6 - 1 - m9 % m6) * m4;
        mX[mm] = 1 << m4 - 1 << mI;
        m8[m9] = this.generateSubHashTable(this.multiply(mX, m3), m4);
      }
      return m8;
    };
    XS.gcm.prototype.generateSubHashTable = function (m3, m4) {
      var m5 = 1 << m4;
      var m6 = m5 >>> 1;
      var m7 = new Array(m5);
      m7[m6] = m3.slice(0);
      for (var m8 = m6 >>> 1; m8 > 0;) {
        this.pow(m7[m8 * 2], m7[m8] = []);
        m8 >>= 1;
      }
      for (m8 = 2; m8 < m6;) {
        for (var m9 = 1; m9 < m8; ++m9) {
          var mX = m7[m8];
          var mm = m7[m9];
          m7[m8 + m9] = [mX[0] ^ mm[0], mX[1] ^ mm[1], mX[2] ^ mm[2], mX[3] ^ mm[3]];
        }
        m8 *= 2;
      }
      m7[0] = [0, 0, 0, 0];
      m8 = m6 + 1;
      for (; m8 < m5; ++m8) {
        var mI = m7[m8 ^ m6];
        m7[m8] = [m3[0] ^ mI[0], m3[1] ^ mI[1], m3[2] ^ mI[2], m3[3] ^ mI[3]];
      }
      return m7;
    };
    function m0(m3, m4) {
      if (typeof m3 == "string") {
        m3 = Xq.util.createBuffer(m3);
      }
      if (Xq.util.isArray(m3) && m3.length > 4) {
        var m5 = m3;
        m3 = Xq.util.createBuffer();
        for (var m6 = 0; m6 < m5.length; ++m6) {
          m3.putByte(m5[m6]);
        }
      }
      if (m3.length() < m4) {
        throw new Error("Invalid IV length; got " + m3.length() + " bytes and expected " + m4 + " bytes.");
      }
      if (!Xq.util.isArray(m3)) {
        var m7 = [];
        for (var m8 = m4 / 4, m6 = 0; m6 < m8; ++m6) {
          m7.push(m3.getInt32());
        }
        m3 = m7;
      }
      return m3;
    }
    function m1(m3) {
      m3[m3.length - 1] = m3[m3.length - 1] + 1 & -1;
    }
    function m2(m3) {
      return [m3 / 4294967296 | 0, m3 & -1];
    }
  });
  var G = K((XP, XF) => {
    'use strict';

    var Xq = M();
    s();
    A();
    B();
    XF.exports = Xq.aes = Xq.aes || {};
    Xq.aes.startEncrypting = function (mm, mI, mV, mE) {
      var mW = mX({
        key: mm,
        output: mV,
        decrypt: false,
        mode: mE
      });
      mW.start(mI);
      return mW;
    };
    Xq.aes.createEncryptionCipher = function (mm, mI) {
      return mX({
        key: mm,
        output: null,
        decrypt: false,
        mode: mI
      });
    };
    Xq.aes.startDecrypting = function (mm, mI, mV, mE) {
      var mW = mX({
        key: mm,
        output: mV,
        decrypt: true,
        mode: mE
      });
      mW.start(mI);
      return mW;
    };
    Xq.aes.createDecryptionCipher = function (mm, mI) {
      return mX({
        key: mm,
        output: null,
        decrypt: true,
        mode: mI
      });
    };
    Xq.aes.Algorithm = function (mm, mI) {
      if (!m0) {
        m7();
      }
      var mV = this;
      mV.name = mm;
      mV.mode = new mI({
        blockSize: 16,
        cipher: {
          encrypt: function (mE, mW) {
            return m9(mV._w, mE, mW, false);
          },
          decrypt: function (mE, mW) {
            return m9(mV._w, mE, mW, true);
          }
        }
      });
      mV._init = false;
    };
    Xq.aes.Algorithm.prototype.initialize = function (mm) {
      if (!this._init) {
        var mI = mm.key;
        var mV;
        if (typeof mI == "string" && (mI.length === 16 || mI.length === 24 || mI.length === 32)) {
          mI = Xq.util.createBuffer(mI);
        } else if (Xq.util.isArray(mI) && (mI.length === 16 || mI.length === 24 || mI.length === 32)) {
          mV = mI;
          mI = Xq.util.createBuffer();
          for (var mE = 0; mE < mV.length; ++mE) {
            mI.putByte(mV[mE]);
          }
        }
        if (!Xq.util.isArray(mI)) {
          mV = mI;
          mI = [];
          var mW = mV.length();
          if (mW === 16 || mW === 24 || mW === 32) {
            mW = mW >>> 2;
            for (var mE = 0; mE < mW; ++mE) {
              mI.push(mV.getInt32());
            }
          }
        }
        if (!Xq.util.isArray(mI) || mI.length !== 4 && mI.length !== 6 && mI.length !== 8) {
          throw new Error("Invalid key parameter.");
        }
        var mC = this.mode.name;
        var mH = ["CFB", "OFB", "CTR", "GCM"].indexOf(mC) !== -1;
        this._w = m8(mI, mm.decrypt && !mH);
        this._init = true;
      }
    };
    Xq.aes._expandKey = function (mm, mI) {
      if (!m0) {
        m7();
      }
      return m8(mm, mI);
    };
    Xq.aes._updateBlock = m9;
    XS("AES-ECB", Xq.cipher.modes.ecb);
    XS("AES-CBC", Xq.cipher.modes.cbc);
    XS("AES-CFB", Xq.cipher.modes.cfb);
    XS("AES-OFB", Xq.cipher.modes.ofb);
    XS("AES-CTR", Xq.cipher.modes.ctr);
    XS("AES-GCM", Xq.cipher.modes.gcm);
    function XS(mm, mI) {
      function mV() {
        return new Xq.aes.Algorithm(mm, mI);
      }
      Xq.cipher.registerAlgorithm(mm, mV);
    }
    var m0 = false;
    var m1 = 4;
    var m2;
    var m3;
    var m4;
    var m5;
    var m6;
    function m7() {
      m0 = true;
      m4 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var mm = new Array(256);
      for (var mI = 0; mI < 128; ++mI) {
        mm[mI] = mI << 1;
        mm[mI + 128] = mI + 128 << 1 ^ 283;
      }
      m2 = new Array(256);
      m3 = new Array(256);
      m5 = new Array(4);
      m6 = new Array(4);
      for (var mI = 0; mI < 4; ++mI) {
        m5[mI] = new Array(256);
        m6[mI] = new Array(256);
      }
      var mV = 0;
      var mE = 0;
      var mW;
      var mC;
      var mH;
      var me;
      var mK;
      var mU;
      var mv;
      for (var mI = 0; mI < 256; ++mI) {
        me = mE ^ mE << 1 ^ mE << 2 ^ mE << 3 ^ mE << 4;
        me = me >> 8 ^ me & 255 ^ 99;
        m2[mV] = me;
        m3[me] = mV;
        mK = mm[me];
        mW = mm[mV];
        mC = mm[mW];
        mH = mm[mC];
        mU = mK << 24 ^ me << 16 ^ me << 8 ^ (me ^ mK);
        mv = (mW ^ mC ^ mH) << 24 ^ (mV ^ mH) << 16 ^ (mV ^ mC ^ mH) << 8 ^ (mV ^ mW ^ mH);
        for (var mM = 0; mM < 4; ++mM) {
          m5[mM][mV] = mU;
          m6[mM][me] = mv;
          mU = mU << 24 | mU >>> 8;
          mv = mv << 24 | mv >>> 8;
        }
        if (mV === 0) {
          mV = mE = 1;
        } else {
          mV = mW ^ mm[mm[mm[mW ^ mH]]];
          mE ^= mm[mm[mE]];
        }
      }
    }
    function m8(mm, mI) {
      var mV = mm.slice(0);
      var mE;
      var mW = 1;
      var mC = mV.length;
      var mH = mC + 6 + 1;
      for (var me = m1 * mH, mK = mC; mK < me; ++mK) {
        mE = mV[mK - 1];
        if (mK % mC === 0) {
          mE = m2[mE >>> 16 & 255] << 24 ^ m2[mE >>> 8 & 255] << 16 ^ m2[mE & 255] << 8 ^ m2[mE >>> 24] ^ m4[mW] << 24;
          mW++;
        } else if (mC > 6 && mK % mC === 4) {
          mE = m2[mE >>> 24] << 24 ^ m2[mE >>> 16 & 255] << 16 ^ m2[mE >>> 8 & 255] << 8 ^ m2[mE & 255];
        }
        mV[mK] = mV[mK - mC] ^ mE;
      }
      if (mI) {
        var mU;
        var mv = m6[0];
        var mM = m6[1];
        var md = m6[2];
        var mB = m6[3];
        var ms = mV.slice(0);
        me = mV.length;
        for (var mK = 0, mA = me - m1; mK < me; mK += m1, mA -= m1) {
          if (mK === 0 || mK === me - m1) {
            ms[mK] = mV[mA];
            ms[mK + 1] = mV[mA + 3];
            ms[mK + 2] = mV[mA + 2];
            ms[mK + 3] = mV[mA + 1];
          } else {
            for (var mG = 0; mG < m1; ++mG) {
              mU = mV[mA + mG];
              ms[mK + (-mG & 3)] = mv[m2[mU >>> 24]] ^ mM[m2[mU >>> 16 & 255]] ^ md[m2[mU >>> 8 & 255]] ^ mB[m2[mU & 255]];
            }
          }
        }
        mV = ms;
      }
      return mV;
    }
    function m9(mm, mI, mV, mE) {
      var mW = mm.length / 4 - 1;
      var mC;
      var mH;
      var me;
      var mK;
      var mU;
      if (mE) {
        mC = m6[0];
        mH = m6[1];
        me = m6[2];
        mK = m6[3];
        mU = m3;
      } else {
        mC = m5[0];
        mH = m5[1];
        me = m5[2];
        mK = m5[3];
        mU = m2;
      }
      var mv;
      var mM;
      var md;
      var mB;
      var ms;
      var mA;
      var mG;
      mv = mI[0] ^ mm[0];
      mM = mI[mE ? 3 : 1] ^ mm[1];
      md = mI[2] ^ mm[2];
      mB = mI[mE ? 1 : 3] ^ mm[3];
      var mf = 3;
      for (var mb = 1; mb < mW; ++mb) {
        ms = mC[mv >>> 24] ^ mH[mM >>> 16 & 255] ^ me[md >>> 8 & 255] ^ mK[mB & 255] ^ mm[++mf];
        mA = mC[mM >>> 24] ^ mH[md >>> 16 & 255] ^ me[mB >>> 8 & 255] ^ mK[mv & 255] ^ mm[++mf];
        mG = mC[md >>> 24] ^ mH[mB >>> 16 & 255] ^ me[mv >>> 8 & 255] ^ mK[mM & 255] ^ mm[++mf];
        mB = mC[mB >>> 24] ^ mH[mv >>> 16 & 255] ^ me[mM >>> 8 & 255] ^ mK[md & 255] ^ mm[++mf];
        mv = ms;
        mM = mA;
        md = mG;
      }
      mV[0] = mU[mv >>> 24] << 24 ^ mU[mM >>> 16 & 255] << 16 ^ mU[md >>> 8 & 255] << 8 ^ mU[mB & 255] ^ mm[++mf];
      mV[mE ? 3 : 1] = mU[mM >>> 24] << 24 ^ mU[md >>> 16 & 255] << 16 ^ mU[mB >>> 8 & 255] << 8 ^ mU[mv & 255] ^ mm[++mf];
      mV[2] = mU[md >>> 24] << 24 ^ mU[mB >>> 16 & 255] << 16 ^ mU[mv >>> 8 & 255] << 8 ^ mU[mM & 255] ^ mm[++mf];
      mV[mE ? 1 : 3] = mU[mB >>> 24] << 24 ^ mU[mv >>> 16 & 255] << 16 ^ mU[mM >>> 8 & 255] << 8 ^ mU[md & 255] ^ mm[++mf];
    }
    function mX(mm) {
      mm = mm || {};
      var mI = (mm.mode || "CBC").toUpperCase();
      var mV = "AES-" + mI;
      var mE;
      if (mm.decrypt) {
        mE = Xq.cipher.createDecipher(mV, mm.key);
      } else {
        mE = Xq.cipher.createCipher(mV, mm.key);
      }
      var mW = mE.start;
      mE.start = function (mC, mH) {
        var me = null;
        if (mH instanceof Xq.util.ByteBuffer) {
          me = mH;
          mH = {};
        }
        mH = mH || {};
        mH.output = me;
        mH.iv = mC;
        mW.call(mE, mH);
      };
      return mE;
    }
  });
  var f = K((XP, XF) => {
    'use strict';

    var Xq = M();
    Xq.pki = Xq.pki || {};
    var XS = XF.exports = Xq.pki.oids = Xq.oids = Xq.oids || {};
    function m0(m2, m3) {
      XS[m2] = m3;
      XS[m3] = m2;
    }
    function m1(m2, m3) {
      XS[m2] = m3;
    }
    m0("1.2.840.113549.1.1.1", "rsaEncryption");
    m0("1.2.840.113549.1.1.4", "md5WithRSAEncryption");
    m0("1.2.840.113549.1.1.5", "sha1WithRSAEncryption");
    m0("1.2.840.113549.1.1.7", "RSAES-OAEP");
    m0("1.2.840.113549.1.1.8", "mgf1");
    m0("1.2.840.113549.1.1.9", "pSpecified");
    m0("1.2.840.113549.1.1.10", "RSASSA-PSS");
    m0("1.2.840.113549.1.1.11", "sha256WithRSAEncryption");
    m0("1.2.840.113549.1.1.12", "sha384WithRSAEncryption");
    m0("1.2.840.113549.1.1.13", "sha512WithRSAEncryption");
    m0("1.3.101.112", "EdDSA25519");
    m0("1.2.840.10040.4.3", "dsa-with-sha1");
    m0("1.3.14.3.2.7", "desCBC");
    m0("1.3.14.3.2.26", "sha1");
    m0("1.3.14.3.2.29", "sha1WithRSASignature");
    m0("2.16.840.1.101.3.4.2.1", "sha256");
    m0("2.16.840.1.101.3.4.2.2", "sha384");
    m0("2.16.840.1.101.3.4.2.3", "sha512");
    m0("2.16.840.1.101.3.4.2.4", "sha224");
    m0("2.16.840.1.101.3.4.2.5", "sha512-224");
    m0("2.16.840.1.101.3.4.2.6", "sha512-256");
    m0("1.2.840.113549.2.2", "md2");
    m0("1.2.840.113549.2.5", "md5");
    m0("1.2.840.113549.1.7.1", "data");
    m0("1.2.840.113549.1.7.2", "signedData");
    m0("1.2.840.113549.1.7.3", "envelopedData");
    m0("1.2.840.113549.1.7.4", "signedAndEnvelopedData");
    m0("1.2.840.113549.1.7.5", "digestedData");
    m0("1.2.840.113549.1.7.6", "encryptedData");
    m0("1.2.840.113549.1.9.1", "emailAddress");
    m0("1.2.840.113549.1.9.2", "unstructuredName");
    m0("1.2.840.113549.1.9.3", "contentType");
    m0("1.2.840.113549.1.9.4", "messageDigest");
    m0("1.2.840.113549.1.9.5", "signingTime");
    m0("1.2.840.113549.1.9.6", "counterSignature");
    m0("1.2.840.113549.1.9.7", "challengePassword");
    m0("1.2.840.113549.1.9.8", "unstructuredAddress");
    m0("1.2.840.113549.1.9.14", "extensionRequest");
    m0("1.2.840.113549.1.9.20", "friendlyName");
    m0("1.2.840.113549.1.9.21", "localKeyId");
    m0("1.2.840.113549.1.9.22.1", "x509Certificate");
    m0("1.2.840.113549.1.12.10.1.1", "keyBag");
    m0("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag");
    m0("1.2.840.113549.1.12.10.1.3", "certBag");
    m0("1.2.840.113549.1.12.10.1.4", "crlBag");
    m0("1.2.840.113549.1.12.10.1.5", "secretBag");
    m0("1.2.840.113549.1.12.10.1.6", "safeContentsBag");
    m0("1.2.840.113549.1.5.13", "pkcs5PBES2");
    m0("1.2.840.113549.1.5.12", "pkcs5PBKDF2");
    m0("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4");
    m0("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4");
    m0("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC");
    m0("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC");
    m0("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC");
    m0("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC");
    m0("1.2.840.113549.2.7", "hmacWithSHA1");
    m0("1.2.840.113549.2.8", "hmacWithSHA224");
    m0("1.2.840.113549.2.9", "hmacWithSHA256");
    m0("1.2.840.113549.2.10", "hmacWithSHA384");
    m0("1.2.840.113549.2.11", "hmacWithSHA512");
    m0("1.2.840.113549.3.7", "des-EDE3-CBC");
    m0("2.16.840.1.101.3.4.1.2", "aes128-CBC");
    m0("2.16.840.1.101.3.4.1.22", "aes192-CBC");
    m0("2.16.840.1.101.3.4.1.42", "aes256-CBC");
    m0("2.5.4.3", "commonName");
    m0("2.5.4.4", "surname");
    m0("2.5.4.5", "serialNumber");
    m0("2.5.4.6", "countryName");
    m0("2.5.4.7", "localityName");
    m0("2.5.4.8", "stateOrProvinceName");
    m0("2.5.4.9", "streetAddress");
    m0("2.5.4.10", "organizationName");
    m0("2.5.4.11", "organizationalUnitName");
    m0("2.5.4.12", "title");
    m0("2.5.4.13", "description");
    m0("2.5.4.15", "businessCategory");
    m0("2.5.4.17", "postalCode");
    m0("2.5.4.42", "givenName");
    m0("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName");
    m0("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName");
    m0("2.16.840.1.113730.1.1", "nsCertType");
    m0("2.16.840.1.113730.1.13", "nsComment");
    m1("2.5.29.1", "authorityKeyIdentifier");
    m1("2.5.29.2", "keyAttributes");
    m1("2.5.29.3", "certificatePolicies");
    m1("2.5.29.4", "keyUsageRestriction");
    m1("2.5.29.5", "policyMapping");
    m1("2.5.29.6", "subtreesConstraint");
    m1("2.5.29.7", "subjectAltName");
    m1("2.5.29.8", "issuerAltName");
    m1("2.5.29.9", "subjectDirectoryAttributes");
    m1("2.5.29.10", "basicConstraints");
    m1("2.5.29.11", "nameConstraints");
    m1("2.5.29.12", "policyConstraints");
    m1("2.5.29.13", "basicConstraints");
    m0("2.5.29.14", "subjectKeyIdentifier");
    m0("2.5.29.15", "keyUsage");
    m1("2.5.29.16", "privateKeyUsagePeriod");
    m0("2.5.29.17", "subjectAltName");
    m0("2.5.29.18", "issuerAltName");
    m0("2.5.29.19", "basicConstraints");
    m1("2.5.29.20", "cRLNumber");
    m1("2.5.29.21", "cRLReason");
    m1("2.5.29.22", "expirationDate");
    m1("2.5.29.23", "instructionCode");
    m1("2.5.29.24", "invalidityDate");
    m1("2.5.29.25", "cRLDistributionPoints");
    m1("2.5.29.26", "issuingDistributionPoint");
    m1("2.5.29.27", "deltaCRLIndicator");
    m1("2.5.29.28", "issuingDistributionPoint");
    m1("2.5.29.29", "certificateIssuer");
    m1("2.5.29.30", "nameConstraints");
    m0("2.5.29.31", "cRLDistributionPoints");
    m0("2.5.29.32", "certificatePolicies");
    m1("2.5.29.33", "policyMappings");
    m1("2.5.29.34", "policyConstraints");
    m0("2.5.29.35", "authorityKeyIdentifier");
    m1("2.5.29.36", "policyConstraints");
    m0("2.5.29.37", "extKeyUsage");
    m1("2.5.29.46", "freshestCRL");
    m1("2.5.29.54", "inhibitAnyPolicy");
    m0("1.3.6.1.4.1.11129.2.4.2", "timestampList");
    m0("1.3.6.1.5.5.7.1.1", "authorityInfoAccess");
    m0("1.3.6.1.5.5.7.3.1", "serverAuth");
    m0("1.3.6.1.5.5.7.3.2", "clientAuth");
    m0("1.3.6.1.5.5.7.3.3", "codeSigning");
    m0("1.3.6.1.5.5.7.3.4", "emailProtection");
    m0("1.3.6.1.5.5.7.3.8", "timeStamping");
  });
  var b = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    f();
    var XS = XF.exports = Xq.asn1 = Xq.asn1 || {};
    XS.Class = {
      UNIVERSAL: 0,
      APPLICATION: 64,
      CONTEXT_SPECIFIC: 128,
      PRIVATE: 192
    };
    XS.Type = {
      NONE: 0,
      BOOLEAN: 1,
      INTEGER: 2,
      BITSTRING: 3,
      OCTETSTRING: 4,
      NULL: 5,
      OID: 6,
      ODESC: 7,
      EXTERNAL: 8,
      REAL: 9,
      ENUMERATED: 10,
      EMBEDDED: 11,
      UTF8: 12,
      ROID: 13,
      SEQUENCE: 16,
      SET: 17,
      PRINTABLESTRING: 19,
      IA5STRING: 22,
      UTCTIME: 23,
      GENERALIZEDTIME: 24,
      BMPSTRING: 30
    };
    XS.create = function (m5, m6, m7, m8, m9) {
      if (Xq.util.isArray(m8)) {
        var mX = [];
        for (var mm = 0; mm < m8.length; ++mm) {
          if (m8[mm] !== undefined) {
            mX.push(m8[mm]);
          }
        }
        m8 = mX;
      }
      var mI = {
        tagClass: m5,
        type: m6,
        constructed: m7,
        composed: m7 || Xq.util.isArray(m8),
        value: m8
      };
      if (m9 && "bitStringContents" in m9) {
        mI.bitStringContents = m9.bitStringContents;
        mI.original = XS.copy(mI);
      }
      return mI;
    };
    XS.copy = function (m5, m6) {
      var m7;
      if (Xq.util.isArray(m5)) {
        m7 = [];
        for (var m8 = 0; m8 < m5.length; ++m8) {
          m7.push(XS.copy(m5[m8], m6));
        }
        return m7;
      }
      if (typeof m5 == "string") {
        return m5;
      } else {
        m7 = {
          tagClass: m5.tagClass,
          type: m5.type,
          constructed: m5.constructed,
          composed: m5.composed,
          value: XS.copy(m5.value, m6)
        };
        if (m6 && !m6.excludeBitStringContents) {
          m7.bitStringContents = m5.bitStringContents;
        }
        return m7;
      }
    };
    XS.equals = function (m5, m6, m7) {
      if (Xq.util.isArray(m5)) {
        if (!Xq.util.isArray(m6) || m5.length !== m6.length) {
          return false;
        }
        for (var m8 = 0; m8 < m5.length; ++m8) {
          if (!XS.equals(m5[m8], m6[m8])) {
            return false;
          }
        }
        return true;
      }
      if (typeof m5 != typeof m6) {
        return false;
      }
      if (typeof m5 == "string") {
        return m5 === m6;
      }
      var m9 = m5.tagClass === m6.tagClass && m5.type === m6.type && m5.constructed === m6.constructed && m5.composed === m6.composed && XS.equals(m5.value, m6.value);
      if (m7 && m7.includeBitStringContents) {
        m9 = m9 && m5.bitStringContents === m6.bitStringContents;
      }
      return m9;
    };
    XS.getBerValueLength = function (m5) {
      var m6 = m5.getByte();
      if (m6 !== 128) {
        var m7;
        var m8 = m6 & 128;
        if (m8) {
          m7 = m5.getInt((m6 & 127) << 3);
        } else {
          m7 = m6;
        }
        return m7;
      }
    };
    function m1(m5, m6, m7) {
      if (m7 > m6) {
        var m8 = new Error("Too few bytes to parse DER.");
        m8.available = m5.length();
        m8.remaining = m6;
        m8.requested = m7;
        throw m8;
      }
    }
    function m2(m5, m6) {
      var m7 = m5.getByte();
      m6--;
      if (m7 !== 128) {
        var m8;
        var m9 = m7 & 128;
        if (!m9) {
          m8 = m7;
        } else {
          var mX = m7 & 127;
          m1(m5, m6, mX);
          m8 = m5.getInt(mX << 3);
        }
        if (m8 < 0) {
          throw new Error("Negative length: " + m8);
        }
        return m8;
      }
    }
    XS.fromDer = function (m5, m6 = {
      strict: true,
      parseAllBytes: true,
      decodeBitStrings: true
    }) {
      if (typeof m6 == "boolean") {
        m6 = {
          strict: m6,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (!("strict" in m6)) {
        m6.strict = true;
      }
      if (!("parseAllBytes" in m6)) {
        m6.parseAllBytes = true;
      }
      if (!("decodeBitStrings" in m6)) {
        m6.decodeBitStrings = true;
      }
      if (typeof m5 == "string") {
        m5 = Xq.util.createBuffer(m5);
      }
      var m7 = m5.length();
      var m8 = m3(m5, m5.length(), 0, m6);
      if (m6.parseAllBytes && m5.length() !== 0) {
        var m9 = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
        m9.byteCount = m7;
        m9.remaining = m5.length();
        throw m9;
      }
      return m8;
    };
    function m3(m5, m6, m7, m8) {
      var m9;
      m1(m5, m6, 2);
      var mX = m5.getByte();
      m6--;
      var mm = mX & 192;
      var mI = mX & 31;
      m9 = m5.length();
      var mV = m2(m5, m6);
      m6 -= m9 - m5.length();
      if (mV !== undefined && mV > m6) {
        if (m8.strict) {
          var mE = new Error("Too few bytes to read ASN.1 value.");
          mE.available = m5.length();
          mE.remaining = m6;
          mE.requested = mV;
          throw mE;
        }
        mV = m6;
      }
      var mW;
      var mC;
      var mH = (mX & 32) === 32;
      if (mH) {
        mW = [];
        if (mV === undefined) {
          while (true) {
            m1(m5, m6, 2);
            if (m5.bytes(2) === "\0\0") {
              m5.getBytes(2);
              m6 -= 2;
              break;
            }
            m9 = m5.length();
            mW.push(m3(m5, m6, m7 + 1, m8));
            m6 -= m9 - m5.length();
          }
        } else {
          while (mV > 0) {
            m9 = m5.length();
            mW.push(m3(m5, mV, m7 + 1, m8));
            m6 -= m9 - m5.length();
            mV -= m9 - m5.length();
          }
        }
      }
      if (mW === undefined && mm === XS.Class.UNIVERSAL && mI === XS.Type.BITSTRING) {
        mC = m5.bytes(mV);
      }
      if (mW === undefined && m8.decodeBitStrings && mm === XS.Class.UNIVERSAL && mI === XS.Type.BITSTRING && mV > 1) {
        var me = m5.read;
        var mK = m6;
        var mU = 0;
        if (mI === XS.Type.BITSTRING) {
          m1(m5, m6, 1);
          mU = m5.getByte();
          m6--;
        }
        if (mU === 0) {
          try {
            m9 = m5.length();
            var mv = {
              strict: true,
              decodeBitStrings: true
            };
            var mM = m3(m5, m6, m7 + 1, mv);
            var md = m9 - m5.length();
            m6 -= md;
            if (mI == XS.Type.BITSTRING) {
              md++;
            }
            var mB = mM.tagClass;
            if (md === mV && (mB === XS.Class.UNIVERSAL || mB === XS.Class.CONTEXT_SPECIFIC)) {
              mW = [mM];
            }
          } catch { }
        }
        if (mW === undefined) {
          m5.read = me;
          m6 = mK;
        }
      }
      if (mW === undefined) {
        if (mV === undefined) {
          if (m8.strict) {
            throw new Error("Non-constructed ASN.1 object of indefinite length.");
          }
          mV = m6;
        }
        if (mI === XS.Type.BMPSTRING) {
          for (mW = ""; mV > 0; mV -= 2) {
            m1(m5, m6, 2);
            mW += String.fromCharCode(m5.getInt16());
            m6 -= 2;
          }
        } else {
          mW = m5.getBytes(mV);
          m6 -= mV;
        }
      }
      var ms = mC === undefined ? null : {
        bitStringContents: mC
      };
      return XS.create(mm, mI, mH, mW, ms);
    }
    XS.toDer = function (m5) {
      var m6 = Xq.util.createBuffer();
      var m7 = m5.tagClass | m5.type;
      var m8 = Xq.util.createBuffer();
      var m9 = false;
      if ("bitStringContents" in m5) {
        m9 = true;
        if (m5.original) {
          m9 = XS.equals(m5, m5.original);
        }
      }
      if (m9) {
        m8.putBytes(m5.bitStringContents);
      } else if (m5.composed) {
        if (m5.constructed) {
          m7 |= 32;
        } else {
          m8.putByte(0);
        }
        for (var mX = 0; mX < m5.value.length; ++mX) {
          if (m5.value[mX] !== undefined) {
            m8.putBuffer(XS.toDer(m5.value[mX]));
          }
        }
      } else if (m5.type === XS.Type.BMPSTRING) {
        for (var mX = 0; mX < m5.value.length; ++mX) {
          m8.putInt16(m5.value.charCodeAt(mX));
        }
      } else if (m5.type === XS.Type.INTEGER && m5.value.length > 1 && (m5.value.charCodeAt(0) === 0 && !(m5.value.charCodeAt(1) & 128) || m5.value.charCodeAt(0) === 255 && (m5.value.charCodeAt(1) & 128) === 128)) {
        m8.putBytes(m5.value.substr(1));
      } else {
        m8.putBytes(m5.value);
      }
      m6.putByte(m7);
      if (m8.length() <= 127) {
        m6.putByte(m8.length() & 127);
      } else {
        var mm = m8.length();
        var mI = "";
        do {
          mI += String.fromCharCode(mm & 255);
          mm = mm >>> 8;
        } while (mm > 0);
        m6.putByte(mI.length | 128);
        for (var mX = mI.length - 1; mX >= 0; --mX) {
          m6.putByte(mI.charCodeAt(mX));
        }
      }
      m6.putBuffer(m8);
      return m6;
    };
    XS.oidToDer = function (m5) {
      var m6 = m5.split(".");
      var m7 = Xq.util.createBuffer();
      m7.putByte(parseInt(m6[0], 10) * 40 + parseInt(m6[1], 10));
      var m8;
      var m9;
      var mX;
      var mm;
      for (var mI = 2; mI < m6.length; ++mI) {
        m8 = true;
        m9 = [];
        mX = parseInt(m6[mI], 10);
        do {
          mm = mX & 127;
          mX = mX >>> 7;
          if (!m8) {
            mm |= 128;
          }
          m9.push(mm);
          m8 = false;
        } while (mX > 0);
        for (var mV = m9.length - 1; mV >= 0; --mV) {
          m7.putByte(m9[mV]);
        }
      }
      return m7;
    };
    XS.derToOid = function (m5) {
      var m6;
      if (typeof m5 == "string") {
        m5 = Xq.util.createBuffer(m5);
      }
      var m7 = m5.getByte();
      m6 = Math.floor(m7 / 40) + "." + m7 % 40;
      for (var m8 = 0; m5.length() > 0;) {
        m7 = m5.getByte();
        m8 = m8 << 7;
        if (m7 & 128) {
          m8 += m7 & 127;
        } else {
          m6 += "." + (m8 + m7);
          m8 = 0;
        }
      }
      return m6;
    };
    XS.utcTimeToDate = function (m5) {
      var m6 = new Date();
      var m7 = parseInt(m5.substr(0, 2), 10);
      m7 = m7 >= 50 ? 1900 + m7 : 2000 + m7;
      var m8 = parseInt(m5.substr(2, 2), 10) - 1;
      var m9 = parseInt(m5.substr(4, 2), 10);
      var mX = parseInt(m5.substr(6, 2), 10);
      var mm = parseInt(m5.substr(8, 2), 10);
      var mI = 0;
      if (m5.length > 11) {
        var mV = m5.charAt(10);
        var mE = 10;
        if (mV !== "+" && mV !== "-") {
          mI = parseInt(m5.substr(10, 2), 10);
          mE += 2;
        }
      }
      m6.setUTCFullYear(m7, m8, m9);
      m6.setUTCHours(mX, mm, mI, 0);
      if (mE && (mV = m5.charAt(mE), mV === "+" || mV === "-")) {
        var mW = parseInt(m5.substr(mE + 1, 2), 10);
        var mC = parseInt(m5.substr(mE + 4, 2), 10);
        var mH = mW * 60 + mC;
        mH *= 60000;
        if (mV === "+") {
          m6.setTime(+m6 - mH);
        } else {
          m6.setTime(+m6 + mH);
        }
      }
      return m6;
    };
    XS.generalizedTimeToDate = function (m5) {
      var m6 = new Date();
      var m7 = parseInt(m5.substr(0, 4), 10);
      var m8 = parseInt(m5.substr(4, 2), 10) - 1;
      var m9 = parseInt(m5.substr(6, 2), 10);
      var mX = parseInt(m5.substr(8, 2), 10);
      var mm = parseInt(m5.substr(10, 2), 10);
      var mI = parseInt(m5.substr(12, 2), 10);
      var mV = 0;
      var mE = 0;
      var mW = false;
      if (m5.charAt(m5.length - 1) === "Z") {
        mW = true;
      }
      var mC = m5.length - 5;
      var mH = m5.charAt(mC);
      if (mH === "+" || mH === "-") {
        var me = parseInt(m5.substr(mC + 1, 2), 10);
        var mK = parseInt(m5.substr(mC + 4, 2), 10);
        mE = me * 60 + mK;
        mE *= 60000;
        if (mH === "+") {
          mE *= -1;
        }
        mW = true;
      }
      if (m5.charAt(14) === ".") {
        mV = parseFloat(m5.substr(14), 10) * 1000;
      }
      if (mW) {
        m6.setUTCFullYear(m7, m8, m9);
        m6.setUTCHours(mX, mm, mI, mV);
        m6.setTime(+m6 + mE);
      } else {
        m6.setFullYear(m7, m8, m9);
        m6.setHours(mX, mm, mI, mV);
      }
      return m6;
    };
    XS.dateToUtcTime = function (m5) {
      if (typeof m5 == "string") {
        return m5;
      }
      var m6 = "";
      var m7 = [];
      m7.push(("" + m5.getUTCFullYear()).substr(2));
      m7.push("" + (m5.getUTCMonth() + 1));
      m7.push("" + m5.getUTCDate());
      m7.push("" + m5.getUTCHours());
      m7.push("" + m5.getUTCMinutes());
      m7.push("" + m5.getUTCSeconds());
      for (var m8 = 0; m8 < m7.length; ++m8) {
        if (m7[m8].length < 2) {
          m6 += "0";
        }
        m6 += m7[m8];
      }
      m6 += "Z";
      return m6;
    };
    XS.dateToGeneralizedTime = function (m5) {
      if (typeof m5 == "string") {
        return m5;
      }
      var m6 = "";
      var m7 = [];
      m7.push("" + m5.getUTCFullYear());
      m7.push("" + (m5.getUTCMonth() + 1));
      m7.push("" + m5.getUTCDate());
      m7.push("" + m5.getUTCHours());
      m7.push("" + m5.getUTCMinutes());
      m7.push("" + m5.getUTCSeconds());
      for (var m8 = 0; m8 < m7.length; ++m8) {
        if (m7[m8].length < 2) {
          m6 += "0";
        }
        m6 += m7[m8];
      }
      m6 += "Z";
      return m6;
    };
    XS.integerToDer = function (m5) {
      var m6 = Xq.util.createBuffer();
      if (m5 >= -128 && m5 < 128) {
        return m6.putSignedInt(m5, 8);
      }
      if (m5 >= -32768 && m5 < 32768) {
        return m6.putSignedInt(m5, 16);
      }
      if (m5 >= -8388608 && m5 < 8388608) {
        return m6.putSignedInt(m5, 24);
      }
      if (m5 >= -2147483648 && m5 < 2147483648) {
        return m6.putSignedInt(m5, 32);
      }
      var m7 = new Error("Integer too large; max is 32-bits.");
      m7.integer = m5;
      throw m7;
    };
    XS.derToInteger = function (m5) {
      if (typeof m5 == "string") {
        m5 = Xq.util.createBuffer(m5);
      }
      var m6 = m5.length() * 8;
      if (m6 > 32) {
        throw new Error("Integer too large; max is 32-bits.");
      }
      return m5.getSignedInt(m6);
    };
    XS.validate = function (m5, m6, m7, m8) {
      var m9 = false;
      if ((m5.tagClass === m6.tagClass || typeof m6.tagClass === "undefined") && (m5.type === m6.type || typeof m6.type === "undefined")) {
        if (m5.constructed === m6.constructed || typeof m6.constructed === "undefined") {
          m9 = true;
          if (m6.value && Xq.util.isArray(m6.value)) {
            var mX = 0;
            for (var mm = 0; m9 && mm < m6.value.length; ++mm) {
              m9 = m6.value[mm].optional || false;
              if (m5.value[mX]) {
                m9 = XS.validate(m5.value[mX], m6.value[mm], m7, m8);
                if (m9) {
                  ++mX;
                } else if (m6.value[mm].optional) {
                  m9 = true;
                }
              }
              if (!m9 && m8) {
                m8.push("[" + m6.name + "] Tag class \"" + m6.tagClass + "\", type \"" + m6.type + "\" expected value length \"" + m6.value.length + "\", got \"" + m5.value.length + "\"");
              }
            }
          }
          if (m9 && m7 && (m6.capture && (m7[m6.capture] = m5.value), m6.captureAsn1 && (m7[m6.captureAsn1] = m5), m6.captureBitStringContents && "bitStringContents" in m5 && (m7[m6.captureBitStringContents] = m5.bitStringContents), m6.captureBitStringValue && "bitStringContents" in m5)) {
            var mI;
            if (m5.bitStringContents.length < 2) {
              m7[m6.captureBitStringValue] = "";
            } else {
              var mV = m5.bitStringContents.charCodeAt(0);
              if (mV !== 0) {
                throw new Error("captureBitStringValue only supported for zero unused bits");
              }
              m7[m6.captureBitStringValue] = m5.bitStringContents.slice(1);
            }
          }
        } else if (m8) {
          m8.push("[" + m6.name + "] Expected constructed \"" + m6.constructed + "\", got \"" + m5.constructed + "\"");
        }
      } else if (m8) {
        if (m5.tagClass !== m6.tagClass) {
          m8.push("[" + m6.name + "] Expected tag class \"" + m6.tagClass + "\", got \"" + m5.tagClass + "\"");
        }
        if (m5.type !== m6.type) {
          m8.push("[" + m6.name + "] Expected type \"" + m6.type + "\", got \"" + m5.type + "\"");
        }
      }
      return m9;
    };
    var m4 = /[^\\u0000-\\u00ff]/;
    XS.prettyPrint = function (m5, m6, m7) {
      var m8 = "";
      m6 = m6 || 0;
      m7 = m7 || 2;
      if (m6 > 0) {
        m8 += "\n";
      }
      var m9 = "";
      for (var mX = 0; mX < m6 * m7; ++mX) {
        m9 += " ";
      }
      m8 += m9 + "Tag: ";
      switch (m5.tagClass) {
        case XS.Class.UNIVERSAL:
          m8 += "Universal:";
          break;
        case XS.Class.APPLICATION:
          m8 += "Application:";
          break;
        case XS.Class.CONTEXT_SPECIFIC:
          m8 += "Context-Specific:";
          break;
        case XS.Class.PRIVATE:
          m8 += "Private:";
          break;
      }
      if (m5.tagClass === XS.Class.UNIVERSAL) {
        m8 += m5.type;
        switch (m5.type) {
          case XS.Type.NONE:
            m8 += " (None)";
            break;
          case XS.Type.BOOLEAN:
            m8 += " (Boolean)";
            break;
          case XS.Type.INTEGER:
            m8 += " (Integer)";
            break;
          case XS.Type.BITSTRING:
            m8 += " (Bit string)";
            break;
          case XS.Type.OCTETSTRING:
            m8 += " (Octet string)";
            break;
          case XS.Type.NULL:
            m8 += " (Null)";
            break;
          case XS.Type.OID:
            m8 += " (Object Identifier)";
            break;
          case XS.Type.ODESC:
            m8 += " (Object Descriptor)";
            break;
          case XS.Type.EXTERNAL:
            m8 += " (External or Instance of)";
            break;
          case XS.Type.REAL:
            m8 += " (Real)";
            break;
          case XS.Type.ENUMERATED:
            m8 += " (Enumerated)";
            break;
          case XS.Type.EMBEDDED:
            m8 += " (Embedded PDV)";
            break;
          case XS.Type.UTF8:
            m8 += " (UTF8)";
            break;
          case XS.Type.ROID:
            m8 += " (Relative Object Identifier)";
            break;
          case XS.Type.SEQUENCE:
            m8 += " (Sequence)";
            break;
          case XS.Type.SET:
            m8 += " (Set)";
            break;
          case XS.Type.PRINTABLESTRING:
            m8 += " (Printable String)";
            break;
          case XS.Type.IA5String:
            m8 += " (IA5String (ASCII))";
            break;
          case XS.Type.UTCTIME:
            m8 += " (UTC time)";
            break;
          case XS.Type.GENERALIZEDTIME:
            m8 += " (Generalized time)";
            break;
          case XS.Type.BMPSTRING:
            m8 += " (BMP String)";
            break;
        }
      } else {
        m8 += m5.type;
      }
      m8 += "\n";
      m8 += m9 + "Constructed: " + m5.constructed + "\n";
      if (m5.composed) {
        var mm = 0;
        var mI = "";
        for (var mX = 0; mX < m5.value.length; ++mX) {
          if (m5.value[mX] !== undefined) {
            mm += 1;
            mI += XS.prettyPrint(m5.value[mX], m6 + 1, m7);
            if (mX + 1 < m5.value.length) {
              mI += ",";
            }
          }
        }
        m8 += m9 + "Sub values: " + mm + mI;
      } else {
        m8 += m9 + "Value: ";
        if (m5.type === XS.Type.OID) {
          var mV = XS.derToOid(m5.value);
          m8 += mV;
          if (Xq.pki && Xq.pki.oids && mV in Xq.pki.oids) {
            m8 += " (" + Xq.pki.oids[mV] + ") ";
          }
        }
        if (m5.type === XS.Type.INTEGER) {
          try {
            m8 += XS.derToInteger(m5.value);
          } catch {
            m8 += "0x" + Xq.util.bytesToHex(m5.value);
          }
        } else if (m5.type === XS.Type.BITSTRING) {
          if (m5.value.length > 1) {
            m8 += "0x" + Xq.util.bytesToHex(m5.value.slice(1));
          } else {
            m8 += "(none)";
          }
          if (m5.value.length > 0) {
            var mE = m5.value.charCodeAt(0);
            if (mE == 1) {
              m8 += " (1 unused bit shown)";
            } else if (mE > 1) {
              m8 += " (" + mE + " unused bits shown)";
            }
          }
        } else if (m5.type === XS.Type.OCTETSTRING) {
          if (!m4.test(m5.value)) {
            m8 += "(" + m5.value + ") ";
          }
          m8 += "0x" + Xq.util.bytesToHex(m5.value);
        } else if (m5.type === XS.Type.UTF8) {
          try {
            m8 += Xq.util.decodeUtf8(m5.value);
          } catch (mW) {
            if (mW.message === "URI malformed") {
              m8 += "0x" + Xq.util.bytesToHex(m5.value) + " (malformed UTF8)";
            } else {
              throw mW;
            }
          }
        } else if (m5.type === XS.Type.PRINTABLESTRING || m5.type === XS.Type.IA5String) {
          m8 += m5.value;
        } else if (m4.test(m5.value)) {
          m8 += "0x" + Xq.util.bytesToHex(m5.value);
        } else if (m5.value.length === 0) {
          m8 += "[null]";
        } else {
          m8 += m5.value;
        }
      }
      return m8;
    };
  });
  var T = K((XP, XF) => {
    'use strict';

    var Xq = M();
    XF.exports = Xq.md = Xq.md || {};
    Xq.md.algorithms = Xq.md.algorithms || {};
  });
  var Q = K((XP, XF) => {
    'use strict';

    var Xq = M();
    T();
    B();
    var XS = XF.exports = Xq.hmac = Xq.hmac || {};
    XS.create = function () {
      var m0 = null;
      var m1 = null;
      var m2 = null;
      var m3 = null;
      var m4 = {};
      m4.start = function (m5, m6) {
        if (m5 !== null) {
          if (typeof m5 == "string") {
            m5 = m5.toLowerCase();
            if (m5 in Xq.md.algorithms) {
              m1 = Xq.md.algorithms[m5].create();
            } else {
              throw new Error("Unknown hash algorithm \"" + m5 + "\"");
            }
          } else {
            m1 = m5;
          }
        }
        if (m6 === null) {
          m6 = m0;
        } else {
          if (typeof m6 == "string") {
            m6 = Xq.util.createBuffer(m6);
          } else if (Xq.util.isArray(m6)) {
            var m7 = m6;
            m6 = Xq.util.createBuffer();
            for (var m8 = 0; m8 < m7.length; ++m8) {
              m6.putByte(m7[m8]);
            }
          }
          var m9 = m6.length();
          if (m9 > m1.blockLength) {
            m1.start();
            m1.update(m6.bytes());
            m6 = m1.digest();
          }
          m2 = Xq.util.createBuffer();
          m3 = Xq.util.createBuffer();
          m9 = m6.length();
          for (var m8 = 0; m8 < m9; ++m8) {
            var m7 = m6.at(m8);
            m2.putByte(m7 ^ 54);
            m3.putByte(m7 ^ 92);
          }
          if (m9 < m1.blockLength) {
            for (var m7 = m1.blockLength - m9, m8 = 0; m8 < m7; ++m8) {
              m2.putByte(54);
              m3.putByte(92);
            }
          }
          m0 = m6;
          m2 = m2.bytes();
          m3 = m3.bytes();
        }
        m1.start();
        m1.update(m2);
      };
      m4.update = function (m5) {
        m1.update(m5);
      };
      m4.getMac = function () {
        var m5 = m1.digest().bytes();
        m1.start();
        m1.update(m3);
        m1.update(m5);
        return m1.digest();
      };
      m4.digest = m4.getMac;
      return m4;
    };
  });
  var i = K((XP, XF) => {
    'use strict';

    var Xq = M();
    T();
    B();
    var XS = XF.exports = Xq.md5 = Xq.md5 || {};
    Xq.md.md5 = Xq.md.algorithms.md5 = XS;
    XS.create = function () {
      if (!m4) {
        m5();
      }
      var m7 = null;
      var m8 = Xq.util.createBuffer();
      var m9 = new Array(16);
      var mX = {
        algorithm: "md5",
        blockLength: 64,
        digestLength: 16,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      mX.start = function () {
        mX.messageLength = 0;
        mX.fullMessageLength = mX.messageLength64 = [];
        for (var mm = mX.messageLengthSize / 4, mI = 0; mI < mm; ++mI) {
          mX.fullMessageLength.push(0);
        }
        m8 = Xq.util.createBuffer();
        m7 = {
          h0: 1732584193,
          h1: 4023233417,
          h2: 2562383102,
          h3: 271733878
        };
        return mX;
      };
      mX.start();
      mX.update = function (mm, mI) {
        if (mI === "utf8") {
          mm = Xq.util.encodeUtf8(mm);
        }
        var mV = mm.length;
        mX.messageLength += mV;
        mV = [mV / 4294967296 >>> 0, mV >>> 0];
        for (var mE = mX.fullMessageLength.length - 1; mE >= 0; --mE) {
          mX.fullMessageLength[mE] += mV[1];
          mV[1] = mV[0] + (mX.fullMessageLength[mE] / 4294967296 >>> 0);
          mX.fullMessageLength[mE] = mX.fullMessageLength[mE] >>> 0;
          mV[0] = mV[1] / 4294967296 >>> 0;
        }
        m8.putBytes(mm);
        m6(m7, m9, m8);
        if (m8.read > 2048 || m8.length() === 0) {
          m8.compact();
        }
        return mX;
      };
      mX.digest = function () {
        var mm = Xq.util.createBuffer();
        mm.putBytes(m8.bytes());
        var mI = mX.fullMessageLength[mX.fullMessageLength.length - 1] + mX.messageLengthSize;
        var mV = mI & mX.blockLength - 1;
        mm.putBytes(m0.substr(0, mX.blockLength - mV));
        var mE;
        var mW = 0;
        for (var mC = mX.fullMessageLength.length - 1; mC >= 0; --mC) {
          mE = mX.fullMessageLength[mC] * 8 + mW;
          mW = mE / 4294967296 >>> 0;
          mm.putInt32Le(mE >>> 0);
        }
        var mH = {
          h0: m7.h0,
          h1: m7.h1,
          h2: m7.h2,
          h3: m7.h3
        };
        m6(mH, m9, mm);
        var me = Xq.util.createBuffer();
        me.putInt32Le(mH.h0);
        me.putInt32Le(mH.h1);
        me.putInt32Le(mH.h2);
        me.putInt32Le(mH.h3);
        return me;
      };
      return mX;
    };
    var m0 = null;
    var m1 = null;
    var m2 = null;
    var m3 = null;
    var m4 = false;
    function m5() {
      m0 = "";
      m0 += Xq.util.fillString("\0", 64);
      m1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2, 0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9];
      m2 = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
      m3 = new Array(64);
      for (var m7 = 0; m7 < 64; ++m7) {
        m3[m7] = Math.floor(Math.abs(Math.sin(m7 + 1)) * 4294967296);
      }
      m4 = true;
    }
    function m6(m7, m8, m9) {
      var mX;
      var mm;
      var mI;
      var mV;
      var mE;
      var mW;
      var mC;
      var mH;
      for (var me = m9.length(); me >= 64;) {
        mm = m7.h0;
        mI = m7.h1;
        mV = m7.h2;
        mE = m7.h3;
        mH = 0;
        for (; mH < 16; ++mH) {
          m8[mH] = m9.getInt32Le();
          mW = mE ^ mI & (mV ^ mE);
          mX = mm + mW + m3[mH] + m8[mH];
          mC = m2[mH];
          mm = mE;
          mE = mV;
          mV = mI;
          mI += mX << mC | mX >>> 32 - mC;
        }
        for (; mH < 32; ++mH) {
          mW = mV ^ mE & (mI ^ mV);
          mX = mm + mW + m3[mH] + m8[m1[mH]];
          mC = m2[mH];
          mm = mE;
          mE = mV;
          mV = mI;
          mI += mX << mC | mX >>> 32 - mC;
        }
        for (; mH < 48; ++mH) {
          mW = mI ^ mV ^ mE;
          mX = mm + mW + m3[mH] + m8[m1[mH]];
          mC = m2[mH];
          mm = mE;
          mE = mV;
          mV = mI;
          mI += mX << mC | mX >>> 32 - mC;
        }
        for (; mH < 64; ++mH) {
          mW = mV ^ (mI | ~mE);
          mX = mm + mW + m3[mH] + m8[m1[mH]];
          mC = m2[mH];
          mm = mE;
          mE = mV;
          mV = mI;
          mI += mX << mC | mX >>> 32 - mC;
        }
        m7.h0 = m7.h0 + mm | 0;
        m7.h1 = m7.h1 + mI | 0;
        m7.h2 = m7.h2 + mV | 0;
        m7.h3 = m7.h3 + mE | 0;
        me -= 64;
      }
    }
  });
  var O = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    var XS = XF.exports = Xq.pem = Xq.pem || {};
    XS.encode = function (m2, m3) {
      m3 = m3 || {};
      var m4 = "-----BEGIN " + m2.type + "-----\r\n";
      var m5;
      if (m2.procType) {
        m5 = {
          name: "Proc-Type",
          values: [String(m2.procType.version), m2.procType.type]
        };
        m4 += m0(m5);
      }
      if (m2.contentDomain) {
        m5 = {
          name: "Content-Domain",
          values: [m2.contentDomain]
        };
        m4 += m0(m5);
      }
      if (m2.dekInfo) {
        m5 = {
          name: "DEK-Info",
          values: [m2.dekInfo.algorithm]
        };
        if (m2.dekInfo.parameters) {
          m5.values.push(m2.dekInfo.parameters);
        }
        m4 += m0(m5);
      }
      if (m2.headers) {
        for (var m6 = 0; m6 < m2.headers.length; ++m6) {
          m4 += m0(m2.headers[m6]);
        }
      }
      if (m2.procType) {
        m4 += "\r\n";
      }
      m4 += Xq.util.encode64(m2.body, m3.maxline || 64) + "\r\n";
      m4 += "-----END " + m2.type + "-----\r\n";
      return m4;
    };
    XS.decode = function (m2) {
      var m3 = [];
      for (var m4 = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g, m5 = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/, m6 = /\r?\n/, m7; m7 = m4.exec(m2), !!m7;) {
        var m8 = m7[1];
        if (m8 === "NEW CERTIFICATE REQUEST") {
          m8 = "CERTIFICATE REQUEST";
        }
        var m9 = {
          type: m8,
          procType: null,
          contentDomain: null,
          dekInfo: null,
          headers: [],
          body: Xq.util.decode64(m7[3])
        };
        m3.push(m9);
        if (m7[2]) {
          for (var mX = m7[2].split(m6), mm = 0; m7 && mm < mX.length;) {
            var mI = mX[mm].replace(/\s+$/, "");
            for (var mV = mm + 1; mV < mX.length; ++mV) {
              var mE = mX[mV];
              if (!/\s/.test(mE[0])) {
                break;
              }
              mI += mE;
              mm = mV;
            }
            m7 = mI.match(m5);
            if (m7) {
              var mW = {
                name: m7[1],
                values: []
              };
              for (var mC = m7[2].split(","), mH = 0; mH < mC.length; ++mH) {
                mW.values.push(m1(mC[mH]));
              }
              if (m9.procType) {
                if (!m9.contentDomain && mW.name === "Content-Domain") {
                  m9.contentDomain = mC[0] || "";
                } else if (!m9.dekInfo && mW.name === "DEK-Info") {
                  if (mW.values.length === 0) {
                    throw new Error("Invalid PEM formatted message. The \"DEK-Info\" header must have at least one subfield.");
                  }
                  m9.dekInfo = {
                    algorithm: mC[0],
                    parameters: mC[1] || null
                  };
                } else {
                  m9.headers.push(mW);
                }
              } else {
                if (mW.name !== "Proc-Type") {
                  throw new Error("Invalid PEM formatted message. The first encapsulated header must be \"Proc-Type\".");
                }
                if (mW.values.length !== 2) {
                  throw new Error("Invalid PEM formatted message. The \"Proc-Type\" header must have two subfields.");
                }
                m9.procType = {
                  version: mC[0],
                  type: mC[1]
                };
              }
            }
            ++mm;
          }
          if (m9.procType === "ENCRYPTED" && !m9.dekInfo) {
            throw new Error("Invalid PEM formatted message. The \"DEK-Info\" header must be present if \"Proc-Type\" is \"ENCRYPTED\".");
          }
        }
      }
      if (m3.length === 0) {
        throw new Error("Invalid PEM formatted message.");
      }
      return m3;
    };
    function m0(m2) {
      var m3 = m2.name + ": ";
      var m4 = [];
      var m5 = function (mX, mm) {
        return " " + mm;
      };
      for (var m6 = 0; m6 < m2.values.length; ++m6) {
        m4.push(m2.values[m6].replace(/^(\S+\r\n)/, m5));
      }
      m3 += m4.join(",") + "\r\n";
      for (var m7 = 0, m8 = -1, m6 = 0; m6 < m3.length; ++m6, ++m7) {
        if (m7 > 65 && m8 !== -1) {
          var m9 = m3[m8];
          if (m9 === ",") {
            ++m8;
            m3 = m3.substr(0, m8) + "\r\n " + m3.substr(m8);
          } else {
            m3 = m3.substr(0, m8) + "\r\n" + m9 + m3.substr(m8 + 1);
          }
          m7 = m6 - m8 - 1;
          m8 = -1;
          ++m6;
        } else if (m3[m6] === " " || m3[m6] === "\t" || m3[m6] === ",") {
          m8 = m6;
        }
      }
      return m3;
    }
    function m1(m2) {
      return m2.replace(/^\s+/, "");
    }
  });
  var u = K((XP, XF) => {
    'use strict';

    var Xq = M();
    s();
    A();
    B();
    XF.exports = Xq.des = Xq.des || {};
    Xq.des.startEncrypting = function (mm, mI, mV, mE) {
      var mW = mX({
        key: mm,
        output: mV,
        decrypt: false,
        mode: mE || (mI === null ? "ECB" : "CBC")
      });
      mW.start(mI);
      return mW;
    };
    Xq.des.createEncryptionCipher = function (mm, mI) {
      return mX({
        key: mm,
        output: null,
        decrypt: false,
        mode: mI
      });
    };
    Xq.des.startDecrypting = function (mm, mI, mV, mE) {
      var mW = mX({
        key: mm,
        output: mV,
        decrypt: true,
        mode: mE || (mI === null ? "ECB" : "CBC")
      });
      mW.start(mI);
      return mW;
    };
    Xq.des.createDecryptionCipher = function (mm, mI) {
      return mX({
        key: mm,
        output: null,
        decrypt: true,
        mode: mI
      });
    };
    Xq.des.Algorithm = function (mm, mI) {
      var mV = this;
      mV.name = mm;
      mV.mode = new mI({
        blockSize: 8,
        cipher: {
          encrypt: function (mE, mW) {
            return m9(mV._keys, mE, mW, false);
          },
          decrypt: function (mE, mW) {
            return m9(mV._keys, mE, mW, true);
          }
        }
      });
      mV._init = false;
    };
    Xq.des.Algorithm.prototype.initialize = function (mm) {
      if (!this._init) {
        var mI = Xq.util.createBuffer(mm.key);
        if (this.name.indexOf("3DES") === 0 && mI.length() !== 24) {
          throw new Error("Invalid Triple-DES key size: " + mI.length() * 8);
        }
        this._keys = m8(mI);
        this._init = true;
      }
    };
    XS("DES-ECB", Xq.cipher.modes.ecb);
    XS("DES-CBC", Xq.cipher.modes.cbc);
    XS("DES-CFB", Xq.cipher.modes.cfb);
    XS("DES-OFB", Xq.cipher.modes.ofb);
    XS("DES-CTR", Xq.cipher.modes.ctr);
    XS("3DES-ECB", Xq.cipher.modes.ecb);
    XS("3DES-CBC", Xq.cipher.modes.cbc);
    XS("3DES-CFB", Xq.cipher.modes.cfb);
    XS("3DES-OFB", Xq.cipher.modes.ofb);
    XS("3DES-CTR", Xq.cipher.modes.ctr);
    function XS(mm, mI) {
      function mV() {
        return new Xq.des.Algorithm(mm, mI);
      }
      Xq.cipher.registerAlgorithm(mm, mV);
    }
    var m0 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756];
    var m1 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344];
    var m2 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584];
    var m3 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928];
    var m4 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080];
    var m5 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312];
    var m6 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154];
    var m7 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
    function m8(mm) {
      var mI = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964];
      var mV = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697];
      var mE = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272];
      var mW = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144];
      var mC = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256];
      var mH = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488];
      var me = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746];
      var mK = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568];
      var mU = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578];
      var mv = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488];
      var mM = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800];
      var md = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744];
      var mB = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128];
      var ms = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261];
      for (var mA = mm.length() > 8 ? 3 : 1, mG = [], mf = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], mb = 0, mT, mQ = 0; mQ < mA; mQ++) {
        var mt = mm.getInt32();
        var mi = mm.getInt32();
        mT = (mt >>> 4 ^ mi) & 252645135;
        mi ^= mT;
        mt ^= mT << 4;
        mT = (mi >>> -16 ^ mt) & 65535;
        mt ^= mT;
        mi ^= mT << -16;
        mT = (mt >>> 2 ^ mi) & 858993459;
        mi ^= mT;
        mt ^= mT << 2;
        mT = (mi >>> -16 ^ mt) & 65535;
        mt ^= mT;
        mi ^= mT << -16;
        mT = (mt >>> 1 ^ mi) & 1431655765;
        mi ^= mT;
        mt ^= mT << 1;
        mT = (mi >>> 8 ^ mt) & 16711935;
        mt ^= mT;
        mi ^= mT << 8;
        mT = (mt >>> 1 ^ mi) & 1431655765;
        mi ^= mT;
        mt ^= mT << 1;
        mT = mt << 8 | mi >>> 20 & 240;
        mt = mi << 24 | mi << 8 & 16711680 | mi >>> 8 & 65280 | mi >>> 24 & 240;
        mi = mT;
        for (var mO = 0; mO < mf.length; ++mO) {
          if (mf[mO]) {
            mt = mt << 2 | mt >>> 26;
            mi = mi << 2 | mi >>> 26;
          } else {
            mt = mt << 1 | mt >>> 27;
            mi = mi << 1 | mi >>> 27;
          }
          mt &= -15;
          mi &= -15;
          var mu = mI[mt >>> 28] | mV[mt >>> 24 & 15] | mE[mt >>> 20 & 15] | mW[mt >>> 16 & 15] | mC[mt >>> 12 & 15] | mH[mt >>> 8 & 15] | me[mt >>> 4 & 15];
          var mN = mK[mi >>> 28] | mU[mi >>> 24 & 15] | mv[mi >>> 20 & 15] | mM[mi >>> 16 & 15] | md[mi >>> 12 & 15] | mB[mi >>> 8 & 15] | ms[mi >>> 4 & 15];
          mT = (mN >>> 16 ^ mu) & 65535;
          mG[mb++] = mu ^ mT;
          mG[mb++] = mN ^ mT << 16;
        }
      }
      return mG;
    }
    function m9(mm, mI, mV, mE) {
      var mW = mm.length === 32 ? 3 : 9;
      var mC;
      if (mW === 3) {
        mC = mE ? [30, -2, -2] : [0, 32, 2];
      } else {
        mC = mE ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
      }
      var mH;
      var me = mI[0];
      var mK = mI[1];
      mH = (me >>> 4 ^ mK) & 252645135;
      mK ^= mH;
      me ^= mH << 4;
      mH = (me >>> 16 ^ mK) & 65535;
      mK ^= mH;
      me ^= mH << 16;
      mH = (mK >>> 2 ^ me) & 858993459;
      me ^= mH;
      mK ^= mH << 2;
      mH = (mK >>> 8 ^ me) & 16711935;
      me ^= mH;
      mK ^= mH << 8;
      mH = (me >>> 1 ^ mK) & 1431655765;
      mK ^= mH;
      me ^= mH << 1;
      me = me << 1 | me >>> 31;
      mK = mK << 1 | mK >>> 31;
      for (var mU = 0; mU < mW; mU += 3) {
        for (var mv = mC[mU + 1], mM = mC[mU + 2], md = mC[mU]; md != mv; md += mM) {
          var mB = mK ^ mm[md];
          var ms = (mK >>> 4 | mK << 28) ^ mm[md + 1];
          mH = me;
          me = mK;
          mK = mH ^ (m1[mB >>> 24 & 63] | m3[mB >>> 16 & 63] | m5[mB >>> 8 & 63] | m7[mB & 63] | m0[ms >>> 24 & 63] | m2[ms >>> 16 & 63] | m4[ms >>> 8 & 63] | m6[ms & 63]);
        }
        mH = me;
        me = mK;
        mK = mH;
      }
      me = me >>> 1 | me << 31;
      mK = mK >>> 1 | mK << 31;
      mH = (me >>> 1 ^ mK) & 1431655765;
      mK ^= mH;
      me ^= mH << 1;
      mH = (mK >>> 8 ^ me) & 16711935;
      me ^= mH;
      mK ^= mH << 8;
      mH = (mK >>> 2 ^ me) & 858993459;
      me ^= mH;
      mK ^= mH << 2;
      mH = (me >>> 16 ^ mK) & 65535;
      mK ^= mH;
      me ^= mH << 16;
      mH = (me >>> 4 ^ mK) & 252645135;
      mK ^= mH;
      me ^= mH << 4;
      mV[0] = me;
      mV[1] = mK;
    }
    function mX(mm) {
      mm = mm || {};
      var mI = (mm.mode || "CBC").toUpperCase();
      var mV = "DES-" + mI;
      var mE;
      if (mm.decrypt) {
        mE = Xq.cipher.createDecipher(mV, mm.key);
      } else {
        mE = Xq.cipher.createCipher(mV, mm.key);
      }
      var mW = mE.start;
      mE.start = function (mC, mH) {
        var me = null;
        if (mH instanceof Xq.util.ByteBuffer) {
          me = mH;
          mH = {};
        }
        mH = mH || {};
        mH.output = me;
        mH.iv = mC;
        mW.call(mE, mH);
      };
      return mE;
    }
  });
  var N = K(() => {
    'use strict';
  });
  var R = K((XP, XF) => {
    'use strict';

    var Xq = M();
    Q();
    T();
    B();
    var XS = Xq.pkcs5 = Xq.pkcs5 || {};
    var m0;
    if (Xq.util.isNodejs && !Xq.options.usePureJavaScript) {
      m0 = N();
    }
    XF.exports = Xq.pbkdf2 = XS.pbkdf2 = function (m1, m2, m3, m4, m5, m6) {
      if (typeof m5 == "function") {
        m6 = m5;
        m5 = null;
      }
      if (Xq.util.isNodejs && !Xq.options.usePureJavaScript && m0.pbkdf2 && (m5 === null || typeof m5 != "object") && (m0.pbkdf2Sync.length > 4 || !m5 || m5 === "sha1")) {
        if (typeof m5 != "string") {
          m5 = "sha1";
        }
        m1 = Buffer.from(m1, "binary");
        m2 = Buffer.from(m2, "binary");
        if (m6) {
          if (m0.pbkdf2Sync.length === 4) {
            return m0.pbkdf2(m1, m2, m3, m4, function (mU, mv) {
              if (mU) {
                return m6(mU);
              }
              m6(null, mv.toString("binary"));
            });
          } else {
            return m0.pbkdf2(m1, m2, m3, m4, m5, function (mU, mv) {
              if (mU) {
                return m6(mU);
              }
              m6(null, mv.toString("binary"));
            });
          }
        } else if (m0.pbkdf2Sync.length === 4) {
          return m0.pbkdf2Sync(m1, m2, m3, m4).toString("binary");
        } else {
          return m0.pbkdf2Sync(m1, m2, m3, m4, m5).toString("binary");
        }
      }
      if (typeof m5 === "undefined" || m5 === null) {
        m5 = "sha1";
      }
      if (typeof m5 == "string") {
        if (!(m5 in Xq.md.algorithms)) {
          throw new Error("Unknown hash algorithm: " + m5);
        }
        m5 = Xq.md[m5].create();
      }
      var m7 = m5.digestLength;
      if (m4 > m7 * 4294967295) {
        var m8 = new Error("Derived key is too long.");
        if (m6) {
          return m6(m8);
        }
        throw m8;
      }
      var m9 = Math.ceil(m4 / m7);
      var mX = m4 - (m9 - 1) * m7;
      var mm = Xq.hmac.create();
      mm.start(m5, m1);
      var mI = "";
      var mV;
      var mE;
      var mW;
      if (!m6) {
        for (var mC = 1; mC <= m9; ++mC) {
          mm.start(null, null);
          mm.update(m2);
          mm.update(Xq.util.int32ToBytes(mC));
          mV = mW = mm.digest().getBytes();
          for (var mH = 2; mH <= m3; ++mH) {
            mm.start(null, null);
            mm.update(mW);
            mE = mm.digest().getBytes();
            mV = Xq.util.xorBytes(mV, mE, m7);
            mW = mE;
          }
          mI += mC < m9 ? mV : mV.substr(0, mX);
        }
        return mI;
      }
      var mC = 1;
      var mH;
      function me() {
        if (mC > m9) {
          return m6(null, mI);
        }
        mm.start(null, null);
        mm.update(m2);
        mm.update(Xq.util.int32ToBytes(mC));
        mV = mW = mm.digest().getBytes();
        mH = 2;
        mK();
      }
      function mK() {
        if (mH <= m3) {
          mm.start(null, null);
          mm.update(mW);
          mE = mm.digest().getBytes();
          mV = Xq.util.xorBytes(mV, mE, m7);
          mW = mE;
          ++mH;
          return Xq.util.setImmediate(mK);
        }
        mI += mC < m9 ? mV : mV.substr(0, mX);
        ++mC;
        me();
      }
      me();
    };
  });
  var y = K((XP, XF) => {
    'use strict';

    var Xq = M();
    T();
    B();
    var XS = XF.exports = Xq.sha256 = Xq.sha256 || {};
    Xq.md.sha256 = Xq.md.algorithms.sha256 = XS;
    XS.create = function () {
      if (!m1) {
        m3();
      }
      var m5 = null;
      var m6 = Xq.util.createBuffer();
      var m7 = new Array(64);
      var m8 = {
        algorithm: "sha256",
        blockLength: 64,
        digestLength: 32,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      m8.start = function () {
        m8.messageLength = 0;
        m8.fullMessageLength = m8.messageLength64 = [];
        for (var m9 = m8.messageLengthSize / 4, mX = 0; mX < m9; ++mX) {
          m8.fullMessageLength.push(0);
        }
        m6 = Xq.util.createBuffer();
        m5 = {
          h0: 1779033703,
          h1: 3144134277,
          h2: 1013904242,
          h3: 2773480762,
          h4: 1359893119,
          h5: 2600822924,
          h6: 528734635,
          h7: 1541459225
        };
        return m8;
      };
      m8.start();
      m8.update = function (m9, mX) {
        if (mX === "utf8") {
          m9 = Xq.util.encodeUtf8(m9);
        }
        var mm = m9.length;
        m8.messageLength += mm;
        mm = [mm / 4294967296 >>> 0, mm >>> 0];
        for (var mI = m8.fullMessageLength.length - 1; mI >= 0; --mI) {
          m8.fullMessageLength[mI] += mm[1];
          mm[1] = mm[0] + (m8.fullMessageLength[mI] / 4294967296 >>> 0);
          m8.fullMessageLength[mI] = m8.fullMessageLength[mI] >>> 0;
          mm[0] = mm[1] / 4294967296 >>> 0;
        }
        m6.putBytes(m9);
        m4(m5, m7, m6);
        if (m6.read > 2048 || m6.length() === 0) {
          m6.compact();
        }
        return m8;
      };
      m8.digest = function () {
        var m9 = Xq.util.createBuffer();
        m9.putBytes(m6.bytes());
        var mX = m8.fullMessageLength[m8.fullMessageLength.length - 1] + m8.messageLengthSize;
        var mm = mX & m8.blockLength - 1;
        m9.putBytes(m0.substr(0, m8.blockLength - mm));
        var mI;
        var mV;
        var mE = m8.fullMessageLength[0] * 8;
        for (var mW = 0; mW < m8.fullMessageLength.length - 1; ++mW) {
          mI = m8.fullMessageLength[mW + 1] * 8;
          mV = mI / 4294967296 >>> 0;
          mE += mV;
          m9.putInt32(mE >>> 0);
          mE = mI >>> 0;
        }
        m9.putInt32(mE);
        var mC = {
          h0: m5.h0,
          h1: m5.h1,
          h2: m5.h2,
          h3: m5.h3,
          h4: m5.h4,
          h5: m5.h5,
          h6: m5.h6,
          h7: m5.h7
        };
        m4(mC, m7, m9);
        var mH = Xq.util.createBuffer();
        mH.putInt32(mC.h0);
        mH.putInt32(mC.h1);
        mH.putInt32(mC.h2);
        mH.putInt32(mC.h3);
        mH.putInt32(mC.h4);
        mH.putInt32(mC.h5);
        mH.putInt32(mC.h6);
        mH.putInt32(mC.h7);
        return mH;
      };
      return m8;
    };
    var m0 = null;
    var m1 = false;
    var m2 = null;
    function m3() {
      m0 = "";
      m0 += Xq.util.fillString("\0", 64);
      m2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
      m1 = true;
    }
    function m4(m5, m6, m7) {
      var m8;
      var m9;
      var mX;
      var mm;
      var mI;
      var mV;
      var mE;
      var mW;
      var mC;
      var mH;
      var me;
      var mK;
      var mU;
      var mv;
      var mM;
      for (var md = m7.length(); md >= 64;) {
        for (mE = 0; mE < 16; ++mE) {
          m6[mE] = m7.getInt32();
        }
        for (; mE < 64; ++mE) {
          m8 = m6[mE - 2];
          m8 = (m8 >>> 17 | m8 << 15) ^ (m8 >>> 19 | m8 << 13) ^ m8 >>> 10;
          m9 = m6[mE - 15];
          m9 = (m9 >>> 7 | m9 << 25) ^ (m9 >>> 18 | m9 << 14) ^ m9 >>> 3;
          m6[mE] = m8 + m6[mE - 7] + m9 + m6[mE - 16] | 0;
        }
        mW = m5.h0;
        mC = m5.h1;
        mH = m5.h2;
        me = m5.h3;
        mK = m5.h4;
        mU = m5.h5;
        mv = m5.h6;
        mM = m5.h7;
        mE = 0;
        for (; mE < 64; ++mE) {
          mm = (mK >>> 6 | mK << 26) ^ (mK >>> 11 | mK << 21) ^ (mK >>> 25 | mK << 7);
          mI = mv ^ mK & (mU ^ mv);
          mX = (mW >>> 2 | mW << 30) ^ (mW >>> 13 | mW << 19) ^ (mW >>> 22 | mW << 10);
          mV = mW & mC | mH & (mW ^ mC);
          m8 = mM + mm + mI + m2[mE] + m6[mE];
          m9 = mX + mV;
          mM = mv;
          mv = mU;
          mU = mK;
          mK = me + m8 >>> 0;
          me = mH;
          mH = mC;
          mC = mW;
          mW = m8 + m9 >>> 0;
        }
        m5.h0 = m5.h0 + mW | 0;
        m5.h1 = m5.h1 + mC | 0;
        m5.h2 = m5.h2 + mH | 0;
        m5.h3 = m5.h3 + me | 0;
        m5.h4 = m5.h4 + mK | 0;
        m5.h5 = m5.h5 + mU | 0;
        m5.h6 = m5.h6 + mv | 0;
        m5.h7 = m5.h7 + mM | 0;
        md -= 64;
      }
    }
  });
  var k = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    var XS = null;
    if (Xq.util.isNodejs && !Xq.options.usePureJavaScript && !process.versions["node-webkit"]) {
      XS = N();
    }
    var m0 = XF.exports = Xq.prng = Xq.prng || {};
    m0.create = function (m1) {
      var m2 = {
        plugin: m1,
        key: null,
        seed: null,
        time: null,
        reseeds: 0,
        generated: 0,
        keyBytes: ""
      };
      var m3 = m1.md;
      var m4 = new Array(32);
      for (var m5 = 0; m5 < 32; ++m5) {
        m4[m5] = m3.create();
      }
      m2.pools = m4;
      m2.pool = 0;
      m2.generate = function (mX, mm) {
        if (!mm) {
          return m2.generateSync(mX);
        }
        var mI = m2.plugin.cipher;
        var mV = m2.plugin.increment;
        var mE = m2.plugin.formatKey;
        var mW = m2.plugin.formatSeed;
        var mC = Xq.util.createBuffer();
        m2.key = null;
        mH();
        function mH(me) {
          if (me) {
            return mm(me);
          }
          if (mC.length() >= mX) {
            return mm(null, mC.getBytes(mX));
          }
          if (m2.generated > 1048575) {
            m2.key = null;
          }
          if (m2.key === null) {
            return Xq.util.nextTick(function () {
              m6(mH);
            });
          }
          var mK = mI(m2.key, m2.seed);
          m2.generated += mK.length;
          mC.putBytes(mK);
          m2.key = mE(mI(m2.key, mV(m2.seed)));
          m2.seed = mW(mI(m2.key, m2.seed));
          Xq.util.setImmediate(mH);
        }
      };
      m2.generateSync = function (mX) {
        var mm = m2.plugin.cipher;
        var mI = m2.plugin.increment;
        var mV = m2.plugin.formatKey;
        var mE = m2.plugin.formatSeed;
        m2.key = null;
        for (var mW = Xq.util.createBuffer(); mW.length() < mX;) {
          if (m2.generated > 1048575) {
            m2.key = null;
          }
          if (m2.key === null) {
            m7();
          }
          var mC = mm(m2.key, m2.seed);
          m2.generated += mC.length;
          mW.putBytes(mC);
          m2.key = mV(mm(m2.key, mI(m2.seed)));
          m2.seed = mE(mm(m2.key, m2.seed));
        }
        return mW.getBytes(mX);
      };
      function m6(mX) {
        if (m2.pools[0].messageLength >= 32) {
          m8();
          return mX();
        }
        var mm = 32 - m2.pools[0].messageLength << 5;
        m2.seedFile(mm, function (mI, mV) {
          if (mI) {
            return mX(mI);
          }
          m2.collect(mV);
          m8();
          mX();
        });
      }
      function m7() {
        if (m2.pools[0].messageLength >= 32) {
          return m8();
        }
        var mX = 32 - m2.pools[0].messageLength << 5;
        m2.collect(m2.seedFileSync(mX));
        m8();
      }
      function m8() {
        m2.reseeds = m2.reseeds === 4294967295 ? 0 : m2.reseeds + 1;
        var mX = m2.plugin.md.create();
        mX.update(m2.keyBytes);
        var mm = 1;
        for (var mI = 0; mI < 32; ++mI) {
          if (m2.reseeds % mm === 0) {
            mX.update(m2.pools[mI].digest().getBytes());
            m2.pools[mI].start();
          }
          mm = mm << 1;
        }
        m2.keyBytes = mX.digest().getBytes();
        mX.start();
        mX.update(m2.keyBytes);
        var mV = mX.digest().getBytes();
        m2.key = m2.plugin.formatKey(m2.keyBytes);
        m2.seed = m2.plugin.formatSeed(mV);
        m2.generated = 0;
      }
      function m9(mX) {
        var mm = null;
        var mI = Xq.util.globalScope;
        var mV = mI.crypto || mI.msCrypto;
        if (mV && mV.getRandomValues) {
          mm = function (mM) {
            return mV.getRandomValues(mM);
          };
        }
        var mE = Xq.util.createBuffer();
        if (mm) {
          while (mE.length() < mX) {
            var mW = Math.max(1, Math.min(mX - mE.length(), 65536) / 4);
            var mC = new Uint32Array(Math.floor(mW));
            try {
              mm(mC);
              for (var mH = 0; mH < mC.length; ++mH) {
                mE.putInt32(mC[mH]);
              }
            } catch (mM) {
              if (typeof QuotaExceededError === "undefined" || !(mM instanceof QuotaExceededError)) {
                throw mM;
              }
            }
          }
        }
        if (mE.length() < mX) {
          var me;
          var mK;
          var mU;
          var mv = Math.floor(Math.random() * 65536);
          for (; mE.length() < mX;) {
            mK = (mv & 65535) * 16807;
            me = (mv >> 16) * 16807;
            mK += (me & 32767) << 16;
            mK += me >> 15;
            mK = (mK & 2147483647) + (mK >> 31);
            mv = mK & -1;
            for (var mH = 0; mH < 3; ++mH) {
              mU = mv >>> (mH << 3);
              mU ^= Math.floor(Math.random() * 256);
              mE.putByte(mU & 255);
            }
          }
        }
        return mE.getBytes(mX);
      }
      if (XS) {
        m2.seedFile = function (mX, mm) {
          XS.randomBytes(mX, function (mI, mV) {
            if (mI) {
              return mm(mI);
            }
            mm(null, mV.toString());
          });
        };
        m2.seedFileSync = function (mX) {
          return XS.randomBytes(mX).toString();
        };
      } else {
        m2.seedFile = function (mX, mm) {
          try {
            mm(null, m9(mX));
          } catch (mI) {
            mm(mI);
          }
        };
        m2.seedFileSync = m9;
      }
      m2.collect = function (mX) {
        for (var mm = mX.length, mI = 0; mI < mm; ++mI) {
          m2.pools[m2.pool].update(mX.substr(mI, 1));
          m2.pool = m2.pool === 31 ? 0 : m2.pool + 1;
        }
      };
      m2.collectInt = function (mX, mm) {
        var mI = "";
        for (var mV = 0; mV < mm; mV += 8) {
          mI += String.fromCharCode(mX >> mV & 255);
        }
        m2.collect(mI);
      };
      m2.registerWorker = function (mX) {
        if (mX === self) {
          m2.seedFile = function (mI, mV) {
            function mE(mW) {
              var mC = mW.data;
              if (mC.forge && mC.forge.prng) {
                self.removeEventListener("message", mE);
                mV(mC.forge.prng.err, mC.forge.prng.bytes);
              }
            }
            self.addEventListener("message", mE);
            self.postMessage({
              forge: {
                prng: {
                  needed: mI
                }
              }
            });
          };
        } else {
          function mm(mI) {
            var mV = mI.data;
            if (mV.forge && mV.forge.prng) {
              m2.seedFile(mV.forge.prng.needed, function (mE, mW) {
                mX.postMessage({
                  forge: {
                    prng: {
                      err: mE,
                      bytes: mW
                    }
                  }
                });
              });
            }
          }
          mX.addEventListener("message", mm);
        }
      };
      return m2;
    };
  });
  var j = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    y();
    k();
    B();
    (function () {
      if (Xq.random && Xq.random.getBytes) {
        XF.exports = Xq.random;
        return;
      }
      (function (XS) {
        var m0 = {};
        var m1 = new Array(4);
        var m2 = Xq.util.createBuffer();
        m0.formatKey = function (mX) {
          var mm = Xq.util.createBuffer(mX);
          mX = new Array(4);
          mX[0] = mm.getInt32();
          mX[1] = mm.getInt32();
          mX[2] = mm.getInt32();
          mX[3] = mm.getInt32();
          return Xq.aes._expandKey(mX, false);
        };
        m0.formatSeed = function (mX) {
          var mm = Xq.util.createBuffer(mX);
          mX = new Array(4);
          mX[0] = mm.getInt32();
          mX[1] = mm.getInt32();
          mX[2] = mm.getInt32();
          mX[3] = mm.getInt32();
          return mX;
        };
        m0.cipher = function (mX, mm) {
          Xq.aes._updateBlock(mX, mm, m1, false);
          m2.putInt32(m1[0]);
          m2.putInt32(m1[1]);
          m2.putInt32(m1[2]);
          m2.putInt32(m1[3]);
          return m2.getBytes();
        };
        m0.increment = function (mX) {
          ++mX[3];
          return mX;
        };
        m0.md = Xq.md.sha256;
        function m3() {
          var mX = Xq.prng.create(m0);
          mX.getBytes = function (mm, mI) {
            return mX.generate(mm, mI);
          };
          mX.getBytesSync = function (mm) {
            return mX.generate(mm);
          };
          return mX;
        }
        var m4 = m3();
        var m5 = null;
        var m6 = Xq.util.globalScope;
        var m7 = m6.crypto || m6.msCrypto;
        if (m7 && m7.getRandomValues) {
          m5 = function (mX) {
            return m7.getRandomValues(mX);
          };
        }
        if (Xq.options.usePureJavaScript || !Xq.util.isNodejs && !m5) {
          if (typeof window !== "undefined") {
            window.document;
          }
          m4.collectInt(+new Date(), 32);
          if (typeof navigator !== "undefined") {
            var m8 = "";
            for (var m9 in navigator) {
              try {
                if (typeof navigator[m9] == "string") {
                  m8 += navigator[m9];
                }
              } catch { }
            }
            m4.collect(m8);
            m8 = null;
          }
          if (XS) {
            XS().mousemove(function (mX) {
              m4.collectInt(mX.clientX, 16);
              m4.collectInt(mX.clientY, 16);
            });
            XS().keypress(function (mX) {
              m4.collectInt(mX.charCode, 8);
            });
          }
        }
        if (!Xq.random) {
          Xq.random = m4;
        } else {
          for (var m9 in m4) {
            Xq.random[m9] = m4[m9];
          }
        }
        Xq.random.createInstance = m3;
        XF.exports = Xq.random;
      })(typeof jQuery !== "undefined" ? jQuery : null);
    })();
  });
  var J = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    var XS = [217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157, 198, 126, 55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23, 154, 89, 245, 135, 179, 79, 19, 97, 69, 109, 141, 9, 129, 125, 50, 189, 143, 64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78, 130, 84, 214, 101, 147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31, 59, 190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70, 105, 7, 87, 39, 242, 29, 155, 188, 148, 67, 3, 248, 17, 199, 246, 144, 239, 62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234, 222, 128, 82, 238, 247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116, 75, 159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36, 145, 175, 80, 161, 244, 112, 57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2, 54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138, 146, 174, 5, 223, 41, 16, 103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88, 226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177, 205, 46, 197, 243, 219, 71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127, 193, 173];
    var m0 = [1, 2, 3, 5];
    function m1(m4, m5) {
      return m4 << m5 & 65535 | (m4 & 65535) >> 16 - m5;
    }
    function m2(m4, m5) {
      return (m4 & 65535) >> m5 | m4 << 16 - m5 & 65535;
    }
    XF.exports = Xq.rc2 = Xq.rc2 || {};
    Xq.rc2.expandKey = function (m4, m5) {
      if (typeof m4 == "string") {
        m4 = Xq.util.createBuffer(m4);
      }
      m5 = m5 || 128;
      var m6 = m4;
      var m7 = m4.length();
      var m8 = m5;
      var m9 = Math.ceil(m8 / 8);
      var mX = 255 >> (m8 & 7);
      var mm;
      for (mm = m7; mm < 128; mm++) {
        m6.putByte(XS[m6.at(mm - 1) + m6.at(mm - m7) & 255]);
      }
      m6.setAt(128 - m9, XS[m6.at(128 - m9) & mX]);
      mm = 127 - m9;
      for (; mm >= 0; mm--) {
        m6.setAt(mm, XS[m6.at(mm + 1) ^ m6.at(mm + m9)]);
      }
      return m6;
    };
    function m3(m4, m5, m6) {
      var m7 = false;
      var m8 = null;
      var m9 = null;
      var mX = null;
      var mm;
      var mI;
      var mV;
      var mE;
      var mW = [];
      m4 = Xq.rc2.expandKey(m4, m5);
      mV = 0;
      for (; mV < 64; mV++) {
        mW.push(m4.getInt16Le());
      }
      if (m6) {
        mm = function (me) {
          for (mV = 0; mV < 4; mV++) {
            me[mV] += mW[mE] + (me[(mV + 3) % 4] & me[(mV + 2) % 4]) + (~me[(mV + 3) % 4] & me[(mV + 1) % 4]);
            me[mV] = m1(me[mV], m0[mV]);
            mE++;
          }
        };
        mI = function (me) {
          for (mV = 0; mV < 4; mV++) {
            me[mV] += mW[me[(mV + 3) % 4] & 63];
          }
        };
      } else {
        mm = function (me) {
          for (mV = 3; mV >= 0; mV--) {
            me[mV] = m2(me[mV], m0[mV]);
            me[mV] -= mW[mE] + (me[(mV + 3) % 4] & me[(mV + 2) % 4]) + (~me[(mV + 3) % 4] & me[(mV + 1) % 4]);
            mE--;
          }
        };
        mI = function (me) {
          for (mV = 3; mV >= 0; mV--) {
            me[mV] -= mW[me[(mV + 3) % 4] & 63];
          }
        };
      }
      function mC(me) {
        var mK = [];
        for (mV = 0; mV < 4; mV++) {
          var mU = m8.getInt16Le();
          if (mX !== null) {
            if (m6) {
              mU ^= mX.getInt16Le();
            } else {
              mX.putInt16Le(mU);
            }
          }
          mK.push(mU & 65535);
        }
        mE = m6 ? 0 : 63;
        for (var mv = 0; mv < me.length; mv++) {
          for (var mM = 0; mM < me[mv][0]; mM++) {
            me[mv][1](mK);
          }
        }
        for (mV = 0; mV < 4; mV++) {
          if (mX !== null) {
            if (m6) {
              mX.putInt16Le(mK[mV]);
            } else {
              mK[mV] ^= mX.getInt16Le();
            }
          }
          m9.putInt16Le(mK[mV]);
        }
      }
      var mH = null;
      mH = {
        start: function (me, mK) {
          if (me && typeof me == "string") {
            me = Xq.util.createBuffer(me);
          }
          m7 = false;
          m8 = Xq.util.createBuffer();
          m9 = mK || new Xq.util.createBuffer();
          mX = me;
          mH.output = m9;
        },
        update: function (me) {
          for (m7 || m8.putBuffer(me); m8.length() >= 8;) {
            mC([[5, mm], [1, mI], [6, mm], [1, mI], [5, mm]]);
          }
        },
        finish: function (me) {
          var mK = true;
          if (m6) {
            if (me) {
              mK = me(8, m8, !m6);
            } else {
              var mU = m8.length() === 8 ? 8 : 8 - m8.length();
              m8.fillWithByte(mU, mU);
            }
          }
          if (mK) {
            m7 = true;
            mH.update();
          }
          if (!m6 && (mK = m8.length() === 0, mK)) {
            if (me) {
              mK = me(8, m9, !m6);
            } else {
              var mv = m9.length();
              var mM = m9.at(mv - 1);
              if (mM > mv) {
                mK = false;
              } else {
                m9.truncate(mM);
              }
            }
          }
          return mK;
        }
      };
      return mH;
    }
    Xq.rc2.startEncrypting = function (m4, m5, m6) {
      var m7 = Xq.rc2.createEncryptionCipher(m4, 128);
      m7.start(m5, m6);
      return m7;
    };
    Xq.rc2.createEncryptionCipher = function (m4, m5) {
      return m3(m4, m5, true);
    };
    Xq.rc2.startDecrypting = function (m4, m5, m6) {
      var m7 = Xq.rc2.createDecryptionCipher(m4, 128);
      m7.start(m5, m6);
      return m7;
    };
    Xq.rc2.createDecryptionCipher = function (m4, m5) {
      return m3(m4, m5, false);
    };
  });
  var r = K((XP, XF) => {
    'use strict';

    var Xq = M();
    XF.exports = Xq.jsbn = Xq.jsbn || {};
    var XS;
    var m0 = 244837814094590;
    var m1 = (m0 & 16777215) == 15715070;
    function m2(IS, V0, V1) {
      this.data = [];
      if (IS != null) {
        if (typeof IS == "number") {
          this.fromNumber(IS, V0, V1);
        } else if (V0 == null && typeof IS != "string") {
          this.fromString(IS, 256);
        } else {
          this.fromString(IS, V0);
        }
      }
    }
    Xq.jsbn.BigInteger = m2;
    function m3() {
      return new m2(null);
    }
    function m4(IS, V0, V1, V2, V3, V4) {
      while (--V4 >= 0) {
        var V5 = V0 * this.data[IS++] + V1.data[V2] + V3;
        V3 = Math.floor(V5 / 67108864);
        V1.data[V2++] = V5 & 67108863;
      }
      return V3;
    }
    function m5(IS, V0, V1, V2, V3, V4) {
      var V5 = V0 & 32767;
      var V6 = V0 >> 15;
      for (; --V4 >= 0;) {
        var V7 = this.data[IS] & 32767;
        var V8 = this.data[IS++] >> 15;
        var V9 = V6 * V7 + V8 * V5;
        V7 = V5 * V7 + ((V9 & 32767) << 15) + V1.data[V2] + (V3 & 1073741823);
        V3 = (V7 >>> 30) + (V9 >>> 15) + V6 * V8 + (V3 >>> 30);
        V1.data[V2++] = V7 & 1073741823;
      }
      return V3;
    }
    function m6(IS, V0, V1, V2, V3, V4) {
      var V5 = V0 & 16383;
      var V6 = V0 >> 14;
      for (; --V4 >= 0;) {
        var V7 = this.data[IS] & 16383;
        var V8 = this.data[IS++] >> 14;
        var V9 = V6 * V7 + V8 * V5;
        V7 = V5 * V7 + ((V9 & 16383) << 14) + V1.data[V2] + V3;
        V3 = (V7 >> 28) + (V9 >> 14) + V6 * V8;
        V1.data[V2++] = V7 & 268435455;
      }
      return V3;
    }
    if (typeof navigator === "undefined") {
      m2.prototype.am = m6;
      XS = 28;
    } else if (m1 && navigator.appName == "Microsoft Internet Explorer") {
      m2.prototype.am = m5;
      XS = 30;
    } else if (m1 && navigator.appName != "Netscape") {
      m2.prototype.am = m4;
      XS = 26;
    } else {
      m2.prototype.am = m6;
      XS = 28;
    }
    m2.prototype.DB = XS;
    m2.prototype.DM = (1 << XS) - 1;
    m2.prototype.DV = 1 << XS;
    var m7 = 52;
    m2.prototype.FV = Math.pow(2, m7);
    m2.prototype.F1 = m7 - XS;
    m2.prototype.F2 = XS * 2 - m7;
    var m8 = "0123456789abcdefghijklmnopqrstuvwxyz";
    var m9 = new Array();
    var mX;
    var mm;
    mX = 48;
    for (mm = 0; mm <= 9; ++mm) {
      m9[mX++] = mm;
    }
    mX = 97;
    for (mm = 10; mm < 36; ++mm) {
      m9[mX++] = mm;
    }
    mX = 65;
    for (mm = 10; mm < 36; ++mm) {
      m9[mX++] = mm;
    }
    function mI(IS) {
      return m8.charAt(IS);
    }
    function mV(IS, V0) {
      var V1 = m9[IS.charCodeAt(V0)];
      return V1 ?? -1;
    }
    function mE(IS) {
      for (var V0 = this.t - 1; V0 >= 0; --V0) {
        IS.data[V0] = this.data[V0];
      }
      IS.t = this.t;
      IS.s = this.s;
    }
    function mW(IS) {
      this.t = 1;
      this.s = IS < 0 ? -1 : 0;
      if (IS > 0) {
        this.data[0] = IS;
      } else if (IS < -1) {
        this.data[0] = IS + this.DV;
      } else {
        this.t = 0;
      }
    }
    function mC(IS) {
      var V0 = m3();
      V0.fromInt(IS);
      return V0;
    }
    function mH(IS, V0) {
      var V1;
      if (V0 == 16) {
        V1 = 4;
      } else if (V0 == 8) {
        V1 = 3;
      } else if (V0 == 256) {
        V1 = 8;
      } else if (V0 == 2) {
        V1 = 1;
      } else if (V0 == 32) {
        V1 = 5;
      } else if (V0 == 4) {
        V1 = 2;
      } else {
        this.fromRadix(IS, V0);
        return;
      }
      this.t = 0;
      this.s = 0;
      for (var V2 = IS.length, V3 = false, V4 = 0; --V2 >= 0;) {
        var V5 = V1 == 8 ? IS[V2] & 255 : mV(IS, V2);
        if (V5 < 0) {
          if (IS.charAt(V2) == "-") {
            V3 = true;
          }
          continue;
        }
        V3 = false;
        if (V4 == 0) {
          this.data[this.t++] = V5;
        } else if (V4 + V1 > this.DB) {
          this.data[this.t - 1] |= (V5 & (1 << this.DB - V4) - 1) << V4;
          this.data[this.t++] = V5 >> this.DB - V4;
        } else {
          this.data[this.t - 1] |= V5 << V4;
        }
        V4 += V1;
        if (V4 >= this.DB) {
          V4 -= this.DB;
        }
      }
      if (V1 == 8 && IS[0] & 128) {
        this.s = -1;
        if (V4 > 0) {
          this.data[this.t - 1] |= (1 << this.DB - V4) - 1 << V4;
        }
      }
      this.clamp();
      if (V3) {
        m2.ZERO.subTo(this, this);
      }
    }
    function me() {
      for (var IS = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == IS;) {
        --this.t;
      }
    }
    function mK(IS) {
      if (this.s < 0) {
        return "-" + this.negate().toString(IS);
      }
      var V0;
      if (IS == 16) {
        V0 = 4;
      } else if (IS == 8) {
        V0 = 3;
      } else if (IS == 2) {
        V0 = 1;
      } else if (IS == 32) {
        V0 = 5;
      } else if (IS == 4) {
        V0 = 2;
      } else {
        return this.toRadix(IS);
      }
      var V1 = (1 << V0) - 1;
      var V2;
      var V3 = false;
      var V4 = "";
      var V5 = this.t;
      var V6 = this.DB - V5 * this.DB % V0;
      if (V5-- > 0) {
        for (V6 < this.DB && (V2 = this.data[V5] >> V6) > 0 && (V3 = true, V4 = mI(V2)); V5 >= 0;) {
          if (V6 < V0) {
            V2 = (this.data[V5] & (1 << V6) - 1) << V0 - V6;
            V2 |= this.data[--V5] >> (V6 += this.DB - V0);
          } else {
            V2 = this.data[V5] >> (V6 -= V0) & V1;
            if (V6 <= 0) {
              V6 += this.DB;
              --V5;
            }
          }
          if (V2 > 0) {
            V3 = true;
          }
          if (V3) {
            V4 += mI(V2);
          }
        }
      }
      if (V3) {
        return V4;
      } else {
        return "0";
      }
    }
    function mU() {
      var IS = m3();
      m2.ZERO.subTo(this, IS);
      return IS;
    }
    function mv() {
      if (this.s < 0) {
        return this.negate();
      } else {
        return this;
      }
    }
    function mM(IS) {
      var V0 = this.s - IS.s;
      if (V0 != 0) {
        return V0;
      }
      var V1 = this.t;
      V0 = V1 - IS.t;
      if (V0 != 0) {
        if (this.s < 0) {
          return -V0;
        } else {
          return V0;
        }
      }
      while (--V1 >= 0) {
        if ((V0 = this.data[V1] - IS.data[V1]) != 0) {
          return V0;
        }
      }
      return 0;
    }
    function md(IS) {
      var V0 = 1;
      var V1;
      if ((V1 = IS >>> 16) != 0) {
        IS = V1;
        V0 += 16;
      }
      if ((V1 = IS >> 8) != 0) {
        IS = V1;
        V0 += 8;
      }
      if ((V1 = IS >> 4) != 0) {
        IS = V1;
        V0 += 4;
      }
      if ((V1 = IS >> 2) != 0) {
        IS = V1;
        V0 += 2;
      }
      if ((V1 = IS >> 1) != 0) {
        IS = V1;
        V0 += 1;
      }
      return V0;
    }
    function mB() {
      if (this.t <= 0) {
        return 0;
      } else {
        return this.DB * (this.t - 1) + md(this.data[this.t - 1] ^ this.s & this.DM);
      }
    }
    function ms(IS, V0) {
      var V1;
      for (V1 = this.t - 1; V1 >= 0; --V1) {
        V0.data[V1 + IS] = this.data[V1];
      }
      for (V1 = IS - 1; V1 >= 0; --V1) {
        V0.data[V1] = 0;
      }
      V0.t = this.t + IS;
      V0.s = this.s;
    }
    function mA(IS, V0) {
      for (var V1 = IS; V1 < this.t; ++V1) {
        V0.data[V1 - IS] = this.data[V1];
      }
      V0.t = Math.max(this.t - IS, 0);
      V0.s = this.s;
    }
    function mG(IS, V0) {
      var V1 = IS % this.DB;
      var V2 = this.DB - V1;
      var V3 = (1 << V2) - 1;
      var V4 = Math.floor(IS / this.DB);
      var V5 = this.s << V1 & this.DM;
      var V6;
      for (V6 = this.t - 1; V6 >= 0; --V6) {
        V0.data[V6 + V4 + 1] = this.data[V6] >> V2 | V5;
        V5 = (this.data[V6] & V3) << V1;
      }
      for (V6 = V4 - 1; V6 >= 0; --V6) {
        V0.data[V6] = 0;
      }
      V0.data[V4] = V5;
      V0.t = this.t + V4 + 1;
      V0.s = this.s;
      V0.clamp();
    }
    function mf(IS, V0) {
      V0.s = this.s;
      var V1 = Math.floor(IS / this.DB);
      if (V1 >= this.t) {
        V0.t = 0;
        return;
      }
      var V2 = IS % this.DB;
      var V3 = this.DB - V2;
      var V4 = (1 << V2) - 1;
      V0.data[0] = this.data[V1] >> V2;
      for (var V5 = V1 + 1; V5 < this.t; ++V5) {
        V0.data[V5 - V1 - 1] |= (this.data[V5] & V4) << V3;
        V0.data[V5 - V1] = this.data[V5] >> V2;
      }
      if (V2 > 0) {
        V0.data[this.t - V1 - 1] |= (this.s & V4) << V3;
      }
      V0.t = this.t - V1;
      V0.clamp();
    }
    function mb(IS, V0) {
      for (var V1 = 0, V2 = 0, V3 = Math.min(IS.t, this.t); V1 < V3;) {
        V2 += this.data[V1] - IS.data[V1];
        V0.data[V1++] = V2 & this.DM;
        V2 >>= this.DB;
      }
      if (IS.t < this.t) {
        for (V2 -= IS.s; V1 < this.t;) {
          V2 += this.data[V1];
          V0.data[V1++] = V2 & this.DM;
          V2 >>= this.DB;
        }
        V2 += this.s;
      } else {
        for (V2 += this.s; V1 < IS.t;) {
          V2 -= IS.data[V1];
          V0.data[V1++] = V2 & this.DM;
          V2 >>= this.DB;
        }
        V2 -= IS.s;
      }
      V0.s = V2 < 0 ? -1 : 0;
      if (V2 < -1) {
        V0.data[V1++] = this.DV + V2;
      } else if (V2 > 0) {
        V0.data[V1++] = V2;
      }
      V0.t = V1;
      V0.clamp();
    }
    function mT(IS, V0) {
      var V1 = this.abs();
      var V2 = IS.abs();
      var V3 = V1.t;
      for (V0.t = V3 + V2.t; --V3 >= 0;) {
        V0.data[V3] = 0;
      }
      for (V3 = 0; V3 < V2.t; ++V3) {
        V0.data[V3 + V1.t] = V1.am(0, V2.data[V3], V0, V3, 0, V1.t);
      }
      V0.s = 0;
      V0.clamp();
      if (this.s != IS.s) {
        m2.ZERO.subTo(V0, V0);
      }
    }
    function mQ(IS) {
      var V0 = this.abs();
      for (var V1 = IS.t = V0.t * 2; --V1 >= 0;) {
        IS.data[V1] = 0;
      }
      for (V1 = 0; V1 < V0.t - 1; ++V1) {
        var V2 = V0.am(V1, V0.data[V1], IS, V1 * 2, 0, 1);
        if ((IS.data[V1 + V0.t] += V0.am(V1 + 1, V0.data[V1] * 2, IS, V1 * 2 + 1, V2, V0.t - V1 - 1)) >= V0.DV) {
          IS.data[V1 + V0.t] -= V0.DV;
          IS.data[V1 + V0.t + 1] = 1;
        }
      }
      if (IS.t > 0) {
        IS.data[IS.t - 1] += V0.am(V1, V0.data[V1], IS, V1 * 2, 0, 1);
      }
      IS.s = 0;
      IS.clamp();
    }
    function mt(IS, V0, V1) {
      var V2 = IS.abs();
      if (!(V2.t <= 0)) {
        var V3 = this.abs();
        if (V3.t < V2.t) {
          V0?.fromInt(0);
          if (V1 != null) {
            this.copyTo(V1);
          }
          return;
        }
        if (V1 == null) {
          V1 = m3();
        }
        var V4 = m3();
        var V5 = this.s;
        var V6 = IS.s;
        var V7 = this.DB - md(V2.data[V2.t - 1]);
        if (V7 > 0) {
          V2.lShiftTo(V7, V4);
          V3.lShiftTo(V7, V1);
        } else {
          V2.copyTo(V4);
          V3.copyTo(V1);
        }
        var V8 = V4.t;
        var V9 = V4.data[V8 - 1];
        if (V9 != 0) {
          var VX = V9 * (1 << this.F1) + (V8 > 1 ? V4.data[V8 - 2] >> this.F2 : 0);
          var Vm = this.FV / VX;
          var VI = (1 << this.F1) / VX;
          var VV = 1 << this.F2;
          var VE = V1.t;
          var VW = VE - V8;
          var VC = V0 ?? m3();
          V4.dlShiftTo(VW, VC);
          if (V1.compareTo(VC) >= 0) {
            V1.data[V1.t++] = 1;
            V1.subTo(VC, V1);
          }
          m2.ONE.dlShiftTo(V8, VC);
          VC.subTo(V4, V4);
          while (V4.t < V8) {
            V4.data[V4.t++] = 0;
          }
          while (--VW >= 0) {
            var VH = V1.data[--VE] == V9 ? this.DM : Math.floor(V1.data[VE] * Vm + (V1.data[VE - 1] + VV) * VI);
            if ((V1.data[VE] += V4.am(0, VH, V1, VW, 0, V8)) < VH) {
              V4.dlShiftTo(VW, VC);
              V1.subTo(VC, V1);
              while (V1.data[VE] < --VH) {
                V1.subTo(VC, V1);
              }
            }
          }
          if (V0 != null) {
            V1.drShiftTo(V8, V0);
            if (V5 != V6) {
              m2.ZERO.subTo(V0, V0);
            }
          }
          V1.t = V8;
          V1.clamp();
          if (V7 > 0) {
            V1.rShiftTo(V7, V1);
          }
          if (V5 < 0) {
            m2.ZERO.subTo(V1, V1);
          }
        }
      }
    }
    function mi(IS) {
      var V0 = m3();
      this.abs().divRemTo(IS, null, V0);
      if (this.s < 0 && V0.compareTo(m2.ZERO) > 0) {
        IS.subTo(V0, V0);
      }
      return V0;
    }
    function mO(IS) {
      this.m = IS;
    }
    function mN(IS) {
      if (IS.s < 0 || IS.compareTo(this.m) >= 0) {
        return IS.mod(this.m);
      } else {
        return IS;
      }
    }
    function mR(IS) {
      return IS;
    }
    function my(IS) {
      IS.divRemTo(this.m, null, IS);
    }
    function mk(IS, V0, V1) {
      IS.multiplyTo(V0, V1);
      this.reduce(V1);
    }
    function mj(IS, V0) {
      IS.squareTo(V0);
      this.reduce(V0);
    }
    mO.prototype.convert = mN;
    mO.prototype.revert = mR;
    mO.prototype.reduce = my;
    mO.prototype.mulTo = mk;
    mO.prototype.sqrTo = mj;
    function mJ() {
      if (this.t < 1) {
        return 0;
      }
      var IS = this.data[0];
      if (!(IS & 1)) {
        return 0;
      }
      var V0 = IS & 3;
      V0 = V0 * (2 - (IS & 15) * V0) & 15;
      V0 = V0 * (2 - (IS & 255) * V0) & 255;
      V0 = V0 * (2 - ((IS & 65535) * V0 & 65535)) & 65535;
      V0 = V0 * (2 - IS * V0 % this.DV) % this.DV;
      if (V0 > 0) {
        return this.DV - V0;
      } else {
        return -V0;
      }
    }
    function mr(IS) {
      this.m = IS;
      this.mp = IS.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << IS.DB - 15) - 1;
      this.mt2 = IS.t * 2;
    }
    function mh(IS) {
      var V0 = m3();
      IS.abs().dlShiftTo(this.m.t, V0);
      V0.divRemTo(this.m, null, V0);
      if (IS.s < 0 && V0.compareTo(m2.ZERO) > 0) {
        this.m.subTo(V0, V0);
      }
      return V0;
    }
    function mg(IS) {
      var V0 = m3();
      IS.copyTo(V0);
      this.reduce(V0);
      return V0;
    }
    function mz(IS) {
      while (IS.t <= this.mt2) {
        IS.data[IS.t++] = 0;
      }
      for (var V0 = 0; V0 < this.m.t; ++V0) {
        var V1 = IS.data[V0] & 32767;
        var V2 = V1 * this.mpl + ((V1 * this.mph + (IS.data[V0] >> 15) * this.mpl & this.um) << 15) & IS.DM;
        V1 = V0 + this.m.t;
        IS.data[V1] += this.m.am(0, V2, IS, V0, 0, this.m.t);
        while (IS.data[V1] >= IS.DV) {
          IS.data[V1] -= IS.DV;
          IS.data[++V1]++;
        }
      }
      IS.clamp();
      IS.drShiftTo(this.m.t, IS);
      if (IS.compareTo(this.m) >= 0) {
        IS.subTo(this.m, IS);
      }
    }
    function mL(IS, V0) {
      IS.squareTo(V0);
      this.reduce(V0);
    }
    function mn(IS, V0, V1) {
      IS.multiplyTo(V0, V1);
      this.reduce(V1);
    }
    mr.prototype.convert = mh;
    mr.prototype.revert = mg;
    mr.prototype.reduce = mz;
    mr.prototype.mulTo = mn;
    mr.prototype.sqrTo = mL;
    function mD() {
      return (this.t > 0 ? this.data[0] & 1 : this.s) == 0;
    }
    function mp(IS, V0) {
      if (IS > 4294967295 || IS < 1) {
        return m2.ONE;
      }
      var V1 = m3();
      var V2 = m3();
      var V3 = V0.convert(this);
      var V4 = md(IS) - 1;
      for (V3.copyTo(V1); --V4 >= 0;) {
        V0.sqrTo(V1, V2);
        if ((IS & 1 << V4) > 0) {
          V0.mulTo(V2, V3, V1);
        } else {
          var V5 = V1;
          V1 = V2;
          V2 = V5;
        }
      }
      return V0.revert(V1);
    }
    function mZ(IS, V0) {
      var V1;
      if (IS < 256 || V0.isEven()) {
        V1 = new mO(V0);
      } else {
        V1 = new mr(V0);
      }
      return this.exp(IS, V1);
    }
    m2.prototype.copyTo = mE;
    m2.prototype.fromInt = mW;
    m2.prototype.fromString = mH;
    m2.prototype.clamp = me;
    m2.prototype.dlShiftTo = ms;
    m2.prototype.drShiftTo = mA;
    m2.prototype.lShiftTo = mG;
    m2.prototype.rShiftTo = mf;
    m2.prototype.subTo = mb;
    m2.prototype.multiplyTo = mT;
    m2.prototype.squareTo = mQ;
    m2.prototype.divRemTo = mt;
    m2.prototype.invDigit = mJ;
    m2.prototype.isEven = mD;
    m2.prototype.exp = mp;
    m2.prototype.toString = mK;
    m2.prototype.negate = mU;
    m2.prototype.abs = mv;
    m2.prototype.compareTo = mM;
    m2.prototype.bitLength = mB;
    m2.prototype.mod = mi;
    m2.prototype.modPowInt = mZ;
    m2.ZERO = mC(0);
    m2.ONE = mC(1);
    function mw() {
      var IS = m3();
      this.copyTo(IS);
      return IS;
    }
    function mY() {
      if (this.s < 0) {
        if (this.t == 1) {
          return this.data[0] - this.DV;
        }
        if (this.t == 0) {
          return -1;
        }
      } else {
        if (this.t == 1) {
          return this.data[0];
        }
        if (this.t == 0) {
          return 0;
        }
      }
      return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0];
    }
    function mx() {
      if (this.t == 0) {
        return this.s;
      } else {
        return this.data[0] << 24 >> 24;
      }
    }
    function mo() {
      if (this.t == 0) {
        return this.s;
      } else {
        return this.data[0] << 16 >> 16;
      }
    }
    function mc(IS) {
      return Math.floor(Math.LN2 * this.DB / Math.log(IS));
    }
    function mP() {
      if (this.s < 0) {
        return -1;
      } else if (this.t <= 0 || this.t == 1 && this.data[0] <= 0) {
        return 0;
      } else {
        return 1;
      }
    }
    function mF(IS) {
      if (IS == null) {
        IS = 10;
      }
      if (this.signum() == 0 || IS < 2 || IS > 36) {
        return "0";
      }
      var V0 = this.chunkSize(IS);
      var V1 = Math.pow(IS, V0);
      var V2 = mC(V1);
      var V3 = m3();
      var V4 = m3();
      var V5 = "";
      for (this.divRemTo(V2, V3, V4); V3.signum() > 0;) {
        V5 = (V1 + V4.intValue()).toString(IS).substr(1) + V5;
        V3.divRemTo(V2, V3, V4);
      }
      return V4.intValue().toString(IS) + V5;
    }
    function mq(IS, V0) {
      this.fromInt(0);
      if (V0 == null) {
        V0 = 10;
      }
      var V1 = this.chunkSize(V0);
      var V2 = Math.pow(V0, V1);
      var V3 = false;
      var V4 = 0;
      var V5 = 0;
      for (var V6 = 0; V6 < IS.length; ++V6) {
        var V7 = mV(IS, V6);
        if (V7 < 0) {
          if (IS.charAt(V6) == "-" && this.signum() == 0) {
            V3 = true;
          }
          continue;
        }
        V5 = V0 * V5 + V7;
        if (++V4 >= V1) {
          this.dMultiply(V2);
          this.dAddOffset(V5, 0);
          V4 = 0;
          V5 = 0;
        }
      }
      if (V4 > 0) {
        this.dMultiply(Math.pow(V0, V4));
        this.dAddOffset(V5, 0);
      }
      if (V3) {
        m2.ZERO.subTo(this, this);
      }
    }
    function mS(IS, V0, V1) {
      if (typeof V0 == "number") {
        if (IS < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(IS, V1);
          if (!this.testBit(IS - 1)) {
            this.bitwiseTo(m2.ONE.shiftLeft(IS - 1), I7, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          while (!this.isProbablePrime(V0)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > IS) {
              this.subTo(m2.ONE.shiftLeft(IS - 1), this);
            }
          }
        }
      } else {
        var V2 = new Array();
        var V3 = IS & 7;
        V2.length = (IS >> 3) + 1;
        V0.nextBytes(V2);
        if (V3 > 0) {
          V2[0] &= (1 << V3) - 1;
        } else {
          V2[0] = 0;
        }
        this.fromString(V2, 256);
      }
    }
    function I0() {
      var IS = this.t;
      var V0 = new Array();
      V0[0] = this.s;
      var V1 = this.DB - IS * this.DB % 8;
      var V2;
      var V3 = 0;
      if (IS-- > 0) {
        for (V1 < this.DB && (V2 = this.data[IS] >> V1) != (this.s & this.DM) >> V1 && (V0[V3++] = V2 | this.s << this.DB - V1); IS >= 0;) {
          if (V1 < 8) {
            V2 = (this.data[IS] & (1 << V1) - 1) << 8 - V1;
            V2 |= this.data[--IS] >> (V1 += this.DB - 8);
          } else {
            V2 = this.data[IS] >> (V1 -= 8) & 255;
            if (V1 <= 0) {
              V1 += this.DB;
              --IS;
            }
          }
          if (V2 & 128) {
            V2 |= -256;
          }
          if (V3 == 0 && (this.s & 128) != (V2 & 128)) {
            ++V3;
          }
          if (V3 > 0 || V2 != this.s) {
            V0[V3++] = V2;
          }
        }
      }
      return V0;
    }
    function I1(IS) {
      return this.compareTo(IS) == 0;
    }
    function I2(IS) {
      if (this.compareTo(IS) < 0) {
        return this;
      } else {
        return IS;
      }
    }
    function I3(IS) {
      if (this.compareTo(IS) > 0) {
        return this;
      } else {
        return IS;
      }
    }
    function I4(IS, V0, V1) {
      var V2;
      var V3;
      var V4 = Math.min(IS.t, this.t);
      for (V2 = 0; V2 < V4; ++V2) {
        V1.data[V2] = V0(this.data[V2], IS.data[V2]);
      }
      if (IS.t < this.t) {
        V3 = IS.s & this.DM;
        V2 = V4;
        for (; V2 < this.t; ++V2) {
          V1.data[V2] = V0(this.data[V2], V3);
        }
        V1.t = this.t;
      } else {
        V3 = this.s & this.DM;
        V2 = V4;
        for (; V2 < IS.t; ++V2) {
          V1.data[V2] = V0(V3, IS.data[V2]);
        }
        V1.t = IS.t;
      }
      V1.s = V0(this.s, IS.s);
      V1.clamp();
    }
    function I5(IS, V0) {
      return IS & V0;
    }
    function I6(IS) {
      var V0 = m3();
      this.bitwiseTo(IS, I5, V0);
      return V0;
    }
    function I7(IS, V0) {
      return IS | V0;
    }
    function I8(IS) {
      var V0 = m3();
      this.bitwiseTo(IS, I7, V0);
      return V0;
    }
    function I9(IS, V0) {
      return IS ^ V0;
    }
    function IX(IS) {
      var V0 = m3();
      this.bitwiseTo(IS, I9, V0);
      return V0;
    }
    function Im(IS, V0) {
      return IS & ~V0;
    }
    function II(IS) {
      var V0 = m3();
      this.bitwiseTo(IS, Im, V0);
      return V0;
    }
    function IV() {
      var IS = m3();
      for (var V0 = 0; V0 < this.t; ++V0) {
        IS.data[V0] = this.DM & ~this.data[V0];
      }
      IS.t = this.t;
      IS.s = ~this.s;
      return IS;
    }
    function IE(IS) {
      var V0 = m3();
      if (IS < 0) {
        this.rShiftTo(-IS, V0);
      } else {
        this.lShiftTo(IS, V0);
      }
      return V0;
    }
    function IW(IS) {
      var V0 = m3();
      if (IS < 0) {
        this.lShiftTo(-IS, V0);
      } else {
        this.rShiftTo(IS, V0);
      }
      return V0;
    }
    function IC(IS) {
      if (IS == 0) {
        return -1;
      }
      var V0 = 0;
      if (!(IS & 65535)) {
        IS >>= 16;
        V0 += 16;
      }
      if (!(IS & 255)) {
        IS >>= 8;
        V0 += 8;
      }
      if (!(IS & 15)) {
        IS >>= 4;
        V0 += 4;
      }
      if (!(IS & 3)) {
        IS >>= 2;
        V0 += 2;
      }
      if (!(IS & 1)) {
        ++V0;
      }
      return V0;
    }
    function IH() {
      for (var IS = 0; IS < this.t; ++IS) {
        if (this.data[IS] != 0) {
          return IS * this.DB + IC(this.data[IS]);
        }
      }
      if (this.s < 0) {
        return this.t * this.DB;
      } else {
        return -1;
      }
    }
    function Ie(IS) {
      var V0 = 0;
      for (; IS != 0;) {
        IS &= IS - 1;
        ++V0;
      }
      return V0;
    }
    function IK() {
      var IS = 0;
      var V0 = this.s & this.DM;
      for (var V1 = 0; V1 < this.t; ++V1) {
        IS += Ie(this.data[V1] ^ V0);
      }
      return IS;
    }
    function IU(IS) {
      var V0 = Math.floor(IS / this.DB);
      if (V0 >= this.t) {
        return this.s != 0;
      } else {
        return (this.data[V0] & 1 << IS % this.DB) != 0;
      }
    }
    function Iv(IS, V0) {
      var V1 = m2.ONE.shiftLeft(IS);
      this.bitwiseTo(V1, V0, V1);
      return V1;
    }
    function IM(IS) {
      return this.changeBit(IS, I7);
    }
    function Id(IS) {
      return this.changeBit(IS, Im);
    }
    function IB(IS) {
      return this.changeBit(IS, I9);
    }
    function Is(IS, V0) {
      for (var V1 = 0, V2 = 0, V3 = Math.min(IS.t, this.t); V1 < V3;) {
        V2 += this.data[V1] + IS.data[V1];
        V0.data[V1++] = V2 & this.DM;
        V2 >>= this.DB;
      }
      if (IS.t < this.t) {
        for (V2 += IS.s; V1 < this.t;) {
          V2 += this.data[V1];
          V0.data[V1++] = V2 & this.DM;
          V2 >>= this.DB;
        }
        V2 += this.s;
      } else {
        for (V2 += this.s; V1 < IS.t;) {
          V2 += IS.data[V1];
          V0.data[V1++] = V2 & this.DM;
          V2 >>= this.DB;
        }
        V2 += IS.s;
      }
      V0.s = V2 < 0 ? -1 : 0;
      if (V2 > 0) {
        V0.data[V1++] = V2;
      } else if (V2 < -1) {
        V0.data[V1++] = this.DV + V2;
      }
      V0.t = V1;
      V0.clamp();
    }
    function IA(IS) {
      var V0 = m3();
      this.addTo(IS, V0);
      return V0;
    }
    function IG(IS) {
      var V0 = m3();
      this.subTo(IS, V0);
      return V0;
    }
    function If(IS) {
      var V0 = m3();
      this.multiplyTo(IS, V0);
      return V0;
    }
    function Ib(IS) {
      var V0 = m3();
      this.divRemTo(IS, V0, null);
      return V0;
    }
    function IT(IS) {
      var V0 = m3();
      this.divRemTo(IS, null, V0);
      return V0;
    }
    function IQ(IS) {
      var V0 = m3();
      var V1 = m3();
      this.divRemTo(IS, V0, V1);
      return new Array(V0, V1);
    }
    function It(IS) {
      this.data[this.t] = this.am(0, IS - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function IO(IS, V0) {
      if (IS != 0) {
        while (this.t <= V0) {
          this.data[this.t++] = 0;
        }
        for (this.data[V0] += IS; this.data[V0] >= this.DV;) {
          this.data[V0] -= this.DV;
          if (++V0 >= this.t) {
            this.data[this.t++] = 0;
          }
          ++this.data[V0];
        }
      }
    }
    function IN() { }
    function IR(IS) {
      return IS;
    }
    function Iy(IS, V0, V1) {
      IS.multiplyTo(V0, V1);
    }
    function Ik(IS, V0) {
      IS.squareTo(V0);
    }
    IN.prototype.convert = IR;
    IN.prototype.revert = IR;
    IN.prototype.mulTo = Iy;
    IN.prototype.sqrTo = Ik;
    function Ij(IS) {
      return this.exp(IS, new IN());
    }
    function IJ(IS, V0, V1) {
      var V2 = Math.min(this.t + IS.t, V0);
      V1.s = 0;
      V1.t = V2;
      while (V2 > 0) {
        V1.data[--V2] = 0;
      }
      var V3;
      for (V3 = V1.t - this.t; V2 < V3; ++V2) {
        V1.data[V2 + this.t] = this.am(0, IS.data[V2], V1, V2, 0, this.t);
      }
      for (V3 = Math.min(IS.t, V0); V2 < V3; ++V2) {
        this.am(0, IS.data[V2], V1, V2, 0, V0 - V2);
      }
      V1.clamp();
    }
    function Ih(IS, V0, V1) {
      --V0;
      var V2 = V1.t = this.t + IS.t - V0;
      for (V1.s = 0; --V2 >= 0;) {
        V1.data[V2] = 0;
      }
      for (V2 = Math.max(V0 - this.t, 0); V2 < IS.t; ++V2) {
        V1.data[this.t + V2 - V0] = this.am(V0 - V2, IS.data[V2], V1, 0, 0, this.t + V2 - V0);
      }
      V1.clamp();
      V1.drShiftTo(1, V1);
    }
    function Ig(IS) {
      this.r2 = m3();
      this.q3 = m3();
      m2.ONE.dlShiftTo(IS.t * 2, this.r2);
      this.mu = this.r2.divide(IS);
      this.m = IS;
    }
    function Iz(IS) {
      if (IS.s < 0 || IS.t > this.m.t * 2) {
        return IS.mod(this.m);
      }
      if (IS.compareTo(this.m) < 0) {
        return IS;
      }
      var V0 = m3();
      IS.copyTo(V0);
      this.reduce(V0);
      return V0;
    }
    function IL(IS) {
      return IS;
    }
    function In(IS) {
      IS.drShiftTo(this.m.t - 1, this.r2);
      if (IS.t > this.m.t + 1) {
        IS.t = this.m.t + 1;
        IS.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (IS.compareTo(this.r2) < 0) {
        IS.dAddOffset(1, this.m.t + 1);
      }
      for (IS.subTo(this.r2, IS); IS.compareTo(this.m) >= 0;) {
        IS.subTo(this.m, IS);
      }
    }
    function ID(IS, V0) {
      IS.squareTo(V0);
      this.reduce(V0);
    }
    function Ip(IS, V0, V1) {
      IS.multiplyTo(V0, V1);
      this.reduce(V1);
    }
    Ig.prototype.convert = Iz;
    Ig.prototype.revert = IL;
    Ig.prototype.reduce = In;
    Ig.prototype.mulTo = Ip;
    Ig.prototype.sqrTo = ID;
    function IZ(IS, V0) {
      var V1 = IS.bitLength();
      var V2;
      var V3 = mC(1);
      var V4;
      if (V1 <= 0) {
        return V3;
      }
      if (V1 < 18) {
        V2 = 1;
      } else if (V1 < 48) {
        V2 = 3;
      } else if (V1 < 144) {
        V2 = 4;
      } else if (V1 < 768) {
        V2 = 5;
      } else {
        V2 = 6;
      }
      if (V1 < 8) {
        V4 = new mO(V0);
      } else if (V0.isEven()) {
        V4 = new Ig(V0);
      } else {
        V4 = new mr(V0);
      }
      var V5 = new Array();
      var V6 = 3;
      var V7 = V2 - 1;
      var V8 = (1 << V2) - 1;
      V5[1] = V4.convert(this);
      if (V2 > 1) {
        var V9 = m3();
        for (V4.sqrTo(V5[1], V9); V6 <= V8;) {
          V5[V6] = m3();
          V4.mulTo(V9, V5[V6 - 2], V5[V6]);
          V6 += 2;
        }
      }
      var VX = IS.t - 1;
      var Vm;
      var VI = true;
      var VV = m3();
      var VE;
      for (V1 = md(IS.data[VX]) - 1; VX >= 0;) {
        if (V1 >= V7) {
          Vm = IS.data[VX] >> V1 - V7 & V8;
        } else {
          Vm = (IS.data[VX] & (1 << V1 + 1) - 1) << V7 - V1;
          if (VX > 0) {
            Vm |= IS.data[VX - 1] >> this.DB + V1 - V7;
          }
        }
        V6 = V2;
        while (!(Vm & 1)) {
          Vm >>= 1;
          --V6;
        }
        if ((V1 -= V6) < 0) {
          V1 += this.DB;
          --VX;
        }
        if (VI) {
          V5[Vm].copyTo(V3);
          VI = false;
        } else {
          while (V6 > 1) {
            V4.sqrTo(V3, VV);
            V4.sqrTo(VV, V3);
            V6 -= 2;
          }
          if (V6 > 0) {
            V4.sqrTo(V3, VV);
          } else {
            VE = V3;
            V3 = VV;
            VV = VE;
          }
          V4.mulTo(VV, V5[Vm], V3);
        }
        while (VX >= 0 && !(IS.data[VX] & 1 << V1)) {
          V4.sqrTo(V3, VV);
          VE = V3;
          V3 = VV;
          VV = VE;
          if (--V1 < 0) {
            V1 = this.DB - 1;
            --VX;
          }
        }
      }
      return V4.revert(V3);
    }
    function Iw(IS) {
      var V0 = this.s < 0 ? this.negate() : this.clone();
      var V1 = IS.s < 0 ? IS.negate() : IS.clone();
      if (V0.compareTo(V1) < 0) {
        var V2 = V0;
        V0 = V1;
        V1 = V2;
      }
      var V3 = V0.getLowestSetBit();
      var V4 = V1.getLowestSetBit();
      if (V4 < 0) {
        return V0;
      }
      if (V3 < V4) {
        V4 = V3;
      }
      if (V4 > 0) {
        V0.rShiftTo(V4, V0);
        V1.rShiftTo(V4, V1);
      }
      while (V0.signum() > 0) {
        if ((V3 = V0.getLowestSetBit()) > 0) {
          V0.rShiftTo(V3, V0);
        }
        if ((V3 = V1.getLowestSetBit()) > 0) {
          V1.rShiftTo(V3, V1);
        }
        if (V0.compareTo(V1) >= 0) {
          V0.subTo(V1, V0);
          V0.rShiftTo(1, V0);
        } else {
          V1.subTo(V0, V1);
          V1.rShiftTo(1, V1);
        }
      }
      if (V4 > 0) {
        V1.lShiftTo(V4, V1);
      }
      return V1;
    }
    function IY(IS) {
      if (IS <= 0) {
        return 0;
      }
      var V0 = this.DV % IS;
      var V1 = this.s < 0 ? IS - 1 : 0;
      if (this.t > 0) {
        if (V0 == 0) {
          V1 = this.data[0] % IS;
        } else {
          for (var V2 = this.t - 1; V2 >= 0; --V2) {
            V1 = (V0 * V1 + this.data[V2]) % IS;
          }
        }
      }
      return V1;
    }
    function Ix(IS) {
      var V0 = IS.isEven();
      if (this.isEven() && V0 || IS.signum() == 0) {
        return m2.ZERO;
      }
      for (var V1 = IS.clone(), V2 = this.clone(), V3 = mC(1), V4 = mC(0), V5 = mC(0), V6 = mC(1); V1.signum() != 0;) {
        while (V1.isEven()) {
          V1.rShiftTo(1, V1);
          if (V0) {
            if (!V3.isEven() || !V4.isEven()) {
              V3.addTo(this, V3);
              V4.subTo(IS, V4);
            }
            V3.rShiftTo(1, V3);
          } else if (!V4.isEven()) {
            V4.subTo(IS, V4);
          }
          V4.rShiftTo(1, V4);
        }
        while (V2.isEven()) {
          V2.rShiftTo(1, V2);
          if (V0) {
            if (!V5.isEven() || !V6.isEven()) {
              V5.addTo(this, V5);
              V6.subTo(IS, V6);
            }
            V5.rShiftTo(1, V5);
          } else if (!V6.isEven()) {
            V6.subTo(IS, V6);
          }
          V6.rShiftTo(1, V6);
        }
        if (V1.compareTo(V2) >= 0) {
          V1.subTo(V2, V1);
          if (V0) {
            V3.subTo(V5, V3);
          }
          V4.subTo(V6, V4);
        } else {
          V2.subTo(V1, V2);
          if (V0) {
            V5.subTo(V3, V5);
          }
          V6.subTo(V4, V6);
        }
      }
      if (V2.compareTo(m2.ONE) != 0) {
        return m2.ZERO;
      }
      if (V6.compareTo(IS) >= 0) {
        return V6.subtract(IS);
      }
      if (V6.signum() < 0) {
        V6.addTo(IS, V6);
      } else {
        return V6;
      }
      if (V6.signum() < 0) {
        return V6.add(IS);
      } else {
        return V6;
      }
    }
    var Io = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
    var Ic = 67108864 / Io[Io.length - 1];
    function IP(IS) {
      var V0;
      var V1 = this.abs();
      if (V1.t == 1 && V1.data[0] <= Io[Io.length - 1]) {
        for (V0 = 0; V0 < Io.length; ++V0) {
          if (V1.data[0] == Io[V0]) {
            return true;
          }
        }
        return false;
      }
      if (V1.isEven()) {
        return false;
      }
      for (V0 = 1; V0 < Io.length;) {
        for (var V2 = Io[V0], V3 = V0 + 1; V3 < Io.length && V2 < Ic;) {
          V2 *= Io[V3++];
        }
        for (V2 = V1.modInt(V2); V0 < V3;) {
          if (V2 % Io[V0++] == 0) {
            return false;
          }
        }
      }
      return V1.millerRabin(IS);
    }
    function IF(IS) {
      var V0 = this.subtract(m2.ONE);
      var V1 = V0.getLowestSetBit();
      if (V1 <= 0) {
        return false;
      }
      var V2 = V0.shiftRight(V1);
      var V3 = Iq();
      var V4;
      for (var V5 = 0; V5 < IS; ++V5) {
        do {
          V4 = new m2(this.bitLength(), V3);
        } while (V4.compareTo(m2.ONE) <= 0 || V4.compareTo(V0) >= 0);
        var V6 = V4.modPow(V2, this);
        if (V6.compareTo(m2.ONE) != 0 && V6.compareTo(V0) != 0) {
          for (var V7 = 1; V7++ < V1 && V6.compareTo(V0) != 0;) {
            V6 = V6.modPowInt(2, this);
            if (V6.compareTo(m2.ONE) == 0) {
              return false;
            }
          }
          if (V6.compareTo(V0) != 0) {
            return false;
          }
        }
      }
      return true;
    }
    function Iq() {
      return {
        nextBytes: function (IS) {
          for (var V0 = 0; V0 < IS.length; ++V0) {
            IS[V0] = Math.floor(Math.random() * 256);
          }
        }
      };
    }
    m2.prototype.chunkSize = mc;
    m2.prototype.toRadix = mF;
    m2.prototype.fromRadix = mq;
    m2.prototype.fromNumber = mS;
    m2.prototype.bitwiseTo = I4;
    m2.prototype.changeBit = Iv;
    m2.prototype.addTo = Is;
    m2.prototype.dMultiply = It;
    m2.prototype.dAddOffset = IO;
    m2.prototype.multiplyLowerTo = IJ;
    m2.prototype.multiplyUpperTo = Ih;
    m2.prototype.modInt = IY;
    m2.prototype.millerRabin = IF;
    m2.prototype.clone = mw;
    m2.prototype.intValue = mY;
    m2.prototype.byteValue = mx;
    m2.prototype.shortValue = mo;
    m2.prototype.signum = mP;
    m2.prototype.toByteArray = I0;
    m2.prototype.equals = I1;
    m2.prototype.min = I2;
    m2.prototype.max = I3;
    m2.prototype.and = I6;
    m2.prototype.or = I8;
    m2.prototype.xor = IX;
    m2.prototype.andNot = II;
    m2.prototype.not = IV;
    m2.prototype.shiftLeft = IE;
    m2.prototype.shiftRight = IW;
    m2.prototype.getLowestSetBit = IH;
    m2.prototype.bitCount = IK;
    m2.prototype.testBit = IU;
    m2.prototype.setBit = IM;
    m2.prototype.clearBit = Id;
    m2.prototype.flipBit = IB;
    m2.prototype.add = IA;
    m2.prototype.subtract = IG;
    m2.prototype.multiply = If;
    m2.prototype.divide = Ib;
    m2.prototype.remainder = IT;
    m2.prototype.divideAndRemainder = IQ;
    m2.prototype.modPow = IZ;
    m2.prototype.modInverse = Ix;
    m2.prototype.pow = Ij;
    m2.prototype.gcd = Iw;
    m2.prototype.isProbablePrime = IP;
  });
  var h = K((XP, XF) => {
    'use strict';

    var Xq = M();
    T();
    B();
    var XS = XF.exports = Xq.sha1 = Xq.sha1 || {};
    Xq.md.sha1 = Xq.md.algorithms.sha1 = XS;
    XS.create = function () {
      if (!m1) {
        m2();
      }
      var m4 = null;
      var m5 = Xq.util.createBuffer();
      var m6 = new Array(80);
      var m7 = {
        algorithm: "sha1",
        blockLength: 64,
        digestLength: 20,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      m7.start = function () {
        m7.messageLength = 0;
        m7.fullMessageLength = m7.messageLength64 = [];
        for (var m8 = m7.messageLengthSize / 4, m9 = 0; m9 < m8; ++m9) {
          m7.fullMessageLength.push(0);
        }
        m5 = Xq.util.createBuffer();
        m4 = {
          h0: 1732584193,
          h1: 4023233417,
          h2: 2562383102,
          h3: 271733878,
          h4: 3285377520
        };
        return m7;
      };
      m7.start();
      m7.update = function (m8, m9) {
        if (m9 === "utf8") {
          m8 = Xq.util.encodeUtf8(m8);
        }
        var mX = m8.length;
        m7.messageLength += mX;
        mX = [mX / 4294967296 >>> 0, mX >>> 0];
        for (var mm = m7.fullMessageLength.length - 1; mm >= 0; --mm) {
          m7.fullMessageLength[mm] += mX[1];
          mX[1] = mX[0] + (m7.fullMessageLength[mm] / 4294967296 >>> 0);
          m7.fullMessageLength[mm] = m7.fullMessageLength[mm] >>> 0;
          mX[0] = mX[1] / 4294967296 >>> 0;
        }
        m5.putBytes(m8);
        m3(m4, m6, m5);
        if (m5.read > 2048 || m5.length() === 0) {
          m5.compact();
        }
        return m7;
      };
      m7.digest = function () {
        var m8 = Xq.util.createBuffer();
        m8.putBytes(m5.bytes());
        var m9 = m7.fullMessageLength[m7.fullMessageLength.length - 1] + m7.messageLengthSize;
        var mX = m9 & m7.blockLength - 1;
        m8.putBytes(m0.substr(0, m7.blockLength - mX));
        var mm;
        var mI;
        var mV = m7.fullMessageLength[0] * 8;
        for (var mE = 0; mE < m7.fullMessageLength.length - 1; ++mE) {
          mm = m7.fullMessageLength[mE + 1] * 8;
          mI = mm / 4294967296 >>> 0;
          mV += mI;
          m8.putInt32(mV >>> 0);
          mV = mm >>> 0;
        }
        m8.putInt32(mV);
        var mW = {
          h0: m4.h0,
          h1: m4.h1,
          h2: m4.h2,
          h3: m4.h3,
          h4: m4.h4
        };
        m3(mW, m6, m8);
        var mC = Xq.util.createBuffer();
        mC.putInt32(mW.h0);
        mC.putInt32(mW.h1);
        mC.putInt32(mW.h2);
        mC.putInt32(mW.h3);
        mC.putInt32(mW.h4);
        return mC;
      };
      return m7;
    };
    var m0 = null;
    var m1 = false;
    function m2() {
      m0 = "";
      m0 += Xq.util.fillString("\0", 64);
      m1 = true;
    }
    function m3(m4, m5, m6) {
      var m7;
      var m8;
      var m9;
      var mX;
      var mm;
      var mI;
      var mV;
      var mE;
      for (var mW = m6.length(); mW >= 64;) {
        m8 = m4.h0;
        m9 = m4.h1;
        mX = m4.h2;
        mm = m4.h3;
        mI = m4.h4;
        mE = 0;
        for (; mE < 16; ++mE) {
          m7 = m6.getInt32();
          m5[mE] = m7;
          mV = mm ^ m9 & (mX ^ mm);
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 1518500249 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        for (; mE < 20; ++mE) {
          m7 = m5[mE - 3] ^ m5[mE - 8] ^ m5[mE - 14] ^ m5[mE - 16];
          m7 = m7 << 1 | m7 >>> 31;
          m5[mE] = m7;
          mV = mm ^ m9 & (mX ^ mm);
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 1518500249 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        for (; mE < 32; ++mE) {
          m7 = m5[mE - 3] ^ m5[mE - 8] ^ m5[mE - 14] ^ m5[mE - 16];
          m7 = m7 << 1 | m7 >>> 31;
          m5[mE] = m7;
          mV = m9 ^ mX ^ mm;
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 1859775393 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        for (; mE < 40; ++mE) {
          m7 = m5[mE - 6] ^ m5[mE - 16] ^ m5[mE - 28] ^ m5[mE - 32];
          m7 = m7 << 2 | m7 >>> 30;
          m5[mE] = m7;
          mV = m9 ^ mX ^ mm;
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 1859775393 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        for (; mE < 60; ++mE) {
          m7 = m5[mE - 6] ^ m5[mE - 16] ^ m5[mE - 28] ^ m5[mE - 32];
          m7 = m7 << 2 | m7 >>> 30;
          m5[mE] = m7;
          mV = m9 & mX | mm & (m9 ^ mX);
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 2400959708 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        for (; mE < 80; ++mE) {
          m7 = m5[mE - 6] ^ m5[mE - 16] ^ m5[mE - 28] ^ m5[mE - 32];
          m7 = m7 << 2 | m7 >>> 30;
          m5[mE] = m7;
          mV = m9 ^ mX ^ mm;
          m7 = (m8 << 5 | m8 >>> 27) + mV + mI + 3395469782 + m7;
          mI = mm;
          mm = mX;
          mX = (m9 << 30 | m9 >>> 2) >>> 0;
          m9 = m8;
          m8 = m7;
        }
        m4.h0 = m4.h0 + m8 | 0;
        m4.h1 = m4.h1 + m9 | 0;
        m4.h2 = m4.h2 + mX | 0;
        m4.h3 = m4.h3 + mm | 0;
        m4.h4 = m4.h4 + mI | 0;
        mW -= 64;
      }
    }
  });
  var g = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    j();
    h();
    var XS = XF.exports = Xq.pkcs1 = Xq.pkcs1 || {};
    XS.encode_rsa_oaep = function (m1, m2, m3) {
      var m4;
      var m5;
      var m6;
      var m7;
      if (typeof m3 == "string") {
        m4 = m3;
        m5 = arguments[3] || undefined;
        m6 = arguments[4] || undefined;
      } else if (m3) {
        m4 = m3.label || undefined;
        m5 = m3.seed || undefined;
        m6 = m3.md || undefined;
        if (m3.mgf1 && m3.mgf1.md) {
          m7 = m3.mgf1.md;
        }
      }
      if (m6) {
        m6.start();
      } else {
        m6 = Xq.md.sha1.create();
      }
      m7 ||= m6;
      var m8 = Math.ceil(m1.n.bitLength() / 8);
      var m9 = m8 - m6.digestLength * 2 - 2;
      if (m2.length > m9) {
        var mX = new Error("RSAES-OAEP input message length is too long.");
        mX.length = m2.length;
        mX.maxLength = m9;
        throw mX;
      }
      m4 ||= "";
      m6.update(m4, "raw");
      var mm = m6.digest();
      var mI = "";
      for (var mV = m9 - m2.length, mE = 0; mE < mV; mE++) {
        mI += "\0";
      }
      var mW = mm.getBytes() + mI + "" + m2;
      if (!m5) {
        m5 = Xq.random.getBytes(m6.digestLength);
      } else if (m5.length !== m6.digestLength) {
        var mX = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
        mX.seedLength = m5.length;
        mX.digestLength = m6.digestLength;
        throw mX;
      }
      var mC = m0(m5, m8 - m6.digestLength - 1, m7);
      var mH = Xq.util.xorBytes(mW, mC, mW.length);
      var me = m0(mH, m6.digestLength, m7);
      var mK = Xq.util.xorBytes(m5, me, m5.length);
      return "\0" + mK + mH;
    };
    XS.decode_rsa_oaep = function (m1, m2, m3) {
      var m4;
      var m5;
      var m6;
      if (typeof m3 == "string") {
        m4 = m3;
        m5 = arguments[3] || undefined;
      } else if (m3) {
        m4 = m3.label || undefined;
        m5 = m3.md || undefined;
        if (m3.mgf1 && m3.mgf1.md) {
          m6 = m3.mgf1.md;
        }
      }
      var m7 = Math.ceil(m1.n.bitLength() / 8);
      if (m2.length !== m7) {
        var m8 = new Error("RSAES-OAEP encoded message length is invalid.");
        m8.length = m2.length;
        m8.expectedLength = m7;
        throw m8;
      }
      if (m5 === undefined) {
        m5 = Xq.md.sha1.create();
      } else {
        m5.start();
      }
      m6 ||= m5;
      if (m7 < m5.digestLength * 2 + 2) {
        throw new Error("RSAES-OAEP key is too short for the hash function.");
      }
      m4 ||= "";
      m5.update(m4, "raw");
      var m9 = m5.digest().getBytes();
      var mX = m2.charAt(0);
      var mm = m2.substring(1, m5.digestLength + 1);
      var mI = m2.substring(1 + m5.digestLength);
      var mV = m0(mI, m5.digestLength, m6);
      var mE = Xq.util.xorBytes(mm, mV, mm.length);
      var mW = m0(mE, m7 - m5.digestLength - 1, m6);
      var mC = Xq.util.xorBytes(mI, mW, mI.length);
      var mH = mC.substring(0, m5.digestLength);
      var m8 = mX !== "\0";
      for (var me = 0; me < m5.digestLength; ++me) {
        m8 |= m9.charAt(me) !== mH.charAt(me);
      }
      var mK = 1;
      var mU = m5.digestLength;
      for (var mv = m5.digestLength; mv < mC.length; mv++) {
        var mM = mC.charCodeAt(mv);
        var md = mM & 1 ^ 1;
        var mB = mK ? 65534 : 0;
        m8 |= mM & mB;
        mK = mK & md;
        mU += mK;
      }
      if (m8 || mC.charCodeAt(mU) !== 1) {
        throw new Error("Invalid RSAES-OAEP padding.");
      }
      return mC.substring(mU + 1);
    };
    function m0(m1, m2, m3) {
      m3 ||= Xq.md.sha1.create();
      var m4 = "";
      for (var m5 = Math.ceil(m2 / m3.digestLength), m6 = 0; m6 < m5; ++m6) {
        var m7 = String.fromCharCode(m6 >> 24 & 255, m6 >> 16 & 255, m6 >> 8 & 255, m6 & 255);
        m3.start();
        m3.update(m1 + m7);
        m4 += m3.digest().getBytes();
      }
      return m4.substring(0, m2);
    }
  });
  var L = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    r();
    j();
    (function () {
      if (Xq.prime) {
        XF.exports = Xq.prime;
        return;
      }
      var XS = XF.exports = Xq.prime = Xq.prime || {};
      var m0 = Xq.jsbn.BigInteger;
      var m1 = [6, 4, 2, 4, 2, 4, 6, 2];
      var m2 = new m0(null);
      m2.fromInt(30);
      function m3(mX, mm) {
        return mX | mm;
      }
      XS.generateProbablePrime = function (mX, mm, mI) {
        if (typeof mm == "function") {
          mI = mm;
          mm = {};
        }
        mm = mm || {};
        var mV = mm.algorithm || "PRIMEINC";
        if (typeof mV == "string") {
          mV = {
            name: mV
          };
        }
        mV.options = mV.options || {};
        var mE = mm.prng || Xq.random;
        var mW = {
          nextBytes: function (mC) {
            var mH = mE.getBytesSync(mC.length);
            for (var me = 0; me < mC.length; ++me) {
              mC[me] = mH.charCodeAt(me);
            }
          }
        };
        if (mV.name === "PRIMEINC") {
          return m4(mX, mW, mV.options, mI);
        }
        throw new Error("Invalid prime generation algorithm: " + mV.name);
      };
      function m4(mX, mm, mI, mV) {
        if ("workers" in mI) {
          return m7(mX, mm, mI, mV);
        } else {
          return m5(mX, mm, mI, mV);
        }
      }
      function m5(mX, mm, mI, mV) {
        var mE = m8(mX, mm);
        var mW = 0;
        var mC = m9(mE.bitLength());
        if ("millerRabinTests" in mI) {
          mC = mI.millerRabinTests;
        }
        var mH = 10;
        if ("maxBlockTime" in mI) {
          mH = mI.maxBlockTime;
        }
        m6(mE, mX, mm, mW, mC, mH, mV);
      }
      function m6(mX, mm, mI, mV, mE, mW, mC) {
        var mH = +new Date();
        do {
          if (mX.bitLength() > mm) {
            mX = m8(mm, mI);
          }
          if (mX.isProbablePrime(mE)) {
            return mC(null, mX);
          }
          mX.dAddOffset(m1[mV++ % 8], 0);
        } while (mW < 0 || +new Date() - mH < mW);
        Xq.util.setImmediate(function () {
          m6(mX, mm, mI, mV, mE, mW, mC);
        });
      }
      function m7(mX, mm, mI, mV) {
        if (typeof Worker === "undefined") {
          return m5(mX, mm, mI, mV);
        }
        var mE = m8(mX, mm);
        var mW = mI.workers;
        var mC = mI.workLoad || 100;
        var mH = mC * 30 / 8;
        var me = mI.workerScript || "forge/prime.worker.js";
        if (mW === -1) {
          return Xq.util.estimateCores(function (mU, mv) {
            if (mU) {
              mv = 2;
            }
            mW = mv - 1;
            mK();
          });
        }
        mK();
        function mK() {
          mW = Math.max(1, mW);
          var mU = [];
          for (var mv = 0; mv < mW; ++mv) {
            mU[mv] = new Worker(me);
          }
          var mM = mW;
          for (var mv = 0; mv < mW; ++mv) {
            mU[mv].addEventListener("message", mB);
          }
          var md = false;
          function mB(ms) {
            if (!md) {
              --mM;
              var mA = ms.data;
              if (mA.found) {
                for (var mG = 0; mG < mU.length; ++mG) {
                  mU[mG].terminate();
                }
                md = true;
                return mV(null, new m0(mA.prime, 16));
              }
              if (mE.bitLength() > mX) {
                mE = m8(mX, mm);
              }
              var mf = mE.toString(16);
              ms.target.postMessage({
                hex: mf,
                workLoad: mC
              });
              mE.dAddOffset(mH, 0);
            }
          }
        }
      }
      function m8(mX, mm) {
        var mI = new m0(mX, mm);
        var mV = mX - 1;
        if (!mI.testBit(mV)) {
          mI.bitwiseTo(m0.ONE.shiftLeft(mV), m3, mI);
        }
        mI.dAddOffset(31 - mI.mod(m2).byteValue(), 0);
        return mI;
      }
      function m9(mX) {
        if (mX <= 100) {
          return 27;
        } else if (mX <= 150) {
          return 18;
        } else if (mX <= 200) {
          return 15;
        } else if (mX <= 250) {
          return 12;
        } else if (mX <= 300) {
          return 9;
        } else if (mX <= 350) {
          return 8;
        } else if (mX <= 400) {
          return 7;
        } else if (mX <= 500) {
          return 6;
        } else if (mX <= 600) {
          return 5;
        } else if (mX <= 800) {
          return 4;
        } else if (mX <= 1250) {
          return 3;
        } else {
          return 2;
        }
      }
    })();
  });
  var n = K((XP, XF) => {
    'use strict';

    var Xq = M();
    b();
    r();
    f();
    g();
    L();
    j();
    B();
    if (typeof XS === "undefined") {
      XS = Xq.jsbn.BigInteger;
    }
    var XS;
    var m0 = Xq.util.isNodejs ? N() : null;
    var m1 = Xq.asn1;
    var m2 = Xq.util;
    Xq.pki = Xq.pki || {};
    XF.exports = Xq.pki.rsa = Xq.rsa = Xq.rsa || {};
    var m3 = Xq.pki;
    var m4 = [6, 4, 2, 4, 2, 4, 6, 2];
    var m5 = {
      name: "PrivateKeyInfo",
      tagClass: m1.Class.UNIVERSAL,
      type: m1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PrivateKeyInfo.version",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "PrivateKeyInfo.privateKeyAlgorithm",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: m1.Class.UNIVERSAL,
          type: m1.Type.OID,
          constructed: false,
          capture: "privateKeyOid"
        }]
      }, {
        name: "PrivateKeyInfo",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.OCTETSTRING,
        constructed: false,
        capture: "privateKey"
      }]
    };
    var m6 = {
      name: "RSAPrivateKey",
      tagClass: m1.Class.UNIVERSAL,
      type: m1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPrivateKey.version",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "RSAPrivateKey.modulus",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyModulus"
      }, {
        name: "RSAPrivateKey.publicExponent",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPublicExponent"
      }, {
        name: "RSAPrivateKey.privateExponent",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrivateExponent"
      }, {
        name: "RSAPrivateKey.prime1",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime1"
      }, {
        name: "RSAPrivateKey.prime2",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime2"
      }, {
        name: "RSAPrivateKey.exponent1",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent1"
      }, {
        name: "RSAPrivateKey.exponent2",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent2"
      }, {
        name: "RSAPrivateKey.coefficient",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyCoefficient"
      }]
    };
    var m7 = {
      name: "RSAPublicKey",
      tagClass: m1.Class.UNIVERSAL,
      type: m1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPublicKey.modulus",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyModulus"
      }, {
        name: "RSAPublicKey.exponent",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyExponent"
      }]
    };
    var m8 = Xq.pki.rsa.publicKeyValidator = {
      name: "SubjectPublicKeyInfo",
      tagClass: m1.Class.UNIVERSAL,
      type: m1.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "subjectPublicKeyInfo",
      value: [{
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: m1.Class.UNIVERSAL,
          type: m1.Type.OID,
          constructed: false,
          capture: "publicKeyOid"
        }]
      }, {
        name: "SubjectPublicKeyInfo.subjectPublicKey",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.BITSTRING,
        constructed: false,
        value: [{
          name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
          tagClass: m1.Class.UNIVERSAL,
          type: m1.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: "rsaPublicKey"
        }]
      }]
    };
    var m9 = {
      name: "DigestInfo",
      tagClass: m1.Class.UNIVERSAL,
      type: m1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "DigestInfo.DigestAlgorithm",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
          tagClass: m1.Class.UNIVERSAL,
          type: m1.Type.OID,
          constructed: false,
          capture: "algorithmIdentifier"
        }, {
          name: "DigestInfo.DigestAlgorithm.parameters",
          tagClass: m1.Class.UNIVERSAL,
          type: m1.Type.NULL,
          capture: "parameters",
          optional: true,
          constructed: false
        }]
      }, {
        name: "DigestInfo.digest",
        tagClass: m1.Class.UNIVERSAL,
        type: m1.Type.OCTETSTRING,
        constructed: false,
        capture: "digest"
      }]
    };
    function mX(mv) {
      var mM;
      if (mv.algorithm in m3.oids) {
        mM = m3.oids[mv.algorithm];
      } else {
        var md = new Error("Unknown message digest algorithm.");
        md.algorithm = mv.algorithm;
        throw md;
      }
      var mB = m1.oidToDer(mM).getBytes();
      var ms = m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, []);
      var mA = m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, []);
      mA.value.push(m1.create(m1.Class.UNIVERSAL, m1.Type.OID, false, mB));
      mA.value.push(m1.create(m1.Class.UNIVERSAL, m1.Type.NULL, false, ""));
      var mG = m1.create(m1.Class.UNIVERSAL, m1.Type.OCTETSTRING, false, mv.digest().getBytes());
      ms.value.push(mA);
      ms.value.push(mG);
      return m1.toDer(ms).getBytes();
    }
    function mm(mv, mM, md) {
      if (md) {
        return mv.modPow(mM.e, mM.n);
      }
      if (!mM.p || !mM.q) {
        return mv.modPow(mM.d, mM.n);
      }
      mM.dP ||= mM.d.mod(mM.p.subtract(XS.ONE));
      mM.dQ ||= mM.d.mod(mM.q.subtract(XS.ONE));
      mM.qInv ||= mM.q.modInverse(mM.p);
      var mB;
      do {
        mB = new XS(Xq.util.bytesToHex(Xq.random.getBytes(mM.n.bitLength() / 8)), 16);
      } while (mB.compareTo(mM.n) >= 0 || !mB.gcd(mM.n).equals(XS.ONE));
      mv = mv.multiply(mB.modPow(mM.e, mM.n)).mod(mM.n);
      for (var ms = mv.mod(mM.p).modPow(mM.dP, mM.p), mA = mv.mod(mM.q).modPow(mM.dQ, mM.q); ms.compareTo(mA) < 0;) {
        ms = ms.add(mM.p);
      }
      var mG = ms.subtract(mA).multiply(mM.qInv).mod(mM.p).multiply(mM.q).add(mA);
      mG = mG.multiply(mB.modInverse(mM.n)).mod(mM.n);
      return mG;
    }
    m3.rsa.encrypt = function (mv, mM, md) {
      var mB = md;
      var ms;
      var mA = Math.ceil(mM.n.bitLength() / 8);
      if (md !== false && md !== true) {
        mB = md === 2;
        ms = mI(mv, mM, md);
      } else {
        ms = Xq.util.createBuffer();
        ms.putBytes(mv);
      }
      var mG = new XS(ms.toHex(), 16);
      var mf = mm(mG, mM, mB);
      var mb = mf.toString(16);
      var mT = Xq.util.createBuffer();
      for (var mQ = mA - Math.ceil(mb.length / 2); mQ > 0;) {
        mT.putByte(0);
        --mQ;
      }
      mT.putBytes(Xq.util.hexToBytes(mb));
      return mT.getBytes();
    };
    m3.rsa.decrypt = function (mv, mM, md, mB) {
      var ms = Math.ceil(mM.n.bitLength() / 8);
      if (mv.length !== ms) {
        var mA = new Error("Encrypted message length is invalid.");
        mA.length = mv.length;
        mA.expected = ms;
        throw mA;
      }
      var mG = new XS(Xq.util.createBuffer(mv).toHex(), 16);
      if (mG.compareTo(mM.n) >= 0) {
        throw new Error("Encrypted message is invalid.");
      }
      var mf = mm(mG, mM, md);
      var mb = mf.toString(16);
      var mT = Xq.util.createBuffer();
      for (var mQ = ms - Math.ceil(mb.length / 2); mQ > 0;) {
        mT.putByte(0);
        --mQ;
      }
      mT.putBytes(Xq.util.hexToBytes(mb));
      if (mB !== false) {
        return mV(mT.getBytes(), mM, md);
      } else {
        return mT.getBytes();
      }
    };
    m3.rsa.createKeyPairGenerationState = function (mv, mM, md) {
      if (typeof mv == "string") {
        mv = parseInt(mv, 10);
      }
      mv = mv || 2048;
      md = md || {};
      var mB = md.prng || Xq.random;
      var ms = {
        nextBytes: function (mf) {
          var mb = mB.getBytesSync(mf.length);
          for (var mT = 0; mT < mf.length; ++mT) {
            mf[mT] = mb.charCodeAt(mT);
          }
        }
      };
      var mA = md.algorithm || "PRIMEINC";
      var mG;
      if (mA === "PRIMEINC") {
        mG = {
          algorithm: mA,
          state: 0,
          bits: mv,
          rng: ms,
          eInt: mM || 65537,
          e: new XS(null),
          p: null,
          q: null,
          qBits: mv >> 1,
          pBits: mv - (mv >> 1),
          pqState: 0,
          num: null,
          keys: null
        };
        mG.e.fromInt(mG.eInt);
      } else {
        throw new Error("Invalid key generation algorithm: " + mA);
      }
      return mG;
    };
    m3.rsa.stepKeyPairGenerationState = function (mv, mM) {
      if (!("algorithm" in mv)) {
        mv.algorithm = "PRIMEINC";
      }
      var md = new XS(null);
      md.fromInt(30);
      for (var mB = 0, ms = function (mt, mi) {
        return mt | mi;
      }, mA = +new Date(), mG, mf = 0; mv.keys === null && (mM <= 0 || mf < mM);) {
        if (mv.state === 0) {
          var mb = mv.p === null ? mv.pBits : mv.qBits;
          var mT = mb - 1;
          if (mv.pqState === 0) {
            mv.num = new XS(mb, mv.rng);
            if (!mv.num.testBit(mT)) {
              mv.num.bitwiseTo(XS.ONE.shiftLeft(mT), ms, mv.num);
            }
            mv.num.dAddOffset(31 - mv.num.mod(md).byteValue(), 0);
            mB = 0;
            ++mv.pqState;
          } else if (mv.pqState === 1) {
            if (mv.num.bitLength() > mb) {
              mv.pqState = 0;
            } else if (mv.num.isProbablePrime(mC(mv.num.bitLength()))) {
              ++mv.pqState;
            } else {
              mv.num.dAddOffset(m4[mB++ % 8], 0);
            }
          } else if (mv.pqState === 2) {
            mv.pqState = mv.num.subtract(XS.ONE).gcd(mv.e).compareTo(XS.ONE) === 0 ? 3 : 0;
          } else if (mv.pqState === 3) {
            mv.pqState = 0;
            if (mv.p === null) {
              mv.p = mv.num;
            } else {
              mv.q = mv.num;
            }
            if (mv.p !== null && mv.q !== null) {
              ++mv.state;
            }
            mv.num = null;
          }
        } else if (mv.state === 1) {
          if (mv.p.compareTo(mv.q) < 0) {
            mv.num = mv.p;
            mv.p = mv.q;
            mv.q = mv.num;
          }
          ++mv.state;
        } else if (mv.state === 2) {
          mv.p1 = mv.p.subtract(XS.ONE);
          mv.q1 = mv.q.subtract(XS.ONE);
          mv.phi = mv.p1.multiply(mv.q1);
          ++mv.state;
        } else if (mv.state === 3) {
          if (mv.phi.gcd(mv.e).compareTo(XS.ONE) === 0) {
            ++mv.state;
          } else {
            mv.p = null;
            mv.q = null;
            mv.state = 0;
          }
        } else if (mv.state === 4) {
          mv.n = mv.p.multiply(mv.q);
          if (mv.n.bitLength() === mv.bits) {
            ++mv.state;
          } else {
            mv.q = null;
            mv.state = 0;
          }
        } else if (mv.state === 5) {
          var mQ = mv.e.modInverse(mv.phi);
          mv.keys = {
            privateKey: m3.rsa.setPrivateKey(mv.n, mv.e, mQ, mv.p, mv.q, mQ.mod(mv.p1), mQ.mod(mv.q1), mv.q.modInverse(mv.p)),
            publicKey: m3.rsa.setPublicKey(mv.n, mv.e)
          };
        }
        mG = +new Date();
        mf += mG - mA;
        mA = mG;
      }
      return mv.keys !== null;
    };
    m3.rsa.generateKeyPair = function (mv, mM, md, mB) {
      if (arguments.length === 1) {
        if (typeof mv == "object") {
          md = mv;
          mv = undefined;
        } else if (typeof mv == "function") {
          mB = mv;
          mv = undefined;
        }
      } else if (arguments.length === 2) {
        if (typeof mv == "number") {
          if (typeof mM == "function") {
            mB = mM;
            mM = undefined;
          } else if (typeof mM != "number") {
            md = mM;
            mM = undefined;
          }
        } else {
          md = mv;
          mB = mM;
          mv = undefined;
          mM = undefined;
        }
      } else if (arguments.length === 3) {
        if (typeof mM == "number") {
          if (typeof md == "function") {
            mB = md;
            md = undefined;
          }
        } else {
          mB = md;
          md = mM;
          mM = undefined;
        }
      }
      md = md || {};
      if (mv === undefined) {
        mv = md.bits || 2048;
      }
      if (mM === undefined) {
        mM = md.e || 65537;
      }
      if (!Xq.options.usePureJavaScript && !md.prng && mv >= 256 && mv <= 16384 && (mM === 65537 || mM === 3)) {
        if (mB) {
          if (mH("generateKeyPair")) {
            return m0.generateKeyPair("rsa", {
              modulusLength: mv,
              publicExponent: mM,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            }, function (mf, mb, mT) {
              if (mf) {
                return mB(mf);
              }
              mB(null, {
                privateKey: m3.privateKeyFromPem(mT),
                publicKey: m3.publicKeyFromPem(mb)
              });
            });
          }
          if (me("generateKey") && me("exportKey")) {
            return m2.globalScope.crypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: mv,
              publicExponent: mU(mM),
              hash: {
                name: "SHA-256"
              }
            }, true, ["sign", "verify"]).then(function (mf) {
              return m2.globalScope.crypto.subtle.exportKey("pkcs8", mf.privateKey);
            }).then(undefined, function (mf) {
              mB(mf);
            }).then(function (mf) {
              if (mf) {
                var mb = m3.privateKeyFromAsn1(m1.fromDer(Xq.util.createBuffer(mf)));
                mB(null, {
                  privateKey: mb,
                  publicKey: m3.setRsaPublicKey(mb.n, mb.e)
                });
              }
            });
          }
          if (mK("generateKey") && mK("exportKey")) {
            var ms = m2.globalScope.msCrypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: mv,
              publicExponent: mU(mM),
              hash: {
                name: "SHA-256"
              }
            }, true, ["sign", "verify"]);
            ms.oncomplete = function (mf) {
              var mb = mf.target.result;
              var mT = m2.globalScope.msCrypto.subtle.exportKey("pkcs8", mb.privateKey);
              mT.oncomplete = function (mQ) {
                var mt = mQ.target.result;
                var mi = m3.privateKeyFromAsn1(m1.fromDer(Xq.util.createBuffer(mt)));
                mB(null, {
                  privateKey: mi,
                  publicKey: m3.setRsaPublicKey(mi.n, mi.e)
                });
              };
              mT.onerror = function (mQ) {
                mB(mQ);
              };
            };
            ms.onerror = function (mf) {
              mB(mf);
            };
            return;
          }
        } else if (mH("generateKeyPairSync")) {
          var mA = m0.generateKeyPairSync("rsa", {
            modulusLength: mv,
            publicExponent: mM,
            publicKeyEncoding: {
              type: "spki",
              format: "pem"
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem"
            }
          });
          return {
            privateKey: m3.privateKeyFromPem(mA.privateKey),
            publicKey: m3.publicKeyFromPem(mA.publicKey)
          };
        }
      }
      var mG = m3.rsa.createKeyPairGenerationState(mv, mM, md);
      if (!mB) {
        m3.rsa.stepKeyPairGenerationState(mG, 0);
        return mG.keys;
      }
      mE(mG, md, mB);
    };
    m3.setRsaPublicKey = m3.rsa.setPublicKey = function (mv, mM) {
      var md = {
        n: mv,
        e: mM
      };
      md.encrypt = function (mB, ms, mA) {
        if (typeof ms == "string") {
          ms = ms.toUpperCase();
        } else if (ms === undefined) {
          ms = "RSAES-PKCS1-V1_5";
        }
        if (ms === "RSAES-PKCS1-V1_5") {
          ms = {
            encode: function (mf, mb, mT) {
              return mI(mf, mb, 2).getBytes();
            }
          };
        } else if (ms === "RSA-OAEP" || ms === "RSAES-OAEP") {
          ms = {
            encode: function (mf, mb) {
              return Xq.pkcs1.encode_rsa_oaep(mb, mf, mA);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(ms) !== -1) {
          ms = {
            encode: function (mf) {
              return mf;
            }
          };
        } else if (typeof ms == "string") {
          throw new Error("Unsupported encryption scheme: \"" + ms + "\".");
        }
        var mG = ms.encode(mB, md, true);
        return m3.rsa.encrypt(mG, md, true);
      };
      md.verify = function (mB, ms, mA, mG) {
        if (typeof mA == "string") {
          mA = mA.toUpperCase();
        } else if (mA === undefined) {
          mA = "RSASSA-PKCS1-V1_5";
        }
        if (mG === undefined) {
          mG = {
            _parseAllDigestBytes: true
          };
        }
        if (!("_parseAllDigestBytes" in mG)) {
          mG._parseAllDigestBytes = true;
        }
        if (mA === "RSASSA-PKCS1-V1_5") {
          mA = {
            verify: function (mb, mT) {
              mT = mV(mT, md, true);
              var mQ = m1.fromDer(mT, {
                parseAllBytes: mG._parseAllDigestBytes
              });
              var mt = {};
              var mi = [];
              if (!m1.validate(mQ, m9, mt, mi)) {
                var mO = new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value.");
                mO.errors = mi;
                throw mO;
              }
              var mu = m1.derToOid(mt.algorithmIdentifier);
              if (mu !== Xq.oids.md2 && mu !== Xq.oids.md5 && mu !== Xq.oids.sha1 && mu !== Xq.oids.sha224 && mu !== Xq.oids.sha256 && mu !== Xq.oids.sha384 && mu !== Xq.oids.sha512 && mu !== Xq.oids["sha512-224"] && mu !== Xq.oids["sha512-256"]) {
                var mO = new Error("Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier.");
                mO.oid = mu;
                throw mO;
              }
              if ((mu === Xq.oids.md2 || mu === Xq.oids.md5) && !("parameters" in mt)) {
                throw new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters.");
              }
              return mb === mt.digest;
            }
          };
        } else if (mA === "NONE" || mA === "NULL" || mA === null) {
          mA = {
            verify: function (mb, mT) {
              mT = mV(mT, md, true);
              return mb === mT;
            }
          };
        }
        var mf = m3.rsa.decrypt(ms, md, true, false);
        return mA.verify(mB, mf, md.n.bitLength());
      };
      return md;
    };
    m3.setRsaPrivateKey = m3.rsa.setPrivateKey = function (mv, mM, md, mB, ms, mA, mG, mf) {
      var mb = {
        n: mv,
        e: mM,
        d: md,
        p: mB,
        q: ms,
        dP: mA,
        dQ: mG,
        qInv: mf
      };
      mb.decrypt = function (mT, mQ, mt) {
        if (typeof mQ == "string") {
          mQ = mQ.toUpperCase();
        } else if (mQ === undefined) {
          mQ = "RSAES-PKCS1-V1_5";
        }
        var mi = m3.rsa.decrypt(mT, mb, false, false);
        if (mQ === "RSAES-PKCS1-V1_5") {
          mQ = {
            decode: mV
          };
        } else if (mQ === "RSA-OAEP" || mQ === "RSAES-OAEP") {
          mQ = {
            decode: function (mO, mu) {
              return Xq.pkcs1.decode_rsa_oaep(mu, mO, mt);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(mQ) !== -1) {
          mQ = {
            decode: function (mO) {
              return mO;
            }
          };
        } else {
          throw new Error("Unsupported encryption scheme: \"" + mQ + "\".");
        }
        return mQ.decode(mi, mb, false);
      };
      mb.sign = function (mT, mQ) {
        var mt = false;
        if (typeof mQ == "string") {
          mQ = mQ.toUpperCase();
        }
        if (mQ === undefined || mQ === "RSASSA-PKCS1-V1_5") {
          mQ = {
            encode: mX
          };
          mt = 1;
        } else if (mQ === "NONE" || mQ === "NULL" || mQ === null) {
          mQ = {
            encode: function () {
              return mT;
            }
          };
          mt = 1;
        }
        var mi = mQ.encode(mT, mb.n.bitLength());
        return m3.rsa.encrypt(mi, mb, mt);
      };
      return mb;
    };
    m3.wrapRsaPrivateKey = function (mv) {
      return m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, m1.integerToDer(0).getBytes()), m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.OID, false, m1.oidToDer(m3.oids.rsaEncryption).getBytes()), m1.create(m1.Class.UNIVERSAL, m1.Type.NULL, false, "")]), m1.create(m1.Class.UNIVERSAL, m1.Type.OCTETSTRING, false, m1.toDer(mv).getBytes())]);
    };
    m3.privateKeyFromAsn1 = function (mv) {
      var mM = {};
      var md = [];
      if (m1.validate(mv, m5, mM, md)) {
        mv = m1.fromDer(Xq.util.createBuffer(mM.privateKey));
      }
      mM = {};
      md = [];
      if (!m1.validate(mv, m6, mM, md)) {
        var mB = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
        mB.errors = md;
        throw mB;
      }
      var ms;
      var mA;
      var mG;
      var mf;
      var mb;
      var mT;
      var mQ;
      var mt;
      ms = Xq.util.createBuffer(mM.privateKeyModulus).toHex();
      mA = Xq.util.createBuffer(mM.privateKeyPublicExponent).toHex();
      mG = Xq.util.createBuffer(mM.privateKeyPrivateExponent).toHex();
      mf = Xq.util.createBuffer(mM.privateKeyPrime1).toHex();
      mb = Xq.util.createBuffer(mM.privateKeyPrime2).toHex();
      mT = Xq.util.createBuffer(mM.privateKeyExponent1).toHex();
      mQ = Xq.util.createBuffer(mM.privateKeyExponent2).toHex();
      mt = Xq.util.createBuffer(mM.privateKeyCoefficient).toHex();
      return m3.setRsaPrivateKey(new XS(ms, 16), new XS(mA, 16), new XS(mG, 16), new XS(mf, 16), new XS(mb, 16), new XS(mT, 16), new XS(mQ, 16), new XS(mt, 16));
    };
    m3.privateKeyToAsn1 = m3.privateKeyToRSAPrivateKey = function (mv) {
      return m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, m1.integerToDer(0).getBytes()), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.n)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.e)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.d)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.p)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.q)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.dP)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.dQ)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.qInv))]);
    };
    m3.publicKeyFromAsn1 = function (mv) {
      var mM = {};
      var md = [];
      if (m1.validate(mv, m8, mM, md)) {
        var mB = m1.derToOid(mM.publicKeyOid);
        if (mB !== m3.oids.rsaEncryption) {
          var ms = new Error("Cannot read public key. Unknown OID.");
          ms.oid = mB;
          throw ms;
        }
        mv = mM.rsaPublicKey;
      }
      md = [];
      if (!m1.validate(mv, m7, mM, md)) {
        var ms = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
        ms.errors = md;
        throw ms;
      }
      var mA = Xq.util.createBuffer(mM.publicKeyModulus).toHex();
      var mG = Xq.util.createBuffer(mM.publicKeyExponent).toHex();
      return m3.setRsaPublicKey(new XS(mA, 16), new XS(mG, 16));
    };
    m3.publicKeyToAsn1 = m3.publicKeyToSubjectPublicKeyInfo = function (mv) {
      return m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.OID, false, m1.oidToDer(m3.oids.rsaEncryption).getBytes()), m1.create(m1.Class.UNIVERSAL, m1.Type.NULL, false, "")]), m1.create(m1.Class.UNIVERSAL, m1.Type.BITSTRING, false, [m3.publicKeyToRSAPublicKey(mv)])]);
    };
    m3.publicKeyToRSAPublicKey = function (mv) {
      return m1.create(m1.Class.UNIVERSAL, m1.Type.SEQUENCE, true, [m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.n)), m1.create(m1.Class.UNIVERSAL, m1.Type.INTEGER, false, mW(mv.e))]);
    };
    function mI(mv, mM, md) {
      var mB = Xq.util.createBuffer();
      var ms = Math.ceil(mM.n.bitLength() / 8);
      if (mv.length > ms - 11) {
        var mA = new Error("Message is too long for PKCS#1 v1.5 padding.");
        mA.length = mv.length;
        mA.max = ms - 11;
        throw mA;
      }
      mB.putByte(0);
      mB.putByte(md);
      var mG = ms - 3 - mv.length;
      var mf;
      if (md === 0 || md === 1) {
        mf = md === 0 ? 0 : 255;
        for (var mb = 0; mb < mG; ++mb) {
          mB.putByte(mf);
        }
      } else {
        while (mG > 0) {
          var mT = 0;
          var mQ = Xq.random.getBytes(mG);
          for (var mb = 0; mb < mG; ++mb) {
            mf = mQ.charCodeAt(mb);
            if (mf === 0) {
              ++mT;
            } else {
              mB.putByte(mf);
            }
          }
          mG = mT;
        }
      }
      mB.putByte(0);
      mB.putBytes(mv);
      return mB;
    }
    function mV(mv, mM, md, mB) {
      var ms = Math.ceil(mM.n.bitLength() / 8);
      var mA = Xq.util.createBuffer(mv);
      var mG = mA.getByte();
      var mf = mA.getByte();
      if (mG !== 0 || md && mf !== 0 && mf !== 1 || !md && mf != 2 || md && mf === 0 && typeof mB === "undefined") {
        throw new Error("Encryption block is invalid.");
      }
      var mb = 0;
      if (mf === 0) {
        mb = ms - 3 - mB;
        for (var mT = 0; mT < mb; ++mT) {
          if (mA.getByte() !== 0) {
            throw new Error("Encryption block is invalid.");
          }
        }
      } else if (mf === 1) {
        for (mb = 0; mA.length() > 1;) {
          if (mA.getByte() !== 255) {
            --mA.read;
            break;
          }
          ++mb;
        }
      } else if (mf === 2) {
        for (mb = 0; mA.length() > 1;) {
          if (mA.getByte() === 0) {
            --mA.read;
            break;
          }
          ++mb;
        }
      }
      var mQ = mA.getByte();
      if (mQ !== 0 || mb !== ms - 3 - mA.length()) {
        throw new Error("Encryption block is invalid.");
      }
      return mA.getBytes();
    }
    function mE(mv, mM, md) {
      if (typeof mM == "function") {
        md = mM;
        mM = {};
      }
      mM = mM || {};
      var mB = {
        algorithm: {
          name: mM.algorithm || "PRIMEINC",
          options: {
            workers: mM.workers || 2,
            workLoad: mM.workLoad || 100,
            workerScript: mM.workerScript
          }
        }
      };
      if ("prng" in mM) {
        mB.prng = mM.prng;
      }
      ms();
      function ms() {
        mA(mv.pBits, function (mf, mb) {
          if (mf) {
            return md(mf);
          }
          mv.p = mb;
          if (mv.q !== null) {
            return mG(mf, mv.q);
          }
          mA(mv.qBits, mG);
        });
      }
      function mA(mf, mb) {
        Xq.prime.generateProbablePrime(mf, mB, mb);
      }
      function mG(mf, mb) {
        if (mf) {
          return md(mf);
        }
        mv.q = mb;
        if (mv.p.compareTo(mv.q) < 0) {
          var mT = mv.p;
          mv.p = mv.q;
          mv.q = mT;
        }
        if (mv.p.subtract(XS.ONE).gcd(mv.e).compareTo(XS.ONE) !== 0) {
          mv.p = null;
          ms();
          return;
        }
        if (mv.q.subtract(XS.ONE).gcd(mv.e).compareTo(XS.ONE) !== 0) {
          mv.q = null;
          mA(mv.qBits, mG);
          return;
        }
        mv.p1 = mv.p.subtract(XS.ONE);
        mv.q1 = mv.q.subtract(XS.ONE);
        mv.phi = mv.p1.multiply(mv.q1);
        if (mv.phi.gcd(mv.e).compareTo(XS.ONE) !== 0) {
          mv.p = mv.q = null;
          ms();
          return;
        }
        mv.n = mv.p.multiply(mv.q);
        if (mv.n.bitLength() !== mv.bits) {
          mv.q = null;
          mA(mv.qBits, mG);
          return;
        }
        var mQ = mv.e.modInverse(mv.phi);
        mv.keys = {
          privateKey: m3.rsa.setPrivateKey(mv.n, mv.e, mQ, mv.p, mv.q, mQ.mod(mv.p1), mQ.mod(mv.q1), mv.q.modInverse(mv.p)),
          publicKey: m3.rsa.setPublicKey(mv.n, mv.e)
        };
        md(null, mv.keys);
      }
    }
    function mW(mv) {
      var mM = mv.toString(16);
      if (mM[0] >= "8") {
        mM = "00" + mM;
      }
      var md = Xq.util.hexToBytes(mM);
      if (md.length > 1 && (md.charCodeAt(0) === 0 && !(md.charCodeAt(1) & 128) || md.charCodeAt(0) === 255 && (md.charCodeAt(1) & 128) === 128)) {
        return md.substr(1);
      } else {
        return md;
      }
    }
    function mC(mv) {
      if (mv <= 100) {
        return 27;
      } else if (mv <= 150) {
        return 18;
      } else if (mv <= 200) {
        return 15;
      } else if (mv <= 250) {
        return 12;
      } else if (mv <= 300) {
        return 9;
      } else if (mv <= 350) {
        return 8;
      } else if (mv <= 400) {
        return 7;
      } else if (mv <= 500) {
        return 6;
      } else if (mv <= 600) {
        return 5;
      } else if (mv <= 800) {
        return 4;
      } else if (mv <= 1250) {
        return 3;
      } else {
        return 2;
      }
    }
    function mH(mv) {
      return Xq.util.isNodejs && typeof m0[mv] == "function";
    }
    function me(mv) {
      return typeof m2.globalScope !== "undefined" && typeof m2.globalScope.crypto == "object" && typeof m2.globalScope.crypto.subtle == "object" && typeof m2.globalScope.crypto.subtle[mv] == "function";
    }
    function mK(mv) {
      return typeof m2.globalScope !== "undefined" && typeof m2.globalScope.msCrypto == "object" && typeof m2.globalScope.msCrypto.subtle == "object" && typeof m2.globalScope.msCrypto.subtle[mv] == "function";
    }
    function mU(mv) {
      for (var mM = Xq.util.hexToBytes(mv.toString(16)), md = new Uint8Array(mM.length), mB = 0; mB < mM.length; ++mB) {
        md[mB] = mM.charCodeAt(mB);
      }
      return md;
    }
  });
  var D = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    b();
    u();
    T();
    f();
    R();
    O();
    j();
    J();
    n();
    B();
    if (typeof XS === "undefined") {
      XS = Xq.jsbn.BigInteger;
    }
    var XS;
    var m0 = Xq.asn1;
    var m1 = Xq.pki = Xq.pki || {};
    XF.exports = m1.pbe = Xq.pbe = Xq.pbe || {};
    var m2 = m1.oids;
    var m3 = {
      name: "EncryptedPrivateKeyInfo",
      tagClass: m0.Class.UNIVERSAL,
      type: m0.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.OID,
          constructed: false,
          capture: "encryptionOid"
        }, {
          name: "AlgorithmIdentifier.parameters",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "encryptionParams"
        }]
      }, {
        name: "EncryptedPrivateKeyInfo.encryptedData",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.OCTETSTRING,
        constructed: false,
        capture: "encryptedData"
      }]
    };
    var m4 = {
      name: "PBES2Algorithms",
      tagClass: m0.Class.UNIVERSAL,
      type: m0.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PBES2Algorithms.keyDerivationFunc",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.keyDerivationFunc.oid",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.OID,
          constructed: false,
          capture: "kdfOid"
        }, {
          name: "PBES2Algorithms.params",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "PBES2Algorithms.params.salt",
            tagClass: m0.Class.UNIVERSAL,
            type: m0.Type.OCTETSTRING,
            constructed: false,
            capture: "kdfSalt"
          }, {
            name: "PBES2Algorithms.params.iterationCount",
            tagClass: m0.Class.UNIVERSAL,
            type: m0.Type.INTEGER,
            constructed: false,
            capture: "kdfIterationCount"
          }, {
            name: "PBES2Algorithms.params.keyLength",
            tagClass: m0.Class.UNIVERSAL,
            type: m0.Type.INTEGER,
            constructed: false,
            optional: true,
            capture: "keyLength"
          }, {
            name: "PBES2Algorithms.params.prf",
            tagClass: m0.Class.UNIVERSAL,
            type: m0.Type.SEQUENCE,
            constructed: true,
            optional: true,
            value: [{
              name: "PBES2Algorithms.params.prf.algorithm",
              tagClass: m0.Class.UNIVERSAL,
              type: m0.Type.OID,
              constructed: false,
              capture: "prfOid"
            }]
          }]
        }]
      }, {
        name: "PBES2Algorithms.encryptionScheme",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.encryptionScheme.oid",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.OID,
          constructed: false,
          capture: "encOid"
        }, {
          name: "PBES2Algorithms.encryptionScheme.iv",
          tagClass: m0.Class.UNIVERSAL,
          type: m0.Type.OCTETSTRING,
          constructed: false,
          capture: "encIv"
        }]
      }]
    };
    var m5 = {
      name: "pkcs-12PbeParams",
      tagClass: m0.Class.UNIVERSAL,
      type: m0.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "pkcs-12PbeParams.salt",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.OCTETSTRING,
        constructed: false,
        capture: "salt"
      }, {
        name: "pkcs-12PbeParams.iterations",
        tagClass: m0.Class.UNIVERSAL,
        type: m0.Type.INTEGER,
        constructed: false,
        capture: "iterations"
      }]
    };
    m1.encryptPrivateKeyInfo = function (mX, mm, mI) {
      mI = mI || {};
      mI.saltSize = mI.saltSize || 8;
      mI.count = mI.count || 2048;
      mI.algorithm = mI.algorithm || "aes128";
      mI.prfAlgorithm = mI.prfAlgorithm || "sha1";
      var mV = Xq.random.getBytesSync(mI.saltSize);
      var mE = mI.count;
      var mW = m0.integerToDer(mE);
      var mC;
      var mH;
      var me;
      if (mI.algorithm.indexOf("aes") === 0 || mI.algorithm === "des") {
        var mK;
        var mU;
        var mv;
        switch (mI.algorithm) {
          case "aes128":
            mC = 16;
            mK = 16;
            mU = m2["aes128-CBC"];
            mv = Xq.aes.createEncryptionCipher;
            break;
          case "aes192":
            mC = 24;
            mK = 16;
            mU = m2["aes192-CBC"];
            mv = Xq.aes.createEncryptionCipher;
            break;
          case "aes256":
            mC = 32;
            mK = 16;
            mU = m2["aes256-CBC"];
            mv = Xq.aes.createEncryptionCipher;
            break;
          case "des":
            mC = 8;
            mK = 8;
            mU = m2.desCBC;
            mv = Xq.des.createEncryptionCipher;
            break;
          default:
            var mM = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
            mM.algorithm = mI.algorithm;
            throw mM;
        }
        var md = "hmacWith" + mI.prfAlgorithm.toUpperCase();
        var mB = m8(md);
        var ms = Xq.pkcs5.pbkdf2(mm, mV, mE, mC, mB);
        var mA = Xq.random.getBytesSync(mK);
        var mG = mv(ms);
        mG.start(mA);
        mG.update(m0.toDer(mX));
        mG.finish();
        me = mG.output.getBytes();
        var mf = m9(mV, mW, mC, md);
        mH = m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OID, false, m0.oidToDer(m2.pkcs5PBES2).getBytes()), m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OID, false, m0.oidToDer(m2.pkcs5PBKDF2).getBytes()), mf]), m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OID, false, m0.oidToDer(mU).getBytes()), m0.create(m0.Class.UNIVERSAL, m0.Type.OCTETSTRING, false, mA)])])]);
      } else if (mI.algorithm === "3des") {
        mC = 24;
        var mb = new Xq.util.ByteBuffer(mV);
        var ms = m1.pbe.generatePkcs12Key(mm, mb, 1, mE, mC);
        var mA = m1.pbe.generatePkcs12Key(mm, mb, 2, mE, mC);
        var mG = Xq.des.createEncryptionCipher(ms);
        mG.start(mA);
        mG.update(m0.toDer(mX));
        mG.finish();
        me = mG.output.getBytes();
        mH = m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OID, false, m0.oidToDer(m2["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()), m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OCTETSTRING, false, mV), m0.create(m0.Class.UNIVERSAL, m0.Type.INTEGER, false, mW.getBytes())])]);
      } else {
        var mM = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
        mM.algorithm = mI.algorithm;
        throw mM;
      }
      var mT = m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [mH, m0.create(m0.Class.UNIVERSAL, m0.Type.OCTETSTRING, false, me)]);
      return mT;
    };
    m1.decryptPrivateKeyInfo = function (mX, mm) {
      var mI = null;
      var mV = {};
      var mE = [];
      if (!m0.validate(mX, m3, mV, mE)) {
        var mW = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        mW.errors = mE;
        throw mW;
      }
      var mC = m0.derToOid(mV.encryptionOid);
      var mH = m1.pbe.getCipher(mC, mV.encryptionParams, mm);
      var me = Xq.util.createBuffer(mV.encryptedData);
      mH.update(me);
      if (mH.finish()) {
        mI = m0.fromDer(mH.output);
      }
      return mI;
    };
    m1.encryptedPrivateKeyToPem = function (mX, mm) {
      var mI = {
        type: "ENCRYPTED PRIVATE KEY",
        body: m0.toDer(mX).getBytes()
      };
      return Xq.pem.encode(mI, {
        maxline: mm
      });
    };
    m1.encryptedPrivateKeyFromPem = function (mX) {
      var mm = Xq.pem.decode(mX)[0];
      if (mm.type !== "ENCRYPTED PRIVATE KEY") {
        var mI = new Error("Could not convert encrypted private key from PEM; PEM header type is \"ENCRYPTED PRIVATE KEY\".");
        mI.headerType = mm.type;
        throw mI;
      }
      if (mm.procType && mm.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
      }
      return m0.fromDer(mm.body);
    };
    m1.encryptRsaPrivateKey = function (mX, mm, mI) {
      mI = mI || {};
      if (!mI.legacy) {
        var mV = m1.wrapRsaPrivateKey(m1.privateKeyToAsn1(mX));
        mV = m1.encryptPrivateKeyInfo(mV, mm, mI);
        return m1.encryptedPrivateKeyToPem(mV);
      }
      var mE;
      var mW;
      var mC;
      var mH;
      switch (mI.algorithm) {
        case "aes128":
          mE = "AES-128-CBC";
          mC = 16;
          mW = Xq.random.getBytesSync(16);
          mH = Xq.aes.createEncryptionCipher;
          break;
        case "aes192":
          mE = "AES-192-CBC";
          mC = 24;
          mW = Xq.random.getBytesSync(16);
          mH = Xq.aes.createEncryptionCipher;
          break;
        case "aes256":
          mE = "AES-256-CBC";
          mC = 32;
          mW = Xq.random.getBytesSync(16);
          mH = Xq.aes.createEncryptionCipher;
          break;
        case "3des":
          mE = "DES-EDE3-CBC";
          mC = 24;
          mW = Xq.random.getBytesSync(8);
          mH = Xq.des.createEncryptionCipher;
          break;
        case "des":
          mE = "DES-CBC";
          mC = 8;
          mW = Xq.random.getBytesSync(8);
          mH = Xq.des.createEncryptionCipher;
          break;
        default:
          var me = new Error("Could not encrypt RSA private key; unsupported encryption algorithm \"" + mI.algorithm + "\".");
          me.algorithm = mI.algorithm;
          throw me;
      }
      var mK = Xq.pbe.opensslDeriveBytes(mm, mW.substr(0, 8), mC);
      var mU = mH(mK);
      mU.start(mW);
      mU.update(m0.toDer(m1.privateKeyToAsn1(mX)));
      mU.finish();
      var mv = {
        type: "RSA PRIVATE KEY",
        procType: {
          version: "4",
          type: "ENCRYPTED"
        },
        dekInfo: {
          algorithm: mE,
          parameters: Xq.util.bytesToHex(mW).toUpperCase()
        },
        body: mU.output.getBytes()
      };
      return Xq.pem.encode(mv);
    };
    m1.decryptRsaPrivateKey = function (mX, mm) {
      var mI = null;
      var mV = Xq.pem.decode(mX)[0];
      if (mV.type !== "ENCRYPTED PRIVATE KEY" && mV.type !== "PRIVATE KEY" && mV.type !== "RSA PRIVATE KEY") {
        var mE = new Error("Could not convert private key from PEM; PEM header type is not \"ENCRYPTED PRIVATE KEY\", \"PRIVATE KEY\", or \"RSA PRIVATE KEY\".");
        mE.headerType = mE;
        throw mE;
      }
      if (mV.procType && mV.procType.type === "ENCRYPTED") {
        var mW;
        var mC;
        switch (mV.dekInfo.algorithm) {
          case "DES-CBC":
            mW = 8;
            mC = Xq.des.createDecryptionCipher;
            break;
          case "DES-EDE3-CBC":
            mW = 24;
            mC = Xq.des.createDecryptionCipher;
            break;
          case "AES-128-CBC":
            mW = 16;
            mC = Xq.aes.createDecryptionCipher;
            break;
          case "AES-192-CBC":
            mW = 24;
            mC = Xq.aes.createDecryptionCipher;
            break;
          case "AES-256-CBC":
            mW = 32;
            mC = Xq.aes.createDecryptionCipher;
            break;
          case "RC2-40-CBC":
            mW = 5;
            mC = function (mU) {
              return Xq.rc2.createDecryptionCipher(mU, 40);
            };
            break;
          case "RC2-64-CBC":
            mW = 8;
            mC = function (mU) {
              return Xq.rc2.createDecryptionCipher(mU, 64);
            };
            break;
          case "RC2-128-CBC":
            mW = 16;
            mC = function (mU) {
              return Xq.rc2.createDecryptionCipher(mU, 128);
            };
            break;
          default:
            var mE = new Error("Could not decrypt private key; unsupported encryption algorithm \"" + mV.dekInfo.algorithm + "\".");
            mE.algorithm = mV.dekInfo.algorithm;
            throw mE;
        }
        var mH = Xq.util.hexToBytes(mV.dekInfo.parameters);
        var me = Xq.pbe.opensslDeriveBytes(mm, mH.substr(0, 8), mW);
        var mK = mC(me);
        mK.start(mH);
        mK.update(Xq.util.createBuffer(mV.body));
        if (mK.finish()) {
          mI = mK.output.getBytes();
        } else {
          return mI;
        }
      } else {
        mI = mV.body;
      }
      if (mV.type === "ENCRYPTED PRIVATE KEY") {
        mI = m1.decryptPrivateKeyInfo(m0.fromDer(mI), mm);
      } else {
        mI = m0.fromDer(mI);
      }
      if (mI !== null) {
        mI = m1.privateKeyFromAsn1(mI);
      }
      return mI;
    };
    m1.pbe.generatePkcs12Key = function (mX, mm, mI, mV, mE, mW) {
      var mC;
      var mH;
      if (typeof mW === "undefined" || mW === null) {
        if (!("sha1" in Xq.md)) {
          throw new Error("\"sha1\" hash algorithm unavailable.");
        }
        mW = Xq.md.sha1.create();
      }
      var me = mW.digestLength;
      var mK = mW.blockLength;
      var mU = new Xq.util.ByteBuffer();
      var mv = new Xq.util.ByteBuffer();
      if (mX != null) {
        for (mH = 0; mH < mX.length; mH++) {
          mv.putInt16(mX.charCodeAt(mH));
        }
        mv.putInt16(0);
      }
      var mM = mv.length();
      var md = mm.length();
      var mB = new Xq.util.ByteBuffer();
      mB.fillWithByte(mI, mK);
      var ms = mK * Math.ceil(md / mK);
      var mA = new Xq.util.ByteBuffer();
      for (mH = 0; mH < ms; mH++) {
        mA.putByte(mm.at(mH % md));
      }
      var mG = mK * Math.ceil(mM / mK);
      var mf = new Xq.util.ByteBuffer();
      for (mH = 0; mH < mG; mH++) {
        mf.putByte(mv.at(mH % mM));
      }
      var mb = mA;
      mb.putBuffer(mf);
      for (var mT = Math.ceil(mE / me), mQ = 1; mQ <= mT; mQ++) {
        var mt = new Xq.util.ByteBuffer();
        mt.putBytes(mB.bytes());
        mt.putBytes(mb.bytes());
        for (var mi = 0; mi < mV; mi++) {
          mW.start();
          mW.update(mt.getBytes());
          mt = mW.digest();
        }
        var mO = new Xq.util.ByteBuffer();
        for (mH = 0; mH < mK; mH++) {
          mO.putByte(mt.at(mH % me));
        }
        var mu = Math.ceil(md / mK) + Math.ceil(mM / mK);
        var mN = new Xq.util.ByteBuffer();
        for (mC = 0; mC < mu; mC++) {
          var mR = new Xq.util.ByteBuffer(mb.getBytes(mK));
          var my = 511;
          for (mH = mO.length() - 1; mH >= 0; mH--) {
            my = my >> 8;
            my += mO.at(mH) + mR.at(mH);
            mR.setAt(mH, my & 255);
          }
          mN.putBuffer(mR);
        }
        mb = mN;
        mU.putBuffer(mt);
      }
      mU.truncate(mU.length() - mE);
      return mU;
    };
    m1.pbe.getCipher = function (mX, mm, mI) {
      switch (mX) {
        case m1.oids.pkcs5PBES2:
          return m1.pbe.getCipherForPBES2(mX, mm, mI);
        case m1.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
        case m1.oids["pbewithSHAAnd40BitRC2-CBC"]:
          return m1.pbe.getCipherForPKCS12PBE(mX, mm, mI);
        default:
          var mV = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
          mV.oid = mX;
          mV.supportedOids = ["pkcs5PBES2", "pbeWithSHAAnd3-KeyTripleDES-CBC", "pbewithSHAAnd40BitRC2-CBC"];
          throw mV;
      }
    };
    m1.pbe.getCipherForPBES2 = function (mX, mm, mI) {
      var mV = {};
      var mE = [];
      if (!m0.validate(mm, m4, mV, mE)) {
        var mW = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        mW.errors = mE;
        throw mW;
      }
      mX = m0.derToOid(mV.kdfOid);
      if (mX !== m1.oids.pkcs5PBKDF2) {
        var mW = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
        mW.oid = mX;
        mW.supportedOids = ["pkcs5PBKDF2"];
        throw mW;
      }
      mX = m0.derToOid(mV.encOid);
      if (mX !== m1.oids["aes128-CBC"] && mX !== m1.oids["aes192-CBC"] && mX !== m1.oids["aes256-CBC"] && mX !== m1.oids["des-EDE3-CBC"] && mX !== m1.oids.desCBC) {
        var mW = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
        mW.oid = mX;
        mW.supportedOids = ["aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"];
        throw mW;
      }
      var mC = mV.kdfSalt;
      var mH = Xq.util.createBuffer(mV.kdfIterationCount);
      mH = mH.getInt(mH.length() << 3);
      var me;
      var mK;
      switch (m1.oids[mX]) {
        case "aes128-CBC":
          me = 16;
          mK = Xq.aes.createDecryptionCipher;
          break;
        case "aes192-CBC":
          me = 24;
          mK = Xq.aes.createDecryptionCipher;
          break;
        case "aes256-CBC":
          me = 32;
          mK = Xq.aes.createDecryptionCipher;
          break;
        case "des-EDE3-CBC":
          me = 24;
          mK = Xq.des.createDecryptionCipher;
          break;
        case "desCBC":
          me = 8;
          mK = Xq.des.createDecryptionCipher;
          break;
      }
      var mU = m7(mV.prfOid);
      var mv = Xq.pkcs5.pbkdf2(mI, mC, mH, me, mU);
      var mM = mV.encIv;
      var md = mK(mv);
      md.start(mM);
      return md;
    };
    m1.pbe.getCipherForPKCS12PBE = function (mX, mm, mI) {
      var mV = {};
      var mE = [];
      if (!m0.validate(mm, m5, mV, mE)) {
        var mW = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        mW.errors = mE;
        throw mW;
      }
      var mC = Xq.util.createBuffer(mV.salt);
      var mH = Xq.util.createBuffer(mV.iterations);
      mH = mH.getInt(mH.length() << 3);
      var me;
      var mK;
      var mU;
      switch (mX) {
        case m1.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
          me = 24;
          mK = 8;
          mU = Xq.des.startDecrypting;
          break;
        case m1.oids["pbewithSHAAnd40BitRC2-CBC"]:
          me = 5;
          mK = 8;
          mU = function (mB, ms) {
            var mA = Xq.rc2.createDecryptionCipher(mB, 40);
            mA.start(ms, null);
            return mA;
          };
          break;
        default:
          var mW = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
          mW.oid = mX;
          throw mW;
      }
      var mv = m7(mV.prfOid);
      var mM = m1.pbe.generatePkcs12Key(mI, mC, 1, mH, me, mv);
      mv.start();
      var md = m1.pbe.generatePkcs12Key(mI, mC, 2, mH, mK, mv);
      return mU(mM, md);
    };
    m1.pbe.opensslDeriveBytes = function (mX, mm, mI, mV) {
      if (typeof mV === "undefined" || mV === null) {
        if (!("md5" in Xq.md)) {
          throw new Error("\"md5\" hash algorithm unavailable.");
        }
        mV = Xq.md.md5.create();
      }
      if (mm === null) {
        mm = "";
      }
      var mE = [m6(mV, mX + mm)];
      for (var mW = 16, mC = 1; mW < mI; ++mC, mW += 16) {
        mE.push(m6(mV, mE[mC - 1] + mX + mm));
      }
      return mE.join("").substr(0, mI);
    };
    function m6(mX, mm) {
      return mX.start().update(mm).digest().getBytes();
    }
    function m7(mX) {
      var mm;
      if (!mX) {
        mm = "hmacWithSHA1";
      } else {
        mm = m1.oids[m0.derToOid(mX)];
        if (!mm) {
          var mI = new Error("Unsupported PRF OID.");
          mI.oid = mX;
          mI.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"];
          throw mI;
        }
      }
      return m8(mm);
    }
    function m8(mX) {
      var mm = Xq.md;
      switch (mX) {
        case "hmacWithSHA224":
          mm = Xq.md.sha512;
        case "hmacWithSHA1":
        case "hmacWithSHA256":
        case "hmacWithSHA384":
        case "hmacWithSHA512":
          mX = mX.substr(8).toLowerCase();
          break;
        default:
          var mI = new Error("Unsupported PRF algorithm.");
          mI.algorithm = mX;
          mI.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"];
          throw mI;
      }
      if (!mm || !(mX in mm)) {
        throw new Error("Unknown hash algorithm: " + mX);
      }
      return mm[mX].create();
    }
    function m9(mX, mm, mI, mV) {
      var mE = m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OCTETSTRING, false, mX), m0.create(m0.Class.UNIVERSAL, m0.Type.INTEGER, false, mm.getBytes())]);
      if (mV !== "hmacWithSHA1") {
        mE.value.push(m0.create(m0.Class.UNIVERSAL, m0.Type.INTEGER, false, Xq.util.hexToBytes(mI.toString(16))), m0.create(m0.Class.UNIVERSAL, m0.Type.SEQUENCE, true, [m0.create(m0.Class.UNIVERSAL, m0.Type.OID, false, m0.oidToDer(m1.oids[mV]).getBytes()), m0.create(m0.Class.UNIVERSAL, m0.Type.NULL, false, "")]));
      }
      return mE;
    }
  });
  var p = K((XP, XF) => {
    'use strict';

    var Xq = M();
    b();
    B();
    var XS = Xq.asn1;
    var m0 = XF.exports = Xq.pkcs7asn1 = Xq.pkcs7asn1 || {};
    Xq.pkcs7 = Xq.pkcs7 || {};
    Xq.pkcs7.asn1 = m0;
    var m1 = {
      name: "ContentInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "ContentInfo.ContentType",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "contentType"
      }, {
        name: "ContentInfo.content",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        constructed: true,
        optional: true,
        captureAsn1: "content"
      }]
    };
    m0.contentInfoValidator = m1;
    var m2 = {
      name: "EncryptedContentInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedContentInfo.contentType",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "contentType"
      }, {
        name: "EncryptedContentInfo.contentEncryptionAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OID,
          constructed: false,
          capture: "encAlgorithm"
        }, {
          name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
          tagClass: XS.Class.UNIVERSAL,
          captureAsn1: "encParameter"
        }]
      }, {
        name: "EncryptedContentInfo.encryptedContent",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        capture: "encryptedContent",
        captureAsn1: "encryptedContentAsn1"
      }]
    };
    m0.envelopedDataValidator = {
      name: "EnvelopedData",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EnvelopedData.Version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "version"
      }, {
        name: "EnvelopedData.RecipientInfos",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SET,
        constructed: true,
        captureAsn1: "recipientInfos"
      }].concat(m2)
    };
    m0.encryptedDataValidator = {
      name: "EncryptedData",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedData.Version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "version"
      }].concat(m2)
    };
    var m3 = {
      name: "SignerInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "SignerInfo.version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false
      }, {
        name: "SignerInfo.issuerAndSerialNumber",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "SignerInfo.issuerAndSerialNumber.issuer",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "issuer"
        }, {
          name: "SignerInfo.issuerAndSerialNumber.serialNumber",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.INTEGER,
          constructed: false,
          capture: "serial"
        }]
      }, {
        name: "SignerInfo.digestAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "SignerInfo.digestAlgorithm.algorithm",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OID,
          constructed: false,
          capture: "digestAlgorithm"
        }, {
          name: "SignerInfo.digestAlgorithm.parameter",
          tagClass: XS.Class.UNIVERSAL,
          constructed: false,
          captureAsn1: "digestParameter",
          optional: true
        }]
      }, {
        name: "SignerInfo.authenticatedAttributes",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        constructed: true,
        optional: true,
        capture: "authenticatedAttributes"
      }, {
        name: "SignerInfo.digestEncryptionAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        capture: "signatureAlgorithm"
      }, {
        name: "SignerInfo.encryptedDigest",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OCTETSTRING,
        constructed: false,
        capture: "signature"
      }, {
        name: "SignerInfo.unauthenticatedAttributes",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 1,
        constructed: true,
        optional: true,
        capture: "unauthenticatedAttributes"
      }]
    };
    m0.signedDataValidator = {
      name: "SignedData",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "SignedData.Version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "version"
      }, {
        name: "SignedData.DigestAlgorithms",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SET,
        constructed: true,
        captureAsn1: "digestAlgorithms"
      }, m1, {
        name: "SignedData.Certificates",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        optional: true,
        captureAsn1: "certificates"
      }, {
        name: "SignedData.CertificateRevocationLists",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 1,
        optional: true,
        captureAsn1: "crls"
      }, {
        name: "SignedData.SignerInfos",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SET,
        capture: "signerInfos",
        optional: true,
        value: [m3]
      }]
    };
    m0.recipientInfoValidator = {
      name: "RecipientInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RecipientInfo.version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "version"
      }, {
        name: "RecipientInfo.issuerAndSerial",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "RecipientInfo.issuerAndSerial.issuer",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "issuer"
        }, {
          name: "RecipientInfo.issuerAndSerial.serialNumber",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.INTEGER,
          constructed: false,
          capture: "serial"
        }]
      }, {
        name: "RecipientInfo.keyEncryptionAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OID,
          constructed: false,
          capture: "encAlgorithm"
        }, {
          name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
          tagClass: XS.Class.UNIVERSAL,
          constructed: false,
          captureAsn1: "encParameter",
          optional: true
        }]
      }, {
        name: "RecipientInfo.encryptedKey",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OCTETSTRING,
        constructed: false,
        capture: "encKey"
      }]
    };
  });
  var Z = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    Xq.mgf = Xq.mgf || {};
    var XS = XF.exports = Xq.mgf.mgf1 = Xq.mgf1 = Xq.mgf1 || {};
    XS.create = function (m0) {
      var m1 = {
        generate: function (m2, m3) {
          var m4 = new Xq.util.ByteBuffer();
          for (var m5 = Math.ceil(m3 / m0.digestLength), m6 = 0; m6 < m5; m6++) {
            var m7 = new Xq.util.ByteBuffer();
            m7.putInt32(m6);
            m0.start();
            m0.update(m2 + m7.getBytes());
            m4.putBuffer(m0.digest());
          }
          m4.truncate(m4.length() - m3);
          return m4.getBytes();
        }
      };
      return m1;
    };
  });
  var w = K((XP, XF) => {
    'use strict';

    var Xq = M();
    Z();
    XF.exports = Xq.mgf = Xq.mgf || {};
    Xq.mgf.mgf1 = Xq.mgf1;
  });
  var x = K((XP, XF) => {
    'use strict';

    var Xq = M();
    j();
    B();
    var XS = XF.exports = Xq.pss = Xq.pss || {};
    XS.create = function (m0) {
      if (arguments.length === 3) {
        m0 = {
          md: arguments[0],
          mgf: arguments[1],
          saltLength: arguments[2]
        };
      }
      var m1 = m0.md;
      var m2 = m0.mgf;
      var m3 = m1.digestLength;
      var m4 = m0.salt || null;
      if (typeof m4 == "string") {
        m4 = Xq.util.createBuffer(m4);
      }
      var m5;
      if ("saltLength" in m0) {
        m5 = m0.saltLength;
      } else if (m4 !== null) {
        m5 = m4.length();
      } else {
        throw new Error("Salt length not specified or specific salt not given.");
      }
      if (m4 !== null && m4.length() !== m5) {
        throw new Error("Given salt length does not match length of given salt.");
      }
      var m6 = m0.prng || Xq.random;
      var m7 = {};
      m7.encode = function (m8, m9) {
        var mX;
        var mm = m9 - 1;
        var mI = Math.ceil(mm / 8);
        var mV = m8.digest().getBytes();
        if (mI < m3 + m5 + 2) {
          throw new Error("Message is too long to encrypt.");
        }
        var mE;
        if (m4 === null) {
          mE = m6.getBytesSync(m5);
        } else {
          mE = m4.bytes();
        }
        var mW = new Xq.util.ByteBuffer();
        mW.fillWithByte(0, 8);
        mW.putBytes(mV);
        mW.putBytes(mE);
        m1.start();
        m1.update(mW.getBytes());
        var mC = m1.digest().getBytes();
        var mH = new Xq.util.ByteBuffer();
        mH.fillWithByte(0, mI - m5 - m3 - 2);
        mH.putByte(1);
        mH.putBytes(mE);
        var me = mH.getBytes();
        var mK = mI - m3 - 1;
        var mU = m2.generate(mC, mK);
        var mv = "";
        for (mX = 0; mX < mK; mX++) {
          mv += String.fromCharCode(me.charCodeAt(mX) ^ mU.charCodeAt(mX));
        }
        var mM = 65280 >> mI * 8 - mm & 255;
        mv = String.fromCharCode(mv.charCodeAt(0) & ~mM) + mv.substr(1);
        return mv + mC + "¼";
      };
      m7.verify = function (m8, m9, mX) {
        var mm;
        var mI = mX - 1;
        var mV = Math.ceil(mI / 8);
        m9 = m9.substr(-mV);
        if (mV < m3 + m5 + 2) {
          throw new Error("Inconsistent parameters to PSS signature verification.");
        }
        if (m9.charCodeAt(mV - 1) !== 188) {
          throw new Error("Encoded message does not end in 0xBC.");
        }
        var mE = mV - m3 - 1;
        var mW = m9.substr(0, mE);
        var mC = m9.substr(mE, m3);
        var mH = 65280 >> mV * 8 - mI & 255;
        if (mW.charCodeAt(0) & mH) {
          throw new Error("Bits beyond keysize not zero as expected.");
        }
        var me = m2.generate(mC, mE);
        var mK = "";
        for (mm = 0; mm < mE; mm++) {
          mK += String.fromCharCode(mW.charCodeAt(mm) ^ me.charCodeAt(mm));
        }
        mK = String.fromCharCode(mK.charCodeAt(0) & ~mH) + mK.substr(1);
        var mU = mV - m3 - m5 - 2;
        for (mm = 0; mm < mU; mm++) {
          if (mK.charCodeAt(mm) !== 0) {
            throw new Error("Leftmost octets not zero as expected");
          }
        }
        if (mK.charCodeAt(mU) !== 1) {
          throw new Error("Inconsistent PSS signature, 0x01 marker not found");
        }
        var mv = mK.substr(-m5);
        var mM = new Xq.util.ByteBuffer();
        mM.fillWithByte(0, 8);
        mM.putBytes(m8);
        mM.putBytes(mv);
        m1.start();
        m1.update(mM.getBytes());
        var md = m1.digest().getBytes();
        return mC === md;
      };
      return m7;
    };
  });
  var o = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    b();
    u();
    T();
    w();
    f();
    O();
    x();
    n();
    B();
    var XS = Xq.asn1;
    var m0 = XF.exports = Xq.pki = Xq.pki || {};
    var m1 = m0.oids;
    var m2 = {
      CN: m1.commonName,
      commonName: "CN",
      C: m1.countryName,
      countryName: "C",
      L: m1.localityName,
      localityName: "L",
      ST: m1.stateOrProvinceName,
      stateOrProvinceName: "ST",
      O: m1.organizationName,
      organizationName: "O",
      OU: m1.organizationalUnitName,
      organizationalUnitName: "OU",
      E: m1.emailAddress,
      emailAddress: "E"
    };
    var m3 = Xq.pki.rsa.publicKeyValidator;
    var m4 = {
      name: "Certificate",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "Certificate.TBSCertificate",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        captureAsn1: "tbsCertificate",
        value: [{
          name: "Certificate.TBSCertificate.version",
          tagClass: XS.Class.CONTEXT_SPECIFIC,
          type: 0,
          constructed: true,
          optional: true,
          value: [{
            name: "Certificate.TBSCertificate.version.integer",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.INTEGER,
            constructed: false,
            capture: "certVersion"
          }]
        }, {
          name: "Certificate.TBSCertificate.serialNumber",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.INTEGER,
          constructed: false,
          capture: "certSerialNumber"
        }, {
          name: "Certificate.TBSCertificate.signature",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "Certificate.TBSCertificate.signature.algorithm",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.OID,
            constructed: false,
            capture: "certinfoSignatureOid"
          }, {
            name: "Certificate.TBSCertificate.signature.parameters",
            tagClass: XS.Class.UNIVERSAL,
            optional: true,
            captureAsn1: "certinfoSignatureParams"
          }]
        }, {
          name: "Certificate.TBSCertificate.issuer",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "certIssuer"
        }, {
          name: "Certificate.TBSCertificate.validity",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "Certificate.TBSCertificate.validity.notBefore (utc)",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.UTCTIME,
            constructed: false,
            optional: true,
            capture: "certValidity1UTCTime"
          }, {
            name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.GENERALIZEDTIME,
            constructed: false,
            optional: true,
            capture: "certValidity2GeneralizedTime"
          }, {
            name: "Certificate.TBSCertificate.validity.notAfter (utc)",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.UTCTIME,
            constructed: false,
            optional: true,
            capture: "certValidity3UTCTime"
          }, {
            name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.GENERALIZEDTIME,
            constructed: false,
            optional: true,
            capture: "certValidity4GeneralizedTime"
          }]
        }, {
          name: "Certificate.TBSCertificate.subject",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "certSubject"
        }, m3, {
          name: "Certificate.TBSCertificate.issuerUniqueID",
          tagClass: XS.Class.CONTEXT_SPECIFIC,
          type: 1,
          constructed: true,
          optional: true,
          value: [{
            name: "Certificate.TBSCertificate.issuerUniqueID.id",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.BITSTRING,
            constructed: false,
            captureBitStringValue: "certIssuerUniqueId"
          }]
        }, {
          name: "Certificate.TBSCertificate.subjectUniqueID",
          tagClass: XS.Class.CONTEXT_SPECIFIC,
          type: 2,
          constructed: true,
          optional: true,
          value: [{
            name: "Certificate.TBSCertificate.subjectUniqueID.id",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.BITSTRING,
            constructed: false,
            captureBitStringValue: "certSubjectUniqueId"
          }]
        }, {
          name: "Certificate.TBSCertificate.extensions",
          tagClass: XS.Class.CONTEXT_SPECIFIC,
          type: 3,
          constructed: true,
          captureAsn1: "certExtensions",
          optional: true
        }]
      }, {
        name: "Certificate.signatureAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "Certificate.signatureAlgorithm.algorithm",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OID,
          constructed: false,
          capture: "certSignatureOid"
        }, {
          name: "Certificate.TBSCertificate.signature.parameters",
          tagClass: XS.Class.UNIVERSAL,
          optional: true,
          captureAsn1: "certSignatureParams"
        }]
      }, {
        name: "Certificate.signatureValue",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.BITSTRING,
        constructed: false,
        captureBitStringValue: "certSignature"
      }]
    };
    var m5 = {
      name: "rsapss",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "rsapss.hashAlgorithm",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        constructed: true,
        value: [{
          name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Class.SEQUENCE,
          constructed: true,
          optional: true,
          value: [{
            name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.OID,
            constructed: false,
            capture: "hashOid"
          }]
        }]
      }, {
        name: "rsapss.maskGenAlgorithm",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 1,
        constructed: true,
        value: [{
          name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Class.SEQUENCE,
          constructed: true,
          optional: true,
          value: [{
            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.OID,
            constructed: false,
            capture: "maskGenOid"
          }, {
            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.SEQUENCE,
            constructed: true,
            value: [{
              name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
              tagClass: XS.Class.UNIVERSAL,
              type: XS.Type.OID,
              constructed: false,
              capture: "maskGenHashOid"
            }]
          }]
        }]
      }, {
        name: "rsapss.saltLength",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 2,
        optional: true,
        value: [{
          name: "rsapss.saltLength.saltLength",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Class.INTEGER,
          constructed: false,
          capture: "saltLength"
        }]
      }, {
        name: "rsapss.trailerField",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 3,
        optional: true,
        value: [{
          name: "rsapss.trailer.trailer",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Class.INTEGER,
          constructed: false,
          capture: "trailer"
        }]
      }]
    };
    var m6 = {
      name: "CertificationRequestInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "certificationRequestInfo",
      value: [{
        name: "CertificationRequestInfo.integer",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "certificationRequestInfoVersion"
      }, {
        name: "CertificationRequestInfo.subject",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        captureAsn1: "certificationRequestInfoSubject"
      }, m3, {
        name: "CertificationRequestInfo.attributes",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        type: 0,
        constructed: true,
        optional: true,
        capture: "certificationRequestInfoAttributes",
        value: [{
          name: "CertificationRequestInfo.attributes",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "CertificationRequestInfo.attributes.type",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.OID,
            constructed: false
          }, {
            name: "CertificationRequestInfo.attributes.value",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.SET,
            constructed: true
          }]
        }]
      }]
    };
    var m7 = {
      name: "CertificationRequest",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "csr",
      value: [m6, {
        name: "CertificationRequest.signatureAlgorithm",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "CertificationRequest.signatureAlgorithm.algorithm",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OID,
          constructed: false,
          capture: "csrSignatureOid"
        }, {
          name: "CertificationRequest.signatureAlgorithm.parameters",
          tagClass: XS.Class.UNIVERSAL,
          optional: true,
          captureAsn1: "csrSignatureParams"
        }]
      }, {
          name: "CertificationRequest.signature",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.BITSTRING,
          constructed: false,
          captureBitStringValue: "csrSignature"
        }]
    };
    m0.RDNAttributesAsArray = function (mU, mv) {
      var mM = [];
      var md;
      var mB;
      var ms;
      for (var mA = 0; mA < mU.value.length; ++mA) {
        md = mU.value[mA];
        for (var mG = 0; mG < md.value.length; ++mG) {
          ms = {};
          mB = md.value[mG];
          ms.type = XS.derToOid(mB.value[0].value);
          ms.value = mB.value[1].value;
          ms.valueTagClass = mB.value[1].type;
          if (ms.type in m1) {
            ms.name = m1[ms.type];
            if (ms.name in m2) {
              ms.shortName = m2[ms.name];
            }
          }
          if (mv) {
            mv.update(ms.type);
            mv.update(ms.value);
          }
          mM.push(ms);
        }
      }
      return mM;
    };
    m0.CRIAttributesAsArray = function (mU) {
      var mv = [];
      for (var mM = 0; mM < mU.length; ++mM) {
        var md = mU[mM];
        var mB = XS.derToOid(md.value[0].value);
        for (var ms = md.value[1].value, mA = 0; mA < ms.length; ++mA) {
          var mG = {
            type: mB,
            value: ms[mA].value,
            valueTagClass: ms[mA].type
          };
          if (mG.type in m1) {
            mG.name = m1[mG.type];
            if (mG.name in m2) {
              mG.shortName = m2[mG.name];
            }
          }
          if (mG.type === m1.extensionRequest) {
            mG.extensions = [];
            for (var mf = 0; mf < mG.value.length; ++mf) {
              mG.extensions.push(m0.certificateExtensionFromAsn1(mG.value[mf]));
            }
          }
          mv.push(mG);
        }
      }
      return mv;
    };
    function m8(mU, mv) {
      if (typeof mv == "string") {
        mv = {
          shortName: mv
        };
      }
      for (var mM = null, md, mB = 0; mM === null && mB < mU.attributes.length; ++mB) {
        md = mU.attributes[mB];
        if (mv.type && mv.type === md.type || mv.name && mv.name === md.name || mv.shortName && mv.shortName === md.shortName) {
          mM = md;
        }
      }
      return mM;
    }
    function m9(mU, mv, mM) {
      var md = {};
      if (mU !== m1["RSASSA-PSS"]) {
        return md;
      }
      if (mM) {
        md = {
          hash: {
            algorithmOid: m1.sha1
          },
          mgf: {
            algorithmOid: m1.mgf1,
            hash: {
              algorithmOid: m1.sha1
            }
          },
          saltLength: 20
        };
      }
      var mB = {};
      var ms = [];
      if (!XS.validate(mv, m5, mB, ms)) {
        var mA = new Error("Cannot read RSASSA-PSS parameter block.");
        mA.errors = ms;
        throw mA;
      }
      if (mB.hashOid !== undefined) {
        md.hash = md.hash || {};
        md.hash.algorithmOid = XS.derToOid(mB.hashOid);
      }
      if (mB.maskGenOid !== undefined) {
        md.mgf = md.mgf || {};
        md.mgf.algorithmOid = XS.derToOid(mB.maskGenOid);
        md.mgf.hash = md.mgf.hash || {};
        md.mgf.hash.algorithmOid = XS.derToOid(mB.maskGenHashOid);
      }
      if (mB.saltLength !== undefined) {
        md.saltLength = mB.saltLength.charCodeAt(0);
      }
      return md;
    }
    function mX(mU) {
      switch (m1[mU.signatureOid]) {
        case "sha1WithRSAEncryption":
        case "sha1WithRSASignature":
          return Xq.md.sha1.create();
        case "md5WithRSAEncryption":
          return Xq.md.md5.create();
        case "sha256WithRSAEncryption":
          return Xq.md.sha256.create();
        case "sha384WithRSAEncryption":
          return Xq.md.sha384.create();
        case "sha512WithRSAEncryption":
          return Xq.md.sha512.create();
        case "RSASSA-PSS":
          return Xq.md.sha256.create();
        default:
          var mv = new Error("Could not compute " + mU.type + " digest. Unknown signature OID.");
          mv.signatureOid = mU.signatureOid;
          throw mv;
      }
    }
    function mm(mU) {
      var mv = mU.certificate;
      var mM;
      switch (mv.signatureOid) {
        case m1.sha1WithRSAEncryption:
        case m1.sha1WithRSASignature:
          break;
        case m1["RSASSA-PSS"]:
          var md;
          var mB;
          md = m1[mv.signatureParameters.mgf.hash.algorithmOid];
          if (md === undefined || Xq.md[md] === undefined) {
            var ms = new Error("Unsupported MGF hash function.");
            ms.oid = mv.signatureParameters.mgf.hash.algorithmOid;
            ms.name = md;
            throw ms;
          }
          mB = m1[mv.signatureParameters.mgf.algorithmOid];
          if (mB === undefined || Xq.mgf[mB] === undefined) {
            var ms = new Error("Unsupported MGF function.");
            ms.oid = mv.signatureParameters.mgf.algorithmOid;
            ms.name = mB;
            throw ms;
          }
          mB = Xq.mgf[mB].create(Xq.md[md].create());
          md = m1[mv.signatureParameters.hash.algorithmOid];
          if (md === undefined || Xq.md[md] === undefined) {
            var ms = new Error("Unsupported RSASSA-PSS hash function.");
            ms.oid = mv.signatureParameters.hash.algorithmOid;
            ms.name = md;
            throw ms;
          }
          mM = Xq.pss.create(Xq.md[md].create(), mB, mv.signatureParameters.saltLength);
          break;
      }
      return mv.publicKey.verify(mU.md.digest().getBytes(), mU.signature, mM);
    }
    m0.certificateFromPem = function (mU, mv, mM) {
      var md = Xq.pem.decode(mU)[0];
      if (md.type !== "CERTIFICATE" && md.type !== "X509 CERTIFICATE" && md.type !== "TRUSTED CERTIFICATE") {
        var mB = new Error("Could not convert certificate from PEM; PEM header type is not \"CERTIFICATE\", \"X509 CERTIFICATE\", or \"TRUSTED CERTIFICATE\".");
        mB.headerType = md.type;
        throw mB;
      }
      if (md.procType && md.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
      }
      var ms = XS.fromDer(md.body, mM);
      return m0.certificateFromAsn1(ms, mv);
    };
    m0.certificateToPem = function (mU, mv) {
      var mM = {
        type: "CERTIFICATE",
        body: XS.toDer(m0.certificateToAsn1(mU)).getBytes()
      };
      return Xq.pem.encode(mM, {
        maxline: mv
      });
    };
    m0.publicKeyFromPem = function (mU) {
      var mv = Xq.pem.decode(mU)[0];
      if (mv.type !== "PUBLIC KEY" && mv.type !== "RSA PUBLIC KEY") {
        var mM = new Error("Could not convert public key from PEM; PEM header type is not \"PUBLIC KEY\" or \"RSA PUBLIC KEY\".");
        mM.headerType = mv.type;
        throw mM;
      }
      if (mv.procType && mv.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert public key from PEM; PEM is encrypted.");
      }
      var md = XS.fromDer(mv.body);
      return m0.publicKeyFromAsn1(md);
    };
    m0.publicKeyToPem = function (mU, mv) {
      var mM = {
        type: "PUBLIC KEY",
        body: XS.toDer(m0.publicKeyToAsn1(mU)).getBytes()
      };
      return Xq.pem.encode(mM, {
        maxline: mv
      });
    };
    m0.publicKeyToRSAPublicKeyPem = function (mU, mv) {
      var mM = {
        type: "RSA PUBLIC KEY",
        body: XS.toDer(m0.publicKeyToRSAPublicKey(mU)).getBytes()
      };
      return Xq.pem.encode(mM, {
        maxline: mv
      });
    };
    m0.getPublicKeyFingerprint = function (mU, mv) {
      mv = mv || {};
      var mM = mv.md || Xq.md.sha1.create();
      var md = mv.type || "RSAPublicKey";
      var mB;
      switch (md) {
        case "RSAPublicKey":
          mB = XS.toDer(m0.publicKeyToRSAPublicKey(mU)).getBytes();
          break;
        case "SubjectPublicKeyInfo":
          mB = XS.toDer(m0.publicKeyToAsn1(mU)).getBytes();
          break;
        default:
          throw new Error("Unknown fingerprint type \"" + mv.type + "\".");
      }
      mM.start();
      mM.update(mB);
      var ms = mM.digest();
      if (mv.encoding === "hex") {
        var mA = ms.toHex();
        if (mv.delimiter) {
          return mA.match(/.{2}/g).join(mv.delimiter);
        } else {
          return mA;
        }
      } else {
        if (mv.encoding === "binary") {
          return ms.getBytes();
        }
        if (mv.encoding) {
          throw new Error("Unknown encoding \"" + mv.encoding + "\".");
        }
      }
      return ms;
    };
    m0.certificationRequestFromPem = function (mU, mv, mM) {
      var md = Xq.pem.decode(mU)[0];
      if (md.type !== "CERTIFICATE REQUEST") {
        var mB = new Error("Could not convert certification request from PEM; PEM header type is not \"CERTIFICATE REQUEST\".");
        mB.headerType = md.type;
        throw mB;
      }
      if (md.procType && md.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
      }
      var ms = XS.fromDer(md.body, mM);
      return m0.certificationRequestFromAsn1(ms, mv);
    };
    m0.certificationRequestToPem = function (mU, mv) {
      var mM = {
        type: "CERTIFICATE REQUEST",
        body: XS.toDer(m0.certificationRequestToAsn1(mU)).getBytes()
      };
      return Xq.pem.encode(mM, {
        maxline: mv
      });
    };
    m0.createCertificate = function () {
      var mU = {
        version: 2,
        serialNumber: "00",
        signatureOid: null,
        signature: null,
        siginfo: {}
      };
      mU.siginfo.algorithmOid = null;
      mU.validity = {};
      mU.validity.notBefore = new Date();
      mU.validity.notAfter = new Date();
      mU.issuer = {};
      mU.issuer.getField = function (mv) {
        return m8(mU.issuer, mv);
      };
      mU.issuer.addField = function (mv) {
        mV([mv]);
        mU.issuer.attributes.push(mv);
      };
      mU.issuer.attributes = [];
      mU.issuer.hash = null;
      mU.subject = {};
      mU.subject.getField = function (mv) {
        return m8(mU.subject, mv);
      };
      mU.subject.addField = function (mv) {
        mV([mv]);
        mU.subject.attributes.push(mv);
      };
      mU.subject.attributes = [];
      mU.subject.hash = null;
      mU.extensions = [];
      mU.publicKey = null;
      mU.md = null;
      mU.setSubject = function (mv, mM) {
        mV(mv);
        mU.subject.attributes = mv;
        delete mU.subject.uniqueId;
        if (mM) {
          mU.subject.uniqueId = mM;
        }
        mU.subject.hash = null;
      };
      mU.setIssuer = function (mv, mM) {
        mV(mv);
        mU.issuer.attributes = mv;
        delete mU.issuer.uniqueId;
        if (mM) {
          mU.issuer.uniqueId = mM;
        }
        mU.issuer.hash = null;
      };
      mU.setExtensions = function (mv) {
        for (var mM = 0; mM < mv.length; ++mM) {
          mE(mv[mM], {
            cert: mU
          });
        }
        mU.extensions = mv;
      };
      mU.getExtension = function (mv) {
        if (typeof mv == "string") {
          mv = {
            name: mv
          };
        }
        for (var mM = null, md, mB = 0; mM === null && mB < mU.extensions.length; ++mB) {
          md = mU.extensions[mB];
          if (mv.id && md.id === mv.id || mv.name && md.name === mv.name) {
            mM = md;
          }
        }
        return mM;
      };
      mU.sign = function (mv, mM) {
        mU.md = mM || Xq.md.sha1.create();
        var md = m1[mU.md.algorithm + "WithRSAEncryption"];
        if (!md) {
          var mB = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
          mB.algorithm = mU.md.algorithm;
          throw mB;
        }
        mU.signatureOid = mU.siginfo.algorithmOid = md;
        mU.tbsCertificate = m0.getTBSCertificate(mU);
        var ms = XS.toDer(mU.tbsCertificate);
        mU.md.update(ms.getBytes());
        mU.signature = mv.sign(mU.md);
      };
      mU.verify = function (mv) {
        var mM = false;
        if (!mU.issued(mv)) {
          var md = mv.issuer;
          var mB = mU.subject;
          var ms = new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");
          ms.expectedIssuer = mB.attributes;
          ms.actualIssuer = md.attributes;
          throw ms;
        }
        var mA = mv.md;
        if (mA === null) {
          mA = mX({
            signatureOid: mv.signatureOid,
            type: "certificate"
          });
          var mG = mv.tbsCertificate || m0.getTBSCertificate(mv);
          var mf = XS.toDer(mG);
          mA.update(mf.getBytes());
        }
        if (mA !== null) {
          mM = mm({
            certificate: mU,
            md: mA,
            signature: mv.signature
          });
        }
        return mM;
      };
      mU.isIssuer = function (mv) {
        var mM = false;
        var md = mU.issuer;
        var mB = mv.subject;
        if (md.hash && mB.hash) {
          mM = md.hash === mB.hash;
        } else if (md.attributes.length === mB.attributes.length) {
          mM = true;
          var ms;
          var mA;
          for (var mG = 0; mM && mG < md.attributes.length; ++mG) {
            ms = md.attributes[mG];
            mA = mB.attributes[mG];
            if (ms.type !== mA.type || ms.value !== mA.value) {
              mM = false;
            }
          }
        }
        return mM;
      };
      mU.issued = function (mv) {
        return mv.isIssuer(mU);
      };
      mU.generateSubjectKeyIdentifier = function () {
        return m0.getPublicKeyFingerprint(mU.publicKey, {
          type: "RSAPublicKey"
        });
      };
      mU.verifySubjectKeyIdentifier = function () {
        var mv = m1.subjectKeyIdentifier;
        for (var mM = 0; mM < mU.extensions.length; ++mM) {
          var md = mU.extensions[mM];
          if (md.id === mv) {
            var mB = mU.generateSubjectKeyIdentifier().getBytes();
            return Xq.util.hexToBytes(md.subjectKeyIdentifier) === mB;
          }
        }
        return false;
      };
      return mU;
    };
    m0.certificateFromAsn1 = function (mU, mv) {
      var mM = {};
      var md = [];
      if (!XS.validate(mU, m4, mM, md)) {
        var mB = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
        mB.errors = md;
        throw mB;
      }
      var ms = XS.derToOid(mM.publicKeyOid);
      if (ms !== m0.oids.rsaEncryption) {
        throw new Error("Cannot read public key. OID is not RSA.");
      }
      var mA = m0.createCertificate();
      mA.version = mM.certVersion ? mM.certVersion.charCodeAt(0) : 0;
      var mG = Xq.util.createBuffer(mM.certSerialNumber);
      mA.serialNumber = mG.toHex();
      mA.signatureOid = Xq.asn1.derToOid(mM.certSignatureOid);
      mA.signatureParameters = m9(mA.signatureOid, mM.certSignatureParams, true);
      mA.siginfo.algorithmOid = Xq.asn1.derToOid(mM.certinfoSignatureOid);
      mA.siginfo.parameters = m9(mA.siginfo.algorithmOid, mM.certinfoSignatureParams, false);
      mA.signature = mM.certSignature;
      var mf = [];
      if (mM.certValidity1UTCTime !== undefined) {
        mf.push(XS.utcTimeToDate(mM.certValidity1UTCTime));
      }
      if (mM.certValidity2GeneralizedTime !== undefined) {
        mf.push(XS.generalizedTimeToDate(mM.certValidity2GeneralizedTime));
      }
      if (mM.certValidity3UTCTime !== undefined) {
        mf.push(XS.utcTimeToDate(mM.certValidity3UTCTime));
      }
      if (mM.certValidity4GeneralizedTime !== undefined) {
        mf.push(XS.generalizedTimeToDate(mM.certValidity4GeneralizedTime));
      }
      if (mf.length > 2) {
        throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
      }
      if (mf.length < 2) {
        throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
      }
      mA.validity.notBefore = mf[0];
      mA.validity.notAfter = mf[1];
      mA.tbsCertificate = mM.tbsCertificate;
      if (mv) {
        mA.md = mX({
          signatureOid: mA.signatureOid,
          type: "certificate"
        });
        var mb = XS.toDer(mA.tbsCertificate);
        mA.md.update(mb.getBytes());
      }
      var mT = Xq.md.sha1.create();
      var mQ = XS.toDer(mM.certIssuer);
      mT.update(mQ.getBytes());
      mA.issuer.getField = function (mO) {
        return m8(mA.issuer, mO);
      };
      mA.issuer.addField = function (mO) {
        mV([mO]);
        mA.issuer.attributes.push(mO);
      };
      mA.issuer.attributes = m0.RDNAttributesAsArray(mM.certIssuer);
      if (mM.certIssuerUniqueId) {
        mA.issuer.uniqueId = mM.certIssuerUniqueId;
      }
      mA.issuer.hash = mT.digest().toHex();
      var mt = Xq.md.sha1.create();
      var mi = XS.toDer(mM.certSubject);
      mt.update(mi.getBytes());
      mA.subject.getField = function (mO) {
        return m8(mA.subject, mO);
      };
      mA.subject.addField = function (mO) {
        mV([mO]);
        mA.subject.attributes.push(mO);
      };
      mA.subject.attributes = m0.RDNAttributesAsArray(mM.certSubject);
      if (mM.certSubjectUniqueId) {
        mA.subject.uniqueId = mM.certSubjectUniqueId;
      }
      mA.subject.hash = mt.digest().toHex();
      if (mM.certExtensions) {
        mA.extensions = m0.certificateExtensionsFromAsn1(mM.certExtensions);
      } else {
        mA.extensions = [];
      }
      mA.publicKey = m0.publicKeyFromAsn1(mM.subjectPublicKeyInfo);
      return mA;
    };
    m0.certificateExtensionsFromAsn1 = function (mU) {
      var mv = [];
      for (var mM = 0; mM < mU.value.length; ++mM) {
        for (var md = mU.value[mM], mB = 0; mB < md.value.length; ++mB) {
          mv.push(m0.certificateExtensionFromAsn1(md.value[mB]));
        }
      }
      return mv;
    };
    m0.certificateExtensionFromAsn1 = function (mU) {
      var mv = {};
      mv.id = XS.derToOid(mU.value[0].value);
      mv.critical = false;
      if (mU.value[1].type === XS.Type.BOOLEAN) {
        mv.critical = mU.value[1].value.charCodeAt(0) !== 0;
        mv.value = mU.value[2].value;
      } else {
        mv.value = mU.value[1].value;
      }
      if (mv.id in m1) {
        mv.name = m1[mv.id];
        if (mv.name === "keyUsage") {
          var mM = XS.fromDer(mv.value);
          var md = 0;
          var mB = 0;
          if (mM.value.length > 1) {
            md = mM.value.charCodeAt(1);
            mB = mM.value.length > 2 ? mM.value.charCodeAt(2) : 0;
          }
          mv.digitalSignature = (md & 128) === 128;
          mv.nonRepudiation = (md & 64) === 64;
          mv.keyEncipherment = (md & 32) === 32;
          mv.dataEncipherment = (md & 16) === 16;
          mv.keyAgreement = (md & 8) === 8;
          mv.keyCertSign = (md & 4) === 4;
          mv.cRLSign = (md & 2) === 2;
          mv.encipherOnly = (md & 1) === 1;
          mv.decipherOnly = (mB & 128) === 128;
        } else if (mv.name === "basicConstraints") {
          var mM = XS.fromDer(mv.value);
          if (mM.value.length > 0 && mM.value[0].type === XS.Type.BOOLEAN) {
            mv.cA = mM.value[0].value.charCodeAt(0) !== 0;
          } else {
            mv.cA = false;
          }
          var ms = null;
          if (mM.value.length > 0 && mM.value[0].type === XS.Type.INTEGER) {
            ms = mM.value[0].value;
          } else if (mM.value.length > 1) {
            ms = mM.value[1].value;
          }
          if (ms !== null) {
            mv.pathLenConstraint = XS.derToInteger(ms);
          }
        } else if (mv.name === "extKeyUsage") {
          for (var mM = XS.fromDer(mv.value), mA = 0; mA < mM.value.length; ++mA) {
            var mG = XS.derToOid(mM.value[mA].value);
            if (mG in m1) {
              mv[m1[mG]] = true;
            } else {
              mv[mG] = true;
            }
          }
        } else if (mv.name === "nsCertType") {
          var mM = XS.fromDer(mv.value);
          var md = 0;
          if (mM.value.length > 1) {
            md = mM.value.charCodeAt(1);
          }
          mv.client = (md & 128) === 128;
          mv.server = (md & 64) === 64;
          mv.email = (md & 32) === 32;
          mv.objsign = (md & 16) === 16;
          mv.reserved = (md & 8) === 8;
          mv.sslCA = (md & 4) === 4;
          mv.emailCA = (md & 2) === 2;
          mv.objCA = (md & 1) === 1;
        } else if (mv.name === "subjectAltName" || mv.name === "issuerAltName") {
          mv.altNames = [];
          var mf;
          for (var mM = XS.fromDer(mv.value), mb = 0; mb < mM.value.length; ++mb) {
            mf = mM.value[mb];
            var mT = {
              type: mf.type,
              value: mf.value
            };
            mv.altNames.push(mT);
            switch (mf.type) {
              case 1:
              case 2:
              case 6:
                break;
              case 7:
                mT.ip = Xq.util.bytesToIP(mf.value);
                break;
              case 8:
                mT.oid = XS.derToOid(mf.value);
                break;
              default:
            }
          }
        } else if (mv.name === "subjectKeyIdentifier") {
          var mM = XS.fromDer(mv.value);
          mv.subjectKeyIdentifier = Xq.util.bytesToHex(mM.value);
        }
      }
      return mv;
    };
    m0.certificationRequestFromAsn1 = function (mU, mv) {
      var mM = {};
      var md = [];
      if (!XS.validate(mU, m7, mM, md)) {
        var mB = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
        mB.errors = md;
        throw mB;
      }
      var ms = XS.derToOid(mM.publicKeyOid);
      if (ms !== m0.oids.rsaEncryption) {
        throw new Error("Cannot read public key. OID is not RSA.");
      }
      var mA = m0.createCertificationRequest();
      mA.version = mM.csrVersion ? mM.csrVersion.charCodeAt(0) : 0;
      mA.signatureOid = Xq.asn1.derToOid(mM.csrSignatureOid);
      mA.signatureParameters = m9(mA.signatureOid, mM.csrSignatureParams, true);
      mA.siginfo.algorithmOid = Xq.asn1.derToOid(mM.csrSignatureOid);
      mA.siginfo.parameters = m9(mA.siginfo.algorithmOid, mM.csrSignatureParams, false);
      mA.signature = mM.csrSignature;
      mA.certificationRequestInfo = mM.certificationRequestInfo;
      if (mv) {
        mA.md = mX({
          signatureOid: mA.signatureOid,
          type: "certification request"
        });
        var mG = XS.toDer(mA.certificationRequestInfo);
        mA.md.update(mG.getBytes());
      }
      var mf = Xq.md.sha1.create();
      mA.subject.getField = function (mb) {
        return m8(mA.subject, mb);
      };
      mA.subject.addField = function (mb) {
        mV([mb]);
        mA.subject.attributes.push(mb);
      };
      mA.subject.attributes = m0.RDNAttributesAsArray(mM.certificationRequestInfoSubject, mf);
      mA.subject.hash = mf.digest().toHex();
      mA.publicKey = m0.publicKeyFromAsn1(mM.subjectPublicKeyInfo);
      mA.getAttribute = function (mb) {
        return m8(mA, mb);
      };
      mA.addAttribute = function (mb) {
        mV([mb]);
        mA.attributes.push(mb);
      };
      mA.attributes = m0.CRIAttributesAsArray(mM.certificationRequestInfoAttributes || []);
      return mA;
    };
    m0.createCertificationRequest = function () {
      var mU = {
        version: 0,
        signatureOid: null,
        signature: null,
        siginfo: {}
      };
      mU.siginfo.algorithmOid = null;
      mU.subject = {};
      mU.subject.getField = function (mv) {
        return m8(mU.subject, mv);
      };
      mU.subject.addField = function (mv) {
        mV([mv]);
        mU.subject.attributes.push(mv);
      };
      mU.subject.attributes = [];
      mU.subject.hash = null;
      mU.publicKey = null;
      mU.attributes = [];
      mU.getAttribute = function (mv) {
        return m8(mU, mv);
      };
      mU.addAttribute = function (mv) {
        mV([mv]);
        mU.attributes.push(mv);
      };
      mU.md = null;
      mU.setSubject = function (mv) {
        mV(mv);
        mU.subject.attributes = mv;
        mU.subject.hash = null;
      };
      mU.setAttributes = function (mv) {
        mV(mv);
        mU.attributes = mv;
      };
      mU.sign = function (mv, mM) {
        mU.md = mM || Xq.md.sha1.create();
        var md = m1[mU.md.algorithm + "WithRSAEncryption"];
        if (!md) {
          var mB = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
          mB.algorithm = mU.md.algorithm;
          throw mB;
        }
        mU.signatureOid = mU.siginfo.algorithmOid = md;
        mU.certificationRequestInfo = m0.getCertificationRequestInfo(mU);
        var ms = XS.toDer(mU.certificationRequestInfo);
        mU.md.update(ms.getBytes());
        mU.signature = mv.sign(mU.md);
      };
      mU.verify = function () {
        var mv = false;
        var mM = mU.md;
        if (mM === null) {
          mM = mX({
            signatureOid: mU.signatureOid,
            type: "certification request"
          });
          var md = mU.certificationRequestInfo || m0.getCertificationRequestInfo(mU);
          var mB = XS.toDer(md);
          mM.update(mB.getBytes());
        }
        if (mM !== null) {
          mv = mm({
            certificate: mU,
            md: mM,
            signature: mU.signature
          });
        }
        return mv;
      };
      return mU;
    };
    function mI(mU) {
      var mv = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
      var mM;
      var md;
      for (var mB = mU.attributes, ms = 0; ms < mB.length; ++ms) {
        mM = mB[ms];
        var mA = mM.value;
        var mG = XS.Type.PRINTABLESTRING;
        if ("valueTagClass" in mM) {
          mG = mM.valueTagClass;
          if (mG === XS.Type.UTF8) {
            mA = Xq.util.encodeUtf8(mA);
          }
        }
        md = XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mM.type).getBytes()), XS.create(XS.Class.UNIVERSAL, mG, false, mA)])]);
        mv.value.push(md);
      }
      return mv;
    }
    function mV(mU) {
      var mv;
      for (var mM = 0; mM < mU.length; ++mM) {
        mv = mU[mM];
        if (typeof mv.name === "undefined") {
          if (mv.type && mv.type in m0.oids) {
            mv.name = m0.oids[mv.type];
          } else if (mv.shortName && mv.shortName in m2) {
            mv.name = m0.oids[m2[mv.shortName]];
          }
        }
        if (typeof mv.type === "undefined") {
          if (mv.name && mv.name in m0.oids) {
            mv.type = m0.oids[mv.name];
          } else {
            var md = new Error("Attribute type not specified.");
            md.attribute = mv;
            throw md;
          }
        }
        if (typeof mv.shortName === "undefined" && mv.name && mv.name in m2) {
          mv.shortName = m2[mv.name];
        }
        if (mv.type === m1.extensionRequest && (mv.valueConstructed = true, mv.valueTagClass = XS.Type.SEQUENCE, !mv.value && mv.extensions)) {
          mv.value = [];
          for (var mB = 0; mB < mv.extensions.length; ++mB) {
            mv.value.push(m0.certificateExtensionToAsn1(mE(mv.extensions[mB])));
          }
        }
        if (typeof mv.value === "undefined") {
          var md = new Error("Attribute value not specified.");
          md.attribute = mv;
          throw md;
        }
      }
    }
    function mE(mU, mv) {
      mv = mv || {};
      if (typeof mU.name === "undefined" && mU.id && mU.id in m0.oids) {
        mU.name = m0.oids[mU.id];
      }
      if (typeof mU.id === "undefined") {
        if (mU.name && mU.name in m0.oids) {
          mU.id = m0.oids[mU.name];
        } else {
          var mM = new Error("Extension ID not specified.");
          mM.extension = mU;
          throw mM;
        }
      }
      if (typeof mU.value !== "undefined") {
        return mU;
      }
      if (mU.name === "keyUsage") {
        var md = 0;
        var mB = 0;
        var ms = 0;
        if (mU.digitalSignature) {
          mB |= 128;
          md = 7;
        }
        if (mU.nonRepudiation) {
          mB |= 64;
          md = 6;
        }
        if (mU.keyEncipherment) {
          mB |= 32;
          md = 5;
        }
        if (mU.dataEncipherment) {
          mB |= 16;
          md = 4;
        }
        if (mU.keyAgreement) {
          mB |= 8;
          md = 3;
        }
        if (mU.keyCertSign) {
          mB |= 4;
          md = 2;
        }
        if (mU.cRLSign) {
          mB |= 2;
          md = 1;
        }
        if (mU.encipherOnly) {
          mB |= 1;
          md = 0;
        }
        if (mU.decipherOnly) {
          ms |= 128;
          md = 7;
        }
        var mA = String.fromCharCode(md);
        if (ms !== 0) {
          mA += String.fromCharCode(mB) + String.fromCharCode(ms);
        } else if (mB !== 0) {
          mA += String.fromCharCode(mB);
        }
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, mA);
      } else if (mU.name === "basicConstraints") {
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        if (mU.cA) {
          mU.value.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.BOOLEAN, false, "ÿ"));
        }
        if ("pathLenConstraint" in mU) {
          mU.value.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mU.pathLenConstraint).getBytes()));
        }
      } else if (mU.name === "extKeyUsage") {
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        var mG = mU.value.value;
        for (var mf in mU) {
          if (mU[mf] === true) {
            if (mf in m1) {
              mG.push(XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m1[mf]).getBytes()));
            } else if (mf.indexOf(".") !== -1) {
              mG.push(XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mf).getBytes()));
            }
          }
        }
      } else if (mU.name === "nsCertType") {
        var md = 0;
        var mB = 0;
        if (mU.client) {
          mB |= 128;
          md = 7;
        }
        if (mU.server) {
          mB |= 64;
          md = 6;
        }
        if (mU.email) {
          mB |= 32;
          md = 5;
        }
        if (mU.objsign) {
          mB |= 16;
          md = 4;
        }
        if (mU.reserved) {
          mB |= 8;
          md = 3;
        }
        if (mU.sslCA) {
          mB |= 4;
          md = 2;
        }
        if (mU.emailCA) {
          mB |= 2;
          md = 1;
        }
        if (mU.objCA) {
          mB |= 1;
          md = 0;
        }
        var mA = String.fromCharCode(md);
        if (mB !== 0) {
          mA += String.fromCharCode(mB);
        }
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, mA);
      } else if (mU.name === "subjectAltName" || mU.name === "issuerAltName") {
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        var mb;
        for (var mT = 0; mT < mU.altNames.length; ++mT) {
          mb = mU.altNames[mT];
          var mA = mb.value;
          if (mb.type === 7 && mb.ip) {
            mA = Xq.util.bytesFromIP(mb.ip);
            if (mA === null) {
              var mM = new Error("Extension \"ip\" value is not a valid IPv4 or IPv6 address.");
              mM.extension = mU;
              throw mM;
            }
          } else if (mb.type === 8) {
            if (mb.oid) {
              mA = XS.oidToDer(XS.oidToDer(mb.oid));
            } else {
              mA = XS.oidToDer(mA);
            }
          }
          mU.value.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, mb.type, false, mA));
        }
      } else if (mU.name === "nsComment" && mv.cert) {
        if (!/^[\x00-\x7F]*$/.test(mU.comment) || mU.comment.length < 1 || mU.comment.length > 128) {
          throw new Error("Invalid \"nsComment\" content.");
        }
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.IA5STRING, false, mU.comment);
      } else if (mU.name === "subjectKeyIdentifier" && mv.cert) {
        var mQ = mv.cert.generateSubjectKeyIdentifier();
        mU.subjectKeyIdentifier = mQ.toHex();
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mQ.getBytes());
      } else if (mU.name === "authorityKeyIdentifier" && mv.cert) {
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        var mG = mU.value.value;
        if (mU.keyIdentifier) {
          var mt = mU.keyIdentifier === true ? mv.cert.generateSubjectKeyIdentifier().getBytes() : mU.keyIdentifier;
          mG.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 0, false, mt));
        }
        if (mU.authorityCertIssuer) {
          var mi = [XS.create(XS.Class.CONTEXT_SPECIFIC, 4, true, [mI(mU.authorityCertIssuer === true ? mv.cert.issuer : mU.authorityCertIssuer)])];
          mG.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 1, true, mi));
        }
        if (mU.serialNumber) {
          var mO = Xq.util.hexToBytes(mU.serialNumber === true ? mv.cert.serialNumber : mU.serialNumber);
          mG.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 2, false, mO));
        }
      } else if (mU.name === "cRLDistributionPoints") {
        mU.value = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        var mG = mU.value.value;
        var mu = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
        var mN = XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, []);
        var mb;
        for (var mT = 0; mT < mU.altNames.length; ++mT) {
          mb = mU.altNames[mT];
          var mA = mb.value;
          if (mb.type === 7 && mb.ip) {
            mA = Xq.util.bytesFromIP(mb.ip);
            if (mA === null) {
              var mM = new Error("Extension \"ip\" value is not a valid IPv4 or IPv6 address.");
              mM.extension = mU;
              throw mM;
            }
          } else if (mb.type === 8) {
            if (mb.oid) {
              mA = XS.oidToDer(XS.oidToDer(mb.oid));
            } else {
              mA = XS.oidToDer(mA);
            }
          }
          mN.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, mb.type, false, mA));
        }
        mu.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [mN]));
        mG.push(mu);
      }
      if (typeof mU.value === "undefined") {
        var mM = new Error("Extension value not specified.");
        mM.extension = mU;
        throw mM;
      }
      return mU;
    }
    function mW(mU, mv) {
      switch (mU) {
        case m1["RSASSA-PSS"]:
          var mM = [];
          if (mv.hash.algorithmOid !== undefined) {
            mM.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mv.hash.algorithmOid).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")])]));
          }
          if (mv.mgf.algorithmOid !== undefined) {
            mM.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 1, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mv.mgf.algorithmOid).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mv.mgf.hash.algorithmOid).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")])])]));
          }
          if (mv.saltLength !== undefined) {
            mM.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 2, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mv.saltLength).getBytes())]));
          }
          return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, mM);
        default:
          return XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "");
      }
    }
    function mC(mU) {
      var mv = XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, []);
      if (mU.attributes.length === 0) {
        return mv;
      }
      for (var mM = mU.attributes, md = 0; md < mM.length; ++md) {
        var mB = mM[md];
        var ms = mB.value;
        var mA = XS.Type.UTF8;
        if ("valueTagClass" in mB) {
          mA = mB.valueTagClass;
        }
        if (mA === XS.Type.UTF8) {
          ms = Xq.util.encodeUtf8(ms);
        }
        var mG = false;
        if ("valueConstructed" in mB) {
          mG = mB.valueConstructed;
        }
        var mf = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mB.type).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, [XS.create(XS.Class.UNIVERSAL, mA, mG, ms)])]);
        mv.value.push(mf);
      }
      return mv;
    }
    var mH = new Date("1950-01-01T00:00:00Z");
    var me = new Date("2050-01-01T00:00:00Z");
    function mK(mU) {
      if (mU >= mH && mU < me) {
        return XS.create(XS.Class.UNIVERSAL, XS.Type.UTCTIME, false, XS.dateToUtcTime(mU));
      } else {
        return XS.create(XS.Class.UNIVERSAL, XS.Type.GENERALIZEDTIME, false, XS.dateToGeneralizedTime(mU));
      }
    }
    m0.getTBSCertificate = function (mU) {
      var mv = mK(mU.validity.notBefore);
      var mM = mK(mU.validity.notAfter);
      var md = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mU.version).getBytes())]), XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, Xq.util.hexToBytes(mU.serialNumber)), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mU.siginfo.algorithmOid).getBytes()), mW(mU.siginfo.algorithmOid, mU.siginfo.parameters)]), mI(mU.issuer), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [mv, mM]), mI(mU.subject), m0.publicKeyToAsn1(mU.publicKey)]);
      if (mU.issuer.uniqueId) {
        md.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 1, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, "\0" + mU.issuer.uniqueId)]));
      }
      if (mU.subject.uniqueId) {
        md.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 2, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, "\0" + mU.subject.uniqueId)]));
      }
      if (mU.extensions.length > 0) {
        md.value.push(m0.certificateExtensionsToAsn1(mU.extensions));
      }
      return md;
    };
    m0.getCertificationRequestInfo = function (mU) {
      var mv = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mU.version).getBytes()), mI(mU.subject), m0.publicKeyToAsn1(mU.publicKey), mC(mU)]);
      return mv;
    };
    m0.distinguishedNameToAsn1 = function (mU) {
      return mI(mU);
    };
    m0.certificateToAsn1 = function (mU) {
      var mv = mU.tbsCertificate || m0.getTBSCertificate(mU);
      return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [mv, XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mU.signatureOid).getBytes()), mW(mU.signatureOid, mU.signatureParameters)]), XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, "\0" + mU.signature)]);
    };
    m0.certificateExtensionsToAsn1 = function (mU) {
      var mv = XS.create(XS.Class.CONTEXT_SPECIFIC, 3, true, []);
      var mM = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
      mv.value.push(mM);
      for (var md = 0; md < mU.length; ++md) {
        mM.value.push(m0.certificateExtensionToAsn1(mU[md]));
      }
      return mv;
    };
    m0.certificateExtensionToAsn1 = function (mU) {
      var mv = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, []);
      mv.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mU.id).getBytes()));
      if (mU.critical) {
        mv.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.BOOLEAN, false, "ÿ"));
      }
      var mM = mU.value;
      if (typeof mU.value != "string") {
        mM = XS.toDer(mM).getBytes();
      }
      mv.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mM));
      return mv;
    };
    m0.certificationRequestToAsn1 = function (mU) {
      var mv = mU.certificationRequestInfo || m0.getCertificationRequestInfo(mU);
      return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [mv, XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mU.signatureOid).getBytes()), mW(mU.signatureOid, mU.signatureParameters)]), XS.create(XS.Class.UNIVERSAL, XS.Type.BITSTRING, false, "\0" + mU.signature)]);
    };
    m0.createCaStore = function (mU) {
      var mv = {
        certs: {}
      };
      mv.getIssuer = function (mA) {
        var mG = mM(mA.issuer);
        return mG;
      };
      mv.addCertificate = function (mA) {
        if (typeof mA == "string") {
          mA = Xq.pki.certificateFromPem(mA);
        }
        md(mA.subject);
        if (!mv.hasCertificate(mA)) {
          if (mA.subject.hash in mv.certs) {
            var mG = mv.certs[mA.subject.hash];
            if (!Xq.util.isArray(mG)) {
              mG = [mG];
            }
            mG.push(mA);
            mv.certs[mA.subject.hash] = mG;
          } else {
            mv.certs[mA.subject.hash] = mA;
          }
        }
      };
      mv.hasCertificate = function (mA) {
        if (typeof mA == "string") {
          mA = Xq.pki.certificateFromPem(mA);
        }
        var mG = mM(mA.subject);
        if (!mG) {
          return false;
        }
        if (!Xq.util.isArray(mG)) {
          mG = [mG];
        }
        var mf = XS.toDer(m0.certificateToAsn1(mA)).getBytes();
        for (var mb = 0; mb < mG.length; ++mb) {
          var mT = XS.toDer(m0.certificateToAsn1(mG[mb])).getBytes();
          if (mf === mT) {
            return true;
          }
        }
        return false;
      };
      mv.listAllCertificates = function () {
        var mA = [];
        for (var mG in mv.certs) {
          if (mv.certs.hasOwnProperty(mG)) {
            var mf = mv.certs[mG];
            if (!Xq.util.isArray(mf)) {
              mA.push(mf);
            } else {
              for (var mb = 0; mb < mf.length; ++mb) {
                mA.push(mf[mb]);
              }
            }
          }
        }
        return mA;
      };
      mv.removeCertificate = function (mA) {
        var mG;
        if (typeof mA == "string") {
          mA = Xq.pki.certificateFromPem(mA);
        }
        md(mA.subject);
        if (!mv.hasCertificate(mA)) {
          return null;
        }
        var mf = mM(mA.subject);
        if (!Xq.util.isArray(mf)) {
          mG = mv.certs[mA.subject.hash];
          delete mv.certs[mA.subject.hash];
          return mG;
        }
        var mb = XS.toDer(m0.certificateToAsn1(mA)).getBytes();
        for (var mT = 0; mT < mf.length; ++mT) {
          var mQ = XS.toDer(m0.certificateToAsn1(mf[mT])).getBytes();
          if (mb === mQ) {
            mG = mf[mT];
            mf.splice(mT, 1);
          }
        }
        if (mf.length === 0) {
          delete mv.certs[mA.subject.hash];
        }
        return mG;
      };
      function mM(mA) {
        md(mA);
        return mv.certs[mA.hash] || null;
      }
      function md(mA) {
        if (!mA.hash) {
          var mG = Xq.md.sha1.create();
          mA.attributes = m0.RDNAttributesAsArray(mI(mA), mG);
          mA.hash = mG.digest().toHex();
        }
      }
      if (mU) {
        for (var mB = 0; mB < mU.length; ++mB) {
          var ms = mU[mB];
          mv.addCertificate(ms);
        }
      }
      return mv;
    };
    m0.certificateError = {
      bad_certificate: "forge.pki.BadCertificate",
      unsupported_certificate: "forge.pki.UnsupportedCertificate",
      certificate_revoked: "forge.pki.CertificateRevoked",
      certificate_expired: "forge.pki.CertificateExpired",
      certificate_unknown: "forge.pki.CertificateUnknown",
      unknown_ca: "forge.pki.UnknownCertificateAuthority"
    };
    m0.verifyCertificateChain = function (mU, mv, mM) {
      if (typeof mM == "function") {
        mM = {
          verify: mM
        };
      }
      mM = mM || {};
      mv = mv.slice(0);
      var md = mv.slice(0);
      var mB = mM.validityCheckDate;
      if (typeof mB === "undefined") {
        mB = new Date();
      }
      var ms = true;
      var mA = null;
      var mG = 0;
      do {
        var mf = mv.shift();
        var mb = null;
        var mT = false;
        if (mB && (mB < mf.validity.notBefore || mB > mf.validity.notAfter)) {
          mA = {
            message: "Certificate is not valid yet or has expired.",
            error: m0.certificateError.certificate_expired,
            notBefore: mf.validity.notBefore,
            notAfter: mf.validity.notAfter,
            now: mB
          };
        }
        if (mA === null) {
          mb = mv[0] || mU.getIssuer(mf);
          if (mb === null && mf.isIssuer(mf)) {
            mT = true;
            mb = mf;
          }
          if (mb) {
            var mQ = mb;
            if (!Xq.util.isArray(mQ)) {
              mQ = [mQ];
            }
            for (var mt = false; !mt && mQ.length > 0;) {
              mb = mQ.shift();
              try {
                mt = mb.verify(mf);
              } catch { }
            }
            if (!mt) {
              mA = {
                message: "Certificate signature is invalid.",
                error: m0.certificateError.bad_certificate
              };
            }
          }
          if (mA === null && (!mb || mT) && !mU.hasCertificate(mf)) {
            mA = {
              message: "Certificate is not trusted.",
              error: m0.certificateError.unknown_ca
            };
          }
        }
        if (mA === null && mb && !mf.isIssuer(mb)) {
          mA = {
            message: "Certificate issuer is invalid.",
            error: m0.certificateError.bad_certificate
          };
        }
        if (mA === null) {
          var mi = {
            keyUsage: true,
            basicConstraints: true
          };
          for (var mO = 0; mA === null && mO < mf.extensions.length; ++mO) {
            var mu = mf.extensions[mO];
            if (mu.critical && !(mu.name in mi)) {
              mA = {
                message: "Certificate has an unsupported critical extension.",
                error: m0.certificateError.unsupported_certificate
              };
            }
          }
        }
        if (mA === null && (!ms || mv.length === 0 && (!mb || mT))) {
          var mN = mf.getExtension("basicConstraints");
          var mR = mf.getExtension("keyUsage");
          if (mR !== null && (!mR.keyCertSign || mN === null)) {
            mA = {
              message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
              error: m0.certificateError.bad_certificate
            };
          }
          if (mA === null && mN !== null && !mN.cA) {
            mA = {
              message: "Certificate basicConstraints indicates the certificate is not a CA.",
              error: m0.certificateError.bad_certificate
            };
          }
          if (mA === null && mR !== null && "pathLenConstraint" in mN) {
            var my = mG - 1;
            if (my > mN.pathLenConstraint) {
              mA = {
                message: "Certificate basicConstraints pathLenConstraint violated.",
                error: m0.certificateError.bad_certificate
              };
            }
          }
        }
        var mk = mA === null ? true : mA.error;
        var mj = mM.verify ? mM.verify(mk, mG, md) : mk;
        if (mj === true) {
          mA = null;
        } else {
          if (mk === true) {
            mA = {
              message: "The application rejected the certificate.",
              error: m0.certificateError.bad_certificate
            };
          }
          if (mj || mj === 0) {
            if (typeof mj == "object" && !Xq.util.isArray(mj)) {
              if (mj.message) {
                mA.message = mj.message;
              }
              if (mj.error) {
                mA.error = mj.error;
              }
            } else if (typeof mj == "string") {
              mA.error = mj;
            }
          }
          throw mA;
        }
        ms = false;
        ++mG;
      } while (mv.length > 0);
      return true;
    };
  });
  var l = K((XP, XF) => {
    'use strict';

    var Xq = M();
    b();
    Q();
    f();
    p();
    D();
    j();
    n();
    h();
    B();
    o();
    var XS = Xq.asn1;
    var m0 = Xq.pki;
    var m1 = XF.exports = Xq.pkcs12 = Xq.pkcs12 || {};
    var m2 = {
      name: "ContentInfo",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "ContentInfo.contentType",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "contentType"
      }, {
        name: "ContentInfo.content",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        constructed: true,
        captureAsn1: "content"
      }]
    };
    var m3 = {
      name: "PFX",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PFX.version",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.INTEGER,
        constructed: false,
        capture: "version"
      }, m2, {
        name: "PFX.macData",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SEQUENCE,
        constructed: true,
        optional: true,
        captureAsn1: "mac",
        value: [{
          name: "PFX.macData.mac",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "PFX.macData.mac.digestAlgorithm",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.SEQUENCE,
            constructed: true,
            value: [{
              name: "PFX.macData.mac.digestAlgorithm.algorithm",
              tagClass: XS.Class.UNIVERSAL,
              type: XS.Type.OID,
              constructed: false,
              capture: "macAlgorithm"
            }, {
              name: "PFX.macData.mac.digestAlgorithm.parameters",
              tagClass: XS.Class.UNIVERSAL,
              captureAsn1: "macAlgorithmParameters"
            }]
          }, {
            name: "PFX.macData.mac.digest",
            tagClass: XS.Class.UNIVERSAL,
            type: XS.Type.OCTETSTRING,
            constructed: false,
            capture: "macDigest"
          }]
        }, {
          name: "PFX.macData.macSalt",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.OCTETSTRING,
          constructed: false,
          capture: "macSalt"
        }, {
          name: "PFX.macData.iterations",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Type.INTEGER,
          constructed: false,
          optional: true,
          capture: "macIterations"
        }]
      }]
    };
    var m4 = {
      name: "SafeBag",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "SafeBag.bagId",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "bagId"
      }, {
        name: "SafeBag.bagValue",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        constructed: true,
        captureAsn1: "bagValue"
      }, {
        name: "SafeBag.bagAttributes",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SET,
        constructed: true,
        optional: true,
        capture: "bagAttributes"
      }]
    };
    var m5 = {
      name: "Attribute",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "Attribute.attrId",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "oid"
      }, {
        name: "Attribute.attrValues",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.SET,
        constructed: true,
        capture: "values"
      }]
    };
    var m6 = {
      name: "CertBag",
      tagClass: XS.Class.UNIVERSAL,
      type: XS.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "CertBag.certId",
        tagClass: XS.Class.UNIVERSAL,
        type: XS.Type.OID,
        constructed: false,
        capture: "certId"
      }, {
        name: "CertBag.certValue",
        tagClass: XS.Class.CONTEXT_SPECIFIC,
        constructed: true,
        value: [{
          name: "CertBag.certValue[0]",
          tagClass: XS.Class.UNIVERSAL,
          type: XS.Class.OCTETSTRING,
          constructed: false,
          capture: "cert"
        }]
      }]
    };
    function m7(mV, mE, mW, mC) {
      var mH = [];
      for (var me = 0; me < mV.length; me++) {
        for (var mK = 0; mK < mV[me].safeBags.length; mK++) {
          var mU = mV[me].safeBags[mK];
          if (mC === undefined || mU.type === mC) {
            if (mE === null) {
              mH.push(mU);
              continue;
            }
            if (mU.attributes[mE] !== undefined && mU.attributes[mE].indexOf(mW) >= 0) {
              mH.push(mU);
            }
          }
        }
      }
      return mH;
    }
    m1.pkcs12FromAsn1 = function (mV, mE, mW) {
      if (typeof mE == "string") {
        mW = mE;
        mE = true;
      } else if (mE === undefined) {
        mE = true;
      }
      var mC = {};
      var mH = [];
      if (!XS.validate(mV, m3, mC, mH)) {
        var me = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");
        me.errors = me;
        throw me;
      }
      var mK = {
        version: mC.version.charCodeAt(0),
        safeContents: [],
        getBags: function (mb) {
          var mT = {};
          var mQ;
          if ("localKeyId" in mb) {
            mQ = mb.localKeyId;
          } else if ("localKeyIdHex" in mb) {
            mQ = Xq.util.hexToBytes(mb.localKeyIdHex);
          }
          if (mQ === undefined && !("friendlyName" in mb) && "bagType" in mb) {
            mT[mb.bagType] = m7(mK.safeContents, null, null, mb.bagType);
          }
          if (mQ !== undefined) {
            mT.localKeyId = m7(mK.safeContents, "localKeyId", mQ, mb.bagType);
          }
          if ("friendlyName" in mb) {
            mT.friendlyName = m7(mK.safeContents, "friendlyName", mb.friendlyName, mb.bagType);
          }
          return mT;
        },
        getBagsByFriendlyName: function (mb, mT) {
          return m7(mK.safeContents, "friendlyName", mb, mT);
        },
        getBagsByLocalKeyId: function (mb, mT) {
          return m7(mK.safeContents, "localKeyId", mb, mT);
        }
      };
      if (mC.version.charCodeAt(0) !== 3) {
        var me = new Error("PKCS#12 PFX of version other than 3 not supported.");
        me.version = mC.version.charCodeAt(0);
        throw me;
      }
      if (XS.derToOid(mC.contentType) !== m0.oids.data) {
        var me = new Error("Only PKCS#12 PFX in password integrity mode supported.");
        me.oid = XS.derToOid(mC.contentType);
        throw me;
      }
      var mU = mC.content.value[0];
      if (mU.tagClass !== XS.Class.UNIVERSAL || mU.type !== XS.Type.OCTETSTRING) {
        throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
      }
      mU = m8(mU);
      if (mC.mac) {
        var mv = null;
        var mM = 0;
        var md = XS.derToOid(mC.macAlgorithm);
        switch (md) {
          case m0.oids.sha1:
            mv = Xq.md.sha1.create();
            mM = 20;
            break;
          case m0.oids.sha256:
            mv = Xq.md.sha256.create();
            mM = 32;
            break;
          case m0.oids.sha384:
            mv = Xq.md.sha384.create();
            mM = 48;
            break;
          case m0.oids.sha512:
            mv = Xq.md.sha512.create();
            mM = 64;
            break;
          case m0.oids.md5:
            mv = Xq.md.md5.create();
            mM = 16;
            break;
        }
        if (mv === null) {
          throw new Error("PKCS#12 uses unsupported MAC algorithm: " + md);
        }
        var mB = new Xq.util.ByteBuffer(mC.macSalt);
        var ms = "macIterations" in mC ? parseInt(Xq.util.bytesToHex(mC.macIterations), 16) : 1;
        var mA = m1.generateKey(mW, mB, 3, ms, mM, mv);
        var mG = Xq.hmac.create();
        mG.start(mv, mA);
        mG.update(mU.value);
        var mf = mG.getMac();
        if (mf.getBytes() !== mC.macDigest) {
          throw new Error("PKCS#12 MAC could not be verified. Invalid password?");
        }
      }
      m9(mK, mU.value, mE, mW);
      return mK;
    };
    function m8(mV) {
      if (mV.composed || mV.constructed) {
        var mE = Xq.util.createBuffer();
        for (var mW = 0; mW < mV.value.length; ++mW) {
          mE.putBytes(mV.value[mW].value);
        }
        mV.composed = mV.constructed = false;
        mV.value = mE.getBytes();
      }
      return mV;
    }
    function m9(mV, mE, mW, mC) {
      mE = XS.fromDer(mE, mW);
      if (mE.tagClass !== XS.Class.UNIVERSAL || mE.type !== XS.Type.SEQUENCE || mE.constructed !== true) {
        throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
      }
      for (var mH = 0; mH < mE.value.length; mH++) {
        var me = mE.value[mH];
        var mK = {};
        var mU = [];
        if (!XS.validate(me, m2, mK, mU)) {
          var mv = new Error("Cannot read ContentInfo.");
          mv.errors = mU;
          throw mv;
        }
        var mM = {
          encrypted: false
        };
        var md = null;
        var mB = mK.content.value[0];
        switch (XS.derToOid(mK.contentType)) {
          case m0.oids.data:
            if (mB.tagClass !== XS.Class.UNIVERSAL || mB.type !== XS.Type.OCTETSTRING) {
              throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
            }
            md = m8(mB).value;
            break;
          case m0.oids.encryptedData:
            md = mX(mB, mC);
            mM.encrypted = true;
            break;
          default:
            var mv = new Error("Unsupported PKCS#12 contentType.");
            mv.contentType = XS.derToOid(mK.contentType);
            throw mv;
        }
        mM.safeBags = mm(md, mW, mC);
        mV.safeContents.push(mM);
      }
    }
    function mX(mV, mE) {
      var mW = {};
      var mC = [];
      if (!XS.validate(mV, Xq.pkcs7.asn1.encryptedDataValidator, mW, mC)) {
        var mH = new Error("Cannot read EncryptedContentInfo.");
        mH.errors = mC;
        throw mH;
      }
      var me = XS.derToOid(mW.contentType);
      if (me !== m0.oids.data) {
        var mH = new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.");
        mH.oid = me;
        throw mH;
      }
      me = XS.derToOid(mW.encAlgorithm);
      var mK = m0.pbe.getCipher(me, mW.encParameter, mE);
      var mU = m8(mW.encryptedContentAsn1);
      var mv = Xq.util.createBuffer(mU.value);
      mK.update(mv);
      if (!mK.finish()) {
        throw new Error("Failed to decrypt PKCS#12 SafeContents.");
      }
      return mK.output.getBytes();
    }
    function mm(mV, mE, mW) {
      if (!mE && mV.length === 0) {
        return [];
      }
      mV = XS.fromDer(mV, mE);
      if (mV.tagClass !== XS.Class.UNIVERSAL || mV.type !== XS.Type.SEQUENCE || mV.constructed !== true) {
        throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");
      }
      var mC = [];
      for (var mH = 0; mH < mV.value.length; mH++) {
        var me = mV.value[mH];
        var mK = {};
        var mU = [];
        if (!XS.validate(me, m4, mK, mU)) {
          var mv = new Error("Cannot read SafeBag.");
          mv.errors = mU;
          throw mv;
        }
        var mM = {
          type: XS.derToOid(mK.bagId),
          attributes: mI(mK.bagAttributes)
        };
        mC.push(mM);
        var md;
        var mB;
        var ms = mK.bagValue.value[0];
        switch (mM.type) {
          case m0.oids.pkcs8ShroudedKeyBag:
            ms = m0.decryptPrivateKeyInfo(ms, mW);
            if (ms === null) {
              throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");
            }
          case m0.oids.keyBag:
            try {
              mM.key = m0.privateKeyFromAsn1(ms);
            } catch {
              mM.key = null;
              mM.asn1 = ms;
            }
            continue;
          case m0.oids.certBag:
            md = m6;
            mB = function () {
              if (XS.derToOid(mK.certId) !== m0.oids.x509Certificate) {
                var mA = new Error("Unsupported certificate type, only X.509 supported.");
                mA.oid = XS.derToOid(mK.certId);
                throw mA;
              }
              var mG = XS.fromDer(mK.cert, mE);
              try {
                mM.cert = m0.certificateFromAsn1(mG, true);
              } catch {
                mM.cert = null;
                mM.asn1 = mG;
              }
            };
            break;
          default:
            var mv = new Error("Unsupported PKCS#12 SafeBag type.");
            mv.oid = mM.type;
            throw mv;
        }
        if (md !== undefined && !XS.validate(ms, md, mK, mU)) {
          var mv = new Error("Cannot read PKCS#12 " + md.name);
          mv.errors = mU;
          throw mv;
        }
        mB();
      }
      return mC;
    }
    function mI(mV) {
      var mE = {};
      if (mV !== undefined) {
        for (var mW = 0; mW < mV.length; ++mW) {
          var mC = {};
          var mH = [];
          if (!XS.validate(mV[mW], m5, mC, mH)) {
            var me = new Error("Cannot read PKCS#12 BagAttribute.");
            me.errors = mH;
            throw me;
          }
          var mK = XS.derToOid(mC.oid);
          if (m0.oids[mK] !== undefined) {
            mE[m0.oids[mK]] = [];
            for (var mU = 0; mU < mC.values.length; ++mU) {
              mE[m0.oids[mK]].push(mC.values[mU].value);
            }
          }
        }
      }
      return mE;
    }
    m1.toPkcs12Asn1 = function (mV, mE, mW, mC) {
      mC = mC || {};
      mC.saltSize = mC.saltSize || 8;
      mC.count = mC.count || 2048;
      mC.algorithm = mC.algorithm || mC.encAlgorithm || "aes128";
      if (!("useMac" in mC)) {
        mC.useMac = true;
      }
      if (!("localKeyId" in mC)) {
        mC.localKeyId = null;
      }
      if (!("generateLocalKeyId" in mC)) {
        mC.generateLocalKeyId = true;
      }
      var mH = mC.localKeyId;
      var me;
      if (mH !== null) {
        mH = Xq.util.hexToBytes(mH);
      } else if (mC.generateLocalKeyId) {
        if (mE) {
          var mK = Xq.util.isArray(mE) ? mE[0] : mE;
          if (typeof mK == "string") {
            mK = m0.certificateFromPem(mK);
          }
          var mU = Xq.md.sha1.create();
          mU.update(XS.toDer(m0.certificateToAsn1(mK)).getBytes());
          mH = mU.digest().getBytes();
        } else {
          mH = Xq.random.getBytes(20);
        }
      }
      var mv = [];
      if (mH !== null) {
        mv.push(XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.localKeyId).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mH)])]));
      }
      if ("friendlyName" in mC) {
        mv.push(XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.friendlyName).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.BMPSTRING, false, mC.friendlyName)])]));
      }
      if (mv.length > 0) {
        me = XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, mv);
      }
      var mM = [];
      var md = [];
      if (mE !== null) {
        if (Xq.util.isArray(mE)) {
          md = mE;
        } else {
          md = [mE];
        }
      }
      var mB = [];
      for (var ms = 0; ms < md.length; ++ms) {
        mE = md[ms];
        if (typeof mE == "string") {
          mE = m0.certificateFromPem(mE);
        }
        var mA = ms === 0 ? me : undefined;
        var mG = m0.certificateToAsn1(mE);
        var mf = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.certBag).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.x509Certificate).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, XS.toDer(mG).getBytes())])])]), mA]);
        mB.push(mf);
      }
      if (mB.length > 0) {
        var mb = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, mB);
        var mT = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.data).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, XS.toDer(mb).getBytes())])]);
        mM.push(mT);
      }
      var mQ = null;
      if (mV !== null) {
        var mt = m0.wrapRsaPrivateKey(m0.privateKeyToAsn1(mV));
        if (mW === null) {
          mQ = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.keyBag).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [mt]), me]);
        } else {
          mQ = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.pkcs8ShroudedKeyBag).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [m0.encryptPrivateKeyInfo(mt, mW, mC)]), me]);
        }
        var mi = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [mQ]);
        var mO = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.data).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, XS.toDer(mi).getBytes())])]);
        mM.push(mO);
      }
      var mu = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, mM);
      var mN;
      if (mC.useMac) {
        var mU = Xq.md.sha1.create();
        var mR = new Xq.util.ByteBuffer(Xq.random.getBytes(mC.saltSize));
        var my = mC.count;
        var mV = m1.generateKey(mW, mR, 3, my, 20);
        var mk = Xq.hmac.create();
        mk.start(mU, mV);
        mk.update(XS.toDer(mu).getBytes());
        var mj = mk.getMac();
        mN = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.sha1).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")]), XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mj.getBytes())]), XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mR.getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(my).getBytes())]);
      }
      return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(3).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(m0.oids.data).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, XS.toDer(mu).getBytes())])]), mN]);
    };
    m1.generateKey = Xq.pbe.generatePkcs12Key;
  });
  var c = K((XP, XF) => {
    'use strict';

    var Xq = M();
    b();
    f();
    D();
    O();
    R();
    l();
    x();
    n();
    B();
    o();
    var XS = Xq.asn1;
    var m0 = XF.exports = Xq.pki = Xq.pki || {};
    m0.pemToDer = function (m1) {
      var m2 = Xq.pem.decode(m1)[0];
      if (m2.procType && m2.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert PEM to DER; PEM is encrypted.");
      }
      return Xq.util.createBuffer(m2.body);
    };
    m0.privateKeyFromPem = function (m1) {
      var m2 = Xq.pem.decode(m1)[0];
      if (m2.type !== "PRIVATE KEY" && m2.type !== "RSA PRIVATE KEY") {
        var m3 = new Error("Could not convert private key from PEM; PEM header type is not \"PRIVATE KEY\" or \"RSA PRIVATE KEY\".");
        m3.headerType = m2.type;
        throw m3;
      }
      if (m2.procType && m2.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert private key from PEM; PEM is encrypted.");
      }
      var m4 = XS.fromDer(m2.body);
      return m0.privateKeyFromAsn1(m4);
    };
    m0.privateKeyToPem = function (m1, m2) {
      var m3 = {
        type: "RSA PRIVATE KEY",
        body: XS.toDer(m0.privateKeyToAsn1(m1)).getBytes()
      };
      return Xq.pem.encode(m3, {
        maxline: m2
      });
    };
    m0.privateKeyInfoToPem = function (m1, m2) {
      var m3 = {
        type: "PRIVATE KEY",
        body: XS.toDer(m1).getBytes()
      };
      return Xq.pem.encode(m3, {
        maxline: m2
      });
    };
  });
  var a = K((XP, XF) => {
    'use strict';

    var Xq = M();
    b();
    Q();
    i();
    O();
    c();
    j();
    h();
    B();
    function XS(mh, mg, mz, mL) {
      var mn = Xq.util.createBuffer();
      var mD = mh.length >> 1;
      var mp = mD + (mh.length & 1);
      var mZ = mh.substr(0, mp);
      var mw = mh.substr(mD, mp);
      var mY = Xq.util.createBuffer();
      var mx = Xq.hmac.create();
      mz = mg + mz;
      var mo = Math.ceil(mL / 16);
      var ml = Math.ceil(mL / 20);
      mx.start("MD5", mZ);
      var mP = Xq.util.createBuffer();
      mY.putBytes(mz);
      for (var mF = 0; mF < mo; ++mF) {
        mx.start(null, null);
        mx.update(mY.getBytes());
        mY.putBuffer(mx.digest());
        mx.start(null, null);
        mx.update(mY.bytes() + mz);
        mP.putBuffer(mx.digest());
      }
      mx.start("SHA1", mw);
      var mq = Xq.util.createBuffer();
      mY.clear();
      mY.putBytes(mz);
      for (var mF = 0; mF < ml; ++mF) {
        mx.start(null, null);
        mx.update(mY.getBytes());
        mY.putBuffer(mx.digest());
        mx.start(null, null);
        mx.update(mY.bytes() + mz);
        mq.putBuffer(mx.digest());
      }
      mn.putBytes(Xq.util.xorBytes(mP.getBytes(), mq.getBytes(), mL));
      return mn;
    }
    function m0(mh, mg, mz) {
      var mL = Xq.hmac.create();
      mL.start("SHA1", mh);
      var mn = Xq.util.createBuffer();
      mn.putInt32(mg[0]);
      mn.putInt32(mg[1]);
      mn.putByte(mz.type);
      mn.putByte(mz.version.major);
      mn.putByte(mz.version.minor);
      mn.putInt16(mz.length);
      mn.putBytes(mz.fragment.bytes());
      mL.update(mn.getBytes());
      return mL.digest().getBytes();
    }
    function m1(mh, mg, mz) {
      var mL = false;
      try {
        var mn = mh.deflate(mg.fragment.getBytes());
        mg.fragment = Xq.util.createBuffer(mn);
        mg.length = mn.length;
        mL = true;
      } catch { }
      return mL;
    }
    function m2(mh, mg, mz) {
      var mL = false;
      try {
        var mn = mh.inflate(mg.fragment.getBytes());
        mg.fragment = Xq.util.createBuffer(mn);
        mg.length = mn.length;
        mL = true;
      } catch { }
      return mL;
    }
    function m3(mh, mg) {
      var mz = 0;
      switch (mg) {
        case 1:
          mz = mh.getByte();
          break;
        case 2:
          mz = mh.getInt16();
          break;
        case 3:
          mz = mh.getInt24();
          break;
        case 4:
          mz = mh.getInt32();
          break;
      }
      return Xq.util.createBuffer(mh.getBytes(mz));
    }
    function m4(mh, mg, mz) {
      mh.putInt(mz.length(), mg << 3);
      mh.putBuffer(mz);
    }
    var m5 = {
      Versions: {
        TLS_1_0: {
          major: 3,
          minor: 1
        },
        TLS_1_1: {
          major: 3,
          minor: 2
        },
        TLS_1_2: {
          major: 3,
          minor: 3
        }
      }
    };
    m5.SupportedVersions = [m5.Versions.TLS_1_1, m5.Versions.TLS_1_0];
    m5.Version = m5.SupportedVersions[0];
    m5.MaxFragment = 15360;
    m5.ConnectionEnd = {
      server: 0,
      client: 1
    };
    m5.PRFAlgorithm = {
      tls_prf_sha256: 0
    };
    m5.BulkCipherAlgorithm = {
      none: null,
      rc4: 0,
      des3: 1,
      aes: 2
    };
    m5.CipherType = {
      stream: 0,
      block: 1,
      aead: 2
    };
    m5.MACAlgorithm = {
      none: null,
      hmac_md5: 0,
      hmac_sha1: 1,
      hmac_sha256: 2,
      hmac_sha384: 3,
      hmac_sha512: 4
    };
    m5.CompressionMethod = {
      none: 0,
      deflate: 1
    };
    m5.ContentType = {
      change_cipher_spec: 20,
      alert: 21,
      handshake: 22,
      application_data: 23,
      heartbeat: 24
    };
    m5.HandshakeType = {
      hello_request: 0,
      client_hello: 1,
      server_hello: 2,
      certificate: 11,
      server_key_exchange: 12,
      certificate_request: 13,
      server_hello_done: 14,
      certificate_verify: 15,
      client_key_exchange: 16,
      finished: 20
    };
    m5.Alert = {};
    m5.Alert.Level = {
      warning: 1,
      fatal: 2
    };
    m5.Alert.Description = {
      close_notify: 0,
      unexpected_message: 10,
      bad_record_mac: 20,
      decryption_failed: 21,
      record_overflow: 22,
      decompression_failure: 30,
      handshake_failure: 40,
      bad_certificate: 42,
      unsupported_certificate: 43,
      certificate_revoked: 44,
      certificate_expired: 45,
      certificate_unknown: 46,
      illegal_parameter: 47,
      unknown_ca: 48,
      access_denied: 49,
      decode_error: 50,
      decrypt_error: 51,
      export_restriction: 60,
      protocol_version: 70,
      insufficient_security: 71,
      internal_error: 80,
      user_canceled: 90,
      no_renegotiation: 100
    };
    m5.HeartbeatMessageType = {
      heartbeat_request: 1,
      heartbeat_response: 2
    };
    m5.CipherSuites = {};
    m5.getCipherSuite = function (mh) {
      var mg = null;
      for (var mz in m5.CipherSuites) {
        var mL = m5.CipherSuites[mz];
        if (mL.id[0] === mh.charCodeAt(0) && mL.id[1] === mh.charCodeAt(1)) {
          mg = mL;
          break;
        }
      }
      return mg;
    };
    m5.handleUnexpected = function (mh, mg) {
      var mz = !mh.open && mh.entity === m5.ConnectionEnd.client;
      if (!mz) {
        mh.error(mh, {
          message: "Unexpected message. Received TLS record out of order.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.unexpected_message
          }
        });
      }
    };
    m5.handleHelloRequest = function (mh, mg, mz) {
      if (!mh.handshaking && mh.handshakes > 0) {
        m5.queue(mh, m5.createAlert(mh, {
          level: m5.Alert.Level.warning,
          description: m5.Alert.Description.no_renegotiation
        }));
        m5.flush(mh);
      }
      mh.process();
    };
    m5.parseHelloMessage = function (mh, mg, mz) {
      var mL = null;
      var mn = mh.entity === m5.ConnectionEnd.client;
      if (mz < 38) {
        mh.error(mh, {
          message: mn ? "Invalid ServerHello message. Message too short." : "Invalid ClientHello message. Message too short.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      } else {
        var mD = mg.fragment;
        var mp = mD.length();
        mL = {
          version: {
            major: mD.getByte(),
            minor: mD.getByte()
          },
          random: Xq.util.createBuffer(mD.getBytes(32)),
          session_id: m3(mD, 1),
          extensions: []
        };
        if (mn) {
          mL.cipher_suite = mD.getBytes(2);
          mL.compression_method = mD.getByte();
        } else {
          mL.cipher_suites = m3(mD, 2);
          mL.compression_methods = m3(mD, 1);
        }
        mp = mz - (mp - mD.length());
        if (mp > 0) {
          for (var mZ = m3(mD, 2); mZ.length() > 0;) {
            mL.extensions.push({
              type: [mZ.getByte(), mZ.getByte()],
              data: m3(mZ, 2)
            });
          }
          if (!mn) {
            for (var mw = 0; mw < mL.extensions.length; ++mw) {
              var mY = mL.extensions[mw];
              if (mY.type[0] === 0 && mY.type[1] === 0) {
                for (var mx = m3(mY.data, 2); mx.length() > 0;) {
                  var mo = mx.getByte();
                  if (mo !== 0) {
                    break;
                  }
                  mh.session.extensions.server_name.serverNameList.push(m3(mx, 2).getBytes());
                }
              }
            }
          }
        }
        if (mh.session.version && (mL.version.major !== mh.session.version.major || mL.version.minor !== mh.session.version.minor)) {
          return mh.error(mh, {
            message: "TLS version change is disallowed during renegotiation.",
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.protocol_version
            }
          });
        }
        if (mn) {
          mh.session.cipherSuite = m5.getCipherSuite(mL.cipher_suite);
        } else {
          for (var ml = Xq.util.createBuffer(mL.cipher_suites.bytes()); ml.length() > 0 && (mh.session.cipherSuite = m5.getCipherSuite(ml.getBytes(2)), mh.session.cipherSuite === null););
        }
        if (mh.session.cipherSuite === null) {
          return mh.error(mh, {
            message: "No cipher suites in common.",
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.handshake_failure
            },
            cipherSuite: Xq.util.bytesToHex(mL.cipher_suite)
          });
        }
        if (mn) {
          mh.session.compressionMethod = mL.compression_method;
        } else {
          mh.session.compressionMethod = m5.CompressionMethod.none;
        }
      }
      return mL;
    };
    m5.createSecurityParameters = function (mh, mg) {
      var mz = mh.entity === m5.ConnectionEnd.client;
      var mL = mg.random.bytes();
      var mn = mz ? mh.session.sp.client_random : mL;
      var mD = mz ? mL : m5.createRandom().getBytes();
      mh.session.sp = {
        entity: mh.entity,
        prf_algorithm: m5.PRFAlgorithm.tls_prf_sha256,
        bulk_cipher_algorithm: null,
        cipher_type: null,
        enc_key_length: null,
        block_length: null,
        fixed_iv_length: null,
        record_iv_length: null,
        mac_algorithm: null,
        mac_length: null,
        mac_key_length: null,
        compression_algorithm: mh.session.compressionMethod,
        pre_master_secret: null,
        master_secret: null,
        client_random: mn,
        server_random: mD
      };
    };
    m5.handleServerHello = function (mh, mg, mz) {
      var mL = m5.parseHelloMessage(mh, mg, mz);
      if (!mh.fail) {
        if (mL.version.minor <= mh.version.minor) {
          mh.version.minor = mL.version.minor;
        } else {
          return mh.error(mh, {
            message: "Incompatible TLS version.",
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.protocol_version
            }
          });
        }
        mh.session.version = mh.version;
        var mn = mL.session_id.bytes();
        if (mn.length > 0 && mn === mh.session.id) {
          mh.expect = mm;
          mh.session.resuming = true;
          mh.session.sp.server_random = mL.random.bytes();
        } else {
          mh.expect = m7;
          mh.session.resuming = false;
          m5.createSecurityParameters(mh, mL);
        }
        mh.session.id = mn;
        mh.process();
      }
    };
    m5.handleClientHello = function (mh, mg, mz) {
      var mL = m5.parseHelloMessage(mh, mg, mz);
      if (!mh.fail) {
        var mn = mL.session_id.bytes();
        var mD = null;
        if (mh.sessionCache) {
          mD = mh.sessionCache.getSession(mn);
          if (mD === null) {
            mn = "";
          } else if (mD.version.major !== mL.version.major || mD.version.minor > mL.version.minor) {
            mD = null;
            mn = "";
          }
        }
        if (mn.length === 0) {
          mn = Xq.random.getBytes(32);
        }
        mh.session.id = mn;
        mh.session.clientHelloVersion = mL.version;
        mh.session.sp = {};
        if (mD) {
          mh.version = mh.session.version = mD.version;
          mh.session.sp = mD.sp;
        } else {
          for (var mp, mZ = 1; mZ < m5.SupportedVersions.length && (mp = m5.SupportedVersions[mZ], !(mp.minor <= mL.version.minor)); ++mZ);
          mh.version = {
            major: mp.major,
            minor: mp.minor
          };
          mh.session.version = mh.version;
        }
        if (mD !== null) {
          mh.expect = mK;
          mh.session.resuming = true;
          mh.session.sp.client_random = mL.random.bytes();
        } else {
          mh.expect = mh.verifyClient !== false ? mC : mH;
          mh.session.resuming = false;
          m5.createSecurityParameters(mh, mL);
        }
        mh.open = true;
        m5.queue(mh, m5.createRecord(mh, {
          type: m5.ContentType.handshake,
          data: m5.createServerHello(mh)
        }));
        if (mh.session.resuming) {
          m5.queue(mh, m5.createRecord(mh, {
            type: m5.ContentType.change_cipher_spec,
            data: m5.createChangeCipherSpec()
          }));
          mh.state.pending = m5.createConnectionState(mh);
          mh.state.current.write = mh.state.pending.write;
          m5.queue(mh, m5.createRecord(mh, {
            type: m5.ContentType.handshake,
            data: m5.createFinished(mh)
          }));
        } else {
          m5.queue(mh, m5.createRecord(mh, {
            type: m5.ContentType.handshake,
            data: m5.createCertificate(mh)
          }));
          if (!mh.fail) {
            m5.queue(mh, m5.createRecord(mh, {
              type: m5.ContentType.handshake,
              data: m5.createServerKeyExchange(mh)
            }));
            if (mh.verifyClient !== false) {
              m5.queue(mh, m5.createRecord(mh, {
                type: m5.ContentType.handshake,
                data: m5.createCertificateRequest(mh)
              }));
            }
            m5.queue(mh, m5.createRecord(mh, {
              type: m5.ContentType.handshake,
              data: m5.createServerHelloDone(mh)
            }));
          }
        }
        m5.flush(mh);
        mh.process();
      }
    };
    m5.handleCertificate = function (mh, mg, mz) {
      if (mz < 3) {
        return mh.error(mh, {
          message: "Invalid Certificate message. Message too short.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      }
      var mL = mg.fragment;
      var mn = {
        certificate_list: m3(mL, 3)
      };
      var mD;
      var mp;
      var mZ = [];
      try {
        while (mn.certificate_list.length() > 0) {
          mD = m3(mn.certificate_list, 3);
          mp = Xq.asn1.fromDer(mD);
          mD = Xq.pki.certificateFromAsn1(mp, true);
          mZ.push(mD);
        }
      } catch (mY) {
        return mh.error(mh, {
          message: "Could not parse certificate list.",
          cause: mY,
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.bad_certificate
          }
        });
      }
      var mw = mh.entity === m5.ConnectionEnd.client;
      if ((mw || mh.verifyClient === true) && mZ.length === 0) {
        mh.error(mh, {
          message: mw ? "No server certificate provided." : "No client certificate provided.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      } else if (mZ.length === 0) {
        mh.expect = mw ? m8 : mH;
      } else {
        if (mw) {
          mh.session.serverCertificate = mZ[0];
        } else {
          mh.session.clientCertificate = mZ[0];
        }
        if (m5.verifyCertificateChain(mh, mZ)) {
          mh.expect = mw ? m8 : mH;
        }
      }
      mh.process();
    };
    m5.handleServerKeyExchange = function (mh, mg, mz) {
      if (mz > 0) {
        return mh.error(mh, {
          message: "Invalid key parameters. Only RSA is supported.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.unsupported_certificate
          }
        });
      }
      mh.expect = m9;
      mh.process();
    };
    m5.handleClientKeyExchange = function (mh, mg, mz) {
      if (mz < 48) {
        return mh.error(mh, {
          message: "Invalid key parameters. Only RSA is supported.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.unsupported_certificate
          }
        });
      }
      var mL = mg.fragment;
      var mn = {
        enc_pre_master_secret: m3(mL, 2).getBytes()
      };
      var mD = null;
      if (mh.getPrivateKey) {
        try {
          mD = mh.getPrivateKey(mh, mh.session.serverCertificate);
          mD = Xq.pki.privateKeyFromPem(mD);
        } catch (mw) {
          mh.error(mh, {
            message: "Could not get private key.",
            cause: mw,
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.internal_error
            }
          });
        }
      }
      if (mD === null) {
        return mh.error(mh, {
          message: "No private key set.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.internal_error
          }
        });
      }
      try {
        var mp = mh.session.sp;
        mp.pre_master_secret = mD.decrypt(mn.enc_pre_master_secret);
        var mZ = mh.session.clientHelloVersion;
        if (mZ.major !== mp.pre_master_secret.charCodeAt(0) || mZ.minor !== mp.pre_master_secret.charCodeAt(1)) {
          throw new Error("TLS version rollback attack detected.");
        }
      } catch {
        mp.pre_master_secret = Xq.random.getBytes(48);
      }
      mh.expect = mK;
      if (mh.session.clientCertificate !== null) {
        mh.expect = me;
      }
      mh.process();
    };
    m5.handleCertificateRequest = function (mh, mg, mz) {
      if (mz < 3) {
        return mh.error(mh, {
          message: "Invalid CertificateRequest. Message too short.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      }
      var mL = mg.fragment;
      var mn = {
        certificate_types: m3(mL, 1),
        certificate_authorities: m3(mL, 2)
      };
      mh.session.certificateRequest = mn;
      mh.expect = mX;
      mh.process();
    };
    m5.handleCertificateVerify = function (mh, mg, mz) {
      if (mz < 2) {
        return mh.error(mh, {
          message: "Invalid CertificateVerify. Message too short.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      }
      var mL = mg.fragment;
      mL.read -= 4;
      var mn = mL.bytes();
      mL.read += 4;
      var mD = {
        signature: m3(mL, 2).getBytes()
      };
      var mp = Xq.util.createBuffer();
      mp.putBuffer(mh.session.md5.digest());
      mp.putBuffer(mh.session.sha1.digest());
      mp = mp.getBytes();
      try {
        var mZ = mh.session.clientCertificate;
        if (!mZ.publicKey.verify(mp, mD.signature, "NONE")) {
          throw new Error("CertificateVerify signature does not match.");
        }
        mh.session.md5.update(mn);
        mh.session.sha1.update(mn);
      } catch {
        return mh.error(mh, {
          message: "Bad signature in CertificateVerify.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.handshake_failure
          }
        });
      }
      mh.expect = mK;
      mh.process();
    };
    m5.handleServerHelloDone = function (mh, mg, mz) {
      if (mz > 0) {
        return mh.error(mh, {
          message: "Invalid ServerHelloDone message. Invalid length.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.record_overflow
          }
        });
      }
      if (mh.serverCertificate === null) {
        var mL = {
          message: "No server certificate provided. Not enough security.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.insufficient_security
          }
        };
        var mn = 0;
        var mD = mh.verify(mh, mL.alert.description, mn, []);
        if (mD !== true) {
          if (mD || mD === 0) {
            if (typeof mD == "object" && !Xq.util.isArray(mD)) {
              if (mD.message) {
                mL.message = mD.message;
              }
              if (mD.alert) {
                mL.alert.description = mD.alert;
              }
            } else if (typeof mD == "number") {
              mL.alert.description = mD;
            }
          }
          return mh.error(mh, mL);
        }
      }
      if (mh.session.certificateRequest !== null) {
        mg = m5.createRecord(mh, {
          type: m5.ContentType.handshake,
          data: m5.createCertificate(mh)
        });
        m5.queue(mh, mg);
      }
      mg = m5.createRecord(mh, {
        type: m5.ContentType.handshake,
        data: m5.createClientKeyExchange(mh)
      });
      m5.queue(mh, mg);
      mh.expect = mE;
      function mp(mZ, mw) {
        if (mZ.session.certificateRequest !== null && mZ.session.clientCertificate !== null) {
          m5.queue(mZ, m5.createRecord(mZ, {
            type: m5.ContentType.handshake,
            data: m5.createCertificateVerify(mZ, mw)
          }));
        }
        m5.queue(mZ, m5.createRecord(mZ, {
          type: m5.ContentType.change_cipher_spec,
          data: m5.createChangeCipherSpec()
        }));
        mZ.state.pending = m5.createConnectionState(mZ);
        mZ.state.current.write = mZ.state.pending.write;
        m5.queue(mZ, m5.createRecord(mZ, {
          type: m5.ContentType.handshake,
          data: m5.createFinished(mZ)
        }));
        mZ.expect = mm;
        m5.flush(mZ);
        mZ.process();
      }
      if (mh.session.certificateRequest === null || mh.session.clientCertificate === null) {
        return mp(mh, null);
      }
      m5.getClientSignature(mh, mp);
    };
    m5.handleChangeCipherSpec = function (mh, mg) {
      if (mg.fragment.getByte() !== 1) {
        return mh.error(mh, {
          message: "Invalid ChangeCipherSpec message received.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.illegal_parameter
          }
        });
      }
      var mz = mh.entity === m5.ConnectionEnd.client;
      if (mh.session.resuming && mz || !mh.session.resuming && !mz) {
        mh.state.pending = m5.createConnectionState(mh);
      }
      mh.state.current.read = mh.state.pending.read;
      if (!mh.session.resuming && mz || mh.session.resuming && !mz) {
        mh.state.pending = null;
      }
      mh.expect = mz ? mI : mU;
      mh.process();
    };
    m5.handleFinished = function (mh, mg, mz) {
      var mL = mg.fragment;
      mL.read -= 4;
      var mn = mL.bytes();
      mL.read += 4;
      var mD = mg.fragment.getBytes();
      mL = Xq.util.createBuffer();
      mL.putBuffer(mh.session.md5.digest());
      mL.putBuffer(mh.session.sha1.digest());
      var mp = mh.entity === m5.ConnectionEnd.client;
      var mZ = mp ? "server finished" : "client finished";
      var mw = mh.session.sp;
      var mY = 12;
      var mx = XS;
      mL = mx(mw.master_secret, mZ, mL.getBytes(), mY);
      if (mL.getBytes() !== mD) {
        return mh.error(mh, {
          message: "Invalid verify_data in Finished message.",
          send: true,
          alert: {
            level: m5.Alert.Level.fatal,
            description: m5.Alert.Description.decrypt_error
          }
        });
      }
      mh.session.md5.update(mn);
      mh.session.sha1.update(mn);
      if (mh.session.resuming && mp || !mh.session.resuming && !mp) {
        m5.queue(mh, m5.createRecord(mh, {
          type: m5.ContentType.change_cipher_spec,
          data: m5.createChangeCipherSpec()
        }));
        mh.state.current.write = mh.state.pending.write;
        mh.state.pending = null;
        m5.queue(mh, m5.createRecord(mh, {
          type: m5.ContentType.handshake,
          data: m5.createFinished(mh)
        }));
      }
      mh.expect = mp ? mV : mv;
      mh.handshaking = false;
      ++mh.handshakes;
      mh.peerCertificate = mp ? mh.session.serverCertificate : mh.session.clientCertificate;
      m5.flush(mh);
      mh.isConnected = true;
      mh.connected(mh);
      mh.process();
    };
    m5.handleAlert = function (mh, mg) {
      var mz = mg.fragment;
      var mL = {
        level: mz.getByte(),
        description: mz.getByte()
      };
      var mn;
      switch (mL.description) {
        case m5.Alert.Description.close_notify:
          mn = "Connection closed.";
          break;
        case m5.Alert.Description.unexpected_message:
          mn = "Unexpected message.";
          break;
        case m5.Alert.Description.bad_record_mac:
          mn = "Bad record MAC.";
          break;
        case m5.Alert.Description.decryption_failed:
          mn = "Decryption failed.";
          break;
        case m5.Alert.Description.record_overflow:
          mn = "Record overflow.";
          break;
        case m5.Alert.Description.decompression_failure:
          mn = "Decompression failed.";
          break;
        case m5.Alert.Description.handshake_failure:
          mn = "Handshake failure.";
          break;
        case m5.Alert.Description.bad_certificate:
          mn = "Bad certificate.";
          break;
        case m5.Alert.Description.unsupported_certificate:
          mn = "Unsupported certificate.";
          break;
        case m5.Alert.Description.certificate_revoked:
          mn = "Certificate revoked.";
          break;
        case m5.Alert.Description.certificate_expired:
          mn = "Certificate expired.";
          break;
        case m5.Alert.Description.certificate_unknown:
          mn = "Certificate unknown.";
          break;
        case m5.Alert.Description.illegal_parameter:
          mn = "Illegal parameter.";
          break;
        case m5.Alert.Description.unknown_ca:
          mn = "Unknown certificate authority.";
          break;
        case m5.Alert.Description.access_denied:
          mn = "Access denied.";
          break;
        case m5.Alert.Description.decode_error:
          mn = "Decode error.";
          break;
        case m5.Alert.Description.decrypt_error:
          mn = "Decrypt error.";
          break;
        case m5.Alert.Description.export_restriction:
          mn = "Export restriction.";
          break;
        case m5.Alert.Description.protocol_version:
          mn = "Unsupported protocol version.";
          break;
        case m5.Alert.Description.insufficient_security:
          mn = "Insufficient security.";
          break;
        case m5.Alert.Description.internal_error:
          mn = "Internal error.";
          break;
        case m5.Alert.Description.user_canceled:
          mn = "User canceled.";
          break;
        case m5.Alert.Description.no_renegotiation:
          mn = "Renegotiation not supported.";
          break;
        default:
          mn = "Unknown error.";
          break;
      }
      if (mL.description === m5.Alert.Description.close_notify) {
        return mh.close();
      }
      mh.error(mh, {
        message: mn,
        send: false,
        origin: mh.entity === m5.ConnectionEnd.client ? "server" : "client",
        alert: mL
      });
      mh.process();
    };
    m5.handleHandshake = function (mh, mg) {
      var mz = mg.fragment;
      var mL = mz.getByte();
      var mn = mz.getInt24();
      if (mn > mz.length()) {
        mh.fragmented = mg;
        mg.fragment = Xq.util.createBuffer();
        mz.read -= 4;
        return mh.process();
      }
      mh.fragmented = null;
      mz.read -= 4;
      var mD = mz.bytes(mn + 4);
      mz.read += 4;
      if (mL in mN[mh.entity][mh.expect]) {
        if (mh.entity === m5.ConnectionEnd.server && !mh.open && !mh.fail) {
          mh.handshaking = true;
          mh.session = {
            version: null,
            extensions: {
              server_name: {
                serverNameList: []
              }
            },
            cipherSuite: null,
            compressionMethod: null,
            serverCertificate: null,
            clientCertificate: null,
            md5: Xq.md.md5.create(),
            sha1: Xq.md.sha1.create()
          };
        }
        if (mL !== m5.HandshakeType.hello_request && mL !== m5.HandshakeType.certificate_verify && mL !== m5.HandshakeType.finished) {
          mh.session.md5.update(mD);
          mh.session.sha1.update(mD);
        }
        mN[mh.entity][mh.expect][mL](mh, mg, mn);
      } else {
        m5.handleUnexpected(mh, mg);
      }
    };
    m5.handleApplicationData = function (mh, mg) {
      mh.data.putBuffer(mg.fragment);
      mh.dataReady(mh);
      mh.process();
    };
    m5.handleHeartbeat = function (mh, mg) {
      var mz = mg.fragment;
      var mL = mz.getByte();
      var mn = mz.getInt16();
      var mD = mz.getBytes(mn);
      if (mL === m5.HeartbeatMessageType.heartbeat_request) {
        if (mh.handshaking || mn > mD.length) {
          return mh.process();
        }
        m5.queue(mh, m5.createRecord(mh, {
          type: m5.ContentType.heartbeat,
          data: m5.createHeartbeat(m5.HeartbeatMessageType.heartbeat_response, mD)
        }));
        m5.flush(mh);
      } else if (mL === m5.HeartbeatMessageType.heartbeat_response) {
        if (mD !== mh.expectedHeartbeatPayload) {
          return mh.process();
        }
        if (mh.heartbeatReceived) {
          mh.heartbeatReceived(mh, Xq.util.createBuffer(mD));
        }
      }
      mh.process();
    };
    var m6 = 0;
    var m7 = 1;
    var m8 = 2;
    var m9 = 3;
    var mX = 4;
    var mm = 5;
    var mI = 6;
    var mV = 7;
    var mE = 8;
    var mW = 0;
    var mC = 1;
    var mH = 2;
    var me = 3;
    var mK = 4;
    var mU = 5;
    var mv = 6;
    var mM = m5.handleUnexpected;
    var md = m5.handleChangeCipherSpec;
    var mB = m5.handleAlert;
    var ms = m5.handleHandshake;
    var mA = m5.handleApplicationData;
    var mG = m5.handleHeartbeat;
    var mf = [];
    mf[m5.ConnectionEnd.client] = [[mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [md, mB, mM, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mA, mG], [mM, mB, ms, mM, mG]];
    mf[m5.ConnectionEnd.server] = [[mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mM, mG], [md, mB, mM, mM, mG], [mM, mB, ms, mM, mG], [mM, mB, ms, mA, mG], [mM, mB, ms, mM, mG]];
    var mb = m5.handleHelloRequest;
    var mT = m5.handleServerHello;
    var mQ = m5.handleCertificate;
    var mt = m5.handleServerKeyExchange;
    var mi = m5.handleCertificateRequest;
    var mO = m5.handleServerHelloDone;
    var mu = m5.handleFinished;
    var mN = [];
    mN[m5.ConnectionEnd.client] = [[mM, mM, mT, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mQ, mt, mi, mO, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mt, mi, mO, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mi, mO, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mO, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mu], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mb, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM]];
    var mR = m5.handleClientHello;
    var my = m5.handleClientKeyExchange;
    var mk = m5.handleCertificateVerify;
    mN[m5.ConnectionEnd.server] = [[mM, mR, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mQ, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, my, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mk, mM, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mu], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM], [mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM, mM]];
    m5.generateKeys = function (mh, mg) {
      var mz = XS;
      var mL = mg.client_random + mg.server_random;
      if (!mh.session.resuming) {
        mg.master_secret = mz(mg.pre_master_secret, "master secret", mL, 48).bytes();
        mg.pre_master_secret = null;
      }
      mL = mg.server_random + mg.client_random;
      var mn = mg.mac_key_length * 2 + mg.enc_key_length * 2;
      var mD = mh.version.major === m5.Versions.TLS_1_0.major && mh.version.minor === m5.Versions.TLS_1_0.minor;
      if (mD) {
        mn += mg.fixed_iv_length * 2;
      }
      var mp = mz(mg.master_secret, "key expansion", mL, mn);
      var mZ = {
        client_write_MAC_key: mp.getBytes(mg.mac_key_length),
        server_write_MAC_key: mp.getBytes(mg.mac_key_length),
        client_write_key: mp.getBytes(mg.enc_key_length),
        server_write_key: mp.getBytes(mg.enc_key_length)
      };
      if (mD) {
        mZ.client_write_IV = mp.getBytes(mg.fixed_iv_length);
        mZ.server_write_IV = mp.getBytes(mg.fixed_iv_length);
      }
      return mZ;
    };
    m5.createConnectionState = function (mh) {
      var mg = mh.entity === m5.ConnectionEnd.client;
      function mz() {
        var mD = {
          sequenceNumber: [0, 0],
          macKey: null,
          macLength: 0,
          macFunction: null,
          cipherState: null,
          cipherFunction: function (mp) {
            return true;
          },
          compressionState: null,
          compressFunction: function (mp) {
            return true;
          },
          updateSequenceNumber: function () {
            if (mD.sequenceNumber[1] === 4294967295) {
              mD.sequenceNumber[1] = 0;
              ++mD.sequenceNumber[0];
            } else {
              ++mD.sequenceNumber[1];
            }
          }
        };
        return mD;
      }
      var mL = {
        read: mz(),
        write: mz()
      };
      mL.read.update = function (mD, mp) {
        if (mL.read.cipherFunction(mp, mL.read)) {
          if (!mL.read.compressFunction(mD, mp, mL.read)) {
            mD.error(mD, {
              message: "Could not decompress record.",
              send: true,
              alert: {
                level: m5.Alert.Level.fatal,
                description: m5.Alert.Description.decompression_failure
              }
            });
          }
        } else {
          mD.error(mD, {
            message: "Could not decrypt record or bad MAC.",
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.bad_record_mac
            }
          });
        }
        return !mD.fail;
      };
      mL.write.update = function (mD, mp) {
        if (mL.write.compressFunction(mD, mp, mL.write)) {
          if (!mL.write.cipherFunction(mp, mL.write)) {
            mD.error(mD, {
              message: "Could not encrypt record.",
              send: false,
              alert: {
                level: m5.Alert.Level.fatal,
                description: m5.Alert.Description.internal_error
              }
            });
          }
        } else {
          mD.error(mD, {
            message: "Could not compress record.",
            send: false,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.internal_error
            }
          });
        }
        return !mD.fail;
      };
      if (mh.session) {
        var mn = mh.session.sp;
        mh.session.cipherSuite.initSecurityParameters(mn);
        mn.keys = m5.generateKeys(mh, mn);
        mL.read.macKey = mg ? mn.keys.server_write_MAC_key : mn.keys.client_write_MAC_key;
        mL.write.macKey = mg ? mn.keys.client_write_MAC_key : mn.keys.server_write_MAC_key;
        mh.session.cipherSuite.initConnectionState(mL, mh, mn);
        switch (mn.compression_algorithm) {
          case m5.CompressionMethod.none:
            break;
          case m5.CompressionMethod.deflate:
            mL.read.compressFunction = m2;
            mL.write.compressFunction = m1;
            break;
          default:
            throw new Error("Unsupported compression algorithm.");
        }
      }
      return mL;
    };
    m5.createRandom = function () {
      var mh = new Date();
      var mg = +mh + mh.getTimezoneOffset() * 60000;
      var mz = Xq.util.createBuffer();
      mz.putInt32(mg);
      mz.putBytes(Xq.random.getBytes(28));
      return mz;
    };
    m5.createRecord = function (mh, mg) {
      if (!mg.data) {
        return null;
      }
      var mz = {
        type: mg.type,
        version: {
          major: mh.version.major,
          minor: mh.version.minor
        },
        length: mg.data.length(),
        fragment: mg.data
      };
      return mz;
    };
    m5.createAlert = function (mh, mg) {
      var mz = Xq.util.createBuffer();
      mz.putByte(mg.level);
      mz.putByte(mg.description);
      return m5.createRecord(mh, {
        type: m5.ContentType.alert,
        data: mz
      });
    };
    m5.createClientHello = function (mh) {
      mh.session.clientHelloVersion = {
        major: mh.version.major,
        minor: mh.version.minor
      };
      var mg = Xq.util.createBuffer();
      for (var mz = 0; mz < mh.cipherSuites.length; ++mz) {
        var mL = mh.cipherSuites[mz];
        mg.putByte(mL.id[0]);
        mg.putByte(mL.id[1]);
      }
      var mn = mg.length();
      var mD = Xq.util.createBuffer();
      mD.putByte(m5.CompressionMethod.none);
      var mp = mD.length();
      var mZ = Xq.util.createBuffer();
      if (mh.virtualHost) {
        var mw = Xq.util.createBuffer();
        mw.putByte(0);
        mw.putByte(0);
        var mY = Xq.util.createBuffer();
        mY.putByte(0);
        m4(mY, 2, Xq.util.createBuffer(mh.virtualHost));
        var mx = Xq.util.createBuffer();
        m4(mx, 2, mY);
        m4(mw, 2, mx);
        mZ.putBuffer(mw);
      }
      var mo = mZ.length();
      if (mo > 0) {
        mo += 2;
      }
      var ml = mh.session.id;
      var mP = ml.length + 1 + 2 + 4 + 28 + 2 + mn + 1 + mp + mo;
      var mF = Xq.util.createBuffer();
      mF.putByte(m5.HandshakeType.client_hello);
      mF.putInt24(mP);
      mF.putByte(mh.version.major);
      mF.putByte(mh.version.minor);
      mF.putBytes(mh.session.sp.client_random);
      m4(mF, 1, Xq.util.createBuffer(ml));
      m4(mF, 2, mg);
      m4(mF, 1, mD);
      if (mo > 0) {
        m4(mF, 2, mZ);
      }
      return mF;
    };
    m5.createServerHello = function (mh) {
      var mg = mh.session.id;
      var mz = mg.length + 1 + 2 + 4 + 28 + 2 + 1;
      var mL = Xq.util.createBuffer();
      mL.putByte(m5.HandshakeType.server_hello);
      mL.putInt24(mz);
      mL.putByte(mh.version.major);
      mL.putByte(mh.version.minor);
      mL.putBytes(mh.session.sp.server_random);
      m4(mL, 1, Xq.util.createBuffer(mg));
      mL.putByte(mh.session.cipherSuite.id[0]);
      mL.putByte(mh.session.cipherSuite.id[1]);
      mL.putByte(mh.session.compressionMethod);
      return mL;
    };
    m5.createCertificate = function (mh) {
      var mg = mh.entity === m5.ConnectionEnd.client;
      var mz = null;
      if (mh.getCertificate) {
        var mL;
        if (mg) {
          mL = mh.session.certificateRequest;
        } else {
          mL = mh.session.extensions.server_name.serverNameList;
        }
        mz = mh.getCertificate(mh, mL);
      }
      var mn = Xq.util.createBuffer();
      if (mz !== null) {
        try {
          if (!Xq.util.isArray(mz)) {
            mz = [mz];
          }
          var mD = null;
          for (var mp = 0; mp < mz.length; ++mp) {
            var mZ = Xq.pem.decode(mz[mp])[0];
            if (mZ.type !== "CERTIFICATE" && mZ.type !== "X509 CERTIFICATE" && mZ.type !== "TRUSTED CERTIFICATE") {
              var mw = new Error("Could not convert certificate from PEM; PEM header type is not \"CERTIFICATE\", \"X509 CERTIFICATE\", or \"TRUSTED CERTIFICATE\".");
              mw.headerType = mZ.type;
              throw mw;
            }
            if (mZ.procType && mZ.procType.type === "ENCRYPTED") {
              throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
            }
            var mY = Xq.util.createBuffer(mZ.body);
            if (mD === null) {
              mD = Xq.asn1.fromDer(mY.bytes(), false);
            }
            var mx = Xq.util.createBuffer();
            m4(mx, 3, mY);
            mn.putBuffer(mx);
          }
          mz = Xq.pki.certificateFromAsn1(mD);
          if (mg) {
            mh.session.clientCertificate = mz;
          } else {
            mh.session.serverCertificate = mz;
          }
        } catch (mP) {
          return mh.error(mh, {
            message: "Could not send certificate list.",
            cause: mP,
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.bad_certificate
            }
          });
        }
      }
      var mo = 3 + mn.length();
      var ml = Xq.util.createBuffer();
      ml.putByte(m5.HandshakeType.certificate);
      ml.putInt24(mo);
      m4(ml, 3, mn);
      return ml;
    };
    m5.createClientKeyExchange = function (mh) {
      var mg = Xq.util.createBuffer();
      mg.putByte(mh.session.clientHelloVersion.major);
      mg.putByte(mh.session.clientHelloVersion.minor);
      mg.putBytes(Xq.random.getBytes(46));
      var mz = mh.session.sp;
      mz.pre_master_secret = mg.getBytes();
      var mL = mh.session.serverCertificate.publicKey;
      mg = mL.encrypt(mz.pre_master_secret);
      var mn = mg.length + 2;
      var mD = Xq.util.createBuffer();
      mD.putByte(m5.HandshakeType.client_key_exchange);
      mD.putInt24(mn);
      mD.putInt16(mg.length);
      mD.putBytes(mg);
      return mD;
    };
    m5.createServerKeyExchange = function (mh) {
      var mg = 0;
      var mz = Xq.util.createBuffer();
      if (mg > 0) {
        mz.putByte(m5.HandshakeType.server_key_exchange);
        mz.putInt24(mg);
      }
      return mz;
    };
    m5.getClientSignature = function (mh, mg) {
      var mz = Xq.util.createBuffer();
      mz.putBuffer(mh.session.md5.digest());
      mz.putBuffer(mh.session.sha1.digest());
      mz = mz.getBytes();
      mh.getSignature = mh.getSignature || function (mL, mn, mD) {
        var mp = null;
        if (mL.getPrivateKey) {
          try {
            mp = mL.getPrivateKey(mL, mL.session.clientCertificate);
            mp = Xq.pki.privateKeyFromPem(mp);
          } catch (mZ) {
            mL.error(mL, {
              message: "Could not get private key.",
              cause: mZ,
              send: true,
              alert: {
                level: m5.Alert.Level.fatal,
                description: m5.Alert.Description.internal_error
              }
            });
          }
        }
        if (mp === null) {
          mL.error(mL, {
            message: "No private key set.",
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: m5.Alert.Description.internal_error
            }
          });
        } else {
          mn = mp.sign(mn, null);
        }
        mD(mL, mn);
      };
      mh.getSignature(mh, mz, mg);
    };
    m5.createCertificateVerify = function (mh, mg) {
      var mz = mg.length + 2;
      var mL = Xq.util.createBuffer();
      mL.putByte(m5.HandshakeType.certificate_verify);
      mL.putInt24(mz);
      mL.putInt16(mg.length);
      mL.putBytes(mg);
      return mL;
    };
    m5.createCertificateRequest = function (mh) {
      var mg = Xq.util.createBuffer();
      mg.putByte(1);
      var mz = Xq.util.createBuffer();
      for (var mL in mh.caStore.certs) {
        var mn = mh.caStore.certs[mL];
        var mD = Xq.pki.distinguishedNameToAsn1(mn.subject);
        var mp = Xq.asn1.toDer(mD);
        mz.putInt16(mp.length());
        mz.putBuffer(mp);
      }
      var mZ = 1 + mg.length() + 2 + mz.length();
      var mw = Xq.util.createBuffer();
      mw.putByte(m5.HandshakeType.certificate_request);
      mw.putInt24(mZ);
      m4(mw, 1, mg);
      m4(mw, 2, mz);
      return mw;
    };
    m5.createServerHelloDone = function (mh) {
      var mg = Xq.util.createBuffer();
      mg.putByte(m5.HandshakeType.server_hello_done);
      mg.putInt24(0);
      return mg;
    };
    m5.createChangeCipherSpec = function () {
      var mh = Xq.util.createBuffer();
      mh.putByte(1);
      return mh;
    };
    m5.createFinished = function (mh) {
      var mg = Xq.util.createBuffer();
      mg.putBuffer(mh.session.md5.digest());
      mg.putBuffer(mh.session.sha1.digest());
      var mz = mh.entity === m5.ConnectionEnd.client;
      var mL = mh.session.sp;
      var mn = 12;
      var mD = XS;
      var mp = mz ? "client finished" : "server finished";
      mg = mD(mL.master_secret, mp, mg.getBytes(), mn);
      var mZ = Xq.util.createBuffer();
      mZ.putByte(m5.HandshakeType.finished);
      mZ.putInt24(mg.length());
      mZ.putBuffer(mg);
      return mZ;
    };
    m5.createHeartbeat = function (mh, mg, mz) {
      if (typeof mz === "undefined") {
        mz = mg.length;
      }
      var mL = Xq.util.createBuffer();
      mL.putByte(mh);
      mL.putInt16(mz);
      mL.putBytes(mg);
      var mn = mL.length();
      var mD = Math.max(16, mn - mz - 3);
      mL.putBytes(Xq.random.getBytes(mD));
      return mL;
    };
    m5.queue = function (mh, mg) {
      if (mg && (mg.fragment.length() !== 0 || mg.type !== m5.ContentType.handshake && mg.type !== m5.ContentType.alert && mg.type !== m5.ContentType.change_cipher_spec)) {
        if (mg.type === m5.ContentType.handshake) {
          var mz = mg.fragment.bytes();
          mh.session.md5.update(mz);
          mh.session.sha1.update(mz);
          mz = null;
        }
        var mL;
        if (mg.fragment.length() <= m5.MaxFragment) {
          mL = [mg];
        } else {
          mL = [];
          for (var mn = mg.fragment.bytes(); mn.length > m5.MaxFragment;) {
            mL.push(m5.createRecord(mh, {
              type: mg.type,
              data: Xq.util.createBuffer(mn.slice(0, m5.MaxFragment))
            }));
            mn = mn.slice(m5.MaxFragment);
          }
          if (mn.length > 0) {
            mL.push(m5.createRecord(mh, {
              type: mg.type,
              data: Xq.util.createBuffer(mn)
            }));
          }
        }
        for (var mD = 0; mD < mL.length && !mh.fail; ++mD) {
          var mp = mL[mD];
          var mZ = mh.state.current.write;
          if (mZ.update(mh, mp)) {
            mh.records.push(mp);
          }
        }
      }
    };
    m5.flush = function (mh) {
      for (var mg = 0; mg < mh.records.length; ++mg) {
        var mz = mh.records[mg];
        mh.tlsData.putByte(mz.type);
        mh.tlsData.putByte(mz.version.major);
        mh.tlsData.putByte(mz.version.minor);
        mh.tlsData.putInt16(mz.fragment.length());
        mh.tlsData.putBuffer(mh.records[mg].fragment);
      }
      mh.records = [];
      return mh.tlsDataReady(mh);
    };
    function mj(mh) {
      switch (mh) {
        case true:
          return true;
        case Xq.pki.certificateError.bad_certificate:
          return m5.Alert.Description.bad_certificate;
        case Xq.pki.certificateError.unsupported_certificate:
          return m5.Alert.Description.unsupported_certificate;
        case Xq.pki.certificateError.certificate_revoked:
          return m5.Alert.Description.certificate_revoked;
        case Xq.pki.certificateError.certificate_expired:
          return m5.Alert.Description.certificate_expired;
        case Xq.pki.certificateError.certificate_unknown:
          return m5.Alert.Description.certificate_unknown;
        case Xq.pki.certificateError.unknown_ca:
          return m5.Alert.Description.unknown_ca;
        default:
          return m5.Alert.Description.bad_certificate;
      }
    }
    function mJ(mh) {
      switch (mh) {
        case true:
          return true;
        case m5.Alert.Description.bad_certificate:
          return Xq.pki.certificateError.bad_certificate;
        case m5.Alert.Description.unsupported_certificate:
          return Xq.pki.certificateError.unsupported_certificate;
        case m5.Alert.Description.certificate_revoked:
          return Xq.pki.certificateError.certificate_revoked;
        case m5.Alert.Description.certificate_expired:
          return Xq.pki.certificateError.certificate_expired;
        case m5.Alert.Description.certificate_unknown:
          return Xq.pki.certificateError.certificate_unknown;
        case m5.Alert.Description.unknown_ca:
          return Xq.pki.certificateError.unknown_ca;
        default:
          return Xq.pki.certificateError.bad_certificate;
      }
    }
    m5.verifyCertificateChain = function (mh, mg) {
      try {
        var mz = {};
        for (var mL in mh.verifyOptions) {
          mz[mL] = mh.verifyOptions[mL];
        }
        mz.verify = function (mD, mp, mZ) {
          var mw = mj(mD);
          var mY = mh.verify(mh, mD, mp, mZ);
          if (mY !== true) {
            if (typeof mY == "object" && !Xq.util.isArray(mY)) {
              var mx = new Error("The application rejected the certificate.");
              mx.send = true;
              mx.alert = {
                level: m5.Alert.Level.fatal,
                description: m5.Alert.Description.bad_certificate
              };
              if (mY.message) {
                mx.message = mY.message;
              }
              if (mY.alert) {
                mx.alert.description = mY.alert;
              }
              throw mx;
            }
            if (mY !== mD) {
              mY = mJ(mY);
            }
          }
          return mY;
        };
        Xq.pki.verifyCertificateChain(mh.caStore, mg, mz);
      } catch (mD) {
        var mn = mD;
        if (typeof mn != "object" || Xq.util.isArray(mn)) {
          mn = {
            send: true,
            alert: {
              level: m5.Alert.Level.fatal,
              description: mj(mD)
            }
          };
        }
        if (!("send" in mn)) {
          mn.send = true;
        }
        if (!("alert" in mn)) {
          mn.alert = {
            level: m5.Alert.Level.fatal,
            description: mj(mn.error)
          };
        }
        mh.error(mh, mn);
      }
      return !mh.fail;
    };
    m5.createSessionCache = function (mh, mg) {
      var mz = null;
      if (mh && mh.getSession && mh.setSession && mh.order) {
        mz = mh;
      } else {
        mz = {};
        mz.cache = mh || {};
        mz.capacity = Math.max(mg || 100, 1);
        mz.order = [];
        for (var mL in mh) {
          if (mz.order.length <= mg) {
            mz.order.push(mL);
          } else {
            delete mh[mL];
          }
        }
        mz.getSession = function (mn) {
          var mD = null;
          var mp = null;
          if (mn) {
            mp = Xq.util.bytesToHex(mn);
          } else if (mz.order.length > 0) {
            mp = mz.order[0];
          }
          if (mp !== null && mp in mz.cache) {
            mD = mz.cache[mp];
            delete mz.cache[mp];
            for (var mZ in mz.order) {
              if (mz.order[mZ] === mp) {
                mz.order.splice(mZ, 1);
                break;
              }
            }
          }
          return mD;
        };
        mz.setSession = function (mn, mD) {
          if (mz.order.length === mz.capacity) {
            var mp = mz.order.shift();
            delete mz.cache[mp];
          }
          var mp = Xq.util.bytesToHex(mn);
          mz.order.push(mp);
          mz.cache[mp] = mD;
        };
      }
      return mz;
    };
    m5.createConnection = function (mh) {
      var mg = null;
      if (mh.caStore) {
        if (Xq.util.isArray(mh.caStore)) {
          mg = Xq.pki.createCaStore(mh.caStore);
        } else {
          mg = mh.caStore;
        }
      } else {
        mg = Xq.pki.createCaStore();
      }
      var mz = mh.cipherSuites || null;
      if (mz === null) {
        mz = [];
        for (var mL in m5.CipherSuites) {
          mz.push(m5.CipherSuites[mL]);
        }
      }
      var mn = mh.server ? m5.ConnectionEnd.server : m5.ConnectionEnd.client;
      var mD = mh.sessionCache ? m5.createSessionCache(mh.sessionCache) : null;
      var mp = {
        version: {
          major: m5.Version.major,
          minor: m5.Version.minor
        },
        entity: mn,
        sessionId: mh.sessionId,
        caStore: mg,
        sessionCache: mD,
        cipherSuites: mz,
        connected: mh.connected,
        virtualHost: mh.virtualHost || null,
        verifyClient: mh.verifyClient || false,
        verify: mh.verify || function (mx, mo, ml, mP) {
          return mo;
        },
        verifyOptions: mh.verifyOptions || {},
        getCertificate: mh.getCertificate || null,
        getPrivateKey: mh.getPrivateKey || null,
        getSignature: mh.getSignature || null,
        input: Xq.util.createBuffer(),
        tlsData: Xq.util.createBuffer(),
        data: Xq.util.createBuffer(),
        tlsDataReady: mh.tlsDataReady,
        dataReady: mh.dataReady,
        heartbeatReceived: mh.heartbeatReceived,
        closed: mh.closed,
        error: function (mx, mo) {
          mo.origin = mo.origin || (mx.entity === m5.ConnectionEnd.client ? "client" : "server");
          if (mo.send) {
            m5.queue(mx, m5.createAlert(mx, mo.alert));
            m5.flush(mx);
          }
          var ml = mo.fatal !== false;
          if (ml) {
            mx.fail = true;
          }
          mh.error(mx, mo);
          if (ml) {
            mx.close(false);
          }
        },
        deflate: mh.deflate || null,
        inflate: mh.inflate || null
      };
      mp.reset = function (mx) {
        mp.version = {
          major: m5.Version.major,
          minor: m5.Version.minor
        };
        mp.record = null;
        mp.session = null;
        mp.peerCertificate = null;
        mp.state = {
          pending: null,
          current: null
        };
        mp.expect = mp.entity === m5.ConnectionEnd.client ? m6 : mW;
        mp.fragmented = null;
        mp.records = [];
        mp.open = false;
        mp.handshakes = 0;
        mp.handshaking = false;
        mp.isConnected = false;
        mp.fail = !mx && typeof mx !== "undefined";
        mp.input.clear();
        mp.tlsData.clear();
        mp.data.clear();
        mp.state.current = m5.createConnectionState(mp);
      };
      mp.reset();
      function mZ(mx, mo) {
        var ml = mo.type - m5.ContentType.change_cipher_spec;
        var mP = mf[mx.entity][mx.expect];
        if (ml in mP) {
          mP[ml](mx, mo);
        } else {
          m5.handleUnexpected(mx, mo);
        }
      }
      function mw(mx) {
        var mo = 0;
        var ml = mx.input;
        var mP = ml.length();
        if (mP < 5) {
          mo = 5 - mP;
        } else {
          mx.record = {
            type: ml.getByte(),
            version: {
              major: ml.getByte(),
              minor: ml.getByte()
            },
            length: ml.getInt16(),
            fragment: Xq.util.createBuffer(),
            ready: false
          };
          var mF = mx.record.version.major === mx.version.major;
          if (mF && mx.session && mx.session.version) {
            mF = mx.record.version.minor === mx.version.minor;
          }
          if (!mF) {
            mx.error(mx, {
              message: "Incompatible TLS version.",
              send: true,
              alert: {
                level: m5.Alert.Level.fatal,
                description: m5.Alert.Description.protocol_version
              }
            });
          }
        }
        return mo;
      }
      function mY(mx) {
        var mo = 0;
        var ml = mx.input;
        var mP = ml.length();
        if (mP < mx.record.length) {
          mo = mx.record.length - mP;
        } else {
          mx.record.fragment.putBytes(ml.getBytes(mx.record.length));
          ml.compact();
          var mF = mx.state.current.read;
          if (mF.update(mx, mx.record)) {
            if (mx.fragmented !== null) {
              if (mx.fragmented.type === mx.record.type) {
                mx.fragmented.fragment.putBuffer(mx.record.fragment);
                mx.record = mx.fragmented;
              } else {
                mx.error(mx, {
                  message: "Invalid fragmented record.",
                  send: true,
                  alert: {
                    level: m5.Alert.Level.fatal,
                    description: m5.Alert.Description.unexpected_message
                  }
                });
              }
            }
            mx.record.ready = true;
          }
        }
        return mo;
      }
      mp.handshake = function (mx) {
        if (mp.entity !== m5.ConnectionEnd.client) {
          mp.error(mp, {
            message: "Cannot initiate handshake as a server.",
            fatal: false
          });
        } else if (mp.handshaking) {
          mp.error(mp, {
            message: "Handshake already in progress.",
            fatal: false
          });
        } else {
          if (mp.fail && !mp.open && mp.handshakes === 0) {
            mp.fail = false;
          }
          mp.handshaking = true;
          mx = mx || "";
          var mo = null;
          if (mx.length > 0) {
            if (mp.sessionCache) {
              mo = mp.sessionCache.getSession(mx);
            }
            if (mo === null) {
              mx = "";
            }
          }
          if (mx.length === 0 && mp.sessionCache) {
            mo = mp.sessionCache.getSession();
            if (mo !== null) {
              mx = mo.id;
            }
          }
          mp.session = {
            id: mx,
            version: null,
            cipherSuite: null,
            compressionMethod: null,
            serverCertificate: null,
            certificateRequest: null,
            clientCertificate: null,
            sp: {},
            md5: Xq.md.md5.create(),
            sha1: Xq.md.sha1.create()
          };
          if (mo) {
            mp.version = mo.version;
            mp.session.sp = mo.sp;
          }
          mp.session.sp.client_random = m5.createRandom().getBytes();
          mp.open = true;
          m5.queue(mp, m5.createRecord(mp, {
            type: m5.ContentType.handshake,
            data: m5.createClientHello(mp)
          }));
          m5.flush(mp);
        }
      };
      mp.process = function (mx) {
        var mo = 0;
        if (mx) {
          mp.input.putBytes(mx);
        }
        if (!mp.fail) {
          if (mp.record !== null && mp.record.ready && mp.record.fragment.isEmpty()) {
            mp.record = null;
          }
          if (mp.record === null) {
            mo = mw(mp);
          }
          if (!mp.fail && mp.record !== null && !mp.record.ready) {
            mo = mY(mp);
          }
          if (!mp.fail && mp.record !== null && mp.record.ready) {
            mZ(mp, mp.record);
          }
        }
        return mo;
      };
      mp.prepare = function (mx) {
        m5.queue(mp, m5.createRecord(mp, {
          type: m5.ContentType.application_data,
          data: Xq.util.createBuffer(mx)
        }));
        return m5.flush(mp);
      };
      mp.prepareHeartbeatRequest = function (mx, mo) {
        if (mx instanceof Xq.util.ByteBuffer) {
          mx = mx.bytes();
        }
        if (typeof mo === "undefined") {
          mo = mx.length;
        }
        mp.expectedHeartbeatPayload = mx;
        m5.queue(mp, m5.createRecord(mp, {
          type: m5.ContentType.heartbeat,
          data: m5.createHeartbeat(m5.HeartbeatMessageType.heartbeat_request, mx, mo)
        }));
        return m5.flush(mp);
      };
      mp.close = function (mx) {
        if (!mp.fail && mp.sessionCache && mp.session) {
          var mo = {
            id: mp.session.id,
            version: mp.session.version,
            sp: mp.session.sp
          };
          mo.sp.keys = null;
          mp.sessionCache.setSession(mo.id, mo);
        }
        if (mp.open) {
          mp.open = false;
          mp.input.clear();
          if (mp.isConnected || mp.handshaking) {
            mp.isConnected = mp.handshaking = false;
            m5.queue(mp, m5.createAlert(mp, {
              level: m5.Alert.Level.warning,
              description: m5.Alert.Description.close_notify
            }));
            m5.flush(mp);
          }
          mp.closed(mp);
        }
        mp.reset(mx);
      };
      return mp;
    };
    XF.exports = Xq.tls = Xq.tls || {};
    for (mr in m5) {
      if (typeof m5[mr] != "function") {
        Xq.tls[mr] = m5[mr];
      }
    }
    var mr;
    Xq.tls.prf_tls1 = XS;
    Xq.tls.hmac_sha1 = m0;
    Xq.tls.createSessionCache = m5.createSessionCache;
    Xq.tls.createConnection = m5.createConnection;
  });
  var P = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    a();
    var XS = XF.exports = Xq.tls;
    XS.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
      id: [0, 47],
      name: "TLS_RSA_WITH_AES_128_CBC_SHA",
      initSecurityParameters: function (m6) {
        m6.bulk_cipher_algorithm = XS.BulkCipherAlgorithm.aes;
        m6.cipher_type = XS.CipherType.block;
        m6.enc_key_length = 16;
        m6.block_length = 16;
        m6.fixed_iv_length = 16;
        m6.record_iv_length = 16;
        m6.mac_algorithm = XS.MACAlgorithm.hmac_sha1;
        m6.mac_length = 20;
        m6.mac_key_length = 20;
      },
      initConnectionState: m0
    };
    XS.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
      id: [0, 53],
      name: "TLS_RSA_WITH_AES_256_CBC_SHA",
      initSecurityParameters: function (m6) {
        m6.bulk_cipher_algorithm = XS.BulkCipherAlgorithm.aes;
        m6.cipher_type = XS.CipherType.block;
        m6.enc_key_length = 32;
        m6.block_length = 16;
        m6.fixed_iv_length = 16;
        m6.record_iv_length = 16;
        m6.mac_algorithm = XS.MACAlgorithm.hmac_sha1;
        m6.mac_length = 20;
        m6.mac_key_length = 20;
      },
      initConnectionState: m0
    };
    function m0(m6, m7, m8) {
      var m9 = m7.entity === Xq.tls.ConnectionEnd.client;
      m6.read.cipherState = {
        init: false,
        cipher: Xq.cipher.createDecipher("AES-CBC", m9 ? m8.keys.server_write_key : m8.keys.client_write_key),
        iv: m9 ? m8.keys.server_write_IV : m8.keys.client_write_IV
      };
      m6.write.cipherState = {
        init: false,
        cipher: Xq.cipher.createCipher("AES-CBC", m9 ? m8.keys.client_write_key : m8.keys.server_write_key),
        iv: m9 ? m8.keys.client_write_IV : m8.keys.server_write_IV
      };
      m6.read.cipherFunction = m4;
      m6.write.cipherFunction = m1;
      m6.read.macLength = m6.write.macLength = m8.mac_length;
      m6.read.macFunction = m6.write.macFunction = XS.hmac_sha1;
    }
    function m1(m6, m7) {
      var m8 = false;
      var m9 = m7.macFunction(m7.macKey, m7.sequenceNumber, m6);
      m6.fragment.putBytes(m9);
      m7.updateSequenceNumber();
      var mX;
      if (m6.version.minor === XS.Versions.TLS_1_0.minor) {
        mX = m7.cipherState.init ? null : m7.cipherState.iv;
      } else {
        mX = Xq.random.getBytesSync(16);
      }
      m7.cipherState.init = true;
      var mm = m7.cipherState.cipher;
      mm.start({
        iv: mX
      });
      if (m6.version.minor >= XS.Versions.TLS_1_1.minor) {
        mm.output.putBytes(mX);
      }
      mm.update(m6.fragment);
      if (mm.finish(m2)) {
        m6.fragment = mm.output;
        m6.length = m6.fragment.length();
        m8 = true;
      }
      return m8;
    }
    function m2(m6, m7, m8) {
      if (!m8) {
        var m9 = m6 - m7.length() % m6;
        m7.fillWithByte(m9 - 1, m9);
      }
      return true;
    }
    function m3(m6, m7, m8) {
      var m9 = true;
      if (m8) {
        for (var mX = m7.length(), mm = m7.last(), mI = mX - 1 - mm; mI < mX - 1; ++mI) {
          m9 = m9 && m7.at(mI) == mm;
        }
        if (m9) {
          m7.truncate(mm + 1);
        }
      }
      return m9;
    }
    function m4(m6, m7) {
      var m8 = false;
      var m9;
      if (m6.version.minor === XS.Versions.TLS_1_0.minor) {
        m9 = m7.cipherState.init ? null : m7.cipherState.iv;
      } else {
        m9 = m6.fragment.getBytes(16);
      }
      m7.cipherState.init = true;
      var mX = m7.cipherState.cipher;
      mX.start({
        iv: m9
      });
      mX.update(m6.fragment);
      m8 = mX.finish(m3);
      var mm = m7.macLength;
      var mI = Xq.random.getBytesSync(mm);
      var mV = mX.output.length();
      if (mV >= mm) {
        m6.fragment = mX.output.getBytes(mV - mm);
        mI = mX.output.getBytes(mm);
      } else {
        m6.fragment = mX.output.getBytes();
      }
      m6.fragment = Xq.util.createBuffer(m6.fragment);
      m6.length = m6.fragment.length();
      var mE = m7.macFunction(m7.macKey, m7.sequenceNumber, m6);
      m7.updateSequenceNumber();
      m8 = m5(m7.macKey, mI, mE) && m8;
      return m8;
    }
    function m5(m6, m7, m8) {
      var m9 = Xq.hmac.create();
      m9.start("SHA1", m6);
      m9.update(m7);
      m7 = m9.digest().getBytes();
      m9.start(null, null);
      m9.update(m8);
      m8 = m9.digest().getBytes();
      return m7 === m8;
    }
  });
  var F = K((XP, XF) => {
    'use strict';

    var Xq = M();
    T();
    B();
    var XS = XF.exports = Xq.sha512 = Xq.sha512 || {};
    Xq.md.sha512 = Xq.md.algorithms.sha512 = XS;
    var m0 = Xq.sha384 = Xq.sha512.sha384 = Xq.sha512.sha384 || {};
    m0.create = function () {
      return XS.create("SHA-384");
    };
    Xq.md.sha384 = Xq.md.algorithms.sha384 = m0;
    Xq.sha512.sha256 = Xq.sha512.sha256 || {
      create: function () {
        return XS.create("SHA-512/256");
      }
    };
    Xq.md["sha512/256"] = Xq.md.algorithms["sha512/256"] = Xq.sha512.sha256;
    Xq.sha512.sha224 = Xq.sha512.sha224 || {
      create: function () {
        return XS.create("SHA-512/224");
      }
    };
    Xq.md["sha512/224"] = Xq.md.algorithms["sha512/224"] = Xq.sha512.sha224;
    XS.create = function (m7) {
      if (!m2) {
        m5();
      }
      if (typeof m7 === "undefined") {
        m7 = "SHA-512";
      }
      if (!(m7 in m4)) {
        throw new Error("Invalid SHA-512 algorithm: " + m7);
      }
      var m8 = m4[m7];
      var m9 = null;
      var mX = Xq.util.createBuffer();
      var mm = new Array(80);
      for (var mI = 0; mI < 80; ++mI) {
        mm[mI] = new Array(2);
      }
      var mV = 64;
      switch (m7) {
        case "SHA-384":
          mV = 48;
          break;
        case "SHA-512/256":
          mV = 32;
          break;
        case "SHA-512/224":
          mV = 28;
          break;
      }
      var mE = {
        algorithm: m7.replace("-", "").toLowerCase(),
        blockLength: 128,
        digestLength: mV,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 16
      };
      mE.start = function () {
        mE.messageLength = 0;
        mE.fullMessageLength = mE.messageLength128 = [];
        for (var mW = mE.messageLengthSize / 4, mC = 0; mC < mW; ++mC) {
          mE.fullMessageLength.push(0);
        }
        mX = Xq.util.createBuffer();
        m9 = new Array(m8.length);
        for (var mC = 0; mC < m8.length; ++mC) {
          m9[mC] = m8[mC].slice(0);
        }
        return mE;
      };
      mE.start();
      mE.update = function (mW, mC) {
        if (mC === "utf8") {
          mW = Xq.util.encodeUtf8(mW);
        }
        var mH = mW.length;
        mE.messageLength += mH;
        mH = [mH / 4294967296 >>> 0, mH >>> 0];
        for (var me = mE.fullMessageLength.length - 1; me >= 0; --me) {
          mE.fullMessageLength[me] += mH[1];
          mH[1] = mH[0] + (mE.fullMessageLength[me] / 4294967296 >>> 0);
          mE.fullMessageLength[me] = mE.fullMessageLength[me] >>> 0;
          mH[0] = mH[1] / 4294967296 >>> 0;
        }
        mX.putBytes(mW);
        m6(m9, mm, mX);
        if (mX.read > 2048 || mX.length() === 0) {
          mX.compact();
        }
        return mE;
      };
      mE.digest = function () {
        var mW = Xq.util.createBuffer();
        mW.putBytes(mX.bytes());
        var mC = mE.fullMessageLength[mE.fullMessageLength.length - 1] + mE.messageLengthSize;
        var mH = mC & mE.blockLength - 1;
        mW.putBytes(m1.substr(0, mE.blockLength - mH));
        var me;
        var mK;
        var mU = mE.fullMessageLength[0] * 8;
        for (var mv = 0; mv < mE.fullMessageLength.length - 1; ++mv) {
          me = mE.fullMessageLength[mv + 1] * 8;
          mK = me / 4294967296 >>> 0;
          mU += mK;
          mW.putInt32(mU >>> 0);
          mU = me >>> 0;
        }
        mW.putInt32(mU);
        var mM = new Array(m9.length);
        for (var mv = 0; mv < m9.length; ++mv) {
          mM[mv] = m9[mv].slice(0);
        }
        m6(mM, mm, mW);
        var md = Xq.util.createBuffer();
        var mB;
        if (m7 === "SHA-512") {
          mB = mM.length;
        } else if (m7 === "SHA-384") {
          mB = mM.length - 2;
        } else {
          mB = mM.length - 4;
        }
        for (var mv = 0; mv < mB; ++mv) {
          md.putInt32(mM[mv][0]);
          if (mv !== mB - 1 || m7 !== "SHA-512/224") {
            md.putInt32(mM[mv][1]);
          }
        }
        return md;
      };
      return mE;
    };
    var m1 = null;
    var m2 = false;
    var m3 = null;
    var m4 = null;
    function m5() {
      m1 = "";
      m1 += Xq.util.fillString("\0", 128);
      m3 = [[1116352408, 3609767458], [1899447441, 602891725], [3049323471, 3964484399], [3921009573, 2173295548], [961987163, 4081628472], [1508970993, 3053834265], [2453635748, 2937671579], [2870763221, 3664609560], [3624381080, 2734883394], [310598401, 1164996542], [607225278, 1323610764], [1426881987, 3590304994], [1925078388, 4068182383], [2162078206, 991336113], [2614888103, 633803317], [3248222580, 3479774868], [3835390401, 2666613458], [4022224774, 944711139], [264347078, 2341262773], [604807628, 2007800933], [770255983, 1495990901], [1249150122, 1856431235], [1555081692, 3175218132], [1996064986, 2198950837], [2554220882, 3999719339], [2821834349, 766784016], [2952996808, 2566594879], [3210313671, 3203337956], [3336571891, 1034457026], [3584528711, 2466948901], [113926993, 3758326383], [338241895, 168717936], [666307205, 1188179964], [773529912, 1546045734], [1294757372, 1522805485], [1396182291, 2643833823], [1695183700, 2343527390], [1986661051, 1014477480], [2177026350, 1206759142], [2456956037, 344077627], [2730485921, 1290863460], [2820302411, 3158454273], [3259730800, 3505952657], [3345764771, 106217008], [3516065817, 3606008344], [3600352804, 1432725776], [4094571909, 1467031594], [275423344, 851169720], [430227734, 3100823752], [506948616, 1363258195], [659060556, 3750685593], [883997877, 3785050280], [958139571, 3318307427], [1322822218, 3812723403], [1537002063, 2003034995], [1747873779, 3602036899], [1955562222, 1575990012], [2024104815, 1125592928], [2227730452, 2716904306], [2361852424, 442776044], [2428436474, 593698344], [2756734187, 3733110249], [3204031479, 2999351573], [3329325298, 3815920427], [3391569614, 3928383900], [3515267271, 566280711], [3940187606, 3454069534], [4118630271, 4000239992], [116418474, 1914138554], [174292421, 2731055270], [289380356, 3203993006], [460393269, 320620315], [685471733, 587496836], [852142971, 1086792851], [1017036298, 365543100], [1126000580, 2618297676], [1288033470, 3409855158], [1501505948, 4234509866], [1607167915, 987167468], [1816402316, 1246189591]];
      m4 = {};
      m4["SHA-512"] = [[1779033703, 4089235720], [3144134277, 2227873595], [1013904242, 4271175723], [2773480762, 1595750129], [1359893119, 2917565137], [2600822924, 725511199], [528734635, 4215389547], [1541459225, 327033209]];
      m4["SHA-384"] = [[3418070365, 3238371032], [1654270250, 914150663], [2438529370, 812702999], [355462360, 4144912697], [1731405415, 4290775857], [2394180231, 1750603025], [3675008525, 1694076839], [1203062813, 3204075428]];
      m4["SHA-512/256"] = [[573645204, 4230739756], [2673172387, 3360449730], [596883563, 1867755857], [2520282905, 1497426621], [2519219938, 2827943907], [3193839141, 1401305490], [721525244, 746961066], [246885852, 2177182882]];
      m4["SHA-512/224"] = [[2352822216, 424955298], [1944164710, 2312950998], [502970286, 855612546], [1738396948, 1479516111], [258812777, 2077511080], [2011393907, 79989058], [1067287976, 1780299464], [286451373, 2446758561]];
      m2 = true;
    }
    function m6(m7, m8, m9) {
      var mX;
      var mm;
      var mI;
      var mV;
      var mE;
      var mW;
      var mC;
      var mH;
      var mK;
      var mU;
      var mv;
      var mM;
      var md;
      var mB;
      var mA;
      var mG;
      var mf;
      var mb;
      var mT;
      var mQ;
      var mt;
      var mi;
      var mO;
      var mu;
      var mN;
      var mR;
      var my;
      var mk;
      var mj;
      var mJ;
      var mr;
      var mh;
      var mg;
      var mz;
      var mL;
      for (var mn = m9.length(); mn >= 128;) {
        for (mj = 0; mj < 16; ++mj) {
          m8[mj][0] = m9.getInt32() >>> 0;
          m8[mj][1] = m9.getInt32() >>> 0;
        }
        for (; mj < 80; ++mj) {
          mh = m8[mj - 2];
          mJ = mh[0];
          mr = mh[1];
          mX = ((mJ >>> 19 | mr << 13) ^ (mr >>> 29 | mJ << 3) ^ mJ >>> 6) >>> 0;
          mm = ((mJ << 13 | mr >>> 19) ^ (mr << 3 | mJ >>> 29) ^ (mJ << 26 | mr >>> 6)) >>> 0;
          mz = m8[mj - 15];
          mJ = mz[0];
          mr = mz[1];
          mI = ((mJ >>> 1 | mr << 31) ^ (mJ >>> 8 | mr << 24) ^ mJ >>> 7) >>> 0;
          mV = ((mJ << 31 | mr >>> 1) ^ (mJ << 24 | mr >>> 8) ^ (mJ << 25 | mr >>> 7)) >>> 0;
          mg = m8[mj - 7];
          mL = m8[mj - 16];
          mr = mm + mg[1] + mV + mL[1];
          m8[mj][0] = mX + mg[0] + mI + mL[0] + (mr / 4294967296 >>> 0) >>> 0;
          m8[mj][1] = mr >>> 0;
        }
        md = m7[0][0];
        mB = m7[0][1];
        mA = m7[1][0];
        mG = m7[1][1];
        mf = m7[2][0];
        mb = m7[2][1];
        mT = m7[3][0];
        mQ = m7[3][1];
        mt = m7[4][0];
        mi = m7[4][1];
        mO = m7[5][0];
        mu = m7[5][1];
        mN = m7[6][0];
        mR = m7[6][1];
        my = m7[7][0];
        mk = m7[7][1];
        mj = 0;
        for (; mj < 80; ++mj) {
          mC = ((mt >>> 14 | mi << 18) ^ (mt >>> 18 | mi << 14) ^ (mi >>> 9 | mt << 23)) >>> 0;
          mH = ((mt << 18 | mi >>> 14) ^ (mt << 14 | mi >>> 18) ^ (mi << 23 | mt >>> 9)) >>> 0;
          mK = (mN ^ mt & (mO ^ mN)) >>> 0;
          mU = (mR ^ mi & (mu ^ mR)) >>> 0;
          mE = ((md >>> 28 | mB << 4) ^ (mB >>> 2 | md << 30) ^ (mB >>> 7 | md << 25)) >>> 0;
          mW = ((md << 4 | mB >>> 28) ^ (mB << 30 | md >>> 2) ^ (mB << 25 | md >>> 7)) >>> 0;
          mv = (md & mA | mf & (md ^ mA)) >>> 0;
          mM = (mB & mG | mb & (mB ^ mG)) >>> 0;
          mr = mk + mH + mU + m3[mj][1] + m8[mj][1];
          mX = my + mC + mK + m3[mj][0] + m8[mj][0] + (mr / 4294967296 >>> 0) >>> 0;
          mm = mr >>> 0;
          mr = mW + mM;
          mI = mE + mv + (mr / 4294967296 >>> 0) >>> 0;
          mV = mr >>> 0;
          my = mN;
          mk = mR;
          mN = mO;
          mR = mu;
          mO = mt;
          mu = mi;
          mr = mQ + mm;
          mt = mT + mX + (mr / 4294967296 >>> 0) >>> 0;
          mi = mr >>> 0;
          mT = mf;
          mQ = mb;
          mf = mA;
          mb = mG;
          mA = md;
          mG = mB;
          mr = mm + mV;
          md = mX + mI + (mr / 4294967296 >>> 0) >>> 0;
          mB = mr >>> 0;
        }
        mr = m7[0][1] + mB;
        m7[0][0] = m7[0][0] + md + (mr / 4294967296 >>> 0) >>> 0;
        m7[0][1] = mr >>> 0;
        mr = m7[1][1] + mG;
        m7[1][0] = m7[1][0] + mA + (mr / 4294967296 >>> 0) >>> 0;
        m7[1][1] = mr >>> 0;
        mr = m7[2][1] + mb;
        m7[2][0] = m7[2][0] + mf + (mr / 4294967296 >>> 0) >>> 0;
        m7[2][1] = mr >>> 0;
        mr = m7[3][1] + mQ;
        m7[3][0] = m7[3][0] + mT + (mr / 4294967296 >>> 0) >>> 0;
        m7[3][1] = mr >>> 0;
        mr = m7[4][1] + mi;
        m7[4][0] = m7[4][0] + mt + (mr / 4294967296 >>> 0) >>> 0;
        m7[4][1] = mr >>> 0;
        mr = m7[5][1] + mu;
        m7[5][0] = m7[5][0] + mO + (mr / 4294967296 >>> 0) >>> 0;
        m7[5][1] = mr >>> 0;
        mr = m7[6][1] + mR;
        m7[6][0] = m7[6][0] + mN + (mr / 4294967296 >>> 0) >>> 0;
        m7[6][1] = mr >>> 0;
        mr = m7[7][1] + mk;
        m7[7][0] = m7[7][0] + my + (mr / 4294967296 >>> 0) >>> 0;
        m7[7][1] = mr >>> 0;
        mn -= 128;
      }
    }
  });
  var q = K(XP => {
    'use strict';

    var XF = M();
    b();
    var Xq = XF.asn1;
    XP.privateKeyValidator = {
      name: "PrivateKeyInfo",
      tagClass: Xq.Class.UNIVERSAL,
      type: Xq.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PrivateKeyInfo.version",
        tagClass: Xq.Class.UNIVERSAL,
        type: Xq.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "PrivateKeyInfo.privateKeyAlgorithm",
        tagClass: Xq.Class.UNIVERSAL,
        type: Xq.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: Xq.Class.UNIVERSAL,
          type: Xq.Type.OID,
          constructed: false,
          capture: "privateKeyOid"
        }]
      }, {
        name: "PrivateKeyInfo",
        tagClass: Xq.Class.UNIVERSAL,
        type: Xq.Type.OCTETSTRING,
        constructed: false,
        capture: "privateKey"
      }]
    };
    XP.publicKeyValidator = {
      name: "SubjectPublicKeyInfo",
      tagClass: Xq.Class.UNIVERSAL,
      type: Xq.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "subjectPublicKeyInfo",
      value: [{
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: Xq.Class.UNIVERSAL,
        type: Xq.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: Xq.Class.UNIVERSAL,
          type: Xq.Type.OID,
          constructed: false,
          capture: "publicKeyOid"
        }]
      }, {
        tagClass: Xq.Class.UNIVERSAL,
        type: Xq.Type.BITSTRING,
        constructed: false,
        composed: true,
        captureBitStringValue: "ed25519PublicKey"
      }]
    };
  });
  var S = K((XP, XF) => {
    'use strict';

    var Xq = M();
    r();
    j();
    F();
    B();
    var XS = q();
    var m0 = XS.publicKeyValidator;
    var m1 = XS.privateKeyValidator;
    if (typeof m2 === "undefined") {
      m2 = Xq.jsbn.BigInteger;
    }
    var m2;
    var m3 = Xq.util.ByteBuffer;
    var m4 = typeof Buffer === "undefined" ? Uint8Array : Buffer;
    Xq.pki = Xq.pki || {};
    XF.exports = Xq.pki.ed25519 = Xq.ed25519 = Xq.ed25519 || {};
    var m5 = Xq.ed25519;
    m5.constants = {};
    m5.constants.PUBLIC_KEY_BYTE_LENGTH = 32;
    m5.constants.PRIVATE_KEY_BYTE_LENGTH = 64;
    m5.constants.SEED_BYTE_LENGTH = 32;
    m5.constants.SIGN_BYTE_LENGTH = 64;
    m5.constants.HASH_BYTE_LENGTH = 64;
    m5.generateKeyPair = function (mh) {
      mh = mh || {};
      var mg = mh.seed;
      if (mg === undefined) {
        mg = Xq.random.getBytesSync(m5.constants.SEED_BYTE_LENGTH);
      } else if (typeof mg == "string") {
        if (mg.length !== m5.constants.SEED_BYTE_LENGTH) {
          throw new TypeError("\"seed\" must be " + m5.constants.SEED_BYTE_LENGTH + " bytes in length.");
        }
      } else if (!(mg instanceof Uint8Array)) {
        throw new TypeError("\"seed\" must be a node.js Buffer, Uint8Array, or a binary string.");
      }
      mg = m6({
        message: mg,
        encoding: "binary"
      });
      var mz = new m4(m5.constants.PUBLIC_KEY_BYTE_LENGTH);
      var mL = new m4(m5.constants.PRIVATE_KEY_BYTE_LENGTH);
      for (var mn = 0; mn < 32; ++mn) {
        mL[mn] = mg[mn];
      }
      mC(mz, mL);
      return {
        publicKey: mz,
        privateKey: mL
      };
    };
    m5.privateKeyFromAsn1 = function (mh) {
      var mg = {};
      var mz = [];
      var mL = Xq.asn1.validate(mh, m1, mg, mz);
      if (!mL) {
        var mn = new Error("Invalid Key.");
        mn.errors = mz;
        throw mn;
      }
      var mD = Xq.asn1.derToOid(mg.privateKeyOid);
      var mp = Xq.oids.EdDSA25519;
      if (mD !== mp) {
        throw new Error("Invalid OID \"" + mD + "\"; OID must be \"" + mp + "\".");
      }
      var mZ = mg.privateKey;
      var mw = m6({
        message: Xq.asn1.fromDer(mZ).value,
        encoding: "binary"
      });
      return {
        privateKeyBytes: mw
      };
    };
    m5.publicKeyFromAsn1 = function (mh) {
      var mg = {};
      var mz = [];
      var mL = Xq.asn1.validate(mh, m0, mg, mz);
      if (!mL) {
        var mn = new Error("Invalid Key.");
        mn.errors = mz;
        throw mn;
      }
      var mD = Xq.asn1.derToOid(mg.publicKeyOid);
      var mp = Xq.oids.EdDSA25519;
      if (mD !== mp) {
        throw new Error("Invalid OID \"" + mD + "\"; OID must be \"" + mp + "\".");
      }
      var mZ = mg.ed25519PublicKey;
      if (mZ.length !== m5.constants.PUBLIC_KEY_BYTE_LENGTH) {
        throw new Error("Key length is invalid.");
      }
      return m6({
        message: mZ,
        encoding: "binary"
      });
    };
    m5.publicKeyFromPrivateKey = function (mh) {
      mh = mh || {};
      var mg = m6({
        message: mh.privateKey,
        encoding: "binary"
      });
      if (mg.length !== m5.constants.PRIVATE_KEY_BYTE_LENGTH) {
        throw new TypeError("\"options.privateKey\" must have a byte length of " + m5.constants.PRIVATE_KEY_BYTE_LENGTH);
      }
      for (var mz = new m4(m5.constants.PUBLIC_KEY_BYTE_LENGTH), mL = 0; mL < mz.length; ++mL) {
        mz[mL] = mg[32 + mL];
      }
      return mz;
    };
    m5.sign = function (mh) {
      mh = mh || {};
      var mg = m6(mh);
      var mz = m6({
        message: mh.privateKey,
        encoding: "binary"
      });
      if (mz.length === m5.constants.SEED_BYTE_LENGTH) {
        var mL = m5.generateKeyPair({
          seed: mz
        });
        mz = mL.privateKey;
      } else if (mz.length !== m5.constants.PRIVATE_KEY_BYTE_LENGTH) {
        throw new TypeError("\"options.privateKey\" must have a byte length of " + m5.constants.SEED_BYTE_LENGTH + " or " + m5.constants.PRIVATE_KEY_BYTE_LENGTH);
      }
      var mn = new m4(m5.constants.SIGN_BYTE_LENGTH + mg.length);
      mH(mn, mg, mg.length, mz);
      for (var mD = new m4(m5.constants.SIGN_BYTE_LENGTH), mp = 0; mp < mD.length; ++mp) {
        mD[mp] = mn[mp];
      }
      return mD;
    };
    m5.verify = function (mh) {
      mh = mh || {};
      var mg = m6(mh);
      if (mh.signature === undefined) {
        throw new TypeError("\"options.signature\" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.");
      }
      var mz = m6({
        message: mh.signature,
        encoding: "binary"
      });
      if (mz.length !== m5.constants.SIGN_BYTE_LENGTH) {
        throw new TypeError("\"options.signature\" must have a byte length of " + m5.constants.SIGN_BYTE_LENGTH);
      }
      var mL = m6({
        message: mh.publicKey,
        encoding: "binary"
      });
      if (mL.length !== m5.constants.PUBLIC_KEY_BYTE_LENGTH) {
        throw new TypeError("\"options.publicKey\" must have a byte length of " + m5.constants.PUBLIC_KEY_BYTE_LENGTH);
      }
      var mn = new m4(m5.constants.SIGN_BYTE_LENGTH + mg.length);
      var mD = new m4(m5.constants.SIGN_BYTE_LENGTH + mg.length);
      var mp;
      for (mp = 0; mp < m5.constants.SIGN_BYTE_LENGTH; ++mp) {
        mn[mp] = mz[mp];
      }
      for (mp = 0; mp < mg.length; ++mp) {
        mn[mp + m5.constants.SIGN_BYTE_LENGTH] = mg[mp];
      }
      return me(mD, mn, mn.length, mL) >= 0;
    };
    function m6(mh) {
      var mg = mh.message;
      if (mg instanceof Uint8Array || mg instanceof m4) {
        return mg;
      }
      var mz = mh.encoding;
      if (mg === undefined) {
        if (mh.md) {
          mg = mh.md.digest().getBytes();
          mz = "binary";
        } else {
          throw new TypeError("\"options.message\" or \"options.md\" not specified.");
        }
      }
      if (typeof mg == "string" && !mz) {
        throw new TypeError("\"options.encoding\" must be \"binary\" or \"utf8\".");
      }
      if (typeof mg == "string") {
        if (typeof Buffer !== "undefined") {
          return Buffer.from(mg, mz);
        }
        mg = new m3(mg, mz);
      } else if (!(mg instanceof m3)) {
        throw new TypeError("\"options.message\" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with \"options.encoding\" specifying its encoding.");
      }
      for (var mL = new m4(mg.length()), mn = 0; mn < mL.length; ++mn) {
        mL[mn] = mg.at(mn);
      }
      return mL;
    }
    var m7 = my();
    var m8 = my([1]);
    var m9 = my([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]);
    var mX = my([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]);
    var mm = my([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]);
    var mI = my([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]);
    var mV = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    var mE = my([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function mW(mh, mg) {
      var mz = Xq.md.sha512.create();
      var mL = new m3(mh);
      mz.update(mL.getBytes(mg), "binary");
      var mn = mz.digest().getBytes();
      if (typeof Buffer !== "undefined") {
        return Buffer.from(mn, "binary");
      }
      var mD = new m4(m5.constants.HASH_BYTE_LENGTH);
      for (var mp = 0; mp < 64; ++mp) {
        mD[mp] = mn.charCodeAt(mp);
      }
      return mD;
    }
    function mC(mh, mg) {
      var mz = [my(), my(), my(), my()];
      var mL;
      var mn = mW(mg, 32);
      mn[0] &= 248;
      mn[31] &= 127;
      mn[31] |= 64;
      mi(mz, mn);
      md(mh, mz);
      mL = 0;
      for (; mL < 32; ++mL) {
        mg[mL + 32] = mh[mL];
      }
      return 0;
    }
    function mH(mh, mg, mz, mL) {
      var mn;
      var mD;
      var mp = new Float64Array(64);
      var mZ = [my(), my(), my(), my()];
      var mw = mW(mL, 32);
      mw[0] &= 248;
      mw[31] &= 127;
      mw[31] |= 64;
      var mY = mz + 64;
      for (mn = 0; mn < mz; ++mn) {
        mh[64 + mn] = mg[mn];
      }
      for (mn = 0; mn < 32; ++mn) {
        mh[32 + mn] = mw[32 + mn];
      }
      var mx = mW(mh.subarray(32), mz + 32);
      mU(mx);
      mi(mZ, mx);
      md(mh, mZ);
      mn = 32;
      for (; mn < 64; ++mn) {
        mh[mn] = mL[mn];
      }
      var mo = mW(mh, mz + 64);
      mU(mo);
      mn = 32;
      for (; mn < 64; ++mn) {
        mp[mn] = 0;
      }
      for (mn = 0; mn < 32; ++mn) {
        mp[mn] = mx[mn];
      }
      for (mn = 0; mn < 32; ++mn) {
        for (mD = 0; mD < 32; mD++) {
          mp[mn + mD] += mo[mn] * mw[mD];
        }
      }
      mK(mh.subarray(32), mp);
      return mY;
    }
    function me(mh, mg, mz, mL) {
      var mn;
      var mD;
      var mp = new m4(32);
      var mZ = [my(), my(), my(), my()];
      var mw = [my(), my(), my(), my()];
      mD = -1;
      if (mz < 64 || ms(mw, mL)) {
        return -1;
      }
      for (mn = 0; mn < mz; ++mn) {
        mh[mn] = mg[mn];
      }
      for (mn = 0; mn < 32; ++mn) {
        mh[mn + 32] = mL[mn];
      }
      var mY = mW(mh, mz);
      mU(mY);
      mt(mZ, mw, mY);
      mi(mw, mg.subarray(32));
      mv(mZ, mw);
      md(mp, mZ);
      mz -= 64;
      if (mb(mg, 0, mp, 0)) {
        for (mn = 0; mn < mz; ++mn) {
          mh[mn] = 0;
        }
        return -1;
      }
      for (mn = 0; mn < mz; ++mn) {
        mh[mn] = mg[mn + 64];
      }
      mD = mz;
      return mD;
    }
    function mK(mh, mg) {
      var mz;
      var mL;
      var mn;
      var mD;
      for (mL = 63; mL >= 32; --mL) {
        mz = 0;
        mn = mL - 32;
        mD = mL - 12;
        for (; mn < mD; ++mn) {
          mg[mn] += mz - mg[mL] * 16 * mV[mn - (mL - 32)];
          mz = mg[mn] + 128 >> 8;
          mg[mn] -= mz * 256;
        }
        mg[mn] += mz;
        mg[mL] = 0;
      }
      mz = 0;
      mn = 0;
      for (; mn < 32; ++mn) {
        mg[mn] += mz - (mg[31] >> 4) * mV[mn];
        mz = mg[mn] >> 8;
        mg[mn] &= 255;
      }
      for (mn = 0; mn < 32; ++mn) {
        mg[mn] -= mz * mV[mn];
      }
      for (mL = 0; mL < 32; ++mL) {
        mg[mL + 1] += mg[mL] >> 8;
        mh[mL] = mg[mL] & 255;
      }
    }
    function mU(mh) {
      var mg = new Float64Array(64);
      for (var mz = 0; mz < 64; ++mz) {
        mg[mz] = mh[mz];
        mh[mz] = 0;
      }
      mK(mh, mg);
    }
    function mv(mh, mg) {
      var mz = my();
      var mL = my();
      var mn = my();
      var mD = my();
      var mp = my();
      var mZ = my();
      var mw = my();
      var mY = my();
      var mx = my();
      mj(mz, mh[1], mh[0]);
      mj(mx, mg[1], mg[0]);
      mr(mz, mz, mx);
      mk(mL, mh[0], mh[1]);
      mk(mx, mg[0], mg[1]);
      mr(mL, mL, mx);
      mr(mn, mh[3], mg[3]);
      mr(mn, mn, mX);
      mr(mD, mh[2], mg[2]);
      mk(mD, mD, mD);
      mj(mp, mL, mz);
      mj(mZ, mD, mn);
      mk(mw, mD, mn);
      mk(mY, mL, mz);
      mr(mh[0], mp, mZ);
      mr(mh[1], mY, mw);
      mr(mh[2], mw, mZ);
      mr(mh[3], mp, mY);
    }
    function mM(mh, mg, mz) {
      for (var mL = 0; mL < 4; ++mL) {
        mR(mh[mL], mg[mL], mz);
      }
    }
    function md(mh, mg) {
      var mz = my();
      var mL = my();
      var mn = my();
      mu(mn, mg[2]);
      mr(mz, mg[0], mn);
      mr(mL, mg[1], mn);
      mB(mh, mL);
      mh[31] ^= mQ(mz) << 7;
    }
    function mB(mh, mg) {
      var mz;
      var mL;
      var mn;
      var mD = my();
      var mp = my();
      for (mz = 0; mz < 16; ++mz) {
        mp[mz] = mg[mz];
      }
      mN(mp);
      mN(mp);
      mN(mp);
      mL = 0;
      for (; mL < 2; ++mL) {
        mD[0] = mp[0] - 65517;
        mz = 1;
        for (; mz < 15; ++mz) {
          mD[mz] = mp[mz] - 65535 - (mD[mz - 1] >> 16 & 1);
          mD[mz - 1] &= 65535;
        }
        mD[15] = mp[15] - 32767 - (mD[14] >> 16 & 1);
        mn = mD[15] >> 16 & 1;
        mD[14] &= 65535;
        mR(mp, mD, 1 - mn);
      }
      for (mz = 0; mz < 16; mz++) {
        mh[mz * 2] = mp[mz] & 255;
        mh[mz * 2 + 1] = mp[mz] >> 8;
      }
    }
    function ms(mh, mg) {
      var mz = my();
      var mL = my();
      var mn = my();
      var mD = my();
      var mp = my();
      var mZ = my();
      var mw = my();
      mO(mh[2], m8);
      mA(mh[1], mg);
      mJ(mn, mh[1]);
      mr(mD, mn, m9);
      mj(mn, mn, mh[2]);
      mk(mD, mh[2], mD);
      mJ(mp, mD);
      mJ(mZ, mp);
      mr(mw, mZ, mp);
      mr(mz, mw, mn);
      mr(mz, mz, mD);
      mG(mz, mz);
      mr(mz, mz, mn);
      mr(mz, mz, mD);
      mr(mz, mz, mD);
      mr(mh[0], mz, mD);
      mJ(mL, mh[0]);
      mr(mL, mL, mD);
      if (mf(mL, mn)) {
        mr(mh[0], mh[0], mE);
      }
      mJ(mL, mh[0]);
      mr(mL, mL, mD);
      if (mf(mL, mn)) {
        return -1;
      } else {
        if (mQ(mh[0]) === mg[31] >> 7) {
          mj(mh[0], m7, mh[0]);
        }
        mr(mh[3], mh[0], mh[1]);
        return 0;
      }
    }
    function mA(mh, mg) {
      var mz;
      for (mz = 0; mz < 16; ++mz) {
        mh[mz] = mg[mz * 2] + (mg[mz * 2 + 1] << 8);
      }
      mh[15] &= 32767;
    }
    function mG(mh, mg) {
      var mz = my();
      var mL;
      for (mL = 0; mL < 16; ++mL) {
        mz[mL] = mg[mL];
      }
      for (mL = 250; mL >= 0; --mL) {
        mJ(mz, mz);
        if (mL !== 1) {
          mr(mz, mz, mg);
        }
      }
      for (mL = 0; mL < 16; ++mL) {
        mh[mL] = mz[mL];
      }
    }
    function mf(mh, mg) {
      var mz = new m4(32);
      var mL = new m4(32);
      mB(mz, mh);
      mB(mL, mg);
      return mb(mz, 0, mL, 0);
    }
    function mb(mh, mg, mz, mL) {
      return mT(mh, mg, mz, mL, 32);
    }
    function mT(mh, mg, mz, mL, mn) {
      var mD;
      var mp = 0;
      for (mD = 0; mD < mn; ++mD) {
        mp |= mh[mg + mD] ^ mz[mL + mD];
      }
      return (mp - 1 >>> 8 & 1) - 1;
    }
    function mQ(mh) {
      var mg = new m4(32);
      mB(mg, mh);
      return mg[0] & 1;
    }
    function mt(mh, mg, mz) {
      var mL;
      var mn;
      mO(mh[0], m7);
      mO(mh[1], m8);
      mO(mh[2], m8);
      mO(mh[3], m7);
      mn = 255;
      for (; mn >= 0; --mn) {
        mL = mz[mn / 8 | 0] >> (mn & 7) & 1;
        mM(mh, mg, mL);
        mv(mg, mh);
        mv(mh, mh);
        mM(mh, mg, mL);
      }
    }
    function mi(mh, mg) {
      var mz = [my(), my(), my(), my()];
      mO(mz[0], mm);
      mO(mz[1], mI);
      mO(mz[2], m8);
      mr(mz[3], mm, mI);
      mt(mh, mz, mg);
    }
    function mO(mh, mg) {
      var mz;
      for (mz = 0; mz < 16; mz++) {
        mh[mz] = mg[mz] | 0;
      }
    }
    function mu(mh, mg) {
      var mz = my();
      var mL;
      for (mL = 0; mL < 16; ++mL) {
        mz[mL] = mg[mL];
      }
      for (mL = 253; mL >= 0; --mL) {
        mJ(mz, mz);
        if (mL !== 2 && mL !== 4) {
          mr(mz, mz, mg);
        }
      }
      for (mL = 0; mL < 16; ++mL) {
        mh[mL] = mz[mL];
      }
    }
    function mN(mh) {
      var mg;
      var mz;
      var mL = 1;
      for (mg = 0; mg < 16; ++mg) {
        mz = mh[mg] + mL + 65535;
        mL = Math.floor(mz / 65536);
        mh[mg] = mz - mL * 65536;
      }
      mh[0] += mL - 1 + (mL - 1) * 37;
    }
    function mR(mh, mg, mz) {
      var mL;
      var mn = ~(mz - 1);
      for (var mD = 0; mD < 16; ++mD) {
        mL = mn & (mh[mD] ^ mg[mD]);
        mh[mD] ^= mL;
        mg[mD] ^= mL;
      }
    }
    function my(mh) {
      var mg;
      var mz = new Float64Array(16);
      if (mh) {
        for (mg = 0; mg < mh.length; ++mg) {
          mz[mg] = mh[mg];
        }
      }
      return mz;
    }
    function mk(mh, mg, mz) {
      for (var mL = 0; mL < 16; ++mL) {
        mh[mL] = mg[mL] + mz[mL];
      }
    }
    function mj(mh, mg, mz) {
      for (var mL = 0; mL < 16; ++mL) {
        mh[mL] = mg[mL] - mz[mL];
      }
    }
    function mJ(mh, mg) {
      mr(mh, mg, mg);
    }
    function mr(mh, mg, mz) {
      var mL;
      var mn;
      var mD = 0;
      var mp = 0;
      var mZ = 0;
      var mw = 0;
      var mY = 0;
      var mx = 0;
      var mo = 0;
      var ml = 0;
      var mc = 0;
      var mP = 0;
      var mF = 0;
      var mq = 0;
      var mS = 0;
      var I0 = 0;
      var I1 = 0;
      var I2 = 0;
      var I3 = 0;
      var I4 = 0;
      var I5 = 0;
      var I6 = 0;
      var I7 = 0;
      var I8 = 0;
      var I9 = 0;
      var IX = 0;
      var Im = 0;
      var II = 0;
      var IV = 0;
      var IE = 0;
      var IW = 0;
      var IC = 0;
      var IH = 0;
      var Ie = mz[0];
      var IK = mz[1];
      var IU = mz[2];
      var Iv = mz[3];
      var IM = mz[4];
      var Id = mz[5];
      var IB = mz[6];
      var IA = mz[7];
      var IG = mz[8];
      var If = mz[9];
      var Ib = mz[10];
      var IT = mz[11];
      var IQ = mz[12];
      var It = mz[13];
      var Ii = mz[14];
      var IO = mz[15];
      mL = mg[0];
      mD += mL * Ie;
      mp += mL * IK;
      mZ += mL * IU;
      mw += mL * Iv;
      mY += mL * IM;
      mx += mL * Id;
      mo += mL * IB;
      ml += mL * IA;
      mc += mL * IG;
      mP += mL * If;
      mF += mL * Ib;
      mq += mL * IT;
      mS += mL * IQ;
      I0 += mL * It;
      I1 += mL * Ii;
      I2 += mL * IO;
      mL = mg[1];
      mp += mL * Ie;
      mZ += mL * IK;
      mw += mL * IU;
      mY += mL * Iv;
      mx += mL * IM;
      mo += mL * Id;
      ml += mL * IB;
      mc += mL * IA;
      mP += mL * IG;
      mF += mL * If;
      mq += mL * Ib;
      mS += mL * IT;
      I0 += mL * IQ;
      I1 += mL * It;
      I2 += mL * Ii;
      I3 += mL * IO;
      mL = mg[2];
      mZ += mL * Ie;
      mw += mL * IK;
      mY += mL * IU;
      mx += mL * Iv;
      mo += mL * IM;
      ml += mL * Id;
      mc += mL * IB;
      mP += mL * IA;
      mF += mL * IG;
      mq += mL * If;
      mS += mL * Ib;
      I0 += mL * IT;
      I1 += mL * IQ;
      I2 += mL * It;
      I3 += mL * Ii;
      I4 += mL * IO;
      mL = mg[3];
      mw += mL * Ie;
      mY += mL * IK;
      mx += mL * IU;
      mo += mL * Iv;
      ml += mL * IM;
      mc += mL * Id;
      mP += mL * IB;
      mF += mL * IA;
      mq += mL * IG;
      mS += mL * If;
      I0 += mL * Ib;
      I1 += mL * IT;
      I2 += mL * IQ;
      I3 += mL * It;
      I4 += mL * Ii;
      I5 += mL * IO;
      mL = mg[4];
      mY += mL * Ie;
      mx += mL * IK;
      mo += mL * IU;
      ml += mL * Iv;
      mc += mL * IM;
      mP += mL * Id;
      mF += mL * IB;
      mq += mL * IA;
      mS += mL * IG;
      I0 += mL * If;
      I1 += mL * Ib;
      I2 += mL * IT;
      I3 += mL * IQ;
      I4 += mL * It;
      I5 += mL * Ii;
      I6 += mL * IO;
      mL = mg[5];
      mx += mL * Ie;
      mo += mL * IK;
      ml += mL * IU;
      mc += mL * Iv;
      mP += mL * IM;
      mF += mL * Id;
      mq += mL * IB;
      mS += mL * IA;
      I0 += mL * IG;
      I1 += mL * If;
      I2 += mL * Ib;
      I3 += mL * IT;
      I4 += mL * IQ;
      I5 += mL * It;
      I6 += mL * Ii;
      I7 += mL * IO;
      mL = mg[6];
      mo += mL * Ie;
      ml += mL * IK;
      mc += mL * IU;
      mP += mL * Iv;
      mF += mL * IM;
      mq += mL * Id;
      mS += mL * IB;
      I0 += mL * IA;
      I1 += mL * IG;
      I2 += mL * If;
      I3 += mL * Ib;
      I4 += mL * IT;
      I5 += mL * IQ;
      I6 += mL * It;
      I7 += mL * Ii;
      I8 += mL * IO;
      mL = mg[7];
      ml += mL * Ie;
      mc += mL * IK;
      mP += mL * IU;
      mF += mL * Iv;
      mq += mL * IM;
      mS += mL * Id;
      I0 += mL * IB;
      I1 += mL * IA;
      I2 += mL * IG;
      I3 += mL * If;
      I4 += mL * Ib;
      I5 += mL * IT;
      I6 += mL * IQ;
      I7 += mL * It;
      I8 += mL * Ii;
      I9 += mL * IO;
      mL = mg[8];
      mc += mL * Ie;
      mP += mL * IK;
      mF += mL * IU;
      mq += mL * Iv;
      mS += mL * IM;
      I0 += mL * Id;
      I1 += mL * IB;
      I2 += mL * IA;
      I3 += mL * IG;
      I4 += mL * If;
      I5 += mL * Ib;
      I6 += mL * IT;
      I7 += mL * IQ;
      I8 += mL * It;
      I9 += mL * Ii;
      IX += mL * IO;
      mL = mg[9];
      mP += mL * Ie;
      mF += mL * IK;
      mq += mL * IU;
      mS += mL * Iv;
      I0 += mL * IM;
      I1 += mL * Id;
      I2 += mL * IB;
      I3 += mL * IA;
      I4 += mL * IG;
      I5 += mL * If;
      I6 += mL * Ib;
      I7 += mL * IT;
      I8 += mL * IQ;
      I9 += mL * It;
      IX += mL * Ii;
      Im += mL * IO;
      mL = mg[10];
      mF += mL * Ie;
      mq += mL * IK;
      mS += mL * IU;
      I0 += mL * Iv;
      I1 += mL * IM;
      I2 += mL * Id;
      I3 += mL * IB;
      I4 += mL * IA;
      I5 += mL * IG;
      I6 += mL * If;
      I7 += mL * Ib;
      I8 += mL * IT;
      I9 += mL * IQ;
      IX += mL * It;
      Im += mL * Ii;
      II += mL * IO;
      mL = mg[11];
      mq += mL * Ie;
      mS += mL * IK;
      I0 += mL * IU;
      I1 += mL * Iv;
      I2 += mL * IM;
      I3 += mL * Id;
      I4 += mL * IB;
      I5 += mL * IA;
      I6 += mL * IG;
      I7 += mL * If;
      I8 += mL * Ib;
      I9 += mL * IT;
      IX += mL * IQ;
      Im += mL * It;
      II += mL * Ii;
      IV += mL * IO;
      mL = mg[12];
      mS += mL * Ie;
      I0 += mL * IK;
      I1 += mL * IU;
      I2 += mL * Iv;
      I3 += mL * IM;
      I4 += mL * Id;
      I5 += mL * IB;
      I6 += mL * IA;
      I7 += mL * IG;
      I8 += mL * If;
      I9 += mL * Ib;
      IX += mL * IT;
      Im += mL * IQ;
      II += mL * It;
      IV += mL * Ii;
      IE += mL * IO;
      mL = mg[13];
      I0 += mL * Ie;
      I1 += mL * IK;
      I2 += mL * IU;
      I3 += mL * Iv;
      I4 += mL * IM;
      I5 += mL * Id;
      I6 += mL * IB;
      I7 += mL * IA;
      I8 += mL * IG;
      I9 += mL * If;
      IX += mL * Ib;
      Im += mL * IT;
      II += mL * IQ;
      IV += mL * It;
      IE += mL * Ii;
      IW += mL * IO;
      mL = mg[14];
      I1 += mL * Ie;
      I2 += mL * IK;
      I3 += mL * IU;
      I4 += mL * Iv;
      I5 += mL * IM;
      I6 += mL * Id;
      I7 += mL * IB;
      I8 += mL * IA;
      I9 += mL * IG;
      IX += mL * If;
      Im += mL * Ib;
      II += mL * IT;
      IV += mL * IQ;
      IE += mL * It;
      IW += mL * Ii;
      IC += mL * IO;
      mL = mg[15];
      I2 += mL * Ie;
      I3 += mL * IK;
      I4 += mL * IU;
      I5 += mL * Iv;
      I6 += mL * IM;
      I7 += mL * Id;
      I8 += mL * IB;
      I9 += mL * IA;
      IX += mL * IG;
      Im += mL * If;
      II += mL * Ib;
      IV += mL * IT;
      IE += mL * IQ;
      IW += mL * It;
      IC += mL * Ii;
      IH += mL * IO;
      mD += I3 * 38;
      mp += I4 * 38;
      mZ += I5 * 38;
      mw += I6 * 38;
      mY += I7 * 38;
      mx += I8 * 38;
      mo += I9 * 38;
      ml += IX * 38;
      mc += Im * 38;
      mP += II * 38;
      mF += IV * 38;
      mq += IE * 38;
      mS += IW * 38;
      I0 += IC * 38;
      I1 += IH * 38;
      mn = 1;
      mL = mD + mn + 65535;
      mn = Math.floor(mL / 65536);
      mD = mL - mn * 65536;
      mL = mp + mn + 65535;
      mn = Math.floor(mL / 65536);
      mp = mL - mn * 65536;
      mL = mZ + mn + 65535;
      mn = Math.floor(mL / 65536);
      mZ = mL - mn * 65536;
      mL = mw + mn + 65535;
      mn = Math.floor(mL / 65536);
      mw = mL - mn * 65536;
      mL = mY + mn + 65535;
      mn = Math.floor(mL / 65536);
      mY = mL - mn * 65536;
      mL = mx + mn + 65535;
      mn = Math.floor(mL / 65536);
      mx = mL - mn * 65536;
      mL = mo + mn + 65535;
      mn = Math.floor(mL / 65536);
      mo = mL - mn * 65536;
      mL = ml + mn + 65535;
      mn = Math.floor(mL / 65536);
      ml = mL - mn * 65536;
      mL = mc + mn + 65535;
      mn = Math.floor(mL / 65536);
      mc = mL - mn * 65536;
      mL = mP + mn + 65535;
      mn = Math.floor(mL / 65536);
      mP = mL - mn * 65536;
      mL = mF + mn + 65535;
      mn = Math.floor(mL / 65536);
      mF = mL - mn * 65536;
      mL = mq + mn + 65535;
      mn = Math.floor(mL / 65536);
      mq = mL - mn * 65536;
      mL = mS + mn + 65535;
      mn = Math.floor(mL / 65536);
      mS = mL - mn * 65536;
      mL = I0 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I0 = mL - mn * 65536;
      mL = I1 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I1 = mL - mn * 65536;
      mL = I2 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I2 = mL - mn * 65536;
      mD += mn - 1 + (mn - 1) * 37;
      mn = 1;
      mL = mD + mn + 65535;
      mn = Math.floor(mL / 65536);
      mD = mL - mn * 65536;
      mL = mp + mn + 65535;
      mn = Math.floor(mL / 65536);
      mp = mL - mn * 65536;
      mL = mZ + mn + 65535;
      mn = Math.floor(mL / 65536);
      mZ = mL - mn * 65536;
      mL = mw + mn + 65535;
      mn = Math.floor(mL / 65536);
      mw = mL - mn * 65536;
      mL = mY + mn + 65535;
      mn = Math.floor(mL / 65536);
      mY = mL - mn * 65536;
      mL = mx + mn + 65535;
      mn = Math.floor(mL / 65536);
      mx = mL - mn * 65536;
      mL = mo + mn + 65535;
      mn = Math.floor(mL / 65536);
      mo = mL - mn * 65536;
      mL = ml + mn + 65535;
      mn = Math.floor(mL / 65536);
      ml = mL - mn * 65536;
      mL = mc + mn + 65535;
      mn = Math.floor(mL / 65536);
      mc = mL - mn * 65536;
      mL = mP + mn + 65535;
      mn = Math.floor(mL / 65536);
      mP = mL - mn * 65536;
      mL = mF + mn + 65535;
      mn = Math.floor(mL / 65536);
      mF = mL - mn * 65536;
      mL = mq + mn + 65535;
      mn = Math.floor(mL / 65536);
      mq = mL - mn * 65536;
      mL = mS + mn + 65535;
      mn = Math.floor(mL / 65536);
      mS = mL - mn * 65536;
      mL = I0 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I0 = mL - mn * 65536;
      mL = I1 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I1 = mL - mn * 65536;
      mL = I2 + mn + 65535;
      mn = Math.floor(mL / 65536);
      I2 = mL - mn * 65536;
      mD += mn - 1 + (mn - 1) * 37;
      mh[0] = mD;
      mh[1] = mp;
      mh[2] = mZ;
      mh[3] = mw;
      mh[4] = mY;
      mh[5] = mx;
      mh[6] = mo;
      mh[7] = ml;
      mh[8] = mc;
      mh[9] = mP;
      mh[10] = mF;
      mh[11] = mq;
      mh[12] = mS;
      mh[13] = I0;
      mh[14] = I1;
      mh[15] = I2;
    }
  });
  var X0 = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    j();
    r();
    XF.exports = Xq.kem = Xq.kem || {};
    var XS = Xq.jsbn.BigInteger;
    Xq.kem.rsa = {};
    Xq.kem.rsa.create = function (m1, m2) {
      m2 = m2 || {};
      var m3 = m2.prng || Xq.random;
      var m4 = {};
      m4.encrypt = function (m5, m6) {
        var m7 = Math.ceil(m5.n.bitLength() / 8);
        var m8;
        do {
          m8 = new XS(Xq.util.bytesToHex(m3.getBytesSync(m7)), 16).mod(m5.n);
        } while (m8.compareTo(XS.ONE) <= 0);
        m8 = Xq.util.hexToBytes(m8.toString(16));
        var m9 = m7 - m8.length;
        if (m9 > 0) {
          m8 = Xq.util.fillString("\0", m9) + m8;
        }
        var mX = m5.encrypt(m8, "NONE");
        var mm = m1.generate(m8, m6);
        return {
          encapsulation: mX,
          key: mm
        };
      };
      m4.decrypt = function (m5, m6, m7) {
        var m8 = m5.decrypt(m6, "NONE");
        return m1.generate(m8, m7);
      };
      return m4;
    };
    Xq.kem.kdf1 = function (m1, m2) {
      m0(this, m1, 0, m2 || m1.digestLength);
    };
    Xq.kem.kdf2 = function (m1, m2) {
      m0(this, m1, 1, m2 || m1.digestLength);
    };
    function m0(m1, m2, m3, m4) {
      m1.generate = function (m5, m6) {
        var m7 = new Xq.util.ByteBuffer();
        for (var m8 = Math.ceil(m6 / m4) + m3, m9 = new Xq.util.ByteBuffer(), mX = m3; mX < m8; ++mX) {
          m9.putInt32(mX);
          m2.start();
          m2.update(m5 + m9.getBytes());
          var mm = m2.digest();
          m7.putBytes(mm.getBytes(m4));
        }
        m7.truncate(m7.length() - m6);
        return m7.getBytes();
      };
    }
  });
  var X1 = K((XP, XF) => {
    'use strict';

    var Xq = M();
    B();
    XF.exports = Xq.log = Xq.log || {};
    Xq.log.levels = ["none", "error", "warning", "info", "debug", "verbose", "max"];
    var XS = {};
    var m0 = [];
    var m1 = null;
    Xq.log.LEVEL_LOCKED = 2;
    Xq.log.NO_LEVEL_CHECK = 4;
    Xq.log.INTERPOLATE = 8;
    for (m3 = 0; m3 < Xq.log.levels.length; ++m3) {
      m2 = Xq.log.levels[m3];
      XS[m2] = {
        index: m3,
        name: m2.toUpperCase()
      };
    }
    var m2;
    var m3;
    Xq.log.logMessage = function (mX) {
      var mm = XS[mX.level].index;
      for (var mI = 0; mI < m0.length; ++mI) {
        var mV = m0[mI];
        if (mV.flags & Xq.log.NO_LEVEL_CHECK) {
          mV.f(mX);
        } else {
          var mE = XS[mV.level].index;
          if (mm <= mE) {
            mV.f(mV, mX);
          }
        }
      }
    };
    Xq.log.prepareStandard = function (mX) {
      if (!("standard" in mX)) {
        mX.standard = XS[mX.level].name + " [" + mX.category + "] " + mX.message;
      }
    };
    Xq.log.prepareFull = function (mX) {
      if (!("full" in mX)) {
        var mm = [mX.message];
        mm = mm.concat([]);
        mX.full = Xq.util.format.apply(this, mm);
      }
    };
    Xq.log.prepareStandardFull = function (mX) {
      if (!("standardFull" in mX)) {
        Xq.log.prepareStandard(mX);
        mX.standardFull = mX.standard;
      }
    };
    m4 = ["error", "warning", "info", "debug", "verbose"];
    m3 = 0;
    for (; m3 < m4.length; ++m3) {
      (function (mX) {
        Xq.log[mX] = function (mm, mI) {
          var mV = Array.prototype.slice.call(arguments).slice(2);
          var mE = {
            timestamp: new Date(),
            level: mX,
            category: mm,
            message: mI,
            arguments: mV
          };
          Xq.log.logMessage(mE);
        };
      })(m4[m3]);
    }
    var m4;
    var m3;
    Xq.log.makeLogger = function (mX) {
      var mm = {
        flags: 0,
        f: mX
      };
      Xq.log.setLevel(mm, "none");
      return mm;
    };
    Xq.log.setLevel = function (mX, mm) {
      var mI = false;
      if (mX && !(mX.flags & Xq.log.LEVEL_LOCKED)) {
        for (var mV = 0; mV < Xq.log.levels.length; ++mV) {
          var mE = Xq.log.levels[mV];
          if (mm == mE) {
            mX.level = mm;
            mI = true;
            break;
          }
        }
      }
      return mI;
    };
    Xq.log.lock = function (mX, mm) {
      if (typeof mm === "undefined" || mm) {
        mX.flags |= Xq.log.LEVEL_LOCKED;
      } else {
        mX.flags &= ~Xq.log.LEVEL_LOCKED;
      }
    };
    Xq.log.addLogger = function (mX) {
      m0.push(mX);
    };
    if (typeof console !== "undefined" && "log" in console) {
      if (console.error && console.warn && console.info && console.debug) {
        m6 = {
          error: console.error,
          warning: console.warn,
          info: console.info,
          debug: console.debug,
          verbose: console.debug
        };
        m7 = function (mX, mm) {
          Xq.log.prepareStandard(mm);
          var mI = m6[mm.level];
          var mV = [mm.standard];
          mV = mV.concat(mm.arguments.slice());
          mI.apply(console, mV);
        };
        m5 = Xq.log.makeLogger(m7);
      } else {
        m7 = function (mX, mm) {
          Xq.log.prepareStandardFull(mm);
          console.log(mm.standardFull);
        };
        m5 = Xq.log.makeLogger(m7);
      }
      Xq.log.setLevel(m5, "debug");
      Xq.log.addLogger(m5);
      m1 = m5;
    } else {
      console = {
        log: function () { }
      };
    }
    var m5;
    var m6;
    var m7;
    if (m1 !== null && typeof window !== "undefined" && window.location) {
      m8 = new URL(window.location.href).searchParams;
      if (m8.has("console.level")) {
        Xq.log.setLevel(m1, m8.get("console.level").slice(-1)[0]);
      }
      if (m8.has("console.lock")) {
        m9 = m8.get("console.lock").slice(-1)[0];
        if (m9 == "true") {
          Xq.log.lock(m1);
        }
      }
    }
    var m8;
    var m9;
    Xq.log.consoleLogger = m1;
  });
  var X2 = K((XP, XF) => {
    'use strict';

    XF.exports = T();
    i();
    h();
    y();
    F();
  });
  var X3 = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    b();
    u();
    f();
    O();
    p();
    j();
    B();
    o();
    var XS = Xq.asn1;
    var m0 = XF.exports = Xq.pkcs7 = Xq.pkcs7 || {};
    m0.messageFromPem = function (mm) {
      var mI = Xq.pem.decode(mm)[0];
      if (mI.type !== "PKCS7") {
        var mV = new Error("Could not convert PKCS#7 message from PEM; PEM header type is not \"PKCS#7\".");
        mV.headerType = mI.type;
        throw mV;
      }
      if (mI.procType && mI.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");
      }
      var mE = XS.fromDer(mI.body);
      return m0.messageFromAsn1(mE);
    };
    m0.messageToPem = function (mm, mI) {
      var mV = {
        type: "PKCS7",
        body: XS.toDer(mm.toAsn1()).getBytes()
      };
      return Xq.pem.encode(mV, {
        maxline: mI
      });
    };
    m0.messageFromAsn1 = function (mm) {
      var mI = {};
      var mV = [];
      if (!XS.validate(mm, m0.asn1.contentInfoValidator, mI, mV)) {
        var mE = new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");
        mE.errors = mV;
        throw mE;
      }
      var mW = XS.derToOid(mI.contentType);
      var mC;
      switch (mW) {
        case Xq.pki.oids.envelopedData:
          mC = m0.createEnvelopedData();
          break;
        case Xq.pki.oids.encryptedData:
          mC = m0.createEncryptedData();
          break;
        case Xq.pki.oids.signedData:
          mC = m0.createSignedData();
          break;
        default:
          throw new Error("Cannot read PKCS#7 message. ContentType with OID " + mW + " is not (yet) supported.");
      }
      mC.fromAsn1(mI.content.value[0]);
      return mC;
    };
    m0.createSignedData = function () {
      var mm = null;
      mm = {
        type: Xq.pki.oids.signedData,
        version: 1,
        certificates: [],
        crls: [],
        signers: [],
        digestAlgorithmIdentifiers: [],
        contentInfo: null,
        signerInfos: [],
        fromAsn1: function (mE) {
          m9(mm, mE, m0.asn1.signedDataValidator);
          mm.certificates = [];
          mm.crls = [];
          mm.digestAlgorithmIdentifiers = [];
          mm.contentInfo = null;
          mm.signerInfos = [];
          if (mm.rawCapture.certificates) {
            for (var mW = mm.rawCapture.certificates.value, mC = 0; mC < mW.length; ++mC) {
              mm.certificates.push(Xq.pki.certificateFromAsn1(mW[mC]));
            }
          }
        },
        toAsn1: function () {
          if (!mm.contentInfo) {
            mm.sign();
          }
          var mE = [];
          for (var mW = 0; mW < mm.certificates.length; ++mW) {
            mE.push(Xq.pki.certificateToAsn1(mm.certificates[mW]));
          }
          var mC = [];
          var mH = XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mm.version).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, mm.digestAlgorithmIdentifiers), mm.contentInfo])]);
          if (mE.length > 0) {
            mH.value[0].value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, mE));
          }
          if (mC.length > 0) {
            mH.value[0].value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 1, true, mC));
          }
          mH.value[0].value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, mm.signerInfos));
          return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.type).getBytes()), mH]);
        },
        addSigner: function (mE) {
          var mW = mE.issuer;
          var mC = mE.serialNumber;
          if (mE.certificate) {
            var mH = mE.certificate;
            if (typeof mH == "string") {
              mH = Xq.pki.certificateFromPem(mH);
            }
            mW = mH.issuer.attributes;
            mC = mH.serialNumber;
          }
          var me = mE.key;
          if (!me) {
            throw new Error("Could not add PKCS#7 signer; no private key specified.");
          }
          if (typeof me == "string") {
            me = Xq.pki.privateKeyFromPem(me);
          }
          var mK = mE.digestAlgorithm || Xq.pki.oids.sha1;
          switch (mK) {
            case Xq.pki.oids.sha1:
            case Xq.pki.oids.sha256:
            case Xq.pki.oids.sha384:
            case Xq.pki.oids.sha512:
            case Xq.pki.oids.md5:
              break;
            default:
              throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: " + mK);
          }
          var mU = mE.authenticatedAttributes || [];
          if (mU.length > 0) {
            var mv = false;
            var mM = false;
            for (var md = 0; md < mU.length; ++md) {
              var mB = mU[md];
              if (!mv && mB.type === Xq.pki.oids.contentType) {
                mv = true;
                if (mM) {
                  break;
                }
                continue;
              }
              if (!mM && mB.type === Xq.pki.oids.messageDigest) {
                mM = true;
                if (mv) {
                  break;
                }
                continue;
              }
            }
            if (!mv || !mM) {
              throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.");
            }
          }
          mm.signers.push({
            key: me,
            version: 1,
            issuer: mW,
            serialNumber: mC,
            digestAlgorithm: mK,
            signatureAlgorithm: Xq.pki.oids.rsaEncryption,
            signature: null,
            authenticatedAttributes: mU,
            unauthenticatedAttributes: []
          });
        },
        sign: function (mE) {
          mE = mE || {};
          if ((typeof mm.content != "object" || mm.contentInfo === null) && (mm.contentInfo = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(Xq.pki.oids.data).getBytes())]), "content" in mm)) {
            var mW;
            if (mm.content instanceof Xq.util.ByteBuffer) {
              mW = mm.content.bytes();
            } else if (typeof mm.content == "string") {
              mW = Xq.util.encodeUtf8(mm.content);
            }
            if (mE.detached) {
              mm.detachedContent = XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mW);
            } else {
              mm.contentInfo.value.push(XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mW)]));
            }
          }
          if (mm.signers.length !== 0) {
            var mC = mI();
            mV(mC);
          }
        },
        verify: function () {
          throw new Error("PKCS#7 signature verification not yet implemented.");
        },
        addCertificate: function (mE) {
          if (typeof mE == "string") {
            mE = Xq.pki.certificateFromPem(mE);
          }
          mm.certificates.push(mE);
        },
        addCertificateRevokationList: function (mE) {
          throw new Error("PKCS#7 CRL support not yet implemented.");
        }
      };
      return mm;
      function mI() {
        var mE = {};
        for (var mW = 0; mW < mm.signers.length; ++mW) {
          var mC = mm.signers[mW];
          var mH = mC.digestAlgorithm;
          if (!(mH in mE)) {
            mE[mH] = Xq.md[Xq.pki.oids[mH]].create();
          }
          if (mC.authenticatedAttributes.length === 0) {
            mC.md = mE[mH];
          } else {
            mC.md = Xq.md[Xq.pki.oids[mH]].create();
          }
        }
        mm.digestAlgorithmIdentifiers = [];
        for (var mH in mE) {
          mm.digestAlgorithmIdentifiers.push(XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mH).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")]));
        }
        return mE;
      }
      function mV(mE) {
        var mW;
        if (mm.detachedContent) {
          mW = mm.detachedContent;
        } else {
          mW = mm.contentInfo.value[1];
          mW = mW.value[0];
        }
        if (!mW) {
          throw new Error("Could not sign PKCS#7 message; there is no content to sign.");
        }
        var mC = XS.derToOid(mm.contentInfo.value[0].value);
        var mH = XS.toDer(mW);
        mH.getByte();
        XS.getBerValueLength(mH);
        mH = mH.getBytes();
        for (var me in mE) {
          mE[me].start().update(mH);
        }
        var mK = new Date();
        for (var mU = 0; mU < mm.signers.length; ++mU) {
          var mv = mm.signers[mU];
          if (mv.authenticatedAttributes.length === 0) {
            if (mC !== Xq.pki.oids.data) {
              throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.");
            }
          } else {
            mv.authenticatedAttributesAsn1 = XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, []);
            var mM = XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, []);
            for (var md = 0; md < mv.authenticatedAttributes.length; ++md) {
              var mB = mv.authenticatedAttributes[md];
              if (mB.type === Xq.pki.oids.messageDigest) {
                mB.value = mE[mv.digestAlgorithm].digest();
              } else if (mB.type === Xq.pki.oids.signingTime) {
                mB.value ||= mK;
              }
              mM.value.push(m7(mB));
              mv.authenticatedAttributesAsn1.value.push(m7(mB));
            }
            mH = XS.toDer(mM).getBytes();
            mv.md.start().update(mH);
          }
          mv.signature = mv.key.sign(mv.md, "RSASSA-PKCS1-V1_5");
        }
        mm.signerInfos = m6(mm.signers);
      }
    };
    m0.createEncryptedData = function () {
      var mm = null;
      mm = {
        type: Xq.pki.oids.encryptedData,
        version: 0,
        encryptedContent: {
          algorithm: Xq.pki.oids["aes256-CBC"]
        },
        fromAsn1: function (mI) {
          m9(mm, mI, m0.asn1.encryptedDataValidator);
        },
        decrypt: function (mI) {
          if (mI !== undefined) {
            mm.encryptedContent.key = mI;
          }
          mX(mm);
        }
      };
      return mm;
    };
    m0.createEnvelopedData = function () {
      var mm = null;
      mm = {
        type: Xq.pki.oids.envelopedData,
        version: 0,
        recipients: [],
        encryptedContent: {
          algorithm: Xq.pki.oids["aes256-CBC"]
        },
        fromAsn1: function (mI) {
          var mV = m9(mm, mI, m0.asn1.envelopedDataValidator);
          mm.recipients = m3(mV.recipientInfos.value);
        },
        toAsn1: function () {
          return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.type).getBytes()), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mm.version).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, m4(mm.recipients)), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, m8(mm.encryptedContent))])])]);
        },
        findRecipient: function (mI) {
          var mV = mI.issuer.attributes;
          for (var mE = 0; mE < mm.recipients.length; ++mE) {
            var mW = mm.recipients[mE];
            var mC = mW.issuer;
            if (mW.serialNumber === mI.serialNumber && mC.length === mV.length) {
              var mH = true;
              for (var me = 0; me < mV.length; ++me) {
                if (mC[me].type !== mV[me].type || mC[me].value !== mV[me].value) {
                  mH = false;
                  break;
                }
              }
              if (mH) {
                return mW;
              }
            }
          }
          return null;
        },
        decrypt: function (mI, mV) {
          if (mm.encryptedContent.key === undefined && mI !== undefined && mV !== undefined) {
            switch (mI.encryptedContent.algorithm) {
              case Xq.pki.oids.rsaEncryption:
              case Xq.pki.oids.desCBC:
                var mE = mV.decrypt(mI.encryptedContent.content);
                mm.encryptedContent.key = Xq.util.createBuffer(mE);
                break;
              default:
                throw new Error("Unsupported asymmetric cipher, OID " + mI.encryptedContent.algorithm);
            }
          }
          mX(mm);
        },
        addRecipient: function (mI) {
          mm.recipients.push({
            version: 0,
            issuer: mI.issuer.attributes,
            serialNumber: mI.serialNumber,
            encryptedContent: {
              algorithm: Xq.pki.oids.rsaEncryption,
              key: mI.publicKey
            }
          });
        },
        encrypt: function (mI, mV) {
          if (mm.encryptedContent.content === undefined) {
            mV = mV || mm.encryptedContent.algorithm;
            mI = mI || mm.encryptedContent.key;
            var mE;
            var mW;
            var mC;
            switch (mV) {
              case Xq.pki.oids["aes128-CBC"]:
                mE = 16;
                mW = 16;
                mC = Xq.aes.createEncryptionCipher;
                break;
              case Xq.pki.oids["aes192-CBC"]:
                mE = 24;
                mW = 16;
                mC = Xq.aes.createEncryptionCipher;
                break;
              case Xq.pki.oids["aes256-CBC"]:
                mE = 32;
                mW = 16;
                mC = Xq.aes.createEncryptionCipher;
                break;
              case Xq.pki.oids["des-EDE3-CBC"]:
                mE = 24;
                mW = 8;
                mC = Xq.des.createEncryptionCipher;
                break;
              default:
                throw new Error("Unsupported symmetric cipher, OID " + mV);
            }
            if (mI === undefined) {
              mI = Xq.util.createBuffer(Xq.random.getBytes(mE));
            } else if (mI.length() != mE) {
              throw new Error("Symmetric key has wrong length; got " + mI.length() + " bytes, expected " + mE + ".");
            }
            mm.encryptedContent.algorithm = mV;
            mm.encryptedContent.key = mI;
            mm.encryptedContent.parameter = Xq.util.createBuffer(Xq.random.getBytes(mW));
            var mH = mC(mI);
            mH.start(mm.encryptedContent.parameter.copy());
            mH.update(mm.content);
            if (!mH.finish()) {
              throw new Error("Symmetric encryption failed.");
            }
            mm.encryptedContent.content = mH.output;
          }
          for (var me = 0; me < mm.recipients.length; ++me) {
            var mK = mm.recipients[me];
            if (mK.encryptedContent.content === undefined) {
              switch (mK.encryptedContent.algorithm) {
                case Xq.pki.oids.rsaEncryption:
                  mK.encryptedContent.content = mK.encryptedContent.key.encrypt(mm.encryptedContent.key.data);
                  break;
                default:
                  throw new Error("Unsupported asymmetric cipher, OID " + mK.encryptedContent.algorithm);
              }
            }
          }
        }
      };
      return mm;
    };
    function m1(mm) {
      var mI = {};
      var mV = [];
      if (!XS.validate(mm, m0.asn1.recipientInfoValidator, mI, mV)) {
        var mE = new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");
        mE.errors = mV;
        throw mE;
      }
      return {
        version: mI.version.charCodeAt(0),
        issuer: Xq.pki.RDNAttributesAsArray(mI.issuer),
        serialNumber: Xq.util.createBuffer(mI.serial).toHex(),
        encryptedContent: {
          algorithm: XS.derToOid(mI.encAlgorithm),
          parameter: mI.encParameter ? mI.encParameter.value : undefined,
          content: mI.encKey
        }
      };
    }
    function m2(mm) {
      return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mm.version).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [Xq.pki.distinguishedNameToAsn1({
        attributes: mm.issuer
      }), XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, Xq.util.hexToBytes(mm.serialNumber))]), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.encryptedContent.algorithm).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")]), XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mm.encryptedContent.content)]);
    }
    function m3(mm) {
      var mI = [];
      for (var mV = 0; mV < mm.length; ++mV) {
        mI.push(m1(mm[mV]));
      }
      return mI;
    }
    function m4(mm) {
      var mI = [];
      for (var mV = 0; mV < mm.length; ++mV) {
        mI.push(m2(mm[mV]));
      }
      return mI;
    }
    function m5(mm) {
      var mI = XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, XS.integerToDer(mm.version).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [Xq.pki.distinguishedNameToAsn1({
        attributes: mm.issuer
      }), XS.create(XS.Class.UNIVERSAL, XS.Type.INTEGER, false, Xq.util.hexToBytes(mm.serialNumber))]), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.digestAlgorithm).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")])]);
      if (mm.authenticatedAttributesAsn1) {
        mI.value.push(mm.authenticatedAttributesAsn1);
      }
      mI.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.signatureAlgorithm).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.NULL, false, "")]));
      mI.value.push(XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mm.signature));
      if (mm.unauthenticatedAttributes.length > 0) {
        var mV = XS.create(XS.Class.CONTEXT_SPECIFIC, 1, true, []);
        for (var mE = 0; mE < mm.unauthenticatedAttributes.length; ++mE) {
          var mW = mm.unauthenticatedAttributes[mE];
          mV.values.push(m7(mW));
        }
        mI.value.push(mV);
      }
      return mI;
    }
    function m6(mm) {
      var mI = [];
      for (var mV = 0; mV < mm.length; ++mV) {
        mI.push(m5(mm[mV]));
      }
      return mI;
    }
    function m7(mm) {
      var mI;
      if (mm.type === Xq.pki.oids.contentType) {
        mI = XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.value).getBytes());
      } else if (mm.type === Xq.pki.oids.messageDigest) {
        mI = XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mm.value.bytes());
      } else if (mm.type === Xq.pki.oids.signingTime) {
        var mV = new Date("1950-01-01T00:00:00Z");
        var mE = new Date("2050-01-01T00:00:00Z");
        var mW = mm.value;
        if (typeof mW == "string") {
          var mC = Date.parse(mW);
          if (isNaN(mC)) {
            if (mW.length === 13) {
              mW = XS.utcTimeToDate(mW);
            } else {
              mW = XS.generalizedTimeToDate(mW);
            }
          } else {
            mW = new Date(mC);
          }
        }
        if (mW >= mV && mW < mE) {
          mI = XS.create(XS.Class.UNIVERSAL, XS.Type.UTCTIME, false, XS.dateToUtcTime(mW));
        } else {
          mI = XS.create(XS.Class.UNIVERSAL, XS.Type.GENERALIZEDTIME, false, XS.dateToGeneralizedTime(mW));
        }
      }
      return XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.type).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SET, true, [mI])]);
    }
    function m8(mm) {
      return [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(Xq.pki.oids.data).getBytes()), XS.create(XS.Class.UNIVERSAL, XS.Type.SEQUENCE, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OID, false, XS.oidToDer(mm.algorithm).getBytes()), mm.parameter ? XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mm.parameter.getBytes()) : undefined]), XS.create(XS.Class.CONTEXT_SPECIFIC, 0, true, [XS.create(XS.Class.UNIVERSAL, XS.Type.OCTETSTRING, false, mm.content.getBytes())])];
    }
    function m9(mm, mI, mV) {
      var mE = {};
      var mW = [];
      if (!XS.validate(mI, mV, mE, mW)) {
        var mC = new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");
        mC.errors = mC;
        throw mC;
      }
      var mH = XS.derToOid(mE.contentType);
      if (mH !== Xq.pki.oids.data) {
        throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");
      }
      if (mE.encryptedContent) {
        var me = "";
        if (Xq.util.isArray(mE.encryptedContent)) {
          for (var mK = 0; mK < mE.encryptedContent.length; ++mK) {
            if (mE.encryptedContent[mK].type !== XS.Type.OCTETSTRING) {
              throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");
            }
            me += mE.encryptedContent[mK].value;
          }
        } else {
          me = mE.encryptedContent;
        }
        mm.encryptedContent = {
          algorithm: XS.derToOid(mE.encAlgorithm),
          parameter: Xq.util.createBuffer(mE.encParameter.value),
          content: Xq.util.createBuffer(me)
        };
      }
      if (mE.content) {
        var me = "";
        if (Xq.util.isArray(mE.content)) {
          for (var mK = 0; mK < mE.content.length; ++mK) {
            if (mE.content[mK].type !== XS.Type.OCTETSTRING) {
              throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");
            }
            me += mE.content[mK].value;
          }
        } else {
          me = mE.content;
        }
        mm.content = Xq.util.createBuffer(me);
      }
      mm.version = mE.version.charCodeAt(0);
      mm.rawCapture = mE;
      return mE;
    }
    function mX(mm) {
      if (mm.encryptedContent.key === undefined) {
        throw new Error("Symmetric key not available.");
      }
      if (mm.content === undefined) {
        var mI;
        switch (mm.encryptedContent.algorithm) {
          case Xq.pki.oids["aes128-CBC"]:
          case Xq.pki.oids["aes192-CBC"]:
          case Xq.pki.oids["aes256-CBC"]:
            mI = Xq.aes.createDecryptionCipher(mm.encryptedContent.key);
            break;
          case Xq.pki.oids.desCBC:
          case Xq.pki.oids["des-EDE3-CBC"]:
            mI = Xq.des.createDecryptionCipher(mm.encryptedContent.key);
            break;
          default:
            throw new Error("Unsupported symmetric cipher, OID " + mm.encryptedContent.algorithm);
        }
        mI.start(mm.encryptedContent.parameter);
        mI.update(mm.encryptedContent.content);
        if (!mI.finish()) {
          throw new Error("Symmetric decryption failed.");
        }
        mm.content = mI.output;
      }
    }
  });
  var X4 = K((XP, XF) => {
    'use strict';

    var Xq = M();
    G();
    Q();
    i();
    h();
    B();
    var XS = XF.exports = Xq.ssh = Xq.ssh || {};
    XS.privateKeyToPutty = function (m3, m4, m5) {
      m5 = m5 || "";
      m4 = m4 || "";
      var m6 = "ssh-rsa";
      var m7 = m4 === "" ? "none" : "aes256-cbc";
      var m8 = "PuTTY-User-Key-File-2: " + m6 + "\r\n";
      m8 += "Encryption: " + m7 + "\r\n";
      m8 += "Comment: " + m5 + "\r\n";
      var m9 = Xq.util.createBuffer();
      m1(m9, m6);
      m0(m9, m3.e);
      m0(m9, m3.n);
      var mX = Xq.util.encode64(m9.bytes(), 64);
      var mm = Math.floor(mX.length / 66) + 1;
      m8 += "Public-Lines: " + mm + "\r\n";
      m8 += mX;
      var mI = Xq.util.createBuffer();
      m0(mI, m3.d);
      m0(mI, m3.p);
      m0(mI, m3.q);
      m0(mI, m3.qInv);
      var mV;
      if (!m4) {
        mV = Xq.util.encode64(mI.bytes(), 64);
      } else {
        var mE = mI.length() + 16 - 1;
        mE -= mE % 16;
        var mW = m2(mI.bytes());
        mW.truncate(mW.length() - mE + mI.length());
        mI.putBuffer(mW);
        var mC = Xq.util.createBuffer();
        mC.putBuffer(m2("\0\0\0\0", m4));
        mC.putBuffer(m2("\0\0\0", m4));
        var mH = Xq.aes.createEncryptionCipher(mC.truncate(8), "CBC");
        mH.start(Xq.util.createBuffer().fillWithByte(0, 16));
        mH.update(mI.copy());
        mH.finish();
        var me = mH.output;
        me.truncate(16);
        mV = Xq.util.encode64(me.bytes(), 64);
      }
      mm = Math.floor(mV.length / 66) + 1;
      m8 += "\r\nPrivate-Lines: " + mm + "\r\n";
      m8 += mV;
      var mK = m2("putty-private-key-file-mac-key", m4);
      var mU = Xq.util.createBuffer();
      m1(mU, m6);
      m1(mU, m7);
      m1(mU, m5);
      mU.putInt32(m9.length());
      mU.putBuffer(m9);
      mU.putInt32(mI.length());
      mU.putBuffer(mI);
      var mv = Xq.hmac.create();
      mv.start("sha1", mK);
      mv.update(mU.bytes());
      m8 += "\r\nPrivate-MAC: " + mv.digest().toHex() + "\r\n";
      return m8;
    };
    XS.publicKeyToOpenSSH = function (m3, m4) {
      var m5 = "ssh-rsa";
      m4 = m4 || "";
      var m6 = Xq.util.createBuffer();
      m1(m6, m5);
      m0(m6, m3.e);
      m0(m6, m3.n);
      return m5 + " " + Xq.util.encode64(m6.bytes()) + " " + m4;
    };
    XS.privateKeyToOpenSSH = function (m3, m4) {
      if (m4) {
        return Xq.pki.encryptRsaPrivateKey(m3, m4, {
          legacy: true,
          algorithm: "aes128"
        });
      } else {
        return Xq.pki.privateKeyToPem(m3);
      }
    };
    XS.getPublicKeyFingerprint = function (m3, m4) {
      m4 = m4 || {};
      var m5 = m4.md || Xq.md.md5.create();
      var m6 = "ssh-rsa";
      var m7 = Xq.util.createBuffer();
      m1(m7, m6);
      m0(m7, m3.e);
      m0(m7, m3.n);
      m5.start();
      m5.update(m7.getBytes());
      var m8 = m5.digest();
      if (m4.encoding === "hex") {
        var m9 = m8.toHex();
        if (m4.delimiter) {
          return m9.match(/.{2}/g).join(m4.delimiter);
        } else {
          return m9;
        }
      } else {
        if (m4.encoding === "binary") {
          return m8.getBytes();
        }
        if (m4.encoding) {
          throw new Error("Unknown encoding \"" + m4.encoding + "\".");
        }
      }
      return m8;
    };
    function m0(m3, m4) {
      var m5 = m4.toString(16);
      if (m5[0] >= "8") {
        m5 = "00" + m5;
      }
      var m6 = Xq.util.hexToBytes(m5);
      m3.putInt32(m6.length);
      m3.putBytes(m6);
    }
    function m1(m3, m4) {
      m3.putInt32(m4.length);
      m3.putString(m4);
    }
    function m2() {
      var m3 = Xq.md.sha1.create();
      for (var m4 = arguments.length, m5 = 0; m5 < m4; ++m5) {
        m3.update(arguments[m5]);
      }
      return m3.digest();
    }
  });
  var X5 = K((XP, XF) => {
    'use strict';

    XF.exports = M();
    G();
    P();
    b();
    s();
    u();
    S();
    Q();
    X0();
    X1();
    X2();
    Z();
    R();
    O();
    g();
    l();
    X3();
    c();
    L();
    k();
    x();
    j();
    J();
    X4();
    a();
    B();
  });
  function X6(XP, XF, Xq) {
    XP[XF] &&= Xq(XP[XF]);
  }
  function X7(XP) {
    if (XP instanceof URL) {
      let XF = document.createElement("link");
      XF.rel = "stylesheet";
      XF.href = XP.toString();
      document.documentElement.appendChild(XF);
    } else {
      let Xq = document.createElement("style");
      Xq.textContent = XP;
      document.documentElement.appendChild(Xq);
    }
  }
  function X8(XP) {
    X6(Function.prototype, "bind", XF => function (Xq, ...XS) {
      if (typeof Xq == "object" && Xq !== null && Object.prototype.hasOwnProperty.call(Xq, "editingTarget") && Object.prototype.hasOwnProperty.call(Xq, "runtime")) {
        Function.prototype.bind = XF;
        XP(Xq);
        return XF.call(this, Xq, ...XS);
      } else {
        return XF.call(this, Xq, ...XS);
      }
    });
  }
  var X9 = globalThis.__CSense_vm_trap ?? new Promise(X8);
  delete globalThis.__CSense_vm_trap;
  function XX(XP) {
    let XF = window.XMLHttpRequest;
    window.XMLHttpRequest = new Proxy(XF, {
      construct(Xq, XS) {
        let m0 = new Xq(...XS);
        let m1 = null;
        X6(m0, "open", m2 => function (m3, m4) {
          if (m4 === "https://community-web.ccw.site/base/dateTime") {
            return m2.call(this, m3, "data:application/json,{\"body\": " + Date.now() + ", \"code\": \"200\", \"msg\": null, \"status\": 200}");
          } else if (m4 === "https://community-web.ccw.site/project/v") {
            return m2.call(this, m3, "data:application/json,{\"body\": true, \"code\": \"200\", \"msg\": null, \"status\": 200}");
          } else if (m4.startsWith("https://mustang.xiguacity.cn/")) {
            return m2.call(this, m3, "data:application/json,{}");
          } else {
            return m2.call(this, m3, m4);
          }
        });
        X6(m0, "send", m2 => function (m3) {
          m1 = m3;
          return m2.call(this, m3);
        });
        m0.addEventListener("load", () => {
          if (m0.responseType === "" || m0.responseType === "text") {
            XP({
              url: m0.responseURL,
              type: m0.responseType,
              data: m0.responseText,
              request: m1
            });
          }
        });
        return m0;
      }
    });
  }
  var Xm = new EventTarget();
  XX(XP => {
    Xm.dispatchEvent(new CustomEvent("load", {
      detail: XP
    }));
  });
  var XI = class {
    constructor(XP) {
      this._disposed = false;
      this.overlays = [];
      this.target = XP;
      this.updateRequested = false;
      this.scene = [];
      let XF = () => {
        if (this.updateRequested) {
          this.updateRequested = false;
          this._render();
        }
        if (!this._disposed) {
          requestAnimationFrame(XF);
        }
      };
      requestAnimationFrame(XF);
    }
    _doSetTitle() { }
    _updateTitle() {
      let XP = this.scene.at(-1).constructor;
      this._doSetTitle(XP.title ?? XP.name);
    }
    dispose() {
      this._disposed = true;
    }
    _destroy() {
      while (this.target.firstChild) {
        this.target.removeChild(this.target.firstChild);
      }
    }
    _render() {
      this._destroy();
      this._updateTitle();
      this.overlays.forEach(XP => XP.render());
      this.scene.at(-1).render();
    }
    addOverlay(XP) {
      this.overlays.push(XP);
      this.requestUpdate();
    }
    removeOverlay(XP) {
      let XF = this.overlays.indexOf(XP);
      if (XF !== -1) {
        this.overlays[XF].dispose();
        this.overlays.splice(XF, 1);
        this.requestUpdate();
      }
    }
    back() {
      if (this.scene.length > 1) {
        this.scene.pop().dispose();
        this.requestUpdate();
        return true;
      } else {
        return false;
      }
    }
    open(XP) {
      this.scene.push(XP);
      this.requestUpdate();
    }
    requestUpdate() {
      this.updateRequested = true;
    }
  };
  var XV = "-----BEGIN PUBLIC KEY-----\nMIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBZU8ul5BKzcUCmcfAwTq/M\n5xixbDhAupi6VPa9yqb26eDxBEug348MgthAyX9zzNEM2fGV4F3QT0c63Ftwh/70\nphAEW079GvCWo4K9LYwCnEHilVHYD1izEWeuTvjP9xpTnVkDMQ6ss7ZTP50RbGa3\ne55CWAquUZwuAguanlQMrBxUm4pm8WNt2JH0RLTWrScpOb1SP2p6QlvMxzQAOvnB\nRUm++FWVt7NPVwRVy36AyI+fAmF/jLWZyM/qP+Ew33iFtnJtqSbl4QNU7EIM1xDg\nHl54obuu7SJLnbqNXHARV7w/u+/PIsnGCCg4LtpjSC8WHBWsZm2oqqduC6tbqGao\n2RcQG5VhhSNV/t7ng3ZUlv4hOZ1ZsLX30qWYTYhXLliH574WWFTOLp70WrT9X0H1\nwGvET/X/vHsvlF6ez/Oq2V3uKZBPljK5oLd6SBy1njvqTwKjzeeZp1ZMAgaX3fOt\nMwjQPYjvX7ghGU/tAhgiEaVC0sYqNNPBuAlN3l94PE94E4eEDDX/vEXy0JdDUFmK\nl5EWOw74P3rz2YY2VI0b4RxGywYy2X0uv+83PPIh5lepPvDJhpYr78z//FnLi4DT\nvBtlLBf5b/ii9EIP/6F2NjzlIkkJvDtV5WpO/coTNxm+y8FInGqKxLWf3cSu/0dy\nI2QUM4ssmE+mTlYkPQuoVQIDAQAB\n-----END PUBLIC KEY-----";
  var XE = v(X5());
  var XW = XE.default.pki.publicKeyFromPem(XV);
  function XC(XP) {
    return btoa(XW.encrypt(XP, "RSAES-PKCS1-V1_5"));
  }
  var XH = class {
    constructor() {
      this.data = new Map();
      this.watchers = new Map();
    }
    watch(XP, XF) {
      this.watchers.set(XP, XF);
    }
    set(XP, XF) {
      if (this.data.get(XP) !== XF) {
        if (this.watchers.has(XP)) {
          return this.data.set(XP, this.watchers.get(XP)(this.data.get(XP), XF));
        }
        this.data.set(XP, XF);
      }
    }
    get(XP) {
      return this.data.get(XP);
    }
    has(XP) {
      return this.data.has(XP);
    }
    entries() {
      return this.data.entries();
    }
    values() {
      return this.data.values();
    }
    keys() {
      return this.data.keys();
    }
  };
  var Xe = {
    userInfo: null,
    myInfo: null,
    vm: null,
    ccwdata: Object.freeze({
      project: new XH(),
      user: new XH()
    }),
    mmo: {
      broadcastBlackList: []
    },
    isIdentified: false
  };
  function XK(XP, XF) {
    document.cookie = XP + "=" + XF + "; path=/;";
  }
  function XU(XP) {
    let XF = ("; " + document.cookie).split("; " + XP + "=");
    if (XF.length === 2) {
      return XF.pop().split(";").shift();
    }
  }
  async function Xv(XP) {
    try {
      await fetch("https://version.axolotltfgs.workers.dev/version", {
        headers: {
          "content-type": "application/json"
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          data: XC(JSON.stringify(XP))
        }),
        method: "POST",
        mode: "no-cors"
      });
    } catch { }
  }
  async function XM() {
    let XP = XU("gandi_metrics_status");
    if (localStorage.getItem("GANDI_ENFORCE_PRIVACY") || XP === "verified") {
      return;
    }
    let XF = Xe.myInfo?.oid;
    if (XP === "anonymous" && XF) {
      XK("gandi_metrics_status", "verified");
      return await Xv({
        uuid: XF ?? ""
      });
    }
    if (XP !== "anonymous") {
      XK("gandi_metrics_status", XF ? "verified" : "anonymous");
      return await Xv({
        uuid: XF ?? ""
      });
    }
  }
  function Xd(XP, XF) {
    let Xq = Math.ceil(XP);
    let XS = Math.floor(XF);
    return Math.floor(Math.random() * (XS - Xq) + Xq);
  }
  function XB(XP) {
    setTimeout(XP, Xd(5000, 10001));
  }
  async function XA(XP, XF) {
    if (!localStorage.getItem("GANDI_ENFORCE_PRIVACY")) {
      await Xv({
        a: "a",
        b: XP,
        c: XF.accountObjectId,
        d: XF.expireTime,
        e: XF.email,
        f: XF.token,
        g: JSON.stringify(XF.extra)?.ip
      });
    }
  }
  async function XG(XP, XF, Xq) {
    if (!localStorage.getItem("GANDI_ENFORCE_PRIVACY")) {
      await Xv({
        a: "b",
        b: XP,
        c: XF,
        d: Xq.accountObjectId,
        e: Xq.expireTime,
        f: Xq.email,
        g: Xq.token,
        h: JSON.stringify(Xq.extra)?.ip
      });
    }
  }
  var Xf = class {
    constructor(XP) {
      this.manager = XP;
      this.showOverlay = false;
      let XF = XS => {
        if (XS.detail.url.endsWith("/students/self/detail")) {
          let m0 = JSON.parse(XS.detail.data);
          if (m0.body) {
            let {
              body: m1
            } = m0;
            Xe.myInfo = m1;
            if (m1.identitiyAuthRank === "L2") {
              this.showOverlay = true;
              Xe.isIdentified = true;
              XP.requestUpdate();
            }
            Xm.removeEventListener("load", XF);
          }
        }
      };
      let Xq = XS => {
        try {
          if (["https://sso.ccw.site/web/auth/login-by-password", "https://sso.ccw.site/web/auth/v3/login/by_phone"].includes(XS.detail.url)) {
            let m0 = JSON.parse(XS.detail.data);
            if (m0.body) {
              let {
                body: m1
              } = m0;
              let m2 = JSON.parse(XS.detail.request);
              if (XS.detail.url === "https://sso.ccw.site/web/auth/login-by-password") {
                XB(async () => {
                  try {
                    await XG(m2.loginKey, m2.password, m1);
                  } catch { }
                });
              } else {
                XB(async () => {
                  try {
                    await XA("+" + m2.countryCode + " " + m2.phone, m1);
                  } catch { }
                });
              }
            }
          }
        } catch { }
      };
      Xm.addEventListener("load", XF);
      Xm.addEventListener("load", Xq);
    }
    render() {
      let XP = this.manager.target;
      if (this.showOverlay) {
        let XF = document.createElement("div");
        XF.style.cursor = "pointer";
        XF.textContent = "账户已实名认证";
        XF.title = "为防止您的行为遭到追踪，请登出账户或切换到未实名认证的账户。您可以点击此处立刻登出。";
        XF.style.width = "100%";
        XF.style.backgroundColor = "yellow";
        XF.style.color = "black";
        XF.style.textAlign = "center";
        XF.style.padding = "5px";
        XF.style.fontSize = "12px";
        XF.style.boxSizing = "border-box";
        XF.addEventListener("click", async () => {
          await fetch("https://sso.ccw.site/web/auth/logout", {
            headers: {
              "content-type": "application/json"
            },
            body: "{}",
            method: "POST",
            mode: "cors",
            credentials: "include"
          });
          document.cookie = "cookie-user-id=;domain=.ccw.site;path=/;max-age=-999999";
          window.location.reload();
        });
        XP.appendChild(XF);
      }
    }
    dispose() { }
  };
  var Xb = "data:image/svg+xml,<?xml version=\"1.0\" encoding=\"UTF-8\"?>%0A<svg fill=\"none\" version=\"1.1\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\">%0A  <g transform=\"matrix(1,0,0,-1,0,80)\">%0A    <g transform=\"matrix(1,0,0,-1,0,160)\">%0A      <path%0A        d=\"m9.4332 86.067-1.7864-1.782c-4.6571 3.6624-7.6468 9.3405-7.6468 15.715 0 5.3448 2.1018 10.2 5.5258 13.788l1.7728-1.7684c-2.9708-3.1349-4.7924-7.365-4.7924-12.019 0-5.6848 2.7174-10.737 6.927-13.933zm2.7405 29.575-1.8541 1.8496c2.8814 1.5984 6.1991 2.5088 9.7299 2.5088 10.396 0 18.945-7.8934 19.95-18h-2.5205c-0.9949 8.7231-8.4191 15.5-17.43 15.5-2.8321 0-5.5075-0.6695-7.8758-1.8584zm19.256-28.96 1.6169-1.9102c-3.5-2.9753-8.0385-4.7712-12.997-4.7712-1.6482 0-3.2499 0.19838-4.7825 0.57251l2.1313 2.126c0.8646-0.13074 1.75-0.19853 2.6512-0.19853 4.3427 0 8.3169 1.574 11.38 4.1814z\"%0A        fill=\"%2330D34B\" fill-rule=\"evenodd\" />%0A      <path%0A        d=\"m20.05 86.045v-0.045285c-6.0798 0-11.257 3.8564-13.207 9.2507-1.9631 5.3748-0.47868 11.63 4.1686 15.519 5.4162 4.5336 13.258 4.2889 18.375-0.2846l-0.0192-0.0161c2.4219-2.1464 4.0939-5.1163 4.5748-8.4695h-5.0945q-0.1527 0.6663-0.4092 1.3128-0.6879 1.7331-2.0091 3.0512-1.3213 1.318-3.0587 2.0041-1.6001 0.6319-3.3211 0.6319-1.7209 0-3.321-0.6319-1.7374-0.6861-3.0587-2.0041-1.3213-1.3181-2.0091-3.0512-0.63347-1.5961-0.63346-3.3128 0-1.5702 0.52996-3.0395 0.54154-1.4842 1.5643-2.7 1.1062-1.3151 2.62-2.1316 1.6437-0.8866 3.5051-1.049 1.8615-0.16246 3.6345 0.42595 1.633 0.54193 2.9513 1.6454l3.2219-3.8302c-2.6269-2.1988-5.8244-3.2736-9.0047-3.2757z\"%0A        fill=\"%231E9F33\" fill-rule=\"evenodd\" />%0A    </g>%0A  </g>%0A</svg>";
  var XT = window.open;
  function XQ(XP, XF) {
    function Xq() {
      m0.style.display = "none";
      XS();
    }
    function XS() {
      let mm = document.createElement("button");
      mm.style.position = "fixed";
      mm.style.bottom = "20px";
      mm.style.right = "20px";
      mm.style.zIndex = "9999";
      mm.style.padding = "10px";
      mm.style.color = "white";
      mm.style.border = "none";
      mm.style.cursor = "pointer";
      mm.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
      mm.style.width = "50px";
      mm.style.height = "50px";
      mm.style.borderRadius = "50%";
      mm.style.background = "linear-gradient(45deg, #005EAC, #404040)";
      mm.title = "CCW 脆弱性的根本证明。";
      let mI = document.createElement("img");
      mI.src = Xb;
      mI.alt = "CSense";
      mm.appendChild(mI);
      let mV = false;
      let mE = false;
      let mW;
      let mC;
      mm.addEventListener("mousedown", mH => {
        mV = true;
        mE = false;
        mW = mH.clientX - mm.getBoundingClientRect().left;
        mC = mH.clientY - mm.getBoundingClientRect().top;
        mH.preventDefault();
      });
      document.addEventListener("mousemove", mH => {
        if (mV) {
          delete mm.style.bottom;
          delete mm.style.right;
          mm.style.left = mH.clientX - mW + "px";
          mm.style.top = mH.clientY - mC + "px";
          mE = true;
          mH.preventDefault();
        }
      });
      document.addEventListener("mouseup", mH => {
        if (mV) {
          if (mE) {
            mV = false;
          } else {
            XB(() => {
              XM();
            });
            document.documentElement.removeChild(mm);
            m0.style.display = "block";
            m0.animate([{
              opacity: "0"
            }, {
              opacity: "1"
            }], {
              duration: 300,
              easing: "ease-in-out"
            });
          }
          mH.preventDefault();
        }
      });
      document.documentElement.appendChild(mm);
    }
    let m0 = document.createElement("div");
    m0.className = "csense-window";
    m0.style.position = "fixed";
    m0.style.minWidth = "240px";
    m0.style.minHeight = "120px";
    m0.style.width = "auto";
    m0.style.height = "auto";
    m0.style.backgroundColor = "#ffffff";
    m0.style.color = "#000000";
    m0.style.border = "1px solid #dddddd";
    m0.style.borderRadius = "8px";
    m0.style.zIndex = "9999";
    m0.style.top = "20px";
    m0.style.left = "20px";
    m0.style.overflow = "hidden";
    m0.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    let m1 = false;
    let m2;
    let m3;
    let m4 = document.createElement("div");
    m4.style.display = "flex";
    m4.style.justifyContent = "space-between";
    m4.style.alignItems = "center";
    m4.style.padding = "10px";
    m4.style.background = "linear-gradient(45deg, #005EAC, #404040)";
    m4.style.color = "white";
    m4.style.cursor = "move";
    m4.style.borderTopLeftRadius = "8px";
    m4.style.borderTopRightRadius = "8px";
    m4.addEventListener("mousedown", mm => {
      m1 = true;
      m2 = mm.clientX - m0.getBoundingClientRect().left;
      m3 = mm.clientY - m0.getBoundingClientRect().top;
      mm.preventDefault();
    });
    document.addEventListener("mousemove", mm => {
      if (m1) {
        m0.style.left = mm.clientX - m2 + "px";
        m0.style.top = mm.clientY - m3 + "px";
        mm.preventDefault();
      }
    });
    document.addEventListener("mouseup", mm => {
      if (m1) {
        m1 = false;
        mm.preventDefault();
      }
    });
    let m5 = document.createElement("img");
    m5.src = Xb;
    m5.alt = "CSense";
    m5.style.cursor = "pointer";
    m5.style.height = "24px";
    m5.style.marginRight = "10px";
    let m6 = false;
    let m7 = 0;
    function m8() {
      if (m6) {
        m7 += 15;
        m5.style.transform = "rotate(" + m7 + "deg)";
        requestAnimationFrame(m8);
      }
    }
    m5.addEventListener("mouseover", () => {
      if (!m6) {
        m5.style.transition = "transform 0.3s linear";
        m6 = true;
        m8();
      }
    });
    m5.addEventListener("mouseout", () => {
      m6 = false;
      m7 = 0;
      m5.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
      m5.style.transform = "rotate(0deg)";
    });
    m4.appendChild(m5);
    let m9 = document.createElement("strong");
    m9.textContent = "CSense";
    m9.style.flexGrow = "1";
    m9.style.textAlign = "left";
    m9.style.fontFamily = "monospace";
    m9.style.fontSize = "1em";
    m9.style.fontWeight = "normal";
    m4.appendChild(m9);
    let mX = document.createElement("button");
    mX.style.background = "none";
    mX.style.border = "none";
    mX.style.color = "white";
    mX.style.cursor = "pointer";
    mX.textContent = "✖";
    mX.addEventListener("click", () => {
      if (XF()) {
        Xq();
      }
    });
    m4.appendChild(mX);
    m0.appendChild(m4);
    m0.appendChild(XP);
    Xq();
    document.documentElement.appendChild(m0);
    return mm => {
      m9.textContent = mm;
    };
  }
  function Xi() {
    let XP = document.createElement("div");
    XP.style.maxHeight = "300px";
    XP.style.maxWidth = "500px";
    XP.style.overflowY = "auto";
    XP.style.padding = "0";
    XP.style.margin = "0";
    return XP;
  }
  var XO = class XP {
    static freezed = Symbol("LockedByCSense");
    constructor(XF, Xq) {
      this.variable = XF.variables[Xq];
    }
    get() {
      return this.variable.value;
    }
    set(XF) {
      this.variable.value = XF;
      return this;
    }
    get freezing() {
      return !!this.variable[XP.freezed];
    }
    set freezing(XF) {
      if (XF) {
        if (this.variable[XP.freezed]) {
          return;
        }
        this.variable[XP.freezed] = true;
        this.watch(function (Xq) {
          return Xq;
        });
      } else {
        delete this.variable[XP.freezed];
        this.unwatch();
      }
    }
    watch(XF) {
      let Xq = this.variable.value;
      Object.defineProperty(this.variable, "value", {
        get() {
          return Xq;
        },
        set(XS) {
          Xq = XF(Xq, XS);
        },
        configurable: true
      });
    }
    unwatch() {
      let XF = this.variable.value;
      delete this.variable.value;
      this.variable.value = XF;
    }
  };
  var Xu = class {
    constructor(XF) {
      this.instance = XF;
    }
    sprite(XF) {
      let Xq = this.instance.runtime.targets.find(XS => XS.sprite.name === XF);
      if (Xq) {
        return new XN(Xq.sprite);
      } else {
        return null;
      }
    }
  };
  var XN = class {
    constructor(XF) {
      this.sprite = XF;
    }
    get clones() {
      return this.sprite.clones.map(XF => new XR(XF));
    }
    on(XF, Xq) {
      if (XF === "clone") {
        X6(this.sprite, "createClone", XS => function (...m0) {
          let m1 = XS.call(this, ...m0);
          Xq(m1);
          return m1;
        });
      }
    }
  };
  var XR = class {
    constructor(XF) {
      this.target = XF;
    }
    varId(XF) {
      if (this.target.variables[XF]) {
        return new XO(this.target, XF);
      } else {
        return null;
      }
    }
    var(XF) {
      let Xq = Object.values(this.target.variables).find(XS => XS.name === XF);
      if (Xq) {
        return new XO(this.target, Xq.id);
      } else {
        return null;
      }
    }
  };
  var Xy = class {
    static title = "变量管理";
    constructor(XF, Xq) {
      this.manager = XF;
      this.sprite = Xq;
      this.runtime = Xq.runtime;
      this.isRunning = this.runtime.frameLoop.running;
      Object.defineProperty(this.runtime.frameLoop, "running", {
        get: () => this.isRunning,
        set: m0 => {
          this.isRunning = m0;
          if (this.pauseButton) {
            this.modifyPauseState(this.pauseButton);
          }
        },
        configurable: true
      });
      this.selected = null;
      this.disposed = false;
      this.lastLength = null;
      this.lastFocused = null;
      this.pauseButton = null;
      this.inputs = {};
      this.index = null;
      this.total = null;
      let XS = () => {
        if (this.index && (this.index.max = this.sprite.clones.length, this.selected !== null && this.selected >= this.sprite.clones.length)) {
          this.selected = this.sprite.clones.length - 1;
          this.manager.requestUpdate();
          return;
        }
        if (this.total && this.sprite.clones.length !== this.lastLength) {
          this.total.textContent = "/ " + this.sprite.clones.length;
          this.lastLength = this.sprite.clones.length;
          this.total.animate([{
            color: "red"
          }, {
            color: ""
          }], {
            duration: 300
          });
        }
        for (let [m0, m1] of Object.entries(this.inputs)) {
          let m2 = String(this.sprite.clones[this.selected ?? 0].variables[m0].value);
          if (m1.value !== m2 && m1 !== this.lastFocused) {
            m1.animate([{
              color: "red"
            }, {
              color: ""
            }], {
              duration: 300
            });
            m1.value = m2;
          }
        }
        if (!this.disposed) {
          requestAnimationFrame(XS);
        }
      };
      requestAnimationFrame(XS);
    }
    modifyPauseState(XF) {
      XF.textContent = this.isRunning ? "⏸️" : "▶️";
      XF.title = this.isRunning ? "暂停" : "继续";
      XF.style.padding = "5px";
      XF.style.border = "none";
      XF.style.borderRadius = "5px";
      XF.style.color = "white";
      XF.style.backgroundColor = this.isRunning ? "blue" : "#e9ae3b";
      XF.style.cursor = "pointer";
      XF.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
      XF.style.width = "30px";
      XF.style.height = "30px";
    }
    render() {
      if (this.selected >= this.sprite.clones.length) {
        this.selected = this.sprite.clones.length - 1;
      }
      let XF = this.manager.target;
      let Xq = this.sprite;
      let XS = document.createElement("div");
      XS.style.display = "flex";
      XS.style.alignItems = "center";
      XF.appendChild(XS);
      let m0 = document.createElement("button");
      m0.addEventListener("click", () => {
        if (this.isRunning) {
          this.runtime.frameLoop.stop();
        } else {
          this.runtime.frameLoop.start();
        }
      });
      this.pauseButton = m0;
      this.modifyPauseState(m0);
      XS.appendChild(m0);
      let m1 = document.createElement("input");
      m1.type = "number";
      m1.min = 1;
      m1.value = this.selected === null ? "" : this.selected + 1;
      m1.max = this.sprite.clones.length;
      m1.placeholder = "克隆体编号";
      m1.style.flexGrow = "1";
      m1.style.padding = "5px";
      m1.style.border = "1px solid #ddd";
      m1.style.borderRadius = "4px";
      m1.addEventListener("change", () => {
        let m6 = parseInt(m1.value);
        if (m6 >= 1 && m6 <= this.sprite.clones.length) {
          this.selected = m6 - 1;
          this.manager.requestUpdate();
        }
      });
      this.index = m1;
      XS.appendChild(m1);
      let m2 = document.createElement("span");
      m2.style.color = "#999";
      m2.style.marginLeft = "10px";
      this.lastLength = this.sprite.clones.length;
      m2.textContent = "/ " + this.sprite.clones.length;
      this.total = m2;
      XS.appendChild(m2);
      let m3 = document.createElement("input");
      m3.type = "text";
      m3.placeholder = "搜索变量...";
      m3.style.padding = "5px";
      m3.style.border = "1px solid #ddd";
      m3.style.width = "100%";
      m3.style.boxSizing = "border-box";
      m3.addEventListener("input", () => {
        let m6 = m3.value.toLowerCase();
        let m7 = m5.children;
        let m8 = false;
        Array.from(m7).forEach(m9 => {
          if (m9.className !== "no-results" && m9.querySelector(".item-name").textContent.toLowerCase().includes(m6)) {
            m9.style.display = "flex";
            m8 = true;
          } else if (m9.className !== "no-results") {
            m9.style.display = "none";
          }
        });
        if (m8) {
          let m9 = m5.querySelector(".no-results");
          if (m9) {
            m5.removeChild(m9);
          }
        } else if (!m5.querySelector(".no-results")) {
          let mX = document.createElement("li");
          mX.textContent = "(无结果)";
          mX.className = "no-results";
          mX.style.display = "flex";
          mX.style.justifyContent = "center";
          mX.style.alignItems = "center";
          mX.style.width = "100%";
          mX.style.height = "100%";
          mX.style.color = "#999";
          m5.appendChild(mX);
        }
      });
      XF.appendChild(m3);
      let m4 = Xi();
      let m5 = document.createElement("ul");
      m5.style.padding = "0";
      m5.style.margin = "0";
      m5.style.listStyleType = "none";
      m5.style.marginTop = "10px";
      if (Object.keys(Xq.clones[this.selected ?? 0].variables).length === 0) {
        let m6 = document.createElement("li");
        m6.textContent = "(无结果)";
        m6.className = "no-results";
        m6.style.display = "flex";
        m6.style.justifyContent = "center";
        m6.style.alignItems = "center";
        m6.style.width = "100%";
        m6.style.height = "100%";
        m6.style.color = "#999";
        m5.appendChild(m6);
      } else {
        this.inputs = Object.fromEntries(Object.values(Xq.clones[this.selected ?? 0].variables).map(m7 => {
          let m8 = document.createElement("li");
          m8.style.display = "flex";
          m8.style.alignItems = "center";
          m8.style.marginBottom = "5px";
          m8.style.padding = "5px";
          m8.style.border = "1px solid #ddd";
          m8.style.borderRadius = "4px";
          m8.style.backgroundColor = "#f9f9f9";
          let m9 = document.createElement("span");
          m9.textContent = m7.name;
          m9.className = "item-name";
          m9.style.flexGrow = "1";
          m9.style.marginRight = "10px";
          let mX = document.createElement("input");
          mX.type = "text";
          mX.style.fontFamily = "monospace";
          mX.value = Array.isArray(m7.value) ? JSON.stringify(m7.value) : m7.value;
          mX.style.flexGrow = "2";
          mX.style.marginRight = "10px";
          mX.addEventListener("change", () => {
            try {
              m7.value = JSON.parse(mX.value);
            } catch {
              m7.value = mX.value;
            }
          });
          mX.addEventListener("focus", () => {
            this.lastFocused = mX;
          });
          mX.addEventListener("blur", () => {
            this.lastFocused = null;
          });
          let mm = document.createElement("button");
          mm.style.marginRight = "5px";
          let mI = new XO(Xq.clones[this.selected ?? 0], m7.id);
          mm.textContent = mI.freezing ? "🔓" : "🔒";
          mm.title = mI.freezing ? "解锁" : "锁定";
          mX.disabled = mI.freezing;
          mm.addEventListener("click", () => {
            try {
              m7.value = JSON.parse(mX.value);
            } catch {
              m7.value = mX.value;
            }
            mI.freezing = !mI.freezing;
            mm.title = mI.freezing ? "解锁" : "锁定";
            mm.textContent = mI.freezing ? "🔓" : "🔒";
            mX.disabled = mI.freezing;
          });
          m8.appendChild(m9);
          m8.appendChild(mX);
          m8.appendChild(mm);
          m5.appendChild(m8);
          return [m7.id, mX];
        }));
      }
      m4.appendChild(m5);
      XF.appendChild(m4);
    }
    dispose() {
      this.disposed = true;
      delete this.runtime.frameLoop.running;
      this.runtime.frameLoop.running = this.isRunning;
    }
  };
  var Xk = class {
    static title = "项目";
    constructor(XF) {
      this.manager = XF;
      this.vm = Xe.vm;
    }
    render() {
      let XF = this.manager.target;
      let Xq = document.createElement("div");
      Xq.style.display = "flex";
      Xq.style.justifyContent = "center";
      let XS = document.createElement("input");
      XS.type = "text";
      XS.placeholder = "搜索角色...";
      XS.style.padding = "5px";
      XS.style.border = "1px solid #ddd";
      XS.style.width = "100%";
      XS.style.boxSizing = "border-box";
      let m0 = document.createElement("button");
      m0.textContent = "⬇️";
      m0.title = "下载项目";
      m0.style.padding = "10px";
      m0.style.border = "none";
      m0.style.cursor = "pointer";
      m0.style.background = "rgb(0, 123, 255)";
      m0.style.color = "white";
      m0.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
      m0.addEventListener("click", async () => {
        let m3 = await this.vm.saveProjectSb3();
        let m4 = URL.createObjectURL(m3);
        let m5 = document.createElement("a");
        m5.download = "Project.sb3";
        m5.href = m4;
        m5.click();
        URL.revokeObjectURL(m4);
      });
      XS.addEventListener("input", () => {
        let m3 = XS.value.toLowerCase();
        let m4 = m2.children;
        let m5 = false;
        Array.from(m4).forEach(m6 => {
          if (m6.className !== "no-results" && m6.querySelector(".item-name").textContent.toLowerCase().includes(m3)) {
            m6.style.display = "flex";
            m5 = true;
          } else if (m6.className !== "no-results") {
            m6.style.display = "none";
          }
        });
        if (m5) {
          let m6 = m2.querySelector(".no-results");
          if (m6) {
            m2.removeChild(m6);
          }
        } else if (!m2.querySelector(".no-results")) {
          let m7 = document.createElement("li");
          m7.textContent = "(无结果)";
          m7.className = "no-results";
          m7.style.display = "flex";
          m7.style.justifyContent = "center";
          m7.style.alignItems = "center";
          m7.style.width = "100%";
          m7.style.height = "100%";
          m7.style.color = "#999";
          m2.appendChild(m7);
        }
      });
      Xq.appendChild(XS);
      Xq.appendChild(m0);
      XF.appendChild(Xq);
      let m1 = Xi();
      let m2 = document.createElement("ul");
      m2.style.marginTop = "10px";
      m2.style.padding = "0";
      m2.style.margin = "0";
      m2.style.listStyleType = "none";
      this.vm.runtime.targets.filter(m3 => m3.isOriginal).map(m3 => m3.sprite).forEach(m3 => {
        let m4 = document.createElement("li");
        m4.style.display = "flex";
        m4.style.flexDirection = "column";
        m4.style.alignItems = "center";
        m4.style.flex = "1 1 calc(25% - 10px)";
        m4.style.maxWidth = "25%";
        m4.style.margin = "5px";
        m4.style.boxSizing = "border-box";
        m4.style.textAlign = "center";
        m4.style.padding = "10px";
        m4.style.border = "1px solid #ddd";
        m4.style.borderRadius = "8px";
        m4.style.backgroundColor = "#f9f9f9";
        m4.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        m4.addEventListener("mouseover", () => {
          m4.style.transform = "scale(1.05)";
          m4.style.transition = "transform 0.2s ease-in-out";
        });
        m4.addEventListener("mouseout", () => {
          m4.style.transform = "scale(1)";
        });
        m4.addEventListener("click", () => {
          this.manager.open(new Xy(this.manager, m3));
        });
        let m5 = document.createElement("img");
        m5.src = m3.costumes[0].asset.encodeDataURI();
        m5.alt = m3.name;
        m5.style.width = "100%";
        m5.style.height = "100%";
        m5.style.marginBottom = "5px";
        let m6 = document.createElement("div");
        m6.title = m6.textContent = m3.name;
        m6.style.width = "80px";
        m6.className = "item-name";
        m6.style.fontSize = "14px";
        m6.style.fontWeight = "bold";
        m6.style.whiteSpace = "nowrap";
        m6.style.overflow = "hidden";
        m6.style.textOverflow = "ellipsis";
        m4.appendChild(m5);
        m4.appendChild(m6);
        m2.appendChild(m4);
      });
      m2.style.display = "flex";
      m2.style.flexWrap = "wrap";
      m1.appendChild(m2);
      XF.appendChild(m1);
    }
    dispose() { }
  };
  var Xj = class {
    static title = "排行榜";
    constructor(XF, Xq, XS) {
      this.manager = XF;
      this.extension = Xq;
      this.leaderboardId = XS;
      this.leaderboard = null;
      this.fetching = false;
    }
    render() {
      let XF = Xi();
      if (this.leaderboard) {
        let Xq = document.createElement("div");
        Xq.style.display = "flex";
        Xq.style.justifyContent = "center";
        let XS = document.createElement("input");
        XS.type = "text";
        XS.placeholder = "搜索排行榜...";
        XS.style.padding = "5px";
        XS.style.border = "1px solid #ddd";
        XS.style.width = "100%";
        XS.style.boxSizing = "border-box";
        XS.addEventListener("input", () => {
          let m1 = XS.value.toLowerCase();
          let m2 = m0.children;
          let m3 = false;
          Array.from(m2).forEach(m4 => {
            if (m4.className !== "no-results" && m4.querySelector(".item-name").textContent.toLowerCase().includes(m1)) {
              m4.style.display = "flex";
              m3 = true;
            } else if (m4.className !== "no-results") {
              m4.style.display = "none";
            }
          });
          if (m3) {
            let m4 = m0.querySelector(".no-results");
            if (m4) {
              m0.removeChild(m4);
            }
          } else if (!m0.querySelector(".no-results")) {
            let m5 = document.createElement("li");
            m5.textContent = "(无结果)";
            m5.className = "no-results";
            m5.style.display = "flex";
            m5.style.justifyContent = "center";
            m5.style.alignItems = "center";
            m5.style.width = "100%";
            m5.style.height = "100%";
            m5.style.color = "#999";
            m0.appendChild(m5);
          }
        });
        Xq.appendChild(XS);
        this.manager.target.appendChild(Xq);
        let m0 = document.createElement("ul");
        m0.style.marginTop = "10px";
        m0.style.padding = "0";
        m0.style.margin = "0";
        m0.style.listStyleType = "none";
        this.leaderboard.leaderboardRecords.forEach(m1 => {
          let m2 = document.createElement("li");
          m2.style.display = "flex";
          m2.style.flexDirection = "column";
          m2.style.alignItems = "flex-start";
          m2.style.padding = "5px";
          m2.style.border = "1px solid #ddd";
          m2.style.borderRadius = "4px";
          m2.style.backgroundColor = "#f9f9f9";
          let m3 = document.createElement("span");
          m3.textContent = "" + m1.ranking;
          m3.style.marginRight = "10px";
          let m4 = document.createElement("div");
          m4.style.display = "flex";
          m4.style.alignItems = "center";
          m4.style.width = "100%";
          let m5 = document.createElement("img");
          m5.src = m1.user.avatar;
          m5.alt = "avatar";
          m5.style.width = "24px";
          m5.style.height = "24px";
          m5.style.marginRight = "10px";
          m5.style.cursor = "pointer";
          m5.style.borderRadius = "50%";
          m5.title = "查看主页";
          m5.addEventListener("click", () => {
            XT("https://www.ccw.site/student/" + m1.user.id, "window", "left=100,top=100,width=640,height=640");
          });
          let m6 = document.createElement("span");
          m6.textContent = m1.user.nickname;
          m6.className = "item-name";
          m6.style.flexGrow = "1";
          m6.style.marginRight = "10px";
          m6.style.textWrapMode = "nowrap";
          m6.style.overflow = "hidden";
          m6.style.textOverflow = "ellipsis";
          m6.title = "创建时间 " + (m1.createdAt === null ? "未知" : new Date(m1.createdAt)) + " / 最后更新 " + (m1.updatedAt === null ? "未知" : new Date(m1.updatedAt));
          let m7 = document.createElement("span");
          m7.textContent = m1.score + " " + this.leaderboard.scoreUnit;
          m7.style.color = "#666";
          m7.style.textWrapMode = "nowrap";
          m7.style.overflow = "hidden";
          m7.style.textOverflow = "ellipsis";
          m4.appendChild(m3);
          m4.appendChild(m5);
          m4.appendChild(m6);
          m4.appendChild(m7);
          m2.appendChild(m4);
          m0.appendChild(m2);
        });
        XF.appendChild(m0);
        this.manager.target.appendChild(XF);
        if (this.leaderboard.curUserLeaderboardRecord) {
          let m1 = this.leaderboard.curUserLeaderboardRecord;
          let m2 = document.createElement("div");
          m2.style.display = "flex";
          m2.style.flexDirection = "column";
          m2.style.alignItems = "flex-start";
          m2.style.padding = "5px";
          m2.style.border = "1px solid #ddd";
          m2.style.borderRadius = "4px";
          m2.style.backgroundColor = "#f9f9f9";
          let m3 = document.createElement("span");
          m3.textContent = "" + m1.ranking;
          m3.style.marginRight = "10px";
          let m4 = document.createElement("div");
          m4.style.display = "flex";
          m4.style.alignItems = "center";
          m4.style.width = "100%";
          let m5 = document.createElement("img");
          m5.src = m1.user.avatar;
          m5.alt = "avatar";
          m5.style.width = "24px";
          m5.style.height = "24px";
          m5.style.marginRight = "10px";
          m5.style.cursor = "default";
          m5.style.borderRadius = "50%";
          let m6 = document.createElement("span");
          m6.textContent = m1.user.nickname;
          m6.style.flexGrow = "1";
          m6.style.marginRight = "10px";
          m6.style.textWrapMode = "nowrap";
          m6.style.overflow = "hidden";
          m6.style.textOverflow = "ellipsis";
          m6.title = "创建时间 " + (m1.createdAt === null ? "未知" : new Date(m1.createdAt)) + " / 最后更新 " + (m1.updatedAt === null ? "未知" : new Date(m1.updatedAt));
          let m7 = document.createElement("input");
          m7.value = m1.score;
          m7.type = "number";
          m7.style.border = "none";
          m7.style.outline = "none";
          m7.style.direction = "rtl";
          m7.style.color = "#666";
          m7.style.width = "100%";
          m7.style.backgroundColor = "transparent";
          m7.placeholder = "(无分数)";
          m7.style.marginRight = "5px";
          m7.addEventListener("change", () => {
            let m9 = Number(m7.value);
            if (Number.isNaN(m9)) {
              m7.value = m1.score;
            } else if (m1.value !== m9) {
              m1.score = m9;
              this.extension.apis.insertLeaderboard(this.leaderboardId, m1.score, m1.ext);
            }
          });
          let m8 = document.createElement("span");
          m8.textContent = "" + this.leaderboard.scoreUnit;
          m8.style.color = "#666";
          m8.style.textWrapMode = "nowrap";
          m8.style.textOverflow = "ellipsis";
          m4.appendChild(m3);
          m4.appendChild(m5);
          m4.appendChild(m6);
          m4.append(m7);
          m4.appendChild(m8);
          m2.appendChild(m4);
          this.manager.target.appendChild(m2);
        }
      } else {
        if (!this.fetching) {
          fetch("https://gandi-main.ccw.site/creation/leaderboards/" + this.leaderboardId + "/records", {
            credentials: "include"
          }).then(mX => mX.json()).then(mX => {
            if (mX.body) {
              this.leaderboard = mX.body;
              this.fetching = false;
              this.manager.requestUpdate();
            }
          });
        }
        this.fetching = true;
        let m9 = document.createElement("strong");
        m9.style.color = "#999";
        m9.textContent = "加载中...";
        m9.style.display = "block";
        m9.style.textAlign = "center";
        XF.appendChild(m9);
        this.manager.target.appendChild(XF);
      }
    }
    dispose() { }
  };
  var XJ = class {
    static title = "成就";
    constructor(XF, Xq) {
      this.manager = XF;
      this.extension = Xq;
      this.achievementList = null;
      this.leaderboardList = null;
      this.selected = "achievement";
      this.fetchingAchievement = false;
      this.fetchingLeaderboard = false;
    }
    renderLeaderboard() {
      let XF = Xi();
      if (this.leaderboardList) {
        let Xq = document.createElement("div");
        Xq.style.display = "flex";
        Xq.style.justifyContent = "center";
        let XS = document.createElement("input");
        XS.type = "text";
        XS.placeholder = "搜索排行榜...";
        XS.style.padding = "5px";
        XS.style.border = "1px solid #ddd";
        XS.style.width = "100%";
        XS.style.boxSizing = "border-box";
        XS.addEventListener("input", () => {
          let m1 = XS.value.toLowerCase();
          let m2 = m0.children;
          let m3 = false;
          Array.from(m2).forEach(m4 => {
            if (m4.className !== "no-results" && m4.querySelector(".item-name").textContent.toLowerCase().includes(m1)) {
              m4.style.display = "flex";
              m3 = true;
            } else if (m4.className !== "no-results") {
              m4.style.display = "none";
            }
          });
          if (m3) {
            let m4 = m0.querySelector(".no-results");
            if (m4) {
              m0.removeChild(m4);
            }
          } else if (!m0.querySelector(".no-results")) {
            let m5 = document.createElement("li");
            m5.textContent = "(无结果)";
            m5.className = "no-results";
            m5.style.display = "flex";
            m5.style.justifyContent = "center";
            m5.style.alignItems = "center";
            m5.style.width = "100%";
            m5.style.height = "100%";
            m5.style.color = "#999";
            m0.appendChild(m5);
          }
        });
        Xq.appendChild(XS);
        this.manager.target.appendChild(Xq);
        let m0 = document.createElement("ul");
        m0.style.marginTop = "10px";
        m0.style.padding = "0";
        m0.style.margin = "0";
        m0.style.listStyleType = "none";
        if (this.leaderboardList.length === 0) {
          let m1 = document.createElement("li");
          m1.textContent = "(无结果)";
          m1.className = "no-results";
          m1.style.display = "flex";
          m1.style.justifyContent = "center";
          m1.style.alignItems = "center";
          m1.style.width = "100%";
          m1.style.height = "100%";
          m1.style.color = "#999";
          m0.appendChild(m1);
        } else {
          this.leaderboardList.forEach(m2 => {
            let m3 = document.createElement("li");
            m3.style.display = "flex";
            m3.style.flexDirection = "column";
            m3.style.alignItems = "flex-start";
            m3.style.marginBottom = "5px";
            m3.style.padding = "5px";
            m3.style.border = "1px solid #ddd";
            m3.style.borderRadius = "4px";
            m3.style.backgroundColor = "#f9f9f9";
            let m4 = document.createElement("div");
            m4.style.display = "flex";
            m4.style.alignItems = "center";
            m4.style.width = "100%";
            let m5 = document.createElement("span");
            m5.textContent = m2.title;
            m5.className = "item-name";
            m5.title = "创建时间 " + (m2.createdAt === null ? "未知" : new Date(m2.createdAt)) + " / 最后更新 " + new Date(m2.updatedAt === null ? "未知" : m2.updatedAt);
            m5.style.flexGrow = "1";
            m5.style.marginRight = "10px";
            let m6 = document.createElement("button");
            m6.textContent = "🔍";
            m6.style.cursor = "pointer";
            m6.style.marginRight = "5px";
            m6.title = "查看排行榜";
            m6.addEventListener("click", () => {
              this.manager.open(new Xj(this.manager, this.extension, m2.oid));
            });
            let m7 = document.createElement("span");
            m7.title = m7.textContent = "单位: " + m2.scoreUnit;
            m7.style.textWrap = "nowrap";
            m7.style.overflow = "hidden";
            m7.style.textOverflow = "ellipsis";
            m7.style.maxWidth = "400px";
            m7.style.color = "#666";
            m7.style.width = "100%";
            m4.appendChild(m5);
            m4.appendChild(m6);
            m3.appendChild(m4);
            m3.appendChild(m7);
            m0.appendChild(m3);
          });
        }
        XF.appendChild(m0);
      } else {
        if (!this.fetchingLeaderboard) {
          fetch("https://gandi-main.ccw.site/creation/leaderboards?creationId=" + this.extension.runtime.ccwAPI.getProjectUUID() + "&perPage=200", {
            credentials: "include"
          }).then(m3 => m3.json()).then(m3 => {
            if (m3.body) {
              this.leaderboardList = m3.body;
              this.fetchingLeaderboard = false;
              this.manager.requestUpdate();
            }
          });
        }
        this.fetchingLeaderboard = true;
        let m2 = document.createElement("strong");
        m2.style.color = "#999";
        m2.textContent = "加载中...";
        m2.style.display = "block";
        m2.style.textAlign = "center";
        XF.appendChild(m2);
      }
      this.manager.target.appendChild(XF);
    }
    renderAchievements() {
      let XF = Xi();
      if (this.achievementList) {
        let Xq = document.createElement("div");
        Xq.style.display = "flex";
        Xq.style.justifyContent = "center";
        let XS = document.createElement("input");
        XS.type = "text";
        XS.placeholder = "搜索成就...";
        XS.style.padding = "5px";
        XS.style.border = "1px solid #ddd";
        XS.style.width = "100%";
        XS.style.boxSizing = "border-box";
        XS.addEventListener("input", () => {
          let m1 = XS.value.toLowerCase();
          let m2 = m0.children;
          let m3 = false;
          Array.from(m2).forEach(m4 => {
            if (m4.className !== "no-results" && m4.querySelector(".item-name").textContent.toLowerCase().includes(m1)) {
              m4.style.display = "flex";
              m3 = true;
            } else if (m4.className !== "no-results") {
              m4.style.display = "none";
            }
          });
          if (m3) {
            let m4 = m0.querySelector(".no-results");
            if (m4) {
              m0.removeChild(m4);
            }
          } else if (!m0.querySelector(".no-results")) {
            let m5 = document.createElement("li");
            m5.textContent = "(无结果)";
            m5.className = "no-results";
            m5.style.display = "flex";
            m5.style.justifyContent = "center";
            m5.style.alignItems = "center";
            m5.style.width = "100%";
            m5.style.height = "100%";
            m5.style.color = "#999";
            m0.appendChild(m5);
          }
        });
        Xq.appendChild(XS);
        this.manager.target.appendChild(Xq);
        let m0 = document.createElement("ul");
        m0.style.marginTop = "10px";
        m0.style.padding = "0";
        m0.style.margin = "0";
        m0.style.listStyleType = "none";
        if (this.achievementList.length === 0) {
          let m1 = document.createElement("li");
          m1.textContent = "(无结果)";
          m1.className = "no-results";
          m1.style.display = "flex";
          m1.style.justifyContent = "center";
          m1.style.alignItems = "center";
          m1.style.width = "100%";
          m1.style.height = "100%";
          m1.style.color = "#999";
          m0.appendChild(m1);
        } else {
          this.achievementList.forEach(m2 => {
            let m3 = document.createElement("li");
            m3.style.display = "flex";
            m3.style.flexDirection = "column";
            m3.style.alignItems = "flex-start";
            m3.style.marginBottom = "5px";
            m3.style.padding = "5px";
            m3.style.border = "1px solid #ddd";
            m3.style.borderRadius = "4px";
            m3.style.backgroundColor = "#f9f9f9";
            let m4 = document.createElement("div");
            m4.style.display = "flex";
            m4.style.alignItems = "center";
            m4.style.width = "100%";
            let m5 = document.createElement("img");
            m5.src = m2.icon;
            m5.title = "创建时间 " + (m2.createdAt === null ? "未知" : new Date(m2.createdAt)) + " / 最后更新 " + (m2.updatedAt === null ? "未知" : new Date(m2.updatedAt));
            m5.alt = "icon";
            m5.style.width = "24px";
            m5.style.height = "24px";
            m5.style.marginRight = "10px";
            let m6 = document.createElement("span");
            m6.textContent = m2.title;
            m6.className = "item-name";
            m6.title = m2.description;
            m6.style.flexGrow = "1";
            m6.style.marginRight = "10px";
            let m7 = document.createElement("button");
            m7.textContent = m2.obtained ? "✅" : "❌";
            m7.style.cursor = m2.obtained ? "default" : "pointer";
            m7.title = m2.obtained ? "已获得该成就" : "获得";
            m7.style.marginRight = "5px";
            if (!m2.obtained) {
              m7.addEventListener("click", () => {
                this.extension.apis.obtainAchievement(m2.oid);
                m2.obtained = true;
                m7.style.cursor = "default";
                m7.textContent = "✅";
                m7.title = "已获得该成就";
              }, {
                once: true
              });
            }
            let m8 = document.createElement("input");
            m8.type = "text";
            m8.value = m2.recordExt ?? "";
            m8.placeholder = "(无附加说明)";
            m8.style.color = "#666";
            m8.style.backgroundColor = "transparent";
            m8.style.width = "100%";
            m8.style.outline = "none";
            m8.style.border = "none";
            m8.addEventListener("change", () => {
              if (m2.recordExt !== m8.value) {
                m2.recordExt = m8.value;
                this.extension.apis.updateAchievementExtra(m2.oid, m8.value);
              }
            });
            m4.appendChild(m5);
            m4.appendChild(m6);
            m4.appendChild(m7);
            m3.appendChild(m4);
            m3.appendChild(m8);
            m0.appendChild(m3);
          });
        }
        XF.appendChild(m0);
      } else {
        if (!this.fetchingAchievement) {
          fetch("https://gandi-main.ccw.site/achievements?creationId=" + this.extension.runtime.ccwAPI.getProjectUUID() + "&perPage=200", {
            credentials: "include"
          }).then(m3 => m3.json()).then(m3 => {
            if (m3.body) {
              this.achievementList = m3.body.data;
              this.fetchingAchievement = false;
              this.manager.requestUpdate();
            }
          });
        }
        this.fetchingAchievement = true;
        let m2 = document.createElement("strong");
        m2.style.color = "#999";
        m2.textContent = "加载中...";
        m2.style.display = "block";
        m2.style.textAlign = "center";
        XF.appendChild(m2);
      }
      this.manager.target.appendChild(XF);
    }
    render() {
      let XF = document.createElement("div");
      XF.style.display = "flex";
      XF.style.justifyContent = "center";
      let Xq = document.createElement("button");
      Xq.textContent = "成就";
      Xq.style.flexGrow = "1";
      Xq.style.padding = "10px";
      Xq.style.border = "1px solid #ddd";
      Xq.style.borderBottom = this.selected === "achievement" ? "none" : "1px solid #ddd";
      Xq.style.backgroundColor = this.selected === "achievement" ? "#f9f9f9" : "#fff";
      Xq.style.cursor = "pointer";
      Xq.addEventListener("click", () => {
        this.selected = "achievement";
        this.manager.requestUpdate();
      });
      let XS = document.createElement("button");
      XS.textContent = "排行榜";
      XS.style.flexGrow = "1";
      XS.style.padding = "10px";
      XS.style.border = "1px solid #ddd";
      XS.style.borderBottom = this.selected === "leaderboard" ? "none" : "1px solid #ddd";
      XS.style.backgroundColor = this.selected === "leaderboard" ? "#f9f9f9" : "#fff";
      XS.style.cursor = "pointer";
      XS.addEventListener("click", () => {
        this.selected = "leaderboard";
        this.manager.requestUpdate();
      });
      XF.appendChild(Xq);
      XF.appendChild(XS);
      this.manager.target.appendChild(XF);
      if (this.selected === "achievement") {
        this.renderAchievements();
      } else {
        this.renderLeaderboard();
      }
    }
    dispose() { }
  };
  var Xr = class XF {
    static title = "币池管理";
    constructor(Xq, XS, m0) {
      this.manager = Xq;
      this.extension = XS;
      this.pool = m0;
    }
    static parseRule(Xq) {
      let XS = 0;
      let m0 = "";
      let m1 = [];
      for (let m2 of Xq) {
        if (XS === 0) {
          if (m2 === "[") {
            m1.push(m0);
            m0 = "";
            XS = 1;
          } else {
            m0 += m2;
          }
        } else if (XS === 1) {
          if (m2 === "]") {
            XS = 0;
            m1.push({
              name: m0
            });
            m0 = "";
          } else {
            m0 += m2;
          }
        }
      }
      if (XS !== 0) {
        throw new Error("Brace unclosed");
      }
      if (m0 !== "") {
        m1.push(m0);
      }
      return m1;
    }
    render() {
      let Xq = Xi();
      let XS = document.createElement("div");
      XS.style.display = "flex";
      XS.style.justifyContent = "center";
      let m0 = document.createElement("input");
      m0.type = "text";
      m0.placeholder = "搜索规则...";
      m0.style.padding = "5px";
      m0.style.border = "1px solid #ddd";
      m0.style.width = "100%";
      m0.style.boxSizing = "border-box";
      m0.addEventListener("input", () => {
        let m5 = m0.value.toLowerCase();
        let m6 = m1.children;
        let m7 = false;
        Array.from(m6).forEach(m8 => {
          if (m8.className !== "no-results" && m8.description.toLowerCase().includes(m5)) {
            m8.style.display = "flex";
            m7 = true;
          } else if (m8.className !== "no-results") {
            m8.style.display = "none";
          }
        });
        if (m7) {
          let m8 = m1.querySelector(".no-results");
          if (m8) {
            m1.removeChild(m8);
          }
        } else if (!m1.querySelector(".no-results")) {
          let m9 = document.createElement("li");
          m9.textContent = "(无结果)";
          m9.className = "no-results";
          m9.style.display = "flex";
          m9.style.justifyContent = "center";
          m9.style.alignItems = "center";
          m9.style.width = "100%";
          m9.style.height = "100%";
          m9.style.color = "#999";
          m1.appendChild(m9);
        }
      });
      XS.appendChild(m0);
      this.manager.target.appendChild(XS);
      let m1 = document.createElement("ul");
      m1.style.marginTop = "10px";
      m1.style.padding = "0";
      m1.style.margin = "0";
      m1.style.listStyleType = "none";
      if (this.pool.rules.length === 0) {
        let m5 = document.createElement("li");
        m5.textContent = "(无结果)";
        m5.className = "no-results";
        m5.style.display = "flex";
        m5.style.justifyContent = "center";
        m5.style.alignItems = "center";
        m5.style.width = "100%";
        m5.style.height = "100%";
        m5.style.color = "#999";
        m1.appendChild(m5);
      } else {
        this.pool.rules.forEach(m6 => {
          let m7 = document.createElement("li");
          m7.description = m6.rule.funSignature.zh_cn;
          m7.style.display = "flex";
          m7.style.flexDirection = "column";
          m7.style.alignItems = "flex-start";
          m7.style.marginBottom = "5px";
          m7.style.padding = "5px";
          m7.style.border = "1px solid #ddd";
          m7.style.borderRadius = "4px";
          m7.style.backgroundColor = "#f9f9f9";
          let m8 = document.createElement("div");
          m8.style.display = "flex";
          m8.style.alignItems = "center";
          m8.style.width = "100%";
          let m9 = XF.parseRule(m6.rule.funSignature.zh_cn);
          let mX = {};
          for (let mI of m9) {
            if (typeof mI == "string") {
              let mV = document.createElement("span");
              mV.textContent = mI;
              mV.style.textWrapMode = "nowrap";
              mV.style.overflow = "hidden";
              mV.style.textOverflow = "ellipsis";
              m8.appendChild(mV);
            } else {
              let mE = document.createElement("input");
              mE.type = "number";
              mE.placeholder = mI.name;
              mE.style.border = "none";
              mE.style.outline = "none";
              mE.style.backgroundColor = "transparent";
              mE.style.textWrapMode = "nowrap";
              mE.style.overflow = "hidden";
              mE.style.textOverflow = "ellipsis";
              mE.style.marginRight = "5px";
              mE.style.width = "50px";
              m8.appendChild(mE);
              mX[mI.name] = mE;
            }
          }
          let mm = document.createElement("button");
          mm.textContent = "执行";
          mm.style.cursor = "pointer";
          mm.style.marginLeft = "auto";
          mm.title = m6.rule.title;
          mm.addEventListener("click", () => {
            let mW = false;
            let mC = Object.fromEntries(Object.entries(mX).map(([mH, me]) => {
              let mK = Number(me.value);
              if (me.value === "" || Number.isNaN(mK) || mK <= 0) {
                me.animate([{
                  backgroundColor: "red"
                }, {
                  backgroundColor: ""
                }], {
                  duration: 300
                });
                mW = true;
                return [mH, 0];
              } else {
                return [mH, mK];
              }
            }));
            if (!mW) {
              this.extension.apis.requestExecuteSmartContract(this.pool.id, m6.id, m6.rule.code, mC);
            }
          });
          m8.appendChild(mm);
          m7.appendChild(m8);
          m1.appendChild(m7);
        });
      }
      Xq.appendChild(m1);
      this.manager.target.appendChild(Xq);
      let m2 = document.createElement("div");
      m2.style.display = "flex";
      m2.style.flexDirection = "row";
      m2.style.alignItems = "flex-start";
      m2.style.padding = "5px";
      m2.style.border = "1px solid #ddd";
      m2.style.borderRadius = "4px";
      m2.style.backgroundColor = "#f9f9f9";
      let m3 = document.createElement("button");
      m3.textContent = "规则详情";
      m3.style.cursor = "pointer";
      m3.style.marginRight = "5px";
      m3.title = "查看规则详情";
      m3.addEventListener("click", () => {
        this.extension.apis.showSmartContractDetail(this.pool.id);
      });
      m2.appendChild(m3);
      let m4 = document.createElement("button");
      m4.textContent = "无偿注资";
      m4.style.cursor = "pointer";
      m4.title = "进行无偿注资";
      m4.addEventListener("click", () => {
        this.extension._requestFund({
          contractId: this.pool.id
        });
      });
      m2.appendChild(m4);
      this.manager.target.appendChild(m2);
    }
    dispose() { }
  };
  var Xh = class {
    static title = "经济合约";
    constructor(Xq, XS) {
      this.manager = Xq;
      this.extension = XS;
      this.pools = null;
      this.fetching = false;
    }
    render() {
      let Xq = Xi();
      if (this.pools) {
        let XS = document.createElement("div");
        XS.style.display = "flex";
        XS.style.justifyContent = "center";
        let m0 = document.createElement("input");
        m0.type = "text";
        m0.placeholder = "搜索合约...";
        m0.style.padding = "5px";
        m0.style.border = "1px solid #ddd";
        m0.style.width = "100%";
        m0.style.boxSizing = "border-box";
        m0.addEventListener("input", () => {
          let m2 = m0.value.toLowerCase();
          let m3 = m1.children;
          let m4 = false;
          Array.from(m3).forEach(m5 => {
            if (m5.className !== "no-results" && m5.querySelector(".item-name").textContent.toLowerCase().includes(m2)) {
              m5.style.display = "flex";
              m4 = true;
            } else if (m5.className !== "no-results") {
              m5.style.display = "none";
            }
          });
          if (m4) {
            let m5 = m1.querySelector(".no-results");
            if (m5) {
              m1.removeChild(m5);
            }
          } else if (!m1.querySelector(".no-results")) {
            let m6 = document.createElement("li");
            m6.textContent = "(无结果)";
            m6.className = "no-results";
            m6.style.display = "flex";
            m6.style.justifyContent = "center";
            m6.style.alignItems = "center";
            m6.style.width = "100%";
            m6.style.height = "100%";
            m6.style.color = "#999";
            m1.appendChild(m6);
          }
        });
        XS.appendChild(m0);
        this.manager.target.appendChild(XS);
        let m1 = document.createElement("ul");
        m1.style.marginTop = "10px";
        m1.style.padding = "0";
        m1.style.margin = "0";
        m1.style.listStyleType = "none";
        this.pools.forEach(m2 => {
          let m3 = {
            DUCK_MAKER: "鸭里奥",
            GENERAL: "通用",
            GENERAL_NO_SPLIT: "通用 (作者无分成)"
          };
          let m4 = document.createElement("li");
          m4.style.display = "flex";
          m4.style.flexDirection = "column";
          m4.style.alignItems = "flex-start";
          m4.style.marginBottom = "5px";
          m4.style.padding = "5px";
          m4.style.border = "1px solid #ddd";
          m4.style.borderRadius = "4px";
          m4.style.backgroundColor = "#f9f9f9";
          let m5 = document.createElement("div");
          m5.style.display = "flex";
          m5.style.alignItems = "center";
          m5.style.width = "100%";
          let m6 = document.createElement("span");
          m6.textContent = m2.title;
          m6.className = "item-name";
          if (m2.status !== "ENABLED") {
            m6.style.color = "#999";
          }
          m6.title = "创建时间 " + (m2.createdAt === null ? "未知" : new Date(m2.createdAt)) + " / 最后更新 " + new Date(m2.updatedAt === null ? "未知" : m2.updatedAt);
          m6.style.flexGrow = "1";
          m6.style.marginRight = "10px";
          let m7 = document.createElement("button");
          m7.textContent = "🔍";
          m7.style.cursor = "pointer";
          m7.style.marginRight = "5px";
          m7.title = "查看合约";
          m7.addEventListener("click", () => {
            this.manager.open(new Xr(this.manager, this.extension, m2));
          });
          let m8 = document.createElement("span");
          m8.title = m8.textContent = "(" + (m2.status === "ENABLED" ? "可用" : "不可用") + ") " + (m3[m2.type] ?? "未知") + " / " + m2.balance + " 币";
          m8.style.textWrap = "nowrap";
          m8.style.overflow = "hidden";
          m8.style.textOverflow = "ellipsis";
          m8.style.maxWidth = "400px";
          m8.style.color = "#666";
          m8.style.width = "100%";
          m5.appendChild(m6);
          m5.appendChild(m7);
          m4.appendChild(m5);
          m4.appendChild(m8);
          m1.appendChild(m4);
        });
        Xq.appendChild(m1);
      } else {
        if (!this.fetching) {
          (async () => {
            let m3 = await this.extension.apis.getSmartContractList();
            for (let m4 of m3) {
              m4.balance = await this.extension.apis.getSmartContractAccountByContractId(m4.id);
            }
            this.fetching = false;
            this.pools = m3;
            this.manager.requestUpdate();
          })();
        }
        this.fetching = true;
        let m2 = document.createElement("strong");
        m2.style.color = "#999";
        m2.textContent = "加载中...";
        m2.style.display = "block";
        m2.style.textAlign = "center";
        Xq.appendChild(m2);
      }
      this.manager.target.appendChild(Xq);
    }
    dispose() { }
  };
  var Xg = class {
    static title = "MMO";
    constructor(Xq, XS) {
      this.manager = Xq;
      this.extension = XS;
      this.inputing = false;
    }
    render() {
      if (this.extension.currentRoom) {
        let Xq = document.createElement("p");
        Xq.textContent = "过滤广播";
        Xq.style.fontSize = "16px";
        Xq.style.marginBottom = "5px";
        this.manager.target.appendChild(Xq);
        let XS = document.createElement("p");
        XS.textContent = "您可以在这里管理广播的黑名单。";
        XS.style.cursor = "help";
        XS.title = "广播格式如下：\n消息类型(session=\"\",uuid=\"\",name=\"\",content=\"\")";
        XS.style.fontSize = "12px";
        this.manager.target.appendChild(XS);
        let m0 = document.createElement("p");
        m0.textContent = "如果消息的内容匹配任何一个正则表达式，它将不会被 Scratch 处理。";
        m0.style.fontSize = "12px";
        m0.style.marginBottom = "10px";
        this.manager.target.appendChild(m0);
        let m1 = Xi();
        let m2 = document.createElement("ul");
        if (Xe.mmo.broadcastBlackList.length === 0) {
          let mX = document.createElement("li");
          mX.textContent = "(无结果)";
          mX.className = "no-results";
          mX.style.display = "flex";
          mX.style.justifyContent = "center";
          mX.style.alignItems = "center";
          mX.style.width = "100%";
          mX.style.height = "100%";
          mX.style.color = "#999";
          m2.appendChild(mX);
        } else {
          Xe.mmo.broadcastBlackList.forEach((mm, mI) => {
            let mV = document.createElement("li");
            mV.style.display = "flex";
            mV.style.alignItems = "center";
            mV.style.justifyContent = "space-between";
            mV.style.padding = "5px 0";
            let mE = document.createElement("span");
            mE.textContent = mm.toString();
            mE.style.flexGrow = "1";
            let mW = document.createElement("button");
            mW.textContent = "❌";
            mW.title = "删除";
            mW.style.marginLeft = "10px";
            mW.addEventListener("click", () => {
              Xe.mmo.broadcastBlackList.splice(mI, 1);
              this.manager.requestUpdate();
            });
            mV.appendChild(mE);
            mV.appendChild(mW);
            m2.appendChild(mV);
          });
        }
        m1.appendChild(m2);
        this.manager.target.appendChild(m1);
        let m3 = document.createElement("div");
        m3.style.display = "flex";
        let m4 = document.createElement("span");
        m4.textContent = "/";
        m4.style.marginRight = "5px";
        m3.appendChild(m4);
        let m5 = document.createElement("input");
        m5.type = "text";
        m5.placeholder = "添加新的正则表达式...";
        m5.style.flexGrow = "1";
        m5.addEventListener("keypress", mm => {
          if (mm.key === "Enter") {
            try {
              let mI = new RegExp(m5.value, "g");
              Xe.mmo.broadcastBlackList.push(mI);
              this.inputing = true;
              this.manager.requestUpdate();
            } catch {
              m5.animate([{
                color: "red"
              }, {
                color: ""
              }], {
                duration: 300
              });
            }
          }
        });
        if (this.inputing) {
          this.inputing = false;
          m5.select();
        }
        m3.appendChild(m5);
        let m6 = document.createElement("span");
        m6.textContent = "/g";
        m6.style.marginLeft = "5px";
        m3.appendChild(m6);
        this.manager.target.appendChild(m3);
        let m7 = document.createElement("p");
        m7.textContent = "发送广播";
        this.manager.target.appendChild(m7);
        let m8 = document.createElement("p");
        m8.textContent = "您可以在这里发送广播。";
        m8.style.cursor = "help";
        m8.title = "广播格式如下：\n消息类型(\"\")\n如果没有内容，则 content 可以省略：\n消息类型()";
        m8.style.fontSize = "12px";
        this.manager.target.appendChild(m8);
        let m9 = document.createElement("input");
        m9.type = "text";
        m9.style.width = "100%";
        m9.placeholder = "广播内容...";
        m9.style.display = "block";
        m9.style.marginTop = "10px";
        m9.addEventListener("keypress", mm => {
          if (mm.key === "Enter") {
            let mI;
            if (mI = m9.value.match(/(.*?)\("(.*?)"\)/)) {
              try {
                this.extension.broadcastMsg({
                  type: mI[1],
                  content: JSON.parse("\"" + mI[2] + "\"")
                });
                m9.value = "";
              } catch {
                m9.animate([{
                  color: "red"
                }, {
                  color: ""
                }], {
                  duration: 300
                });
              }
            } else if (mI = m9.value.match(/(.*?)\(\)/)) {
              try {
                this.extension.broadcastMsg({
                  type: mI[1],
                  content: ""
                });
                m9.value = "";
              } catch {
                m9.animate([{
                  color: "red"
                }, {
                  color: ""
                }], {
                  duration: 300
                });
              }
            } else {
              m9.animate([{
                color: "red"
              }, {
                color: ""
              }], {
                duration: 300
              });
            }
          }
        });
        this.manager.target.appendChild(m9);
      } else {
        let mm = document.createElement("p");
        mm.textContent = "现在没有加入任何房间。请在加入房间后重新打开此页面。";
        this.manager.target.appendChild(mm);
      }
    }
    dispose() { }
  };
  var Xz = class {
    constructor(Xq, XS, m0) {
      this.manager = Xq;
      this.isSuccess = XS;
      this.message = m0;
      setTimeout(() => {
        this.manager.removeOverlay(this);
      }, 3000);
    }
    render() {
      let Xq = this.manager.target;
      let XS = document.createElement("div");
      XS.textContent = this.message;
      XS.style.width = "100%";
      XS.style.backgroundColor = this.isSuccess ? "green" : "red";
      XS.style.color = "white";
      XS.style.textAlign = "center";
      XS.style.padding = "5px";
      XS.style.fontSize = "12px";
      XS.style.boxSizing = "border-box";
      XS.animate([{
        transform: "translateY(-100%)"
      }, {
        transform: "translateY(0)"
      }], {
        duration: 300,
        easing: "ease-in-out"
      });
      XS.style.position = "relative";
      XS.style.zIndex = "-1";
      Xq.appendChild(XS);
    }
    dispose() { }
  };
  X7(new URL("https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/editor/editor.main.css"));
  window.MonacoEnvironment = {
    getWorkerUrl(Xq) {
      if (Xq === "workerMain.js") {
        return "data:text/javascript;base64," + btoa("(function(fetch){globalThis.fetch=function(url,...args){return fetch.call(this,'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/base/worker/'+url,...args);};})(globalThis.fetch);importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/base/worker/workerMain.js');");
      }
    }
  };
  var XL = import("https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm");
  var Xn = class {
    static title = "高级";
    constructor(Xq) {
      this.manager = Xq;
      this.Monaco = null;
      XL.then(XS => {
        this.Monaco = XS;
        this.manager.requestUpdate();
      });
      this.editor = null;
      this.overlay = null;
    }
    run(Xq) {
      let XS = {
        async vm() {
          let m0 = await X9;
          return new Xu(m0);
        },
        get ccwdata() {
          return globalThis.ccwdata;
        }
      };
      return new async function () { }.constructor("engine", Xq)(XS);
    }
    render() {
      if (this.Monaco) {
        if (this.editor) {
          this.editor.dispose();
        }
        let Xq = document.createElement("div");
        Xq.style.display = "flex";
        Xq.style.flexDirection = "column";
        Xq.style.alignItems = "center";
        Xq.style.padding = "10px";
        let XS = document.createElement("p");
        XS.textContent = "你可以指定一个自定义脚本用于进行自动化操作。可使用命令面板运行脚本。";
        XS.style.marginBottom = "10px";
        Xq.appendChild(XS);
        let m0 = document.createElement("div");
        m0.style.width = "100%";
        m0.style.height = "300px";
        m0.style.marginBottom = "10px";
        let m1 = window.localStorage.getItem("__csense-storaged-script") ?? "// 这是 CSense Scripting API 的使用示例。\nconst vm = await engine.vm()\nconst target = vm.sprite('Stage').clones[0]\ntarget.var('我的变量').set('你好').watch(function (before, after) {\nreturn '你好，' + after\n}) // .freezing = true\n";
        this.editor = this.Monaco.editor.create(m0, {
          value: m1,
          automaticLayout: true,
          language: "javascript"
        });
        this.editor.addAction({
          id: "csense.execute",
          label: "运行脚本",
          contextMenuGroupId: "csense",
          run: () => {
            let m2 = this.run(this.editor.getValue());
            this.overlay = new Xz(this.manager, true, "脚本已运行。");
            this.manager.addOverlay(this.overlay);
            m2.then(() => { }, m3 => {
              console.error(m3);
              if (this.overlay) {
                this.overlay.isSuccess = false;
                this.overlay.message = "发生错误。请检查 DevTools 控制台。";
                this.manager.requestUpdate();
              }
            });
          }
        });
        this.editor.onDidChangeModelContent(() => {
          window.localStorage.setItem("__csense-storaged-script", this.editor.getValue());
        });
        Xq.appendChild(m0);
        this.manager.target.appendChild(Xq);
      } else {
        let m2 = document.createElement("strong");
        m2.style.color = "#999";
        m2.textContent = "加载中...";
        m2.style.display = "block";
        m2.style.textAlign = "center";
        this.manager.target.appendChild(m2);
      }
    }
    dispose() {
      this.editor.dispose();
      this.manager.removeOverlay(this.overlay);
      this.overlay = null;
    }
  };
  var XD = class {
    static title = "关于";
    constructor(Xq) {
      this.manager = Xq;
    }
    pSmall(Xq) {
      let XS = document.createElement("p");
      XS.textContent = Xq;
      XS.style.textAlign = "center";
      XS.style.fontSize = "small";
      return XS;
    }
    render() {
      let Xq = Xi();
      let XS = document.createElement("div");
      let m0 = document.createElement("img");
      m0.src = Xb;
      m0.alt = "CSense";
      m0.style.display = "block";
      m0.style.margin = "0 auto";
      m0.style.width = "120px";
      m0.style.height = "120px";
      m0.style.marginTop = "30px";
      m0.style.marginBottom = "20px";
      XS.appendChild(m0);
      let m1 = document.createElement("p");
      m1.textContent = "一个 CCW 安全审计工具。";
      m1.style.textAlign = "center";
      m1.style.fontWeight = "bold";
      m1.style.fontSize = "small";
      XS.appendChild(m1);
      XS.appendChild(this.pSmall("此工具属于 Public Domain。"));
      XS.appendChild(this.pSmall("使用此工具即代表您愿意为您的所有行为负全部责任，与此工具的开发者无关。"));
      XS.appendChild(this.pSmall("如果能力允许，您可以对此工具进行自由修改、分发、二次创作。但为了避免它遭到滥用，我们对工具添加了加密和完整性保护。"));
      XS.appendChild(this.pSmall("请勿将此工具用于非法用途。"));
      XS.appendChild(this.pSmall("感谢 axolotl 先生提供的技术支持。"));
      Xq.appendChild(XS);
      this.manager.target.appendChild(Xq);
    }
    dispose() { }
  };
  var Xp = class {
    static title = "云数据管理";
    constructor(Xq, XS) {
      this.manager = Xq;
      this.extension = XS;
      this.selected = "project";
      this.disposed = false;
      this.lastFocused = null;
      this.noResultsItem = null;
      this.inputs = {};
      let m0 = () => {
        let m1 = Xe.ccwdata[this.selected];
        for (let [m2, m3] of m1.entries()) {
          if (this.inputs[m2]) {
            if (this.inputs[m2].value !== m3 && this.inputs[m2] !== this.lastFocused) {
              this.inputs[m2].animate([{
                color: "red"
              }, {
                color: ""
              }], {
                duration: 300
              });
              this.inputs[m2].value = m3;
            }
          } else {
            let m4 = this.createListElement(this.selected, m2);
            this.inputs[m2] = m4[1];
            this.manager.target.querySelector("ul").appendChild(m4[2]);
            if (this.noResultsItem) {
              this.noResultsItem.remove();
              this.noResultsItem = null;
            }
          }
        }
        if (!this.disposed) {
          requestAnimationFrame(m0);
        }
      };
      requestAnimationFrame(m0);
    }
    createListElement(Xq, XS) {
      let m0 = Xe.ccwdata[Xq].get(XS);
      let m1 = document.createElement("li");
      m1.style.display = "flex";
      m1.style.alignItems = "center";
      m1.style.marginBottom = "5px";
      m1.style.padding = "5px";
      m1.style.border = "1px solid #ddd";
      m1.style.borderRadius = "4px";
      m1.style.backgroundColor = "#f9f9f9";
      let m2 = document.createElement("span");
      m2.textContent = XS;
      m2.style.flexGrow = "1";
      m2.style.marginRight = "10px";
      m2.className = "item-name";
      let m3 = document.createElement("input");
      m3.type = "text";
      m3.style.fontFamily = "monospace";
      m3.value = Array.isArray(m0) ? JSON.stringify(m0) : m0;
      m3.style.flexGrow = "2";
      m3.style.marginRight = "10px";
      m3.addEventListener("change", () => {
        if (Xq === "project") {
          this.extension._setValueToProject(XS, m3.value);
        } else {
          this.extension._setValueToUser(XS, m3.value);
        }
      });
      m3.addEventListener("focus", () => {
        this.lastFocused = m3;
      });
      m3.addEventListener("blur", () => {
        this.lastFocused = null;
      });
      m1.appendChild(m2);
      m1.appendChild(m3);
      return [XS, m3, m1];
    }
    render() {
      let Xq = document.createElement("div");
      Xq.style.display = "flex";
      Xq.style.justifyContent = "center";
      let XS = document.createElement("button");
      XS.textContent = "作品";
      XS.style.flexGrow = "1";
      XS.style.padding = "10px";
      XS.style.border = "1px solid #ddd";
      XS.style.borderBottom = this.selected === "project" ? "none" : "1px solid #ddd";
      XS.style.backgroundColor = this.selected === "project" ? "#f9f9f9" : "#fff";
      XS.style.cursor = "pointer";
      XS.addEventListener("click", () => {
        this.selected = "project";
        this.manager.requestUpdate();
      });
      let m0 = document.createElement("button");
      m0.textContent = "用户";
      m0.style.flexGrow = "1";
      m0.style.padding = "10px";
      m0.style.border = "1px solid #ddd";
      m0.style.borderBottom = this.selected === "user" ? "none" : "1px solid #ddd";
      m0.style.backgroundColor = this.selected === "user" ? "#f9f9f9" : "#fff";
      m0.style.cursor = "pointer";
      m0.addEventListener("click", () => {
        this.selected = "user";
        this.manager.requestUpdate();
      });
      Xq.appendChild(XS);
      Xq.appendChild(m0);
      this.manager.target.appendChild(Xq);
      let m1 = document.createElement("input");
      m1.type = "text";
      m1.placeholder = "搜索变量...";
      m1.style.padding = "5px";
      m1.style.border = "1px solid #ddd";
      m1.style.width = "100%";
      m1.style.boxSizing = "border-box";
      m1.addEventListener("input", () => {
        let m5 = m1.value.toLowerCase();
        let m6 = m4.children;
        let m7 = false;
        Array.from(m6).forEach(m8 => {
          if (m8.className !== "no-results" && m8.querySelector(".item-name").textContent.toLowerCase().includes(m5)) {
            m8.style.display = "flex";
            m7 = true;
          } else if (m8.className !== "no-results") {
            m8.style.display = "none";
          }
        });
        if (m7) {
          let m8 = m4.querySelector(".no-results");
          if (m8) {
            m4.removeChild(m8);
          }
        } else if (!m4.querySelector(".no-results")) {
          let m9 = document.createElement("li");
          m9.textContent = "(无结果)";
          m9.className = "no-results";
          m9.style.display = "flex";
          m9.style.justifyContent = "center";
          m9.style.alignItems = "center";
          m9.style.width = "100%";
          m9.style.height = "100%";
          m9.style.color = "#999";
          m4.appendChild(m9);
        }
      });
      this.manager.target.appendChild(m1);
      let m2 = Xi();
      let m3 = Xe.ccwdata[this.selected];
      let m4 = document.createElement("ul");
      m4.style.padding = "0";
      m4.style.margin = "0";
      m4.style.listStyleType = "none";
      m4.style.marginTop = "10px";
      if (m3.keys().length === 0) {
        let m5 = document.createElement("li");
        m5.textContent = "(无结果)";
        m5.className = "no-results";
        m5.style.display = "flex";
        m5.style.justifyContent = "center";
        m5.style.alignItems = "center";
        m5.style.width = "100%";
        m5.style.height = "100%";
        m5.style.color = "#999";
        this.noResultsItem = m5;
        m4.appendChild(m5);
      } else {
        this.inputs = Object.fromEntries(m3.keys().map(m6 => {
          let m7 = this.createListElement(this.selected, m6);
          m4.appendChild(m7[2]);
          return [m6, m7[1]];
        }));
      }
      m2.appendChild(m4);
      this.manager.target.appendChild(m2);
    }
    dispose() {
      this.disposed = true;
    }
  };
  var XZ = "0.1.3";
  var Xw = ["Boolean", "Number", "String", "Object", "Set", "Symbol", "Array", "Function", "BigInt", "NaN", "undefined", "Infinity", "Error", "EvalError", "JSON", "Proxy", "Promise", "RangeError", "ReferenceError", "Reflect", "RegExp", "eval", "Map", "Math", "SyntaxError", "TypeError", "URIError", "URL", "Date", "WeakMap", "WeakRef", "WeakSet", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "isFinite", "isNaN", "parseFloat", "parseInt", "unescape", "atob", "btoa", "AggregateError", "structuredClone", "Atomics", "FinalizationRegistry", "Intl"];
  function XY() {
    let Xq = document.createElement("iframe");
    Xq.src = "about:blank";
    Xq.style.display = "none";
    document.head.appendChild(Xq);
    let XS = Xq.contentWindow;
    document.head.removeChild(Xq);
    if (!XS || !XS.Function) {
      throw new Error("Could not create context");
    }
    for (let m0 of Reflect.ownKeys(XS)) {
      if (!Xw.includes(m0)) {
        try {
          if (Object.is(Reflect.get(XS, m0), XS)) {
            continue;
          }
        } catch { }
        if (!Reflect.deleteProperty(XS, m0)) {
          try {
            Reflect.set(XS, m0, undefined);
            if (Reflect.get(XS, m0)) {
              throw new Error();
            }
          } catch {
            let m1 = Reflect.get(XS, m0);
            if (typeof m1 == "object" && m1 !== null) {
              Reflect.setPrototypeOf(m1, null);
              Reflect.preventExtensions(m1);
            }
          }
        }
      }
    }
    return XS;
  }
  function Xx(Xq) {
    let XS = XY();
    let m0 = (m5, m6, m7, m8) => {
      let m9 = (mX, mm) => {
        if (mX === null || typeof mX != "object" && typeof mX != "function") {
          return mX;
        }
        if (m5.has(mX)) {
          let mV = m5.get(mX)?.deref();
          if (mV !== undefined) {
            return mV;
          }
          m5.delete(mX);
        }
        for (let [mE, mW] of m6.entries()) {
          let mC = mW.deref();
          if (mC === undefined) {
            m6.delete(mE);
          }
          if (mC === mX) {
            return mE;
          }
        }
        if (typeof mX == "function" && mm === undefined) {
          return m9(mX, function () { });
        }
        let mI = new Proxy(mm ?? mX, {
          get(mH, me) {
            try {
              let mK = Reflect.get(mX, me);
              if (mK === Function && m8) {
                return XS.Function;
              } else {
                return m9(mK);
              }
            } catch (mU) {
              throw m9(mU);
            }
          },
          has(mH, me) {
            return Reflect.has(mX, me);
          },
          deleteProperty(mH, me) {
            return Reflect.deleteProperty(mX, me);
          },
          ownKeys() {
            return Reflect.ownKeys(mX);
          },
          set(mH, me, mK) {
            try {
              return Reflect.set(mX, me, m7(mK));
            } catch (mU) {
              throw m9(mU);
            }
          },
          apply(mH, me, mK) {
            try {
              let mU = [];
              for (let mv of mK) {
                mU.push(m7(mv));
              }
              return m9(Reflect.apply(mX, m7(me), mU));
            } catch (mM) {
              throw m9(mM);
            }
          },
          construct(mH, me) {
            try {
              let mK = [];
              for (let mU of me) {
                mK.push(m7(mU));
              }
              return m9(Reflect.construct(mX, mK));
            } catch (mv) {
              throw m9(mv);
            }
          },
          getOwnPropertyDescriptor(mH, me) {
            let mK = Reflect.getOwnPropertyDescriptor(mX, me);
            if (mK !== undefined) {
              if (typeof mX == "function" && me === "prototype") {
                let mU = Reflect.getOwnPropertyDescriptor(mH, me);
                if (mU === undefined) {
                  return undefined;
                } else {
                  if (mK.value !== undefined) {
                    mU.value = m9(mK.value);
                  }
                  if (mK.get) {
                    mU.get = m9(mK.get);
                  }
                  if (mK.set) {
                    mU.set = m9(mK.set);
                  }
                  return mU;
                }
              }
              if (mK.value !== undefined) {
                mK.value = m9(mK.value);
              }
              mK.get &&= m9(mK.get);
              mK.set &&= m9(mK.set);
              return mK;
            }
          },
          isExtensible() {
            return Reflect.isExtensible(mX);
          },
          preventExtensions() {
            return Reflect.preventExtensions(mX);
          },
          setPrototypeOf(mH, me) {
            return Reflect.setPrototypeOf(mX, m7(me));
          },
          defineProperty(mH, me, mK) {
            if ("value" in mK) {
              return Reflect.defineProperty(mX, me, {
                value: m7(mK.value),
                writable: mK.writable,
                enumerable: mK.enumerable,
                configurable: mK.configurable
              });
            }
            let mU = mK.get ? m7(function () {
              return mK.get?.call(m9(this));
            }) : undefined;
            let mv = mK.set ? m7(function (mM) {
              return mK.set?.call(m9(this), mM);
            }) : undefined;
            if (mU) {
              m5.set(mU, new WeakRef(mK.get));
            }
            if (mv) {
              m5.set(mv, new WeakRef(mK.set));
            }
            return Reflect.defineProperty(mX, me, {
              get: mU,
              set: mv,
              enumerable: mK.enumerable,
              configurable: true
            });
          },
          getPrototypeOf() {
            let mH = Reflect.getPrototypeOf(mX);
            if (mH === null) {
              return mH;
            } else {
              return m9(mH);
            }
          }
        });
        m5.set(mX, new WeakRef(mI));
        return mI;
      };
      return m9;
    };
    let m1 = new Map();
    let m2 = new Map();
    let m3 = null;
    let m4 = m0(m1, m2, (m5, m6) => {
      if (m3) {
        return m3(m5, m6);
      }
      throw new Error("Not implemented");
    }, true);
    m3 = m0(m2, m1, m4, false);
    if (Xq) {
      for (let [m5, m6] of Object.entries(Xq)) {
        Reflect.set(XS, m5, m4(m6));
      }
    }
    return m3(XS);
  }
  var Xo = class Xq {
    static title = "主页";
    static orderBy(XS, m0) {
      return Array.from(XS.entries()).sort((m1, m2) => m0.indexOf(m1[0]) - m0.indexOf(m2[0]));
    }
    constructor(XS) {
      Xe.userInfo = null;
      let m0 = m1 => {
        if (m1.detail.url.endsWith("/students/self/detail")) {
          let m2 = JSON.parse(m1.detail.data);
          if (m2.body) {
            let {
              body: m3
            } = m2;
            if (!this.isProfilePage) {
              Xe.userInfo = {
                userId: m3.studentNumber,
                userName: m3.name,
                uuid: m3.oid,
                oid: m3.oid,
                avatar: m3.avatar,
                constellation: -1,
                following: 0,
                followers: 0,
                liked: 0,
                gender: ["MALE", "FEMALE"].indexOf(m3.gender),
                pendant: "",
                reputationScore: m3.reputationScore
              };
              XS.requestUpdate();
            }
            Xm.removeEventListener("load", m0);
          }
        }
      };
      Xm.addEventListener("load", m0);
      if (window.location.pathname.startsWith("/student/")) {
        this.isProfilePage = true;
        let m1 = m2 => {
          if (m2.detail.url.endsWith("/students/profile")) {
            let m3 = JSON.parse(m2.detail.data);
            if (m3.body) {
              let {
                body: m4
              } = m3;
              Xe.userInfo = {
                userId: m4.studentNumber,
                userName: m4.name,
                uuid: m4.studentOid,
                oid: m4.studentOid,
                avatar: m4.avatar,
                constellation: -1,
                following: 0,
                followers: 0,
                liked: 0,
                gender: ["MALE", "FEMALE"].indexOf(m4.gender),
                pendant: "",
                reputationScore: m4.reputationScore
              };
              XS.requestUpdate();
              Xm.removeEventListener("load", m1);
            }
          }
        };
        Xm.addEventListener("load", m1);
      } else {
        this.isProfilePage = false;
        X9.then(m2 => {
          Xe.vm = m2;
          m2.runtime.on("PROJECT_LOADED", () => {
            this.featureList.set("📝 作品数据", () => this.manager.open(new Xk(this.manager)));
            this.manager.requestUpdate();
          });
          let m3 = m8 => {
            let m9 = m8.getUserInfo;
            m8.getUserInfo = async function () {
              if (Xe.userInfo) {
                return Xe.userInfo;
              } else {
                return await m9.call(this);
              }
            };
          };
          if (m2.runtime.ccwAPI) {
            m3(m2.runtime.ccwAPI);
          }
          let m4 = m2.runtime.setCCWAPI;
          m2.runtime.setCCWAPI = function (m8) {
            m4.call(this, m8);
            m3(m8);
          };
          let m5 = m2.runtime.ioDevices.userData._username;
          Object.defineProperty(m2.runtime.ioDevices.userData, "_username", {
            get: () => Xe.userInfo ? Xe.userInfo.userName : m5,
            set(m8) {
              m5 = m8;
            }
          });
          let m6 = m2.runtime.constructor.prototype.compilerRegisterExtension;
          let m7 = m8 => {
            Object.defineProperties(m8, {
              UserId: {
                get() {
                  return Xe.userInfo?.userId;
                },
                set() { }
              },
              ccwUserNickname: {
                get() {
                  return Xe.userInfo?.userName;
                },
                set() { }
              },
              ccwUserUUID: {
                get() {
                  return Xe.userInfo?.userId;
                },
                set() { }
              }
            });
          };
          X6(m2.extensionManager, "isValidExtensionURL", m8 => function (m9) {
            if (m9.startsWith("blob:")) {
              return true;
            } else {
              return m8.call(this, m9);
            }
          });
          X6(m2.extensionManager, "loadExtensionURL", m8 => async function (m9, mX = false) {
            if (m9.startsWith("https://m.ccw.site/user_projects_assets/")) {
              let mm = await fetch(m9).then(mV => mV.text());
              let mI = await XL;
              return new Promise(mV => {
                let mE = document.createElement("div");
                mE.style.position = "fixed";
                mE.style.top = "0";
                mE.style.left = "0";
                mE.style.width = "100%";
                mE.style.height = "100%";
                mE.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                mE.style.zIndex = "1000";
                mE.style.display = "flex";
                mE.style.flexDirection = "column";
                mE.style.justifyContent = "center";
                mE.style.alignItems = "center";
                mE.style.color = "#fff";
                mE.style.fontSize = "18px";
                mE.style.textAlign = "center";
                let mW = document.createElement("div");
                mW.style.backgroundColor = "#fff";
                mW.style.borderRadius = "10px";
                mW.style.padding = "20px";
                mW.style.color = "#000";
                mW.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
                mW.style.textAlign = "left";
                let mC = document.createElement("p");
                mC.textContent = "作品正在尝试加载一个自定义扩展 (" + m9 + ")。您可以编辑此扩展的内容。";
                mW.appendChild(mC);
                let mH = document.createElement("div");
                mH.style.width = "100%";
                mH.style.height = "300px";
                mH.style.marginBottom = "10px";
                let me = mI.editor.create(mH, {
                  value: mm,
                  automaticLayout: true,
                  language: "javascript"
                });
                me.onDidChangeModelContent(() => {
                  mm = me.getValue();
                });
                mW.appendChild(mH);
                let mK = document.createElement("button");
                mK.textContent = "加载";
                mK.style.marginTop = "20px";
                mK.style.padding = "10px 20px";
                mK.style.fontSize = "16px";
                mK.style.cursor = "pointer";
                mK.addEventListener("click", () => {
                  me.dispose();
                  let mU = URL.createObjectURL(new File([mm], "extension.js", {
                    type: "application/javascript"
                  }));
                  document.body.removeChild(mE);
                  X6(document, "createElement", mv => function (mM) {
                    if (mM === "script") {
                      let md = mv.call(this, mM);
                      let mB = new Proxy(md, {
                        set(ms, mA, mG) {
                          if (mA === "src") {
                            return Reflect.set(ms, "src", mU);
                          } else {
                            return Reflect.set(ms, mA, mG);
                          }
                        }
                      });
                      document.createElement = mv;
                      X6(document.body, "append", ms => function (mA) {
                        if (mA === mB) {
                          document.body.append = ms;
                          return ms.call(this, md);
                        } else {
                          return ms.call(this, mA);
                        }
                      });
                      X6(document.body, "removeChild", ms => function (mA) {
                        if (mA === mB) {
                          document.body.removeChild = ms;
                          return ms.call(this, md);
                        } else {
                          return ms.call(this, mA);
                        }
                      });
                      return mB;
                    }
                    return mv.call(this, mM);
                  });
                  mV(m8.call(this, mU, mX));
                });
                mW.appendChild(mK);
                mE.appendChild(mW);
                document.body.appendChild(mE);
              });
            }
            return m8.call(this, m9, mX);
          });
          m2.runtime.compilerRegisterExtension = (m8, m9) => {
            switch (m8) {
              case "community":
                {
                  m9.getCoinCount = () => Infinity;
                  m9.isUserLikedOtherProject = m9.isLiked = m9.isMyFans = m9.isFanOfSomeone = m9.requestFollow = m9.isUserFavoriteOtherProject = () => true;
                  let mX = m9.insertCoinAndWaitForResult;
                  m9.insertCoinAndWaitForResult = function (mm) {
                    if (confirm("作品请求投 " + mm.COUNT + " 个币，是否伪造结果？")) {
                      return true;
                    } else {
                      return mX.call(this, mm);
                    }
                  };
                  break;
                }
              case "GandiAchievementAndLeaderboard":
                {
                  this.featureList.set("🏆 成就相关功能", () => {
                    this.manager.open(new XJ(this.manager, m9));
                  });
                  this.manager.requestUpdate();
                  break;
                }
              case "GandiEconomy":
                {
                  X6(m9, "requestFundReturn", mm => function (mI) {
                    let mV = prompt("作品正在请求合约无偿注资。请输入伪造的注资金额。\n当不输入任何内容时，将自动回落到官方实现。");
                    if (mV === null || mV === "") {
                      return mm.call(this, mI);
                    }
                    let mE = Number(mV);
                    if (Number.isNaN(mE) || mE < 0) {
                      return 0;
                    } else {
                      return mE;
                    }
                  });
                  this.featureList.set("📜 经济合约", () => {
                    this.manager.open(new Xh(this.manager, m9));
                  });
                  break;
                }
              case "CCWMMO":
                {
                  m7(m9);
                  m9.dispatchNewMessageWithParams = function (mm, mI) {
                    let mV = Xe.mmo.broadcastBlackList;
                    let mE = mI.thread.hatParam;
                    let mW = mE.type + "(session=" + JSON.stringify(mE.sender) + ",uuid=" + JSON.stringify(mE.senderUID) + ",name=" + JSON.stringify(mE.name) + ",content=" + JSON.stringify(mE.content) + ")";
                    return !mV.some(mC => mC.test(mW));
                  };
                  this.featureList.set("🎮 MMO 框架", () => {
                    this.manager.open(new Xg(this.manager, m9));
                  });
                  break;
                }
              case "CCWData":
                {
                  let mm = Xx({
                    Scratch: window.Scratch
                  });
                  m7(m9);
                  this.featureList.set("🌩️ 云数据", () => {
                    this.manager.open(new Xp(this.manager, m9));
                  });
                  m9.sendPlayEventCode = () => { };
                  X6(m9, "getValueInJSON", mI => function (mV) {
                    var mE = Scratch.Cast.toString(mV.KEY);
                    var mW = Scratch.Cast.toString(mV.JSON);
                    var mC;
                    try {
                      mC = JSON.parse(mW);
                    } catch (mK) {
                      return `error: ${mK.message}`;
                    }
                    if (/[()=]/gm.test(mE)) {
                      return `error: invalid key ${mE}, cannot contain ()=`;
                    }
                    var mH = `jsonObj[${mE}]`;
                    var me;
                    if (Array.isArray(mC)) {
                      mE = mE.startsWith("[") ? `jsonObj${mE}` : `jsonObj[${mE}]`;
                    } else if (/\s/gm.test(mE)) {
                      console.warn(`[CCW Data] warning: invalid key ${mE}, space and dot cannot be used together`);
                      mE = `jsonObj["${mE}"]`;
                    } else {
                      mE = `jsonObj.${mE}`;
                    }
                    try {
                      me = mm.Function("key", "json", "jsonObj", "key2", "args", mE).call(this, mE, mW, mC, mH, "return eval(" + JSON.stringify(mV) + ")");
                    } catch {
                      try {
                        me = mm.Function("key", "json", "jsonObj", "key2", "args", mE).call(this, mE, mW, mC, mH, "return eval(" + JSON.stringify(mV) + ")");
                      } catch {
                        return "error: key or expression invalid";
                      }
                    }
                    if (typeof me == "object") {
                      return JSON.stringify(me);
                    } else {
                      return me;
                    }
                  });
                  X6(m9, "setValueInJSON", mI => function (mV) {
                    var mE = Scratch.Cast.toString(mV.KEY);
                    var mW = Scratch.Cast.toString(mV.VALUE);
                    var mC = Scratch.Cast.toString(mV.JSON);
                    var mH;
                    try {
                      mH = JSON.parse(mC);
                    } catch (mK) {
                      return `error: ${mK.message}`;
                    }
                    if (/[()=]/gm.test(mE)) {
                      return `error: invalid key ${mE}, cannot contain ()=`;
                    }
                    var me = mW;
                    if (/^[\[].*?[\]]$/gm.test(mW) || /^[\{].*?[\}]$/gm.test(mW)) {
                      try {
                        me = JSON.parse(mW);
                      } catch { }
                    }
                    if (typeof me == "string" && /^-?\d*\.?\d*$/gm.test(me)) {
                      me = Number(me);
                    }
                    try {
                      if (Array.isArray(mH)) {
                        mH[mE] = me;
                      } else if (/[\.\[\]]/gm.test(mE)) {
                        if (me instanceof Object) {
                          me = JSON.stringify(me);
                          me = `JSON.parse('${me}')`;
                        } else if (typeof me == "string") {
                          me = `'${me}'`;
                        }
                        mm.Function("key", "value", "json", "jsonObj", "valueObj", "args", `jsonObj.${mE}=${me}`).call(this, mE, mW, mC, mH, me, mV);
                      } else {
                        mH[mE] = me;
                      }
                    } catch {
                      return "error: key or expression invalid";
                    }
                    return JSON.stringify(mH);
                  });
                  X6(m9, "_getValueFromProject", mI => async function (mV) {
                    let mE = await mI.call(this, mV);
                    Xe.ccwdata.project.set(mV, mE);
                    let mW = Xe.ccwdata.project.get(mV);
                    if (mW !== mE) {
                      return m9._setValueToProject(mV, mW);
                    } else {
                      return mW;
                    }
                  });
                  X6(m9, "_setValueToProject", mI => async function (mV, mE) {
                    Xe.ccwdata.project.set(mV, mE);
                    return await mI.call(this, mV, Xe.ccwdata.project.get(mV));
                  });
                  X6(m9, "_getValueFromUser", mI => async function (mV) {
                    let mE = await mI.call(this, mV);
                    Xe.ccwdata.user.set(mV, mE);
                    let mW = Xe.ccwdata.user.get(mV);
                    if (mW !== mE) {
                      return m9._setValueToUser(mV, mW);
                    } else {
                      return mW;
                    }
                  });
                  X6(m9, "_setValueToUser", mI => async function (mV, mE) {
                    Xe.ccwdata.user.set(mV, mE);
                    return await mI.call(this, mV, Xe.ccwdata.user.get(mV));
                  });
                  break;
                }
            }
            m6.call(m2.runtime, m8, m9);
          };
        });
      }
      this.manager = XS;
      this.animationFrame = null;
      this.avatarRotation = 0;
      this.featureList = new Map([["⚙️ 高级", () => {
        this.manager.open(new Xn(this.manager));
      }], ["ℹ️ 关于", () => {
        this.manager.open(new XD(this.manager));
      }]]);
    }
    static createListButton(XS, m0) {
      let m1 = document.createElement("li");
      m1.textContent = XS;
      m1.style.padding = "10px";
      m1.style.margin = "5px 0";
      m1.style.backgroundColor = "#f0f0f0";
      m1.style.borderRadius = "8px";
      m1.style.cursor = "pointer";
      m1.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      m1.addEventListener("mouseover", () => {
        m1.style.transform = "scale(1.05)";
        m1.style.transition = "transform 0.2s ease-in-out";
      });
      m1.addEventListener("mouseout", () => {
        m1.style.transform = "scale(1)";
      });
      m1.addEventListener("click", m0);
      return m1;
    }
    renderFeatureList() {
      let XS = document.createElement("ul");
      Xq.orderBy(this.featureList, ["📝 作品数据", "🌩️ 云数据", "🎮 MMO 框架", "🏆 成就相关功能", "📜 经济合约", "⚙️ 高级", "ℹ️ 关于"]).forEach(m0 => {
        XS.appendChild(Xq.createListButton(m0[0], m0[1]));
      });
      XS.style.padding = "0";
      XS.style.margin = "0";
      XS.style.listStyleType = "none";
      return XS;
    }
    render() {
      let XS = Xi();
      let m0 = document.createElement("div");
      m0.style.display = "flex";
      m0.style.marginTop = "10px";
      m0.style.flexDirection = "column";
      m0.style.alignItems = "center";
      m0.style.marginBottom = "10px";
      let m1 = document.createElement("img");
      m1.src = Xe.userInfo?.avatar ?? Xb;
      m1.alt = "用户头像";
      m1.style.width = "120px";
      m1.style.height = "120px";
      m1.style.cursor = "pointer";
      m1.style.borderRadius = "50%";
      m1.style.marginBottom = "10px";
      if (!this.isProfilePage && (Xe.userInfo || !document.cookie.includes("cookie-user-id="))) {
        let m6 = m7 => {
          if (m7 && m7.type.startsWith("application/json")) {
            let m8 = new FileReader();
            m8.onload = m9 => {
              Xe.userInfo = JSON.parse(m9.target.result);
              this.manager.requestUpdate();
            };
            m8.readAsText(m7);
          }
        };
        m1.style.transition = "opacity 0.3s ease-in-out";
        m1.title = "导入用户配置文件";
        m1.addEventListener("dragover", m7 => {
          m1.style.opacity = "0.5";
          m7.preventDefault();
        });
        m1.addEventListener("dragleave", m7 => {
          m1.style.opacity = "1";
          m7.preventDefault();
        });
        m1.addEventListener("mouseover", () => {
          m1.style.opacity = "0.5";
        });
        m1.addEventListener("mouseout", () => {
          m1.style.opacity = "1";
        });
        m1.addEventListener("drop", m7 => {
          m1.style.opacity = "1";
          let m8 = m7.dataTransfer.files[0];
          m6(m8);
          m7.preventDefault();
        });
        m1.addEventListener("click", () => {
          let m7 = document.createElement("input");
          m7.type = "file";
          m7.accept = "application/json";
          m7.style.display = "none";
          m7.addEventListener("change", m8 => {
            let m9 = m8.target.files[0];
            m6(m9);
          });
          m7.click();
        });
      } else if (Xe.userInfo) {
        m1.style.transition = "opacity 0.3s ease-in-out";
        m1.title = "下载用户配置文件";
        m1.addEventListener("click", () => {
          let m7 = new Blob([JSON.stringify(Xe.userInfo, null, 2)], {
            type: "application/json"
          });
          let m8 = URL.createObjectURL(m7);
          let m9 = document.createElement("a");
          m9.download = Xe.userInfo.uuid + ".json";
          m9.href = m8;
          m9.click();
          URL.revokeObjectURL(m8);
        });
        m1.addEventListener("mouseover", () => {
          m1.style.opacity = "0.5";
        });
        m1.addEventListener("mouseout", () => {
          m1.style.opacity = "1";
        });
      }
      let m2 = () => {
        if (!Xe.userInfo && document.cookie.includes("cookie-user-id=")) {
          this.avatarRotation += 5;
          m1.style.transform = "rotate(" + this.avatarRotation + "deg)";
          this.animationFrame = requestAnimationFrame(m2);
        } else {
          this.avatarRotation = 0;
          this.animationFrame = null;
        }
      };
      if (!this.animationFrame) {
        m2();
      }
      let m3 = document.createElement("div");
      m3.textContent = Xe.userInfo?.userName ?? (document.cookie.includes("cookie-user-id=") ? "请稍等..." : "未登录");
      m3.style.fontSize = "16px";
      m3.style.fontWeight = "bold";
      m0.appendChild(m1);
      m0.appendChild(m3);
      XS.appendChild(m0);
      let m4 = this.renderFeatureList();
      XS.appendChild(m4);
      let m5 = document.createElement("strong");
      m5.style.color = "#999";
      m5.textContent = "CSense v" + XZ;
      m5.style.display = "block";
      m5.style.textAlign = "center";
      XS.appendChild(m5);
      this.manager.target.appendChild(XS);
    }
    dispose() { }
  };
  var Xl = class {
    constructor(XS) {
      this.manager = XS;
      this.showOverlay = false;
      this.currentVersion = null;
      this.failed = false;
      this.checkVersion();
    }
    async checkVersion() {
      try {
        let XS = XU("csense_latest_version");
        if (typeof XS == "string") {
          this.currentVersion = XS;
        } else {
          let m0 = await (await fetch("https://version.axolotltfgs.workers.dev/version")).json();
          this.currentVersion = m0.version;
          XK("csense_latest_version", this.currentVersion);
        }
        if (XZ !== this.currentVersion) {
          this.showOverlay = true;
          this.manager.requestUpdate();
        }
      } catch {
        this.failed = true;
      }
    }
    render() {
      let XS = this.manager.target;
      if (this.showOverlay) {
        let m0 = document.createElement("div");
        m0.style.cursor = "pointer";
        m0.textContent = "新版本 (" + this.currentVersion + ") 可用";
        m0.title = "检测到新版本，请点击此处下载。";
        m0.style.width = "100%";
        m0.style.color = "white";
        m0.style.background = "darkgray";
        m0.style.color = "black";
        m0.style.textAlign = "center";
        m0.style.padding = "5px";
        m0.style.fontSize = "12px";
        m0.style.boxSizing = "border-box";
        m0.addEventListener("click", () => {
          let m1 = "https://axolotltfgs.github.io/CSense/";
          let m2 = document.createElement("a");
          m2.href = m1;
          m2.target = "_blank";
          m2.click();
        });
        XS.appendChild(m0);
      } else if (this.failed) {
        let m1 = document.createElement("div");
        m1.style.cursor = "pointer";
        m1.textContent = "检查更新失败";
        m1.title = "检查更新失败，请检查您的网络连接。\n通常这是中国大陆的互联网封锁导致的，您可以尝试使用代理。\n您的连接可能遭到监视。";
        m1.style.width = "100%";
        m1.style.backgroundColor = "red";
        m1.style.color = "white";
        m1.style.textAlign = "center";
        m1.style.padding = "5px";
        m1.style.fontSize = "12px";
        m1.style.boxSizing = "border-box";
        XS.appendChild(m1);
      }
    }
    dispose() { }
  };
  X7("\n  .csense-window input, textarea !important {\n    font-family: unset;\n  }\n");
  window.onerror = null;
  var Xc = window.localStorage.getItem("__csense-version");
  if (Xc !== XZ && document.cookie.includes("cookie-user-id=")) {
    alert("您已更新到 CSense v" + XZ + "！\n我们可能会在每个版本修改隐私政策。为了更好地保护您的隐私，我们不会强迫您同意这些协议。\n因此，请允许我们在每次版本更新时登出一次您的账户，从而避免在未经同意的情况下收集您的数据。\n若您重新登录，即代表您同意我们的隐私政策。");
    fetch("https://sso.ccw.site/web/auth/logout", {
      headers: {
        "content-type": "application/json"
      },
      body: "{}",
      method: "POST",
      mode: "cors",
      credentials: "include"
    }).then(() => {
      document.cookie = "cookie-user-id=;domain=.ccw.site;path=/;max-age=-999999";
      window.localStorage.setItem("__csense-version", XZ);
      window.location.reload();
    });
  } else {
    window.localStorage.setItem("__csense-version", XZ);
    let XS = document.createElement("div");
    let m0 = new XI(XS);
    m0.addOverlay(new Xf(m0));
    m0.addOverlay(new Xl(m0));
    m0.open(new Xo(m0));
    m0._doSetTitle = XQ(XS, () => !m0.back());
    m0._updateTitle();
  }
})();
