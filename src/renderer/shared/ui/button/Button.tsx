import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const variants = cva(
  'flex justify-center items-center transition-colors disabled:opacity-50 outline-none border-none focus:ring-2 focus:ring-blue-500',
  {
    variants: {
      variant: {
        primary:
          'bg-purple-700 text-slate-50 hover:bg-purple-600 active:bg-purple-800',
        danger: 'bg-red-700 text-slate-50 hover:bg-red-600 active:bg-red-800',
      },
      size: {
        lg: 'p-2 text-lg rounded-lg ',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

type OwnProps = VariantProps<typeof variants>;

type Props = OwnProps & Omit<ComponentProps<'button'>, keyof OwnProps>;

function Button({
  type = 'button',
  variant,
  size,
  className,
  children,
  ...otherProps
}: Props) {
  return (
    <button
      type={type}
      className={variants({ size, variant, className })}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
