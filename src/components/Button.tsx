export default function Button({ text, link }: { text: string; link: string }) {
  return (
    <div className="flex justify-end">
      <a
        href={link}
        className="
          px-6 py-3 rounded-xl
          font-semibold text-primary-content
          bg-primary shadow-lg
          hover:shadow-xl hover:shadow-primary/20
          hover:brightness-120
          transition-all duration-200 ease-in-out"
      >
        {text}
      </a>
    </div>
  );
}
