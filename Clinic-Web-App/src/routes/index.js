import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import VisitPage from "../pages/Visit/VisitPage";
import VisitDetails from "../pages/Visit/VisitDetails";
import SoftMeditation from "../pages/meditation/SoftMeditation";
import HardMeditation from "../pages/meditation/HardMeditation";
import MeditationDetails from "../pages/meditation/MeditationDetails";
import NewQuiz from "../pages/quiz/NewQuiz";
import OldQuiz from "../pages/quiz/OldQuiz";
import SkillsCategory from "../pages/Skills/Skills";
import SkillsList from "../pages/Skills/SkillsList";
import SkillDetails from "../pages/Skills/SkillDetails";
import InformationCategory from "../pages/Information/InformationCategory";
import InfoList from "../pages/Information/InfoList";
import Games from "../pages/game/Games";
import GameDetails from "../pages/game/GameDetails";
import Profile from "../pages/profile/Profile";
import Setting from "../pages/setting/Setting";
import Login from "../pages/login/Login";
import DrugStore from "../pages/drugStore/DrugStore";
import NewSurvey from "../pages/Survey/NewSurvey";
import OldSurvey from "../pages/Survey/OldSurvey";
import SurveyQuestion from "../pages/Survey/SurveyQuestion";
import AboutUs from "../pages/about us/AboutUs.jsx";
import ContactUs from "../pages/contact us/ContactUs";
import Consultant from "../pages/Consultant/Consultant";
import NewRequest from "../pages/Consultant/NewRequest";
import RequestDetails from "../pages/Consultant/RequestDetails";
import SignUp from "../pages/login/SignUp";
import UserLogin from "../pages/login/UserLogin";
import SignUp1 from "../pages/login/SignUp1";
import QuizInfo from "../pages/quiz/QuizInfo";
import Quiz1 from "../pages/quiz/Quiz1";
import Quiz2 from "../pages/quiz/Quiz2";
import InformationDitails from "../pages/Information/InformationDitails";
import Suport from "../pages/Suport/Suport";
import NewTicket from "../pages/Suport/NewRequest";
import TicketDetails from "../pages/Suport/RequestDetails";

import Private from "./privateroute";
import MultiChoiceResult from "../pages/quiz/MultiChoiceResult";
import DescriptiveResult from "../pages/quiz/DescriptiveResult";
import Disease from "../pages/Disease/Disease";
function Nopage() {
  return (
    <div style={{ height: "100vh" }}>
      <h3>404</h3>
    </div>
  );
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Nopage />,
    children: [
      {
        path: "/profile",
        element: <Private><Profile /></Private>,
      },
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/my-visit",
        element:<Private> <VisitPage /></Private>,
      },
      {
        path: "/my-visit/:id",
        element: <VisitDetails />,
      },
      {
        path: "/meditation/simple",
        element: <SoftMeditation />,
      },
      {
        path: "/meditation/hard",
        element: <HardMeditation />,
      },
      {
        path: "/meditation/simple/:id",
        element: <MeditationDetails />,
      },
      {
        path: "/meditation/hard/:id",
        element: <MeditationDetails />,
      },
      {
        path: "/meditation/:id",
        element: <MeditationDetails />,
      },
      {
        path: "/new-quiz",
        element: <NewQuiz />,
      },
      {
        path: "/quiz-info/:type/:id",
        element: <Private><QuizInfo /></Private>,
      },
      {
        path: "/descriptive-test",
        element: <Private><Quiz1 /></Private>,
      },
      {
        path: "/multiple-choice-test",
        element: <Private><Quiz2 /></Private>,
      },
      {
        path: "/old-quiz",
        element: <Private><OldQuiz /></Private>,
      },
      {
        path: "/old-quiz/multiChoiceQuiz/:id",
        element: <Private><MultiChoiceResult /></Private>,
      },
      {
        path: "/old-quiz/descriptiveQuiz/:id",
        element: <Private><DescriptiveResult /></Private>,
      },
      {
        path: "/mental-health",
        element: <SkillsCategory />,
      },
      {
        path: "/mental-health/:id",
        element: <SkillsList />,
      },
      {
        path: "/mental-health/:id/:id2",
        element: <SkillDetails />,
      },
      {
        path: "/Information",
        element: <InformationCategory />,
      },
      {
        path: "/Information/:id",
        element: <InfoList />,
      },
      {
        path: "/Information/:id/:id2",
        element: <InformationDitails />,
      },
      {
        path: "/game",
        element: <Games />,
      },
      {
        path: "/game/:id",
        element: <GameDetails />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/drug-store",
        element: <DrugStore />,
      },
      {
        path: "/new-survey",
        element: <NewSurvey />,
      },
      {
        path: "/old-survey",
        element: <Private><OldSurvey /></Private>,
      },
      {
        path: "/new-survey/:id",
        element: <Private><SurveyQuestion /></Private>,
      },
      {
        path: "/old-survey/:id",
        element: <Private><SurveyQuestion /></Private>,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/consultant",
        element: <Consultant />,
      },
      {
        path: "/consultant/:id",
        element: <RequestDetails />,
      },
      {
        path: "/new-request",
        element: <NewRequest />,
      },
      {
        path: "/support",
        element: <Private><Suport /></Private>,
      },
      {
        path: "/new-ticket",
        element: <Private><NewTicket /></Private>,
      },
      {
        path: "/ticket/:id",
        element: <Private><TicketDetails /></Private>,
      },
      
    ],
  },
  {
    path: "/disease/:id",
    element: <Disease />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp1 />,
  },
  {
    path: "/user-login",
    element: <UserLogin />,
  },
  {
    path: "/user-signup",
    element: <SignUp />,
  },
]);
