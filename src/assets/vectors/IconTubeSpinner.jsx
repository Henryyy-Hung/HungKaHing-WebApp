import * as React from "react";
const SVGComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        transform="matrix(-1,0,0,1,0,0)"
        width={32}
        height={32}
        {...props}
    >
        <radialGradient
            id="a5"
            cx={0.66}
            fx={0.66}
            cy={0.3125}
            fy={0.3125}
            gradientTransform="scale(1.5)"
        >
            <stop offset={0} stopColor="#9E9E9E" />
            <stop offset={0.3} stopColor="#9E9E9E" stopOpacity={0.9} />
            <stop offset={0.6} stopColor="#9E9E9E" stopOpacity={0.6} />
            <stop offset={0.8} stopColor="#9E9E9E" stopOpacity={0.3} />
            <stop offset={1} stopColor="#9E9E9E" stopOpacity={0} />
        </radialGradient>
        <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a5)"
            strokeWidth={17}
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset={0}
            cx={100}
            cy={100}
            r={70}
        >
            <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur={2}
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
            />
        </circle>
        <circle
            transform-origin="center"
            fill="none"
            opacity={0.2}
            stroke="#9E9E9E"
            strokeWidth={17}
            strokeLinecap="round"
            cx={100}
            cy={100}
            r={70}
        />
    </svg>
);
export default SVGComponent;
