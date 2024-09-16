import styles from "./index.module.css";
import {Children, isValidElement, cloneElement} from "react";

const Pre = ({children}) => {
    return (
        <pre className={styles.container}>
            {Children.map(children, child => {
                if (isValidElement(child)) {
                    return cloneElement(child, {isBlock: true});
                }
                return child;
            })}
        </pre>
    )
}

export default Pre;
