import { db } from "@/lib/firebase";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export interface LeadItem {
  id: string;
  name: string;
  number: string;
  phone?: string;
  email: string;
  location: string;
  source: string;
  category?: "calculator" | "brochure" | "inquiry" | "mocktest" | "booking" | "starterkit" | "newsletter" | "other";
  course?: string;
  program?: string;
  college?: string;
  score?: number | string;
  percentile?: number | string;
  slot?: string;
  budget?: string;
  targetExam?: string;
  message?: string;
  details?: Record<string, unknown>;
  status?: "New" | "Contacted" | "In Discussion" | "Converted" | "Cold";
  notes?: Array<{ text: string; timestamp: string }>;
  timestamp: string;
  dateStr?: string;
  timeStr?: string;
  [key: string]: unknown;
}

const LOCAL_STORAGE_KEY = "cwm_captured_leads_v1";
const BROADCAST_CHANNEL_NAME = "cwm_leads_sync_channel";

export const ACTIVEPIECES_INQUIRY_WEBHOOK_URL = "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3";
export const ACTIVEPIECES_TOOLS_WEBHOOK_URL = "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F";

export function isCalculatorOrToolLead(lead: {
  category?: string;
  source?: string;
  course?: string;
  program?: string;
  targetExam?: string;
  details?: Record<string, unknown>;
  [key: string]: unknown;
}): boolean {
  const cat = String(lead.category || (lead as any).Category || "").toLowerCase().trim();
  if (
    cat.includes("calculator") ||
    cat.includes("mock") ||
    cat.includes("test") ||
    cat.includes("starterkit") ||
    cat.includes("assessment") ||
    cat.includes("diagnostic") ||
    cat.includes("discount") ||
    cat.includes("tool")
  ) {
    return true;
  }
  if (
    cat.includes("inquiry") ||
    cat.includes("admission") ||
    cat.includes("brochure") ||
    cat.includes("booking") ||
    cat.includes("newsletter")
  ) {
    return false;
  }

  const s = [
    lead.source || (lead as any).Source || "",
    lead.course || (lead as any).Course || "",
    lead.program || (lead as any).Program || "",
    lead.targetExam || (lead as any).exam || "",
    (lead.details as any)?.exam || "",
    (lead.details as any)?.tool || "",
  ].join(" ").toLowerCase();

  const toolKeywords = [
    "calculator",
    "percentile",
    "score predictor",
    "rank predictor",
    "mock",
    "cbt",
    "test series",
    "scorecard",
    "solutions",
    "assessment",
    "diagnostic",
    "resume",
    "ats",
    "roadmap",
    "past paper",
    "exam paper",
    "answer key",
    "starter kit",
    "starter-kit",
    "discount",
    "combo",
    "roi",
    "eligibility"
  ];

  return toolKeywords.some((kw) => s.includes(kw));
}

export function categorizeSource(source: string = ""): LeadItem["category"] {
  const s = source.toLowerCase();
  // 1. Direct inquiries, college pages, online degrees & admission forms
  if (s.includes("inquiry") || s.includes("admission") || s.includes("degree") || s.includes("college page") || s.includes("regional") || s.includes("counseling") || s.includes("counselling")) return "inquiry";
  // 2. Bookings & Strategy Consultations
  if (s.includes("book") || s.includes("session") || s.includes("calendly") || s.includes("consultation") || s.includes("strategy")) return "booking";
  // 3. College Brochures & Fees reports
  if (s.includes("brochure") || s.includes("fee report") || s.includes("syllabus")) return "brochure";
  // 4. Newsletter subscriptions
  if (s.includes("subscribe") || s.includes("newsletter")) return "newsletter";
  // 5. Calculators & Predictors
  if (s.includes("calculator") || s.includes("percentile") || s.includes("score") || s.includes("rank predictor")) return "calculator";
  // 6. Mock tests, CBT tests & scorecards
  if (s.includes("mock") || s.includes("cbt") || s.includes("test series") || s.includes("assessment") || s.includes("diagnostic")) return "mocktest";
  // 7. Prep kits & career tools
  if (s.includes("starter") || s.includes("kit") || s.includes("guide") || s.includes("resume") || s.includes("ats") || s.includes("roadmap") || s.includes("paper download")) return "starterkit";
  if (s.includes("pgdm") || s.includes("mba") || s.includes("bba") || s.includes("btech") || s.includes("abroad") || s.includes("partner")) return "inquiry";
  return "inquiry";
}

// 1. Get stored leads from LocalStorage cache
export function getLocalCachedLeads(): LeadItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeadItem[];
  } catch (e) {
    console.error("[Leads] Error parsing local cached leads:", e);
    return [];
  }
}

// 2. Save lead into LocalStorage cache
export function saveLocalCachedLead(lead: LeadItem): LeadItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = getLocalCachedLeads();
    const index = existing.findIndex((l) => l.id === lead.id);
    let updated: LeadItem[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...updated[index], ...lead };
    } else {
      updated = [lead, ...existing];
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 1000)));
    return updated;
  } catch (e) {
    console.error("[Leads] Error saving lead to local storage:", e);
    return [];
  }
}

// 3. Broadcast lead event across tabs and components
function broadcastLeadUpdate(lead: LeadItem, action: "add" | "update" | "delete" = "add") {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("cwm_lead_event", { detail: { action, lead } }));
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ action, lead, time: Date.now() });
      setTimeout(() => channel.close(), 1000);
    }
  } catch (e) {}
}

// 4. Submit Lead Function (Invoked by all website forms)
export async function submitLead(payload: Record<string, unknown>): Promise<{ success: boolean; id?: string; error?: string }> {
  const name = String(payload.name || "").trim();
  const number = String(payload.number || payload.phone || payload.mobile || "").trim();

  if (!name || !number) {
    return { success: false, error: "Name and phone number are required" };
  }

  const id = String(payload.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
  const source = String(payload.source || "Website Inquiry");
  const category = (payload.category as LeadItem["category"]) || categorizeSource(source);
  const now = new Date();
  const timestamp = String(payload.timestamp || now.toISOString());
  const dateStr = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  const timeStr = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
  const course = String(payload.course || payload.program || payload.specialization || "");
  const college = String(payload.college || (payload.details as any)?.preferredUniversity || "");
  const location = String(payload.location || payload.city || "Online");
  const email = String(payload.email || "");

  const cleanLead: LeadItem = {
    id,
    name,
    number,
    phone: number,
    email,
    location,
    source,
    category,
    course,
    program: course,
    college,
    score: (payload.score !== undefined ? payload.score : (payload.details as any)?.score) as any,
    percentile: (payload.percentile !== undefined ? payload.percentile : (payload.details as any)?.percentile) as any,
    slot: String(payload.slot || ""),
    budget: String(payload.budget || "Not Specified"),
    targetExam: String(payload.targetExam || payload.exam || ""),
    message: String(payload.message || payload.goal || ""),
    details: (typeof payload.details === "object" && payload.details !== null ? payload.details : {}) as Record<string, unknown>,
    status: "New",
    notes: [],
    timestamp,
    dateStr,
    timeStr,
  };

  // Copy additional primitive fields
  for (const [key, val] of Object.entries(payload)) {
    if ((typeof val === "string" || typeof val === "number" || typeof val === "boolean") && !(key in cleanLead)) {
      cleanLead[key] = val;
    }
  }

  // 1. Save to Local Storage immediately for zero-latency local availability
  saveLocalCachedLead(cleanLead);
  broadcastLeadUpdate(cleanLead, "add");

  // 2. Save to Firebase Firestore in real-time
  if (db) {
    try {
      const docRef = doc(db, "leads", id);
      setDoc(docRef, cleanLead, { merge: true }).catch((err) => {
        console.warn("[Leads] Firebase Firestore write background warning:", err);
      });
    } catch (firebaseErr) {
      console.warn("[Leads] Firebase Firestore write error:", firebaseErr);
    }
  }

  // 3. Flat payload for Activepieces & Google Sheets webhook integration
  const flatPayload: Record<string, string> = {
    id,
    name,
    Name: name,
    number,
    phone: number,
    Phone: number,
    mobile: number,
    Mobile: number,
    email,
    Email: email,
    location,
    Location: location,
    category: category || "inquiry",
    Category: category || "inquiry",
    source,
    Source: source,
    course,
    Course: course,
    college,
    College: college,
    score: cleanLead.score !== undefined ? String(cleanLead.score) : "",
    Score: cleanLead.score !== undefined ? String(cleanLead.score) : "",
    percentile: cleanLead.percentile !== undefined ? String(cleanLead.percentile) : "",
    Percentile: cleanLead.percentile !== undefined ? String(cleanLead.percentile) : "",
    slot: cleanLead.slot || "",
    message: cleanLead.message || "",
    Message: cleanLead.message || "",
    timestamp: `${dateStr} ${timeStr}`,
    Timestamp: timestamp,
    Date: dateStr,
    Time: timeStr,
  };

  if (cleanLead.details) {
    for (const [k, v] of Object.entries(cleanLead.details)) {
      if (typeof v === "string" || typeof v === "number") {
        flatPayload[k] = String(v);
      }
    }
  }

  // 4. Send to Next.js / Cloudflare API endpoint with trailing slash
  try {
    fetch("/api/leads/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanLead),
    }).catch(() => {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanLead),
      }).catch(() => {});
    });
  } catch (e) {}

  // 5. Forward to designated Activepieces Webhook for Google Sheets synchronization
  const targetWebhook = isCalculatorOrToolLead(cleanLead)
    ? ACTIVEPIECES_TOOLS_WEBHOOK_URL
    : ACTIVEPIECES_INQUIRY_WEBHOOK_URL;

  try {
    fetch(targetWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flatPayload),
    }).catch(() => {});
  } catch (err) {}

  return { success: true, id };
}

// 5. Fetch all leads combining Server API, Firestore, LocalStorage, and seed dataset
export async function fetchAllLeads(seedLeads: LeadItem[] = []): Promise<LeadItem[]> {
  const leadMap = new Map<string, LeadItem>();

  // 1. Seed leads from static admin-data / data/leads.json
  seedLeads.forEach((l) => {
    if (l && l.id) {
      leadMap.set(l.id, {
        ...l,
        category: l.category || categorizeSource(l.source),
        status: l.status || "New",
      });
    }
  });

  // 2. Fetch directly from Server API (/api/leads/)
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/leads/?t=${Date.now()}`).catch(() =>
        fetch(`/api/leads?t=${Date.now()}`)
      );
      if (res && res.ok) {
        const serverLeads = await res.json();
        if (Array.isArray(serverLeads)) {
          serverLeads.forEach((l) => {
            if (l && l.id) {
              leadMap.set(l.id, {
                ...leadMap.get(l.id),
                ...l,
                category: l.category || categorizeSource(l.source),
                status: l.status || "New",
              });
            }
          });
        }
      }
    } catch (e) {
      console.warn("[Leads] Server API fetch notice:", e);
    }
  }

  // 3. Local Storage Cache
  const localLeads = getLocalCachedLeads();
  localLeads.forEach((l) => {
    if (l && l.id) {
      leadMap.set(l.id, {
        ...leadMap.get(l.id),
        ...l,
        category: l.category || categorizeSource(l.source),
      });
    }
  });

  // 4. Firestore live leads
  if (db) {
    try {
      const snap = await getDocs(collection(db, "leads"));
      snap.forEach((docSnap) => {
        const data = docSnap.data() as LeadItem;
        if (data && (data.id || docSnap.id)) {
          const leadId = data.id || docSnap.id;
          leadMap.set(leadId, {
            ...leadMap.get(leadId),
            ...data,
            id: leadId,
            category: data.category || categorizeSource(data.source),
          });
        }
      });
    } catch (e) {
      console.warn("[Leads] Firestore leads fetch notice:", e);
    }
  }

  const allLeads = Array.from(leadMap.values());
  // Sort newest first
  return allLeads.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
}

// 6. Real-time Subscription listener for Admin Panel
export function subscribeToLeadsRealtime(
  onUpdate: (leads: LeadItem[]) => void,
  initialSeed: LeadItem[] = [],
  onNewLead?: (newLead: LeadItem) => void
): () => void {
  let isUnsubscribed = false;

  const refreshCombined = async () => {
    if (isUnsubscribed) return;
    const leads = await fetchAllLeads(initialSeed);
    if (!isUnsubscribed) {
      onUpdate(leads);
    }
  };

  // Initial load
  refreshCombined();

  // Fast background polling (every 2 seconds) for instant cross-device and server reflection
  const intervalId = setInterval(refreshCombined, 2000);

  // Listen to window custom events & storage
  const handleLeadEvent = (e: any) => {
    if (e.detail?.lead && e.detail?.action === "add" && onNewLead) {
      onNewLead(e.detail.lead);
    }
    refreshCombined();
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY) refreshCombined();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("cwm_lead_event", handleLeadEvent);
    window.addEventListener("storage", handleStorageEvent);
  }

  let broadcastChannel: BroadcastChannel | null = null;
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    broadcastChannel.onmessage = (msg: MessageEvent) => {
      if (msg.data?.lead && msg.data?.action === "add" && onNewLead) {
        onNewLead(msg.data.lead);
      }
      refreshCombined();
    };
  }

  // Firestore live onSnapshot listener
  let unsubscribeFirestore = () => {};
  let isInitialFirestoreLoad = true;
  if (db) {
    try {
      unsubscribeFirestore = onSnapshot(
        collection(db, "leads"),
        (snapshot) => {
          if (isUnsubscribed) return;
          if (!isInitialFirestoreLoad && onNewLead) {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const data = change.doc.data() as LeadItem;
                if (data && data.id) {
                  onNewLead(data);
                }
              }
            });
          }
          isInitialFirestoreLoad = false;
          refreshCombined();
        },
        (err) => {
          console.warn("[Leads] Firestore onSnapshot warning:", err);
        }
      );
    } catch (e) {
      console.warn("[Leads] Firestore subscription warning:", e);
    }
  }

  return () => {
    isUnsubscribed = true;
    clearInterval(intervalId);
    if (typeof window !== "undefined") {
      window.removeEventListener("cwm_lead_event", handleLeadEvent);
      window.removeEventListener("storage", handleStorageEvent);
    }
    if (broadcastChannel) {
      broadcastChannel.close();
    }
    unsubscribeFirestore();
  };
}

// 7. Update Lead Status & Add Notes
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadItem["status"],
  newNote?: string
): Promise<boolean> {
  const localLeads = getLocalCachedLeads();
  const targetLead = localLeads.find((l) => l.id === leadId);
  const updatedNotes = targetLead?.notes ? [...targetLead.notes] : [];

  if (newNote && newNote.trim()) {
    updatedNotes.unshift({
      text: newNote.trim(),
      timestamp: new Date().toISOString(),
    });
  }

  const updatedFields: Partial<LeadItem> = {
    status: newStatus,
    notes: updatedNotes,
  };

  // Update local
  if (targetLead) {
    const updated = { ...targetLead, ...updatedFields };
    saveLocalCachedLead(updated);
    broadcastLeadUpdate(updated, "update");
  }

  // Update Firestore
  if (db) {
    try {
      const docRef = doc(db, "leads", leadId);
      await updateDoc(docRef, updatedFields);
    } catch (e) {
      console.warn("[Leads] Error updating lead status in Firestore:", e);
    }
  }

  return true;
}

// 8. Delete Lead
export async function deleteLead(leadId: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    try {
      const existing = getLocalCachedLeads();
      const filtered = existing.filter((l) => l.id !== leadId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      broadcastLeadUpdate({ id: leadId } as LeadItem, "delete");
    } catch (e) {}
  }

  if (db) {
    try {
      const docRef = doc(db, "leads", leadId);
      await deleteDoc(docRef);
    } catch (e) {
      console.warn("[Leads] Error deleting lead from Firestore:", e);
    }
  }

  return true;
}
