import { useId } from "react";

interface Props {
  text: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox = ({ text, name, checked = false, onChange }: Props) => {
  const id = useId();

  return (
    <div className="contents">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <label
        htmlFor={id}
        className="peer-checked:text-white peer-checked:bg-purple-800 peer-checked:border-purple-800 cursor-pointer px-2 py-1 text-sm border border-gray-300 text-gray-400 rounded-md"
      >
        {text}
      </label>
    </div>
  );
};

export default CheckBox;
