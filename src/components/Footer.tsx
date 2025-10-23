export default function Footer() {
  return (
    <footer className="w-full py-6 bg-bg-card border-t border-text-muted/10">
      <p className="text-center text-sm text-text-muted">
        © {new Date().getFullYear()} Mateus Diális. All rights reserved.
      </p>
    </footer>
  );
}
