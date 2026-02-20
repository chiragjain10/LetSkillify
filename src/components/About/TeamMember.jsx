import Breadcrumbs from "../Breadcums";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function TeamMember() {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamCollection = collection(db, "team");
        const teamSnapshot = await getDocs(teamCollection);
        const teamList = teamSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTeamMembers(teamList);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1 className="text-center my-5">Loading Team...</h1>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="container">
        <h1 className="text-center my-5">No Team Members Found</h1>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div
        className="letskillify-team-section"
        style={{ backgroundColor: "#e3f0ff" }}
      >
        <div className="container py-5">
          {/* Section Title */}
          <div className="letskillify-heading-block text-center mb-5">
            <div className="header-badge">
              <span className="badge-dot"></span>
              <span>Our Team Members</span>
              <span className="badge-dot"></span>
            </div>
            <h2 className="letskillify-title" style={{ color: "#020842" }}>
              Meet Our{" "}
              <span className="letskillify-highlight">Expert Team</span>
            </h2>
            <div className="letskillify-title-underline"></div>
          </div>

          {/* Team Grid */}
          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                <div
                  className={`letskillify-team-card ${hoveredMember === index ? "hovered" : ""
                    }`}
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="letskillify-member-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="letskillify-member-image"
                    />
                    <div className="letskillify-member-overlay">
                      <div className="letskillify-member-social">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          className="letskillify-social-link"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="letskillify-member-info">
                    <h3 className="letskillify-member-name">{member.name}</h3>
                    <p className="letskillify-member-role">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamMember;