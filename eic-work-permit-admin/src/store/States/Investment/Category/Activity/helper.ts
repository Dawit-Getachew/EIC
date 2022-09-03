import { IActivity } from "src/models/InvestmentModels/Category/activity"

export const getActivity = (_id: string, activitys: IActivity[]): IActivity => {
  const foundIndex = activitys.findIndex(activity => String(activity._id) === String(_id))
  return foundIndex >= 0? activitys[foundIndex] : {} as unknown as IActivity
}