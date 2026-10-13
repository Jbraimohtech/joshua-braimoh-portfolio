"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Step = "select" | "confirm" | "success";

interface Slot {
  start: string;
}

export default function BuildWithMePage() {
  const [step, setStep] = useState<Step>("select");
  const [currentMonth, setCurrentMonth] = useState(new Date()); // real current month
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // ISO string
  const [availableSlots, setAvailableSlots] = useState<Record<string, Slot[]>>(
    {},
  );
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState("");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const normalizeSlots = (payload: unknown): Record<string, Slot[]> => {
    if (!payload || typeof payload !== "object") return {};

    const source =
      "slots" in payload && payload.slots && typeof payload.slots === "object"
        ? payload.slots
        : payload;
    const normalized: Record<string, Slot[]> = {};

    for (const [dateKey, value] of Object.entries(source)) {
      if (!Array.isArray(value)) continue;

      for (const slot of value) {
        if (!slot || typeof slot !== "object" || !("start" in slot)) {
          continue;
        }

        const start = slot.start;
        if (typeof start !== "string") continue;

        const normalizedDate = dateKey.match(/^\d{4}-\d{2}-\d{2}$/)
          ? dateKey
          : new Date(start).toLocaleDateString("en-CA", {
              timeZone: "Africa/Lagos",
            });

        if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) continue;
        normalized[normalizedDate] ??= [];
        normalized[normalizedDate].push({ start });
      }
    }

    return normalized;
  };

  // ========== FETCH SLOTS ==========
  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSlotsError("");
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const start = toDateKey(new Date(year, month, 1));
        const end = toDateKey(new Date(year, month + 1, 0));

        const res = await fetch(
          `/api/slots?start=${start}&end=${end}&timeZone=Africa/Lagos&eventTypeSlug=30min`,
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Unable to load availability");
        }

        setAvailableSlots(normalizeSlots(data.data));
      } catch (err) {
        console.error("Failed to load slots", err);
        setAvailableSlots({});
        setSlotsError(
          err instanceof Error ? err.message : "Unable to load availability",
        );
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [currentMonth]);

  // ========== HELPERS ==========
  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: timeFormat === "12h",
      timeZone: "Africa/Lagos",
    });
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    // Empty cells before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return days;
  };

  const isDateAvailable = (day: number) => {
    const dateStr = toDateKey(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
    );
    return !!availableSlots[dateStr]?.length;
  };

  const handleDateSelect = (day: number) => {
    const dateStr = toDateKey(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
    );
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleTimeSelect = (iso: string) => {
    setSelectedTime(iso);
    setStep("confirm");
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          notes,
          start: selectedTime,
          timeZone: "Africa/Lagos",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const selectedDateDisplay = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  // ========== RENDER ==========
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
      >
        ← Back to home
      </Link>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* ===================== SELECT STEP ===================== */}
        {step === "select" && (
          <>
            <div className="flex flex-col lg:flex-row">
              {/* LEFT SIDEBAR */}
              <div className="w-full lg:w-[280px] p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                    JB
                  </div>
                  <span className="font-medium text-slate-800">
                    Joshua Braimoh
                  </span>
                </div>

                <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                  30 Min Meeting
                </h1>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>30m</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                    </svg>
                    <span>Google Meet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Africa/Lagos</span>
                  </div>
                </div>
              </div>

              {/* CENTER - CALENDAR */}
              <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {monthName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                            1,
                          ),
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-gray-100 text-slate-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                            1,
                          ),
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-gray-100 text-slate-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-medium text-slate-500 py-2"
                      >
                        {d}
                      </div>
                    ),
                  )}
                </div>

                {/* Calendar grid */}
                {loadingSlots ? (
                  <div className="flex items-center justify-center h-64 text-slate-400">
                    Loading availability...
                  </div>
                ) : slotsError ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-2 text-center">
                    <p className="text-sm text-red-600">{slotsError}</p>
                    <p className="text-xs text-slate-400">
                      Check the Cal.com configuration and try again.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((day, index) => {
                      if (day === null) {
                        return <div key={index} className="aspect-square" />;
                      }

                      const available = isDateAvailable(day);
                      const dateStr = `${currentMonth.getFullYear()}-${String(
                        currentMonth.getMonth() + 1,
                      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const isSelected = selectedDate === dateStr;

                      return (
                        <button
                          key={index}
                          disabled={!available}
                          onClick={() => available && handleDateSelect(day)}
                          className={`
                            aspect-square rounded-lg text-sm font-medium transition-all
                            flex items-center justify-center relative
                            ${
                              isSelected
                                ? "bg-slate-900 text-white"
                                : available
                                  ? "bg-gray-100 text-slate-800 hover:bg-gray-200"
                                  : "text-slate-300 cursor-not-allowed"
                            }
                          `}
                        >
                          {day}
                          {isSelected && (
                            <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT - TIME SLOTS */}
              <div className="w-full lg:w-[240px] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">
                    {selectedDate ? selectedDateDisplay : "Select a date"}
                  </h3>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
                    <button
                      onClick={() => setTimeFormat("12h")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full transition ${
                        timeFormat === "12h"
                          ? "bg-white shadow text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      12h
                    </button>
                    <button
                      onClick={() => setTimeFormat("24h")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full transition ${
                        timeFormat === "24h"
                          ? "bg-white shadow text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      24h
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {!selectedDate ? (
                    <p className="text-sm text-slate-400 text-center py-8">
                      Select a date to see available times
                    </p>
                  ) : availableSlots[selectedDate]?.length ? (
                    availableSlots[selectedDate].map((slot) => (
                      <button
                        key={slot.start}
                        onClick={() => handleTimeSelect(slot.start)}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-200 text-sm font-medium text-slate-700 hover:border-slate-400 transition-all"
                      >
                        {formatTime(slot.start)}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-8">
                      No available times
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-slate-500">Powered by Cal.com</div>
            </div>
          </>
        )}

        {/* ===================== CONFIRM STEP ===================== */}
        {step === "confirm" && (
          <div className="p-8 md:p-12 max-w-lg mx-auto">
            <button
              onClick={() => {
                setStep("select");
                setSelectedTime(null);
              }}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Confirm your booking
            </h2>
            <p className="text-slate-600 mb-8">
              <span className="font-medium text-slate-900">30 Min Meeting</span>
              <br />
              {selectedDateDisplay} • {selectedTime && formatTime(selectedTime)}
              <br />
              <span className="text-sm">Africa/Lagos • Google Meet</span>
            </p>

            <form onSubmit={handleConfirm} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    if (value.length === 0) setEmailError("");
                    else if (!isValidEmail(value))
                      setEmailError("Please enter a valid email address");
                    else setEmailError("");
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition ${
                    emailError
                      ? "border-red-500 focus:ring-red-500"
                      : email && isValidEmail(email)
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-slate-900"
                  }`}
                  placeholder="john@example.com"
                />
                {emailError && (
                  <p className="mt-1.5 text-sm text-red-600">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Additional notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-900 transition resize-none"
                  placeholder="Anything that will help prepare for our meeting."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !!emailError || !email || !name}
                className="w-full py-3 px-6 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>

              {submitError && (
                <p className="text-sm text-red-600 text-center">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        )}

        {/* ===================== SUCCESS STEP ===================== */}
        {step === "success" && (
          <div className="p-8 md:p-16 text-center max-w-md mx-auto">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-slate-600 mb-2">
              You’re scheduled with{" "}
              <span className="font-medium">Joshua Braimoh</span>
            </p>
            <p className="text-slate-800 font-medium mb-1">
              {selectedDateDisplay}
            </p>
            <p className="text-slate-800 font-medium mb-6">
              {selectedTime && formatTime(selectedTime)} • 30 min
            </p>
            <p className="text-sm text-slate-500 mb-8">
              A calendar invitation has been sent to your email address.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStep("select");
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setName("");
                  setEmail("");
                  setNotes("");
                }}
                className="px-6 py-2.5 border border-gray-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Book another time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
