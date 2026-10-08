function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary: "btn btn-primary",
    secondary: "btn btn-outline",
    success: "btn btn-success",
    danger: "btn btn-danger",
  };

  return (
    <button
      className={`${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
