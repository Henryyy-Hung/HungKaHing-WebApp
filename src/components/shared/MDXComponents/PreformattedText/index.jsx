import styles from "./index.module.css";
import React from "react";

const PreformattedText = ({children}) => {
    return (
        <pre className={styles.container}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {isBlock: true});
                }
                return child;
            })}
        </pre>
    )
}

export default PreformattedText;