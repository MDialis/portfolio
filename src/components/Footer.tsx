export default function Footer() {
  return (
    <footer className="bg-base-dark text-neutral-variant-content w-full">
      <div className="bg-neutral-variant/60 border-t border-secondary-content w-full py-4 bottom-0">
        <p className="text-center text-sm font-bold">
          © {new Date().getFullYear()} Mateus Diális
        </p>
      </div>
    </footer>
  );
}
