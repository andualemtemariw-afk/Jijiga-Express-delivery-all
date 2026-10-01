import { Batch, Mamila, Order, OrderStatus } from './types';

export const CITIES = [
  { id: 'jijiga', name: 'Jijiga', region: 'Somali Region, Ethiopia', defaultPlusCode: '8F2P+5H Jijiga' },
  { id: 'hargeisa', name: 'Hargeisa', region: 'Maroodi Jeex, Somaliland', defaultPlusCode: 'H654+7G Hargeisa' },
  { id: 'diredawa', name: 'Dire Dawa', region: 'Dire Dawa Administration', defaultPlusCode: 'HVM8+8Q Dire Dawa' },
  { id: 'harar', name: 'Harar', region: 'Harari Region', defaultPlusCode: 'CQ8R+5P Harar' },
  { id: 'addis', name: 'Addis Ababa', region: 'Federal Capital', defaultPlusCode: 'XQVP+8M Addis Ababa' },
];

export const MAMILAS: Mamila[] = [
  { 
    id: 'm1', 
    name: 'Fresh Morning Farms', 
    rating: 4.8, 
    location: 'Bole / North Greenbelt, Jijiga', 
    plusCode: 'XQVP+8M', 
    phone: '+251 91 234 5678', 
    coordinates: { lat: 9.3620, lng: 42.8020 },
    category: 'Farm & Grocer'
  },
  { 
    id: 'm2', 
    name: 'Arada Bakery', 
    rating: 4.9, 
    location: 'Piassa & Central Square, Jijiga', 
    plusCode: 'XR2M+9R', 
    phone: '+251 92 345 6789', 
    coordinates: { lat: 9.3510, lng: 42.7915 },
    category: 'Bakery & Sweets'
  },
  { 
    id: 'm3', 
    name: 'Sheger Dairy', 
    rating: 4.7, 
    location: 'Kazanchis Sector, Jijiga', 
    plusCode: 'XQWG+2P', 
    phone: '+251 93 456 7890', 
    coordinates: { lat: 9.3470, lng: 42.8045 },
    category: 'Dairy'
  },
  { 
    id: 'm4', 
    name: 'Hassan Wali Hotel & Restaurant', 
    rating: 4.9, 
    location: 'Taiwan Market Road, Jijiga & Hargeisa', 
    plusCode: '8F3Q+4W', 
    phone: '+251 91 456 7891', 
    coordinates: { lat: 9.3580, lng: 42.7980 },
    category: 'Hotel & Restaurant'
  },
  { 
    id: 'm5', 
    name: 'Jijiga Express Fresh Kitchen & Food', 
    rating: 4.8, 
    location: 'Main Commercial Ave, Jijiga', 
    plusCode: '8F2P+9X', 
    phone: '+251 91 789 0123', 
    coordinates: { lat: 9.3530, lng: 42.7930 },
    category: 'Hotel & Restaurant'
  },
  { 
    id: 'khat_m1', 
    name: 'Mamila Halimo (Aweday Prime Direct)', 
    rating: 4.9, 
    location: 'Taiwan Market Gate 2, Jijiga', 
    plusCode: '8F2P+6V', 
    phone: '+251 91 555 1234', 
    coordinates: { lat: 9.3540, lng: 42.7950 },
    category: 'Khat Vendor (Mamila)',
    khatSpecialty: 'Direct Aweday Abo Mismar & Urji',
    dailyArrivalTime: '10:30 AM & 2:00 PM Fresh Shipments',
    trustedBadges: ['Verified Mamila', 'Direct Aweday Supply', 'Moist Leaf Guarantee'],
    stallNumber: 'Stall #14A',
    verifiedDirectFarm: true
  },
  { 
    id: 'khat_m2', 
    name: 'Mamila Deeqo (Gursum Gold & Urji)', 
    rating: 4.8, 
    location: 'Old Bus Terminal Road, Jijiga', 
    plusCode: '8F2P+7T', 
    phone: '+251 92 666 5678', 
    coordinates: { lat: 9.3515, lng: 42.7920 },
    category: 'Khat Vendor (Mamila)',
    khatSpecialty: 'Gursum Highland Tender Leaf',
    dailyArrivalTime: '11:00 AM Daily Arrival',
    trustedBadges: ['Trusted Vendor', '15+ Years Experience', 'Banana Leaf Wrap'],
    stallNumber: 'Stall #08',
    verifiedDirectFarm: true
  },
  { 
    id: 'khat_m3', 
    name: 'Mamila Saynab (Harari Behati Select)', 
    rating: 4.9, 
    location: 'Commercial Avenue, Jijiga', 
    plusCode: '8F3Q+2M', 
    phone: '+251 93 777 9012', 
    coordinates: { lat: 9.3565, lng: 42.7975 },
    category: 'Khat Vendor (Mamila)',
    khatSpecialty: 'Harari Behati & Gelemso Sweet Leaf',
    dailyArrivalTime: '11:30 AM & 3:30 PM Fresh Shipments',
    trustedBadges: ['Top Rated in Somali Region', 'Curated Batch Selection'],
    stallNumber: 'Stall #22B',
    verifiedDirectFarm: true
  },
  { 
    id: 'khat_m4', 
    name: 'Mamila Fartun (Central Taiwan Hub)', 
    rating: 4.7, 
    location: 'Near Grand Mosque, Central Jijiga', 
    plusCode: '8F2P+4J', 
    phone: '+251 91 888 3456', 
    coordinates: { lat: 9.3525, lng: 42.7940 },
    category: 'Khat Vendor (Mamila)',
    khatSpecialty: 'Fast Handover, Value Bundles & Fresh Urji',
    dailyArrivalTime: 'Continuous Fresh Stock',
    trustedBadges: ['Fastest Dispatch', 'Express Delivery'],
    stallNumber: 'Stall #03',
    verifiedDirectFarm: true
  },
];

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'b1',
    mamilaId: 'm1',
    name: 'Organic Veggie Bundle',
    description: 'Freshly harvested vine tomatoes, red shallots, spinach (gomen), and garden herbs.',
    price: 450,
    available: 15,
    expiry: 'Today, 6:00 PM',
    imageUrl: '/src/assets/images/fresh_produce_bundle_1790430925858.jpg',
    category: 'Fresh Farm Produce',
    unit: '1 harvest basket (~3.5 kg)',
    harvestTime: 'Picked today at 5:45 AM',
  },
  {
    id: 'b2',
    mamilaId: 'm2',
    name: 'Morning Pastry Box',
    description: 'Freshly baked artisanal bread loaf, flaky butter croissants, and sesame buns.',
    price: 320,
    available: 8,
    expiry: 'Today, 2:00 PM',
    imageUrl: '/src/assets/images/artisan_pastry_box_1790430934857.jpg',
    category: 'Bakery & Pastries',
    unit: '1 bakery box (6 assorted items)',
    harvestTime: 'Oven fresh at 6:15 AM',
  },
  {
    id: 'b3',
    mamilaId: 'm3',
    name: 'Dairy Essentials Pack',
    description: 'Pasteurized pure whole cow milk (2L), traditional fresh Ayib cheese, and clarified butter.',
    price: 650,
    available: 5,
    expiry: 'Tomorrow, 10:00 AM',
    imageUrl: '/src/assets/images/dairy_farm_essentials_1790430944133.jpg',
    category: 'Dairy & Eggs',
    unit: '1 cold pack (3 farm items)',
    harvestTime: 'Packed today at 6:00 AM',
  },
  {
    id: 'b4',
    mamilaId: 'm4',
    name: 'Signature Babay Cold Drink & Lime',
    description: 'Refreshing chilled crushed fruit mocktail with fresh mint, lime slices, and crushed ice.',
    price: 120,
    available: 24,
    expiry: 'Freshly prepared on order',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    category: 'Restaurant & Drinks',
    unit: '1 large chilled glass (500ml)',
    harvestTime: 'Freshly blended on demand',
  },
  {
    id: 'b5',
    mamilaId: 'm5',
    name: 'Chilled Sprite (Twin 330ml Pack)',
    description: 'Crisp, ice-cold lemon-lime soda bottles. Perfect thirst quencher.',
    price: 120,
    available: 30,
    expiry: 'Chilled ready for dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&auto=format&fit=crop&q=80',
    category: 'Restaurant & Drinks',
    unit: '2 x 330ml chilled bottles',
    harvestTime: 'Refrigerated depot storage',
  },
  {
    id: 'b6',
    mamilaId: 'm4',
    name: 'Hilib Geel & Spiced Rice Platter',
    description: 'Tender Somali-style roasted camel meat served over fragrant cardamom basmati rice with banana.',
    price: 380,
    available: 12,
    expiry: 'Lunch & Dinner Special',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    category: 'Hotel & Restaurant',
    unit: '1 hearty entree platter (~600g)',
    harvestTime: 'Cooked fresh daily',
  },
  {
    id: 'kb1',
    mamilaId: 'khat_m1',
    name: 'Abo Mismar (Prime Grade Aweday)',
    description: 'Crisp, tender red tips harvested at dawn in Aweday highlands. Wrapped in fresh moist banana leaf for maximum succulence.',
    price: 850,
    available: 24,
    expiry: 'Fresh Morning Transport (Arrived 10:45 AM)',
    imageUrl: '/src/assets/images/fresh_khat_bundle_1790872116314.jpg',
    category: 'Khat Marketplace',
    unit: '1 bundle (~550g wrapped)',
    harvestTime: 'Transported fresh from Aweday at 10:45 AM',
    khatGrade: 'Abo Mismar (Prime)',
    leafMoisture: 'Crisp moist tender tips, highest alkaloid profile',
    bundleWrapType: 'Fresh Banana Leaf'
  },
  {
    id: 'kb2',
    mamilaId: 'khat_m2',
    name: 'Urji Fresh Leaf (Gursum Morning Batch)',
    description: 'High-moisture soft young foliage cultivated in Gursum. Gentle flavor and smooth texture, carefully inspected.',
    price: 650,
    available: 18,
    expiry: 'Fresh Arrival (Arrived 11:15 AM)',
    imageUrl: '/src/assets/images/fresh_khat_bundle_1790872116314.jpg',
    category: 'Khat Marketplace',
    unit: '1 tender bundle (~480g)',
    harvestTime: 'Early morning harvest at 6:15 AM',
    khatGrade: 'Urji Fresh Leaf',
    leafMoisture: 'Plump succulent green leaves, tender stems',
    bundleWrapType: 'Fresh Banana Leaf'
  },
  {
    id: 'kb3',
    mamilaId: 'khat_m3',
    name: 'Harari Behati Select Reserve',
    description: 'Elite Harar ancient terraced harvest. Hand-selected for VIP gatherings, connoisseur grade aroma and crisp bite.',
    price: 980,
    available: 12,
    expiry: 'Daily Limited Batch',
    imageUrl: '/src/assets/images/fresh_khat_bundle_1790872116314.jpg',
    category: 'Khat Marketplace',
    unit: '1 curated bundle (~600g)',
    harvestTime: 'Picked 7:00 AM, arrived in Jijiga 11:30 AM',
    khatGrade: 'Harari Behati',
    leafMoisture: 'Premium select grade, wrapped in damp palm fiber',
    bundleWrapType: 'Traditional Palm Fiber'
  },
  {
    id: 'kb4',
    mamilaId: 'khat_m1',
    name: 'Gelemso Special Afternoon Batch',
    description: 'Sweet, mellow foliage with balanced character. Perfect for long afternoon sessions and friendly circles.',
    price: 750,
    available: 20,
    expiry: 'Fresh Afternoon Harvest',
    imageUrl: '/src/assets/images/fresh_khat_bundle_1790872116314.jpg',
    category: 'Khat Marketplace',
    unit: '1 standard bundle (~500g)',
    harvestTime: 'Fresh afternoon arrival 1:15 PM',
    khatGrade: 'Gelemso Special',
    leafMoisture: 'Sweet pleasant aroma, medium leaf texture',
    bundleWrapType: 'Moist Burlap Wrap'
  },
  {
    id: 'kb5',
    mamilaId: 'khat_m4',
    name: 'Central Taiwan Daily Fresh Urji',
    description: 'Popular everyday fresh batch with reliable consistency. Cut fresh and tied tight for speedy direct delivery.',
    price: 520,
    available: 30,
    expiry: 'Today, all-day supply',
    imageUrl: '/src/assets/images/fresh_khat_bundle_1790872116314.jpg',
    category: 'Khat Marketplace',
    unit: '1 compact bundle (~420g)',
    harvestTime: 'Fresh morning stock 9:00 AM',
    khatGrade: 'Urji Fresh Leaf',
    leafMoisture: 'Crisp green leaves, traditional tie',
    bundleWrapType: 'Fresh Banana Leaf'
  }
];

function generateInitialOrders(): Order[] {
  const generatedOrders: Order[] = [];
  const now = new Date();

  const pastCustomerDate1 = new Date(now);
  pastCustomerDate1.setDate(now.getDate() - 2);
  pastCustomerDate1.setHours(11, 30, 0, 0);

  const pastCustomerDate2 = new Date(now);
  pastCustomerDate2.setDate(now.getDate() - 3);
  pastCustomerDate2.setHours(15, 45, 0, 0);

  const pastCustomerDate3 = new Date(now);
  pastCustomerDate3.setDate(now.getDate() - 4);
  pastCustomerDate3.setHours(9, 15, 0, 0);

  const pastCustomerDate4 = new Date(now);
  pastCustomerDate4.setDate(now.getDate() - 1);
  pastCustomerDate4.setHours(13, 20, 0, 0);

  // 1. Delivered and Rated Food Order
  generatedOrders.push({
    id: 'ord-andualem-01',
    serviceType: 'FOOD',
    batchId: 'b2',
    batchName: 'Morning Pastry Box',
    mamilaId: 'm2',
    mamilaName: 'Arada Bakery',
    mamilaLocation: 'Piassa, Jijiga',
    price: 320,
    quantity: 1,
    deliveryFee: 150,
    totalPrice: 470,
    status: 'RATED',
    paymentMethod: 'TELEBIRR',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Jijiga',
    customerPlusCode: '8F2P+5H Jijiga',
    customerAddress: 'Kebele 04, Near Central Plaza',
    customerCoordinates: { lat: 9.3562, lng: 42.8002 },
    mamilaCoordinates: { lat: 9.3510, lng: 42.7915 },
    riderCoordinates: { lat: 9.3562, lng: 42.8002 },
    specialInstructions: 'Please ensure packaging is tightly sealed to keep pastries warm.',
    runnerId: 'run1',
    runnerName: 'Kenenisa Runner',
    runnerTagId: 'TAG-ET-91820',
    riderId: 'rid1',
    riderName: 'Dawit Rider',
    distanceKm: 3.4,
    etaMinutes: 12,
    rating: 5,
    reviewComment: 'Arrived hot and fresh! Excellent runner verification.',
    createdAt: pastCustomerDate1,
  });

  // 2. Cancelled Order in Jijiga (from video at 00:15)
  generatedOrders.push({
    id: 'ord-andualem-02',
    serviceType: 'FOOD',
    batchId: 'b1',
    batchName: 'Organic Veggie Bundle',
    mamilaId: 'm1',
    mamilaName: 'Fresh Morning Farms',
    mamilaLocation: 'Bole, Jijiga',
    price: 450,
    quantity: 1,
    deliveryFee: 150,
    totalPrice: 600,
    status: 'CANCELLED',
    paymentMethod: 'EBIRR',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Jijiga',
    customerPlusCode: '8F2P+5H Jijiga',
    customerAddress: 'Kebele 04, Jijiga',
    customerCoordinates: { lat: 9.3547, lng: 42.7955 },
    mamilaCoordinates: { lat: 9.3620, lng: 42.8020 },
    specialInstructions: 'Cancelled by customer before runner pickup.',
    runnerId: 'run1',
    runnerName: 'Kenenisa Runner',
    createdAt: pastCustomerDate2,
  });

  // 3. Declined Order in Jijiga (from video at 00:15)
  generatedOrders.push({
    id: 'ord-andualem-03',
    serviceType: 'FOOD',
    batchId: 'b3',
    batchName: 'Dairy Essentials Pack',
    mamilaId: 'm3',
    mamilaName: 'Sheger Dairy',
    mamilaLocation: 'Kazanchis, Jijiga',
    price: 650,
    quantity: 1,
    deliveryFee: 150,
    totalPrice: 800,
    status: 'DEFECT_REJECTED',
    paymentMethod: 'CBE_BIRR',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Jijiga',
    customerPlusCode: '8F2P+5H Jijiga',
    customerAddress: 'Kebele 02, Market Sector, Jijiga',
    customerCoordinates: { lat: 9.3510, lng: 42.7915 },
    mamilaCoordinates: { lat: 9.3470, lng: 42.8045 },
    defectReason: 'Milk container outer packaging broken during runner transit; rejected at quality checkpoint.',
    runnerId: 'run1',
    runnerName: 'Kenenisa Runner',
    createdAt: pastCustomerDate3,
  });

  // 4. Hassan Wali Hotel Food Order with Cooking Instruction (from video at 01:04)
  generatedOrders.push({
    id: 'ord-andualem-04',
    serviceType: 'FOOD',
    batchId: 'b4',
    batchName: 'Signature Babay Cold Drink & Lime + Sprites',
    mamilaId: 'm4',
    mamilaName: 'Hassan Wali Hotel & Restaurant',
    mamilaLocation: 'Taiwan Market, Jijiga / Hargeisa Branch',
    price: 240, // 2 items
    quantity: 2,
    deliveryFee: 200, // 200 ETB delivery fee matching video at 01:45
    totalPrice: 440,
    status: 'PICKED_UP',
    paymentMethod: 'ZAAD',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Hargeisa',
    customerPlusCode: 'H654+7G Hargeisa',
    customerAddress: 'Near Mansoor Hotel, Independence Ave, Hargeisa',
    customerCoordinates: { lat: 9.5620, lng: 44.0680 },
    mamilaCoordinates: { lat: 9.5580, lng: 44.0620 },
    riderCoordinates: { lat: 9.5605, lng: 44.0655 },
    cookingInstruction: 'Please cook it well done, no pink inside.', // Exact quote from video at 01:04!
    specialInstructions: 'Leave with receptionist if not answering door.',
    runnerId: 'run1',
    runnerName: 'Kenenisa Runner',
    runnerTagId: 'TAG-ET-99410',
    riderId: 'rid1',
    riderName: 'Dawit Rider',
    distanceKm: 2.8,
    etaMinutes: 10,
    createdAt: new Date(),
  });

  // 5. Book Parcel Express Inter-City Delivery (from video at 02:40 - 03:44)
  generatedOrders.push({
    id: 'ord-parcel-01',
    serviceType: 'PARCEL',
    batchId: 'parcel-express',
    batchName: 'Express Parcel: Legal Certificates & Fresh Camel Spices',
    mamilaId: 'm1',
    mamilaName: 'Jijiga Express Delivery Service Hub',
    mamilaLocation: 'Central Dispatch Terminal, Jijiga',
    price: 350,
    quantity: 1,
    deliveryFee: 200,
    totalPrice: 550,
    status: 'READY_FOR_RIDER',
    paymentMethod: 'SAHAL',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Hargeisa',
    customerPlusCode: 'H654+7G Hargeisa',
    customerAddress: 'Commercial District 3, Hargeisa',
    customerCoordinates: { lat: 9.5600, lng: 44.0650 },
    mamilaCoordinates: { lat: 9.3547, lng: 42.7955 },
    specialInstructions: 'Urgent passport and certificates. Sealed in tamper-evident waterproof pouch.',
    parcelDetails: {
      senderName: 'Andualem Awraris Haile',
      senderPhone: '+251 91 123 4567',
      senderCity: 'Jijiga',
      senderAddress: 'Kebele 04, Central Commercial Plaza',
      receiverName: 'Mustafa Farah Omer',
      receiverPhone: '+252 63 445 6789',
      receiverCity: 'Hargeisa',
      receiverAddress: 'Near Dahabshiil Tower, Hargeisa',
      parcelCategory: 'DOCUMENTS',
      weightCategory: '< 1 kg',
      description: 'Official clearance certificates and dried spice sampler',
      isFragile: false,
      tamperSealRequested: true,
      trackingCode: 'PARCEL-HA-9821',
    },
    runnerId: 'run1',
    runnerName: 'Kenenisa Runner',
    runnerTagId: 'TAG-SEAL-88319',
    distanceKm: 145.0,
    etaMinutes: 180,
    createdAt: pastCustomerDate4,
  });

  // 6. Jijiga Express Delivery Service: Ride Booking
  generatedOrders.push({
    id: 'ord-ride-01',
    serviceType: 'RIDE',
    batchId: 'ride-taxi',
    batchName: 'Jijiga Express Delivery Service: Airport to Central Plaza',
    mamilaId: 'm4',
    mamilaName: 'Jijiga Express Delivery Service Fleet',
    mamilaLocation: 'Central Dispatch, Jijiga',
    price: 280,
    quantity: 1,
    deliveryFee: 0,
    totalPrice: 280,
    status: 'DELIVERED', // Completed trip
    paymentMethod: 'ZAAD',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerPhone: '+251 91 123 4567',
    customerCity: 'Hargeisa',
    customerPlusCode: 'H654+7G Hargeisa',
    customerAddress: 'Mansoor Hotel, Hargeisa',
    customerCoordinates: { lat: 9.5620, lng: 44.0680 },
    mamilaCoordinates: { lat: 9.5200, lng: 44.0900 },
    rideDetails: {
      vehicleType: 'MARHABA_TAXI',
      pickupLocation: 'Egal International Airport, Hargeisa',
      dropoffLocation: 'Mansoor Hotel, Hargeisa',
      city: 'Hargeisa',
      driverName: 'Abdirahman Gulaid',
      vehicleModel: 'Toyota Corolla Sedan (Silver)',
      licensePlate: 'SL-39281',
      driverRating: 4.9,
      driverPhone: '+252 63 998 7766',
      tripDistanceKm: 7.2,
      tripDurationMins: 16,
      rideStatus: 'COMPLETED',
    },
    distanceKm: 7.2,
    etaMinutes: 16,
    rating: 5,
    reviewComment: 'Very polite driver, prompt airport pickup and smooth ride.',
    createdAt: pastCustomerDate1,
  });

  // Additional 7-day chronological distribution for Mamila and Admin analytics
  const dailyDistribution = [
    { daysAgo: 6, m1: 8, m2: 5, m3: 4 },
    { daysAgo: 5, m1: 11, m2: 7, m3: 5 },
    { daysAgo: 4, m1: 9, m2: 8, m3: 6 },
    { daysAgo: 3, m1: 14, m2: 10, m3: 7 },
    { daysAgo: 2, m1: 13, m2: 12, m3: 8 },
    { daysAgo: 1, m1: 16, m2: 9, m3: 11 },
    { daysAgo: 0, m1: 6, m2: 5, m3: 3 },
  ];

  let orderCount = 6;
  const customers = [
    'Fatima Zahra',
    'Yohannes Bekele',
    'Muna Abdi',
    'Ahmed Nour',
    'Sara Mohammed',
    'Eskinder Nega',
    'Khadija Hassan',
    'Tewodros Kassahun',
    'Hassan Warsame',
    'Amina Ali',
  ];

  dailyDistribution.forEach(({ daysAgo, m1, m2, m3 }) => {
    const dayOrders = [
      { id: 'm1', count: m1, price: 450, name: 'Fresh Morning Farms', batchId: 'b1', batchName: 'Organic Veggie Bundle', location: 'Bole, Jijiga' },
      { id: 'm2', count: m2, price: 320, name: 'Arada Bakery', batchId: 'b2', batchName: 'Morning Pastry Box', location: 'Piassa, Jijiga' },
      { id: 'm3', count: m3, price: 650, name: 'Sheger Dairy', batchId: 'b3', batchName: 'Dairy Essentials Pack', location: 'Kazanchis, Jijiga' },
    ];

    dayOrders.forEach(mamila => {
      for (let i = 0; i < mamila.count; i++) {
        orderCount++;
        const orderTime = new Date(now);
        orderTime.setDate(now.getDate() - daysAgo);
        orderTime.setHours(7 + ((i * 2) % 12), (i * 17) % 60, 0, 0);

        let status: OrderStatus = 'DELIVERED';
        if (daysAgo === 0) {
          const currentHour = now.getHours();
          const orderHour = orderTime.getHours();
          if (orderHour > currentHour) {
            status = 'TRANSACTION_PENDING';
          } else if (orderHour === currentHour) {
            status = 'READY_FOR_RIDER';
          } else {
            status = 'PICKED_UP';
          }
        }

        const methods: Order['paymentMethod'][] = ['TELEBIRR', 'EBIRR', 'CBE_BIRR', 'COOP_PAY', 'SAHAL', 'ZAAD', 'E_DAHAB', 'COD'];
        const paymentMethod = methods[orderCount % methods.length];
        const customer = customers[orderCount % customers.length];
        const cityObj = CITIES[orderCount % CITIES.length];

        const notes = [
          'Leave at front security gate.',
          'Call upon arrival at compound.',
          'Please ensure packaging is sealed.',
          'Fragile produce, handle gently.',
          '',
          '',
        ];
        const note = notes[i % notes.length];
        const deliveryFee = cityObj.name === 'Hargeisa' ? 200 : 150;

        const runnerId: string | undefined = status !== 'TRANSACTION_PENDING' ? 'run1' : undefined;
        const riderId: string | undefined = (status === 'PICKED_UP' || status === 'DELIVERED') ? 'rid1' : undefined;

        let dispute: Order['dispute'] = undefined;
        if (daysAgo > 1 && i === 1 && mamila.id === 'm1') {
          dispute = {
            reason: 'Damaged item',
            comment: 'Tomatoes were crushed during delivery handling.',
            filedAt: orderTime,
            status: daysAgo > 3 ? 'RESOLVED' : 'PENDING',
            resolutionNote: daysAgo > 3 ? 'Refund of 450 ETB credited to customer wallet.' : undefined,
          };
        }

        const mamilaCoords = mamila.id === 'm1' 
          ? { lat: 9.3620, lng: 42.8020 }
          : mamila.id === 'm2' 
          ? { lat: 9.3510, lng: 42.7915 }
          : { lat: 9.3470, lng: 42.8045 };

        const custCoords = {
          lat: (cityObj.name === 'Hargeisa' ? 9.5600 : cityObj.name === 'Jijiga' ? 9.3547 : 9.0249) + ((i % 10) * 0.001 - 0.005),
          lng: (cityObj.name === 'Hargeisa' ? 44.0650 : cityObj.name === 'Jijiga' ? 42.7955 : 38.7468) + ((orderCount % 10) * 0.001 - 0.005),
        };

        generatedOrders.push({
          id: `ord-${orderCount}`,
          serviceType: 'FOOD',
          batchId: mamila.batchId,
          batchName: mamila.batchName,
          mamilaId: mamila.id,
          mamilaName: mamila.name,
          mamilaLocation: mamila.location,
          mamilaCoordinates: mamilaCoords,
          customerCoordinates: custCoords,
          price: mamila.price,
          quantity: 1,
          deliveryFee,
          totalPrice: mamila.price + deliveryFee,
          status,
          paymentMethod,
          customerId: `cust-${(orderCount % 12) + 1}`,
          customerName: customer,
          customerCity: cityObj.name,
          customerPlusCode: `${cityObj.defaultPlusCode} #${(orderCount % 40) + 1}`,
          customerAddress: `Street 14, Zone ${(i % 5) + 1}, ${cityObj.name}`,
          specialInstructions: note,
          runnerId,
          runnerName: 'Kenenisa Runner',
          runnerTagId: `TAG-ET-${80000 + (orderCount % 9999)}`,
          riderId,
          riderName: 'Dawit Rider',
          distanceKm: 2.5 + ((orderCount % 30) / 10),
          etaMinutes: 10 + (orderCount % 15),
          rating: (daysAgo > 1 && i % 3 === 0) ? (4 + (i % 2)) : undefined,
          dispute,
          createdAt: orderTime,
        });
      }
    });
  });

  // Seed live EEU Prepaid Electricity Card Recharge order
  generatedOrders.unshift({
    id: 'ORD-EEU-01',
    serviceType: 'EEU_RECHARGE',
    batchId: 'eeu-batch-01',
    batchName: 'EEU Card Recharge: 500 ETB (~232.5 kWh)',
    mamilaId: 'eeu_hub',
    mamilaName: 'EEU Jijiga Main District Office (Keleb)',
    mamilaLocation: 'Near Regional Admin Complex, Keleb Sector, Jijiga',
    price: 500,
    quantity: 1,
    deliveryFee: 75,
    totalPrice: 575,
    status: 'PICKED_UP',
    paymentMethod: 'TELEBIRR',
    customerId: 'c1',
    customerName: 'Andualem Awraris Haile',
    customerCity: 'Jijiga',
    customerPlusCode: '8F2P+5H Jijiga',
    customerAddress: 'Kebele 04, Near Central Plaza, Jijiga',
    specialInstructions: 'Card is inside red pouch on living room table.',
    riderId: 'rid1',
    riderName: 'Dawit Rider',
    distanceKm: 2.1,
    etaMinutes: 8,
    eeuDetails: {
      meterNumber: '0142-8839-1029-3',
      cardSerialNumber: 'EEU-SM-99482',
      rechargeAmount: 500,
      serviceFee: 75,
      eeuHubName: 'EEU Jijiga Main District Office (Keleb)',
      custodyPhase: 'AT_EEU_HUB',
      custodyLabel: 'AT_EEU_HUB',
      custodyTimeline: [
        {
          phase: 'WITH_CUSTOMER',
          label: 'WITH_CUSTOMER',
          timestamp: '09:15 AM',
          note: 'Order placed by Andualem Awraris Haile. Smart card ready for courier.',
          actor: 'Customer'
        },
        {
          phase: 'WITH_RIDER_OUTBOUND',
          label: 'WITH_RIDER',
          timestamp: '09:30 AM',
          note: 'Card & 500 ETB float secured in tamper-evident pouch #8819 by Dawit Rider.',
          actor: 'Dawit Rider'
        },
        {
          phase: 'AT_EEU_HUB',
          label: 'AT_EEU_HUB',
          timestamp: '09:48 AM',
          note: 'Dawit Rider checked in at EEU Keleb District counter. Smart chip connected.',
          actor: 'EEU Teller #4'
        }
      ],
      kwhUnits: 232.5
    },
    createdAt: new Date(Date.now() - 3600000)
  });

  return generatedOrders;
}

export const INITIAL_ORDERS: Order[] = generateInitialOrders();
