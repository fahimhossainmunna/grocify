import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: [
      { heading: "Personal Information", text: "When you create an account or place an order, we collect your name, email address, phone number, and delivery address." },
      { heading: "Payment Information", text: "We do not store your full card details. All payment data is processed securely through PCI-DSS compliant payment gateways (Stripe, PayPal)." },
      { heading: "Usage Data", text: "We automatically collect information about how you interact with our website, including pages visited, time spent, items viewed, and search queries." },
      { heading: "Device Information", text: "We may collect device type, browser type, IP address, and operating system to improve your experience and ensure security." },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      { heading: "Order Fulfillment", text: "Your personal details are used to process and deliver your orders, send order confirmations, and handle customer support requests." },
      { heading: "Personalization", text: "We use your browsing and purchase history to recommend products we think you'll love and to personalize your shopping experience." },
      { heading: "Communications", text: "With your consent, we may send you promotional emails, newsletters, and special offers. You can unsubscribe at any time." },
      { heading: "Security & Fraud Prevention", text: "We use your data to detect and prevent fraudulent transactions, unauthorized access, and other illegal activities." },
    ],
  },
  {
    title: "3. Sharing Your Information",
    content: [
      { heading: "Delivery Partners", text: "We share your name and address with our delivery partners solely to fulfill your order. They are not permitted to use this data for any other purpose." },
      { heading: "Payment Processors", text: "Payment information is shared with our payment partners (Stripe, PayPal) to process transactions securely." },
      { heading: "No Third-Party Marketing", text: "We never sell, rent, or trade your personal information to third-party marketers. Your data is yours." },
      { heading: "Legal Requirements", text: "We may disclose your information if required by law, court order, or government authority." },
    ],
  },
  {
    title: "4. Cookies & Tracking",
    content: [
      { heading: "Essential Cookies", text: "These are required for the website to function properly, including keeping items in your cart and maintaining your login session." },
      { heading: "Analytics Cookies", text: "We use anonymized analytics (Google Analytics) to understand how visitors use our site so we can improve it." },
      { heading: "Preference Cookies", text: "These remember your settings such as language, currency, and display preferences for a better experience." },
      { heading: "Managing Cookies", text: "You can control and delete cookies through your browser settings. Note that disabling cookies may affect some website functionality." },
    ],
  },
  {
    title: "5. Your Rights",
    content: [
      { heading: "Access Your Data", text: "You have the right to request a copy of all personal data we hold about you. Contact us at privacy@grocify.fresh." },
      { heading: "Update or Correct", text: "You can update your personal information at any time through your Profile page or by contacting our support team." },
      { heading: "Delete Your Account", text: "You may request deletion of your account and all associated data. Some data may be retained for legal and financial record-keeping purposes." },
      { heading: "Opt-Out", text: "You can opt out of marketing emails at any time using the unsubscribe link in any email, or by updating your notification preferences in Settings." },
    ],
  },
  {
    title: "6. Data Security",
    content: [
      { heading: "Encryption", text: "All data transmitted between your browser and our servers is encrypted using 256-bit SSL/TLS encryption." },
      { heading: "Secure Storage", text: "Personal data is stored on secure servers with restricted access. We conduct regular security audits and vulnerability assessments." },
      { heading: "Breach Notification", text: "In the unlikely event of a data breach, we will notify affected users and relevant authorities within 72 hours as required by law." },
    ],
  },
  {
    title: "7. Children's Privacy",
    content: [
      { heading: "Age Restriction", text: "Our services are not directed at individuals under the age of 13. We do not knowingly collect personal information from children." },
      { heading: "Parental Control", text: "If you believe your child has provided us with personal information, please contact us immediately and we will delete it promptly." },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      { heading: "Updates", text: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our website." },
      { heading: "Continued Use", text: "Your continued use of Grocify after any changes constitutes your acceptance of the updated Privacy Policy." },
    ],
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-zinc-50">
    {/* Hero */}
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5">
          🔒 Privacy
        </div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto mb-4">
          We take your privacy seriously. This policy explains how Grocify collects, uses, and protects your personal information.
        </p>
        <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 text-xs text-zinc-500 shadow-sm">
          <span>📅</span> Last updated: March 10, 2026
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-14">

      {/* Quick summary */}
      <div className="bg-white rounded-3xl border border-zinc-100 p-8 mb-12 shadow-sm">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold text-zinc-800 mb-5">
          🌿 Our Privacy Promise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🚫", text: "We never sell your personal data" },
            { icon: "🔐", text: "All data is encrypted & secured" },
            { icon: "📧", text: "You control your email preferences" },
            { icon: "🗑️", text: "You can delete your data anytime" },
            { icon: "🤝", text: "We share only what's necessary" },
            { icon: "👁️", text: "Full transparency on data use" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium text-zinc-700">
              <span>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-7 mb-12">
        <h3 className="text-sm font-bold text-zinc-700 mb-4 uppercase tracking-wider">Table of Contents</h3>
        <ol className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SECTIONS.map((s, i) => (
            <li key={i}>
              {/* in-page hash links — <a href="#"> is correct here, not <Link> */}
              <a href={`#section-${i}`} className="text-sm text-orange-600 hover:text-orange-700 no-underline hover:underline font-medium">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {SECTIONS.map((section, si) => (
          <div key={si} id={`section-${si}`} className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm scroll-mt-24">
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold text-zinc-800 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full flex-shrink-0"/>
              {section.title}
            </h2>
            <div className="flex flex-col gap-5">
              {section.content.map((item, ci) => (
                <div key={ci} className="pl-5 border-l-2 border-zinc-100">
                  <div className="text-sm font-bold text-zinc-700 mb-1">{item.heading}</div>
                  <div className="text-sm text-zinc-500 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 text-center text-white">
        <div className="text-3xl mb-3">📬</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold mb-2">Privacy Questions?</h3>
        <p className="text-orange-100 text-sm mb-2">Contact our Privacy Team at</p>
        <p className="text-white font-bold text-base mb-6">privacy@grocify.fresh</p>
        <p className="text-orange-200 text-xs">Grocify Fresh · 42 Green Market Street, Farm District, NY 10001</p>
      </div>

    </div>
  </div>
);

export default PrivacyPolicy;