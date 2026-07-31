function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-sm hover:shadow-lg ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;