(function(){
  var body=document.body;
  function lang(){return body.classList.contains('en')?'en':'sl';}
  function setLang(l){body.classList.toggle('en',l==='en');document.documentElement.lang=l; if(window.__flow)window.__flow.refresh();}
  var start='sl';
  setLang(start);

  var stages=[].slice.call(document.querySelectorAll('.stage'));
  var fill=document.getElementById('fill'),dot=document.getElementById('dot');
  var status=document.getElementById('status'),reply=document.getElementById('replycard');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T={
    sl:{reply:'Pozdravljeni! Da, pakete imamo. Cenik in obrazec za naročilo najdete tukaj: <u>vasa-trgovina.si/darila</u>. Rok za 20 kosov vam potrdimo jutri zjutraj.',
        msgs:['Stranka vam piše ob 21.47. Vi že spite.','Asistent odgovori v minuti, ker ste mu odgovore o cenah in rokih že odobrili. Vse drugo počaka na vas.','<b>Zjutraj</b> vidite, kaj čaka na vas. Nič vam ni ušlo.']},
    en:{reply:'Hi! Yes, we have them. Price list and ordering here: <u>your-shop.si/gifts</u>. We’ll confirm the date for 20 packs tomorrow morning.',
        msgs:['A customer writes at 21:47. You’re already asleep.','The assistant answers within a minute, because you already approved prices and dates. Everything else waits for you.','<b>In the morning</b> you see what’s waiting. Nothing slipped.']}
  };
  var TYPING='<span class="typing" aria-hidden="true"><i></i><i></i><i></i></span>';
  T.sl.hint='Pomaknite se navzdol in poglejte, kaj se zgodi.';
  T.en.hint='Scroll down to see what happens.';
  var sec=document.getElementById('primer'),sc=sec.querySelector('.flow-scroll');
  var pinMQ=window.matchMedia('(min-width:861px) and (min-height:760px) and (prefers-reduced-motion:no-preference)');
  sec.classList.add('js');
  var key='',prev=-1,step=-1;
  function clamp(v){return v<0?0:v>1?1:v;}
  function render(s,typing,pct){
    fill.style.width=pct+'%';dot.style.left=pct+'%';
    var k=s+'|'+typing+'|'+lang();
    if(k===key)return;key=k;step=s;
    stages.forEach(function(el,i){
      el.classList.toggle('pending',i>s);
      el.classList.toggle('on',i===s&&s<2);
      el.classList.toggle('done',i<s||(i===s&&s===2));
      el.classList.remove('ring');
    });
    if(s===0&&prev<0&&!reduce){void stages[0].offsetWidth;stages[0].classList.add('ring');}
    prev=s;
    reply.innerHTML=(s>=1&&!typing)?T[lang()].reply:TYPING;
    status.innerHTML=s<0?T[lang()].hint:T[lang()].msgs[s];
  }
  function update(){
    if(reduce){render(2,false,100);return;}
    var vh=window.innerHeight;
    if(pinMQ.matches){
      var r=sc.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height-vh));
      var s=p<.08?-1:p<.38?0:p<.68?1:2;
      render(s,s===1&&p<.5,clamp((p-.08)/.6)*100);
    }else{
      var s2=-1;
      stages.forEach(function(el,i){if(el.getBoundingClientRect().top<vh*.75)s2=i;});
      render(s2,s2===1&&stages[1].getBoundingClientRect().top>vh*.5,s2<=0?0:s2*50);
    }
  }
  var ticking=false;
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(function(){ticking=false;update();});}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  if(pinMQ.addEventListener)pinMQ.addEventListener('change',onScroll);
  window.__flow={refresh:function(){key='';update();}};
  update();
})();
