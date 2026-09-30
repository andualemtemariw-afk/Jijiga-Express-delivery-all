import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './googleAuth';
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
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef);

    return onSnapshot(
      q,
      async (snapshot) => {
        if (snapshot.empty) {
          // Seed initial orders to Firestore so the user has immediate data
          try {
            await seedOrdersToFirestore(INITIAL_ORDERS);
          } catch (seedErr) {
            console.warn('Could not auto-seed Firestore orders:', seedErr);
          }
          onOrdersUpdated(INITIAL_ORDERS);
          return;
        }

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

        // Sort by createdAt descending
        loadedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onOrdersUpdated(loadedOrders);
      },
      (err) => {
        console.warn('Firestore subscription notice (using local sync fallback):', err);
        onError?.(err);
      }
    );
  } catch (err: any) {
    console.warn('Failed to initialize Firestore subscription:', err);
    onError?.(err);
    return () => {};
  }
}

/**
 * Saves or updates an order in Cloud Firestore.
 */
export async function saveOrderToFirestore(order: Order): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    const serializedOrder: any = {
      ...order,
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
