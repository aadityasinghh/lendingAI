// components/numeric-field.tsx
type NumericFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  name?: string;
};

export function NumericField({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  name,
}: NumericFieldProps) {
  return (
    <div className="field">
      <label htmlFor={name ?? label}>{label}</label>
      <input
        id={name ?? label}
        type="number"
        min={min}
        step={step}
        value={Number.isNaN(value) ? "" : value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}