(function(){
 document.querySelectorAll('.text-filter').forEach(btn=>btn.addEventListener('click',()=>{
  const target=document.querySelector(btn.dataset.target); if(!target)return;
  const term=btn.dataset.term||'';
  target.querySelectorAll(btn.dataset.items||'tr').forEach((row,i)=>{
    if(i===0&&row.querySelector('th')){row.style.display='';return;}
    row.style.display=(!term||row.textContent.includes(term))?'':'none';
  });
  btn.parentElement.querySelectorAll('.text-filter').forEach(b=>b.disabled=false);btn.disabled=true;
 }));
})();
