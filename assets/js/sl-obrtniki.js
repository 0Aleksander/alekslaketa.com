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
    sl:{reply:"Pozdravljeni, trenutno sem na montaži in vas pokličem danes do 18. ure. Lep pozdrav, Tomaž",
        msgs:["Ob 14.20 ste na lestvi in klica ne slišite.", "Stranka v minuti dobi SMS, da jo boste poklicali. Besedilo ste prej odobrili vi.", "<b>Zjutraj</b> vidite, koga morate poklicati in katera ponudba še čaka. Nič vam ni ušlo."]},
    en:{reply:"Hello, I'm on an installation right now and will call you back today before 6 pm. Best, Tomaž",
        msgs:["At 14:20 you're up a ladder and don't hear the call.", "Within a minute the customer gets a text saying you'll call back. You approved the wording beforehand.", "<b>In the morning</b> you see who to call and which quote is still waiting. Nothing slipped."]}
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
