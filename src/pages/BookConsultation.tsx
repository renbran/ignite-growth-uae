import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Clock, CheckCircle2, Users, CalendarCheck, ChevronDown, Phone, MessageSquare, Star, Zap, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Only 15 Minutes",
    desc: "A focused discovery call — no fluff, no hard sell. We diagnose your bottlenecks fast.",
  },
  {
    icon: Zap,
    title: "Custom Roadmap",
    desc: "You'll leave with a concrete implementation plan tailored to your business size and industry.",
  },
  {
    icon: Shield,
    title: "Zero Obligation",
    desc: "Free, no-pressure conversation. We work only with businesses we're confident we can transform.",
  },
  {
    icon: TrendingUp,
    title: "Proven in UAE",
    desc: "Our Odoo implementations have helped 200+ UAE businesses cut manual work by up to 80%.",
  },
];

const agenda = [
  "Understand your current ERP or operational pain points",
  "Identify which Odoo modules fit your workflow",
  "Walk through our 14-day plug-and-play implementation",
  "Review pricing options and answer your questions",
  "Agree on next steps — only if it's the right fit",
];

const faqs = [
  {
    q: "Is the consultation really free?",
    a: "Yes, completely. The 15-minute discovery call costs nothing. We use it to understand your needs and see if we're a good fit — no commitment required on either side.",
  },
  {
    q: "Who will I speak with?",
    a: "You'll speak directly with one of our senior Odoo implementation consultants — not a sales rep. They'll have real answers to technical and business questions.",
  },
  {
    q: "What should I prepare?",
    a: "Nothing specific. It helps to think about your biggest operational headache (invoicing delays, manual data entry, lack of visibility, etc.) so we can focus the conversation.",
  },
  {
    q: "What happens after the call?",
    a: "If there's a fit, we'll send a tailored proposal within 24 hours. If not, we'll point you to the right resource anyway — our reputation depends on honest advice.",
  },
];

const BookConsultation = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const w = window as any;

    // Clear previous embed content and Cal state
    const container = document.getElementById("my-cal-inline-15min");
    if (container) container.innerHTML = "";
    if (w.Cal) delete w.Cal;
    const oldScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
    if (oldScript) oldScript.remove();

    // Official Cal.com queue snippet — MUST run synchronously before any Cal() calls.
    // This sets up window.Cal as a queue function. When Cal("init",...) is called,
    // the snippet self-loads embed.js and queues the commands; embed.js processes them on load.
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar); };
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = document.createElement("script");
          s.async = true;
          s.src = A;
          document.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, [L, namespace, ar[2]]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = w.Cal;

    // These calls are queued immediately and processed once embed.js finishes loading
    Cal("init", "15min", { origin: "https://app.cal.com" });

    Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink: "sgctechai/15min",
    });

    Cal.ns["15min"]("ui", {
      cssVarsPerTheme: {
        dark: {
          "cal-brand": "#C9A84C",
          "cal-brand-emphasis": "#B8942A",
          "cal-brand-text": "#0D1B2A",
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
      theme: "dark",
    });

    return () => {
      const container = document.getElementById("my-cal-inline-15min");
      if (container) container.innerHTML = "";
      if (w.Cal) delete w.Cal;
      const script = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="page-container min-h-screen relative">
      <SEO
        title="Book a Free Odoo ERP Consultation — 15-Min Discovery Call"
        description="Schedule a free 15-minute consultation with an SGC TECH AI Odoo expert. Discuss your real estate or business ERP needs and get a custom implementation roadmap."
        keywords="book Odoo consultation, free ERP consultation UAE, Odoo implementation consultation, ERP discovery call, Odoo expert UAE"
        canonical="https://sgtech.ai/book-consultation"
      />
      <BackgroundAnimation />
      <Header />

      <main className="pt-24 pb-20 relative z-10">

        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                <CalendarCheck className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-gold tracking-wide">Free 15-Minute Discovery Call</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Let's Find Out If{" "}
                <span className="text-gradient">Odoo Is Right</span>{" "}
                for Your Business
              </h1>

              <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
                Book a focused, no-obligation call with an SGC TECH AI consultant. In 15 minutes
                we'll map your pain points, walk through our 14-day implementation model, and tell
                you honestly whether we're the right fit.
              </p>

              {/* Benefit pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-3 glass rounded-xl p-4">
                    <b.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{b.title}</p>
                      <p className="text-xs text-foreground-muted leading-relaxed mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof bar */}
              <div className="flex items-center gap-4 text-sm text-foreground-muted">
                <div className="flex -space-x-2">
                  {["Khalid A", "Sara M", "Omar R", "Priya N"].map((name) => (
                    <img
                      key={name}
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D1B2A&color=C9A84C&size=32&bold=true&font-size=0.45`}
                      alt={name}
                      className="w-8 h-8 rounded-full ring-2 ring-background"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                    <span className="font-semibold text-foreground ml-1">5.0</span>
                  </div>
                  <span>200+ businesses transformed across UAE</span>
                </div>
              </div>
            </div>

            {/* Right — what we'll cover */}
            <div className="animate-fade-in">
              <div className="glass rounded-2xl p-8 border border-gold/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-foreground">What We'll Cover</h2>
                    <p className="text-xs text-foreground-muted">15 minutes, structured agenda</p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {agenda.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-foreground-muted">
                      Prefer WhatsApp?{" "}
                      <a
                        href="https://wa.me/971585531029"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline font-medium"
                      >
                        Message us directly
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm mt-3">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-foreground-muted">Available slots for UAE & GCC time zones</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm mt-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-foreground-muted">Confirmation email sent immediately after booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Calendar Embed ──────────────────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
              Pick a Time That Works for You
            </h2>
            <p className="text-foreground-muted">
              All slots are in Gulf Standard Time (GST, UTC+4). Remote call via Google Meet or Teams.
            </p>
          </div>

          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="glass rounded-2xl border border-white/10 overflow-hidden p-2 sm:p-4">
              <div
                id="my-cal-inline-15min"
                style={{ width: "100%", minHeight: "600px", overflow: "scroll" }}
              />
            </div>
          </div>
        </section>

        {/* ─── Industry strip ──────────────────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <p className="text-center text-xs uppercase tracking-widest text-foreground-subtle mb-6 font-semibold">
            Trusted by businesses across
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Real Estate", "Construction", "Manufacturing", "Healthcare", "Hospitality", "Retail & E-commerce", "Professional Services"].map((industry) => (
              <span
                key={industry}
                className="glass border border-white/10 text-foreground-muted text-sm font-medium px-5 py-2 rounded-full"
              >
                {industry}
              </span>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────── */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-bold text-gradient mb-3">Common Questions</h2>
            <p className="text-foreground-muted">Everything you need to know before booking.</p>
          </div>

          <div className="space-y-3 animate-fade-in">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl border border-white/10 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-foreground text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-foreground-muted leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default BookConsultation;
