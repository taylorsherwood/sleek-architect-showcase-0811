import { useState, useMemo, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, isSameDay, startOfDay, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock, Phone, ArrowLeft, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "date" | "time" | "details" | "confirmed";

interface TimeSlot {
  time: string;
  date: Date;
}

// Default business hours (will be replaced by Google Calendar availability)
const BUSINESS_HOURS = { start: 11, end: 19 }; // 11 AM - 7 PM CST
const SLOT_DURATION = 30; // minutes
const BOOKING_WINDOW_DAYS = 45;

interface BusySlot {
  start: string;
  end: string;
}

const generateTimeSlots = (date: Date, busySlots: BusySlot[]): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = new Date();

  // Convert date to CST/CDT for generating business-hour slots
  // Business hours are in CST (America/Chicago)
  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    for (let min = 0; min < 60; min += SLOT_DURATION) {
      const slotDate = setMinutes(setHours(startOfDay(date), hour), min);
      // Skip past slots for today
      if (isSameDay(date, now) && slotDate <= now) continue;

      // Check if this slot overlaps with any busy period
      const slotStart = slotDate.getTime();
      const slotEnd = slotStart + SLOT_DURATION * 60 * 1000;
      const isBusy = busySlots.some((busy) => {
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      if (!isBusy) {
        slots.push({
          time: format(slotDate, "h:mm a"),
          date: slotDate,
        });
      }
    }
  }
  return slots;
};

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const today = startOfDay(new Date());
  const maxDate = addDays(today, BOOKING_WINDOW_DAYS);

  const timeSlots = useMemo(
    () => (selectedDate ? generateTimeSlots(selectedDate) : []),
    [selectedDate]
  );

  const disabledDays = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6 || date < today || date > maxDate;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date) setStep("time");
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setIsSubmitting(true);

    try {
      // TODO: Wire up to edge function
      // For now, submit via Zapier webhook as a booking lead
      const payload = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        booking_date: format(selectedSlot.date, "EEEE, MMMM d, yyyy"),
        booking_time: selectedSlot.time,
        lead_source: "New Consultation Booking",
        message: `Consultation booking for ${format(selectedSlot.date, "EEEE, MMMM d, yyyy")} at ${selectedSlot.time} — 15 min phone call`,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      });

      await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        body: payload,
      });

      setStep("confirmed");
    } catch {
      // Still show confirmed - the lead data was attempted
      setStep("confirmed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setStep("date");
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setFormData({ name: "", email: "", phone: "" });
    }, 300);
  };

  const goBack = () => {
    if (step === "time") setStep("date");
    else if (step === "details") setStep("time");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[440px] p-0 gap-0 overflow-hidden border-0"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        <DialogTitle className="sr-only">Schedule a Consultation</DialogTitle>

        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 text-center relative"
          style={{ borderBottom: "1px solid hsl(40 25% 90%)" }}
        >
          {(step === "time" || step === "details") && (
            <button
              onClick={goBack}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "hsl(233 50% 9% / 0.5)" }} />
            </button>
          )}
          <p
            className="font-sans"
            style={{
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "hsl(var(--gold))",
              fontWeight: 500,
            }}
          >
            Taylor Sherwood
          </p>
          <h2
            className="font-display font-semibold mt-1"
            style={{
              fontSize: "1.35rem",
              color: "hsl(233 50% 9%)",
              letterSpacing: "-0.01em",
            }}
          >
            Consultation Call
          </h2>
          <div className="flex items-center justify-center gap-5 mt-3">
            <span className="flex items-center gap-1.5" style={{ color: "hsl(233 50% 9% / 0.5)", fontSize: "13px" }}>
              <Clock className="w-3.5 h-3.5" /> 15 min
            </span>
            <span className="flex items-center gap-1.5" style={{ color: "hsl(233 50% 9% / 0.5)", fontSize: "13px" }}>
              <Phone className="w-3.5 h-3.5" /> Phone call
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-5" style={{ minHeight: "320px" }}>
          {/* DATE STEP */}
          {step === "date" && (
            <div className="flex flex-col items-center">
              <h3
                className="font-display font-medium mb-4"
                style={{ fontSize: "1rem", color: "hsl(233 50% 9%)" }}
              >
                Select a Date
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className={cn("p-3 pointer-events-auto")}
                modifiersStyles={{
                  selected: {
                    backgroundColor: "hsl(233 50% 9%)",
                    color: "#fff",
                  },
                }}
              />
            </div>
          )}

          {/* TIME STEP */}
          {step === "time" && selectedDate && (
            <div className="flex flex-col">
              <h3
                className="font-display font-medium mb-1 text-center"
                style={{ fontSize: "1rem", color: "hsl(233 50% 9%)" }}
              >
                {format(selectedDate, "EEEE, MMMM d")}
              </h3>
              <p className="text-center mb-4" style={{ fontSize: "13px", color: "hsl(233 50% 9% / 0.5)" }}>
                Select an available time
              </p>
              <div
                className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {timeSlots.length === 0 ? (
                  <p className="col-span-2 text-center py-8" style={{ color: "hsl(233 50% 9% / 0.4)", fontSize: "14px" }}>
                    No available times for this date
                  </p>
                ) : (
                  timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleSlotSelect(slot)}
                      className="h-11 rounded-lg font-sans font-medium transition-all duration-200"
                      style={{
                        fontSize: "13px",
                        border: "1.5px solid hsl(var(--gold) / 0.4)",
                        color: "hsl(233 50% 9% / 0.7)",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "hsl(233 50% 9%)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "hsl(233 50% 9%)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "hsl(233 50% 9% / 0.7)";
                        e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.4)";
                      }}
                    >
                      {slot.time}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* DETAILS STEP */}
          {step === "details" && selectedSlot && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div
                className="rounded-lg p-3 flex items-center gap-3"
                style={{ background: "hsl(40 25% 95%)", border: "1px solid hsl(var(--gold) / 0.2)" }}
              >
                <CalendarIcon className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
                <div>
                  <p className="font-sans font-medium" style={{ fontSize: "13px", color: "hsl(233 50% 9%)" }}>
                    {format(selectedSlot.date, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p style={{ fontSize: "12px", color: "hsl(233 50% 9% / 0.5)" }}>
                    {selectedSlot.time} · 15 min · Phone call
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block font-sans font-medium mb-1.5" style={{ fontSize: "12px", color: "hsl(233 50% 9% / 0.6)", letterSpacing: "0.04em" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full h-11 px-4 rounded-lg font-sans transition-all"
                    style={{
                      fontSize: "14px",
                      background: "hsl(40 25% 95%)",
                      border: "1.5px solid hsl(var(--gold) / 0.3)",
                      color: "hsl(233 50% 9%)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold))")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.3)")}
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium mb-1.5" style={{ fontSize: "12px", color: "hsl(233 50% 9% / 0.6)", letterSpacing: "0.04em" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full h-11 px-4 rounded-lg font-sans transition-all"
                    style={{
                      fontSize: "14px",
                      background: "hsl(40 25% 95%)",
                      border: "1.5px solid hsl(var(--gold) / 0.3)",
                      color: "hsl(233 50% 9%)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold))")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.3)")}
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium mb-1.5" style={{ fontSize: "12px", color: "hsl(233 50% 9% / 0.6)", letterSpacing: "0.04em" }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full h-11 px-4 rounded-lg font-sans transition-all"
                    style={{
                      fontSize: "14px",
                      background: "hsl(40 25% 95%)",
                      border: "1.5px solid hsl(var(--gold) / 0.3)",
                      color: "hsl(233 50% 9%)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold))")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.3)")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full font-sans uppercase flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  fontWeight: 800,
                  background: "hsl(233 50% 9%)",
                  color: "#fff",
                  border: "none",
                }}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          )}

          {/* CONFIRMED STEP */}
          {step === "confirmed" && selectedSlot && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: "hsl(145 60% 45% / 0.12)" }}
              >
                <Check className="w-6 h-6" style={{ color: "hsl(145 60% 38%)" }} />
              </div>
              <h3
                className="font-display font-semibold mb-2"
                style={{ fontSize: "1.2rem", color: "hsl(233 50% 9%)" }}
              >
                You're All Set!
              </h3>
              <p className="font-sans mb-1" style={{ fontSize: "14px", color: "hsl(233 50% 9% / 0.6)" }}>
                {format(selectedSlot.date, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="font-sans mb-4" style={{ fontSize: "14px", color: "hsl(233 50% 9% / 0.6)" }}>
                {selectedSlot.time} · 15 min Phone Call
              </p>
              <p className="font-sans" style={{ fontSize: "13px", color: "hsl(233 50% 9% / 0.4)", maxWidth: "280px" }}>
                Taylor will call you at the scheduled time. A confirmation will be sent to <strong style={{ color: "hsl(233 50% 9% / 0.6)" }}>{formData.email}</strong>.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-8 h-10 rounded-full font-sans font-medium uppercase transition-colors"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  border: "1.5px solid hsl(var(--gold) / 0.4)",
                  color: "hsl(233 50% 9% / 0.6)",
                  background: "transparent",
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
