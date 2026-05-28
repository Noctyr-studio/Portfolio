
import { useEffect, useState } from "react";

export default function Github() {
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  /* ===============================
     CACHE
  ============================== */
  const CACHE_KEY = "github_contributions_cache";
  const CACHE_TIME_KEY = "github_contributions_cache_time";
  const CACHE_TTL = 1000 * 60 * 60 * 12; // 12h

  const [weeks, setWeeks] = useState([]);

  function getCachedData() {
    const data = localStorage.getItem(CACHE_KEY);
    const time = localStorage.getItem(CACHE_TIME_KEY);
    if (!data || !time) return null;
    if (Date.now() - Number(time) > CACHE_TTL) return null;
    return JSON.parse(data);
  }

  function setCachedData(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
  }

  /* ===============================
     DATA
  ============================== */
  function getLevel(count) {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count >= 3) return 3;
  }

  function buildWeeks(days) {
    const result = [];
    const map = {};
    days.forEach(d => map[d.date] = d.count);

    const start = new Date(days[0].date);
    const end   = new Date(days[days.length - 1].date);

    // Ajusta al domingo anterior
    while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

    let currentWeek = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10);
      currentWeek.push({
        date: iso,
        contributionCount: map[iso] ?? 0
      });

      if (d.getDay() === 6) {
        result.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    }
    if (currentWeek.length) result.push({ contributionDays: currentWeek });
    return result;
  }

  async function loadGithubActivity() {
    const cached = getCachedData();
    if (cached) {
      setWeeks(buildWeeks(cached));
      return;
    }

    try {
      const res = await fetch("/api/github-activity");
      if (!res.ok) throw new Error("No se pudo cargar la actividad de GitHub");
      const days = await res.json();
      setCachedData(days);
      setWeeks(buildWeeks(days));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadGithubActivity();
  }, []);

  /* ===============================
     RENDER SVG
  ============================== */
  const OFFSET_X = 28;
  const OFFSET_Y = 14;

  const rects = [];
  const monthLabels = [];
  let lastMonth = null;

  weeks.forEach((week, w) => {
    const firstDay = week.contributionDays.find(d => d?.date);
    if (!firstDay) return;

    const date = new Date(firstDay.date);
    const month = date.getMonth();
    if (month !== lastMonth) {
      monthLabels.push(
        <text key={`month-${w}`} x={OFFSET_X + w * 14} y={10} className="month-label">
          {months[month]}
        </text>
      );
      lastMonth = month;
    }

    week.contributionDays.forEach((day, d) => {
      const level = getLevel(day.contributionCount);
      rects.push(
        <rect
          key={`rect-${w}-${d}`}
          x={OFFSET_X + w * 14}
          y={OFFSET_Y + d * 14}
          width={12}
          height={12}
          rx={2}
          className={`lvl-${level}`}
        >
          <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
        </rect>
      );
    });
  });

  return (
    <section id="Activity" className=" scroll-mt-10 border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">GitHub Activity</h2>
        <p className="mt-2 text-white/70">
          Consistency and real-world practice through personal projects.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-4">
          <svg viewBox="0 0 900 130" className="w-full" style={{ height: "180px" }}>
            {monthLabels}
            {rects}
          </svg>
        </div>

        <div className="mt-6">
          <a
            href="https://github.com/Noctyr-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/90 px-4 py-2 text-sm font-semibold hover:bg-indigo-400 transition"
          >
            View my GitHub profile
          </a>
        </div>
      </div>
    </section>
  );
}