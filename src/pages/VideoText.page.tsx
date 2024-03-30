import React, { useEffect, useRef } from "react";
import Video from "../components/videoText/Video";
import SubMenu from "./VideoText.page/SubMenu/SubMenu";

import "./VideoText.page.scss"
import BlablaSection from "./VideoText.page/BlablaSection/BlablaSection";

const VideoTextPage = () => {
    const subMenuRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    console.log("=============")
    const scrollPosition = window.pageYOffset;
    const wholeSectionHeight = subMenuRef.current?.offsetHeight;
    if(wholeSectionHeight && scrollPosition < wholeSectionHeight){
        subMenuRef.current.style.top = `${scrollPosition/0.8}px`
        subMenuRef.current.style.opacity = `${(wholeSectionHeight-scrollPosition)/wholeSectionHeight}`
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
        <div className="shade"></div>
      <SubMenu ref={subMenuRef}/>
      <Video></Video>

      <div>
        <BlablaSection/>
      </div>
    </>
  );
};

export default VideoTextPage;
