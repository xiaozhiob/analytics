!function(){"use strict";var l=window.location,u=window.document,c=u.currentScript,p=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event",s=c&&c.getAttribute("data-exclude").split(",");function w(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(l.hostname)||"file:"===l.protocol)return w("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return w("localStorage flag")}catch(e){}if(s)for(var n=0;n<s.length;n++)if("pageview"===e&&l.pathname.match(new RegExp("^"+s[n].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return w("exclusion rule");var r={};r.n=e,r.u=t&&t.u?t.u:l.href,r.d=c.getAttribute("data-domain"),r.r=u.referrer||null,r.w=window.innerWidth,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=t.props);var a=c.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),i=r.p||{};a.forEach(function(e){var t=e.replace("event-",""),n=c.getAttribute(e);i[t]=i[t]||n}),r.p=i,r.h=1;var o=new XMLHttpRequest;o.open("POST",p,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(JSON.stringify(r)),o.onreadystatechange=function(){4===o.readyState&&t&&t.callback&&t.callback()}}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var n=0;n<t.length;n++)e.apply(this,t[n])}();