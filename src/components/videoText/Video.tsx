import { forwardRef, useEffect, useRef } from "react";
import "./Video.scss";
import gsap from "gsap";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const wholeSectionRef = useRef<HTMLDivElement>(null);
  let xPercent1 = -180;

  let previousPosition = 0
  let direction = true

  useEffect(() => {
    
    if (textRef1.current ) {
        gsap.set(textRef1.current, {
        left: textRef1.current.getBoundingClientRect().width,
        });
        requestAnimationFrame(animate);
    }
    window.addEventListener('scroll', handleScroll);
    return () => { // return a cleanup function to unregister our function since it will run multiple times
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  const handleScroll = () =>{
    const newPosition = window.pageYOffset
    direction = newPosition > previousPosition
    previousPosition=newPosition
    if(videoRef.current && wholeSectionRef){
        let wholeSectionHeight = wholeSectionRef.current?.offsetHeight;
        wholeSectionHeight = wholeSectionHeight ?? 0
        const percent = ((newPosition * 2) / wholeSectionHeight) * 100;
        videoRef.current.style.filter = `grayscale(${percent}%)`
    }
  }

  const animate = () => {
    if ( direction && xPercent1 > -55) {
      xPercent1 = -180;
    }
    gsap.set(textRef1.current, { xPercent: xPercent1 });
    requestAnimationFrame(animate);
    xPercent1 += (direction ? 1 : -1) * 0.1;
  };

  return (
    <div className="video-section" ref={wholeSectionRef}>
      <video
        ref={videoRef}
        className="video"
        src="/videos/waves.mp4"
        loop
        autoPlay
        muted
      ></video>
      <div className="video-copy">
            <p ref={textRef1}>GWASH FILMS GWASH FILMS GWASH FILMS</p>
            {/* <p ref={textRef2}>GWASH FILMS</p> */}
      </div>
    </div>
  );
};

export default Video;
