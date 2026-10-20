import { lessonData } from "@/data/lesson";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LessonSection } from "@/components/lesson/LessonSection";
import { BinaryPlaceValueSimulator } from "@/components/lesson/BinaryPlaceValueSimulator";
import { ConversionWorkbench } from "@/components/lesson/ConversionWorkbench";
import { BitByteExplorer } from "@/components/lesson/BitByteExplorer";
import { StudentQuiz } from "@/components/student/StudentQuiz";
import { TeacherPanel } from "@/components/teacher/TeacherPanel";
import { Sparkles, ArrowDown, Cpu, BookOpen, Calculator, Award, GraduationCap } from "lucide-react";

export default function HomePage() {
  const sections = lessonData.sections || [];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white" dir="rtl">
      
      {/* 1. Site Header */}
      <SiteHeader activeSection="hero" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        
        {/* أولًا: Hero Section */}
        <section id="hero" className="relative text-center py-12 sm:py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-medium shadow-lg shadow-purple-900/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>منصة تعليمية تفاعلية مخصصة لمنهج الصف الأول الثانوي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            كيف يفهم الحاسوب لغة الصفر والواحد؟
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            استكشف عالم النظم الثنائية، وحول الأعداد بين النظام العشري والثنائي، وافهم وحدات التخزين الرقمية من خلال محاكيات وتجارب عملية مبسطة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#journey"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-900/40 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              ابدأ رحلة التعلم
            </a>
            <a
              href="#lab"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>انتقل إلى المعمل التفاعلي</span>
            </a>
          </div>
        </section>

        {/* ثانيًا: خريطة رحلة التعلم */}
        <section id="journey" className="space-y-6 pt-8 border-t border-[#1e293b]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">خريطة رحلة التعلم التفاعلية</h2>
            <p className="text-sm text-slate-400">تابع المحطات التعليمية مصممة خصيصاً لتغطية الصفحات 62-67 من المنهج.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#sections" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">1. المفاهيم النظرية</h3>
              <p className="text-xs text-slate-400 leading-relaxed">الفرق بين البيانات التناظرية والرقمية ومزاياها.</p>
            </a>

            <a href="#lab" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">2. المعمل والبتات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">محاكي الخانات الثنائية واحتمالات الأسس (2^n).</p>
            </a>

            <a href="#calculator" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">3. التحويل والتخزين</h3>
              <p className="text-xs text-slate-400 leading-relaxed">القسمة المتكررة وحساب سعات الـ KB و MB و GB.</p>
            </a>

            <a href="#quiz" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">4. التدريب والتقييم</h3>
              <p className="text-xs text-slate-400 leading-relaxed">اختبار تفاعلي شامل لقياس مخرجات التعلم.</p>
            </a>
          </div>
        </section>

        {/* ثالثًا: قسم الشرح */}
        <section id="sections" className="space-y-6 pt-8 border-t border-[#1e293b]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">محتوى الدرس والشرح المنهجي</h2>
            <p className="text-sm text-slate-400">أقسام الشرح والأمثلة المأخوذة من مقرر تكنولوجيا المعلومات والاتصالات.</p>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <LessonSection key={section.id} section={section} />
            ))}
          </div>
        </section>

        {/* رابعًا: المعمل التفاعلي */}
        <section id="lab" className="space-y-8 pt-8 border-t border-[#1e293b]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">المعمل الرقمي والمحاكيات التفاعلية</h2>
            <p className="text-sm text-slate-400">طبق عملياً ما قمت بدراسته وجرب تحويل الأعداد واستكشاف البتات.</p>
          </div>

          <BinaryPlaceValueSimulator />
          
          <div id="calculator">
            <ConversionWorkbench />
          </div>

          <BitByteExplorer />
        </section>

        {/* خامسًا: منطقة التدريب */}
        <section id="quiz" className="pt-8 border-t border-[#1e293b]">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">مركز التدريب والتقييم الذاتي</h2>
            <p className="text-sm text-slate-400">اختبر معلوماتك وأجب عن الأسئلة المتدرجة للحصول على تغذية راجعة فورية.</p>
          </div>

          <StudentQuiz />
        </section>

        {/* سادسًا: وضع المعلم */}
        <section id="teacher" className="pt-8 border-t border-[#1e293b]">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">أداة معلم المادة</h2>
            <p className="text-sm text-slate-400">دليل الحصة الدراسية، أهداف التعلم، والأنشطة الصفية المقترحة.</p>
          </div>

          <TeacherPanel />
        </section>

      </main>

      {/* سابعًا: التذييل */}
      <SiteFooter />

    </div>
  );
}