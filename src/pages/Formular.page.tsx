import { useState } from "react";
import { IPoint } from "../@types/coords";
import Scene from "../components/Scene";
import Panel from "../components/Panel/Panel";

const Formular = () => {
  const [data, setData] = useState<IPoint[]>([]);

  return (
    <div>
        <h1 className="text-3xl font-bold underline">Formular</h1>
      <Scene data={data} />
      <Panel data={data} setData={setData} />
    </div>
  );
};

export default Formular;
