

import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="Projects" className=" scroll-mt-3 border-y border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Proyects</h2>
        </div>

        <div className="mt-10 space-y-16">

          {projects.length === 0 ? (
            <p>Loading projects...</p>
          ) : (
            projects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col md:flex-row gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10"
              >
                <div className="md:w-1/2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold hover:underline"
                    >
                      {project.title}
                    </a>

                    <p className="mt-4 text-white/90 italic text-lg leading-relaxed">
                      {project.description}
                    </p>
                    <br />
                    <p className="text-2xl font-bold ">
                      Key Features
                    </p>
                  </div>

                  <ul className="mt-4 list-disc list-inside text-white/80 space-y-1">
                    {project.keyFeatures?.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                  <div className="mt-8">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-xl border border-white/20 px-5 py-2 text-sm hover:bg-white/10 transition"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}

        </div>

      </div>
    </section>
  );
}