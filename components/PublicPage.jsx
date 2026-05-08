'use client';
// ═══ Factoría de Ideas · PublicPage v4 · Hero with AI Cards ════════════════
import { useState, useEffect, useRef } from 'react';
const LOGO = '/uploads/Logo oficial FDI para registrar-de13ff70.png';
const Y = '#F5C300', DK = '#0C0C0E', INK = '#1A1A1F', CREAM = '#F5F0E8';

// ── CSS ─────────────────────────────────────────────────────────────────────
const injectCSS = () => {
  if (document.getElementById('fdi-public-css')) return;
  const s = document.createElement('style');
  s.id = 'fdi-public-css';
  s.textContent = `
  .bb  { font-family:'Bebas Neue',cursive; letter-spacing:.05em; }
  .tag { font-family:'Permanent Marker',cursive; }
  .sg  { font-family:'Space Grotesk',sans-serif; }

  /* ── HERO HEADLINE: paint reveal ── */
  @keyframes paintReveal {
    0%   { opacity:0; transform:scaleX(.08) skewX(-18deg); filter:blur(10px); transform-origin:left center; }
    50%  { opacity:1; filter:blur(0); transform:scaleX(1.04) skewX(2.5deg); transform-origin:left center; }
    75%  { transform:scaleX(.98) skewX(-.5deg); transform-origin:left center; }
    100% { opacity:1; transform:scaleX(1) skewX(0deg); transform-origin:left center; }
  }
  .paint { display:block; opacity:0; animation:paintReveal .7s cubic-bezier(.22,1,.36,1) forwards; }

  /* ── AI card entrance ── */
  @keyframes cardEntrance {
    0%   { opacity:0; transform:translateY(32px) scale(.85); }
    65%  { opacity:1; transform:translateY(-6px) scale(1.03); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  .card-enter { opacity:0; animation:cardEntrance .8s cubic-bezier(.34,1.56,.64,1) forwards; }

  /* ── AI card float (separate from entrance) ── */
  @keyframes cf1 { 0%,100%{transform:rotate(-3.5deg) translateY(0)}   50%{transform:rotate(-2deg) translateY(-11px)} }
  @keyframes cf2 { 0%,100%{transform:rotate(4deg) translateY(0)}       50%{transform:rotate(5.5deg) translateY(-14px)} }
  @keyframes cf3 { 0%,100%{transform:rotate(-2deg) translateY(0)}      50%{transform:rotate(-.5deg) translateY(-8px)} }
  @keyframes cf4 { 0%,100%{transform:rotate(5deg) translateY(0)}       50%{transform:rotate(6.5deg) translateY(-16px)} }
  @keyframes cf5 { 0%,100%{transform:rotate(-3deg) translateY(0)}      50%{transform:rotate(-1.5deg) translateY(-10px)} }
  @keyframes cf6 { 0%,100%{transform:rotate(4.5deg) translateY(0)}     50%{transform:rotate(6deg) translateY(-9px)} }
  .cf1 { animation:cf1 7.5s ease-in-out infinite; }
  .cf2 { animation:cf2 8.3s ease-in-out infinite; }
  .cf3 { animation:cf3 9.0s ease-in-out infinite; }
  .cf4 { animation:cf4 7.1s ease-in-out infinite; }
  .cf5 { animation:cf5 8.7s ease-in-out infinite; }
  .cf6 { animation:cf6 7.4s ease-in-out infinite; }

  /* ── Logo watermark float ── */
  @keyframes logoFloat { 0%,100%{transform:translateY(-54%) rotate(-1.2deg)} 50%{transform:translateY(-58%) rotate(.8deg)} }
  .logo-wm { animation:logoFloat 10s ease-in-out infinite; }

  /* ── Misc ── */
  @keyframes sprayPulse { 0%,100%{opacity:.08;transform:scale(1)} 50%{opacity:.16;transform:scale(1.08)} }
  .spray-bg { animation:sprayPulse 7s ease-in-out infinite; border-radius:50%; filter:blur(70px); position:absolute; pointer-events:none; }
  @keyframes pulse2 { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
  .live-dot { animation:pulse2 2s ease infinite; border-radius:50%; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cursor { animation:blink .85s step-end infinite; }
  @keyframes tick  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .tick-track { animation:tick 24s linear infinite; display:flex; width:max-content; }
  @keyframes drip  { 0%{height:0;opacity:1} 75%{height:52px;opacity:1} 100%{height:52px;opacity:0} }
  .drip-d { border-radius:0 0 50% 50%; animation:drip 3s ease-in infinite; position:absolute; bottom:-52px; }

  /* ── Scroll reveal ── */
  .rev { opacity:0; transform:translateY(44px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
  .rev.sl { transform:translateX(-56px); }
  .rev.sr { transform:translateX(56px); }
  .rev.sc { transform:scale(.9); }
  .rev.in { opacity:1!important; transform:none!important; }

  /* ── Cards ── */
  .svc-card { transition:transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .28s ease; }
  .svc-card:hover { transform:rotate(2deg) translateY(-10px)!important; box-shadow:8px 8px 0 #F5C300!important; }
  .port-card { transition:transform .25s cubic-bezier(.34,1.56,.64,1); }
  .port-card:hover { transform:translateY(-8px) rotate(-.5deg)!important; }
  .testi-card { transition:transform .25s ease,box-shadow .25s ease; }
  .testi-card:hover { transform:scale(1.03)!important; box-shadow:0 12px 32px rgba(0,0,0,.35)!important; }

  /* ── Buttons ── */
  .btn-y { transition:transform .15s,box-shadow .15s; }
  .btn-y:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(245,195,0,.45)!important; }
  .btn-wh { transition:border-color .2s,color .2s; }
  .btn-wh:hover { border-color:rgba(245,195,0,.6)!important; color:#F5C300!important; }

  /* ── Nav ── */
  .nav-lnk { position:relative; transition:color .2s; }
  .nav-lnk::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#F5C300; transition:width .25s; }
  .nav-lnk:hover::after { width:100%; }
  .nav-lnk:hover { color:#fff!important; }

  /* ── Inputs ── */
  .fdi-inp:focus { border-color:#F5C300!important; box-shadow:0 0 0 3px rgba(245,195,0,.15); outline:none; }

  /* ── Calculator ── */
  .calc-btn { transition:all .2s; border:2px solid rgba(255,255,255,.1); cursor:pointer; }
  .calc-btn:hover { border-color:#F5C300; background:rgba(245,195,0,.08)!important; color:#F5C300!important; }
  .calc-btn.active { background:#F5C300!important; color:#0C0C0E!important; border-color:#F5C300!important; font-weight:700; }
  .feat-cb { transition:all .15s; border:2px solid rgba(255,255,255,.1); cursor:pointer; border-radius:6px; }
  .feat-cb:hover { border-color:#F5C300; }
  .feat-cb.active { border-color:#F5C300; background:rgba(245,195,0,.08); }

  /* ── Grid bg ── */
  .grid-bg { background-image:linear-gradient(rgba(245,195,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,195,0,.04) 1px,transparent 1px); background-size:72px 72px; }

  /* ── Mobile ── */
  @media(max-width:768px) {
    .hide-mob { display:none!important; }
    .grid-2   { grid-template-columns:1fr!important; }
    .grid-3   { grid-template-columns:1fr!important; }
    .grid-5   { grid-template-columns:repeat(2,1fr)!important; }
    .grid-4   { grid-template-columns:repeat(2,1fr)!important; }
    .pad-sec  { padding-left:20px!important; padding-right:20px!important; }
    .hero-grid{ grid-template-columns:1fr!important; }
  }
  `;
  document.head.appendChild(s);
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const Spray = ({ x, y, size, color, delay }) => (
  <div className="spray-bg" style={{ position:'absolute',left:x,top:y,width:size,height:size,background:color,animationDelay:delay,transform:'translate(-50%,-50%)' }} />
);

const Drips = ({ color = Y }) => (
  <div style={{ position:'relative',height:0,overflow:'visible',zIndex:5 }}>
    {[9,14,8,11,7,13,10,6,12,9,14,8].map((w,i) => (
      <div key={i} className="drip-d" style={{ width:w,background:color,left:`${3+i*8.8}%`,animationDelay:`${i*.2}s`,animationDuration:`${2.4+(i%3)*.6}s` }} />
    ))}
  </div>
);

const Ticker = ({ dark }) => {
  const words = ['WEB','MOBILE','IA','DISEÑO','GUATEMALA','CENTROAMÉRICA','ESPAÑA','APPS','SISTEMAS','STARTUP','DIGITAL','CÓDIGO','✦'];
  return (
    <div style={{ overflow:'hidden',background:dark?DK:Y,padding:'13px 0',borderTop:dark?'1px solid rgba(255,255,255,.06)':'none' }}>
      <div className="tick-track">
        {[...words,...words].map((w,i) => (
          <span key={i} className="bb" style={{ fontSize:15,color:dark?Y:DK,padding:'0 24px',opacity:w==='✦'?.3:1 }}>{w}</span>
        ))}
      </div>
    </div>
  );
};

const Stars = ({ n=5 }) => <span style={{ color:Y,fontSize:16,letterSpacing:2 }}>{'★'.repeat(n)}</span>;

// ── Counter hook ──────────────────────────────────────────────────────────────
const useCounter = (ref, target, suffix='') => {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let t0=null;
      const step = ts => {
        if (!t0) t0=ts;
        const p = Math.min((ts-t0)/1500,1), ease=1-Math.pow(1-p,3);
        if (ref.current) ref.current.textContent = Math.floor(ease*target)+suffix;
        if (p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },{ threshold:.5 });
    obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
};

// ── Reveal hook ───────────────────────────────────────────────────────────────
const useReveal = () => {
  useEffect(()=>{
    const obs = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.1});
    document.querySelectorAll('.rev').forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  },[]);
};

// ── AI CARDS data ─────────────────────────────────────────────────────────────
const AI_CARDS = [
  {
    id:'chatbot', cls:'cf1', delay:'0.9s',
    pos:{ top:'4%', left:'2%' }, zIndex:6,
    accent:'#22C55E', title:'CHATBOT IA 24/7',
    render: () => (
      <div>
        <div style={{ display:'flex',alignItems:'center',gap:7,marginBottom:12 }}>
          <div className="live-dot" style={{ width:7,height:7,background:'#22C55E',flexShrink:0 }} />
          <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:10,color:'rgba(255,255,255,.4)',letterSpacing:'.12em',textTransform:'uppercase' }}>Chatbot IA · 24/7</span>
        </div>
        <div style={{ background:'rgba(255,255,255,.04)',borderRadius:8,padding:'9px 12px',marginBottom:7,borderLeft:'2px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontSize:10,color:'rgba(255,255,255,.35)',marginBottom:3,fontFamily:"'Space Grotesk',sans-serif" }}>Cliente</div>
          <div style={{ fontSize:12,color:'rgba(255,255,255,.8)' }}>¿Cuánto cuesta el plan Pro?</div>
        </div>
        <div style={{ background:'rgba(34,197,94,.07)',border:'1px solid rgba(34,197,94,.18)',borderRadius:8,padding:'9px 12px',borderLeft:'2px solid #22C55E' }}>
          <div style={{ fontSize:10,color:'#22C55E',marginBottom:3,fontFamily:"'Space Grotesk',sans-serif" }}>IA</div>
          <div style={{ fontSize:12,color:'rgba(255,255,255,.78)',lineHeight:1.5 }}>El Plan Pro es $49/mes e incluye…<span className="cursor" style={{ color:'#22C55E',fontWeight:700 }}>|</span></div>
        </div>
        <div style={{ marginTop:9,display:'flex',justifyContent:'space-between' }}>
          <span style={{ fontSize:9,color:'rgba(255,255,255,.25)',fontFamily:"'Space Grotesk',sans-serif" }}>Responde al instante</span>
          <span style={{ fontSize:9,color:'#22C55E',fontFamily:"'Space Grotesk',sans-serif",fontWeight:700 }}>94% satisf.</span>
        </div>
      </div>
    ), width:228,
  },
  {
    id:'pred', cls:'cf2', delay:'1.3s',
    pos:{ top:'2%', right:'1%' }, zIndex:5,
    accent:Y, title:'PREDICCIÓN ML',
    render: () => (
      <div>
        <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:12,color:Y,letterSpacing:'.12em',marginBottom:12 }}>PREDICCIÓN DE VENTAS</div>
        <div style={{ display:'flex',alignItems:'flex-end',gap:4,height:52,marginBottom:10 }}>
          {[28,42,35,54,40,62,80].map((h,i)=>(
            <div key={i} style={{ flex:1,height:`${h}%`,borderRadius:'3px 3px 0 0',background:i===6?`linear-gradient(180deg,${Y},#FF9900)`:i>=4?Y+'55':'rgba(255,255,255,.1)',boxShadow:i===6?`0 0 10px ${Y}88`:'' }} />
          ))}
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <span style={{ fontSize:10,color:'rgba(255,255,255,.35)',fontFamily:"'Space Grotesk',sans-serif" }}>Próx. 30 días</span>
          <span style={{ fontFamily:"'Bebas Neue',cursive",fontSize:26,color:'#22C55E',lineHeight:1 }}>+34%</span>
        </div>
      </div>
    ), width:202,
  },
  {
    id:'auto', cls:'cf3', delay:'1.7s',
    pos:{ left:'-1%', top:'40%' }, zIndex:7,
    accent:'#8B5CF6', title:'AUTOMATIZACIÓN',
    render: () => (
      <div>
        <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:12,color:'#8B5CF6',letterSpacing:'.12em',marginBottom:12 }}>AUTOMATIZACIÓN</div>
        {[['Pedido recibido','#22C55E','done'],['IA procesa el pedido','#8B5CF6','active'],['Cliente notificado','rgba(255,255,255,.25)','wait']].map(([l,c,s],i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:i<2?10:0 }}>
            <div style={{ width:20,height:20,borderRadius:'50%',background:c+'18',border:`2px solid ${c}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              {s==='done' && <div style={{ width:7,height:7,borderRadius:'50%',background:c }} />}
              {s==='active' && <div style={{ width:7,height:7,borderRadius:'50%',background:c,animation:'blink .8s ease infinite' }} />}
              {s==='wait' && <div style={{ width:5,height:5,borderRadius:'50%',background:c }} />}
            </div>
            <span style={{ fontSize:12,color:s==='wait'?'rgba(255,255,255,.3)':'rgba(255,255,255,.8)',lineHeight:1 }}>{l}</span>
          </div>
        ))}
        <div style={{ marginTop:12,background:'rgba(139,92,246,.08)',border:'1px solid rgba(139,92,246,.15)',borderRadius:8,padding:'7px 11px',fontSize:10,color:'#8B5CF6',fontFamily:"'Space Grotesk',sans-serif",textAlign:'center' }}>
          ⚡ 3.2s · 0 errores · 100% automático
        </div>
      </div>
    ), width:214,
  },
  {
    id:'app', cls:'cf4', delay:'2.1s',
    pos:{ right:'0%', top:'44%' }, zIndex:6,
    accent:'#06B6D4', title:'APP MÓVIL',
    render: () => (
      <div>
        <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:12,color:'#06B6D4',letterSpacing:'.12em',marginBottom:10 }}>APP MÓVIL</div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
          <div>
            <div style={{ fontSize:10,color:'rgba(255,255,255,.35)',fontFamily:"'Space Grotesk',sans-serif",marginBottom:2 }}>Entrega</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:28,color:'#06B6D4',lineHeight:1 }}>45 días</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:20,color:Y }}>★ 4.8</div>
            <div style={{ fontSize:9,color:'rgba(255,255,255,.3)',fontFamily:"'Space Grotesk',sans-serif" }}>avg rating</div>
          </div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4 }}>
          {[['Diseño','#06B6D4'],['Dev','#06B6D4'],['QA','#06B6D4'],['Live','rgba(255,255,255,.15)']].map(([l,c])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ height:3,borderRadius:100,background:c,marginBottom:4,boxShadow:c!=='rgba(255,255,255,.15)'?`0 0 6px ${c}88`:'' }} />
              <div style={{ fontSize:8,color:c!=='rgba(255,255,255,.15)'?'rgba(255,255,255,.55)':'rgba(255,255,255,.2)',fontFamily:"'Space Grotesk',sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ), width:198,
  },
  {
    id:'dash', cls:'cf5', delay:'2.5s',
    pos:{ bottom:'8%', left:'14%' }, zIndex:5,
    accent:'#E63232', title:'DASHBOARD EN VIVO',
    render: () => (
      <div>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
          <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:12,color:'#E63232',letterSpacing:'.12em' }}>DASHBOARD EN VIVO</div>
          <div style={{ width:7,height:7,borderRadius:'50%',background:'#E63232',boxShadow:'0 0 8px #E63232',animation:'blink .8s step-end infinite' }} />
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8 }}>
          {[['1,247','Usuarios',Y],['8.4%','Conversión','#22C55E'],['$12.4k','Ingresos',Y],['1.2%','Churn','#E63232']].map(([v,l,c])=>(
            <div key={l} style={{ background:'rgba(255,255,255,.04)',borderRadius:8,padding:'8px 10px',border:`1px solid ${c}18` }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:20,color:c,lineHeight:1,marginBottom:2 }}>{v}</div>
              <div style={{ fontSize:9,color:'rgba(255,255,255,.35)',fontFamily:"'Space Grotesk',sans-serif",textTransform:'uppercase',letterSpacing:'.07em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ), width:238,
  },
  {
    id:'inv', cls:'cf6', delay:'2.9s',
    pos:{ bottom:'4%', right:'1%' }, zIndex:4,
    accent:'#4CAF8F', title:'INVENTARIO IA',
    render: () => (
      <div>
        <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:12,color:'#4CAF8F',letterSpacing:'.12em',marginBottom:10 }}>INVENTARIO IA</div>
        <div style={{ marginBottom:10 }}>
          <div style={{ display:'flex',justifyContent:'space-between',marginBottom:5 }}>
            <span style={{ fontSize:10,color:'rgba(255,255,255,.4)',fontFamily:"'Space Grotesk',sans-serif" }}>Precisión ML</span>
            <span style={{ fontFamily:"'Bebas Neue',cursive",fontSize:18,color:'#4CAF8F',lineHeight:1 }}>94%</span>
          </div>
          <div style={{ height:5,background:'rgba(255,255,255,.07)',borderRadius:3,overflow:'hidden' }}>
            <div style={{ height:'100%',width:'94%',background:'linear-gradient(90deg,#4CAF8F,#22C55E)',borderRadius:3,boxShadow:'0 0 8px #4CAF8F88' }} />
          </div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:6 }}>
          {[['−35%','Costos'],['0','Roturas']].map(([v,l])=>(
            <div key={l} style={{ background:'rgba(76,175,143,.07)',borderRadius:7,padding:'7px 8px',border:'1px solid rgba(76,175,143,.15)',textAlign:'center' }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive",fontSize:20,color:'#4CAF8F',lineHeight:1 }}>{v}</div>
              <div style={{ fontSize:9,color:'rgba(255,255,255,.35)',fontFamily:"'Space Grotesk',sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ), width:192,
  },
];

// ── CALCULATOR ─────────────────────────────────────────────────────────────────
const Calculator = () => {
  const getPrices = () => { try { const s=localStorage.getItem('fdi_prices'); return s?JSON.parse(s):{types:[{id:'landing',label:'Landing Page',icon:'🏠',lo:800,hi:1800},{id:'web',label:'Web Corporativa',icon:'🌐',lo:2000,hi:4500},{id:'ecomm',label:'E-Commerce',icon:'🛒',lo:3500,hi:7000},{id:'app',label:'App Móvil',icon:'📱',lo:5000,hi:12000},{id:'saas',label:'SaaS / Sistema',icon:'⚙️',lo:8000,hi:20000},{id:'ia',label:'IA & Automatización',icon:'🤖',lo:3000,hi:9000}],features:[{id:'admin',label:'Panel Admin',add:600},{id:'pay',label:'Pagos online',add:700},{id:'ai',label:'Chat con IA',add:900},{id:'multi',label:'Multiidioma',add:350},{id:'seo',label:'SEO avanzado',add:450},{id:'analytics',label:'Analytics',add:350}]}; } catch { return {types:[],features:[]}; } };
  const [pd] = useState(getPrices);
  const types = pd.types.map(t=>({id:t.id,label:t.label,icon:t.icon,base:[t.lo,t.hi]}));
  const features = pd.features;
  const timelines = [{id:'urgent',label:'Urgente',sub:'2–4 sem',mult:1.35},{id:'normal',label:'Normal',sub:'4–8 sem',mult:1},{id:'flex',label:'Flexible',sub:'+8 sem',mult:.9}];
  const [type, setType] = useState('web');
  const [feats, setFeats] = useState(new Set());
  const [time, setTime] = useState('normal');
  const td = types.find(t=>t.id===type)||types[0];
  const fa = [...feats].reduce((s,f)=>s+(features.find(ft=>ft.id===f)?.add||0),0);
  const mt = timelines.find(t=>t.id===time)?.mult||1;
  const [lo,hi] = (td?.base||[0,0]).map(b=>Math.round((b+fa)*mt/100)*100);
  const tog = f => setFeats(prev=>{const n=new Set(prev);n.has(f)?n.delete(f):n.add(f);return n;});
  return (
    <section id="calculadora" style={{ background:INK,padding:'96px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
      <Spray x="90%" y="15%" size="400px" color={Y} delay="0s" />
      <Spray x="5%"  y="85%" size="300px" color="#E63232" delay="2s" />
      <div style={{ maxWidth:980,margin:'0 auto',position:'relative',zIndex:1 }}>
        <div className="rev" style={{ marginBottom:56,textAlign:'center' }}>
          <div className="tag" style={{ color:Y,fontSize:18,marginBottom:8,display:'inline-block',transform:'rotate(-1deg)' }}>sin compromiso</div>
          <h2 className="bb" style={{ fontSize:'clamp(2.8rem,6vw,5rem)',color:'#fff',lineHeight:.92,letterSpacing:'.03em' }}>CALCULA TU<br /><span style={{ color:Y }}>PROYECTO</span></h2>
        </div>
        <div className="rev" style={{ marginBottom:36 }}>
          <div style={{ fontSize:12,fontWeight:700,color:'#6B7280',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:14 }}>1. ¿Qué necesitas?</div>
          <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10 }}>
            {types.map(t=>(
              <button key={t.id} className={`calc-btn bb ${type===t.id?'active':''}`} onClick={()=>setType(t.id)} style={{ background:'rgba(255,255,255,.04)',color:'#aaa',padding:'16px 12px',borderRadius:8,fontSize:17,textAlign:'left',display:'flex',alignItems:'center',gap:10 }}>
                <span style={{ fontSize:22 }}>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rev" style={{ marginBottom:36 }}>
          <div style={{ fontSize:12,fontWeight:700,color:'#6B7280',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:14 }}>2. Funcionalidades extra</div>
          <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
            {features.map(f=>(
              <div key={f.id} className={`feat-cb ${feats.has(f.id)?'active':''}`} onClick={()=>tog(f.id)} style={{ padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(255,255,255,.03)' }}>
                <span style={{ fontSize:13,color:feats.has(f.id)?Y:'#ccc' }}>{f.label}</span>
                <span style={{ fontSize:12,color:'#6B7280',fontWeight:700 }}>+${f.add.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rev" style={{ marginBottom:48 }}>
          <div style={{ fontSize:12,fontWeight:700,color:'#6B7280',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:14 }}>3. ¿Cuándo lo necesitas?</div>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
            {timelines.map(t=>(
              <button key={t.id} className={`calc-btn bb ${time===t.id?'active':''}`} onClick={()=>setTime(t.id)} style={{ background:'rgba(255,255,255,.04)',color:'#aaa',padding:'14px 28px',borderRadius:8,fontSize:18,display:'flex',flexDirection:'column',alignItems:'center',gap:2 }}>
                <span>{t.label}</span><span style={{ fontSize:11,fontFamily:'DM Sans,sans-serif',fontWeight:500,opacity:.6 }}>{t.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rev sc" style={{ background:'rgba(245,195,0,.06)',border:'2px solid rgba(245,195,0,.25)',borderRadius:16,padding:'36px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:24 }}>
          <div>
            <div style={{ fontSize:13,color:'#6B7280',fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:8 }}>Estimación para tu proyecto</div>
            <div className="bb" style={{ fontSize:'clamp(2.8rem,6vw,4.5rem)',color:Y,lineHeight:1,letterSpacing:'.03em' }}>${lo.toLocaleString()} – ${hi.toLocaleString()}</div>
            <div style={{ fontSize:13,color:'rgba(255,255,255,.4)',marginTop:6 }}>*Estimación orientativa · el precio final depende del alcance detallado</div>
          </div>
          <a href={`https://wa.me/34664215489?text=${encodeURIComponent(`Hola! Me interesa un proyecto de tipo ${td?.label}. Presupuesto estimado: $${lo.toLocaleString()}-$${hi.toLocaleString()}.`)}`} target="_blank" className="btn-y bb" style={{ display:'inline-block',background:Y,color:DK,padding:'18px 36px',borderRadius:6,fontSize:20,textDecoration:'none',letterSpacing:'.05em',whiteSpace:'nowrap' }}>
            SOLICITAR PROPUESTA →
          </a>
        </div>
      </div>
    </section>
  );
};

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const testimonios = [
  { name:'Dr. Jorge Flores',company:'IMED Guatemala',role:'Director General',stars:5,text:'Transformaron completamente nuestra gestión médica. El sistema es increíble y el equipo súper profesional. 500+ pacientes gestionados diariamente.',rot:'-2deg',accent:'#4CAF8F',init:'JF' },
  { name:'Luis Hernández',company:'TechStart Regional',role:'CEO & Founder',stars:5,text:'La app superó todas las expectativas. Rápidos, creativos y muy comunicativos. ¡10k descargas en el primer mes!',rot:'1.5deg',accent:Y,init:'LH' },
  { name:'Sandra Pérez',company:'Distribuidora San Pedro',role:'Gerente de Operaciones',stars:5,text:'El sistema de inventario con IA nos ahorró tiempo y dinero desde el primer mes. 35% menos costos operativos.',rot:'-1deg',accent:'#E63232',init:'SP' },
  { name:'María González',company:'Consultora MG',role:'Fundadora',stars:5,text:'La relación calidad-precio es excepcional. Mi landing page convirtió 3x más desde el rediseño.',rot:'2deg',accent:'#2563EB',init:'MG' },
];

const Testimonials = () => (
  <section style={{ background:DK,padding:'96px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
    <div className="grid-bg" style={{ position:'absolute',inset:0,opacity:.4 }} />
    <Spray x="15%" y="20%" size="350px" color="#2563EB" delay="1s" />
    <Spray x="85%" y="70%" size="280px" color="#E63232" delay="3s" />
    <div style={{ maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1 }}>
      <div className="rev" style={{ marginBottom:64 }}>
        <div className="tag" style={{ color:'#E63232',fontSize:18,marginBottom:8,display:'inline-block',transform:'rotate(1.5deg)' }}>lo que dicen</div>
        <h2 className="bb" style={{ fontSize:'clamp(2.8rem,6vw,5rem)',color:'#fff',lineHeight:.92 }}>WALL OF<br /><span style={{ color:Y }}>FAME</span></h2>
      </div>
      <div className="grid-2" style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20 }}>
        {testimonios.map((t,i)=>(
          <div key={t.name} className={`testi-card rev ${i%2===0?'sl':'sr'}`} style={{ background:INK,borderRadius:8,padding:'32px 28px',transform:`rotate(${t.rot})`,border:'1px solid rgba(255,255,255,.07)',borderTop:`4px solid ${t.accent}`,transitionDelay:`${i*80}ms` }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16 }}>
              <div style={{ display:'flex',gap:12,alignItems:'center' }}>
                <div style={{ width:48,height:48,borderRadius:'50%',background:t.accent+'33',border:`2px solid ${t.accent}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <span className="bb" style={{ fontSize:16,color:t.accent }}>{t.init}</span>
                </div>
                <div>
                  <div style={{ fontWeight:700,fontSize:14,color:'#fff' }}>{t.name}</div>
                  <div style={{ fontSize:12,color:'#6B7280' }}>{t.role} · {t.company}</div>
                </div>
              </div>
              <Stars n={t.stars} />
            </div>
            <div className="tag" style={{ fontSize:28,color:t.accent,lineHeight:1,marginBottom:8,opacity:.4 }}>"</div>
            <p style={{ fontSize:15,color:'rgba(255,255,255,.75)',lineHeight:1.65 }}>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── MAIN PUBLIC PAGE ───────────────────────────────────────────────────────────
const PublicPage = ({ onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name:'',email:'',company:'',service:'',message:'' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const c1=useRef(),c2=useRef(),c3=useRef(),c4=useRef();
  useCounter(c1,15,'+'); useCounter(c2,8,'+'); useCounter(c3,3,''); useCounter(c4,100,'%');
  useReveal();

  useEffect(()=>{
    injectCSS();
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',fn);
    return ()=>window.removeEventListener('scroll',fn);
  },[]);

  const go = id => { const el=document.getElementById(id); if(el) window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-64,behavior:'smooth'}); setMenuOpen(false); };
  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert('Error al enviar. Intenta de nuevo o escríbenos por WhatsApp.');
      }
    } catch {
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  const navLinks=[['servicios','Servicios'],['portafolio','Portafolio'],['metodologia','Proceso'],['calculadora','Calculadora'],['contacto','Contacto']];

  return (
    <div style={{ background:DK,color:'#fff',overflowX:'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:200,height:64,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(16px,4vw,56px)',background:scrolled?'rgba(12,12,14,.97)':'transparent',backdropFilter:scrolled?'blur(16px)':'none',borderBottom:scrolled?'1px solid rgba(245,195,0,.12)':'none',transition:'all .3s' }}>
        <div onClick={()=>go('hero')} style={{ cursor:'pointer',flexShrink:0 }}>
          <div style={{ background:Y,borderRadius:5,padding:'3px 8px 5px',transform:'rotate(-2deg)',boxShadow:'2px 3px 0 rgba(0,0,0,.9),4px 5px 0 rgba(0,0,0,.35)',border:'2px solid rgba(0,0,0,.5)',display:'inline-block',lineHeight:1 }}>
            <img src={LOGO} alt="FDI" style={{ height:36,display:'block',objectFit:'contain' }} />
          </div>
        </div>
        <div className="hide-mob" style={{ display:'flex',gap:2 }}>
          {navLinks.map(([id,l])=>(
            <button key={id} onClick={()=>go(id)} className="nav-lnk bb" style={{ background:'none',color:'#aaa',padding:'8px 14px',fontSize:15,border:'none',cursor:'pointer' }}>{l}</button>
          ))}
        </div>
        <div style={{ display:'flex',gap:10,alignItems:'center' }}>
          <button onClick={()=>go('contacto')} className="btn-y bb hide-mob" style={{ background:Y,color:DK,padding:'10px 22px',borderRadius:4,fontSize:15,letterSpacing:'.06em' }}>INICIAR PROYECTO</button>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{ background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,width:38,height:38,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:5,padding:10,transition:'background .2s' }}>
            {[0,1,2].map(i=><div key={i} style={{ width:18,height:2,background:'#aaa',borderRadius:2,transition:'all .2s',transform:menuOpen&&i===0?'rotate(45deg) translate(5px,5px)':menuOpen&&i===2?'rotate(-45deg) translate(5px,-5px)':'none',opacity:menuOpen&&i===1?0:1 }} />)}
          </button>
          <button onClick={onAdminClick} style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',borderRadius:6,width:38,height:38,fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',transition:'background .2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.12)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.05)'}>⚙️</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen&&(
        <div style={{ position:'fixed',top:64,left:0,right:0,background:'rgba(12,12,14,.98)',zIndex:199,padding:'20px 24px 28px',borderBottom:'1px solid rgba(245,195,0,.15)',display:'flex',flexDirection:'column',gap:4 }}>
          {navLinks.map(([id,l])=>(
            <button key={id} onClick={()=>go(id)} className="bb" style={{ background:'none',color:'#ccc',padding:'12px 4px',fontSize:22,border:'none',cursor:'pointer',textAlign:'left',letterSpacing:'.05em',borderBottom:'1px solid rgba(255,255,255,.05)' }}>{l}</button>
          ))}
          <button onClick={()=>go('contacto')} className="btn-y bb" style={{ background:Y,color:DK,padding:'14px',borderRadius:6,fontSize:20,marginTop:12,letterSpacing:'.06em' }}>INICIAR PROYECTO</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="grid-bg" style={{ position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:64 }}>
        {/* Spray bg */}
        <Spray x="5%"  y="15%" size="580px" color={Y}       delay="0s" />
        <Spray x="82%" y="68%" size="440px" color="#E63232" delay="2s" />
        <Spray x="50%" y="100%" size="300px" color="#2563EB" delay="4s" />
        <Spray x="64%" y="12%" size="220px" color={Y}       delay="1s" />

        {/* Logo watermark floating */}
        <div className="logo-wm" style={{ position:'absolute',right:'-4%',top:'54%',width:'clamp(300px,44vw,680px)',opacity:.1,pointerEvents:'none',zIndex:1,filter:'saturate(0) brightness(3)' }}>
          <img src={LOGO} alt="" style={{ width:'100%',display:'block' }} />
        </div>
        <div className="logo-wm" style={{ position:'absolute',right:'0%',top:'54%',width:'clamp(220px,32vw,500px)',opacity:.04,pointerEvents:'none',zIndex:2,animationDelay:'1.5s' }}>
          <img src={LOGO} alt="" style={{ width:'100%',display:'block' }} />
        </div>

        {/* Yellow left stripe */}
        <div style={{ position:'absolute',left:0,top:'12%',width:4,height:'76%',background:`linear-gradient(transparent,${Y},transparent)`,zIndex:5 }} />

        {/* Two-column layout */}
        <div className="hero-grid" style={{ position:'relative',zIndex:10,width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 64px)',alignItems:'center' }}>

          {/* LEFT — headline + CTAs */}
          <div style={{ padding:'60px clamp(20px,6vw,96px) 60px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
            {/* Badge */}
            <div className="tag" style={{ display:'inline-block',background:Y,color:DK,padding:'5px 16px',borderRadius:3,fontSize:14,marginBottom:28,transform:'rotate(-1.5deg)',alignSelf:'flex-start',boxShadow:'2px 3px 0 rgba(0,0,0,.4)' }}>
              🇬🇹 Startup Guatemalteca · IA + Software
            </div>

            {/* GRAFFITI HEADLINE — paint reveal animation */}
            <div style={{ lineHeight:.83,marginBottom:28 }}>
              <span className="paint" style={{ animationDelay:'150ms',fontFamily:"'Bebas Neue',cursive",fontSize:'clamp(1.3rem,3vw,2.7rem)',color:'transparent',WebkitTextStroke:'1.5px rgba(255,255,255,.28)',letterSpacing:'.17em' }}>
                HACEMOS REALIDAD
              </span>
              <span className="paint" style={{ animationDelay:'430ms',fontFamily:"'Bebas Neue',cursive",fontSize:'clamp(5.5rem,13vw,11rem)',color:Y,lineHeight:.84,letterSpacing:'.01em',display:'block',marginTop:4,textShadow:`3px 3px 0 rgba(0,0,0,.55), 0 0 60px rgba(245,195,0,.2)` }}>
                IDEAS
              </span>
              <span className="paint" style={{ animationDelay:'770ms',fontFamily:"'Bebas Neue',cursive",fontSize:'clamp(1.5rem,4vw,3.5rem)',color:'transparent',WebkitTextStroke:'2px rgba(255,255,255,.22)',letterSpacing:'.1em',display:'block',marginTop:8,paddingLeft:'1.5vw' }}>
                DIGITALES
              </span>
            </div>

            <p className="sg" style={{ fontSize:'clamp(.95rem,1.6vw,1.22rem)',color:'rgba(255,255,255,.6)',lineHeight:1.7,maxWidth:480,marginBottom:40 }}>
              Desarrollo web · apps móviles · automatización con IA para PyMEs en Centroamérica y España.
            </p>

            <div style={{ display:'flex',gap:14,flexWrap:'wrap',alignItems:'center' }}>
              <button onClick={()=>go('contacto')} className="btn-y bb" style={{ background:Y,color:DK,padding:'17px 40px',fontSize:18,borderRadius:4,border:'none',letterSpacing:'.06em',boxShadow:`0 0 40px ${Y}44` }}>
                EMPEZAR PROYECTO →
              </button>
              <button onClick={()=>go('calculadora')} className="btn-wh bb" style={{ background:'transparent',color:'rgba(255,255,255,.65)',padding:'17px 32px',fontSize:18,borderRadius:4,border:'2px solid rgba(255,255,255,.18)',letterSpacing:'.06em' }}>
                CALCULAR PRECIO
              </button>
            </div>

            <div style={{ marginTop:52,display:'flex',alignItems:'center',gap:12,color:'rgba(255,255,255,.2)',fontSize:12 }}>
              <div style={{ width:1,height:40,background:'rgba(255,255,255,.12)' }} />
              scroll para explorar
            </div>
          </div>

          {/* RIGHT — floating AI cards */}
          <div className="hide-mob" style={{ position:'relative',height:'100%',minHeight:580,padding:'60px 40px 60px 0',overflow:'visible' }}>
            {/* Center glow */}
            <div style={{ position:'absolute',width:320,height:320,borderRadius:'50%',background:`radial-gradient(circle,rgba(245,195,0,.08) 0%,transparent 70%)`,top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:0 }} />

            {/* AI Cards */}
            {AI_CARDS.map(card=>(
              <div key={card.id} className="card-enter" style={{ animationDelay:card.delay,position:'absolute',...card.pos,zIndex:card.zIndex }}>
                <div className={card.cls} style={{
                  background:'linear-gradient(145deg,#16161C,#0F0F14)',
                  border:`1px solid rgba(255,255,255,.08)`,
                  borderTop:`2.5px solid ${card.accent}`,
                  borderRadius:14,
                  padding:'16px 17px',
                  width:card.width,
                  boxShadow:'0 18px 44px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.025)',
                }}>
                  {card.render()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:'absolute',bottom:0,left:0,right:0,overflow:'visible',height:0,zIndex:5 }}>
          <Drips color={Y} />
        </div>
      </section>

      <Ticker dark={false} />

      {/* ── STATS ── */}
      <section style={{ background:Y,padding:'68px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
        <div className="tag" style={{ position:'absolute',right:'4%',top:'50%',transform:'translateY(-50%) rotate(-7deg)',fontSize:'clamp(5rem,12vw,10rem)',color:'rgba(0,0,0,.05)',pointerEvents:'none',whiteSpace:'nowrap' }}>numbers</div>
        <div className="grid-4" style={{ maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,position:'relative',zIndex:1 }}>
          {[[c1,'Proyectos'],[c2,'Clientes'],[c3,'Países'],[c4,'Satisfacción']].map(([ref,label],i)=>(
            <div key={label} className={`rev ${i%2===0?'sl':'sr'}`} style={{ textAlign:'center' }}>
              <div ref={ref} className="bb" style={{ fontSize:'clamp(3.5rem,6vw,5.5rem)',color:DK,lineHeight:1 }}>0</div>
              <div style={{ fontSize:13,fontWeight:700,color:'rgba(12,12,14,.5)',letterSpacing:'.07em',textTransform:'uppercase',marginTop:4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" style={{ background:CREAM,padding:'96px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
        <div className="tag" style={{ position:'absolute',left:'-1%',bottom:'-6%',fontSize:'clamp(5rem,14vw,13rem)',color:'rgba(12,12,14,.04)',pointerEvents:'none',transform:'rotate(-4deg)',lineHeight:1 }}>SERVICIOS</div>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div className="rev" style={{ marginBottom:60 }}>
            <div className="tag" style={{ color:Y,fontSize:18,marginBottom:8,display:'inline-block',transform:'rotate(-1deg)' }}>lo que hacemos</div>
            <h2 className="bb" style={{ fontSize:'clamp(2.8rem,6vw,5rem)',color:DK,lineHeight:.92 }}>SOLUCIONES<br />DIGITALES</h2>
          </div>
          <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22 }}>
            {[
              {icon:'🌐',num:'01',title:'DESARROLLO WEB',desc:'Plataformas que convierten visitas en clientes.',items:['Landing pages de impacto','Plataformas SaaS','E-commerce','Dashboards & CRMs'],rot:'-1.5deg',accent:Y},
              {icon:'📱',num:'02',title:'APPS MÓVILES',desc:'Tu negocio en el bolsillo de tus clientes.',items:['Apps iOS & Android','React Native / Flutter','Push notifications','Integración con APIs'],rot:'1deg',accent:'#E63232'},
              {icon:'🤖',num:'03',title:'IA & AUTOMATIZACIÓN',desc:'Procesos inteligentes que ahorran tiempo.',items:['Chatbots inteligentes','Predicción de demanda','Automatización de flujos','Integración OpenAI'],rot:'-.5deg',accent:'#2563EB'},
            ].map((s,i)=>(
              <div key={s.num} className={`svc-card rev ${['sl','','sr'][i]}`} style={{ background:'#fff',borderRadius:4,padding:'36px 28px',border:'2px solid rgba(12,12,14,.07)',transform:`rotate(${s.rot})`,boxShadow:'4px 4px 0 rgba(12,12,14,.07)',position:'relative',overflow:'hidden',transitionDelay:`${i*80}ms` }}>
                <div style={{ position:'absolute',top:0,left:0,right:0,height:4,background:s.accent }} />
                <div className="bb" style={{ position:'absolute',top:-10,right:12,fontSize:80,color:'rgba(12,12,14,.04)',lineHeight:1 }}>{s.num}</div>
                <div style={{ fontSize:36,marginBottom:18 }}>{s.icon}</div>
                <h3 className="bb" style={{ fontSize:24,color:DK,marginBottom:10,letterSpacing:'.04em' }}>{s.title}</h3>
                <p style={{ fontSize:13,color:'#6B7280',lineHeight:1.6,marginBottom:18 }}>{s.desc}</p>
                <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:7 }}>
                  {s.items.map(it=><li key={it} style={{ fontSize:13,color:'#374151',display:'flex',gap:8,alignItems:'center' }}><span style={{ color:s.accent,fontWeight:700 }}>↗</span>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portafolio" style={{ background:DK,padding:'96px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
        <Spray x="88%" y="12%" size="350px" color={Y} delay="0s" />
        <Spray x="6%"  y="80%" size="280px" color="#E63232" delay="3s" />
        <div style={{ maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div className="rev" style={{ marginBottom:60 }}>
            <div className="tag" style={{ color:'#E63232',fontSize:18,marginBottom:8,display:'inline-block',transform:'rotate(1deg)' }}>casos reales</div>
            <h2 className="bb" style={{ fontSize:'clamp(2.8rem,6vw,5rem)',color:'#fff',lineHeight:.92 }}>PROYECTOS<br /><span style={{ color:Y }}>QUE MUEVEN</span><br />NEGOCIOS</h2>
          </div>
          <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18 }}>
            {[
              {name:'imedgt.app',type:'Plataforma de Salud Digital',desc:'Transformación digital completa del sistema de gestión médica para clínicas y hospitales.',result:'+60% eficiencia · 500 pacientes/día',accent:'#4CAF8F',tag:'SALUD'},
              {name:'Empresa Centroamericana',type:'Sistema Inventory AI',desc:'Automatización de inventarios con machine learning y predicción de demanda.',result:'35% ahorro costos · 0 roturas stock',accent:Y,tag:'RETAIL'},
              {name:'Startup Tech Regional',type:'App Móvil Escalable',desc:'Lanzamiento de plataforma mobile con IA integrada para el mercado latinoamericano.',result:'+10k descargas mes 1 · Rating 4.8★',accent:'#E63232',tag:'TECH'},
            ].map((p,i)=>(
              <div key={p.name} className={`port-card rev ${['sl','','sr'][i]}`} style={{ background:INK,borderRadius:4,padding:'28px 24px',borderTop:`4px solid ${p.accent}`,border:'1px solid rgba(255,255,255,.07)',transitionDelay:`${i*90}ms` }}>
                <div className="bb" style={{ fontSize:11,letterSpacing:'.12em',color:p.accent,background:`${p.accent}18`,display:'inline-block',padding:'4px 12px',borderRadius:2,marginBottom:14 }}>{p.tag}</div>
                <h3 className="sg" style={{ fontWeight:800,fontSize:18,color:'#fff',marginBottom:6 }}>{p.name}</h3>
                <div style={{ fontSize:12,color:'#6B7280',marginBottom:14 }}>{p.type}</div>
                <p style={{ fontSize:13,color:'#9CA3AF',lineHeight:1.6,marginBottom:18 }}>{p.desc}</p>
                <div style={{ background:`${p.accent}12`,borderLeft:`3px solid ${p.accent}`,padding:'10px 14px',borderRadius:'0 6px 6px 0' }}>
                  <span style={{ color:p.accent,fontWeight:700,fontSize:12 }}>RESULTADO: </span>
                  <span style={{ color:'#CBD5E1',fontSize:12 }}>{p.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative',marginTop:80 }}><Drips color={CREAM} /></div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section id="metodologia" style={{ background:CREAM,padding:'96px clamp(20px,5vw,100px) 80px',position:'relative',overflow:'hidden' }}>
        <div className="tag" style={{ position:'absolute',right:'-1%',top:'50%',transform:'translateY(-50%) rotate(90deg)',fontSize:'clamp(4rem,9vw,9rem)',color:'rgba(12,12,14,.04)',pointerEvents:'none' }}>proceso</div>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div className="rev" style={{ textAlign:'center',marginBottom:64 }}>
            <div className="tag" style={{ color:Y,fontSize:18,marginBottom:8,display:'inline-block' }}>cómo trabajamos</div>
            <h2 className="bb" style={{ fontSize:'clamp(2.8rem,6vw,5rem)',color:DK,lineHeight:.92 }}>NUESTRA<br />METODOLOGÍA</h2>
          </div>
          <div className="grid-5" style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,position:'relative' }}>
            <div style={{ position:'absolute',top:30,left:'10%',right:'10%',height:3,background:`linear-gradient(90deg,#8B5CF6,#EC4899,#2563EB,#4CAF8F,${Y})`,opacity:.4,borderRadius:2,zIndex:0 }} />
            {[{num:'01',title:'ANÁLISIS',desc:'Entendemos tu negocio y objetivos.',color:'#8B5CF6'},{num:'02',title:'DISEÑO',desc:'Prototipamos antes de construir.',color:'#EC4899'},{num:'03',title:'DEV',desc:'Código limpio y efectivo.',color:'#2563EB'},{num:'04',title:'DEPLOY',desc:'Lanzamiento controlado.',color:Y},{num:'05',title:'SOPORTE',desc:'Contigo después del lanzamiento.',color:'#22C55E'}].map((s,i)=>(
              <div key={s.num} className="rev" style={{ textAlign:'center',padding:'0 8px',transitionDelay:`${i*90}ms`,position:'relative',zIndex:1 }}>
                <div className="bb" style={{ width:60,height:60,borderRadius:'50%',background:s.color,color:DK,fontSize:20,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px',boxShadow:`0 0 20px ${s.color}55` }}>{s.num}</div>
                <div className="bb" style={{ fontSize:17,color:DK,marginBottom:6,letterSpacing:'.05em' }}>{s.title}</div>
                <div style={{ fontSize:12,color:'#6B7280',lineHeight:1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative',marginTop:64 }}><Drips color={DK} /></div>
      </section>

      <Ticker dark={true} />
      <Calculator />
      <Testimonials />

      {/* ── CONTACT ── */}
      <section id="contacto" style={{ background:DK,padding:'96px clamp(20px,5vw,100px)',position:'relative',overflow:'hidden' }}>
        <Spray x="78%" y="18%" size="380px" color={Y} delay="1s" />
        <Spray x="10%" y="72%" size="280px" color="#2563EB" delay="3s" />
        <div style={{ maxWidth:1060,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'start',position:'relative',zIndex:1 }} className="grid-2">
          <div>
            <div className="rev sl">
              <div className="tag" style={{ color:Y,fontSize:18,marginBottom:8,display:'inline-block',transform:'rotate(-1.5deg)' }}>¿tienes una idea?</div>
              <h2 className="bb" style={{ fontSize:'clamp(3rem,7vw,5.5rem)',color:'#fff',lineHeight:.9,marginBottom:28 }}>HABLEMOS<br /><span style={{ color:Y }}>HOY</span></h2>
              <p style={{ fontSize:15,color:'rgba(255,255,255,.5)',lineHeight:1.7,marginBottom:32 }}>Cuéntanos tu idea y te respondemos en menos de 24 horas con una propuesta sin compromiso.</p>
            </div>
            <div className="rev sl" style={{ display:'flex',flexDirection:'column',gap:14,transitionDelay:'100ms' }}>
              {[['✉️','luisan.cabrera@gmail.com'],['📞','+34 664 215 489'],['📍','España · Guatemala · Centroamérica']].map(([ic,val])=>(
                <div key={val} style={{ display:'flex',gap:14,alignItems:'center' }}>
                  <div style={{ width:42,height:42,borderRadius:4,background:'rgba(245,195,0,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>{ic}</div>
                  <span style={{ color:'rgba(255,255,255,.65)',fontSize:14 }}>{val}</span>
                </div>
              ))}
            </div>
            <div className="rev sl" style={{ marginTop:36,transitionDelay:'180ms' }}>
              <a href="https://wa.me/34664215489" target="_blank" className="btn-y bb" style={{ display:'inline-flex',alignItems:'center',gap:10,background:'#25D366',color:'#fff',padding:'16px 32px',borderRadius:4,fontSize:18,letterSpacing:'.05em',textDecoration:'none' }}>
                <span style={{ fontSize:22 }}>💬</span> ESCRIBIR POR WHATSAPP
              </a>
            </div>
          </div>
          <div className="rev sr">
            {sent ? (
              <div style={{ background:INK,borderRadius:10,padding:'44px 32px',textAlign:'center',border:'1px solid rgba(245,195,0,.2)' }}>
                <div style={{ fontSize:52,marginBottom:14 }}>🚀</div>
                <h3 className="bb" style={{ fontSize:30,color:'#fff',marginBottom:10,letterSpacing:'.04em' }}>¡MENSAJE ENVIADO!</h3>
                <p style={{ color:'rgba(255,255,255,.5)',fontSize:14,marginBottom:22,lineHeight:1.6 }}>Te respondemos en menos de 24h. ¡Gracias por confiar en Factoría de Ideas!</p>
                <button onClick={()=>setSent(false)} className="btn-y bb" style={{ background:Y,color:DK,padding:'12px 28px',borderRadius:4,fontSize:16,letterSpacing:'.05em' }}>ENVIAR OTRO →</button>
              </div>
            ):(
              <form onSubmit={handleSubmit} style={{ background:INK,borderRadius:10,padding:'32px 28px',border:'1px solid rgba(255,255,255,.07)',display:'flex',flexDirection:'column',gap:13 }}>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:13 }}>
                  {[['Nombre *','name','text',true],['Email *','email','email',true]].map(([l,k,t,req])=>(
                    <div key={k}>
                      <label style={{ fontSize:11,fontWeight:700,color:'#6B7280',letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:5 }}>{l}</label>
                      <input required={req} type={t} className="fdi-inp" value={formData[k]} onChange={e=>setFormData({...formData,[k]:e.target.value})} style={{ width:'100%',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'11px 13px',color:'#fff',fontSize:14,boxSizing:'border-box' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:'#6B7280',letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:5 }}>Empresa</label>
                  <input className="fdi-inp" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})} style={{ width:'100%',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'11px 13px',color:'#fff',fontSize:14,boxSizing:'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:'#6B7280',letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:5 }}>Servicio</label>
                  <select className="fdi-inp" value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})} style={{ width:'100%',background:'#1A1A1F',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'11px 13px',color:formData.service?'#fff':'#6B7280',fontSize:14,boxSizing:'border-box',cursor:'pointer' }}>
                    <option value="">Selecciona...</option>
                    {['Sitio web','App móvil','Sistema a medida','IA & Automatización','Consultoría'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:'#6B7280',letterSpacing:'.08em',textTransform:'uppercase',display:'block',marginBottom:5 }}>Tu proyecto</label>
                  <textarea className="fdi-inp" value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} placeholder="Cuéntame sobre tu idea..." style={{ width:'100%',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'11px 13px',color:'#fff',fontSize:14,boxSizing:'border-box',minHeight:90,resize:'vertical' }} />
                </div>
                <button type="submit" disabled={sending} className="btn-y bb" style={{ background: sending ? '#b8931a' : Y, color: DK, padding: '15px', borderRadius: 6, fontSize: 17, letterSpacing: '.06em', boxShadow: `0 0 28px ${Y}30`, opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#08080A',padding:'56px clamp(20px,5vw,100px) 26px',borderTop:'1px solid rgba(245,195,0,.1)' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div className="grid-3" style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:40,paddingBottom:40,borderBottom:'1px solid rgba(255,255,255,.05)',marginBottom:24 }}>
            <div>
              <img src={LOGO} alt="FDI" style={{ height:52,marginBottom:16 }} />
              <p style={{ color:'#3B3B46',fontSize:14,lineHeight:1.65,maxWidth:270 }}>Transformamos ideas en soluciones digitales para empresas en Guatemala, Centroamérica y España.</p>
            </div>
            <div>
              <div className="bb" style={{ fontSize:13,color:'#6B7280',letterSpacing:'.1em',marginBottom:18 }}>CONTACTO</div>
              {['luisan.cabrera@gmail.com','+34 664 215 489','España · Centroamérica'].map(v=><div key={v} style={{ color:'#4B5563',fontSize:13,marginBottom:9 }}>{v}</div>)}
            </div>
            <div>
              <div className="bb" style={{ fontSize:13,color:'#6B7280',letterSpacing:'.1em',marginBottom:18 }}>SERVICIOS</div>
              {['Desarrollo Web','Apps Móviles','IA & Automatización','Consultoría'].map(v=><div key={v} style={{ color:'#4B5563',fontSize:13,marginBottom:9 }}>{v}</div>)}
            </div>
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
            <span style={{ color:'#222228',fontSize:12 }}>© 2026 Factoría de Ideas® · Todos los derechos reservados.</span>
            <div className="tag" style={{ color:'#222228',fontSize:15 }}>hecho con 💛</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPage;
