import CheckboxGroup from "./CheckboxGroup";

export default function GenderCheckbox() {
  return (
    <div className="flex justify-around">
      <CheckboxGroup gender="Male" />
      <CheckboxGroup gender="Female" />
    </div>
  );
}
