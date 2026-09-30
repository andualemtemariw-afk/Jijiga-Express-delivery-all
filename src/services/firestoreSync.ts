import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  getDocs, 
  query, 
  where,
  limit,
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { auth, ensureAppUser, db } from './googleAuth';
import { Order } from '../types';
import { INITIAL_ORDERS } from '../data';

const ORDERS_COLLECTION = 'orders';

/**
 * Subscribes to real-time order updates from Cloud Firestore.
 * Automatically seeds the database if empty on first load.
 */
export function subscribeToFirestoreOrders(
  onOrdersUpdated: (orders: Order[]) => void,
  onError?: (err: Error) => void
) {
  let unsubscribe = () => {};
  let cancelled = false;

  ensureAppUser().then((user) => {
    if (cancelled) return;
    const ordersRef = collection(db, ORDERS_COLLECTION);
    // Limit the live result set and never download another user's orders.
    const q = query(
      ordersRef,
      where('customerId', '==', user.uid),
      limit(50)
    );

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loadedOrders: Order[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            ...data,
            id: docSnap.id,
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt || Date.now()),
          } as Order;
        });

        loadedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onOrdersUpdated(loadedOrders);
      },
      (err) => {
        console.warn('Firestore subscription notice (using local sync fallback):', err);
        onError?.(err);
      }
    );
  }).catch((err) => {
    console.warn('Could not authenticate for Firestore sync:', err);
    onError?.(err);
  });

  return () => {
    cancelled = true;
    unsubscribe();
  };
}

/**
 * Saves or updates an order in Cloud Firestore.
 */
export async function saveOrderToFirestore(order: Order): Promise<void> {
  try {
    const user = await ensureAppUser();
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    const serializedOrder: any = {
      ...order,
      // Never trust a browser-supplied owner ID for persisted data.
      customerId: user.uid,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
      updatedAt: serverTimestamp(),
    };
    await setDoc(docRef, serializedOrder, { merge: true });
  } catch (err) {
    console.warn('Could not save order to Firestore:', err);
    throw err;
  }
}

/**
 * Seeds initial orders into Firestore.
 */
export async function seedOrdersToFirestore(orders: Order[]): Promise<void> {
  const batchPromises = orders.map((o) => {
    const docRef = doc(db, ORDERS_COLLECTION, o.id);
    return setDoc(docRef, {
      ...o,
      createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt,
    }, { merge: true });
  });

  await Promise.all(batchPromises);
}
