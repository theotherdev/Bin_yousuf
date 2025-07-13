// src/components/ProjectDetail/ProjectAmenities.tsx
import React from 'react';
import { amenityIcons } from '../Amenities/AmenityIcons';
import {
  getProjectAmenities,
  getAmenitiesByCategory,
  type ProjectAmenity,
} from '../../data/amenities';

interface ProjectAmenitiesProps {
  projectId: string;
  className?: string;
}

const ProjectAmenities: React.FC<ProjectAmenitiesProps> = ({
  projectId,
  className = '',
}) => {
  const amenities = getProjectAmenities(projectId);

  if (amenities.length === 0) {
    return null;
  }

  const categorizedAmenities = getAmenitiesByCategory(amenities);

  const renderAmenityCard = (amenity: ProjectAmenity) => {
    const IconComponent = amenityIcons[amenity.icon];

    return (
      <div
        key={amenity.id}
        className="bg-white border border-neutral-200 rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="w-12 h-12 mx-auto mb-3 text-amber-500 group-hover:text-amber-600 transition-colors duration-300 flex items-center justify-center">
          {IconComponent ? (
            <IconComponent className="w-8 h-8" size={32} />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          )}
        </div>
        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-800 transition-colors duration-300">
          {amenity.name}
        </span>
      </div>
    );
  };

  const categoryTitles: Record<string, string> = {
    views: 'Views & Location',
    recreation: 'Recreation & Wellness',
    accommodation: 'Living Spaces',
    infrastructure: 'Infrastructure',
    lifestyle: 'Lifestyle & Security',
  };

  return (
    <section
      className={`py-20 ${className}`}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-800 mb-4">
            Project Amenities
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover the exceptional facilities and features that make this
            development truly special
          </p>
        </div>

        {/* All Amenities Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenities.map(renderAmenityCard)}
          </div>
        </div>

        {/* Categorized View (Optional - for larger projects) */}
        {amenities.length > 8 && (
          <div className="space-y-12">
            <div className="text-center">
              <div className="w-24 h-px bg-neutral-300 mx-auto mb-8"></div>
              <h3 className="text-xl font-medium text-neutral-700 mb-8">
                Amenities by Category
              </h3>
            </div>

            {Object.entries(categorizedAmenities).map(
              ([category, categoryAmenities]) => (
                <div key={category} className="mb-8">
                  <h4 className="text-lg font-medium text-neutral-800 mb-6 text-center">
                    {categoryTitles[category] || category}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryAmenities.map(renderAmenityCard)}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectAmenities;
