import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  fullWidth?: boolean
}

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  fullWidth = false,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg',
    ghost: 'bg-transparent hover:bg-dark-card text-gray-300',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button