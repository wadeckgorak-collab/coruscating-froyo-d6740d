(()=>{
const HERO='/eventure-winter-hero.svg';
const EVENT_ID='trail-praloup';
let scheduled=false;
const addStyles=()=>{if(document.getElementById('eventureVisualPatchStyles'))return;const s=document.createElement('style');s.id='eventureVisualPatchStyles';s.textContent=`
#publicContent .eventureShareHero{width:100%;display:block;border-radius:24px;margin:8px 0 18px;box-shadow:0 18px 45px #0b21172a;background:#dfeaf2}
#publicContent .shareBox h2{font-size:24px;line-height:1.1;margin:7px 0 6px}
#publicContent .shareBox .shareHook{font-size:18px;line-height:1.35;font-weight:900;margin:8px 0;color:#fff}
#publicContent .shareBox .shareDate{font-size:13px;line-height:1.45;color:#dbe8df;margin:0 0 10px}
@media(min-width:850px){.app{max-width:1100px}#publicContent .eventureShareHero{border-radius:30px;margin-top:12px}.gallery{grid-template-columns:2fr 1fr 1fr}.gallery img:first-child{height:170px;grid-row:auto}.gallery img{height:170px}.section,.freeHero,.shareBox{max-width:780px;margin-left:auto;margin-right:auto}}
`;document.head.appendChild(s)};
const polish=()=>{
  scheduled=false;
  addStyles();
  const pc=document.getElementById('publicContent');
  if(!pc||!pc.children.length)return;
  if(!pc.querySelector('.eventureShareHero')){
    const img=document.createElement('img');
    img.src=HERO;
    img.alt='Winter Trail Pra Loup — du 11 au 13 décembre 2026';
    img.className='eventureShareHero';
    pc.prepend(img);
  }
  const box=pc.querySelector('.shareBox');
  if(box){
    const h2=box.querySelector('h2');
    const title='Invite quelqu’un à vivre l’aventure';
    if(h2&&h2.textContent!==title)h2.textContent=title;
    const meta=box.querySelector('.meta');
    if(meta){
      const wrap=document.createElement('div');
      wrap.innerHTML='<p class="shareHook">Un week-end à la montagne entre événement et temps libre.</p><p class="shareDate">Du 11 au 13 décembre 2026 à Pra Loup · 3 demi-journées de temps libre.</p>';
      meta.replaceWith(...wrap.childNodes);
    }
  }
};
const schedulePolish=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(polish)};
const obs=new MutationObserver(schedulePolish);
obs.observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('DOMContentLoaded',schedulePolish);
setTimeout(schedulePolish,100);
setTimeout(schedulePolish,700);
window.shareEvent=function(){const data={title:'Winter Trail Pra Loup — Eventure',text:'Viens passer un week-end à la montagne entre événement et temps libre — Winter Trail de Pra Loup, du 11 au 13 décembre 2026.',url:location.origin+'/?event='+EVENT_ID};if(navigator.share)navigator.share(data).catch(()=>{});else if(window.copyLink)copyLink()};
window.shareFacebook=function(){window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.origin+'/?event='+EVENT_ID),'_blank')};
window.shareSMS=function(){location.href='sms:?&body='+encodeURIComponent('Viens passer un week-end à la montagne entre événement et temps libre — Winter Trail de Pra Loup, du 11 au 13 décembre 2026. '+location.origin+'/?event='+EVENT_ID)};
})();
