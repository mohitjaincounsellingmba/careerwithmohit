import { Metadata } from 'next';
import { InquiryForm } from '@/components/InquiryForm';
import { CheckCircle2, GraduationCap, MapPin, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Online Degrees & Certifications 2026 | Fee & Details',
  description: 'Explore our comprehensive list of top colleges offering online degrees and certifications. Compare fees, locations, and programs including online MBA, BBA, B.Tech, and MCA.',
};

const COLLEGES = [
  { name: 'Amity University - Online', location: 'Noida', fee: 'High', rating: 'Top Voted' },
  { name: 'Chandighar University - Online', location: 'Chandigarh', fee: 'Medium', rating: 'Popular' },
  { name: 'D.Y Patil University (Pune)', location: 'Pune', fee: 'Medium', rating: 'Preferred' },
  { name: 'Jain University - Online', location: 'Bangalore', fee: 'High', rating: 'Top Choice' },
  { name: 'Lovely Professional University - Online', location: 'Punjab', fee: 'Medium', rating: 'Popular' },
  { name: 'Manipal Academy of Higher Education (MAHE)', location: 'Manipal', fee: 'High', rating: 'Top Voted' },
  { name: 'Manipal University Jaipur - Online', location: 'Jaipur', fee: 'Medium', rating: 'Preferred' },
  { name: 'Sikkim Manipal University - Online', location: 'Sikkim', fee: 'Medium', rating: 'Recommended' },
  { name: 'Narsee Monjee Institute of Management Studies (NMIMS) - Online', location: 'Mumbai', fee: 'High', rating: 'Top Voted' },
  { name: 'Uttaranchal University - Online', location: 'Dehradun', fee: 'Medium', rating: 'Popular' },
  { name: 'Vivekananda Global University - Online', location: 'Jaipur', fee: 'Medium', rating: 'Preferred' },
  { name: 'Parul University - Online', location: 'Vadodara', fee: 'Medium', rating: 'Trending' },
  { name: 'Sanskriti University', location: 'Mathura', fee: 'Medium', rating: 'Recommended' },
  { name: 'Lingayas Vidyapeeth', location: 'Faridabad', fee: 'Medium', rating: 'Preferred' },
  { name: 'Andhra University - Online', location: 'Visakhapatnam', fee: 'Low', rating: 'Popular' },
  { name: 'Amrita University - Online', location: 'Coimbatore', fee: 'High', rating: 'Top Tier' },
  { name: 'D.Y Patil University (Mumbai)', location: 'Mumbai', fee: 'High', rating: 'Preferred' },
  { name: 'Ganeshi Lal Agrawal University (GLA- Mathura)', location: 'Mathura', fee: 'Medium', rating: 'Trending' },
  { name: 'Shoolini University - Online', location: 'Solan', fee: 'Medium', rating: 'Popular' },
  { name: 'Sarda University - Online', location: 'Greater Noida', fee: 'High', rating: 'Preferred' },
  { name: 'UPES - University of Petroleum and Energy Studies - Online', location: 'Dehradun', fee: 'High', rating: 'Top Voted' },
  { name: 'Vignan University - Online', location: 'Guntur', fee: 'Medium', rating: 'Recommended' },
  { name: 'SRM Online', location: 'Chennai', fee: 'High', rating: 'Top Tier' },
  { name: 'Galgotias Online', location: 'Greater Noida', fee: 'Medium', rating: 'Popular' },
  { name: 'Kalinga University', location: 'Raipur', fee: 'Medium', rating: 'Preferred' },
  { name: 'Shri Venkateshwara University', location: 'Amroha', fee: 'Low', rating: 'Valued' },
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
                      <h3 className="text-xl font-bold text-foreground mb-3">{college.name}</h3>
                      <div className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                           <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-green-600" />
                            <span className="font-bold text-gray-800">Fee: {college.fee}</span>
                           </div>
                           <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">
                             {college.rating}
                           </span>
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
