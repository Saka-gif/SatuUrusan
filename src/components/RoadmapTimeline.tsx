"use client";

import { Check, Circle, Clock3, ExternalLink, FileText, LoaderCircle } from "lucide-react";
import type { UserRoadmap, RoadmapTask } from "@/lib/supabase/types";

type RoadmapTimelineProps = {
  roadmap: UserRoadmap;
  onToggle: (taskId: string, completed: boolean) => void;
  pendingTaskId?: string | null;
};

function getTaskState(task: RoadmapTask, index: number, tasks: RoadmapTask[]) {
  if (task.is_completed || task.status === "completed") return "completed";
  const firstOpen = tasks.findIndex((item) => !item.is_completed && item.status !== "completed");
  return index === firstOpen ? "current" : "upcoming";
}

export function RoadmapTimeline({ roadmap, onToggle, pendingTaskId }: RoadmapTimelineProps) {
  const tasks = roadmap.tasks || [];
  return <div className="roadmap-timeline" aria-label={`Timeline ${roadmap.title}`}>
    {tasks.map((task, index) => {
      const state = getTaskState(task, index, tasks);
      return <article className={`timeline-item timeline-${state}`} id={`task-${task.id}`} key={task.id}>
        <div className="timeline-marker" aria-hidden="true">{state === "completed" ? <Check /> : state === "current" ? <span>{index + 1}</span> : <Circle />}</div>
        <div className="timeline-connector" aria-hidden="true" />
        <div className="timeline-content">
          <div className="timeline-heading">
            <div className="timeline-title-wrap"><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span><h3>{task.title}</h3></div>
            <span className="timeline-state">{state === "completed" ? "Selesai" : state === "current" ? "Berikutnya" : "Akan datang"}</span>
          </div>
          <p>{task.description}</p>
          <div className="timeline-meta"><span className="timeline-category">{task.category}</span><span><Clock3 /> {task.duration}</span></div>
          {task.requirements?.length > 0 && <div className="timeline-requirements"><FileText /><span>Siapkan:</span>{task.requirements.slice(0, 3).map((requirement) => <span className="requirement-chip" key={requirement}>{requirement}</span>)}</div>}
          <div className="timeline-actions">
            <button type="button" disabled={pendingTaskId === task.id} onClick={() => onToggle(task.id, task.is_completed)} className="timeline-check disabled:cursor-wait disabled:opacity-60">
              {pendingTaskId === task.id && <LoaderCircle className="mr-1.5 inline-block h-3 w-3 animate-spin" />}
              {state === "completed" ? "Tandai belum selesai" : "Tandai selesai"}
            </button>
            {task.official_url && task.official_url !== "#" && <a href={task.official_url} target="_blank" rel="noopener noreferrer">Portal resmi <ExternalLink /></a>}
          </div>
        </div>
      </article>;
    })}
  </div>;
}
