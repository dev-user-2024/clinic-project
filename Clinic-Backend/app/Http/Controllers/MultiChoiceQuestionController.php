<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMultiChoiceQuestionRequest;
use App\Models\Choice;
use App\Models\DescriptiveQuiz;
use App\Models\MultiChoiceQuestion;
use App\Models\MultiChoiceQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MultiChoiceQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $question = MultiChoiceQuestion::with("quizable", "choices")->paginate(5);
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
        $questionBody = $request->only('content', "multi_choice_quiz_id", "descriptive_quiz_id");
        $choicesBody = $request->only('choices');
        DB::beginTransaction();
        try {
            if($request->has("multi_choice_quiz_id") && !empty($request->multi_choice_quiz_id))
                $quiz = MultiChoiceQuiz::findOrFail($questionBody["multi_choice_quiz_id"]);
            else if($request->has("descriptive_quiz_id") && !empty($request->descriptive_quiz_id))
                $quiz = DescriptiveQuiz::findOrFail($questionBody["descriptive_quiz_id"]);
            else
                return $this->respondError("سول چندگزینه ای باید به آزمون تشریحی یا آزمون تستی مرتبط باشد");
            $question = MultiChoiceQuestion::create($questionBody);
                $question->quizable()->associate($quiz)->save();
                $choices = array();
                foreach($choicesBody['choices'] as $choice)
                    $choices[] = Choice::create($choice);
                $question->choices()->saveMany($choices);
                DB::commit();
                $question->load("choices", "quizable");
                    return $this->respondCreated($question);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MultiChoiceQuestion $multiChoiceQuestion)
    {
        $multiChoiceQuestion->load("quizable", "choices");
        return $this->respondWithSuccess($multiChoiceQuestion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MultiChoiceQuestion $multiChoiceQuestion)
    {
        $questionBody = $request->only('content', "multi_choice_quiz_id", "descriptive_quiz_id");
        $choicesBody = $request->only('choices');
        DB::beginTransaction();
        try {
            if($request->has("multi_choice_quiz_id") && !empty($request->multi_choice_quiz_id))
                $quiz = MultiChoiceQuiz::findOrFail($questionBody["multi_choice_quiz_id"]);
            else if($request->has("descriptive_quiz_id") && !empty($request->descriptive_quiz_id))
                $quiz = DescriptiveQuiz::findOrFail($questionBody["descriptive_quiz_id"]);
            else
                return $this->respondError("سول چندگزینه ای باید به آزمون تشریحی یا آزمون تستی مرتبط باشد");
            $multiChoiceQuestion->updateOrFail($questionBody);
            $multiChoiceQuestion->quizable()->associate($quiz)->save();
            $multiChoiceQuestion->choices()->delete();
            $choices = array();
            foreach($choicesBody['choices'] as $choice)
                $choices[] = Choice::create($choice);
            $multiChoiceQuestion->choices()->saveMany($choices);
            DB::commit();
            $multiChoiceQuestion->load("choices", "quizable");
            return $this->respondCreated($multiChoiceQuestion);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MultiChoiceQuestion $multiChoiceQuestion)
    {
        $multiChoiceQuestion->deleteOrFail();
        $multiChoiceQuestion->load("quizable");
        return $this->respondWithSuccess($multiChoiceQuestion);
    }

}
