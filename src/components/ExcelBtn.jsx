import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Message } from "./styled";
import { API_URL } from "../../.config";
import { store } from "../store";
import { headers, createSpreadSheet } from "../utils/export";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4%;

  @media screen and (max-width: 470px) and (min-width: 769px)  {
    flex-wrap: no-wrap;
  }
`;

const ExcelBtn = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [file, setFile] = useState("");
  const inputRef = useRef(null);

  const exportToExcel = async () => {
    const result = await axios.get(`${API_URL}/tasks`);
    const data = result.data.tasks.map((task, index) => {
      task.id = index + 1;
      task.due_date = !task.due_date ? "-" : task.due_date;
      return task;
    })
    await createSpreadSheet(headers, data);
  }

  const importFromExcel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await axios.post(`${API_URL}/tasks/import`, formData);
    const { count, totalCounts, tasks } = result.data;
    dispatch({
      type: "UPDATE_ALL",
      current: {
        page: "all",
        count,
      },
      totalCounts,
      tasks,
    });
    inputRef.current.value = "";
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (File.prototype.isPrototypeOf(file)) {
      importFromExcel(file);
    }
  }, [file]);

  return (
    <Container>
      <div className="excel-btn" onClick={exportToExcel}>Export to Excel</div>
      <label htmlFor="file-upload" className="excel-btn">Import from Excel</label>
      <input ref={inputRef} type="file" id="file-upload" accept=".xlsx" onChange={handleChange} />
      <Message className="text-right">* export한 파일과 동일한 양식의 xlsx 파일만 업로드 가능합니다.</Message>
    </Container>
  )
}

export default React.memo(ExcelBtn);
