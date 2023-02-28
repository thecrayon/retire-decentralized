import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Search,
  Page,
  ExcelExport,
  PdfExport,
  Toolbar,
  Sort,
} from "@syncfusion/ej2-react-grids";

const Table = ({ id, drawerClickFunc, data, tableColumns, paging = true }) => {
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];

  let gridComponent;

  const toolbarClick = (args) => {
    if (gridComponent && args.item.text === "Excel Export") {
      gridComponent.excelExport();
    }
    if (gridComponent && args.item.text === "PDF Export") {
      gridComponent.pdfExport();
    }
  };

  return (
    <GridComponent
      id={id}
      dataSource={data}
      width="auto"
      allowExcelExport
      allowPdfExport
      allowSorting
      allowPaging={paging}
      pageSettings={{ pageCount: 5 }}
      toolbar={toolbarOptions}
      rowSelected={drawerClickFunc}
      toolbarClick={toolbarClick}
      ref={(g) => (gridComponent = g)}
    >
      <ColumnsDirective>
        {tableColumns &&
          tableColumns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
      </ColumnsDirective>
      <Inject
        services={[Page, Toolbar, Sort, Search, Page, ExcelExport, PdfExport]}
      />
    </GridComponent>
  );
};

export default Table;
