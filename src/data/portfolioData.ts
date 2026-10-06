import type {
  CareerStat,
  EraStatGroup,
  CareerMilestone,
  GalleryItem,
  VentureItem,
  VerifiedQuote,
} from '../types';

export const STATS_VERIFICATION_DATE = 'December 2024 (End of 2024 Season / 2025 Scuderia Ferrari transition)';

export const QUICK_STATS: CareerStat[] = [
  {
    label: 'World Championships',
    value: '7',
    detail: '2008, 2014, 2015, 2017, 2018, 2019, 2020',
    rank: 'Tied 1st All-Time (with M. Schumacher)',
  },
  {
    label: 'Grand Prix Wins',
    value: '105',
    detail: 'Highest total in Formula 1 history',
    rank: '1st All-Time Record',
  },
  {
    label: 'Pole Positions',
    value: '104',
    detail: 'First driver to reach 100 poles in F1 history',
    rank: '1st All-Time Record',
  },
  {
    label: 'Podium Finishes',
    value: '201',
    detail: 'First driver to surpass 200 podiums',
    rank: '1st All-Time Record',
  },
];

export const DETAILED_CAREER_STATS: CareerStat[] = [
  { label: 'Grand Prix Starts', value: '356', detail: 'Spanning from Australia 2007 to Abu Dhabi 2024' },
  { label: 'Front Row Starts', value: '175', detail: 'Most in Formula 1 history' },
  { label: 'Fastest Laps', value: '67', detail: '2nd in all-time Formula 1 standings' },
  { label: 'Laps Led', value: '5,485', detail: 'Most race laps led in Grand Prix history' },
  { label: 'Championship Points', value: '4,829.5', detail: 'Highest points accumulated all-time' },
  { label: 'Wins at a Single GP', value: '9', detail: 'Silverstone / British GP (All-Time Record)' },
  { label: 'Consecutive Scoring Races', value: '48', detail: '2018 British GP to 2020 Bahrain GP' },
  { label: 'Seasons With a Win', value: '16', detail: 'Won races in 16 separate calendar years' },
];

export const ERA_BREAKDOWN: EraStatGroup[] = [
  {
    id: 'mercedes',
    name: 'Mercedes-AMG Petronas Era',
    years: '2013 – 2024',
    team: 'Mercedes-AMG Petronas F1 Team',
    wins: 84,
    poles: 78,
    podiums: 152,
    championships: 6,
    races: 246,
    description:
      'The most successful driver-team partnership in Formula 1 history, yielding six Drivers’ World Championships and contributing to eight consecutive Constructors’ titles.',
  },
  {
    id: 'mclaren',
    name: 'McLaren-Mercedes Era',
    years: '2007 – 2012',
    team: 'Vodafone McLaren Mercedes',
    wins: 21,
    poles: 26,
    podiums: 49,
    championships: 1,
    races: 110,
    description:
      'A sensational debut era beginning with podiums in his first nine races, capped by his dramatic maiden World Championship in 2008 in Brazil.',
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari Era',
    years: '2025 – Present',
    team: 'Scuderia Ferrari HP',
    wins: 0,
    poles: 0,
    podiums: 0,
    championships: 0,
    races: 0,
    description:
      'The monumental next chapter in Formula 1 history, bringing the 7-time World Champion to Maranello to pilot the iconic Prancing Horse alongside Charles Leclerc.',
  },
];

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    year: '2007',
    title: 'Historic Formula 1 Debut & Rookie Records',
    category: 'Record',
    summary: 'Debuted at the Australian GP with McLaren, taking 9 consecutive podiums in his first 9 races.',
    details: 'Achieved his maiden Grand Prix victory at Montreal (Canada) in just his 6th race, followed by victory in Indianapolis a week later. Finished runner-up in the World Championship by a single point.',
    team: 'McLaren',
    accentColor: 'var(--text-secondary)',
  },
  {
    year: '2008',
    title: 'Maiden Formula 1 World Championship',
    category: 'Championship',
    summary: 'Became the youngest World Champion in F1 history at the time after an iconic last-lap pass in Brazil.',
    details: 'Took 5 victories, including an unforgettable masterclass in torrential rain at Silverstone winning by over 68 seconds. Clinched the title on the final corner of the final lap at Interlagos.',
    team: 'McLaren',
    accentColor: 'var(--accent-rose)',
  },
  {
    year: '2013',
    title: 'The Move to Mercedes-AMG',
    category: 'Career Move',
    summary: 'Signed with the works Mercedes team, succeeding Michael Schumacher under team boss Niki Lauda.',
    details: 'Widely questioned by pundits at the time, the move positioned Hamilton ahead of the turbo-hybrid revolution and became one of the greatest strategic sporting decisions in history.',
    team: 'Mercedes-AMG',
    accentColor: 'var(--accent-rose)',
  },
  {
    year: '2014 – 2015',
    title: 'Back-to-Back Turbo-Hybrid World Titles',
    category: 'Championship',
    summary: 'Dominated the new 1.6-litre V6 hybrid era with dominant championship campaigns.',
    details: 'Won 11 races in 2014 to secure his second title in Abu Dhabi, followed by 10 victories in 2015 to claim his third crown in Austin, Texas, matching his boyhood hero Ayrton Senna.',
    team: 'Mercedes-AMG',
    accentColor: 'var(--accent-rose)',
  },
  {
    year: '2017 – 2020',
    title: 'Four Consecutive Titles & Equalling Schumacher',
    category: 'Championship',
    summary: 'Four straight Drivers Championships (2017, 2018, 2019, 2020) to reach 7 World Titles.',
    details: 'Sealed his 7th World Title at the 2020 Turkish Grand Prix with an extraordinary wet-weather drive from 6th on the grid, matching Michael Schumacher’s record of seven world championships.',
    team: 'Mercedes-AMG',
    accentColor: 'var(--accent-gold)',
  },
  {
    year: '2020 – 2021',
    title: 'Surpassing 91 Wins and 100th Career Victory',
    category: 'Historic Win',
    summary: 'Surpassed Schumacher’s all-time win record (91) at Portimão and took his 100th win in Sochi.',
    details: 'At the 2020 Portuguese GP, took victory #92 to become F1’s outright winningest driver. In 2021 at Sochi, became the first driver in 71 years of Formula 1 to win 100 Grand Prix.',
    team: 'Mercedes-AMG',
    accentColor: 'var(--accent-rose)',
  },
  {
    year: '2024',
    title: 'Historic 9th Silverstone Triumph',
    category: 'Historic Win',
    summary: 'Ended a 945-day win drought with a sensational emotional victory at the British Grand Prix.',
    details: 'Claimed his 9th win at Silverstone, setting the all-time F1 record for most victories by a driver at a single circuit. Followed with victory at the Belgian GP at Spa-Francorchamps.',
    team: 'Mercedes-AMG',
    accentColor: 'var(--accent-rose)',
  },
  {
    year: '2025 – Present',
    title: 'The Scuderia Ferrari Transition',
    category: 'Career Move',
    summary: 'Joined Scuderia Ferrari in a multi-year deal, uniting F1’s most decorated driver with its most iconic team.',
    details: 'In February 2024, announced his departure from Mercedes after 12 storied seasons to realize a childhood dream: donning Ferrari scarlet and racing out of Maranello alongside Charles Leclerc.',
    team: 'Scuderia Ferrari',
    accentColor: 'var(--accent-rose)',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ferrari-portrait',
    title: 'Scuderia Ferrari Crimson Era',
    category: 'ferrari',
    categoryLabel: 'Scuderia Ferrari',
    imageSrc: '/assets/hamilton-ferrari-portrait.png',
    webpSrc: '/assets/hamilton-ferrari-portrait.webp',
    altText: 'Portrait of Sir Lewis Hamilton in Scuderia Ferrari team red racing attire',
    caption: 'Lewis Hamilton steps into the iconic scarlet of Scuderia Ferrari for the 2025 Formula 1 season, embarking on a historic championship pursuit with Maranello.',
    dateOrYear: '2025 Transition',
    credit: 'Scuderia Ferrari HP / Fan Archival',
  },
  {
    id: 'silverstone-action',
    title: 'W11 High-Speed Precision',
    category: 'racing',
    categoryLabel: 'On Track',
    imageSrc: '/assets/hamilton-racing-car.jpg',
    webpSrc: '/assets/hamilton-racing-car.webp',
    altText: 'Lewis Hamilton piloting the Mercedes-AMG F1 car at apex through high speed corners',
    caption: 'Driving the record-shattering Mercedes-AMG F1 W11 EQ Performance, widely considered the fastest Formula 1 car ever engineered.',
    dateOrYear: 'Championship Era',
    credit: 'Mercedes-AMG Petronas F1 / FIA',
  },
  {
    id: 'cockpit-focus',
    title: 'Pre-Race Visor Down Focus',
    category: 'racing',
    categoryLabel: 'On Track',
    imageSrc: '/assets/hamilton-action-1.jpg',
    webpSrc: '/assets/hamilton-action-1.webp',
    altText: 'Close-up of Lewis Hamilton focused inside the helmet and cockpit on the starting grid',
    caption: 'The intense mental preparation before lights out. Hamilton is celebrated for his racecraft, wet-weather mastery, and strategic tire management.',
    dateOrYear: 'Grand Prix Grid',
    credit: 'Formula 1 Official Media',
  },
  {
    id: 'paddock-presence',
    title: 'Paddock Presence & Preparation',
    category: 'racing',
    categoryLabel: 'On Track',
    imageSrc: '/assets/hamilton-action-2.jpg',
    webpSrc: '/assets/hamilton-action-2.webp',
    altText: 'Lewis Hamilton reviewing telemetry and data in the garage with race engineers',
    caption: 'Working closely with engineering teams to optimize aerodynamic setup, brake balance, and race strategy across Grand Prix weekends.',
    dateOrYear: 'Paddock Archive',
    credit: 'Mercedes-AMG F1 Archive',
  },
  {
    id: 'fashion-met-gala',
    title: 'Fashion, Culture & Advocacy',
    category: 'style',
    categoryLabel: 'Style & Culture',
    imageSrc: '/assets/hamilton-fashion-1.jpg',
    webpSrc: '/assets/hamilton-fashion-1.webp',
    altText: 'Lewis Hamilton attending a global fashion event in couture tailored styling',
    caption: 'Beyond the circuit, Hamilton is a prominent figure in global high fashion, using prominent platforms like the Met Gala to champion emerging Black designers.',
    dateOrYear: 'Fashion & Culture',
    credit: 'Editorial Media Archive',
  },
  {
    id: 'podium-celebration',
    title: 'Race Victory & #44 Monogram',
    category: 'racing',
    categoryLabel: 'On Track',
    imageSrc: '/assets/hamilton-cutout-1.png',
    webpSrc: '/assets/hamilton-cutout-1.webp',
    altText: 'Lewis Hamilton celebratory pose representing driver number 44',
    caption: 'Carrying the iconic number 44 from his childhood karting days onto 105 Grand Prix podiums worldwide.',
    dateOrYear: 'All-Time Record',
    credit: 'Motorsport Archive',
  },
];

export const VENTURES_AND_ADVOCACY: VentureItem[] = [
  {
    name: 'Mission 44',
    category: 'Charitable Foundation',
    role: 'Founder & Chair',
    founded: '2021',
    description:
      'A charitable foundation launched by Sir Lewis with an initial £20 million personal pledge to build a fairer, more inclusive education system and support young people from underserved and underrepresented communities.',
    impactMetrics: [
      'Over £20M personal funding committed',
      'Partnerships across STEM education and motorsport apprenticeships',
      'Targeted initiatives addressing school exclusion and youth employment',
    ],
    externalUrl: 'https://mission44.org',
    urlLabel: 'Visit Mission 44 Foundation',
  },
  {
    name: 'The Hamilton Commission',
    category: 'Research & Inclusion Initiative',
    role: 'Co-Founder with Royal Academy of Engineering',
    founded: '2020',
    description:
      'A rigorous research partnership with the Royal Academy of Engineering to investigate and address the systemic barriers to recruiting Black people into UK motorsport and STEM fields.',
    impactMetrics: [
      'Published landmark 10-point recommendations report',
      'Spearheaded the F1 Diversity & Inclusion working group',
      'Led to funded STEM university scholarships and engineering apprenticeships',
    ],
    externalUrl: 'https://www.raeng.org.uk/programmes-and-prizes/programmes/hamilton-commission',
    urlLabel: 'Read Commission Findings',
  },
  {
    name: 'Almave Spirits',
    category: 'Non-Alcoholic Beverage Venture',
    role: 'Co-Founder',
    founded: '2023',
    description:
      'A premium blue agave non-alcoholic spirit distilled in Jalisco, Mexico, using traditional distillation methods to offer an authentic agave experience without alcohol.',
    impactMetrics: [
      'Distilled in Jalisco, Mexico from authentic Blue Weber Agave',
      'Created with Casa Lumbre master distiller Iván Saldaña',
      'Global distribution in ultra-premium dining and retail',
    ],
    externalUrl: 'https://almave.com',
    urlLabel: 'Visit Almave Official',
  },
  {
    name: 'Dawn Apollo Films',
    category: 'Film & Media Production',
    role: 'Founder & Executive Producer',
    founded: '2022',
    description:
      'A film and television production banner focused on meaningful, uplifting storytelling, including co-producing the Apple Original Films Formula 1 feature film starring Brad Pitt.',
    impactMetrics: [
      'Production partner on Apple Original Films blockbuster F1 movie',
      'Focus on diverse creators, writers, and inspiring true stories',
      'Direct technical advising to ensure authentic motorsport realism',
    ],
  },
];

export const VERIFIED_QUOTES: VerifiedQuote[] = [
  {
    quote: 'Still I rise.',
    context: 'His personal life mantra, tattooed across his back and inscribed on his racing helmets, inspired by the poetry of Maya Angelou.',
    year: 'Career-long philosophy',
    source: 'Official Driver Statements & Autobiography',
  },
  {
    quote: 'We win and we lose together. It is never just one person; it is every single individual in the factory and in the garage giving their all.',
    context: 'Post-race address honoring the collective team engineering behind championship triumphs.',
    year: '2019',
    source: 'FIA Official Post-Race Press Conference',
  },
  {
    quote: 'For every kid out there who dreams the impossible: you can do it too, man. Believe in yourself.',
    context: 'Team radio message moments after taking the checkered flag at Istanbul Park to win his 7th World Championship.',
    year: '2020 Turkish GP',
    source: 'Formula 1 World Championship Broadcast Audio',
  },
  {
    quote: 'I have never felt more hungry, more focused, or more ready to write this next chapter.',
    context: 'Speaking on his historic transition to Scuderia Ferrari in Maranello.',
    year: '2024',
    source: 'Official Team Transition Statement',
  },
];

export const SOURCES_AND_ATTRIBUTION = [
  {
    title: 'Formula 1 Official Driver Archives',
    url: 'https://www.formula1.com/en/drivers/lewis-hamilton.html',
    description: 'Official Grand Prix results, pole records, lap telemetry, and points standings verified through FIA records.',
  },
  {
    title: 'FIA Formula One World Championship Records',
    url: 'https://www.fia.com',
    description: 'Governing body official classification, championship point tallies, and historical race records.',
  },
  {
    title: 'Mission 44 Official Charitable Register',
    url: 'https://mission44.org',
    description: 'Official charitable reports, grants data, and educational impact metrics for young people in STEM.',
  },
  {
    title: 'The Hamilton Commission Report',
    url: 'https://www.raeng.org.uk',
    description: 'Comprehensive research published in partnership with the Royal Academy of Engineering on motorsport diversity.',
  },
];

export const LEGAL_DISCLAIMER =
  'This site is an independent, non-commercial fan tribute and portfolio project created solely for educational and archival purposes. It is not affiliated with, sponsored by, or endorsed by Sir Lewis Hamilton, Formula One Management (FOM), the Fédération Internationale de l’Automobile (FIA), Mercedes-Benz Grand Prix Ltd, Scuderia Ferrari HP, or any of their affiliates or sponsors. All driver imagery, trademarks, logos, team names, and Grand Prix references are the intellectual property of their respective trademark holders.';
