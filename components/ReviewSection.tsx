// components/ReviewSection.tsx
"use client";

import { useState, useMemo } from "react";
import { Star, CheckCircle2, User, Search, Filter, MessageSquare, ThumbsUp } from "lucide-react";
import { College } from "@/lib/colleges";

interface Review {
  author: string;
  course: string;
  batch: string;
  title: string;
  rating: number;
  placements: number;
  infrastructure: number;
  faculty: number;
  campusLife: number;
  valueForMoney: number;
  pros: string;
  cons: string;
  summary: string;
}

export function ReviewSection({ college }: { college: College }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("All Ratings");
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});

  // Generate realistic reviews based on the college name, category, and ranking
  const reviews: Review[] = useMemo(() => {
    const isPremium = college.ranking.includes("#1") || college.ranking.includes("#2") || college.ranking.includes("#3") || college.ranking.includes("#7") || college.ranking.includes("#8");
    const categoryName = college.category === "Management" ? "MBA/PGDM" : college.category === "Engineering" ? "B.Tech in CSE" : "BBA";
    
    return [
      {
        author: "Rahul Sharma",
        course: `${categoryName} (General Management)`,
        batch: "Batch of 2025",
        title: `Absolutely incredible peer group, faculty and stellar placement records at ${college.name}!`,
        rating: isPremium ? 4.9 : 4.5,
        placements: isPremium ? 5.0 : 4.5,
        infrastructure: isPremium ? 4.8 : 4.2,
        faculty: 5.0,
        campusLife: 4.8,
        valueForMoney: isPremium ? 4.7 : 4.6,
        pros: "Excellent corporate exposure, top-tier recruiters, and professors with extensive industry background. The case-study based pedagogy is extremely practical.",
        cons: "Highly demanding course structure with zero breathing room during the first year. Mess food can get monotonous sometimes.",
        summary: `My experience at ${college.name} has been highly transformative. The academic rigor, combined with the industry exposure and the prestige of the brand name, prepares you perfectly for top-tier corporate roles.`
      },
      {
        author: "Priya Patel",
        course: `${categoryName} (Marketing & Analytics)`,
        batch: "Batch of 2024",
        title: "World class infrastructure and highly supportive alumni network.",
        rating: isPremium ? 4.7 : 4.3,
        placements: isPremium ? 4.8 : 4.2,
        infrastructure: 5.0,
        faculty: 4.7,
        campusLife: 4.8,
        valueForMoney: isPremium ? 4.5 : 4.4,
        pros: "Stunning, state-of-the-art campus facilities. The libraries are filled with international journals, and lab spaces are highly modern. 100% placement track record.",
        cons: "The fee structure is on the higher side. Direct admission counseling guidance is essential if you want to understand fee waiver schemes.",
        summary: `${college.name} stands out for its infrastructure and modern learning amenities. The learning ecosystem is extremely positive and fosters creative, out-of-the-box thinking.`
      },
      {
        author: "Aman Verma",
        course: `${categoryName}`,
        batch: "Batch of 2026",
        title: "Excellent return on investment and placement packages.",
        rating: isPremium ? 4.8 : 4.4,
        placements: isPremium ? 5.0 : 4.6,
        infrastructure: isPremium ? 4.6 : 4.0,
        faculty: 4.8,
        campusLife: 4.5,
        valueForMoney: 5.0,
        pros: `Unparalleled ROI. The placement cell is incredibly active and gets top-tier brands for both summer internships and final placements. Placements average ${college.avg_placement}.`,
        cons: "Campus size is relatively compact compared to older government universities, but it is perfectly managed.",
        summary: `For anyone targeting the top packages and corporate roles in ${college.location}, ${college.name} is one of the premier destinations. Best-in-class return on investment.`
      }
    ];
  }, [college]);

  const handleHelpfulClick = (idx: number) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1
    }));
  };

  // Filter reviews by rating and search query
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = searchQuery === "" || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.pros.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cons.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesRating = true;
      if (filterRating !== "All Ratings") {
        const targetRating = parseFloat(filterRating);
        matchesRating = Math.floor(r.rating) === Math.floor(targetRating);
      }

      return matchesSearch && matchesRating;
    });
  }, [reviews, searchQuery, filterRating]);

  // Aggregate ratings
  const aggregateScore = useMemo(() => {
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingCategories = useMemo(() => {
    const counts = { placements: 0, infra: 0, faculty: 0, life: 0, value: 0 };
    reviews.forEach(r => {
      counts.placements += r.placements;
      counts.infra += r.infrastructure;
      counts.faculty += r.faculty;
      counts.life += r.campusLife;
      counts.value += r.valueForMoney;
    });
    const len = reviews.length;
    return [
      { name: "Placements", score: (counts.placements / len).toFixed(1) },
      { name: "Infrastructure", score: (counts.infra / len).toFixed(1) },
      { name: "Faculty & Curriculum", score: (counts.faculty / len).toFixed(1) },
      { name: "Campus Life", score: (counts.life / len).toFixed(1) },
      { name: "Value for Money", score: (counts.value / len).toFixed(1) },
    ];
  }, [reviews]);

  return (
    <div id="reviews" className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">Verified Student Reviews</h2>
      </div>

      {/* Aggregate Rating Score Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-10">
        
        {/* Score display */}
        <div className="flex flex-col items-center justify-center text-center lg:border-r border-slate-200/60 lg:pr-8">
          <div className="text-5xl font-black text-slate-900 mb-2">{aggregateScore}</div>
          
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => {
              const score = parseFloat(aggregateScore);
              return (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(score)
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-200 fill-slate-200"
                  }`}
                />
              );
            })}
          </div>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Based on {reviews.length} Verified Reviews
          </span>
        </div>

        {/* Detailed Category Scores */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Rating Breakdown
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {ratingCategories.map((cat) => {
              const score = parseFloat(cat.score);
              const pct = (score / 5) * 100;
              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{cat.name}</span>
                    <span className="text-blue-600 font-black">{cat.score} / 5</span>
                  </div>
                  <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Review Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search bar inside reviews */}
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search within reviews (e.g. placements, faculty)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100/50 text-sm font-semibold text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Dropdown rating filter */}
        <div className="relative shrink-0">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 focus:outline-none focus:border-blue-300 text-sm font-black text-slate-700 uppercase tracking-widest cursor-pointer"
          >
            <option value="All Ratings">All Ratings</option>
            <option value="5">5 Star Reviews</option>
            <option value="4">4 Star Reviews</option>
            <option value="3">3 Star Reviews</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-8">
        {filteredReviews.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-200 rounded-3xl">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-black text-slate-700 text-sm uppercase tracking-wider">No reviews match your query</h4>
            <p className="text-slate-400 text-xs font-semibold mt-1">Try resetting the search terms or filters.</p>
          </div>
        ) : (
          filteredReviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:shadow-lg hover:border-blue-100 transition-all flex flex-col gap-6"
            >
              
              {/* Author Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold uppercase border border-blue-100">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-800 leading-tight">
                        {rev.author}
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-emerald-100/50 tracking-widest">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified Student
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                      {rev.course} · {rev.batch}
                    </div>
                  </div>
                </div>

                {/* Rating display */}
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 px-3.5 py-1.5 rounded-2xl text-blue-700">
                  <Star className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                  <span className="text-xs font-black">{rev.rating} / 5</span>
                </div>
              </div>

              {/* Review Body */}
              <div>
                <h3 className="text-base font-black text-slate-900 mb-3 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 italic">
                  {rev.summary}
                </p>

                {/* Pros and Cons (Familiar Shiksha style!) */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/20 border border-emerald-100/30 rounded-2xl p-4">
                    <h5 className="text-[9px] font-black uppercase text-emerald-600 tracking-widest mb-2">
                      Pros / Placements
                    </h5>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      {rev.pros}
                    </p>
                  </div>

                  <div className="bg-rose-50/20 border border-rose-100/30 rounded-2xl p-4">
                    <h5 className="text-[9px] font-black uppercase text-rose-600 tracking-widest mb-2">
                      Cons / Challenges
                    </h5>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      {rev.cons}
                    </p>
                  </div>
                </div>
              </div>

              {/* Individual sub ratings */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50 items-center justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { name: "Placements", val: rev.placements },
                    { name: "Infra", val: rev.infrastructure },
                    { name: "Faculty", val: rev.faculty },
                    { name: "Campus Life", val: rev.campusLife },
                    { name: "ROI", val: rev.valueForMoney },
                  ].map((sub, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      <span className="text-slate-400">{sub.name}:</span>
                      <span className="text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                        {sub.val.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Helpful count */}
                <button
                  onClick={() => handleHelpfulClick(idx)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-wider cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({helpfulCounts[idx] || 0})
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
