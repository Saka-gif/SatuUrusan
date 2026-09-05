import type { LifeEvent } from "@/data/life-events";

export function EventCard({ event, onSelect }: { event: LifeEvent; onSelect: (event: LifeEvent) => void }) {
  return <button className="event-card" type="button" onClick={() => onSelect(event)}><span className={`event-icon ${event.accent}`}>{event.icon}</span><span className="event-card-copy"><strong>{event.title}</strong><span>{event.description}</span></span><span className="event-arrow" aria-hidden="true">↗</span></button>;
}