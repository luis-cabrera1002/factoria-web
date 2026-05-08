'use client';
// ═══ Factoría de Ideas · CRM v4 · Dark Graffiti · Prices Editor · ProcessView
import { useState, useEffect, useRef } from 'react';
const LOGO = '/uploads/Logo oficial FDI para registrar-de13ff70.png';
const CY = '#F5C300', CDK = '#0C0C0E', CINK = '#1A1A1F', CBG = '#0F0F12', CCARD = '#16161C';

// ── CSS ─────────────────────────────────────────────────────────────────────
const injectCRMCss = () => {
  if (document.getElementById('fdi-crm-css')) return;
  const s = document.createElement('style');
  s.id = 'fdi-crm-css';
  s.textContent = `
  .crm-bb{font-family:'Bebas Neue',cursive;letter-spacing:.06em}
  .crm-tag{font-family:'Permanent Marker',cursive}
  .crm-sg{font-family:'Space Grotesk',sans-serif}
  @keyframes crmSpray{0%,100%{opacity:.05;transform:scale(1)}50%{opacity:.1;transform:scale(1.06)}}
  .crm-spray{animation:crmSpray 8s ease-in-out infinite;border-radius:50%;filter:blur(60px);position:absolute;pointer-events:none}
  .crm-nav-item{transition:all .18s;cursor:pointer;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;border:none;width:100%;text-align:left;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:13px;letter-spacing:.02em}
  .crm-nav-item:hover{background:rgba(245,195,0,.1)!important;color:#fff!important}
  .crm-nav-item.active{background:#F5C300!important;color:#0C0C0E!important}
  /* Dark cards */
  .crm-card{background:#16161C;border-radius:14px;padding:22px;box-shadow:0 2px 20px rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.07);transition:transform .2s,box-shadow .2s,border-color .2s;color:#fff}
  .crm-card:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.4);border-color:rgba(245,195,0,.1)}
  .kan-card{background:#1E1E26;border-radius:10px;padding:13px 15px;box-shadow:0 2px 12px rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:transform .2s,box-shadow .2s}
  .kan-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.4)}
  /* Buttons */
  .crm-btn-y{background:#F5C300;color:#0C0C0E;border:none;border-radius:8px;cursor:pointer;font-family:'Bebas Neue',cursive;letter-spacing:.06em;transition:transform .15s,box-shadow .15s}
  .crm-btn-y:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(245,195,0,.4)}
  .crm-btn-ghost{background:rgba(255,255,255,.07);color:#9CA3AF;border:1px solid rgba(255,255,255,.1);border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s}
  .crm-btn-ghost:hover{background:rgba(255,255,255,.12);color:#fff}
  .crm-btn-danger{background:rgba(239,68,68,.15);color:#EF4444;border:1px solid rgba(239,68,68,.2);border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s}
  .crm-btn-danger:hover{background:rgba(239,68,68,.25)}
  /* Dark inputs */
  .crm-inp{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;box-sizing:border-box;color:#fff}
  .crm-inp:focus{border-color:#F5C300;box-shadow:0 0 0 3px rgba(245,195,0,.1)}
  .crm-inp option{background:#1A1A1F;color:#fff}
  .crm-inp::placeholder{color:rgba(255,255,255,.25)}
  /* Progress */
  .crm-bar{background:rgba(255,255,255,.08);border-radius:100px;height:6px;overflow:hidden}
  .crm-bar-fill{height:100%;border-radius:100px;transition:width .5s ease}
  /* Modal */
  .crm-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px}
  .crm-modal{background:#1A1A1F;border-radius:18px;padding:28px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.08)}
  /* Mobile */
  .crm-sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:299}
  @media(max-width:768px){
    .crm-sidebar-overlay.open{display:block}
    .crm-sidebar{transform:translateX(-100%);transition:transform .3s ease;position:fixed!important;z-index:300;height:100vh;top:0}
    .crm-sidebar.open{transform:translateX(0)!important}
    .crm-content{padding:16px!important}
    .crm-grid-4{grid-template-columns:repeat(2,1fr)!important}
    .crm-grid-2{grid-template-columns:1fr!important}
    .crm-kanban{display:flex!important;overflow-x:auto!important;gap:10px!important;padding-bottom:12px}
    .crm-kanban>div{min-width:200px!important;flex-shrink:0!important}
    .crm-proj-grid{grid-template-columns:1fr!important}
    .crm-detail-grid{grid-template-columns:1fr!important}
    .crm-clients-grid{grid-template-columns:1fr!important}
  }
  @keyframes toastIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slidePanel{from{transform:translateX(100%)}to{transform:translateX(0)}}
  .task-panel{animation:slidePanel .25s ease}
  .task-row-item{transition:background .15s;border-radius:8px}
  .task-row-item:hover{background:rgba(255,255,255,.04)!important}
  textarea.dark-ta{background:transparent;border:none;outline:none;color:rgba(255,255,255,.8);font-size:13px;line-height:1.55;resize:none;font-family:'DM Sans',sans-serif;width:100%;box-sizing:border-box}
  textarea.dark-ta::placeholder{color:rgba(255,255,255,.2)}
  `;
  document.head.appendChild(s);
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const fmt = v => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : `$${v}`;
const progress = tasks => tasks.length ? Math.round(tasks.filter(t=>t.done).length/tasks.length*100) : 0;
const stageCfg = {
  nuevo:{label:'Nuevo',color:'#6B7280'},
  contactado:{label:'Contactado',color:'#3B82F6'},
  propuesta:{label:'Propuesta',color:'#8B5CF6'},
  negociacion:{label:'Negociación',color:CY},
  cerrado:{label:'Ganado ✓',color:'#22C55E'},
  perdido:{label:'Perdido',color:'#EF4444'},
};
const stages=['nuevo','contactado','propuesta','negociacion','cerrado','perdido'];
const statusCfg={
  planificacion:{label:'Planificación',color:'#6B7280'},
  desarrollo:{label:'En desarrollo',color:'#3B82F6'},
  revision:{label:'En revisión',color:'#F59E0B'},
  completado:{label:'Completado',color:'#22C55E'},
  pausado:{label:'Pausado',color:'#EF4444'},
};
const taskCats=['Análisis','Diseño','Backend','Frontend','IA','QA','DevOps','Otro'];
const catColor={Análisis:'#8B5CF6',Diseño:'#EC4899',Backend:'#3B82F6',Frontend:'#06B6D4',IA:'#F59E0B',QA:'#22C55E',DevOps:'#EF4444',Otro:'#6B7280'};
const XP_PER=10;
const LEVELS=[
  {name:'ROOKIE',min:0,icon:'🌱',color:'#6B7280'},
  {name:'JR DEV',min:50,icon:'💻',color:'#3B82F6'},
  {name:'SR DEV',min:150,icon:'⚡',color:CY},
  {name:'EXPERT',min:300,icon:'🔥',color:'#E63232'},
  {name:'MASTER',min:500,icon:'💎',color:'#8B5CF6'},
];
const getXP=projects=>projects.reduce((s,p)=>s+p.tasks.filter(t=>t.done).length*XP_PER,0);
const getLevel=xp=>{let l=LEVELS[0];LEVELS.forEach(lv=>{if(xp>=lv.min)l=lv;});const i=LEVELS.indexOf(l),nxt=LEVELS[i+1];return{...l,xp,pct:nxt?Math.round((xp-l.min)/(nxt.min-l.min)*100):100,nextName:nxt?.name,nextMin:nxt?.min};};

// ── Default prices (synced w/ public calculator) ──────────────────────────────
const DEFAULT_PRICES = {
  types:[
    {id:'landing',label:'Landing Page',icon:'🏠',lo:800,hi:1800},
    {id:'web',label:'Web Corporativa',icon:'🌐',lo:2000,hi:4500},
    {id:'ecomm',label:'E-Commerce',icon:'🛒',lo:3500,hi:7000},
    {id:'app',label:'App Móvil',icon:'📱',lo:5000,hi:12000},
    {id:'saas',label:'SaaS / Sistema',icon:'⚙️',lo:8000,hi:20000},
    {id:'ia',label:'IA & Automatización',icon:'🤖',lo:3000,hi:9000},
  ],
  features:[
    {id:'admin',label:'Panel Admin',add:600},
    {id:'pay',label:'Pagos online',add:700},
    {id:'ai',label:'Chat con IA',add:900},
    {id:'multi',label:'Multiidioma',add:350},
    {id:'seo',label:'SEO avanzado',add:450},
    {id:'analytics',label:'Analytics',add:350},
  ],
};

// ── Seed data ─────────────────────────────────────────────────────────────────
const mkTask=(id,text,done,category,extra={})=>({id,text,done,category,description:'',dueDate:'',priority:'media',subtasks:[],processStage:'',processElement:'',...extra});
const seedLeads=[
  {id:'l1',name:'Carlos Mendez',company:'Restaurante El Fogón',email:'carlos@elfogon.gt',phone:'+502 5555-1234',stage:'nuevo',notes:'App para pedidos online.',value:3500,createdAt:'2026-04-10'},
  {id:'l2',name:'Ana García',company:'Clínica Vida Sana',email:'ana@vidasana.com',phone:'+34 612 345 678',stage:'contactado',notes:'Sistema de agendamiento.',value:8000,createdAt:'2026-04-08'},
  {id:'l3',name:'Roberto Juárez',company:'Ferretería El Martillo',email:'rjuarez@elmartillo.gt',phone:'+502 4444-5678',stage:'propuesta',notes:'ERP + ecommerce.',value:12000,createdAt:'2026-03-28'},
  {id:'l4',name:'María López',company:'Academia Digital MX',email:'maria@academiadigital.mx',phone:'+52 55 1234 5678',stage:'negociacion',notes:'Plataforma LMS con IA.',value:15000,createdAt:'2026-03-15'},
  {id:'l5',name:'Pedro Castillo',company:'Constructora Andes',email:'pcastillo@andes.pe',phone:'+51 999 888 777',stage:'cerrado',notes:'Landing page cerrada.',value:4500,createdAt:'2026-03-01'},
];
const seedClients=[
  {id:'c1',name:'Dr. Jorge Flores',company:'IMED Guatemala',email:'jflores@imedgt.app',phone:'+502 2222-3333',website:'imedgt.app',since:'2025-06',notes:'Plataforma de salud digital.'},
  {id:'c2',name:'Luis Hernández',company:'TechStart Regional',email:'luis@techstart.io',phone:'+502 7777-8888',website:'techstart.io',since:'2025-09',notes:'App móvil escalable.'},
  {id:'c3',name:'Sandra Pérez',company:'Distribuidora San Pedro',email:'sandra@sanpedro.com',phone:'+502 3333-4444',website:'',since:'2026-01',notes:'Sistema de inventario con IA.'},
];
const seedProjects=[
  {id:'p1',clientId:'c1',name:'IMED v2.0 – Módulo Lab',type:'Web App',status:'desarrollo',startDate:'2026-03-01',endDate:'2026-05-30',budget:6500,notes:'Integración con equipos de laboratorio.',
   tasks:[mkTask('t1','Diseño UX/UI módulo',true,'Diseño'),mkTask('t2','API equipos laboratorio',true,'Backend'),mkTask('t3','Frontend resultados',false,'Frontend',{dueDate:'2026-05-10',priority:'alta'}),mkTask('t4','Integración sistema',false,'Backend',{priority:'alta'}),mkTask('t5','Testing y QA',false,'QA'),mkTask('t6','Deploy producción',false,'DevOps')]},
  {id:'p2',clientId:'c2',name:'TechStart App v1.5',type:'Mobile App',status:'revision',startDate:'2026-02-01',endDate:'2026-04-30',budget:9000,notes:'Actualización con IA integrada.',
   tasks:[mkTask('t7','Onboarding redesign',true,'Diseño'),mkTask('t8','Integración ChatGPT',true,'Backend'),mkTask('t9','Optimización performance',true,'Frontend'),mkTask('t10','Testing iOS & Android',false,'QA',{dueDate:'2026-04-25',priority:'alta'}),mkTask('t11','Publicación en stores',false,'DevOps')]},
  {id:'p3',clientId:'c3',name:'Sistema Inventario IA',type:'Web App',status:'planificacion',startDate:'2026-04-15',endDate:'2026-07-15',budget:5500,notes:'Inventario con predicción de demanda.',
   tasks:[mkTask('t12','Levantamiento requerimientos',true,'Análisis'),mkTask('t13','Diseño de base de datos',false,'Backend'),mkTask('t14','Wireframes',false,'Diseño'),mkTask('t15','API REST',false,'Backend'),mkTask('t16','Dashboard frontend',false,'Frontend'),mkTask('t17','Módulo IA predicción',false,'IA',{priority:'alta'}),mkTask('t18','Testing integral',false,'QA')]},
];

// ── Micro-components ──────────────────────────────────────────────────────────
function Badge({color,children,small}){return <span style={{display:'inline-block',padding:small?'2px 9px':'4px 12px',borderRadius:100,fontSize:small?11:12,fontWeight:700,background:color+'22',color,letterSpacing:'.02em'}}>{children}</span>;}
function ProgressBar({value,color=CY}){return <div className="crm-bar"><div className="crm-bar-fill" style={{width:`${value}%`,background:color}}/></div>;}
function Ring({pct,color,size=52}){const r=size/2-7,c=2*Math.PI*r,d=c*(1-pct/100);return <svg width={size} height={size} style={{flexShrink:0}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={5}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={c} strokeDashoffset={d} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:'stroke-dashoffset .6s ease'}}/><text x={size/2} y={size/2+4} textAnchor="middle" fontSize={11} fontWeight="800" fill={color} fontFamily="'Bebas Neue',cursive">{pct}%</text></svg>;}
function Modal({onClose,title,children}){return <div className="crm-overlay" onClick={onClose}><div className="crm-modal" onClick={e=>e.stopPropagation()}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}><h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:'#fff'}}>{title}</h3><button onClick={onClose} style={{background:'rgba(255,255,255,.08)',border:'none',borderRadius:8,width:32,height:32,cursor:'pointer',fontSize:18,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button></div>{children}</div></div>;}
function Toast({msg,onDone}){useEffect(()=>{const t=setTimeout(onDone,2200);return()=>clearTimeout(t);},[]);return <div style={{position:'fixed',top:72,right:20,zIndex:999,background:CDK,color:CY,padding:'11px 20px',borderRadius:12,fontFamily:"'Bebas Neue',cursive",fontSize:19,letterSpacing:'.08em',boxShadow:'0 8px 24px rgba(0,0,0,.4)',display:'flex',alignItems:'center',gap:9,animation:'toastIn .3s ease',border:`1px solid ${CY}33`}}><span style={{fontSize:20}}>⚡</span>{msg}</div>;}
const lbl={fontSize:11,fontWeight:700,color:'rgba(255,255,255,.4)',letterSpacing:'.07em',textTransform:'uppercase',display:'block',marginBottom:5};
const row2={display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14};

// ── XP Banner ─────────────────────────────────────────────────────────────────
function XPBanner({projects}){
  const xp=getXP(projects),lvl=getLevel(xp);
  const total=projects.reduce((s,p)=>s+p.tasks.length,0),done=projects.reduce((s,p)=>s+p.tasks.filter(t=>t.done).length,0);
  return <div style={{background:`linear-gradient(135deg,${CDK},#1A1A1F)`,borderRadius:16,padding:'20px 24px',marginBottom:22,border:`1px solid ${lvl.color}22`,display:'flex',gap:20,alignItems:'center',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
    <div className="crm-spray" style={{right:'-5%',top:'-30%',width:180,height:180,background:CY}}/>
    <div style={{fontSize:44,flexShrink:0,position:'relative',zIndex:1}}>{lvl.icon}</div>
    <div style={{flex:1,minWidth:180,position:'relative',zIndex:1}}>
      <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:4}}>
        <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:lvl.color,lineHeight:1}}>{lvl.name}</span>
        {lvl.nextName&&<span style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>→ {lvl.nextName} en {lvl.nextMin} XP</span>}
      </div>
      <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginBottom:8}}>{done}/{total} tareas completadas</div>
      <div style={{background:'rgba(255,255,255,.08)',borderRadius:100,height:6,overflow:'hidden',maxWidth:280}}>
        <div style={{width:`${lvl.pct}%`,height:'100%',background:lvl.color,borderRadius:100,transition:'width .6s'}}/>
      </div>
    </div>
    <div style={{position:'relative',zIndex:1,textAlign:'center'}}>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:44,color:CY,lineHeight:1,textShadow:`0 0 24px ${CY}66`}}>{xp}</div>
      <div style={{fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:'.1em',textTransform:'uppercase'}}>XP total</div>
    </div>
  </div>;
}

// ── Process stage/element config (mirrors WorkspaceView) ──────────────────────
const PROC_STAGES = [
  {id:'analisis',  label:'Análisis',   color:'#8B5CF6'},
  {id:'diseno',    label:'Diseño',     color:'#EC4899'},
  {id:'dev',       label:'Desarrollo', color:'#3B82F6'},
  {id:'deploy',    label:'Despliegue', color:CY},
  {id:'soporte',   label:'Soporte',    color:'#22C55E'},
];
const PROC_ELEMENTS = [
  {id:'recursos',  label:'R1 · Recursos'},
  {id:'roles',     label:'R2 · Roles'},
  {id:'reportes',  label:'R3 · Reportes'},
  {id:'rango',     label:'R4 · Rango de Tiempo'},
  {id:'relacion',  label:'R5 · Relación'},
  {id:'procesos',  label:'P1 · Procesos Principales'},
  {id:'procesos2', label:'P2 · Procesos Secundarios'},
];

// ── Task Side Panel ────────────────────────────────────────────────────────────
function TaskPanel({task,projectId,onClose,onUpdate,onDelete}){
  const [form,setForm]=useState({...task,subtasks:task.subtasks||[]});
  const [newSub,setNewSub]=useState('');
  const save=()=>{onUpdate(projectId,form);onClose();};
  const addSub=()=>{if(!newSub.trim())return;setForm(f=>({...f,subtasks:[...f.subtasks,{id:uid(),text:newSub,done:false}]}));setNewSub('');};
  const toggleSub=id=>setForm(f=>({...f,subtasks:f.subtasks.map(s=>s.id===id?{...s,done:!s.done}:s)}));
  useEffect(()=>{const fn=e=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[]);
  const prioConfig={alta:{label:'🔴 Alta',color:'#EF4444'},media:{label:'🟡 Media',color:CY},baja:{label:'🟢 Baja',color:'#22C55E'}};
  return <>
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:498}} onClick={onClose}/>
    <div className="task-panel" style={{position:'fixed',right:0,top:0,bottom:0,width:380,background:'#1A1A1F',boxShadow:'-4px 0 40px rgba(0,0,0,.4)',zIndex:499,display:'flex',flexDirection:'column',overflow:'hidden',border:'none',borderLeft:'1px solid rgba(255,255,255,.08)'}}>
      <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(255,255,255,.07)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{width:9,height:9,borderRadius:'50%',background:catColor[form.category]||'#999',display:'inline-block'}}/>
          <span style={{fontSize:11,fontWeight:700,color:catColor[form.category]||'#999',textTransform:'uppercase',letterSpacing:'.06em'}}>{form.category}</span>
        </div>
        <button onClick={onClose} style={{background:'rgba(255,255,255,.08)',border:'none',borderRadius:8,width:30,height:30,cursor:'pointer',fontSize:16,color:'#fff'}}>×</button>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'22px'}}>
        <div style={{display:'flex',gap:7,marginBottom:18,flexWrap:'wrap'}}>
          <button onClick={()=>setForm(f=>({...f,done:!f.done}))} style={{background:form.done?'rgba(34,197,94,.15)':'rgba(255,255,255,.06)',border:`2px solid ${form.done?'#22C55E':'rgba(255,255,255,.1)'}`,borderRadius:8,padding:'6px 14px',cursor:'pointer',fontSize:12,fontWeight:700,color:form.done?'#22C55E':'#9CA3AF',fontFamily:"'DM Sans',sans-serif",transition:'all .2s'}}>
            {form.done?'✅ Completada':'⬜ Pendiente'}
          </button>
          {Object.entries(prioConfig).map(([p,c])=>(
            <button key={p} onClick={()=>setForm(f=>({...f,priority:p}))} style={{background:form.priority===p?c.color+'22':'rgba(255,255,255,.06)',border:`2px solid ${form.priority===p?c.color:'rgba(255,255,255,.1)'}`,borderRadius:8,padding:'6px 12px',cursor:'pointer',fontSize:11,fontWeight:700,color:form.priority===p?c.color:'#6B7280',fontFamily:"'DM Sans',sans-serif",transition:'all .15s'}}>{c.label}</button>
          ))}
        </div>
        <label style={lbl}>Tarea</label>
        <input className="crm-inp" value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))} style={{marginBottom:14,fontSize:15,fontWeight:600}}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
          <div><label style={lbl}>Categoría</label><select className="crm-inp" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{taskCats.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label style={lbl}>Fecha límite</label><input className="crm-inp" type="date" value={form.dueDate||''} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/></div>
        </div>
        <label style={lbl}>Descripción</label>
        <textarea className="crm-inp" value={form.description||''} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Detalles, contexto..." style={{marginBottom:16,minHeight:80,resize:'vertical'}}/>

        {/* ── Vincular a Process Matrix ── */}
        <div style={{background:'rgba(245,195,0,.06)',border:'1px solid rgba(245,195,0,.15)',borderRadius:10,padding:'14px 16px',marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:700,color:CY,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:10,display:'flex',alignItems:'center',gap:7}}>
            <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:14,letterSpacing:'.08em'}}>⬡ VINCULAR A PROCESS MATRIX</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom: form.processStage?10:0}}>
            <div>
              <label style={lbl}>Etapa</label>
              <select className="crm-inp" value={form.processStage||''} onChange={e=>setForm(f=>({...f,processStage:e.target.value,processElement:''}))} style={{fontSize:13}}>
                <option value="">Sin vincular</option>
                <option value="analisis">01 · Análisis</option>
                <option value="diseno">02 · Diseño</option>
                <option value="dev">03 · Desarrollo</option>
                <option value="deploy">04 · Despliegue</option>
                <option value="soporte">05 · Soporte</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Elemento R / P</label>
              <select className="crm-inp" value={form.processElement||''} onChange={e=>setForm(f=>({...f,processElement:e.target.value}))} disabled={!form.processStage} style={{fontSize:13,opacity:form.processStage?1:.45}}>
                <option value="">Sin vincular</option>
                <option value="recursos">R1 · Recursos</option>
                <option value="roles">R2 · Roles</option>
                <option value="reportes">R3 · Reportes</option>
                <option value="rango">R4 · Rango de Tiempo</option>
                <option value="relacion">R5 · Relación</option>
                <option value="procesos">P1 · Procesos Principales</option>
                <option value="procesos2">P2 · Procesos Secundarios</option>
              </select>
            </div>
          </div>
          {form.processStage && (
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'rgba(245,195,0,.06)',borderRadius:7,border:'1px solid rgba(245,195,0,.15)'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:CY,boxShadow:`0 0 6px ${CY}`,flexShrink:0}}/>
              <span style={{fontSize:11,color:CY,fontFamily:"'Space Grotesk',sans-serif",fontWeight:600}}>
                {({'analisis':'Análisis','diseno':'Diseño','dev':'Desarrollo','deploy':'Despliegue','soporte':'Soporte'})[form.processStage]}
                {form.processElement && ` · ${({'recursos':'R1','roles':'R2','reportes':'R3','rango':'R4','relacion':'R5','procesos':'P1','procesos2':'P2'})[form.processElement]}`}
              </span>
              <span style={{fontSize:11,color:'rgba(255,255,255,.4)',marginLeft:4}}>vinculada al Process Matrix</span>
            </div>
          )}
        </div>
        <label style={lbl}>Subtareas ({(form.subtasks||[]).filter(s=>s.done).length}/{(form.subtasks||[]).length})</label>
        <div style={{marginBottom:10,display:'flex',flexDirection:'column',gap:5}}>
          {(form.subtasks||[]).map(sub=>(
            <div key={sub.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',background:sub.done?'rgba(34,197,94,.08)':'rgba(255,255,255,.04)',borderRadius:8,border:`1px solid ${sub.done?'rgba(34,197,94,.2)':'rgba(255,255,255,.06)'}`}}>
              <input type="checkbox" checked={sub.done} onChange={()=>toggleSub(sub.id)} style={{width:15,height:15,accentColor:'#22C55E',cursor:'pointer',flexShrink:0}}/>
              <span style={{flex:1,fontSize:12,color:sub.done?'rgba(255,255,255,.4)':'rgba(255,255,255,.8)',textDecoration:sub.done?'line-through':'none'}}>{sub.text}</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          <input className="crm-inp" value={newSub} onChange={e=>setNewSub(e.target.value)} placeholder="Nueva subtarea..." style={{flex:1}} onKeyDown={e=>e.key==='Enter'&&addSub()}/>
          <button onClick={addSub} className="crm-btn-y" style={{padding:'10px 14px',fontSize:14}}>+ Add</button>
        </div>
      </div>
      <div style={{padding:'14px 22px',borderTop:'1px solid rgba(255,255,255,.07)',display:'flex',gap:10,flexShrink:0}}>
        <button onClick={()=>{onDelete(projectId,task.id);onClose();}} className="crm-btn-danger" style={{padding:'10px 14px',fontSize:12}}>Eliminar</button>
        <button onClick={save} className="crm-btn-y" style={{flex:1,padding:'11px',fontSize:16}}>GUARDAR</button>
      </div>
    </div>
  </>;
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function DashboardTab({leads,clients,projects}){
  const active=leads.filter(l=>!['cerrado','perdido'].includes(l.stage));
  const won=leads.filter(l=>l.stage==='cerrado');
  const budget=projects.reduce((s,p)=>s+p.budget,0);
  const xp=getXP(projects),lvl=getLevel(xp);
  const kpis=[
    {label:'Leads activos',val:active.length,icon:'🎯',color:'#3B82F6',sub:`${won.length} ganados`},
    {label:'Clientes',val:clients.length,icon:'🤝',color:'#22C55E',sub:'En cartera'},
    {label:'Proyectos activos',val:projects.filter(p=>p.status!=='completado').length,icon:'🚀',color:CY,sub:`${projects.filter(p=>p.status==='completado').length} completados`},
    {label:'En cartera',val:fmt(budget),icon:'💰',color:'#8B5CF6',sub:'Presupuesto total'},
  ];
  return <div>
    <div style={{marginBottom:24}}>
      <div className="crm-tag" style={{color:CY,fontSize:13,opacity:.6}}>panel de control</div>
      <h2 className="crm-bb" style={{fontSize:34,color:'#fff',lineHeight:.95}}>DASHBOARD</h2>
    </div>
    {/* Level mini bar */}
    <div style={{background:`linear-gradient(90deg,${CDK},#1A1A1F)`,borderRadius:12,padding:'14px 20px',marginBottom:18,display:'flex',alignItems:'center',gap:14,border:`1px solid ${lvl.color}22`}}>
      <span style={{fontSize:28}}>{lvl.icon}</span>
      <div style={{flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span className="crm-bb" style={{fontSize:18,color:lvl.color}}>{lvl.name}</span>
          <span style={{fontSize:11,color:'rgba(255,255,255,.3)'}}>{xp} XP</span>
        </div>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:100,height:4,marginTop:4,overflow:'hidden',maxWidth:180}}>
          <div style={{width:`${lvl.pct}%`,height:'100%',background:lvl.color,borderRadius:100}}/>
        </div>
      </div>
      <div className="crm-bb" style={{fontSize:32,color:CY}}>{xp}<span style={{fontSize:12,color:'rgba(255,255,255,.3)'}}> XP</span></div>
    </div>
    <div className="crm-grid-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:22}}>
      {kpis.map(k=><div key={k.label} className="crm-card" style={{borderTop:`3px solid ${k.color}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.4)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:8}}>{k.label}</div>
            <div className="crm-bb" style={{fontSize:34,color:'#fff',lineHeight:1}}>{k.val}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginTop:4}}>{k.sub}</div>
          </div>
          <div style={{fontSize:24}}>{k.icon}</div>
        </div>
      </div>)}
    </div>
    <div className="crm-grid-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
      <div className="crm-card">
        <div className="crm-bb" style={{fontSize:17,color:'#fff',marginBottom:14,letterSpacing:'.04em'}}>ÚLTIMOS LEADS</div>
        {leads.slice(0,5).map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
          <div><div style={{fontWeight:700,fontSize:13,color:'#fff'}}>{l.name}</div><div style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>{l.company}</div></div>
          <div style={{display:'flex',gap:7,alignItems:'center'}}><Badge color={stageCfg[l.stage].color} small>{stageCfg[l.stage].label}</Badge><span style={{fontSize:12,fontWeight:700,color:CY}}>{fmt(l.value)}</span></div>
        </div>)}
      </div>
      <div className="crm-card">
        <div className="crm-bb" style={{fontSize:17,color:'#fff',marginBottom:14,letterSpacing:'.04em'}}>PROYECTOS ACTIVOS</div>
        {projects.filter(p=>p.status!=='completado').map(p=>{const pct=progress(p.tasks),sc=statusCfg[p.status];return <div key={p.id} style={{marginBottom:14,paddingBottom:14,borderBottom:'1px solid rgba(255,255,255,.06)'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:5,alignItems:'center'}}>
            <div><div style={{fontWeight:700,fontSize:13,color:'#fff'}}>{p.name}</div><div style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>{clients.find(c=>c.id===p.clientId)?.company}</div></div>
            <Ring pct={pct} color={sc.color} size={44}/>
          </div>
          <Badge color={sc.color} small>{sc.label}</Badge>
        </div>;})}
      </div>
    </div>
  </div>;
}

// ── Pipeline ───────────────────────────────────────────────────────────────────
function PipelineTab({leads,setLeads}){
  const [modal,setModal]=useState(false);
  const [editLead,setEditLead]=useState(null);
  const [form,setForm]=useState({name:'',company:'',email:'',phone:'',stage:'nuevo',notes:'',value:''});
  const kanbanCols=stages.slice(0,5);
  const open=(l=null)=>{setEditLead(l);setForm(l?{...l,value:String(l.value)}:{name:'',company:'',email:'',phone:'',stage:'nuevo',notes:'',value:''});setModal(true);};
  const save=()=>{const lead={...form,value:parseInt(form.value)||0,id:editLead?editLead.id:uid(),createdAt:editLead?editLead.createdAt:new Date().toISOString().slice(0,10)};setLeads(p=>editLead?p.map(l=>l.id===editLead.id?lead:l):[...p,lead]);setModal(false);setEditLead(null);};
  const move=(id,dir)=>setLeads(p=>p.map(l=>{if(l.id!==id)return l;const idx=stages.indexOf(l.stage),nxt=stages[idx+dir];return nxt?{...l,stage:nxt}:l;}));
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:22,flexWrap:'wrap',gap:12}}>
      <div><div className="crm-tag" style={{color:CY,fontSize:13,opacity:.6}}>gestión de ventas</div><h2 className="crm-bb" style={{fontSize:32,color:'#fff',lineHeight:.95}}>PIPELINE</h2></div>
      <button onClick={()=>open()} className="crm-btn-y" style={{padding:'10px 22px',fontSize:16}}>+ NUEVO LEAD</button>
    </div>
    <div className="crm-kanban" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
      {kanbanCols.map(stage=>{const cfg=stageCfg[stage],col=leads.filter(l=>l.stage===stage),total=col.reduce((s,l)=>s+l.value,0);return(
        <div key={stage} style={{background:'rgba(255,255,255,.03)',borderRadius:12,padding:10,minHeight:260,border:'1px solid rgba(255,255,255,.06)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div><div style={{fontSize:10,fontWeight:800,color:cfg.color,letterSpacing:'.08em',textTransform:'uppercase'}}>{cfg.label}</div><div style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>{fmt(total)}</div></div>
            <div style={{background:cfg.color+'22',color:cfg.color,borderRadius:100,width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800}}>{col.length}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {col.map(l=><div key={l.id} className="kan-card" onClick={()=>open(l)} style={{borderLeft:`3px solid ${cfg.color}`}}>
              <div style={{fontWeight:700,fontSize:12,color:'#fff',marginBottom:1}}>{l.name}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)',marginBottom:7}}>{l.company}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="crm-bb" style={{fontSize:14,color:cfg.color}}>{fmt(l.value)}</span>
                <div style={{display:'flex',gap:3}}>
                  <button onClick={e=>{e.stopPropagation();move(l.id,-1);}} style={{background:'rgba(255,255,255,.08)',border:'none',borderRadius:5,width:20,height:20,cursor:'pointer',fontSize:10,color:'#fff'}}>←</button>
                  <button onClick={e=>{e.stopPropagation();move(l.id,1);}} style={{background:'rgba(255,255,255,.08)',border:'none',borderRadius:5,width:20,height:20,cursor:'pointer',fontSize:10,color:'#fff'}}>→</button>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      );})}
    </div>
    {modal&&<Modal onClose={()=>{setModal(false);setEditLead(null);}} title={editLead?'Editar lead':'Nuevo lead'}>
      <div style={row2}><div><label style={lbl}>Nombre</label><input className="crm-inp" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div><div><label style={lbl}>Empresa</label><input className="crm-inp" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/></div></div>
      <div style={row2}><div><label style={lbl}>Email</label><input className="crm-inp" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div><div><label style={lbl}>Teléfono</label><input className="crm-inp" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div></div>
      <div style={row2}><div><label style={lbl}>Etapa</label><select className="crm-inp" value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))}>{stages.map(s=><option key={s} value={s}>{stageCfg[s].label}</option>)}</select></div><div><label style={lbl}>Valor ($)</label><input className="crm-inp" type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}/></div></div>
      <div style={{marginBottom:18}}><label style={lbl}>Notas</label><textarea className="crm-inp" style={{minHeight:68,resize:'vertical'}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></div>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>{editLead&&<button onClick={()=>{setLeads(p=>p.filter(l=>l.id!==editLead.id));setModal(false);setEditLead(null);}} className="crm-btn-danger" style={{padding:'10px 16px',fontSize:13}}>Eliminar</button>}<button onClick={save} className="crm-btn-y" style={{padding:'10px 22px',fontSize:15}}>GUARDAR</button></div>
    </Modal>}
  </div>;
}

// ── Clients ────────────────────────────────────────────────────────────────────
function ClientsTab({clients,setClients}){
  const [modal,setModal]=useState(false);
  const [editClient,setEditClient]=useState(null);
  const [form,setForm]=useState({name:'',company:'',email:'',phone:'',website:'',since:'',notes:''});
  const accents=['#4CAF8F',CY,'#E63232','#2563EB','#8B5CF6','#EC4899','#06B6D4'];
  const open=(c=null)=>{setEditClient(c);setForm(c?{name:c.name,company:c.company,email:c.email,phone:c.phone||'',website:c.website||'',since:c.since||'',notes:c.notes||''}:{name:'',company:'',email:'',phone:'',website:'',since:new Date().toISOString().slice(0,7),notes:''});setModal(true);};
  const save=()=>{if(!form.name.trim()||!form.company.trim()){alert('Nombre y empresa requeridos');return;}setClients(p=>editClient?p.map(c=>c.id===editClient.id?{...form,id:editClient.id}:c):[...p,{...form,id:uid()}]);setModal(false);setEditClient(null);};
  const del=id=>{if(window.confirm('¿Eliminar cliente?')){setClients(p=>p.filter(c=>c.id!==id));setModal(false);setEditClient(null);}};
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:22,flexWrap:'wrap',gap:12}}>
      <div><div className="crm-tag" style={{color:CY,fontSize:13,opacity:.6}}>cartera activa</div><h2 className="crm-bb" style={{fontSize:32,color:'#fff',lineHeight:.95}}>CLIENTES</h2></div>
      <button onClick={()=>open()} className="crm-btn-y" style={{padding:'10px 22px',fontSize:16}}>+ NUEVO CLIENTE</button>
    </div>
    {!clients.length&&<div style={{textAlign:'center',padding:'60px',color:'rgba(255,255,255,.35)'}}><div style={{fontSize:44,marginBottom:12}}>🤝</div><div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,marginBottom:8,color:'#fff'}}>Sin clientes aún</div><button onClick={()=>open()} className="crm-btn-y" style={{padding:'12px 28px',fontSize:16}}>+ AGREGAR CLIENTE</button></div>}
    <div className="crm-clients-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
      {clients.map((c,i)=>{const a=accents[i%accents.length];return <div key={c.id} className="crm-card" onClick={()=>open(c)} style={{cursor:'pointer',borderTop:`3px solid ${a}`}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:10,background:a+'22',border:`2px solid ${a}33`,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span className="crm-bb" style={{fontSize:18,color:a}}>{(c.company||'?')[0]}</span>
          </div>
          <Badge color="#22C55E" small>Activo</Badge>
        </div>
        <div className="crm-sg" style={{fontWeight:800,fontSize:15,color:'#fff',marginBottom:2}}>{c.company}</div>
        <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:10}}>{c.name}</div>
        {c.email&&<div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginBottom:4}}>✉️ {c.email}</div>}
        {c.phone&&<div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginBottom:4}}>📞 {c.phone}</div>}
        {c.website&&<div style={{fontSize:12,color:'#3B82F6'}}>🌐 {c.website}</div>}
        {c.notes&&<div style={{marginTop:10,fontSize:12,color:'rgba(255,255,255,.35)',lineHeight:1.5,padding:'8px 12px',background:'rgba(255,255,255,.04)',borderRadius:8}}>{c.notes}</div>}
      </div>;})}
    </div>
    {modal&&<Modal onClose={()=>{setModal(false);setEditClient(null);}} title={editClient?`Editar · ${editClient.company}`:'Nuevo cliente'}>
      <div style={row2}><div><label style={lbl}>Nombre *</label><input className="crm-inp" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Juan García"/></div><div><label style={lbl}>Empresa *</label><input className="crm-inp" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} placeholder="Mi Empresa S.A."/></div></div>
      <div style={row2}><div><label style={lbl}>Email</label><input className="crm-inp" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="correo@empresa.com"/></div><div><label style={lbl}>Teléfono</label><input className="crm-inp" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+502 XXXX-XXXX"/></div></div>
      <div style={row2}><div><label style={lbl}>Sitio web</label><input className="crm-inp" value={form.website} onChange={e=>setForm(f=>({...f,website:e.target.value}))} placeholder="empresa.com"/></div><div><label style={lbl}>Cliente desde</label><input className="crm-inp" type="month" value={form.since} onChange={e=>setForm(f=>({...f,since:e.target.value}))}/></div></div>
      <div style={{marginBottom:20}}><label style={lbl}>Notas</label><textarea className="crm-inp" style={{minHeight:68,resize:'vertical'}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Información relevante..."/></div>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>{editClient&&<button onClick={()=>del(editClient.id)} className="crm-btn-danger" style={{padding:'10px 16px',fontSize:13}}>Eliminar</button>}<button onClick={()=>{setModal(false);setEditClient(null);}} className="crm-btn-ghost" style={{padding:'10px 16px',fontSize:13}}>Cancelar</button><button onClick={save} className="crm-btn-y" style={{padding:'10px 24px',fontSize:15}}>GUARDAR</button></div>
    </Modal>}
  </div>;
}

// ── Projects ───────────────────────────────────────────────────────────────────
function ProjectsTab({projects,setProjects,clients}){
  const [sel,setSel]=useState(null);
  const [subTab,setSubTab]=useState('tasks'); // 'tasks' | 'process'
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({clientId:'',name:'',type:'Web App',status:'planificacion',startDate:'',endDate:'',budget:'',notes:''});
  const [newTask,setNewTask]=useState('');
  const [newCat,setNewCat]=useState('Frontend');
  const [taskPanel,setTaskPanel]=useState(null);
  const [toast,setToast]=useState(null);
  const proj=sel?projects.find(p=>p.id===sel):null;
  const client=proj?clients.find(c=>c.id===proj.clientId):null;
  const panelTask=taskPanel&&proj?proj.tasks.find(t=>t.id===taskPanel):null;
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2200);};
  const saveProject=()=>{if(!form.name.trim()){alert('Nombre requerido');return;}setProjects(p=>[...p,{...form,budget:parseInt(form.budget)||0,id:uid(),tasks:[]}]);setModal(false);};
  const toggleTask=(pid,tid)=>{const completing=!proj?.tasks.find(t=>t.id===tid)?.done;setProjects(prev=>prev.map(pr=>pr.id===pid?{...pr,tasks:pr.tasks.map(tk=>tk.id===tid?{...tk,done:!tk.done}:tk)}:pr));if(completing)showToast(`+${XP_PER} XP · Tarea completada 🔥`);};
  const addTask=()=>{if(!newTask.trim())return;setProjects(p=>p.map(pr=>pr.id===sel?{...pr,tasks:[...pr.tasks,mkTask(uid(),newTask.trim(),false,newCat)]}:pr));setNewTask('');};
  const delTask=(pid,tid)=>setProjects(p=>p.map(pr=>pr.id===pid?{...pr,tasks:pr.tasks.filter(t=>t.id!==tid)}:pr));
  const updateTask=(pid,upd)=>setProjects(p=>p.map(pr=>pr.id===pid?{...pr,tasks:pr.tasks.map(t=>t.id===upd.id?upd:t)}:pr));
  const updStatus=(pid,status)=>setProjects(p=>p.map(pr=>pr.id===pid?{...pr,status}:pr));

  if(proj){
    const pct=progress(proj.tasks),sc=statusCfg[proj.status],projXP=proj.tasks.filter(t=>t.done).length*XP_PER;
    return <div>
      {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      {panelTask&&<TaskPanel task={panelTask} projectId={proj.id} onClose={()=>setTaskPanel(null)} onUpdate={updateTask} onDelete={(pid,tid)=>{delTask(pid,tid);setTaskPanel(null);}}/>}
      <button onClick={()=>{setSel(null);setTaskPanel(null);setSubTab('tasks');}} className="crm-btn-ghost" style={{padding:'8px 18px',fontSize:13,marginBottom:18}}>← Proyectos</button>

      {/* Project header */}
      <div className="crm-card" style={{marginBottom:16,borderTop:`3px solid ${sc.color}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14,flexWrap:'wrap',gap:10}}>
          <div>
            <h2 className="crm-bb" style={{fontSize:26,color:'#fff',lineHeight:.95}}>{proj.name}</h2>
            <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginTop:4}}>{client?.company} · {proj.type}</div>
          </div>
          <select value={proj.status} onChange={e=>updStatus(proj.id,e.target.value)}
            style={{background:sc.color+'18',border:`1px solid ${sc.color}44`,borderRadius:8,padding:'7px 12px',color:sc.color,fontWeight:700,fontSize:12,cursor:'pointer',outline:'none',fontFamily:"'Space Grotesk',sans-serif"}}>
            {Object.entries(statusCfg).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
          {[['💰',fmt(proj.budget),'Presupuesto'],['📅',proj.startDate,'Inicio'],['🏁',proj.endDate,'Entrega'],['⚡',`${projXP} XP`,'Ganados']].map(([ic,v,l])=>(
            <div key={l} style={{background:'rgba(255,255,255,.05)',borderRadius:8,padding:'10px',textAlign:'center'}}>
              <div style={{fontSize:16,marginBottom:3}}>{ic}</div>
              <div className="crm-bb" style={{fontSize:14,color:'#fff',lineHeight:1}}>{v}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.35)',textTransform:'uppercase',letterSpacing:'.06em',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <ProgressBar value={pct} color={sc.color}/>
        {proj.notes&&<p style={{marginTop:12,fontSize:13,color:'rgba(255,255,255,.5)',lineHeight:1.6,padding:'10px 14px',background:'rgba(255,255,255,.04)',borderRadius:8,marginBottom:0}}>{proj.notes}</p>}
      </div>

      {/* Sub-tabs */}
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        {[['tasks','📋 Tareas'],['process','🗂️ Process Management']].map(([v,l])=>(
          <button key={v} onClick={()=>setSubTab(v)}
            style={{padding:'9px 20px',borderRadius:8,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:"'Bebas Neue',cursive",letterSpacing:'.05em',border:`2px solid ${subTab===v?CY:'rgba(255,255,255,.1)'}`,background:subTab===v?CY+'22':'rgba(255,255,255,.03)',color:subTab===v?CY:'rgba(255,255,255,.5)',transition:'all .2s'}}>
            {l}
          </button>
        ))}
      </div>

      {subTab==='process' ? (
        <div className="crm-card" style={{padding:'28px 24px'}}>
          <ProcessView project={proj}/>
        </div>
      ) : (
        <div className="crm-detail-grid" style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:16,alignItems:'start'}}>
          <div className="crm-card">
            <div className="crm-bb" style={{fontSize:19,color:'#fff',marginBottom:14,letterSpacing:'.04em'}}>CHECKLIST DE TAREAS</div>
            <div style={{display:'flex',gap:8,marginBottom:16}}>
              <input className="crm-inp" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Nueva tarea..." style={{flex:1}} onKeyDown={e=>e.key==='Enter'&&addTask()}/>
              <select className="crm-inp" value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:106}}>{taskCats.map(c=><option key={c}>{c}</option>)}</select>
              <button onClick={addTask} className="crm-btn-y" style={{padding:'10px 16px',fontSize:14,whiteSpace:'nowrap'}}>+ ADD</button>
            </div>
            {taskCats.map(cat=>{const ct=proj.tasks.filter(t=>t.category===cat);if(!ct.length)return null;const done=ct.filter(t=>t.done).length;return(
              <div key={cat} style={{marginBottom:14}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:catColor[cat],display:'inline-block'}}/>
                  <span style={{fontSize:11,fontWeight:800,color:catColor[cat],textTransform:'uppercase',letterSpacing:'.07em'}}>{cat}</span>
                  <span style={{fontSize:11,color:'rgba(255,255,255,.3)'}}>{done}/{ct.length}</span>
                  <div style={{flex:1,height:2,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}}>
                    <div style={{width:ct.length?`${done/ct.length*100}%`:'0%',height:'100%',background:catColor[cat],transition:'width .4s'}}/>
                  </div>
                </div>
                {ct.map(task=>{const od=task.dueDate&&!task.done&&new Date(task.dueDate)<new Date();return(
                  <div key={task.id} className="task-row-item" onClick={()=>setTaskPanel(task.id)}
                    style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',borderRadius:8,marginBottom:4,border:`1px solid ${task.done?'rgba(34,197,94,.15)':'rgba(255,255,255,.06)'}`,background:task.done?'rgba(34,197,94,.06)':'rgba(255,255,255,.03)',cursor:'pointer'}}>
                    <input type="checkbox" checked={task.done} onChange={e=>{e.stopPropagation();toggleTask(proj.id,task.id);}} style={{width:15,height:15,accentColor:catColor[cat],cursor:'pointer',flexShrink:0}}/>
                    <span style={{flex:1,fontSize:13,color:task.done?'rgba(255,255,255,.35)':'rgba(255,255,255,.85)',textDecoration:task.done?'line-through':'none'}}>{task.text}</span>
                    {/* Process link badge */}
                    {task.processStage && (
                      <span style={{fontSize:10,fontFamily:"'Bebas Neue',cursive",letterSpacing:'.06em',color:CY,background:'rgba(245,195,0,.1)',border:'1px solid rgba(245,195,0,.2)',borderRadius:5,padding:'2px 7px',flexShrink:0,whiteSpace:'nowrap'}}>
                        {({'analisis':'ANÁLISIS','diseno':'DISEÑO','dev':'DEV','deploy':'DEPLOY','soporte':'SOPORTE'})[task.processStage]}
                        {task.processElement && ` · ${({'recursos':'R1','roles':'R2','reportes':'R3','rango':'R4','relacion':'R5','procesos':'P1','procesos2':'P2'})[task.processElement]}`}
                      </span>
                    )}
                    {task.subtasks?.length>0&&<span style={{fontSize:10,color:'rgba(255,255,255,.35)',background:'rgba(255,255,255,.07)',borderRadius:4,padding:'2px 6px'}}>{task.subtasks.filter(s=>s.done).length}/{task.subtasks.length}</span>}
                    {task.dueDate&&<span style={{fontSize:10,color:task.dueDate&&!task.done&&new Date(task.dueDate)<new Date()?'#EF4444':'rgba(255,255,255,.3)',fontWeight:task.dueDate&&!task.done&&new Date(task.dueDate)<new Date()?700:400}}>{task.dueDate}</span>}
                    {task.priority==='alta'&&!task.done&&<span style={{width:6,height:6,borderRadius:'50%',background:'#EF4444',flexShrink:0}}/>}
                    <span style={{color:'rgba(255,255,255,.2)',fontSize:14}}>›</span>
                  </div>
                );})}
              </div>
            );})}
            {!proj.tasks.length&&<div style={{textAlign:'center',padding:'28px',color:'rgba(255,255,255,.3)',fontSize:14}}>¡Añade la primera tarea!</div>}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:`linear-gradient(135deg,${CDK},#1A1A1F)`,borderRadius:12,padding:'18px',border:`1px solid ${CY}22`,textAlign:'center'}}>
              <div className="crm-tag" style={{color:CY,fontSize:12,opacity:.6,marginBottom:4}}>XP ganados</div>
              <div className="crm-bb" style={{fontSize:42,color:CY,lineHeight:1}}>{projXP}</div>
              <div style={{marginTop:12}}><Ring pct={pct} color={sc.color} size={68}/></div>
            </div>
            <div className="crm-card">
              <div className="crm-bb" style={{fontSize:14,color:'#fff',marginBottom:12}}>PROGRESO POR ÁREA</div>
              {taskCats.map(cat=>{const ct=proj.tasks.filter(t=>t.category===cat);if(!ct.length)return null;const p2=Math.round(ct.filter(t=>t.done).length/ct.length*100);return(
                <div key={cat} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{fontSize:11,fontWeight:700,color:catColor[cat]}}>{cat}</span><span style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>{p2}%</span></div>
                  <ProgressBar value={p2} color={catColor[cat]}/>
                </div>
              );})}
            </div>
            {client&&<div className="crm-card" style={{borderTop:`3px solid ${CY}`}}>
              <div className="crm-bb" style={{fontSize:14,color:'#fff',marginBottom:10}}>CLIENTE</div>
              <div style={{fontWeight:700,fontSize:14,color:'#fff',marginBottom:3}}>{client.company}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:10}}>{client.name}</div>
              {client.email&&<div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginBottom:3}}>✉️ {client.email}</div>}
              {client.phone&&<div style={{fontSize:12,color:'rgba(255,255,255,.6)'}}>📞 {client.phone}</div>}
            </div>}
          </div>
        </div>
      )}
    </div>;
  }

  return <div>
    {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:18,flexWrap:'wrap',gap:12}}>
      <div><div className="crm-tag" style={{color:CY,fontSize:13,opacity:.6}}>seguimiento</div><h2 className="crm-bb" style={{fontSize:32,color:'#fff',lineHeight:.95}}>PROYECTOS</h2></div>
      <button onClick={()=>{setForm({clientId:clients[0]?.id||'',name:'',type:'Web App',status:'planificacion',startDate:new Date().toISOString().slice(0,10),endDate:'',budget:'',notes:''});setModal(true);}} className="crm-btn-y" style={{padding:'10px 22px',fontSize:16}}>+ NUEVO PROYECTO</button>
    </div>
    <XPBanner projects={projects}/>
    <div className="crm-proj-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
      {projects.map(p=>{const pct=progress(p.tasks),cl=clients.find(c=>c.id===p.clientId),sc=statusCfg[p.status],pXP=p.tasks.filter(t=>t.done).length*XP_PER;return(
        <div key={p.id} className="crm-card" onClick={()=>setSel(p.id)} style={{cursor:'pointer',borderTop:`3px solid ${sc.color}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div style={{flex:1,minWidth:0,paddingRight:10}}>
              <div className="crm-sg" style={{fontWeight:800,fontSize:14,color:'#fff',marginBottom:3}}>{p.name}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.4)'}}>{cl?.company||'Sin cliente'} · {p.type}</div>
            </div>
            <Ring pct={pct} color={sc.color} size={50}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <Badge color={sc.color} small>{sc.label}</Badge>
            <span style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>📅 {p.endDate||'—'}</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>{p.tasks.filter(t=>t.done).length}/{p.tasks.length} tareas</span>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span className="crm-bb" style={{fontSize:14,color:CY}}>⚡ {pXP} XP</span>
              <span className="crm-bb" style={{fontSize:16,color:sc.color}}>{fmt(p.budget)}</span>
            </div>
          </div>
        </div>
      );})}
    </div>
    {modal&&<Modal onClose={()=>setModal(false)} title="Nuevo proyecto">
      <div><label style={lbl}>Nombre del proyecto *</label><input className="crm-inp" style={{marginBottom:14}} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Ej: App de delivery..."/></div>
      <div style={row2}><div><label style={lbl}>Cliente</label><select className="crm-inp" value={form.clientId} onChange={e=>setForm(f=>({...f,clientId:e.target.value}))}><option value="">Sin asignar</option>{clients.map(c=><option key={c.id} value={c.id}>{c.company}</option>)}</select></div><div><label style={lbl}>Tipo</label><select className="crm-inp" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{['Web App','Mobile App','Landing Page','E-commerce','SaaS','API','Consultoría'].map(t=><option key={t}>{t}</option>)}</select></div></div>
      <div style={row2}><div><label style={lbl}>Inicio</label><input className="crm-inp" type="date" value={form.startDate} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))}/></div><div><label style={lbl}>Entrega</label><input className="crm-inp" type="date" value={form.endDate} onChange={e=>setForm(f=>({...f,endDate:e.target.value}))}/></div></div>
      <div style={row2}><div><label style={lbl}>Presupuesto ($)</label><input className="crm-inp" type="number" value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} placeholder="5000"/></div><div><label style={lbl}>Estado</label><select className="crm-inp" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{Object.entries(statusCfg).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></div></div>
      <div style={{marginBottom:20}}><label style={lbl}>Notas</label><textarea className="crm-inp" style={{minHeight:68,resize:'vertical'}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Descripción, alcance..."/></div>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}><button onClick={()=>setModal(false)} className="crm-btn-ghost" style={{padding:'10px 16px',fontSize:13}}>Cancelar</button><button onClick={saveProject} className="crm-btn-y" style={{padding:'10px 24px',fontSize:15}}>CREAR PROYECTO</button></div>
    </Modal>}
  </div>;
}

// ── Prices Tab ────────────────────────────────────────────────────────────────
function PricesTab(){
  const [prices,setPrices]=useState(() => { if (typeof window === 'undefined') return DEFAULT_PRICES; try { const s = localStorage.getItem('fdi_prices'); return s ? JSON.parse(s) : DEFAULT_PRICES; } catch { return DEFAULT_PRICES; } });
  const [saved,setSaved]=useState(false);
  useEffect(()=>{localStorage.setItem('fdi_prices',JSON.stringify(prices));},[prices]);
  const save=()=>{localStorage.setItem('fdi_prices',JSON.stringify(prices));setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const updateType=(id,field,val)=>setPrices(p=>({...p,types:p.types.map(t=>t.id===id?{...t,[field]:parseInt(val)||0}:t)}));
  const updateFeat=(id,val)=>setPrices(p=>({...p,features:p.features.map(f=>f.id===id?{...f,add:parseInt(val)||0}:f)}));
  const reset=()=>{if(window.confirm('¿Resetear precios a valores por defecto?')){setPrices(DEFAULT_PRICES);localStorage.setItem('fdi_prices',JSON.stringify(DEFAULT_PRICES));}};
  return <div>
    <div style={{marginBottom:24}}>
      <div className="crm-tag" style={{color:CY,fontSize:13,opacity:.6}}>página pública · calculadora</div>
      <h2 className="crm-bb" style={{fontSize:32,color:'#fff',lineHeight:.95}}>EDITOR DE PRECIOS</h2>
    </div>
    <div style={{background:'rgba(245,195,0,.06)',border:'1px solid rgba(245,195,0,.15)',borderRadius:12,padding:'14px 18px',marginBottom:22,display:'flex',gap:12,alignItems:'center'}}>
      <span style={{fontSize:20}}>⚡</span>
      <span style={{fontSize:13,color:'rgba(255,255,255,.7)'}}>Los cambios se reflejan <b style={{color:CY}}>en tiempo real</b> en la calculadora de la página pública. Guarda los cambios para que persistan.</span>
    </div>

    {/* Service types */}
    <div className="crm-card" style={{marginBottom:16}}>
      <div className="crm-bb" style={{fontSize:18,color:'#fff',marginBottom:18,letterSpacing:'.04em'}}>TIPOS DE PROYECTO</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
        {prices.types.map(t=>(
          <div key={t.id} style={{background:'rgba(255,255,255,.04)',borderRadius:10,padding:'14px 16px',border:'1px solid rgba(255,255,255,.07)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <span style={{fontSize:22}}>{t.icon}</span>
              <span className="crm-bb" style={{fontSize:15,color:CY,letterSpacing:'.04em'}}>{t.label}</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><label style={lbl}>Precio mínimo ($)</label><input className="crm-inp" type="number" value={t.lo} onChange={e=>updateType(t.id,'lo',e.target.value)}/></div>
              <div><label style={lbl}>Precio máximo ($)</label><input className="crm-inp" type="number" value={t.hi} onChange={e=>updateType(t.id,'hi',e.target.value)}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Features */}
    <div className="crm-card" style={{marginBottom:20}}>
      <div className="crm-bb" style={{fontSize:18,color:'#fff',marginBottom:18,letterSpacing:'.04em'}}>FUNCIONALIDADES EXTRA</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
        {prices.features.map(f=>(
          <div key={f.id} style={{background:'rgba(255,255,255,.04)',borderRadius:10,padding:'12px 14px',border:'1px solid rgba(255,255,255,.07)',display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
            <span style={{fontSize:13,color:'rgba(255,255,255,.8)',flex:1}}>{f.label}</span>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:12,color:'rgba(255,255,255,.4)'}}>+$</span>
              <input className="crm-inp" type="number" value={f.add} onChange={e=>updateFeat(f.id,e.target.value)} style={{width:80,textAlign:'center'}}/>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
      <button onClick={reset} className="crm-btn-ghost" style={{padding:'12px 20px',fontSize:14}}>Resetear valores</button>
      <button onClick={save} className="crm-btn-y" style={{padding:'12px 28px',fontSize:17,minWidth:160}}>
        {saved?'✓ GUARDADO':'GUARDAR PRECIOS'}
      </button>
    </div>
  </div>;
}

// ── Login ──────────────────────────────────────────────────────────────────────
function LoginScreen({onLogin}){
  const [pwd,setPwd]=useState('');
  const [err,setErr]=useState(false);
  const attempt=()=>{if(pwd==='fdi2026'){onLogin();}else{setErr(true);setTimeout(()=>setErr(false),1500);}};
  return <div style={{minHeight:'100vh',background:CDK,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
    <div className="crm-spray" style={{left:'8%',top:'15%',width:400,height:400,background:CY}}/>
    <div className="crm-spray" style={{right:'8%',bottom:'15%',width:300,height:300,background:'#E63232',animationDelay:'3s'}}/>
    <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(245,195,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,195,0,.04) 1px,transparent 1px)',backgroundSize:'72px 72px'}}/>
    <div style={{background:CINK,borderRadius:20,padding:'46px 38px',maxWidth:360,width:'100%',boxShadow:'0 24px 64px rgba(0,0,0,.5)',border:'1px solid rgba(245,195,0,.1)',position:'relative',zIndex:1}}>
      <img src={LOGO} alt="FDI" style={{width:130,display:'block',margin:'0 auto 22px'}}/>
      <div className="crm-tag" style={{color:CY,fontSize:14,textAlign:'center',marginBottom:4,opacity:.7}}>acceso interno</div>
      <h2 className="crm-bb" style={{fontSize:28,color:'#fff',textAlign:'center',marginBottom:26,letterSpacing:'.06em'}}>PANEL CRM</h2>
      <input type="password" placeholder="Contraseña de acceso" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==='Enter'&&attempt()}
        style={{width:'100%',background:'rgba(255,255,255,.07)',border:`1.5px solid ${err?'#EF4444':'rgba(255,255,255,.12)'}`,borderRadius:10,padding:'13px 18px',color:'#fff',fontSize:15,outline:'none',fontFamily:"'DM Sans',sans-serif",marginBottom:err?8:14,boxSizing:'border-box',transition:'border-color .2s'}}/>
      {err&&<p style={{color:'#EF4444',fontSize:12,marginBottom:12,textAlign:'center'}}>Contraseña incorrecta.</p>}
      <button onClick={attempt} className="crm-btn-y" style={{width:'100%',padding:'14px',fontSize:18}}>ENTRAR →</button>
      <p style={{color:'#2A2A35',fontSize:11,textAlign:'center',marginTop:14}}>Clave: fdi2026</p>
    </div>
  </div>;
}

// ── Main CRM ───────────────────────────────────────────────────────────────────
const CRMApp=({onBack})=>{
  const [authed,setAuthed]=useState(false);
  const [tab,setTab]=useState('dashboard');
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [isMobile,setIsMobile]=useState(false);
  const [leads,setLeads]=useState(() => { if (typeof window === 'undefined') return seedLeads; try { const s = localStorage.getItem('fdi_leads'); return s ? JSON.parse(s) : seedLeads; } catch { return seedLeads; } });
  const [clients,setClients]=useState(() => { if (typeof window === 'undefined') return seedClients; try { const s = localStorage.getItem('fdi_clients'); return s ? JSON.parse(s) : seedClients; } catch { return seedClients; } });
  const [projects,setProjects]=useState(() => { if (typeof window === 'undefined') return seedProjects; try { const s = localStorage.getItem('fdi_projects'); return s ? JSON.parse(s) : seedProjects; } catch { return seedProjects; } });
  useEffect(()=>{injectCRMCss();},[]);
  useEffect(()=>{localStorage.setItem('fdi_leads',JSON.stringify(leads));},[leads]);
  useEffect(()=>{localStorage.setItem('fdi_clients',JSON.stringify(clients));},[clients]);
  useEffect(()=>{localStorage.setItem('fdi_projects',JSON.stringify(projects));},[projects]);
  useEffect(()=>{setIsMobile(window.innerWidth<768);const fn=()=>setIsMobile(window.innerWidth<768);window.addEventListener('resize',fn);return()=>window.removeEventListener('resize',fn);},[]);
  if(!authed)return <LoginScreen onLogin={()=>setAuthed(true)}/>;

  const navItems=[
    {id:'dashboard',  icon:'📊',label:'DASHBOARD'},
    {id:'pipeline',   icon:'🎯',label:'PIPELINE'},
    {id:'clients',    icon:'🤝',label:'CLIENTES'},
    {id:'projects',   icon:'🚀',label:'PROYECTOS'},
    {id:'workspace',  icon:'⬡',label:'WORKSPACE'},
    {id:'gantt',      icon:'📅',label:'GANTT'},
    {id:'cotizacion', icon:'📄',label:'COTIZACIÓN'},
    {id:'prices',     icon:'💲',label:'PRECIOS'},
  ];
  const goTab=id=>{setTab(id);setSidebarOpen(false);};

  const Sidebar=()=>(
    <div className={`crm-sidebar${sidebarOpen?' open':''}`} style={{width:216,background:CDK,display:'flex',flexDirection:'column',flexShrink:0,position:isMobile?'fixed':'relative',height:'100vh',top:0,left:0,zIndex:300,borderRight:'1px solid rgba(255,255,255,.05)'}}>
      <div style={{padding:'18px 14px 14px',borderBottom:'1px solid rgba(245,195,0,.08)'}}>
        <div style={{background:CY,borderRadius:4,padding:'2px 6px 4px',display:'inline-block',transform:'rotate(-1.5deg)',boxShadow:'2px 2px 0 rgba(0,0,0,.6)'}}>
          <img src={LOGO} alt="FDI" style={{width:110,display:'block'}}/>
        </div>
        <div className="crm-tag" style={{color:CY,fontSize:12,marginTop:10,opacity:.5}}>panel interno</div>
      </div>
      <div className="crm-spray" style={{left:'50%',top:'45%',width:160,height:160,background:CY,zIndex:0}}/>
      <nav style={{flex:1,padding:'10px 8px',display:'flex',flexDirection:'column',gap:2,position:'relative',zIndex:1}}>
        {navItems.map(item=>(
          <button key={item.id} onClick={()=>goTab(item.id)} className={`crm-nav-item crm-bb${tab===item.id?' active':''}`}
            style={{background:tab===item.id?CY:'transparent',color:tab===item.id?CDK:'#4A4A58'}}>
            <span style={{fontSize:16}}>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div style={{padding:'10px 8px',borderTop:'1px solid rgba(255,255,255,.04)',position:'relative',zIndex:1}}>
        <button onClick={onBack} className="crm-nav-item" style={{background:'transparent',color:'#2A2A35',fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:12}}>
          <span style={{fontSize:14}}>←</span> Volver al sitio
        </button>
      </div>
    </div>
  );

  return <div style={{display:'flex',height:'100vh',fontFamily:"'DM Sans',sans-serif",background:CBG,overflow:'hidden'}}>
    {isMobile&&sidebarOpen&&<div className="crm-sidebar-overlay open" onClick={()=>setSidebarOpen(false)}/>}
    <Sidebar/>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
      {/* Topbar */}
      <div style={{background:'#13131A',padding:'0 20px',height:54,display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,.06)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.07)',borderRadius:7,width:32,height:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,padding:8,cursor:'pointer'}}>
            {[0,1,2].map(i=><div key={i} style={{width:14,height:2,background:'#6B7280',borderRadius:2}}/>)}
          </button>
          <span className="crm-bb" style={{fontSize:16,color:'#fff',letterSpacing:'.06em'}}>{navItems.find(n=>n.id===tab)?.icon} {navItems.find(n=>n.id===tab)?.label}</span>
        </div>
        <span style={{fontSize:11,color:'rgba(255,255,255,.25)',fontFamily:"'Space Grotesk',sans-serif"}}>{new Date().toLocaleDateString('es-ES',{day:'2-digit',month:'long',year:'numeric'})}</span>
      </div>
      {/* Content */}
      <div className="crm-content" style={{flex:1,overflowY:'auto',padding:'24px'}}>
        {tab==='dashboard'&&<DashboardTab leads={leads} clients={clients} projects={projects}/>}
        {tab==='pipeline'&&<PipelineTab leads={leads} setLeads={setLeads}/>}
        {tab==='clients'&&<ClientsTab clients={clients} setClients={setClients}/>}
        {tab==='projects'&&<ProjectsTab projects={projects} setProjects={setProjects} clients={clients}/>}
        {tab==='workspace'&&<WorkspaceView projects={projects} clients={clients}/>}
        {tab==='gantt'&&<GanttView projects={projects} clients={clients}/>}
        {tab==='cotizacion'&&<QuoteView clients={clients}/>}
        {tab==='prices'&&<PricesTab/>}
      </div>
    </div>
  </div>;
};

export default CRMApp;
