import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './UserReport.css';

const UserReport = () => {
    const handleDownloadCSV = async () => {
        try {
            const response = await axios.get('http://15.207.192.151:8000/generate-csv/', {
                responseType: 'blob' // important to handle binary data
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'user_report.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    };

    return (
      <div className='usereport'>
            <Button class="btn btn-success" onClick={handleDownloadCSV}>
                Generate Report (CSV)
            </Button>
        </div>
    );
};

export default UserReport;
