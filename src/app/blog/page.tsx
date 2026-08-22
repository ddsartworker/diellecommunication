import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { posts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Il marketing, senza paroloni",
  description:
    "Idee e spiegazioni di marketing per chi fa un altro mestiere e vuole capirci qualcosa. Brevi, concrete, in italiano.",
};

export default function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-12 pt-36 sm:pt-44">
          <div className="shell">
            <p className="kicker text-saffron">Dal blog</p>
            <h1 className="mt-4 text-[clamp(2rem,6vw,4.5rem)]">
              <span className="display text-cream">Il marketing,</span>{" "}
              <span className="display text-cream">senza paroloni.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Idee e spiegazioni per chi fa un altro mestiere e vuole capirci
              qualcosa. Brevi, concrete, in italiano.
            </p>
          </div>
        </section>

        <section className="pb-24 sm:pb-32">
          <div className="shell border-t border-cream/10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={post.href}
                className="group grid gap-3 border-b border-cream/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[1fr_2fr] md:gap-10 md:py-10"
              >
                <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                  <span className="text-saffron">{post.tag}</span>
                  <span className="text-cream/40">
                    {post.date} · {post.read}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold leading-snug tracking-tight text-cream sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-cream/65">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/55 transition-colors group-hover:text-saffron">
                    Leggi l&apos;articolo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <InnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
