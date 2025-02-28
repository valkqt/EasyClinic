import "quill/dist/quill.snow.css";
import css from "./Editor.module.css";
import classNames from "classnames";
import ReactQuill from "react-quill-new";

interface EditorProps {
  details: string;
  setDetails: (state: string) => void;
  isEditing: boolean;
}

export function Editor({ details, setDetails, isEditing }: EditorProps) {
  return (
    <div
      className={classNames(css.quillContainer, { toggleDisplay: !isEditing })}
    >
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        defaultValue={details}
        style={{ height: "100%" }}
      />
    </div>
  );
}
