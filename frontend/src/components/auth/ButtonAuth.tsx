interface ButtonAuthProps {
  children: React.ReactNode;
  disabled?: boolean;
}
export default function ButtonAuth(props: ButtonAuthProps) {
  const { children, disabled } = props;

  return (
    <div className="mt-4">
      <button className={"mt-2 btn btn-block btn-sm"} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
