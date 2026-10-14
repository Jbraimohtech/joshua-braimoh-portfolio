import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/animated/image-reveal";
import { caseStudies } from "@/lib/case-studies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return {
    title: `${caseStudy.title} — Case Study | Joshua Braimoh`,
    description: caseStudy.introduction,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudyIndex = caseStudies.findIndex(
    (caseStudy) => caseStudy.slug === slug,
  );

  if (caseStudyIndex === -1) {
    notFound();
  }

  const caseStudy = caseStudies[caseStudyIndex];
  const nextCaseStudy = caseStudies[(caseStudyIndex + 1) % caseStudies.length];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:text-blue-600"
        >
          JOSHUA BRAIMOH
        </Link>
        <Link
          href="/#work"
          className="text-xs font-medium text-slate-600 underline-offset-4 hover:text-slate-950 hover:underline sm:text-sm"
        >
          ← Back to selected work
        </Link>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-20">
        <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
          <span>{caseStudy.number} / 03</span>
          <span className="h-px w-10 bg-blue-200" />
          <span>Selected case study</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.48fr)] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium text-slate-500">
              {caseStudy.subtitle}
            </p>
            <h1 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              {caseStudy.title}
              <span className="text-blue-600">.</span>
            </h1>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
            {caseStudy.introduction}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 px-4 py-2 text-[10px] font-medium tracking-[0.12em] text-slate-600 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:mt-16 sm:aspect-[16/9] sm:rounded-3xl">
          <ImageReveal
            src={caseStudy.image}
            alt={caseStudy.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="absolute inset-0"
            imageClassName="object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700 backdrop-blur sm:bottom-6 sm:left-6">
            Project {caseStudy.number} / 2026
          </span>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
            01 / The challenge
          </p>
          <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Start with what matters to the people using it.
          </h2>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-2xl sm:leading-relaxed">
          {caseStudy.challenge}
        </p>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
                02 / The approach
              </p>
              <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A focused experience, from first impression to follow-through.
              </h2>
            </div>
            <div>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                {caseStudy.approach}
              </p>
              <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
                {caseStudy.focus.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid gap-2 py-6 sm:grid-cols-[56px_0.8fr_1.2fr] sm:gap-5"
                  >
                    <span className="text-xs font-medium text-blue-600">
                      0{index + 1}
                    </span>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span>End of case study</span>
            <Link href="/#work" className="hover:text-white">
              All selected work ↗
            </Link>
          </div>
          <Link
            href={`/work/${nextCaseStudy.slug}`}
            className="group grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                Next case study / {nextCaseStudy.number}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight transition-colors group-hover:text-blue-300 sm:text-6xl">
                {nextCaseStudy.title}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="text-4xl transition-transform group-hover:translate-x-2 sm:text-5xl"
            >
              →
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
