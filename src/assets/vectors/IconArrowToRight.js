import * as React from "react";
const SVGComponent = (props) => (
    <svg
        width={32}
        height={32}
        viewBox="0 0 15 15"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
    </svg>
);
export default SVGComponent;
