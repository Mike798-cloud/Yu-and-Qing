(function(){
'use strict';
const body=document.body;
if(!body)return;
const StationSupport={
  STORAGE_KEY:'_station_other_side_support',
  SESSION_KEY:'_station_other_side_support_session',
  COOKIE_KEY:'_station_other_side_support_flag',
  AUTO_SEEN_KEY:'_station_other_side_support_auto_seen',
  qrCode:'https://mike798-cloud.github.io/songtao-grainstation/paycode.png',
  qrCodeFallback:'https://raw.githubusercontent.com/Mike798-cloud/songtao-grainstation/main/paycode.png',
  _getCookie(name){
    try{const key=name+'=';for(const part of document.cookie.split(';')){const value=part.trim();if(value.indexOf(key)===0)return value.slice(key.length);}}catch(e){}
    return '';
  },
  _setCookie(name,value,days){
    try{const d=new Date();d.setTime(d.getTime()+days*86400000);document.cookie=name+'='+value+';expires='+d.toUTCString()+';path=/;SameSite=Lax';}catch(e){}
  },
  hasPaid(){
    try{return !!(localStorage.getItem(this.STORAGE_KEY)||sessionStorage.getItem(this.SESSION_KEY)||this._getCookie(this.COOKIE_KEY));}
    catch(e){return !!this._getCookie(this.COOKIE_KEY);}
  },
  hasAutoSeen(){try{return localStorage.getItem(this.AUTO_SEEN_KEY)==='1';}catch(e){return false;}},
  markAutoSeen(){try{localStorage.setItem(this.AUTO_SEEN_KEY,'1');}catch(e){}},
  markPaid(){
    const raw=Date.now()+'_'+Math.random().toString(36).slice(2,10)+'_station_other_side';
    let token=raw;
    try{token=btoa(unescape(encodeURIComponent(raw)));}catch(e){}
    try{localStorage.setItem(this.STORAGE_KEY,token);sessionStorage.setItem(this.SESSION_KEY,token);}catch(e){}
    this._setCookie(this.COOKIE_KEY,token,365);
    body.classList.add('support-complete');
  },
  ensureButton(){
    if(document.getElementById('stationSupportButton'))return;
    const btn=document.createElement('button');
    btn.type='button';btn.id='stationSupportButton';btn.className='station-support-chip';
    btn.setAttribute('aria-label','支持作者 1元');
    btn.innerHTML='<span>￥</span><b>支持作者</b>';
    btn.addEventListener('click',()=>this.show({manual:true}));
    body.appendChild(btn);
    if(this.hasPaid())body.classList.add('support-complete');
  },
  ensureDialog(){
    let overlay=document.getElementById('stationSupportOverlay');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.className='station-support-overlay';overlay.id='stationSupportOverlay';overlay.hidden=true;
    overlay.innerHTML=`<section class="station-support-card" role="dialog" aria-modal="true" aria-labelledby="stationSupportTitle">
      <button type="button" class="station-support-close" aria-label="关闭">×</button>
      <div class="station-support-inner">
        <header class="station-support-head">
          <div class="station-support-eyebrow">voluntary support / 1 yuan</div>
          <h2 id="stationSupportTitle">如果你愿意，支持《站台另一边》1元</h2>
          <p>完全自愿，不影响后面的页面与结局。</p>
        </header>
        <div class="station-support-body">
          <figure class="station-support-qr"><img src="${this.qrCode}" alt="1元支持收款码"><figcaption>扫码支持 1 元</figcaption></figure>
          <div class="station-support-copy">
            <p>谢谢你愿意把这些旧网页一页页翻下去。很多页面里其实没有答案，只有当年的通知、闲聊和没人会特意保存的小事。</p>
            <p>把这个小窗口放在这里，是因为你已经看过一些材料，但离最后还早。如果这段整理让你觉得值得，愿意留下一块钱，我会很开心；不方便的话，关掉就好，后面的页面不会少。</p>
            <p class="station-support-line">这一块钱不会替谁把当年没问出口的话补回来。它只是让我知道，有人认真看过这些已经过去的页面。</p>
          </div>
        </div>
        <footer class="station-support-foot">
          <button type="button" class="station-support-done">我支持了一下</button>
          <button type="button" class="station-support-later">先继续看</button>
        </footer>
      </div>
    </section>`;
    body.appendChild(overlay);
    overlay.querySelector('.station-support-close').addEventListener('click',()=>this.hide());
    overlay.querySelector('.station-support-later').addEventListener('click',()=>this.hide());
    overlay.querySelector('.station-support-done').addEventListener('click',()=>{this.markPaid();this.hide();this.toast('收到啦，谢谢你。继续看吧，后面的内容不会因为这件事变少。');});
    overlay.addEventListener('click',event=>{if(event.target===overlay)this.hide();});
    const qr=overlay.querySelector('.station-support-qr img');
    qr.addEventListener('error',()=>{
      if(!qr.dataset.fallback){qr.dataset.fallback='1';qr.src=this.qrCodeFallback;return;}
      qr.closest('.station-support-qr').classList.add('is-broken');
    });
    return overlay;
  },
  show(options={}){
    if(this.hasPaid()){
      if(options.manual)this.toast('已经收到你的支持了，谢谢你。');
      return;
    }
    const overlay=this.ensureDialog();
    overlay.hidden=false;
    requestAnimationFrame(()=>requestAnimationFrame(()=>overlay.classList.add('is-open')));
    overlay.querySelector('.station-support-close')?.focus({preventScroll:true});
  },
  hide(){
    const overlay=document.getElementById('stationSupportOverlay');
    if(!overlay)return;
    overlay.classList.remove('is-open');
    setTimeout(()=>{overlay.hidden=true;},330);
  },
  toast(text){
    const old=document.querySelector('.station-support-toast');if(old)old.remove();
    const el=document.createElement('div');el.className='station-support-toast';el.textContent=text;body.appendChild(el);
    requestAnimationFrame(()=>el.classList.add('show'));
    setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),320);},3000);
  },
  bindManualLinks(){
    document.querySelectorAll('[data-support-open]').forEach(el=>el.addEventListener('click',event=>{event.preventDefault();this.show({manual:true});}));
  },
  init(){
    this.ensureButton();
    this.bindManualLinks();
    if(this.hasPaid()||this.hasAutoSeen()||!body.classList.contains('support-auto'))return;
    const fire=()=>{
      if(this.hasPaid()||this.hasAutoSeen())return;
      if(document.hidden){
        const onVisible=()=>{if(document.hidden)return;document.removeEventListener('visibilitychange',onVisible);fire();};
        document.addEventListener('visibilitychange',onVisible);
        return;
      }
      this.markAutoSeen();
      this.show({auto:true});
    };
    setTimeout(fire,5600);
  }
};
window.StationSupport=StationSupport;
document.addEventListener('keydown',event=>{if(event.key==='Escape')StationSupport.hide();});
StationSupport.init();
})();
