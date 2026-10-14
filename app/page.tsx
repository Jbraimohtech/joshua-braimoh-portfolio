"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animated/fade-in";
import { FloatOrb } from "@/components/animated/float-orb";
import { ImageReveal } from "@/components/animated/image-reveal";
import { StatCard } from "@/components/animated/stat-card";
import { caseStudies } from "@/lib/case-studies";
import ProfileImage from "../assets/joshuaProfileimage.png";

const navItems = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work", "about", "skills", "services", "contact"];
      const scrollY = window.scrollY + 120;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="relative overflow-x-hidden">
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-5xl">
        <nav className="flex items-center justify-between rounded-full border border-slate-100 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
              JB
            </div>
            <span className="hidden sm:inline">Joshua Braimoh </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-medium tracking-wide transition ${
                  activeSection === item.href.slice(1)
                    ? "text-blue-600 underline underline-offset-4"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/build-with-me"
              className="hidden items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:flex"
            >
              BUILD WITH ME
              <span>↗</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-24">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`text-2xl font-semibold tracking-wide transition ${
                  activeSection === item.href.slice(1)
                    ? "text-blue-600"
                    : "text-slate-800"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-12">
            <Link
              href="/build-with-me"
              onClick={handleNavClick}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
            >
              BUILD WITH ME
              <span>↗</span>
            </Link>
          </div>

          <div className="mt-auto pb-10 text-sm text-slate-500">
            <p>Independent Product Builder</p>
            <p className="mt-1">Nigeria / Worldwide</p>
          </div>
        </div>
      </div>

      <section className="relative min-h-screen bg-grid pt-28 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <FloatOrb className="left-[-4rem] top-20" size="lg" delay={200} />
          <FloatOrb className="right-10 top-24" size="md" delay={600} />
          <FloatOrb className="bottom-10 left-1/3" size="sm" delay={900} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn
            as="div"
            className="mb-8 flex items-center gap-2 text-xs font-medium tracking-widest text-slate-500"
            delay={100}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            INDEPENDENT PRODUCT BUILDER • NIGERIA / WORLDWIDE
          </FadeIn>

          <div className="relative">
            <FadeIn
              as="h1"
              className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
              delay={160}
            >
              I TURN FOUNDER IDEAS
              <br />
              INTO PRODUCTS
              <br />
              READY FOR{" "}
              <span className="italic text-blue-600">real users.</span>
            </FadeIn>

            <FadeIn
              as="div"
              className="absolute right-0 top-8 hidden h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-xl md:block lg:right-8 lg:h-44 lg:w-44"
              delay={220}
            >
              <ImageReveal
                src={ProfileImage}
                alt="Profile"
                fill
                sizes="(max-width: 1024px) 144px, 176px"
                className="h-full w-full bg-slate-200"
                imageClassName="object-cover"
              />
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <FadeIn as="div" className="min-w-0" delay={260}>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                I help founders transform ideas into production-ready MVPs and
                SaaS platforms—from the first screen all the way to launch.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/build-with-me"
                  className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Build with me <span>↗</span>
                </Link>
                <a
                  href="#work"
                  className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline"
                >
                  Explore selected work →
                </a>
              </div>
            </FadeIn>

            <FadeIn
              as="div"
              className="flex min-w-0 flex-col items-start gap-4 sm:items-end sm:gap-6"
              delay={320}
            >
              <div className="text-left text-xs text-slate-500 sm:text-right">
                <div>BUILT ACROSS BORDERS</div>
                <div className="mt-1">SELECTED ARCHIVE / 2024—NOW</div>
              </div>

              <div className="grid w-full grid-cols-3 gap-2 text-right sm:flex sm:gap-8">
                <StatCard value="5+" label="PROJECTS" delay={350} />
                <StatCard value="2+" label="GLOBAL CLIENTS" delay={420} />
                <StatCard value="2+" label="INDUSTRIES" delay={490} />
              </div>
            </FadeIn>
          </div>

          <FadeIn
            as="div"
            className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-slate-50 py-4 text-xs font-medium tracking-widest text-slate-600"
            delay={540}
          >
            <span className="flex items-center gap-2">
              <span className="text-blue-500">✦</span> FULL-STACK DEVELOPMENT
            </span>
            <span className="flex items-center gap-2">
              <span className="text-blue-500">✦</span> DESIGN DIRECTION
            </span>
            <span className="flex items-center gap-2">
              <span className="text-blue-500">✦</span> PRODUCT STRATEGY
            </span>
          </FadeIn>
        </div>
      </section>

      <section id="work" className="bg-[#0B1C2E] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-slate-400"
            delay={100}
          >
            01 / SELECTED WORK
          </FadeIn>

          <FadeIn
            as="div"
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            delay={150}
          >
            <h2 className="text-5xl font-bold leading-tight md:text-6xl">
              Proof, not
              <br />
              promises.
            </h2>
            <p className="max-w-sm text-sm text-slate-400">
              A selected public set of products I’ve designed and built.
              Additional client work remains under NDA.
            </p>
          </FadeIn>

          <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn as="div" delay={180}>
              <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
                <span>01</span>
                <span>2026</span>
              </div>
              <h3 className="text-4xl font-bold">{caseStudies[0].title}</h3>
              <p className="mt-1 text-slate-400">{caseStudies[0].subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudies[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${caseStudies[0].slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Read product story <span>↗</span>
              </Link>
            </FadeIn>

            <FadeIn
              as="div"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800"
              delay={220}
            >
              <ImageReveal
                src={caseStudies[0].image}
                alt={caseStudies[0].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
                imageClassName="object-cover"
              />
              <a
                href="https://accgl.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white shadow-lg"
              >
                VIEW
              </a>
            </FadeIn>
          </div>

          <div className="mt-28 grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn
              as="div"
              className="order-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 lg:order-1"
              delay={180}
            >
              <ImageReveal
                src={caseStudies[1].image}
                alt={caseStudies[1].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
                imageClassName="object-cover"
              />
              <a
                href="https://dev-events-nextjs-gamma.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white shadow-lg"
              >
                VIEW
              </a>
            </FadeIn>

            <FadeIn as="div" className="order-1 lg:order-2" delay={220}>
              <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
                <span>02</span>
                <span>2026</span>
              </div>
              <h3 className="text-4xl font-bold">{caseStudies[1].title}</h3>
              <p className="mt-1 text-slate-400">{caseStudies[1].subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudies[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${caseStudies[1].slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Read product story <span>↗</span>
              </Link>
            </FadeIn>
          </div>

          <div className="mt-28 grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn as="div" delay={180}>
              <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
                <span>03</span>
                <span>2026</span>
              </div>
              <h3 className="text-4xl font-bold">{caseStudies[2].title}</h3>
              <p className="mt-1 text-slate-400">{caseStudies[2].subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudies[2].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${caseStudies[2].slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Read product story <span>↗</span>
              </Link>
            </FadeIn>

            <FadeIn
              as="div"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800"
              delay={220}
            >
              <ImageReveal
                src={caseStudies[2].image}
                alt={caseStudies[2].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
                imageClassName="object-cover"
              />
              <a
                href="https://shoeproject-beta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white shadow-lg"
              >
                VIEW
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="about" className="bg-grid py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-slate-500"
            delay={100}
          >
            02 / ABOUT THE BUILDER
          </FadeIn>

          <FadeIn
            as="h2"
            className="max-w-3xl text-5xl font-bold leading-tight text-slate-900 md:text-6xl"
            delay={160}
          >
            I bridge the gap between{" "}
            <span className="italic text-blue-600">“what if?”</span> and{" "}
            <span className="underline decoration-2 underline-offset-4">
              “it’s live.”
            </span>
          </FadeIn>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
            <FadeIn as="div" className="relative" delay={220}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200">
                <ImageReveal
                  src={ProfileImage}
                  alt="Portrait of Joshua"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0"
                  imageClassName="object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 rounded-lg bg-white px-4 py-2 text-xs font-medium shadow">
                CURIOUS BY NATURE
                <br />
                PRECISE BY PRACTICE
              </div>
            </FadeIn>

            <FadeIn as="div" delay={260}>
              <p className="text-lg leading-relaxed text-slate-700">
                I’m Joshua — an independent full-stack developer and MVP
                specialist who thinks like a designer and ships like an
                engineer.
              </p>
              <p className="mt-6 text-slate-600">
                For 2+ years, I’ve helped founders untangle complex ideas, find
                the sharpest version of their product, and get it into users’
                hands. My sweet spot is the messy middle where product thinking,
                interface design, AI, and engineering meet.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6">
                <StatCard value="5+" label="PROJECTS BUILT" delay={300} />
                <StatCard value="2+" label="INDUSTRIES" delay={360} />
                <StatCard value="2+" label="GLOBAL CLIENTS" delay={420} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-grid py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-slate-500"
            delay={100}
          >
            03 / SKILLS & CAPABILITIES
          </FadeIn>

          <FadeIn
            as="div"
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            delay={150}
          >
            <h2 className="max-w-xl text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
              Ideas need more than{" "}
              <span className="italic text-blue-600">good code.</span>
            </h2>
            <p className="max-w-sm text-sm text-slate-600">
              I combine product thinking, visual judgment, engineering, and AI
              workflows to move from unclear brief to finished product without
              handoff friction.
            </p>
          </FadeIn>

          <div className="mt-16">
            <FadeIn
              as="div"
              className="mb-6 text-xs font-medium tracking-widest text-slate-500"
              delay={180}
            >
              PRIMARY STACK / DAILY TOOLS
            </FadeIn>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Next.js", num: "01", accent: true },
                { name: "React", num: "02" },
                { name: "Node.js", num: "03", accent: true },
                { name: "TypeScript", num: "04" },
                { name: "React Native", num: "05" },
                { name: "Git", num: "06", accent: true },
                { name: "Vercel", num: "07" },
              ].map((item, index) => (
                <FadeIn
                  as="div"
                  key={item.name}
                  className={`relative flex aspect-[4/3] flex-col justify-between rounded-xl p-5 ${item.accent ? "bg-blue-600 text-white" : "bg-slate-900 text-white"}`}
                  delay={220 + index * 50}
                >
                  <span className="text-xs opacity-60">{item.num}</span>
                  <div>
                    <div className="text-xl font-semibold">{item.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider opacity-70">
                      CORE CAPABILITY
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-6 flex items-center justify-between text-xs font-medium tracking-widest text-slate-500">
              <span>EXTENDED TOOLKIT</span>
              <span>15 CAPABILITIES</span>
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "JavaScript",
                "Express.js",
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "API Integration",
                "ChatGPT",
                "Tailwind CSS",
              ].map((tool, i) => (
                <div
                  key={tool}
                  className="flex items-center gap-4 border-b border-slate-200 py-3 text-sm"
                >
                  <span className="w-6 text-xs text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-slate-800">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <FadeIn
              as="div"
              className="mb-4 text-xs tracking-widest text-slate-500"
              delay={100}
            >
              04 / EXPERIENCE
            </FadeIn>
            <FadeIn
              as="h3"
              className="max-w-md text-4xl font-bold leading-tight text-slate-900"
              delay={160}
            >
              Built through doing.
              <br />
              <span className="italic text-blue-600">
                Refined through shipping.
              </span>
            </FadeIn>

            <div className="mt-12 space-y-10">
              {[
                {
                  num: "02",
                  title: "Web Developer",
                  text: "Helping startups and entrepreneurs rapidly prototype and launch their ideas using modern development tools and best practices.",
                  meta: "FREELANCER\n2025-PRESENT",
                },
              ].map((item, index) => (
                <FadeIn
                  as="div"
                  key={item.num}
                  className="grid gap-4 border-t border-slate-200 pt-8 md:grid-cols-[1fr_auto]"
                  delay={220 + index * 80}
                >
                  <div>
                    <div className="text-xs text-slate-400">{item.num}</div>
                    <h4 className="mt-1 text-xl font-semibold">{item.title}</h4>
                    <p className="mt-2 max-w-xl text-sm text-slate-600">
                      {item.text}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500 whitespace-pre-line">
                    {item.meta}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn as="div" className="mt-16" delay={220}>
              <div className="text-6xl font-bold text-blue-600">5+</div>
              <div className="mt-1 text-sm text-slate-500">
                PROJECTS DELIVERED
                <br />
                ACROSS 2+ INDUSTRIES
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="services" className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-blue-200"
            delay={100}
          >
            05 / WHAT I DO
          </FadeIn>

          <FadeIn
            as="h2"
            className="text-5xl font-bold leading-tight md:text-6xl"
            delay={150}
          >
            From zero to
            <br />
            <span className="italic">something real.</span>
          </FadeIn>

          <div className="mt-20 border-t border-blue-400/40 pt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs text-blue-200">01</div>
                <h3 className="mt-2 text-3xl font-semibold">
                  Monthly Product Retainer
                </h3>
                <p className="mt-4 max-w-md text-blue-100">
                  A focused monthly partnership for teams that need consistent
                  senior product development without growing a full internal
                  team.
                </p>
              </div>
              <div className="text-right text-xl font-medium">
                Open to Negotiation / MONTH
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Dedicated monthly development capacity",
                "Product strategy and technical planning",
                "Full-stack feature development",
                "Weekly progress and priority reviews",
                "Ongoing improvements and maintenance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-sm text-blue-100"
                >
                  <span className="mt-0.5">↗</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-blue-400/40 pt-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs text-blue-200">02</div>
                <h3 className="mt-2 text-3xl font-semibold">
                  Project Development
                </h3>
              </div>
              <div className="text-right text-xl font-medium">
                Open to Negotiation
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-slate-500"
            delay={100}
          >
            06 / WORKING TOGETHER
          </FadeIn>

          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn
              as="h2"
              className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl"
              delay={150}
            >
              Small team energy.
              <br />
              Senior-level care.
            </FadeIn>

            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Listen",
                  desc: "We align on the problem, the people, and what success needs to look like.",
                },
                {
                  num: "02",
                  title: "Shape",
                  desc: "I turn ambiguity into a focused product direction and a realistic build plan.",
                },
                {
                  num: "03",
                  title: "Build",
                  desc: "Design and development move together in fast, visible, feedback-led cycles.",
                },
                {
                  num: "04",
                  title: "Launch",
                  desc: "We polish, test, deploy, and make sure you can confidently take it forward.",
                },
              ].map((step, index) => (
                <FadeIn
                  as="div"
                  key={step.num}
                  className="border-t border-slate-200 pt-6"
                  delay={200 + index * 70}
                >
                  <div className="text-xs text-slate-400">{step.num}</div>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1C2E] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn
            as="div"
            className="mb-4 text-xs tracking-widest text-slate-400"
            delay={100}
          >
            07 / CLIENT WORDS
          </FadeIn>

          <FadeIn
            as="h2"
            className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
            delay={150}
          >
            Good work travels
            <br />
            <span className="italic text-slate-300">by word of mouth.</span>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                quote:
                  "Working with Joshua was game-changing. His AI-assisted development approach saved us months of development time. The MVP exceeded our expectations.",
                name: "Marcus Johnson",
                role: "Product Manager at InnovateLab",
                initials: "MJ",
              },
              {
                quote:
                  "Joshua's expertise with modern tech stack helped us build a scalable product that handles thousands of users seamlessly.",
                name: "Sarah Nosa",
                role: "CEO at Velom Footwear",
                initials: "SN",
              },
              {
                quote:
                  "The traditional development that Joshua brings is unmatched. Our time-to-market was reduced by 50%.",
                name: "David Park",
                role: "CTO at RapidBuild Inc",
                initials: "DP",
              },
            ].map((t, index) => (
              <FadeIn
                as="div"
                key={t.name}
                className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8"
                delay={200 + index * 70}
              >
                <div className="text-4xl text-slate-600">“</div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {t.quote}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-xs font-medium">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-grid py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn as="div" className="mb-8 text-sm text-slate-500" delay={100}>
            Have a product in mind?
          </FadeIn>

          <FadeIn
            as="h2"
            className="max-w-3xl text-5xl font-bold leading-tight text-slate-900 md:text-6xl"
            delay={150}
          >
            Let’s make it
            <br />
            <span className="italic text-blue-600">impossible to ignore.</span>
          </FadeIn>

          <FadeIn
            as="div"
            className="mt-12 flex flex-wrap items-center gap-6"
            delay={200}
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=braimohjoshua%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Start a conversation <span>↗</span>
            </a>
            <a
              href="/build-with-me"
              className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline"
            >
              Book a 30-min call
            </a>
          </FadeIn>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-8 text-xs text-slate-500">
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900">
                LINKEDIN
              </a>
              {/* <a href="#" className="hover:text-slate-900">
                X / TWITTER
              </a> */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=braimohjoshua%40gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900"
              >
                EMAIL
              </a>
            </div>
            <a href="#" className="hover:text-slate-900">
              BACK TO TOP ↑
            </a>
          </div>

          <div className="mt-12 flex justify-end">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-slate-300 text-center text-[10px] font-medium leading-tight text-slate-600">
              AVAILABLE FOR
              <br />
              SELECT PROJECTS
              <br />• 2026
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
