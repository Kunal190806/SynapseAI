import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-primary"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.28-.14-1.2-1.1-1.2-1.1s-.42-1.06-1.7-1.06c-1.28 0-1.7.94-1.7.94s-1.17 1.05-1.37 1.22c-.2.17-.45.34-.73.5-1.26.73-2.77 1.12-4.2 1.12-.22 0-.43-.02-.64-.05C9.02 18.48 11.18 20 12 20c2.03 0 3.86-1.19 4.7-2.95.14-.28.25-.57.34-.87.06-.2.09-.4.1-.6.06-.22.06-.45 0-.68zM12 4c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
      <span className="text-xl font-headline">SynapseAI</span>
    </Link>
  );
}
