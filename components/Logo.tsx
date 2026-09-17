import Image from "next/image";

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex items-center justify-center h-16 w-16 shrink-0 rounded-full bg-black p-1.5">
        <Image
          src="/logox.png"
          alt="RCW logo"
          width={48}
          height={48}
          className="h-full w-full rounded-full object-cover"
          priority
        />
      </span>
      <span className="text-xl font-bold tracking-tight">RCW</span>
    </span>
  );
}
