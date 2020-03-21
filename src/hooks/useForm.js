import { useState, useCallback } from "react";

const useForm = (callback) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
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
  }

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      handleSubmit();
    }
  }

  const resetInput = useCallback(() => setValue(""));
  const resetError = useCallback(() => setError(""));

  return {
    error,
    value,
    setValue,
    resetInput,
    resetError,
    handleChange,
    handleSubmit,
    handleKeydown,
  }
}

export default useForm;
