import { useState, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import ProjectCard from "../project_card/ProjectCard";

export default function ReceivedInvitations(){
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const session = useSession()

    useEffect(() => {
        if (!session) return
        const abortController = new AbortController()
        fetch(`api/projects/invited?RUT=${session.RUT}`, {
            method: 'GET',
            signal: abortController.signal,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then((invitations) => {
            setProjects(invitations.map((invitation) => invitation.project))
            setLoading(false)
        }).catch((error) => console.log(error))
        
        return () => abortController.abort()
    }
    , [session])

    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            {projects.length > 0 ? (
                <ul className="flex flex-col gap-4">
                    {projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <ProjectCard project={project} RUT={session?.RUT} letInscribe={true}/>
                            </li>
                        );
                    }
                    )}
                </ul>
            ) : (
                <h1>No tienes invitaciones pendientes</h1>
            )}
        </>
        )
}