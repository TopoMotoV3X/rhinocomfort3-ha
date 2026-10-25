/* Rhinocomfort 3 Card — independent local BLE frontend for Home Assistant.
 * v6.2-fantini-brand-blue-sanitation-toggle | No cloud, no direct BLE access in the browser.
 * Requires an HA fan entity; sanitization switch auto-discovered from the same HA device.
 * Manual sanitization_entity override remains available.
 */
const CARD_TAG = "rhinocomfort3-card";
// The exact Fan app icon supplied by the user, embedded to avoid extra /local assets.
const RHINO_BRAND_ICON = "data:image/webp;base64,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";
const AUTO_LEVELS = Object.freeze({
  0: "OFF", 1: "SLEEP", 2: "VEL2", 3: "VEL3", 4: "BOOST",
});

// UI language follows Home Assistant (hass.locale.language / hass.language).
// Configured titles, subtitles and entity names are user content and stay unchanged.
const RHINO_I18N = Object.freeze({
  "it": {
    "subtitle": "Fantini Cosmi · Bluetooth locale",
    "badConfig": "Configura 'entity' con un'entità fan.* del Rhinocomfort 3",
    "statusMissing": "Entità non trovata",
    "statusUnavailable": "Non disponibile",
    "statusOff": "Ventilazione spenta",
    "statusConnected": "Connesso a Home Assistant",
    "modeUnavailable": "NON DISP.",
    "modeCurrent": "Modalità attuale",
    "modeAuto": "AUTO",
    "modeManual": "MANUALE",
    "modeOff": "OFF",
    "maxLabel": "Limite programmato",
    "maxPending": "in attesa dei dati BLE",
    "deviceOff": "Dispositivo spento",
    "fanControls": "Comandi ventilazione",
    "manualTitle": "Seleziona la velocità manuale",
    "manualControls": "Velocità manuali",
    "speed1": "VEL1",
    "speed2": "VEL2",
    "speed3": "VEL3",
    "sleep": "SLEEP",
    "flowTitle": "Flusso dell'aria",
    "flowIntake": "Immissione",
    "flowExhaust": "Espulsione",
    "flowStopped": "Ventilazione ferma",
    "flowUnavailable": "Flusso non disponibile",
    "flowHintIntake": "Aria dall'esterno verso la stanza",
    "flowHintExhaust": "Aria dalla stanza verso l'esterno",
    "flowHintWaiting": "In attesa dello stato Bluetooth",
    "ariaFlowIntake": "Aria che entra nella casa",
    "ariaFlowExhaust": "Aria che esce dalla casa",
    "sanitization": "Sanificazione",
    "saniMissing": "Da collegare all'integrazione",
    "saniUnavailable": "Entità non disponibile",
    "saniOn": "Attiva",
    "saniOff": "Disattivata",
    "notFound": "Entità ventilatore non trovata",
    "waitingAutoNotice": "Per mostrare il limite AUTO serve la lettura dello stato BLE.",
    "commandFailed": "Comando non riuscito",
    "unknownError": "errore sconosciuto"
  },
  "en": {
    "subtitle": "Fantini Cosmi · Local Bluetooth",
    "badConfig": "Set 'entity' to a Rhinocomfort 3 fan.* entity",
    "statusMissing": "Entity not found",
    "statusUnavailable": "Unavailable",
    "statusOff": "Ventilation off",
    "statusConnected": "Connected to Home Assistant",
    "modeUnavailable": "UNAVAILABLE",
    "modeCurrent": "Current mode",
    "modeAuto": "AUTO",
    "modeManual": "MANUAL",
    "modeOff": "OFF",
    "maxLabel": "Programmed limit",
    "maxPending": "waiting for BLE data",
    "deviceOff": "Device off",
    "fanControls": "Ventilation controls",
    "manualTitle": "Select manual fan speed",
    "manualControls": "Manual speeds",
    "speed1": "SPEED 1",
    "speed2": "SPEED 2",
    "speed3": "SPEED 3",
    "sleep": "SLEEP",
    "flowTitle": "Airflow",
    "flowIntake": "Intake",
    "flowExhaust": "Exhaust",
    "flowStopped": "Ventilation stopped",
    "flowUnavailable": "Airflow unavailable",
    "flowHintIntake": "Air from outside into the room",
    "flowHintExhaust": "Air from the room to outside",
    "flowHintWaiting": "Waiting for Bluetooth status",
    "ariaFlowIntake": "Air entering the home",
    "ariaFlowExhaust": "Air leaving the home",
    "sanitization": "Sanitization",
    "saniMissing": "Not linked to the integration",
    "saniUnavailable": "Entity unavailable",
    "saniOn": "On",
    "saniOff": "Off",
    "notFound": "Fan entity not found",
    "waitingAutoNotice": "BLE operating-state data is needed to show the AUTO limit.",
    "commandFailed": "Command failed",
    "unknownError": "unknown error"
  },
  "fr": {
    "subtitle": "Fantini Cosmi · Bluetooth local",
    "badConfig": "Configurez 'entity' avec une entité fan.* du Rhinocomfort 3",
    "statusMissing": "Entité introuvable",
    "statusUnavailable": "Indisponible",
    "statusOff": "Ventilation arrêtée",
    "statusConnected": "Connecté à Home Assistant",
    "modeUnavailable": "INDISP.",
    "modeCurrent": "Mode actuel",
    "modeAuto": "AUTO",
    "modeManual": "MANUEL",
    "modeOff": "ARRÊT",
    "maxLabel": "Limite programmée",
    "maxPending": "en attente des données BLE",
    "deviceOff": "Appareil éteint",
    "fanControls": "Commandes de ventilation",
    "manualTitle": "Choisir la vitesse manuelle",
    "manualControls": "Vitesses manuelles",
    "speed1": "VIT. 1",
    "speed2": "VIT. 2",
    "speed3": "VIT. 3",
    "sleep": "SLEEP",
    "flowTitle": "Flux d’air",
    "flowIntake": "Insufflation",
    "flowExhaust": "Extraction",
    "flowStopped": "Ventilation arrêtée",
    "flowUnavailable": "Flux indisponible",
    "flowHintIntake": "Air extérieur entrant dans la pièce",
    "flowHintExhaust": "Air de la pièce évacué vers l’extérieur",
    "flowHintWaiting": "En attente des données Bluetooth",
    "ariaFlowIntake": "Air entrant dans la maison",
    "ariaFlowExhaust": "Air sortant de la maison",
    "sanitization": "Assainissement",
    "saniMissing": "Non relié à l’intégration",
    "saniUnavailable": "Entité indisponible",
    "saniOn": "Activé",
    "saniOff": "Désactivé",
    "notFound": "Entité ventilateur introuvable",
    "waitingAutoNotice": "Les données BLE sont nécessaires pour afficher la limite AUTO.",
    "commandFailed": "Commande échouée",
    "unknownError": "erreur inconnue"
  },
  "de": {
    "subtitle": "Fantini Cosmi · Lokales Bluetooth",
    "badConfig": "'entity' muss ein Rhinocomfort 3 fan.*-Eintrag sein",
    "statusMissing": "Entität nicht gefunden",
    "statusUnavailable": "Nicht verfügbar",
    "statusOff": "Lüftung aus",
    "statusConnected": "Mit Home Assistant verbunden",
    "modeUnavailable": "NICHT VERF.",
    "modeCurrent": "Aktueller Modus",
    "modeAuto": "AUTO",
    "modeManual": "MANUELL",
    "modeOff": "AUS",
    "maxLabel": "Eingestellte Obergrenze",
    "maxPending": "warte auf BLE-Daten",
    "deviceOff": "Gerät ausgeschaltet",
    "fanControls": "Lüftungssteuerung",
    "manualTitle": "Manuelle Lüfterstufe wählen",
    "manualControls": "Manuelle Stufen",
    "speed1": "STUFE 1",
    "speed2": "STUFE 2",
    "speed3": "STUFE 3",
    "sleep": "SLEEP",
    "flowTitle": "Luftstrom",
    "flowIntake": "Zuluft",
    "flowExhaust": "Abluft",
    "flowStopped": "Lüftung steht",
    "flowUnavailable": "Luftstrom nicht verfügbar",
    "flowHintIntake": "Außenluft strömt in den Raum",
    "flowHintExhaust": "Raumluft strömt nach draußen",
    "flowHintWaiting": "Warte auf Bluetooth-Status",
    "ariaFlowIntake": "Luft strömt ins Haus",
    "ariaFlowExhaust": "Luft strömt aus dem Haus",
    "sanitization": "Desinfektion",
    "saniMissing": "Nicht mit der Integration verknüpft",
    "saniUnavailable": "Entität nicht verfügbar",
    "saniOn": "Ein",
    "saniOff": "Aus",
    "notFound": "Lüfter-Entität nicht gefunden",
    "waitingAutoNotice": "Zum Anzeigen der AUTO-Grenze werden BLE-Statusdaten benötigt.",
    "commandFailed": "Befehl fehlgeschlagen",
    "unknownError": "unbekannter Fehler"
  },
  "es": {
    "subtitle": "Fantini Cosmi · Bluetooth local",
    "badConfig": "Configura 'entity' con una entidad fan.* de Rhinocomfort 3",
    "statusMissing": "Entidad no encontrada",
    "statusUnavailable": "No disponible",
    "statusOff": "Ventilación apagada",
    "statusConnected": "Conectado a Home Assistant",
    "modeUnavailable": "NO DISP.",
    "modeCurrent": "Modo actual",
    "modeAuto": "AUTO",
    "modeManual": "MANUAL",
    "modeOff": "APAGADO",
    "maxLabel": "Límite programado",
    "maxPending": "esperando datos BLE",
    "deviceOff": "Dispositivo apagado",
    "fanControls": "Controles de ventilación",
    "manualTitle": "Elige la velocidad manual",
    "manualControls": "Velocidades manuales",
    "speed1": "VEL. 1",
    "speed2": "VEL. 2",
    "speed3": "VEL. 3",
    "sleep": "SLEEP",
    "flowTitle": "Flujo de aire",
    "flowIntake": "Entrada",
    "flowExhaust": "Extracción",
    "flowStopped": "Ventilación detenida",
    "flowUnavailable": "Flujo no disponible",
    "flowHintIntake": "Aire del exterior hacia la habitación",
    "flowHintExhaust": "Aire de la habitación hacia el exterior",
    "flowHintWaiting": "Esperando estado Bluetooth",
    "ariaFlowIntake": "El aire entra en la casa",
    "ariaFlowExhaust": "El aire sale de la casa",
    "sanitization": "Sanitización",
    "saniMissing": "No vinculada a la integración",
    "saniUnavailable": "Entidad no disponible",
    "saniOn": "Activada",
    "saniOff": "Desactivada",
    "notFound": "Entidad del ventilador no encontrada",
    "waitingAutoNotice": "Se necesitan datos BLE para mostrar el límite AUTO.",
    "commandFailed": "Error al enviar el comando",
    "unknownError": "error desconocido"
  },
  "pt": {
    "subtitle": "Fantini Cosmi · Bluetooth local",
    "badConfig": "Defina 'entity' como uma entidade fan.* do Rhinocomfort 3",
    "statusMissing": "Entidade não encontrada",
    "statusUnavailable": "Indisponível",
    "statusOff": "Ventilação desligada",
    "statusConnected": "Ligado ao Home Assistant",
    "modeUnavailable": "INDISP.",
    "modeCurrent": "Modo atual",
    "modeAuto": "AUTO",
    "modeManual": "MANUAL",
    "modeOff": "DESLIG.",
    "maxLabel": "Limite programado",
    "maxPending": "aguardando dados BLE",
    "deviceOff": "Dispositivo desligado",
    "fanControls": "Controlos de ventilação",
    "manualTitle": "Selecionar velocidade manual",
    "manualControls": "Velocidades manuais",
    "speed1": "VEL. 1",
    "speed2": "VEL. 2",
    "speed3": "VEL. 3",
    "sleep": "SLEEP",
    "flowTitle": "Fluxo de ar",
    "flowIntake": "Entrada",
    "flowExhaust": "Extração",
    "flowStopped": "Ventilação parada",
    "flowUnavailable": "Fluxo indisponível",
    "flowHintIntake": "Ar exterior a entrar na divisão",
    "flowHintExhaust": "Ar da divisão a sair para o exterior",
    "flowHintWaiting": "A aguardar estado Bluetooth",
    "ariaFlowIntake": "Ar a entrar em casa",
    "ariaFlowExhaust": "Ar a sair de casa",
    "sanitization": "Sanitização",
    "saniMissing": "Não ligada à integração",
    "saniUnavailable": "Entidade indisponível",
    "saniOn": "Ativa",
    "saniOff": "Desativada",
    "notFound": "Entidade do ventilador não encontrada",
    "waitingAutoNotice": "São necessários dados BLE para mostrar o limite AUTO.",
    "commandFailed": "Falha no comando",
    "unknownError": "erro desconhecido"
  },
  "nl": {
    "subtitle": "Fantini Cosmi · Lokale Bluetooth",
    "badConfig": "Stel 'entity' in op een Rhinocomfort 3 fan.*-entiteit",
    "statusMissing": "Entiteit niet gevonden",
    "statusUnavailable": "Niet beschikbaar",
    "statusOff": "Ventilatie uit",
    "statusConnected": "Verbonden met Home Assistant",
    "modeUnavailable": "NIET BESCH.",
    "modeCurrent": "Huidige modus",
    "modeAuto": "AUTO",
    "modeManual": "HANDMATIG",
    "modeOff": "UIT",
    "maxLabel": "Ingestelde bovengrens",
    "maxPending": "wachten op BLE-gegevens",
    "deviceOff": "Apparaat uit",
    "fanControls": "Ventilatiebediening",
    "manualTitle": "Handmatige snelheid kiezen",
    "manualControls": "Handmatige snelheden",
    "speed1": "STAND 1",
    "speed2": "STAND 2",
    "speed3": "STAND 3",
    "sleep": "SLEEP",
    "flowTitle": "Luchtstroom",
    "flowIntake": "Toevoer",
    "flowExhaust": "Afvoer",
    "flowStopped": "Ventilatie gestopt",
    "flowUnavailable": "Luchtstroom niet beschikbaar",
    "flowHintIntake": "Buitenlucht stroomt de kamer in",
    "flowHintExhaust": "Kamerlucht stroomt naar buiten",
    "flowHintWaiting": "Wachten op Bluetooth-status",
    "ariaFlowIntake": "Lucht stroomt het huis in",
    "ariaFlowExhaust": "Lucht stroomt het huis uit",
    "sanitization": "Sanitatie",
    "saniMissing": "Niet gekoppeld aan integratie",
    "saniUnavailable": "Entiteit niet beschikbaar",
    "saniOn": "Aan",
    "saniOff": "Uit",
    "notFound": "Ventilator-entiteit niet gevonden",
    "waitingAutoNotice": "BLE-statusgegevens zijn nodig voor de AUTO-limiet.",
    "commandFailed": "Opdracht mislukt",
    "unknownError": "onbekende fout"
  }
});
function rhinoLanguage(hass, configured) {
  const code = String(configured || hass?.locale?.language || hass?.language || navigator.language || "en")
    .toLowerCase().replace(/_/g, "-").split("-")[0];
  return Object.hasOwn(RHINO_I18N, code) ? code : "en";
}
function rhinoAutoLabel(value, t) {
  const code = String(value ?? "").toUpperCase().replace(/\s+/g, "");
  return ({OFF:t.modeOff, SLEEP:t.sleep, VEL2:t.speed2, VEL3:t.speed3, BOOST:"BOOST", VEL1:t.speed1})[code] || String(value ?? "");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}
function readState(raw) {
  // ATT handle 0x002c; 3rd byte's direction was verified physically.
  // 2nd byte has reported 0x30..34 and 0x70..74 during AUTO.
  if (typeof raw !== "string") return null;
  const hex = raw.trim().replace(/(?:0x|[\s:\-])/gi, "").toLowerCase();
  if (!/^[0-9a-f]{6,}$/.test(hex) || hex.length % 2) return null;
  const bytes = hex.match(/../g).map(b => parseInt(b, 16));
  const prefix = bytes[0] & 0x0f;
  const group = bytes[1] & 0x30;
  const level = bytes[1] & 0x0f;
  return {
    raw: hex,
    direction: bytes[2] === 1 ? "out" : bytes[2] === 2 ? "in" : null,
    autoMax: prefix === 4 && group === 0x30 &&
      Object.hasOwn(AUTO_LEVELS, level) ? AUTO_LEVELS[level] : null,
  };
}
function flowGraphic(direction, t) {
  // Both arrows stay LEFT of the house. IN points right; OUT points left.
  // Movement is an HTML overlay for better iOS Safari support.
  const into = direction === "in";
  // Blue matches the supplied Fan logo (#004C92); orange differentiates exhaust.
  // The same house geometry, frame and airflow paths are used for both directions.
  const highlight = into ? "#004C92" : "#F47D20";
  const light = into ? "#65C3FA" : "#FFCB9B";
  const tag = into ? "i" : "o";
  // Same bounding area (x=8..78) on both directions; only arrowhead changes.
  const arrow = into
    ? '<path d="M8 59 H52 V45 L78 69 L52 93 V79 H8 Z"/>'
    : '<path d="M78 59 H34 V45 L8 69 L34 93 V79 H78 Z"/>';
  // Identical, neutral airflow traces to the left of the house in both modes.
  const streams = '<path class="windline" d="M1 41 C21 41 28 56 49 59"/><path class="windline delay" d="M1 99 C20 99 30 82 49 79"/>';
  return `<span class="air-graphic ${into ? "intake" : "exhaust"}" role="img" aria-label="${escapeHtml(into ? t.ariaFlowIntake : t.ariaFlowExhaust)}">
    <svg class="air-visual" viewBox="0 0 168 140" aria-hidden="true">
      <path d="M42 62 L84 24 L126 62 V116 H42 Z" fill="none" stroke="rgba(230,243,253,.66)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 62 L84 24 L126 62 V116 H42 Z" fill="none" stroke="#3a5971" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 66 L84 24 L130 66" fill="none" stroke="#c0d9ea" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 66 L84 24 L130 66" fill="none" stroke="#314e67" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <g stroke="#91B4C8" stroke-width="5" stroke-linecap="round" fill="none" opacity=".77">${streams}</g>
    </svg>
    <span class="air-arrow-layer" aria-hidden="true">
      <svg class="air-arrow-svg" viewBox="0 0 168 140" aria-hidden="true">
        <defs><linearGradient id="rhino-arrow-${tag}" x1="0%" x2="100%"><stop stop-color="${light}"/><stop offset="1" stop-color="${highlight}"/></linearGradient></defs>
        <g fill="url(#rhino-arrow-${tag})" stroke="white" stroke-width="2.5" stroke-linejoin="round">${arrow}</g>
      </svg>
    </span>
  </span>`;
}

// Minimal in-place DOM update. Identical animated SVG nodes are never recreated.
function rhinoPatchNode(current, next) {
  if (current.isEqualNode(next)) return;
  if (current.nodeType !== next.nodeType || current.nodeName !== next.nodeName) {
    current.replaceWith(next.cloneNode(true));
    return;
  }
  if (current.nodeType === 3 || current.nodeType === 8) {
    current.nodeValue = next.nodeValue;
    return;
  }
  if (current.nodeType !== 1) return;
  for (const attribute of Array.from(current.attributes)) {
    if (!next.hasAttribute(attribute.name)) current.removeAttribute(attribute.name);
  }
  for (const attribute of Array.from(next.attributes)) {
    if (current.getAttribute(attribute.name) !== attribute.value) {
      current.setAttribute(attribute.name, attribute.value);
    }
  }
  const oldChildren = Array.from(current.childNodes);
  const newChildren = Array.from(next.childNodes);
  for (let i = 0; i < newChildren.length; i++) {
    if (oldChildren[i]) rhinoPatchNode(oldChildren[i], newChildren[i]);
    else current.appendChild(newChildren[i].cloneNode(true));
  }
  for (let i = newChildren.length; i < oldChildren.length; i++) oldChildren[i].remove();
}

const STYLES = `
/* Brand blue sampled from the original Fan icon embedded above: #004C92. */
:host{--rhino-brand-blue:#004C92;display:block;font-family:Arial,Helvetica,sans-serif;color:var(--primary-text-color,#253244);min-width:0}
*{box-sizing:border-box}
ha-card{display:block;overflow:hidden;border-radius:23px;background:var(--card-background-color,#fff);box-shadow:0 12px 36px rgba(18,52,81,.08);border:1px solid var(--divider-color,rgba(86,119,152,.17))}
.wrapper{padding:20px;display:grid;gap:14px}
.top{display:flex;align-items:center;gap:12px}
.device-dot{width:47px;height:47px;display:grid;place-items:center;border-radius:13px;background:var(--rhino-brand-blue);overflow:hidden;flex:none}
.device-dot img{width:100%;height:100%;display:block;object-fit:cover}
.heading{min-width:0;flex:1}
.heading h2{margin:0;font-size:18px;font-weight:700;line-height:1.2;letter-spacing:-.35px}
.heading p{margin:4px 0 0;color:var(--secondary-text-color,#768392);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.status-dot{width:8px;height:8px;background:#23aa82;border-radius:50%;box-shadow:0 0 0 4px #24a9831a;flex:none}
.status-dot.off{background:#a1a9b6;box-shadow:0 0 0 4px #9aa5b61b}
.hero{position:relative;overflow:hidden;border-radius:19px;background:var(--rhino-brand-blue);color:#fff;padding:18px 19px;min-height:102px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.hero:after{position:absolute;content:"";right:-60px;top:-84px;width:230px;height:230px;border-radius:50%;border:30px solid #ffffff12}
.hero-text{position:relative;z-index:1}
.hero .eyebrow{font-size:10px;font-weight:700;letter-spacing:1.5px;color:#c3e9ff;text-transform:uppercase}
.hero .mode{font-size:31px;line-height:1.22;margin:5px 0 3px;font-weight:700;letter-spacing:-.6px}
.hero .detail{font-size:13px;color:#e4f6ff;min-height:16px}
.hero-icon{opacity:.76;position:relative;z-index:1;width:47px;height:47px;flex:none}
.mode-switch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
/* All three principal mode buttons use exactly the Fan-logo blue and white labels.
   Selected state changes its outline, not its background hue. */
.mode-switch button{font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;padding:12px 3px;border-radius:12px;background:var(--rhino-brand-blue);border:2px solid rgba(255,255,255,.20);color:#fff;cursor:pointer;transition:border-color .18s,box-shadow .18s,transform .12s}
.mode-switch button.active{background:var(--rhino-brand-blue);border-color:#fff;color:#fff;box-shadow:0 0 0 2px rgba(0,76,146,.25),inset 0 0 0 1px rgba(255,255,255,.25)}
.mode-switch button.preparing{border-color:#79d5ff;border-style:dashed;box-shadow:0 0 0 1px rgba(121,213,255,.28)}
.mode-switch button:active,.manual-grid button:active{transform:scale(.97)}
button:focus-visible{outline:3px solid var(--accent-color,#2095d7);outline-offset:2px}
button:disabled{opacity:.42;cursor:not-allowed}
[hidden]{display:none!important}
.manual-panel{border:1px solid var(--divider-color,#dae5ed);background:var(--secondary-background-color,#f7f9fc);padding:12px;border-radius:15px}
.manual-heading{font-size:12px;color:var(--secondary-text-color,#687b8f);font-weight:650;margin:0 0 11px}
.manual-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.manual-grid button{font:inherit;font-size:12px;font-weight:730;padding:12px 1px;border-radius:11px;border:1px solid var(--divider-color,#dbe7ef);color:var(--primary-text-color,#364e60);background:var(--card-background-color,#fff);cursor:pointer;transition:transform .12s}
.manual-grid button.selected{background:var(--rhino-brand-blue);border-color:var(--rhino-brand-blue);color:#fff}
.flow-card{border:1px solid var(--divider-color,#e0e8ee);background:var(--secondary-background-color,#f8fafc);border-radius:17px;padding:12px 15px;display:flex;align-items:center;gap:14px;min-height:115px}
.air-picture{width:110px;height:93px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid rgba(128,163,186,.44);box-shadow:inset 0 0 0 1px rgba(243,250,255,.045);flex:none;overflow:hidden}
/* Exhaust uses the very same house frame and outline as intake. */
.air-picture.exhaust{background:transparent;border-color:rgba(128,163,186,.44)}
.air-picture.unknown{background:transparent;border-color:rgba(128,163,186,.32)}
.air-graphic{position:relative;display:block;width:110px;height:89px;flex:none;isolation:isolate}
.air-visual,.air-arrow-svg{display:block;width:100%;height:100%;overflow:visible}
.air-visual{filter:drop-shadow(0 1px 2px rgba(18,54,84,.25))}
.air-arrow-layer{position:absolute;inset:0;display:block;pointer-events:none;will-change:transform;transform:translate3d(0,0,0);-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:rhino-arrow-in 1.6s ease-in-out infinite alternate}
.exhaust .air-arrow-layer{animation-name:rhino-arrow-out}
.windline{animation:wind-pulse 2.2s ease-in-out infinite}.windline.delay{animation-delay:-1.1s}
@keyframes rhino-arrow-in{from{transform:translate3d(-5px,0,0)}to{transform:translate3d(5px,0,0)}}
@keyframes rhino-arrow-out{from{transform:translate3d(5px,0,0)}to{transform:translate3d(-5px,0,0)}}
@keyframes wind-pulse{0%,100%{opacity:.32}50%{opacity:.94}}
.flow-info{min-width:0;flex:1}
.smallcaps{font-size:10px;letter-spacing:1.5px;font-weight:700;color:var(--secondary-text-color,#72859a);text-transform:uppercase}
.flow-name{margin-top:6px;font-weight:700;font-size:17px;letter-spacing:-.3px}
.flow-description{margin-top:6px;font-size:11px;color:var(--secondary-text-color,#798896);line-height:1.4}
.sanitation{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:8px 2px 0}
.sani-left{display:flex;align-items:center;gap:11px;min-width:0}
/* Shield only: no tile behind the icon. Glow follows the actual switch entity. */
.sani-icon{width:38px;height:38px;display:grid;place-items:center;flex:none;background:none;border:0;border-radius:0;transition:color .25s ease,opacity .25s ease}
.sani-icon svg{width:30px;height:30px;display:block}
.sani-icon.on{color:#27dba0;opacity:1}
.sani-icon.on svg{filter:drop-shadow(0 0 4px #21d89d70) drop-shadow(0 0 10px #12cb8c48);animation:rhino-sani-glow 2.8s ease-in-out infinite alternate}
.sani-icon.off{color:#82919a;opacity:.46}
.sani-icon.unavailable{color:#82919a;opacity:.26}
@keyframes rhino-sani-glow{from{filter:drop-shadow(0 0 2px #22c98f55) drop-shadow(0 0 5px #13b87b2b)}to{filter:drop-shadow(0 0 5px #35eeb1d9) drop-shadow(0 0 12px #1bd89b99)}}
.sani-left strong{font-size:13px;font-weight:740}
.sani-left .hint{font-size:11px;color:var(--secondary-text-color,#718396);margin-top:4px}
.toggle{flex:none;width:47px;height:27px;padding:3px;border:0;border-radius:50px;background:#b9c5cf;cursor:pointer;transition:background .2s}
.toggle.on{background:var(--rhino-brand-blue)}
.toggle>span{display:block;width:21px;height:21px;border-radius:50%;background:#fff;box-shadow:0 1px 4px #0003;transition:transform .2s}
.toggle.on>span{transform:translateX(20px)}
.notice{font-size:11px;color:var(--secondary-text-color,#7b8792);padding:0 2px;line-height:1.4}
.error{font-size:11px;padding:9px 12px;border-radius:9px;color:#a83c38;background:#fff0ef}
@media(max-width:340px){.wrapper{padding:13px}.heading h2{font-size:16px}.mode-switch button{font-size:11px}.flow-card{gap:8px}.air-picture{width:95px}.air-graphic{width:93px;height:84px}.flow-name{font-size:15px}}
@media(prefers-reduced-motion:reduce){.air-arrow-layer,.windline,.sani-icon.on svg{animation:none!important}.sani-icon.on svg{filter:drop-shadow(0 0 4px #21d89d70)}}
/* Optional explicit override for iOS users who want arrow motion despite Reduce Motion. */
.force-flow-animation .intake .air-arrow-layer{animation:rhino-arrow-in 1.6s ease-in-out infinite alternate!important}
.force-flow-animation .exhaust .air-arrow-layer{animation:rhino-arrow-out 1.6s ease-in-out infinite alternate!important}
`;

class Rhinocomfort3Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._openManual = false;
    this._busy = false;
    this._error = "";
    this._autoSanitizationEntity = null;
    this._sanitizationLookupFor = null;
    this._sanitizationRegistryFor = null;
    this._lastSanitizationRegistry = null;
    this.shadowRoot.addEventListener("click", event => this._click(event));
  }
  setConfig(config) {
    if (!config?.entity || !String(config.entity).startsWith("fan.")) {
      throw new Error(RHINO_I18N[rhinoLanguage(this._hass, config.language)].badConfig);
    }
    const previousFan = this.config?.entity;
    this.config = { title: "Rhinocomfort 3", ...config };
    if (previousFan !== this.config.entity) {
      this._sanitizationLookupFor = null;
      this._autoSanitizationEntity = null;
      this._sanitizationRegistryFor = null;
      this._lastSanitizationRegistry = null;
    }
    this._ensureSanitizationDiscovery();
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    this._ensureSanitizationDiscovery();
    this._render();
  }
  // A manually configured entity always takes precedence. An explicit empty
  // sanitization_entity also disables automatic discovery.
  _sanitizationEntity() {
    if (Object.prototype.hasOwnProperty.call(this.config || {}, "sanitization_entity")) {
      return this.config.sanitization_entity;
    }
    return this._autoSanitizationEntity;
  }
  _ensureSanitizationDiscovery() {
    if (!this.config || !this._hass ||
        Object.prototype.hasOwnProperty.call(this.config, "sanitization_entity")) return;
    const fanId = this.config.entity;
    const hass = this._hass;
    // Modern Home Assistant supplies the device/entity registry directly to
    // Lovelace cards in hass.entities. Prefer this already-loaded, reactive
    // registry over an additional WebSocket request (which can fail or race).
    const registry = hass.entities;
    if (registry && typeof registry === "object") {
      const fan = registry[fanId];
      if (fan?.platform === "rhinocomfort3_ble" && fan.device_id) {
        if (this._sanitizationRegistryFor === fanId && this._lastSanitizationRegistry === registry) return;
        this._sanitizationRegistryFor = fanId;
        this._lastSanitizationRegistry = registry;
        this._sanitizationLookupFor = null; // invalidate stale WS fallback
        const switches = Object.entries(registry).filter(([id, entry]) =>
          id.startsWith("switch.") && entry?.platform === "rhinocomfort3_ble" &&
          entry.device_id === fan.device_id);
        // Only bind a unique switch on the SAME HA device, never a neighbor.
        const match = switches.length === 1 ? switches[0][0] : null;
        if (match !== this._autoSanitizationEntity) {
          this._autoSanitizationEntity = match;
          this._render();
        }
        return;
      }
    }
    // Compatibility fallback for older HA frontends without hass.entities.
    if (this._sanitizationLookupFor === fanId) return;
    const request = { type: "config/entity_registry/list_for_display" };
    const send = typeof hass.callWS === "function"
      ? hass.callWS.bind(hass)
      : typeof hass.connection?.sendMessagePromise === "function"
        ? hass.connection.sendMessagePromise.bind(hass.connection)
        : null;
    if (!send) return; // The YAML override continues to work on older frontends.
    this._sanitizationLookupFor = fanId;
    // The display registry is available to non-admin users and identifies
    // entities by device ID (di), integration platform (pl) and entity ID (ei).
    Promise.resolve().then(() => send(request)).then(result => {
      if (this.config?.entity !== fanId || this._sanitizationLookupFor !== fanId ||
          Object.prototype.hasOwnProperty.call(this.config, "sanitization_entity")) return;
      const entities = result?.entities;
      if (!Array.isArray(entities)) {
        this._sanitizationLookupFor = null;
        return;
      }
      const matchingFans = entities.filter(e => e.ei === fanId && e.pl === "rhinocomfort3_ble" && e.di);
      if (matchingFans.length !== 1) {
        this._sanitizationLookupFor = null;
        return;
      }
      const deviceId = matchingFans[0].di;
      const switches = entities.filter(e => e.di === deviceId &&
          e.pl === "rhinocomfort3_ble" && typeof e.ei === "string" &&
          e.ei.startsWith("switch."));
      // Never guess which switch to operate if multiple exist on a device.
      if (switches.length !== 1) {
        this._sanitizationLookupFor = null;
        return;
      }
      this._autoSanitizationEntity = switches[0].ei;
      this._render();
    }).catch(() => {
      // Allow a later hass update to retry (e.g. login/socket just restored).
      if (this._sanitizationLookupFor === fanId) this._sanitizationLookupFor = null;
    });
  }
  getCardSize() { return this._openManual ? 6 : 5; }
  static getStubConfig() { return {entity:"fan.rhinocomfort_3"}; }
  _ent(id) { return id ? this._hass?.states?.[id] : null; }
  _getData() {
    const fan = this._ent(this.config.entity);
    if (!fan) return {missing:true};
    const attributes = fan.attributes ?? {};
    const raw = this._ent(this.config.state_entity)?.state ||
      attributes.ble_operating_state || attributes.ble_state_hex ||
      attributes.operating_state_hex || null;
    const parsed = readState(raw);
    const ble = String(attributes.ble_mode_hex || "").toLowerCase();
    const preset = String(attributes.preset_mode || "").toLowerCase();
    const available = !["unavailable","unknown"].includes(fan.state);
    const off = fan.state === "off" || ble === "0000";
    const auto = !off && (ble === "0410" || preset === "auto");
    const sleep = !off && (ble === "0401" || preset === "sleep");
    const percentage = Number(attributes.percentage ?? 0);
    const speed = sleep ? "SLEEP" : percentage <= 33 ? "VEL1" : percentage <= 67 ? "VEL2" : "VEL3";
    const mode = off ? "OFF" : auto ? "AUTO" : "MANUAL";
    const autoMaxEntity = this._ent(this.config.auto_max_entity);
    const autoMax = parsed?.autoMax || (autoMaxEntity && !["unavailable","unknown"].includes(autoMaxEntity.state) ? String(autoMaxEntity.state) : null);
    const directionEntity = this._ent(this.config.direction_entity);
    let direction = parsed?.direction ?? null;
    if (directionEntity && !["unknown","unavailable"].includes(directionEntity.state)) {
      const d = String(directionEntity.state).toLowerCase();
      if (["immissione","in","intake","ingresso"].includes(d)) direction = "in";
      else if (["espulsione","emissione","out","exhaust","uscita"].includes(d)) direction = "out";
    }
    // A stopped fan cannot currently be admitting or expelling air.
    if (off || (auto && autoMax === "OFF")) direction = null;
    const sani = this._ent(this._sanitizationEntity());
    const saniSupported = !!sani && sani.state !== "unavailable" && sani.state !== "unknown";
    return {fan,available,off,auto,mode,sleep,speed,percentage,autoMax,direction,sani,saniSupported};
  }
  _render() {
    if (!this.shadowRoot || !this.config || !this._hass) return;
    const d = this._getData();
    const usable = !!d.fan && d.available && !this._busy;
    const autoCurrent = d.auto;
    const manuallySelected = d.mode === "MANUAL";
    const t = RHINO_I18N[rhinoLanguage(this._hass, this.config.language)];
    const status = d.missing ? t.statusMissing : !d.available ? t.statusUnavailable : d.off ? t.statusOff : t.statusConnected;
    const mainMode = d.missing || !d.available ? t.modeUnavailable : d.off ? t.modeOff : d.auto ? t.modeAuto : t.modeManual;
    const subMode = d.auto ? `${t.maxLabel}: ${d.autoMax ? rhinoAutoLabel(d.autoMax, t) : t.maxPending}` : d.off ? t.deviceOff : d.sleep ? t.sleep : d.percentage <= 33 ? t.speed1 : d.percentage <= 67 ? t.speed2 : t.speed3;
    const dir = d.direction;
    const flowName = dir === "in" ? t.flowIntake : dir === "out" ? t.flowExhaust : d.off || d.autoMax === "OFF" ? t.flowStopped : t.flowUnavailable;
    const flowHint = dir === "in" ? t.flowHintIntake : dir === "out" ? t.flowHintExhaust : t.flowHintWaiting;
    const sanitizationOn = d.sani?.state === "on";
    const saniIconState = !d.saniSupported ? "unavailable" : sanitizationOn ? "on" : "off";
    const saniHint = !this._sanitizationEntity() ? t.saniMissing : !d.saniSupported ? t.saniUnavailable : sanitizationOn ? t.saniOn : t.saniOff;
    const manualButtons = [
      {label:t.sleep,command:"sleep",selected:d.sleep},
      {label:t.speed1,command:"speed1",selected:manuallySelected && !d.sleep && d.percentage <= 33},
      {label:t.speed2,command:"speed2",selected:manuallySelected && !d.sleep && d.percentage > 33 && d.percentage <= 67},
      {label:t.speed3,command:"speed3",selected:manuallySelected && !d.sleep && d.percentage > 67},
    ];
    const html = `<style>${STYLES}</style><ha-card><div class="wrapper ${this.config.force_flow_animation === true ? "force-flow-animation" : ""}">
     <header class="top">
      <span class="device-dot" aria-hidden="true"><img src="${RHINO_BRAND_ICON}" alt=""></span>
      <div class="heading"><h2>${escapeHtml(this.config.title)}</h2><p>${escapeHtml(this.config.subtitle || t.subtitle)}</p></div>
      <span class="status-dot ${d.off || !d.available ? "off" : ""}" title="${escapeHtml(status)}" aria-label="${escapeHtml(status)}"></span>
     </header>
     <section class="hero" aria-label="${escapeHtml(t.modeCurrent)}"><div class="hero-text"><div class="eyebrow">${escapeHtml(t.modeCurrent)}</div><div class="mode">${escapeHtml(mainMode)}</div><div class="detail">${escapeHtml(subMode)}</div></div>
      <svg class="hero-icon" viewBox="0 0 48 48" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M7 22a17 17 0 0 1 30-9M36 6v9h-9M41 26a17 17 0 0 1-30 9M12 42v-9h9"/></svg>
     </section>
     <nav class="mode-switch" aria-label="${escapeHtml(t.fanControls)}">
      <button type="button" data-action="auto" class="${autoCurrent ? "active" : ""}" ${!usable?"disabled":""}>${escapeHtml(t.modeAuto)}</button>
      <button type="button" data-action="manual" aria-expanded="${this._openManual}" class="${manuallySelected ? "active" : this._openManual ? "preparing" : ""}" ${!usable?"disabled":""}>${escapeHtml(t.modeManual)} ${this._openManual ? "−" : "+"}</button>
      <button type="button" data-action="off" class="${d.off ? "active" : ""}" ${!usable?"disabled":""}>${escapeHtml(t.modeOff)}</button>
     </nav>
     <section class="manual-panel" aria-label="${escapeHtml(t.manualControls)}" ${this._openManual ? "" : "hidden"}><div class="manual-heading">${escapeHtml(t.manualTitle)}</div><div class="manual-grid">${manualButtons.map(b=>`<button type="button" data-action="${b.command}" class="${b.selected ? "selected" : ""}" ${!usable?"disabled":""}>${escapeHtml(b.label)}</button>`).join("")}</div></section>
     <section class="flow-card"><div class="air-picture ${dir === "out" ? "exhaust" : !dir ? "unknown" : ""}">${dir ? flowGraphic(dir, t) : `<svg viewBox="0 0 100 100" width="65" height="65" aria-hidden="true" fill="none" stroke="var(--secondary-text-color,#9eafbd)" stroke-width="6" stroke-linejoin="round"><path d="M13 47 L50 15 L87 47 V88 H13 Z"/></svg>`}</div>
      <div class="flow-info"><div class="smallcaps">${escapeHtml(t.flowTitle)}</div><div class="flow-name">${escapeHtml(flowName)}</div><div class="flow-description">${escapeHtml(flowHint)}</div></div></section>
     <div class="sanitation"><div class="sani-left"><div class="sani-icon ${saniIconState}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2L20 5v6c0 5-3 8-8 11-5-3-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg></div><div><strong>${escapeHtml(t.sanitization)}</strong><div class="hint">${escapeHtml(saniHint)}</div></div></div>
      <button type="button" class="toggle ${sanitizationOn ? "on" : ""}" role="switch" aria-label="${escapeHtml(t.sanitization)}" aria-checked="${sanitizationOn}" data-action="sanitization" ${!usable || !d.saniSupported ? "disabled" : ""}><span></span></button>
     </div>
     ${d.missing ? `<p class="error">${escapeHtml(t.notFound)}: ${escapeHtml(this.config.entity)}.</p>` : ""}
     ${this._error ? `<p class="error" role="alert">${escapeHtml(this._error)}</p>` : ""}
     ${d.auto && !d.autoMax ? `<div class="notice">${escapeHtml(t.waitingAutoNotice)}</div>` : ""}
    </div></ha-card>`;
    if (html === this._lastHtml) return;
    this._lastHtml = html;
    const template = document.createElement("template");
    template.innerHTML = html;
    // Do not replace the existing SVG on every HA refresh:
    // keeping its nodes preserves the CSS animation timeline.
    if (!this.shadowRoot.firstChild) {
      this.shadowRoot.replaceChildren(template.content);
    } else {
      const before = Array.from(this.shadowRoot.childNodes);
      const after = Array.from(template.content.childNodes);
      for (let i = 0; i < after.length; i++) {
        if (before[i]) rhinoPatchNode(before[i], after[i]);
        else this.shadowRoot.appendChild(after[i].cloneNode(true));
      }
      for (let i = after.length; i < before.length; i++) before[i].remove();
    }
    this._lastOpenManual = this._openManual;
  }
  async _click(event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn || btn.disabled || !this._hass || this._busy) return;
    const action = btn.dataset.action;
    if (action === "manual") { this._openManual = !this._openManual; this._render(); return; }
    const entity_id = this.config.entity;
    let domain, service, data;
    if (action === "auto") {domain="fan";service="set_preset_mode";data={entity_id,preset_mode:"auto"};}
    else if (action === "off") {domain="fan";service="turn_off";data={entity_id};}
    else if (action === "sleep") {domain="fan";service="set_preset_mode";data={entity_id,preset_mode:"sleep"};}
    else if (["speed1","speed2","speed3"].includes(action)) {domain="fan";service="set_percentage";data={entity_id,percentage:{speed1:33,speed2:67,speed3:100}[action]};}
    else if (action === "sanitization") {
      const sanitizationEntityId = this._sanitizationEntity();
      const sw = this._ent(sanitizationEntityId);
      if (!sw || sw.state === "unavailable") return;
      domain="switch";service=sw.state === "on" ? "turn_off" : "turn_on";data={entity_id:sanitizationEntityId};
    } else return;
    if (action === "auto" || action === "off") this._openManual = false;
    this._busy = true;this._error = "";this._render();
    try {
      await this._hass.callService(domain, service, data);
      if (["sleep","speed1","speed2","speed3"].includes(action)) this._openManual = false;
    } catch(e) { this._error = `${RHINO_I18N[rhinoLanguage(this._hass, this.config.language)].commandFailed}: ${e?.message || RHINO_I18N[rhinoLanguage(this._hass, this.config.language)].unknownError}`; }
    finally {this._busy = false;this._render();}
  }
}
if (!customElements.get(CARD_TAG)) customElements.define(CARD_TAG, Rhinocomfort3Card);
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === CARD_TAG)) {
  window.customCards.push({
    type:CARD_TAG,
    name:"Rhinocomfort 3",
    description:"Fantini Cosmi · ventilazione e sanificazione BLE",
    preview:true,
    getEntitySuggestion:(hass,entityId)=>{
      if (typeof entityId !== "string" || !entityId.startsWith("fan.")) return null;
      // Only our integration; never suggest the card for an unrelated fan.
      const meta=hass?.entities?.[entityId];
      if (!meta || meta.platform !== "rhinocomfort3_ble") return null;
      return {config:{type:"custom:rhinocomfort3-card",entity:entityId}};
    }
  });
}
// Tests may import this class via the registered custom element.
