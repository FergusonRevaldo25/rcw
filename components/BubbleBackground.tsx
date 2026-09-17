export default function BubbleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block"
    >
      <img
        src="/liquid_bubble.png"
        alt=""
        className="absolute -left-40 -top-24 w-[520px] max-w-none opacity-60 lg:opacity-80 animate-float-a"
      />
      <img
        src="/liquid_bubble.png"
        alt=""
        className="absolute -right-40 bottom-[-10%] w-[520px] max-w-none scale-x-[-1] opacity-60 lg:opacity-80 animate-float-b"
      />
    </div>
  );
}
