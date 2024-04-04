<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\EditMultiChoiceQuiz;
use App\Http\Requests\MultiChoiceQuestionExistenceRequest;
use App\Http\Requests\StoreMultiChoiceQuiz;
use App\Http\Requests\UserExistanceRequest;
use App\Models\Disease;
use App\Models\MultiChoiceQuestion;
use App\Models\MultiChoiceQuiz;
use App\Models\User;

class MultiChoiceQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $quizzes = MultiChoiceQuiz::with("diseases", "multiChoiceQuestions", "levelScores")->paginate(5);
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
    public function store(StoreMultiChoiceQuiz $request)
    {
        $body = $request->only("title", 'question_quantity', 'start_at', 'end_at');
        try {
            $quiz = MultiChoiceQuiz::create($body);
            return $this->respondCreated($quiz);
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MultiChoiceQuiz $multiChoiceQuiz)
    {
        $multiChoiceQuiz->load("diseases", "multiChoiceQuestions.choices", "levelScores", "users");
        return $this->respondWithSuccess($multiChoiceQuiz);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditMultiChoiceQuiz $request, MultiChoiceQuiz $multiChoiceQuiz)
    {
        $body = $request->only("title", 'question_quantity', 'start_at', 'end_at');
        try {
            $multiChoiceQuiz->updateOrFail($body);
            return $this->respondCreated($multiChoiceQuiz);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MultiChoiceQuiz $multiChoiceQuiz)
    {
        $multiChoiceQuiz->deleteOrFail();
        return $this->respondWithSuccess($multiChoiceQuiz);
    }
    public function attachDisease(AssignDiseaseRequest $request, MultiChoiceQuiz $multiChoiceQuiz){
        try {
            $disease = Disease::findOrFail($request->disease_id);
            $multiChoiceQuiz->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($multiChoiceQuiz->with("diseases")->get());
    }
    public function deAttachDisease(AssignDiseaseRequest $request, MultiChoiceQuiz $multiChoiceQuiz){
        $disease = Disease::find($request->disease_id);
        $multiChoiceQuiz->diseases()->detach($disease);
        return $this->respondWithSuccess(
            $multiChoiceQuiz->with("diseases")->get()
        );
    }
    public function saveMultiChoiceQuestion(MultiChoiceQuestionExistenceRequest $request, MultiChoiceQuiz $multiChoiceQuiz){
        try {
            $question = MultiChoiceQuestion::find($request->question_id);
            $multiChoiceQuiz->multiChoiceQuestions()->save($question);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($multiChoiceQuiz->with("diseases", "multiChoiceQuestions")->get());
    }
    public function myQuizzes(){
        $user = auth()->user();
        return $this->respondWithSuccess($user->multiChoiceQuizzes);
    }

    public function myMark(MultiChoiceQuiz $quiz){
        $user = auth()->user();
        $choicesQuery = $user->multiChoiceAnswers()->whereHas("multiChoiceQuestion", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  MultiChoiceQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        });
        $totalScore = $choicesQuery->sum("score");
        $choices = $choicesQuery->get();
        $answer = $quiz->levelScores()->where([
            ["min_val", "<=", $totalScore],
            ["max_val", ">", $totalScore],
        ])->get();
        $result = [
            "totalScore" => $totalScore,
            "answer" => $answer,
        ];
        return $this->respondWithSuccess($result);
    }
    public function theQuestionAndThePickedChoices(MultiChoiceQuiz $quiz){
        $user = auth()->user();
        $choices = $user->multiChoiceAnswers()->whereHas("multiChoiceQuestion", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  MultiChoiceQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get()->groupBy("multi_choice_question_id");
        return $this->respondWithSuccess($choices);
    }
    public function theQuestionAndTheAnswersOfUser(UserExistanceRequest $request, MultiChoiceQuiz $quiz){
        $user = User::findOrFail($request->user_id);
        $choices = $user->multiChoiceAnswers()->whereHas("multiChoiceQuestion", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  MultiChoiceQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get()->groupBy("multi_choice_question_id");
        return $this->respondWithSuccess($choices);
    }
}
