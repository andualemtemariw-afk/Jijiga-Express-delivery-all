export type Role = 'CUSTOMER' | 'MAMILA' | 'RUNNER' | 'RIDER' | 'ADMIN';

export type ServiceType = 'FOOD' | 'PARCEL' | 'RIDE';

export type PaymentMethod = 
  | 'TELEBIRR' 
  | 'EBIRR' 
  | 'CBE_BIRR' 
  | 'COOP_PAY'
  | 'SAHAL' 
  | 'ZAAD' 
  | 'E_DAHAB'
  | 'COD';

export type OrderStatus =
  | 'TRANSACTION_PENDING'
  | 'RUNNER_ASSIGNED'
  | 'READY_FOR_RIDER' // Tagged by runner
  | 'RIDER_ACCEPTED'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'RATED'
  | 'CANCELLED'
  | 'DEFECT_REJECTED';

export interface Mamila {
  id: string;
  name: string;
  rating: number;
  location: string;
  plusCode: string;
  phone?: string;
  coordinates?: { lat: number; lng: number };
  category?: 'Farm & Grocer' | 'Hotel & Restaurant' | 'Bakery & Sweets' | 'Dairy';
}

export interface Batch {
  id: string;
  mamilaId: string;
  name: string;
  description: string;
  price: number;
  available: number;
  expiry: string;
  imageUrl: string;
  category?: string;
  unit?: string;
  harvestTime?: string;
}

export interface Dispute {
  reason: string;
  comment: string;
  filedAt: Date;
  status: 'PENDING' | 'RESOLVED' | 'REFUNDED';
  resolutionNote?: string;
}

export interface ParcelDetails {
  senderName: string;
  senderPhone: string;
  senderCity: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverCity: string;
  receiverAddress: string;
  parcelCategory: 'DOCUMENTS' | 'PERISHABLE_FOOD' | 'ELECTRONICS' | 'CLOTHING' | 'FRAGILE';
  weightCategory: '< 1 kg' | '1 - 3 kg' | '3 - 5 kg' | '5 - 10 kg';
  description: string;
  isFragile: boolean;
  tamperSealRequested: boolean;
  trackingCode: string;
}

export interface RideDetails {
  vehicleType: 'MARHABA_TAXI' | 'MARHABA_MOTO';
  pickupLocation: string;
  dropoffLocation: string;
  city: string;
  driverName?: string;
  vehicleModel?: string;
  licensePlate?: string;
  driverRating?: number;
  driverPhone?: string;
  tripDistanceKm: number;
  tripDurationMins: number;
  rideStatus: 'SEARCHING' | 'DRIVER_ASSIGNED' | 'ARRIVED_PICKUP' | 'ON_TRIP' | 'COMPLETED' | 'CANCELLED';
}

export interface Order {
  id: string;
  serviceType?: ServiceType;
  batchId: string;
  batchName: string;
  mamilaId: string;
  mamilaName: string;
  mamilaLocation: string;
  price: number; // Subtotal for item(s) or base trip fare
  quantity: number;
  deliveryFee: number;
  totalPrice: number; // price * quantity + deliveryFee
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerCity?: string;
  customerPlusCode: string;
  customerAddress?: string;
  customerCoordinates?: { lat: number; lng: number };
  mamilaCoordinates?: { lat: number; lng: number };
  riderCoordinates?: { lat: number; lng: number };
  specialInstructions?: string;
  cookingInstruction?: string; // Custom preparation / cooking note (e.g. "Please cook it well done, no pink inside")
  parcelDetails?: ParcelDetails;
  rideDetails?: RideDetails;
  runnerId?: string;
  runnerName?: string;
  runnerTagId?: string;
  runnerPhotoUrl?: string;
  riderId?: string;
  riderName?: string;
  riderProofUrl?: string;
  distanceKm?: number;
  etaMinutes?: number;
  rating?: number;
  reviewComment?: string;
  dispute?: Dispute;
  defectReason?: string;
  createdAt: Date;
}

export type MessageSenderRole = 'CUSTOMER' | 'RUNNER' | 'RIDER' | 'SYSTEM';
export type CommunicationChannel = 'CHAT' | 'VOICE_NOTE' | 'SMS' | 'USSD' | 'CALL';

export interface ChatMessage {
  id: string;
  orderId: string;
  senderRole: MessageSenderRole;
  senderName: string;
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
  voiceDurationSeconds?: number;
  language?: 'so' | 'am' | 'en';
  status?: 'SENT' | 'DELIVERED' | 'READ';
  transcript?: string;
}

export interface VernacularPhrase {
  id: string;
  category: 'arrival' | 'payment' | 'instruction' | 'delay' | 'verification';
  targetRole: 'CUSTOMER' | 'RIDER' | 'RUNNER';
  so: string; // Af-Soomaali
  am: string; // አማርኛ
  en: string; // English
}
