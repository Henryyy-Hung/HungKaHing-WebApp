"use client"

import styles from './index.module.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Code = ({ className, children, isBlock=false, ...props }) => {

    // if this is a inline code
    if (! isBlock) {
        return (
            <code {...props} className={styles.inlineCode}>
                {children}
            </code>
        )
    }

    const onCopyButtonClicked = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
            .then(r => {
                window.alert('Copied to clipboard')
            })
    }

    const match = /language-(\w+)/.exec(className || '');



    return (
        <div className={styles.blockCode} aria-hidden={false}>
            <div className={styles.header}>
                <span className={styles.language}>
                    {match ? match[1] : "code"}
                </span>
                <div className={styles.copyButton} onClick={onCopyButtonClicked}>
                    Copy Code
                </div>
            </div>
            <SyntaxHighlighter
                style={coldarkDark}
                PreTag={(props) => <pre {...props} className={styles.preformattedText} style={null} aria-hidden={false} />}
                language={match ? match[1] : null}
                showLineNumbers={false}
                wrapLines={false}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    )
};

export default Code;