/* M. O. Energy Logistics - main script */

/* ---- Core UI ---- */
// Set dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.className = mobileMenu.classList.contains('hidden')
        ? 'fa-solid fa-bars text-2xl'
        : 'fa-solid fa-xmark text-2xl';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    });
});

// Quote estimator state
let activeCategory = 'pms';

/* ---- Quote estimator & WhatsApp hand-off ---- */
const WA="2349031957526",CFG={pms:[1000,100000,1000,10000,"Liters","Estimated Volume (Liters)"],ago:[1000,100000,1000,10000,"Liters","Estimated Volume (Liters)"],dpk:[1000,100000,1000,10000,"Liters","Estimated Volume (Liters)"],lpg:[1000,100000,1000,10000,"Liters","Estimated Volume (Liters)"],logistics:[1,100,1,30,"Tons","Cargo Tonnage"]};
function selectCategory(cat){activeCategory=cat;const c=CFG[cat];
document.querySelectorAll(".cat-btn").forEach(b=>{b.classList.remove("bg-brandRed","bg-brandGreen","bg-blue-600","text-white");b.classList.add("bg-slate-100","text-slate-700")});
const b=document.getElementById("btn-"+cat);b.classList.remove("bg-slate-100","text-slate-700");b.classList.add(cat==="logistics"?"bg-blue-600":"bg-brandRed","text-white");
const r=document.getElementById("volume-range");r.min=c[0];r.max=c[1];r.step=c[2];r.value=c[3];
document.getElementById("quantity-label").textContent=c[5];updateVolume(c[3])}
function updateVolume(v){document.getElementById("quantity-display").textContent=parseInt(v).toLocaleString()+" "+CFG[activeCategory][4]}
function lines(f){return [...f.querySelectorAll("input[type=text],input[type=tel],input[type=email],textarea,select")].map(e=>{const l=e.parentElement.querySelector("label");return (l?l.textContent.trim():"")+": "+e.value}).join("\n")}
function openWA(t){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank")}
function handleQuoteSubmit(e){e.preventDefault();const f=e.target;openWA("Quote request - M. O. Energy Logistics\nCategory: "+activeCategory.toUpperCase()+"\nQuantity: "+document.getElementById("quantity-display").textContent+"\n"+lines(f));f.classList.add("hidden");document.getElementById("quote-success").classList.remove("hidden")}
function handleContactSubmit(e){e.preventDefault();const f=e.target;openWA("Message - M. O. Energy Logistics\n"+lines(f));document.getElementById("contact-success").classList.remove("hidden")}

/* ---- Hero canvas animation ---- */
(function(){
const cv=document.getElementById("energy-flow");if(!cv)return;
const sec=cv.parentElement,ctx=cv.getContext("2d"),still=matchMedia("(prefers-reduced-motion: reduce)").matches;
let W,H,D,P=[],t=0,run=true,raf;
const COLS=["217,37,37","239,68,68","245,158,11","251,191,36"];
function mk(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.6+.6,v:Math.random()*.55+.25,sw:Math.random()*1.2+.3,ph:Math.random()*6.28,c:COLS[Math.random()*COLS.length|0],a:Math.random()*.5+.25}}
function size(){D=Math.min(devicePixelRatio||1,2);W=sec.clientWidth;H=sec.clientHeight;cv.width=W*D;cv.height=H*D;ctx.setTransform(D,0,0,D,0,0);
const n=Math.round(Math.min(70,Math.max(24,W/18)));P=Array.from({length:n},()=>mk(true))}
function wave(off,amp,al,col){ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=16)ctx.lineTo(x,H*.86+Math.sin(x/170+t*.012+off)*amp+Math.sin(x/70+t*.02+off)*amp*.35);ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle="rgba("+col+","+al+")";ctx.fill()}
function frame(){ctx.clearRect(0,0,W,H);
wave(0,14,.10,"217,37,37");wave(2,10,.08,"245,158,11");
ctx.globalCompositeOperation="lighter";
for(const p of P){p.y-=p.v;p.x+=Math.sin(t*.01*p.sw+p.ph)*.35;
const f=Math.min(1,Math.max(0,p.y/H)),al=p.a*(f<.15?f/.15:1)*(p.y>H*.92?(H-p.y)/(H*.08):1);
const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);g.addColorStop(0,"rgba("+p.c+","+al+")");g.addColorStop(1,"rgba("+p.c+",0)");
ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r*5,0,6.283);ctx.fill();
if(p.y<-10)Object.assign(p,mk(false))}
ctx.globalCompositeOperation="source-over";t++}
function loop(){if(!run)return;frame();raf=requestAnimationFrame(loop)}
size();addEventListener("resize",()=>{size();if(still)frame()});
if(still){frame();return}
new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!run){run=true;loop()}else if(!v){run=false;cancelAnimationFrame(raf)}}).observe(sec);
document.addEventListener("visibilitychange",()=>{if(document.hidden){run=false;cancelAnimationFrame(raf)}else if(!run){run=true;loop()}});
loop();
})();

/* ---- Scroll effects, progress bar & WhatsApp button ---- */
(function(){
var d=document,q=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
var bar=d.createElement("div");bar.id="spb";d.body.appendChild(bar);
var wa=d.createElement("a");wa.id="waf";wa.href="https://wa.me/2349031957526";wa.target="_blank";wa.rel="noopener";wa.setAttribute("aria-label","Chat on WhatsApp");wa.innerHTML='<i class="fa-brands fa-whatsapp"></i>';d.body.appendChild(wa);
var hd=d.querySelector("nav")||d.querySelector("header");
function sc(){var s=window.scrollY,m=d.documentElement.scrollHeight-innerHeight;bar.style.width=(m>0?s/m*100:0)+"%";if(hd)hd.classList.toggle("scrolled",s>20)}
addEventListener("scroll",sc,{passive:true});sc();
q("#home h1,#home h2,#home p,#home a,#home button,#home .grid>*").forEach(function(e,i){e.classList.add("hz");e.style.animationDelay=(.15+i*.14)+"s"});
q("#home a[href^='#'],#home button").slice(0,2).forEach(function(e){e.classList.add("shine")});
var t=q("section:not(#home) h2,section:not(#home) h3,section:not(#home) .grid>*,section:not(#home) form,section:not(#home) .max-w-3xl>p");
t=t.filter(function(e){return!e.closest("#home")});
t.forEach(function(e,i){e.classList.add("rv");if(e.parentElement.classList.contains("grid")){e.style.setProperty("--d",(q(":scope>*",e.parentElement).indexOf(e)*.12)+"s")}});
var cnt=function(e){var m=e.textContent.trim().match(/^(\d[\d,]*)(.*)$/);if(!m||e.children.length)return;var n=+m[1].replace(/,/g,""),s=m[2],t0=null;(function f(ts){t0=t0||ts;var p=Math.min((ts-t0)/1400,1);e.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString()+s;if(p<1)requestAnimationFrame(f)})(performance.now())};
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");q("span,div,p",x.target).concat(x.target).filter(function(e){return/^\d[\d,]*[+%]?$/.test(e.textContent.trim())&&!e.children.length}).forEach(cnt);io.unobserve(x.target)}})},{threshold:.15});
t.forEach(function(e){io.observe(e)});
})();

/* =====================================================================
   COOKIE CONSENT + LEGAL DIALOGS
   ===================================================================== */
(function () {
  "use strict";
  var KEY = "moel_cookie_consent", VERSION = 1;
  var d = document, memory = null;

  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }

  /* ---------- consent storage (safe if storage is blocked) ---------- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var c = JSON.parse(raw); if (c && c.v === VERSION) return c; }
    } catch (e) {}
    return memory;
  }
  function writeConsent(analytics) {
    var c = { v: VERSION, essential: true, analytics: !!analytics, ts: new Date().toISOString() };
    memory = c;
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    applyConsent(c);
    return c;
  }

  /* Non-essential scripts must only start from here, after consent. */
  function applyConsent(c) {
    window.MOEL_CONSENT = c;
    d.dispatchEvent(new CustomEvent("moel:consent", { detail: c }));
    if (c && c.analytics) { loadAnalytics(); }
  }
  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    /* No analytics provider is installed yet. When you add one (e.g. Google
       Analytics, Plausible), inject its <script> here so it only loads after
       the visitor opts in. */
  }

  /* ---------- banner ---------- */
  var banner = $("#cookie-banner");
  function showBanner() {
    banner.hidden = false;
    d.body.classList.add("cc-open");
    d.documentElement.style.setProperty("--cc-h", banner.offsetHeight + "px");
  }
  function hideBanner() {
    banner.hidden = true;
    d.body.classList.remove("cc-open");
  }
  addEventListener("resize", function () {
    if (!banner.hidden) d.documentElement.style.setProperty("--cc-h", banner.offsetHeight + "px");
  });

  /* ---------- generic dialog helper (focus trap, Esc, scroll lock) ---------- */
  var openStack = [], lastFocus = null;
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

  function openDialog(overlay) {
    if (!openStack.length) lastFocus = d.activeElement;
    overlay.hidden = false;
    d.body.classList.add("lg-locked");
    if (openStack.indexOf(overlay) < 0) openStack.push(overlay);
    var panel = $(".lg-panel", overlay);
    setTimeout(function () { panel.focus(); }, 0);
  }
  function closeDialog(overlay) {
    overlay.hidden = true;
    openStack = openStack.filter(function (o) { return o !== overlay; });
    if (!openStack.length) {
      d.body.classList.remove("lg-locked");
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    }
  }
  d.addEventListener("keydown", function (e) {
    var top = openStack[openStack.length - 1];
    if (!top) return;
    if (e.key === "Escape") { closeDialog(top); return; }
    if (e.key === "Tab") {
      var items = $$(FOCUSABLE, top).filter(function (el) { return el.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (d.activeElement === first || d.activeElement === $(".lg-panel", top))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $$(".lg-overlay").forEach(function (o) {
    o.addEventListener("mousedown", function (e) { if (e.target === o) closeDialog(o); });
    $$("[data-close]", o).forEach(function (b) { b.addEventListener("click", function () { closeDialog(o); }); });
  });

  /* ---------- legal documents ---------- */
  var legal = $("#legal-modal"), legalTitle = $("#legal-title");
  function showDoc(name) {
    var found = false;
    $$(".lg-doc", legal).forEach(function (doc) {
      var on = doc.id === "doc-" + name;
      doc.hidden = !on;
      if (on) { found = true; legalTitle.textContent = doc.getAttribute("data-title"); }
    });
    if (!found) return showDoc("privacy");
    $$(".lg-tabs button", legal).forEach(function (t) {
      var on = t.getAttribute("data-tab") === name;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    $("#legal-body").scrollTop = 0;
  }
  function openLegal(name) {
    showDoc(name);
    openDialog(legal);
  }
  $$(".lg-tabs button", legal).forEach(function (t) {
    t.addEventListener("click", function () { showDoc(t.getAttribute("data-tab")); });
  });

  /* ---------- preferences ---------- */
  var prefs = $("#cookie-prefs"), analyticsBox = $("#cc-analytics");
  function openPrefs() {
    var c = readConsent();
    analyticsBox.checked = !!(c && c.analytics);
    openDialog(prefs);
  }

  /* ---------- wire up every control by data attributes ---------- */
  d.addEventListener("click", function (e) {
    var l = e.target.closest("[data-legal]");
    if (l) { e.preventDefault(); openLegal(l.getAttribute("data-legal")); return; }

    var b = e.target.closest("[data-cc]");
    if (!b) return;
    e.preventDefault();
    var act = b.getAttribute("data-cc");
    if (act === "accept-all") { writeConsent(true); hideBanner(); closeDialog(prefs); }
    else if (act === "essential-only") { writeConsent(false); hideBanner(); closeDialog(prefs); }
    else if (act === "save") { writeConsent(analyticsBox.checked); hideBanner(); closeDialog(prefs); }
    else if (act === "settings") {
      if (!legal.hidden) closeDialog(legal);
      openPrefs();
    }
  });

  /* ---------- init ---------- */
  var existing = readConsent();
  if (existing) applyConsent(existing); else showBanner();
})();
