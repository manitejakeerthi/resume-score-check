
import React from 'react';

const TechLogosSlider = () => {
  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
    { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
    { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
  ];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-scroll">
        {/* First set of logos */}
        <div className="flex items-center space-x-16 px-8">
          {companies.map((company, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='24' y='24' text-anchor='middle' dy='0.35em' font-family='Arial' font-size='8' fill='%236b7280'%3E${company.name}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center space-x-16 px-8">
          {companies.map((company, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='24' y='24' text-anchor='middle' dy='0.35em' font-family='Arial' font-size='8' fill='%236b7280'%3E${company.name}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechLogosSlider;
