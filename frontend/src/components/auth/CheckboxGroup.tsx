import { useSignup } from "../../zustand/authStore";

interface CheckboxGroupProps {
  gender: "Male" | "Female";
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
  const { gender } = props;

  const { formDataSignup, setFormDataSignup } = useSignup();

  return (
    <div className="form-control mt-2">
      <label htmlFor={gender} className="label gap-2 cursor-pointer">
        <span className="label-text text-slate-200">{gender}</span>
        <input
          type="checkbox"
          checked={formDataSignup.gender === gender.toLocaleLowerCase()}
          className="checkbox checkbox-info border-slate-600"
          onChange={(e) => {
            if (e.target.checked) {
              setFormDataSignup({
                ...formDataSignup,
                gender: gender.toLocaleLowerCase(),
              });
            } else {
              setFormDataSignup({
                ...formDataSignup,
                gender: "",
              });
            }
          }}
        />
      </label>
    </div>
  );
}
