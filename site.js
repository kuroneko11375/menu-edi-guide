'use strict';
document.documentElement.classList.replace('no-js','js');
const content=JSON.parse(document.getElementById('guide-data').textContent);
const tabs=[...document.querySelectorAll('.mode-tab')];
const panels=[...document.querySelectorAll('.guide-panel')];
const state=[0,0,0];
function showStep(mode,index){
 const data=content.tours[mode],step=data.steps[index],panel=panels[mode];state[mode]=index;
 panel.querySelector('.tour-title').textContent=step.title;
 panel.querySelector('.tour-text').textContent=step.body;
 panel.querySelector('.target-label').textContent=step.target;
 const image=panel.querySelector('.tour-frame img');image.src='assets/'+step.image;image.alt=content.screenshot+' — '+step.title;
 panel.querySelector('.enlarge').href=image.src;
 panel.querySelectorAll('.focus-box').forEach(e=>e.remove());
 step.boxes.forEach((r,n)=>{const box=document.createElement('span');box.className='focus-box';box.setAttribute('aria-hidden','true');box.style.cssText=`left:${r[0]/14.4}%;top:${r[1]/8.2}%;width:${(r[2]-r[0])/14.4}%;height:${(r[3]-r[1])/8.2}%`;const label=document.createElement('i');label.textContent=n+1;box.append(label);panel.querySelector('.tour-frame').append(box)});
 panel.querySelectorAll('.tour-step').forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
 panel.querySelector('[data-prev]').disabled=index===0;panel.querySelector('[data-next]').disabled=index===data.steps.length-1;
 panel.querySelector('.tour-count').textContent=`${index+1} / ${data.steps.length}`;
}
function setMode(i,focus=false){tabs.forEach((b,n)=>{b.setAttribute('aria-selected',n===i);b.tabIndex=n===i?0:-1;panels[n].hidden=n!==i});if(focus)tabs[i].focus()}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>setMode(i));b.addEventListener('keydown',e=>{let target;if(e.key==='ArrowRight')target=(i+1)%3;else if(e.key==='ArrowLeft')target=(i+2)%3;else if(e.key==='Home')target=0;else if(e.key==='End')target=2;if(target!==undefined){e.preventDefault();setMode(target,true)}})});
panels.forEach((p,i)=>{p.querySelectorAll('.tour-step').forEach((b,n)=>b.addEventListener('click',()=>showStep(i,n)));p.querySelector('[data-prev]').addEventListener('click',()=>showStep(i,Math.max(0,state[i]-1)));p.querySelector('[data-next]').addEventListener('click',()=>showStep(i,Math.min(content.tours[i].steps.length-1,state[i]+1)));showStep(i,0)});setMode(0);
const search=document.getElementById('faq-query'),questions=[...document.querySelectorAll('.faq details')],empty=document.getElementById('faq-empty');
search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase();let count=0;questions.forEach(d=>{const found=d.textContent.toLocaleLowerCase().includes(q);d.hidden=!found;if(found)count++});empty.hidden=count!==0});
const video=document.getElementById('demo-video');
document.querySelectorAll('[data-seek]').forEach(b=>b.addEventListener('click',()=>{const time=Number(b.dataset.seek);const seek=()=>{video.currentTime=Math.min(time,video.duration||time);video.focus()};if(video.readyState>0)seek();else{video.addEventListener('loadedmetadata',seek,{once:true});video.load()}}));
const nav=[...document.querySelectorAll('.contents nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){nav.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main .section').forEach(s=>observer.observe(s))}
// 語言切換保持目前章節，不儲存或傳送任何使用者資料。
document.querySelectorAll('.languages a').forEach(a=>a.addEventListener('click',()=>{if(location.hash)a.hash=location.hash}));
