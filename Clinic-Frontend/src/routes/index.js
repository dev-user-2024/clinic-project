import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Disease from "../pages/disease/Disease";
import Entertainment from "../pages/entertainment/Entertainment";
import InPerson from "../pages/in-person/InPerson";
import Drug from "../pages/Drug/Drug";
import DrugStore from "../pages/DrugStore/DrugStore";
import Services from "../pages/services/Services.jsx";
import Quiz from "../pages/quiz/Quiz";
import Survey from "../pages/survay/Survey";
import Login from "../pages/login/Login";
import Meditation from "../pages/Meditation/Meditation";
import LifeSkills from "../pages/LifeSkills/LifeSkills";
import Information from "../pages/Information/Information";
import Users from "../pages/users/Users";
import SurveyQuestions from "../pages/survay/SurveyQuestions";
import DescriptiveQuiz from "../pages/quiz/DescriptiveQuiz";
import MultiChoiceQuiz from "../pages/quiz/MultiChoiceQuiz";
import ResultInfo from "../pages/quiz/ResultInfo";
import Tickets from "../pages/Tickets/Tickets";
import Private from "./privateroute";
import TicketDitails from "../pages/Tickets/TicketDitails";
import Requestes from "../pages/Requestes/Requestes";
import DescQuizResult from "../pages/quiz/DescQuizResult";
import MultiQuizResults from "../pages/quiz/MultiQuizResults";
import UserResult2 from "../pages/quiz/UserResult2";
import UserResult1 from "../pages/quiz/UserResult1";
import SurveyResult from "../pages/survay/SurveyResult";
import SurveyUserResult from "../pages/survay/SurveyUserResult";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Private><MainLayout/></Private>,
        errorElement: (
            <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
        ),
        children:[
            {
                path:"disease",
                element:<Disease/>
            },
            {
                path:"entertainment",
                element: <Entertainment/>
            },
            {
                path:"meditation",
                element: <Meditation/>
            },
            {
                path:"life-skills",
                element: <LifeSkills/>
            },
            {
                path:"information",
                element: <Information/>
            },
            {
                path:"face-to-face-visit",
                element: <InPerson/>
            },
            {
                path:"drug",
                element: <Drug/>
            },
            {
                path:"drug-store",
                element: <DrugStore/>
            },
            {
                path:"CEO-services",
                element: <Services/>
            },
            {
                path:"users",
                element: <Users/>
            },
            {
                path:"quiz",
                element: <Quiz/>
            },
            {
                path:"descriptiveQuiz/:id",
                element: <DescriptiveQuiz/>
            },
            {
                path:"multiChoiceQuiz/:id",
                element: <MultiChoiceQuiz/>
            },
            {
                path:"descriptiveQuiz/result/:id",
                element: <DescQuizResult/>
            },
            {
                path:"multiChoiceQuiz/result/:id",
                element: <MultiQuizResults/>
            },
            {
                path:"descriptiveQuiz/result/:id/:userId",
                element: <UserResult2/>
            },
            {
                path:"multiChoiceQuiz/result/:id/:userId",
                element: <UserResult1/>
            },
            {
                path:"multiChoiceQuiz/:id/result",
                element: <ResultInfo/>
            },
            {
                path:"survey",
                element: <Survey/>
            },
            {
                path:"add-survey/:id",
                element: <SurveyQuestions/>
            },
            {
                path:"survey/result/:id",
                element: <SurveyResult/>
            },
            {
                path:"survey/result/:id/:userId",
                element: <SurveyUserResult/>
            },
            {
                path:"tickets",
                element: <Tickets/>
            },
            {
                path:"tickets/:id",
                element: <TicketDitails/>
            },
            {
                path:"requestes",
                element: <Requestes/>
            },
        ]
    },
    {
        path:"/login",
        element : <Login/>
    }
]);