import React, { useState, useEffect } from 'react';
import Car from '../Components/Car/Car';
import styled from 'styled-components';

const SUVsContainer = styled.div`
    padding: 2rem;
    margin-top: 70px;
    min-height: 100vh;
    background: #000000;
`;

const SUVsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const PageTitle = styled.h1`
    color: white;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 600;
`;

const FilterSection = styled.div`
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const FilterButton = styled.button`
    padding: 0.5rem 1rem;
    background: ${props => props.active ? '#ffffff' : 'transparent'};
    color: ${props => props.active ? '#000000' : '#ffffff'};
    border: 1px solid #ffffff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.active ? '#e0e0e0' : 'rgba(255, 255, 255, 0.1)'};
    }
`;

const SUVs = () => {
    const [suvs, setSUVs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceFilter, setPriceFilter] = useState('all');

    useEffect(() => {
        const fetchSUVs = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/suvs');
                if (!response.ok) {
                    throw new Error('Failed to fetch SUVs');
                }
                const data = await response.json();
                setSUVs(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching SUVs:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSUVs();
    }, []);

    const filterSUVs = () => {
        if (priceFilter === 'all') return suvs;
        if (priceFilter === 'under200k') return suvs.filter(suv => suv.price < 200000);
        if (priceFilter === 'over200k') return suvs.filter(suv => suv.price >= 200000);
        return suvs;
    };

    if (loading) {
        return (
            <SUVsContainer>
                <PageTitle>Loading luxury SUVs...</PageTitle>
            </SUVsContainer>
        );
    }

    if (error) {
        return (
            <SUVsContainer>
                <PageTitle>Error: {error}</PageTitle>
            </SUVsContainer>
        );
    }

    return (
        <SUVsContainer>
            <PageTitle>Premium SUV Collection</PageTitle>
            <FilterSection>
                <FilterButton 
                    active={priceFilter === 'all'} 
                    onClick={() => setPriceFilter('all')}
                >
                    All SUVs
                </FilterButton>
                <FilterButton 
                    active={priceFilter === 'under200k'} 
                    onClick={() => setPriceFilter('under200k')}
                >
                    Under $200,000
                </FilterButton>
                <FilterButton 
                    active={priceFilter === 'over200k'} 
                    onClick={() => setPriceFilter('over200k')}
                >
                    Over $200,000
                </FilterButton>
            </FilterSection>
            <SUVsGrid>
                {filterSUVs().map(suv => (
                    <Car key={suv.id} car={suv} />
                ))}
            </SUVsGrid>
        </SUVsContainer>
    );
};

export default SUVs;
