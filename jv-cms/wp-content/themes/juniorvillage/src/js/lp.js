(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
function hover() {
  !function() {
    const browser = window.navigator.userAgent.toLowerCase();
    const root = document.documentElement;
    if (browser.indexOf("msie") > 0 || browser.indexOf("trident") > 0) {
      root.classList.add("ua-ie");
    }
  }();
}
function ImageWH() {
  const myFunc = function(src) {
    return new Promise(function(resolve, reject) {
      const image = new Image();
      image.src = src;
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function(error) {
        reject(error);
      };
    });
  };
  const imgs = document.getElementsByTagName("img");
  for (const img of imgs) {
    const src = img.getAttribute("src");
    myFunc(src).then(function(res) {
      img.setAttribute("width", res.width);
      img.setAttribute("height", res.height);
    }).catch(function(error) {
      console.log(error);
    });
  }
}
function view360() {
  !function() {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
      const value = window.outerWidth > 640 ? "width=device-width,initial-scale=1" : "width=640";
      if (viewport.getAttribute("content") !== value) {
        viewport.setAttribute("content", value);
      }
    }
    addEventListener("resize", switchViewport, false);
    switchViewport();
  }();
}
const unicodeBlocks = [0, 128, 256, 384, 592, 688, 768, 880, 1024, 1280, 1328, 1424, 1536, 1792, 1872, 1920, 1984, 2048, 2112, 2144, 2208, 2304, 2432, 2560, 2688, 2816, 2944, 3072, 3200, 3328, 3456, 3584, 3712, 3840, 4096, 4256, 4352, 4608, 4992, 5024, 5120, 5760, 5792, 5888, 5920, 5952, 5984, 6016, 6144, 6320, 6400, 6480, 6528, 6624, 6656, 6688, 6832, 6912, 7040, 7104, 7168, 7248, 7296, 7312, 7360, 7376, 7424, 7552, 7616, 7680, 7936, 8192, 8304, 8352, 8400, 8448, 8528, 8592, 8704, 8960, 9216, 9280, 9312, 9472, 9600, 9632, 9728, 9984, 10176, 10224, 10240, 10496, 10624, 10752, 11008, 11264, 11360, 11392, 11520, 11568, 11648, 11744, 11776, 11904, 12032, 12272, 12288, 12352, 12448, 12544, 12592, 12688, 12704, 12736, 12784, 12800, 13056, 13312, 19904, 19968, 40960, 42128, 42192, 42240, 42560, 42656, 42752, 42784, 43008, 43056, 43072, 43136, 43232, 43264, 43312, 43360, 43392, 43488, 43520, 43616, 43648, 43744, 43776, 43824, 43888, 43968, 44032, 55216, 55296, 56192, 56320, 57344, 63744, 64256, 64336, 65024, 65040, 65056, 65072, 65104, 65136, 65280, 65520, 65536, 65664, 65792, 65856, 65936, 66e3, 66176, 66208, 66272, 66304, 66352, 66384, 66432, 66464, 66560, 66640, 66688, 66736, 66816, 66864, 67072, 67584, 67648, 67680, 67712, 67808, 67840, 67872, 67968, 68e3, 68096, 68192, 68224, 68288, 68352, 68416, 68448, 68480, 68608, 68736, 68864, 69216, 69248, 69376, 69424, 69552, 69600, 69632, 69760, 69840, 69888, 69968, 70016, 70112, 70144, 70272, 70320, 70400, 70656, 70784, 71040, 71168, 71264, 71296, 71424, 71680, 71840, 71936, 72096, 72192, 72272, 72384, 72704, 72816, 72960, 73056, 73440, 73648, 73664, 73728, 74752, 74880, 77824, 78896, 82944, 92160, 92736, 92880, 92928, 93760, 93952, 94176, 94208, 100352, 101120, 101632, 110592, 110848, 110896, 110960, 113664, 113824, 118784, 119040, 119296, 119520, 119552, 119648, 119808, 120832, 122880, 123136, 123584, 124928, 125184, 126064, 126208, 126464, 126976, 127024, 127136, 127232, 127488, 127744, 128512, 128592, 128640, 128768, 128896, 129024, 129280, 129536, 129648, 129792, 131072, 173824, 177984, 178208, 183984, 194560, 196608, 917504, 917760, 983040, 1048576];
const model = { "BB2:108120": 1800, "UB3:107": 271, "UB3:120": -857, "TB2:108108108": -417, "TB4:108108108": 285, "UB3:109": -583, "UB4:120": 388, "BB3:108108": 828, "UB4:108": -853, "BB1:108120": -820, "BB1:108107": 502, "UB4:107": -708, "TB1:120120108": 358, "TB3:108109109": 1341, "UB2:107": -586, "TB1:108120108": -451, "TB3:108108108": 257, "BB2:109109": -1876, "UW3:\u306F": 2052, "UW3:\u306B": 1698, "TB3:108120108": -458, "UW3:\u304C": 2048, "UW4:\u3053": 1182, "UB5:107": -551, "UW3:\u3068": 980, "TB4:109109109": 773, "UW4:\u3066": -1453, "TB2:108108107": -152, "UW3:\u3002": 3201, "UW4:\u304A": 2865, "UW3:\u306E": 1203, "BB3:120120": 144, "BB3:108120": -369, "UW3:\u304A": -2539, "UW3:\u3057": -613, "UW4:\u3001": -3574, "UW4:\u306E": -1111, "UW3:\u3092": 3110, "UW4:\u3002": -3022, "UW3:\u3001": 2039, "UW5:\u3067": -1091, "UW4:\u3042": 1241, "BB2:108108": -560, "UW4:\u3063": -1412, "UW5:\u3063": 625, "UW3:\u3082": 1350, "UW5:\u3046": 297, "UW3:\u300C": -2404, "UW5:\u306A": -595, "UW4:\u305D": 1007, "UW4:\u308B": -1829, "UW3:\u3063": -1662, "UW4:\u300C": 3213, "UW4:\u3044": 270, "BB2:162162": -911, "UB4:162": 178, "UW5:\u306B": -727, "BW3:\u3082\u306E": 2716, "UW5:\u3057": -484, "UW6:\u3046": -344, "BW2:\u3068\u3044": 929, "UW4:\u306B": -1236, "UW3:\u308B": 760, "TB2:120108120": -299, "UW4:\u3067": -419, "UW5:\u304C": -728, "BB1:120120": 122, "UW5:\u306F": -704, "UW4:\u306F": -605, "UW4:\u308C": -1507, "UW5:\u304D": 545, "BB2:120108": -68, "BB2:120120": -320, "UW3:\u30FB": 1498, "BB2:120162": 953, "BB2:107108": -323, "TB1:108107108": -575, "UW3:\u308C": -673, "BB2:162108": 520, "TB2:162162162": -450, "UW4:\u3089": -1767, "TB1:120120120": -247, "UB2:120": 56, "TB1:108108162": 231, "UW5:\u3059": -764, "UW5:\u3093": 536, "UW3:\u3067": 794, "UW4:\u304C": -703, "UW3:\u3053": -566, "TB4:120108108": 51, "UW3:\u3089": 390, "UW6:\u306B": 52, "UW6:\u3002": -182, "UW3:\u305F": 466, "TB1:107120120": 133, "UW5:\u304F": 354, "UB1:109": 107, "UW1:\u305D": 492, "UW3:\u3046": 488, "BW3:\u3068\u3044": -1194, "BW3:\u3068\u3053": 1145, "UW3:\u307E": -847, "BW3:\u3053\u3068": 812, "UW2:\u3063": 151, "UW5:\u30FB": -517, "TB3:108108107": -314, "UW3:\u304D": -553, "UW4:\u3093": -783, "UB3:108": -117, "UW3:\u304F": 736, "UW3:\u300D": -88, "UW5:\u3042": -598, "BB2:108162": 569, "BW3:\u3044\u3046": 606, "UW5:\u308C": 287, "UW2:\u4E00": 744, "UW3:\uFF0C": 1739, "UW1:\u306B": -217, "UW2:\u3068": -219, "TB2:120120108": -144, "TB2:120120120": 234, "UW5:\u3092": -649, "UW4:\u308A": -757, "BW1:\u304B\u3089": 834, "UW3:\u3061": -819, "BW3:\u3044\u3044": 869, "UW2:\u306F": -275, "UW6:\u305F": -267, "TB1:109109108": 154, "UW4:\uFF11": 653, "UW4:\u3084": 594, "UW2:\u3093": 255, "UW3:\uFF3D": 1018, "UW4:\u307B": 1124, "TB3:108162162": 284, "BW2:\u3067\u3042": -1624, "UW4:\u3060": -372, "BB3:120108": 440, "TB1:162162162": -184, "BW3:\u30FB\u30FB": -1936, "BW3:\u3068\u304D": 1318, "UW4:\u3092": -1124, "UW3:\u3066": 453, "UW4:\u304B": -92, "UW2:\u305D": -343, "TB4:120120108": 175, "TB2:108107120": 182, "UW2:\u3092": -886, "UW4:\u3054": 930, "UW2:\u3067": -223, "TB3:120120120": -57, "BB1:162162": -113, "UW2:\u3057": 103, "UW4:\u51FA": -200, "UW2:\u307E": 510, "UW4:\uFF0C": -2099, "UW5:\u3068": -498, "UW4:\u3069": 385, "BW3:\u3057\u3066": 80, "UW1:\u3067": -156, "BB2:107120": 360, "BW3:\u305F\u3081": 1289, "BW2:\u3068\u3057": 771, "BW2:\u306A\u3044": -1114, "BW2:\u3066\u3044": -399, "UW3:\u9593": 870, "UW3:\uFF01": 1230, "UW5:\u30FC": 79, "UW4:\u3059": 472, "UW4:\uFF01": -1596, "BW1:\u3068\u304C": -1092, "UW5:\u306E": -572, "TB4:108108120": 55, "TB2:107120120": -151, "UW6:\u30FB": -124, "UW3:\uFF0E": 1316, "UW2:\u3066": -248, "UW3:\u7B11": 1280, "UW2:\u3053": -125, "UW5:\u3082": -284, "BW3:\u3088\u3046": -1023, "UW3:\u4EBA": 862, "UW2:\u306E": 84, "UW3:\u304B": 417, "UW3:\u65E5": 568, "UW1:\u3044": -88, "BW2:\u3068\u3053": -528, "UW4:\u79C1": 910, "UW3:\u2026": 674, "UW2:\u306B": -212, "UW3:\u4ECA": 894, "BB3:162108": -121, "UB3:087": 1108, "UW4:\uFF08": 762, "BB1:162120": 260, "UW1:\u306A": -197, "BB3:109109": 91, "UW5:\u6765": -53, "UW3:\uFF1F": 1117, "TW3:\u3066\u3044\u308B": -645, "UW4:\u300D": -868, "UW4:\u524D": -611, "BW1:\u3044\u3046": 220, "UW4:\u3064": 422, "UW3:\uFF09": 1431, "BW1:\u3067\u306F": -532, "UW2:\u308B": -157, "UW5:\u305D": -476, "UW4:\u30FC": -846, "TW2:\u6C17\u306B\u5165": -1309, "UW4:\u7B11": -1614, "UW4:\u3072": 1225, "TB4:162162162": 302, "UW4:\u3051": -738, "UW2:\u3082": -260, "BW3:\u3061\u3087": 892, "BW3:\u51FA\u6765": -778, "TB2:108120108": -193, "UW4:\u300E": 1221, "UW3:\uFF3B": -779, "UW4:\uFF12": 489, "UW5:\u3064": 420, "TB1:107120108": -85, "UW3:\uFF11": -525, "BW3:\u304B\u3089": -830, "UB5:120": 26, "UW4:\u307E": 270, "UW3:\u3070": 439, "UW3:\u308A": -120, "BW3:\u305D\u306E": 1263, "UW3:\u3054": -795, "UW4:\u308F": 291, "BW2:\u3066\u304A": -1310, "TB2:120108108": -23, "BW1:\u306A\u3044": 347, "UW2:\u3088": 312, "UB2:162": -107, "UW6:\u306E": -114, "UW2:\u6BCE": 701, "UW2:\u7D50": 830, "TW4:\u306E\u4EAC\u90FD": 1309, "UW3:\u3055": -451, "UW2:\u6700": 260, "BW2:\u3067\u3059": -1080, "UW2:\u300D": 536, "UW5:\u3048": 188, "UW3:\u3060": -60, "TW4:\u3068\u3053\u308D": 643, "UW4:\uFF0E": -1184, "UB1:108": 31, "UW6:\u3066": -194, "UW1:\u304C": -51, "BW2:\u3001\u3068": -514, "UW3:\uFF10": -442, "UW3:\u3093": -120, "UW3:\u4E2D": 649, "UW4:\u3088": 410, "BW3:\u3053\u306E": 882, "UW2:\u304C": -75, "UW3:\u307F": -341, "TW2:\u3067\u306F\u306A": -718, "UW6:\u3068": -128, "UW4:\uFF3B": 340, "TW3:\u3001\u3042\u308B": -1245, "BW3:\u3053\u308D": -164, "UW4:\uFF1F": -1052, "UW6:\u3001": 70, "UW4:\u96FB": -256, "BB1:108072": 279, "UW3:\u5F8C": 786, "UW5:\u3044": 40, "UW2:\u3001": -177, "UW5:\u3066": 97, "BB2:108072": -411, "UW3:\u771F": 222, "UW3:\u305D": -89, "UW5:\u3055": -277, "UB5:162": -146, "TW3:\u3068\u3044\u3046": 414, "UW3:\u5206": 483, "UB6:120": 21, "BW3:\u306A\u3063": -339, "UW4:\u308D": -406, "BB2:107107": -360, "TW3:\u3068\u3053\u308D": -450, "UB1:120": -14, "UW1:\u3001": -36, "BW1:\u3068\u304B": 513, "UW3:\u306A": 252, "UW6:\u308A": 54, "UW4:\u9593": -501, "UW3:\u3079": -478, "UW5:\u3079": 450, "TB4:108120108": -36, "UW4:\uFF3D": -644, "BW2:\u306B\u306F": -392, "UW5:\u3005": 714, "BW1:\u3002\u30FB": 643, "BW1:\u305D\u306E": -341, "UW1:\u3059": 91, "UW4:\uFF09": -1018, "UW6:\u3063": 34, "TB3:109109109": -177, "TB3:108120120": 123, "UB5:109": 80, "BW1:\u304B\u3082": -695, "UW6:\u308B": -44, "TB4:108109109": -357, "UW3:\u3069": 253, "TW3:\u3067\u3042\u308B": -389, "TW4:\u304F\u3089\u3044": 613, "BW1:\u6700\u8FD1": 515, "BW1:\u3057\u3044": 418, "BW1:\u3068\u3082": -396, "BW2:\u3068\u540C": -553, "TW1:\u3068\u3044\u3046": 193, "UW2:\u3055": 298, "BW2:\u5E2F\u96FB": -334, "TB1:120108108": -57, "BW3:\u305D\u3057": -315, "UW2:\u3002": -77, "UW5:\u304B": 33, "UW5:\u3053": 88, "BW3:\u306A\u3044": 137, "BW1:\u3093\u306A": 280, "BW2:\u3067\u304D": -448, "UW4:\uFF13": 196, "UW3:\u3051": -136, "TW4:\u3053\u3068\u304C": -295, "BW1:\u3053\u3068": -329, "UB3:162": -92, "UW3:\u96FB": -360, "UW3:\u3088": -132, "BW1:\u305F\u3068": -288, "UW5:\u307E": -45, "UW5:\u305F": -43, "UW5:\u3061": 174, "UW2:\u3051": 75, "UW5:\u3060": -60, "UW3:\u5EA6": 330, "BW1:\u305F\u3044": 360, "UW4:\u4F7F": 217, "UW2:\u304D": 130, "TW4:\u304B\u306A\u308A": 473, "UB6:109": -41, "BB1:108108": -23, "UW4:\u8FBC": -340, "TW3:\u3068\u8A00\u3063": -530, "UW6:\u3060": -69, "UW5:\u308A": -71, "UW5:\u3088": -115, "BW3:\u3069\u3046": 297, "UW4:\u2026": -240, "UW3:\u3084": 229, "BW1:\u304B\u3057": 507, "BW3:\u304B\u3063": -348, "UW4:\u4ECA": 171, "UW3:\u300E": -320, "UW4:\u601D": 239, "UB2:109": 16, "UW4:\u304F": -195, "UW3:\u4EAC": -277, "UW6:\u30FC": -41, "UW1:\u3093": 69, "BW1:\u3046\u306A": 280, "TB2:108107107": -264, "UW1:\u3068": 30, "TB4:108109108": 249, "TB2:107108108": -97, "BW1:\u3053\u306E": -163, "BW2:\u306E\u3067": -221, "UW4:\u307F": 96, "UW5:\u308F": 83, "UW6:\u3084": 82, "BW1:\u308C\u3066": -218, "UW2:\u3084": -93, "UW6:\u3053": -53, "UW4:\u306A": 40, "UW5:\u3081": 28, "BW1:\u3082\u3046": 285, "TB4:120108120": 27, "BW1:\u3088\u308A": 283, "UW4:\u5408": -211, "UW6:\u3051": -92, "BW1:\u5C11\u3057": 214, "BW2:\u3067\u3057": -225, "UW4:\u3068": -54, "TB1:109109109": 53, "UW3:\u30FC": 105, "BW2:\u304F\u306A": -198, "UW2:\u304F": -53, "UW2:\u6211": -277, "BW2:\u3044\u3082": 198, "BW3:\u308F\u304B": 184, "TB2:120109120": -264, "UW4:\u3082": -106, "UW1:\u3042": 14, "UW4:\u6700": 185, "BW1:\u308B\u306E": -155, "UW2:\u5168": 185, "UW6:\uFF10": 106, "UW4:\u653E": -119, "UW4:\u4EAC": 53, "BW3:\u304B\u3051": 208, "UW2:\u5C11": 92, "BW3:\u3082\u3046": 262, "UW2:\u591A": 106, "UW2:\u3046": -52, "TB1:108108072": 105, "UW1:\u3092": -25, "UW3:\u5149": -79, "BW1:\uFF01\uFF01": 104, "UW2:\u30E3": 141, "BW3:\u3059\u3050": 129, "UW4:\u5E2F": -114, "UW6:\u3057": 26, "BW3:\u3067\u3082": 64, "BW2:\u3001\u305D": -113, "TB3:120162162": 26, "TB2:109108120": 77, "UW3:\u308F": -64, "UB4:109": 13, "TB4:120120120": 13, "UW5:\u90FD": 26, "UW5:\u305A": 89, "UW2:\u30D0": 115, "UW2:\u4EAC": -49, "UW3:\u3083": 89, "BW1:\u3044\u3001": -114, "BW3:\u3088\u304F": 51, "BW1:\u305F\u3089": 64, "BW2:\u306E\u3088": -64, "UW2:\u601D": -51, "BW1:\u3046\u306B": -38, "BW1:\u306E\u9593": 89, "UW6:\u3093": 13, "UW6:\u305A": -64, "BW1:\u3063\u305F": 13, "TW3:\u308B\u3053\u3068": -48, "BW3:\u3068\u3066": 76, "TW1:\u3088\u3046\u306A": 63, "UW6:\u3071": 62, "TB3:109120108": 13, "TW4:\u3063\u3066\u3001": 112, "TW4:\u306A\u3093\u3066": -76, "TW2:\u305D\u306E\u5F8C": -50, "UW6:\u3089": -13, "TW4:\u3053\u3068\u306B": -49, "UW3:\uFF1E": 63, "TW3:\u3066\u3057\u307E": -50, "UW3:\u3044": 13, "TB4:120108107": 13, "UW2:\u3072": -50, "UW6:\u3081": 24, "UW6:\u3067": -12, "BW3:\u306A\u308B": 24, "UW5:\u3054": 12, "BW2:\u308A\u3057": 24, "UW6:\u96FB": 12, "UW1:\u306F": -12, "BW1:\u3044\u3082": -24, "BW3:\u3059\u3054": 12, "UW4:\u901A": -12, "BW3:\u304A\u308A": -12, "BW3:\u304B\u304B": 12, "BW1:\u601D\u3044": -12 };
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const parseFromString = (html) => {
  const domparser = new DOMParser();
  const document2 = domparser.parseFromString(html, "text/html");
  return document2;
};
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = console.assert;
const ZWSP = "\u200B";
const NodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3
};
const DomAction = {
  Inline: 0,
  Block: 1,
  Skip: 2,
  Break: 3
};
const domActions = {
  AREA: DomAction.Skip,
  BASE: DomAction.Skip,
  BASEFONT: DomAction.Skip,
  DATALIST: DomAction.Skip,
  HEAD: DomAction.Skip,
  LINK: DomAction.Skip,
  META: DomAction.Skip,
  NOEMBED: DomAction.Skip,
  NOFRAMES: DomAction.Skip,
  PARAM: DomAction.Skip,
  RP: DomAction.Skip,
  SCRIPT: DomAction.Skip,
  STYLE: DomAction.Skip,
  TEMPLATE: DomAction.Skip,
  TITLE: DomAction.Skip,
  NOSCRIPT: DomAction.Skip,
  HR: DomAction.Break,
  LISTING: DomAction.Skip,
  PLAINTEXT: DomAction.Skip,
  PRE: DomAction.Skip,
  XMP: DomAction.Skip,
  BR: DomAction.Break,
  RT: DomAction.Skip,
  INPUT: DomAction.Skip,
  SELECT: DomAction.Skip,
  BUTTON: DomAction.Skip,
  TEXTAREA: DomAction.Skip,
  ABBR: DomAction.Skip,
  CODE: DomAction.Skip,
  IFRAME: DomAction.Skip,
  TIME: DomAction.Skip,
  VAR: DomAction.Skip
};
const defaultBlockElements = /* @__PURE__ */ new Set([
  "HTML",
  "BODY",
  "ADDRESS",
  "BLOCKQUOTE",
  "CENTER",
  "DIALOG",
  "DIV",
  "FIGURE",
  "FIGCAPTION",
  "FOOTER",
  "FORM",
  "HEADER",
  "LEGEND",
  "LISTING",
  "MAIN",
  "P",
  "ARTICLE",
  "ASIDE",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HGROUP",
  "NAV",
  "SECTION",
  "DIR",
  "DD",
  "DL",
  "DT",
  "MENU",
  "OL",
  "UL",
  "LI",
  "TABLE",
  "CAPTION",
  "COL",
  "TR",
  "TD",
  "TH",
  "FIELDSET",
  "DETAILS",
  "SUMMARY",
  "MARQUEE"
]);
function actionForElement(element) {
  const nodeName = element.nodeName;
  const action = domActions[nodeName];
  if (action !== void 0)
    return action;
  if (typeof getComputedStyle === "function") {
    const style2 = getComputedStyle(element);
    switch (style2.whiteSpace) {
      case "nowrap":
      case "pre":
        return DomAction.Skip;
    }
    const display = style2.display;
    if (display)
      return display === "inline" ? DomAction.Inline : DomAction.Block;
  }
  return defaultBlockElements.has(nodeName) ? DomAction.Block : DomAction.Inline;
}
class Paragraph {
  constructor(element) {
    this.textNodes = [];
    this.element = element;
  }
  hasText() {
    return this.textNodes.length > 0;
  }
}
class HTMLProcessor {
  constructor(parser, options) {
    this.separator = ZWSP;
    this.parser_ = parser;
    if (options !== void 0) {
      if (options.className !== void 0)
        this.className = options.className;
      if (options.separator !== void 0)
        this.separator = options.separator;
    }
  }
  applyToElement(element) {
    for (const block of this.getBlocks(element)) {
      assert(block.hasText());
      this.applyToParagraph(block);
    }
  }
  *getBlocks(element, parent) {
    assert(element.nodeType === NodeType.ELEMENT_NODE);
    if (this.className && element.classList.contains(this.className))
      return;
    const action = actionForElement(element);
    if (action === DomAction.Skip)
      return;
    if (action === DomAction.Break) {
      if (parent && parent.hasText()) {
        yield parent;
        parent.textNodes = [];
      }
      assert(!element.firstChild);
      return;
    }
    assert(action === DomAction.Block || action === DomAction.Inline);
    const isNewBlock = !parent || action === DomAction.Block;
    const block = isNewBlock ? new Paragraph(element) : parent;
    assert(block);
    for (const child of element.childNodes) {
      switch (child.nodeType) {
        case NodeType.ELEMENT_NODE:
          for (const childBlock of this.getBlocks(child, block))
            yield childBlock;
          break;
        case NodeType.TEXT_NODE:
          block.textNodes.push(child);
          break;
      }
    }
    if (isNewBlock && block.hasText())
      yield block;
  }
  applyToParagraph(paragraph) {
    const textNodes = paragraph.textNodes;
    assert(textNodes.length > 0);
    const texts = textNodes.map((node) => node.nodeValue);
    const text = texts.join("");
    if (/^\s*$/.test(text))
      return;
    const phrases = this.parser_.parse(text);
    assert(phrases.length > 0);
    assert(phrases.reduce((sum2, phrase) => sum2 + phrase.length, 0) === text.length);
    if (phrases.length <= 1)
      return;
    const boundaries = [];
    let char_index = 0;
    for (const phrase of phrases) {
      assert(phrase.length > 0);
      char_index += phrase.length;
      boundaries.push(char_index);
    }
    assert(boundaries[0] > 0);
    assert(boundaries[boundaries.length - 1] === text.length);
    ++boundaries[boundaries.length - 1];
    assert(boundaries.length > 1);
    this.splitTextNodes(textNodes, boundaries);
    this.applyBlockStyle(paragraph.element);
  }
  splitTextNodes(textNodes, boundaries) {
    assert(boundaries.length > 0);
    const textLen = textNodes.reduce((sum2, node) => sum2 + (node.nodeValue ? node.nodeValue.length : 0), 0);
    assert(boundaries[boundaries.length - 1] > textLen);
    let boundary_index = 0;
    let boundary = boundaries[0];
    assert(boundary > 0);
    let nodeStart = 0;
    for (const node of textNodes) {
      const nodeText = node.nodeValue;
      if (!nodeText)
        continue;
      const nodeEnd = nodeStart + nodeText.length;
      if (boundary >= nodeEnd) {
        nodeStart = nodeEnd;
        continue;
      }
      const chunks = [];
      let chunkStartInNode = 0;
      while (boundary < nodeEnd) {
        const boundaryInNode = boundary - nodeStart;
        assert(boundaryInNode >= chunkStartInNode);
        chunks.push(nodeText.substring(chunkStartInNode, boundaryInNode));
        chunkStartInNode = boundaryInNode;
        ++boundary_index;
        assert(boundaries[boundary_index] > boundary);
        boundary = boundaries[boundary_index];
      }
      assert(chunks.length > 0);
      if (chunkStartInNode < nodeText.length)
        chunks.push(nodeText.substring(chunkStartInNode));
      this.splitTextNode(node, chunks);
      nodeStart = nodeEnd;
    }
    assert(nodeStart === textLen);
    assert(boundary_index < boundaries.length);
    assert(boundaries[boundary_index] >= textLen);
  }
  splitTextNode(node, chunks) {
    assert(chunks.length > 1);
    assert(node.nodeValue === chunks.join(""));
    const separator = this.separator;
    if (typeof separator === "string") {
      node.nodeValue = chunks.join(separator);
      return;
    }
    const document2 = node.ownerDocument;
    let nodes = [];
    for (const chunk of chunks) {
      if (chunk)
        nodes.push(document2.createTextNode(chunk));
      nodes.push(null);
    }
    nodes.pop();
    nodes = nodes.map((n) => n ? n : separator.cloneNode(true));
    node.replaceWith(...nodes);
  }
  applyBlockStyle(element) {
    if (this.className) {
      element.classList.add(this.className);
      return;
    }
    const style2 = element.style;
    style2.wordBreak = "keep-all";
    style2.overflowWrap = "break-word";
  }
  static defineClassAs(document2, className) {
    const style2 = document2.createElement("style");
    style2.textContent = `.${className} { word-break: keep-all; overflow-wrap: break-word; }`;
    document2.head.appendChild(style2);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bisectRight = (arr, i) => {
  const mid = Math.floor(arr.length / 2);
  if (i === arr[mid]) {
    return mid + 1;
  } else if (i < arr[mid]) {
    if (arr.length === 1)
      return 0;
    return bisectRight(arr.slice(0, mid), i);
  } else {
    if (arr.length === 1)
      return 1;
    return mid + bisectRight(arr.slice(mid), i);
  }
};
const sum = (arr) => arr.reduce((prev, curr) => prev + curr, 0);
const INVALID = "\u2594";
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const NODETYPE = {
  ELEMENT: 1,
  TEXT: 3
};
class Parser {
  constructor(model2) {
    this.model = model2;
  }
  static getUnicodeBlockFeature(w) {
    if (!w || w === INVALID)
      return INVALID;
    const cp = w.codePointAt(0);
    if (cp === void 0)
      return INVALID;
    const bn = bisectRight(unicodeBlocks, cp);
    return `${bn}`.padStart(3, "0");
  }
  static getFeature(w1, w2, w3, w4, w5, w6, p1, p2, p3) {
    const b1 = Parser.getUnicodeBlockFeature(w1);
    const b2 = Parser.getUnicodeBlockFeature(w2);
    const b3 = Parser.getUnicodeBlockFeature(w3);
    const b4 = Parser.getUnicodeBlockFeature(w4);
    const b5 = Parser.getUnicodeBlockFeature(w5);
    const b6 = Parser.getUnicodeBlockFeature(w6);
    const rawFeature = {
      UP1: p1,
      UP2: p2,
      UP3: p3,
      BP1: p1 + p2,
      BP2: p2 + p3,
      UW1: w1,
      UW2: w2,
      UW3: w3,
      UW4: w4,
      UW5: w5,
      UW6: w6,
      BW1: w2 + w3,
      BW2: w3 + w4,
      BW3: w4 + w5,
      TW1: w1 + w2 + w3,
      TW2: w2 + w3 + w4,
      TW3: w3 + w4 + w5,
      TW4: w4 + w5 + w6,
      UB1: b1,
      UB2: b2,
      UB3: b3,
      UB4: b4,
      UB5: b5,
      UB6: b6,
      BB1: b2 + b3,
      BB2: b3 + b4,
      BB3: b4 + b5,
      TB1: b1 + b2 + b3,
      TB2: b2 + b3 + b4,
      TB3: b3 + b4 + b5,
      TB4: b4 + b5 + b6,
      UQ1: p1 + b1,
      UQ2: p2 + b2,
      UQ3: p3 + b3,
      BQ1: p2 + b2 + b3,
      BQ2: p2 + b3 + b4,
      BQ3: p3 + b2 + b3,
      BQ4: p3 + b3 + b4,
      TQ1: p2 + b1 + b2 + b3,
      TQ2: p2 + b2 + b3 + b4,
      TQ3: p3 + b1 + b2 + b3,
      TQ4: p3 + b2 + b3 + b4
    };
    return Object.entries(rawFeature).filter((entry) => !entry[1].includes(INVALID)).map(([key, value]) => `${key}:${value}`);
  }
  static hasChildTextNode(ele) {
    for (const child of ele.childNodes) {
      if (child.nodeType === NODETYPE.TEXT)
        return true;
    }
    return false;
  }
  parse(sentence) {
    if (sentence === "")
      return [];
    let p1 = "U";
    let p2 = "U";
    let p3 = "U";
    const result = [sentence[0]];
    const baseScore = -sum([...this.model.values()]);
    for (let i = 1; i < sentence.length; i++) {
      const feature = Parser.getFeature(sentence[i - 3] || INVALID, sentence[i - 2] || INVALID, sentence[i - 1], sentence[i], sentence[i + 1] || INVALID, sentence[i + 2] || INVALID, p1, p2, p3);
      const score = baseScore + 2 * sum(feature.map((f) => this.model.get(f) || 0));
      const p = score > 0 ? "B" : "O";
      if (score > 0)
        result.push("");
      result[result.length - 1] += sentence[i];
      p1 = p2;
      p2 = p3;
      p3 = p;
    }
    return result;
  }
  applyElement(parentElement) {
    const htmlProcessor = new HTMLProcessor(this, {
      separator: parentElement.ownerDocument.createElement("wbr")
    });
    htmlProcessor.applyToElement(parentElement);
  }
  translateHTMLString(html) {
    if (html === "")
      return html;
    const doc = parseFromString(html);
    if (Parser.hasChildTextNode(doc.body)) {
      const wrapper = doc.createElement("span");
      wrapper.append(...doc.body.childNodes);
      doc.body.append(wrapper);
    }
    this.applyElement(doc.body.childNodes[0]);
    return doc.body.innerHTML;
  }
}
const loadDefaultJapaneseParser = () => {
  return new Parser(new Map(Object.entries(model)));
};
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BudouXBaseElement extends HTMLElement {
  constructor() {
    super();
    this.parser = new Parser(/* @__PURE__ */ new Map());
    this.shadow = this.attachShadow({ mode: "open" });
    const observer = new MutationObserver(this.sync.bind(this));
    observer.observe(this, {
      attributes: false,
      characterData: true,
      subtree: true
    });
  }
  connectedCallback() {
    this.sync();
  }
  attributeChangedCallback() {
    this.sync();
  }
  sync() {
    this.shadow.innerHTML = this.parser.translateHTMLString(this.innerHTML);
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BudouXJapaneseElement extends BudouXBaseElement {
  constructor() {
    super();
    this.parser = loadDefaultJapaneseParser();
  }
}
customElements.define("budoux-ja", BudouXJapaneseElement);
function accordionAC() {
  const defaultOptions = {
    timingFunction: "ease-out",
    duration: ".3s",
    multiSelectable: false
  };
  class Accordion {
    constructor(element, options) {
      const mergedOptions = Object.assign({}, defaultOptions, options);
      if (!options.tabs) {
        throw TypeError("tabs \u30AA\u30D7\u30B7\u30E7\u30F3\u306F\u5FC5\u9808\u3067\u3059");
      }
      if (!options.panels) {
        throw TypeError("panels \u30AA\u30D7\u30B7\u30E7\u30F3\u306F\u5FC5\u9808\u3067\u3059");
      }
      const tabs = Array.from(element.querySelectorAll(options.tabs));
      const panels = Array.from(element.querySelectorAll(options.panels));
      const subscriptions = [
        ...tabs.map(
          (tab) => attachEvent(tab, "click", this.handleTabClick.bind(this))
        ),
        attachEvent(window, "resize", this.handleResize.bind(this))
      ];
      this.element = element;
      this.tabs = tabs;
      this.panels = panels;
      this.options = mergedOptions;
      this.subscriptions = subscriptions;
      this.expanded = /* @__PURE__ */ new Set();
      this.prepareAttributes();
    }
    destroy() {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
    handleTabClick(event) {
      const tab = event.currentTarget;
      const tabIndex = this.tabs.indexOf(tab);
      this.toggleItem(tabIndex, !this.expanded.has(tabIndex));
      event.preventDefault();
    }
    handleResize() {
      this.bindWindowResizeHandler();
    }
    prepareAttributes() {
      const randomId = "accordion-" + Math.random().toString(36).slice(2);
      this.tabs.forEach((tab, index) => {
        tab.setAttribute("id", `${randomId}-tab-${index}`);
        tab.setAttribute("aria-expanded", "false");
        tab.setAttribute("aria-controls", `${randomId}-panel-${index}`);
      });
      this.panels.forEach((panel, index) => {
        panel.setAttribute("id", `${randomId}-panel-${index}`);
        panel.setAttribute("aria-hidden", "true");
        panel.style.boxSizing = "border-box";
        panel.style.overflow = "hidden";
        panel.style.maxHeight = "0px";
      });
    }
    toggleItem(itemIndex, expand, { noTransition = false } = {}) {
      const isExpanded = this.expanded.has(itemIndex);
      if (expand === isExpanded) {
        return;
      }
      const updateItemAttribute = (itemIndex2, expand2) => {
        const targetTab = this.tabs[itemIndex2];
        const targetPanel = this.panels[itemIndex2];
        targetTab.setAttribute("aria-expanded", String(expand2));
        targetPanel.setAttribute("aria-hidden", String(!expand2));
        targetPanel.style.maxHeight = expand2 ? targetPanel.children[0].clientHeight + "px" : "0px";
        targetPanel.style.visibility = expand2 ? "visible" : "hidden";
        targetPanel.style.transition = noTransition ? "" : `max-height ${this.options.timingFunction} ${this.options.duration}, visibility ${this.options.duration}`;
        this.expanded[expand2 ? "add" : "delete"](itemIndex2);
      };
      if (!this.options.multiSelectable && !isExpanded) {
        this.expanded.forEach((index) => updateItemAttribute(index, false));
      }
      updateItemAttribute(itemIndex, expand);
    }
    bindWindowResizeHandler() {
      this.expanded.forEach((index) => {
        const panel = this.panels[index];
        const resizedHeight = panel.children[0].clientHeight;
        panel.style.maxHeight = resizedHeight + "px";
      });
    }
  }
  function attachEvent(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    return {
      unsubscribe() {
        element.removeEventListener(event, handler);
      }
    };
  }
  Array.from(document.querySelectorAll(".js-accordion")).forEach((el) => {
    new Accordion(el, {
      tabs: ".js-accordion-tab",
      panels: ".js-accordion-panel"
    });
  });
}
hover();
ImageWH();
view360();
accordionAC();
