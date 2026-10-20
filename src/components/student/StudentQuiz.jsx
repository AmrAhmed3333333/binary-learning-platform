"use client";

import { useState } from "react";
import { lessonData } from "@/data/lesson";
import { QuestionCard } from "@/components/student/QuestionCard";
import { Award, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudentQuiz() {
  // تجميع الأسئلة من مصادر البيانات المركزية في lesson.js
  const allQuestions = [
    ...(lessonData.exercises.multipleChoice || []),
    ...(lessonData.exercises.trueFalse || []),
    ...(lessonData.exercises.completion || []),
    ...(lessonData.exercises.conversionProblems || []),
    ...(lessonData.exercises.storageProblems || [])
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState({}); // لتخزين حالة إجابة كل سؤال { [questionId]: boolean }
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = allQuestions[currentIndex];
  const totalQuestions = allQuestions.length;

  const handleAnswerSubmitted = (questionId, isCorrect) => {
    setAnswersMap((prev) => ({
      ...prev,
      [questionId]: isCorrect
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setAnswersMap({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // حساب النتيجة النهائية
  const correctCount = Object.values(answersMap).filter(Boolean).length;
  const answeredCount = Object.keys(answersMap).length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  // الأسئلة التي أجاب عليها الطالب بخطأ
  const incorrectQuestions = allQuestions.filter(
    (q) => answersMap[q.id] === false
  );

  if (isCompleted) {
    return (
      <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-10 shadow-2xl text-slate-100 my-8">
        <div className="text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-purple-900/30">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold text-cyan-400 block mb-1">نتائج التقييم الشامل</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              أتممت اختبار «مختبر النظام الثنائي» بنجاح!
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              هذه النتائج مسجلة محلياً في جلستك الحالية لمساعدتك على قياس مدى استيعابك للمنهج.
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-around">
            <div className="text-center">
              <span className="text-xs text-slate-400 block mb-1">الدرجة الكلية</span>
              <span className="text-3xl font-extrabold text-cyan-400">{correctCount} / {totalQuestions}</span>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-xs text-slate-400 block mb-1">النسبة المئوية</span>
              <span className="text-3xl font-extrabold text-purple-400">{scorePercentage}%</span>
            </div>
          </div>

          {/* Review Incorrect Answers if any */}
          {incorrectQuestions.length > 0 && (
            <div className="text-right bg-slate-900/80 border border-red-900/40 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-red-300 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span>نقاط تحتاج إلى مراجعة وتدقيق:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                {incorrectQuestions.map((q) => (
                  <li key={q.id} className="leading-relaxed">
                    <span className="text-white font-medium">{q.question}</span>
                    {q.explanation && (
                      <span className="block text-slate-400 mr-4 mt-0.5">التفسير: {q.explanation}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة محاولة الاختبار</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
      
      {/* Quiz Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>مركز التقييم والتدريب التفاعلي</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            اختبار قياس مخرجات التعلم (الصف الأول الثانوي)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">
            السؤال {currentIndex + 1} من {totalQuestions}
          </span>
          <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card Renderer */}
      <div className="py-4">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswerSubmitted={handleAnswerSubmitted}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e293b]">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
            currentIndex === 0
              ? "bg-slate-900/40 text-slate-600 cursor-not-allowed border border-slate-900"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
          )}
        >
          <ArrowRight className="w-4 h-4" />
          <span>السؤال السابق</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span>{currentIndex === totalQuestions - 1 ? "عرض النتيجة النهائية" : "السؤال التالي"}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}