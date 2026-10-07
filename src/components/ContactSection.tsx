"use client";

import Reveal from "./Reveal";

// Google Calendar appointment schedule (short link: calendar.app.google/HwAftmiUp4mwvshe6).
// ?gv=true is Google's embeddable form of the booking page.
const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2AVFposi-dq1q_bRlI1iL9I7qumRQ7JxcShug19593oidUG7IIqrRvjaW7fxp3jtDEEUpsHjSY?gv=true";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Pitch */}
          <Reveal>
            <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
              Let&apos;s Talk
            </p>
            <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to See What Your Traffic Is Worth?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Book a 30-minute strategy call. I&apos;ll show you exactly how many of your anonymous visitors
              we can identify, what enrichment data we can attach, and which activation channels will
              drive the highest ROI for your specific business.
            </p>
            <ul className="space-y-4">
              {[
                "Live demo with anonymized data from your vertical",
                "Custom resolution rate estimate for your traffic profile",
                "Channel-by-channel activation roadmap",
                "Clear pricing — no hidden fees, no long-term contracts",
                "Pixel deployed and resolving within 48 hours of kickoff",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                    <circle cx="10" cy="10" r="10" fill="#39B54A20" />
                    <path d="M6 10l3 3 5-5" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: booking calendar */}
          <Reveal index={2}>
            {/* Phones: Google's embed collapses into a broken narrow column below
                ~600px, so link out to the full-screen booking page instead. */}
            <div className="sm:hidden bg-slate-800/50 rounded-2xl p-6 border border-white/10 text-center">
              <p className="text-white font-semibold text-lg">30-minute strategy call</p>
              <p className="text-sm text-slate-400 mt-1 mb-5">Google Meet · pick any open slot</p>
              <a
                href={BOOKING_URL.replace("?gv=true", "")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center bg-green hover:bg-green-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-150"
              >
                Pick a time
              </a>
            </div>
            <iframe
              src={BOOKING_URL}
              title="Book a strategy call with Shaw Cole"
              loading="lazy"
              className="hidden sm:block w-full h-[680px] rounded-2xl border border-white/10 bg-white"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
