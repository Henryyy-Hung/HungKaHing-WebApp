const readingTimeUtil = {

    calculateReadingTime: ({textContent}) => {
        let readingTime = 0;
        // 计算中文字符数
        const chineseCharCount = (textContent.match(/[\u4E00-\u9FFF]/g) || []).length;
        if (chineseCharCount > 0) {
            const charsPerMinute = 250;
            readingTime += chineseCharCount / charsPerMinute;
        }
        // 计算英文单词数
        const englishWords = textContent.replace(/[\u4E00-\u9FFF]/g, '').split(/\s+/).filter(word => word.length > 0);
        const englishWordCount = englishWords.length;
        if (englishWordCount > 0) {
            const wordsPerMinute = 238;
            readingTime += englishWordCount / wordsPerMinute;
        }
        // make reading time to interval of .25 minutes
        readingTime = Math.ceil(readingTime * 4) / 4;
        return readingTime;
    }

}

export default readingTimeUtil;