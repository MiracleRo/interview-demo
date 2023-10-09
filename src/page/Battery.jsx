import { useState, useEffect } from "react";

import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ReactECharts from "echarts-for-react";  // 这里确保已经安装了echarts-for-react
import "echarts/lib/chart/gauge"; 
import axiosRequest from "../util/axios";

import "./common.less";

function Main() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();

  useEffect(() => {
    const initMenu = async () => {
      setLoading(true);
      try {
        const res = await axiosRequest.get("/getBatteryEnergy", {
          params: { siteCode: 22000002 },
        });
        setInfo(res);
        setLoading(false);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    initMenu();
  }, []);

  const gaugeOption = {
    series: [
      {
        name: 'SOC',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#fff',
            color: '#7dc273',
            backgroundColor: '#fff',
          }
        },
        radius: '85%',  // 调整仪表盘的大小以适应容器
        detail: {
          formatter: '{value}%',
          fontSize: 14,  // 根据你的HTML，我调整了字体大小
          offsetCenter: [0, '10%'],  // 调整位置使其居中
          
        },
        axisLine: {
          lineStyle: {
            width: 20
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [{ value: info?.soc, name: 'SOC' }],
        title: {
          show: true,
          offsetCenter: [0, '-20%'],  // 调整标题位置
          textStyle: {
            fontSize: 14,
            color: '#828282',
          }
        }
      }
    ]
  };

  return (
    <div className="info">
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={210} />
      ) : (
        <Card sx={{ width: 210 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Battery Real Time Data
          </Typography>
          <div className="info-item">
            <ReactECharts option={gaugeOption} style={{ width: '100%', height: 150 }} />
          </div>
          
          <div className="info-item">
            <span>SOC:</span>
            <span>{info?.soc}%</span>
          </div>
          <div className="info-item">
            <span>Voltage:</span>
            <span>{info?.voltage}V</span>
          </div>
          <div className="info-item">
            <span>Temperature:</span>
            <span>{info?.temperature}℃</span>
          </div>
          <div className="info-item">
            <span>Power:</span>
            <span>{info?.power}kW</span>
          </div>
          <div className="info-item">
            <span>Current:</span>
            <span>{info?.current}A</span>
          </div>
          <div className="info-item">
            <span>Total Capacity:</span>
            <span>{info?.totalCapacity}kWh</span>
          </div>
          <div className="info-item">
            <span>Status:</span>
            <span>{info?.batteryStatus === 2 ? "Charging" : info?.batteryStatus}</span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Main;
