import { useState, useEffect } from "react";

import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import axiosRequest from "../util/axios";

import "./common.less";

function Main() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();

  useEffect(() => {
    const initMenu = async () => {
      setLoading(true);
      try {
        const res = await axiosRequest.get("/device/info", {
          params: { sn: "BATT2023241112", siteCode: 22000002 },
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
  return (
    <div className="info">
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={210} />
      ) : (
        <Card sx={{ width: 210, height: 210 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            BATTERY INFO
          </Typography>
          <div className="info-item">
            <span>SOC:</span>
            <span>{info?.soc}</span>
          </div>
          <div className="info-item">
            <span>TEMPERATURE:</span>
            <span>{info?.temperature}</span>
          </div>
          <div className="info-item">
            <span>TYPE:</span>
            <span>{info?.type}</span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Main;
