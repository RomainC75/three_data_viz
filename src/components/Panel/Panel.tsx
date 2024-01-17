import React from "react";
import { IPoint } from "../../@types/coords";
import { Button } from "@mui/material";
import PanelLine from "../PanelLine/PanelLine";

interface PanelProps {
  data: IPoint[];
  setData: (points: IPoint[]) => void;
}

const Panel = ({ data, setData }: PanelProps) => {
  const handleAddPoint = () => {
    const newPoint: IPoint = {
      coord: [1,1,1],
      size: 1,
      color: "red",
    };
    setData([...data, newPoint]);
  };

  const setLineData = (lineData: IPoint, index: number) => {
    console.log(" => handle line data : ", lineData, index);
    setData(data.map((p,i)=>i===index ? lineData : p))
  };

  return (
    <div className="panel">
      {data.map((lineData, index) => (
        <PanelLine
          key={`line panel ${index}`}
          lineData={lineData}
          lineIndex={index}
          setLineData={setLineData}
        />
      ))}

      <Button variant="contained" onClick={handleAddPoint}>
        Add
      </Button>
    </div>
  );
};

export default Panel;
