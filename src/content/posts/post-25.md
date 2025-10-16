---
title: "SST: il futuro del serverless su AWS"
date: 2025-05-13T05:00:00Z
image: /images/posts/post-25.jpg
categories: 
  - Architecture
draft: false
---

Trovare strumenti che coniughino semplicità, potenza e flessibilità è come scoprire una gemma nascosta.

Oggi vogliamo condividere la nostra esperienza con SST (Serverless Stack), un framework che sta rivoluzionando il nostro approccio allo sviluppo serverless, permettendoci di creare applicazioni cloud native con una velocità mai sperimentata prima.

SST è un framework open-source che semplifica drasticamente lo sviluppo di applicazioni serverless su AWS. A differenza di altri strumenti, SST offre un’esperienza di sviluppo locale estremamente fluida, pur mantenendo la completa compatibilità con l’infrastruttura cloud.

Ciò che rende SST davvero speciale è il suo approccio developer-first: mentre molti strumenti ti costringono a scegliere tra velocità di sviluppo e potenza in produzione, SST ti permette di avere entrambe. La filosofia alla base di SST è chiara: eliminare il divario tra l’ambiente di sviluppo locale e quello di produzione cloud, consentendo agli sviluppatori di costruire applicazioni serverless senza compromessi.

Hero Hubs ha subito adottato SST per alcuni progetti chiave e i risultati sono stati sorprendenti.

I tempi di sviluppo si sono ridotti del 40%, principalmente grazie all’hot-reloading locale delle funzioni Lambda, che ci ha permesso di iterare molto più velocemente.

Questa funzionalità da sola ha trasformato il nostro processo di sviluppo, eliminando quei tempi morti di attesa che prima rallentavano il nostro flusso creativo.

Un altro vantaggio significativo che abbiamo notato è stato l’onboarding dei collaboratori, che ora richiede giorni invece che settimane.

La curva di apprendimento è notevolmente più dolce rispetto ad altri framework serverless che avevamo utilizzato in passato. I membri del team riescono a diventare produttivi quasi immediatamente, comprendendo facilmente sia l’architettura delle applicazioni sia i processi di deployment.

A proposito di deployment, quelli basati su SST sono risultati essere più affidabili e privi di sorprese. Il sistema di “staging” di SST garantisce che ciò che funziona in locale funzioni anche in produzione, risparmiandoci quelle frustranti sessioni di debug post-deployment che prima erano la norma piuttosto che l’eccezione.

La possibilità di definire l’intera infrastruttura come codice ha inoltre reso possibile replicare rapidamente l’intera pipeline per nuovi clienti o casi d’uso, accelerando notevolmente i tempi di implementazione e riducendo il rischio di errori di configurazione.

#### Vantaggi

Se sei un decisore tecnologico, SST offre vantaggi concreti che vanno ben oltre le considerazioni puramente tecniche. La riduzione significativa del Time to Market è probabilmente il più evidente.

I costi operativi sono drasticamente diminuiti grazie all’approccio pay-per-use del serverless, ottimizzato dal framework. Un’applicazione che prima richiedeva server dedicati ora scala automaticamente in base al carico, riducendo i costi nei momenti di basso utilizzo e garantendo prestazioni ottimali nei picchi di traffico.

La scalabilità garantita senza la necessità di gestire complesse infrastrutture è un altro punto a favore di SST. I nostri clienti non devono più preoccuparsi di capacità di server, bilanciatori di carico o altri aspetti infrastrutturali: tutto è gestito automaticamente.

Infine, abbiamo riscontrato minori rischi tecnologici grazie alla solida tipizzazione TypeScript e alla trasparenza dell’infrastruttura come codice.

Ogni modifica è tracciabile, testabile e reversibile, riducendo significativamente la possibilità di errori critici in produzione.

#### La nostra esperienza diretta

Da quando abbiamo iniziato a utilizzare SST, abbiamo notato un cambiamento culturale proprio nel modo di approcciare a certe tematiche. La frustrazione legata ai lunghi cicli di deploy è stata sostituita da una maggiore concentrazione sulla logica di business e sull’innovazione.

SST ci ha permesso di dire sì a progetti che prima avremmo rifiutato per questioni di tempistiche o complessità tecnica. Ha letteralmente ampliato le nostre possibilità di business.

SST è molto più di quello che abbiamo potuto descrivere in questo articolo. Se sei curioso di scoprire come potrebbe trasformare anche i tuoi progetti, visita sst.dev.

La nostra esperienza conferma che il passaggio a questo framework non è solo un cambiamento tecnologico, ma è un vero e proprio salto di qualità nel modo di concepire e realizzare applicazioni cloud.