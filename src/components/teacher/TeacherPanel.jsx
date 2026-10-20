"use client";

import { lessonData } from "@/data/lesson";
import { GraduationCap, BookOpen, Target, Clock, MessageSquare, Printer, CheckCircle2, AlertTriangle, Lightbulb, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeacherPanel() {
  const teacherGuide = lessonData.teacherGuide;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8 print:bg-white print:text-slate-900 print:border-none print:shadow-none">
      
      {/* Header & Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e293b] print:border-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center print:bg-purple-100 print:text-purple-700">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-0.5 print:text-purple-600">
              <span>أداة المعلم الصفية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white print:text-slate-900">
              دليل معلم المادة وخطط الحصة الدراسية
            </h3>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 print:hidden shadow-lg shadow-purple-900/30 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة دليل الحصة</span>
        </button>
      </div>

      {/* Lesson Info Meta Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 print:bg-slate-50 print:border-slate-200">
          <span className="text-xs text-slate-400 block mb-1">المادة والصف الدراسي</span>
          <span className="font-bold text-white print:text-slate-900 text-sm">
            {lessonData.metadata.subject} - {lessonData.metadata.gradeLevel}
          </span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 print:bg-slate-50 print:border-slate-200">
          <span className="text-xs text-slate-400 block mb-1">الصفحات المرجعية في الكتاب</span>
          <span className="font-bold text-cyan-400 print:text-purple-700 text-sm flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>الصفحات ({lessonData.metadata.pages})</span>
          </span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 print:bg-slate-50 print:border-slate-200">
          <span className="text-xs text-slate-400 block mb-1">طبيعة الأداة</span>
          <span className="font-bold text-purple-300 print:text-slate-900 text-sm">
            أداة مساعدة لدعم الشرح الصفي التفاعلي
          </span>
        </div>
      </div>

      {/* Section 1: Learning Objectives */}
      <div className="space-y-6 pt-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
          <h4 className="text-base font-bold text-cyan-400 print:text-purple-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span>أهداف التعلم السلوكية والوجدانية (قابلة للملاحظة والتقييم)</span>
          </h4>
          <ul className="space-y-2.5">
            {teacherGuide.lessonObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 print:text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 print:text-emerald-600" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Lesson Plan Flow */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
          <h4 className="text-base font-bold text-purple-400 print:text-purple-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>خطة الحصة المقترحة (الزمن الإجمالي: 45 دقيقة)</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
              <span className="text-xs font-semibold text-cyan-400 block mb-1">1. التمهيد (5 دقائق)</span>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                طرح سؤال افتتاحي ومقارنة الساعة العادية بالساعة الرقمية لتوضيح التناظري والرقمي.
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
              <span className="text-xs font-semibold text-purple-400 block mb-1">2. الشرح (15 دقيقة)</span>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                استعراض النظام الثنائي ومفهوم الـ Bit والـ Byte وأوزان القوى (2^n).
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
              <span className="text-xs font-semibold text-cyan-400 block mb-1">3. النشاط (10 دقائق)</span>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                تنفيذ نشاط المفاتيح المضيئة وبطاقات 0 و 1 الجماعية داخل الفصل.
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
              <span className="text-xs font-semibold text-purple-400 block mb-1">4. التطبيق (10 دقائق)</span>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                تدريب الطلاب على التحويل اليدوي وحساب سعات التخزين (KB, MB, GB).
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">5. التقويم (5 دقائق)</span>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                حل أسئلة تحقق سريعة وتقييم مدى استيعاب مخرجات التعلم.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Discussion Questions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
            <h4 className="text-base font-bold text-cyan-400 print:text-purple-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>أسئلة النقاش الصفي المقترحة</span>
            </h4>
            <ul className="space-y-3">
              {teacherGuide.discussionQuestions.map((q, idx) => (
                <li key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200 print:bg-slate-50 print:text-slate-800 print:border-slate-200 leading-relaxed">
                  <strong>سؤال ({idx + 1}):</strong> {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
            <h4 className="text-base font-bold text-purple-400 print:text-purple-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>النشاط الصفي الجماعي (بطاقات 0 و 1)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed mb-4">
              {teacherGuide.classActivity}
            </p>
            <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 print:bg-purple-50 print:text-purple-900">
              <strong>هدف النشاط:</strong> ترسيخ مفهوم التجميع الثنائي للبتات وربطها بالقيم العشرية بصرياً وحركياً.
            </div>
          </div>
        </div>

        {/* Section 4: Worked Examples & Common Misconceptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
            <h4 className="text-base font-bold text-emerald-400 print:text-purple-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              <span>أمثلة السبورة المقترحة</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 print:text-slate-700">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 font-mono">
                • تحويل العدد العشري 25 إلى ثنائي: <span className="text-cyan-400">11001</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 font-mono">
                • تحويل السلسلة الثنائية 1010 إلى عشري: <span className="text-purple-400">10</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 font-mono">
                • تحويل سعة 2GB إلى MB: <span className="text-emerald-400">2048 MB</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 print:bg-white print:border-slate-300">
            <h4 className="text-base font-bold text-amber-400 print:text-purple-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>أخطاء شائعة متوقعة وكيفية معالجتها</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 print:text-slate-700">
              <li>• قراءة باقي القسمة من الأعلى للأسفل عند التحويل (تنبيه الطلاب على القراءة صعوداً).</li>
              <li>• الخلط بين 1024 و 1000 في وحدات التخزين (التأكيد على اصطلاح المعيار الحاسوبي).</li>
              <li>• اعتبار الأوزان تبدأ من اليسار (توضيح أن الخانة اليمنى دائماً 2^0).</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}