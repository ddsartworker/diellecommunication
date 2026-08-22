import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { posts, getPost, founders } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="pb-16 pt-36 sm:pt-44">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="kicker inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-saffron"
            >
              <span aria-hidden>←</span> Blog
            </Link>

            <div className="mt-8 flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
              <span className="text-saffron">{post.tag}</span>
              <span className="text-cream/40">
                {post.date} · {post.read}
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(1.9rem,5vw,3.4rem)]">
              <span className="display text-cream">{post.title}</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-cream/75">
              {post.intro}
            </p>

            <div className="mt-12 space-y-12">
              {post.body.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight text-cream">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-lg leading-relaxed text-cream/75">
                    {section.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-cream/10 bg-white/[0.02] p-7">
              <p className="kicker text-saffron">Scritto da</p>
              <p className="mt-3 leading-relaxed text-cream/80">
                {founders.map((f) => f.name).join(" & ")} — i fondatori di Dielle
                Communication. Seguiamo di persona ogni cliente, da Napoli, in
                Campania e in remoto in tutta Italia.
              </p>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="py-[108px]">
            <div className="mx-auto max-w-3xl">
              <p className="kicker text-cream/55">Continua a leggere</p>
              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-cream/10 sm:grid-cols-2">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="group bg-navy/40 p-7 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-saffron">
                      {p.tag}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-cream transition-colors group-hover:text-saffron">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <InnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
