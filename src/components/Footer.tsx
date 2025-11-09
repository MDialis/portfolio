export default function Footer() {
  return (
    <footer className="w-full py-6 bg-accent">
      <p className="text-center text-sm font-bold text-accent-content">
        © {new Date().getFullYear()} Mateus Diális. All rights reserved.
      </p>
    </footer>
  );
}
