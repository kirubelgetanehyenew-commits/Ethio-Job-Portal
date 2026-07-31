function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;