export default function BubbleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img
        src="/liquid_bubble.png"
        alt=""
        className="lava-blob lava-blob-1 -left-24 -top-16 w-[260px] max-w-none opacity-50 sm:-left-32 sm:w-[360px] sm:opacity-60 lg:-left-40 lg:-top-24 lg:w-[520px] lg:opacity-80"
      />
      <img
        src="/liquid_bubble.png"
        alt=""
        className="lava-blob lava-blob-2 -right-24 bottom-[-8%] w-[260px] max-w-none opacity-50 sm:-right-32 sm:w-[360px] sm:opacity-60 lg:-right-40 lg:bottom-[-10%] lg:w-[520px] lg:opacity-80"
      />
    </div>
  );
}
