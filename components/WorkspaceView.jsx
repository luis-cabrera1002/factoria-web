'use client';
// ═══ WorkspaceView — Unified Project Management Hub ═══════════════════════
// General overview + per-project Process Matrix + Gantt + all R's & P's
// ═════════════════════════════════════════════════════════════════════════════
import React from 'react';
import { useState, useEffect, useMemo } from 'react';

const WY = '#F5C300', WDK = '#0C0C0E', WINK = '#1A1A1F';

// ── Config ────────────────────────────────────────────────────────────────────
const W_STAGES = [
  { id:'analisis',  label:'Análisis',   color:'#8B5CF6', num:'01', sub:'Entender el problema'  },
  { id:'diseno',    label:'Diseño',     color:'#EC4899', num:'02', sub:'Definir la solución'   },
  { id:'dev',       label:'Desarrollo', color:'#3B82F6', num:'03', sub:'Construir el producto' },
  { id:'deploy',    label:'Despliegue', color:WY,        num:'04', sub:'Lanzar al mundo'        },
  { id:'soporte',   label:'Soporte',    color:'#22C55E', num:'05', sub:'Mantener y crecer'     },
];

const W_ELEMENTS = [
  { id:'recursos',   label:'Recursos',             icon:'R1', color:'#F59E0B' },
  { id:'roles',      label:'Roles',                icon:'R2', color:'#8B5CF6' },
  { id:'reportes',   label:'Reportes',             icon:'R3', color:'#3B82F6' },
  { id:'rango',      label:'Rango de Tiempo',      icon:'R4', color:'#EC4899' },
  { id:'relacion',   label:'Relación',             icon:'R5', color:'#06B6D4' },
  { id:'procesos',   label:'Procesos Principales', icon:'P1', color:'#22C55E' },
  { id:'procesos2',  label:'Procesos Secundarios', icon:'P2', color:'#EF4444' },
];

const W_STATUS = {
  done:    { label:'Completado',  color:'#22C55E' },
  active:  { label:'En progreso', color:WY },
  pending: { label:'Pendiente',   color:'#6B7280' },
  blocked: { label:'Bloqueado',   color:'#EF4444' },
};

const W_MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const uid = () => Math.random().toString(36).slice(2, 9);

// ── Helpers ───────────────────────────────────────────────────────────────────
const getProcessData = (projectId) => {
  try {
    const s = localStorage.getItem(`fdi_proc_v4_${projectId}`);
    return s ? JSON.parse(s) : {};
  } catch { return {}; }
};

const saveProcessData = (projectId, data) => {
  try { localStorage.setItem(`fdi_proc_v4_${projectId}`, JSON.stringify(data)); } catch {}
};

const stageProgress = (stageDat) => {
  const tasks = W_ELEMENTS.flatMap(el => stageDat?.[el.id]?.tasks || []);
  if (!tasks.length) return 0;
  return Math.round(tasks.filter(t => t.done).length / tasks.length * 100);
};

const totalProjectProgress = (procData) => {
  const all = W_STAGES.flatMap(st =>
    W_ELEMENTS.flatMap(el => procData[st.id]?.[el.id]?.tasks || [])
  );
  if (!all.length) return 0;
  return Math.round(all.filter(t => t.done).length / all.length * 100);
};

const fmtBudget = v => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : `$${v}`;

// ── SVG Ring ──────────────────────────────────────────────────────────────────
const WRing = ({ pct, color, size=44, sw=3.5 }) => {
  const r = (size-sw*2)/2, c = 2*Math.PI*r, off = c*(1-Math.max(0,Math.min(100,pct))/100);
  return (
    <svg width={size} height={size} style={{display:'block',flexShrink:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{transition:'stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)'}}/>
      <text x={size/2} y={size/2+4} textAnchor="middle"
        style={{fontSize:10,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fill:color}}>
        {pct}%
      </text>
    </svg>
  );
};

// ── Mini progress bar ─────────────────────────────────────────────────────────
const WBar = ({ pct, color=WY, height=4 }) => (
  <div style={{background:'rgba(255,255,255,.07)',borderRadius:100,height,overflow:'hidden'}}>
    <div style={{height:'100%',width:`${pct}%`,background:color,borderRadius:100,transition:'width .5s ease',boxShadow:pct>0?`0 0 6px ${color}55`:''}}/>
  </div>
);

// ── CSS inject ────────────────────────────────────────────────────────────────
const injectWorkspaceCSS = () => {
  if (document.getElementById('ws-css')) return;
  const s = document.createElement('style'); s.id = 'ws-css';
  s.textContent = `
    @keyframes wsIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes wsSlide{from{transform:translateX(100%)}to{transform:translateX(0)}}
    @keyframes wsPulse{0%,100%{opacity:.2}50%{opacity:.45}}
    .ws-card{transition:all .2s;cursor:pointer}
    .ws-card:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(0,0,0,.4)!important;border-color:rgba(245,195,0,.15)!important}
    .ws-el-card{transition:all .2s;cursor:pointer}
    .ws-el-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.35)!important}
    .ws-task-row{transition:background .15s;border-radius:7px;cursor:pointer}
    .ws-task-row:hover{background:rgba(255,255,255,.05)!important}
    .ws-panel{animation:wsSlide .25s ease}
    textarea.ws-ta{width:100%;background:transparent;border:none;outline:none;color:rgba(255,255,255,.8);font-size:13px;line-height:1.65;resize:vertical;font-family:'DM Sans',sans-serif;min-height:60px;box-sizing:border-box;caret-color:#F5C300}
    textarea.ws-ta::placeholder{color:rgba(255,255,255,.2)}
  `;
  document.head.appendChild(s);
};

// ── Task Panel (Asana-style side panel) ───────────────────────────────────────
const WTaskPanel = ({ task, stageId, elId, projectId, stageColor, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState({ ...task, subtasks: task.subtasks || [] });
  const [newSub, setNewSub] = useState('');

  useEffect(() => { onSave(stageId, elId, form); }, [form]);
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const addSub = () => {
    if (!newSub.trim()) return;
    setForm(f => ({ ...f, subtasks: [...f.subtasks, { id: uid(), text: newSub.trim(), done: false }] }));
    setNewSub('');
  };
  const toggleSub = sid => setForm(f => ({ ...f, subtasks: f.subtasks.map(s => s.id === sid ? { ...s, done: !s.done } : s) }));

  const prioConfig = { alta: { label:'Alta', color:'#EF4444' }, media: { label:'Media', color:WY }, baja: { label:'Baja', color:'#22C55E' } };

  return (
    <>
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', zIndex:600 }} onClick={onClose}/>
      <div className="ws-panel" style={{ position:'fixed', right:0, top:0, bottom:0, width:400, background:'#13131A', zIndex:601, display:'flex', flexDirection:'column', borderLeft:'1px solid rgba(255,255,255,.08)', boxShadow:'-8px 0 40px rgba(0,0,0,.5)', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,.07)', flexShrink:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:stageColor, boxShadow:`0 0 6px ${stageColor}` }}/>
              <span style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:stageColor, textTransform:'uppercase', letterSpacing:'.1em' }}>Tarea · {W_ELEMENTS.find(e=>e.id===elId)?.label}</span>
            </div>
            <button onClick={onClose} style={{ background:'rgba(255,255,255,.07)', border:'none', borderRadius:7, width:28, height:28, cursor:'pointer', color:'rgba(255,255,255,.6)', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 22px' }}>
          {/* Status + Priority */}
          <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap' }}>
            <button onClick={() => setForm(f => ({ ...f, done: !f.done }))}
              style={{ padding:'5px 14px', borderRadius:100, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", border:`2px solid ${form.done?'#22C55E':'rgba(255,255,255,.1)'}`, background:form.done?'rgba(34,197,94,.12)':'transparent', color:form.done?'#22C55E':'rgba(255,255,255,.4)', transition:'all .15s' }}>
              {form.done ? '✓ Completada' : '○ Pendiente'}
            </button>
            {Object.entries(prioConfig).map(([k,v]) => (
              <button key={k} onClick={() => setForm(f => ({ ...f, priority: k }))}
                style={{ padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", border:`2px solid ${form.priority===k?v.color:'rgba(255,255,255,.1)'}`, background:form.priority===k?v.color+'18':'transparent', color:form.priority===k?v.color:'rgba(255,255,255,.3)', transition:'all .15s' }}>
                {v.label}
              </button>
            ))}
          </div>
          {/* Title */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.1em', textTransform:'uppercase', display:'block', marginBottom:5 }}>Tarea</label>
            <input className="crm-inp" value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} style={{ fontSize:14, fontWeight:600 }}/>
          </div>
          {/* Due date */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.1em', textTransform:'uppercase', display:'block', marginBottom:5 }}>Fecha límite</label>
            <input type="date" className="crm-inp" value={form.dueDate||''} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}/>
          </div>
          {/* Description */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.1em', textTransform:'uppercase', display:'block', marginBottom:5 }}>Descripción</label>
            <textarea className="ws-ta crm-inp" value={form.description||''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Detalles, contexto, dependencias..."/>
          </div>
          {/* Subtasks */}
          <div>
            <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.35)', letterSpacing:'.1em', textTransform:'uppercase', display:'block', marginBottom:8 }}>
              Subtareas ({(form.subtasks||[]).filter(s=>s.done).length}/{(form.subtasks||[]).length})
            </label>
            <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:8 }}>
              {(form.subtasks||[]).map(sub => (
                <div key={sub.id} onClick={() => toggleSub(sub.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 10px', background:sub.done?'rgba(34,197,94,.06)':'rgba(255,255,255,.03)', borderRadius:7, border:`1px solid ${sub.done?'rgba(34,197,94,.15)':'rgba(255,255,255,.05)'}`, cursor:'pointer' }}>
                  <div style={{ width:15, height:15, borderRadius:3, border:`1.5px solid ${sub.done?'#22C55E':'rgba(255,255,255,.3)'}`, background:sub.done?'#22C55E':'transparent', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s' }}>
                    {sub.done && <span style={{ fontSize:9, color:'#fff', fontWeight:700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize:12, color:sub.done?'rgba(255,255,255,.35)':'rgba(255,255,255,.75)', textDecoration:sub.done?'line-through':'none' }}>{sub.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <input className="crm-inp" value={newSub} onChange={e => setNewSub(e.target.value)} placeholder="Nueva subtarea — Enter" style={{ flex:1, fontSize:13 }} onKeyDown={e => e.key==='Enter' && addSub()}/>
              <button onClick={addSub} className="crm-btn-y" style={{ padding:'10px 14px', fontSize:14 }}>+</button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding:'14px 22px', borderTop:'1px solid rgba(255,255,255,.07)', display:'flex', gap:10, flexShrink:0 }}>
          <button onClick={() => { onDelete(stageId, elId, task.id); onClose(); }} className="crm-btn-danger" style={{ padding:'10px 14px', fontSize:12 }}>Eliminar</button>
          <button onClick={onClose} className="crm-btn-y" style={{ flex:1, padding:'11px', fontSize:15 }}>LISTO</button>
        </div>
      </div>
    </>
  );
};

// ── Element Detail (R's and P's) — fully controlled, no local state ────────────
const ElementDetail = ({ el, stageId, stageColor, procData, onUpdate }) => {
  const elData = procData[stageId]?.[el.id] || { notes:'', tasks:[] };
  const tasks = elData.tasks || [];
  const notes = elData.notes || '';
  const [newTask, setNewTask] = React.useState('');
  const [newPrio, setNewPrio] = React.useState('media');
  const [taskPanel, setTaskPanel] = React.useState(null);

  // All mutations go straight to procData via onUpdate
  const setNotes = (val) => onUpdate(stageId, el.id, { notes: val, tasks });
  const setTasks = (updater) => {
    const next = typeof updater === 'function' ? updater(tasks) : updater;
    onUpdate(stageId, el.id, { notes, tasks: next });
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const t = { id: Math.random().toString(36).slice(2,9), text: newTask.trim(), done: false, priority: newPrio, subtasks: [], description: '', dueDate: '' };
    setTasks(prev => [...prev, t]);
    setNewTask('');
  };

  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id===id ? {...t, done:!t.done} : t));
  const delTask = (id) => setTasks(prev => prev.filter(t => t.id!==id));
  const updateTask = (upd) => setTasks(prev => prev.map(t => t.id===upd.id ? upd : t));

  const panelTask = taskPanel ? tasks.find(t => t.id===taskPanel) : null;
  const done = tasks.filter(t=>t.done).length;
  const pct = tasks.length ? Math.round(done/tasks.length*100) : 0;
  const hasContent = notes.trim() || tasks.length > 0;

  return (
    <div style={{ background: hasContent ? el.color+'08' : 'rgba(255,255,255,.025)', border:`1px solid ${hasContent ? el.color+'25' : 'rgba(255,255,255,.07)'}`, borderRadius:12, padding:'16px 18px', marginBottom:10, transition:'all .2s' }}>
      {/* Top accent line */}
      <div style={{ height:2, background:`linear-gradient(90deg,${el.color},transparent)`, opacity: hasContent?.65:.15, borderRadius:1, marginBottom:12 }}/>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <div style={{ width:30, height:30, borderRadius:8, background:el.color+'18', border:`1px solid ${el.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:12, color:el.color, letterSpacing:'.06em' }}>{el.icon}</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12, color:'rgba(255,255,255,.85)' }}>{el.label}</div>
        </div>
        {tasks.length > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <WBar pct={pct} color={el.color} height={3}/>
            <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:15, color:el.color, minWidth:34, textAlign:'right' }}>{pct}%</span>
          </div>
        )}
        {hasContent && pct===100 && <div style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E', flexShrink:0 }}/>}
      </div>

      {/* Notes textarea */}
      <textarea className="ws-ta" value={notes} onChange={e => setNotes(e.target.value)}
        placeholder={`Describe los ${el.label.toLowerCase()} de esta etapa...`}
        style={{ minHeight:52, marginBottom:10 }}/>

      {/* Task list */}
      {tasks.length > 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:3, marginBottom:10 }}>
          {tasks.map(task => {
            const pc = { alta:'#EF4444', media:WY, baja:'#22C55E' }[task.priority||'media'];
            const overdue = task.dueDate && !task.done && new Date(task.dueDate) < new Date();
            return (
              <div key={task.id} className="ws-task-row"
                style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 11px', background:task.done?'rgba(34,197,94,.06)':'rgba(255,255,255,.03)', border:`1px solid ${task.done?'rgba(34,197,94,.15)':'rgba(255,255,255,.05)'}`, borderRadius:8 }}
                onClick={() => setTaskPanel(task.id)}>
                {/* Checkbox */}
                <div onClick={e => { e.stopPropagation(); toggleTask(task.id); }}
                  style={{ width:17, height:17, borderRadius:4, border:`2px solid ${task.done?'#22C55E':pc+'77'}`, background:task.done?'#22C55E':'transparent', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all .2s' }}>
                  {task.done && <span style={{ fontSize:10, color:'#fff', fontWeight:800, lineHeight:1 }}>✓</span>}
                </div>
                <span style={{ flex:1, fontSize:12, color:task.done?'rgba(255,255,255,.3)':'rgba(255,255,255,.82)', textDecoration:task.done?'line-through':'none', lineHeight:1.4 }}>{task.text}</span>
                {task.subtasks?.length > 0 && (
                  <span style={{ fontSize:10, color:'rgba(255,255,255,.3)', background:'rgba(255,255,255,.06)', padding:'1px 7px', borderRadius:4 }}>
                    {task.subtasks.filter(s=>s.done).length}/{task.subtasks.length}
                  </span>
                )}
                {task.dueDate && <span style={{ fontSize:10, color:overdue?'#EF4444':'rgba(255,255,255,.22)', fontWeight:overdue?700:400, flexShrink:0 }}>{task.dueDate}</span>}
                <div style={{ width:5, height:5, borderRadius:'50%', background:pc, flexShrink:0, opacity:task.done?.3:1 }}/>
                <button onClick={e => { e.stopPropagation(); delTask(task.id); }}
                  style={{ background:'none', border:'none', color:'rgba(255,255,255,.15)', cursor:'pointer', fontSize:15, padding:'0 2px', lineHeight:1, transition:'color .15s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#EF4444'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.15)'}>×</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add task row */}
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <input value={newTask} onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key==='Enter' && addTask()}
          placeholder="+ Nueva tarea — Enter para agregar"
          style={{ flex:1, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:7, padding:'7px 11px', color:'#fff', fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:'none', caretColor:WY }}/>
        {/* Priority dots */}
        <div style={{ display:'flex', gap:3 }}>
          {[['alta','#EF4444'],['media',WY],['baja','#22C55E']].map(([k,c]) => (
            <button key={k} onClick={() => setNewPrio(k)}
              title={k}
              style={{ width:22, height:22, borderRadius:5, border:`1.5px solid ${newPrio===k?c:'rgba(255,255,255,.1)'}`, background:newPrio===k?c+'22':'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s' }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:newPrio===k?c:'rgba(255,255,255,.2)' }}/>
            </button>
          ))}
        </div>
        <button onClick={addTask}
          style={{ background:el.color, border:'none', borderRadius:7, width:30, height:30, cursor:'pointer', color:'#000', fontWeight:900, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>+</button>
      </div>

      {/* Task side panel */}
      {panelTask && (
        <WTaskPanel
          task={panelTask}
          stageId={stageId}
          elId={el.id}
          projectId={null}
          stageColor={stageColor}
          onClose={() => setTaskPanel(null)}
          onSave={(sid, eid, upd) => { updateTask(upd); }}
          onDelete={(sid, eid, tid) => { delTask(tid); setTaskPanel(null); }}
        />
      )}
    </div>
  );
};

// ── Helper for project status colors ─────────────────────────────────────────
const statusColors = (s) => {
  const _m = { planificacion:{color:'#6B7280'}, desarrollo:{color:'#3B82F6'}, revision:{color:'#F59E0B'}, completado:{color:'#22C55E'}, pausado:{color:'#EF4444'} };
  return _m[s] || {color:'#6B7280'};
};

// ── Stage Panel ───────────────────────────────────────────────────────────────
const StagePanel = ({ stage, procData, onUpdate }) => {
  const sd = procData[stage.id] || {};
  const pct = stageProgress(sd);
  return (
    <div style={{ animation:'wsIn .2s ease' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <WRing pct={pct} color={stage.color} size={60} sw={4}/>
          <div>
            <div style={{ fontFamily:"'Permanent Marker',cursive", fontSize:11, color:stage.color, opacity:.7, marginBottom:2 }}>{stage.sub}</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:'#fff', letterSpacing:'.05em', lineHeight:.95 }}>{stage.label}</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,.3)', fontFamily:"'Space Grotesk',sans-serif", marginTop:2 }}>ETAPA {stage.num} · 5R + 2P</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {Object.entries(W_STATUS).map(([k,v]) => (
            <button key={k} onClick={() => onUpdate(stage.id, '_status', k)}
              style={{ padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif", border:`1.5px solid ${sd._status===k?v.color:'rgba(255,255,255,.1)'}`, background:sd._status===k?v.color+'1A':'transparent', color:sd._status===k?v.color:'rgba(255,255,255,.3)', transition:'all .15s' }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:10 }}>
        {W_ELEMENTS.map(el => (
          <ElementDetail key={el.id} el={el} stageId={stage.id} stageColor={stage.color} procData={procData} onUpdate={onUpdate}/>
        ))}
      </div>
    </div>
  );
};

// ── Project Process View ──────────────────────────────────────────────────────
const ProjectProcess = ({ project, clients }) => {
  const client = clients.find(c => c.id === project.clientId);
  const SK = `fdi_proc_v4_${project.id}`;

  // Central state — all element changes flow through here
  const [procData, setProcData] = useState(() => {
    try { const s = localStorage.getItem(SK); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [activeStage, setActiveStage] = useState('analisis');
  const [view, setView] = useState('detail');

  // Persist every change immediately
  useEffect(() => {
    try { localStorage.setItem(SK, JSON.stringify(procData)); } catch {}
  }, [procData]);

  // Central update — called by ElementDetail on every keystroke / task toggle
  const onUpdate = (stageId, field, value) => {
    setProcData(prev => {
      if (field === '_status') {
        return { ...prev, [stageId]: { ...prev[stageId], _status: value } };
      }
      // value is { notes, tasks } from ElementDetail
      return {
        ...prev,
        [stageId]: { ...prev[stageId], [field]: value },
      };
    });
  };

  const totalPct = totalProjectProgress(procData);
  const taskStats = useMemo(() => {
    const all = W_STAGES.flatMap(st => W_ELEMENTS.flatMap(el => procData[st.id]?.[el.id]?.tasks || []));
    return { total: all.length, done: all.filter(t=>t.done).length };
  }, [procData]);
  const projPct = project.tasks?.length ? Math.round(project.tasks.filter(t=>t.done).length/project.tasks.length*100) : 0;
  const sc = statusColors(project.status);

  return (
    <div style={{ color:'#fff', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Project header */}
      <div style={{ background:'rgba(255,255,255,.03)', border:`1px solid ${sc.color}22`, borderRadius:14, padding:'18px 20px', marginBottom:18 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:12, alignItems:'start', marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:22, color:'#fff', letterSpacing:'.04em', lineHeight:.95, marginBottom:3 }}>{project.name}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.4)' }}>{client?.company} · {project.type}{project.startDate?` · ${project.startDate} → ${project.endDate}`:''}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:WY, lineHeight:1 }}>{fmtBudget(project.budget)}</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {[
            ['Tareas del proceso', `${taskStats.done}/${taskStats.total}`, taskStats.total?Math.round(taskStats.done/taskStats.total*100):0, WY],
            ['Tareas del proyecto', `${project.tasks?.filter(t=>t.done).length||0}/${project.tasks?.length||0}`, projPct, '#3B82F6'],
            ['Etapas completas', `${W_STAGES.filter(s=>procData[s.id]?._status==='done').length}/5`, W_STAGES.filter(s=>procData[s.id]?._status==='done').length/5*100, '#22C55E'],
          ].map(([l,v,p,c]) => (
            <div key={l} style={{ background:'rgba(255,255,255,.04)', borderRadius:9, padding:'11px 13px' }}>
              <div style={{ fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:4 }}>{l}</div>
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:20, color:c, lineHeight:1, marginBottom:5 }}>{v}</div>
              <WBar pct={p} color={c} height={3}/>
            </div>
          ))}
        </div>
      </div>

      {/* Stage flow */}
      <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:12, padding:'16px', marginBottom:12, overflowX:'auto' }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:0, minWidth:480 }}>
          {W_STAGES.map((st, i) => {
            const pct = stageProgress(procData[st.id] || {});
            const sts = procData[st.id]?._status || 'pending';
            const sc2 = W_STATUS[sts];
            const isA = activeStage === st.id;
            return (
              <React.Fragment key={st.id}>
                <div onClick={() => { setActiveStage(st.id); setView('detail'); }}
                  style={{ flex:1, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:7, transition:'transform .2s', transform:isA?'translateY(-4px)':'none' }}>
                  <div style={{ position:'relative' }}>
                    <WRing pct={pct} color={st.color} size={52} sw={3.5}/>
                    {sts==='active'&&<div style={{ position:'absolute', inset:-3, borderRadius:'50%', border:`1.5px solid ${st.color}`, opacity:.3, animation:'wsPulse 2s ease infinite' }}/>}
                    {isA&&<div style={{ position:'absolute', bottom:-4, left:'50%', transform:'translateX(-50%)', width:5, height:5, borderRadius:'50%', background:st.color, boxShadow:`0 0 8px ${st.color}` }}/>}
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:11, color:isA?st.color:'rgba(255,255,255,.55)', marginBottom:2 }}>{st.label}</div>
                    <div style={{ fontSize:9, color:sc2.color, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em' }}>{sc2.label}</div>
                  </div>
                </div>
                {i < W_STAGES.length-1 && (
                  <div style={{ flex:0, width:18, marginTop:23, flexShrink:0 }}>
                    <div style={{ height:2, background:pct===100?`linear-gradient(90deg,${st.color},${W_STAGES[i+1].color})`:'rgba(255,255,255,.07)', borderRadius:1 }}/>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage tabs + view toggle */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, flexWrap:'wrap', gap:8 }}>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {W_STAGES.map(s => {
            const pct = stageProgress(procData[s.id]||{});
            const isA = activeStage===s.id;
            const sc2 = W_STATUS[procData[s.id]?._status||'pending'];
            return (
              <button key={s.id} onClick={() => setActiveStage(s.id)}
                style={{ padding:'6px 14px', borderRadius:8, cursor:'pointer', fontFamily:"'Bebas Neue',cursive", fontSize:12, letterSpacing:'.05em', border:`1.5px solid ${isA?s.color:'rgba(255,255,255,.08)'}`, background:isA?s.color+'18':'rgba(255,255,255,.02)', color:isA?s.color:'rgba(255,255,255,.4)', display:'flex', alignItems:'center', gap:6 }}>
                {s.label}
                <span style={{ fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:sc2.color, background:sc2.color+'1A', padding:'1px 6px', borderRadius:100 }}>{pct}%</span>
              </button>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {[['detail','Detalle'],['matrix','Matriz']].map(([v,l]) => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding:'6px 14px', borderRadius:7, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif", border:`1.5px solid ${view===v?WY:'rgba(255,255,255,.1)'}`, background:view===v?'rgba(245,195,0,.1)':'transparent', color:view===v?WY:'rgba(255,255,255,.4)', transition:'all .15s' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view==='matrix' ? (
        <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:12, padding:'16px', overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:'3px', minWidth:640 }}>
            <thead>
              <tr>
                <th style={{ padding:'8px 10px', textAlign:'left', fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.1em', textTransform:'uppercase', width:130 }}>ELEMENTO</th>
                {W_STAGES.map(s => (
                  <th key={s.id} style={{ padding:'8px 5px', textAlign:'center', cursor:'pointer' }} onClick={() => { setActiveStage(s.id); setView('detail'); }}>
                    <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:11, color:s.color, marginBottom:4 }}>{s.label}</div>
                    <div style={{ display:'flex', justifyContent:'center' }}><WRing pct={stageProgress(procData[s.id]||{})} color={s.color} size={28} sw={2.5}/></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {W_ELEMENTS.map(el => (
                <tr key={el.id}>
                  <td style={{ padding:'6px 10px', background:'rgba(255,255,255,.03)', borderRadius:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:11, color:el.color }}>{el.icon}</span>
                      <div style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.6)' }}>{el.label}</div>
                    </div>
                  </td>
                  {W_STAGES.map(s => {
                    const ed = procData[s.id]?.[el.id] || {};
                    const ts = ed.tasks||[];
                    const done = ts.filter(t=>t.done).length;
                    const has = (ed.notes||'').trim()||ts.length;
                    const pct = ts.length ? Math.round(done/ts.length*100) : 0;
                    return (
                      <td key={s.id} style={{ padding:'3px', verticalAlign:'top', cursor:'pointer' }}
                        onClick={() => { setActiveStage(s.id); setView('detail'); }}>
                        <div style={{ background:has?s.color+'0C':'rgba(255,255,255,.02)', border:`1px solid ${has?s.color+'22':'rgba(255,255,255,.05)'}`, borderRadius:6, padding:'7px 8px', minHeight:36, transition:'background .15s' }}
                          onMouseEnter={e=>e.currentTarget.style.background=s.color+'18'} onMouseLeave={e=>e.currentTarget.style.background=has?s.color+'0C':'rgba(255,255,255,.02)'}>
                          {has ? (<>
                            {ts.length>0&&<div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:13, color:s.color, lineHeight:1, marginBottom:3 }}>{done}/{ts.length}</div>}
                            <WBar pct={pct} color={s.color} height={3}/>
                            {ed.notes&&<div style={{ fontSize:9, color:'rgba(255,255,255,.45)', lineHeight:1.4, marginTop:3, overflow:'hidden', maxHeight:24 }}>{ed.notes.slice(0,40)}{ed.notes.length>40?'…':''}</div>}
                          </>) : (
                            <div style={{ fontSize:11, color:'rgba(255,255,255,.12)', textAlign:'center', lineHeight:'28px' }}>+</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background:'rgba(255,255,255,.025)', border:`1px solid ${W_STAGES.find(s=>s.id===activeStage)?.color||WY}1A`, borderRadius:14, padding:'20px 18px', animation:'wsIn .2s ease' }}>
          <StagePanel key={activeStage} stage={W_STAGES.find(s=>s.id===activeStage)} procData={procData} onUpdate={onUpdate}/>
        </div>
      )}
    </div>
  );
};

// ── General Overview ──────────────────────────────────────────────────────────
const GeneralOverview = ({ projects, clients }) => {
  const today = new Date();
  const [zoom, setZoom] = useState('6m');
  const zDays = { '3m':90, '6m':180, '12m':365 }[zoom];
  const rangeStart = useMemo(() => { const d=new Date(today); d.setDate(d.getDate()-Math.floor(zDays*.15)); return d; }, [zoom]);
  const rangeEnd = useMemo(() => { const d=new Date(rangeStart); d.setDate(d.getDate()+zDays); return d; }, [rangeStart, zoom]);

  const monthHeaders = useMemo(() => {
    const h=[];
    let cur=new Date(rangeStart.getFullYear(),rangeStart.getMonth(),1);
    while(cur<=rangeEnd){
      const s=Math.max(0,(cur-rangeStart)/86400000);
      const nxt=new Date(cur.getFullYear(),cur.getMonth()+1,1);
      const e=Math.min(zDays,(nxt-rangeStart)/86400000);
      h.push({ label:`${W_MONTHS[cur.getMonth()]} ${cur.getFullYear()}`, left:s/zDays*100, width:(e-s)/zDays*100 });
      cur=nxt;
    }
    return h;
  }, [rangeStart, rangeEnd, zDays]);

  const todayPct = useMemo(() => Math.max(0,Math.min(100,(today-rangeStart)/86400000/zDays*100)), [rangeStart,zDays]);

  const bars = useMemo(() => projects.map(p => {
    const cl=clients.find(c=>c.id===p.clientId);
    const procPct=totalProjectProgress(getProcessData(p.id));
    const projPct=p.tasks?.length?Math.round(p.tasks.filter(t=>t.done).length/p.tasks.length*100):0;
    if(!p.startDate||!p.endDate) return { ...p,cl,valid:false,procPct,projPct };
    const s=new Date(p.startDate),e=new Date(p.endDate);
    const left=Math.max(0,(s-rangeStart)/86400000/zDays*100);
    const right=Math.min(100,(e-rangeStart)/86400000/zDays*100);
    const width=Math.max(.5,right-left);
    const daysLeft=Math.ceil((e-today)/86400000);
    return { ...p,cl,valid:true,left,width,daysLeft,isOverdue:daysLeft<0&&p.status!=='completado',procPct,projPct };
  }), [projects,clients,rangeStart,zDays]);

  const sc = s => statusColors(s);
  const slc = { planificacion:'#6B7280',desarrollo:'#3B82F6',revision:'#F59E0B',completado:'#22C55E',pausado:'#EF4444' };

  return (
    <div style={{ color:'#fff', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Permanent Marker',cursive", color:WY, fontSize:12, opacity:.6, marginBottom:2 }}>todos los proyectos</div>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:'#fff', letterSpacing:'.05em', lineHeight:1 }}>OVERVIEW GENERAL</div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {[['3m','3 meses'],['6m','6 meses'],['12m','12 meses']].map(([v,l]) => (
            <button key={v} onClick={() => setZoom(v)}
              style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif", border:`1.5px solid ${zoom===v?WY:'rgba(255,255,255,.1)'}`, background:zoom===v?'rgba(245,195,0,.1)':'transparent', color:zoom===v?WY:'rgba(255,255,255,.4)', transition:'all .15s' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:18 }}>
        {[
          ['Proyectos activos', projects.filter(p=>p.status!=='completado').length, WY],
          ['Completados', projects.filter(p=>p.status==='completado').length, '#22C55E'],
          ['Presupuesto total', fmtBudget(projects.reduce((s,p)=>s+p.budget,0)), '#8B5CF6'],
          ['Tareas completadas', `${projects.reduce((s,p)=>s+(p.tasks?.filter(t=>t.done).length||0),0)}/${projects.reduce((s,p)=>s+(p.tasks?.length||0),0)}`, '#3B82F6'],
        ].map(([l,v,c]) => (
          <div key={l} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:10, padding:'12px 14px' }}>
            <div style={{ fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>{l}</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:22, color:c, lineHeight:1 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* GANTT */}
      <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:12, overflow:'hidden', marginBottom:18 }}>
        {/* Month headers */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.06)', height:36 }}>
          <div style={{ width:210, flexShrink:0, borderRight:'1px solid rgba(255,255,255,.06)' }}/>
          <div style={{ flex:1, position:'relative' }}>
            {monthHeaders.map((m,i) => (
              <div key={i} style={{ position:'absolute', left:`${m.left}%`, width:`${m.width}%`, height:'100%', borderRight:'1px solid rgba(255,255,255,.04)', display:'flex', alignItems:'center', paddingLeft:8 }}>
                <span style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>{m.label}</span>
              </div>
            ))}
            <div style={{ position:'absolute', left:`${todayPct}%`, top:0, bottom:0, width:2, background:WY, opacity:.5 }}/>
          </div>
          <div style={{ width:80, flexShrink:0, borderLeft:'1px solid rgba(255,255,255,.06)' }}/>
        </div>

        {bars.map((p,i) => {
          const color = p.isOverdue?'#EF4444': slc[p.status]||'#6B7280';
          const taskPct = p.tasks?.length ? Math.round(p.tasks.filter(t=>t.done).length/p.tasks.length*100) : 0;
          return (
            <div key={p.id} style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.04)', minHeight:48, background:i%2===0?'transparent':'rgba(255,255,255,.01)' }}>
              {/* Label */}
              <div style={{ width:210, flexShrink:0, padding:'8px 14px', borderRight:'1px solid rgba(255,255,255,.04)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12, color:'rgba(255,255,255,.8)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginBottom:2 }}>{p.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.35)' }}>{p.cl?.company||'—'}</div>
                {p.isOverdue && <div style={{ fontSize:9, color:'#EF4444', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em' }}>Vencido</div>}
              </div>
              {/* Bar */}
              <div style={{ flex:1, position:'relative', display:'flex', alignItems:'center' }}>
                {monthHeaders.map((m,mi) => <div key={mi} style={{ position:'absolute', left:`${m.left}%`, top:0, bottom:0, width:1, background:'rgba(255,255,255,.03)' }}/>)}
                <div style={{ position:'absolute', left:`${todayPct}%`, top:0, bottom:0, width:2, background:'#EF4444', opacity:.4, zIndex:2 }}/>
                {p.valid ? (
                  <div style={{ position:'absolute', left:`${p.left}%`, width:`${p.width}%`, height:26, borderRadius:6, background:`linear-gradient(90deg,${color},${color}CC)`, boxShadow:`0 2px 8px ${color}44`, display:'flex', alignItems:'center', paddingLeft:8, overflow:'hidden', zIndex:1, minWidth:4 }}>
                    {p.width>8 && <span style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(0,0,0,.7)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.name}</span>}
                    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${taskPct}%`, background:'rgba(255,255,255,.2)', borderRadius:6 }}/>
                  </div>
                ) : (
                  <div style={{ padding:'4px 16px', fontSize:10, color:'rgba(255,255,255,.2)', fontStyle:'italic' }}>Sin fechas</div>
                )}
              </div>
              {/* Right info */}
              <div style={{ width:80, flexShrink:0, padding:'8px 10px', borderLeft:'1px solid rgba(255,255,255,.04)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-end' }}>
                <div style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color }}>{taskPct}%</div>
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:13, color:WY }}>{fmtBudget(p.budget)}</div>
                {p.valid && !p.isOverdue && <div style={{ fontSize:9, color:'rgba(255,255,255,.25)' }}>{p.daysLeft}d</div>}
              </div>
            </div>
          );
        })}
        {bars.length===0 && <div style={{ padding:'48px', textAlign:'center', color:'rgba(255,255,255,.3)', fontSize:13 }}>No hay proyectos aún.</div>}
      </div>

      {/* R's and P's overview across all projects */}
      <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:12, padding:'18px' }}>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:15, color:'rgba(255,255,255,.5)', letterSpacing:'.1em', marginBottom:16 }}>ESTADO 5R + 2P — TODOS LOS PROYECTOS</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'separate', borderSpacing:'3px', minWidth:Math.max(600,projects.length*120+150) }}>
            <thead>
              <tr>
                <th style={{ padding:'8px 10px', textAlign:'left', fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.1em', textTransform:'uppercase', width:130 }}>ELEMENTO</th>
                {projects.map(p => {
                  const procPct = totalProjectProgress(getProcessData(p.id));
                  const sc2 = statusColors(p.status);
                  return (
                    <th key={p.id} style={{ padding:'8px 6px', textAlign:'center', minWidth:100 }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:10, color:'rgba(255,255,255,.7)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:100, marginBottom:3 }}>{p.name}</div>
                      <WRing pct={procPct} color={sc2.color} size={28} sw={2.5}/>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {W_ELEMENTS.map(el => (
                <tr key={el.id}>
                  <td style={{ padding:'6px 10px', background:'rgba(255,255,255,.03)', borderRadius:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:12, color:el.color }}>{el.icon}</span>
                      <div style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.6)' }}>{el.label}</div>
                    </div>
                  </td>
                  {projects.map(p => {
                    const pd = getProcessData(p.id);
                    const allTasks = W_STAGES.flatMap(st => pd[st.id]?.[el.id]?.tasks || []);
                    const done = allTasks.filter(t=>t.done).length;
                    const has = allTasks.length > 0 || W_STAGES.some(st => pd[st.id]?.[el.id]?.notes?.trim());
                    const sc2 = statusColors(p.status);
                    const pct = allTasks.length ? Math.round(done/allTasks.length*100) : 0;
                    return (
                      <td key={p.id} style={{ padding:'3px', verticalAlign:'top' }}>
                        <div style={{ background:has?el.color+'0C':'rgba(255,255,255,.02)', border:`1px solid ${has?el.color+'22':'rgba(255,255,255,.05)'}`, borderRadius:6, padding:'7px 8px', minHeight:36 }}>
                          {has ? (
                            <>
                              {allTasks.length>0 && <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:13, color:el.color, lineHeight:1, marginBottom:3 }}>{done}/{allTasks.length}</div>}
                              <WBar pct={pct} color={el.color} height={3}/>
                            </>
                          ) : (
                            <div style={{ fontSize:10, color:'rgba(255,255,255,.1)', textAlign:'center' }}>—</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── MAIN WORKSPACE VIEW ───────────────────────────────────────────────────────
const WorkspaceView = ({ projects, clients }) => {
  const [mainTab, setMainTab] = useState('overview'); // 'overview' | projectId
  useEffect(() => { injectWorkspaceCSS(); }, []);

  const activeProject = projects.find(p => p.id === mainTab);

  return (
    <div style={{ color:'#fff', fontFamily:"'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"'Permanent Marker',cursive", color:WY, fontSize:13, opacity:.6, marginBottom:2 }}>gestión integrada</div>
        <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:32, color:'#fff', letterSpacing:'.04em', lineHeight:.95 }}>WORKSPACE</div>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap', overflowX:'auto', paddingBottom:4 }}>
        {/* Overview tab */}
        <button onClick={() => setMainTab('overview')}
          style={{ padding:'8px 18px', borderRadius:9, cursor:'pointer', fontFamily:"'Bebas Neue',cursive", fontSize:13, letterSpacing:'.05em', border:`1.5px solid ${mainTab==='overview'?WY:'rgba(255,255,255,.1)'}`, background:mainTab==='overview'?'rgba(245,195,0,.12)':'rgba(255,255,255,.02)', color:mainTab==='overview'?WY:'rgba(255,255,255,.5)', transition:'all .2s', flexShrink:0 }}>
          OVERVIEW GENERAL
        </button>
        {/* Divider */}
        <div style={{ width:1, background:'rgba(255,255,255,.1)', margin:'0 4px', flexShrink:0 }}/>
        {/* Project tabs */}
        {projects.map(p => {
          const procData = getProcessData(p.id);
          const procPct = totalProjectProgress(procData);
          const sc2 = statusColors(p.status);
          const isA = mainTab === p.id;
          return (
            <button key={p.id} onClick={() => setMainTab(p.id)}
              style={{ padding:'8px 16px', borderRadius:9, cursor:'pointer', border:`1.5px solid ${isA?sc2.color:'rgba(255,255,255,.08)'}`, background:isA?sc2.color+'15':'rgba(255,255,255,.02)', color:isA?sc2.color:'rgba(255,255,255,.45)', display:'flex', alignItems:'center', gap:8, transition:'all .2s', flexShrink:0 }}>
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:12, letterSpacing:'.04em', whiteSpace:'nowrap' }}>{p.name.length>22?p.name.slice(0,20)+'…':p.name}</div>
              <WRing pct={procPct} color={sc2.color} size={28} sw={2.5}/>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {mainTab === 'overview' ? (
        <GeneralOverview projects={projects} clients={clients}/>
      ) : activeProject ? (
        <ProjectProcess project={activeProject} clients={clients}/>
      ) : (
        <div style={{ padding:'48px', textAlign:'center', color:'rgba(255,255,255,.3)' }}>Selecciona un proyecto</div>
      )}
    </div>
  );
};

export default WorkspaceView;
