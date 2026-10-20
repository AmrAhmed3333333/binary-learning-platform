import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Building2, GraduationCap, BookOpen, Phone, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white" dir="rtl">
      
      {/* شريط التنقل المشترك */}
      <SiteHeader activeSection="about" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-12 py-12">
        
        {/* قسم الهيدر الشخصي والصورة */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center sm:text-right flex flex-col sm:flex-row items-center gap-8">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-1 shadow-xl shrink-0 overflow-hidden relative">
            <div className="w-full h-full bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <img
                src="/Me.jpg"
                alt="عمرو أحمد مصطفى"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>معلومات المطور والمشروع</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">عمرو أحمد مصطفى</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              طالب بكلية التربية النوعية، جامعة عين شمس، قسم تكنولوجيا التعليم. أعمل على تطوير منصة «مختبر النظام الثنائي» التعليمية لخدمة طلاب الصف الأول الثانوي.
            </p>
          </div>
        </section>

        {/* تفاصيل البيانات الأكاديمية */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 block mb-1">الجامعة</span>
            <strong className="text-white text-sm">جامعة عين شمس</strong>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 block mb-1">الكلية</span>
            <strong className="text-white text-sm">كلية التربية النوعية</strong>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 block mb-1">القسم</span>
            <strong className="text-white text-sm">تكنولوجيا التعليم</strong>
          </div>
        </section>

        {/* وسائل التواصل */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">طرق التواصل</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:01007515059"
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-sm" dir="ltr">01007515059</span>
              </div>
              <span className="text-xs text-cyan-400">اتصال</span>
            </a>

            <a
              href="https://wa.me/201007515059"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-sm" dir="ltr">01007515059</span>
              </div>
              <span className="text-xs text-emerald-400">واتساب</span>
            </a>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}