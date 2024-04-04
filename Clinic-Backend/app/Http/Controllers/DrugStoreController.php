<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\EditDrugStoreRequest;
use App\Models\Disease;
use App\Models\DrugStore;
use Illuminate\Http\Request;

class DrugStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $drugStores = DrugStore::with("diseases")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $drugStores
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $body = $request->only('address', "name", 'latitude', "longitude");
        $drugStore = new DrugStore;
        $drugStore->address = $body['address'];
        $drugStore->name = $body['name'];
        $drugStore->latitude = $body['latitude'];
        $drugStore->longitude = $body['longitude'];
        try {
            $drugStore->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($drugStore);
    }

    /**
     * Display the specified resource.
     */
    public function show(DrugStore $drugStore)
    {
        $drugStore->load("diseases");
        return $this->respondWithSuccess($drugStore);

    }

    /**
     * Update the specified resource in storage.
     */

    public function update(EditDrugStoreRequest $request, DrugStore $drugStore)
    {
        if($request->exists('address'))
            $drugStore->address = $request->address;
        if($request->exists('name'))
            $drugStore->name = $request->name;
        if($request->exists("latitude"))
            $drugStore->latitude = $request->latitude;
        if($request->exists("longitude"))
            $drugStore->longitude = $request->longitude;
        try {
            $drugStore->updateOrFail();
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($drugStore);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DrugStore $drugStore)
    {
        $drugStore->deleteOrFail();
        return $this->respondWithSuccess($drugStore);
    }
    public function attachDisease(AssignDiseaseRequest $request, DrugStore $drugStore){
        try {
            $disease = Disease::findOrFail($request->disease_id);

            $drugStore->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($drugStore->with("diseases")->get());
    }
    public function deAttachDisease(AssignDiseaseRequest $request, DrugStore $drugStore){
        $disease = Disease::find($request->disease_id);
        $drugStore->diseases()->detach($disease);
        return $this->respondWithSuccess(
            $drugStore->with("diseases")->get()
        );
    }
}
