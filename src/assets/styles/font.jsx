import localFont from "next/font/local";


const satoshiVariable = localFont({
    name: 'Satoshi-Variable',
    src: '../fonts/Satoshi/Satoshi-Variable.woff2',
    variable: '--font-satoshi-variable',
});

const consolas = localFont({
    name: 'Consolas',
    src: '../fonts/Consolas/Consolas.woff2',
    variable: '--font-consolas',
});

export {satoshiVariable, consolas};
