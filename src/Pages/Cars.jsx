import React, { useState, useEffect } from 'react';
import Car from '../Components/Car/Car';
import styled from 'styled-components';

const CarsContainer = styled.div`
    padding: 2rem;
    margin-top: 70px;
    min-height: 100vh;
    background: #000000;
`;

const CarsGrid = styled.div`
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

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceFilter, setPriceFilter] = useState('all');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                console.log(data);
                setCars(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cars:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const filterCars = () => {
        if (priceFilter === 'all') return cars;
        if (priceFilter === 'under150k') return cars.filter(car => car.price < 150000);
        if (priceFilter === 'over150k') return cars.filter(car => car.price >= 150000);
        return cars;
    };

    if (loading) {
        return (
            <CarsContainer>
                <PageTitle>Loading luxury vehicles...</PageTitle>
            </CarsContainer>
        );
    }

    if (error) {
        return (
            <CarsContainer>
                <PageTitle>Error: {error}</PageTitle>
            </CarsContainer>
        );
    }

    return (
        <CarsContainer>
            <PageTitle>Exclusive Luxury Collection</PageTitle>
            <FilterSection>
                <FilterButton 
                    active={priceFilter === 'all'} 
                    onClick={() => setPriceFilter('all')}
                >
                    All Cars
                </FilterButton>
                <FilterButton 
                    active={priceFilter === 'under150k'} 
                    onClick={() => setPriceFilter('under150k')}
                >
                    Under $150,000
                </FilterButton>
                <FilterButton 
                    active={priceFilter === 'over150k'} 
                    onClick={() => setPriceFilter('over150k')}
                >
                    Over $150,000
                </FilterButton>
            </FilterSection>
            <CarsGrid>
                {filterCars().map(car => (
                    <Car key={car.id} car={car} />
                ))}
            </CarsGrid>
        </CarsContainer>
    );
};

export default Cars;
