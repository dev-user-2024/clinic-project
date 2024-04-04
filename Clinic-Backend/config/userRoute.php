<?php


use App\Http\Consts\RouteConst as RC;

return [
     "user.setPassword" => RC::setPassword.RC::USER,

    "item.index" => RC::GET_ALL.RC::ITEM, "item.show" => RC::GET.RC::ITEM,

    "informationItem.index" => RC::GET_ALL.RC::ITEM_INFORMATION, "informationItem.show" => RC::GET.RC::ITEM_INFORMATION,

    "categoryLifeSkills.index" => RC::GET_ALL.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.show" => RC::GET.RC::CATEGORY_LIFE_SKILL,

    "CEOServices.index" => RC::GET_ALL.RC::CEO_SERVICE, "CEOServices.show" => RC::GET.RC::CEO_SERVICE, "CEOServices.store" => RC::STORE.RC::CEO_SERVICE, "CEOServices.update" => RC::UPDATE.RC::CEO_SERVICE, "CEOServices.destroy" => RC::DELETE.RC::CEO_SERVICE,

    "disease.index" => RC::GET_ALL.RC::DISEASE, "disease.show" => RC::GET.RC::DISEASE,

    "entertainment.index" => RC::GET_ALL.RC::ENTERTAINMENT, "entertainment.show" => RC::GET.RC::ENTERTAINMENT,

    "informationCategory.index" => RC::GET_ALL.RC::INFORMATION, "informationCategory.show" => RC::GET.RC::INFORMATION,

    "meditation.index" => RC::GET_ALL.RC::MEDITATION, "meditation.show" => RC::GET.RC::MEDITATION, "meditation.getByType" => RC::getByType.RC::MEDITATION,

    "faceToFaceVisit.show" => RC::GET.RC::FACE_TO_FACE_VISIT,

    "drugStore.index" => RC::GET_ALL.RC::DRUG_STORE, "drugStore.show" => RC::GET.RC::DRUG_STORE,

    "drug.index" => RC::GET_ALL.RC::DRUG, "drug.show" => RC::GET.RC::DRUG, "drug.searchName" => RC::searchName.RC::DRUG,

    "multiChoiceQuiz.index" => RC::GET_ALL.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.show" => RC::GET.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.myQuizzes" => RC::myQuizzes.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.theQuestionAndThePickedChoices" => RC::theQuestionAndThePickedChoices.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.myMark" => RC::myMark.RC::MULTICHOICE_QUIZ,

    "descriptiveQuiz.index" => RC::GET_ALL.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.show" => RC::GET.RC::DESCRIPTIVE_QUIZ,  "descriptiveQuiz.theQuestionAndTheAnswers" => RC::theQuestionAndTheAnswers.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.myQuizzes" => RC::myQuizzes.RC::DESCRIPTIVE_QUIZ,

    "survey.index" => RC::GET_ALL.RC::SURVEY, "survey.show" => RC::GET.RC::SURVEY, "survey.mySurveys" => RC::mySurveys.RC::SURVEY, "survey.theQuestionAndTheAnswers" => RC::theQuestionAndTheAnswers.RC::SURVEY,

    "multiChoiceQuestion.index" => RC::GET_ALL.RC::MULTICHOICE_QUESTION, "multiChoiceQuestion.show" => RC::GET.RC::MULTICHOICE_QUESTION,

    "multiChoiceSurveyQuestion.index" => RC::GET_ALL.RC::MULTICHOICE_SURVEY_QUESTION, "multiChoiceSurveyQuestion.show" => RC::GET.RC::MULTICHOICE_SURVEY_QUESTION,

    "descriptiveQuestion.index" => RC::GET_ALL.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.show" => RC::GET.RC::DESCRIPTIVE_QUESTION,  "descriptiveQuestion.storeAnswer" => RC::storeAnswer.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.getAnswer" => RC::getAnswer.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.removeAnswer" => RC::removeAnswer.RC::DESCRIPTIVE_QUESTION,

    "choice.index" => RC::GET_ALL.RC::CHOICE, "choice.show" => RC::GET.RC::CHOICE, "choice.pickAnAnswer" => RC::pickAnAnswer.RC::CHOICE, "choice.removeAnAnswer" => RC::removeAnswer.RC::CHOICE,"choice.getAnswersOfQuiz" => RC::getAnswersOfQuiz.RC::CHOICE,

    "surveyChoice.index" => RC::GET_ALL.RC::SURVEY_CHOICE, "surveyChoice.show" => RC::GET.RC::SURVEY_CHOICE,  "surveyChoice.pickAnAnswer" => RC::pickAnAnswer.RC::SURVEY_CHOICE, "surveyChoice.removeAnAnswer" => RC::removeAnAnswer.RC::SURVEY_CHOICE,"surveyChoice.getAnswersOfSurvey" => RC::getAnswersOfSurvey.RC::SURVEY_CHOICE,

    "role.index" => RC::GET_ALL.RC::ROLE, "role.show" => RC::GET.RC::ROLE, "role.makeDefaultRole" => RC::makeDefaultRole.RC::ROLE,

    "levelScore.index" => RC::GET_ALL.RC::LEVEL_SCORE, "levelScore.show" => RC::GET.RC::LEVEL_SCORE, "levelScore.store" => RC::STORE.RC::LEVEL_SCORE, "levelScore.update" => RC::UPDATE.RC::LEVEL_SCORE, "levelScore.destroy" => RC::DELETE.RC::LEVEL_SCORE, "levelScore.assignQuiz" => RC::assignQuiz.RC::LEVEL_SCORE,

    "categoryTicket.index" => RC::GET_ALL.RC::CATEGORY_TICKET, "categoryTicket.show" => RC::GET.RC::CATEGORY_TICKET, "categoryTicket.store" => RC::STORE.RC::CATEGORY_TICKET, "categoryTicket.update" => RC::UPDATE.RC::CATEGORY_TICKET, "categoryTicket.destroy" => RC::DELETE.RC::CATEGORY_TICKET,

    "ticket.index" => RC::GET_ALL.RC::TICKET, "ticket.show" => RC::GET.RC::TICKET, "ticket.store" => RC::STORE.RC::TICKET, "ticket.update" => RC::UPDATE.RC::TICKET, "ticket.destroy" => RC::DELETE.RC::TICKET, "ticket.myTickets" => RC::myTickets.RC::TICKET, "ticket.inProgress" => RC::inProgress.RC::TICKET,

    "message.index" => RC::GET_ALL.RC::MESSAGE, "message.show" => RC::GET.RC::MESSAGE, "message.store" => RC::STORE.RC::MESSAGE, "message.update" => RC::UPDATE.RC::MESSAGE, "message.destroy" => RC::DELETE.RC::MESSAGE,

    "potentialUser.index" => RC::GET_ALL.RC::POTENTIAL_USER, "potentialUser.show" => RC::GET.RC::POTENTIAL_USER, "potentialUser.store" => RC::STORE.RC::POTENTIAL_USER, "potentialUser.update" => RC::UPDATE.RC::POTENTIAL_USER, "potentialUser.destroy" => RC::DELETE.RC::POTENTIAL_USER,
];
