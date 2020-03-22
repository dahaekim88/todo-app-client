import { Workbook } from "exceljs";
import  FileSaver from "file-saver";

export const headers = [
  {
    header: "ID",
    key: "id",
    width: 12,
  },
  {
    header: "Title",
    key: "title",
    width: 36,
  },
  {
    header: "Complete",
    key: "is_completed",
    width: 18,
  },
  {
    header: "Due Date",
    key: "due_date",
    width: 22,
  },
  {
    header: "Created Date",
    key: "created_date",
    width: 22,
  },
  {
    header: "Updated Date",
    key: "updated_date",
    width: 22,
  },
];

export async function createSpreadSheet(headers, data, filename = "Todo List", sheetname = "Todo") {
  const wb = new Workbook();
  const ws = wb.addWorksheet(sheetname, {
    properties: {
      defaultRowHeight: 20,
    },
    views: [{showGridLines: false}],
  });

  ws.columns = headers;
  ws.addRows(data);

  const drawOuterBorder = (border = {}) => ({
    top: border,
    right: border,
    bottom: border,
    left: border,
  });

  const border = {
    style: "thin",
    color: {argb: "FF011C27"},
  };

  const headerFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {argb: "FF011C27"},
  };

  const headerFont = {
    family: 2,
    bold: true,
    color: {argb: "FFFFFFFF"},
  };

  const bodyFont = {
    family: 2,
  };

  const alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };

  ws.eachRow({includeEmpty: true}, (row, rowNumber) => {
    if (rowNumber === 1) {
      row.height = 22;
      row.eachCell((cell) => {
        cell.border = drawOuterBorder(border);
        cell.fill = headerFill;
        cell.font = headerFont;
        cell.alignment = alignment;
      });
    } else {
      row.eachCell((cell) => {
        cell.border = drawOuterBorder(border);
        cell.font = bodyFont;
        cell.alignment = alignment;
      });
    }
  });

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  FileSaver.saveAs(blob, filename);
}
