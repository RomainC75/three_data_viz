import React, { ChangeEvent } from "react";
import { IPoint, TCoord } from "../../@types/coords";
import { Slider } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

interface PanelLineProps {
  lineData: IPoint;
  lineIndex: number;
  setLineData: (lineData: IPoint, index: number) => void;
}

const PanelLine = ({ lineData, lineIndex, setLineData }: PanelLineProps) => {
  const handleSlider = (_, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      setLineData(
        {
          ...lineData,
          size: newValue,
        },
        lineIndex
      );
    }
  };
  const setCoord = (
    newValues: (ChangeEvent<HTMLInputElement> | undefined)[]
  ) => {
    console.log("=> new value : ", newValues);
    const newCoord: TCoord = [...lineData.coord];
    newValues.forEach((v, i) => {
      if (v != undefined) {
        newCoord[i] = parseFloat(v.target.value);
      }
    });
    setLineData(
      {
        ...lineData,
        coord: newCoord,
      },
      lineIndex
    );
  };

  return (
    <div className="panelLine flex">
      <div className="flex">
        <div className="w-32">
          <p>X</p>
          <div className="border border-primary">
          <input
            type="number"
            step="0.1"
            min="0"
            max="20"
            value={lineData.coord[0]}
            onChange={(event) => setCoord([event, undefined, undefined])}
          />
          </div>
        </div>
        <div className="w-32">
          <p>Y</p>
          <div className="border border-primary">
          <input
            type="number"
            step="0.1"
            min="0"
            max="20"
            value={lineData.coord[1]}
            onChange={(event) => setCoord([undefined, event, undefined])}
          />
          </div>
        </div>
        <div className="w-32">
          <p>Z</p>
          <div className="border border-primary">
          <input
            type="number"
            step="0.1"
            min="0"
            max="20"
            value={lineData.coord[2]}
            onChange={(event) => setCoord([undefined, undefined, event])}
          />
          </div>
        </div>
      </div>
      <div className="w-32">
        <Slider
          aria-label="Volume"
          value={lineData.size}
          onChange={handleSlider}
        />
      </div>
    </div>
  );
};

export default PanelLine;
