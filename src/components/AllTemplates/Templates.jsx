import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../Cart/MainProvider';
import Breadcums from '../Breadcums';
import DevicePreviewModal from './DevicePreviewModal';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function Templates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchItem, setSearchItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [wishlist, setWishlist] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { addToWish, handlerAddToWish } = useContext(MainContext);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const ref = collection(db, "templates");
                const q = query(ref, orderBy("title", "asc"));
                const snap = await getDocs(q);
                const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setTemplates(list);
            } catch (e) {
                console.error("Error fetching templates:", e);
                setTemplates([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const handleSearchChange = (event) => {
        setSearchItem(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredTemplates = templates.filter((template) => {
        const searchCondition = template.title.toLowerCase().includes(searchItem.toLowerCase()) ||
            template.category.toLowerCase().includes(searchItem.toLowerCase());
        const categoryCondition = selectedCategory === 'All' || template.category === selectedCategory;
        return searchCondition && categoryCondition;
    });

    const toggleWishlist = (templateId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(templateId)
                ? prevWishlist.filter((id) => id !== templateId)
                : [...prevWishlist, templateId]
        );
    };

    const handleVideoHover = (templateId, isHovering) => {
        setHoveredVideo(isHovering ? templateId : null);
    };

    const handlePreviewClick = (template) => {
        setSelectedTemplate(template);
        setIsPreviewOpen(true);
    };

    return (
        <main>
            <Breadcums />
            <section className="py-5 bg-light">
                <div className="container">
                    {/* Search and Filter Section */}
                    <div className="row g-3 align-items-center mb-5">
                        <div className="col-md-8">
                            <div className="input-group input-group-lg shadow-sm">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="fas fa-search text-primary"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-start-0 ps-0" 
                                    placeholder="Search templates..." 
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select form-select-lg shadow-sm" 
                                onChange={handleCheckboxChange}
                                value={selectedCategory}
                            >
                                <option value="All">All Categories</option>
                                <option value="Business">Business</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Food">Food</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Education">Education</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>
                    </div>

                    {/* Template Cards */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                    <div className="row g-4">
                        {filteredTemplates.slice(0, visibleCount).map((template) => (
                            <div key={template.id} className="col-md-6 col-lg-4 my-4">
                                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                                    {/* Video Preview Section */}
                                    <div className="position-relative video-container rounded-top">
                                        <img
                                            className="w-100"
                                            src={template.thumbnail || template.imgurl}
                                            alt={template.title}
                                        />
                                        <div className="position-absolute top-0 end-0 m-3">
                                            <button 
                                                className="btn btn-light btn-sm rounded-circle shadow-sm"
                                                onClick={() => toggleWishlist(template.id)}
                                                style={{ width: '40px', height: '40px' }}
                                            >
                                                <i className={wishlist.includes(template.id) ? 'fas fa-heart text-danger' : 'far fa-heart'}></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Template Details */}
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="badge bg-light text-primary border">{template.category}</span>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-star text-warning me-1"></i>
                                                <span className="fw-bold">{template.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <h5 className="card-title fw-bold mb-3">{template.title}</h5>
                                        <p className="card-text text-muted mb-4">{template.description}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="d-flex align-items-center">
                                                <i className="far fa-calendar-alt text-primary me-2"></i>
                                                <span className="text-muted">{template.lastUpdated}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-eye text-primary me-2"></i>
                                                <span className="text-muted">{template.views}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h4 mb-0 text-primary fw-bold">{template.price}</span>
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="course-btn-enhanced"
                                                    onClick={() => handlePreviewClick(template)}
                                                >
                                                    Preview
                                                </button>
                                                <Link 
                                                    to={`/templates/TemplatesDetail/${template.id}`}
                                                    className="course-btn-enhanced course-btn-secondary"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}

                    {/* Load More Button */}
                    {visibleCount < filteredTemplates.length && (
                        <div className="text-center mt-5">
                            <button 
                                className="course-btn-enhanced"
                                onClick={() => setVisibleCount(prev => prev + 3)}
                            >
                                Load More Templates
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Add Device Preview Modal */}
            {selectedTemplate && (
                <DevicePreviewModal
                    isOpen={isPreviewOpen}
                    onClose={() => setIsPreviewOpen(false)}
                    templateUrl={selectedTemplate.previewUrl}
                />
            )}

            <style jsx>{`
                .hover-shadow {
                    transition: all 0.3s ease;
                }
                .hover-shadow:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .video-container {
                    overflow: hidden;
                    width: 100%;
                    background-color: #000;
                }
                .video-container video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}</style>
        </main>
    );
}

export default Templates;
