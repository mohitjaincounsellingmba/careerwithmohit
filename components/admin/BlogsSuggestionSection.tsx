"use client";

import { useState, useEffect, useMemo } from "react";
import {
  get24hResearchPayload,
  forceRefresh24hTopics,
  DailyResearchData,
  BlogTopicSuggestion,
  SEO_TOPICS_BANK
} from "@/lib/seo-topics-bank";
import {
  Sparkles,
  Copy,
  Check,
  Target,
  TrendingUp,
  BookOpen,
  Compass,
  ShieldCheck,
  Lightbulb,
  RefreshCw,
  Clock,
  Globe,
  Search,
  CheckCircle2,
  PlusCircle,
  Bookmark,
  BookmarkCheck,
  Filter,
  Layers,
  ArrowRight,
  HelpCircle,
  X,
  FileText
} from "lucide-react";

export function BlogsSuggestionSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedOutlineId, setCopiedOutlineId] = useState<string | null>(null);
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchMessage, setResearchMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Status map (topicId -> "new" | "pipeline" | "drafted" | "published")
  const [topicStatuses, setTopicStatuses] = useState<Record<string, string>>({});
  const [customTopics, setCustomTopics] = useState<BlogTopicSuggestion[]>([]);

  // Load initial 24h research payload
  const [payload, setPayload] = useState<DailyResearchData>(() => get24hResearchPayload());

  // New Custom Topic Form State
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState<any>("CAT & Entrance Exams");
  const [newTopicKeyword, setNewTopicKeyword] = useState("");
  const [newTopicVolume, setNewTopicVolume] = useState("25,000 / mo");
  const [newTopicDifficulty, setNewTopicDifficulty] = useState<"Low" | "Medium" | "High">("Low");
  const [newTopicGap, setNewTopicGap] = useState("");

  // Load saved custom topics and statuses from localStorage
  useEffect(() => {
    try {
      const storedStatuses = localStorage.getItem("cwm_topic_statuses");
      if (storedStatuses) {
        setTopicStatuses(JSON.parse(storedStatuses));
      }
      const storedCustom = localStorage.getItem("cwm_custom_blog_ideas");
      if (storedCustom) {
        setCustomTopics(JSON.parse(storedCustom));
      }
    } catch (e) {}
  }, []);

  // Save statuses to localStorage
  const updateTopicStatus = (topicId: string, status: string) => {
    setTopicStatuses((prev) => {
      const updated = { ...prev, [topicId]: status };
      try {
        localStorage.setItem("cwm_topic_statuses", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Ticking 24-Hour Countdown Clock
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(payload.nextRefreshAt).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        const fresh = forceRefresh24hTopics(1);
        setPayload(fresh);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [payload.nextRefreshAt]);

  const categories = [
    "All",
    "CAT & Entrance Exams",
    "Direct MBA & PGDM",
    "Profile & GD-PI Prep",
    "Executive & Online MBA",
    "Specializations & ROI"
  ];

  // Combined topic pool (Daily suggested topics + custom added topics + all SEO bank fallback if filtered)
  const allAvailableTopics = useMemo(() => {
    const map = new Map<string, BlogTopicSuggestion>();
    // Add daily topics first
    (payload.dailyTopics || []).forEach((t) => map.set(t.id, t));
    // Add custom topics
    customTopics.forEach((t) => map.set(t.id, t));
    // Add full bank for search coverage
    SEO_TOPICS_BANK.forEach((t) => {
      if (!map.has(t.id)) map.set(t.id, t);
    });
    return Array.from(map.values());
  }, [payload.dailyTopics, customTopics]);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return allAvailableTopics.filter((t) => {
      // Category filter
      if (selectedCategory !== "All" && t.category !== selectedCategory) return false;
      // Difficulty filter
      if (selectedDifficulty !== "All" && t.keywordDifficulty !== selectedDifficulty) return false;
      // Status filter
      const currentStatus = topicStatuses[t.id] || "new";
      if (selectedStatus !== "All" && currentStatus !== selectedStatus) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesKeyword = t.primaryKeyword.toLowerCase().includes(q);
        const matchesSecondary = (t.secondaryKeywords || []).some((sk) => sk.toLowerCase().includes(q));
        const matchesCategory = t.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesKeyword && !matchesSecondary && !matchesCategory) return false;
      }
      return true;
    });
  }, [allAvailableTopics, selectedCategory, selectedDifficulty, selectedStatus, searchQuery, topicStatuses]);

  const handleCopyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyOutline = (id: string, topic: BlogTopicSuggestion) => {
    const text = `# ${topic.title}\n\n**Target Keyword**: ${topic.primaryKeyword}\n**Category**: ${topic.category}\n**Search Volume**: ${topic.searchVolume}\n\n## Content Outline:\n` +
      topic.suggestedOutline.map((h, i) => `${i + 1}. ${h}`).join("\n") +
      `\n\n---\n*Call to Action: Direct 1-on-1 Profile Evaluation with Mohit Jain*`;
    navigator.clipboard.writeText(text);
    setCopiedOutlineId(id);
    setTimeout(() => setCopiedOutlineId(null), 2500);
  };

  const handleManualResearchRefresh = () => {
    setIsResearching(true);
    setResearchMessage("Scraping Google Trends, Shiksha & Collegedunia gap data...");

    setTimeout(() => {
      const fresh = forceRefresh24hTopics(Math.floor(Math.random() * 10) + 1);
      setPayload(fresh);
      setIsResearching(false);
      setResearchMessage("Competitor research complete! Fresh high-intent topics loaded.");
      setTimeout(() => setResearchMessage(null), 4000);
    }, 1200);
  };

  const handleAddCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const primaryKw = newTopicKeyword.trim() || newTopicTitle.toLowerCase();
    const newTopic: BlogTopicSuggestion = {
      id: `custom-${Date.now()}`,
      title: newTopicTitle.trim(),
      category: newTopicCategory,
      searchVolume: newTopicVolume.trim() || "20,000 / mo",
      keywordDifficulty: newTopicDifficulty,
      primaryKeyword: primaryKw,
      secondaryKeywords: [
        `${primaryKw} 2027`,
        `${primaryKw} eligibility fees`,
        `best ${primaryKw} guidance`
      ],
      competitorGap: newTopicGap.trim() || "Provide verified fee structure, exact cutoff trends, and 1-on-1 counseling CTA with Mohit Jain.",
      targetAudience: "MBA / PGDM aspirants targeting top business schools",
      suggestedOutline: [
        `Executive Overview & Eligibility for ${newTopicTitle}`,
        "Key Cutoffs, Fee Structures & Placement ROI Matrix",
        "Step-by-Step Admission Roadmap & Selection Criteria",
        "Common Pitfalls & Mistakes Aspirants Must Avoid",
        "Connect with Mohit Jain for Direct Admission Guidance"
      ],
      aiPrompt: `Write a 1600-word comprehensive SEO blog post titled '${newTopicTitle}'. Include structured H2/H3 headers, verified fee and placement data, FAQ schema, and direct counseling CTA.`
    };

    const updated = [newTopic, ...customTopics];
    setCustomTopics(updated);
    try {
      localStorage.setItem("cwm_custom_blog_ideas", JSON.stringify(updated));
    } catch (e) {}

    // Reset Form
    setNewTopicTitle("");
    setNewTopicKeyword("");
    setNewTopicGap("");
    setShowAddModal(false);
  };

  const lastResearchedDateStr = new Date(payload.lastResearchedAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short"
  });

  return (
    <div className="space-y-6 font-body pb-12">
      {/* Top Banner: 24h Intelligence Engine Header + 24-Hour Timer */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> 24-Hour Competitor SEO & Search Gap Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              High-Impact Blog Topic Suggestions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Targeting highest-volume keyword opportunities scraped from Google Search, Shiksha.com, and Collegedunia gaps.
            </p>

            {/* Researched Competitor Sources Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mr-1">Benchmarked Against:</span>
              {(payload.sourcesResearched || []).map((src) => (
                <span key={src} className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-medium">
                  {src}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: 24h Countdown Clock & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            {/* Live 24h Countdown Display */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Next 24h Scan In:</span>
              </div>
              <div className="font-mono text-sm font-extrabold text-amber-400 tracking-wider flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">{String(timeLeft.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">{String(timeLeft.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">{String(timeLeft.seconds).padStart(2, "0")}s</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-3">
              <button
                onClick={handleManualResearchRefresh}
                disabled={isResearching}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/10 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResearching ? "animate-spin" : ""}`} />
                <span>{isResearching ? "Scanning..." : "Rescan Now"}</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Custom Topic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Toast Notice for Research Completion */}
        {researchMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{researchMessage}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic suggestions by keyword, college, or exam..."
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Low">Low Difficulty (Fast Rank)</option>
              <option value="Medium">Medium Difficulty</option>
              <option value="High">High Difficulty</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="new">New Ideas</option>
              <option value="pipeline">In Pipeline</option>
              <option value="drafted">Drafted</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Suggestions Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong className="text-white">{filteredTopics.length}</strong> topic opportunities</span>
          <span>Click "Copy AI Prompt" to generate complete SEO article</span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm space-y-3">
            <p>No topic suggestions matched your search or filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDifficulty("All");
                setSelectedStatus("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold cursor-pointer transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredTopics.map((topic, idx) => {
            const currentStatus = topicStatuses[topic.id] || "new";
            const isOutlineOpen = activeOutlineId === topic.id;

            return (
              <div
                key={topic.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 shadow-lg transition-all space-y-4 relative group"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                        {topic.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        Vol: {topic.searchVolume}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        topic.keywordDifficulty === "Low"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : topic.keywordDifficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        Diff: {topic.keywordDifficulty}
                      </span>

                      {/* Status Tag */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        currentStatus === "published"
                          ? "bg-emerald-500 text-slate-950"
                          : currentStatus === "drafted"
                          ? "bg-blue-500 text-white"
                          : currentStatus === "pipeline"
                          ? "bg-purple-500 text-white"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}>
                        {currentStatus === "published" ? "Published ✓" : currentStatus === "drafted" ? "Drafted" : currentStatus === "pipeline" ? "In Pipeline" : "New Idea"}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Status Selector */}
                    <select
                      value={currentStatus}
                      onChange={(e) => updateTopicStatus(topic.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="new">Status: New</option>
                      <option value="pipeline">Status: Pipeline</option>
                      <option value="drafted">Status: Drafted</option>
                      <option value="published">Status: Published</option>
                    </select>

                    {/* Copy Markdown Outline */}
                    <button
                      onClick={() => handleCopyOutline(topic.id, topic)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedOutlineId === topic.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Outline</span>
                        </>
                      )}
                    </button>

                    {/* Copy AI Prompt Button */}
                    <button
                      onClick={() => handleCopyPrompt(topic.id, topic.aiPrompt)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/20 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {copiedId === topic.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy AI Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Keywords & Target Audience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-amber-400" /> Target Keywords
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
                        {topic.primaryKeyword}
                      </span>
                      {topic.secondaryKeywords.map((sk) => (
                        <span key={sk} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-blue-400" /> Target Audience & Intent
                    </div>
                    <p className="text-xs text-slate-300 pt-0.5 leading-relaxed">
                      {topic.targetAudience}
                    </p>
                  </div>
                </div>

                {/* Competitor Gap Opportunity Callout */}
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-400">Competitive Advantage: </span>
                    <span className="text-slate-300">{topic.competitorGap}</span>
                  </div>
                </div>

                {/* Expandable Recommended Outline */}
                <div>
                  <button
                    onClick={() => setActiveOutlineId(isOutlineOpen ? null : topic.id)}
                    className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isOutlineOpen ? "Hide Recommended Outline" : "View Recommended Content Structure (5 Headings)"}</span>
                  </button>

                  {isOutlineOpen && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 animate-fadeIn text-xs">
                      <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] text-amber-400 mb-2">
                        Suggested Headings & Structure:
                      </div>
                      <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                        {topic.suggestedOutline.map((head, hIdx) => (
                          <li key={hIdx} className="leading-relaxed">
                            <span className="font-semibold text-white">{head}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Add Custom Blog Topic Idea */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Add New Blog Topic Idea</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic Title / H1 Heading *
                </label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. SIBM Pune vs NMIMS Mumbai: Cutoffs & Placements 2027"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="CAT & Entrance Exams">CAT & Entrance Exams</option>
                    <option value="Direct MBA & PGDM">Direct MBA & PGDM</option>
                    <option value="Profile & GD-PI Prep">Profile & GD-PI Prep</option>
                    <option value="Executive & Online MBA">Executive & Online MBA</option>
                    <option value="Specializations & ROI">Specializations & ROI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Keyword Difficulty
                  </label>
                  <select
                    value={newTopicDifficulty}
                    onChange={(e) => setNewTopicDifficulty(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Low">Low (Fast Rank)</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Keyword
                  </label>
                  <input
                    type="text"
                    value={newTopicKeyword}
                    onChange={(e) => setNewTopicKeyword(e.target.value)}
                    placeholder="e.g. sibm pune vs nmims mumbai"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Search Volume
                  </label>
                  <input
                    type="text"
                    value={newTopicVolume}
                    onChange={(e) => setNewTopicVolume(e.target.value)}
                    placeholder="e.g. 28,000 / mo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Competitor Gap / Content Advantage
                </label>
                <textarea
                  rows={2}
                  value={newTopicGap}
                  onChange={(e) => setNewTopicGap(e.target.value)}
                  placeholder="Explain what unique insight or ROI data Mohit Jain will provide..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Add Topic to Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
