---
title: "Le fallacie dei sistemi distribuiti"
date: 2025-01-13T05:00:00Z
image: /images/posts/post-2.jpg
categories: 
  - Architecture
draft: false
---

I sistemi distribuiti sono ormai il cuore pulsante delle applicazioni moderne, permettendo scalabilità, resilienza e performance elevate. Tuttavia, progettare sistemi distribuiti comporta sfide non banali.

Molti errori derivano dalle cosiddette fallacie dei sistemi distribuiti, un elenco stilato da Sun Microsystems (sì, gli stessi che hanno creato Java!) che evidenzia presupposti errati spesso fatti da specialisti poco familiari con questi contesti.

E’ molto importante avere chiaro i punti sottostanti.

La rete non è affidabile – Le connessioni di rete possono guastarsi, subire interruzioni o essere compromesse da attacchi informatici. Ogni sistema distribuito deve essere progettato per affrontare queste eventualità. Ad esempio, un microservizio che non gestisce i timeout rischia di lasciare richieste sospese, provocando blocchi che si propagano ad altri servizi collegati. Sistemi robusti devono quindi prevedere meccanismi di recupero, come ritrasmissioni automatiche, rilevamento dei guasti e strategie di failover per mantenere l’operatività.

La latenza non è zero – Quando i nodi di un sistema distribuito comunicano tra loro, il tempo richiesto per il trasferimento dei dati, noto come latenza, può influire gravemente sulle prestazioni. Ignorare questo fattore è un errore comune, soprattutto in applicazioni che necessitano di risposte rapide. Un sistema di analisi “real-time”, ad esempio, potrebbe fornire dati obsoleti se i ritardi di rete non vengono considerati. Mitigare questi problemi richiede sia un’ottimizzazione dei flussi di comunicazione che l’uso di nodi vicini agli utenti per ridurre le distanze.

La larghezza di banda non è infinita – Anche le reti più moderne hanno limiti di capacità. Se non si ottimizza il traffico, è facile raggiungere questi limiti, causando rallentamenti o interruzioni. Pensiamo, ad esempio, ai servizi di streaming video: l’invio di contenuti non compressi può saturare la rete, degradando l’esperienza degli utenti. La soluzione passa per tecniche di compressione, aggregazione dei dati e trasmissione selettiva solo delle informazioni essenziali.

La rete non è sicura – Ogni nodo aggiunto a un sistema distribuito rappresenta una potenziale vulnerabilità. Senza un’adeguata protezione, i dati in transito possono essere intercettati, manipolati o rubati. La sicurezza non può essere un’aggiunta successiva, ma deve essere integrata fin dall’inizio. Per esempio, l’assenza di crittografia nella trasmissione di informazioni sensibili potrebbe compromettere seriamente la privacy degli utenti. Sistemi distribuiti sicuri includono protocolli di cifratura, autenticazione solida e una gestione attenta delle credenziali.

La topologia cambia in continuazione – In un ambiente distribuito, i nodi possono unirsi, lasciare la rete o cambiare posizione. Questi cambiamenti dinamici possono causare errori in configurazioni troppo rigide. Un esempio tipico è l’utilizzo di un indirizzo IP fisso per connettersi a un server: se il server viene spostato o sostituito, la connessione fallisce. Sistemi ben progettati devono invece prevedere meccanismi di discovery dinamica, capaci di adattarsi a una rete in continua evoluzione.

Non c’è un solo amministratore – I sistemi distribuiti operano spesso su domini amministrativi multipli, ciascuno gestito da entità diverse. Questa complessità può generare incoerenze nella configurazione e nei protocolli adottati. Per esempio, un firewall mal configurato in un dominio potrebbe impedire l’accesso a risorse cruciali in un altro. La cooperazione tra amministratori e l’adozione di standard condivisi sono fondamentali per evitare conflitti e garantire un funzionamento fluido.

Il costo di trasporto non è zero – Ogni volta che i dati vengono trasferiti tra i nodi, si consumano risorse: tempo, larghezza di banda e, nei servizi cloud, denaro. Ignorare questi costi può portare a inefficienze operative e spese impreviste. Un’applicazione che effettua chiamate API non ottimizzate, per esempio, potrebbe aumentare i costi di trasferimento dati nel cloud. È quindi essenziale progettare flussi di lavoro che minimizzino i trasferimenti non necessari e sfruttino cache locali o regionali per ridurre il carico sulla rete.

La rete non è omogenea – Le reti differiscono in termini di velocità, stabilità e tipo di connessione. Un’applicazione progettata per reti cablate potrebbe non funzionare altrettanto bene su connessioni mobili, caratterizzate da maggiore latenza e frequenti interruzioni. Per garantire un funzionamento affidabile su scala globale, i sistemi distribuiti devono adattarsi automaticamente alle condizioni di rete variabili, fornendo la migliore esperienza possibile a prescindere dall’ambiente.

Per affrontare le sfide che derivano dalle fallacie nei sistemi distribuiti, i professionisti del software si affidano a modelli consolidati e design pattern che migliorano la resilienza, la sicurezza e la scalabilità dei sistemi.

Questi modelli sono fondamentali per gestire la complessità intrinseca e per evitare che piccole problematiche possano compromettere l’intero sistema.

#### Gestione dei dati

In un sistema distribuito, la gestione dei dati è cruciale per mantenere la coerenza e le prestazioni.

Tecniche come il caching consentono di memorizzare temporaneamente i dati più richiesti in memoria, riducendo il carico sui database e abbassando i tempi di accesso.

Ciò migliora significativamente le performance, soprattutto in scenari ad alta domanda, dove i dati vengono frequentemente letti ma raramente modificati. Inoltre, la sincronizzazione dei dati tra i vari nodi del sistema è essenziale per evitare incongruenze: senza un’adeguata sincronizzazione, i dati potrebbero risultare obsoleti o contraddittori tra i diversi nodi.

La replica dei dati è una delle soluzioni per garantire la disponibilità e la coerenza, assicurando che ogni nodo disponga delle informazioni più aggiornate. Senza questi pattern, un errore di sincronizzazione potrebbe portare a bug gravi o disservizi.

#### Progettazione modulare

La progettazione modulare è un altro pattern fondamentale per affrontare la complessità dei sistemi distribuiti.

Suddividere un sistema in moduli o componenti indipendenti consente di gestire migrazioni, aggiornamenti e modifiche in modo più graduale e sicuro.

Ogni modulo è progettato per funzionare autonomamente, il che significa che gli aggiornamenti o i cambiamenti a un modulo non devono necessariamente influenzare l’intero sistema.

Questa separazione delle preoccupazioni facilita la manutenzione e la scalabilità. Quando una parte del sistema deve essere aggiornata o migliorata, ad esempio, si può intervenire sul singolo modulo senza necessità di fermare l’intero sistema, minimizzando i tempi di inattività.

Inoltre, questo approccio riduce il rischio di introdurre errori su larga scala, poiché ogni componente è testato singolarmente prima di essere integrato nel sistema principale.

####  Messaggistica robusta
La messaggistica robusta è essenziale per garantire che la comunicazione tra i vari nodi di un sistema distribuito avvenga in modo sicuro e affidabile.

In un sistema distribuito, le comunicazioni sono suscettibili a ritardi, perdite di pacchetti o addirittura fallimenti temporanei.

Per prevenire che questi problemi compromettano l’intero sistema, è importante implementare modelli di retry, che permettano di riprovare automaticamente le operazioni che non sono andate a buon fine.

Ad esempio, se un microservizio non è riuscito a ricevere una risposta a causa di un errore di rete, un meccanismo di retry garantirà che la richiesta venga ripetuta senza causare interruzioni nel flusso del sistema.

I modelli di retry sono progettati per evitare che guasti momentanei possano causare un effetto a catena, che potrebbe compromettere l’intero processo.

####  Sicurezza
La sicurezza è un aspetto cruciale in ogni sistema distribuito.

In un’architettura distribuita, ogni nodo è potenzialmente un punto vulnerabile che può essere preso di mira da attacchi esterni.

Integrare misure di sicurezza direttamente nel design del sistema è fondamentale. Questo include l’adozione di crittografia per proteggere i dati in transito, autenticazione avanzata per verificare che solo gli utenti e i sistemi autorizzati possano accedere ai dati e alle risorse, e la gestione sicura dei secrets, che si riferisce alla protezione delle credenziali sensibili come chiavi API o password.

Un sistema sicuro garantisce che, anche se un nodo viene compromesso, l’impatto sull’intero sistema sarà contenuto, grazie alla protezione dei dati e alle strategie di risposta agli attacchi.

Comprendere e affrontare le fallacie dei sistemi distribuiti non è solo un aspetto tecnico, ma rappresenta un approccio alla progettazione di sistemi che siano resilienti, sicuri e scalabili.

La resilienza garantisce che il sistema possa continuare a funzionare correttamente anche in presenza di guasti o condizioni impreviste, la sicurezza assicura che i dati e le comunicazioni siano protetti da attacchi e l’integrità sia preservata, mentre la scalabilità permette di adattarsi a crescenti carichi di lavoro.

In un contesto in cui il cloud e le architetture distribuite sono ormai lo standard, ogni specialista del software dovrebbe integrare questi principi fin dalle prime fasi di progettazione, per garantire che le soluzioni siano non solo efficienti, ma anche in grado di rispondere alle esigenze di un mondo digitale sempre più complesso e interconnesso.


