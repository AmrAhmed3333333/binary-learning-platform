"use client";

import { BookOpen, Github, Heart, Sparkles } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#070a12] border-t border-[#1e293b] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>مختبر النظام الثنائي</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            منصة تعليمية رقمية تفاعلية لطلاب الصف الأول الثانوي لمنهج تكنولوجيا المعلومات والاتصالات (ICT).
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">الرئيسية</a>
          <a href="#journey" className="hover:text-cyan-400 transition-colors">رحلة التعلم</a>
          <a href="#sections" className="hover:text-cyan-400 transition-colors">شرح الدرس</a>
          <a href="#lab" className="hover:text-cyan-400 transition-colors">المعمل الرقمي</a>
          <a href="#quiz" className="hover:text-cyan-400 transition-colors">التقييم الذاتي</a>
          <a href="#teacher" className="hover:text-cyan-400 transition-colors">أداة المعلم</a>
        </div>

        {/* Back to Top / Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3 text-xs">
          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            العودة إلى الأعلى ↑
          </button>
          <p className="text-slate-500 flex items-center gap-1">
            <span>صُمم بعناية لدعم التعليم التفاعلي</span>
          </p>
        </div>

      </div>
    </footer>
  );
}