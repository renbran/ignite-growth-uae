import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, XCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .regex(/^[\+]?[0-9\s\-]{8,20}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85",
    alt: "AI interface and ERP analytics dashboards",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
    alt: "Industrial robotics and factory automation",
  },
  {
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=85",
    alt: "ERP performance dashboard on laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85",
    alt: "Team celebration after go-live",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
    alt: "Clarity workshop mapping ERP processes",
  },
  {
    src: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1600&q=85",
    alt: "Operations control room ensuring clarity on AI rollout",
  },
];

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    
    try {
      const formData = new FormData();
      formData.append("access_key", "60d099bd-01f2-43df-8c03-514bc2331804");
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message || "No message provided");
      formData.append("subject", "New Contact Form Submission - SGC TECH AI");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        toast.success("Message sent! We'll get back to you within 24 hours.");
        
        setTimeout(() => {
          reset();
          setStatus("idle");
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-4xl relative">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-3xl">
          <h2 className="text-gradient mb-lg">Get In Touch</h2>
          <p className="text-foreground-muted text-lg">
            Ready to transform your business? Let's talk.
          </p>
        </div>

        <div className="grid gap-xl lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="glass rounded-xl p-2xl">
            {status === "success" ? (
              <div className="text-center py-3xl animate-fade-in">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-lg" />
                <h3 className="text-2xl font-bold text-foreground mb-md">Message Sent!</h3>
                <p className="text-foreground-muted">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : status === "error" ? (
              <div className="text-center py-3xl animate-fade-in">
                <XCircle className="w-16 h-16 text-destructive mx-auto mb-lg" />
                <h3 className="text-2xl font-bold text-foreground mb-md">Submission Failed</h3>
                <p className="text-foreground-muted mb-lg">
                  Please try again or contact us directly.
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
                {/* Honeypot for spam protection */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="space-y-sm">
                  <Label htmlFor="contact-fullName">Full Name *</Label>
                  <Input
                    id="contact-fullName"
                    placeholder="John Smith"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-sm text-destructive" role="alert">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-sm">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@company.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-sm">
                  <Label htmlFor="contact-phone">Phone *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+971 50 967 5518"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-destructive" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-sm">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="glass rounded-xl p-2xl bg-background/60 border border-border/60 space-y-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground-muted">Implementation Gallery</p>
                <h3 className="text-xl font-semibold text-foreground">Real-world delivery moments</h3>
              </div>
              <span className="text-xs px-sm py-1 rounded-full bg-accent/15 text-accent-foreground border border-accent/30">Updated weekly</span>
            </div>
            <p className="text-sm text-foreground-subtle">Scenes from AI-native deployments, production floors, control rooms, and logistics hubs across our industry playbooks.</p>

            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((item, index) => (
                <div key={item.src} className="relative overflow-hidden rounded-lg border border-border/60 bg-background/40 shadow-sm">
                  <img
                    src={`${item.src}&sat=-10`}
                    alt={item.alt}
                    className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading={index > 1 ? "lazy" : "eager"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
