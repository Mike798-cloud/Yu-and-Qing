(function(){
 const frame=document.getElementById('site-browser')
 const addr=document.getElementById('browser-address')
 const back=document.getElementById('browser-back')
 const forward=document.getElementById('browser-forward')
 const reload=document.getElementById('browser-reload')
 if(!frame||!addr) return
 const roots={
  '2026':'http://www.yuchuanren.com/city/oldstation/',
  'archive':'http://archive.yuchuanren.com/',
  'school':'http://www.yc13.edu.cn/2008/',
  'yctc':'http://www.yctc.com/',
  'drivers':'http://www.lushangren.com/bbs/',
  'company':'http://www.yuyunjt.com/',
  'busfan':'http://www.yc-bus.cn/',
  'admissions':'http://zs.njaa.edu.cn/'
 }
 function shownAddress(){
  try{
   const u=new URL(frame.contentWindow.location.href)
   const parts=u.pathname.split('/').filter(Boolean)
   const idx=parts.lastIndexOf('1904')
   const rel=(idx>=0?parts.slice(idx+1):parts).join('/')
   const first=rel.split('/')[0]||'2026'
   const base=roots[first]||'http://archive.yuchuanren.com/'
   const rest=rel.split('/').slice(1).join('/')
   return base+(rest&&rest!=='index.html'?rest:'')
  }catch(e){ return addr.textContent }
 }
 function sync(){ addr.textContent=shownAddress() }
 frame.addEventListener('load',sync)
 if(back) back.addEventListener('click',()=>{ try{frame.contentWindow.history.back()}catch(e){} })
 if(forward) forward.addEventListener('click',()=>{ try{frame.contentWindow.history.forward()}catch(e){} })
 if(reload) reload.addEventListener('click',()=>{ try{frame.contentWindow.location.reload()}catch(e){} })
 sync()
})()
