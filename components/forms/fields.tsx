"use client";

const INPUT_CLASSES =
  "w-full rounded-sm border border-primary/20 px-4 py-2.5 text-primary placeholder:text-primary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-primary">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={INPUT_CLASSES}
      />
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
};

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  required,
  rows = 5,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-primary">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={INPUT_CLASSES}
      />
    </div>
  );
}

type YesNoFieldProps = {
  label: string;
  name: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
};

export function YesNoField({ label, name, value, onChange }: YesNoFieldProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-primary">{label}</legend>
      <div className="flex gap-6">
        {[
          { label: "Yes", val: true },
          { label: "No", val: false },
        ].map((option) => (
          <label
            key={option.label}
            className="flex cursor-pointer items-center gap-2 text-primary"
          >
            <input
              type="radio"
              name={name}
              checked={value === option.val}
              onChange={() => onChange(option.val)}
              className="h-4 w-4 accent-[#F5A623]"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Hidden honeypot field — bots fill it, humans never see it. */
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="absolute -left-[9999px]" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
