import { useEffect, useRef, useState, type ChangeEvent, type FC } from "react";
import styles from "./FileInput.module.css";
import CONTENT_PLACEHOLDER from "../../../assets/images/placeholder/content_placeholder.png";

interface IFileInputProps {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<IFileInputProps> = ({ name, label, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [_fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);

      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    } else {
      setFileName(null);
      setPreview(null);
    }

    onChange(event);
  };

  return (
    <>
      <input
        type="file"
        title="image"
        name={name}
        ref={inputRef}
        onChange={onFileChange}
        accept="image/*"
        className={styles.input__file}
      />

      <label className={styles.input__label} onClick={activateInput}>
        <img
          src={preview || CONTENT_PLACEHOLDER}
          alt={label}
          className={styles.input__image}
        />
      </label>
    </>
  );
};

export default FileInput;