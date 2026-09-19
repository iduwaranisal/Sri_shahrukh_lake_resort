export interface Attraction {
  slug: string;
  name: string;
  sinhalaName: string;
  tagline: string;
  distance: string;
  travelTime: string;
  category: string;
  heroImage: string;
  galleryImages: string[];
  shortDescription: string;
  overview: string;
  history: string;
  highlights: string[];
  conciergeTips: string[];
  bestTimeToVisit: string;
  recommendedDuration: string;
}

export const attractions: Attraction[] = [
  {
    slug: "tissa-lake",
    name: "Tissa Wewa (Tissa Lake)",
    sinhalaName: "තිස්ස වැව",
    tagline: "The Sacred 3rd Century BC Water Reservoir",
    distance: "2.5 km",
    travelTime: "5-minute drive / 15-min cycle",
    category: "Nature & Heritage",
    heroImage: "/images/tissa-lake-sunrise.jpg",
    galleryImages: [
      "/images/tissa-lake-sunrise.jpg",
      "/images/bundala-flamingos.jpg",
      "/images/kirinda-temple.jpg"
    ],
    shortDescription:
      "Commissioned by King Kavantissa over 2,200 years ago, Tissa Wewa is located about 2.5 km (1.5 miles) from our homestay, surrounded by giant rain trees and lotus wetlands.",
    overview:
      "Tissa Wewa is an ancient man-made reservoir in the heart of Tissamaharama. Spanning hundreds of hectares, its shores are draped in mammoth Samanea saman (rain trees) with sprawling root systems touching the mirror-calm water. At daybreak, the lake awakens to an orchestra of rare wetland birds—purple swamphens, painted storks, white-bellied sea eagles, and cormorants—while local fishermen glide across the water in traditional wooden outrigger canoes.",
    history:
      "Engineered in the 3rd century BC by King Kavantissa of the Ruhuna Kingdom, this hydraulic marvel was designed to irrigate extensive rice paddies and sustain the monastic community surrounding the Tissamaharama Raja Maha Vihara. The reservoir's advanced ancient sluice gates have continuously functioned for over two millennia, testifying to the engineering heritage of ancient Sri Lanka.",
    highlights: [
      "Centuries-old giant rain trees lining the scenic lakeside promenade",
      "Over 120 species of native and migratory wetland birds at dawn",
      "Traditional outrigger canoe rides and local lotus-flower harvesting",
      "Peaceful sunset views mirroring ancient stupas across the lake"
    ],
    conciergeTips: [
      "Our homestay can arrange bicycle rentals or a local tuk-tuk ride to reach the lake bund in just 5 minutes.",
      "Bring binoculars; white-bellied sea eagles and painted storks regularly feed in the shallows.",
      "An evening walk along the bund at 5:30 PM offers cool breezes and gorgeous golden hour views."
    ],
    bestTimeToVisit: "Sunrise (05:45 AM – 08:00 AM) or Sunset (05:00 PM – 06:30 PM)",
    recommendedDuration: "1 – 2 hours"
  },
  {
    slug: "tissamaharama-dagoba",
    name: "Tissamaharama Raja Maha Vihara",
    sinhalaName: "තිස්සමහාරාම රජ මහා විහාරය",
    tagline: "The Monumental Sacred White Stupa of Ruhuna",
    distance: "2.2 km",
    travelTime: "5-minute drive / 10-min cycle",
    category: "Ancient Sacred Heritage",
    heroImage: "/images/tissamaharama-stupa.jpg",
    galleryImages: [
      "/images/tissamaharama-stupa.jpg",
      "/images/tissa-lake-sunrise.jpg",
      "/images/kataragama-temple.jpg"
    ],
    shortDescription:
      "Located just 2.2 km from our homestay, this colossal 158-foot sacred Buddhist stupa was consecrated in the 3rd century BC by King Kavan Tissa.",
    overview:
      "Rising gracefully above emerald coconut groves, the Tissamaharama Raja Maha Vihara is one of the sixteen holiest Buddhist pilgrimage sites (Solosmasthana) in Sri Lanka. The brilliant white stupa with its golden spire dominates the southern skyline, surrounded by ancient stone pillars, sacred Bo trees, and a peaceful courtyard where centuries of devotion linger.",
    history:
      "Constructed around 200 BC by King Kavantissa of Ruhuna, this grand stupa was built as the principal monastery of Southern Sri Lanka. According to historical chronicles, the stupa enshrines sacred relics of the Buddha and served as a vital spiritual center during the reign of King Dutugemunu.",
    highlights: [
      "Magnificent 158-foot white stupa with a circumference of 550 feet",
      "Ancient carved stone guardstones and pillars dating back over 2,000 years",
      "Serene evening Bodhi puja illuminated by traditional clay oil lamps",
      "Conveniently situated just 2.2 km from Sri Shahrukh homestay"
    ],
    conciergeTips: [
      "Modest attire covering shoulders and knees is strictly required at this sacred site. White clothing is traditional.",
      "Shoes and hats must be removed at the sandy compound entrance.",
      "Visit during the evening ceremony around 06:00 PM when the white dome glows against the twilight sky."
    ],
    bestTimeToVisit: "Early Morning (06:30 AM – 08:30 AM) or Evening Puja (05:30 PM – 07:00 PM)",
    recommendedDuration: "1 – 1.5 hours"
  },
  {
    slug: "yala-national-park",
    name: "Yala National Park (Ruhuna)",
    sinhalaName: "යාල ජාතික වනෝද්‍යානය",
    tagline: "World-Renowned Sanctuary for Sri Lankan Leopards & Elephants",
    distance: "28 km",
    travelTime: "30-minute drive",
    category: "Wildlife Safari",
    heroImage: "/images/yala-leopard.jpg",
    galleryImages: [
      "/images/yala-leopard.jpg",
      "/images/tissa-lake-sunrise.jpg",
      "/images/tissamaharama-stupa.jpg"
    ],
    shortDescription:
      "Famous worldwide for having one of the highest densities of wild leopards on earth, majestic Asian elephants, sloth bears, and diverse birdlife.",
    overview:
      "Yala National Park is Sri Lanka's second largest and most celebrated wildlife reserve. Covering 979 square kilometers across five blocks, its landscapes transition from moist monsoon forests to scrublands, lagoons, and dramatic coastlines along the Indian Ocean. It is internationally renowned for harboring the Sri Lankan leopard as the island's apex predator, alongside herds of wild elephants, sloth bears, and crocodiles.",
    history:
      "Designated as a wildlife sanctuary in 1900 and elevated to a National Park in 1938, Yala was historically a hub of the ancient Ruhuna civilization. Hidden deep within its rock formations lie ancient monasteries and inscriptions dating back over two millennia.",
    highlights: [
      "World-famous leopard sightings, especially in Block 1",
      "Wild Asian elephants bathing in natural waterholes and lagoons",
      "Rare sightings of the nocturnal Sri Lankan sloth bear",
      "We arrange affordable shared and private 4x4 safari jeeps directly from our homestay"
    ],
    conciergeTips: [
      "Our homestay can arrange custom 4x4 safari jeeps with local experienced drivers at reasonable rates.",
      "Morning safaris depart early (around 05:00 AM) to reach the park gates by 06:00 AM opening.",
      "Wear neutral clothing and bring sunscreen, water, and camera gear."
    ],
    bestTimeToVisit: "Morning Safari (06:00 AM – 10:00 AM) or Afternoon Safari (02:30 PM – 06:00 PM)",
    recommendedDuration: "Half Day (4–5 hours) or Full Day"
  },
  {
    slug: "ranminitenna",
    name: "Ranminitenna Tele Cinema Village",
    sinhalaName: "රන්මිණිතැන්න සිනමා ගම්මානය",
    tagline: "Sri Lanka's Dedicated Film Location & Cultural Theme Park",
    distance: "7.5 km",
    travelTime: "10-minute drive",
    category: "Culture & Cinema Heritage",
    heroImage: "/images/hero2.jpeg",
    galleryImages: [
      "/images/hero2.jpeg",
      "/images/im 1.jpg",
      "/images/hero 4.jpeg"
    ],
    shortDescription:
      "Located just 7.5 km from our homestay, this 230-acre cinema village features full-scale vintage colonial streetscapes, historic replica buildings, and film production sets.",
    overview:
      "Established in Ranminitenna near Tissamaharama, this landmark cinema village was built to provide state-of-the-art sets for Sri Lankan films and television dramas. Visitors can tour fascinating life-sized period sets including colonial Colombo streets, vintage shops, traditional rural villages, and film studios set across scenic dry-zone greenery.",
    history:
      "Opened in 2010, the Ranminitenna Tele Cinema Village was designed to encourage national film production and cinema tourism in the Southern Province. It continues to be a favorite excursion spot for movie enthusiasts, photographers, and families.",
    highlights: [
      "Life-sized vintage colonial street sets and retro architecture",
      "Traditional rural village settings and photo spots",
      "Just 7.5 km (10-minute drive) from Sri Shahrukh homestay",
      "Fun cultural and photographic excursion for all ages"
    ],
    conciergeTips: [
      "Combine your visit with an afternoon drive around the surrounding countryside.",
      "Our homestay can call a trusted local three-wheeler (tuk-tuk) for a quick 10-minute ride.",
      "Ideal visit time is morning or mid-afternoon before sunset."
    ],
    bestTimeToVisit: "09:00 AM – 04:30 PM",
    recommendedDuration: "1.5 – 2 hours"
  },
  {
    slug: "kirinda-temple",
    name: "Kirinda Rock Temple & Southern Coastline",
    sinhalaName: "කිරිඳ රජ මහා විහාරය",
    tagline: "Dramatic Rocky Ocean Headland & The Legend of Queen Viharamahadevi",
    distance: "14 km",
    travelTime: "15-minute coastal drive",
    category: "Coastal Legend & Ocean Panorama",
    heroImage: "/images/kirinda-temple.jpg",
    galleryImages: [
      "/images/kirinda-temple.jpg",
      "/images/tissa-lake-sunrise.jpg",
      "/images/bundala-flamingos.jpg"
    ],
    shortDescription:
      "A scenic wind-swept cliff temple located 14 km from the homestay, towering above crashing turquoise ocean waves on the southern coast.",
    overview:
      "Perched on colossal black granite boulders that jut boldly into the Indian Ocean, Kirinda Raja Maha Vihara is one of Southern Sri Lanka's most visually arresting sites. Atop the rock sits a gleaming white stupa and a serene standing Buddha statue gazing across the sea, with wild ocean breakers below and golden sand dunes stretching toward Yala.",
    history:
      "According to the ancient Mahavamsa chronicle, Princess Devi sacrificed herself into a royal boat to calm raging ocean waves. She drifted unharmed to Kirinda, where King Kavantissa of Ruhuna rescued and married her, renaming her Queen Viharamahadevi.",
    highlights: [
      "Cliff-top stupa with 360-degree ocean panoramas",
      "Historical rock inscriptions dating back over 2,100 years",
      "Undeveloped golden sand beaches and dunes nearby",
      "Convenient 14 km drive from Tissamaharama"
    ],
    conciergeTips: [
      "Late afternoon is the best time to visit when the sea breeze is refreshing and sunset lights up the waves.",
      "Wear easy slip-on sandals as shoes must be removed when climbing the temple rock.",
      "Combine Kirinda with fresh seafood along the coastal road."
    ],
    bestTimeToVisit: "Late Afternoon & Sunset (04:30 PM – 06:30 PM)",
    recommendedDuration: "1.5 – 2 hours"
  },
  {
    slug: "bundala-national-park",
    name: "Bundala National Park (Bird Sanctuary)",
    sinhalaName: "බූන්දල ජාතික වනෝද්‍යානය",
    tagline: "UNESCO Biosphere Reserve & International Ramsar Wetland",
    distance: "28 km",
    travelTime: "25-minute coastal drive",
    category: "UNESCO Wetland & Avifauna",
    heroImage: "/images/bundala-flamingos.jpg",
    galleryImages: [
      "/images/bundala-flamingos.jpg",
      "/images/yala-leopard.jpg",
      "/images/kirinda-temple.jpg"
    ],
    shortDescription:
      "Located 28 km away, Bundala is an internationally recognized wetland sanctuary famous for thousands of wintering migratory birds, flamingos, and quiet safaris.",
    overview:
      "Bundala National Park is a tranquil UNESCO Biosphere Reserve on Sri Lanka's southernmost coast. Characterized by glistening salt pans, wide lagoons, and sand dunes, it provides sanctuary to nearly 200 bird species—including flocks of Greater Flamingos, painted storks, and herons—alongside crocodiles, wild elephants, and sea turtles.",
    history:
      "Declared a wildlife sanctuary in 1969 and designated Sri Lanka's very first Ramsar Wetland in 1990, Bundala preserves a vital wetland buffer along the southern coast.",
    highlights: [
      "Spectacular birdwatching with far fewer crowds and jeeps than Yala",
      "Over 197 species of migratory and endemic aquatic birds",
      "Located 28 km from Sri Shahrukh Lake Resort",
      "Herds of wild elephants, spotted deer, and crocodiles"
    ],
    conciergeTips: [
      "An unhurried, peaceful alternative to Yala for nature lovers and birdwatchers.",
      "High season for migratory flamingos and rare waders spans from September through March.",
      "Our homestay can arrange safari jeep transport directly to Bundala's entrance."
    ],
    bestTimeToVisit: "Early Morning (06:00 AM – 09:30 AM) or Afternoon (03:30 PM – 06:00 PM)",
    recommendedDuration: "3 – 4 hours"
  }
];
