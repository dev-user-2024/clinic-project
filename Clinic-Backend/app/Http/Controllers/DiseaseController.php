<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditDiseaseRequest;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\StoreDiseaseRequest;
use App\Models\Disease;
use Illuminate\Http\Request;

class DiseaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->respondWithSuccess(
            Disease::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiseaseRequest $request)
    {
        $body = $request->only('name', 'description');
        $disease = new Disease;
        $disease->name = $body['name'];
        $disease->description = $body['description'];
        $disease->saveOrFail();
        return $this->respondCreated($disease);
    }

    /**
     * Display the specified resource.
     */
    public function show(Disease $disease)
    {
        $disease->load("entertainments", "visits",
            "drugStores", "drugs",
            "multiChoiceQuizzez", "descriptiveQuizzes",
            "survies", "categoryLifeSkills",
            "informationCategory", "meditations"
        );
        return $this->respondWithSuccess($disease);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditDiseaseRequest $request, Disease $disease)
    {
        if($request->exists('name'))
            $disease->name = $request->name;
        if($request->exists("description"))
            $disease->description = $request->description;
        $disease->updateOrFail();
        return $this->respondWithSuccess($disease);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disease $disease)
    {
        $disease->deleteOrFail();
        return $this->respondWithSuccess($disease);
    }
}
