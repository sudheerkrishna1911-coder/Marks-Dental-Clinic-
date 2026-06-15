import { ServiceItem, BlogArticle, Testimonial, GalleryItem } from './types';

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: 'general-dentistry',
    name: 'General Dentistry',
    iconName: 'Shield',
    category: 'General',
    shortDescription: 'Comprehensive checkups, standard restorations, deep digital cleanings, and proactive diagnostics for the entire family.',
    fullDescription: 'General dentistry serves as your first line of defense against oral diseases. At Markz Dental Clinic, we focus on detailed diagnostics, comprehensive oral examinations, and state-of-the-art dental cleaning. Our modern digital radiography system minimizes radiation while delivering instant high-resolution imagery to detect microscopic dental decays and structural concerns before they progress.',
    benefits: [
      'Early detection of tooth decays, saving cost and discomfort',
      'Removal of stubborn tartar and dental plaque causing chronic halitosis',
      'Advanced digital diagnostic scans with ultra-low radiation protocols',
      'Personalized preventive checklists based on your lifestyle'
    ],
    treatmentProcess: [
      'Comprehensive Visual Exam & Digital X-Rays if clinically needed',
      'Professional Ultrasonic Scaling and polishing to eliminate plaque and surface stains',
      'Detailed oral hygiene guidance and customized brushing routine instruction',
      'Setting up a tailored multi-month maintenance recall schedule'
    ],
    faqs: [
      {
        question: 'How often should I visit Markz Dental Clinic for a routine checkup?',
        answer: 'We strongly recommend visiting us every 6 months for a routine checkup and professional cleaning to sustain pristine oral hygiene and detect latent issues early.'
      },
      {
        question: 'Is dental scaling safe? Does it loosen teeth?',
        answer: 'Dental scaling is completely safe. Modern ultrasonic scalers only use sound vibrations and micro-water jets to loosen hard tartar (calculus). It does not erode or loosen your teeth; rather, it protects gums from receding.'
      }
    ]
  },
  {
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    iconName: 'Sparkles',
    category: 'Cosmetic',
    shortDescription: 'Masterful smile restorations using porcelain dental veneers, composites, and premium aesthetic smile makeovers.',
    fullDescription: 'Your smile is your primary greeting to the world. Our cosmetic dentistry treatments blend modern clinical material science with artistic design to rectify misalignments, spacing issues, discoloration, and chips. Using custom-crafted E-Max porcelain veneers and direct composite laminates, we redesign smiles to complement your unique facial features.',
    benefits: [
      'Stunning, lifelike appearance that seamlessly blends with adjacent natural teeth',
      'Correction of permanent dental discoloration, chips, and developmental gaps',
      'Premium E-max porcelain veneers offering high staining resistance',
      'Boosted social confidence and self-esteem with a personalized smile design'
    ],
    treatmentProcess: [
      'Smile analysis, high-definition digital smile simulation & clinical goal setting',
      'Conservative preparation of natural enamel surfaces (minimal preparation paths)',
      'High-precision optical dental impressions sent to our high-fidelity partnering lab',
      'Meticulous placement, fine aesthetic adjusting, and permanent bonding of veneers'
    ],
    faqs: [
      {
        question: 'How long do E-Max porcelain veneers typically last?',
        answer: 'Under standard conditions and with optimal oral care, premium ceramic veneers from Markz Dental Clinic can last between 10 to 15 years or more.'
      },
      {
        question: 'Does the smile makeover procedure cause any pain?',
        answer: 'Most cosmetic treatments are virtually pain-free. For preparation, we use local anesthetic block methods to guarantee you feel zero discomfort during the teeth preparation.'
      }
    ]
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics & Braces',
    iconName: 'Smile',
    category: 'Orthodontics',
    shortDescription: 'Modern clear aligners and professional ceramic ceramic orthodontic braces to straighten misaligned teeth.',
    fullDescription: 'Correcting crooked teeth is vital not just for appearance, but to eliminate bacterial trap sites and improve chewing mechanics. We offer premium modern clear orthodontic aligners (nearly invisible dynamic plastic trays) alongside classic self-ligating metal and ceramic aesthetic braces. We cater to children, adolescents, and older working professionals looking for discreet alignment.',
    benefits: [
      'Discreet and virtually invisible alignment with modern custom aligners',
      'Significantly easier cleaning and lower risk of gum swelling compared to traditional brackets',
      'Correction of complex bite issues: overbites, underbites, and severe crowding',
      'Improved TMJ (jaw joint) function and even distribution of chewing forces'
    ],
    treatmentProcess: [
      'Advanced 3D digital intraoral scan and photographic diagnostic planning',
      'Virtual timeline projection showcasing exact pre-planned stages of tooth movement',
      'Delivery of custom aligner sets or modern low-friction self-ligating brackets placement',
      'Periodic checkups every 4 to 8 weeks to track progress and deliver subsequent aligner trays'
    ],
    faqs: [
      {
        question: 'Am I too old to get clear aligners or orthodontic treatment?',
        answer: 'Absolutely not. Healthy teeth can be successfully moved at almost any age. Many of our orthodontic patients are adult professionals in Guwahati who choose invisible aligners.'
      },
      {
        question: 'What is the average treatment duration for clear aligners?',
        answer: 'Treatment timelines typically range from 8 to 18 months, depending on the severity of misalignment and how consistently you wear your aligners (ideally 22 hours per day).'
      }
    ]
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    iconName: 'Layers',
    category: 'Implants',
    shortDescription: 'Permanent teeth replacement using bio-compatible titanium posts to restore complete chewing strength.',
    fullDescription: 'Dental implants are the ultimate gold standard of modern tooth replacement. They act as artificial dental roots structurally fused direct to your jawbone, offering a foundation that is as strong and secure as natural teeth. At Markz Dental Clinic, we execute guided implant surgery, using high-resolution CBCT scans to place implants with micrometric precision for complete long-term success.',
    benefits: [
      'Structural bone preservation, preventing standard facial collapse from tooth loss',
      'Provides 100% natural chewing forces, allowing you to enjoy your favorite foods',
      'Eliminates the slippage, adhesives, and gum sores of loose traditional dentures',
      'Does not require adjacent natural teeth to be ground down (unlike dental bridges)'
    ],
    treatmentProcess: [
      'Detailed CBCT bone scan, medical health screen, and virtual site planning',
      'Painless surgical placement of titanium implant under local anesthesia',
      'Healing phase (3-6 months) for complete osseointegration with jaw bone',
      'Custom fabricated premium zirconia crown attachment over the titanium abutment'
    ],
    faqs: [
      {
        question: 'What is the success rate of dental implants at your clinic?',
        answer: 'With proper patient selection, guided planning, and sterile surgical protocols, dental implants have an exceptional success rate of over 95%-98%.'
      },
      {
        question: 'Is digital dental implant surgery painful?',
        answer: 'Our patients are surprised by how comfortable they are. The procedure is performed under deep local anesthesia, and post-surgery discomfort is easily manageable with standard mild painkillers for 2-3 days.'
      }
    ]
  },
  {
    id: 'root-canal-therapy',
    name: 'Root Canal Treatment',
    iconName: 'Activity',
    category: 'General',
    shortDescription: 'Relieve deep dental pain and salvage decayed natural teeth with painless rotary root canal therapy.',
    fullDescription: 'When decay hits the soft inner pulp of your tooth, it causes acute, throbbing pain. Instead of extracting the tooth, Root Canal Treatment (RCT) removes the infected pulp, sanitizes the internal root canals, and seals them. At Markz Dental Clinic, we specialize in Single-Sitting Root Canals using modern computer-assisted rotary endodontics, making the entire procedure fast, incredibly precise, and pain-free.',
    benefits: [
      'Instant pain relief from tooth infections and pressure',
      'Saves your natural tooth, maintaining healthy facial and jaw structure',
      'Single-sitting RCT capability, reducing the need for multiple clinical visits',
      'Prevents spread of infection to adjacent bone structures or systemic circulation'
    ],
    treatmentProcess: [
      'X-Ray diagnostic analysis to trace root anatomy and verify active infection levels',
      'Administration of localized painless computerized anesthesia around target area',
      'Precision dental drill access, removal of infected pulp tissue, and deep irrigation',
      'Hermetic sealing of canals with gutta-percha and permanent direct tooth restoration'
    ],
    faqs: [
      {
        question: 'How do I know if I need a Root Canal Treatment?',
        answer: 'Common indicators include persistent throbbing pain, sensitivity to hot and cold liquids that lingers long after contact, pain when biting down, and localized swelling of the gums.'
      },
      {
        question: 'Do I absolutely need a crown after a root canal is completed?',
        answer: 'Yes, in almost all posterior chewing teeth. After RCT, teeth lose vital hydration and become brittle. A ceramic or zirconia crown is essential to reinforce the structure and prevent cracks.'
      }
    ]
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    iconName: 'HeartHandshake',
    category: 'Preventive',
    shortDescription: 'Warm, child-friendly, and completely stress-free dental care tailored specifically for young growing smiles.',
    fullDescription: 'Early pediatric dental experiences shape a child’s lifelong attitude toward oral hygiene. We designed our pediatric clinic features to be cheerful, distraction-laden, and extremely welcoming. Our specialist dentists focus on cavity prevention using painless dental sealants, fluoride varnishes, and gentle micro-dentistry interventions.',
    benefits: [
      'Fun, anxiety-free atmosphere designed to eliminate white-coat fear in children',
      'Advanced painless laser therapy and air-abrasion treatments for gentle cavity care',
      'Early stage orthodontic interceptive screening for growing jaw bones',
      'Strengthens infant and child enamel against fast-moving milk teeth decay'
    ],
    treatmentProcess: [
      'Guided fun orientation of the dental chair and playful dental checkups',
      'Fluoride varnish application to create super-hard fluorapatite crystal protections',
      'High-performance liquid deep sealants flowed over deep molar pits and developmental grooves',
      'Instilling healthy habits through visual interactive model brushing games'
    ],
    faqs: [
      {
        question: 'At what age should my child first visit the dentist?',
        answer: 'The American Academy of Pediatric Dentistry recommends scheduling their first visit by their first birthday, or within 6 months of their first milk tooth erupting.'
      },
      {
        question: 'What are dental sealants, and are they safe for kids?',
        answer: 'Dental sealants are thin, biocompatible protective coatings painted onto the chewing surfaces of back teeth. They are 100% safe, BPA-free, and act as a solid shield against sugar and bacteria.'
      }
    ]
  },
  {
    id: 'gum-treatment',
    name: 'Gum Disease Treatment',
    iconName: 'Activity',
    category: 'General',
    shortDescription: 'Advanced clinical scaling, root planing, and deep gum therapy to reverse bleeding gums and periodontitis.',
    fullDescription: 'Healthy gums are the solid foundation of healthy teeth. Bleeding gums, persistent bad breath, and loose teeth are classic signs of periodontal disease. At our clinic in Guwahati, we provide non-surgical deep scaling and root planing (deep cleaning), laser periodontics, and localized antibiotic delivery to reverse gingivitis and arrest bone loss.',
    benefits: [
      'Arrests active bleeding gums and reduces bad breath immediately',
      'Prevents gum recession and tooth loss by eliminating deep subgingival tartar',
      'Minimizes systematic inflammation linked to diabetes and coronary vascular diseases',
      'Re-attaches gum fibers tightly back onto polished tooth root structures'
    ],
    treatmentProcess: [
      'Comprehensive periodontal probing to map depth of active gum disease pockets',
      'Scaling to remove visible calculus and root planing to smooth root surfaces deep underground',
      'Localized laser debridement to kill lingering anaerobic bacteria inside pockets',
      'Frequent clinical follow-ups and custom antibiotic rinses to verify deep tissue healing'
    ],
    faqs: [
      {
        question: 'Why do my gums bleed when I brush, and is it a severe medical concern?',
        answer: 'Bleeding is a key indicator of gum inflammation (gingivitis) due to chronic plaque. Left untreated, it compromises underlying bone tissue. Early treatment at our clinic quickly curable.'
      },
      {
        question: 'Is gum disease treatment a single visit procedure?',
        answer: 'Early gingivitis resolves in a single visit standard cleaning. Deep pocket treatments may require dividing into 2 to 4 painless localized quadrants for structural thoroughness.'
      }
    ]
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    iconName: 'Sun',
    category: 'Cosmetic',
    shortDescription: 'Professional, light-activated teeth whitening that brightens smiles in just under 45 minutes.',
    fullDescription: 'Over-the-counter DIY whitening strips often yield patchy results or trigger extreme dentic sensitivity. Our professional dental whitening features medical-grade hydrogen-carbamide compounds activated by safe cold-blue LED accelerator lights. Within an hour, teeth brighten by up to 5 to 8 shades while protecting delicate dental pulp.',
    benefits: [
      'Fast and predictable results of up to 8 shades whiter in under an hour',
      'Safely customized gums-barrier protection to eliminate chemical sensitivity',
      'Effective correction of stubborn enamel stains from tea, coffee, turmeric, and smoking',
      'Includes premium post-treatment calcium-gel application to rebuild enamel strength'
    ],
    treatmentProcess: [
      'Detailed pre-whitening shade verification and professional polish',
      'Meticulous isolation of lips and soft gums using protective state barriers',
      'Medical-grade whitening gel coating applied evenly to visible front enamel surfaces',
      'Activation of compound utilizing laser accelerator lamp in 3 back-to-back 15-minute bursts'
    ],
    faqs: [
      {
        question: 'Will clinical teeth whitening weaken or damage my natural tooth enamel?',
        answer: 'No. Professional whitening does not erode enamel. It temporarily opens enamel tubules to lift locked stains organically. Under medical supervision, it is totally safe.'
      },
      {
        question: 'How long do the professional laser teeth whitening results last?',
        answer: 'Results typically remain vivid for 1 to 3 years. Avoiding excessive consumption of red tea, coffee, and turmeric keeps your smile bright for much longer!'
      }
    ]
  },
  {
    id: 'crowns-and-bridges',
    name: 'Dental Crowns and Bridges',
    iconName: 'Crown',
    category: 'Implants',
    shortDescription: 'Reinforce cracked teeth or bridge gaps with zirconium, E-Max, or ceramic bridges of lifetime strength.',
    fullDescription: 'Crowns (tooth caps) encase damaged teeth to restore their size, strength, and premium appearance. Bridges span the gap created by one or more missing teeth. We utilize premium, metal-free CAD/CAM computerized restorations, featuring Monolithic Zirconia and IPS E-Max materials that replicate the natural light translucency of human teeth.',
    benefits: [
      'Restores the structural integrity of severely fractured or extensively decayed teeth',
      'Metal-free bio-compatible ceramics prevent dark lines near the gum line over time',
      'Premium CAD/CAM design delivers highly snug margins, preventing secondary cavities',
      'Restores ideal facial dimensions and chewing articulation'
    ],
    treatmentProcess: [
      'Gentle anatomical reshaping of natural tooth structure to accommodate crown material thickness',
      'High-precision digital oral impression scan or rubber sealant mold collection',
      'Placement of custom-shaped acrylic temporary crowns of matching shade',
      'Final adhesive bonding of high-strength zirconia/porcelain crown with dual-cure luting cements'
    ],
    faqs: [
      {
        question: 'What is the main difference between metal-ceramic (PFM) and clean zirconia crowns?',
        answer: 'Porcelain-Fused-to-Metal (PFM) has a metal core which can create an unsightly gray line at the gums. Zirconia is 100% metal-free, extremely bio-compatible, is practically indestructible, and mimics natural translucent enamel.'
      },
      {
        question: 'How long does it take to get a crown made and seated?',
        answer: 'It normally requires 2 quick outpatient appointments spaced about 3 to 5 days apart, allowing our state-of-the-art laboratory to design and mill your custom crown.'
      }
    ]
  },
  {
    id: 'preventive-dental',
    name: 'Preventive Dental Care',
    iconName: 'FileHeart',
    category: 'Preventive',
    shortDescription: 'Maintain peak dental wellness with high-fluoride therapies, customized diet counseling, and guard appliances.',
    fullDescription: 'Prevention is always better, safer, and far more economical than complex cures. Our preventive program is designed to secure your teeth for a lifetime. From specialized high-fluoride therapy to customized night guards that protect teeth against severe night grinding (bruxism), we build bespoke oral preservation regimes for individuals of all age groups.',
    benefits: [
      'Stops dental plaque from developing into heavy calcareous deposits',
      'Stabilizes microscopic decalcified enamel spots back to healthy mineral hardness',
      'Aesthetic and high-comfort custom sports guards and night dental splints',
      'Significantly lowers your long-term multi-year dental medical expenses'
    ],
    treatmentProcess: [
      'Detailed plaque index screening to visual target-hidden hard brushing areas',
      'High-concentration topical fluoride treatment to reinforce calcium structures',
      'Custom bite analysis and silicone thermal model dental impressions for mouthguards',
      'Tailored personalized counseling on glycemic food indices and decay factors'
    ],
    faqs: [
      {
        question: 'What is bruxism, and why should I get a custom dental nightguard?',
        answer: 'Bruxism is unconscious night tooth grinding. It wears down tooth enamel rapidly, can fracture crowns, and triggers severe jaw joint (TMJ) pain. A custom night guard serves as a vital buffer.'
      },
      {
        question: 'Are manual teeth brushes as efficient as high-end electric brushes?',
        answer: 'While manual keys work well with pristine circular 45-degree angle charting, electric brushes make correct brushing technique simple, offering thousands of active brushing curves per minute.'
      }
    ]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'how-to-maintain-healthy-teeth',
    title: 'How to Maintain Healthy Teeth: 5 Crucial Tips From Experts',
    excerpt: 'Explore essential dental hygiene habits that go far beyond standard visual brushing, and discover the correct brushing patterns.',
    content: `Maintaining excellent oral health is about consistency and using the correct clinical approaches. Many people believe brushing twice a day is enough, but microscopic bacteria often bypass standard visual sweeps. Here are 5 expert practices approved by clinicians:

1. **Adopt "Modified Bass" Brushing**: Place bristles at a 45-degree angle toward your gum line. Gently sweep back and forth in rapid, tiny circular strokes, then flick down. This loosens tartar right at the dental collar.
2. **Never Skip Night Flossing**: Food particles wedge tightly between teeth where brush bristles cannot reach. Failing to floss leaves up to 35% of your tooth surfaces dirty, rapidly triggering proximal decays.
3. **Wait 30 Minutes After Eating**: If you consume acidic food (like citrus, tomatoes, or carbonated fluids), your enamel softens temporarily. Brushing immediately sweeps away microscopic enamel. Rinse with pure water first, then wait 30 minutes to clean.
4. **Use a Tongue Scraper**: Up to 80% of bacteria responsible for bad breath gather on the rear surfaces of the tongue. A gentle scraper clears this sulfur-producing layer far better than bristles.
5. **Drink Ample Water**: Drinking pure water washes away lingering sugars and stimulates normal salivary secretion. Saliva is loaded with vital phosphate and calcium minerals that constantly remineralize microscopic enamel scratches.`,
    readTime: '4 min read',
    category: 'Hygiene & Care',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    date: 'June 10, 2026',
    author: 'Dr. Sudhangshu Sarma (BDS, MDS)'
  },
  {
    id: 'benefits-of-regular-dental-checkups',
    title: 'The Hidden Benefits of Regular Dental Checkups Every 6 Months',
    excerpt: 'Discover why dental checkups are crucial even when you have no painful cavities, and how they protect your absolute overall physical health.',
    content: `Most people visit a dental dental professional only when a tooth begins to keep them awake at night. However, waiting for painful toothaches often means the difference between a simple, inexpensive direct dental filling and an expensive, invasive root canal surgery or dental extraction. 

Here is why preventive cleanings pay heavy dividends:

* **Microscopic Cavity Detection**: Digital dental x-rays and ultra-magnified examinations spot soft spots in enamel before they reach the sensitive nerve pathways inside.
* **Periodontal Screening**: Gums are checked for silent pockets of infection. High-precision pocket depth charting detects bone loss years before teeth start loosening.
* **Oral Cancer Screening**: During every routine checkup, our dentists systematically inspect your lips, gums, tongue, and throat tissues. Early detection of suspicious lesions dramatically improves treatment outcomes.
* **Systemic Health Alerts**: Did you know chronic periodontitis is linked to heart disease, severe joint inflammation, stroke, and diabetes? Eliminating deep oral pathogens reduces systematic inflammation.

Schedule a professional scaling and visual screen. It keeps your smile dazzling and saves significant stress and expense.`,
    readTime: '3 min read',
    category: 'Prevention',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    date: 'May 28, 2026',
    author: 'Dr. Pritam Das (MDS, Periodontology)'
  },
  {
    id: 'dental-implant-care-guide',
    title: 'The Ultimate Dental Implant Care and Longevity Guide',
    excerpt: 'You invested in restorative implants – now learn the clinically proven methods to care for them so they survive a lifetime of chewing.',
    content: `Dental implants are among the most successful procedures in modern medicine, boast over 95% success rates. Once a bio-compatible titanium post integrates with your jaw bone, it acts like a natural tooth root. However, just like real teeth, implants are susceptible to a specific condition called **Peri-Implantitis** (microscopic gum disease around implants) if neglected.

To ensure your smile lasts a lifetime, adopt this daily implant care checklist:

1. **Utilize Superfloss or Interdental Brushes**: Standard dental floss can struggle to clear plaque right at the abutment connection. Special superfloss features elastic sponge sections that sweep dental profiles clean.
2. **Consider a High-Quality Water Flosser**: Water irrigation devices stream pressurized water jets, cleaning the complex crevices underneath artificial crowns and dental bridges.
3. **Avoid Hard Chewing Habits**: Do not use your implant cosmetic teeth to crack open betel nuts (supari), hard shells, thick ice cubes, or to tear open plastic packaging. While tough, porcelain crowns can chip under unnatural point pressures.
4. **Schedule Bi-Annual Dental Cleanings**: Professional checkups allow the clinician to audit the bone density and ensure the locking screw retains maximum torque.

With clean surroundings and smart lifestyle habits, your custom implants will remain strong and beautiful for decades.`,
    readTime: '5 min read',
    category: 'Restorative',
    imageUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80&w=800',
    date: 'April 15, 2026',
    author: 'Dr. Niharika Sharma (MDS, Prosthodontics)'
  },
  {
    id: 'foods-that-improve-oral-health',
    title: 'Edible Dental Shields: Foods That Naturally Improve Oral Health',
    excerpt: 'Ditch the sugary foods and supercharge your enamel with these high-calcium, fibrous, and salivary-stimulating foods.',
    content: `We are frequently warned about sugar, carbonated cola, and carbonated sour candies causing dental decays. But what about positive nutrition? Your teeth and gums require an array of vitamins, minerals, and structured fibers to resist aggressive clinical decay.

Add these dental superfoods to your grocery list to keep teeth bright:

* **Shaded Green Leafy Vegetables**: Spinach and kale are rich in calcium, which reinforces enamel surfaces directly, and contain high folic acid levels that reduce chronic bleeding gums.
* **Firm Fibrous Apples, Carrots and Celery**: Often called "nature's toothbrushes," chewing these hard fruits requires extensive mastication. This scrubs enamel physically while generating high streams of cleansing saliva.
* **Aged Cheeses and Organic Yogurts**: High in casein proteins and essential phosphate, dairy products naturally neutralize acidic conditions in oral biofilm. They also raise local calcium counts, aiding remineralization.
* **Sugar-Free Assam Green Tea**: Loaded with natural polyphenols, premium green tea suppresses the anaerobic bacteria that create plaque and release smelly volatile sulfur compounds.
* **Vitamin C Dense Citrus fruits (In moderation)**: Indian gooseberries (Amla) are exceptional for gum tissue repair, supporting collagen production and neutralizing vascular leakages. Always wash down with plain water afterward!`,
    readTime: '3 min read',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    date: 'March 20, 2026',
    author: 'Dr. Sudhangshu Sarma (BDS, MDS)'
  }
];

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    name: 'Priyanku Bezbarua',
    rating: 5,
    comment: 'Exceptional experience! I was terrified of dental implant surgery, but Dr. Sarma mapped everything out on a 3D scan and did it with zero pain. The clinic is incredibly clean and modern. Best dental clinic in Guwahati, hands down!',
    treatment: 'Dental Implants & Zirconia Crown',
    date: 'June 5, 2026',
    verified: true
  },
  {
    id: 'review-2',
    name: 'Debjit Rajbangshi',
    rating: 5,
    comment: 'Got my orthodontic teeth listing sorted utilizing clear cosmetic aligners here. The progress has been extremely fast, and the staff is very polite. Highly appreciate the digital simulations showing progress beforehand!',
    treatment: 'Invisible Clear Aligners',
    date: 'May 14, 2026',
    verified: true
  },
  {
    id: 'review-3',
    name: 'Himakshi Kalita',
    rating: 5,
    comment: 'Dr. Niharika is incredibly gentle with kids! My 6-year-old son actually likes visiting her. She put protective tooth sealants and did a quick cleaning without triggering any fear. Fully recommend pediatric services here.',
    treatment: 'Pediatric Preventive Care',
    date: 'April 20, 2026',
    verified: true
  },
  {
    id: 'review-4',
    name: 'Anamika Changmai',
    rating: 5,
    comment: 'I underwent a single-sitting root canal treatment followed by an aesthetic metal-free CAD/CAM ceramic crown. It took under an hour, felt like a breeze. No post-op pain at all. Truly advanced healthcare.',
    treatment: 'Single-Sitting RCT & CAD/CAM Crown',
    date: 'March 11, 2026',
    verified: true
  }
];

export const CLINIC_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'Clinic',
    title: 'Waiting Lounge & Reception',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    description: 'Our luxurious, air-conditioned waiting space designed to offer instant relaxation before treatments.'
  },
  {
    id: 'gal-2',
    category: 'Equipment',
    title: 'Advanced Diagnostic Operatory',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    description: 'Equipped with ergonomic dental chairs, digital dental operatory displays, and sterilizing tools.'
  },
  {
    id: 'gal-3',
    category: 'Equipment',
    title: '3D Intraoral Dental Scanner',
    imageUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80&w=800',
    description: 'Precision digital scanner for immediate orthodontic planning and laboratory crown engineering.'
  },
  {
    id: 'gal-4',
    category: 'Clinic',
    title: 'Sterilization & Autoclave Unit',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    description: 'Class-B dental autoclave sterilization system following strict international hygiene protocols.'
  },
  {
    id: 'gal-5',
    category: 'Transformations',
    title: 'Porcelain Smile Reconstruction',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    description: 'Full aesthetic E-max treatment rectifying severe fluorosis staining and developmental enamel defects.',
    beforeAfter: {
      beforeUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300', // representative smile preparation
      afterUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300' // beautiful smile
    }
  }
];
