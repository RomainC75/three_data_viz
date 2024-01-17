import React, { ChangeEvent } from "react";
import { IPoint, TCoord } from "../../@types/coords";
import { MenuItem, Select, SelectChangeEvent, Slider } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

interface PanelLineProps {
  lineData: IPoint;
  lineIndex: number;
  setLineData: (lineData: IPoint, index: number) => void;
}

const colors = [
    "red",
    "blue",
    "green",
    "yellow"
]

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

  const handleColor = (event: SelectChangeEvent<string>) =>{
      const newColor: string = event.target.value
      console.log("=> event : ", newColor )
    setLineData({
        ...lineData,
        color: newColor
    },
    lineIndex)
  }

  return (
    <div className="panelLine flex">
      <div className="flex">
        <div className="w-32">
          <p>X</p>
          <div className="border-8 border-primary">
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
          <div className="border-8 border-success">
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
          <div className="border-8 border-warning">
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
      
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lineData.color}
        label="Age"
        onChange={handleColor}
      >
        {/* <MenuItem value={"red"} defaultValue={}>red</MenuItem>
        <MenuItem value={"blue"}>blue</MenuItem>
        <MenuItem value={"green"}>green</MenuItem> */}
        {colors.map((color) => (
            <MenuItem
              key={color}
              value={color}
            //   style={getStyles(color, personName, theme)}
            >
              {color}
            </MenuItem>
          ))}
      </Select>

    </div>
  );
};

export default PanelLine;
