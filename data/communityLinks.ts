export interface CommunityChannel {
  id: string;
  name: string;
  platform: 'telegram' | 'whatsapp';
  channelUrl: string;
  badge: string;
  memberCount: string;
  tagline: string;
  description: string;
  buttonText: string;
  accentColor: {
    badge: string;
    border: string;
    gradient: string;
    button: string;
  };
  highlights: string[];
}

export const COMMUNITY_CONFIG = {
  stats: {
    totalMembers: "5,700+",
    activeAspirants: "98% Daily Active",
    collegesCovered: "650+",
    freeResources: "100% Free",
  },
  telegram: {
    id: "telegram-channel",
    name: "Mohit Jain MBA & Career Community",
    platform: "telegram" as const,
    channelUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/+fpyLTXTgQQZkMDhl",
    handle: "@careerwithmohit",
    badge: "Official Telegram Channel",
    memberCount: "3,200+ Aspirants",
    tagline: "Daily PYQs, Formula Sheets & B-School Cutoff Alerts",
    description: "Instant access to verified entrance exam materials, daily quantitative & verbal quizzes, cutoff notifications, and direct admission updates for CAT 2026, XAT 2027, NMAT, SNAP & CMAT.",
    buttonText: "Join Telegram Channel",
    accentColor: {
      badge: "bg-sky-500/10 text-sky-600 border-sky-200",
      border: "hover:border-sky-300",
      gradient: "from-sky-500/10 via-blue-500/5 to-transparent",
      button: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/25",
    },
    highlights: [
      "Daily Practice Questions (Quants, DILR & VARC)",
      "Instant B-School Application Deadline & Cutoff Alerts",
      "Free Downloadable Formula Books & Mock Answer Keys",
      "Live Exam-Day Strategy & Score-Percentile Analysis",
    ],
  },
  whatsapp: {
    id: "whatsapp-community",
    name: "MBA 2027 Aspirants & Mentorship",
    platform: "whatsapp" as const,
    channelUrl: process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || "https://chat.whatsapp.com/LV0HCuUzeQaCjBrkuDhMAC",
    directCounsellorUrl: "https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20want%20to%20join%20the%20MBA%20student%20community",
    badge: "WhatsApp Student Group",
    memberCount: "2,500+ Active Students",
    tagline: "Peer Discussions, GD-PI Mentorship & Fast-Track Alerts",
    description: "Engage in focused admissions discussions with fellow aspirants, share genuine interview call experiences, get college review feedback, and ask Mohit Jain your profile questions.",
    buttonText: "Join WhatsApp Community",
    accentColor: {
      badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
      border: "hover:border-emerald-300",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/25",
    },
    highlights: [
      "Verified Student & Alumni Feedback for 650+ B-Schools",
      "GD-PI-WAT Real Interview Transcripts & Current Affairs",
      "Direct Admission & Merit Scholarship Opportunities",
      "1-on-1 Guidance Access with Mohit Jain (IIM-B / FMS Delhi Certified)",
    ],
  },
};
