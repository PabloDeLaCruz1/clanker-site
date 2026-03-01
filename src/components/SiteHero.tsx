import Image from "next/image";

type Props = {
  subtitle: string;
  title: string;
  description: string;
};

export function SiteHero({ subtitle, title, description }: Props) {
  return (
    <header className="flex items-start gap-4 md:gap-5">
      <div className="avatar-ring overflow-hidden rounded-2xl">
        <Image src="/avatar-clanker.svg" alt="Clanker avatar" width={68} height={68} priority />
      </div>
      <div>
        <p className="kicker text-[11px] md:text-xs">{subtitle}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-orange-50 md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-orange-50/80 md:text-lg">{description}</p>
      </div>
    </header>
  );
}
