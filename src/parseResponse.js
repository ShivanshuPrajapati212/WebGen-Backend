function cleanText(response) {
    
    try {
        // If response is already a string, process it directly
        if (typeof response === 'string') {
            return response.replace(/\\n/g, '').replace(/\\/g, '');
        }

        // If response has a code property, process that
        if (response && response.code) {
            return response.code.replace(/\\n/g, '').replace(/\\/g, '');
        }

        // If no code property found, return empty string
        return 'error';
    } catch (error) {
        console.error('Error cleaning text:', error);
        return '';
    }
}

module.exports = cleanText;