import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <MuiButton sx={{ width: 200, height: 50, padding: 1, margin: 2, textTransform: 'none'}} {...rest}>
      {children}
    </MuiButton>
  );
}
