import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

const Table = ({ id, drawerClickFunc, data, tableColumns }) => {
  let gridComponent;

  return (
    <GridComponent
      id={id}
      dataSource={data}
      width="auto"
      pageSettings={{ pageCount: 5 }}
      rowSelected={drawerClickFunc}
      ref={(g) => (gridComponent = g)}
    >
      <ColumnsDirective>
        {tableColumns &&
          tableColumns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
      </ColumnsDirective>
      <Inject services={[Page, Toolbar]} />
    </GridComponent>
  );
};

export default Table;
