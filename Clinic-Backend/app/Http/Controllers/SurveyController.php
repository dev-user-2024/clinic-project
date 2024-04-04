<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\DescriptiveQuestionExistenceRequest;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\SurveyMultiChoiceQuestionExistenceRequest;
use App\Http\Requests\UserExistanceRequest;
use App\Models\DescriptiveQuestion;
use App\Models\Disease;
use App\Models\MultiChoiceSurveyQuestion;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $quizzes = Survey::with("diseases", "descriptiveQuestions", "multiChoiceQuestions.choices")->paginate(5);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $quizzes
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $body = $request->only("title");
        $survey = new Survey;
        $survey->title = $body['title'];
        try {
            $survey->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        $survey->load("diseases", "descriptiveQuestions", "multiChoiceQuestions", "multiChoiceQuestions.choices", "users");
        return $this->respondWithSuccess($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Survey $survey)
    {
        $body = $request->only("title");
        try {
            $survey->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        $survey->deleteOrFail();
        return $this->respondWithSuccess($survey);
    }

    public function attachDisease(AssignDiseaseRequest $request, Survey $survey){
        try {
            $disease = Disease::findOrFail($request->disease_id);
            $survey->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey->with("diseases")->get());
    }

    public function deAttachDisease(AssignDiseaseRequest $request, Survey $survey){
        try {
            $disease = Disease::findOrFail($request->disease_id);
            $survey->diseases()->detach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey->with("diseases")->get());
    }

    public function assignMultiChoiceQuestion(SurveyMultiChoiceQuestionExistenceRequest $request, Survey $survey){
        try {
            $question = MultiChoiceSurveyQuestion::findOrFail($request->question_id);
            $question->survey()->associate($survey)->save();
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey->with("multiChoiceQuestions")->get());
    }
    public function removeMultiChoiceQuestion(SurveyMultiChoiceQuestionExistenceRequest $request, Survey $survey){
        try {
            $question = MultiChoiceSurveyQuestion::findOrFail($request->question_id);
            $question->survey()->disassociate()->save();
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey->with("multiChoiceQuestions")->get());
    }

    public function saveDescriptiveQuestion(DescriptiveQuestionExistenceRequest $request, Survey $survey)
    {
        try {
            $question = DescriptiveQuestion::find($request->question_id);
            $survey->descriptiveQuestions()->save($question);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($survey->with("diseases", "descriptiveQuestions")->get());
    }
    public function mySurveys(){
        $user = auth()->user();
        return $this->respondWithSuccess($user->surveys);
    }
    public function theQuestionAndTheAnswers(Survey $survey){
        $user = auth()->user();
        $choices = $user->multiSurveyChoiceAnswer()->whereHas("multiChoiceSurveyQuestion", function($q) use($survey){
            return $q->where([
                ['survey_id', "=",  $survey->id],
            ]);
        })->get()->groupBy("multi_choice_survey_question_id");
        return $this->respondWithSuccess($choices);
    }
    public function theQuestionAndTheAnswersOfUser(UserExistanceRequest $request, Survey $survey){
        $user = User::findOrFail($request->user_id);
        $choices = $user->multiSurveyChoiceAnswer()->whereHas("multiChoiceSurveyQuestion", function($q) use($survey){
            return $q->where([
                ['survey_id', "=",  $survey->id],
            ]);
        })->get()->groupBy("multi_choice_survey_question_id");
        return $this->respondWithSuccess($choices);
    }
}
