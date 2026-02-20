// Preloader.jsx

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader-content">
                <div className="logo-container">
                    <img src="https://letskillify.com/assets/images/icon/ls-nav.png" alt="LetsKillify Logo" />
                    <div className="loading-circle"></div>
                </div>
                <div className="loading-text">Loading...</div>
            </div>
            
            <div className="course-icons-animation">
                <i className="floating-icon fas fa-code"></i>
                <i className="floating-icon fas fa-laptop-code"></i>
                <i className="floating-icon fas fa-database"></i>
                <i className="floating-icon fas fa-mobile-alt"></i>
                <i className="floating-icon fas fa-brain"></i>
                <i className="floating-icon fas fa-robot"></i>
            </div>
        </div>
    );
};

export default Preloader;