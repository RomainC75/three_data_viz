import React, { useEffect, useRef } from 'react'

import "./BlablaSection.scss"

const BlablaSection = () => {
    const titleRef= useRef<HTMLDivElement | null>(null);
    const textRef= useRef<HTMLDivElement | null>(null);

    const handleScroll = () =>{
        const newPosition = window.pageYOffset
        if (newPosition>300 && titleRef && textRef && titleRef.current && textRef.current){
            titleRef.current.style.left= "0";
            titleRef.current.style.opacity= "1";
            textRef.current.style.right= "0";
            textRef.current.style.opacity= "1";
        }
    }

    useEffect(() => {    
        window.addEventListener('scroll', handleScroll);
        return () => { // return a cleanup function to unregister our function since it will run multiple times
            window.removeEventListener("scroll", handleScroll);
            };
        }, []);

  return (
    <section className="blabla_section">
        <div className="sub_title" ref={titleRef}>
            <h2>OUR STORY</h2>
        </div>
        <div className="text" ref={textRef}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi fuga, quis ipsam soluta debitis nihil, animi non vitae nemo distinctio libero. Nobis, nam totam nesciunt, at quo sed atque vel consequatur quod doloremque quis dignissimos dolorum eveniet laboriosam unde fugit expedita animi magnam neque. Nemo deleniti dolorem officiis ratione amet. Provident, iste. Quaerat, corporis. Dolores veritatis voluptatem soluta sint fugit architecto vel, obcaecati non ipsum magni deleniti porro praesentium modi quas ipsa culpa nesciunt totam. Repudiandae, culpa esse. Soluta nobis provident aut ducimus, repellendus necessitatibus natus eligendi quae nisi velit praesentium porro fugit autem laborum, quod aperiam voluptatem quia ipsum.</p>
        </div>
    </section>
  )
}

export default BlablaSection