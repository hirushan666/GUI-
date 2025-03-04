import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactContainer = styled.div`
    padding: 2rem;
    margin-top: 70px;
    min-height: 100vh;
    background: #000000;
    color: white;
`;

const ContactContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 600;
`;

const ContactDescription = styled.p`
    text-align: center;
    margin-bottom: 3rem;
    color: #a0a0a0;
    font-size: 1.1rem;
`;

const ContactGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
`;

const ContactCard = styled.div`
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }
`;

const ContactIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffffff;
    text-align: center;
`;

const ContactLabel = styled.h3`
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
`;

const ContactInfo = styled.p`
    color: #a0a0a0;
    text-align: center;
    line-height: 1.5;
`;

const ContactLink = styled.a`
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #ffffff;
    }
`;

const Contact = () => {
    return (
        <ContactContainer>
            <ContactContent>
                <PageTitle>Contact Us</PageTitle>
                <ContactDescription>
                    Get in touch with us for any inquiries about our luxury vehicles
                </ContactDescription>

                <ContactGrid>
                    <ContactCard>
                        <ContactIcon>
                            <FaEnvelope />
                        </ContactIcon>
                        <ContactLabel>Email</ContactLabel>
                        <ContactInfo>
                            <ContactLink href="mailto:sales@cardeals.com">
                                sales@cardeals.com
                            </ContactLink>
                        </ContactInfo>
                    </ContactCard>

                    <ContactCard>
                        <ContactIcon>
                            <FaPhone />
                        </ContactIcon>
                        <ContactLabel>Phone</ContactLabel>
                        <ContactInfo>
                            <ContactLink href="tel:+919876543210">
                                +91 98765 43210
                            </ContactLink>
                            <br />
                            <ContactLink href="tel:+919876543211">
                                +91 98765 43211
                            </ContactLink>
                        </ContactInfo>
                    </ContactCard>

                    <ContactCard>
                        <ContactIcon>
                            <FaInstagram />
                        </ContactIcon>
                        <ContactLabel>Instagram</ContactLabel>
                        <ContactInfo>
                            <ContactLink 
                                href="https://instagram.com/cardeals" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                @cardeals
                            </ContactLink>
                        </ContactInfo>
                    </ContactCard>

                    <ContactCard>
                        <ContactIcon>
                            <FaMapMarkerAlt />
                        </ContactIcon>
                        <ContactLabel>Address</ContactLabel>
                        <ContactInfo>
                            123 Luxury Lane,<br />
                            Auto District, Mumbai - 400001<br />
                            Maharashtra, India
                        </ContactInfo>
                    </ContactCard>
                </ContactGrid>
            </ContactContent>
        </ContactContainer>
    );
};

export default Contact;
