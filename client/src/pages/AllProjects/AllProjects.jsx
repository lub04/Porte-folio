import { useLoaderData } from "react-router-dom";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

import "./AllProjects.css";

function AllProjects() {
  const projects = useLoaderData();

  return (
    <>
      <h2>Mes projets</h2>
      <section className="page-display projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}

export default AllProjects;
