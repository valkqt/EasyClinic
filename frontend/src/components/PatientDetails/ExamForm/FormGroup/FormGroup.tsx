import css from "./FormGroup.module.css";
import { ReactNode, useState } from "react";
import classNames from "classnames";

interface FormGroupProps {
  children?: ReactNode;
  setEditing: (state: boolean) => void;
  isEditing: boolean;
}

export function FormGroup({ children, setEditing, isEditing }: FormGroupProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={css.formGroup}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <div
        className={classNames(css.pencil, "pointer", {
          toggleDisplay: !hover || isEditing,
        })}
        onClick={() => {
          setEditing(true);
        }}
      >
        &#9998;
      </div>
    </div>
  );
}
