export const mockCars = [
    {
        id: 1,
        name: "BMW M5 Competition",
        price: 125000,
        year: 2023,
        transmission: "Automatic",
        fuelType: "Petrol",
        available: true,
        downPayment: 25000,
        imageUrl: require("../Components/Assets/BMW M5 Competition.jpeg"),
        specs: {
            engine: "4.4L V8 Twin-Turbo",
            power: "617 hp",
            acceleration: "0-60 mph in 3.2s"
        }
    },
    {
        id: 2,
        name: "Mercedes-Benz AMG GT",
        price: 165000,
        year: 2023,
        transmission: "Automatic",
        fuelType: "Petrol",
        available: true,
        downPayment: 33000,
        imageUrl: require("../Components/Assets/BENZ AMG GT.jpg"),
        specs: {
            engine: "4.0L V8 Biturbo",
            power: "577 hp",
            acceleration: "0-60 mph in 3.1s"
        }
    },
    {
        id: 3,
        name: "Audi RS7 Sportback",
        price: 145000,
        year: 2022,
        transmission: "Automatic",
        fuelType: "Petrol",
        available: false,
        downPayment: 29000,
        imageUrl: require("../Components/Assets/AUDI RS7.jpeg"),
        specs: {
            engine: "4.0L V8 TFSI",
            power: "591 hp",
            acceleration: "0-60 mph in 3.5s"
        }
    },
    {
        id: 4,
        name: "Porsche 911 GT3",
        price: 185000,
        year: 2023,
        transmission: "Manual",
        fuelType: "Petrol",
        available: true,
        downPayment: 37000,
        imageUrl: require("../Components/Assets/PORSCHE 911.jpeg"),
        specs: {
            engine: "4.0L Flat-Six",
            power: "502 hp",
            acceleration: "0-60 mph in 3.2s"
        }
    }
]; 