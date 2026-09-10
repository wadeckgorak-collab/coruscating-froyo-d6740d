(()=>{
const EVENT_ID='trail-praloup';
const PHOTO='/card-trail.jpg?v=20260910-0640';

function addStyles(){
  if(document.getElementById('eventureVisualPatchStyles'))return;
  const s=document.createElement('style');
  s.id='eventureVisualPatchStyles';
  s.textContent=`
    #home .highlight{
      min-height:220px;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
      position:relative;
      overflow:hidden;
      padding:22px;
      background:linear-gradient(180deg,rgba(7,23,12,.05),rgba(7,23,12,.88)),url('${PHOTO}') center/cover no-repeat;
      box-shadow:0 14px 34px #0b21171f;
    }
    #home .highlight .eyebrow,#home .highlight h2,#home .highlight .meta{position:relative;z-index:1}
    #home .highlight h2{font-size:25px;line-height:1.08;margin:7px 0}
    #home .highlight .meta{color:#eef7ef;font-size:14px}
    #discoverList .card .photo{height:235px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(8,20,13,.72)),url('${PHOTO}') center/cover no-repeat}
    #publicContent .gallery{display:grid;grid-template-columns:2fr 1fr;gap:7px;margin:12px 0}
    #publicContent .gallery img{display:block;width:100%;height:120px;object-fit:cover;border-radius:14px;background:#e9eee9}
    #publicContent .gallery img:first-child{height:247px;grid-row:span 2}
    #publicContent .shareBox h2{font-size:22px;line-height:1.15}
  `;
  document.head.appendChild(s);
}

function fixImages(){
  addStyles();
  document.querySelectorAll('#discoverList .card').forEach(card=>{
    const title=card.querySelector('h2');
    if(!title||!title.textContent.toLowerCase().includes('winter trail'))return;
    const photo=card.querySelector('.photo');
    if(photo){
      photo.style.backgroundImage=`linear-gradient(180deg,rgba(0,0,0,0),rgba(8,20,13,.72)),url('${PHOTO}')`;
      photo.style.backgroundPosition='center';
      photo.style.backgroundSize='cover';
    }
  });
  const gallery=document.querySelector('#publicContent .gallery');
  if(gallery){
    const imgs=gallery.querySelectorAll('img');
    if(imgs[0]) imgs[0].src=PHOTO;
    imgs.forEach(img=>img.onerror=()=>{img.onerror=null;img.src=PHOTO});
  }
}

const originalRenderDiscover=window.renderDiscover;
if(typeof originalRenderDiscover==='function'){
  window.renderDiscover=function(){originalRenderDiscover.apply(this,arguments);fixImages()};
}
const originalOpenPublic=window.openPublic;
if(typeof originalOpenPublic==='function'){
  window.openPublic=function(){originalOpenPublic.apply(this,arguments);fixImages()};
}

addStyles();
fixImages();
document.addEventListener('DOMContentLoaded',fixImages,{once:true});
setTimeout(fixImages,200);

window.shareEvent=function(){
  const data={title:'Winter Trail Pra Loup — Eventure',text:'Viens passer un week-end à la montagne entre événement et temps libre — Winter Trail de Pra Loup, du 11 au 13 décembre 2026.',url:location.origin+'/?event='+EVENT_ID+'&v=3'};
  if(navigator.share)navigator.share(data).catch(()=>{});else if(window.copyLink)copyLink();
};
window.shareFacebook=function(){window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.origin+'/?event='+EVENT_ID+'&v=3'),'_blank')};
window.shareSMS=function(){location.href='sms:?&body='+encodeURIComponent('Viens passer un week-end à la montagne entre événement et temps libre — Winter Trail de Pra Loup, du 11 au 13 décembre 2026. '+location.origin+'/?event='+EVENT_ID+'&v=3')};
})();
