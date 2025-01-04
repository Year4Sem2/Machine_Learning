import { useEffect, useState } from 'react';

export default function DisplayFiles() {
    const [files, setFiles] = useState([]);

    // Fetch file metadata from the server
    useEffect(() => {
        fetch('/api/upload')
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .catch((error) => console.error('Error fetching files:', error));
    }, []);

    return (
        <div>
            <h1>Uploaded Files</h1>
            {files.length > 0 ? (
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <p>
                                <strong>Filename:</strong> {file.filename}
                            </p>
                            <p>
                                <strong>Uploaded At:</strong>{' '}
                                {new Date(file.uploaded_at).toLocaleString()}
                            </p>
                            <a
                                href={`/api/upload?id=${file.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View/Download File
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files uploaded yet.</p>
            )}
        </div>
    );
}



