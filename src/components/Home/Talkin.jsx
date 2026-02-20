import { useEffect, useRef, useState } from "react"
import { Mail, MessageSquare, Phone, Video } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

const Talkin = () => {
  const contactMethods = [
    {
      title: "Support",
      icon: MessageSquare,
      description: "Need help? Reach out to our support team",
      items: [
        {
          title: "Mail us for Complaint/Suggestion",
          href: "mailto:info@letskillify.com",
        },
      ],
    },
    {
      title: "Video Call",
      icon: Video,
      description: "Schedule a face-to-face video consultation",
      items: [
        {
          title: "WhatsApp Video",
          href: "https://wa.me/917987841662",
        },
      ],
    },
    {
      title: "Call Us",
      icon: Phone,
      description: "Get instant support via phone",
      items: [
        {
          title: "+91 7987841662",
          href: "tel:+917987841662",
        },
      ],
    },
    {
      title: "Email Us",
      icon: Mail,
      description: "Send us an email anytime",
      items: [
        {
          title: "Services: info@letskillify.com",
          href: "mailto:info@letskillify.com",
        },
        {
          title: "HR: hr@letskillify.com",
          href: "mailto:hr@letskillify.com",
        },
      ],
    },
  ]

  const ContactCard = ({ method, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [isHovered, setIsHovered] = useState(false)
    const controls = useAnimation()

    useEffect(() => {
      if (isInView) {
        controls.start("visible")
      }
    }, [isInView, controls])

    const cardStyle = {
      position: 'relative',
      height: '100%',
      minHeight: '300px',
      padding: '32px',
      borderRadius: '20px',
      background: `linear-gradient(145deg, rgb(6 106 201 / 47%), rgb(6 106 201 / 95%))`,   
      transition: 'all 0.5s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      boxShadow: isHovered 
        ? `0 20px 40px rgba(6, 106, 201, 0.3), 0 0 20px #066ac9 40`
        : '0 8px 32px rgba(6, 106, 201, 0.2)',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      cursor: 'pointer'
    }
    const glowEffect = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none'
    }
    const headerStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '24px',
      position: 'relative',
      zIndex: 2
    }
    const iconContainerStyle = {
      padding: '16px',
      borderRadius: '16px',
      background: `#066ac9`,
      color: '#fff',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
      position: 'relative',
      isolation: 'isolate',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-4px',
        border: '2px solid #066ac9',
        borderRadius: '18px',
        opacity: 0,
        transition: 'all 0.3s ease',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '-8px',
        border: '2px solid #066ac9',
        borderRadius: '20px',
        opacity: 0,
        transition: 'all 0.3s ease',
      }
    }
    const iconRingAnimation = {
      '&::before': {
        animation: isHovered ? 'ringPulse 1.5s infinite' : 'none',
        opacity: isHovered ? 0.6 : 0
      },
      '&::after': {
        animation: isHovered ? 'ringPulse 1.5s infinite 0.5s' : 'none',
        opacity: isHovered ? 0.3 : 0
      }
    }
    const titleStyle = {
      fontSize: window.innerWidth <= 768 ? '1.4rem' : '1.75rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      letterSpacing: '0.5px'
    }
    const descriptionStyle = {
      fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem',
      color: 'rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease',
      opacity: isHovered ? 1 : 0.9,
      lineHeight: '1.5'
    }
    const itemStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: window.innerWidth <= 480 ? '12px' : '16px',
      borderRadius: '12px',
      background: isHovered 
        ? `linear-gradient(135deg, rgba(6, 106, 201, 0.3), rgba(6, 106, 201, 0.2))`
        : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem',
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid ${isHovered ? method.color + '50' : 'rgba(255, 255, 255, 0.15)'}`,
      backdropFilter: 'blur(5px)',
      fontWeight: '500'
    }
    // Add keyframes for ring animation
    const keyframes = `
      @keyframes ringPulse {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.3;
        }
        100% {
          transform: scale(1.2);
          opacity: 0;
        }
      }
    `

    return (
      <motion.div
        className="motion-div"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.215, 0.61, 0.355, 1],
            },
          },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          ...cardStyle,
          minHeight: window.innerWidth <= 480 ? '250px' : '300px',
        }} 
      >
        <style>{keyframes}</style>
        <div style={glowEffect} />
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
            transition: { duration: 0.3 }
          }}
        >
          <div style={headerStyle}>
            <motion.div 
              style={{...iconContainerStyle, ...iconRingAnimation}}
              animate={{
                rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: 0.5,
                scale: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <method.icon size={28} />
            </motion.div>
            <div>
              <h3 style={titleStyle}>{method.title}</h3>
              <p style={descriptionStyle}>{method.description}</p>
            </div>
          </div>

          <div>
            {method.items.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={itemStyle}
                whileHover={{ 
                  scale: 1.02,
                  x: 10,
                  backgroundColor: `${method.color}25`
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    color: isHovered ? method.color : 'white',
                    fontWeight: isHovered ? '600' : '500',
                    textShadow: isHovered ? `0 0 8px ${method.color}30` : 'none'
                  }}
                >
                  {item.title}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    style={{ 
                      color: method.color,
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const containerStyle = {
    minHeight: '100vh',
    padding: '96px 16px',
    position: 'relative',
    zIndex: 1
  }

  return (
    <section className="talkin-enhanced">
      <div className="container talkin-content">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="talkin-header-enhanced"
        >
          <h2 className="talkin-title-enhanced">Get in Touch</h2>
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Choose your preferred way to connect with us</span>
            <span className="badge-dot"></span>
          </div>
        </motion.div>

        <div className="row g-4">
          {contactMethods.map((method, index) => (
            <div key={method.title} className="col-lg-3 col-md-6">
              <motion.div
                className="contact-card-enhanced contact-floating-animation"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="contact-icon-enhanced">
                  <method.icon size={24} />
                </div>
                <h3 className="contact-method-title">{method.title}</h3>
                <p className="contact-method-desc">{method.description}</p>
                <div>
                  {method.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="course-tab-enhanced"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default Talkin

