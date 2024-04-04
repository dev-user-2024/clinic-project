<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\DescriptiveQuestionExistenceRequest;
use App\Http\Requests\DescriptiveQuizResultRequest;
use App\Http\Requests\EditDescriptiveQuizRequest;
use App\Http\Requests\MultiChoiceQuestionExistenceRequest;
use App\Http\Requests\StoreDescriptiveQuizRequest;
use App\Http\Requests\UserExistanceRequest;
use App\Models\DescriptiveQuestion;
use App\Models\DescriptiveQuiz;
use App\Models\Disease;
use App\Models\MultiChoiceQuestion;
use App\Models\Survey;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class DescriptiveQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $quizzes = DescriptiveQuiz::with("diseases", "multiChoiceQuestions", "descriptiveQuestions")->paginate(5);
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
    public function store(StoreDescriptiveQuizRequest $request)
    {
        $body = $request->only("title", 'start_at', 'end_at');
        $quiz = new DescriptiveQuiz;
        $quiz->title = $body['title'];
        $quiz->start_at = $body['start_at'];
        $quiz->end_at = $body['end_at'];
        try {
            $quiz->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($quiz);
    }

    /**
     * Display the specified resource.
     */
    public function show(DescriptiveQuiz $descriptiveQuiz)
    {
        $descriptiveQuiz->load("diseases", "multiChoiceQuestions.choices", "descriptiveQuestions", "usersResults");
        return $this->respondWithSuccess($descriptiveQuiz);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditDescriptiveQuizRequest $request, DescriptiveQuiz $descriptiveQuiz)
    {
        $body = $request->only("title", 'start_at', 'end_at');
        try {
            $descriptiveQuiz->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($descriptiveQuiz);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DescriptiveQuiz $descriptiveQuiz)
    {
        $descriptiveQuiz->deleteOrFail();
        return $this->respondWithSuccess($descriptiveQuiz);
    }
    public function attachDisease(AssignDiseaseRequest $request, DescriptiveQuiz $descriptiveQuiz){
        try {
            $disease = Disease::findOrFail($request->disease_id);
            $descriptiveQuiz->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($descriptiveQuiz->with("diseases")->get());
    }
    public function deAttachDisease(AssignDiseaseRequest $request, DescriptiveQuiz $descriptiveQuiz){
        try {
            $disease = Disease::findOrFail($request->disease_id);
            $descriptiveQuiz->diseases()->detach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($descriptiveQuiz->with("diseases")->get());
    }
    public function saveMultiChoiceQuestion(MultiChoiceQuestionExistenceRequest $request, DescriptiveQuiz $descriptiveQuiz){
        try {
            $question = MultiChoiceQuestion::find($request->question_id);
            $descriptiveQuiz->multiChoiceQuestions()->save($question);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($descriptiveQuiz->with("diseases", "multiChoiceQuestions")->get());
    }

    public function saveDescriptiveQuestion(DescriptiveQuestionExistenceRequest $request, DescriptiveQuiz $descriptiveQuiz){
        try {
            $question = DescriptiveQuestion::find($request->question_id);
            $descriptiveQuiz->descriptiveQuestions()->save($question);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($descriptiveQuiz->with("diseases", "descriptiveQuestions")->get());
    }

    public function addUserResult(DescriptiveQuizResultRequest $request, DescriptiveQuiz $descriptiveQuiz){
        try {
            $user = User::findOrFail($request->user_id);
            $answer = $user->descriptiveResults()->where("descriptive_quiz_id", $descriptiveQuiz->id)->firstOrFail()->pivot;
            $answer->file = ($request->has('file')) ? $request->file : "";
            $answer->content = ($request->has('file')) ? $request->only('content')["content"] : "";
            $answer->save();
//            return $this->respondWithSuccess($answer);

//        $descriptiveQuiz->usersResults()->attach($user,
//            ["content" => $request->has('content') ? $request->only('content')["content"] : null,
//                "file" => $request->has('file') ? $request->file : null]);

            return $this->respondWithSuccess($descriptiveQuiz->usersResults);
        }catch(Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    public function theQuestionAndTheAnswers(DescriptiveQuiz $quiz){
        $user = auth()->user();
        $result = array();
        $result['multi_choice'] = $user->multiChoiceAnswers()->whereHas("multiChoiceQuestion", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  DescriptiveQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get()->groupBy("multi_choice_question_id");
        $result['descriptive'] = $user->descriptiveAnswer()->whereHas("quizable", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  DescriptiveQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get();
        return $this->respondWithSuccess($result);
    }
    public function theQuestionAndTheAnswersOfUser(UserExistanceRequest $request, DescriptiveQuiz $quiz){
        $user = User::findOrFail($request->user_id);
        $result = array();
        $result['multi_choice'] = $user->multiChoiceAnswers()->whereHas("multiChoiceQuestion", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  DescriptiveQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get()->groupBy("multi_choice_question_id");
        $result['descriptive'] = $user->descriptiveAnswer()->whereHas("quizable", function($q) use($quiz){
            return $q->where([
                ['quizable_type', "=",  DescriptiveQuiz::class],
                ['quizable_id', "=",  $quiz->id],
            ]);
        })->get();
        return $this->respondWithSuccess($result);
    }
    public function myQuizzes(){
        $user = auth()->user();
        return $this->respondWithSuccess($user->descriptiveResults);

    }
    public function myResult(DescriptiveQuiz $quiz){
        $user = auth()->user();
        $result = $user->descriptiveResults()->where("descriptive_quiz_id", $quiz->id)->get();
        return $this->respondWithSuccess($result);
    }
}
