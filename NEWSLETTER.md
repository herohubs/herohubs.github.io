# Newsletter — note e valutazione

Documento di lavoro per valutare l'aggiunta di un'iscrizione alla newsletter al blog, da rifinire in seguito. Nessuna decisione ancora presa, nessuna implementazione avviata.

## Contesto

- Il blog non è il core business: l'autore fa il consulente. La newsletter è uno strumento di posizionamento e lead nurture, non un prodotto.
- Distribuzione attuale degli articoli: solo **LinkedIn** (pagina aziendale herohubs + rilancio personale) e **stato WhatsApp**.
- Sito: **Astro statico** (dominio `herohubs.it`). Niente backend: qualunque soluzione deve appoggiarsi a un provider hosted.

## Perché ha senso

- LinkedIn e lo stato WhatsApp sono **canali in affitto**: dipendono dall'algoritmo e dal pubblico già acquisito, e il contenuto evapora in fretta.
- La mailing list è un **asset di proprietà**: raggiunge direttamente chi ha già mostrato interesse, quando si vuole.
- Per un consulente il valore non è l'engagement sulla newsletter ma **restare top-of-mind con potenziali clienti caldi**. L'articolo è il pretesto, la lista è il patrimonio.
- Rischio reale: non tecnico ma di **manutenzione**. Se la lista resta minuscola e non viene coltivata, diventa vanity. Quindi va scelta la soluzione a **costo marginale per articolo ≈ zero**.

## La leva chiave: RSS-to-email

Molti provider inviano automaticamente una campagna quando compare un nuovo item nel **feed RSS** del blog. Risultato: si continua a pubblicare solo l'articolo e la newsletter parte da sola, senza doppio lavoro. È ciò che distingue una newsletter che sopravvive da una che muore in pochi mesi.

- Da verificare: se Astro sta già esponendo un feed RSS o se va aggiunto (operazione piccola, es. `@astrojs/rss`).

## Vie possibili (tre livelli)

1. **MVP** — account su provider hosted, pagina di iscrizione pronta + form embeddabile. Form in fondo all'articolo (layout `PostSingle`) e link "iscriviti" nel primo commento LinkedIn e nello stato WhatsApp. Si iniziano a raccogliere indirizzi.
2. **Automazione** — collegare il feed RSS al provider e configurare la campagna RSS: ogni nuovo post diventa email in automatico.
3. **Rifinitura (se/quando la lista cresce)** — template email brandizzato, double opt-in, segmentazione.

Da evitare: soluzioni custom (backend, serverless). Sito statico + provider hosted è più rapido e non costringe a gestire in casa la deliverability.

## Provider candidati

| Provider         | Punti di forza                                                                                              | Note                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Buttondown**   | Minimale, email in markdown, taglio dev, RSS-to-email, free tier                                            | Prima scelta per profilo sviluppatore                                    |
| **MailerLite**   | Free tier generoso, form embeddabili, RSS-to-email, buona deliverability, integrazioni con Claude e ChatGPT | **In pole.** Interfaccia più "marketing"                                 |
| **EmailOctopus** | Simile a MailerLite, free tier                                                                              | Alternativa                                                              |
| **Substack**     | Attrito quasi zero per partire                                                                              | Sposta il baricentro del contenuto su di loro, forte imprinting di brand |

### MailerLite — free tier (dettaglio)

Piano gratuito valutato come punto di partenza:

- Fino a **150 subscriber** e **2.500 email al mese**
- **2 user seat**
- Supporto email e chat 24/7 per i primi 14 giorni
- Core features: invio campagne email, automazioni visuali, siti e landing page, vendita di prodotti/servizi digitali, form di iscrizione, 100+ integrazioni (incluse Claude e ChatGPT), report sulle performance, A/B testing delle campagne

Il limite dei 150 subscriber è ampiamente sufficiente per la fase iniziale; l'upgrade si valuta solo quando la lista cresce.

## Accortezze non tecniche

- **GDPR (Italia)**: serve una riga di privacy policy e idealmente **double opt-in** (i provider EU-friendly lo fanno di default). Alza la qualità della lista e mette al riparo.
- **Frequenza**: non promettere una cadenza che non si mantiene. Posizionarla come "ti avviso quando esce un articolo", non "newsletter settimanale".

## Sintesi

Soluzione consigliata: **provider hosted + form in fondo all'articolo + RSS-to-email**. Si scrive una volta e la lista si alimenta da sola. Buttondown per il taglio dev, MailerLite per la comodità.

## Prossimi passi (quando si passa all'azione)

1. Verificare se il blog espone già un feed RSS; in caso contrario aggiungerlo.
2. Scegliere il provider.
3. Creare account e ottenere form embeddabile + pagina di iscrizione.
4. Inserire il form nel layout `PostSingle` (fondo articolo).
5. Configurare la campagna RSS-to-email.
6. Aggiungere privacy policy / consenso e attivare il double opt-in.
7. Aggiungere il link di iscrizione al primo commento LinkedIn e allo stato WhatsApp.

## Decisioni aperte

- Provider definitivo (al momento orientati su **MailerLite**, free tier fino a 150 subscriber).
- Newsletter come semplice "avviso nuovo articolo" oppure con contenuto extra (commento/approfondimento) rispetto al blog.
- Bilingue (it/en) come il blog, o solo italiano.
