Progetto BW1 
Progetto mensile realizzato da Alex Alessandro Francesco Luca e Vincenzo

Per prima cosa abbiamo messo insieme le nostre idee per il progetto, ovvero come strutturare i file html, css e JS. Una volta 
eletta la struttura logica, abbiamo diviso il lavoro in task con ambiti di competenza specifici.

Abbiamo stabilito i ruoli e iniziato la stesura del progetto.

Giorno 1:
Vincenzo:
Partendo dal testo della traccia ho scoperto l'esistenza del progetto Open Trivia DB, e ne ho studiato il funzionamento. 
Ho studiato a grandi linee i metodi asincroni e partendo da un tutorial su youtube ho creato un metodo che scarica 50 domande
da Open Trivia DB sotto forma di array di oggetti, e creato un metodo che ne seleziona un numero tale per cui il tempo per rispondere
a ogni domanda sia di 30 minuti (30 secondi per le domande facili, 60 per le normali e 120 per le difficili).
Ho creato un metodo che renderizza dinamicamente un div con dentro domande e risposte. I listener dei pulsanti delle risposte
ciclano l'array di domande da proporre, puliscono il div contenitore e propongono un nuovo div con la domanda successiva. 
Al termine dell'array di domande, viene lanciato il metodo che renderizza le risposte e la posizione nella leaderboard. Ho lasciato a Luca 
l'onere di formattare e animare la pagina dinamica delle domande e a Francesco di realizzare un timer che conti i secondi rimasti per rispondere
