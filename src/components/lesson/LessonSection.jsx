"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LessonSection({ section }) {
  if (!section) return null;

  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setShowResult(true);
  };

  const question = section.quickCheckQuestion;
  const isCorrect = selectedOption === question?.correctAnswerIndex;

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 my-6 transition-all">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-sm">
            {section.id.slice(0, 2).toUpperCase()}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {section.title}
          </h3>
        </div>

        {section.page && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 self-start sm:self-auto">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>صفحة الكتاب: {section.page}</span>
          </div>
        )}
      </div>

      {/* Explanation Content */}
      <div className="py-5 space-y-4">
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {section.simpleExplanation}
        </p>

        {/* Examples Box */}
        {section.correctExample && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Lightbulb className="w-4 h-4" />
              <span>أمثلة توضيحية من المنهج</span>
            </div>
            {typeof section.correctExample === "string" ? (
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {section.correctExample}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {section.correctExample.analog && (
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-purple-400 font-semibold block mb-1">تناظري (Analog):</span>
                    <span className="text-slate-300">{section.correctExample.analog}</span>
                  </div>
                )}
                {section.correctExample.digital && (
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-semibold block mb-1">رقمي (Digital):</span>
                    <span className="text-slate-300">{section.correctExample.digital}</span>
                  </div>
                )}
                {section.correctExample.decimal && (
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-purple-400 font-semibold block mb-1">عشري:</span>
                    <span className="text-slate-300">{section.correctExample.decimal}</span>
                  </div>
                )}
                {section.correctExample.binary && (
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-semibold block mb-1">ثنائي:</span>
                    <span className="text-slate-300 font-mono" dir="ltr">{section.correctExample.binary}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Common Misconception Box */}
        {section.commonMisconception && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-1 text-amber-300">تصور خاطئ شائع:</strong>
              <span>{section.commonMisconception}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Check Question Widget */}
      {question && (
        <div className="mt-6 pt-6 border-t border-[#1e293b] bg-slate-900/50 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-3">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>سؤال تحقق سريع</span>
          </div>
          <p className="text-sm text-slate-200 mb-4 font-medium">
            {question.question}
          </p>

          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isThisCorrect = idx === question.correctAnswerIndex;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
              if (showResult) {
                if (isThisCorrect) {
                  btnStyle = "bg-emerald-950/60 border-emerald-600/50 text-emerald-200 font-semibold";
                } else if (isSelected && !isThisCorrect) {
                  btnStyle = "bg-red-950/60 border-red-600/50 text-red-200";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={showResult}
                  className={cn(
                    "w-full text-right px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    btnStyle
                  )}
                >
                  <span>{option}</span>
                  {showResult && isThisCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={cn(
              "mt-4 p-4 rounded-xl text-xs sm:text-sm border animate-fade-in",
              isCorrect ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300" : "bg-red-950/30 border-red-800/40 text-red-300"
            )}>
              <div className="font-bold mb-1">
                {isCorrect ? "إجابة صحيحة أحسنت!" : "إجابة غير دقيقة، حاول مرة أخرى."}
              </div>
              <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}