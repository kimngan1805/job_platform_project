import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, alpha } from "@mui/material";

const OverviewChart = ({ isDashboard = false, data = [] }) => {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const newPosts = {
      id: "Tổng Tin Đăng",
      color: theme.palette.secondary.main,
      data: [],
    };

    const approvedPosts = {
      id: "Tin Đã Duyệt",
      color: theme.palette.info.main,
      data: [],
    };

    data.forEach((item) => {
      newPosts.data.push({ x: item.monthYear, y: item.totalNewPosts || 0 });
      approvedPosts.data.push({ x: item.monthYear, y: item.totalApprovedPosts || 0 });
    });

    return [newPosts, approvedPosts];
  }, [data, theme]);

  if (chartData.length === 0 || chartData[0].data.length === 0) {
    return (
      <div style={{ 
        height: "100%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: theme.palette.text.secondary,
        fontSize: "1.1rem"
      }}>
        Chưa có dữ liệu tin đăng trong 12 tháng gần nhất
      </div>
    );
  }

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        background: "transparent",
        text: { fill: theme.palette.text.primary },
        axis: {
          domain: { line: { stroke: theme.palette.divider, strokeWidth: 1 } },
          ticks: {
            line: { stroke: theme.palette.divider },
            text: { fill: theme.palette.text.secondary, fontSize: 11 },
          },
          legend: { text: { fill: theme.palette.text.primary, fontSize: 12 } },
        },
        grid: { line: { stroke: alpha(theme.palette.text.secondary, 0.1), strokeWidth: 1 } },
        legends: { text: { fill: theme.palette.text.primary } },
        tooltip: {
          container: {
            background: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
            padding: "10px 14px",
            boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.15)}`,
          },
        },
      }}
      colors={(d) => d.color}
      margin={isDashboard 
        ? { top: 40, right: 80, bottom: 80, left: 80 } 
        : { top: 60, right: 120, bottom: 100, left: 100 }
      }
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.0f"
      curve="monotoneX"
      enableArea={true}
      areaOpacity={0.15}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 8,
        tickPadding: 8,
        tickRotation: -45,
        legend: "Tháng",
        legendPosition: "middle",
        legendOffset: 60,
        format: (value) => value.split("/")[0], // Chỉ hiện tháng (11 thay vì 11/2025)
      }}
      axisLeft={{
        tickSize: 8,
        tickPadding: 8,
        tickRotation: 0,
        legend: "Số lượng",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-14}
      useMesh={true}
      enableCrosshair={true}
      crosshairType="bottom-left"

      // LEGEND – ĐẸP & KHÔNG BỊ CHE
      legends={
        isDashboard
          ? [
              {
                anchor: "top-right",
                direction: "row",
                justify: false,
                translateX: -20,
                translateY: -40,
                itemsSpacing: 20,
                itemDirection: "left-to-right",
                itemWidth: 140,
                itemHeight: 20,
                itemOpacity: 0.9,
                symbolSize: 14,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: { itemOpacity: 1 },
                  },
                ],
              },
            ]
          : undefined
      }

      // Hiệu ứng khi hover điểm
      motionConfig="gentle"
    />
  );
};

export default OverviewChart;