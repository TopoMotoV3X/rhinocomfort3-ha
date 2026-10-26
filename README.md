# Rhinocomfort 3 BLE for Home Assistant

**Unofficial community integration for Fantini Cosmi Rhinocomfort 3.**

**Version:** 0.1.0b37 (beta)


![Rhinocomfort 3 BLE per Home Assistant — locandina illustrativa](https://raw.githubusercontent.com/TopoMotoV3X/rhinocomfort3-ha/main/docs/images/rhinocomfort3-poster.png)

**Controllo locale Bluetooth LE · Modalità AUTO/MANUALE · Sanificazione · Card Lovelace · Installazione HACS**

*Locandina illustrativa; nella galleria in fondo trovi le schermate autentiche della card.*

[Italiano](#italiano) | [English](#english) | [Galleria / Screenshots](#galleria--screenshots)

---

## Italiano

### Funzionalità

- Controllo Bluetooth Low Energy locale.
- Modalità AUTO, MANUALE, SLEEP e spegnimento.
- Tre velocità manuali.
- Controllo della sanificazione, quando disponibile.
- Visualizzazione del flusso d'aria e del limite AUTO, quando
  i relativi dati BLE sono disponibili.
- Card Lovelace dedicata, con risorsa JavaScript registrata
  automaticamente nelle dashboard in modalità Storage.
- Wizard assistito per ricerca del dispositivo e pairing.

### Installazione tramite HACS

1. Aprire HACS in Home Assistant.
2. Dal menu scegliere **Repository personalizzati**.
3. Inserire:
   https://github.com/TopoMotoV3X/rhinocomfort3-ha
4. Selezionare la categoria **Integrazione**.
5. Aggiungere il repository e scaricare l'integrazione.
6. Riavviare Home Assistant.
7. Aprire **Impostazioni > Dispositivi e servizi > Aggiungi integrazione**.
8. Cercare **Rhinocomfort 3 BLE** e seguire il wizard.

Il download tramite HACS non avvia automaticamente il pairing.
La procedura comincia soltanto quando l'utente configura l'integrazione.

Se il dispositivo non risulta già associato, seguire le istruzioni
del wizard e utilizzare il pulsante fisico del Rhinocomfort quando richiesto.

### Card Lovelace

Nelle dashboard in modalità Storage la risorsa JavaScript viene
registrata automaticamente dopo la configurazione dell'integrazione.

Risorsa prevista:
`/rhinocomfort3_ble/rhinocomfort3-card.js?v=0.1.0b37`

Tipo: **Modulo JavaScript**.

La card richiede un'entità `fan` creata dall'integrazione.

Le dashboard configurate tramite YAML possono richiedere
la registrazione manuale della risorsa.

### Compatibilità verificata

Collaudata su Raspberry Pi 4 con Home Assistant Container 2026.10.4
e Bluetooth locale BlueZ accessibile dall'ambiente Home Assistant.

Verificati:
- Riconoscimento di un bonding già esistente.
- Nuovo pairing dal wizard.
- Controllo della ventola e della sanificazione.
- Registrazione automatica della risorsa della card.

Non ancora verificati in modo completo:
- Home Assistant OS e altre piattaforme.
- Configurazioni con più adattatori Bluetooth.
- Pairing attraverso ESPHome Bluetooth Proxy.

Il rilevamento tramite proxy non garantisce la disponibilità
della procedura di pairing remoto.

### Sicurezza e note

L'integrazione non deve rimuovere automaticamente i bonding
Bluetooth esistenti o reimpostare l'adattatore.

Progetto indipendente, non ufficiale e non affiliato a Fantini Cosmi.

Il codice è distribuito secondo la licenza MIT.
Marchi, denominazioni e loghi di terzi restano soggetti
ai rispettivi diritti e non sono concessi dalla licenza MIT.

---

## English

### Features

- Local Bluetooth Low Energy control.
- AUTO, MANUAL, SLEEP and OFF modes.
- Three manual fan speeds.
- Sanitization control, when available.
- Airflow direction and AUTO limit display when the relevant
  BLE state information is available.
- Dedicated Lovelace card with automatic JavaScript resource
  registration for Storage-mode dashboards.
- Guided device discovery and pairing flow.

### Installation with HACS

1. Open HACS in Home Assistant.
2. Select **Custom repositories** from the menu.
3. Enter:
   https://github.com/TopoMotoV3X/rhinocomfort3-ha
4. Select **Integration** as the repository category.
5. Add the repository and download the integration.
6. Restart Home Assistant.
7. Open **Settings > Devices & services > Add integration**.
8. Search for **Rhinocomfort 3 BLE** and follow the setup wizard.

Downloading through HACS does not start pairing automatically.
Pairing starts only after the user explicitly begins configuration.

If the device is not already bonded, follow the wizard and use
the physical Rhinocomfort button when instructed.

### Lovelace card

For Storage-mode dashboards the integration automatically registers:

`/rhinocomfort3_ble/rhinocomfort3-card.js?v=0.1.0b37`

Resource type: **JavaScript module**.

The card requires a `fan` entity provided by this integration.
YAML-mode dashboards may require manual resource configuration.

### Tested compatibility

Tested on Raspberry Pi 4 with Home Assistant Container 2026.10.4
and locally accessible BlueZ Bluetooth.

Verified:
- Existing bond detection.
- Fresh pairing through the setup wizard.
- Fan and sanitization controls.
- Automatic Lovelace resource registration.

Not yet fully validated:
- Home Assistant OS and other installation methods.
- Multiple local Bluetooth adapters.
- Pairing through ESPHome Bluetooth Proxy.

Proxy-based discovery does not necessarily imply remote pairing support.

### Security and disclaimer

The integration must not automatically remove existing Bluetooth
bonds or reset Bluetooth adapters.

This is an independent, unofficial project and is not affiliated
with or endorsed by Fantini Cosmi.

Code is licensed under MIT. Third-party names, trademarks and
logos remain the property of their respective owners and are
not licensed by the MIT license.

### Support

Issues:
https://github.com/TopoMotoV3X/rhinocomfort3-ha/issues


---

## Galleria / Screenshots

Queste quattro immagini sono screenshot reali della card Rhinocomfort 3 BLE, acquisiti su Home Assistant.
These are actual screenshots of the Rhinocomfort 3 BLE Lovelace card.

| Modalità AUTO — tema scuro | Modalità AUTO — tema chiaro |
|:--:|:--:|
| ![Rhinocomfort AUTO dark](https://raw.githubusercontent.com/TopoMotoV3X/rhinocomfort3-ha/main/docs/images/rhinocomfort-auto-dark.png) | ![Rhinocomfort AUTO light](https://raw.githubusercontent.com/TopoMotoV3X/rhinocomfort3-ha/main/docs/images/rhinocomfort-auto-light.png) |

| Modalità MANUALE — tema scuro | Modalità MANUALE — tema chiaro |
|:--:|:--:|
| ![Rhinocomfort manual dark](https://raw.githubusercontent.com/TopoMotoV3X/rhinocomfort3-ha/main/docs/images/rhinocomfort-manual-dark.png) | ![Rhinocomfort manual light](https://raw.githubusercontent.com/TopoMotoV3X/rhinocomfort3-ha/main/docs/images/rhinocomfort-manual-light.png) |
