import bcrypt from "bcrypt";
import type {
  User,
  Article,
  Chapter,
  Clause,
  Participation,
  Post,
  Project,
  Comment,
} from "@prisma/client";
import Database from "./database";
import {
  clauseStatuses,
  participationTypes,
  projectInvitationStatuses,
} from "../constants/democratic";
import { v4 as uuidV4 } from "uuid";

function excludePassword(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function checkPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export async function getUser(
  RUT: string,
  password: string
): Promise<Omit<User, "password"> | null> {
  try {
    const user = await Database.user.findUnique({ where: { RUT } });
    if (!user) throw new Error("User not found");
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect password");
    return excludePassword(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting user: " + error.message);
    } else {
      throw new Error("Error getting user");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createUser(
  user: User
): Promise<Omit<User, "password"> | null> {
  try {
    if (!user.password) throw new Error("Password is required");
    const hashedPassword = await hashPassword(user.password);
    const newUser = await Database.user.create({
      data: { ...user, password: hashedPassword },
    });
    return excludePassword(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Error creating user");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function updateUser(RUT: string, user: Partial<User>) {
  try {
    const updatedUser = await Database.user.update({
      where: { RUT },
      data: user,
    });
    return updatedUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating user: " + error.message);
    } else {
      throw new Error("Error updating user");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function deleteUser(RUT: string) {
  try {
    await Database.user.delete({ where: { RUT } });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error deleting user: " + error.message);
    } else {
      throw new Error("Error deleting user");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getChapter(projectId: string, chapterId: number) {
  try {
    const chapter = await Database.chapter.findUnique({
      where: { id_project_id: { project_id: projectId, id: chapterId } },
      include: {
        articles: {
          include: { clauses: true, creator: true },
        },
        project: true,
      },
    });
    return chapter;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting chapter: " + error.message);
    } else {
      throw new Error("Error getting chapter");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getOpenProjects() {
  try {
    const projects = await Database.project.findMany({
      where: { invitation_type: "open" },
    });
    return projects;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting open projects: " + error.message);
    } else {
      throw new Error("Error getting open projects");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getProject(id: string) {
  try {
    const project = await Database.project.findUnique({
      where: { id },
      include: { chapters: true },
    });
    return project;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting project: " + error.message);
    } else {
      throw new Error("Error getting project");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createProject(
  project: Omit<Project, "id">,
  chapters: Omit<Chapter, "id">[]
) {
  try {
    // Formatear los datos del proyecto
    const { user_rut: creatorRut, ...projectWithoutFK } = project;

    const formattedProject = {
      ...projectWithoutFK,
      id: uuidV4(),
      chapters: {
        create: chapters.map((chapter, index) => ({
          id: index + 1,
          ...chapter,
        })),
      },
      creator: { connect: { RUT: creatorRut } },
    };

    const newProject = await Database.project.create({
      data: formattedProject,
    });

    return newProject;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating project: " + error.message);
    } else {
      throw new Error("Error creating project");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getArticles(projectId: string, chapterId: number) {
  try {
    const articles = await Database.article.findMany({
      where: { project_id: projectId, chapter_id: chapterId },
      include: { clauses: true, creator: true },
    });
    const formattedArticles = articles.map((article) => {
      const { creator, ...articleWithoutCreator } = article;
      return { creator: excludePassword(creator), ...articleWithoutCreator };
    });
    return articles;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting sections: " + error.message);
    } else {
      throw new Error("Error getting sections");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createArticle(
  article: Omit<Article, "id">,
  clauses: Pick<Clause, "description">[]
) {
  try {
    const project = await Database.project.findUniqueOrThrow({
      where: { id: article.project_id },
      include: {
        articles: true,
        invitations: {
          where: { user_rut: article.user_rut },
        },
      },
    });

    if (
      !project ||
      (!project.invitations && project.user_rut !== article.user_rut)
    ) {
      throw new Error("User not inscribed to project");
    }

    const {
      project_id: projectId,
      chapter_id: chapterId,
      user_rut: creatorRut,
      ...articleWithoutFK
    } = article;

    const formattedClauses = clauses.map((clause, index) => {
      const { description } = clause;

      return {
        description,
        id: index + 1,
        project: { connect: { id: projectId } },
        chapter: {
          connect: {
            id_project_id: {
              project_id: projectId,
              id: chapterId,
            },
          },
        },
        participations: undefined,
      };
    });

    const newArticle = await Database.article.create({
      data: {
        ...articleWithoutFK,
        id: project.articles.length + 1,
        creator: { connect: { RUT: article.user_rut } },
        chapter: {
          connect: {
            id_project_id: {
              project_id: article.project_id,
              id: article.chapter_id,
            },
          },
        },
        project: {
          connect: { id: article.project_id },
        },
        clauses: { create: formattedClauses },
      },
    });

    return newArticle;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error uploading article: " + error.message);
    } else {
      throw new Error("Error uploading article");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getArticle(
  id: number,
  projectId: string,
  chapterId: number
) {
  try {
    return await Database.article.findUnique({
      where: {
        id_project_id_chapter_id: {
          id,
          project_id: projectId,
          chapter_id: chapterId,
        },
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting section: " + error.message);
    } else {
      throw new Error("Error getting section");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getParticipations(
  projectId: string,
  chapterId: number,
  articleId: number,
  clauseId: number
) {
  try {
    const participations = await Database.participation.findMany({
      where: {
        project_id: projectId,
        chapter_id: chapterId,
        article_id: articleId,
        clause_id: clauseId,
      },
      include: { user: true, clause: true },
    });

    const participationsWithoutPassword: (Participation & {
      user: Omit<User, "password">;
    } & { clause: Clause })[] = participations.map((participation) => {
      const { user, ...participationWithoutUser } = participation;
      return { user: excludePassword(user), ...participationWithoutUser };
    });

    const formattedParticipations: {
      [type: string]: (Participation & {
        user: Omit<User, "password">;
      } & {
        clause: Clause;
      })[];
    } = {};

    participationsWithoutPassword.forEach((participation) => {
      if (!formattedParticipations[participation.type]) {
        formattedParticipations[participation.type] = [];
      }
      formattedParticipations[participation.type].push(participation);
    });

    return formattedParticipations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting participations: " + error.message);
    } else {
      throw new Error("Error getting participations");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createParticipation(
  projectId: string,
  chapterId: number,
  articleId: number,
  clauseId: number,
  participation: Omit<Participation, "id">
) {
  try {
    const clause = await Database.clause.findUniqueOrThrow({
      where: {
        id_project_id_article_id_chapter_id: {
          id: clauseId,
          project_id: projectId,
          article_id: articleId,
          chapter_id: chapterId,
        },
      },
      include: { participations: true },
    });

    const newParticipation = await Database.participation.create({
      data: {
        id: clause.participations.length + 1,
        ...participation,
      },
    });

    return newParticipation;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating participation: " + error.message);
    } else {
      throw new Error("Error creating participation");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function updateParticipation(
  id: number,
  projectId: string,
  chapterId: number,
  articleId: number,
  clauseId: number,
  participation: Partial<Participation>
) {
  try {
    const updatedParticipation = await Database.participation.update({
      where: {
        id_user_rut_article_id_clause_id_project_id_chapter_id: {
          id,
          user_rut: participation.user_rut!,
          article_id: articleId,
          clause_id: clauseId,
          project_id: projectId,
          chapter_id: chapterId,
        },
      },
      data: participation,
    });
    return updatedParticipation;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating participation: " + error.message);
    } else {
      throw new Error("Error updating participation");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function inviteToProject(projectId: string, receiverRUT: string) {
  if (!receiverRUT || !projectId)
    return Promise.reject(new Error("Missing parameters"));

  try {
    const project = await Database.project.findUniqueOrThrow({
      where: { id: projectId },
    });

    if (!project) throw new Error("Project not found");

    if (project.invitation_type === "open")
      return joinOpenProject(projectId, receiverRUT);

    return await Database.projectInvitation.create({
      data: {
        project: { connect: { id: projectId } },
        receiver: { connect: { RUT: receiverRUT } },
        status: projectInvitationStatuses.PENDING,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error inviting to project: " + error.message);
    } else {
      throw new Error("Error inviting to project");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function joinOpenProject(projectId: string, RUT: string) {
  try {
    if (!projectId || !RUT) throw new Error("Missing parameters");

    return await Database.projectInvitation.create({
      data: {
        project: { connect: { id: projectId } },
        receiver: { connect: { RUT } },
        status: projectInvitationStatuses.ACCEPTED,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error joining open project: " + error.message);
    } else {
      throw new Error("Error joining open project");
    }
  }
}

export async function updateInvitation(
  projectId: string,
  RUT: string,
  status: string
) {
  try {
    if (!projectId || !RUT) throw new Error("Missing parameters");

    const invitation = await Database.projectInvitation.findFirst({
      where: { project_id: projectId, user_rut: RUT },
    });

    if (!invitation) throw new Error("Invitation not found");

    return await Database.projectInvitation.update({
      where: { project_id_user_rut: { project_id: projectId, user_rut: RUT } },
      data: { status },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error accepting invitation: " + error.message);
    } else {
      throw new Error("Error accepting invitation");
    }
  }
}

export async function getUserProjects(RUT: string) {
  try {
    const projects = await Database.project.findMany({
      where: { user_rut: RUT },
    });
    return projects || {};
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting user projects: " + error.message);
    } else {
      throw new Error("Error getting user projects");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getUserInvitations(RUT: string) {
  try {
    const invitations = await Database.projectInvitation.findMany({
      where: { user_rut: RUT },
      include: { project: true },
    });
    return invitations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting user inscriptions: " + error.message);
    } else {
      throw new Error("Error getting user inscriptions");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getInvitations(RUT: string) {
  try {
    const invitations = await Database.projectInvitation.findMany({
      where: { user_rut: RUT },
      include: { project: true },
    });
    return invitations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting invitations: " + error.message);
    } else {
      throw new Error("Error getting invitations");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function updateProject(
  projectId: string,
  update: Partial<Project>
) {
  try {
    const project = await Database.project.findUniqueOrThrow({
      where: { id: projectId },
      include: {
        clauses: {
          include: { participations: true },
        },
        invitations: true,
      },
    });

    if (!project || !update)
      throw new Error("Bad Request: Project or update not found");

    const clauses = {
      PENDING: project.clauses.filter(
        (clause) => clause.status === clauseStatuses.PENDING
      ),
      APPROVED: project.clauses.filter(
        (clause) => clause.status === clauseStatuses.APPROVED
      ),
      REJECTED: project.clauses.filter(
        (clause) => clause.status === clauseStatuses.REJECTED
      ),
    };

    const inscriptions = project.invitations.filter(
      (inv) => inv.status === projectInvitationStatuses.ACCEPTED
    );

    if (!update.phase) {
      return await Database.project.update({
        where: { id: projectId },
        data: update,
      });
    }

    // Manage a phase increment
    if (update.phase === project.phase + 1) {
      // If the current phase is 2 (voting phase), update the clauses according to its participations
      if (update.phase === 2) {
        return await Database.project.update({
          where: {
            id: projectId,
          },
          data: { phase: update.phase },
        });
      }

      if (update.phase === 3) {
        for (const clause of clauses.PENDING) {
          const participations = clause.participations;
          const approvedParticipations = participations.filter(
            (participation: Participation) =>
              participation.type === participationTypes.APPROVE
          );

          // Update clause to APPROVED if meets 50% + 1 of inscriptions
          if (approvedParticipations.length >= inscriptions.length * 0.5 + 1) {
            await Database.clause.update({
              where: {
                id_project_id_article_id_chapter_id: {
                  id: clause.id,
                  project_id: clause.project_id,
                  article_id: clause.article_id,
                  chapter_id: clause.chapter_id,
                },
              },
              data: { status: clauseStatuses.APPROVED },
            });
          } else {
            await Database.clause.update({
              where: {
                id_project_id_article_id_chapter_id: {
                  id: clause.id,
                  project_id: clause.project_id,
                  article_id: clause.article_id,
                  chapter_id: clause.chapter_id,
                },
              },
              data: { status: clauseStatuses.REJECTED },
            });
          }
        }
      }
    } else {
      // this prevents non incremental phase changes
      throw new Error("Invalid phase");
    }

    // update project phase to the new one
    const updatedProject = await Database.project.update({
      where: { id: projectId },
      data: { phase: update.phase },
    });

    return updatedProject;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating project: " + error.message);
    } else {
      throw new Error("Error updating project");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getPosts(projectId: string) {
  try {
    const posts = await Database.post.findMany({
      where: { project_id: projectId },
      include: {
        creator: true,
        comments: {
          include: { user: true, parent_comment: { include: { user: true } } },
        },
      },
    });

    return posts.map((post) => {
      const { creator, comments, ...rest } = post;
      const formattedComments = comments.map((comment) => {
        if (!comment.parent_comment) {
          const { user: commentUser, ...commentWithoutUser } = comment;
          return { user: excludePassword(commentUser), ...commentWithoutUser };
        }
        const parentCommentWithoutPassword = {
          ...comment.parent_comment,
          user: excludePassword(comment.parent_comment.user),
        };
        const { user: commentUser, parent_comment, ...restOfComment } = comment;
        return {
          user: excludePassword(commentUser),
          parent_comment: parentCommentWithoutPassword,
          ...restOfComment,
        };
      });

      return {
        creator: excludePassword(creator),
        comments: formattedComments,
        ...rest,
      };
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting posts: " + error.message);
    } else {
      throw new Error("Error getting posts");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "updatedAt">
) {
  try {
    const newPost = await Database.post.create({
      data: {
        ...post,
        id: uuidV4(),
      },
    });
    return newPost;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error("Error creating post: " + error.message);
    } else {
      throw new Error("Error creating post");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getComments(postId: string) {
  try {
    const comments = await Database.comment.findMany({
      where: { post_id: postId },
      include: {
        user: true,
        comments: {
          include: { user: true },
          take: 5,
        },
      },
    });

    return comments.map((comment) => {
      const { user, comments: childComments, ...rest } = comment;
      const formattedChildComments = childComments.map((childComment) => {
        const { user: childCommentUser, ...commentWithoutUser } = childComment;
        return {
          user: excludePassword(childCommentUser),
          ...commentWithoutUser,
        };
      });
      return { user: excludePassword(user), formattedChildComments, ...rest };
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting posts: " + error.message);
    } else {
      throw new Error("Error getting posts");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function createComment(
  comment: Omit<Comment, "id" | "createdAt" | "updatedAt">
) {
  try {
    const { user_rut, parent_comment_id, post_id, ...commentWithoutFK } =
      comment;
    const newComment = await Database.comment.create({
      data: {
        ...commentWithoutFK,
        id: uuidV4(),
        parent_comment: comment.parent_comment_id
          ? {
              connect: {
                id: comment.parent_comment_id,
              },
            }
          : undefined,
        post: {
          connect: {
            id: comment.post_id,
          },
        },
        user: {
          connect: {
            RUT: comment.user_rut,
          },
        },
      },
    });
    return newComment;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating comment: " + error.message);
    } else {
      throw new Error("Error creating comment");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getComment(id: string) {
  try {
    return Database.comment.findUnique({
      where: { id },
      include: {
        post: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            RUT: true,
            email: true,
            profession: true,
          },
        },
        comments: {
          select: {
            content: true,
            createdAt: true,
            post: true,
            user: {
              select: {
                first_name: true,
                last_name: true,
                RUT: true,
                email: true,
                profession: true,
              },
            },
          },
        },
        parent_comment: {
          select: {
            content: true,
            createdAt: true,
            user: {
              select: {
                first_name: true,
                last_name: true,
                RUT: true,
                email: true,
                profession: true,
              },
            },
          },
        },
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting comment: " + error.message);
    } else {
      throw new Error("Error getting comment");
    }
  } finally {
    await Database.$disconnect();
  }
}

export async function getReport(projectId: string) {
  try {
    const project = await Database.project.findFirstOrThrow({
      where: { id: projectId },
    });

    const users = (
      await Database.user.findMany({
        where: { projects: { some: { id: projectId } } },
      })
    ).map((user) => excludePassword(user));

    const agreements = await Database.clause
      .findMany({
        where: { project_id: projectId, status: clauseStatuses.APPROVED },
        include: {
          article: {
            include: {
              creator: true,
              participations: true,
            },
          },
        },
      })
      .then((agreements) =>
        agreements.map((agreement) => {
          const { creator, ...article } = agreement.article;
          return { ...agreement, creator: excludePassword(creator), article };
        })
      );

    const rejectedClauses = await Database.clause
      .findMany({
        where: { project_id: projectId, status: clauseStatuses.REJECTED },
        include: {
          article: {
            include: {
              creator: true,
            },
          },
        },
      })
      .then((rejectedClauses) =>
        rejectedClauses.map((clause) => {
          const { creator, ...article } = clause.article;
          return { ...clause, creator: excludePassword(creator), article };
        })
      );

    const participations = await Database.participation.count({
      where: { project_id: projectId },
    });

    // const posts = await Database.post
    //   .findMany({
    //     where: { project_id: projectId },
    //     orderBy: { createdAt: "desc" },
    //     include: {
    //       comments: {
    //         include: { user: true },
    //         orderBy: { createdAt: "desc" },
    //       },
    //       creator: true,
    //     },
    //   })
    //   .then((posts) =>
    //     posts.map((post) => {
    //       const comments = post.comments.map(({ user, ...comment }) => {
    //         return {
    //           user: excludePassword(user),
    //           ...comment,
    //         };
    //       });
    //       return {
    //         ...post,
    //         creator: excludePassword(post.creator),
    //         comments,
    //       };
    //     })
    //   );

    const posts = await Database.comment.findMany({
      where: { post: { project_id: projectId } },
      include: {
        post: {
          include: {
            creator: true,
          },
        },
        user: true,
      },
    });

    const groupedPosts: { [post_id: string]: any[] } = {};
    posts.forEach((post) => {
      if (post.id in groupedPosts) {
        groupedPosts[post.id].push(post);
      } else {
        groupedPosts[post.id] = [post];
      }
    });

    const formattedPosts = Object.keys(groupedPosts).map((postId) => {
      const post = groupedPosts[postId][0].post;
      const comments = groupedPosts[postId].map(({ post, ...comment }) => {
        const { user, ...commentWithoutUser } = comment;
        return { user: excludePassword(user), ...commentWithoutUser };
      });
      return { ...post, comments };
    });

    return {
      project,
      users,
      agreements,
      rejectedClauses,
      participations,
      posts: formattedPosts,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error getting report: " + error.message);
    } else {
      throw new Error("Error getting report");
    }
  } finally {
    await Database.$disconnect();
  }
}
