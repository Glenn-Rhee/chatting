import { InputHTMLAttributes } from "react";

export interface InputGroupProps {
  className?: string;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeHolder: string;
  name: string;
}

interface FormData {
  formData: {
    fullName?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
  };
  setFormData: (data: Partial<FormData["formData"]>) => void;
}

export default function InputGroup(props: InputGroupProps & FormData) {
  const {
    label,
    className,
    type = "text",
    placeHolder,
    name,
    formData,
    setFormData,
  } = props;

  return (
    <div className={`${className}`}>
      <label htmlFor={label} className="label p-2 ">
        <span className="text-base text-slate-200 label-text">{label}</span>
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeHolder}
        name={name}
        value={formData[name as keyof FormData["formData"]]}
        onChange={(e) => {
          setFormData({
            ...formData,
            [name]: e.target.value,
          });
        }}
        autoComplete="off"
        className="w-full input input-bordered input-primary h-10"
      />
    </div>
  );
}
