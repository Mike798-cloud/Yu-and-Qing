
(function(){
 const path=location.pathname.split('/').pop()||'index.html';
 const key='1904_history_v1';
 let hist=[];try{hist=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}
 const title=document.title||path; const rec={u:location.href,t:title,ts:Date.now()};
 hist=hist.filter(x=>x.u!==rec.u); hist.unshift(rec); hist=hist.slice(0,60); try{localStorage.setItem(key,JSON.stringify(hist))}catch(e){}
 const bar=document.createElement('div');bar.className='meta-bar';bar.innerHTML='<div class="meta-inner"><span class="meta-title">19:04 / 浏览记录</span><button class="history-button">历史记录</button><button class="bookmark-button">收藏本页</button><button class="hint-button">整理一下</button><span class="spacer"></span><a class="index-link" href="'+rootPath()+'archive/browser.html">材料索引</a></div><div class="history-panel"></div><div class="hint-panel"></div>';
 document.body.insertBefore(bar,document.body.firstChild);
 const hp=bar.querySelector('.history-panel');const hint=bar.querySelector('.hint-panel');
 bar.querySelector('.history-button').onclick=()=>{hp.classList.toggle('show');hp.innerHTML='<strong>最近访问</strong><ul>'+hist.slice(0,16).map(x=>'<li><a href="'+x.u+'">'+escapeHtml(x.t)+'</a></li>').join('')+'</ul>'};
 bar.querySelector('.bookmark-button').onclick=()=>{let b=[];try{b=JSON.parse(localStorage.getItem('1904_bookmarks')||'[]')}catch(e){};if(!b.some(x=>x.u===location.href))b.push({u:location.href,t:title});localStorage.setItem('1904_bookmarks',JSON.stringify(b));alert('已收藏到本机浏览记录')};
 bar.querySelector('.hint-button').onclick=()=>{hint.classList.toggle('show');hint.innerHTML=getHint()};
 document.querySelectorAll('[data-discovery]').forEach(el=>{el.addEventListener('click',()=>{let d=[];try{d=JSON.parse(localStorage.getItem('1904_discoveries')||'[]')}catch(e){};let v=el.getAttribute('data-discovery');if(v&&!d.includes(v)){d.push(v);localStorage.setItem('1904_discoveries',JSON.stringify(d))}})});
 function rootPath(){const p=location.pathname;return p.endsWith('/index.html')||p.split('/').length<3?'../':'../'}
 function escapeHtml(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
 function getHint(){let u=location.pathname;if(u.includes('school'))return '先把年份放对：2002 年的比赛和 2008 年夏天不是同一阶段。';if(u.includes('admissions'))return '报到须知里最值得核对的是随身材料、费用与可补办事项。';if(u.includes('classified'))return '先看发布日期、价格和发布人的文字，再和已经见过的费用信息对照。';if(u.includes('drivers'))return '论坛说法往往省略对象，先记住日期、班次和回复人，再去找同日的正式登记。';if(u.includes('company'))return '8 月 23 日的精确时间主要分散在下载中心的调班、停靠与设备文件里。';if(u.includes('busfan'))return '这里最值得记的是日期、班次和站场变化，其他内容先按普通旧网页阅读。';return '卡住时可以先按 2008-08-23、K203、19:04 三个锚点整理已经看过的材料。'}
})();
