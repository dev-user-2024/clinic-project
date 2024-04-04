<?php


use App\Http\Consts\RouteConst as RC;

return [
    "user.index" => RC::GET_ALL . RC::USER, "user.show" => RC::GET.RC::USER, "user.store" => RC::STORE.RC::USER, "user.update" => RC::UPDATE.RC::USER, "user.destroy" => RC::DELETE.RC::USER, "user.assignRole" => RC::assignRole.RC::USER, "user.removeRole" => RC::removeRole.RC::USER, "user.setPassword" => RC::setPassword.RC::USER,

    "item.index" => RC::GET_ALL.RC::ITEM, "item.show" => RC::GET.RC::ITEM, "item.store" => RC::STORE.RC::ITEM, "item.update" => RC::UPDATE.RC::ITEM, "item.destroy" => RC::DELETE.RC::ITEM,

    "informationItem.index" => RC::GET_ALL.RC::ITEM_INFORMATION, "informationItem.show" => RC::GET.RC::ITEM_INFORMATION, "informationItem.store" => RC::STORE.RC::ITEM_INFORMATION, "informationItem.update" => RC::UPDATE.RC::ITEM_INFORMATION, "informationItem.destroy" => RC::DELETE.RC::ITEM_INFORMATION,

    "categoryLifeSkills.index" => RC::GET_ALL.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.show" => RC::GET.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.store"=> RC::STORE.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.update" => RC::UPDATE.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.destroy" => RC::DELETE.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.assignItem" => RC::assignItem.RC::CATEGORY_LIFE_SKILL, "categoryLifeSkills.removeItem" => RC::removeItem.RC::CATEGORY_LIFE_SKILL,

    "CEOServices.index" => RC::GET_ALL.RC::CEO_SERVICE, "CEOServices.show" => RC::GET.RC::CEO_SERVICE, "CEOServices.store" => RC::STORE.RC::CEO_SERVICE, "CEOServices.update" => RC::UPDATE.RC::CEO_SERVICE, "CEOServices.destroy" => RC::DELETE.RC::CEO_SERVICE,

    "disease.index" => RC::GET_ALL.RC::DISEASE, "disease.show" => RC::GET.RC::DISEASE, "disease.store" => RC::STORE.RC::DISEASE, "disease.update" => RC::UPDATE.RC::DISEASE, "disease.destroy" => RC::DELETE.RC::DISEASE,

    "entertainment.index" => RC::GET_ALL.RC::ENTERTAINMENT, "entertainment.show" => RC::GET.RC::ENTERTAINMENT, "entertainment.store" => RC::STORE.RC::ENTERTAINMENT, "entertainment.update" => RC::UPDATE.RC::ENTERTAINMENT, "entertainment.destroy" => RC::DELETE.RC::ENTERTAINMENT, "entertainment.attachDisease" => RC::attachDisease.RC::ENTERTAINMENT, "entertainment.deAttachDisease" => RC::deAttachDisease.RC::ENTERTAINMENT ,

    "informationCategory.index" => RC::GET_ALL.RC::INFORMATION, "informationCategory.show" => RC::GET.RC::INFORMATION, "informationCategory.store" => RC::STORE.RC::INFORMATION, "informationCategory.update" => RC::UPDATE.RC::INFORMATION, "informationCategory.destroy" => RC::DELETE.RC::INFORMATION, "informationCategory.assignItem" => RC::assignItemInformation.RC::INFORMATION, "informationCategory.removeItem" => RC::removeItemInformation.RC::INFORMATION,

    "meditation.index" => RC::GET_ALL.RC::MEDITATION, "meditation.show" => RC::GET.RC::MEDITATION, "meditation.store" => RC::STORE.RC::MEDITATION, "meditation.update" => RC::UPDATE.RC::MEDITATION, "meditation.destroy" => RC::DELETE.RC::MEDITATION, "meditation.attachDisease" => RC::attachDisease.RC::MEDITATION, "meditation.deAttachDisease" => RC::deAttachDisease.RC::MEDITATION, "meditation.getByType" => RC::getByType.RC::MEDITATION,

    "faceToFaceVisit.index" => RC::GET_ALL.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.show" => RC::GET.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.store" => RC::STORE.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.update" => RC::UPDATE.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.destroy" => RC::DELETE.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.saveDisease" => RC::saveDisease.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.unSaveDisease" => RC::unSaveDisease.RC::FACE_TO_FACE_VISIT, "faceToFaceVisit.uploadExcel" => RC::uploadExcel.RC::FACE_TO_FACE_VISIT,

    "drugStore.index" => RC::GET_ALL.RC::DRUG_STORE, "drugStore.show" => RC::GET.RC::DRUG_STORE, "drugStore.store" => RC::STORE.RC::DRUG_STORE, "drugStore.update" => RC::UPDATE.RC::DRUG_STORE, "drugStore.destroy" => RC::DELETE.RC::DRUG_STORE, "drugStore.attachDisease" => RC::attachDisease.RC::DRUG_STORE, "drugStore.deAttachDisease" => RC::deAttachDisease.RC::DRUG_STORE,

    "drug.index" => RC::GET_ALL.RC::DRUG, "drug.show" => RC::GET.RC::DRUG, "drug.store" => RC::STORE.RC::DRUG, "drug.update" => RC::UPDATE.RC::DRUG, "drug.destroy" => RC::DELETE.RC::DRUG, "drug.attachDisease" => RC::attachDisease.RC::DRUG, "drug.deAttachDisease" => RC::deAttachDisease.RC::DRUG, "drug.attachDrugStore" => RC::attachDrugStore.RC::DRUG, "drug.deAttachDrugStore" => RC::deAttachDrugStore.RC::DRUG, "drug.searchName" => RC::searchName.RC::DRUG,

    "multiChoiceQuiz.index" => RC::GET_ALL.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.show" => RC::GET.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.store" => RC::STORE.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.update" => RC::UPDATE.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.destroy" => RC::DELETE.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.attachDisease" => RC::attachDisease.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.deAttachDisease" => RC::deAttachDisease.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.saveMultiChoiceQuestion" => RC::saveMultiChoiceQuestion.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.myQuizzes" => RC::myQuizzes.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.theQuestionAndThePickedChoices" => RC::theQuestionAndThePickedChoices.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.myMark" => RC::myMark.RC::MULTICHOICE_QUIZ, "multiChoiceQuiz.theQuestionAndTheAnswersOfUser" => RC::theQuestionAndTheAnswersOfUser.RC::MULTICHOICE_QUIZ,

    "descriptiveQuiz.index" => RC::GET_ALL.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.show" => RC::GET.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.store" => RC::STORE.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.update" => RC::UPDATE.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.destroy" => RC::DELETE.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.attachDisease" => RC::attachDisease.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.deAttachDisease" => RC::deAttachDisease.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.saveMultiChoiceQuestion" => RC::saveMultiChoiceQuestion.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.saveDescriptiveQuestion" => RC::saveDescriptiveQuestion.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.addUserResult" => RC::addUserResult.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.theQuestionAndTheAnswers" => RC::theQuestionAndTheAnswers.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.theQuestionAndTheAnswersOfUser" => RC::theQuestionAndTheAnswersOfUser.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.myResult" => RC::myResult.RC::DESCRIPTIVE_QUIZ, "descriptiveQuiz.myQuizzes" => RC::myQuizzes.RC::DESCRIPTIVE_QUIZ,

    "survey.index" => RC::GET_ALL.RC::SURVEY, "survey.show" => RC::GET.RC::SURVEY, "survey.store" => RC::STORE.RC::SURVEY, "survey.update" => RC::UPDATE.RC::SURVEY, "survey.destroy" => RC::DELETE.RC::SURVEY, "survey.attachDisease" => RC::attachDisease.RC::SURVEY, "survey.deAttachDisease" => RC::deAttachDisease.RC::SURVEY, "survey.assignMultiChoiceQuestion" => RC::assignMultiChoiceQuestion.RC::SURVEY, "survey.removeMultiChoiceQuestion" => RC::removeMultiChoiceQuestion.RC::SURVEY, "survey.mySurveys" => RC::mySurveys.RC::SURVEY, "survey.theQuestionAndTheAnswers" => RC::theQuestionAndTheAnswers.RC::SURVEY, "survey.theQuestionAndTheAnswersOfUser" => RC::theQuestionAndTheAnswersOfUser.RC::SURVEY,

    "multiChoiceQuestion.index" => RC::GET_ALL.RC::MULTICHOICE_QUESTION, "multiChoiceQuestion.show" => RC::GET.RC::MULTICHOICE_QUESTION, "multiChoiceQuestion.store" => RC::STORE.RC::MULTICHOICE_QUESTION, "multiChoiceQuestion.update" => RC::UPDATE.RC::MULTICHOICE_QUESTION, "multiChoiceQuestion.destroy" => RC::DELETE.RC::MULTICHOICE_QUESTION,

    "multiChoiceSurveyQuestion.index" => RC::GET_ALL.RC::MULTICHOICE_SURVEY_QUESTION, "multiChoiceSurveyQuestion.show" => RC::GET.RC::MULTICHOICE_SURVEY_QUESTION, "multiChoiceSurveyQuestion.store" => RC::STORE.RC::MULTICHOICE_SURVEY_QUESTION, "multiChoiceSurveyQuestion.update" => RC::UPDATE.RC::MULTICHOICE_SURVEY_QUESTION, "multiChoiceSurveyQuestion.destroy" => RC::DELETE.RC::MULTICHOICE_SURVEY_QUESTION,

    "descriptiveQuestion.index" => RC::GET_ALL.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.show" => RC::GET.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.store" => RC::STORE.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.update" => RC::UPDATE.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.destroy" => RC::DELETE.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.storeAnswer" => RC::storeAnswer.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.getAnswer" => RC::getAnswer.RC::DESCRIPTIVE_QUESTION, "descriptiveQuestion.removeAnswer" => RC::removeAnswer.RC::DESCRIPTIVE_QUESTION,

    "choice.index" => RC::GET_ALL.RC::CHOICE, "choice.show" => RC::GET.RC::CHOICE, "choice.store" => RC::STORE.RC::CHOICE, "choice.update" => RC::UPDATE.RC::CHOICE, "choice.destroy" => RC::DELETE.RC::CHOICE, "choice.pickAnAnswer" => RC::pickAnAnswer.RC::CHOICE, "choice.removeAnAnswer" => RC::removeAnswer.RC::CHOICE, "choice.assignQuestion" => RC::assignQuestion.RC::CHOICE , "choice.removeQuestion" => RC::removeQuestion.RC::CHOICE, "choice.getAnswersOfQuiz" => RC::getAnswersOfQuiz.RC::CHOICE,

    "surveyChoice.index" => RC::GET_ALL.RC::SURVEY_CHOICE, "surveyChoice.show" => RC::GET.RC::SURVEY_CHOICE, "surveyChoice.store" => RC::STORE.RC::SURVEY_CHOICE, "surveyChoice.update" => RC::UPDATE.RC::SURVEY_CHOICE, "surveyChoice.destroy" => RC::DELETE.RC::SURVEY_CHOICE, "surveyChoice.pickAnAnswer" => RC::pickAnAnswer.RC::SURVEY_CHOICE, "surveyChoice.removeAnAnswer" => RC::removeAnAnswer.RC::SURVEY_CHOICE, "surveyChoice.assignQuestion" => RC::assignQuestion.RC::SURVEY_CHOICE , "surveyChoice.removeQuestion" => RC::removeQuestion.RC::SURVEY_CHOICE, "surveyChoice.getAnswersOfSurvey" => RC::getAnswersOfSurvey.RC::SURVEY_CHOICE,

    "role.index" => RC::GET_ALL.RC::ROLE, "role.show" => RC::GET.RC::ROLE, "role.store" => RC::STORE.RC::ROLE, "role.update" => RC::UPDATE.RC::ROLE, "role.destroy" => RC::DELETE.RC::ROLE, "role.makeDefaultRole" => RC::makeDefaultRole.RC::ROLE, "role.allPermissions" => RC::allPermissions.RC::ROLE, "role.setPermissions" => RC::setPermissions.RC::ROLE, "role.removePermissions" => RC::removePermissions.RC::ROLE, "role.supperAdmin" => RC::supperAdmin.RC::ROLE, "role.allUserPermission" => RC::allUserPermission.RC::ROLE,

    "levelScore.index" => RC::GET_ALL.RC::LEVEL_SCORE, "levelScore.show" => RC::GET.RC::LEVEL_SCORE, "levelScore.store" => RC::STORE.RC::LEVEL_SCORE, "levelScore.update" => RC::UPDATE.RC::LEVEL_SCORE, "levelScore.destroy" => RC::DELETE.RC::LEVEL_SCORE, "levelScore.assignQuiz" => RC::assignQuiz.RC::LEVEL_SCORE,

    "categoryTicket.index" => RC::GET_ALL.RC::CATEGORY_TICKET, "categoryTicket.show" => RC::GET.RC::CATEGORY_TICKET, "categoryTicket.store" => RC::STORE.RC::CATEGORY_TICKET, "categoryTicket.update" => RC::UPDATE.RC::CATEGORY_TICKET, "categoryTicket.destroy" => RC::DELETE.RC::CATEGORY_TICKET,

    "ticket.index" => RC::GET_ALL.RC::TICKET, "ticket.show" => RC::GET.RC::TICKET, "ticket.store" => RC::STORE.RC::TICKET, "ticket.update" => RC::UPDATE.RC::TICKET, "ticket.destroy" => RC::DELETE.RC::TICKET, "ticket.myTickets" => RC::myTickets.RC::TICKET, "ticket.inProgress" => RC::inProgress.RC::TICKET,

    "message.index" => RC::GET_ALL.RC::MESSAGE, "message.show" => RC::GET.RC::MESSAGE, "message.store" => RC::STORE.RC::MESSAGE, "message.update" => RC::UPDATE.RC::MESSAGE, "message.destroy" => RC::DELETE.RC::MESSAGE,

    "potentialUser.index" => RC::GET_ALL.RC::POTENTIAL_USER, "potentialUser.show" => RC::GET.RC::POTENTIAL_USER, "potentialUser.store" => RC::STORE.RC::POTENTIAL_USER, "potentialUser.update" => RC::UPDATE.RC::POTENTIAL_USER, "potentialUser.destroy" => RC::DELETE.RC::POTENTIAL_USER,
];
