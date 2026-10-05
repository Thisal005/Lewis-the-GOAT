import React, { useState } from 'react';
import {
  DETAILED_CAREER_STATS,
  ERA_BREAKDOWN,
  STATS_VERIFICATION_DATE,
} from '../data/portfolioData';

export const CareerStatsSection: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('mercedes');

  const activeEraData = ERA_BREAKDOWN.find((e) => e.id === selectedEra) || ERA_BREAKDOWN[0];

  return (
    <section id="career-stats" className="stats-section" aria-labelledby="stats-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="flex-between-wrap">
            <div>
              <span className="section-badge gold">Telemetry & Records</span>
              <h2 id="stats-heading" className="section-title">
                All-Time Formula 1 Career Records
              </h2>
            </div>
            
            {/* Dated Statistics Pill */}
            <div className="date-verification-card">
              <span className="clock-icon" aria-hidden="true">⏱</span>
              <div>
                <span className="date-label">Statistics Verification Date</span>
                <span className="date-value">{STATS_VERIFICATION_DATE}</span>
              </div>
            </div>
          </div>

          <p className="section-subtitle">
            Every entry corresponds to verified FIA classification data. Hamilton holds or shares
            almost every major statistical benchmark in modern Grand Prix racing history.
          </p>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="detailed-metrics-grid">
          {DETAILED_CAREER_STATS.map((metric) => (
            <div key={metric.label} className="glass-card metric-card">
              <span className="metric-value font-mono">{metric.value}</span>
              <h3 className="metric-label">{metric.label}</h3>
              <p className="metric-detail">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Era-by-Era Breakdown Tab System */}
        <div className="era-breakdown-card glass-card">
          <div className="era-header-flex">
            <div>
              <span className="section-badge cyan">Team Chapter Analysis</span>
              <h3 className="era-title">Career Production By Team Partnership</h3>
            </div>

            {/* Era Tabs */}
            <div className="era-tabs-list" role="tablist" aria-label="Era breakdown tabs">
              {ERA_BREAKDOWN.map((era) => (
                <button
                  key={era.id}
                  role="tab"
                  aria-selected={selectedEra === era.id}
                  aria-controls={`era-panel-${era.id}`}
                  id={`era-tab-${era.id}`}
                  type="button"
                  className={`era-tab-btn ${selectedEra === era.id ? 'active' : ''}`}
                  onClick={() => setSelectedEra(era.id)}
                >
                  {era.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Era Panel */}
          <div
            id={`era-panel-${activeEraData.id}`}
            role="tabpanel"
            aria-labelledby={`era-tab-${activeEraData.id}`}
            className="era-panel-content"
          >
            <div className="era-panel-intro">
              <div>
                <h4 className="era-headline">{activeEraData.name}</h4>
                <span className="era-years-badge font-mono">{activeEraData.years}</span>
              </div>
              <p className="era-description">{activeEraData.description}</p>
            </div>

            <div className="era-metrics-row">
              <div className="era-metric-box">
                <span className="era-metric-num">{activeEraData.championships}</span>
                <span className="era-metric-title">World Titles</span>
              </div>
              <div className="era-metric-box">
                <span className="era-metric-num">{activeEraData.wins}</span>
                <span className="era-metric-title">Race Wins</span>
              </div>
              <div className="era-metric-box">
                <span className="era-metric-num">{activeEraData.poles}</span>
                <span className="era-metric-title">Pole Positions</span>
              </div>
              <div className="era-metric-box">
                <span className="era-metric-num">{activeEraData.podiums}</span>
                <span className="era-metric-title">Podiums</span>
              </div>
              <div className="era-metric-box">
                <span className="era-metric-num">{activeEraData.races}</span>
                <span className="era-metric-title">Races Started</span>
              </div>
            </div>
          </div>

          <div className="era-footer-note">
            <span className="info-icon" aria-hidden="true">ℹ</span>
            <span>
              Sources: Official FIA Formula One World Championship annual archives &middot;
              Mercedes-AMG won 8 consecutive Constructors&rsquo; Titles (2014&ndash;2021) with Hamilton as lead driver.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
