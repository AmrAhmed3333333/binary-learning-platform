"use client";

import { useState } from "react";
import { RotateCcw, Sparkles, ArrowLeft, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function BinaryPlaceValueSimulator() {
  // 8 بتات: من الفهرس 0 (اليسار - القيمة 128 أو 2^7) إلى الفهرس 7 (اليمين - القيمة 1 أو 2^0)
  // الافتراضي: 00001010 (تعادل 10 عشري)
  const [bits, setBits] = useState([0, 0, 0, 0, 1, 0, 1, 0]);

  // حساب وزن الخانة بناءً على موقعها (من اليمين 2^0 إلى اليسار 2^7)
  const getWeight = (index) => Math.pow(2, 7 - index);
  const getExponent = (index) => 7 - index;

  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
  };

  const handleReset = () => {
    setBits([0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const handlePreset10 = () => {
    // 00001010 = 8 + 2 = 10
    setBits([0, 0, 0, 0, 1, 0, 1, 0]);
  };

  const handlePreset23 = () => {
    // 00010111 = 16 + 4 + 2 + 1 = 23
    setBits([0, 0, 0, 1, 0, 1, 1, 1]);
  };

  // العمليات الحسابية
  let decimalSum = 0;
  const activeEntries = [];

  bits.forEach((bit, index) => {
    const weight = getWeight(index);
    const exp = getExponent(index);
    if (bit === 1) {
      decimalSum += weight;
      activeEntries.push({ weight, exp, index });
    }
  });

  const binaryString = bits.join("");

  // ترتيب العرض مرئيًا في RTL: اليمين هو 2^0 (index 7) واليسار هو 2^7 (index 0)
  const displayIndices = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>معمل تفاعلي لأساسيات النظام الثنائي</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            محاكي قيمة الخانات الثنائية (Place Value)
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            انقر على أي خانة لتبديل قيمتها بين 0 و 1، وراقب كيف تتغير القيمة العشرية بناءً على أوزان القوى (2^n).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePreset10}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            مثال: 10 (00001010)
          </button>
          <button
            onClick={handlePreset23}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            مثال: 23 (00010111)
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            title="إعادة تعيين إلى الصفر"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>مسح</span>
          </button>
        </div>
      </div>

      {/* Bit Cards Grid (RTL Ordered: 2^0 on right, 2^7 on left) */}
      <div className="py-8">
        <div className="text-xs font-medium text-slate-400 mb-3 flex items-center justify-between">
          <span>الخانة الكبرى (اليسار): 2^7 = 128</span>
          <span>الخانة الصغرى (اليمين): 2^0 = 1</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {displayIndices.map((index) => {
            const bit = bits[index];
            const weight = getWeight(index);
            const exp = getExponent(index);
            const isActive = bit === 1;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl border transition-all duration-200",
                  isActive
                    ? "bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-900/20"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                )}
              >
                {/* Place Value Header */}
                <span className="text-[11px] font-semibold text-purple-400 mb-1">
                  2^{exp}
                </span>
                <span className="text-sm font-bold text-slate-200 mb-3">
                  {weight}
                </span>

                {/* Interactive Bit Toggle Button */}
                <button
                  onClick={() => toggleBit(index)}
                  className={cn(
                    "w-12 h-14 rounded-lg font-mono text-2xl font-bold flex items-center justify-center transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-inner",
                    isActive
                      ? "bg-gradient-to-br from-purple-600 to-cyan-500 text-white shadow-cyan-500/20 scale-105"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  )}
                  aria-label={`الخانة ذات القيمة المكانية ${weight}، القيمة الحالية ${bit}. انقر للتبديل.`}
                >
                  {bit}
                </button>

                {/* Status indicator */}
                <span className={cn("text-[10px] mt-2 font-medium", isActive ? "text-cyan-400" : "text-slate-500")}>
                  {isActive ? `مفعل (+${weight})` : "غير مفعل (0)"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results & Step-by-Step Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#1e293b]">
        
        {/* Result Box 1: Binary & Decimal */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">القيمة الثنائية الحالية</span>
            <div className="font-mono text-2xl font-bold text-cyan-400 tracking-wider mb-4">
              {binaryString}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">المقابل بالعشري</span>
            <div className="text-3xl font-extrabold text-white flex items-baseline gap-2">
              <span>{decimalSum}</span>
              <span className="text-xs font-normal text-slate-400">(Base 10)</span>
            </div>
          </div>
        </div>

        {/* Result Box 2: Step-by-Step Addition */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Info className="w-4 h-4 text-purple-400" />
              <span>عملية الجمع خطوة بخطوة</span>
            </div>

            {activeEntries.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                جميع الخانات مساوية للصفر (0). فعّل خانة واحدة على الأقل لرؤية المجموع.
              </p>
            ) : (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                  {activeEntries.map((entry, idx) => (
                    <span key={entry.index} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40">
                        {entry.weight} (2^{entry.exp})
                      </span>
                      {idx < activeEntries.length - 1 && <span className="text-slate-500">+</span>}
                    </span>
                  ))}
                  <span className="text-slate-400">=</span>
                  <span className="text-cyan-400 font-bold text-base">{decimalSum}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  تم جمع أوزان الخانات التي تحمل القيمة <strong className="text-slate-200">1</strong> فقط، بينما الخانات التي تحمل القيمة <strong className="text-slate-200">0</strong> تساهم بصفر ولا تُضاف للمجموع.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>الخانة اليمنى تمثل 2^0 وتتضاعف القيمة كلما اتجهنا خطوة نحو اليسار ($2^1, 2^2, \dots$).</span>
          </div>
        </div>

      </div>

    </div>
  );
}