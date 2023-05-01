import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, memo, useCallback, useId } from 'react';
import { TextFieldPayload } from './types';

const variants = cva(
  'w-full bg-transparent outline-none border-2 border-transparent focus:ring-2 focus:ring-blue-500',
  {
    variants: {
      variant: {
        primary: 'border-slate-500 focus:border-transparent',
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

type OwnProps = {
  label?: string;
  onChange?: (payload: TextFieldPayload) => void;
} & VariantProps<typeof variants>;

type Props = OwnProps & Omit<ComponentProps<'input'>, keyof OwnProps>;

const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, variant, size, className, onChange, ...otherProps }, ref) => {
    const id = useId();

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange !== 'undefined') {
          onChange({ name: event.target.name, value: event.target.value });
        }
      },
      [onChange]
    );

    return (
      <div className={className}>
        {typeof label !== 'undefined' && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          {...otherProps}
          className={variants({ variant, size })}
          onChange={handleChange}
        />
      </div>
    );
  }
);

export default memo(TextField);
