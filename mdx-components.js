import H1 from "@/components/mdx/H1";
import H2 from "@/components/mdx/H2";
import H3 from "@/components/mdx/H3";
import H4 from "@/components/mdx/H4";
import H5 from "@/components/mdx/H5";
import H6 from "@/components/mdx/H6";
import Code from "@/components/mdx/Code";
import Pre from "@/components/mdx/Pre";
import Table from "@/components/mdx/Table";
import Img from "@/components/mdx/Img";

export function useMDXComponents(components) {
    return {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        pre: Pre,
        code: Code,
        table: Table,
        img: Img,
        ...components,
    }
}