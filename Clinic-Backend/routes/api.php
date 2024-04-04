<?php

use App\Http\Consts\Consts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware([\App\Http\Middleware\AuthorizationMiddleware::class])->group(function(){
    Route::resource("user", \App\Http\Controllers\UserController::class)->missing(function(){
        return response()->json(['error' => Consts::USER_NOT_FOUND], 404);
    });
    Route::group(["prefix" => "user", "controller" => \App\Http\Controllers\UserController::class], function() {
        Route::post('assignRole/{user}', "assignRole")->missing(function(){
            return response()->json(['error' => Consts::USER_NOT_FOUND], 404);
        });
        Route::post('removeRole/{user}', "removeRole")->missing(function(){
            return response()->json(['error' => Consts::USER_NOT_FOUND], 404);
        });
        Route::post('toggleApprove/{user}', "toggleApprove")->missing(function(){
            return response()->json(['error' => Consts::USER_NOT_FOUND], 404);
        });
        Route::post('setPassword/{user}', "setPassword")->missing(function(){
            return response()->json(['error' => Consts::USER_NOT_FOUND], 404);
        });
    });


    Route::resource("item", \App\Http\Controllers\ItemController::class)->missing(function(){
        return response()->json(['error' => Consts::ITEM_NOT_FOUND], 404);
    });

    Route::resource("informationItem", \App\Http\Controllers\InformationItemController::class)->missing(function(){
        return response()->json(['error' => Consts::INFORMATION_ITEM_NOT_FOUND], 404);
    });

    Route::resource("categoryLifeSkills", \App\Http\Controllers\CategoryLifeSkillController::class)->missing(function(){
        return response()->json(['error' => Consts::CATEGORY_NOT_FOUND], 404);
    });
    Route::group(["prefix" => "categoryLifeSkills", "controller" => \App\Http\Controllers\CategoryLifeSkillController::class], function(){
        Route::post('assignItem/{categoryLifeSkill}', "assignItem")->missing(function(){
            return response()->json(['error' => Consts::CATEGORY_NOT_FOUND], 404);
        });
        Route::post('removeItem/{categoryLifeSkill}', "removeItem")->missing(function(){
            return response()->json(['error' => Consts::CATEGORY_NOT_FOUND], 404);
        });
    });

    Route::resource("informationCategory", \App\Http\Controllers\InformationCategoryController::class)->missing(function(){
        return response()->json(['error' => Consts::INFORMATION_CATEGORY_NOT_FOUND], 404);
    });
    Route::group(["prefix" => "informationCategory", "controller" => \App\Http\Controllers\InformationCategoryController::class], function(){
        Route::post('assignItem/{informationCategory}', "assignItem")->missing(function(){
            return response()->json(['error' => Consts::CATEGORY_NOT_FOUND], 404);
        });
        Route::post('removeItem/{informationCategory}', "removeItem")->missing(function(){
            return response()->json(['error' => Consts::CATEGORY_NOT_FOUND], 404);
        });
    });

    Route::resource("CEOServices", \App\Http\Controllers\CEOServiceController::class)->missing(function(){
        return response()->json(['error' => Consts::CEO_SERVICES_NOT_FOUND], 404);
    });

    Route::resource("disease", \App\Http\Controllers\DiseaseController::class)->missing(function(){
        return response()->json(['error' => Consts::DISEASE_NOT_FOUND], 404);
    });

    Route::resource("entertainment", \App\Http\Controllers\EntertainmentController::class)->missing(function(){
        return response()->json(['error' => Consts::ENTERTAINMENT_NOT_FOUND], 404);
    });
    Route::group(['prefix' => "entertainment", "controller" => \App\Http\Controllers\EntertainmentController::class], function(){
        Route::post('attachDisease/{entertainment}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::ENTERTAINMENT_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{entertainment}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::ENTERTAINMENT_NOT_FOUND], 404);
        });
    });

    Route::resource("meditation", \App\Http\Controllers\MeditationController::class)->missing(function(){
        return response()->json(['error' => Consts::MEDITATION_NOT_FOUND], 404);
    });
    Route::group(["prefix" => "meditation", "controller" => \App\Http\Controllers\MeditationController::class], function(){
        Route::post('attachDisease/{meditation}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::MEDITATION_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{meditation}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::MEDITATION_NOT_FOUND], 404);
        });
        Route::get('getByType/{type}', "getByType");
    });

    Route::resource("faceToFaceVisit", \App\Http\Controllers\FaceToFaceVisitController::class)->missing(function(){
        return response()->json(['error' => Consts::FACE_TO_FACE_VISIT_NOT_FOUND], 404);
    });
    Route::group(['prefix' => "faceToFaceVisit", "controller" => \App\Http\Controllers\FaceToFaceVisitController::class], function(){
        Route::post('saveDisease/{faceToFaceVisit}', "saveDisease")->missing(function(){
            return response()->json(['error' => Consts::FACE_TO_FACE_VISIT_NOT_FOUND]);
        });
        Route::post('unSaveDisease/{faceToFaceVisit}', "unSaveDisease")->missing(function(){
            return response()->json(['error' => Consts::FACE_TO_FACE_VISIT_NOT_FOUND], 404);
        });
        Route::post('uploadExcel', "uploadExcel");
    });


    Route::resource("drugStore", \App\Http\Controllers\DrugStoreController::class)->missing(function(){
        return response()->json(['error' => Consts::DRUG_STORE_NOT_FOUND], 404);
    });
    Route::group(['prefix' => "drugStore", "controller" => \App\Http\Controllers\DrugStoreController::class], function(){
        Route::post('attachDisease/{drugStore}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::DRUG_STORE_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{drugStore}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::DRUG_STORE_NOT_FOUND], 404);
        });
    });



    Route::group(['prefix' => "multiChoiceQuiz", "controller" => \App\Http\Controllers\MultiChoiceQuizController::class], function(){
        Route::post('attachDisease/{multiChoiceQuiz}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{multiChoiceQuiz}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
        Route::post('saveMultiChoiceQuestion/{multiChoiceQuiz}', "saveMultiChoiceQuestion")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("myQuizzes", "myQuizzes");
        Route::get("theQuestionAndThePickedChoices/{quiz}", "theQuestionAndThePickedChoices")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("myMark/{quiz}", "myMark")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("theQuestionAndTheAnswersOfUser/{quiz}", "theQuestionAndTheAnswersOfUser")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
        });
    });
    Route::resource("multiChoiceQuiz", \App\Http\Controllers\MultiChoiceQuizController::class)->missing(function(){
        return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND], 404);
    });

    Route::resource("levelScore", \App\Http\Controllers\LevelScoreController::class)->missing(function(){
        return response()->json(['error' => Consts::LEVEL_NOT_FOUND], 404);
    });
    Route::group(['prefix' => "levelScore", "controller" => \App\Http\Controllers\LevelScoreController::class], function(){
        Route::post('assignQuiz/{levelScore}', "assignQuiz")->missing(function(){
            return response()->json(['error' => Consts::LEVEL_NOT_FOUND], 404);
        });
    });


    Route::group(['prefix' => "descriptiveQuiz", "controller" => \App\Http\Controllers\DescriptiveQuizController::class], function(){
        Route::post('attachDisease/{descriptiveQuiz}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{descriptiveQuiz}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::post('saveMultiChoiceQuestion/{descriptiveQuiz}', "saveMultiChoiceQuestion")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::post('saveDescriptiveQuestion/{descriptiveQuiz}', "saveDescriptiveQuestion")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
//    Route::post('removeDescriptiveQuestion/{descriptiveQuiz}', "removeDescriptiveQuestion")->missing(function(){
//        return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND]);
//    });
        Route::post('addUserResult/{descriptiveQuiz}', "addUserResult")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("theQuestionAndTheAnswers/{quiz}", "theQuestionAndTheAnswers")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("theQuestionAndTheAnswersOfUser/{quiz}", "theQuestionAndTheAnswersOfUser")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("myResult/{quiz}", "myResult")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
        Route::get("myQuizzes", "myQuizzes");
    });
    Route::resource("descriptiveQuiz", \App\Http\Controllers\DescriptiveQuizController::class)->missing(function(){
        return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
    });

    Route::group(['prefix' => "survey", "controller" => \App\Http\Controllers\SurveyController::class], function(){
        Route::post('attachDisease/{survey}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
        Route::post('deAttachDisease/{survey}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
        Route::post('assignMultiChoiceQuestion/{survey}', "assignMultiChoiceQuestion")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
        Route::post('removeMultiChoiceQuestion/{survey}', "removeMultiChoiceQuestion")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
        Route::post('saveDescriptiveQuestion/{survey}', "saveDescriptiveQuestion")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
//    Route::post('removeDescriptiveQuestion/{descriptiveQuiz}', "removeDescriptiveQuestion")->missing(function(){
//        return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND]);
//    });
        Route::get("mySurveys", "mySurveys");
        Route::get("theQuestionAndTheAnswers/{survey}", "theQuestionAndTheAnswers")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
        });
        Route::get("theQuestionAndTheAnswersOfUser/{survey}", "theQuestionAndTheAnswersOfUser")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUIZ_NOT_FOUND], 404);
        });
    });
    Route::resource("survey", \App\Http\Controllers\SurveyController::class)->missing(function(){
        return response()->json(['error' => Consts::SURVEY_NOT_FOUND], 404);
    });



    Route::resource("multiChoiceQuestion", \App\Http\Controllers\MultiChoiceQuestionController::class)->missing(function(){
        return response()->json(['error' => Consts::MULTI_CHOICE_QUESTION_NOT_FOUND]);
    });

    Route::resource("multiChoiceSurveyQuestion", \App\Http\Controllers\MultiChoiceSurveyQuestionController::class)->missing(function(){
        return response()->json(['error' => Consts::MULTI_SURVEY_CHOICE_QUESTION_NOT_FOUND]);
    });

    Route::resource("descriptiveQuestion", \App\Http\Controllers\DescriptiveQuestionController::class)->missing(function(){
        return response()->json(['error' => Consts::DESCRIPTIVE_QUESTION_NOT_FOUND]);
    });
    Route::group(['prefix' => "descriptiveQuestion", "controller" => \App\Http\Controllers\DescriptiveQuestionController::class], function() {
        Route::post("storeAnswer/{descriptiveQuestion}", "storeAnswer")->missing(function () {
            return response()->json(['error' => Consts::DESCRIPTIVE_QUESTION_NOT_FOUND]);
        });
        Route::get("getAnswer/{descriptiveQuestion}" ,"getAnswer")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUESTION_NOT_FOUND]);
        });
        Route::post("removeAnswer/{descriptiveQuestion}" ,"removeAnswer")->missing(function(){
            return response()->json(['error' => Consts::DESCRIPTIVE_QUESTION_NOT_FOUND]);
        });
    });


    Route::resource("choice", \App\Http\Controllers\ChoiceController::class)->missing(function(){
        return response()->json(['error' => Consts::CHOICE_NOT_FOUND]);
    });
    Route::group(["prefix" => "choice", "controller" => \App\Http\Controllers\ChoiceController::class], function(){
        Route::post('pickAnAnswer/{choice}', "pickAnAnswer")->missing(function(){
            return response()->json(['error' => Consts::CHOICE_NOT_FOUND]);
        });
        Route::post('removeAnAnswer/{choice}', "removeAnAnswer")->missing(function(){
            return response()->json(['error' => Consts::CHOICE_NOT_FOUND]);
        });
        Route::post('assignQuestion/{choice}/', "assignQuestion")->missing(function(){
            return response()->json(['error' => Consts::CHOICE_NOT_FOUND]);
        });
        Route::post('removeQuestion/{choice}/', "removeQuestion")->missing(function(){
            return response()->json(['error' => Consts::CHOICE_NOT_FOUND]);
        });
        Route::get('getAnswersOfQuiz/{quiz}', "getAnswersOfQuiz")->missing(function(){
            return response()->json(['error' => Consts::MULTI_CHOICE_QUIZ_NOT_FOUND]);
        });
    });


    Route::resource("surveyChoice", \App\Http\Controllers\SurveyChoiceController::class)->missing(function(){
        return response()->json(['error' => Consts::SURVEY_CHOICE_NOT_FOUND]);
    });
    Route::group(["prefix" => "surveyChoice", "controller" => \App\Http\Controllers\SurveyChoiceController::class], function(){
        Route::post('pickAnAnswer/{surveyChoice}', "pickAnAnswer")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_CHOICE_NOT_FOUND]);
        });
        Route::post('removeAnAnswer/{surveyChoice}', "removeAnAnswer")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_CHOICE_NOT_FOUND]);
        });
        Route::post('assignQuestion/{surveyChoice}/', "assignQuestion")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_CHOICE_NOT_FOUND]);
        });
        Route::post('removeQuestion/{surveyChoice}/', "removeQuestion")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_CHOICE_NOT_FOUND]);
        });
        Route::get('getAnswersOfSurvey/{survey}', "getAnswersOfSurvey")->missing(function(){
            return response()->json(['error' => Consts::SURVEY_NOT_FOUND]);
        });
    });


    Route::resource("drug", \App\Http\Controllers\DrugController::class)->missing(function(){
        return response()->json(['error' => Consts::DRUG_NOT_FOUND]);
    });
    Route::group(['prefix' => "drug", "controller" => \App\Http\Controllers\DrugController::class], function(){
        Route::post('attachDisease/{drug}', "attachDisease")->missing(function(){
            return response()->json(['error' => Consts::DRUG_NOT_FOUND]);
        });
        Route::post('deAttachDisease/{drug}', "deAttachDisease")->missing(function(){
            return response()->json(['error' => Consts::DRUG_NOT_FOUND]);
        });
        Route::post('attachDrugStore/{drug}', "attachDrugStore")->missing(function(){
            return response()->json(['error' => Consts::DRUG_NOT_FOUND]);
        });
        Route::post('deAttachDrugStore/{drug}', "deAttachDrugStore")->missing(function(){
            return response()->json(['error' => Consts::DRUG_NOT_FOUND]);
        });
        Route::get("searchName/{name}", "searchName");
    });


    Route::group(['prefix' => "role", "controller" => \App\Http\Controllers\RoleController::class], function(){
        Route::post("makeDefaultRole", "makeDefaultRole");
        Route::post("supperAdmin", "supperAdmin");
        Route::get("allPermissions", "allPermissions");
        Route::get("allUserPermission", "allUserPermission");
        Route::post("setPermissions/{role}", "setPermissions")->missing(function(){
            return response()->json(['error' => Consts::ROLE_NOT_FOUND]);
        });
        Route::post("removePermissions/{role}", "removePermissions")->missing(function(){
            return response()->json(['error' => Consts::ROLE_NOT_FOUND]);
        });
    });
    Route::resource("role", \App\Http\Controllers\RoleController::class)->missing(function(){
        return response()->json(['error' => Consts::ROLE_NOT_FOUND]);
    });

    Route::resource("categoryTicket", \App\Http\Controllers\CategoryTicketController::class)->missing(function(){
        return response()->json(['error' => Consts::CATEGORY_TICKET_NOT_FOUND], 404);
    });
    Route::group(['prefix' => "ticket", "controller" => \App\Http\Controllers\TicketController::class], function(){
        Route::get("myTickets", "myTickets");
        Route::get("inProgress", "inProgress");
    });
    Route::resource("ticket", \App\Http\Controllers\TicketController::class)->missing(function(){
        return response()->json(['error' => Consts::TICKET_NOT_FOUND], 404);
    });

    Route::resource("message", \App\Http\Controllers\MessageController::class)->missing(function(){
        return response()->json(['error' => Consts::MESSAGE_NOT_FOUND], 404);
    });

    Route::resource("potentialUser", \App\Http\Controllers\PotentialUserController::class)->missing(function(){
        return response()->json(['error' => Consts::POTENTIAL_USER_NOT_FOUND], 404);
    });

    Route::group(["controller" => \App\Http\Controllers\AuthController::class, "prefix" => "auth"], function(){
        Route::post("preLogin", "preLogin");
        Route::post("mobileCheck", "mobileCheck");
        Route::post("loginWithPassword", "loginWithPassword");
        Route::post("refresh", "refresh");
        Route::post("whoAmI", "whoAmI");
    });
});
