import React, { useState, useEffect } from 'react';

const DevicePreviewModal = ({ isOpen, onClose, templateUrl }) => {
    const [selectedDevice, setSelectedDevice] = useState('laptop');
    const [iframeError, setIframeError] = useState(false);

    useEffect(() => {
        setIframeError(false);
    }, [templateUrl]);

    if (!isOpen) return null;

    const getDeviceWidth = () => {
        switch (selectedDevice) {
            case 'mobile':
                return '375px';
            case 'tablet':
                return '768px';
            case 'laptop':
                return '1300px';
            default:
                return '1224px';
        }
    };

    const handleIframeError = () => {
        setIframeError(true);
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '95%',
                maxWidth: '1400px',
                maxHeight: '95vh',
                overflow: 'auto',
                position: 'relative',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '@media (max-width: 768px)': {
                    padding: '15px',
                    width: '100%'
                }
            }}>
                <div className="d-flex justify-content-between align-items-center mb-4" style={{ 
                    width: '100%',
                    '@media (max-width: 768px)': {
                        flexDirection: 'column',
                        gap: '10px'
                    }
                }}>
                    <h4 className="mb-0">Preview Template</h4>
                    <button 
                        className="btn btn-danger rounded-circle" 
                        onClick={onClose}
                        style={{ 
                            width: '40px', 
                            height: '40px', 
                            padding: 0,
                            position: 'absolute',
                            right: '20px',
                            top: '20px',
                            zIndex: 1001,
                            '@media (max-width: 768px)': {
                                position: 'relative',
                                right: '0',
                                top: '0'
                            }
                        }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Device Selection Buttons */}
                <div className="d-flex gap-2 mb-4" style={{
                    '@media (max-width: 576px)': {
                        flexDirection: 'column',
                        width: '100%'
                    }
                }}>
                    <button 
                        className={`btn ${selectedDevice === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSelectedDevice('mobile')}
                        style={{
                            '@media (max-width: 576px)': {
                                width: '100%'
                            }
                        }}
                    >
                        <i className="fas fa-mobile-alt me-2"></i>Mobile
                    </button>
                    <button 
                        className={`btn ${selectedDevice === 'tablet' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSelectedDevice('tablet')}
                        style={{
                            '@media (max-width: 576px)': {
                                width: '100%'
                            }
                        }}
                    >
                        <i className="fas fa-tablet-alt me-2"></i>Tablet
                    </button>
                    <button 
                        className={`btn ${selectedDevice === 'laptop' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSelectedDevice('laptop')}
                        style={{
                            '@media (max-width: 576px)': {
                                width: '100%'
                            }
                        }}
                    >
                        <i className="fas fa-laptop me-2"></i>Laptop
                    </button>
                </div>

                {/* Preview Frame */}
                <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    margin: '0 auto',
                    width: getDeviceWidth(),
                    transition: 'width 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '@media (max-width: 768px)': {
                        width: '100%'
                    }
                }}>
                    {iframeError ? (
                        <div className="text-center p-5" style={{
                            '@media (max-width: 576px)': {
                                padding: '20px'
                            }
                        }}>
                            <i className="fas fa-exclamation-circle text-warning" style={{ 
                                fontSize: '48px',
                                '@media (max-width: 576px)': {
                                    fontSize: '36px'
                                }
                            }}></i>
                            <h4 className="mt-3">Preview Not Available</h4>
                            <p className="text-muted">This template preview is not available at the moment. Please try again later or contact support.</p>
                            <a href={templateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
                                <i className="fas fa-external-link-alt me-2"></i>Open in New Tab
                            </a>
                        </div>
                    ) : (
                        <iframe
                            src={templateUrl}
                            style={{
                                width: '100%',
                                height: '80vh',
                                border: 'none',
                                backgroundColor: 'white',
                                display: 'block',
                                '@media (max-width: 768px)': {
                                    height: '70vh'
                                }
                            }}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-popups-to-escape-sandbox"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            onError={handleIframeError}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DevicePreviewModal; 