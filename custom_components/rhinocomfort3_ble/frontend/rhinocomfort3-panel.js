/* Unofficial Fantini Cosmi Rhinocomfort panel (HA 2026.8+).
 * Activated through device configuration_url; storage dashboards saved only after user confirmation.
 * The embedded original card uses the normal HA callService and hass.entities.
 */
// Per-user language from Home Assistant; no device-language setting is stored.
const RHINO_PANEL_I18N = Object.freeze({
  "en": {
    "missingEntities": "Ventilation or sanitization entity could not be identified",
    "sanitizerUnknown": "Unable to uniquely identify the sanitization entity. No dashboard changes were made.",
    "dashboardGenerated": "Automatically generated or non-editable dashboard",
    "viewInvalid": "Invalid view",
    "viewUnsupported": "This view does not support automatic card insertion",
    "viewDuplicate": "The card is already present in this view",
    "loadCardFailed": "Unable to load the Rhinocomfort card",
    "loadingPanel": "Loading Rhinocomfort panel…",
    "selectDevice": "Select the Rhinocomfort device to open:",
    "noDevice": "No configured Rhinocomfort device available.",
    "yamlCopied": "YAML copied. Open your dashboard editor and paste it as a manual card.",
    "copyManually": "Copy the text manually and paste it into the dashboard editor.",
    "addCard": "Add this card to a dashboard",
    "copyYaml": "Copy card YAML (manual alternative)",
    "intro": "Choose a dashboard and view. Nothing will change without your confirmation.",
    "loadingDashboards": "Loading dashboards…",
    "addTitle": "Add Rhinocomfort to a dashboard",
    "defaultDashboard": "Default dashboard (Home)",
    "chooseDashboard": "Choose dashboard",
    "chooseView": "Choose view",
    "dashboard": "Dashboard",
    "view": "View",
    "confirm": "Confirm and add card",
    "cancel": "Cancel",
    "dashboardsReadError": "Unable to load dashboards: {error}",
    "back": "Go back",
    "loadingDashboard": "Reading dashboard…",
    "dashboardNotEditable": "Dashboard cannot be edited",
    "noCompatibleViews": "The card is already present in every compatible view on this dashboard",
    "noCompatibleView": "No compatible view: open the dashboard editor",
    "viewFallback": "View {number}",
    "chooseViewHint": "Choose a view and press Confirm to add the card.",
    "checkingChanges": "Checking that the dashboard has not changed…",
    "dashboardChanged": "The dashboard changed while you were editing it. Reopen the selection before saving.",
    "successTitle": "Card added successfully",
    "pressOK": "Press OK to return to Devices & services.",
    "openIntegrations": "Open Devices & services →",
    "successFallback": "Card added successfully. Use the link to return to Devices & services.",
    "saveFailed": "Card not added: {error}",
    "reloadDashboard": "Reload dashboard",
    "successDetail": "Rhinocomfort 3 was added to view «{view}» on dashboard «{dashboard}».",
    "selectedDashboard": "selected"
  },
  "it": {
    "missingEntities": "Ventilazione o sanificazione non identificata",
    "sanitizerUnknown": "Impossibile identificare in modo univoco la sanificazione. Nessuna modifica alla plancia.",
    "dashboardGenerated": "Plancia generata o non modificabile",
    "viewInvalid": "Vista non valida",
    "viewUnsupported": "Questa vista non supporta l'aggiunta automatica",
    "viewDuplicate": "La scheda è già presente in questa vista",
    "loadCardFailed": "Impossibile caricare la scheda Rhinocomfort",
    "loadingPanel": "Caricamento pannello Rhinocomfort…",
    "selectDevice": "Seleziona il dispositivo Rhinocomfort da aprire:",
    "noDevice": "Nessun Rhinocomfort configurato disponibile.",
    "yamlCopied": "YAML copiato. Apri l'editor della tua plancia e incollalo come scheda manuale.",
    "copyManually": "Copia manualmente il testo e incollalo nell'editor della plancia.",
    "addCard": "Aggiungi questa scheda alla plancia",
    "copyYaml": "Copia YAML della card (alternativa manuale)",
    "intro": "Scegli una plancia e una vista. Non sarà modificato nulla senza la tua conferma.",
    "loadingDashboards": "Caricamento delle plance…",
    "addTitle": "Aggiungi Rhinocomfort alla plancia",
    "defaultDashboard": "Plancia predefinita (Home)",
    "chooseDashboard": "Scegli la plancia",
    "chooseView": "Scegli la vista",
    "dashboard": "Plancia",
    "view": "Vista",
    "confirm": "Conferma e aggiungi scheda",
    "cancel": "Annulla",
    "dashboardsReadError": "Impossibile leggere le plance: {error}",
    "back": "Torna indietro",
    "loadingDashboard": "Lettura della plancia…",
    "dashboardNotEditable": "Plancia non modificabile",
    "noCompatibleViews": "La scheda è già presente in tutte le viste compatibili di questa plancia",
    "noCompatibleView": "Nessuna vista compatibile: apri l'editor della plancia",
    "viewFallback": "Vista {number}",
    "chooseViewHint": "Scegli la vista e premi Conferma per aggiungere la scheda.",
    "checkingChanges": "Controllo che la plancia non sia cambiata…",
    "dashboardChanged": "La plancia è cambiata mentre la modificavi. Riapri la scelta prima di salvare.",
    "successTitle": "Scheda aggiunta con successo",
    "pressOK": "Premi OK per tornare a Dispositivi e servizi.",
    "openIntegrations": "Apri Dispositivi e servizi →",
    "successFallback": "Scheda aggiunta con successo. Usa il link per tornare a Dispositivi e servizi.",
    "saveFailed": "Salvataggio non effettuato: {error}",
    "reloadDashboard": "Rileggi la plancia",
    "successDetail": "Rhinocomfort 3 è stato aggiunto alla vista «{view}» della plancia «{dashboard}».",
    "selectedDashboard": "selezionata"
  },
  "fr": {
    "missingEntities": "Ventilation ou assainissement non identifié",
    "sanitizerUnknown": "Impossible d’identifier l’entité d’assainissement avec certitude. Aucun changement du tableau de bord.",
    "dashboardGenerated": "Tableau de bord généré automatiquement ou non modifiable",
    "viewInvalid": "Vue non valide",
    "viewUnsupported": "Cette vue ne permet pas l’ajout automatique de cartes",
    "viewDuplicate": "La carte est déjà présente dans cette vue",
    "loadCardFailed": "Impossible de charger la carte Rhinocomfort",
    "loadingPanel": "Chargement du panneau Rhinocomfort…",
    "selectDevice": "Sélectionnez l’appareil Rhinocomfort à ouvrir :",
    "noDevice": "Aucun Rhinocomfort configuré disponible.",
    "yamlCopied": "YAML copié. Ouvrez l’éditeur du tableau de bord et collez-le comme carte manuelle.",
    "copyManually": "Copiez le texte et collez-le dans l’éditeur du tableau de bord.",
    "addCard": "Ajouter cette carte au tableau de bord",
    "copyYaml": "Copier le YAML de la carte (méthode manuelle)",
    "intro": "Choisissez un tableau de bord et une vue. Aucune modification sans votre confirmation.",
    "loadingDashboards": "Chargement des tableaux de bord…",
    "addTitle": "Ajouter Rhinocomfort à un tableau de bord",
    "defaultDashboard": "Tableau de bord par défaut (Home)",
    "chooseDashboard": "Choisir un tableau de bord",
    "chooseView": "Choisir une vue",
    "dashboard": "Tableau de bord",
    "view": "Vue",
    "confirm": "Confirmer et ajouter la carte",
    "cancel": "Annuler",
    "dashboardsReadError": "Impossible de charger les tableaux de bord : {error}",
    "back": "Retour",
    "loadingDashboard": "Lecture du tableau de bord…",
    "dashboardNotEditable": "Tableau de bord non modifiable",
    "noCompatibleViews": "La carte est déjà présente dans toutes les vues compatibles de ce tableau de bord",
    "noCompatibleView": "Aucune vue compatible : ouvrez l’éditeur du tableau de bord",
    "viewFallback": "Vue {number}",
    "chooseViewHint": "Choisissez une vue et confirmez pour ajouter la carte.",
    "checkingChanges": "Vérification des modifications du tableau de bord…",
    "dashboardChanged": "Le tableau de bord a changé pendant la modification. Rouvrez la sélection avant d’enregistrer.",
    "successTitle": "Carte ajoutée avec succès",
    "pressOK": "Appuyez sur OK pour revenir aux Appareils et services.",
    "openIntegrations": "Ouvrir Appareils et services →",
    "successFallback": "Carte ajoutée. Utilisez le lien pour revenir aux Appareils et services.",
    "saveFailed": "Carte non ajoutée : {error}",
    "reloadDashboard": "Recharger le tableau de bord",
    "successDetail": "Rhinocomfort 3 a été ajouté à la vue «{view}» du tableau de bord «{dashboard}».",
    "selectedDashboard": "sélectionné"
  },
  "de": {
    "missingEntities": "Lüftung oder Desinfektion konnte nicht zugeordnet werden",
    "sanitizerUnknown": "Desinfektions-Entität konnte nicht eindeutig ermittelt werden. Dashboard unverändert.",
    "dashboardGenerated": "Automatisch erzeugtes oder nicht bearbeitbares Dashboard",
    "viewInvalid": "Ungültige Ansicht",
    "viewUnsupported": "Diese Ansicht unterstützt das automatische Hinzufügen nicht",
    "viewDuplicate": "Die Karte ist bereits in dieser Ansicht vorhanden",
    "loadCardFailed": "Rhinocomfort-Karte konnte nicht geladen werden",
    "loadingPanel": "Rhinocomfort-Panel wird geladen…",
    "selectDevice": "Rhinocomfort-Gerät zum Öffnen auswählen:",
    "noDevice": "Kein eingerichtetes Rhinocomfort-Gerät verfügbar.",
    "yamlCopied": "YAML kopiert. Dashboard-Editor öffnen und als manuelle Karte einfügen.",
    "copyManually": "Text kopieren und im Dashboard-Editor einfügen.",
    "addCard": "Diese Karte zum Dashboard hinzufügen",
    "copyYaml": "Karten-YAML kopieren (manuelle Alternative)",
    "intro": "Dashboard und Ansicht auswählen. Änderungen erfolgen nur nach Bestätigung.",
    "loadingDashboards": "Dashboards werden geladen…",
    "addTitle": "Rhinocomfort zum Dashboard hinzufügen",
    "defaultDashboard": "Standard-Dashboard (Home)",
    "chooseDashboard": "Dashboard auswählen",
    "chooseView": "Ansicht auswählen",
    "dashboard": "Dashboard",
    "view": "Ansicht",
    "confirm": "Bestätigen und Karte hinzufügen",
    "cancel": "Abbrechen",
    "dashboardsReadError": "Dashboards konnten nicht geladen werden: {error}",
    "back": "Zurück",
    "loadingDashboard": "Dashboard wird gelesen…",
    "dashboardNotEditable": "Dashboard ist nicht bearbeitbar",
    "noCompatibleViews": "Die Karte ist bereits in allen kompatiblen Ansichten dieses Dashboards vorhanden",
    "noCompatibleView": "Keine kompatible Ansicht: Dashboard-Editor öffnen",
    "viewFallback": "Ansicht {number}",
    "chooseViewHint": "Ansicht wählen und bestätigen, um die Karte hinzuzufügen.",
    "checkingChanges": "Prüfe, ob das Dashboard verändert wurde…",
    "dashboardChanged": "Das Dashboard wurde während der Bearbeitung geändert. Auswahl vor dem Speichern erneut öffnen.",
    "successTitle": "Karte erfolgreich hinzugefügt",
    "pressOK": "Mit OK zurück zu Geräte & Dienste.",
    "openIntegrations": "Geräte & Dienste öffnen →",
    "successFallback": "Karte hinzugefügt. Über den Link zu Geräte & Dienste zurückkehren.",
    "saveFailed": "Karte nicht hinzugefügt: {error}",
    "reloadDashboard": "Dashboard neu laden",
    "successDetail": "Rhinocomfort 3 wurde zur Ansicht «{view}» im Dashboard «{dashboard}» hinzugefügt.",
    "selectedDashboard": "ausgewählt"
  },
  "es": {
    "missingEntities": "No se pudo identificar la ventilación o la desinfección",
    "sanitizerUnknown": "No se puede identificar de forma unívoca la entidad de desinfección. No se ha modificado el panel.",
    "dashboardGenerated": "Panel generado automáticamente o no editable",
    "viewInvalid": "Vista no válida",
    "viewUnsupported": "Esta vista no admite añadir la tarjeta automáticamente",
    "viewDuplicate": "La tarjeta ya está presente en esta vista",
    "loadCardFailed": "No se pudo cargar la tarjeta Rhinocomfort",
    "loadingPanel": "Cargando panel Rhinocomfort…",
    "selectDevice": "Selecciona el dispositivo Rhinocomfort que quieres abrir:",
    "noDevice": "No hay dispositivos Rhinocomfort configurados disponibles.",
    "yamlCopied": "YAML copiado. Abre el editor del panel y pégalo como tarjeta manual.",
    "copyManually": "Copia el texto y pégalo en el editor del panel.",
    "addCard": "Añadir esta tarjeta al panel",
    "copyYaml": "Copiar YAML de la tarjeta (alternativa manual)",
    "intro": "Selecciona un panel y una vista. Nada cambiará sin tu confirmación.",
    "loadingDashboards": "Cargando paneles…",
    "addTitle": "Añadir Rhinocomfort a un panel",
    "defaultDashboard": "Panel predeterminado (Home)",
    "chooseDashboard": "Elegir panel",
    "chooseView": "Elegir vista",
    "dashboard": "Panel",
    "view": "Vista",
    "confirm": "Confirmar y añadir tarjeta",
    "cancel": "Cancelar",
    "dashboardsReadError": "No se pudieron cargar los paneles: {error}",
    "back": "Volver",
    "loadingDashboard": "Leyendo panel…",
    "dashboardNotEditable": "Panel no editable",
    "noCompatibleViews": "La tarjeta ya está presente en todas las vistas compatibles de este panel",
    "noCompatibleView": "No hay vistas compatibles: abre el editor del panel",
    "viewFallback": "Vista {number}",
    "chooseViewHint": "Elige una vista y confirma para añadir la tarjeta.",
    "checkingChanges": "Comprobando que el panel no haya cambiado…",
    "dashboardChanged": "El panel cambió durante la edición. Vuelve a seleccionar antes de guardar.",
    "successTitle": "Tarjeta añadida correctamente",
    "pressOK": "Pulsa OK para volver a Dispositivos y servicios.",
    "openIntegrations": "Abrir Dispositivos y servicios →",
    "successFallback": "Tarjeta añadida. Usa el enlace para volver a Dispositivos y servicios.",
    "saveFailed": "No se añadió la tarjeta: {error}",
    "reloadDashboard": "Recargar panel",
    "successDetail": "Rhinocomfort 3 se ha añadido a la vista «{view}» del panel «{dashboard}».",
    "selectedDashboard": "seleccionado"
  },
  "pt": {
    "missingEntities": "Não foi possível identificar a ventilação ou a higienização",
    "sanitizerUnknown": "Não foi possível identificar a entidade de higienização. O painel não foi alterado.",
    "dashboardGenerated": "Painel gerado automaticamente ou não editável",
    "viewInvalid": "Vista inválida",
    "viewUnsupported": "Esta vista não permite adicionar o cartão automaticamente",
    "viewDuplicate": "O cartão já está presente nesta vista",
    "loadCardFailed": "Não foi possível carregar o cartão Rhinocomfort",
    "loadingPanel": "A carregar o painel Rhinocomfort…",
    "selectDevice": "Selecione o dispositivo Rhinocomfort a abrir:",
    "noDevice": "Nenhum dispositivo Rhinocomfort configurado disponível.",
    "yamlCopied": "YAML copiado. Abra o editor do painel e cole-o como cartão manual.",
    "copyManually": "Copie o texto e cole-o no editor do painel.",
    "addCard": "Adicionar este cartão ao painel",
    "copyYaml": "Copiar YAML do cartão (alternativa manual)",
    "intro": "Escolha um painel e uma vista. Nada será alterado sem confirmação.",
    "loadingDashboards": "A carregar painéis…",
    "addTitle": "Adicionar Rhinocomfort a um painel",
    "defaultDashboard": "Painel predefinido (Home)",
    "chooseDashboard": "Escolher painel",
    "chooseView": "Escolher vista",
    "dashboard": "Painel",
    "view": "Vista",
    "confirm": "Confirmar e adicionar cartão",
    "cancel": "Cancelar",
    "dashboardsReadError": "Não foi possível carregar os painéis: {error}",
    "back": "Voltar",
    "loadingDashboard": "A ler o painel…",
    "dashboardNotEditable": "Painel não editável",
    "noCompatibleViews": "O cartão já está presente em todas as vistas compatíveis deste painel",
    "noCompatibleView": "Nenhuma vista compatível: abra o editor do painel",
    "viewFallback": "Vista {number}",
    "chooseViewHint": "Escolha a vista e confirme para adicionar o cartão.",
    "checkingChanges": "A verificar se o painel foi alterado…",
    "dashboardChanged": "O painel mudou durante a edição. Reabra a seleção antes de guardar.",
    "successTitle": "Cartão adicionado com sucesso",
    "pressOK": "Prima OK para voltar a Dispositivos e serviços.",
    "openIntegrations": "Abrir Dispositivos e serviços →",
    "successFallback": "Cartão adicionado. Utilize a ligação para voltar a Dispositivos e serviços.",
    "saveFailed": "Cartão não adicionado: {error}",
    "reloadDashboard": "Recarregar painel",
    "successDetail": "O Rhinocomfort 3 foi adicionado à vista «{view}» do painel «{dashboard}».",
    "selectedDashboard": "selecionado"
  },
  "nl": {
    "missingEntities": "Ventilatie of ontsmetting kon niet worden vastgesteld",
    "sanitizerUnknown": "Ontsmettingsentiteit kan niet eenduidig worden gevonden. Dashboard is ongewijzigd.",
    "dashboardGenerated": "Automatisch gegenereerd of niet-bewerkbaar dashboard",
    "viewInvalid": "Ongeldige weergave",
    "viewUnsupported": "Deze weergave ondersteunt automatisch toevoegen niet",
    "viewDuplicate": "De kaart staat al in deze weergave",
    "loadCardFailed": "Rhinocomfort-kaart kan niet worden geladen",
    "loadingPanel": "Rhinocomfort-paneel wordt geladen…",
    "selectDevice": "Selecteer het Rhinocomfort-apparaat om te openen:",
    "noDevice": "Geen geconfigureerd Rhinocomfort-apparaat beschikbaar.",
    "yamlCopied": "YAML gekopieerd. Open de dashboardeditor en plak dit als handmatige kaart.",
    "copyManually": "Kopieer de tekst en plak deze in de dashboardeditor.",
    "addCard": "Deze kaart aan een dashboard toevoegen",
    "copyYaml": "Kaart-YAML kopiëren (handmatig alternatief)",
    "intro": "Kies een dashboard en weergave. Zonder bevestiging wordt niets gewijzigd.",
    "loadingDashboards": "Dashboards laden…",
    "addTitle": "Rhinocomfort aan een dashboard toevoegen",
    "defaultDashboard": "Standaarddashboard (Home)",
    "chooseDashboard": "Dashboard kiezen",
    "chooseView": "Weergave kiezen",
    "dashboard": "Dashboard",
    "view": "Weergave",
    "confirm": "Bevestigen en kaart toevoegen",
    "cancel": "Annuleren",
    "dashboardsReadError": "Dashboards kunnen niet worden geladen: {error}",
    "back": "Terug",
    "loadingDashboard": "Dashboard lezen…",
    "dashboardNotEditable": "Dashboard kan niet worden bewerkt",
    "noCompatibleViews": "De kaart staat al in alle compatibele weergaven van dit dashboard",
    "noCompatibleView": "Geen compatibele weergave: open de dashboardeditor",
    "viewFallback": "Weergave {number}",
    "chooseViewHint": "Kies een weergave en bevestig om de kaart toe te voegen.",
    "checkingChanges": "Controleren of het dashboard niet is gewijzigd…",
    "dashboardChanged": "Het dashboard is tijdens het bewerken gewijzigd. Open de selectie opnieuw voor opslaan.",
    "successTitle": "Kaart succesvol toegevoegd",
    "pressOK": "Druk op OK om terug te gaan naar Apparaten en diensten.",
    "openIntegrations": "Apparaten en diensten openen →",
    "successFallback": "Kaart toegevoegd. Gebruik de link om terug te gaan naar Apparaten en diensten.",
    "saveFailed": "Kaart niet toegevoegd: {error}",
    "reloadDashboard": "Dashboard opnieuw laden",
    "successDetail": "Rhinocomfort 3 is toegevoegd aan weergave «{view}» op dashboard «{dashboard}».",
    "selectedDashboard": "geselecteerd"
  }
});
function rhinoPanelLanguage(hass) {
  const lang = String(hass?.locale?.language || hass?.language || "en").toLowerCase()
    .replace(/_/g, "-").split("-")[0];
  return Object.hasOwn(RHINO_PANEL_I18N, lang) ? lang : "en";
}
function pText(hass, key, values = {}) {
  const dict = RHINO_PANEL_I18N[rhinoPanelLanguage(hass)];
  const pattern = dict[key] ?? RHINO_PANEL_I18N.en[key] ?? key;
  return pattern.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}
// Existing exceptions from pure, non-UI dashboard helpers retain their messages.
// Only their presentation is translated; their validation logic remains intact.
const PANEL_ERROR_KEYS = Object.freeze({
  "Ventilazione o sanificazione non identificata":"missingEntities",
  "Impossibile identificare in modo univoco la sanificazione. Nessuna modifica alla plancia.":"sanitizerUnknown",
  "Plancia generata o non modificabile":"dashboardGenerated",
  "Vista non valida":"viewInvalid",
  "Questa vista non supporta l'aggiunta automatica":"viewUnsupported",
  "La scheda è già presente in questa vista":"viewDuplicate",
});
function pError(hass, error) {
  const raw = error?.message || String(error);
  const key = PANEL_ERROR_KEYS[raw];
  return key ? pText(hass, key) : raw;
}

const PANEL_TAG = "rhinocomfort3-device-panel";
const RHINO_CARD_URL = "/rhinocomfort3_ble/rhinocomfort3-card.js?v=6.2.3";
const normalizeId = value => String(value || "").replace(/[^0-9a-f]/gi, "").toLowerCase();
function getRhinoFans(hass) {
  return Object.entries(hass?.entities || {})
    .filter(([entityId, meta]) => entityId.startsWith("fan.") && meta?.platform === "rhinocomfort3_ble" && hass?.states?.[entityId]);
}
function linkedToAddress(hass, meta, address) {
  const addr = normalizeId(address);
  if (!addr) return false;
  if (normalizeId(meta?.unique_id?.replace(/_fan$/i, "")) === addr) return true;
  const device = hass?.devices?.[meta?.device_id];
  return Array.isArray(device?.identifiers) && device.identifiers.some(pair =>
    Array.isArray(pair) && pair[0] === "rhinocomfort3_ble" && normalizeId(pair[1]) === addr);
}
function chooseFan(hass, address) {
  const fans = getRhinoFans(hass);
  if (address) {
    const matches = fans.filter(([, meta]) => linkedToAddress(hass, meta, address));
    return matches.length === 1 ? matches[0][0] : null;
  }
  return fans.length === 1 ? fans[0][0] : null;
}
// Pure helpers: no dashboard is modified by these functions.
const RHINO_CARD_TYPE = "custom:rhinocomfort3-card";
function cardForEntity(entity, sanitizationEntity) {
  if (!entity || !sanitizationEntity) throw new Error("Ventilazione o sanificazione non identificata");
  return {type:RHINO_CARD_TYPE,entity,sanitization_entity:sanitizationEntity};
}
// Never infer a sanitizer by a room name or by a hardcoded entity_id.
// Match a unique Rhinocomfort switch on the fan's registered HA device.
function sanitizerFromEntities(registry, entity) {
  if (!registry || typeof registry !== "object") return null;
  const fan = registry[entity];
  if (!fan || fan.platform !== "rhinocomfort3_ble" || !fan.device_id) return null;
  const switches = Object.entries(registry).filter(([id, meta]) =>
    id.startsWith("switch.") && meta?.platform === "rhinocomfort3_ble" &&
    meta.device_id === fan.device_id);
  return switches.length === 1 ? switches[0][0] : null;
}
// Fallback for older frontends that do not expose the complete entity registry.
async function resolveSanitizationEntity(hass, entity) {
  const fromHass = sanitizerFromEntities(hass?.entities, entity);
  if (fromHass) return fromHass;
  const ws = typeof hass?.callWS === "function" ? hass.callWS.bind(hass)
    : typeof hass?.connection?.sendMessagePromise === "function"
      ? hass.connection.sendMessagePromise.bind(hass.connection) : null;
  if (ws) {
    const response = await ws({type:"config/entity_registry/list_for_display"});
    const items = response?.entities;
    if (Array.isArray(items)) {
      const fans = items.filter(x => x.ei === entity && x.pl === "rhinocomfort3_ble" && x.di);
      if (fans.length === 1) {
        const switches = items.filter(x => x.pl === "rhinocomfort3_ble" && x.di === fans[0].di &&
          typeof x.ei === "string" && x.ei.startsWith("switch."));
        if (switches.length === 1) return switches[0].ei;
      }
    }
  }
  throw new Error("Impossibile identificare in modo univoco la sanificazione. Nessuna modifica alla plancia.");
}
function isRhinoCard(card, entity) {
  if (!card || typeof card !== "object") return false;
  if (card.type === RHINO_CARD_TYPE && card.entity === entity) return true;
  // Look inside stacks/sections without changing their content.
  for (const field of ["cards", "sections", "elements"]) {
    if (Array.isArray(card[field]) && card[field].some(child => isRhinoCard(child, entity))) return true;
  }
  return Boolean(card.card && isRhinoCard(card.card, entity));
}
function isEditableView(view) {
  if (!view || typeof view !== "object") return false;
  if (view.strategy || view.type === "panel" || view.type === "sidebar") return false;
  const kind = view.type || "masonry";
  if (kind === "sections") return !view.sections || Array.isArray(view.sections);
  return kind === "masonry" && (!view.cards || Array.isArray(view.cards));
}
function insertedDashboardConfig(config, index, entity, sanitizationEntity) {
  if (!config || config.strategy || !Array.isArray(config.views)) throw new Error("Plancia generata o non modificabile");
  if (!Number.isInteger(index) || index < 0 || index >= config.views.length) throw new Error("Vista non valida");
  const selected=config.views[index];
  if (!isEditableView(selected)) throw new Error("Questa vista non supporta l'aggiunta automatica");
  if (isRhinoCard(selected, entity)) throw new Error("La scheda è già presente in questa vista");
  // Deep copy preserves all other options; the original object is never mutated.
  const result=JSON.parse(JSON.stringify(config));
  const view=result.views[index];
  if (view.type === "sections") {
    view.sections ||= [];
    view.sections.push({type:"grid",cards:[cardForEntity(entity,sanitizationEntity)]});
  } else {
    view.cards ||= [];
    view.cards.push(cardForEntity(entity,sanitizationEntity));
  }
  return result;
}
function dashboardUrlPath(dashboard) {
  return dashboard?.url_path === "lovelace" || !dashboard?.url_path ? null : dashboard.url_path;
}
function lovelaceQuery(type, path, extras) {
  return {type, ...(path ? {url_path:path} : {}), ...(extras || {})};
}
function isStorageDashboard(dashboard) {
  return dashboard && !["yaml", "auto"].includes(dashboard.mode) && dashboard.mode !== "generated";
}
function viewLink(dashboard, view, index) {
  const dash = dashboard?.url_path || "lovelace";
  const part = view?.path ? encodeURIComponent(view.path) : String(index);
  return `/${encodeURIComponent(dash)}/${part}`;
}
class RhinoPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:"open"});
    this._loaded = false;
    this._card = null;
    this._selected = null;
    this._editing = false;
    this._busy = false;
    this._saveCompleted = false;
    this._targetEntity = null;
    this._dashboardConfig = null;
    this._dashboardSnapshot = null;
    this._dashboardLoadSerial = 0;
    this._build();
  }
  set panel(panel) { this._panel = panel; this._update(); }
  set hass(hass) { this._hass = hass; this._update(); }
  set narrow(narrow) { this._narrow = narrow; this._update(); }
  connectedCallback() { this._ensureCardLoaded(); this._update(); }
  _build() {
    const style = document.createElement("style");
    style.textContent = `:host{display:block;min-height:100%;background:var(--primary-background-color);color:var(--primary-text-color);font-family:var(--paper-font-body1_-_font-family,Arial,sans-serif)}
     .outer{max-width:790px;margin:0 auto;padding:20px 16px 48px}.heading{display:flex;gap:12px;align-items:center;margin-bottom:22px}
     .heading ha-icon{color:#004c92}.heading h1{font-size:22px;font-weight:600;margin:0}.hint{color:var(--secondary-text-color);font-size:14px;line-height:1.5}
     .card{max-width:560px;margin:0 auto}.notice{border-radius:12px;padding:18px;background:var(--card-background-color);}
     button{font:inherit;border:1px solid var(--divider-color);border-radius:9px;padding:12px;cursor:pointer;background:var(--card-background-color);color:var(--primary-text-color);display:block;width:100%;margin:9px 0;text-align:left;}
     button.primary{background:#004c92;color:white;text-align:center;border-color:#004c92}button:disabled{opacity:.55;cursor:default}
     select{font:inherit;box-sizing:border-box;width:100%;padding:11px 9px;margin:8px 0 13px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color)}
     .tools{max-width:560px;margin:22px auto 0}.tools p{font-size:14px;line-height:1.45}
     .status{color:var(--secondary-text-color);font-size:13px;padding:8px 2px;white-space:pre-wrap}
     .viewlink{display:block;margin:10px 0;color:var(--primary-color);font-weight:600}
     .small{font-size:12px;color:var(--secondary-text-color)}
     .success-backdrop{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
     .success-dialog{box-sizing:border-box;width:100%;max-width:410px;padding:25px;border:1px solid var(--divider-color);border-radius:16px;background:var(--card-background-color);box-shadow:0 12px 42px rgba(0,0,0,.35);text-align:center}
     .success-symbol{display:inline-flex;align-items:center;justify-content:center;color:#fff;background:#087e66;border-radius:50%;width:43px;height:43px;font-size:28px;font-weight:700;margin-bottom:12px}
     .success-dialog h2{font-size:20px;font-weight:600;margin:0 0 12px}
     .success-dialog p{color:var(--secondary-text-color);line-height:1.45;margin:0 0 18px}
     .success-dialog button{max-width:160px;margin:0 auto;text-align:center}`;
    const main = document.createElement("div");main.className="outer";
    const heading=document.createElement("div");heading.className="heading";
    const icon=document.createElement("ha-icon");icon.setAttribute("icon","mdi:air-filter");
    const h1=document.createElement("h1");h1.textContent="Rhinocomfort 3";heading.append(icon,h1);
    this._body=document.createElement("div");this._body.className="card";
    this._tools=document.createElement("div");this._tools.className="tools";
    main.append(heading,this._body,this._tools);this.shadowRoot.append(style,main);
  }
  async _ensureCardLoaded() {
    if (this._loading || this._loaded) return;
    this._loading=true;
    try {
      if (!customElements.get("rhinocomfort3-card")) {
        await new Promise((resolve,reject)=>{
          const s=document.createElement("script");s.src=RHINO_CARD_URL;s.onload=resolve;s.onerror=reject;
          document.head.appendChild(s);
        });
      }
      await customElements.whenDefined("rhinocomfort3-card");
      this._loaded=true;
    } catch(e) { this._error=pText(this._hass,"loadCardFailed"); }
    finally { this._loading=false; this._update(); }
  }
  _update() {
    if (!this._body || !this._hass) return;
    const path=window.location.pathname.split("/");
    const address=decodeURIComponent(path[2] || "");
    let entityId=this._selected || chooseFan(this._hass,address);
    const fans=getRhinoFans(this._hass);
    if (entityId && !fans.some(([id])=>id===entityId)) entityId=null;
    if (!this._loaded) {
      if (!this._body.querySelector(".notice")) this._showText(this._error || pText(this._hass,"loadingPanel"));
      return;
    }
    if (!entityId) {
      if (!this._selecting) {
        this._body.replaceChildren();this._selecting=true;this._card=null;
        const notice=document.createElement("div");notice.className="notice";
        const label=document.createElement("p");label.className="hint";
        label.textContent=fans.length ? pText(this._hass,"selectDevice") : pText(this._hass,"noDevice");
        notice.appendChild(label);
        for (const [id] of fans) {
          const btn=document.createElement("button");btn.textContent=this._hass.states[id]?.attributes?.friendly_name || id;
          btn.addEventListener("click",()=>{this._selected=id;this._selecting=false;this._update();});
          notice.appendChild(btn);
        }
        this._body.append(notice);
      }
      return;
    }
    this._selecting=false;
    const uiLang=rhinoPanelLanguage(this._hass);
    if (this._activeLang && this._activeLang !== uiLang && !this._editing && !this._saveCompleted) {
      this._activeLang=uiLang;
      this._renderActions();
    }
    if (!this._card || this._cardEntity !== entityId) {
      this._card=document.createElement("rhinocomfort3-card");
      this._card.setConfig({type:"custom:rhinocomfort3-card",entity:entityId});
      this._cardEntity=entityId;this._body.replaceChildren(this._card);
    }
    this._card.hass=this._hass;
    if (this._targetEntity !== entityId) {
      this._targetEntity=entityId;
      this._activeLang=rhinoPanelLanguage(this._hass);
      this._editing=false;
      this._renderActions();
    }
  }
  _text(node,content,cls) {
    const el=document.createElement(node);el.textContent=content;if(cls)el.className=cls;return el;
  }
  _button(text,handler,primary=false) {
    const btn=this._text("button",text,primary?"primary":undefined);
    btn.type="button";btn.addEventListener("click",handler);return btn;
  }
  _status(text) {
    if (this._statusEl) this._statusEl.textContent=text;
  }
  async _copyYaml() {
    if (!this._targetEntity) return;
    let yaml;
    try {
      const sani = await resolveSanitizationEntity(this._hass,this._targetEntity);
      yaml=`type: custom:rhinocomfort3-card\nentity: ${this._targetEntity}\nsanitization_entity: ${sani}\n`;
      await navigator.clipboard.writeText(yaml);
      this._status(pText(this._hass,"yamlCopied"));
    } catch(err) {
      if (!yaml) {
        this._status(pError(this._hass,err));
        return;
      }
      const box=document.createElement("textarea");box.readOnly=true;box.value=yaml;box.rows=4;
      this._tools.append(box);
      box.select();this._status(pText(this._hass,"copyManually"));
    }
  }
  _renderActions() {
    this._tools.replaceChildren();
    if (!this._targetEntity) return;
    this._tools.append(this._button(pText(this._hass,"addCard"),()=>this._openDashboardChooser(),true));
    this._tools.append(this._button(pText(this._hass,"copyYaml"),()=>this._copyYaml()));
    this._tools.append(this._text("p",pText(this._hass,"intro"),"hint"));
    this._statusEl=this._text("div","","status");this._tools.append(this._statusEl);
  }
  async _openDashboardChooser() {
    if (this._busy || !this._targetEntity) return;
    this._busy=true;this._editing=true;
    this._tools.replaceChildren();
    this._statusEl=this._text("div",pText(this._hass,"loadingDashboards"),"status");
    this._tools.append(this._text("h3",pText(this._hass,"addTitle")),this._statusEl);
    try {
      const list=await this._hass.callWS({type:"lovelace/dashboards/list"});
      // The default Lovelace dashboard is not always included in dashboards/list.
      const dashboards=[{title:pText(this._hass,"defaultDashboard"),url_path:"lovelace",mode:"storage"}];
      for (const entry of Array.isArray(list)?list:[]) {
        if (entry.url_path && entry.url_path!=="lovelace" && isStorageDashboard(entry)) dashboards.push(entry);
      }
      this._dashboards=dashboards;
      this._tools.replaceChildren(this._text("h3",pText(this._hass,"addTitle")));
      this._dashSelect=document.createElement("select");this._dashSelect.setAttribute("aria-label",pText(this._hass,"chooseDashboard"));
      dashboards.forEach((d,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=d.title || d.url_path;this._dashSelect.append(o);});
      this._viewSelect=document.createElement("select");this._viewSelect.setAttribute("aria-label",pText(this._hass,"chooseView"));
      this._statusEl=this._text("div","","status");
      this._tools.append(this._text("label",pText(this._hass,"dashboard")),this._dashSelect,this._text("label",pText(this._hass,"view")),this._viewSelect);
      this._confirm=this._button(pText(this._hass,"confirm"),()=>this._saveDashboard(),true);
      this._confirm.disabled=true;
      this._tools.append(this._confirm,this._button(pText(this._hass,"cancel"),()=>{this._editing=false;this._renderActions();}),this._statusEl);
      this._dashSelect.addEventListener("change",()=>this._loadDashboard());
      await this._loadDashboard();
    } catch(err) {
      this._status(pText(this._hass,"dashboardsReadError",{error:pError(this._hass,err)}));
      this._tools.append(this._button(pText(this._hass,"back"),()=>this._renderActions()));
    } finally {this._busy=false;}
  }
  async _loadDashboard() {
    if (!this._dashSelect || !this._viewSelect) return;
    // A slow response to an earlier dashboard selection must never enable Save
    // for a later selection. This is especially important on mobile.
    const loadSerial = ++this._dashboardLoadSerial;
    this._confirm.disabled=true;
    this._dashboardConfig=null;
    this._dashboardSnapshot=null;
    this._viewSelect.replaceChildren();
    const dashIndex=Number(this._dashSelect.value);
    const dashboard=this._dashboards[dashIndex];
    this._status(pText(this._hass,"loadingDashboard"));
    try {
      if (!dashboard || !isStorageDashboard(dashboard)) throw new Error(pText(this._hass,"dashboardNotEditable"));
      const cfg=await this._hass.callWS(lovelaceQuery("lovelace/config",dashboardUrlPath(dashboard)));
      if (loadSerial !== this._dashboardLoadSerial || Number(this._dashSelect.value) !== dashIndex) return;
      if (!cfg || cfg.strategy || !Array.isArray(cfg.views)) throw new Error(pText(this._hass,"dashboardGenerated"));
      // A Rhinocomfort card may appear in multiple views of the same dashboard.
      // Only exclude the view that already contains this device's card.
      cfg.views.forEach((v,i)=>{
        if (!isEditableView(v) || isRhinoCard(v,this._targetEntity)) return;
        const o=document.createElement("option");o.value=String(i);o.textContent=v.title||v.path||pText(this._hass,"viewFallback",{number:i+1});
        this._viewSelect.appendChild(o);
      });
      if (!this._viewSelect.options.length) {
        if (cfg.views.some(v=>isEditableView(v))) {
          throw new Error(pText(this._hass,"noCompatibleViews"));
        }
        throw new Error(pText(this._hass,"noCompatibleView"));
      }
      this._dashboardConfig=cfg;
      this._dashboardSnapshot=JSON.stringify(cfg);
      this._confirm.disabled=false;
      this._status(pText(this._hass,"chooseViewHint"));
    } catch(err) {
      if (loadSerial === this._dashboardLoadSerial) this._status(err?.message||String(err));
    }
  }
  async _saveDashboard() {
    if (this._busy || this._saveCompleted || !this._dashboardSnapshot || !this._dashboardConfig || !this._targetEntity) return;
    const dash=this._dashboards[Number(this._dashSelect.value)];
    const path=dashboardUrlPath(dash);
    const index=Number(this._viewSelect.value);
    if (!this._viewSelect.options.length || !Number.isInteger(index) ||
        !Array.from(this._viewSelect.options).some(option => Number(option.value) === index)) return;
    this._busy=true;this._confirm.disabled=true;
    this._dashSelect.disabled=true;this._viewSelect.disabled=true;
    this._status(pText(this._hass,"checkingChanges"));
    try {
      const now=await this._hass.callWS(lovelaceQuery("lovelace/config",path));
      if (JSON.stringify(now)!==this._dashboardSnapshot) {
        throw new Error(pText(this._hass,"dashboardChanged"));
      }
      // Explicit switch mapping survives different dashboards, caches and non-admin users.
      // Do not save a partial card if the association cannot be established.
      const sanitizer = await resolveSanitizationEntity(this._hass,this._targetEntity);
      const updated=insertedDashboardConfig(now,index,this._targetEntity,sanitizer);
      await this._hass.callWS(lovelaceQuery("lovelace/config/save",path,{config:updated}));
      // Show success ONLY after the authenticated dashboard save has resolved.
      // Do not navigate before the user can read the confirmation.
      this._saveCompleted=true;
      this._tools.replaceChildren(this._text("h3",pText(this._hass,"successTitle")));
      this._tools.append(this._text("p",pText(this._hass,"pressOK"),"hint"));
      const back=document.createElement("a");back.className="viewlink";
      back.href="/config/integrations";back.textContent=pText(this._hass,"openIntegrations");
      this._tools.append(back);
      try {
        this._showSaveSuccessDialog(dash,now.views[index],index);
      } catch (_dialogError) {
        // A UI failure after the committed write must NEVER be treated as a
        // dashboard save failure. The fallback link above remains available.
        this._status(pText(this._hass,"successFallback"));
      }
    } catch(err) {
      this._status(pText(this._hass,"saveFailed",{error:pError(this._hass,err)}));
      this._tools.append(this._button(pText(this._hass,"reloadDashboard"),()=>this._loadDashboard()));
    } finally {
      this._busy=false;
      this._dashSelect.disabled=false;this._viewSelect.disabled=false;
    }
  }
  _goToIntegrations() {
    // This is intentionally triggered by the user's OK click, never by saving.
    try {
      if (typeof window.location?.assign === "function") {
        window.location.assign("/config/integrations");
      }
    } catch (_navigationError) {
      // The fallback link remains visible in the panel.
    }
  }
  _showSaveSuccessDialog(dashboard,view,index) {
    // Remove any previous modal before creating a new one.
    if (this._successOverlay) this._successOverlay.remove();
    const backdrop=document.createElement("div");backdrop.className="success-backdrop";
    const dialog=document.createElement("div");dialog.className="success-dialog";
    dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");
    dialog.setAttribute("aria-labelledby","rhino-success-heading");
    const symbol=this._text("div","✓","success-symbol");symbol.setAttribute("aria-hidden","true");
    const title=this._text("h2",pText(this._hass,"successTitle"));title.id="rhino-success-heading";
    const dashName=dashboard?.title || pText(this._hass,"selectedDashboard");
    const viewName=view?.title || view?.path || pText(this._hass,"viewFallback",{number:index+1});
    const detail=this._text("p",pText(this._hass,"successDetail",{view:viewName,dashboard:dashName}));
    const ok=this._button("OK",()=>{
      backdrop.remove();this._successOverlay=null;
      this._goToIntegrations();
    },true);
    dialog.append(symbol,title,detail,ok);backdrop.append(dialog);
    this.shadowRoot.append(backdrop);this._successOverlay=backdrop;
    // Keyboard users can confirm with Enter/Space on the focused OK button.
    ok.focus();
  }
  _showText(message) {
    const notice=document.createElement("div");notice.className="notice";notice.textContent=message;
    this._body.replaceChildren(notice);
  }
}
if (!customElements.get(PANEL_TAG)) customElements.define(PANEL_TAG,RhinoPanel);
