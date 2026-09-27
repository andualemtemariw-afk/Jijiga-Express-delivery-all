import { Order, ChatMessage } from '../types';
import { 
  Navigation2, 
  CheckCircle2, 
  PackageCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  DollarSign, 
  Calculator, 
  ShieldCheck, 
  Map as MapIcon, 
  Maximize2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Radio
} from 'lucide-react';
import { useState } from 'react';
import { OrderMapPreview } from '../components/map/OrderMapPreview';
import { CommunicationBridgeModal } from '../components/communication/CommunicationBridgeModal';

interface Props {
  orders: Order[];
  orderMessages?: Record<string, ChatMessage[]>;
  onSendMessage?: (orderId: string, message: Omit<ChatMessage, 'id' | 'orderId'>) => void;
  onUpdateOrder: (orderId: string, updates: Partial<Order>) => void;
  currentRiderId: string;
  onOpenMapPreview?: (order: Order) => void;
}

export function RiderView({ 
  orders, 
  orderMessages,
  onSendMessage,
  onUpdateOrder, 
  currentRiderId, 
  onOpenMapPreview 
}: Props) {
  const readyOrders = orders.filter(o => o.status === 'READY_FOR_RIDER' && !o.riderId);
  const activeJobs = orders.filter(o => ['RIDER_ACCEPTED', 'PICKED_UP'].includes(o.status) && o.riderId === currentRiderId);
  const [dialedPhone, setDialedPhone] = useState<string | null>(null);
  const [activeChatOrder, setActiveChatOrder] = useState<Order | null>(null);
  const [collapsedMaps, setCollapsedMaps] = useState<Record<string, boolean>>({});
  const [quickPillFeedback, setQuickPillFeedback] = useState<Record<string, string>>({});

  // Cash change calculator state
  const [tenderedAmount, setTenderedAmount] = useState<Record<string, number>>({});

  const handleTenderChange = (orderId: string, val: number) => {
    setTenderedAmount(prev => ({ ...prev, [orderId]: val }));
  };

  const toggleMapCollapse = (orderId: string) => {
    setCollapsedMaps(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {dialedPhone && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl flex items-center justify-between text-xs">
          <span>Encrypted relay dialer active: <strong className="font-mono">{dialedPhone}</strong></span>
          <button onClick={() => setDialedPhone(null)} className="font-semibold text-blue-700 hover:text-blue-900 cursor-pointer">
            End Call
          </button>
        </div>
      )}

      {activeJobs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Active Dispatch Delivery
            </h2>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {activeJobs.length} In Transit
            </span>
          </div>

          <div className="space-y-4">
            {activeJobs.map(order => {
              const due = order.totalPrice || order.price;
              const tendered = tenderedAmount[order.id] || due;
              const changeDue = Math.max(0, tendered - due);

              return (
                <div key={order.id} className="bg-white border-2 border-emerald-200 p-6 rounded-2xl shadow-sm space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Order #{order.id}
                      </span>
                      <h3 className="font-bold text-xl text-slate-900 mt-1">{order.batchName}</h3>
                      <p className="text-xs text-slate-500">From Mamila: {order.mamilaName} ({order.mamilaLocation})</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-xl font-mono text-slate-900 tabular-nums">{due} ETB</p>
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full mt-1 inline-block ${
                        order.paymentMethod === 'COD' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {order.paymentMethod === 'COD' ? 'Collect Cash on Delivery' : `${order.paymentMethod} Paid`}
                      </span>
                    </div>
                  </div>

                  {/* Customer Navigation Box */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Destination</span>
                      <span className="font-bold text-slate-900 text-sm block">{order.customerName}</span>
                      <span className="text-slate-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        {order.customerCity || 'Jijiga'}: {order.customerAddress || order.customerPlusCode}
                      </span>
                      <span className="text-[11px] font-mono text-blue-700 font-semibold mt-1 block">
                        Plus Code: {order.customerPlusCode}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between sm:items-end">
                      <div className="text-left sm:text-right">
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase">Route Telemetry</span>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          ~{order.distanceKm || 3.2} km · ~{order.etaMinutes || 12} mins
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                          Tamper Seal Verified: {order.runnerTagId || 'TAG-ET-91820'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => setActiveChatOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-bold hover:bg-blue-100 transition-colors text-xs cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                          Chat & Voice ({((orderMessages && orderMessages[order.id]) || []).length})
                        </button>

                        <button
                          onClick={() => setDialedPhone(order.customerPhone || '+251 91 123 4567')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-xs cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vernacular 1-Tap Quick-Pills for Courier */}
                  <div className="p-3 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-xl border border-emerald-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                        1-Tap Vernacular Dispatch Quick-Pills:
                      </span>
                      {quickPillFeedback[order.id] && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full animate-bounce">
                          {quickPillFeedback[order.id]}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Waan soo dhowaaday (5 daqiiqo)', text: 'Waan soo dhowaaday, qiyaastii 5 daqiiqo ayaan kuugu imanayaa.', lang: 'so' as const, tag: '🇸🇴 Arriving in 5m' },
                        { label: 'Waan taaganahay albaabka', text: 'Waan taaganahay albaabkaaga hore, fadlan soo bax.', lang: 'so' as const, tag: '🇸🇴 At Front Gate' },
                        { label: 'እየደረስኩ ነው (5 ደቂቃ)', text: 'እየደረስኩ ነው፣ በ5 ደቂቃ አካባቢ እደርሳለሁ።', lang: 'am' as const, tag: '🇪🇹 Arriving in 5m' },
                        { label: 'ደጃፉ ጋ ቆሜያለሁ', text: 'ደጃፍዎ ላይ ደርሼ ቆሜያለሁ፣ እባክዎ ይውጡ።', lang: 'am' as const, tag: '🇪🇹 At Front Gate' },
                        { label: 'Arriving in ~5 mins', text: 'I am arriving shortly, approximately 5 minutes away.', lang: 'en' as const, tag: '🇬🇧 Arriving' },
                      ].map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (onSendMessage) {
                              const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                              onSendMessage(order.id, {
                                senderRole: 'RIDER',
                                senderName: 'Dawit Rider',
                                text: pill.text,
                                timestamp: timeStr,
                                language: pill.lang,
                                status: 'DELIVERED'
                              });
                              setQuickPillFeedback(prev => ({ ...prev, [order.id]: '✓ Sent to customer!' }));
                              setTimeout(() => {
                                setQuickPillFeedback(prev => {
                                  const c = { ...prev };
                                  delete c[order.id];
                                  return c;
                                });
                              }, 3000);
                            }
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 text-slate-700 rounded-lg text-xs font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <span className="text-[10px] opacity-75">{pill.tag}:</span>
                          <span>"{pill.label}"</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions Note */}
                  {order.specialInstructions && (
                    <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-950">
                      <MessageSquare className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Customer Instruction: </span>
                        <span>"{order.specialInstructions}"</span>
                      </div>
                    </div>
                  )}

                  {/* Turn-by-Turn Route Map Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleMapCollapse(order.id)}
                        className="text-xs font-bold text-slate-800 flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <MapIcon className="w-4 h-4 text-blue-600" />
                        <span>Live Dispatch Route Map Preview</span>
                        {collapsedMaps[order.id] ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>

                      {onOpenMapPreview && (
                        <button
                          type="button"
                          onClick={() => onOpenMapPreview(order)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3" />
                          Fullscreen
                        </button>
                      )}
                    </div>

                    {!collapsedMaps[order.id] && (
                      <OrderMapPreview
                        order={order}
                        heightClass="h-[280px]"
                        onExpandFullscreen={onOpenMapPreview ? () => onOpenMapPreview(order) : undefined}
                        showControls={true}
                      />
                    )}
                  </div>

                  {/* Cash Change Calculator for COD */}
                  {order.paymentMethod === 'COD' && order.status === 'PICKED_UP' && (
                    <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <Calculator className="w-4 h-4" />
                        <span>COD Cash Change Calculator</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="text-[11px] text-slate-500 block mb-0.5">Cash Tendered by Customer</label>
                          <input
                            type="number"
                            value={tendered}
                            onChange={(e) => handleTenderChange(order.id, Number(e.target.value))}
                            className="w-full p-2 bg-white rounded-lg border border-slate-300 font-mono font-bold"
                          />
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 block">Change Due to Customer</span>
                          <span className="text-base font-extrabold font-mono text-emerald-700">
                            {changeDue} ETB
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Handlers */}
                  <div>
                    {order.status === 'RIDER_ACCEPTED' ? (
                      <button 
                        onClick={() => onUpdateOrder(order.id, { status: 'PICKED_UP' })} 
                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <PackageCheck className="w-5 h-5 text-emerald-400" /> Confirm Pickup from Runner & Start Transit
                      </button>
                    ) : (
                      <button 
                        onClick={() => onUpdateOrder(order.id, { status: 'DELIVERED' })} 
                        className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <CheckCircle2 className="w-5 h-5" /> 
                        {order.paymentMethod === 'COD' 
                          ? `Collect ${due} ETB Cash & Complete Doorstep Handover`
                          : `Confirm Delivery Handover (Paid via ${order.paymentMethod})`
                        }
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Available Pickups Pool */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Available Deliveries Pool</h2>
          <p className="text-sm text-slate-500">Orders verified and tagged by Runners, waiting for courier acceptance.</p>
        </div>

        {readyOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            No deliveries pending courier pickup right now.
          </div>
        ) : (
          <div className="grid gap-4">
            {readyOrders.map(order => (
              <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{order.batchName}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      #{order.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <span>{order.mamilaLocation}</span>
                    <span className="text-slate-300">→</span>
                    <span className="font-semibold text-slate-700">{order.customerCity || 'Jijiga'} ({order.customerPlusCode})</span>
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-1 font-mono tabular-nums">
                    Value: {order.totalPrice || order.price} ETB · {order.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenMapPreview && (
                    <button
                      type="button"
                      onClick={() => onOpenMapPreview(order)}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MapIcon className="w-3.5 h-3.5 text-blue-600" />
                      Map Preview
                    </button>
                  )}

                  <button 
                    onClick={() => onUpdateOrder(order.id, { 
                      status: 'RIDER_ACCEPTED', 
                      riderId: currentRiderId, 
                      riderName: 'Dawit Rider' 
                    })} 
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Navigation2 className="w-4 h-4 text-emerald-400" /> Accept Delivery Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* RIDER-CUSTOMER COMMUNICATION BRIDGE MODAL */}
      {activeChatOrder && onSendMessage && (
        <CommunicationBridgeModal
          isOpen={!!activeChatOrder}
          onClose={() => setActiveChatOrder(null)}
          order={activeChatOrder}
          currentUserRole="RIDER"
          targetRole="CUSTOMER"
          targetName={activeChatOrder.customerName || 'Customer'}
          targetPhone={activeChatOrder.customerPhone || '+251 91 123 4567'}
          messages={(orderMessages && orderMessages[activeChatOrder.id]) || []}
          onSendMessage={onSendMessage}
        />
      )}
    </div>
  );
}
