'use strict';
const { $, $$, esc, kopiraj, ikona } = AB;

const SKUPOVI = {
  velika: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  mala: 'abcdefghijklmnopqrstuvwxyz',
  brojke: '0123456789',
  simboli: '!@#$%^&*()-_=+[]{};:,.?/~',
};
const SLICNI = /[Il1O0o|]/g;

// nepristran slučajan cijeli broj 0 … n-1
function slucajan(n) {
  const granica = Math.floor(0x100000000 / n) * n, b = new Uint32Array(1);
  do crypto.getRandomValues(b); while (b[0] >= granica);
  return b[0] % n;
}
const bezKvacica = s => s.replace(/đ/g, 'dj').replace(/Đ/g, 'Dj').normalize('NFD').replace(/\p{M}/gu, '');

function skupovi() {
  const izbaci = new Set($('#izbaci').value);
  return Object.entries(SKUPOVI).filter(([k]) => $('#' + k).checked).map(([, s]) => {
    let z = s;
    if ($('#slicni').checked) z = z.replace(SLICNI, '');
    return [...z].filter(c => !izbaci.has(c)).join('');
  }).filter(Boolean);
}

function nasumicna() {
  const sk = skupovi();
  if (!sk.length) return { lozinka: '', bitova: 0 };
  const sve = sk.join(''), n = +$('#duljina').value;
  let l;
  do { l = Array.from({ length: n }, () => sve[slucajan(sve.length)]).join(''); }
  while (n >= sk.length && !sk.every(s => [...l].some(c => s.includes(c))));
  return { lozinka: l, bitova: n * Math.log2(sve.length) };
}
let popisRijeci = [];
function pripremiRijeci() { popisRijeci = [...new Set(window.RIJECI.map(r => $('#bezKvacica').checked ? bezKvacica(r) : r))]; }
function fraza() {
  const n = +$('#rijeci').value, raz = $('#razdjelnik').value;
  const r = Array.from({ length: n }, () => {
    let w = popisRijeci[slucajan(popisRijeci.length)];
    if ($('#veliko').checked) w = w.charAt(0).toLocaleUpperCase('hr') + w.slice(1);
    return w;
  });
  let bitova = n * Math.log2(popisRijeci.length);
  if ($('#broj').checked) { r.splice(slucajan(r.length + 1), 0, String(slucajan(100))); bitova += Math.log2(100) + Math.log2(n + 1); }
  return { lozinka: r.join(raz), bitova };
}
function pin() {
  const n = +$('#pinDuljina').value;
  return { lozinka: Array.from({ length: n }, () => slucajan(10)).join(''), bitova: n * Math.log2(10) };
}
const nacin = () => document.body.dataset.nacin;
const generiraj = () => ({ nasumicna, fraza, pin })[nacin()]();

function trajanje(bitova) {
  const s = Math.pow(2, bitova - 1) / 1e10;   // napadač s 10 milijardi pokušaja u sekundi
  if (s < 1) return 'trenutačno';
  const J = [[31557600e9, 'milijardi godina'], [31557600e6, 'milijuna godina'], [31557600e3, 'tisuća godina'], [31557600, 'godina'], [86400, 'dana'], [3600, 'sati'], [60, 'minuta'], [1, 'sekundi']];
  for (const [d, n] of J) if (s >= d) { const v = s / d; return (v > 1e6 ? 'više od milijun' : Math.round(v).toLocaleString('hr-HR')) + ' ' + n; }
}
function ocjena(bitova) {
  if (bitova < 28) return ['Vrlo slaba', '#dc2626', 10];
  if (bitova < 40) return ['Slaba', '#ea580c', 30];
  if (bitova < 60) return ['Srednja', '#ca8a04', 55];
  if (bitova < 80) return ['Jaka', '#16a34a', 80];
  return ['Vrlo jaka', '#15803d', 100];
}
function prikaziJacinu(bitova, traka, opis, dodatak = '') {
  const [t, b, p] = ocjena(bitova);
  $(traka).style.width = p + '%'; $(traka).style.background = b;
  $(opis).innerHTML = `<b style="color:${b}">${t}</b> · oko ${Math.round(bitova)} bitova · pogađanje bi trajalo <b>${trajanje(bitova)}</b>${dodatak}`;
}
const oboji = l => [...l].map(c => /\d/.test(c) ? `<span class="br">${c}</span>` : /[\p{L} ]/u.test(c) ? esc(c) : `<span class="zn">${esc(c)}</span>`).join('');

let zadnja = '', lista = [];
function nova() {
  $('#duljinaIzlaz').textContent = $('#duljina').value;
  $('#rijeciIzlaz').textContent = $('#rijeci').value;
  $('#pinIzlaz').textContent = $('#pinDuljina').value;
  const r = generiraj();
  zadnja = r.lozinka;
  $('#lozinka').innerHTML = r.lozinka ? oboji(r.lozinka) : '<span class="napomena">Odaberi barem jednu vrstu znakova.</span>';
  prikaziJacinu(r.bitova, '#traka', '#opisJacine', nacin() === 'fraza' ? ` · popis od ${popisRijeci.length} riječi` : '');
  lista = Array.from({ length: +$('#koliko').value }, () => generiraj().lozinka).filter(Boolean);
  $('#popis').innerHTML = lista.map((l, i) => `<li><span>${esc(l)}</span><button type="button" data-i="${i}" aria-label="Kopiraj">${ikona('kopiraj')}</button></li>`).join('');
}

// ---------- provjera vlastite lozinke ----------
const CESTE = ['lozinka', 'password', 'qwert', 'asdf', 'yxcv', 'zxcv', 'admin', 'zagreb', 'hajduk', 'dinamo', 'volim', 'ljubav', 'sifra', 'šifra', 'test', 'welcome', 'iloveyou', 'abc', 'monkey', 'dragon', 'letmein'];
function procijeni(l) {
  if (!l) return null;
  let skup = 0;
  if (/[a-z]/.test(l)) skup += 26;
  if (/[A-Z]/.test(l)) skup += 26;
  if (/\d/.test(l)) skup += 10;
  if (/[^A-Za-z0-9]/.test(l)) skup += 33;
  let bitova = l.length * Math.log2(Math.max(skup, 1));
  const savjeti = [], m = l.toLowerCase();
  const bezLeet = m.replace(/0/g, 'o').replace(/[1!|]/g, 'i').replace(/3/g, 'e').replace(/[4@]/g, 'a').replace(/[5$]/g, 's').replace(/7/g, 't');
  if ([m, bezLeet].some(x => CESTE.some(c => x.includes(c)) || window.RIJECI.some(r => r.length >= 5 && x.includes(bezKvacica(r))))) { bitova = Math.min(bitova, 25); savjeti.push('sadrži čestu riječ'); }
  if (/(.)\1{2,}/.test(l)) { bitova *= .7; savjeti.push('ponavlja isti znak'); }
  if (/(0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde)/i.test(l)) { bitova *= .6; savjeti.push('sadrži niz (1234, abcd…)'); }
  if (/(19|20)\d\d/.test(l)) { bitova *= .85; savjeti.push('sadrži godinu'); }
  if (/^\d+$/.test(l)) savjeti.push('samo brojke');
  if (l.length < 12) savjeti.push('kraća od 12 znakova');
  return { bitova, savjeti };
}
$('#provjera').addEventListener('input', () => {
  const r = procijeni($('#provjera').value);
  if (!r) { $('#traka2').style.width = '0'; $('#opis2').textContent = 'Provjera se radi samo u ovom pregledniku.'; return; }
  prikaziJacinu(r.bitova, '#traka2', '#opis2', r.savjeti.length ? `<br>Slabosti: ${esc(r.savjeti.join(', '))}.` : '');
});
$('#prikazi').addEventListener('change', e => { $('#provjera').type = e.target.checked ? 'text' : 'password'; });

// ---------- događaji ----------
$$('input[name="nacin"]').forEach(r => r.addEventListener('change', () => { document.body.dataset.nacin = r.value; nova(); }));
$('main').addEventListener('input', e => { if (e.target.id === 'provjera' || e.target.name === 'nacin') return; if (e.target.id === 'bezKvacica') pripremiRijeci(); nova(); });
$('#nova').onclick = nova;
$('#kopiraj').onclick = () => zadnja && kopiraj(zadnja, 'Lozinka je kopirana.');
$('#kopirajSve').onclick = () => kopiraj(lista.join('\n'), 'Sve lozinke su kopirane.');
$('#popis').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) kopiraj(lista[+b.dataset.i], 'Lozinka je kopirana.'); });
pripremiRijeci();
nova();
