import Material from "./material";

interface ButtonGroupInterface<T> {
  items: T[]; // Ejemplo: una propiedad "items" de tipo array de T
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupInterface<string>> = ({
  items,
  value,
  onChange,
  className
}) => {
  return (
    <div className={`flex ${className}`}>
      {items.map((item, index) => (
        <Material
          key={index}
          className={`${
            index === 0
              ? "rounded-l-[24px]"
              : index + 1 === items.length
              ? "rounded-r-[24px]"
              : ""
          } transition-opacity text-black ${
            value == item ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            if (onChange) {
              onChange(item); // Llamar onChange solo si está definido
            }
          }}
        >
          {item}
        </Material>
      ))}
    </div>
  );
};

export default ButtonGroup;
