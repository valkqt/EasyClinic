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
  // const { quill, quillRef } = useQuill();

  return (
    <div
      className={classNames(css.quillContainer, { toggleDisplay: !isEditing })}
    >
      {/* <div ref={quillRef}></div> */}
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        defaultValue={details}
      />
    </div>
  );
}
