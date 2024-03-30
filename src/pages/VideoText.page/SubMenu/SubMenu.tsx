import React, { forwardRef } from "react";

import "./SubMenu.scss"

const SubMenu = forwardRef((props, ref) => {
  return (
    <div className="subMenu" ref={ref}>
      <h2>
        <span>VIDEO</span>
        <span>PRODUCTION</span>
      </h2>
    </div>
  );
});

export default SubMenu;
