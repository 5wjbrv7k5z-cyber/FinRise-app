export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xpReward: number;
  summary: string;
  keyTakeaways: string[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badgeColor: string;
  lessons: Lesson[];
}

export const CURRICULUM: Module[] = [
  {
    id: 'mod-1',
    number: '01',
    title: 'Bazele Banilor și Bugetul',
    subtitle: 'Cum funcționează banii tăi, regula 50/30/20 și controlul cheltuielilor.',
    badgeColor: '#4361EE',
    lessons: [
      {
        id: 'l-1-1',
        title: 'Ce sunt banii și cum lucrează pentru tine',
        duration: '4 min',
        xpReward: 50,
        summary: 'Banii nu sunt doar o hârtie sau un număr pe ecran — sunt un instrument care îți cumpără timp, libertate și opțiuni. Cu cât înțelegi mai devreme cum se mișcă, cu atât ai mai mult control.',
        keyTakeaways: [
          'Venitul activ vine din timpul și munca ta; venitul pasiv vine din active care produc bani.',
          'Cheltuielile impulsive fură din viitorul tău fără să îți aducă valoare pe termen lung.',
          'A plăti mai întâi pentru viitorul tău este un obicei de bază.'
        ],
        quiz: [
          {
            id: 'q-1-1-1',
            question: 'Care este cel mai bun mod de a privi banii la început de drum?',
            options: [
              'Ca pe un instrument care îți oferă opțiuni și libertate în timp',
              'Ca pe ceva ce trebuie cheltuit imediat ce intră în cont',
              'Ca pe o măsură a valorii tale personale'
            ],
            correctIndex: 0,
            explanation: 'Banii sunt un instrument practic: gestionați bine, îți oferă siguranță și libertate de alegere.'
          },
          {
            id: 'q-1-1-2',
            question: 'Ce înseamnă „plătește-te pe tine întâi”?',
            options: [
              'Să îți iei o cafea sau un joc înainte de orice',
              'Să pui deoparte o sumă pentru economii/investiții imediat ce primești bani',
              'Să nu mai plătești nicio datorie'
            ],
            correctIndex: 1,
            explanation: 'Înseamnă să îți construiești mai întâi rezerva și viitorul, înainte ca banii să se risipească pe cheltuieli mărunte.'
          }
        ]
      },
      {
        id: 'l-1-2',
        title: 'Regula 50 / 30 / 20 pe limba ta',
        duration: '5 min',
        xpReward: 50,
        summary: 'Un buget nu trebuie să fie complicat sau restrictiv. Regula 50/30/20 împarte venitul în nevoi esențiale, dorințe și economii/investiții.',
        keyTakeaways: [
          '50% — Nevoi: lucruri de bază (transport, mâncare esențială, rechizite/facturi).',
          '30% — Dorințe: ieșiri în oraș, gaming, haine peste necesar, abonamente.',
          '20% — Viitor: fond de urgență, obiective, investiții.'
        ],
        quiz: [
          {
            id: 'q-1-2-1',
            question: 'Un abonament nou la un serviciu de streaming intră la:',
            options: [
              'Nevoi (50%)',
              'Dorințe (30%)',
              'Fond de urgență (20%)'
            ],
            correctIndex: 1,
            explanation: 'Divertismentul și abonamentele opționale sunt dorințe, nu nevoi de supraviețuire.'
          },
          {
            id: 'q-1-2-2',
            question: 'Ce procent recomandă regula clasică pentru economii și investiții?',
            options: [
              '5%',
              '20%',
              '80%'
            ],
            correctIndex: 1,
            explanation: '20% este reperul de bază pentru economisire și investiții.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    number: '02',
    title: 'Economisire și Fondul de Urgență',
    subtitle: 'Plasa ta de siguranță financiară și cum să nu te prindă neprevăzutul.',
    badgeColor: '#8B5CF6',
    lessons: [
      {
        id: 'l-2-1',
        title: 'De ce ai nevoie de un fond de urgență',
        duration: '4 min',
        xpReward: 50,
        summary: 'Viața are surprize: se strică telefonul, apare o cheltuială medicală sau o oportunitate neașteptată. Fondul de urgență te ține departe de stres și împrumuturi proaste.',
        keyTakeaways: [
          'Fondul de urgență este pentru neprevăzut, nu pentru reduceri de Black Friday.',
          'Ține-l separat de banii de zi cu zi, ușor accesibil și în siguranță.',
          'Începe mic — chiar și 50–100 lei/lună construiesc obiceiul.'
        ],
        quiz: [
          {
            id: 'q-2-1-1',
            question: 'Care dintre situațiile de mai jos este o urgență reală?',
            options: [
              'A apărut un skin nou la reducere 40%',
              'Ți s-a stricat brusc încărcătorul/telefonul necesar pentru școală',
              'Prietenii merg la film vineri seară'
            ],
            correctIndex: 1,
            explanation: 'O defecțiune bruscă ce îți afectează activitatea zilnică este o urgență; promoțiile sunt dorințe.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    number: '03',
    title: 'Dobânda Compusă și Investiții',
    subtitle: 'Puterea timpului, ETF-uri, acțiuni și de ce să începi devreme contează enorm.',
    badgeColor: '#22D3EE',
    lessons: [
      {
        id: 'l-3-1',
        title: 'Magia dobânzii compuse: „bulgărele de zăpadă”',
        duration: '6 min',
        xpReward: 50,
        summary: 'Dobânda compusă înseamnă că faci profit nu doar pe suma inițială, ci și pe profiturile acumulate anterior. Timpul este cel mai mare avantaj al tău la vârsta asta.',
        keyTakeaways: [
          'Timpul bate suma: a începe la 16 ani cu puțin poate depăși a începe la 26 cu mai mult.',
          'Consistența (investiții regulate) contează mai mult decât încercarea de a ghici piața.',
          'Randamentul vine la pachet cu riscul — înțelege ce cumperi.'
        ],
        quiz: [
          {
            id: 'q-3-1-1',
            question: 'Care este cel mai mare avantaj al unui adolescent la dobânda compusă?',
            options: [
              'Timpul lung de creștere',
              'Faptul că nu există risc deloc',
              'Că nu mai trebuie să învețe despre bani'
            ],
            correctIndex: 0,
            explanation: 'Orizontul lung de timp permite efectului de bulgăre de zăpadă să se accelereze.'
          }
        ]
      },
      {
        id: 'l-3-2',
        title: 'Acțiuni, ETF-uri și diversificare',
        duration: '5 min',
        xpReward: 50,
        summary: 'Nu îți pui toate ouăle în același coș. ETF-urile îți permit să deții o bucățică din zeci sau sute de companii dintr-o singură mișcare.',
        keyTakeaways: [
          'O acțiune reprezintă o mică parte dintr-o companie.',
          'Un ETF este ca un coș de active care reduce riscul unei singure companii.',
          'Diversificarea nu elimină riscul, dar te protejează de prăbușirea unui singur pariu.'
        ],
        quiz: [
          {
            id: 'q-3-2-1',
            question: 'Ce avantaj principal aduce diversificarea?',
            options: [
              'Garantează profit 100% în fiecare lună',
              'Reduce impactul dacă o singură companie merge prost',
              'Elimină complet orice fluctuație de preț'
            ],
            correctIndex: 1,
            explanation: 'Împărțind expunerea pe mai multe active, o cădere izolată doare mult mai puțin.'
          }
        ]
      }
    ]
  }
];
