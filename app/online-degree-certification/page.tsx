import { Metadata } from 'next';
import { MapPin, BadgeCheck, IndianRupee, GraduationCap, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Online Degrees & Certifications 2026 | UGC Approved Universities',
  description:
    'Explore UGC-approved online universities in India. Compare fees, programs, accreditation status and get free expert counselling for online MBA, MCA, BBA, BCA and more.',
  keywords: [
    'online MBA 2026',
    'UGC approved online universities',
    'online degree India',
    'online BBA admission',
    'distance education India',
    'online MCA colleges',
  ],
};

const COLLEGES = [
  {
    name: 'Amity University Online',
    location: 'Noida, UP',
    fee: '₹1,99,000',
    accreditation: 'NAAC A+ | UGC | AICTE | WES',
    programs: 'MBA, BBA, MCA, BCA, B.Com, MA',
    badge: 'Top Rated',
    grade: 'A+',
    gradeColor: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Chandigarh University Online',
    location: 'Chandigarh',
    fee: '₹1,65,000',
    accreditation: 'NAAC A+ | UGC | QS Ranked',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Popular',
    grade: 'A+',
    gradeColor: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'D.Y Patil University - Online (Pune)',
    location: 'Pune, Maharashtra',
    fee: '₹1,89,400',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, B.Sc',
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Jain University Online',
    location: 'Bangalore, Karnataka',
    fee: '₹1,96,000',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, MA, M.Com',
    badge: 'Top Choice',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Lovely Professional University (LPU) Online',
    location: 'Phagwara, Punjab',
    fee: '₹1,61,600',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | AIU',
    programs: 'MBA, BBA, MCA, BCA, M.Sc, MA',
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Manipal University Jaipur Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,75,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Preferred',
    grade: 'A+',
    gradeColor: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Sikkim Manipal University Online',
    location: 'Gangtok, Sikkim',
    fee: '₹1,10,000',
    accreditation: 'NAAC A+ | UGC-DEB | NIRF',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Value Pick',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
  },
  {
    name: 'NMIMS Online',
    location: 'Mumbai, Maharashtra',
    fee: '₹2,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, B.Com, Diploma Programs',
    badge: 'Premium',
    grade: 'A+',
    gradeColor: 'from-rose-500 to-rose-700',
  },
  {
    name: 'Uttaranchal University Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹98,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA, BA',
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
  },
  {
    name: 'Vivekananda Global University Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,50,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Trending',
    grade: 'A+',
    gradeColor: 'from-orange-500 to-orange-700',
  },
  {
    name: 'Parul University Online',
    location: 'Vadodara, Gujarat',
    fee: '₹1,50,000',
    accreditation: 'NAAC A++ | UGC | NIRF',
    programs: 'MBA, BBA, MCA, BCA, MA',
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Andhra University Online',
    location: 'Visakhapatnam, AP',
    fee: '₹62,200',
    accreditation: 'NAAC A | UGC | NIRF',
    programs: 'MBA, MCA, B.Com, BA',
    badge: 'Budget Friendly',
    grade: 'A',
    gradeColor: 'from-green-500 to-green-700',
  },
  {
    name: 'Shoolini University Online',
    location: 'Solan, Himachal Pradesh',
    fee: '₹1,10,000',
    accreditation: 'NAAC A | UGC | NIRF',
    programs: 'MBA, BBA, B.Com, BA, MA',
    badge: 'Popular',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
  },
  {
    name: 'SRM University Online',
    location: 'Chennai, Tamil Nadu',
    fee: '₹1,00,000',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Galgotias University Online',
    location: 'Greater Noida, UP',
    fee: '₹90,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
  },
  {
    name: 'Vignan University Online',
    location: 'Guntur, Andhra Pradesh',
    fee: '₹1,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Recommended',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
  },
  {
    name: 'Kalinga University Online',
    location: 'Raipur, Chhattisgarh',
    fee: '₹80,000',
    accreditation: 'NAAC B+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Value Pick',
    grade: 'B+',
    gradeColor: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Chitkara University Online',
    location: 'Rajpura, Punjab',
    fee: '₹2,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Premium',
    grade: 'A+',
    gradeColor: 'from-rose-500 to-rose-700',
  },
  {
    name: 'OP Jindal Global University Online',
    location: 'Sonipat, Haryana',
    fee: '₹1,80,000',
    accreditation: 'NAAC A | UGC | AACSB | QS Ranked',
    programs: 'MBA, BBA, MA, BA',
    badge: 'Global Ranking',
    grade: 'A',
    gradeColor: 'from-indigo-500 to-indigo-700',
  },
  {
    name: 'Jamia Hamdard University Online',
    location: 'New Delhi',
    fee: '₹1,03,500',
    accreditation: 'NAAC A | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Delhi NCR',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Manav Rachna University Online',
    location: 'Faridabad, Haryana',
    fee: '₹1,28,000',
    accreditation: 'NAAC A | UGC-DEB | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Popular',
    grade: 'A',
    gradeColor: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Mody University Online',
    location: 'Lakshmangarh, Rajasthan',
    fee: '₹90,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
  },
  {
    name: 'Guru Kashi University Online',
    location: 'Bathinda, Punjab',
    fee: '₹1,00,000',
    accreditation: 'NAAC A++ | UGC | ISO',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'SASTRA University Online',
    location: 'Thanjavur, Tamil Nadu',
    fee: '₹2,20,000',
    accreditation: 'NAAC A++ | UGC-DEB | NIRF',
    programs: 'MBA, MCA, M.Com, B.Com',
    badge: 'Premium',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
  },
  {
    name: 'Kurukshetra University Online',
    location: 'Kurukshetra, Haryana',
    fee: '₹98,545',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Trusted',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
  },
  {
    name: 'UPES Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹1,80,000',
    accreditation: 'NAAC A | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, B.Tech',
    badge: 'Trending',
    grade: 'A',
    gradeColor: 'from-orange-500 to-orange-700',
  },
];

export default function OnlineDegreePage() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .page-font { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Playfair Display', serif; }

        .hero-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%);
        }
        .hero-grid {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          position: absolute;
          inset: 0;
        }
        .college-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .college-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }
        .grade-pill {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }
        .stat-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }
        .cta-strip {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
        .fee-tag {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
      `}</style>

      <div className="page-font">

        {/* ── HERO ── */}
        <section className="hero-bg py-24 md:py-36 relative">
          <div className="hero-grid" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <BadgeCheck size={14} className="text-indigo-400" />
              UGC-DEB Approved Universities · 2026 Edition
            </span>
            <h1 className="display-font text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Online Degrees
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                & Certifications
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Compare India&apos;s top online universities on fees, accreditation, and programs.
              Make the smartest choice for your career in 2026.
            </p>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { num: '26+', label: 'Universities' },
                { num: '₹62K', label: 'Starting Fee' },
                { num: '100%', label: 'UGC Approved' },
              ].map((s) => (
                <div key={s.label} className="stat-card px-4 py-5">
                  <p className="display-font text-2xl font-black text-white">{s.num}</p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <div className="cta-strip py-4 text-center text-white">
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-2 transition-all"
          >
            <Phone size={15} />
            Talk to a free counsellor · Call +91 95600 20771
          </a>
        </div>

        {/* ── COLLEGE GRID ── */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-indigo-600 font-semibold uppercase tracking-widest text-sm mb-2">Partner Institutions</p>
                <h2 className="display-font text-4xl md:text-5xl font-black text-[#0f172a]">
                  Top Online Universities
                </h2>
              </div>
              <p className="hidden md:block text-gray-400 text-sm font-medium">{COLLEGES.length} institutions listed</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLLEGES.map((college, idx) => (
                <div key={idx} className="college-card p-6 flex flex-col gap-4">

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    {/* Grade Badge */}
                    <div className={`bg-gradient-to-br ${college.gradeColor} rounded-xl w-12 h-12 flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className="grade-pill text-white">{college.grade}</span>
                    </div>
                    {/* Badge Tag */}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {college.badge}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-base font-semibold text-[#0f172a] leading-snug">
                    {college.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin size={13} className="text-indigo-400 shrink-0" />
                    <span>{college.location}</span>
                  </div>

                  {/* Fee */}
                  <div className="flex items-center gap-2">
                    <span className="fee-tag text-sm font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <IndianRupee size={13} />
                      {college.fee.replace('₹', '')} total fee
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Accreditation */}
                  <div className="flex items-start gap-2">
                    <BadgeCheck size={14} className="text-violet-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-500 leading-relaxed">{college.accreditation}</p>
                  </div>

                  {/* Programs */}
                  <div className="flex items-start gap-2">
                    <GraduationCap size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 leading-relaxed">{college.programs}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="bg-[#0f172a] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="display-font text-3xl md:text-4xl font-black text-white mb-4">
              Not sure which university to pick?
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              Get a free 1-on-1 call with Mohit Jain and find the right program based on your goals + budget.
            </p>
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-xl shadow-indigo-900/40"
            >
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
