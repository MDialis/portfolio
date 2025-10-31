export default function Footer() {
  return (
    <footer className="w-full py-6 bg-secondary">
      <p className="text-center text-sm text-secondary-content">
        © {new Date().getFullYear()} Mateus Diális. All rights reserved.
      </p>
    </footer>
  );
}
