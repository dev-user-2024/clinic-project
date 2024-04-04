<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\EditMeditationRequest;
use App\Http\Requests\StoreMeditationRequest;
use App\Models\Disease;
use App\Models\Meditation;
use Cron\MinutesField;
use Illuminate\Http\Request;

class MeditationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $meditations = Meditation::with("diseases")->paginate(5);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $meditations
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeditationRequest $request)
    {
        $body = $request->only("file", "title", 'description',"type");
        $meditation = new Meditation;
        $meditation->title = $body['title'];
        $meditation->file = $body['file'];
        $meditation->description = $body['description'];
        $meditation->type = $body['type'];
        try {
            $meditation->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($meditation);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meditation $meditation)
    {
        $meditation->load("diseases");
        return $this->respondWithSuccess($meditation);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(EditMeditationRequest $request, Meditation $meditation)
    {
        $body = $request->only('image', "file", "title", 'description');
        try {
            $meditation->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($meditation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meditation $meditation)
    {
        $meditation->deleteOrFail();
        return $this->respondWithSuccess($meditation);
    }
    public function attachDisease(AssignDiseaseRequest $request, Meditation $meditation){
        try {
            $disease = Disease::findOrFail($request->disease_id);

            $meditation->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($meditation->with("diseases")->get());
    }
    public function deAttachDisease(AssignDiseaseRequest $request, Meditation $meditation){
        $disease = Disease::find($request->disease_id);
        $meditation->diseases()->detach($disease);
        return $this->respondWithSuccess(
            $meditation->with("diseases")->get()
        );
    }
    public function getByType($type){
        $meditations = Meditation::whereType($type)->get();
        return $this->respondWithSuccess($meditations);
    }
}
