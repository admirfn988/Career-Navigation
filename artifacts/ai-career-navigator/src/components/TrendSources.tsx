import { ExternalLink } from 'lucide-react';
import { Panel, SectionHeading } from './Shared';
import { trendSources } from '../data/resources';

export default function TrendSources() {
  return (
    <>
      <SectionHeading
        title="Trend sources & dates"
        detail="Curated references only. This demo does not fetch, refresh, or calculate live trend data."
      />
      <div className="grid-2">
        {trendSources.map((source, index) => (
          <Panel
            className="panel-pad"
            key={source.url}
            data-testid={`card-trend-source-${index}`}
          >
            <div className="small-mono">{source.publisher}</div>
            <h3 className="section-title" style={{ fontSize: 15, margin: '8px 0' }}>
              {source.label}
            </h3>
            <p className="small-mono">{source.date}</p>
            <p className="field-hint" style={{ lineHeight: 1.7 }}>
              {source.note}
            </p>
            <a
              className="resource-link"
              href={source.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`link-trend-source-${index}`}
            >
              Open original source <ExternalLink size={12} />
            </a>
          </Panel>
        ))}
      </div>
    </>
  );
}
