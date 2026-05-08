'use client';
// ═══ Process Matrix v4 ═══════════════════════════════════════════════════════
// Phases with tasks → auto progress · 5R+2P as Asana panels · World-class UI
// ═════════════════════════════════════════════════════════════════════════════
import React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';

const PMY = '#F5C300', PMDK = '#0C0C0E', PMBG = '#1A1A1F';

// ── SVG Icon set ─────────────────────────────────────────────────────────────
const SvgIcon = ({ d, size = 18, color = 'currentColor', sw = 1.6, fill = 'none', viewBox = '0 0 24 24' }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    {d}
  </svg>
);

const Icons = {
  tool:     <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
  people:   <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/></>,
  bar:      <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  link:     <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  gear:     <><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
  flow:     <><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></>,
  plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  check:    <><polyline points="20 6 9 17 4 12"/></>,
  trash:    <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  chevron:  <><polyline points="9 18 15 12 9 6"/></>,
  list:     <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  flag:     <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  lock:     <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  edit:     <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
};

const Ico = ({ id, size = 16, color = 'currentColor', sw = 1.6 }) => (
  <SvgIcon d={Icons[id]} size={size} color={color} sw={sw} />
);

// ── Config ────────────────────────────────────────────────────────────────────
const STAGES = [
  { id: 'analisis',  label: 'Análisis',   color: '#8B5CF6', num: '01', sub: 'Entender el problema'  },
  { id: 'diseno',    label: 'Diseño',     color: '#EC4899', num: '02', sub: 'Definir la solución'   },
  { id: 'dev',       label: 'Desarrollo', color: '#3B82F6', num: '03', sub: 'Construir el producto' },
  { id: 'deploy',    label: 'Despliegue', color: PMY,       num: '04', sub: 'Lanzar al mundo'        },
  { id: 'soporte',   label: 'Soporte',    color: '#22C55E', num: '05', sub: 'Mantener y crecer'     },
];

const ELEMENTS = [
  { id: 'recursos',   label: 'Recursos',             icon: 'tool',   tag: 'R1', color: '#F59E0B', hint: 'Herramientas, tecnología, presupuesto e infraestructura necesarios.' },
  { id: 'roles',      label: 'Roles',                icon: 'people', tag: 'R2', color: '#8B5CF6', hint: 'PM, desarrolladores, diseñador, QA, cliente — quién hace qué.' },
  { id: 'reportes',   label: 'Reportes',             icon: 'bar',    tag: 'R3', color: '#3B82F6', hint: 'Frecuencia y formato de comunicación del avance.' },
  { id: 'rango',      label: 'Rango de Tiempo',      icon: 'clock',  tag: 'R4', color: '#EC4899', hint: 'Duración, sprints, hitos y fechas clave.' },
  { id: 'relacion',   label: 'Relación',             icon: 'link',   tag: 'R5', color: '#06B6D4', hint: 'Dependencias, stakeholders y flujo entre etapas.' },
  { id: 'procesos',   label: 'Procesos Principales', icon: 'gear',   tag: 'P1', color: '#22C55E', hint: 'Flujos de trabajo core y entregables de la etapa.' },
  { id: 'procesos2',  label: 'Procesos Secundarios', icon: 'flow',   tag: 'P2', color: '#EF4444', hint: 'Validaciones, revisiones y flujos de soporte.' },
];

const STATUS_CFG = {
  done:    { label: 'Completado',  color: '#22C55E' },
  active:  { label: 'En progreso', color: PMY       },
  pending: { label: 'Pendiente',   color: '#6B7280' },
  blocked: { label: 'Bloqueado',   color: '#EF4444' },
};

const PRIO_CFG = {
  alta:  { label: 'Alta',   color: '#EF4444' },
  media: { label: 'Media',  color: PMY       },
  baja:  { label: 'Baja',   color: '#22C55E' },
};

const uid = () => Math.random().toString(36).slice(2, 9);

// ── Default seed data ─────────────────────────────────────────────────────────
const defaultData = () => ({
  analisis: {
    status: 'done',
    recursos:  { notes: 'Notion · Miro · Google Meet · Figma', tasks: [
      { id: uid(), text: 'Configurar espacio de trabajo en Notion', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Agendar kick-off con el cliente', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Definir stack tecnológico', done: true, priority: 'media', subtasks: [] },
    ]},
    roles:     { notes: 'PM (lidera) · Lead Dev · Diseñador UX · Cliente', tasks: [
      { id: uid(), text: 'Asignar PM del proyecto', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Definir RACI del proyecto', done: true, priority: 'media', subtasks: [] },
    ]},
    reportes:  { notes: 'Reporte al cierre · Brief documentado', tasks: [
      { id: uid(), text: 'Documento de requerimientos v1', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Validar requerimientos con cliente', done: true, priority: 'alta', subtasks: [] },
    ]},
    rango:     { notes: '1–2 semanas · Entregable: documento de requerimientos', tasks: [
      { id: uid(), text: 'Definir cronograma de etapas', done: true, priority: 'alta', subtasks: [] },
    ]},
    relacion:  { notes: 'Alimenta: Diseño + Dev · Depende de: Brief inicial', tasks: [
      { id: uid(), text: 'Mapear stakeholders', done: true, priority: 'media', subtasks: [] },
    ]},
    procesos:  { notes: 'Levantamiento · User stories · Mapa de procesos · Alcance', tasks: [
      { id: uid(), text: 'Levantamiento de requerimientos funcionales', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Levantamiento de requerimientos no funcionales', done: true, priority: 'media', subtasks: [] },
      { id: uid(), text: 'Mapa de user journeys', done: true, priority: 'media', subtasks: [] },
    ]},
    procesos2: { notes: 'Análisis de competencia · Revisión de sistemas existentes', tasks: [
      { id: uid(), text: 'Análisis de competencia', done: true, priority: 'baja', subtasks: [] },
      { id: uid(), text: 'Revisión de sistemas existentes del cliente', done: true, priority: 'media', subtasks: [] },
    ]},
  },
  diseno: {
    status: 'active',
    recursos:  { notes: 'Figma · FigJam · Zeplin · Lottie', tasks: [
      { id: uid(), text: 'Setup del proyecto en Figma', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Crear Design Tokens y variables', done: true, priority: 'alta', subtasks: [] },
    ]},
    roles:     { notes: 'Diseñador UX/UI (lidera) · PM · Lead Dev · Cliente', tasks: [
      { id: uid(), text: 'Briefing de diseño con el equipo', done: true, priority: 'alta', subtasks: [] },
    ]},
    reportes:  { notes: 'Design review semanal con cliente', tasks: [
      { id: uid(), text: 'Primera presentación de wireframes al cliente', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Segunda ronda de revisiones', done: false, priority: 'alta', subtasks: [] },
    ]},
    rango:     { notes: '2–3 semanas · Hito: aprobación antes de dev', tasks: [
      { id: uid(), text: 'Hito de aprobación de diseño final', done: false, priority: 'alta', subtasks: [] },
    ]},
    relacion:  { notes: 'Depende de: Análisis · Entrega a: Dev', tasks: [
      { id: uid(), text: 'Handoff de diseño a desarrollo', done: false, priority: 'alta', subtasks: [] },
    ]},
    procesos:  { notes: 'Wireframes · Prototipo interactivo · UI Kit · Handoff', tasks: [
      { id: uid(), text: 'Wireframes de pantallas principales', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Prototipo interactivo de flujo principal', done: true, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Pantallas de flujo de pagos', done: false, priority: 'alta', subtasks: [
        { id: uid(), text: 'Pantalla de checkout', done: false },
        { id: uid(), text: 'Confirmación de pago', done: false },
        { id: uid(), text: 'Estados de error', done: false },
      ]},
      { id: uid(), text: 'Pantallas de perfil de usuario', done: false, priority: 'media', subtasks: [] },
    ]},
    procesos2: { notes: 'Tests de usabilidad · Revisión de accesibilidad', tasks: [
      { id: uid(), text: 'Test de usabilidad con 3 usuarios', done: false, priority: 'media', subtasks: [] },
      { id: uid(), text: 'Revisión WCAG 2.1 (accesibilidad)', done: false, priority: 'baja', subtasks: [] },
    ]},
  },
  dev: {
    status: 'pending',
    recursos:  { notes: 'VS Code · GitHub · Docker · PostgreSQL · Node.js · React', tasks: [
      { id: uid(), text: 'Setup del repositorio en GitHub', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Configurar entorno de desarrollo con Docker', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Configurar CI/CD básico', done: false, priority: 'media', subtasks: [] },
    ]},
    roles:     { notes: 'Lead Dev · Frontend Dev · Backend Dev · QA', tasks: [
      { id: uid(), text: 'Asignación de módulos por desarrollador', done: false, priority: 'alta', subtasks: [] },
    ]},
    reportes:  { notes: 'Sprint review c/2 semanas · Demo al cliente', tasks: [
      { id: uid(), text: 'Sprint 1 — Review y demo', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Sprint 2 — Review y demo', done: false, priority: 'alta', subtasks: [] },
    ]},
    rango:     { notes: '4–8 semanas · Sprints de 2 semanas', tasks: [
      { id: uid(), text: 'Definir backlog técnico por sprint', done: false, priority: 'alta', subtasks: [] },
    ]},
    relacion:  { notes: 'Depende de: Diseño aprobado · Entrega a: QA', tasks: [
      { id: uid(), text: 'Checklist de handoff design → dev completado', done: false, priority: 'alta', subtasks: [] },
    ]},
    procesos:  { notes: 'Setup · API REST · Frontend · Integración · Unit tests', tasks: [
      { id: uid(), text: 'Arquitectura y modelos de base de datos', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'API REST — endpoints principales', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Frontend — componentes base', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Integración frontend ↔ backend', done: false, priority: 'alta', subtasks: [] },
    ]},
    procesos2: { notes: 'Code review · Documentación técnica · Performance', tasks: [
      { id: uid(), text: 'Code review de módulos core', done: false, priority: 'media', subtasks: [] },
      { id: uid(), text: 'Documentación técnica de la API', done: false, priority: 'baja', subtasks: [] },
    ]},
  },
  deploy: {
    status: 'pending',
    recursos:  { notes: 'AWS / Vercel · GitHub Actions · Cloudflare · Sentry', tasks: [
      { id: uid(), text: 'Configurar entorno de producción', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Setup de monitoreo con Sentry', done: false, priority: 'alta', subtasks: [] },
    ]},
    roles:     { notes: 'DevOps / Lead Dev · PM · Cliente', tasks: [
      { id: uid(), text: 'Designar responsable de deploy', done: false, priority: 'alta', subtasks: [] },
    ]},
    reportes:  { notes: 'Checklist de deploy · Reporte post go-live', tasks: [
      { id: uid(), text: 'Completar checklist de pre-lanzamiento', done: false, priority: 'alta', subtasks: [
        { id: uid(), text: 'SSL configurado', done: false },
        { id: uid(), text: 'Variables de entorno verificadas', done: false },
        { id: uid(), text: 'Backup de base de datos', done: false },
      ]},
    ]},
    rango:     { notes: '3–5 días hábiles · Ventana: horario de baja concurrencia', tasks: [
      { id: uid(), text: 'Coordinar ventana de deploy con cliente', done: false, priority: 'alta', subtasks: [] },
    ]},
    relacion:  { notes: 'Depende de: QA aprobado · Requiere: credenciales', tasks: [
      { id: uid(), text: 'Obtener credenciales de producción del cliente', done: false, priority: 'alta', subtasks: [] },
    ]},
    procesos:  { notes: 'Build · Deploy · DNS/SSL · Go-live', tasks: [
      { id: uid(), text: 'Build de producción y pruebas de smoke', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Deploy en servidor de producción', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Configuración de dominio y SSL', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Notificación de go-live al cliente', done: false, priority: 'media', subtasks: [] },
    ]},
    procesos2: { notes: 'Backup · Plan de rollback · Monitoreo inicial', tasks: [
      { id: uid(), text: 'Plan de rollback documentado', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Monitoreo activo primeras 48h', done: false, priority: 'alta', subtasks: [] },
    ]},
  },
  soporte: {
    status: 'pending',
    recursos:  { notes: 'Sentry · Hotjar · Notion · Slack', tasks: [
      { id: uid(), text: 'Configurar alertas automáticas en Sentry', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Setup de Hotjar para analytics de uso', done: false, priority: 'media', subtasks: [] },
    ]},
    roles:     { notes: 'Dev de soporte · PM · Cliente', tasks: [
      { id: uid(), text: 'Asignar dev de soporte mensual', done: false, priority: 'alta', subtasks: [] },
    ]},
    reportes:  { notes: 'Reporte mensual · Alertas automáticas', tasks: [
      { id: uid(), text: 'Template de reporte mensual', done: false, priority: 'media', subtasks: [] },
      { id: uid(), text: 'Primer reporte de métricas enviado', done: false, priority: 'alta', subtasks: [] },
    ]},
    rango:     { notes: 'Mínimo 3 meses · SLA: crítico <4h · normal <24h', tasks: [
      { id: uid(), text: 'SLA documentado y firmado por el cliente', done: false, priority: 'alta', subtasks: [] },
    ]},
    relacion:  { notes: 'Cliente activo · Equipo dev en standby', tasks: [
      { id: uid(), text: 'Canal de comunicación de soporte activo', done: false, priority: 'alta', subtasks: [] },
    ]},
    procesos:  { notes: 'Monitoreo · Bug fixes · Actualizaciones de seguridad', tasks: [
      { id: uid(), text: 'Primer ciclo de monitoreo completado', done: false, priority: 'alta', subtasks: [] },
      { id: uid(), text: 'Actualización de dependencias críticas', done: false, priority: 'media', subtasks: [] },
    ]},
    procesos2: { notes: 'Retrospectiva · Métricas · Planificación v2', tasks: [
      { id: uid(), text: 'Retrospectiva del proyecto con el equipo', done: false, priority: 'media', subtasks: [] },
      { id: uid(), text: 'Propuesta de mejoras v2 al cliente', done: false, priority: 'baja', subtasks: [] },
    ]},
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const stageProgress = (stageData) => {
  const allTasks = ELEMENTS.flatMap(el => stageData?.[el.id]?.tasks || []);
  if (!allTasks.length) return 0;
  const done = allTasks.filter(t => t.done).length;
  return Math.round((done / allTasks.length) * 100);
};

const totalStats = (data) => {
  let total = 0, done = 0;
  STAGES.forEach(st => {
    ELEMENTS.forEach(el => {
      const tasks = data[st.id]?.[el.id]?.tasks || [];
      total += tasks.length;
      done += tasks.filter(t => t.done).length;
    });
  });
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
};

// ── Progress Ring ─────────────────────────────────────────────────────────────
const Ring = ({ pct, color, size = 52, sw = 4 }) => {
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return (
    <svg width={size} height={size} style={{ display: 'block', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)' }} />
      <text x={size/2} y={size/2 + 4} textAnchor="middle"
        style={{ fontSize: size < 44 ? 9 : 11, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fill: color }}>
        {pct}%
      </text>
    </svg>
  );
};

// ── Element Side Panel (Asana-style) ──────────────────────────────────────────
const ElementPanel = ({ el, stageId, stageColor, stageLabel, data, onUpdate, onClose }) => {
  const elData = data[stageId]?.[el.id] || { notes: '', tasks: [] };
  const [notes, setNotes] = useState(elData.notes || '');
  const [tasks, setTasks] = useState(elData.tasks || []);
  const [newTask, setNewTask] = useState('');
  const [newPrio, setNewPrio] = useState('media');
  const [openSubTask, setOpenSubTask] = useState(null);
  const [newSub, setNewSub] = useState('');

  // Auto-save on change
  useEffect(() => {
    onUpdate(stageId, el.id, { notes, tasks });
  }, [notes, tasks]);

  // ESC to close
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: uid(), text: newTask.trim(), done: false, priority: newPrio, subtasks: [] }]);
    setNewTask('');
  };

  const toggleTask = id => setTasks(prev =>
    prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
  );

  const delTask = id => setTasks(prev => prev.filter(t => t.id !== id));

  const toggleSub = (tid, sid) => setTasks(prev =>
    prev.map(t => t.id === tid
      ? { ...t, subtasks: t.subtasks.map(s => s.id === sid ? { ...s, done: !s.done } : s) }
      : t)
  );

  const addSub = tid => {
    if (!newSub.trim()) return;
    setTasks(prev => prev.map(t => t.id === tid
      ? { ...t, subtasks: [...(t.subtasks || []), { id: uid(), text: newSub.trim(), done: false }] }
      : t));
    setNewSub('');
  };

  const donePct = tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0;
  const doneTasks = tasks.filter(t => t.done).length;

  return (
    <>
      {/* Backdrop */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500 }} onClick={onClose} />

      {/* Panel */}
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: 420,
        background: '#13131A', zIndex: 501, display: 'flex', flexDirection: 'column',
        borderLeft: `1px solid rgba(255,255,255,.08)`,
        boxShadow: '-8px 0 40px rgba(0,0,0,.5)',
        animation: 'pm4slide .25s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 22px 16px', borderBottom: '1px solid rgba(255,255,255,.07)', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: el.color + '20', border: `1.5px solid ${el.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ico id={el.icon} size={17} color={el.color} sw={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 9, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, color: stageColor, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 1 }}>
                  {stageLabel} · {el.tag}
                </div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 20, color: '#fff', letterSpacing: '.04em', lineHeight: 1 }}>{el.label}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,.07)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: 'rgba(255,255,255,.6)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>

          {/* Mini progress bar */}
          {tasks.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', fontFamily: "'Space Grotesk',sans-serif" }}>{doneTasks}/{tasks.length} tareas completadas</span>
                <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 14, color: el.color }}>{donePct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,.07)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${donePct}%`, background: el.color, borderRadius: 2, transition: 'width .4s ease', boxShadow: `0 0 6px ${el.color}66` }} />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px' }}>
          {/* Notes */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,.35)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>DESCRIPCIÓN Y NOTAS</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={el.hint}
              style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: '1.5px solid rgba(255,255,255,.08)', borderRadius: 8, padding: '11px 14px', color: 'rgba(255,255,255,.8)', fontSize: 13, lineHeight: 1.65, resize: 'vertical', fontFamily: "'DM Sans',sans-serif", minHeight: 80, outline: 'none', boxSizing: 'border-box', caretColor: PMY }}
            />
          </div>

          {/* Tasks */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,.35)', letterSpacing: '.1em', textTransform: 'uppercase' }}>TAREAS</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {Object.entries(PRIO_CFG).map(([k, v]) => (
                  <button key={k} onClick={() => setNewPrio(k)}
                    style={{ padding: '3px 9px', borderRadius: 100, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", border: `1.5px solid ${newPrio === k ? v.color : 'rgba(255,255,255,.1)'}`, background: newPrio === k ? v.color + '20' : 'transparent', color: newPrio === k ? v.color : 'rgba(255,255,255,.3)', transition: 'all .15s' }}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add task input */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                placeholder="Nueva tarea — Enter para añadir"
                style={{ flex: 1, background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,255,255,.08)', borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: 'none', caretColor: PMY }}
              />
              <button onClick={addTask} style={{ width: 36, height: 36, borderRadius: 8, background: PMY, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ico id="plus" size={16} color="#0C0C0E" sw={2.5} />
              </button>
            </div>

            {/* Task list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tasks.map(task => {
                const pc = PRIO_CFG[task.priority || 'media'];
                const subsDone = (task.subtasks || []).filter(s => s.done).length;
                const subsTotal = (task.subtasks || []).length;
                return (
                  <div key={task.id}>
                    {/* Task row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: task.done ? 'rgba(34,197,94,.06)' : 'rgba(255,255,255,.03)', border: `1px solid ${task.done ? 'rgba(34,197,94,.15)' : 'rgba(255,255,255,.06)'}`, borderRadius: 8, cursor: 'default', transition: 'all .15s' }}>
                      {/* Checkbox */}
                      <div
                        onClick={() => toggleTask(task.id)}
                        style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${task.done ? '#22C55E' : pc.color + '66'}`, background: task.done ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .2s' }}>
                        {task.done && <Ico id="check" size={11} color="#fff" sw={3} />}
                      </div>

                      {/* Text + meta */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: task.done ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.85)', textDecoration: task.done ? 'line-through' : 'none', marginBottom: subsTotal > 0 ? 3 : 0 }}>{task.text}</div>
                        {subsTotal > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ height: 3, width: 48, background: 'rgba(255,255,255,.08)', borderRadius: 2, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${Math.round(subsDone / subsTotal * 100)}%`, background: '#22C55E', borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: "'Space Grotesk',sans-serif" }}>{subsDone}/{subsTotal}</span>
                          </div>
                        )}
                      </div>

                      {/* Priority dot */}
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: pc.color, flexShrink: 0, opacity: task.done ? .3 : 1 }} />

                      {/* Expand subtasks */}
                      <button onClick={() => setOpenSubTask(openSubTask === task.id ? null : task.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: openSubTask === task.id ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.2)', padding: 2, transition: 'color .15s', transform: openSubTask === task.id ? 'rotate(90deg)' : 'none', transition: 'transform .15s, color .15s' }}>
                        <Ico id="chevron" size={13} color="currentColor" sw={2} />
                      </button>

                      {/* Delete */}
                      <button onClick={() => delTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.15)', padding: 2, transition: 'color .15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.15)'}>
                        <Ico id="trash" size={13} color="currentColor" sw={1.5} />
                      </button>
                    </div>

                    {/* Subtasks expanded */}
                    {openSubTask === task.id && (
                      <div style={{ marginLeft: 28, marginTop: 4, marginBottom: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {(task.subtasks || []).map(sub => (
                          <div key={sub.id} onClick={() => toggleSub(task.id, sub.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: sub.done ? 'rgba(34,197,94,.04)' : 'rgba(255,255,255,.02)', borderRadius: 6, cursor: 'pointer', border: `1px solid ${sub.done ? 'rgba(34,197,94,.12)' : 'rgba(255,255,255,.04)'}` }}>
                            <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${sub.done ? '#22C55E' : 'rgba(255,255,255,.3)'}`, background: sub.done ? '#22C55E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                              {sub.done && <Ico id="check" size={9} color="#fff" sw={3} />}
                            </div>
                            <span style={{ fontSize: 12, color: sub.done ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.7)', textDecoration: sub.done ? 'line-through' : 'none' }}>{sub.text}</span>
                          </div>
                        ))}
                        {/* Add subtask */}
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <input value={newSub} onChange={e => setNewSub(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addSub(task.id)}
                            placeholder="Añadir subtarea..."
                            style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 6, padding: '6px 10px', color: '#fff', fontSize: 12, fontFamily: "'DM Sans',sans-serif", outline: 'none', caretColor: PMY }} />
                          <button onClick={() => addSub(task.id)} style={{ background: 'rgba(245,195,0,.15)', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Ico id="plus" size={12} color={PMY} sw={2.5} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {tasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,.2)', fontSize: 13 }}>
                  No hay tareas aún — añade la primera arriba
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Stage Flow Bar ────────────────────────────────────────────────────────────
const StageFlow = ({ data, activeId, onSelect }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: 540, overflowX: 'auto' }}>
      {STAGES.map((st, i) => {
        const pct = stageProgress(data[st.id]);
        const sts = data[st.id]?.status || 'pending';
        const sc = STATUS_CFG[sts];
        const isA = activeId === st.id;
        return (
          <React.Fragment key={st.id}>
            <div onClick={() => onSelect(st.id)}
              style={{ flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'transform .2s', transform: isA ? 'translateY(-4px)' : 'none' }}>
              <div style={{ position: 'relative', width: 58, height: 58 }}>
                <Ring pct={pct} color={st.color} size={58} sw={4} />
                {sts === 'active' && <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${st.color}`, opacity: .3, animation: 'pm4pulse 2s ease infinite' }} />}
                {isA && <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: st.color, boxShadow: `0 0 8px ${st.color}` }} />}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, color: isA ? st.color : 'rgba(255,255,255,.6)', letterSpacing: '.03em', marginBottom: 2 }}>{st.label}</div>
                <div style={{ fontSize: 9, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: sc.color, letterSpacing: '.07em', textTransform: 'uppercase' }}>{sc.label}</div>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{ flex: 0, width: 24, marginTop: 26, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: 2, background: pct === 100 ? `linear-gradient(90deg,${st.color},${STAGES[i+1].color})` : 'rgba(255,255,255,.07)', borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
                  {pct === 100 && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)', animation: 'pm4flow 1.8s linear infinite' }} />}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ── Main ProcessView ──────────────────────────────────────────────────────────
const ProcessView = ({ project }) => {
  const SK = `fdi_proc_v4_${project.id}`;
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem(SK); return s ? JSON.parse(s) : defaultData(); }
    catch { return defaultData(); }
  });
  const [activeStageId, setActiveStageId] = useState('analisis');
  const [openPanel, setOpenPanel] = useState(null); // { elId }
  const [view, setView] = useState('detail');

  useEffect(() => {
    try { localStorage.setItem(SK, JSON.stringify(data)); } catch {}
  }, [data]);

  const updateElement = useCallback((stageId, elId, elData) => {
    setData(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        [elId]: { ...(prev[stageId]?.[elId] || {}), ...elData },
      },
    }));
  }, []);

  const setStatus = (stageId, status) => setData(prev => ({ ...prev, [stageId]: { ...prev[stageId], status } }));

  // Inject CSS
  useEffect(() => {
    if (document.getElementById('pm4-css')) return;
    const s = document.createElement('style'); s.id = 'pm4-css';
    s.textContent = `
      @keyframes pm4flow{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
      @keyframes pm4pulse{0%,100%{opacity:.2}50%{opacity:.45}}
      @keyframes pm4in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      .pm4-root{animation:pm4in .3s ease forwards}
      @keyframes pm4slide{from{transform:translateX(100%)}to{transform:translateX(0)}}
      .pm4-el-card{cursor:pointer;transition:all .2s}
      .pm4-el-card:hover{transform:translateY(-2px)!important;box-shadow:0 8px 24px rgba(0,0,0,.3)!important}
    `;
    document.head.appendChild(s);
  }, []);

  const stats = useMemo(() => totalStats(data), [data]);
  const activeStage = STAGES.find(s => s.id === activeStageId);
  const sd = data[activeStageId] || {};

  const openEl = ELEMENTS.find(el => el.id === openPanel);

  return (
    <div className="pm4-root" style={{ fontFamily: "'DM Sans',sans-serif", color: '#fff' }}>
      {/* ── Element Panel ── */}
      {openPanel && openEl && (
        <ElementPanel
          el={openEl}
          stageId={activeStageId}
          stageColor={activeStage?.color || PMY}
          stageLabel={activeStage?.label || ''}
          data={data}
          onUpdate={updateElement}
          onClose={() => setOpenPanel(null)}
        />
      )}

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Permanent Marker',cursive", color: PMY, fontSize: 11, opacity: .6, marginBottom: 2 }}>metodología 5R · 2P · 5 etapas</div>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: '#fff', letterSpacing: '.05em', lineHeight: 1 }}>PROCESS MATRIX</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['detail', 'Detalle'], ['matrix', 'Matriz']].map(([v, l]) => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", border: `1.5px solid ${view === v ? PMY : 'rgba(255,255,255,.1)'}`, background: view === v ? 'rgba(245,195,0,.1)' : 'transparent', color: view === v ? PMY : 'rgba(255,255,255,.4)', transition: 'all .15s' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── Health metrics ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
        {[
          ['Tareas del proceso', `${stats.done}/${stats.total}`, stats.pct, PMY],
          ['Etapas activas', `${STAGES.filter(s => (data[s.id]?.status || '') === 'active').length}/5`, STAGES.filter(s => data[s.id]?.status === 'active').length / 5 * 100, '#3B82F6'],
          ['Etapas completas', `${STAGES.filter(s => (data[s.id]?.status || '') === 'done').length}/5`, STAGES.filter(s => data[s.id]?.status === 'done').length / 5 * 100, '#22C55E'],
        ].map(([l, v, p, c]) => (
          <div key={l} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5 }}>{l}</div>
            <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: c, lineHeight: 1, marginBottom: 6 }}>{v}</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 1, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p}%`, background: c, borderRadius: 1, transition: 'width .8s', boxShadow: `0 0 6px ${c}55` }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Flow diagram ── */}
      <div style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '18px 16px', marginBottom: 14, overflowX: 'auto' }}>
        <StageFlow data={data} activeId={activeStageId} onSelect={id => { setActiveStageId(id); setView('detail'); }} />
      </div>

      {/* ── Matrix View ── */}
      {view === 'matrix' ? (
        <div style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '18px', overflowX: 'auto' }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>VISTA COMPLETA · 7 ELEMENTOS × 5 ETAPAS</div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '3px', minWidth: 720 }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', textTransform: 'uppercase', width: 140 }}>ELEMENTO</th>
                {STAGES.map(s => {
                  const pct = stageProgress(data[s.id]);
                  return (
                    <th key={s.id} style={{ padding: '8px 6px', textAlign: 'center', cursor: 'pointer' }} onClick={() => { setActiveStageId(s.id); setView('detail'); }}>
                      <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 12, color: s.color, letterSpacing: '.06em' }}>{s.label}</div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}><Ring pct={pct} color={s.color} size={32} sw={3} /></div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ELEMENTS.map(el => (
                <tr key={el.id}>
                  <td style={{ padding: '8px 10px', background: 'rgba(255,255,255,.03)', borderRadius: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <Ico id={el.icon} size={13} color={el.color} sw={1.6} />
                      <div>
                        <div style={{ fontSize: 11, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,.65)' }}>{el.label}</div>
                        <div style={{ fontSize: 9, fontWeight: 800, color: el.color + '88', letterSpacing: '.1em' }}>{el.tag}</div>
                      </div>
                    </div>
                  </td>
                  {STAGES.map(s => {
                    const elD = data[s.id]?.[el.id] || {};
                    const tasks = elD.tasks || [];
                    const done = tasks.filter(t => t.done).length;
                    const has = elD.notes?.trim() || tasks.length > 0;
                    return (
                      <td key={s.id} style={{ padding: '4px', verticalAlign: 'top', cursor: 'pointer' }}
                        onClick={() => { setActiveStageId(s.id); setOpenPanel(el.id); setView('detail'); }}>
                        <div style={{ background: has ? s.color + '0C' : 'rgba(255,255,255,.02)', border: `1px solid ${has ? s.color + '25' : 'rgba(255,255,255,.05)'}`, borderRadius: 6, padding: '7px 9px', minHeight: 40, transition: 'all .15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = s.color + '18'}
                          onMouseLeave={e => e.currentTarget.style.background = has ? s.color + '0C' : 'rgba(255,255,255,.02)'}>
                          {has ? (
                            <>
                              {tasks.length > 0 && (
                                <div style={{ fontSize: 10, color: s.color, fontFamily: "'Bebas Neue',cursive", letterSpacing: '.04em', marginBottom: 3 }}>{done}/{tasks.length}</div>
                              )}
                              {elD.notes && <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', lineHeight: 1.4, overflow: 'hidden', maxHeight: 32 }}>{elD.notes.slice(0, 55)}{elD.notes.length > 55 ? '…' : ''}</div>}
                            </>
                          ) : (
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 26 }}>
                              <Ico id="plus" size={12} color="rgba(255,255,255,.15)" sw={1.5} />
                            </div>
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
        <>
          {/* Stage tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {STAGES.map(s => {
              const pct = stageProgress(data[s.id]);
              const sc = STATUS_CFG[data[s.id]?.status || 'pending'];
              const isA = activeStageId === s.id;
              return (
                <button key={s.id} onClick={() => setActiveStageId(s.id)}
                  style={{ padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Bebas Neue',cursive", fontSize: 13, letterSpacing: '.05em', border: `1.5px solid ${isA ? s.color : 'rgba(255,255,255,.08)'}`, background: isA ? s.color + '18' : 'rgba(255,255,255,.02)', color: isA ? s.color : 'rgba(255,255,255,.4)', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 7 }}>
                  {s.label}
                  <span style={{ fontSize: 9, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: sc.color, background: sc.color + '1A', padding: '1px 7px', borderRadius: 100 }}>{pct}%</span>
                </button>
              );
            })}
          </div>

          {/* Active stage detail */}
          {activeStage && (
            <div style={{ background: 'rgba(255,255,255,.025)', border: `1px solid ${activeStage.color}1A`, borderRadius: 14, padding: '20px 18px', animation: 'pm4in .2s ease' }}>
              {/* Stage header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Ring pct={stageProgress(sd)} color={activeStage.color} size={64} sw={5} />
                  <div>
                    <div style={{ fontFamily: "'Permanent Marker',cursive", fontSize: 11, color: activeStage.color, opacity: .7, marginBottom: 2 }}>{activeStage.sub}</div>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28, color: '#fff', letterSpacing: '.05em', lineHeight: .95 }}>{activeStage.label}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: "'Space Grotesk',sans-serif", marginTop: 3 }}>ETAPA {activeStage.num} · 5R + 2P</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {Object.entries(STATUS_CFG).map(([k, v]) => (
                    <button key={k} onClick={() => setStatus(activeStageId, k)}
                      style={{ padding: '5px 13px', borderRadius: 100, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", border: `1.5px solid ${sd.status === k ? v.color : 'rgba(255,255,255,.1)'}`, background: sd.status === k ? v.color + '1A' : 'transparent', color: sd.status === k ? v.color : 'rgba(255,255,255,.3)', transition: 'all .15s' }}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7 Elements Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {ELEMENTS.map(el => {
                  const elD = sd[el.id] || {};
                  const tasks = elD.tasks || [];
                  const done = tasks.filter(t => t.done).length;
                  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
                  const hasContent = (elD.notes || '').trim().length > 0 || tasks.length > 0;

                  return (
                    <div key={el.id} className="pm4-el-card"
                      onClick={() => setOpenPanel(el.id)}
                      style={{ background: hasContent ? el.color + '08' : 'rgba(255,255,255,.025)', border: `1px solid ${hasContent ? el.color + '30' : 'rgba(255,255,255,.07)'}`, borderRadius: 11, padding: '14px 15px', position: 'relative', overflow: 'hidden' }}>

                      {/* Top accent */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${el.color},transparent)`, opacity: hasContent ? .7 : .15 }} />

                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: hasContent ? el.color + '18' : 'rgba(255,255,255,.04)', border: `1px solid ${hasContent ? el.color + '30' : 'rgba(255,255,255,.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Ico id={el.icon} size={14} color={hasContent ? el.color : 'rgba(255,255,255,.3)'} sw={1.7} />
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, color: hasContent ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.4)', letterSpacing: '.02em' }}>{el.label}</div>
                            <div style={{ fontSize: 9, fontWeight: 800, color: el.color + (hasContent ? 'CC' : '44'), letterSpacing: '.12em' }}>{el.tag}</div>
                          </div>
                        </div>
                        <div style={{ color: hasContent ? el.color : 'rgba(255,255,255,.2)' }}>
                          <Ico id="chevron" size={13} color="currentColor" sw={2} />
                        </div>
                      </div>

                      {/* Task progress bar */}
                      {tasks.length > 0 ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontFamily: "'Space Grotesk',sans-serif" }}>{done}/{tasks.length} tareas</span>
                            <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 13, color: el.color }}>{pct}%</span>
                          </div>
                          <div style={{ height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: el.color, borderRadius: 2, transition: 'width .4s', boxShadow: pct > 0 ? `0 0 6px ${el.color}66` : 'none' }} />
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', fontStyle: 'italic', lineHeight: 1.4 }}>
                          {hasContent ? (elD.notes || '').slice(0, 48) + ((elD.notes || '').length > 48 ? '…' : '') : 'Click para configurar'}
                        </div>
                      )}

                      {/* Live indicator */}
                      {hasContent && pct === 100 && (
                        <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProcessView;
