import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLead } from "@/hooks/useQueries";
import {
  Box,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  Handshake,
  Image,
  Instagram,
  Layers,
  Layout,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Printer,
  ShieldCheck,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const PHONE = "07014184682";
const WHATSAPP_URL = "https://wa.me/917014184682";
const TEL_HREF = `tel:${PHONE}`;

const services = [
  {
    icon: <Printer className="w-7 h-7" />,
    title: "Flex Printing",
    desc: "Large format banners for shops, events & outdoor advertising. Durable, weather-proof, vibrant colors.",
    color: "from-blue-600 to-indigo-700",
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "Visiting Card Printing",
    desc: "Premium quality cards that make lasting first impressions. Glossy, matte, and custom finishes available.",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Pamphlet Printing",
    desc: "Eye-catching pamphlets for promotions and announcements. Full color, single or double-sided.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: "Screen Printing",
    desc: "Durable screen printing on fabric, boards, and more. Ideal for bulk orders and uniforms.",
    color: "from-purple-600 to-violet-700",
  },
  {
    icon: <Image className="w-7 h-7" />,
    title: "HD Room Wallpaper",
    desc: "Transform your walls with stunning HD printed wallpapers. Custom sizes and designs.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: <Layout className="w-7 h-7" />,
    title: "Sunpack Sheet Printing",
    desc: "Lightweight, weather-resistant signage for all needs. Perfect for shops and events.",
    color: "from-cyan-500 to-sky-600",
  },
  {
    icon: <Box className="w-7 h-7" />,
    title: "3D Printing",
    desc: "Precision 3D printing with castable resins for prototypes, jewelry, and custom objects.",
    color: "from-indigo-500 to-blue-600",
  },
];

const whyChoose = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    label: "High Quality Printing",
    sub: "Premium materials & inks",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    label: "Affordable Pricing",
    sub: "Competitive local rates",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    label: "Fast Turnaround",
    sub: "Same day options available",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    label: "Custom Design Support",
    sub: "In-house design help",
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    label: "Trusted Local Business",
    sub: "Serving Sangaria for years",
  },
];

const galleryItems = [
  { label: "Flex Banners", color: "from-blue-500 to-indigo-600", icon: "🏷️" },
  {
    label: "Business Cards",
    color: "from-orange-400 to-amber-500",
    icon: "💼",
  },
  { label: "Shop Signage", color: "from-emerald-500 to-green-600", icon: "🏪" },
  { label: "HD Wallpapers", color: "from-pink-500 to-rose-500", icon: "🖼️" },
  { label: "Pamphlets", color: "from-purple-500 to-violet-600", icon: "📄" },
  { label: "Sunpack Boards", color: "from-cyan-500 to-teal-500", icon: "📋" },
];

const reviews = [
  {
    text: "Got our shop banners made here. Quality is excellent and delivery was super fast! Will definitely come back for all our printing needs.",
    name: "Ramesh Kumar",
    role: "Shop Owner",
    rating: 5,
    initials: "RK",
  },
  {
    text: "Best visiting cards in Sangaria! Very affordable and professional design. All my clients love the quality of my business cards.",
    name: "Priya Sharma",
    role: "Event Planner",
    rating: 5,
    initials: "PS",
  },
  {
    text: "We use New Heaven Printers for all our business printing needs. Consistent quality, great prices, and always on time. Highly recommended!",
    name: "Anil Enterprises",
    role: "Local Business",
    rating: 5,
    initials: "AE",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function StarRating({ count = 5 }: { count?: number }) {
  const stars = [1, 2, 3, 4, 5].slice(0, count);
  return (
    <span className="flex gap-0.5">
      {stars.map((n) => (
        <Star key={n} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </span>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const contactRef = useRef<HTMLElement>(null);
  const submitLead = useSubmitLead();

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitLead.mutateAsync(formData);
      setSubmitted(true);
      toast.success("Quote request sent! We'll contact you shortly.");
    } catch {
      toast.error("Something went wrong. Please try calling us directly.");
    }
  };

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster />

      {/* STICKY NAV */}
      <header
        data-ocid="nav.panel"
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <Printer className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg text-primary leading-tight">
              New Heaven <span className="text-accent">Printers</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-ocid="nav.link"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href={TEL_HREF} data-ocid="nav.primary_button">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Now
              </Button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-foreground"
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setNavOpen(false)}
                    data-ocid="nav.link"
                    className="text-sm font-medium text-foreground py-2 border-b border-border last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <a href={TEL_HREF} className="mt-1">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        data-ocid="hero.section"
        className="relative pt-16 min-h-[92vh] flex items-center overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x600.jpg"
            alt="Printing services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-indigo-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-white text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" /> Sadar Bazar, Sangaria –
                Rajasthan
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5"
            >
              Professional Printing{" "}
              <span className="text-accent">Services</span> in Sangaria
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed"
            >
              Custom printing solutions for businesses, events, and home décor.
              Fast turnaround. Affordable prices.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href={TEL_HREF} data-ocid="hero.primary_button">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 shadow-lg"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white bg-white/10 hover:bg-white/20 font-semibold gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-white text-primary hover:bg-white/90 font-semibold gap-2"
                data-ocid="hero.button"
              >
                Get a Quote
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {[
                { icon: "⭐", label: "4.8 Rating" },
                { icon: "⚡", label: "Fast Delivery" },
                { icon: "📍", label: "Local Trusted Printer" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-white text-sm font-medium"
                >
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        data-ocid="services.section"
        className="py-20 bg-secondary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
              What We Offer
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Our Printing Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From flex banners to 3D printing — we cover all your printing
              needs under one roof.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i % 4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-ocid={`services.item.${i + 1}.card`}
                className="bg-card rounded-xl shadow-card hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                <div className="p-5">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4`}
                  >
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <Button
                    size="sm"
                    onClick={scrollToContact}
                    data-ocid={`services.item.${i + 1}.button`}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs"
                  >
                    Get Quote
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section data-ocid="whychoose.section" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
              Our Strengths
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Why Choose New Heaven Printers?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whyChoose.map((w, i) => (
              <motion.div
                key={w.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-secondary hover:shadow-card transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {w.icon}
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
                    {w.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{w.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        data-ocid="gallery.section"
        className="py-20 bg-secondary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
              Our Work
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Gallery & Portfolio
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See the quality and variety of printing work we deliver for our
              customers.
            </p>
          </motion.div>

          {/* Featured collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl overflow-hidden shadow-card mb-8 aspect-video max-h-80"
          >
            <img
              src="/assets/generated/gallery-collage.dim_800x600.jpg"
              alt="Gallery collage of printed materials"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Grid placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((g, i) => (
              <motion.div
                key={g.label}
                custom={i % 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-ocid={`gallery.item.${i + 1}.card`}
                className={`relative overflow-hidden rounded-xl aspect-video bg-gradient-to-br ${g.color} flex flex-col items-center justify-center gap-2 shadow-card cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <span className="text-4xl">{g.icon}</span>
                <span className="text-white font-display font-bold text-sm sm:text-base">
                  {g.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section data-ocid="reviews.section" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
              Customer Reviews
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                4.8 / 5
              </span>
              <span className="text-muted-foreground text-sm">
                Based on customer satisfaction
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                data-ocid={`reviews.item.${i + 1}.card`}
                className="bg-card rounded-xl p-6 shadow-card border border-border flex flex-col gap-4"
              >
                <StarRating count={r.rating} />
                <p className="text-foreground/80 text-sm leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA */}
      <section
        data-ocid="cta.section"
        className="py-20 bg-primary relative overflow-hidden"
      >
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4"
            >
              Need Printing Today?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg mb-10 max-w-xl mx-auto"
            >
              Call us or send a WhatsApp message and get your order started in
              minutes.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a href={TEL_HREF} data-ocid="cta.primary_button">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 text-base"
                >
                  <Phone className="w-5 h-5" /> Call {PHONE}
                </Button>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="cta.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white bg-white/10 hover:bg-white/20 font-semibold gap-2 text-base"
                >
                  <MessageCircle className="w-5 h-5" /> Send WhatsApp
                </Button>
              </a>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-white text-primary hover:bg-white/90 font-bold gap-2 text-base"
                data-ocid="cta.button"
              >
                📋 Request Quote
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact"
        data-ocid="contact.section"
        className="py-20 bg-secondary"
        ref={contactRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
                Contact Us
              </p>
              <h2 className="section-heading text-3xl sm:text-4xl mb-5">
                Get Your Free Quote
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill in the form and we'll get back to you quickly with pricing
                and details. Or reach us directly by phone or WhatsApp.
              </p>
              <div className="space-y-5">
                <a href={TEL_HREF} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-semibold text-foreground">{PHONE}</p>
                  </div>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-semibold text-foreground">
                      +91 70141 84682
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground text-sm">
                      Sadar Bazar, Sangaria – 335063
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Near Master Harikarisan Plywood
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card border border-border">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      data-ocid="contact.success_state"
                      className="text-center py-10"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-display font-bold text-xl text-foreground mb-2">
                        Quote Request Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        We'll contact you shortly to discuss your printing
                        needs.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                      >
                        Submit Another Request
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <h3 className="font-display font-bold text-xl text-foreground mb-1">
                        Request a Quote
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        All fields marked * are required.
                      </p>

                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          data-ocid="contact.input"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          data-ocid="contact.input"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              phone: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="service">Service Needed *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(v) =>
                            setFormData((p) => ({ ...p, service: v }))
                          }
                        >
                          <SelectTrigger
                            id="service"
                            data-ocid="contact.select"
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Flex Printing">
                              Flex Printing
                            </SelectItem>
                            <SelectItem value="Visiting Card">
                              Visiting Card
                            </SelectItem>
                            <SelectItem value="Pamphlet">Pamphlet</SelectItem>
                            <SelectItem value="Screen Printing">
                              Screen Printing
                            </SelectItem>
                            <SelectItem value="Wallpaper">
                              HD Wallpaper
                            </SelectItem>
                            <SelectItem value="Sunpack">
                              Sunpack Sheet
                            </SelectItem>
                            <SelectItem value="3D Printing">
                              3D Printing
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your requirements (size, quantity, design details...)"
                          data-ocid="contact.textarea"
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {submitLead.isError && (
                        <div
                          data-ocid="contact.error_state"
                          className="text-destructive text-sm bg-destructive/10 rounded-lg p-3"
                        >
                          Failed to submit. Please call us directly at {PHONE}.
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2"
                        disabled={submitLead.isPending}
                        data-ocid="contact.submit_button"
                      >
                        {submitLead.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                            Sending...
                          </>
                        ) : (
                          "Get My Quote →"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section data-ocid="location.section" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
              Find Us
            </p>
            <h2 className="section-heading text-3xl sm:text-4xl mb-4">
              Our Location
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            <motion.div
              className="md:col-span-3 rounded-2xl overflow-hidden shadow-card border border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <iframe
                src="https://maps.google.com/maps?q=Sadar+Bazar+Sangaria+Rajasthan&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New Heaven Printers location map"
                data-ocid="location.map_marker"
              />
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Printer className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-lg text-foreground">
                      New Heaven Printers
                    </h3>
                  </div>
                  <p className="text-xs text-accent font-semibold">
                    ⭐ 4.8 / 5 Rating
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        Sadar Bazar, Sangaria
                      </p>
                      <p className="text-muted-foreground">
                        Rajasthan – 335063
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Near Master Harikarisan Plywood
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <a
                      href={TEL_HREF}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {PHONE}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        Opening Hours
                      </p>
                      <p className="text-muted-foreground">
                        9:00 AM onwards (Mon – Sun)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Instagram className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-1">
                      <a
                        href="https://instagram.com/new_heaven_prints"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        @new_heaven_prints
                      </a>
                      <a
                        href="https://instagram.com/newheavenprinters"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        @newheavenprinters
                      </a>
                    </div>
                  </div>
                </div>
                <a href={TEL_HREF}>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        data-ocid="footer.panel"
        className="bg-foreground text-background py-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Printer className="w-5 h-5 text-accent" />
                <span className="font-display font-bold text-lg text-white">
                  New Heaven <span className="text-accent">Printers</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Your local printing partner in Sangaria. Quality printing, fast
                turnaround, affordable prices.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/new_heaven_prints"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      data-ocid="footer.link"
                      className="text-white/60 hover:text-accent text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <a
                    href={TEL_HREF}
                    className="hover:text-accent transition-colors"
                  >
                    {PHONE}
                  </a>
                </div>
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <span>Sadar Bazar, Sangaria – 335063, Rajasthan</span>
                </div>
                <div className="flex gap-2">
                  <Zap className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <span>Open from 9:00 AM onwards</span>
                </div>
                <div className="flex gap-2">
                  <Instagram className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <div>
                    <p>New Heaven Flex Sangaria</p>
                    <p>@new_heaven_prints / @newheavenprinters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <p>
              © {new Date().getFullYear()} New Heaven Printers. All rights
              reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/40 hover:scale-110 transition-transform md:bottom-6"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* STICKY MOBILE CALL BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <a href={TEL_HREF} data-ocid="mobile_call.button" className="block">
          <Button className="w-full h-14 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base gap-2 rounded-none shadow-lg">
            <Phone className="w-5 h-5" /> Call Now – {PHONE}
          </Button>
        </a>
      </div>
    </div>
  );
}
