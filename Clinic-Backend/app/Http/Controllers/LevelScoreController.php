<?php

namespace App\Http\Controllers;

use App\Http\Requests\MultiChoiceQuizExistenceRequest;
use App\Http\Requests\StoreLevelScoreRequest;
use App\Http\Requests\UpdateLevelScoreRequest;
use App\Models\LevelScore;
use App\Models\MultiChoiceQuiz;
use Illuminate\Http\Request;
use Monolog\Level;

class LevelScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $levelScore = LevelScore::with("multiChoiceQuiz")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $levelScore
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLevelScoreRequest $request)
    {
        $body = $request->only("max_val", 'file', 'min_val', 'content', "multi_choice_quiz_id");
        try {
            $level = LevelScore::create($body);
            return $this->respondCreated($level);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LevelScore $levelScore)
    {
        $levelScore->load("multiChoiceQuiz");
        return $this->respondWithSuccess($levelScore);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLevelScoreRequest $request, LevelScore $levelScore)
    {
        $body = $request->only("max_val", 'file', 'min_val', 'content');
        try {
            $levelScore->updateOrFail($body);
            return $this->respondWithSuccess($levelScore);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LevelScore $levelScore)
    {
        $levelScore->deleteOrFail();
        return $this->respondWithSuccess($levelScore);
    }

    public function assignQuiz(MultiChoiceQuizExistenceRequest $request, LevelScore $levelScore){
        try{
            $levelScore->multiChoiceQuiz()->associate(
                MultiChoiceQuiz::find($request->quiz_id)
            )->save();
            return $this->respondWithSuccess($levelScore->multiChoiceQuiz);
        }catch(\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }
}
