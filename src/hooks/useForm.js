import { useState, useRef, useEffect } from "react";

const useForm = (callback, extraFn = () => {}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error])
  
  const handleChange = (e) => {
    if (error) {
      resetError();
    }
    e.persist();
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!value) {
      setError("내용을 입력해주세요!");
      return;
    }
    resetError();
    callback();
    extraFn();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      handleSubmit();
    }
  }

  const resetInput = () => setValue("");
  const resetError = () => setError(null);

  return {
    inputRef,
    error,
    value,
    setValue,
    resetInput,
    resetError,
    handleChange,
    handleSubmit,
    handleKeyPress,
  }
}

export default useForm;
