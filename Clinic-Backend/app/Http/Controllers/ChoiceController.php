<?php

namespace App\Http\Controllers;

use App\Http\Consts\Consts;
use App\Http\Requests\EditChoiceRequest;
use App\Http\Requests\MultiChoiceQuestionExistenceRequest;
use App\Http\Requests\StoreChoiceRequest;
use App\Models\Choice;

use App\Models\DescriptiveQuiz;
use App\Models\MultiChoiceQuestion;
use App\Models\MultiChoiceQuiz;
use App\Models\User;
use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $choice = Choice::with("users", "multiChoiceQuestion")->paginate(10);
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
    public function store(StoreChoiceRequest $request)
    {
        $body = $request->only('content', "score");
        $choice = new Choice;
        $choice->content = $body['content'];
        $choice->score = $body['score'];

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
    public function show(Choice $choice)
    {
        $choice->load("multiChoiceQuestion", "users");
        return $this->respondWithSuccess($choice);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(EditChoiceRequest $request, Choice $choice)
    {
        $body = $request->only('content', "score");
        try {
            $choice->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($choice);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Choice $choice)
    {
        $choice->deleteOrFail();
        return $this->respondWithSuccess($choice);
    }

    public function pickAnAnswer(Choice $choice){
        $user = auth()->user();
        $question = $choice->multiChoiceQuestion;
        $choicesOfQuestion = $question->choices;
        if($question == null)
            return $this->respondError(Consts::CHOICE_NOT_CONNECTED_TO_QUESTION);

        $quiz = $question->quizable;
        if($question->quizable_type == MultiChoiceQuiz::class) {
            if (!$user->multiChoiceQuizzes->contains($quiz))
                $user->multiChoiceQuizzes()->attach($quiz);
        }else if($question->quizable_type == DescriptiveQuiz::class){
            if (!$user->descriptiveResults->contains($quiz))
                $user->descriptiveResults()->attach($quiz);
        }
        $user->multiChoiceAnswers()->detach($choicesOfQuestion);
        $user->multiChoiceAnswers()->attach($choice);
        $pickedChoice = $user->multiChoiceAnswers()->where("multi_choice_question_id", $question->id)->first();
        return $this->respondWithSuccess($pickedChoice);
    }

    public function removeAnAnswer(Choice $choice){
                $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        try {

            $user->multiChoiceAnswers()->detach($choice);
            return $this->respondWithSuccess($user->multiChoiceAnswers);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
    public function assignQuestion(MultiChoiceQuestionExistenceRequest $request, Choice $choice){
        $question = MultiChoiceQuestion::find($request->question_id);
        try {
            $question->choices()->save($choice);
            return $this->respondWithSuccess($choice->multiChoiceQuestion);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    public function removeQuestion(Choice $choice){
        try{
            $choice->multiChoiceQuestion()->disassociate()->save();
            return $this->respondWithSuccess($choice->question);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
    public function getAnswersOfQuiz(MultiChoiceQuiz $quiz){
        $user = auth()->user();
//        $user = User::inRandomOrder()->limit(1)->first();
        return $this->respondWithSuccess(
            $user->withWhereHas("multiChoiceAnswers.multiChoiceQuestion", function($q) use($quiz){
                $q->where("quizable_id", $quiz->id);
            })->get()
        );
    }

}
