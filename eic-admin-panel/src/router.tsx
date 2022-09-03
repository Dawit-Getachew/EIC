import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { PartialRouteObject } from "react-router";
import customRoutes from "./constants/routes";
import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import("src/content/overview")));

// Dashboards
const Crypto = Loader(lazy(() => import("src/content/dashboards/Crypto")));

// Auth
const LoginPage = Loader(lazy(() => import("src/pages/Auth/UserLogin")));
const ResetAccount = Loader(lazy(() => import("src/pages/Auth/ResetAccount")));
const ConfirmReset = Loader(
  lazy(() => import("src/pages/Auth/ResetAccount/ConfirmReset"))
);

const ChangePassword = Loader(
  lazy(() => import("src/pages/Auth/ResetAccount/ChangePassword"))
);

// Applications
const Messenger = Loader(
  lazy(() => import("src/content/applications/Messenger"))
);
const Transactions = Loader(
  lazy(() => import("src/content/applications/Transactions"))
);
const UserProfile = Loader(
  lazy(() => import("src/content/applications/Users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("src/content/applications/Users/settings"))
);

// Components

const Buttons = Loader(
  lazy(() => import("src/content/pages/Components/Buttons"))
);
const Modals = Loader(
  lazy(() => import("src/content/pages/Components/Modals"))
);
const Accordions = Loader(
  lazy(() => import("src/content/pages/Components/Accordions"))
);
const Tabs = Loader(lazy(() => import("src/content/pages/Components/Tabs")));
const Badges = Loader(
  lazy(() => import("src/content/pages/Components/Badges"))
);
const Tooltips = Loader(
  lazy(() => import("src/content/pages/Components/Tooltips"))
);
const Avatars = Loader(
  lazy(() => import("src/content/pages/Components/Avatars"))
);
const Cards = Loader(lazy(() => import("src/content/pages/Components/Cards")));
const Forms = Loader(lazy(() => import("src/content/pages/Components/Forms")));

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);
const Login = Loader(lazy(() => import("src/content/pages/Status/Login/")));
const Category = Loader(lazy(() => import("src/content/pages/Category")));

// Pages
// const BusinessProfileHomePage = Loader(
//   lazy(() => import("src/pages/Investment/BusinessProfile/"))
// );
// const CreateBusinessProfile = Loader(
//   lazy(
//     () =>
//       import("src/pages/Investment/BusinessProfile/Pages/CreateBusinessProfile")
//   )
// );
// const EditBusinessProfile = Loader(
//   lazy(
//     () =>
//       import("src/pages/Investment/BusinessProfile/Pages/EditBusinessProfile")
//   )
// );

// const ManagerHomePage = Loader(
//   lazy(() => import("src/pages/Investment/Manager/index"))
// );
// const CreateManager = Loader(
//   lazy(() => import("src/pages/Investment/Manager/Pages/CreateManager"))
// );
// const EditManager = Loader(
//   lazy(() => import("src/pages/Investment/Manager/Pages/EditManager"))
// );

// const WorkPermitHomePage = Loader(
//   lazy(() => import("src/pages/Investment/WorkPermit/"))
// );

// const RenewWorkPermit = Loader(
//   lazy(() => import("src/pages/Investment/RenewWorkPermit/index"))
// );

// const CreateWorkPermit = Loader(
//   lazy(() => import("src/pages/Investment/WorkPermit/Pages/CreateWorkPermit"))
// );
const EditWorkPermit = Loader(
  lazy(() => import("src/pages/Investment/WorkPermit/Pages/EditWorkPermit"))
);
const ProjectCategory = Loader(
  lazy(() => import("src/pages/Investment/ProjectCategory"))
);

const CreateSector = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/Sector/Pages/CreateSector"
      )
  )
);

const EditSector = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/Sector/Pages/EditSector"
      )
  )
);

const CreateSubSector = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/SubSector/Pages/CreateSubSector"
      )
  )
);

const EditSubSector = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/SubSector/Pages/EditSubSector"
      )
  )
);

const CreateActivity = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/Activity/Pages/CreateActivity"
      )
  )
);

const EditActivity = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/Activity/Pages/EditActivity"
      )
  )
);

const CreateInvestmentActivity = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/InvestmentActivity/Pages/CreateInvestmentActivity"
      )
  )
);

const EditInvestmentActivity = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/ProjectCategory/Tabs/InvestmentActivity/Pages/EditInvestmentActivity"
      )
  )
);

const InvestmentPermits = Loader(
  lazy(() => import("src/pages/Investment/InvestmentPermit/"))
);

const ViewInvestmentPermit = Loader(
  lazy(
    () =>
      import("src/pages/Investment/InvestmentPermit/Pages/ViewInvestmentPermit")
  )
);

const InvestmentPermitRenewals = Loader(
  lazy(() => import("src/pages/Investment/InvestmentPermitRenewal/"))
);

const ViewInvestmentPermitRenewals = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/InvestmentPermitRenewal/Pages/ViewInvestmentPermitRenewal"
      )
  )
);

const InvestmentPermitCancellations = Loader(
  lazy(() => import("src/pages/Investment/InvestmentPermitCancellation/"))
);

const ViewInvestmentPermitCancellations = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/InvestmentPermitCancellation/Pages/ViewInvestmentPermitCancellation"
      )
  )
);

const PrintInvestmentPermit = Loader(
  lazy(() => import("src/pages/Investment/InvestmentPermit/Pages/PrintPermit"))
);

const Dashboard = Loader(lazy(() => import("src/pages/Dashboard")));
const AdminMessaging = Loader(lazy(() => import("src/pages/Messenger")));

const InvestmentExpansion = Loader(
  lazy(() => import("src/pages/Investment/Expansion"))
);

const ViewInvestmentExpansion = Loader(
  lazy(
    () => import("src/pages/Investment/Expansion/Pages/ViewInvestmentPermit")
  )
);

const PrintInvestmentExpansion = Loader(
  lazy(() => import("src/pages/Investment/Expansion/Pages/PrintPermit"))
);

const AmendInvestmentPermit = Loader(
  lazy(() => import("src/pages/Investment/AmendInvestmentPermit"))
);

const ViewAmendment = Loader(
  lazy(
    () =>
      import("src/pages/Investment/AmendInvestmentPermit/Pages/ViewAmendment")
  )
);

const ViewCancellation = Loader(
  lazy(
    () =>
      import(
        "src/pages/Investment/InvestmentPermitCancellation/Pages/ViewInvestmentPermit"
      )
  )
);

const CompanyNameRegistration = Loader(
  lazy(() => import("src/pages/Investment/CompanyNameRegistration/"))
);

const BankSlip = Loader(lazy(() => import("src/pages/Investment/BankSlip")));

const CompanyNameEdit = Loader(
  lazy(() => import("src/pages/Investment/CompanyNameEdit/ViewCompanyNameEdit"))
);

const EditTinRegNumber = Loader(
  lazy(
    () => import("src/pages/Investment/EditTinRegNumber/ViewEditTinRegNumber")
  )
);

const ManageAccountsResource = Loader(
  lazy(() => import("src/pages/Resource/ManageAccounts"))
);

const UserInfo = Loader(
  lazy(
    () => import("src/pages/Investment/UserInfo/ViewInvestmentPermitRenewal")
  )
);

const EditInvestmentPermit = Loader(
  lazy(
    () => import("src/pages/Investment/EditInvestmentPermit/")
  )
);

const AssignInvestmentPermits = Loader(
  lazy(
    () => import("src/pages/DirectorPages/AssignWork/")
  )
);

const GeneralReports = Loader(
  lazy(
    () => import("src/pages/Reports/GeneralReports/")
  )
);

const SpecificReports = Loader(
  lazy(
    () => import("src/pages/Reports/SpecificReports/")
  )
);

const routes: PartialRouteObject[] = [
  {
    path: "*",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "/",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: customRoutes.AUTH.__PATH,
    children: [
      {
        path: customRoutes.AUTH.LOGIN.__PATH,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: customRoutes.DIRECTOR_PAGES.__PATH,
    element: <SidebarLayout />,
    children: [
      {
        path: customRoutes.DIRECTOR_PAGES.ASSIGN_INVESTMENT_PERMIT.__PATH,
        element: <AssignInvestmentPermits />,
      },
    ],
  },
  {
    path: customRoutes.REPORTS.__PATH,
    element: <SidebarLayout />,
    children: [
      {
        path: customRoutes.REPORTS.GENERAL_REPORTS.__PATH,
        element: <GeneralReports />,
      },
      {
        path: customRoutes.REPORTS.SPECIFIC_REPORTS.__PATH,
        element: <SpecificReports />,
      },
    ],
  },
  {
    path: "",
    element: <SidebarLayout />,
    children: [
      {
        path: customRoutes.INVESTMENT.MANAGE_ACCOUNT.__PATH,
        element: <ManageAccountsResource />,
      },
    ],
  },
  {
    path: customRoutes.MESSAGING.__PATH,
    element: <SidebarLayout />,
    children: [
      {
        path: customRoutes.MESSAGING.MY_MESSAGES.__PATH,
        element: <AdminMessaging />,
      },
    ],
  },
  {
    path: customRoutes.INVESTMENT.__PATH,
    element: <SidebarLayout />,
    children: [
      // {
      //   path: customRoutes.INVESTMENT.BUSINESS_PROFILE.__PATH,
      //   element: <BusinessProfileHomePage />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.CREATE_BUSINESS_PROFILE.__PATH,
      //   element: <CreateBusinessProfile />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.EDIT_BUSINESS_PROFILE.__PATH,
      //   element: <EditBusinessProfile />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.RENEW_WORK_PERMIT.__PATH,
      //   element: <RenewWorkPermit />,
      // },
      {
        path: customRoutes.INVESTMENT.INVESTMENT_PERMIT.__PATH,
        element: <InvestmentPermits />,
      },
      {
        path: customRoutes.INVESTMENT.VIEW_INVESTMENT_PERMIT.__PATH,
        element: <ViewInvestmentPermit />,
      },
      {
        path: customRoutes.INVESTMENT.INVESTMENT_PERMIT_RENEWAL.__PATH,
        element: <InvestmentPermitRenewals />,
      },
      {
        path: customRoutes.INVESTMENT.VIEW_INVESTMENT_PERMIT_RENEWAL.__PATH,
        element: <ViewInvestmentPermitRenewals />,
      },
      {
        path: customRoutes.INVESTMENT.EDIT_INVESTMENT_PERMIT.__PATH,
        element: <EditInvestmentPermit />
      },
      {
        path: customRoutes.INVESTMENT.PRINT_INVESTMENT_PERMIT.__PATH,
        element: <PrintInvestmentPermit />,
      },
      {
        path: customRoutes.INVESTMENT.PRINT_INVESTMENT_PERMIT_EXPANSION.__PATH,
        element: <PrintInvestmentExpansion />,
      },
      {
        path: customRoutes.INVESTMENT.INVESTMENT_PERMIT_CANCELLATION.__PATH,
        element: <InvestmentPermitCancellations />,
      },
      {
        path: customRoutes.INVESTMENT.VIEW_INVESTMENT_PERMIT_CANCELLATION
          .__PATH,
        element: <ViewInvestmentPermitCancellations />,
      },
      {
        path: customRoutes.INVESTMENT.AMEND_INVESTMENT_PERMIT.__PATH,
        element: <AmendInvestmentPermit />,
      },
      {
        path: customRoutes.INVESTMENT.INVESTMENT_PERMIT_CANCELLATION_VIEW
          .__PATH,
        element: <ViewCancellation />,
      },
      {
        path: customRoutes.INVESTMENT.USER_DETAILS.__PATH,
        element: <UserInfo />,
      },
    ],
  },
  {
    path: customRoutes.INVESTMENT.__PATH,
    element: <SidebarLayout />,
    children: [
      // {
      //   path: customRoutes.INVESTMENT.MANAGER.__PATH,
      //   element: <ManagerHomePage />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.CREATE_MANAGER.__PATH,
      //   element: <CreateManager />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.EDIT_MANAGER.__PATH,
      //   element: <EditManager />,
      // },
      {
        path: customRoutes.INVESTMENT.PROJECT_CATEGORY.__PATH,
        element: <ProjectCategory />,
      },
      // {
      //   path: customRoutes.INVESTMENT.WORK_PERMIT.__PATH,
      //   element: <WorkPermitHomePage />,
      // },
      // {
      //   path: customRoutes.INVESTMENT.CREATE_WORK_PERMIT.__PATH,
      //   element: <CreateWorkPermit />,
      // },
      {
        path: customRoutes.INVESTMENT.EDIT_WORK_PERMIT.__PATH,
        element: <EditWorkPermit />,
      },
      {
        path: customRoutes.INVESTMENT.CREATE_SECTOR.__PATH,
        element: <CreateSector />,
      },
      {
        path: customRoutes.INVESTMENT.EDIT_SECTOR.__PATH,
        element: <EditSector />,
      },
      {
        path: customRoutes.INVESTMENT.CREATE_SUB_SECTOR.__PATH,
        element: <CreateSubSector />,
      },
      {
        path: customRoutes.INVESTMENT.EDIT_SUB_SECTOR.__PATH,
        element: <EditSubSector />,
      },
      {
        path: customRoutes.INVESTMENT.CREATE_ACTIVITY.__PATH,
        element: <CreateActivity />,
      },
      {
        path: customRoutes.INVESTMENT.EDIT_ACTIVITY.__PATH,
        element: <EditActivity />,
      },
      {
        path: customRoutes.INVESTMENT.CREATE_INVESTMENT_ACTIVITY.__PATH,
        element: <CreateInvestmentActivity />,
      },
      {
        path: customRoutes.INVESTMENT.EDIT_INVESTMENT_ACTIVITY.__PATH,
        element: <EditInvestmentActivity />,
      },
      {
        path: customRoutes.INVESTMENT.PROJECT_EXPANSION.__PATH,
        element: <InvestmentExpansion />,
      },
      {
        path: customRoutes.INVESTMENT.VIEW_INVESTMENT_EXPANSION.__PATH,
        element: <ViewInvestmentExpansion />,
      },
      {
        path: customRoutes.INVESTMENT.AMEND_INVESTMENT_PERMIT_VIEW.__PATH,
        element: <ViewAmendment />,
      },
      {
        path: customRoutes.INVESTMENT.COMPANY_NAME_REGISTRATION.__PATH,
        element: <CompanyNameRegistration />,
      },
      {
        path: customRoutes.INVESTMENT.BANK_SLIP.__PATH,
        element: <BankSlip />,
      },
      {
        path: customRoutes.INVESTMENT.COMPANY_NAME_EDIT.__PATH,
        element: <CompanyNameEdit />,
      },
      {
        path: customRoutes.INVESTMENT.TIN_REGISTRATION_NUMBER_INPUT.__PATH,
        element: <EditTinRegNumber />,
      },
    ],
  },
  {
    path: "reset",
    children: [
      {
        path: "/",
        element: <ResetAccount />,
      },
      {
        path: "/confirm",
        element: <ConfirmReset />,
      },
      {
        path: "/confirm/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  // {
  //   path: "dashboards",
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Navigate to="/dashboards/crypto" replace />,
  //     },
  //     {
  //       path: "crypto",
  //       element: <Crypto />,
  //     },
  //     {
  //       path: "messenger",
  //       element: <Messenger />,
  //     },
  //   ],
  // },
  // {
  //   path: "management",
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Navigate to="/management/transactions" replace />,
  //     },
  //     {
  //       path: "transactions",
  //       element: <Transactions />,
  //     },
  //     {
  //       path: "profile",
  //       children: [
  //         {
  //           path: "/",
  //           element: <Navigate to="details" replace />,
  //         },
  //         {
  //           path: "details",
  //           element: <UserProfile />,
  //         },
  //         {
  //           path: "settings",
  //           element: <UserSettings />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: "components",
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Navigate to="/components/buttons" replace />,
  //     },
  //     {
  //       path: "buttons",
  //       element: <Buttons />,
  //     },
  //     {
  //       path: "modals",
  //       element: <Modals />,
  //     },
  //     {
  //       path: "accordions",
  //       element: <Accordions />,
  //     },
  //     {
  //       path: "tabs",
  //       element: <Tabs />,
  //     },
  //     {
  //       path: "badges",
  //       element: <Badges />,
  //     },
  //     {
  //       path: "tooltips",
  //       element: <Tooltips />,
  //     },
  //     {
  //       path: "avatars",
  //       element: <Avatars />,
  //     },
  //     {
  //       path: "cards",
  //       element: <Cards />,
  //     },
  //     {
  //       path: "forms",
  //       element: <Forms />,
  //     },
  //   ],
  // },
];

export default routes;
