<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMultiChoiceQuestionRequest;
use App\Models\MultiChoiceSurveyQuestion;
use App\Models\Survey;
use App\Models\SurveyChoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MultiChoiceSurveyQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $question = MultiChoiceSurveyQuestion::with("survey")->paginate(5);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $question
        );
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMultiChoiceQuestionRequest $request)
    {
        $questionBody = $request->only('content', "survey_id");
        $choicesBody = $request->only('choices');
        DB::beginTransaction();
        try {
            $question = MultiChoiceSurveyQuestion::create($questionBody);
            $question->survey()->associate(
                Survey::findOrFail($questionBody["survey_id"])
            )->save();
            $choices = array();
            foreach($choicesBody['choices'] as $choice)
                $choices[] = SurveyChoice::create($choice);
            $question->choices()->saveMany($choices);
            DB::commit();
            $question->load("choices", "survey");
            return $this->respondCreated($question);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MultiChoiceSurveyQuestion $multiChoiceSurveyQuestion)
    {
        $multiChoiceSurveyQuestion->load("choices", "survey");
        return $this->respondWithSuccess($multiChoiceSurveyQuestion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MultiChoiceSurveyQuestion $multiChoiceSurveyQuestion)
    {
        $questionBody = $request->only('content', "survey_id");
        $choicesBody = $request->only('choices');
        DB::beginTransaction();
        try {
            $multiChoiceSurveyQuestion->updateOrFail($questionBody);
            $multiChoiceSurveyQuestion->survey()->associate(
                Survey::findOrFail($questionBody["survey_id"])
            )->save();
            $multiChoiceSurveyQuestion->choices()->delete();
            $choices = array();
            foreach($choicesBody['choices'] as $choice)
                $choices[] = SurveyChoice::create($choice);
            $multiChoiceSurveyQuestion->choices()->saveMany($choices);
            DB::commit();
            $multiChoiceSurveyQuestion->load("choices", "survey");
            return $this->respondCreated($multiChoiceSurveyQuestion);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MultiChoiceSurveyQuestion $multiChoiceSurveyQuestion)
    {
        $multiChoiceSurveyQuestion->deleteOrFail();
        return $this->respondWithSuccess($multiChoiceSurveyQuestion);
    }
}
