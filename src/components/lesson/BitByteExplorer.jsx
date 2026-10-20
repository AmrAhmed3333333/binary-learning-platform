"use client";

import { useState } from "react";
import { Database, Binary, Layers, ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BitByteExplorer() {
  const [activeTab, setActiveTab] = useState("bits"); // 'bits' | 'byte' | 'storage'
  
  // Bits Explorer state (1 to 8 bits)
  const [nBits, setNBits] = useState(3);

  // Storage Converter state
  const [storageValue, setStorageValue] = useState(2);
  const [fromUnit, setFromUnit] = useState("GB"); // KB, MB, GB, TB
  const [toUnit, setToUnit] = useState("MB");

  // Calculations for Bits
  const totalCombinations = Math.pow(2, nBits);

  // Generate sample patterns based on nBits
  const getSamplePatterns = (bits) => {
    const samples = [];
    const count = Math.min(totalCombinations, 8); // عرض عينة بحد أقصى 8 أنماط
    for (let i = 0; i < count; i++) {
      const binStr = i.toString(2).padStart(bits, '0');
      samples.push(binStr);
    }
    return samples;
  };

  // Storage unit multipliers relative to Bytes
  const unitsMap = {
    Byte: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  const convertStorage = () => {
    const val = parseFloat(storageValue) || 0;
    const bytesInval = val * unitsMap[fromUnit];
    const result = bytesInval / unitsMap[toUnit];
    return result % 1 === 0 ? result : result.toFixed(2);
  };

  return (
    <div className="w-full bg-[#111827] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>مستكشف الـ Bit والـ Byte وحدات التخزين</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
            الرحلة الرقمية: من الخانة الصغرى إلى السعات الضخمة
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            استكشف كيف يتعامل الحاسوب مع البيانات، وقياس الاحتمالات، ومضاعفات التخزين (الصفحات 64-67).
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("bits")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              activeTab === "bits"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Binary className="w-4 h-4" />
            <span>مستكشف البتات ($2^n$)</span>
          </button>
          <button
            onClick={() => setActiveTab("byte")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              activeTab === "byte"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Layers className="w-4 h-4" />
            <span>البايت (Byte)</span>
          </button>
          <button
            onClick={() => setActiveTab("storage")}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              activeTab === "storage"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <Database className="w-4 h-4" />
            <span>وحدات التخزين</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Bits Explorer ($2^n$) */}
      {activeTab === "bits" && (
        <div className="py-6 space-y-6 animate-fade-in">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">ما هو الـ Bit وعدد الاحتمالات؟</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              الـ <strong className="text-white">Bit</strong> هو اختصار لـ Binary Digit (خانة ثنائية)، وهو أصغر وحدة قياس للبيانات في الحاسوب. باستخدام عدد <strong className="text-white">n</strong> من البتات، يمكننا توليد <strong className="text-cyan-400">2^n</strong> من الاحتمالات المختلفة.
            </p>
          </div>

          {/* Interactive Slider for n Bits */}
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label htmlFor="bits-slider" className="text-sm font-semibold text-slate-200 block mb-1">
                  اختر عدد البتات (n): <span className="text-cyan-400 font-mono text-lg font-bold">{nBits} bits</span>
                </label>
                <p className="text-xs text-slate-400">اسحب لتغيير عدد البتات ومراقبة تضاعف الاحتمالات.</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
                  <button
                    key={val}
                    onClick={() => setNBits(val)}
                    className={cn(
                      "w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                      nBits === val
                        ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <input
              id="bits-slider"
              type="range"
              min="1"
              max="8"
              value={nBits}
              onChange={(e) => setNBits(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-slate-400 mb-1">المعادلة الحسابية:</span>
                <div className="font-mono text-lg font-bold text-purple-300">
                  2^{nBits} = {totalCombinations} احتمالاً مختلفاً
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  لاحظ أن زيادة عدد البتات بمقدار 1 تضاعف عدد الاحتمالات المتاحة فوراً.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-slate-400 mb-2 block">عينة من الأنماط الثنائية الممكنة ({totalCombinations} إجمالاً):</span>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {getSamplePatterns(nBits).map((pattern, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40">
                      {pattern}
                    </span>
                  ))}
                  {totalCombinations > 8 && (
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400">
                      ... (والمزيد)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Byte Explorer */}
      {activeTab === "byte" && (
        <div className="py-6 space-y-6 animate-fade-in">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">ما هو البايت (Byte) وكيف يُستخدم؟</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              البايت (<strong className="text-white">Byte</strong>) يتكون من <strong className="text-cyan-400">8 bits</strong> متجاورات. وهو الوحدة الأساسية الشائعة لقياس سعة تخزين الملفات وحجم النصوص في الحاسوب.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs text-purple-400 font-semibold block mb-1">التركيب الأساسي</span>
                <h5 className="text-lg font-bold text-white mb-2">1 Byte = 8 Bits</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  بجمع 8 خانات ثنائية معاً، نحصل على بايت واحد قادر على حمل نمط بيانات مفرد.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs text-cyan-400">
                0 1 0 0 0 0 0 1 (مثال لحرف A)
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs text-purple-400 font-semibold block mb-1">عدد الاحتمالات</span>
                <h5 className="text-lg font-bold text-white mb-2">2^8 = 256 احتمالاً</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  باستخدام 8 بتات، يمكننا تمثيل 256 قيمة مختلفة (من 0 إلى 255)، وهو ما يكفي لتمثيل كافة الحروف الإنجليزية والرموز الخاصة وفق جدول الترميز (مثل ASCII).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>كافٍ لتخزين حرف أو رمز واحد.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs text-purple-400 font-semibold block mb-1">ملاحظة هامة</span>
                <h5 className="text-lg font-bold text-white mb-2">طبيعة الترميز</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  الأنماط الثنائية لا تمثل الحروف أو الصور بشكل مباشر بذاتها، بل تعتمد على <strong className="text-white">طريقة الترميز</strong> المتبعة التي يترجمها النظام إلى حروف أو ألوان.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-amber-400">
                * الحروف العربية أو الصور تتطلب بايتات متعددة.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Storage Units Explorer */}
      {activeTab === "storage" && (
        <div className="py-6 space-y-6 animate-fade-in">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">وحدات قياس السعة التخزينية (وفق الكتاب المدرسي):</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تتدرج وحدات قياس التخزين بناءً على معامل المضاعفة <strong className="text-cyan-400">1024</strong> ($2^{10}$). كل وحدة تزيد عن سابقتها بهذا المقدار:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">1 KB = 1024 Bytes</div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">1 MB = 1024 KB</div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">1 GB = 1024 MB</div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">1 TB = 1024 GB</div>
            </div>
          </div>

          {/* Interactive Storage Calculator */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-6 space-y-6">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>حاسبة التحويل بين وحدات التخزين</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">القيمة والوحدة الأصلية</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={storageValue}
                    onChange={(e) => setStorageValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    aria-label="الوحدة الأصلية"
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Byte">Byte</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                    <option value="TB">TB</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 sm:rotate-0" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">التحويل إلى وحدة</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  aria-label="التحويل إلى وحدة"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-cyan-400"
                >
                  <option value="Byte">Byte</option>
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between font-mono">
              <span className="text-xs text-slate-400">الناتج الحسابي الدقيق:</span>
              <span className="text-xl font-bold text-cyan-400">
                {storageValue} {fromUnit} = {convertStorage()} {toUnit}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}