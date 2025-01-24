import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent } from '@/components/ui/card'
import moment from "moment";
import { ApexOptions } from "apexcharts";
import { AnalyticsService } from '@/services/AnalyticsService'
import { Loader } from '@/components/common/Loader'

interface HeatmapDataPoint {
  x: string;
  y: number;
  transactionCount: number;
  totalAmount: number;
}

interface HeatmapSeries {
  name: string;
  data: HeatmapDataPoint[];
}

export const SalesTrend = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [isLoading, setIsLoading] = useState(false);
  const [heatmapData, setHeatmapData] = useState<HeatmapSeries[]>([]);

  const fetchHeatmapData = async () => {
    try {
      setIsLoading(true);
      const response = await AnalyticsService.getTransactionHeatmapAnalytics(
        parseInt(selectedYear),
        parseInt(selectedMonth)
      );

      if (response && response.rows) {
        const transformedData = response.rows.map((row) => ({
          name: row.day,
          data: row.columns.map((col) => ({
            x: col.hour.toString(),
            y: col.totalAmount || 0,
            transactionCount: col.transactionCount,
            totalAmount: col.totalAmount
          }))
        }));
        setHeatmapData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching heatmap data:", error);
      setHeatmapData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeatmapData();
  }, [selectedMonth, selectedYear]);

  const options: ApexOptions = {
    chart: {
      type: "heatmap",
      height: 350,
      toolbar: {
        show: false
      },
      fontFamily: "inherit",
      background: "transparent"
    },
    plotOptions: {
      heatmap: {
        distributed: true,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: "#F0F7FF",
              name: "no transactions"
            },
            {
              from: 0.01,
              to: 100,
              color: "#D1E3FF",
              name: "very low"
            },
            {
              from: 100.01,
              to: 500,
              color: "#9DBBF5",
              name: "low"
            },
            {
              from: 500.01,
              to: 1000,
              color: "#739CF2",
              name: "medium"
            },
            {
              from: 1000.01,
              to: 5000,
              color: "#4A7EF0",
              name: "high"
            }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    xaxis: {
      type: "category",
      position: "top",
      labels: {
        formatter: function (value: any) {
          if (typeof value === "number") {
            return value.toString().padStart(2, "0");
          }
          if (typeof value === "string") {
            return value.padStart(2, "0");
          }
          return "00";
        },
        style: {
          fontSize: "12px",
          fontWeight: 400,
          colors: "#64748b"
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        align: "left",
        style: {
          fontSize: "13px",
          fontWeight: 400,
          colors: "#64748b"
        },
        offsetX: 10
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        top: 20,
        right: 12,
        bottom: 12,
        left: 12
      }
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        if (
          !series ||
          !series[seriesIndex] ||
          !series[seriesIndex].data ||
          !series[seriesIndex].data[dataPointIndex]
        ) {
          return "";
        }

        const data = series[seriesIndex].data[dataPointIndex];
        const hour = typeof data.x === "string" ? data.x : data.x.toString();
        const amount = data.totalAmount ? data.totalAmount.toFixed(2) : "0.00";

        return `
          <div class="px-2 py-1">
            <div>${series[seriesIndex].name} ${hour.padStart(2, "0")}:00</div>
            <div>Transactions: ${data.transactionCount}</div>
            <div>Amount: $${amount}</div>
          </div>
        `;
      }
    }
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-4">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ minWidth: "140px" }}
            >
              {moment.months().map((month, index) => (
                <option key={month} value={(index + 1).toString()}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ minWidth: "100px" }}
            >
              {[2025, 2024, 2023].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Card>
          <CardContent>
            {isLoading ? (
              <Loader />
            ) : (
              <ReactApexChart
                options={options}
                series={heatmapData}
                type="heatmap"
                height={350}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
