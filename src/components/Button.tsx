export default function Button({ text, link }: { text: string; link: string }) {
  return (
    <div className="mt-10 flex justify-end p-5">
      <a
        href={link}
        className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-colors"
      >
        {text}
      </a>
    </div>
  );
}
