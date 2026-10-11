import {writeFileSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {guides,languages} from './content.mjs';
const root=fileURLToPath(new URL('.',import.meta.url));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const booth='https://kuronekodev.booth.pm/items/8612192';
const repo='https://github.com/kuroneko11375/menu-edi-guide';
const base='https://kuroneko11375.github.io/menu-edi-guide/';
const ids=['start','modes','walkthrough','video','saving','faq','compatibility'];
const cat=readFileSync(root+'favicon.svg','utf8').replace('<svg ','<svg aria-hidden="true" ');
function section(d,i,body){return `<section class="section" id="${ids[i]}" aria-labelledby="heading-${ids[i]}"><div class="section-head"><span class="number" aria-hidden="true">0${i+1}</span><h2 id="heading-${ids[i]}">${esc(d.nav[i])}</h2></div>${body}</section>`}
for(const [lang,label,file] of languages){
 const d=guides[lang];
 const titles=d.headline.map(v=>`<span>${esc(v)}</span>`).join('');
 const tabs=d.modes.map((m,i)=>`<button class="mode-tab" id="tab-${i}" role="tab" aria-controls="panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${esc(m.short)}</button>`).join('');
 const panels=d.tours.map((tour,i)=>{const s=tour.steps[0];return `<div class="guide-panel" id="panel-${i}" role="tabpanel" aria-labelledby="tab-${i}" tabindex="0">
 <ol class="tour-steps">${tour.steps.map((s,n)=>`<li><button class="tour-step" ${n===0?'aria-current="step"':''}><b>STEP ${n+1}</b>${esc(s.title)}</button></li>`).join('')}</ol>
 <div class="tour-body" aria-live="polite" aria-atomic="true"><h3 class="tour-title">${esc(s.title)}</h3><p class="tour-text">${esc(s.body)}</p><p class="target-label">${esc(s.target)}</p></div>
 <figure class="tour-frame"><img src="assets/${s.image}" alt="${esc(d.screenshot+' — '+s.title)}" width="1440" height="820" loading="lazy"></figure>
 <div class="tour-bottom"><a class="enlarge" href="assets/${s.image}" target="_blank" rel="noopener">${esc(d.enlarge)}</a><div class="tour-nav"><button data-prev disabled>${esc(d.previous)}</button><span class="tour-count small" aria-live="polite">1 / ${tour.steps.length}</span><button data-next>${esc(d.next)}</button></div></div>
 <ol class="no-js-steps">${tour.steps.map(s=>`<li><strong>${esc(s.title)}</strong><p>${esc(s.body)} <a href="assets/${s.image}">${esc(d.enlarge)}</a></p></li>`).join('')}</ol></div>`}).join('');
 const html=`<!doctype html>
<html lang="${lang}" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#765787">
<title>メニューエディ v0.1.2 | ${esc(d.manual)}</title><meta name="description" content="${esc(d.intro)}"><link rel="canonical" href="${base+file}">
${languages.map(([l,,f])=>`<link rel="alternate" hreflang="${l}" href="${base+f}">`).join('')}<link rel="alternate" hreflang="x-default" href="${base}">
<meta property="og:type" content="website"><meta property="og:title" content="メニューエディ — ${esc(d.manual)}"><meta property="og:description" content="${esc(d.intro)}"><meta property="og:image" content="${base}assets/video-poster.png"><meta property="og:url" content="${base+file}">
<link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="site.css"><script src="site.js" defer></script></head>
<body id="top"><a class="skip" href="#main">${esc(d.skip)}</a><header class="topbar"><div class="top-inner"><a class="brand" href="${file}">${cat}<span><small>KURO NEKO DEV</small>メニューエディ</span></a><nav class="top-links" aria-label="${esc(d.manual)}"><a href="#walkthrough">${esc(d.nav[2])}</a><a href="#faq">${esc(d.nav[5])}</a><a href="${booth}">BOOTH ↗</a></nav><nav class="languages" aria-label="Language">${languages.map(([l,n,f])=>`<a href="${f}" lang="${l}" hreflang="${l}" ${l===lang?'aria-current="page"':''}>${n}</a>`).join('')}</nav></div></header>
<div class="hero"><div><p class="eyebrow"><span class="badge">v0.1.2</span>${esc(d.manual)}</p><h1>${titles}</h1><p class="intro">${esc(d.intro)}</p><div class="actions"><a class="button" href="#start">${esc(d.begin)} <span aria-hidden="true">↓</span></a><a class="button secondary" href="${booth}">${esc(d.booth)} ↗</a></div><small>${esc(d.heroNote)}</small></div><figure class="hero-shot"><img src="assets/step-27.png" alt="${esc(d.screenshot)}" width="1440" height="820" fetchpriority="high"><figcaption>${esc(d.heroCaption)}</figcaption></figure></div>
<div class="shell"><aside class="contents"><p>${esc(d.contents)}</p><nav aria-label="${esc(d.contents)}">${ids.map((id,i)=>`<a href="#${id}"><span aria-hidden="true">0${i+1}</span>${esc(d.nav[i])}</a>`).join('')}</nav><p class="version">v0.1.2<br>${esc(d.updated)}</p></aside><main id="main">
${section(d,0,`<p class="lead">${esc(d.startLead)}</p><div class="note">${esc(d.requirements)}</div><ol class="steps">${d.startSteps.map(([h,p])=>`<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>`)}
${section(d,1,`<p class="lead">${esc(d.modeLead)}</p><div class="table-wrap" tabindex="0" role="region" aria-label="${esc(d.nav[1])}"><table><thead><tr>${d.columns.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${d.modes.map(m=>`<tr><th scope="row">${esc(m.name)}</th><td>${esc(m.task)}</td><td><strong class="${m.danger?'danger':''}">${esc(m.tag)}</strong><p>${esc(m.effect)}</p></td></tr>`).join('')}</tbody></table></div><div class="note">${esc(d.modeHint)}</div>`)}
${section(d,2,`<p class="lead">${esc(d.tourLead)}</p><div class="mode-tabs" role="tablist" aria-label="${esc(d.nav[1])}">${tabs}</div>${panels}<p class="small">${esc(d.captureNote)}</p>`)}
${section(d,3,`<p class="lead">${esc(d.videoLead)}</p><div class="video-frame"><video id="demo-video" controls playsinline preload="none" poster="assets/video-poster.png" width="1280" height="720" tabindex="0" aria-label="${esc(d.nav[3])}"><source src="assets/menu-edi-guide-ja.mp4" type="video/mp4"><a href="assets/menu-edi-guide-ja.mp4">${esc(d.videoFallback)}</a></video></div><div class="chapter-buttons">${[4,68,103].map((s,i)=>`<button data-seek="${s}"><time>${['0:04','1:08','1:43'][i]}</time>${esc(d.chapters[i])}</button>`).join('')}</div><p class="small">${esc(d.videoNote)} <a href="assets/menu-edi-guide-ja.mp4">${esc(d.videoFallback)} ↗</a></p>`)}
${section(d,4,`<p class="lead">${esc(d.savingLead)}</p><div class="save-grid">${d.saveRows.map(([h,p])=>`<div class="save-row"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div><h3>${esc(d.rulesTitle)}</h3><ul class="rules">${d.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>`)}
${section(d,5,`<p class="lead">${esc(d.faqLead)}</p><div class="faq-search"><label for="faq-query">${esc(d.searchLabel)}</label><input id="faq-query" type="search" placeholder="${esc(d.searchPlaceholder)}" autocomplete="off" aria-controls="faq-list"></div><div class="faq" id="faq-list">${d.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div><p id="faq-empty" class="faq-empty" role="status" hidden>${esc(d.noResults)}</p><p class="support-line small">${esc(d.support)} <a href="${booth}">BOOTH ↗</a></p>`)}
${section(d,6,`<p class="lead">${esc(d.compatLead)}</p><div class="table-wrap" tabindex="0" role="region" aria-label="${esc(d.nav[6])}"><table><thead><tr>${d.compatColumns.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${d.compatRows.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="small">${esc(d.oldPair)}</p><div class="note"><strong>${esc(d.limitsTitle)}</strong>${esc(d.limits)}</div><p class="small">${esc(d.extra)}</p>`)}
</main></div><footer class="footer"><p><strong>黒猫Dev / メニューエディ</strong><br>${esc(d.footer)}</p><p><a href="${repo}">GitHub</a> · <a href="${booth}">BOOTH</a> · <a href="#top">${esc(d.top)} ↑</a></p></footer>
<script type="application/json" id="guide-data">${JSON.stringify({screenshot:d.screenshot,tours:d.tours}).replace(/</g,'\\u003c')}</script></body></html>`;
 writeFileSync(root+file,html);
 console.log(`${file}: ${Buffer.byteLength(html)} bytes`);
}
