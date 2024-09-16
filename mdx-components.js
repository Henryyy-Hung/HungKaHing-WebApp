import Code from "@/components/mdxComponents/Code";
import Pre from "@/components/mdxComponents/Pre";
import Table from "@/components/mdxComponents/Table";

export function useMDXComponents(components) {
    return {
        pre: Pre,
        code: Code,
        table: Table,
        ...components,
    }
}