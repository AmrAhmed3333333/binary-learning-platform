"use client";

import { useState } from "react";
import { ArrowRightLeft, Calculator, AlertCircle, CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConversionWorkbench() {
  const [mode, setMode] = useState("decimalToBinary"); // 'decimalToBinary' | 'binaryToDecimal'
  
  // Decimal to Binary states
  const [decimalInput, setDecimalInput] = useState("11");
  const [d2bResult, setD2bResult] = useState(null);
  const [d2bError, setD2bError] = useState("");

  // Binary to Decimal states
  const [binaryInput, setBinaryInput] = useState("1011");
  const [b2dResult, setB2dResult] = useState(null);
  const [b2dError, setB2dError] = useState("");

  // خوارزمية التحويل من عشري إلى ثنائي مع عرض خطوات القسمة المتكررة
  const handleDecimalToBinarySubmit = (e) => {
    e.preventDefault();
    setD2bError("");
    setD2bResult(null);

    const trimmed = decimalInput.trim();
    if (trimmed === "") {
      setD2bError("الرجاء إدخال عدد صحيح.");
      return;
    }

    // التحقق من صحة الأعداد الصحيحة غير السالبة
    if (!/^\d+$/.test(trimmed)) {
      setD2bError("الرجاء إدخال أعداد صحيحة موجبة فقط (بدون كسور أو إشارات سالبة).");
      return;
    }

    const num = parseInt(trimmed, 10);
    if (isNaN(num)) {
      setD2bError("قيمة غير صالحة.");
      return;
    }

    if (num > 10000) {
      setD2bError("الرجاء إدخال عدد أقل من أو يساوي 10000 لتجنب طول العرض.");
      return;
    }

    // حالة الصفر الخاصة
    if (num === 0) {
      setD2bResult({
        original: 0,
        steps: [{ quotient: 0, remainder: 0, explanation: "العدد 0 يعادل 0 في النظام الثنائي." }],
        binary: "0"
      });
      return;
    }

    let current = num;
    const steps = [];
    const remainders = [];

    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      steps.push({
        dividend: current,
        quotient,
        remainder,
        explanation: `${current} ÷ 2 = ${quotient} والباقي (${remainder})`
      });
      remainders.push(remainder);
      current = quotient;
    }

    // البواقي تُقرأ من الأسفل للأعلى (أو عكس مصفوفة الخطوات)
    const binaryStr = [...remainders].reverse().join("");

    setD2bResult({
      original: num,
      steps,
      binary: binaryStr
    });
  };

  // خوارزمية التحويل من ثنائي إلى عشري مع عرض الأوزان والقوى
  const handleBinaryToDecimalSubmit = (e) => {
    e.preventDefault();
    setB2dError("");
    setB2dResult(null);

    const trimmed = binaryInput.trim();
    if (trimmed === "") {
      setB2dError("الرجاء إدخال سلسلة ثنائية.");
      return;
    }

    if (!/^[01]+$/.test(trimmed)) {
      setB2dError("السلسلة الثنائية يجب أن تتكون من الأرقام (0) و (1) فقط.");
      return;
    }

    if (trimmed.length > 16) {
      setB2dError("الحد الأقصى المسموح به هو 16 خانة (Bit).");
      return;
    }

    let sum = 0;
    const breakdown = [];
    const length = trimmed.length;

    for (let i = 0; i < length; i++) {
      const bitChar = trimmed[length - 1 - i]; // من اليمين (2^0) إلى اليسار
      const bitVal = parseInt(bitChar, 10);
      const weight = Math.pow(2, i);
      const product = bitVal * weight;
      sum += product;

      breakdown.push({
        position: i,
        weight,
        bit: bitVal,
        product
      });
    }

    // لعرض الجدول مرتباً من اليسار لليمين أو حسب الأوزان
    setB2dResult({
      original: trimmed,
      breakdown: breakdown.reverse(), // لترتيب العرض تصاعدياً من الأكبر للأصغر أو حسب الخانات
      decimal: sum
    });
  };

  // أمثلة سريعة للتجربة
  const loadPresetDecimal = (val) => {
    setDecimalInput(val.toString());
    setD2bError("");
    setD2bResult(null);
  };

  const loadPresetBinary = (val) => {
    setBinaryInput(val);
    setB2dError("");
    setB2dResult(null);
  };

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>مختبر التحويل الرياضي المتقدم</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            أداة تحويل الأعداد بين النظامين العشري والثنائي
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            تطبيق عملي خطوة بخطوة للتحويلات وفق مقررات الفصل الدراسي (الصفحات 64-67).
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setMode("decimalToBinary")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              mode === "decimalToBinary"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            من عشري إلى ثنائي
          </button>
          <button
            onClick={() => setMode("binaryToDecimal")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              mode === "binaryToDecimal"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            من ثنائي إلى عشري
          </button>
        </div>
      </div>

      {/* MODE 1: Decimal to Binary Workbench */}
      {mode === "decimalToBinary" && (
        <div className="py-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">طريقة القسمة المتكررة على 2:</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              نقوم بقسمة العدد العشري على 2 والاحتفاظ بالباقي ($0$ أو $1$). نستمر في قسمة الناتج على 2 حتى يصل إلى الصفر، ثم نقرأ البواقي من <strong className="text-white">الأسفل للأعلى</strong> (أو بالترتيب العكسي لظهورها) لتمثل العدد الثنائي.
            </p>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">تجربة أمثلة الكتاب:</span>
              <button onClick={() => loadPresetDecimal(6)} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors">6</button>
              <button onClick={() => loadPresetDecimal(11)} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors">11</button>
              <button onClick={() => loadPresetDecimal(39)} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors">39</button>
              <button onClick={() => loadPresetDecimal(120)} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors">120</button>
            </div>
          </div>

          <form onSubmit={handleDecimalToBinarySubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="dec-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                أدخل عدداً صحيحاً عشرياً (مثال: 39)
              </label>
              <input
                id="dec-input"
                type="text"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="أدخل عدداً موجباً..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
            <div className="sm:self-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>تحويل إلى ثنائي</span>
              </button>
            </div>
          </form>

          {/* Error Message */}
          {d2bError && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{d2bError}</span>
            </div>
          )}

          {/* Result Display */}
          {d2bResult && (
            <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-6 space-y-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400">العدد العشري المدخل:</span>
                  <div className="text-xl font-bold text-white">{d2bResult.original}</div>
                </div>
                <div className="sm:text-left">
                  <span className="text-xs text-slate-400">الناتج الثنائي النهائي:</span>
                  <div className="text-2xl font-mono font-extrabold text-cyan-400 tracking-wider">
                    {d2bResult.binary}₂
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>خطوات القسمة المتكررة والبواقي:</span>
                </h5>
                <div className="space-y-2 overflow-x-auto">
                  {d2bResult.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-sm">
                      <span className="text-slate-300">{step.explanation}</span>
                      <span className="px-2.5 py-1 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40 font-bold">
                        الباقي: {step.remainder}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  * لقراءة الناتج النهائي، نقرأ البواقي من الأسفل للأعلى (من أحدث قسمة إلى أول قسمة)، ليكون الناتج الثنائي هو: <strong className="text-cyan-400">{d2bResult.binary}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: Binary to Decimal Workbench */}
      {mode === "binaryToDecimal" && (
        <div className="py-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">طريقة جمع أوزان الخانات وقوى العدد 2:</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              لكل خانة ثنائية (من اليمين لليسار)، نضرب قيمة البت ($0$ أو $1$) في وزن موضعه ($2^0, 2^1, 2^2, \dots$) ثم نجمع نواتج الضرب للحصول على القيمة العشرية المكافئة.
            </p>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">تجربة أمثلة الكتاب:</span>
              <button onClick={() => loadPresetBinary("110")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition-colors">110</button>
              <button onClick={() => loadPresetBinary("1010")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition-colors">1010</button>
              <button onClick={() => loadPresetBinary("100111")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition-colors">100111</button>
              <button onClick={() => loadPresetBinary("101011")} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition-colors">101011</button>
            </div>
          </div>

          <form onSubmit={handleBinaryToDecimalSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="bin-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                أدخل سلسلة ثنائية تتكون من 0 و 1 (مثال: 101011)
              </label>
              <input
                id="bin-input"
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                placeholder="أدخل أرقام ثنائية..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
            <div className="sm:self-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>تحويل إلى عشري</span>
              </button>
            </div>
          </form>

          {/* Error Message */}
          {b2dError && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{b2dError}</span>
            </div>
          )}

          {/* Result Display */}
          {b2dResult && (
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-6 space-y-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400">السلسلة الثنائية المدخلة:</span>
                  <div className="text-xl font-mono font-bold text-cyan-400">{b2dResult.original}₂</div>
                </div>
                <div className="sm:text-left">
                  <span className="text-xs text-slate-400">المقابل بالعشري:</span>
                  <div className="text-2xl font-extrabold text-white">
                    {b2dResult.decimal}₁₀
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تفصيل الأوزان وقوى العدد 2:</span>
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {b2dResult.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg text-center font-mono">
                      <div className="text-[10px] text-purple-400 mb-1">2^{item.position} = {item.weight}</div>
                      <div className="text-sm font-bold text-white mb-1">
                        {item.bit} × {item.weight}
                      </div>
                      <div className="text-xs text-cyan-400 font-semibold">= {item.product}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong>المجموع النهائي:</strong> {b2dResult.breakdown.map(i => i.product).join(" + ")} = <strong className="text-cyan-400 text-sm">{b2dResult.decimal}</strong>.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}