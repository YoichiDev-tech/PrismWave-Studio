# Checklist lancio — Italia

**Obiettivo preparazione:** domenica 22 novembre 2026.  
**Primo giorno operativo proposto:** lunedì 23 novembre 2026.

## Offerta iniziale da validare

Imprese italiane di installazione e manutenzione: un flusso digitale su misura per raccogliere richieste, visualizzarle in un punto centrale, seguirne lo stato e identificare il prossimo passo.

L'anteprima sul sito usa dati fittizi. Non è un prodotto SaaS già operativo né un progetto cliente.

### Prima del lancio commerciale
- [ ] Confermare identità legale, forma giuridica, giurisdizione, indirizzo, registrazione e posizione fiscale.
- [ ] Ottenere verifica del commercialista su fatturazione, IVA e attività.
- [ ] Ottenere revisione legale/privacy dell'informativa, dei termini, del contratto e del trattamento dei dati.
- [ ] Definire tempi di conservazione e procedura di cancellazione dei lead.
- [ ] Configurare PostgreSQL, applicare `server/schema.sql` e limitare i privilegi del ruolo applicativo.
- [ ] Configurare variabili d'ambiente e Resend con dominio mittente verificato.
- [ ] Testare invio modulo, salvataggio database, notifica email e rate limit.
- [ ] Verificare backup e ripristino del database.
- [ ] Testare mobile, desktop, accessibilità, navigazione da tastiera e reduced motion.
- [ ] Eseguire typecheck, build, lint e smoke test su ambiente di staging.
- [ ] Confermare dominio, canonical, sitemap, robots e anteprima social.
- [ ] Rimuovere ogni segnaposto legale prima di rendere il sito un canale commerciale.
- [ ] Approvazione finale del CEO per pubblicazione e offerta.

### Prima collaborazione
- [ ] Selezionare 20–30 imprese adatte per segmento e area.
- [ ] Annotare fonti e motivi di pertinenza, minimizzando i dati personali.
- [ ] Usare presentazioni, referral, eventi, inbound e canali con autorizzazione verificata.
- [ ] Non inviare email promozionali a liste raccolte o indirizzi pubblici senza verifica legale del canale e della base giuridica.
- [ ] Preparare discovery, demo, proposta pilota e criteri di accettazione.
- [ ] CEO approva prezzo, sconti, contratto e impegni.

## Gate di rilascio
Il sito può essere presentato come pronto solo quando il flusso principale è verificato, i lead vengono salvati, le notifiche sono testate, non ci sono segreti esposti, le informazioni legali sono complete e revisionate, e il CEO approva esplicitamente il rilascio.

Se un gate manca, mantenere l'ambiente in preview e usare il tempo per referral, ricerca e conversazioni esplorative appropriate.
