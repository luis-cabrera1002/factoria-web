'use client';
// ═══ Quote Generator — PDF-ready Branded Quotation ══════════════════════════
import { useState, useEffect as useEffectQ } from 'react';
const QY = '#F5C300', QDK = '#0C0C0E';
const LOGO_SRC = '/uploads/Logo oficial FDI para registrar-de13ff70.png';

const DEFAULT_PRICES = {
  types:[{id:'landing',label:'Landing Page',icon:'🏠',lo:800,hi:1800},{id:'web',label:'Web Corporativa',icon:'🌐',lo:2000,hi:4500},{id:'ecomm',label:'E-Commerce',icon:'🛒',lo:3500,hi:7000},{id:'app',label:'App Móvil',icon:'📱',lo:5000,hi:12000},{id:'saas',label:'SaaS / Sistema',icon:'⚙️',lo:8000,hi:20000},{id:'ia',label:'IA & Automatización',icon:'🤖',lo:3000,hi:9000}],
  features:[{id:'admin',label:'Panel Admin',add:600},{id:'pay',label:'Pagos online',add:700},{id:'ai',label:'Chat con IA',add:900},{id:'multi',label:'Multiidioma',add:350},{id:'seo',label:'SEO avanzado',add:450},{id:'analytics',label:'Analytics',add:350}],
};

const uid = () => Math.random().toString(36).slice(2,7).toUpperCase();

const QuoteView = ({ clients }) => {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [items, setItems] = useState([{ id:uid(), desc:'Desarrollo web profesional', qty:1, price:3500, notes:'' }]);
  const [quoteNotes, setQuoteNotes] = useState('Precios en USD. Incluye 1 ronda de revisiones. 50% al inicio, 50% a la entrega.\nValidez de la cotización: 30 días.');
  const [quoteNum] = useState(() => `FDI-${new Date().getFullYear()}-${Math.floor(Math.random()*900+100)}`);
  const [validity, setValidity] = useState('30 días');
  const [saved, setSaved] = useState(false);

  const client = clients.find(c => c.id === clientId);
  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const tax = 0;
  const total = subtotal + tax;

  const getPrices = () => { try { const s=localStorage.getItem('fdi_prices'); return s?JSON.parse(s):DEFAULT_PRICES; } catch { return DEFAULT_PRICES; } };
  const priceData = getPrices();

  const addItem = () => setItems(prev => [...prev, { id:uid(), desc:'', qty:1, price:0, notes:'' }]);
  const removeItem = id => setItems(prev => prev.filter(it => it.id !== id));
  const updateItem = (id, field, val) => setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: field==='qty'||field==='price' ? parseFloat(val)||0 : val } : it));
  const addPreset = (t) => setItems(prev => [...prev, { id:uid(), desc:t.label, qty:1, price:Math.round((t.lo+t.hi)/2), notes:'' }]);

  const openPrint = () => {
    const date = new Date().toLocaleDateString('es-ES', { day:'2-digit', month:'long', year:'numeric' });
    const rows = items.map(it => `
      <tr>
        <td>${it.desc}${it.notes?`<br><small>${it.notes}</small>`:''}</td>
        <td class="num">${it.qty}</td>
        <td class="num">$${it.price.toLocaleString('es-US')}</td>
        <td class="num strong">$${(it.qty*it.price).toLocaleString('es-US')}</td>
      </tr>`).join('');
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Cotización ${quoteNum} — Factoría de Ideas</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'DM Sans',sans-serif;color:#1A1A1F;background:#fff;padding:0}
  .page{max-width:800px;margin:0 auto;padding:48px 52px}
  /* Header */
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;padding-bottom:28px;border-bottom:3px solid #F5C300}
  .logo-wrap{background:#F5C300;border-radius:6px;padding:4px 10px 6px;display:inline-block;transform:rotate(-1.5deg);box-shadow:2px 3px 0 rgba(0,0,0,.25)}
  .logo-wrap img{height:48px;display:block}
  .doc-info{text-align:right}
  .doc-title{font-family:'Bebas Neue',cursive;font-size:42px;letter-spacing:.05em;color:#0C0C0E;line-height:1}
  .doc-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#6B7280;letter-spacing:.06em;margin-top:4px}
  .doc-date{font-size:13px;color:#9CA3AF;margin-top:2px}
  /* Client + Company */
  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:36px}
  .info-box{background:#F9FAFB;border-radius:10px;padding:18px 20px;border-left:3px solid #F5C300}
  .info-box h4{font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:.1em;color:#9CA3AF;margin-bottom:10px}
  .info-box .name{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:16px;color:#0C0C0E;margin-bottom:4px}
  .info-box .detail{font-size:13px;color:#6B7280;line-height:1.5}
  /* Table */
  table{width:100%;border-collapse:collapse;margin-bottom:8px}
  thead tr{background:#0C0C0E}
  thead th{padding:11px 14px;text-align:left;font-family:'Bebas Neue',cursive;font-size:13px;letter-spacing:.08em;color:#F5C300}
  thead th.num{text-align:right}
  tbody tr{border-bottom:1px solid #F3F4F6}
  tbody tr:nth-child(even){background:#FAFAFA}
  tbody td{padding:12px 14px;font-size:13px;color:#374151;vertical-align:top;line-height:1.5}
  tbody td small{color:#9CA3AF;font-size:11px}
  td.num{text-align:right;font-variant-numeric:tabular-nums}
  td.strong{font-family:'Space Grotesk',sans-serif;font-weight:700;color:#0C0C0E}
  /* Totals */
  .totals{display:flex;justify-content:flex-end;margin-top:0}
  .totals-box{min-width:260px}
  .totals-row{display:flex;justify-content:space-between;padding:8px 14px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6}
  .totals-total{display:flex;justify-content:space-between;padding:14px;background:#0C0C0E;border-radius:0 0 10px 10px;margin-top:0}
  .totals-total .label{font-family:'Bebas Neue',cursive;font-size:20px;color:#F5C300;letter-spacing:.06em}
  .totals-total .amount{font-family:'Bebas Neue',cursive;font-size:26px;color:#F5C300;letter-spacing:.04em}
  /* Notes */
  .notes{background:#F9FAFB;border-radius:10px;padding:18px 20px;margin:28px 0;border-left:3px solid #E5E7EB}
  .notes h4{font-family:'Bebas Neue',cursive;font-size:13px;letter-spacing:.1em;color:#9CA3AF;margin-bottom:8px}
  .notes p{font-size:13px;color:#6B7280;line-height:1.7;white-space:pre-line}
  /* Footer */
  .footer{margin-top:40px;padding-top:20px;border-top:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center}
  .footer-brand{font-family:'Bebas Neue',cursive;font-size:16px;color:#0C0C0E;letter-spacing:.08em}
  .footer-contact{font-size:11px;color:#9CA3AF;text-align:right;line-height:1.6}
  .validity-badge{background:#F5C300;border-radius:6px;padding:6px 14px;font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:.06em;color:#0C0C0E;display:inline-block}
  @media print{body{padding:0}.page{padding:32px 40px}button{display:none!important}}
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo-wrap"><img src="${window.location.origin}${LOGO_SRC}" alt="FDI"/></div>
    <div class="doc-info">
      <div class="doc-title">COTIZACIÓN</div>
      <div class="doc-num">${quoteNum}</div>
      <div class="doc-date">${date}</div>
      <div style="margin-top:10px"><span class="validity-badge">Válido ${validity}</span></div>
    </div>
  </div>
  <div class="info-grid">
    <div class="info-box">
      <h4>PARA</h4>
      <div class="name">${client?.company || 'Cliente'}</div>
      <div class="detail">${client?.name || ''}<br>${client?.email || ''}<br>${client?.phone || ''}</div>
    </div>
    <div class="info-box">
      <h4>DE PARTE DE</h4>
      <div class="name">Factoría de Ideas®</div>
      <div class="detail">luisan.cabrera@gmail.com<br>+34 664 215 489<br>España · Guatemala · Centroamérica</div>
    </div>
  </div>
  <table>
    <thead>
      <tr><th>DESCRIPCIÓN DEL SERVICIO</th><th class="num">CANT.</th><th class="num">PRECIO UNIT.</th><th class="num">TOTAL</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <div class="totals-box">
      <div style="background:#F9FAFB;border-radius:10px 10px 0 0;overflow:hidden">
        <div class="totals-row"><span>Subtotal</span><span>$${subtotal.toLocaleString('es-US')}</span></div>
        ${tax>0?`<div class="totals-row"><span>IVA</span><span>$${tax.toLocaleString('es-US')}</span></div>`:''}
      </div>
      <div class="totals-total"><span class="label">TOTAL</span><span class="amount">$${total.toLocaleString('es-US')}</span></div>
    </div>
  </div>
  ${quoteNotes?`<div class="notes"><h4>TÉRMINOS Y NOTAS</h4><p>${quoteNotes}</p></div>`:''}
  <div class="footer">
    <div><div class="footer-brand">FACTORÍA DE IDEAS®</div><div style="font-size:11px;color:#9CA3AF;margin-top:2px">Transformamos ideas en soluciones digitales</div></div>
    <div class="footer-contact">luisan.cabrera@gmail.com · +34 664 215 489<br>España · Guatemala · Centroamérica</div>
  </div>
</div>
<script>window.onload=()=>window.print();</script>
</body>
</html>`;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
  };

  const sendWA = () => {
    const lines = items.map(it => `• ${it.desc}: $${(it.qty*it.price).toLocaleString()}`).join('\n');
    const msg = `Hola! Te envío la cotización ${quoteNum} para ${client?.company||'tu empresa'}:\n\n${lines}\n\n*TOTAL: $${total.toLocaleString()}*\n\n${quoteNotes}`;
    window.open(`https://wa.me/34664215489?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", color:'#fff' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Permanent Marker',cursive", color:QY, fontSize:12, opacity:.6, marginBottom:2 }}>sin compromiso</div>
          <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:26, color:'#fff', letterSpacing:'.05em', lineHeight:1 }}>GENERADOR DE COTIZACIÓN</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={sendWA} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif", border:'none', background:'#25D366', color:'#fff', transition:'all .15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Enviar por WhatsApp
          </button>
          <button onClick={openPrint} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 22px', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Bebas Neue',cursive", letterSpacing:'.06em', border:'none', background:QY, color:QDK, transition:'all .15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            DESCARGAR PDF
          </button>
        </div>
      </div>

      {/* Form — two columns */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, alignItems:'start' }}>
        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Quote meta */}
          <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'18px 20px' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:15, color:'rgba(255,255,255,.5)', letterSpacing:'.08em', marginBottom:14 }}>INFORMACIÓN GENERAL</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase', display:'block', marginBottom:5 }}>Cliente</label>
                <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{ width:'100%', background:'rgba(255,255,255,.07)', border:'1.5px solid rgba(255,255,255,.1)', borderRadius:7, padding:'9px 12px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'DM Sans',sans-serif", cursor:'pointer' }}>
                  {clients.map(c=><option key={c.id} value={c.id} style={{background:'#1A1A1F'}}>{c.company}</option>)}
                  <option value="" style={{background:'#1A1A1F'}}>Cliente nuevo</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase', display:'block', marginBottom:5 }}>N° Cotización</label>
                <div style={{ background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.08)', borderRadius:7, padding:'9px 12px', fontSize:13, color:QY, fontFamily:"'Bebas Neue',cursive", letterSpacing:'.06em' }}>{quoteNum}</div>
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', textTransform:'uppercase', display:'block', marginBottom:5 }}>Validez</label>
                <input value={validity} onChange={e=>setValidity(e.target.value)} style={{ width:'100%', background:'rgba(255,255,255,.07)', border:'1.5px solid rgba(255,255,255,.1)', borderRadius:7, padding:'9px 12px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'DM Sans',sans-serif", boxSizing:'border-box' }}/>
              </div>
            </div>
          </div>

          {/* Line items */}
          <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'18px 20px' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:15, color:'rgba(255,255,255,.5)', letterSpacing:'.08em', marginBottom:14 }}>SERVICIOS</div>
            {/* Header row */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 56px 90px 90px 32px', gap:8, marginBottom:8 }}>
              {['Descripción','Cant.','Precio','Total',''].map(h=><div key={h} style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.3)', letterSpacing:'.08em', textTransform:'uppercase' }}>{h}</div>)}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:12 }}>
              {items.map(it=>(
                <div key={it.id} style={{ display:'grid', gridTemplateColumns:'1fr 56px 90px 90px 32px', gap:8, alignItems:'center' }}>
                  <input value={it.desc} onChange={e=>updateItem(it.id,'desc',e.target.value)} placeholder="Descripción del servicio..."
                    style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.08)', borderRadius:7, padding:'9px 12px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'DM Sans',sans-serif", width:'100%', boxSizing:'border-box' }}/>
                  <input type="number" value={it.qty} onChange={e=>updateItem(it.id,'qty',e.target.value)} min="1"
                    style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.08)', borderRadius:7, padding:'9px 8px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'DM Sans',sans-serif', textAlign:'center", width:'100%', boxSizing:'border-box', textAlign:'center' }}/>
                  <input type="number" value={it.price} onChange={e=>updateItem(it.id,'price',e.target.value)} min="0" placeholder="0"
                    style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.08)', borderRadius:7, padding:'9px 8px', color:'#fff', fontSize:13, outline:'none', fontFamily:"'DM Sans',sans-serif", width:'100%', boxSizing:'border-box', textAlign:'right' }}/>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:QY, textAlign:'right' }}>${(it.qty*it.price).toLocaleString()}</div>
                  <button onClick={()=>removeItem(it.id)} style={{ background:'rgba(239,68,68,.12)', border:'1px solid rgba(239,68,68,.2)', borderRadius:7, width:30, height:30, cursor:'pointer', color:'#EF4444', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
                </div>
              ))}
            </div>
            <button onClick={addItem} style={{ background:'rgba(255,255,255,.05)', border:'1.5px dashed rgba(255,255,255,.15)', borderRadius:8, padding:'9px 18px', color:'rgba(255,255,255,.5)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", width:'100%', transition:'all .15s' }}>
              + Añadir línea
            </button>
          </div>

          {/* Notes */}
          <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'18px 20px' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:15, color:'rgba(255,255,255,.5)', letterSpacing:'.08em', marginBottom:10 }}>TÉRMINOS Y NOTAS</div>
            <textarea value={quoteNotes} onChange={e=>setQuoteNotes(e.target.value)}
              style={{ width:'100%', background:'transparent', border:'none', outline:'none', color:'rgba(255,255,255,.7)', fontSize:13, lineHeight:1.65, resize:'vertical', fontFamily:"'DM Sans',sans-serif", minHeight:80, boxSizing:'border-box' }}/>
          </div>
        </div>

        {/* RIGHT — Summary + Presets */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Total card */}
          <div style={{ background:`linear-gradient(135deg,${QDK},#1A1A1F)`, border:`1px solid ${QY}22`, borderRadius:14, padding:'22px', textAlign:'center' }}>
            <div style={{ fontSize:11, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'rgba(255,255,255,.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>TOTAL COTIZACIÓN</div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:44, color:QY, lineHeight:1, marginBottom:4, letterSpacing:'.03em' }}>${total.toLocaleString()}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.4)' }}>{items.length} línea{items.length!==1?'s':''} · Válido {validity}</div>
            {client && (
              <div style={{ marginTop:14, padding:'10px 14px', background:'rgba(255,255,255,.05)', borderRadius:8 }}>
                <div style={{ fontWeight:700, fontSize:13, color:'#fff' }}>{client.company}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.4)' }}>{client.name}</div>
              </div>
            )}
          </div>

          {/* Presets from price editor */}
          <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'16px' }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:14, color:'rgba(255,255,255,.4)', letterSpacing:'.08em', marginBottom:12 }}>AGREGAR SERVICIO RÁPIDO</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {priceData.types.map(t=>(
                <button key={t.id} onClick={()=>addPreset(t)}
                  style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:8, padding:'9px 12px', color:'rgba(255,255,255,.7)', fontSize:12, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'all .15s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(245,195,0,.3)';e.currentTarget.style.color='#fff';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.07)';e.currentTarget.style.color='rgba(255,255,255,.7)';}}>
                  <span>{t.label}</span>
                  <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:13, color:QY }}>${Math.round((t.lo+t.hi)/2).toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button onClick={openPrint}
            style={{ background:QY, color:QDK, border:'none', borderRadius:10, padding:'16px', fontFamily:"'Bebas Neue',cursive", fontSize:20, letterSpacing:'.08em', cursor:'pointer', width:'100%', transition:'all .15s', boxShadow:`0 0 24px ${QY}33` }}>
            GENERAR PDF →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteView;
