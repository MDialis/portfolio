interface ButtonProps {
  text: string;
  link?: string; // Now optional
  onClick?: () => void; // New optional prop
}

export default function Button({ text, link, onClick }: ButtonProps) {
  const commonClasses = `
    px-6 py-3 rounded-xl
    font-semibold text-primary-content
    bg-primary shadow-lg
    hover:shadow-xl hover:shadow-primary/20
    hover:brightness-120
    transition-all duration-200 ease-in-out
    cursor-pointer
  `;
  
  return (
    <div className="flex justify-end">
      {link ? (
        // If a link exists, render an Anchor tag
        <a href={link} onClick={onClick} className={commonClasses}>
          {text}
        </a>
      ) : (
        // If no link, render a Button tag
        <button type="button" onClick={onClick} className={commonClasses}>
          {text}
        </button>
      )}
    </div>
  );
}
