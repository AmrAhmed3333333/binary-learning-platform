import "./globals.css";

export const metadata = {
  title: {
    default: "مختبر النظام الثنائي | المنصة التعليمية الرقمية",
    template: "%s | مختبر النظام الثنائي"
  },
  description: "منصة تعليمية تفاعلية لطلاب المرحلة الثانوية لتبسيط أساسيات الحاسوب، النظام الثنائي، ووحدات التخزين الرقمية بطريقة ممتعة وشيقة.",
  keywords: ["النظام الثنائي", "تكنولوجيا المعلومات", "الصف الأول الثانوي", "تعليم رقمي", "وحدات التخزين"],
  authors: [{ name: "عمرو أحمد مصطفى" }],
  creator: "قسم تكنولوجيا التعليم - جامعة عين شمس"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="bg-[#090d16] text-[#f8fafc] antialiased min-h-screen flex flex-col selection:bg-purple-600 selection:text-white">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}