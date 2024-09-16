import {globby} from "globby";

const StyleSheetService = {

    loadAllCssUnderAppDirectory: async () => {
        const pathPrefix = 'src/app/';
        const pathSuffix = '.module.css';
        // 获取所有的 CSS 模块路径
        const paths = await globby(`${pathPrefix}**/*${pathSuffix}`);
        // 动态加载所有的 CSS 模块
        for (let path of paths) {
            const truncatedPath = path.slice(pathPrefix.length, -pathSuffix.length);
            (await import(`src/app/${truncatedPath}.module.css`)).default;
        }
    },

    loadAllCssUnderComponentsDirectory: async () => {
        const pathPrefix = 'src/components/';
        const pathSuffix = '.module.css';
        // 获取所有的 CSS 模块路径
        const paths = await globby(`${pathPrefix}**/*${pathSuffix}`);
        // 动态加载所有的 CSS 模块
        for (let path of paths) {
            const truncatedPath = path.slice(pathPrefix.length, -pathSuffix.length);
            (await import(`src/components/${truncatedPath}.module.css`)).default;
        }
    },

    loadAllCss: async () => {
        await StyleSheetService.loadAllCssUnderAppDirectory();
        await StyleSheetService.loadAllCssUnderComponentsDirectory();
    }
}

export default StyleSheetService;