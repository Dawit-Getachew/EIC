import Linker from './linker'
import User from "./User"
import Account from "./Account"
import Sector from "./Category/Sector"
import SubSector from "./Category/SubSector"
import Activity from "./Category/Activity"
import InvestmentActivity from "./Category/InvestmentActivity"
import Manager from "./Manager"
import Product from "./Product"
import Project from "./Project"
import WorkPermit from "./WorkPermit"
import Message from "./Message"
import InvestmentPermit from "./InvestmentPermit"
import InvestmentPermitRenewal from "./InvestmentPermitRenewal"
import InvestmentPermitExpansion from "./InvestmentPermitExpansion"
import InvestmentPermitCancellation from "./InvestmentPermitCancellation"
import InvestmentPermitAmmendment from "./InvestmentPermitAmmendment"
import Notification from "./Notification"
import Email from "./Email"

export default [
  Linker, User, Account, Sector, SubSector, Activity, InvestmentActivity,
  Manager, Product, Project, WorkPermit, Message, InvestmentPermit, InvestmentPermitRenewal,
  InvestmentPermitExpansion, InvestmentPermitCancellation, Notification, InvestmentPermitAmmendment,
  Email
]