interface CTAProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

const CTA = (props: CTAProps) => {
  const { children, variant = "default" } = props;

  const className = variant === "outline"
    ? "inline-block px-8 py-3 font-medium text-blue-600 rounded-md border-2 border-blue-600 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg"
    : "inline-block px-8 py-3 font-medium text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-xl";

  return (
    <a
      href="#"
      className={className}
    >
      {children}
    </a>
  );
};

export default CTA;
