import Image from "next/image";

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src="/logo-circle.png"
        alt="RCW logo"
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-full"
        priority
      />
      <span className="text-xl font-bold tracking-tight">RCW</span>
    </span>
  );
}
