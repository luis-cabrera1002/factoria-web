'use client';
// ═══ Gantt View — Visual Project Timeline ═══════════════════════════════════
import { useState, useEffect, useMemo as useMemoG } from 'react';
const GY = '#F5C300';

const statusColors = {
  planificacion:'#6B7280', desarrollo:'#3B82F6', revision:'#F59E0B', completado:'#22C55E', pausado:'#EF4444',
};
const statusLabels = {
  planificacion:'Planificación', desarrollo:'En desarrollo', revision:'En revisión', completado:'Completado', pausado:'Pausado',
};

const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const GanttView = ({ projects, clients }) => {
  const today = new Date();
  const [zoom, setZoom] = useState('6m'); // '3m','6m','12m'

  // Compute visible range
  const { rangeStart, rangeEnd, totalDays } = useMemoG(() => {
    const zDays = { '3m':90, '6m':180, '12m':365 }[zoom];
    const start = new Date(today); start.setDate(start.getDate() - Math.floor(zDays * 0.2));
    const end = new Date(start); end.setDate(start.getDate() + zDays);
    return { rangeStart: start, rangeEnd: end, totalDays: zDays };
  }, [zoom]);

  // Month headers
  const monthHeaders = useMemoG(() => {
    const headers = [];
    let cur = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    while (cur <= rangeEnd) {
      const start = Math.max(0, (cur - rangeStart) / 86400000);
      const nextMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      const end = Math.min(totalDays, (nextMonth - rangeStart) / 86400000);
      headers.push({ label: `${MONTHS_ES[cur.getMonth()]} ${cur.getFullYear()}`, left: start / totalDays * 100, width: (end - start) / totalDays * 100 });
      cur = nextMonth;
    }
    return headers;
  }, [rangeStart, rangeEnd, totalDays]);

  // Today position
  const todayPct = useMemoG(() => {
    const d = (today - rangeStart) / 86400000;
    return Math.max(0, Math.min(100, d / totalDays * 100));
  }, [rangeStart, totalDays]);

  // Project bars
  const bars = useMemoG(() => {
    return projects.map(p => {
      const client = clients.find(c => c.id === p.clientId);
      if (!p.startDate || !p.endDate) return { ...p, client, valid: false };
      const start = new Date(p.startDate), end = new Date(p.endDate);
      const left = Math.max(0, (start - rangeStart) / 86400000 / totalDays * 100);
      const right = Math.min(100, (end - rangeStart) / 86400000 / totalDays * 100);
      const width = Math.max(0.5, right - left);
      const daysLeft = Math.ceil((end - today) / 86400000);
      const isOverdue = daysLeft < 0 && p.status !== 'completado';
      return { ...p, client, valid: true, left, width, daysLeft, isOverdue };
    });
  }, [projects, clients, rangeStart, totalDays]);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", color: '#fff' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Permanent Marker',cursive", color:GY, fontSize:12, opacity:.6, marginBottom:2 }}>cronograma visual</div>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:'#fff', letterSpacing:'.05em', lineHeight:1 }}>GANTT · TIMELINE</div>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span style={{ fontSize:11, color:'rgba(255,255,255,.3)', fontFamily:"'Space Grotesk',sans-serif", marginRight:4 }}>Vista:</span>
          {[['3m','3 meses'],['6m','6 meses'],['12m','12 meses']].map(([v,l]) => (
            <button key={v} onClick={() => setZoom(v)}
              style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif", border:`1.5px solid ${zoom===v?GY:'rgba(255,255,255,.1)'}`, background:zoom===v?'rgba(245,195,0,.1)':'transparent', color:zoom===v?GY:'rgba(255,255,255,.4)', transition:'all .15s' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:16, marginBottom:18, flexWrap:'wrap' }}>
        {Object.entries(statusColors).map(([k,c]) => (
          <div key={k} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:c }}/>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.5)', fontFamily:"'Space Grotesk',sans-serif" }}>{statusLabels[k]}</span>
          </div>
        ))}
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:2, height:14, background:'#EF4444' }}/>
          <span style={{ fontSize:11, color:'rgba(255,255,255,.5)', fontFamily:"'Space Grotesk',sans-serif" }}>Hoy</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:14, overflow:'hidden' }}>
        {/* Month headers */}
        <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.06)', position:'relative', height:36 }}>
          <div style={{ width:200, flexShrink:0, borderRight:'1px solid rgba(255,255,255,.06)' }}/>
          <div style={{ flex:1, position:'relative' }}>
            {monthHeaders.map((m, i) => (
              <div key={i} style={{ position:'absolute', left:`${m.left}%`, width:`${m.width}%`, height:'100%', borderRight:'1px solid rgba(255,255,255,.04)', display:'flex', alignItems:'center', paddingLeft:8 }}>
                <span style={{ fontSize:11, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.4)', letterSpacing:'.04em', whiteSpace:'nowrap' }}>{m.label}</span>
              </div>
            ))}
            {/* Today line in header */}
            <div style={{ position:'absolute', left:`${todayPct}%`, top:0, bottom:0, width:2, background:GY, opacity:.6 }}/>
          </div>
        </div>

        {/* Project rows */}
        {bars.length === 0 && (
          <div style={{ padding:'48px', textAlign:'center', color:'rgba(255,255,255,.3)', fontSize:14 }}>
            No hay proyectos con fechas definidas.
          </div>
        )}
        {bars.map((p, i) => {
          const color = p.isOverdue ? '#EF4444' : statusColors[p.status] || '#6B7280';
          return (
            <div key={p.id} style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.04)', minHeight:52, background: i%2===0?'transparent':'rgba(255,255,255,.01)' }}>
              {/* Label */}
              <div style={{ width:200, flexShrink:0, padding:'8px 16px', borderRight:'1px solid rgba(255,255,255,.04)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12, color:'rgba(255,255,255,.8)', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.35)' }}>{p.client?.company || '—'}</div>
                {p.valid && p.isOverdue && <div style={{ fontSize:10, color:'#EF4444', fontWeight:700 }}>VENCIDO</div>}
              </div>
              {/* Bar area */}
              <div style={{ flex:1, position:'relative', display:'flex', alignItems:'center', padding:'0 0' }}>
                {/* Grid lines */}
                {monthHeaders.map((m, mi) => (
                  <div key={mi} style={{ position:'absolute', left:`${m.left}%`, top:0, bottom:0, width:1, background:'rgba(255,255,255,.03)' }}/>
                ))}
                {/* Today line */}
                <div style={{ position:'absolute', left:`${todayPct}%`, top:0, bottom:0, width:2, background:'#EF4444', opacity:.5, zIndex:2 }}/>
                {/* Bar */}
                {p.valid && (
                  <div style={{ position:'absolute', left:`${p.left}%`, width:`${p.width}%`, height:28, borderRadius:6, background:`linear-gradient(90deg,${color},${color}cc)`, boxShadow:`0 2px 8px ${color}44`, display:'flex', alignItems:'center', paddingLeft:8, overflow:'hidden', zIndex:1, minWidth:4 }}>
                    {p.width > 8 && (
                      <span style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(0,0,0,.7)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {p.name}
                      </span>
                    )}
                    {/* Progress overlay */}
                    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${p.tasks?.length ? Math.round(p.tasks.filter(t=>t.done).length/p.tasks.length*100) : 0}%`, background:'rgba(255,255,255,.2)', borderRadius:6 }}/>
                  </div>
                )}
                {!p.valid && (
                  <div style={{ padding:'4px 16px', fontSize:11, color:'rgba(255,255,255,.2)', fontStyle:'italic' }}>Sin fechas definidas</div>
                )}
              </div>
              {/* Right info */}
              <div style={{ width:90, flexShrink:0, padding:'8px 10px', borderLeft:'1px solid rgba(255,255,255,.04)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-end' }}>
                <div style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:color }}>{statusLabels[p.status]}</div>
                {p.valid && !p.isOverdue && p.daysLeft > 0 && <div style={{ fontSize:10, color:'rgba(255,255,255,.3)' }}>{p.daysLeft}d</div>}
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:14, color:GY }}>${p.budget>=1000?`${(p.budget/1000).toFixed(1)}k`:p.budget}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginTop:16 }}>
        {[
          ['Total proyectos', projects.length, '#fff'],
          ['En desarrollo', projects.filter(p=>p.status==='desarrollo').length, '#3B82F6'],
          ['Completados', projects.filter(p=>p.status==='completado').length, '#22C55E'],
          ['Presupuesto total', `$${(projects.reduce((s,p)=>s+p.budget,0)/1000).toFixed(1)}k`, GY],
        ].map(([l,v,c]) => (
          <div key={l} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:10, padding:'12px 14px', textAlign:'center' }}>
            <div style={{ fontSize:9, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>{l}</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:24, color:c, lineHeight:1 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttView;
