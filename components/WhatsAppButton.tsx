"use client";

// Update the number below to your business WhatsApp number, international
// format, no + or spaces (e.g. 27821234567 for a South African number).
const WHATSAPP_NUMBER = "27656855335";
const PREFILLED_MESSAGE = "Hi RCW, I'd like a quote for a website.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="gradient-accent fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1.1-3.4a8.4 8.4 0 0 1-1.1-4A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
    </a>
  );
}
