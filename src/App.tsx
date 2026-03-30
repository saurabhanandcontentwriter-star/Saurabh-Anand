/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Terminal, 
  Cpu,
  ChevronRight,
  Download,
  Search,
  BarChart3,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  ShoppingCart,
  Layout,
  Zap,
  Layers,
  FileText
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { Toaster, toast } from "sonner";
import ChatBot from "./components/ChatBot";

const EXPERIENCE = [
  {
    role: "SEO Executive",
    company: "TripzyGo",
    domain: "tripzygo.in",
    period: "Mar 2024 – Present",
    description: "Spearheading the organic growth strategy for a leading travel platform. My work involves deep technical audits, advanced keyword research, and high-impact content strategy that consistently outperforms competitors in the SERPs.",
    highlights: [
      "Achieved 80% increase in organic traffic within 6 months",
      "Optimized 500+ high-intent landing pages for conversion",
      "Implemented advanced schema markup for rich snippets",
      "Managed a monthly content calendar of 50+ SEO-optimized articles"
    ],
    tools: ["Google Analytics", "Search Console", "Ahrefs", "Semrush"]
  },
  {
    role: "SEO Analyst",
    company: "Guest Blogging Technology",
    domain: "guestbloggingtechnology.com",
    period: "Mar 2022 – Mar 2023",
    description: "Focused on building high-authority backlink profiles and executing large-scale outreach campaigns. I developed a proprietary guest blogging framework that improved domain authority for 20+ client sites.",
    highlights: [
      "Secured 200+ high-DA backlinks through strategic outreach",
      "Increased average Domain Authority by 15 points across portfolio",
      "Reduced bounce rate by 30% through content UX optimization",
      "Conducted weekly SEO performance reporting for key stakeholders"
    ],
    tools: ["Google Analytics", "Moz", "BuzzStream", "Screaming Frog"]
  },
  {
    role: "Digital Marketing Intern",
    company: "TripzyGo International",
    domain: "tripzygo.in",
    period: "Internship",
    description: "Learned the fundamentals of SEO and digital marketing by supporting senior analysts. I was responsible for initial keyword research, metadata optimization, and social media content scheduling.",
    highlights: [
      "Contributed to a 70% traffic increase for the main blog",
      "Managed social media accounts with 20% growth in engagement",
      "Optimized 100+ legacy posts for current SEO standards",
      "Assisted in the launch of 3 successful email marketing campaigns"
    ],
    tools: ["Google Analytics", "Canva", "Hootsuite", "WordPress"]
  }
];

const SKILLS = [
  { 
    name: "SEO Mastery", 
    icon: <Search className="w-5 h-5" />, 
    items: ["Keyword Research", "On-Page Optimization", "Off-Page & Link Building", "Technical SEO", "HTML SEO Optimization"] 
  },
  { 
    name: "Digital Marketing", 
    icon: <BarChart3 className="w-5 h-5" />, 
    items: ["Content Strategy", "Guest Blogging", "Google Analytics", "Search Console", "Marketing Strategy"] 
  },
  { 
    name: "Design & UX", 
    icon: <Palette className="w-5 h-5" />, 
    items: ["UI Design Fundamentals", "UX Optimization", "User Behavior Analysis", "Figma", "Visual Design"] 
  },
  { 
    name: "Development", 
    icon: <Code2 className="w-5 h-5" />, 
    items: ["Web Development Basics", "HTML/CSS", "React Fundamentals", "Vite", "Git"] 
  },
];

const EDUCATION = [
  { degree: "Bachelor of Computer Applications (BCA)", school: "Graduated 2024" },
  { degree: "Diploma", school: "DPG Polytechnic College - 2021" }
];

// Reusable Image Component with Fallback and Loading States
const SafeImage = ({ src, alt, className, objectFit = "cover", fallbackSrc, hideOnError, ...props }: any) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isError && hideOnError) return null;

  const placeholderColor = "bg-zinc-100";
  const iconColor = "text-zinc-400";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !isError && (
        <div className={`absolute inset-0 ${placeholderColor} animate-pulse flex items-center justify-center`}>
          <Globe className={`w-4 h-4 ${iconColor} opacity-20`} />
        </div>
      )}
      {isError ? (
        <div className={`absolute inset-0 ${placeholderColor} flex items-center justify-center ${iconColor}`}>
          <div className="flex flex-col items-center gap-2 opacity-20">
            <Globe className="w-1/2 h-1/2" />
            <span className="text-[8px] font-bold uppercase tracking-widest">Image Error</span>
          </div>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const decoY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const decoY2 = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHireMe = () => {
    toast.success("Thanks for your interest! I'll get back to you soon.", {
      description: "Redirecting to contact form...",
    });
    setTimeout(() => scrollToSection("contact"), 1500);
  };

  const handleDownloadCV = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Preparing your download...",
      success: "CV downloaded successfully!",
      error: "Failed to download CV.",
    });
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", {
      description: "I'll respond to your inquiry within 24 hours.",
    });
  };

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Saurabh Anand",
    "jobTitle": "SEO Analyst & Digital Marketing Specialist",
    "url": window.location.origin,
    "sameAs": [
      "https://www.linkedin.com/in/saurabh-anand-seo/",
      "https://github.com"
    ],
    "description": "Results-driven SEO Analyst and Digital Marketing Professional with 2+ years of experience in search engine optimization, content strategy, and organic growth."
  };

  return (
    <div className="min-h-screen selection:bg-zinc-900 selection:text-white scroll-smooth">
      <Toaster position="top-center" />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
              <SafeImage 
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                alt="Google" 
                className="w-full h-full"
                objectFit="contain"
              />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              SAURABH<span className="text-zinc-400">.</span>
            </span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            {["About", "Experience", "Skills", "Now", "SEO", "Contact"].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-zinc-900 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleHireMe}
            className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
          >
            Hire Me
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Corner Decorative Images */}
        <motion.div 
          style={{ y: decoY1 }}
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ 
            opacity: 0.4, 
            x: 0, 
            rotate: 6,
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.5 },
            x: { duration: 1, delay: 0.5 },
            rotate: { duration: 1, delay: 0.5 },
          }}
          className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 -z-10 pointer-events-none"
        >
          <SafeImage 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
            alt="SEO Decorative" 
            className="w-full h-full rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div 
          style={{ y: decoY2 }}
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ 
            opacity: 0.4, 
            x: 0, 
            rotate: -6,
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.7 },
            x: { duration: 1, delay: 0.7 },
            rotate: { duration: 1, delay: 0.7 },
          }}
          className="absolute top-20 right-10 w-32 h-32 md:w-48 md:h-48 -z-10 pointer-events-none"
        >
          <SafeImage 
            src="https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=600" 
            alt="Marketing Decorative" 
            className="w-full h-full rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Background Image Layer */}
        <motion.div 
          style={{ y: bgY, opacity: heroOpacity }}
          className="absolute inset-0 -z-20"
        >
          <SafeImage 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" 
            alt="Dynamic Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                  <Linkedin className="w-3 h-3 text-[#0077b5]" />
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                    LinkedIn Top Voice
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                  <SafeImage src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-3 h-3" alt="Google" objectFit="contain" />
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                    Google Certified
                  </span>
                </div>
                <Award className="w-4 h-4 text-zinc-400" />
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-8">
                Saurabh <br />
                <span className="text-zinc-400 italic">Anand</span>
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed mb-10 max-w-xl">
                Results-driven SEO Analyst and Digital Marketing Professional with 2+ years of experience in search engine optimization, content strategy, and organic growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection("experience")}
                  className="bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all group cursor-pointer active:scale-95"
                >
                  View Experience
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleDownloadCV}
                  className="border border-zinc-200 px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-50 transition-all cursor-pointer active:scale-95"
                >
                  Download CV
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-200 border-8 border-white shadow-2xl shadow-zinc-200">
                <SafeImage 
                  src="https://picsum.photos/seed/professional-man-suit-4/800/800" 
                  alt="Saurabh Anand - SEO Specialist" 
                  className="w-full h-full"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center p-2">
                    <SafeImage 
                      src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                      alt="Google G Logo" 
                      className="w-full h-full"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Expertise in</p>
                    <h4 className="text-xl font-display font-bold text-zinc-900">Google SEO</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-zinc-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-zinc-300 rounded-full blur-3xl" />
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-200 to-transparent" />
        </motion.div>
      </section>

      {/* Tools Marquee */}
      <div className="bg-white py-12 border-y border-zinc-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-400">
            Expertise in Industry Standard Tools
          </p>
        </div>
        <div className="flex whitespace-nowrap animate-marquee hover:pause">
          {[
            { name: "Google", logo: "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" },
            { name: "Google Analytics", logo: "https://www.gstatic.com/images/branding/product/1x/analytics_48dp.png" },
            { name: "Search Console", logo: "https://www.gstatic.com/images/branding/product/1x/search_console_48dp.png" },
            { name: "Ahrefs", logo: "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128" },
            { name: "Semrush", logo: "https://www.google.com/s2/favicons?domain=semrush.com&sz=128" },
            { name: "Google Ads", logo: "https://www.gstatic.com/images/branding/product/1x/ads_48dp.png" },
            { name: "Screaming Frog", logo: "https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=128" },
            { name: "Moz", logo: "https://www.google.com/s2/favicons?domain=moz.com&sz=128" },
            { name: "Ubersuggest", logo: "https://www.google.com/s2/favicons?domain=neilpatel.com&sz=128" }
          ].map((tool, i) => (
            <div key={tool.name + i} className="mx-12 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-100 p-1.5">
                <SafeImage src={tool.logo} alt={tool.name} className="w-full h-full" objectFit="contain" />
              </div>
              <span className="text-xl font-display font-bold text-zinc-300 uppercase tracking-tighter">
                {tool.name}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            { name: "Google", logo: "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" },
            { name: "Google Analytics", logo: "https://www.gstatic.com/images/branding/product/1x/analytics_48dp.png" },
            { name: "Search Console", logo: "https://www.gstatic.com/images/branding/product/1x/search_console_48dp.png" },
            { name: "Ahrefs", logo: "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128" },
            { name: "Semrush", logo: "https://www.google.com/s2/favicons?domain=semrush.com&sz=128" },
            { name: "Google Ads", logo: "https://www.gstatic.com/images/branding/product/1x/ads_48dp.png" },
            { name: "Screaming Frog", logo: "https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=128" },
            { name: "Moz", logo: "https://www.google.com/s2/favicons?domain=moz.com&sz=128" },
            { name: "Ubersuggest", logo: "https://www.google.com/s2/favicons?domain=neilpatel.com&sz=128" }
          ].map((tool, i) => (
            <div key={tool.name + "dup" + i} className="mx-12 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-100 p-1.5">
                <SafeImage src={tool.logo} alt={tool.name} className="w-full h-full" objectFit="contain" />
              </div>
              <span className="text-xl font-display font-bold text-zinc-300 uppercase tracking-tighter">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Portfolio Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Visual Highlights</h2>
              <h3 className="text-4xl font-display font-bold">Project Gallery</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { image: "https://picsum.photos/seed/seo-audit-report/800/800", title: "Technical Audit" },
              { image: "https://picsum.photos/seed/data-analytics-dashboard/800/800", title: "GA4 Analytics" },
              { image: "https://picsum.photos/seed/organic-growth-graph/800/800", title: "Organic Growth" },
              { image: "https://picsum.photos/seed/seo-optimization-tools/800/800", title: "On-Page SEO" },
              { image: "https://picsum.photos/seed/content-marketing-plan/800/800", title: "Content Strategy" },
              { image: "https://picsum.photos/seed/ux-user-journey/800/800", title: "UX Optimization" },
              { image: "https://picsum.photos/seed/web-performance-vitals/800/800", title: "Core Web Vitals" },
              { image: "https://picsum.photos/seed/backlink-profile-analysis/800/800", title: "Link Building" },
              { image: "https://picsum.photos/seed/keyword-mapping-sheet/800/800", title: "Keyword Mapping" },
              { image: "https://picsum.photos/seed/ecommerce-seo-results/800/800", title: "E-commerce SEO" },
              { image: "https://picsum.photos/seed/local-seo-map/800/800", title: "Local SEO" },
              { image: "https://picsum.photos/seed/conversion-funnel-chart/800/800", title: "CRO Analysis" }
            ].map((item, i) => (
              <motion.div
                key={item.title + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100"
              >
                <SafeImage 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-bold text-sm uppercase tracking-widest">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Career Path</h2>
              <h3 className="text-5xl font-display font-bold">Work Experience</h3>
            </div>
            <p className="text-zinc-500 max-w-md">
              A track record of delivering measurable organic growth for diverse businesses, from startups to established enterprises.
            </p>
          </div>

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid md:grid-cols-[1fr_2fr] gap-8 p-8 rounded-3xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-400 mb-2">{exp.period}</p>
                  <h4 className="text-2xl font-display font-bold text-zinc-900 mb-1">{exp.role}</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg border border-zinc-100 flex items-center justify-center p-1 shadow-sm">
                      <SafeImage 
                        src={`https://www.google.com/s2/favicons?domain=${exp.domain}&sz=64`} 
                        alt={exp.company} 
                        className="w-full h-full"
                        objectFit="contain"
                        fallbackSrc={`https://ui-avatars.com/api/?name=${exp.company}&background=random`}
                      />
                    </div>
                    <p className="text-zinc-500 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map(tool => {
                      const domainMap: { [key: string]: string } = {
                        "Google Analytics": "analytics.google.com",
                        "Search Console": "search.google.com",
                        "Ahrefs": "ahrefs.com",
                        "Semrush": "semrush.com",
                        "Moz": "moz.com",
                        "BuzzStream": "buzzstream.com",
                        "Screaming Frog": "screamingfrog.co.uk"
                      };
                      const domain = domainMap[tool] || `${tool.toLowerCase().replace(/\s+/g, '')}.com`;
                      return (
                        <span key={tool} className="px-3 py-1 bg-white border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                          <SafeImage 
                            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} 
                            alt="" 
                            className="w-3 h-3 opacity-60"
                            objectFit="contain"
                            hideOnError={true}
                          />
                          {tool}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-600 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {exp.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-zinc-500">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">Portfolio</h2>
            <h3 className="text-5xl font-display font-bold mb-6">Featured Projects</h3>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Detailed case studies of how I leverage SEO and Analytics to drive sustainable traffic growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "E-commerce SEO Overhaul",
                client: "TripzyGo",
                growth: "+120% Traffic",
                details: "A complete technical and content SEO overhaul for a travel booking platform. Focused on high-intent long-tail keywords and site speed optimization.",
                tags: ["Technical SEO", "Content Strategy", "E-commerce"],
                image: "https://picsum.photos/seed/ecommerce-seo/1200/800"
              },
              {
                title: "SaaS Content Authority",
                client: "Guest Blogging Tech",
                growth: "+85% Leads",
                details: "Building a content engine that drives qualified leads. Implemented a topic cluster strategy that established the brand as a thought leader in the SEO space.",
                tags: ["Link Building", "Topic Clusters", "SaaS"],
                image: "https://picsum.photos/seed/saas-seo/1200/800"
              },
              {
                title: "Local SEO for Multi-location Brand",
                client: "Global Retailer",
                growth: "+200% Visibility",
                details: "Optimized Google Business Profiles and localized content for 50+ locations, resulting in a massive surge in 'near me' search rankings and foot traffic.",
                tags: ["Local SEO", "GBP Optimization", "Scalable SEO"],
                image: "https://picsum.photos/seed/local-seo-case/1200/800"
              }
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-xl group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <SafeImage src={project.image} alt={project.title} className="w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-lg">
                      <SafeImage src="https://www.gstatic.com/images/branding/product/1x/analytics_48dp.png" className="w-8 h-8" objectFit="contain" alt="GA" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-lg flex items-center justify-center">
                      <Search className="w-8 h-8 text-zinc-900" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      {project.growth}
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{project.client}</p>
                      <h4 className="text-3xl font-display font-bold text-zinc-900">{project.title}</h4>
                    </div>
                  </div>
                  <p className="text-zinc-600 mb-8 leading-relaxed">
                    {project.details}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-zinc-50 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Recognition */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-zinc-100 p-3 mb-8 group-hover:scale-110 transition-transform duration-500">
                <SafeImage 
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                  alt="Google" 
                  className="w-full h-full"
                  objectFit="contain"
                />
              </div>
              <div className="mb-6 w-full aspect-video rounded-2xl overflow-hidden border border-zinc-100">
                <SafeImage 
                  src="https://picsum.photos/seed/google-cert/600/400" 
                  alt="Google Certification" 
                  className="w-full h-full"
                />
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">Google</h4>
              <p className="text-zinc-600 text-sm max-w-xs mx-auto mb-8">
                Certified expert in Google Analytics, Search Console, and Google Ads, ensuring data-driven growth strategies.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-100">Certified</span>
                <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-100">Expert</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-zinc-100 p-3 mb-8 group-hover:scale-110 transition-transform duration-500">
                <SafeImage 
                  src="https://www.google.com/s2/favicons?domain=linkedin.com&sz=128" 
                  alt="LinkedIn" 
                  className="w-full h-full"
                  objectFit="contain"
                />
              </div>
              <div className="mb-6 w-full aspect-video rounded-2xl overflow-hidden border border-zinc-100">
                <SafeImage 
                  src="https://picsum.photos/seed/linkedin-voice/600/400" 
                  alt="LinkedIn Top Voice" 
                  className="w-full h-full"
                />
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">LinkedIn Top Voice</h4>
              <p className="text-zinc-600 text-sm max-w-xs mx-auto mb-8">
                Recognized as a Top Voice in SEO and Digital Marketing for 2024, contributing to the professional community.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-100">Top Voice</span>
                <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-100">Expert</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO & Organic Growth Section */}
      <section id="seo" className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-zinc-900/5 rounded-[2rem] blur-2xl group-hover:bg-zinc-900/10 transition-all duration-500" />
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-white shadow-2xl border border-zinc-100">
                  <SafeImage 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Google SEO Expertise Visualization" 
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                    <div className="text-white">
                      <p className="text-sm font-bold uppercase tracking-widest opacity-90 mb-2">Google SEO Expertise</p>
                      <h4 className="text-2xl font-display font-bold">Data-Driven Organic Growth</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Core Expertise</h2>
              <h3 className="text-4xl font-display font-bold mb-8">SEO & Organic Growth</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">On-Page & Technical SEO</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      Optimizing website structure, meta tags, and technical elements to maximize search engine visibility and user experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Data-Driven Strategy</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      Leveraging Google Analytics and Search Console data to identify high-potential keywords and content gaps.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Google SEO Toolkit Visuals */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <SafeImage src="https://www.gstatic.com/images/branding/product/1x/analytics_48dp.png" className="w-8 h-8" objectFit="contain" alt="GA4" />
                    <span className="text-xs font-bold text-zinc-900">GA4 Expert</span>
                  </div>
                  <div className="h-20 rounded-xl overflow-hidden">
                    <SafeImage src="https://picsum.photos/seed/ga4-dashboard/400/200" alt="GA4 Dashboard" className="w-full h-full" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <SafeImage src="https://www.gstatic.com/images/branding/product/1x/search_console_48dp.png" className="w-8 h-8" objectFit="contain" alt="GSC" />
                    <span className="text-xs font-bold text-zinc-900">GSC Specialist</span>
                  </div>
                  <div className="h-20 rounded-xl overflow-hidden">
                    <SafeImage src="https://picsum.photos/seed/gsc-data/400/200" alt="GSC Data" className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Organic Traffic", value: "+80%", desc: "Increase in monthly unique visitors through strategic keyword targeting." },
              { label: "Keyword Rankings", value: "Top 3", desc: "Achieved top positions for high-volume, competitive industry keywords." },
              { label: "Conversion Rate", value: "25%", desc: "Boost in lead generation and user retention through UX-driven SEO." }
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">{metric.label}</p>
                <h4 className="text-4xl font-display font-bold text-zinc-900 mb-4">{metric.value}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{metric.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Organic Traffic Success Stories */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h4 className="text-2xl font-display font-bold mb-2">Google SEO Success Stories</h4>
              <p className="text-zinc-500 text-sm">Real growth metrics achieved through technical and content optimization</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { image: "https://picsum.photos/seed/search-console-growth/800/600", title: "Search Console Growth", growth: "+140% Clicks" },
                { image: "https://picsum.photos/seed/analytics-data/800/600", title: "Analytics Data Scaling", growth: "+95% Traffic" },
                { image: "https://picsum.photos/seed/seo-audit-tech/800/600", title: "Technical SEO Audit", growth: "+210% Visibility" }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <SafeImage 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-zinc-900">{item.title}</h5>
                      <span className="text-emerald-600 font-bold text-sm">{item.growth}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organic Growth Strategy Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-12 md:p-16 rounded-[3rem] border border-zinc-800 shadow-xl relative overflow-hidden group"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 -z-0">
              <SafeImage 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
                alt="Growth Landscape" 
                className="w-full h-full opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-900 font-display font-bold">
                  SA
                </div>
                <div>
                  <h4 className="font-bold text-white">Saurabh Anand</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">SEO Analyst • Featured Post</p>
                </div>
              </div>

              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">Strategic Approach</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-white">Sustainable Organic Growth: <br/><span className="text-zinc-400">Building Authority That Lasts</span></h3>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                  In the ever-evolving landscape of digital marketing, I've learned that true success isn't about chasing the latest algorithm update. It's about building a foundation so solid that it withstands the test of time.
                </p>
                
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="font-bold text-lg">Technical Foundation</h4>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      SEO starts with a site that search engines can actually understand. I focus on crawlability, indexability, and site architecture to ensure every piece of content has the best chance to rank.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="font-bold text-lg">Content Authority</h4>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Content is the bridge between your brand and your audience. I help create valuable, high-intent assets that not only rank but also earn backlinks naturally and convert visitors into loyal customers.
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700 italic text-zinc-300 text-lg">
                  "My philosophy is simple: Don't build for search engines. Build for people, and optimize for search engines. That's how you achieve sustainable growth."
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[
                    "1472099645785-5658abf4ff4e",
                    "1500648767791-00dcc994a43e",
                    "1544005313-94ddf0286df2",
                    "1552058544-f2b08422138a"
                  ].map(id => (
                    <div key={id} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                      <SafeImage src={`https://images.unsplash.com/photo-${id}?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80`} alt="User" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-900 flex items-center justify-center text-[10px] text-white font-bold">
                    +12k
                  </div>
                </div>
                <p className="text-sm text-zinc-400 font-medium">Shared by 1,200+ professionals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traffic Analysis Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Data Visualization</h2>
              <h3 className="text-4xl font-display font-bold mb-6">Organic Traffic Analysis</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                Using advanced analytics to track user behavior and traffic patterns. My approach focuses on sustainable, long-term growth through data-driven decisions.
              </p>
              <div className="space-y-4">
                {['Search Intent Analysis', 'User Journey Mapping', 'Conversion Funnel Optimization'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="font-medium text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/5 rounded-[2rem] blur-2xl" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-100"
              >
                <SafeImage 
                  src="https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1000" 
                  alt="Traffic Analysis Chart" 
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Optimization Section */}
      <section id="ecommerce" className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-20 bg-emerald-500/10 rounded-full blur-[120px]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl"
              >
                <SafeImage 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                  alt="E-commerce Optimization Interface" 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/80 via-transparent to-transparent" />
                
                {/* Floating Stats Overlay */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Conversion Rate</p>
                      <p className="text-3xl font-display font-bold text-emerald-400">+45.8%</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">Specialized Service</h2>
              <h3 className="text-5xl font-display font-bold mb-8 leading-tight">E-commerce <br/>SEO Optimization</h3>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
                Transforming online stores into high-performance sales engines. My e-commerce strategy focuses on technical precision and user-centric content that converts browsers into buyers.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Layout className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-xl">Product Pages</h4>
                  <p className="text-zinc-500 text-sm">Optimizing titles, descriptions, and schema for maximum SERP visibility.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-xl">Site Velocity</h4>
                  <p className="text-zinc-500 text-sm">Core Web Vitals optimization to reduce bounce rates and improve rankings.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-xl">Category Hierarchy</h4>
                  <p className="text-zinc-500 text-sm">Strategic internal linking and silo structure for broad keyword coverage.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-xl">ROI Driven</h4>
                  <p className="text-zinc-500 text-sm">Focusing on high-margin products and seasonal trend capitalization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Section */}
      <section id="now" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Current Focus</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-8">
                What I'm <br />
                <span className="text-zinc-500 italic">Doing Now</span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-xl mb-12">
                A snapshot of my current professional focus, industry involvement, and personal growth journey in the ever-evolving digital landscape.
              </p>
              
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0">
                  <SafeImage 
                    src="https://picsum.photos/seed/professional-man-suit-5/400/400" 
                    alt="Saurabh Anand" 
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Saurabh Anand</h4>
                  <p className="text-zinc-500 text-sm">SEO Analyst & Content Strategist</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Available for Projects
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  title: "SEO Trends",
                  desc: "Analyzing the impact of Search Generative Experience (SGE) on organic traffic and adapting strategies for AI-first search.",
                  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
                  color: "bg-green-500"
                },
                {
                  title: "UI/UX Skills",
                  desc: "Enhancing my design skills to better align SEO performance with superior user experience and conversion optimization.",
                  img: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=600",
                  color: "bg-blue-500"
                },
                {
                  title: "LinkedIn Voice",
                  desc: "Consistently sharing insights as a LinkedIn Top Voice 2024 to help the community navigate digital marketing challenges.",
                  img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=600",
                  color: "bg-orange-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    <SafeImage src={item.img} alt={item.title} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <h4 className="font-bold text-white tracking-tight">{item.title}</h4>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Expertise</h2>
            <h3 className="text-4xl font-display font-bold">Technical Skills</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all"
              >
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-bold mb-4">{skill.name}</h4>
                <ul className="space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className="text-zinc-500 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Academic Background</h2>
              <h3 className="text-4xl font-display font-bold mb-8">Education</h3>
              <div className="space-y-8">
                {EDUCATION.map((edu, index) => (
                  <div key={edu.degree} className="flex gap-6">
                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{edu.degree}</h4>
                      <p className="text-zinc-500 text-sm">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-12 text-white">
              <Award className="w-12 h-12 text-zinc-500 mb-6" />
              <h4 className="text-2xl font-display font-bold mb-4">Certifications</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  Google Digital Marketing Certification
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  SEO & Link Building Certification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Get in touch</h2>
              <h3 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Let's work <br />
                <span className="text-zinc-500 italic">together.</span>
              </h3>
              <p className="text-zinc-400 text-lg mb-10 max-w-md">
                Ready to boost your organic growth? Reach out for SEO audits, content strategy, or UI/UX consultations.
              </p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/saurabh-anand-seo/" target="_blank" rel="noopener noreferrer" className="p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition-colors cursor-pointer">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:sauravanand399@gmail.com" className="p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition-colors cursor-pointer">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-8 text-zinc-500 text-sm">
                <p>New Delhi, India</p>
                <p>+91 7667926418</p>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <form className="space-y-6" onSubmit={handleSendMessage}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Name</label>
                    <input required type="text" className="w-full bg-zinc-50 border-none rounded-xl p-4 text-zinc-900 focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email</label>
                    <input required type="email" className="w-full bg-zinc-50 border-none rounded-xl p-4 text-zinc-900 focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message</label>
                  <textarea required rows={4} className="w-full bg-zinc-50 border-none rounded-xl p-4 text-zinc-900 focus:ring-2 focus:ring-zinc-900 transition-all" placeholder="Tell me about your project..." />
                </div>
                <button type="submit" className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all cursor-pointer active:scale-95">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Decorative circle */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 border border-zinc-800 rounded-full opacity-50" />
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center p-1.5 border border-zinc-700">
              <SafeImage 
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                alt="Google" 
                className="w-full h-full"
                objectFit="contain"
              />
            </div>
            <p className="text-zinc-500 text-sm font-medium">Google Certified SEO Analyst</p>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Saurabh Anand. Built with React & Tailwind.
          </p>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
