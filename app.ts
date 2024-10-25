interface IStartup {
  nome: string;
  settoreFocus: string;
  descrizione: string;
  prodottiServiziOfferti: string[];

  incentiviRicevuti: IIncentivo[];
  cittadiniPartecipanti: ICittadino[];

  riceviIncentivo(incentivo: IIncentivo): void;
}

interface IIncentivo {
  codiceIdentificativo: string;
  descrizione: string;
  valore: number;
  criteriEleggibilita: string[];

  assegnaAStartup(startup: IStartup): void;
}

interface ICittadino {
  nome: string;
  cognome: string;
  eta: number;
  interessiSportivi: string[];

  partecipaAttività(startup: IStartup): void;
}
//classi////////
class Startup implements IStartup {
  nome: string;
  settoreFocus: string;
  descrizione: string;
  prodottiServiziOfferti: string[];

  incentiviRicevuti: IIncentivo[] = [];
  cittadiniPartecipanti: ICittadino[] = [];

  constructor(
    nome: string,
    settoreFocus: string,
    descrizione: string,
    prodottiServiziOfferti: string[]
  ) {
    this.nome = nome;
    this.settoreFocus = settoreFocus;
    this.descrizione = descrizione;
    this.prodottiServiziOfferti = prodottiServiziOfferti;
  }

  riceviIncentivo(incentivo: IIncentivo): void {
    // Verifica se l'incentivo è stato approvato
    if (
      this.incentiviRicevuti.some(
        (i) => i.codiceIdentificativo === incentivo.codiceIdentificativo
      )
    ) {
      // esegui l'azione se l'incentivo è stato approvato
      console.log(
        `La startup ${this.nome} ha ricevuto l'incentivo ${incentivo.codiceIdentificativo} dal valore di ${incentivo.valore}.`
      );
      console.log(
        `Gli incentivi della startup ${this.nome} sono:`,
        this.incentiviRicevuti
      );
    } else {
      console.log(
        `La startup ${this.nome} non ha ricevuto l'incentivo ${incentivo.codiceIdentificativo}.`
      );
    }
  }
}
class Incentivo implements IIncentivo {
  codiceIdentificativo: string;
  descrizione: string;
  valore: number;
  criteriEleggibilita: string[];

  constructor(
    codiceIdentificativo: string,
    descrizione: string,
    valore: number,
    criteriEleggibilita: string[]
  ) {
    this.codiceIdentificativo = codiceIdentificativo;
    this.descrizione = descrizione;
    this.valore = valore;
    this.criteriEleggibilita = criteriEleggibilita;
  }

  assegnaAStartup(startup: IStartup): void {
    // Verifica se la startup soddisfa i criteri di eleggibilità per l'incentivo
    if (this.criteriEleggibilita.includes(startup.settoreFocus)) {
      // Assegna l'incentivo alla startup
      startup.incentiviRicevuti.push(this),
        console.log(
          `L'incentivo ${this.codiceIdentificativo} è stato assegnato a ${startup.nome}.`
        );
    } else {
      console.log(
        `La Startup ${startup.nome} non soddisfa i criteri di eleggibilità dell'incentivo ${this.codiceIdentificativo}.`
      );
    }
  }
}

class Cittadino implements ICittadino {
  nome: string;
  cognome: string;
  eta: number;
  interessiSportivi: string[];

  constructor(
    nome: string,
    cognome: string,
    eta: number,
    interessiSportivi: string[]
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.eta = eta;
    this.interessiSportivi = interessiSportivi;
  }

  partecipaAttività(startup: IStartup): void {
    startup.cittadiniPartecipanti.push(this);
    // inserisce il cittadino alla startup
    console.log(`${this.nome} partecipa alla startup:`, startup.nome);
    console.log(
      `${startup.nome} ha i cittadini partecipanti:`,
      startup.cittadiniPartecipanti
    );
    
  }
}
// creazione startup
const startup1 = new Startup(
  "FitTech",
  "App per il fitness",
  "Sviluppiamo app per il fitness che aiutano gli utenti a monitorare i loro progressi",
  ["App di monitoraggio fitness", "Servizi di consulenza fitness"]
);

const startup2 = new Startup(
  "WearSport",
  "Tecnologie wearable",
  "Innoviamo il mondo dello sport con dispositivi wearable che monitorano le prestazioni",
  ["Smartwatch per atleti", "Abbigliamento sportivo intelligente"]
);

// creazione incentivo
const incentivo1 = new Incentivo(
  "INC001",
  "Incentivo per lo sviluppo app fitness",
  10000,
  ["App per il fitness", "Sviluppo di una community online per sportivi"]
);

const incentivo2 = new Incentivo(
  "INC002",
  "Incentivo per le tecnologie wearable",
  15000,
  ["Tecnologie wearable", "Smartwatch per atleti", "Abbigliamento intelligente"]
);

const incentivo3 = new Incentivo(
  "INC003",
  "Incentivo per l'AI nella salute",
  7500,
  [
    "App per il fitness",
    "Machine learning per la diagnosi",
    "Chatbot per la salute mentale",
    "Dati per la ricerca medica",
  ]
);

// creazione Cittadino
const cittadino1 = new Cittadino("Paolo", "Rossi", 25, ["corsa", "palestra"]);
const cittadino2 = new Cittadino("Giulia", "Verdi", 30, ["ciclismo", "nuoto"]);

// test incentivo riuscito
incentivo1.assegnaAStartup(startup1);
startup1.riceviIncentivo(incentivo1);

// test incentivo riuscito
incentivo2.assegnaAStartup(startup2);
startup2.riceviIncentivo(incentivo2);

// test incentivo riuscito
incentivo3.assegnaAStartup(startup1);
startup1.riceviIncentivo(incentivo3);

// test incentivo non riuscito
incentivo1.assegnaAStartup(startup2);
startup2.riceviIncentivo(incentivo1);

// test cittadino partecipa startup
cittadino1.partecipaAttività(startup1);
cittadino2.partecipaAttività(startup1);
