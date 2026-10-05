import React, { useState } from 'react';
import { CAREER_MILESTONES } from '../data/portfolioData';

type FilterType = 'All' | 'Championship' | 'Historic Win' | 'Career Move';

export const MilestonesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredMilestones =
    activeFilter === 'All'
      ? CAREER_MILESTONES
      : CAREER_MILESTONES.filter((m) => m.category === activeFilter);

  const filters: FilterType[] = ['All', 'Championship', 'Historic Win', 'Career Move'];

  return (
    <section id="milestones" className="milestones-section" aria-labelledby="milestones-heading">
      <div className="container">
        <div className="section-header">
          <div className="flex-between-wrap">
            <div>
              <span className="section-badge cyan">Chronicle of Greatness</span>
              <h2 id="milestones-heading" className="section-title">
                Career Eras &amp; Historic Milestones
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="milestone-filters" role="group" aria-label="Filter career milestones">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-pill-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <p className="section-subtitle">
            From the historic downpour at Silverstone 2008 to his emotional 9th home victory in 2024
            and his move to Scuderia Ferrari, explore the definitive markers of Lewis Hamilton&rsquo;s legacy.
          </p>
        </div>

        {/* Timeline List */}
        <div className="timeline-container" role="list">
          {filteredMilestones.map((milestone) => (
            <article
              key={`${milestone.year}-${milestone.title}`}
              className="timeline-item glass-card"
              role="listitem"
            >
              <div className="timeline-header-row">
                <span
                  className="timeline-year-badge font-mono"
                  style={{ borderColor: milestone.accentColor, color: milestone.accentColor }}
                >
                  {milestone.year}
                </span>

                <div className="timeline-meta-tags">
                  <span className="timeline-category-tag">{milestone.category}</span>
                  <span className="timeline-team-tag">{milestone.team}</span>
                </div>
              </div>

              <h3 className="timeline-item-title">{milestone.title}</h3>
              <p className="timeline-item-summary">{milestone.summary}</p>
              <p className="timeline-item-details">{milestone.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
