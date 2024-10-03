import Code from "@/components/mdx/Code";
import Pre from "@/components/mdx/Pre";
import Table from "@/components/mdx/Table";

export function useMDXComponents(components) {
    return {
        pre: Pre,
        code: Code,
        table: Table,
        ...components,
    }
}