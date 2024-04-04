<?php

namespace App\Http\Controllers;

use App\Http\Requests\DescriptiveAnswerRequest;
use App\Http\Requests\DescriptiveQuizeExistence;
use App\Http\Requests\StoreDescriptiveRequest;
use App\Models\DescriptiveQuestion;
use App\Models\DescriptiveQuiz;
use App\Models\User;
use Illuminate\Http\Request;

class DescriptiveQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $question = DescriptiveQuestion::with("quizable", "users")->paginate(5);
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
    public function store(StoreDescriptiveRequest $request)
    {
        $body = $request->only('content', "descriptive_quiz_id");

        try {
            $quiz = DescriptiveQuiz::findOrFail($body["descriptive_quiz_id"]);
            $question = DescriptiveQuestion::create($body);
            $question->quizable()->associate($quiz)->save();
            $question->load("quizable");
            return $this->respondCreated($question);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DescriptiveQuestion $descriptiveQuestion)
    {
        $descriptiveQuestion->load("users", "quizable");
        return $this->respondWithSuccess($descriptiveQuestion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DescriptiveQuizeExistence $request, DescriptiveQuestion $descriptiveQuestion)
    {
        $body = $request->only('content', "descriptive_quiz_id");

        try {
            $descriptiveQuestion->updateOrFail($body);
            $quiz = DescriptiveQuiz::findOrFail($body["descriptive_quiz_id"]);
            $descriptiveQuestion->quizable()->associate($quiz)->save();
            $descriptiveQuestion->load("quizable");
            return $this->respondWithSuccess($descriptiveQuestion);
        }catch(\Exception $e){
            dd($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DescriptiveQuestion $descriptiveQuestion)
    {
        $descriptiveQuestion->deleteOrFail();
        return $this->respondWithSuccess($descriptiveQuestion);
    }

    public function storeAnswer(DescriptiveAnswerRequest $request, DescriptiveQuestion $descriptiveQuestion){
                $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        try {
            $user->descriptiveAnswer()->detach($descriptiveQuestion);
            $user->descriptiveAnswer()->attach($descriptiveQuestion, [
                "content" => $request->has('content') ? $request->only('content')["content"] : null,
                "file" => $request->has('file') ? $request->file : null]);
            $quiz = $descriptiveQuestion->quizable;
            if (!$quiz->usersResults->contains($user))
                $quiz->usersResults()->attach($user);
            $answer = $user->descriptiveAnswer()->where("descriptive_question_id", $descriptiveQuestion->id)->first();
            return $this->respondWithSuccess($answer);

        }catch(\Exception $e){
            dd($e);
        }
    }
    public function getAnswer(DescriptiveQuestion $descriptiveQuestion){
        return $this->respondWithSuccess($descriptiveQuestion);
    }
    public function removeAnswer(DescriptiveQuestion $descriptiveQuestion){
        $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        try {
            $user->descriptiveAnswer()->detach($descriptiveQuestion);
        }catch(\Exception $e){
            dd($e);
        }
        return $this->respondWithSuccess($descriptiveQuestion->users);
    }
}
