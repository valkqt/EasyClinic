import "quill/dist/quill.snow.css";
import css from "./Editor.module.css";
import classNames from "classnames";

interface EditorProps {
  quill: any;
  quillRef: any;
  isEditing: boolean;
}

export function Editor({ quill, quillRef, isEditing }: EditorProps) {
  // const { quill, quillRef } = useQuill();

  return (
    <div
      className={classNames(css.quillContainer, { toggleDisplay: !isEditing })}
    >
      <div ref={quillRef}></div>
    </div>
  );
}
