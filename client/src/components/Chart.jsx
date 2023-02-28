import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import * as React from "react";

const Chart = ({ data, xName, yName, name }) => {
  const primaryxAxis = { valueType: "Category" };
  const tooltip = { enable: true, shared: false };
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={primaryxAxis}
      tooltip={tooltip}
      background={"#FFFFFF"}
    >
      <Inject services={[ColumnSeries, Tooltip, LineSeries, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName={xName}
          yName={yName}
          name={name}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default Chart;
