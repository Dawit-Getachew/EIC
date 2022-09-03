import { IProject } from "src/models/InvestmentModels/project"

export const getProject = (_id: string, projects: IProject[]): IProject => {
  const foundIndex = projects.findIndex(project => String(project._id) === String(_id))
  return foundIndex >= 0? projects[foundIndex] : {} as unknown as IProject
}