import React from "react";
import Code from "@/components/shared/MDXComponents/Code";
import PreformattedText from "@/components/shared/MDXComponents/PreformattedText";

export function useMDXComponents(components) {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => (
            <h1>{children}</h1>
        ),
        pre: PreformattedText,
        code: Code,
        ...components,
    }
}