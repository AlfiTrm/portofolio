"use client";

import { motion, type MotionValue } from "framer-motion";

interface TransitionFramesProps {
  frameOpacity: MotionValue<number>;
  sideFrameWidth: MotionValue<string>;
  topFrameHeight: MotionValue<string>;
  bottomFrameHeight: MotionValue<string>;
  leftFrameRotate: MotionValue<number>;
  rightFrameRotate: MotionValue<number>;
  topFrameRotate: MotionValue<number>;
  bottomFrameRotate: MotionValue<number>;
  slashFrameWidth: MotionValue<string>;
  slashFrameOpacity: MotionValue<number>;
}

export default function TransitionFrames({
  frameOpacity,
  sideFrameWidth,
  topFrameHeight,
  bottomFrameHeight,
  leftFrameRotate,
  rightFrameRotate,
  topFrameRotate,
  bottomFrameRotate,
  slashFrameWidth,
  slashFrameOpacity,
}: TransitionFramesProps) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -bottom-[26vh] -top-[26vh] left-[-18vw] z-10 origin-left bg-[#f2ede6]"
        style={{ width: sideFrameWidth, opacity: frameOpacity, rotate: leftFrameRotate, clipPath: "polygon(0 0, 82% 5%, 100% 92%, 0 100%)" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -bottom-[26vh] -top-[26vh] right-[-18vw] z-10 origin-right bg-[#f2ede6]"
        style={{ width: sideFrameWidth, opacity: frameOpacity, rotate: rightFrameRotate, clipPath: "polygon(18% 5%, 100% 0, 100% 100%, 0 92%)" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[-22vw] right-[-22vw] top-[-10vh] z-10 origin-top bg-[#f2ede6]"
        style={{ height: topFrameHeight, opacity: frameOpacity, rotate: topFrameRotate, clipPath: "polygon(0 0, 100% 0, 92% 74%, 10% 100%)" }}
        aria-hidden="true"
      />  
      <motion.div
        className="pointer-events-none absolute bottom-[-10vh] left-[-22vw] right-[-22vw] z-10 origin-bottom bg-[#f2ede6]"
        style={{ height: bottomFrameHeight, opacity: frameOpacity, rotate: bottomFrameRotate, clipPath: "polygon(8% 0, 92% 18%, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute left-[-24vw] top-[6vh] z-10 h-[36vh] origin-left rotate-[-28deg] bg-[#f2ede6]"
        style={{ width: slashFrameWidth, opacity: slashFrameOpacity, clipPath: "polygon(0 16%, 100% 0, 92% 82%, 4% 100%)" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-[3vh] right-[-26vw] z-10 h-[34vh] origin-right rotate-[-28deg] bg-[#f2ede6]"
        style={{ width: slashFrameWidth, opacity: slashFrameOpacity, clipPath: "polygon(7% 0, 100% 14%, 96% 100%, 0 76%)" }}
        aria-hidden="true"
      />
    </>
  );
}
