import { Metadata } from 'next';
import { InquiryForm } from '@/components/InquiryForm';
import { CheckCircle2, GraduationCap, MapPin, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Online Degrees & Certifications 2026 | Fee & Details',
  description: 'Explore our comprehensive list of top colleges offering online degrees and certifications. Compare fees, locations, and programs including online MBA, BBA, B.Tech, and MCA.',
};

const COLLEGES = [
  {
    name: 'Amity University Online',
    location: 'Noida, UP',
    fee: '₹1,99,000',
    accreditation: 'NAAC A+ | UGC | AICTE | WES',
    programs: 'MBA, BBA, MCA, BCA, B.Com, MA',
    badge: 'Top Rated',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Chandigarh University Online',
    location: 'Chandigarh',
    fee: '₹1,65,000',
    accreditation: 'NAAC A+ | UGC | QS Ranked',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Popular',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'D.Y Patil University - Online (Pune)',
    location: 'Pune, Maharashtra',
    fee: '₹1,89,400',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, B.Sc',
    badge: 'NAAC A++',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Jain University Online',
    location: 'Bangalore, Karnataka',
    fee: '₹1,96,000',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, MA, M.Com',
    badge: 'Top Choice',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: 'Lovely Professional University (LPU) Online',
    location: 'Phagwara, Punjab',
    fee: '₹1,61,600',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | AIU',
    programs: 'MBA, BBA, MCA, BCA, M.Sc, MA',
    badge: 'NAAC A++',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Manipal University Jaipur Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,75,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF | WES',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Preferred',
    badgeColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Sikkim Manipal University Online',
    location: 'Gangtok, Sikkim',
    fee: '₹1,10,000',
    accreditation: 'NAAC A+ | UGC-DEB | NIRF',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Value Pick',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    name: 'NMIMS Online',
    location: 'Mumbai, Maharashtra',
    fee: '₹2,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, B.Com, Diploma Programs',
    badge: 'Premium',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    name: 'Uttaranchal University Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹98,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA, BA',
    badge: 'Affordable',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Vivekananda Global University Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,50,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA, M.Com',
    badge: 'Trending',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
  {
    name: 'Parul University Online',
    location: 'Vadodara, Gujarat',
    fee: '₹1,50,000',
    accreditation: 'NAAC A++ | UGC | NIRF',
    programs: 'MBA, BBA, MCA, BCA, MA',
    badge: 'NAAC A++',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Andhra University Online',
    location: 'Visakhapatnam, AP',
    fee: '₹62,200',
    accreditation: 'NAAC A | UGC | NIRF',
    programs: 'MBA, MCA, B.Com, BA',
    badge: 'Budget Friendly',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Shoolini University Online',
    location: 'Solan, Himachal Pradesh',
    fee: '₹1,10,000',
    accreditation: 'NAAC A | UGC | NIRF',
    programs: 'MBA, BBA, B.Com, BA, MA',
    badge: 'Popular',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'SRM University Online',
    location: 'Chennai, Tamil Nadu',
    fee: '₹1,00,000',
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'NAAC A++',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Galgotias University Online',
    location: 'Greater Noida, UP',
    fee: '₹90,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Affordable',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Vignan University Online',
    location: 'Guntur, Andhra Pradesh',
    fee: '₹1,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Recommended',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    name: 'Kalinga University Online',
    location: 'Raipur, Chhattisgarh',
    fee: '₹80,000',
    accreditation: 'NAAC B+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Value Pick',
    badgeColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Chitkara University Online',
    location: 'Rajpura, Punjab',
    fee: '₹2,00,000',
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Premium',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    name: 'OP Jindal Global University Online',
    location: 'Sonipat, Haryana',
    fee: '₹1,80,000',
    accreditation: 'NAAC A | UGC | AACSB | QS Ranked',
    programs: 'MBA, BBA, MA, BA',
    badge: 'Global Ranking',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: 'Jamia Hamdard University Online',
    location: 'New Delhi',
    fee: '₹1,03,500',
    accreditation: 'NAAC A | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Delhi NCR',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Manav Rachna University Online',
    location: 'Faridabad, Haryana',
    fee: '₹1,28,000',
    accreditation: 'NAAC A | UGC-DEB | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Popular',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Mody University Online',
    location: 'Lakshmangarh, Rajasthan',
    fee: '₹90,000',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'Affordable',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Guru Kashi University Online',
    location: 'Bathinda, Punjab',
    fee: '₹1,00,000',
    accreditation: 'NAAC A++ | UGC | ISO',
    programs: 'MBA, BBA, MCA, BCA',
    badge: 'NAAC A++',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'SASTRA University Online',
    location: 'Thanjavur, Tamil Nadu',
    fee: '₹2,20,000',
    accreditation: 'NAAC A++ | UGC-DEB | NIRF',
    programs: 'MBA, MCA, M.Com, B.Com',
    badge: 'Premium',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    name: 'Kurukshetra University Online',
    location: 'Kurukshetra, Haryana',
    fee: '₹98,545',
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: 'MBA, MCA, BBA, BCA',
    badge: 'Trusted',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    name: 'UPES Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹1,80,000',
    accreditation: 'NAAC A | UGC | AICTE | NIRF',
    programs: 'MBA, BBA, MCA, B.Tech',
    badge: 'Trending',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
];

const PROGRAMS = [
  'MBA', 'BBA + MBA', 'B.Com + MBA', 'BCA + MCA', 'MCA', 'MA', 'M.Sc', 'M.Com', 
  'BBA', 'BCA', 'B.Com', 'BA', 'BBA Honors', 'MBA - WX', 'MSW', 'B.Tech', 'M.Tech',
  'MBA - Plus', 'MCA - Plus', 'BBA Plus', 'MBA Plus',
  'BBA - Wiout PAP', 'BBA - With PAP', 'BCA - Without PAP', 'BCA - With PAP',
  'MBA - Witout PAP', 'MBA - With PAP', 'MCA - Without PAP', 'MCA - With PAP'
];

export default function OnlineDegreePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 md:py-24 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest mb-6 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Explore Your Options
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground mb-6">
            Online Degrees & Certifications
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Discover top-tier online programs designed to elevate your career. Compare premium colleges, review fee structures, and explore diverse specializations tailored for modern professionals.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Info & Lists */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Programs Section */}
              <div>
                <h2 className="text-3xl font-black uppercase flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 inline-flex">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  Available Programs
                </h2>
                <div className="flex flex-wrap gap-3">
                  {PROGRAMS.map((program, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white px-4 py-2 border-2 border-foreground rounded-md text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colleges Section */}
              <div>
                <h2 className="text-3xl font-black uppercase flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 inline-flex">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                  Top Partner Colleges
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {COLLEGES.map((college, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border-4 border-foreground p-6 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-base font-bold text-foreground leading-snug">{college.name}</h3>
                        <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${college.badgeColor}`}>
                          {college.badge}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary shrink-0" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="font-bold text-gray-800">Fee: {college.fee}</span>
                        </div>
                        <div className="mt-1 pt-2 border-t border-gray-100">
                          <p className="text-xs text-gray-500 font-semibold">{college.accreditation}</p>
                          <p className="text-xs text-gray-600 mt-1">{college.programs}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-foreground text-white p-6 rounded-t-xl border-4 border-foreground text-center">
                  <h3 className="text-2xl font-black uppercase tracking-wider">Start Your Journey</h3>
                  <p className="text-sm text-gray-300 mt-2">Fill the form below for instant free counseling.</p>
                </div>
                {/* Inquiry Form Wrapper to apply some negative margin so it connects */}
                <div className="-mt-2 relative z-10">
                   <InquiryForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
