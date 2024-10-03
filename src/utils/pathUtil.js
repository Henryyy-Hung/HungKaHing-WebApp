const pathUtil = {

    startsWith: ({currentPath, targetPath}) => {
        try {
            if (!currentPath || !targetPath) {
                return false;
            }
            const currentParts = currentPath.split('/');
            const targetParts = targetPath.split('/');
            for (let i = 0; i < targetParts.length; i++) {
                if (currentParts[i] !== targetParts[i]) {
                    return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    },
}

export default pathUtil;