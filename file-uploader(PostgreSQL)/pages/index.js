import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const fileContent = reader.result.split(',')[1]; // Get Base64 content
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    mimetype: file.type,
                    fileContent,
                }),
            });

            if (response.ok) {
                // setMessage('File uploaded successfully!');
                router.push('/display');
            } else {
                setMessage('Failed to upload file.');
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>Upload a File</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

