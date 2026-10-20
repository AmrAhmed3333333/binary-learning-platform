"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuestionCard({ question, onAnswerSubmitted }) {
  if (!question) return null;

  const [selectedOption, setSelectedOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // تحديد نوع السؤال (اختيار من متعدد، صح وخطأ، أو إكمال)
  const isMultipleChoice = question.options && Array.isArray(question.options);
  const isTrueFalse = question.answer === true || question.answer === false || typeof question.answer === "boolean";
  const isCompletion = !isMultipleChoice && !isTrueFalse;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return; // منع التكرار

    let correct = false;

    if (isMultipleChoice) {
      if (selectedOption === null) return;
      correct = selectedOption === question.correctAnswer;
    } else if (isTrueFalse) {
      if (selectedOption === null) return;
      correct = selectedOption === question.answer;
    } else if (isCompletion) {
      if (!textInput.trim()) return;
      // مقارنة مرنة للنص المدخل مع الإجابة المتوقعة
      const userAns = textInput.trim().toLowerCase();
      const expectedAns = (question.answer || "").toString().trim().toLowerCase();
      correct = userAns === expectedAns;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (onAnswerSubmitted) {
      onAnswerSubmitted(question.id, correct);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setTextInput("");
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 my-6 transition-all">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-3">
        <HelpCircle className="w-4 h-4" />
        <span>سؤال تدريبي وتقييم تفاعلي</span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
        {question.question}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Type 1: Multiple Choice */}
        {isMultipleChoice && (
          <div className="space-y-2.5" role="radiogroup" aria-label="خيارات الإجابة">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <label
                  key={idx}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-sm transition-all cursor-pointer",
                    "focus-within:ring-2 focus-within:ring-cyan-400",
                    isSelected
                      ? "bg-purple-950/40 border-purple-500/50 text-white"
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80"
                  )}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    onChange={() => !isSubmitted && setSelectedOption(idx)}
                    disabled={isSubmitted}
                    className="w-4 h-4 text-purple-600 accent-purple-600 focus:ring-cyan-400"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* Type 2: True or False */}
        {isTrueFalse && (
          <div className="flex gap-4" role="radiogroup" aria-label="صواب أو خطأ">
            {[true, false].map((val, idx) => {
              const isSelected = selectedOption === val;
              const labelText = val ? "صواب (True)" : "خطأ (False)";
              return (
                <label
                  key={idx}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer",
                    isSelected
                      ? "bg-purple-950/40 border-purple-500/50 text-white"
                      : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80"
                  )}
                >
                  <input
                    type="radio"
                    name={`tf-${question.id}`}
                    checked={isSelected}
                    onChange={() => !isSubmitted && setSelectedOption(val)}
                    disabled={isSubmitted}
                    className="w-4 h-4 text-purple-600 accent-purple-600"
                  />
                  <span>{labelText}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* Type 3: Completion / Short Answer */}
        {isCompletion && (
          <div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => !isSubmitted && setTextInput(e.target.value)}
              disabled={isSubmitted}
              placeholder="اكتب الإجابة باختصار هنا..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          {!isSubmitted ? (
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              تحقق من الإجابة
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>حاول مرة أخرى</span>
            </button>
          )}
        </div>
      </form>

      {/* Feedback Banner */}
      {isSubmitted && (
        <div className={cn(
          "mt-6 p-4 rounded-xl border text-sm animate-fade-in space-y-2",
          isCorrect
            ? "bg-emerald-950/40 border-emerald-800/50 text-emerald-200"
            : "bg-red-950/40 border-red-800/50 text-red-200"
        )}>
          <div className="flex items-center gap-2 font-bold">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>إجابة صحيحة! أحسنت العمل.</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span>إجابة غير دقيقة.</span>
              </>
            )}
          </div>
          {question.explanation && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {question.explanation}
            </p>
          )}
        </div>
      )}

    </div>
  );
}