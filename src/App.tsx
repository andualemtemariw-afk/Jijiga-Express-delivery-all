import { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Role, Order, Batch, PaymentMethod, ChatMessage, EeuRechargeDetails } from './types';
import { INITIAL_BATCHES, MAMILAS, INITIAL_ORDERS } from './data';
import { INITIAL_ORDER_CHATS } from './data/vernacularPhrases';
import { CustomerView } from './roles/CustomerView';
import { RunnerView } from './roles/RunnerView';
import { RiderView } from './roles/RiderView';
import { AdminView } from './roles/AdminView';
import { MamilaView } from './roles/MamilaView';
import { MapPreviewModal } from './components/map/MapPreviewModal';
import { UpdateApiKeyModal } from './components/map/UpdateApiKeyModal';
import { GoogleDriveSyncModal } from './components/drive/GoogleDriveSyncModal';
import { GmailNotificationModal } from './components/gmail/GmailNotificationModal';
import { auth } from './services/googleAuth';
import { subscribeToFirestoreOrders, saveOrderToFirestore } from './services/firestoreSync';
import { MAMILA_COORDINATES, DEFAULT_CUSTOMER_COORDINATES } from './utils/geo';
import { getNextEeuPhase, EEU_STATE_CHAIN } from './utils/eeuStateMachine';
import { Package2, Users, Bike, Shield, ShoppingBag, Store, MapPin, KeyRound, HardDrive, Mail } from 'lucide-react';

export const CURRENT_CUSTOMER_PROFILE = {
  id: 'c1',
  name: 'Andualem Awraris Haile',
  phone: '+251 91 123 4567',
  city: 'Jijiga',
  address: 'Kebele 04, Near Central Plaza, Jijiga',
  plusCode: '8F2P+5H Jijiga',
};

const CURRENT_RUNNER_ID = 'run1';
const CURRENT_RIDER_ID = 'rid1';
const CURRENT_MAMILA_ID = 'm1'; // Fresh Morning Farms

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('CUSTOMER');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inventory, setInventory] = useState<Batch[]>(INITIAL_BATCHES);
  const [orderMessages, setOrderMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_ORDER_CHATS);
  const [globalModalOrder, setGlobalModalOrder] = useState<Order | null>(null);
  const [apiKey, setApiKey] = useState(() => {
    return (
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
      localStorage.getItem('user_google_maps_api_key') ||
      ''
    );
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);

  // Real-time synchronization with Cloud Firestore
  useEffect(() => {
    const unsubscribe = subscribeToFirestoreOrders((remoteOrders) => {
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handlePlaceOrder = (
    batch: Batch, 
    paymentMethod: PaymentMethod,
    options?: {
      quantity?: number;
      specialInstructions?: string;
      cookingInstruction?: string;
      deliveryCity?: string;
      customerAddress?: string;
      customerPlusCode?: string;
      customerCoordinates?: { lat: number; lng: number };
    }
  ) => {
    const mamila = MAMILAS.find(m => m.id === batch.mamilaId);
    const quantity = options?.quantity || 1;
    const deliveryFee = options?.deliveryCity === 'Hargeisa' ? 200 : 150;
    const subtotal = batch.price * quantity;
    const totalPrice = subtotal + deliveryFee;

    // Decrease inventory atomically
    setInventory(prev => prev.map(b => 
      b.id === batch.id ? { ...b, available: Math.max(0, b.available - quantity) } : b
    ));

    const originCoords = mamila?.coordinates || MAMILA_COORDINATES[batch.mamilaId] || MAMILA_COORDINATES.m1;
    const destCoords = options?.customerCoordinates || DEFAULT_CUSTOMER_COORDINATES;

    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substring(2, 9),
      serviceType: 'FOOD',
      batchId: batch.id,
      batchName: batch.name,
      mamilaId: batch.mamilaId,
      mamilaName: mamila?.name || 'Unknown Store',
      mamilaLocation: mamila?.location || 'Unknown Location',
      price: subtotal,
      quantity,
      deliveryFee,
      totalPrice,
      status: 'RUNNER_ASSIGNED',
      paymentMethod,
      customerId: CURRENT_CUSTOMER_PROFILE.id,
      customerName: CURRENT_CUSTOMER_PROFILE.name,
      customerPhone: CURRENT_CUSTOMER_PROFILE.phone,
      customerCity: options?.deliveryCity || CURRENT_CUSTOMER_PROFILE.city,
      customerPlusCode: options?.customerPlusCode || CURRENT_CUSTOMER_PROFILE.plusCode,
      customerAddress: options?.customerAddress || CURRENT_CUSTOMER_PROFILE.address,
      customerCoordinates: destCoords,
      mamilaCoordinates: originCoords,
      riderCoordinates: originCoords,
      specialInstructions: options?.specialInstructions,
      cookingInstruction: options?.cookingInstruction,
      runnerId: CURRENT_RUNNER_ID,
      runnerName: 'Kenenisa Runner',
      distanceKm: 3.2,
      etaMinutes: 14,
      createdAt: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    saveOrderToFirestore(newOrder).catch((err) => console.warn('Firestore write notice:', err));
  };

  const handleBookParcel = (parcelOrder: Partial<Order>) => {
    const fullOrder = parcelOrder as Order;
    setOrders(prev => [fullOrder, ...prev]);
    saveOrderToFirestore(fullOrder).catch((err) => console.warn('Firestore write notice:', err));
  };

  const handleBookRide = (rideOrder: Partial<Order>) => {
    const fullOrder = rideOrder as Order;
    setOrders(prev => [fullOrder, ...prev]);
    saveOrderToFirestore(fullOrder).catch((err) => console.warn('Firestore write notice:', err));
  };

  const handleBookEeu = (eeuOrder: Partial<Order>) => {
    const fullOrder = eeuOrder as Order;
    setOrders(prev => [fullOrder, ...prev]);
    saveOrderToFirestore(fullOrder).catch((err) => console.warn('Firestore write notice:', err));
  };

  const handleBookKhat = (khatOrder: Partial<Order>) => {
    const fullOrder = khatOrder as Order;
    setOrders(prev => [fullOrder, ...prev]);
    saveOrderToFirestore(fullOrder).catch((err) => console.warn('Firestore write notice:', err));
  };

  const handleUpdateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === orderId ? { ...o, ...updates } : o);
      const target = next.find(o => o.id === orderId);
      if (target) {
        saveOrderToFirestore(target).catch((err) => console.warn('Firestore write notice:', err));
      }
      return next;
    });
  };

  const handleSendMessage = (orderId: string, message: Omit<ChatMessage, 'id' | 'orderId'>) => {
    const newMsg: ChatMessage = {
      ...message,
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      orderId,
    };
    setOrderMessages(prev => ({
      ...prev,
      [orderId]: [...(prev[orderId] || []), newMsg]
    }));
  };

  const handleCancelOrder = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    if (targetOrder.status === 'RUNNER_ASSIGNED') {
      const qty = targetOrder.quantity || 1;
      setInventory(prev => prev.map(b => 
        b.id === targetOrder.batchId ? { ...b, available: b.available + qty } : b
      ));

      const updated = { ...targetOrder, status: 'CANCELLED' as const };
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      saveOrderToFirestore(updated).catch((err) => console.warn('Firestore write notice:', err));
    }
  };

  // Step-through simulation helper for Customer testing
  const handleSimulateNextStep = (orderId: string) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;

    // Handle EEU Prepaid Recharge Round-Trip Chain of Custody
    if (target.serviceType === 'EEU_RECHARGE' && target.eeuDetails) {
      const nextPhase = getNextEeuPhase(target.eeuDetails.custodyPhase);
      if (nextPhase) {
        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const stepConfig = EEU_STATE_CHAIN.find(s => s.phase === nextPhase);
        const isReturned = nextPhase === 'RETURNED';

        const updatedEeuDetails: EeuRechargeDetails = {
          ...target.eeuDetails,
          custodyPhase: nextPhase,
          custodyLabel: stepConfig ? stepConfig.label : (nextPhase as any),
          custodyTimeline: [
            ...target.eeuDetails.custodyTimeline,
            {
              phase: nextPhase,
              label: stepConfig ? stepConfig.label : nextPhase,
              timestamp: nowTime,
              note: `Step advanced to ${stepConfig ? stepConfig.title : nextPhase}.`,
              actor: 'Custody Dispatch'
            }
          ],
          receiptImageUrl: target.eeuDetails.receiptImageUrl || (nextPhase === 'WITH_RIDER_RETURN' || nextPhase === 'RETURNED'
            ? '/src/assets/images/dairy_farm_essentials_1790430944133.jpg'
            : undefined),
          receiptTimestamp: target.eeuDetails.receiptTimestamp || (nextPhase === 'WITH_RIDER_RETURN' ? `${new Date().toISOString().slice(0, 10)} ${nowTime}` : undefined),
          tokenCode: target.eeuDetails.tokenCode || '4920-1928-4820-9182-3849'
        };

        handleUpdateOrder(orderId, {
          eeuDetails: updatedEeuDetails,
          status: isReturned ? 'DELIVERED' : 'PICKED_UP',
          riderId: target.riderId || CURRENT_RIDER_ID,
          riderName: target.riderName || 'Dawit Rider'
        });
        return;
      }
    }

    if (target.status === 'RUNNER_ASSIGNED') {
      handleUpdateOrder(orderId, { 
        status: 'READY_FOR_RIDER', 
        runnerTagId: 'TAG-ET-' + Math.floor(10000 + Math.random() * 90000) 
      });
    } else if (target.status === 'READY_FOR_RIDER') {
      handleUpdateOrder(orderId, { 
        status: 'RIDER_ACCEPTED', 
        riderId: CURRENT_RIDER_ID, 
        riderName: 'Dawit Rider' 
      });
    } else if (target.status === 'RIDER_ACCEPTED') {
      handleUpdateOrder(orderId, { status: 'PICKED_UP' });
    } else if (target.status === 'PICKED_UP') {
      handleUpdateOrder(orderId, { status: 'DELIVERED' });
    }
  };

  const handleRateOrder = (orderId: string, rating: number, reviewComment?: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'RATED', rating, reviewComment } : o
    ));
  };

  const handleDisputeOrder = (orderId: string, reason: string, comment: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? {
        ...o,
        dispute: {
          reason,
          comment,
          filedAt: new Date(),
          status: 'PENDING'
        }
      } : o
    ));
  };

  const handleResolveDispute = (orderId: string, status: 'RESOLVED' | 'REFUNDED', resolutionNote?: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId && o.dispute ? {
        ...o,
        dispute: {
          ...o.dispute,
          status,
          resolutionNote
        }
      } : o
    ));
  };

  // Mamila batch management handlers
  const handleAddBatch = (newBatch: Omit<Batch, 'id'>) => {
    const batchWithId: Batch = {
      ...newBatch,
      id: 'b' + (inventory.length + 1),
    };
    setInventory(prev => [batchWithId, ...prev]);
  };

  const handleUpdateBatch = (batchId: string, updates: Partial<Batch>) => {
    setInventory(prev => prev.map(b => b.id === batchId ? { ...b, ...updates } : b));
  };

  // Runner defect handler
  const handleRejectDefect = (orderId: string, reason: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    // Return stock and set defect status
    const qty = targetOrder.quantity || 1;
    setInventory(prev => prev.map(b => 
      b.id === targetOrder.batchId ? { ...b, available: b.available + qty } : b
    ));

    setOrders(prev => prev.map(o => 
      o.id === orderId ? { 
        ...o, 
        status: 'DEFECT_REJECTED', 
        defectReason: reason 
      } : o
    ));
  };

  // --- Strict Data Isolation Filtering ---
  const customerOrders = orders.filter(o =>
    o.customerId === CURRENT_CUSTOMER_PROFILE.id ||
    o.customerId === auth.currentUser?.uid
  );
  const runnerOrders = orders.filter(o => o.runnerId === CURRENT_RUNNER_ID && o.status !== 'CANCELLED');
  const riderOrders = orders.filter(o => 
    o.status !== 'CANCELLED' && 
    o.status !== 'DEFECT_REJECTED' &&
    (o.riderId === CURRENT_RIDER_ID || (o.status === 'READY_FOR_RIDER' && !o.riderId))
  );
  const mamilaInventory = inventory.filter(b => b.mamilaId === CURRENT_MAMILA_ID);
  const mamilaOrders = orders.filter(o => o.mamilaId === CURRENT_MAMILA_ID);

  return (
    <APIProvider 
      apiKey={apiKey} 
      language="en" 
      region="ET"
      onError={(e) => console.warn('Google Maps Provider warning:', e)}
    >
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
        {/* 3-Zone Top Bar Contract adhering to frontend-design */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Zone 1: Single text wordmark */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-xs">
                <Package2 className="w-5 h-5 text-emerald-400" />
              </div>
              <a href="/" className="text-xl font-bold tracking-tight text-slate-900">
                Jijiga Express Delivery Service
              </a>
            </div>
            
            {/* Zone 2: Navigation Role Switcher Segmented Control */}
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {(['CUSTOMER', 'MAMILA', 'RUNNER', 'RIDER', 'ADMIN'] as Role[]).map(role => {
                const icons = {
                  CUSTOMER: ShoppingBag,
                  MAMILA: Store,
                  RUNNER: Users,
                  RIDER: Bike,
                  ADMIN: Shield
                };
                const Icon = icons[role];
                const isActive = activeRole === role;
                
                return (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {role.charAt(0) + role.slice(1).toLowerCase()} Portal
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Quiet context indicator */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 font-medium">
              <button
                onClick={() => setShowDriveModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition-colors cursor-pointer shadow-2xs"
                title="Google Drive Receipts Vault"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                <span>Google Drive</span>
              </button>
              <button
                onClick={() => setShowGmailModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 text-red-800 border border-red-200/80 transition-colors cursor-pointer shadow-2xs"
                title="Gmail Dispatch Alerts"
              >
                <Mail className="w-3.5 h-3.5 text-red-600" />
                <span>Gmail</span>
              </button>
              <button
                onClick={() => setShowKeyModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Configure Google Maps API Key"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>Map Key</span>
              </button>
              <span className="hidden md:inline">Horn of Africa Network</span>
              <span className="hidden md:inline" aria-hidden="true">·</span>
              <span className="font-mono text-emerald-600 font-bold hidden sm:inline">{orders.length} Orders Active</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6 mt-2">
          {activeRole === 'CUSTOMER' && (
            <CustomerView 
              inventory={inventory} 
              myOrders={customerOrders} 
              orderMessages={orderMessages}
              onSendMessage={handleSendMessage}
              onPlaceOrder={handlePlaceOrder} 
              onCancelOrder={handleCancelOrder}
              onRateOrder={handleRateOrder}
              onDisputeOrder={handleDisputeOrder}
              onSimulateNextStep={handleSimulateNextStep}
              onOpenMapPreview={(order) => setGlobalModalOrder(order)}
              onBookParcel={handleBookParcel}
              onBookRide={handleBookRide}
              onBookEeu={handleBookEeu}
              onBookKhat={handleBookKhat}
            />
          )}
          {activeRole === 'MAMILA' && (
            <MamilaView 
              inventory={mamilaInventory} 
              orders={mamilaOrders}
              onAddBatch={handleAddBatch}
              onUpdateBatch={handleUpdateBatch}
            />
          )}
          {activeRole === 'RUNNER' && (
            <RunnerView 
              orders={runnerOrders} 
              orderMessages={orderMessages}
              onSendMessage={handleSendMessage}
              onUpdateStatus={(id, status) => handleUpdateOrder(id, { 
                status, 
                runnerTagId: 'TAG-ET-' + Math.floor(10000 + Math.random() * 90000) 
              })} 
              onRejectDefect={handleRejectDefect}
            />
          )}
          {activeRole === 'RIDER' && (
            <RiderView 
              orders={riderOrders} 
              orderMessages={orderMessages}
              onSendMessage={handleSendMessage}
              currentRiderId={CURRENT_RIDER_ID} 
              onUpdateOrder={handleUpdateOrder} 
              onOpenMapPreview={(order) => setGlobalModalOrder(order)}
            />
          )}
          {activeRole === 'ADMIN' && (
            <AdminView 
              orders={orders} 
              inventory={inventory} 
              onResolveDispute={handleResolveDispute}
              onOpenMapPreview={(order) => setGlobalModalOrder(order)}
            />
          )}
        </main>

        {/* Global Map Preview Modal */}
        <MapPreviewModal
          order={globalModalOrder}
          isOpen={!!globalModalOrder}
          onClose={() => setGlobalModalOrder(null)}
        />

        {/* Google Maps API Key Modal */}
        <UpdateApiKeyModal
          isOpen={showKeyModal}
          onClose={() => setShowKeyModal(false)}
          currentKey={apiKey}
          onSaveKey={(newK) => {
            localStorage.setItem('user_google_maps_api_key', newK);
            setApiKey(newK);
            window.location.reload();
          }}
        />

        {/* Google Drive Vault Sync Modal */}
        <GoogleDriveSyncModal
          isOpen={showDriveModal}
          onClose={() => setShowDriveModal(false)}
          orders={orders}
        />

        {/* Gmail Dispatch Notifications Modal */}
        <GmailNotificationModal
          isOpen={showGmailModal}
          onClose={() => setShowGmailModal(false)}
          orders={orders}
        />
      </div>
    </APIProvider>
  );
}
