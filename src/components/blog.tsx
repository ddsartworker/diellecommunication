import Link from "next/link";
import Reveal from "./reveal";
import { posts } from "@/lib/site";

export default function Blog() {
  return (
    <section
      id="blog"
      className="border-t border-white/5 bg-navy-deep px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-saffron">Dal blog</p>
            <h2 className="mt-4 text-[clamp(1.7rem,4vw,3rem)]">
              <span className="display text-cream">Il marketing,</span>{" "}
              <span className="display text-saffron">senza paroloni.</span>
            </h2>
          </div>
          <p className="max-w-xs text-cream/60">
            Idee e spiegazioni per chi fa un altro mestiere e vuole capirci
            qualcosa. Brevi, concrete, in italiano.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-cream/10 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal
              as="article"
              key={post.title}
              delay={i * 80}
              className="bg-navy/40"
            >
              <Link
                href={post.href}
                className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                  <span className="text-saffron">{post.tag}</span>
                  <span className="text-cream/40">{post.date}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-cream">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-cream/65">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/55 transition-colors group-hover:text-saffron">
                  Leggi
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
