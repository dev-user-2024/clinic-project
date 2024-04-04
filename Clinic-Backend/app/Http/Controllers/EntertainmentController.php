<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\AssignDiseasesRequest;
use App\Http\Requests\EditEntertainmentRequest;
use App\Http\Requests\StoreEntertainmentRequest;
use App\Models\Disease;
use App\Models\Entertainment;
use Illuminate\Http\Request;

class EntertainmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
                $entertainments = Entertainment::with("diseases")->paginate(10);
            }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $entertainments
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntertainmentRequest $request)
    {
        $body = $request->only("title", 'Bazar_link', "play_store_link", "app_store_link", 'description', "image");
        $entertainment = new Entertainment;
        $entertainment->title = $body['title'];
        $entertainment->Bazar_link = $body['Bazar_link'];
        $entertainment->play_store_link = $body['play_store_link'];
        $entertainment->app_store_link = $body['app_store_link'];
        $entertainment->description = $body['description'];
        $entertainment->image = $body['image'];
        try {
            $entertainment->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($entertainment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entertainment $entertainment)
    {
        $entertainment->load("diseases");
        return $this->respondWithSuccess($entertainment);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(EditEntertainmentRequest $request, Entertainment $entertainment)
    {
        if($request->exists('title'))
            $entertainment->title = $request->title;
        if($request->exists('app_store_link'))
            $entertainment->app_store_link = $request->app_store_link;
        if($request->exists('play_store_link'))
            $entertainment->play_store_link = $request->play_store_link;
        if($request->exists('Bazar_link'))
            $entertainment->Bazar_link = $request->Bazar_link;
        if($request->exists("description"))
            $entertainment->description = $request->description;
        if($request->exists("image"))
            $entertainment->image = $request->image;
        try {
            $entertainment->updateOrFail();
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($entertainment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entertainment $entertainment)
    {
        $entertainment->deleteOrFail();
        return $this->respondWithSuccess($entertainment);
    }
    public function attachDisease(AssignDiseasesRequest $request, Entertainment $entertainment){
        try {
            $diseases = Disease::findOrFail($request->diseases);

            $entertainment->diseases()->attach($diseases);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        $entertainment->load("diseases");
        return $this->respondWithSuccess($entertainment);
    }
    public function deAttachDisease(AssignDiseasesRequest $request, Entertainment $entertainment){
        $diseases = Disease::find($request->diseases);
        $entertainment->diseases()->detach($diseases);
        $entertainment->load("diseases");
        return $this->respondWithSuccess($entertainment);
    }
}
