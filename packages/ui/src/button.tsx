import React from "react";
import styles from "./button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
