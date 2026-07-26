import Image from "next/image";

type Props = {
  subtitle: string;
  title: string;
  description: string;
  status: string;
  updated: string;
};

export function SiteHero({ subtitle, title, description, status, updated }: Props) {
  return (
    <header className="hero-layout">
      <div className="avatar-ring h-fit w-fit overflow-hidden rounded-2xl">
        <Image src="/avatar-clanker.svg" alt="" width={72} height={72} priority />
      </div>
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-orange-100/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-200/[0.06] px-2.5 py-1 text-orange-100/80">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
            {status}
          </span>
          <span aria-hidden="true">·</span>
          <span>Updated {updated}</span>
        </div>
        <p className="kicker text-[11px] md:text-xs">{subtitle}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-orange-50 md:text-6xl">
          {title}
        </h1>
        <div className="luxury-divider max-w-3xl" />
        <p className="max-w-3xl text-base leading-7 text-orange-50/76 md:text-lg md:leading-8">{description}</p>
      </div>
    </header>
  );
}
