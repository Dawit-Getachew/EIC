/* eslint-disable */
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
import NewInvestmentPermit from "src/pages/Investment/NewWorkPermit";
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
import MyInvestmentPermits from "src/pages/Investment/MyWorkPermitPermits";
import ExpansionInvestmentPermitView from "src/pages/Investment/ExpansionInvestments/Pages/ViewPermitExpansion/";
import ViewWorkPermit from "src/pages/Investment/ViewWorkPermit";
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
import UserProfile from "src/pages/User/";
import { isAuthenticated } from "src/store/States/Buffer";
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
interface AuthChildProps {}
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

interface NonAuthChildProps {}
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
    path: customRoutes.PROFILE.__PATH,
    element: (
      <RenderAuthChild>
        <UserProfile />
      </RenderAuthChild>
    ),
  },
  {
    path: customRoutes.WORK_PERMIT.__PATH,
    children: [
      {
        path: customRoutes.WORK_PERMIT.NEW_WORK_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <NewInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.NEW_INVESTMENT_PERMIT_PROPRIETORSHIP
          .__PATH,
        element: (
          <RenderAuthChild>
            <SoleProprietorship />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <RenewInvestmentPermitView />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.CANCEL_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <CancelInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.CANCEL_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <PermitCancel />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.CANCEL_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <ViewCancelInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.VIEW_NEW_WORK_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <ViewWorkPermit />
          </RenderAuthChild>
        ),
      },

      {
        path: customRoutes.WORK_PERMIT.SERVICES.__PATH,
        element: (
          <RenderAuthChild>
            <Services />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.EXPAND_MY_INVESTMENT_PERMITS.__PATH,
        element: (
          <RenderAuthChild>
            <MyInvestmentments />
          </RenderAuthChild>
        ),
      },

      {
        path: customRoutes.WORK_PERMIT.EXPANSION_INVESTMENT_PERMIT_LIST.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitList />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.EXPANSION_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.VIEW_EXPANSION_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <ExpansionInvestmentPermitView />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.AMEND_INVESTMENT_PERMIT.__PATH,
        element: (
          <RenderAuthChild>
            <AmendInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.AMEND_INVESTMENT_PERMIT_FORM.__PATH,
        element: (
          <RenderAuthChild>
            <AmendInvestmentPermitForm />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.AMEND_INVESTMENT_PERMIT_VIEW.__PATH,
        element: (
          <RenderAuthChild>
            <ViewAmendInvestmentPermit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.COMPANY_NAME_REGISTRATION.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyNameRegistration />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.COMPANY_NAME_EDIT.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyNameEdit />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.COMPANY_REGISTRATION_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <CompanyRegistrationBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.MEMORANDUM_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <MemorandumBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.MEMORANDUM_DOCUMENT_PAGE.__PATH,
        element: (
          <RenderAuthChild>
            <UploadMemorandum />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.CREDIT_ADVICE_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <CreditServiceBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.SERVICE_FEE_BANK_SLIP.__PATH,
        element: (
          <RenderAuthChild>
            <ServiceFeeBankSlip />
          </RenderAuthChild>
        ),
      },
      {
        path: customRoutes.WORK_PERMIT.MY_WORK_PERMITS.__PATH,
        element: (
          <RenderAuthChild>
            <MyInvestmentPermits />
          </RenderAuthChild>
        ),
      },
    ],
  },
];

export default routes;
