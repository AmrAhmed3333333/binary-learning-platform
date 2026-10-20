"use client";

import { useState } from "react";
import Link from "next/link";
import { Cpu, Menu, X, BookOpen, Calculator, Award, GraduationCap, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteHeader({ activeSection = "home", onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "الرئيسية", icon: Home, href: "/#hero" },
    { id: "journey", label: "رحلة التعلم", icon: BookOpen, href: "/#journey" },
    { id: "lab", label: "معمل النظام الثنائي", icon: Cpu, href: "/#lab" },
    { id: "calculator", label: "حاسبة التخزين", icon: Calculator, href: "/#calculator" },
    { id: "quiz", label: "التدريبات والتقييم", icon: Award, href: "/#quiz" },
    { id: "teacher", label: "معلم المادة", icon: GraduationCap, href: "/#teacher" },
    { id: "about", label: "من أنا", icon: User, href: "/about", isPage: true },
  ];

  const handleNavClick = (e, item) => {
    setIsMobileMenuOpen(false);

    // إذا كان رابط لصفحة مستقلة مثل "من أنا" اتركه ينتقل إليها عبر Link
    if (item.isPage) {
      return;
    }

    // إذا كنا داخل الصفحة الرئيسية ونضغط على رابط قسم (#)
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const targetId = item.href.replace("/#", "").replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      if (onNavigate) {
        onNavigate(targetId);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b] bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <Link
              href="/#hero"
              onClick={(e) => handleNavClick(e, navItems[0])}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
              aria-label="الذهاب إلى الرئيسية - مختبر النظام الثنائي"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                  مختبر النظام الثنائي
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  منصة تعليمية تفاعلية - أولى ثانوي
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    isActive
                      ? "bg-purple-600/20 text-cyan-400 border border-purple-500/30"
                      : item.isPage
                      ? "text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/50"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4", item.isPage ? "text-purple-400" : "text-purple-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="فتح القائمة المتجاوبة"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#1e293b] bg-[#111827] px-4 pt-3 pb-5 space-y-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  isActive
                    ? "bg-purple-600/20 text-cyan-400 border border-purple-500/30"
                    : item.isPage
                    ? "text-purple-300 bg-purple-950/40 border border-purple-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                )}
              >
                <Icon className="w-5 h-5 text-purple-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}