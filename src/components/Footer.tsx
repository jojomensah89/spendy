import { ModeToggle } from "@/components/dark-mode-toggle";
export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between py-4 px-8 text-sm text-gray-500">
      <p>
        Made 🏗 by{" "}
        <a
          href="https://github.com/jojomensah89"
          target="_blank"
          rel="noreferrer"
        >
          Ebenezer Jojo Mensah{" "}
        </a>
      </p>
      <ModeToggle />
    </footer>
  );
}
