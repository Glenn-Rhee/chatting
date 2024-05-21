import { Link } from "react-router-dom";

interface LinkProps {
  children: React.ReactNode;
  href: string;
}
export default function LinkCu(props: LinkProps) {
  const { children, href } = props;

  return (
    <Link
      to={href}
      className="text-sm hover:underline hover:text-blue-400 text-slate-200 mt-3 inline-block"
    >
      {children}
    </Link>
  );
}
