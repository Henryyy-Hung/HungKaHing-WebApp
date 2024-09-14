import React from "react";
import Code from "src/components/shared/mdxComponents/Code";
import Pre from "src/components/shared/mdxComponents/Pre";
import Table from "src/components/shared/mdxComponents/Table";

export function useMDXComponents(components) {
    return {
        pre: Pre,
        code: Code,
        table: Table,
        ...components,
    }
}