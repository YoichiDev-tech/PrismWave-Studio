import { useState, type FormEvent } from "react";
import SEO from "../components/SEO";
import RequestWorkflow3D from "../components/RequestWorkflow3D";

const NAV = [{ label: "Il problema", href: "#problema" }, { label: "La soluzione", href: "#soluzione" }, { label: "Come funziona", href: "#processo" }, { label: "Domande", href: "#faq" }];
type FormState = { name: string; business: string; email: string; phone: string; city: string; website: string; message: string; privacyAccepted: boolean };
const EMPTY: FormState = { name: "", business: "", email: "", phone: "", city: "", website: "", message: "", privacyAccepted: false };

export default function ItalianHome() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const update = (field: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!form.privacyAccepted) { setError("Per inviare la richiesta, leggi e conferma l'informativa privacy."); return; }
    setStatus("sending");
    const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
    const message = [form.message.trim(), form.phone.trim() ? `Telefono: ${form.phone.trim()}` : "", form.city.trim() ? `Comune: ${form.city.trim()}` : ""].filter(Boolean).join("\n");
    try {
      const response = await fetch(`${apiBase}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), business: form.business.trim(), email: form.email.trim(), phone: form.phone.trim(), city: form.city.trim(), website: form.website.trim(), message, intent: "build", privacyAccepted: form.privacyAccepted }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error(data?.error || "Non è stato possibile inviare la richiesta. Riprova tra poco.");
      setStatus("sent");
      setForm(EMPTY);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Si è verificato un errore. Riprova.");
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0e1a] text-[#f3f4f1]">
      <SEO title="Gestione richieste clienti per imprese di installazione e manutenzione" description="Un flusso digitale su misura per raccogliere, organizzare e seguire le richieste dei clienti. Pensato per piccole imprese di installazione e manutenzione in Italia." path="/" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0a0e1a]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Navigazione principale">
          <a href="#inizio" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffb84d] to-[#ff7a59] text-sm font-bold text-[#101522]">P</span>PrismWave <span className="text-[#ffb84d]">Studio</span></a>
          <div className="hidden items-center gap-7 md:flex">{NAV.map((item) => <a key={item.href} href={item.href} className="text-sm text-slate-400 transition-colors hover:text-white">{item.label}</a>)}</div>
          <a href="#contatti" className="hidden rounded-full bg-[#ffb84d] px-5 py-2.5 text-sm font-semibold text-[#101522] transition-transform hover:-translate-y-0.5 md:inline-flex">Parliamone</a>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden" aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span aria-hidden="true" className="text-xl">{menuOpen ? "×" : "☰"}</span></button>
        </nav>
        {menuOpen && <div className="border-t border-white/10 bg-[#0a0e1a] px-5 py-4 md:hidden">{NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm text-slate-300">{item.label}</a>)}<a href="#contatti" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex rounded-full bg-[#ffb84d] px-5 py-3 text-sm font-semibold text-[#101522]">Parliamone</a></div>}
      </header>

      <main id="inizio">
        <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#6558d3]/20 blur-[120px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#ffb84d]/10 blur-[120px]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffb84d]/25 bg-[#ffb84d]/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-[#ffd18b]"><span className="h-1.5 w-1.5 rounded-full bg-[#ffb84d]" />Per imprese di installazione e manutenzione</p>
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Le richieste dei clienti non dovrebbero <span className="bg-gradient-to-r from-[#ffcf78] via-[#ff9b69] to-[#a69bff] bg-clip-text text-transparent">perdersi mentre sei al lavoro.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">Progettiamo un sistema semplice per raccogliere, organizzare e seguire le richieste dei clienti — così sai chi ti ha contattato, cosa serve e qual è il prossimo passo.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#contatti" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#ffb84d] px-7 py-3.5 text-sm font-semibold text-[#101522] transition-transform hover:-translate-y-0.5">Raccontaci come lavori <span aria-hidden="true" className="ml-2">→</span></a><a href="#demo" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/35">Guarda l'anteprima</a></div>
              <p className="mt-5 text-xs leading-6 text-slate-500">Prima ascoltiamo il tuo processo. Poi definiamo insieme cosa ha senso realizzare, tempi e costi.</p>
            </div>
            <div id="demo" className="relative py-5 sm:px-3"><RequestWorkflow3D /></div>
          </div>
        </section>

        <section id="problema" className="border-y border-white/[0.07] bg-[#10182b]/65 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Il problema quotidiano</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Telefonate, WhatsApp, appunti. E poi?</h2><p className="mt-5 leading-7 text-slate-300">Quando sei in cantiere, in sopralluogo o impegnato con un intervento, seguire ogni nuova richiesta può diventare complicato. Le informazioni finiscono in posti diversi e ricostruire chi richiamare richiede tempo.</p></div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">{[["01","Richieste sparse","I contatti arrivano da canali diversi e non sempre vengono raccolti nello stesso posto."],["02","Richiami dimenticati","Senza un promemoria o uno stato chiaro, una richiesta può restare senza seguito."],["03","Poca visibilità","È difficile capire a colpo d'occhio cosa è nuovo, cosa è in corso e cosa è stato chiuso."]].map(([number,title,body]) => <article key={number} className="rounded-2xl border border-white/10 bg-[#0a0e1a]/65 p-6"><span className="font-mono text-xs text-[#ffb84d]">{number}</span><h3 className="mt-5 font-display text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}</div>
          </div>
        </section>

        <section id="soluzione" className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Una soluzione concreta</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Un flusso chiaro, costruito intorno al tuo modo di lavorare.</h2><p className="mt-5 leading-7 text-slate-300">Non un gestionale enorme da imparare. Partiamo dalle informazioni che ti servono davvero e dal modo in cui oggi gestisci i contatti.</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[["01","Raccogli","Un modulo ordinato per ricevere le informazioni essenziali della richiesta."],["02","Organizza","Una vista centrale per consultare i contatti senza cercare tra chat e fogli."],["03","Segui","Stati e prossimi passi per sapere quali richieste richiedono attenzione."],["04","Migliora","Un flusso definito insieme, con possibilità di evolvere quando serve."]].map(([number,title,body]) => <article key={number} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-[#ffb84d]/40"><span className="font-mono text-xs text-[#ffb84d]">{number}</span><h3 className="mt-5 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>)}</div>
        </div></section>

        <section className="border-y border-white/[0.07] bg-[#10182b]/65 py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Cosa definiamo insieme</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Partiamo dal necessario. Senza venderti funzioni inutili.</h2><p className="mt-5 leading-7 text-slate-300">Ogni impresa lavora in modo diverso. Prima di parlare di tecnologia, capiamo come arrivano le richieste, chi le gestisce e dove si blocca il passaggio al prossimo intervento.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{[["Raccolta contatti","Quali dati servono per capire una richiesta?"],["Presa in carico","Chi deve vedere e aggiornare ogni richiesta?"],["Stato e priorità","Come distingui una richiesta nuova da una già seguita?"],["Notifiche","Quali avvisi sono davvero utili, e su quale canale?"],["Accessi","Chi può consultare o modificare le informazioni?"],["Consegna","Come usare e gestire il sistema dopo il rilascio?"]].map(([title,body]) => <div key={title} className="rounded-xl border border-white/10 bg-[#0a0e1a]/60 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>)}</div>
        </div></section>

        <section id="processo" className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Come lavoriamo</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Un percorso semplice, con decisioni chiare.</h2></div>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">{[["01","Ascolto","Ci racconti come gestisci oggi le richieste e cosa vorresti migliorare."],["02","Proposta","Ricevi una proposta scritta con funzioni, esclusioni, tempi e prezzo."],["03","Realizzazione","Sviluppiamo il perimetro approvato e verifichiamo insieme i passaggi concordati."],["04","Consegna","Ricevi accessi, documentazione e indicazioni per usare ciò che è stato realizzato."]].map(([number,title,body]) => <li key={number} className="rounded-2xl border border-white/10 p-6"><span className="font-mono text-xs text-[#ffb84d]">{number}</span><h3 className="mt-5 font-display text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></li>)}</ol>
        </div></section>

        <section id="faq" className="border-y border-white/[0.07] bg-[#10182b]/65 py-20 sm:py-24"><div className="mx-auto max-w-3xl px-5 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Domande frequenti</p><h2 className="mt-4 font-display text-3xl font-semibold">Prima di iniziare</h2><div className="mt-9 space-y-6">{[["È un software già pronto?","No. L'anteprima mostra un possibile flusso con dati dimostrativi. La soluzione viene definita dopo aver capito il processo della tua impresa."],["Devo cambiare il modo in cui lavoro?","L'obiettivo è adattare il flusso alle tue necessità, non aggiungere complessità. Valutiamo insieme cosa mantenere e cosa semplificare."],["Quanto costa?","Il costo dipende da funzioni, utenti, integrazioni e requisiti. Dopo una prima conversazione ricevi un perimetro scritto e un preventivo prima di qualsiasi impegno."],["Quanto tempo serve?","Tempi e tappe vengono stimati dopo la raccolta dei requisiti. Non promettiamo una data prima di aver verificato il lavoro necessario."],["Posso chiedere modifiche in seguito?","Sì. Le evoluzioni successive possono essere valutate e quotate separatamente, con priorità e impatto chiari."],["I miei dati sono al sicuro?","Definiamo accessi, minimizzazione dei dati e misure di protezione in base al progetto. Requisiti e responsabilità vengono concordati prima dello sviluppo."]].map(([question,answer]) => <details key={question} className="group border-b border-white/10 pb-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">{question}<span aria-hidden="true" className="text-xl text-[#ffb84d] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 pr-8 text-sm leading-7 text-slate-400">{answer}</p></details>)}</div></div></section>

        <section id="contatti" className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">Parliamone</p><h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">Raccontaci come gestisci oggi le richieste.</h2><p className="mt-5 leading-7 text-slate-300">Una prima conversazione serve a capire se possiamo aiutarti e se il progetto è realistico. Nessun pacchetto da acquistare al buio.</p><div className="mt-8 space-y-3 text-sm text-slate-400"><p>✓ Prima analizziamo il processo</p><p>✓ Poi definiamo funzioni e priorità</p><p>✓ Ricevi tempi e costi per iscritto</p></div></div>
          <div className="rounded-3xl border border-white/10 bg-[#10182b]/75 p-6 sm:p-9">{status === "sent" ? <div className="flex min-h-72 flex-col items-center justify-center text-center"><span className="text-3xl text-emerald-300" aria-hidden="true">✓</span><h3 className="mt-4 font-display text-2xl font-semibold">Richiesta ricevuta</h3><p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">Grazie per averci contattato. Ti risponderemo usando i recapiti che hai indicato.</p><button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-[#ffb84d] underline underline-offset-4">Invia un'altra richiesta</button></div> :
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm"><span>Nome e cognome *</span><input required autoComplete="name" maxLength={120} value={form.name} onChange={(e) => update("name",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label><label className="grid gap-2 text-sm"><span>Nome dell'impresa *</span><input required autoComplete="organization" maxLength={160} value={form.business} onChange={(e) => update("business",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label></div>
              <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm"><span>Email di lavoro *</span><input required type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => update("email",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label><label className="grid gap-2 text-sm"><span>Telefono (facoltativo)</span><input type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={(e) => update("phone",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label></div>
              <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm"><span>Comune / provincia</span><input autoComplete="address-level2" maxLength={120} value={form.city} onChange={(e) => update("city",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label><label className="grid gap-2 text-sm"><span>Sito web (facoltativo)</span><input type="url" autoComplete="url" maxLength={500} placeholder="https://" value={form.website} onChange={(e) => update("website",e.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-[#0a0e1a] px-4 text-white outline-none focus:border-[#ffb84d]" /></label></div>
              <label className="grid gap-2 text-sm"><span>Qual è la difficoltà principale nella gestione delle richieste? *</span><textarea required minLength={10} maxLength={3000} rows={4} value={form.message} onChange={(e) => update("message",e.target.value)} placeholder="Ad esempio: riceviamo richieste su WhatsApp e poi facciamo fatica a ricordarci chi richiamare..." className="resize-y rounded-xl border border-white/10 bg-[#0a0e1a] px-4 py-3 text-white outline-none focus:border-[#ffb84d]" /></label>
              <label className="flex items-start gap-3 text-xs leading-6 text-slate-400"><input required type="checkbox" checked={form.privacyAccepted} onChange={(e) => update("privacyAccepted",e.target.checked)} className="mt-1 h-4 w-4 accent-[#ffb84d]" /><span>Ho letto l'<a href="/privacy" className="text-[#ffcf78] underline underline-offset-2">informativa privacy</a> e chiedo di essere ricontattato in merito a questa richiesta. Non sto acconsentendo a comunicazioni promozionali future.</span></label>
              {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
              <button type="submit" disabled={status === "sending"} className="min-h-13 rounded-full bg-[#ffb84d] px-7 py-3.5 text-sm font-semibold text-[#101522] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Invio in corso…" : "Invia la richiesta"}</button>
              <p className="text-xs leading-5 text-slate-500">I campi contrassegnati con * sono obbligatori. Non inviare password o dati sensibili.</p>
            </form>}
          </div>
        </div></section>
      </main>

      <footer className="border-t border-white/[0.08] bg-[#070b14] py-10"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between"><div><p className="font-display font-semibold text-white">PrismWave Studio</p><p className="mt-1">Soluzioni digitali per piccole imprese italiane.</p></div><nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Link legali"><a href="/privacy" className="hover:text-white">Privacy</a><a href="/terms" className="hover:text-white">Termini</a><a href="/regulatory" className="hover:text-white">Informazioni aziendali</a></nav><p>© {new Date().getFullYear()} PrismWave Studio</p></div></footer>
    </div>
  );
}
