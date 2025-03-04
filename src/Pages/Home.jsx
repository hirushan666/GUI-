import React from 'react';
import Hero from '../Components/Hero/Hero';
import styled from 'styled-components';
import { mockNews } from '../data/mockNews';

const HomeContainer = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    background: #000000;
`;

const NewsSection = styled.section`
    padding: 4rem 2rem;
    background: #000000;
`;

const NewsSectionTitle = styled.h2`
    color: white;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    font-weight: 600;
`;

const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const NewsCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const NewsImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const NewsContent = styled.div`
    padding: 1.5rem;
`;

const NewsCategory = styled.span`
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    display: inline-block;
`;

const NewsTitle = styled.h3`
    color: white;
    margin: 1rem 0;
    font-size: 1.2rem;
`;

const NewsDate = styled.p`
    color: #a0a0a0;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

const NewsSummary = styled.p`
    color: #a0a0a0;
    font-size: 1rem;
    line-height: 1.5;
`;

const Home = () => {
    return (
        <HomeContainer>
            <Hero />
            <NewsSection>
                <NewsSectionTitle>Latest News</NewsSectionTitle>
                <NewsGrid>
                    {mockNews.map(news => (
                        <NewsCard key={news.id}>
                            <NewsImage src={news.image} alt={news.title} />
                            <NewsContent>
                                <NewsCategory>{news.category}</NewsCategory>
                                <NewsTitle>{news.title}</NewsTitle>
                                <NewsDate>{new Date(news.date).toLocaleDateString()}</NewsDate>
                                <NewsSummary>{news.summary}</NewsSummary>
                            </NewsContent>
                        </NewsCard>
                    ))}
                </NewsGrid>
            </NewsSection>
        </HomeContainer>
    );
};

export default Home;
