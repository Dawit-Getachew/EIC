import { Suspense, lazy, useEffect, FC } from "react";
import { Navigate } from "react-router-dom";
import { PartialRouteObject, useLocation } from "react-router";
import customRoutes from "./routes";
import SidebarLayoutElement from "src/layouts/SideBarLayout/index";
import BaseLayout from "src/layouts/BaseLayout";
import Breadcrumps from "src/layouts/BreadCrumps";
import Status404 from "src/content/pages/Status/Status404";
import Status500 from "src/content/pages/Status/Status500";
import StatusMaintenance from "src/content/pages/Status/Maintenance";
import StatusComingSoon from "src/content/pages/Status/ComingSoon";
import SuspenseLoader from "src/components/SuspenseLoader";
import LoginPage from "src/pages/Auth/LoginPage/";
import SignupPage from "src/pages/Auth/SignupPage/";
import NewInvestmentPermit from "src/pages/Investment/NewInvestmentPermit/";
import SoleProprietorship from "src/pages/Investment/SoleProprietorship/";
import RenewInvestmentPermit from "src/pages/Investment/RenewInvestments/";
import RenewInvestmentPermitForm from "src/pages/Investment/RenewInvestments/Pages";
import RenewInvestmentPermitView from "src/pages/Investment/RenewInvestments/Pages/ViewInvestmentRenewal/";
import CancelInvestmentPermit from "src/pages/Investment/CancelInvestments/";
import ViewCancelInvestmentPermit from "src/pages/Investment/CancelInvestments/Pages/ViewPermitCancellation";
import PermitCancel from "src/pages/Investment/CancelInvestments/Pages/index";
import Services from "src/pages/Services";
import DashboardPage from "src/pages/Dashboard";
import MyInvestmentments from "src/pages/Investment/ExpansionInvestments/list";
import ExpansionInvestmentPermitList from "src/pages/Investment/ExpansionInvestments/expansion_list";
import ExpansionInvestmentPermitForm from "src/pages/Investment/ExpansionInvestments/";
import MyInvestmentPermits from "src/pages/Investment/MyInvestmentPermits/";
import ExpansionInvestmentPermitView from "src/pages/Investment/ExpansionInvestments/Pages/ViewPermitExpansion/";
import ViewInvestmentPermit from "src/pages/Investment/ViewInvestmentPermit/";
import EditInvestmentPermit from "src/pages/Investment/EditInvestmentPermit/";
import AmendInvestmentPermit from "src/pages/Investment/AmendInvestmentPermit";
import AmendInvestmentPermitForm from "src/pages/Investment/AmendInvestmentPermit/Pages/PermitAmmendment/";
import ViewAmendInvestmentPermit from "src/pages/Investment/AmendInvestmentPermit/Pages/ViewPermitAmmendment/";
import CompanyNameRegistration from "src/pages/Investment/CompanyNameRegistration/";
import CompanyRegistrationBankSlip from "src/pages/Investment/CompanyRegistrationBankSlip/";
import MemorandumBankSlip from "src/pages/Investment/MemorandumBankSlip/";
import UploadMemorandum from "src/pages/Investment/UploadMemorandum/";
import CreditServiceBankSlip from "src/pages/Investment/CreditServiceBankSlip/";
import ServiceFeeBankSlip from "src/pages/Investment/ServiceFeeBankSlip/";
import CompanyNameEdit from "src/pages/Investment/CompanyNameEdit/";
import CapitalRegistration from "src/pages/Services/CapitalRegistration/"
import CapitalRegistrationForm from "src/pages/Services/CapitalRegistration/Pages/RegistrationForm"
import NMinutesTable from "src/pages/Services/NMinutes/"
import ResidencePermit from "src/pages/Services/ResidencePermit/"
import NototityForm from "src/pages/Services/NMinutes/Pages/NototityForm"
import { isAuthenticated } from "src/store/States/Buffer";
import UserProfile from "src/pages/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages
const Overview = Loader(lazy(() => import("src/pages/Intro/")));

// Dashboards
interface AuthChildProps { }
const RenderAuthChild: FC<AuthChildProps> = (props) => {
  const location = useLocation();
  const authValue = useSelector(isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authValue) navigate("/auth/login", { replace: true });
  }, []);

  return (
    <SidebarLayoutElement
      activeSidebar={location.pathname}
      breadcrumps={<Breadcrumps />}
    >
      {props.children}
    </SidebarLayoutElement>
  );
};

interface NonAuthChildProps { }
const RenderNonAuthChild: FC<NonAuthChildProps> = (props) => {
  const authValue = useSelector(isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (authValue) navigate("/", { replace: true });
  }, []);

  return <>{props.children}</>;
};

const routes: PartialRouteObject[] = [
  {
    path: "*",
    children: [
      {
        path: "/",
        element: (
          <RenderAuthChild>
            <DashboardPage />
          </RenderAuthChild>
        ),
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
    path: "/",
    children: [
      {
        path: "/",
        element: (
          <RenderAuthChild>
            <DashboardPage />
          </RenderAuthChild>
        ),
      }
    ]
  },
  {
    path: customRoutes.AUTH.__PATH,
    children: [
      {
        path: customRoutes.AUTH.LOGIN.__PATH,
        element: (
          <RenderNonAuthChild>
            <LoginPage />
          </RenderNonAuthChild>
        ),
      },
      {
        path: customRoutes.AUTH.SIGNUP.__PATH,
        element: (
          <RenderNonAuthChild>
            <SignupPage />
          </RenderNonAuthChild>
        ),
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: customRoutes.PROFILE.__PATH,
        element: (
          <RenderAuthChild>
            <UserProfile />
          </RenderAuthChild>
        ),
      },
    ],
  },
  {
    path: customRoutes.INVESTMENT.__PATH,
    children: [
      {
        path: customRoutes.INVESTMENT.NEW_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <NewInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.NEW_INVESTMENT_PERMIT_PROPRIETORSHIP
          .__PATH,
        element: (
          <RenderAuthChild>
            <SoleProprietorship />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.RENEW_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.RENEW_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.RENEW_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermitView />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CANCEL_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <CancelInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CANCEL_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <PermitCancel />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CANCEL_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <ViewCancelInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.VIEW_NEW_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <ViewInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.EDIT_NEW_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <EditInvestmentPermit />
          </RenderAuthChild>
        )
      },
      {
        path: customRoutes.INVESTMENT.SERVICES.__PATH,
        element: (
          <RenderAuthChild>
            <Services />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.EXPAND_MY_INVESTMENT_PERMITS.__PATH,
        element: (
          <RenderAuthChild>
            <MyInvestmentments />
          </RenderAuthChild>
        ),
      },

      {
        path: customRoutes.INVESTMENT.EXPANSION_INVESTMENT_PERMIT_LIST.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitList />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.EXPANSION_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.VIEW_EXPANSION_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitView />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.AMEND_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <AmendInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.AMEND_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <AmendInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.AMEND_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <ViewAmendInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.COMPANY_NAME_REGISTRATION.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyNameRegistration />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.COMPANY_NAME_EDIT.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyNameEdit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.COMPANY_REGISTRATION_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyRegistrationBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.MEMORANDUM_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <MemorandumBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.MEMORANDUM_DOCUMENT_PAGE.__PATH,
        element: (
          <RenderAuthChild>
            <UploadMemorandum />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CREDIT_ADVICE_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <CreditServiceBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.SERVICE_FEE_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <ServiceFeeBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.MY_INVESTMENT_PERMITS.__PATH,
        element: (
          <RenderAuthChild>
            <MyInvestmentPermits />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CAPITAL_REGISTRATION.__PATH,
        element: (
          <RenderAuthChild>
            <CapitalRegistration />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.CAPITAL_REGISTRATION_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <CapitalRegistrationForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.NOTORIZED_MINUTES.__PATH,
        element: (
          <RenderAuthChild>
            <NMinutesTable />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.NOTORIZED_MINUTES_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <NototityForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.INVESTMENT.REQUEST_RESIDENCE_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <ResidencePermit />
          </RenderAuthChild>
        ),
      },
    ],
  },
];

export default routes;
