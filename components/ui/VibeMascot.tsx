import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MascotState =
  | "idle"
  | "name-empty"
  | "name-typed"
  | "email"
  | "password"
  | "success"
  | "error"
  | "refer-idle"
  | "refer-hover";

interface MascotProps {
  state?: MascotState;
  showPassword?: boolean;
}

export const VibeMascot: React.FC<MascotProps> = ({
  state = "idle",
  showPassword,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === "email" || state === "name-empty" || state === "name-typed") {
      interval = setInterval(() => setIsTyping((p) => !p), 150);
    } else {
      setIsTyping(false);
    }
    return () => clearInterval(interval);
  }, [state]);

  const activeState =
    state === "password" && showPassword ? "password-peek" : state;

  const springTransition = { type: "spring", stiffness: 200, damping: 20 };

  const cBlue = "#0190D4";
  const cRed = "#E3001B";
  const cYellow = "#FCE300";
  const cWhite = "#FFFFFF";
  const cStroke = "#1a1a1a";

  const headVariants = {
    idle: {
      y: [0, 2, 0],
      rotate: [0, -1, 1, 0],
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
    },
    "name-empty": {
      y: [0, 1, 0],
      rotate: -2,
      transition: { repeat: Infinity, duration: 2 },
    },
    "name-typed": {
      y: [0, 1, 0],
      rotate: 2,
      transition: { repeat: Infinity, duration: 2 },
    },
    email: {
      y: [0, 2, 0],
      rotate: [0, 2, -2, 0],
      transition: { repeat: Infinity, duration: 0.5 },
    },
    password: { y: 2, rotate: 0 },
    "password-peek": { y: -1, rotate: 3 },
    success: {
      y: [0, -10, 0],
      rotate: [0, -3, 3, 0],
      transition: { repeat: Infinity, duration: 0.6 },
    },
    error: { y: 8, rotate: 5, transition: springTransition },
    "refer-idle": {
      y: [0, 3, 0],
      rotate: [0, 2, -2, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
    "refer-hover": { y: -3, rotate: -3, transition: { duration: 0.3 } },
  };

  const leftPupil = {
    idle: {
      cx: 89,
      cy: 62,
      scaleY: [1, 0.1, 1, 1],
      transition: { repeat: Infinity, duration: 3, times: [0, 0.05, 0.1, 1] },
    },
    "name-empty": { cx: 86, cy: 62 },
    "name-typed": { cx: 86, cy: 62 },
    email: {
      cx: [86, 92, 86],
      cy: 62,
      transition: { repeat: Infinity, duration: 0.5 },
    },
    password: { cx: 89, cy: 62, opacity: 0 },
    "password-peek": { cx: 92, cy: 62, opacity: 1 },
    success: { opacity: 0 },
    error: { cx: 89, cy: 65 },
    "refer-idle": {
      cx: 89,
      cy: 62,
      scaleY: [1, 0.1, 1, 1],
      transition: { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 1] },
    },
    "refer-hover": { cx: 89, cy: 62, opacity: 0 },
  };

  const rightPupil = {
    idle: {
      cx: 111,
      cy: 62,
      scaleY: [1, 0.1, 1, 1],
      transition: { repeat: Infinity, duration: 3, times: [0, 0.05, 0.1, 1] },
    },
    "name-empty": { cx: 108, cy: 62 },
    "name-typed": { cx: 108, cy: 62 },
    email: {
      cx: [108, 114, 108],
      cy: 62,
      transition: { repeat: Infinity, duration: 0.5 },
    },
    password: { cx: 111, cy: 62, opacity: 0 },
    "password-peek": { cx: 111, cy: 62, opacity: 0 },
    success: { opacity: 0 },
    error: { cx: 111, cy: 65 },
    "refer-idle": {
      cx: 111,
      cy: 62,
      scaleY: [1, 0.1, 1, 1],
      transition: { repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 1] },
    },
    "refer-hover": { cx: 111, cy: 62, opacity: 0 },
  };

  const happyEyeLeftVariant = {
    idle: { opacity: 0 },
    success: { opacity: 1 },
    "refer-hover": { opacity: 1 },
    "password-peek": { opacity: 0 },
    password: { opacity: 0 },
    error: { opacity: 0 },
    default: { opacity: 0 },
  };

  const happyEyeRightVariant = {
    ...happyEyeLeftVariant,
    "password-peek": { opacity: 0 },
  };

  const mouthPath: Record<string, string> = {
    idle: "M 75 95 Q 100 120 125 95",
    "name-empty": "M 85 95 Q 100 100 115 95",
    "name-typed": "M 85 95 Q 100 105 115 95",
    email: "M 85 95 Q 100 105 115 95",
    password: "M 90 98 Q 100 95 110 98",
    "password-peek": "M 85 95 Q 100 100 115 95",
    success: "M 70 95 Q 100 145 130 95 Z",
    error: "M 85 105 Q 100 95 115 105",
    "refer-idle": "M 75 95 Q 100 120 125 95",
    "refer-hover": "M 70 95 Q 100 145 130 95 Z",
  };

  const leftArmPath = {
    idle: "M 75 135 Q 60 145 42 150",
    "name-empty": "M 75 135 Q 55 140 35 140",
    "name-typed": "M 75 135 Q 50 135 30 130",
    email: "M 75 135 Q 60 125 45 110", // will animate sequence later
    password: "M 75 135 Q 55 90 89 62", // reaches to the eye!
    "password-peek": "M 75 135 Q 55 90 89 62",
    success: "M 75 135 Q 45 120 40 85", // hand in the air
    error: "M 75 135 Q 60 145 42 150",
    "refer-idle": "M 75 135 Q 60 145 42 150",
    "refer-hover": "M 75 135 Q 45 120 40 85",
  };

  const rightArmPath = {
    idle: "M 125 135 Q 140 145 158 150",
    "name-empty": "M 125 135 Q 145 140 165 140",
    "name-typed": "M 125 135 Q 150 135 170 130",
    email: "M 125 135 Q 140 125 155 110",
    password: "M 125 135 Q 145 90 111 62", // reaches to the eye!
    "password-peek": "M 125 135 Q 140 110 130 140", // lowers hand
    success: "M 125 135 Q 155 120 160 85",
    error: "M 125 135 Q 140 145 158 150",
    "refer-idle": "M 125 135 Q 140 145 158 150",
    "refer-hover": "M 125 135 Q 155 120 160 85",
  };

  const typingAnimLeft = {
    "name-empty": {
      d: [
        leftArmPath["name-empty"],
        "M 75 135 Q 50 145 35 145",
        leftArmPath["name-empty"],
      ],
      transition: { repeat: Infinity, duration: 0.3 },
    },
    "name-typed": {
      d: [
        leftArmPath["name-typed"],
        "M 75 135 Q 50 135 30 140",
        leftArmPath["name-typed"],
      ],
      transition: { repeat: Infinity, duration: 0.3 },
    },
    email: {
      d: [leftArmPath.email, "M 75 135 Q 50 130 45 120", leftArmPath.email],
      transition: { repeat: Infinity, duration: 0.3 },
    },
    success: {
      d: [
        "M 75 135 Q 45 120 40 85",
        "M 75 135 Q 35 120 30 85",
        "M 75 135 Q 45 120 40 85",
      ],
      transition: { repeat: Infinity, duration: 0.5 },
    },
  };

  const typingAnimRight = {
    "name-empty": {
      d: [
        rightArmPath["name-empty"],
        "M 125 135 Q 150 145 165 145",
        rightArmPath["name-empty"],
      ],
      transition: { repeat: Infinity, duration: 0.3, delay: 0.15 },
    },
    "name-typed": {
      d: [
        rightArmPath["name-typed"],
        "M 125 135 Q 150 135 170 140",
        rightArmPath["name-typed"],
      ],
      transition: { repeat: Infinity, duration: 0.3, delay: 0.15 },
    },
    email: {
      d: [
        rightArmPath.email,
        "M 125 135 Q 150 130 155 120",
        rightArmPath.email,
      ],
      transition: { repeat: Infinity, duration: 0.3, delay: 0.15 },
    },
    success: {
      d: [
        "M 125 135 Q 155 120 160 85",
        "M 125 135 Q 165 120 170 85",
        "M 125 135 Q 155 120 160 85",
      ],
      transition: { repeat: Infinity, duration: 0.5 },
    },
  };

  const getArmAnim = (animObj: any, defaultPath: any) => {
    const anim = animObj[activeState];
    if (anim && anim.d) return anim;
    
    const fallbackPath = defaultPath[activeState] || defaultPath.idle || "M 75 135 Q 60 145 42 150";
    return {
      d: fallbackPath,
      transition: springTransition,
    };
  };

  const getHandPosition = (pathString: string) => {
    if (!pathString || typeof pathString !== 'string') return { cx: 42, cy: 150 };
    const match = pathString.match(/([\d.]+)\s+([\d.]+)$/);
    return match ? { cx: parseFloat(match[1]) || 42, cy: parseFloat(match[2]) || 150 } : { cx: 42, cy: 150 };
  };

  const bodyVariant = {
    idle: {
      y: [0, 2, 0],
      scaleY: [1, 0.98, 1],
      transition: { repeat: Infinity, duration: 2 },
    },
    password: { y: 2, scaleY: 0.95 },
    "password-peek": { y: 0, scaleY: 1 },
    success: {
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 0.6 },
    },
    error: { y: 5 },
    "refer-hover": { y: -5, transition: { duration: 0.3 } },
    default: { y: 0, scaleY: 1 },
  };

  const getBodyAnim = () =>
    [
      "idle",
      "password",
      "password-peek",
      "success",
      "error",
      "refer-hover",
    ].includes(activeState)
      ? activeState
      : "default";

  return (
    <div className="w-full flex justify-center mt-2 -mb-6 relative z-10 pointer-events-none select-none">
      <motion.svg
        width="200"
        height="230"
        viewBox="0 0 200 230"
        className="overflow-visible drop-shadow-xl"
      >
        <defs>
          <radialGradient id="pocketBase" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f4f4f5" />
          </radialGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="210" rx="45" ry="6" fill="rgba(0,0,0,0.15)" />

        {/* Legs / Feet */}
        <motion.g
          animate={getBodyAnim()}
          variants={{
            success: {
              y: [-5, 5, -5],
              rotate: -5,
              transition: { repeat: Infinity, duration: 0.6 },
            },
            default: { y: 0, rotate: 0 },
          }}
          style={{ transformOrigin: "78px 188px" }}
        >
          <path
            d="M 70 170 L 86 170 L 86 188 L 70 188 Z"
            fill={cBlue}
            stroke={cStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <ellipse
            cx="78"
            cy="188"
            rx="14"
            ry="10"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />
        </motion.g>

        <motion.g
          animate={getBodyAnim()}
          variants={{
            success: {
              y: [-5, 5, -5],
              rotate: 5,
              transition: { repeat: Infinity, duration: 0.6, delay: 0.3 },
            },
            default: { y: 0, rotate: 0 },
          }}
          style={{ transformOrigin: "122px 188px" }}
        >
          <path
            d="M 114 170 L 130 170 L 130 188 L 114 188 Z"
            fill={cBlue}
            stroke={cStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <ellipse
            cx="122"
            cy="188"
            rx="14"
            ry="10"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />
        </motion.g>

        {/* Body Group (torso, belly, pocket) */}
        <motion.g
          animate={getBodyAnim()}
          variants={bodyVariant}
          style={{ transformOrigin: "100px 150px" }}
        >
          <rect
            x="68"
            y="115"
            width="64"
            height="60"
            rx="15"
            fill={cBlue}
            stroke={cStroke}
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="145"
            r="23"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />
          {/* Half circle for pocket */}
          <path
            d="M 83 145 A 17 17 0 0 0 117 145 Z"
            fill="url(#pocketBase)"
            stroke={cStroke}
            strokeWidth="2"
          />
        </motion.g>

        {/* Head Group */}
        <motion.g
          animate={activeState}
          variants={headVariants}
          style={{ transformOrigin: "100px 80px" }}
        >
          <circle
            cx="100"
            cy="80"
            r="46"
            fill={cBlue}
            stroke={cStroke}
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="90"
            r="38"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />

          {/* Eyes Base */}
          <ellipse
            cx="89"
            cy="62"
            rx="10"
            ry="13"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />
          <ellipse
            cx="111"
            cy="62"
            rx="10"
            ry="13"
            fill={cWhite}
            stroke={cStroke}
            strokeWidth="2"
          />

          {/* Pupils */}
          <motion.circle
            cx="89"
            cy="62"
            r="2.5"
            fill={cStroke}
            animate={activeState}
            variants={leftPupil}
          />
          <motion.circle
            cx="111"
            cy="62"
            r="2.5"
            fill={cStroke}
            animate={activeState}
            variants={rightPupil}
          />

          {/* Happy Eyes Shapes */}
          <motion.path
            d="M 83 62 Q 89 50 95 62"
            fill="none"
            stroke={cStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={activeState}
            variants={happyEyeLeftVariant}
          />
          <motion.path
            d="M 105 62 Q 111 50 117 62"
            fill="none"
            stroke={cStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={activeState}
            variants={happyEyeRightVariant}
          />

          {/* Nose */}
          <circle
            cx="100"
            cy="74"
            r="6"
            fill={cRed}
            stroke={cStroke}
            strokeWidth="2"
          />
          <circle cx="98" cy="72" r="2" fill="#fff" opacity="0.8" />

          {/* Philtrum */}
          <line
            x1="100"
            y1="80"
            x2="100"
            y2="98"
            stroke={cStroke}
            strokeWidth="2"
          />

          {/* Dynamic Mouth */}
          <motion.path
            d={
              mouthPath[
                activeState === "password" && showPassword
                  ? "password-peek"
                  : activeState
              ] || mouthPath["idle"]
            }
            fill={
              ["success", "refer-hover"].includes(activeState) ? cRed : "none"
            }
            stroke={cStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tongue only on success/open mouth */}
          <AnimatePresence>
            {["success", "refer-hover"].includes(activeState) && (
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                d="M 87 132 Q 100 120 113 132 Q 100 145 87 132 Z"
                fill="#ff7da2"
              />
            )}
          </AnimatePresence>

          {/* Whiskers */}
          <line
            x1="62"
            y1="75"
            x2="84"
            y2="80"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="84"
            x2="84"
            y2="84"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="62"
            y1="93"
            x2="84"
            y2="88"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <line
            x1="138"
            y1="75"
            x2="116"
            y2="80"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="140"
            y1="84"
            x2="116"
            y2="84"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="138"
            y1="93"
            x2="116"
            y2="88"
            stroke={cStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sweat Drop for error state */}
          <AnimatePresence>
            {activeState === "error" && (
              <motion.path
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                d="M 125 45 Q 130 55 125 60 Q 120 55 125 45 Z"
                fill="#80cafa"
                stroke={cStroke}
                strokeWidth="1"
              />
            )}
          </AnimatePresence>
        </motion.g>

        {/* Collar & Arms drawn over body and head! */}
        <motion.g
          animate={getBodyAnim()}
          variants={bodyVariant}
          style={{ transformOrigin: "100px 150px" }}
        >
          <rect
            x="62"
            y="117"
            width="76"
            height="7"
            rx="3.5"
            fill={cRed}
            stroke={cStroke}
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="127"
            r="7"
            fill={cYellow}
            stroke={cStroke}
            strokeWidth="2"
          />
          <line
            x1="94"
            y1="124"
            x2="106"
            y2="124"
            stroke={cStroke}
            strokeWidth="1.5"
          />
          <circle cx="100" cy="129" r="1.5" fill={cStroke} />
          <line
            x1="100"
            y1="131"
            x2="100"
            y2="134"
            stroke={cStroke}
            strokeWidth="1.5"
          />

          <motion.g style={{ transformOrigin: "75px 135px" }}>
            <circle cx="75" cy="135" r="7" fill={cBlue} />
            {/* Outline */}
            <motion.path
              d={
                leftArmPath[activeState as keyof typeof leftArmPath] ||
                leftArmPath.idle
              }
              animate={getArmAnim(typingAnimLeft, leftArmPath)}
              fill="transparent"
              stroke={cStroke}
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Inner Arm */}
            <motion.path
              d={
                leftArmPath[activeState as keyof typeof leftArmPath] ||
                leftArmPath.idle
              }
              animate={getArmAnim(typingAnimLeft, leftArmPath)}
              fill="transparent"
              stroke={cBlue}
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Hand */}
            {(() => {
              let pos = getHandPosition(
                leftArmPath[activeState as keyof typeof leftArmPath] || leftArmPath.idle,
              );
              return (
                <motion.circle
                  cx={pos.cx}
                  cy={pos.cy}
                  animate={{ cx: pos.cx, cy: pos.cy }}
                  transition={springTransition}
                  r="12"
                  fill={cWhite}
                  stroke={cStroke}
                  strokeWidth="2"
                />
              );
            })()}
          </motion.g>

          <motion.g style={{ transformOrigin: "125px 135px" }}>
            <circle cx="125" cy="135" r="7" fill={cBlue} />
            {/* Outline */}
            <motion.path
              d={
                rightArmPath[activeState as keyof typeof rightArmPath] ||
                rightArmPath.idle
              }
              animate={getArmAnim(typingAnimRight, rightArmPath)}
              fill="transparent"
              stroke={cStroke}
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Inner Arm */}
            <motion.path
              d={
                rightArmPath[activeState as keyof typeof rightArmPath] ||
                rightArmPath.idle
              }
              animate={getArmAnim(typingAnimRight, rightArmPath)}
              fill="transparent"
              stroke={cBlue}
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Hand */}
            {(() => {
              let pos = getHandPosition(
                rightArmPath[activeState as keyof typeof rightArmPath] || rightArmPath.idle,
              );
              return (
                <motion.circle
                  cx={pos.cx}
                  cy={pos.cy}
                  animate={{ cx: pos.cx, cy: pos.cy }}
                  transition={springTransition}
                  r="12"
                  fill={cWhite}
                  stroke={cStroke}
                  strokeWidth="2"
                />
              );
            })()}
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};
