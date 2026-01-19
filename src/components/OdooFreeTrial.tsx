import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const odooTrialSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name"),
  workEmail: z
    .string()
    .email("Please enter a valid work email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .regex(/^[\+]?[0-9\s\-]{8,20}$/, "Please enter a valid phone number"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  serverLocation: z
    .string()
    .min(1, "Please select a server location"),
});

type OdooTrialFormData = z.infer<typeof odooTrialSchema>;

const OdooFreeTrial = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverLocation, setServerLocation] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OdooTrialFormData>({
    resolver: zodResolver(odooTrialSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: OdooTrialFormData) => {
    setStatus("loading");
    
    console.log("Form data received:", data);
    console.log("Server location state:", serverLocation);
    console.log("Server location from form:", data.serverLocation);
    
    try {
      const payload = {
        name: data.fullName,
        email: data.workEmail,
        phone: data.phone,
        company: data.company,
        server_location: data.serverLocation || serverLocation, // Fallback to state if needed
        send_confirmation: true,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending payload to Odoo webhook:", payload);
      console.log("Payload stringified:", JSON.stringify(payload, null, 2));

      const response = await fetch("https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Webhook response status:", response.status);
      
      // Try to parse response for debugging
      let responseData;
      try {
        responseData = await response.json();
        console.log("Webhook response data:", responseData);
      } catch (e) {
        console.log("No JSON response from webhook");
      }

      if (response.ok) {
        setStatus("success");
        toast.success("Trial request received! Check your email for confirmation.");
        
        setTimeout(() => {
          reset();
          setServerLocation("");
          setStatus("idle");
        }, 5000);
      } else {
        console.error("Webhook error:", response.status, responseData);
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      toast.error("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <section id="free-trial" className="py-4xl relative">
      <div className="container max-w-4xl px-4">
        <div className="text-center mb-3xl">
          <h2 className="text-gradient mb-lg">Try Odoo Free for 4 Weeks</h2>
          <p className="text-foreground-muted text-lg">
            Experience enterprise-grade Odoo ERP with AI automation. No credit card required.
          </p>
        </div>

        <div className="glass rounded-xl p-2xl max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-3xl animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-lg" />
              <h3 className="text-2xl font-bold text-foreground mb-md">Trial Request Received!</h3>
              <p className="text-foreground-muted mb-sm">
                We'll set up your managed Odoo platform within 24 hours.
              </p>
              <p className="text-foreground-muted text-sm">
                Check your email for login credentials and setup instructions.
              </p>
            </div>
          ) : status === "error" ? (
            <div className="text-center py-3xl animate-fade-in">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-lg" />
              <h3 className="text-2xl font-bold text-foreground mb-md">Request Failed</h3>
              <p className="text-foreground-muted mb-lg">
                Please try again or contact us directly at{" "}
                <a href="mailto:info@sgctech.ai" className="text-accent hover:underline">
                  info@sgctech.ai
                </a>
              </p>
              <Button onClick={() => setStatus("idle")} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-2xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-lg">
                  <span className="text-accent font-semibold text-sm">Managed ODOO Platform</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-sm">4 Weeks Free • No Credit Card</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
                {/* Honeypot for spam protection */}
                <input 
                  type="text" 
                  name="website" 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="space-y-sm">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
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
                  <Label htmlFor="workEmail">Work Email *</Label>
                  <Input
                    id="workEmail"
                    type="email"
                    placeholder="john@company.com"
                    {...register("workEmail")}
                    className={errors.workEmail ? "border-destructive" : ""}
                    aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                  />
                  {errors.workEmail && (
                    <p id="workEmail-error" className="text-sm text-destructive" role="alert">
                      {errors.workEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-sm">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
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
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="Your Company Ltd."
                    {...register("company")}
                    className={errors.company ? "border-destructive" : ""}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                  {errors.company && (
                    <p id="company-error" className="text-sm text-destructive" role="alert">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div className="space-y-sm">
                  <Label htmlFor="serverLocation">Server Location *</Label>
                  <Select
                    value={serverLocation}
                    onValueChange={(value) => {
                      setServerLocation(value);
                      setValue("serverLocation", value, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger 
                      id="serverLocation"
                      className={errors.serverLocation ? "border-destructive" : ""}
                      aria-describedby={errors.serverLocation ? "serverLocation-error" : undefined}
                    >
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gb-uk-manchester">🇬🇧 UK, Manchester</SelectItem>
                      <SelectItem value="us-boston">🇺🇸 US, Boston</SelectItem>
                      <SelectItem value="in-mumbai">🇮🇳 IN, Mumbai</SelectItem>
                      <SelectItem value="br-sao-paulo">🇧🇷 BR, São Paulo</SelectItem>
                      <SelectItem value="nl-meppel">🇳🇱 NL, Meppel</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.serverLocation && (
                    <p id="serverLocation-error" className="text-sm text-destructive" role="alert">
                      {errors.serverLocation.message}
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
                      Processing...
                    </>
                  ) : (
                    "START FREE TRIAL NOW"
                  )}
                </Button>

                <p className="text-xs text-center text-foreground-muted">
                  By submitting, you agree to the{" "}
                  <a href="https://scholarixglobal.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OdooFreeTrial;
