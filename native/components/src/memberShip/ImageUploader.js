import React, { useState } from 'react';
import { View, Text, WebView } from 'react-native-webview';

const FileUpload = () => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

    const handleWebViewMessage = event => {
        const message = event.nativeEvent.data;

        try {
            const result = JSON.parse(message);

            if (result.secure_url) {
                setUploadedFileUrl(result.secure_url);
                console.log('File uploaded successfully! URL:', result.secure_url);
            } else {
                console.error('Error:', result.message || 'Unknown error');
            } 
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    return (
        <WebView
            originWhitelist={['*']}
            source={require('./upload.html')}
            onMessage={handleWebViewMessage}
        />
    );
};

export default FileUpload;
