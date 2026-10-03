(function(){
 const q=document.getElementById('archive-q'),out=document.getElementById('archive-results'),go=document.getElementById('archive-go')
 if(!q||!out||!go)return
 const rows=[
  {keys:['赵宁','白昼','南江美术学院'],title:'十三中高三（3）班 / 赵宁',href:'../school/class3.html',desc:'毕业去向与旧个人空间线索'},
  {keys:['赵宁','白昼','个人空间'],title:'榆川百事通 · 白昼个人空间',href:'../yctc/profile_ning.html',desc:'2006—2008年公开日志镜像'},
  {keys:['K203','19:04','南江'],title:'榆运集团 · 南江方向班次',href:'../company/schedule.html',desc:'常规时刻与公开临时停靠附件'},
  {keys:['K203','雨','站台','十一号','五号'],title:'榆川巴士志 · 2008.08.23雨天随拍',href:'../busfan/log_0823.html',desc:'个人站当日晚间文字记录'},
  {keys:['K203','换台','十一号','五号'],title:'客运人论坛 · K203今天到底从哪边发',href:'../drivers/thread_k203.html',desc:'2008年8月23日公开论坛存档'},
  {keys:['赵成山','调班','吴岗','客运二队','DD-200808'],title:'旧站移交目录 · 客运二队班务',href:'yuyun_disk.html#shift',desc:'旧服务器与纸本移交目录'},
  {keys:['摩托','赵师傅','2600'],title:'榆川百事通 · 出125摩托',href:'../yctc/classified_moto.html',desc:'2008年8月12日分类信息'}
 ]
 const deep={
  '附页17':{title:'8月23日，东区通道的一页补记',href:'../2026/anomaly_context.html',desc:'2026年专题资料核对记录'},
  '18:58':{title:'8月23日，东区通道的一页补记',href:'../2026/anomaly_context.html',desc:'2026年专题资料核对记录'},
  '她看见我了':{title:'8月23日，东区通道的一页补记',href:'../2026/anomaly_context.html',desc:'2026年专题资料核对记录'},
  '东区临时通行':{title:'8月23日，东区通道的一页补记',href:'../2026/anomaly_context.html',desc:'2026年专题资料核对记录'}
 }
 function esc(s){return s.replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c))}
 function item(r){return '<li><a target="_blank" rel="noopener" href="'+r.href+'">'+esc(r.title)+'</a><small>'+esc(r.desc)+'</small></li>'}
 function search(){
  const raw=q.value.trim(),term=raw.toLowerCase()
  if(raw.length<2){out.innerHTML='<p class="fine">至少输入两个字符，文件编号与时间可以照原样输入</p>';return}
  let hit=rows.filter(r=>r.keys.some(k=>k.toLowerCase().includes(term)||term.includes(k.toLowerCase())))
  if(deep[raw])hit.push(deep[raw])
  out.innerHTML=hit.length?'<ol>'+hit.map(item).join('')+'</ol>':'<p>没有找到已经完成校对的匹配条目，可以换一个更完整的人名、班次、日期或原文短语</p>'
 }
 go.addEventListener('click',search);q.addEventListener('keydown',e=>{if(e.key==='Enter')search()})
})()
