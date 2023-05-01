import { ComponentProps, memo, useCallback, useMemo, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { VariantProps, cva } from 'class-variance-authority';
import { SelectFieldOption, SelectFieldPayload } from './types';

const variants = cva(
  'transition-colors w-full bg-transparent outline-none border-2 border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-500 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'border-slate-700 hover:bg-slate-700 focus:border-transparent',
      },
      size: {
        lg: 'text-lg rounded-lg p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

const optionVariants = cva('cursor-pointer transition-colors', {
  variants: {
    variant: {
      primary: 'bg-slate-900 hover:bg-slate-700',
    },
    size: {
      lg: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

type OwnProps = {
  label?: string;
  options?: SelectFieldOption[];
  onChange?: (payload: SelectFieldPayload) => void;
} & VariantProps<typeof variants>;

type Props = OwnProps & Omit<ComponentProps<'select'>, keyof OwnProps>;

function SelectField({
  label,
  variant,
  size,
  className,
  options,
  value,
  name,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        onChange({ name, value: newValue });
      }
    },
    [name, onChange]
  );

  const buttonContent = useMemo(() => {
    const selectedOption = options?.find((option) => option.value === value);

    if (!value || !selectedOption) {
      return 'Select';
    }

    let text = `${selectedOption.label}`;

    if (typeof selectedOption.description !== 'undefined') {
      text += ` (${selectedOption.description})`;
    }

    return text;
  }, [options, value]);

  return (
    <div ref={containerRef} className="w-full">
      <Listbox value={value} onChange={handleChange}>
        {typeof label !== 'undefined' && <Listbox.Label>{label}</Listbox.Label>}
        <Listbox.Button className={variants({ className, variant, size })}>
          {buttonContent}
        </Listbox.Button>
        <Listbox.Options
          className="absolute rounded-lg text-slate-50 overflow-hidden max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-slate-900"
          style={{
            left: containerRef.current?.offsetLeft,
            top: containerRef.current?.offsetTop
              ? containerRef.current.offsetTop + 56
              : undefined,
          }}
        >
          {options?.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={optionVariants({ variant, size })}
            >
              {`${option.label}${
                typeof option.description !== 'undefined'
                  ? ` (${option.description})`
                  : ''
              }`}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default memo(SelectField);
