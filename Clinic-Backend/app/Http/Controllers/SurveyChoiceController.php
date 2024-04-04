<?php

namespace App\Http\Controllers;

use App\Http\Consts\Consts;
use App\Http\Requests\StoreSurveyChoiceRequest;
use App\Http\Requests\SurveyMultiChoiceQuestionExistenceRequest;
use App\Models\MultiChoiceSurveyQuestion;
use App\Models\Survey;
use App\Models\SurveyChoice;
use App\Models\User;
use Illuminate\Http\Request;

class SurveyChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $choice = SurveyChoice::with("users", "multiChoiceSurveyQuestion")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $choice
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyChoiceRequest $request)
    {
        $body = $request->only('content');
        $choice = new SurveyChoice;
        $choice->content = $body['content'];
        try {
            $choice->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($choice);
    }

    /**
     * Display the specified resource.
     */
    public function show(SurveyChoice $surveyChoice)
    {
        $surveyChoice->load("multiChoiceSurveyQuestion", "users");
        return $this->respondWithSuccess($surveyChoice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SurveyChoice $surveyChoice)
    {
        $body = $request->only('content');
        try {
            $surveyChoice->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($surveyChoice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SurveyChoice $surveyChoice)
    {
        $surveyChoice->deleteOrFail();
        return $this->respondWithSuccess($surveyChoice);
    }
    public function pickAnAnswer(SurveyChoice $surveyChoice){
        $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        $question = $surveyChoice->multiChoiceSurveyQuestion;
        $choicesOfQuestion = $question->choices;
        if($question == null)
            return $this->respondError(Consts::CHOICE_NOT_CONNECTED_TO_QUESTION);
        $survey = $surveyChoice->multiChoiceSurveyQuestion->survey;
        if(!$user->surveys->contains($survey))
            $user->surveys()->attach($survey);
        $user->multiSurveyChoiceAnswer()->detach($choicesOfQuestion);
        $user->multiSurveyChoiceAnswer()->attach($surveyChoice);
        $pickedChoice = $user->multiSurveyChoiceAnswer()->where("multi_choice_survey_question_id", $question->id)->first();
        return $this->respondWithSuccess($pickedChoice);
    }
    public function removeAnAnswer(SurveyChoice $surveyChoice){
                $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        try {
            $user->multiSurveyChoiceAnswer()->detach($surveyChoice);
            return $this->respondWithSuccess($user->multiSurveyChoiceAnswer);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
    public function assignQuestion(SurveyMultiChoiceQuestionExistenceRequest $request, SurveyChoice $surveyChoice){
        $question = MultiChoiceSurveyQuestion::find($request->question_id);
        try {
            $question->choices()->save($surveyChoice);
            return $this->respondWithSuccess($surveyChoice->multiChoiceSurveyQuestion);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
    public function removeQuestion(SurveyChoice $surveyChoice){
        try{
            $surveyChoice->multiChoiceSurveyQuestion()->disassociate()->save();
            return $this->respondWithSuccess($surveyChoice->multiChoiceSurveyQuestion);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
    public function getAnswersOfSurvey(Survey $survey){
        $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        return $this->respondWithSuccess(
            $user->withWhereHas("multiSurveyChoiceAnswer.multiChoiceSurveyQuestion.survey", function($q) use($survey){
                $q->where("id", $survey->id);
            })->get()
        );
    }
}
