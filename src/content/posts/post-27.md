---
title: "6 modi per passare parametri a una REST API in Spring Boot (Java)"
date: 2025-05-13T05:00:00Z
image: /images/posts/post-27.jpg
categories: 
  - Programming
draft: false
---

Accettare parametri per l’elaborazione lato server è un requisito fondamentale delle API REST.

Spesso si fa confusione tra le diverse modalità di passaggio dei parametri, utilizzandole in modo errato. Questo articolo ha l’obiettivo di chiarire una volta per tutte le differenze tra questi approcci e di spiegare come utilizzarli correttamente in Spring Boot.

Esploreremo 6 modi per passare parametri a un endpoint REST e come possiamo accettarli e leggerli in Spring Boot con Java.


#### 1. Query Parameters
I parametri di query vengono aggiunti all’URL dopo il punto interrogativo.

Sono comunemente usati per il filtraggio, l’ordinamento o per fornire un contesto aggiuntivo all’endpoint REST. Il loro utilizzo è semplice e immediato, ma è importante essere consapevoli delle loro limitazioni.

I query parameters sono facili da usare e leggibili, ideali per richieste prevedibili e per passare dati opzionali. Tuttavia, possono essere problematici se contengono dati sensibili, poiché questi possono essere esposti nei log dei server o nella cronologia del browser. Inoltre, alcuni browser e server impongono limiti alla lunghezza degli URL, rendendo difficile il passaggio di parametri molto estesi.

Esempio – Recupero di prodotti per categoria

Immaginiamo di voler ottenere tutti i prodotti appartenenti a una determinata categoria.

Endpoint

@GetMapping("/products")
public List<Product> getProductsByCategory(@RequestParam String category) {
    return productService.findByCategory(category);
}
Accesso all’Endpoint

curl http://localhost:8080/products?category=electronics

#### 2. Path Variables

Le variabili di percorso sono segnaposto nell’URI che vengono sostituiti con valori reali al momento della richiesta.

Sono perfette per identificatori univoci, come ID di prodotto o username, garantendo URL chiari e descrittivi. Tuttavia, non sono adatte per parametri opzionali, poiché la loro assenza potrebbe invalidare la richiesta.

Usare le path variables rende le API più leggibili e strutturate, ma un utilizzo improprio, come nidificare troppi livelli di path con parametri, può portare a URL complessi e difficili da gestire.

Esempio – Recupero di un prodotto specifico

Vogliamo ottenere le informazioni su un prodotto specifico dato il suo ID.

Endpoint

@GetMapping("/products/{id}")
public Product getProductById(@PathVariable Long id) {
    return productService.findById(id);
}
Accesso all’Endpoint

curl http://localhost:8080/products/101

#### 3. Matrix Variables

Le variabili di matrice permettono di passare parametri all’interno dell’URI, separati da un punto e virgola.

Sono utili per applicazioni che richiedono una struttura gerarchica delle risorse, offrendo un modo ordinato di filtrare i dati direttamente nell’URL. Tuttavia, sono poco supportate dai browser e da alcuni client HTTP, e richiedono una configurazione aggiuntiva in Spring Boot.

Se ben utilizzate, le matrix variables migliorano la leggibilità e la flessibilità delle API REST, ma la loro scarsa diffusione le rende meno pratiche rispetto ad altri metodi.

Esempio – Filtro avanzato sui prodotti

Vogliamo filtrare i prodotti per categoria e per prezzo massimo.

Endpoint

@GetMapping("/products")
public List<Product> getFilteredProducts(@MatrixVariable String category, @MatrixVariable double maxPrice) {
    return productService.findByCategoryAndPrice(category, maxPrice);
}
Accesso all’Endpoint

curl http://localhost:8080/products;category=electronics;maxPrice=500.00;

#### 4. Request Body

Il corpo della richiesta è l’approccio ideale per inviare payload complessi a endpoint POST o PUT.

Permette di trasmettere oggetti strutturati senza limitazioni di lunghezza, a differenza dei parametri di query. Tuttavia, non è idempotente: ogni chiamata può modificare lo stato del server, rendendolo inadatto per operazioni di sola lettura.

Usare il request body è indispensabile per la creazione e l’aggiornamento di risorse, ma la sua natura non trasparente può rendere più difficile il debug e il tracciamento dei dati.

Esempio – Creazione di nuovi prodotti

Vogliamo aggiungere uno o più prodotti tramite una richiesta POST.

Endpoint

@PostMapping("/products/add")
public ResponseEntity<String> addProducts(@RequestBody List<Product> products) {
    productService.addProducts(products);
    return ResponseEntity.ok("Products added successfully");
}
Accesso all’Endpoint

curl --header "Content-Type: application/json" \
  --request POST \
  --data '[{"name": "Laptop","category": "electronics","price": 1200.00},
          {"name": "Smartphone","category": "electronics","price": 800.00}]' \
  http://localhost:8080/products/add

#### 5. Request Headers

Gli header HTTP consentono di passare informazioni aggiuntive come token di autenticazione o preferenze di configurazione. Questo metodo è utile per trasmettere dati sensibili in modo sicuro, evitando di esporli nell’URL.

Tuttavia, i parametri nei request headers non sono visibili direttamente, rendendo più difficile il debug e la gestione delle richieste. Inoltre, alcune configurazioni di rete o proxy possono alterare o bloccare determinati header.

Esempio – Recupero di un prodotto con autenticazione

Vogliamo ottenere un prodotto specifico ma richiediamo un token di autenticazione nell’header.

Endpoint

@GetMapping("/products/{id}")
public Product getProductById(@PathVariable Long id, @RequestHeader("Authorization") String authToken) {
    return productService.findByIdWithAuth(id, authToken);
}
Accesso all’Endpoint

curl -H "Authorization: Bearer <_authToken_>" http://localhost:8080/products/101

#### 6. Cookies

L’uso dei cookie è una soluzione efficace per mantenere lo stato tra richieste successive, ad esempio per tracciare sessioni utente o salvare preferenze.

Essendo separati dall’URL, i cookie offrono maggiore sicurezza rispetto ai query parameters. Tuttavia, sono soggetti a restrizioni nei browser moderni per motivi di privacy e possono essere bloccati da alcune configurazioni di sicurezza.

Usare i cookie in un’API REST stateless non è sempre consigliato, poiché potrebbe andare contro il principio di indipendenza delle richieste. Tuttavia, per applicazioni che richiedono interazioni stateful, possono rappresentare una soluzione efficace.

Esempio – Recupero di prodotti in base alla preferenza dell’utente

Vogliamo ottenere i prodotti consigliati per l’utente sulla base delle sue preferenze salvate in un cookie.

Endpoint

@GetMapping("/products/recommended")
public List<Product> getRecommendedProducts(@CookieValue("UserPreference") String userPreference) {
    return productService.findRecommended(userPreference);
}
Accesso all’Endpoint

curl --cookie "UserPreference=gaming" http://localhost:8080/products/recommended
Abbiamo esplorato 6 modi per passare parametri agli endpoint REST in Spring Boot e come accedervi.

Ogni metodo ha vantaggi e limitazioni, e la scelta del giusto approccio dipende dalle esigenze specifiche del progetto.

Un uso corretto di questi meccanismi migliora la sicurezza, la leggibilità e la manutenibilità delle API.