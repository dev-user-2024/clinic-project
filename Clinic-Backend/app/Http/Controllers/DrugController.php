<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\AssignDiseasesRequest;
use App\Http\Requests\AssignDrugStoreRequest;
use App\Http\Requests\AssignDrugStoresRequest;
use App\Http\Requests\DrugStoreExistenceRequest;
use App\Http\Requests\EditAndStoreDrugRequest;
use App\Models\Disease;
use App\Models\Drug;
use App\Models\DrugStore;
use Illuminate\Http\Request;

class DrugController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $drug = Drug::with("diseases", "drugStores")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $drug
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(EditAndStoreDrugRequest $request)
    {
        if(($request->exists('drug_stores') && !$request->exists('possesses') ||
            !$request->exists('drug_stores') && $request->exists('possesses'))) {
                return $this->respondFailedValidation("اگر داروخانه مربوطه را میخواهید در این قسمت وارد کنید، باید موجود بودن یا نبودن را هم تعیین کنید.");
        }
        if(sizeof($request->drug_stores) != sizeof($request->possesses))
            return $this->respondFailedValidation("تعداد داروخونه ها با موجودیت ها باید برار باشد");

        $body = $request->only('name');
        $drug = new Drug;
        $drug->name = $body['name'];
        try {
            if($request->exists('drug_stores')) {
                $drugStores = DrugStore::findOrFail($request->drug_stores);
                $drug->saveOrFail();
                foreach($drugStores as $key => $drugStore)
                    $drug->drugStores()->attach($drugStore, ["possess" => $request->possesses[$key]]);
            }
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        $drug->load("diseases", "drugStores");
        return $this->respondCreated($drug);
    }

    /**
     * Display the specified resource.
     */
    public function show(Drug $drug)
    {
        $drug->load("diseases", "drugStores");
        return $this->respondWithSuccess($drug);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditAndStoreDrugRequest $request, Drug $drug)
    {
        if(($request->exists('drug_stores') && !$request->exists('possesses') ||
            !$request->exists('drug_stores') && $request->exists('possesses'))) {
            return $this->respondFailedValidation("اگر داروخانه مربوطه را میخواهید در این قسمت وارد کنید، باید موجود بودن یا نبودن را هم تعیین کنید.");
        }
        if(sizeof($request->drug_stores) != sizeof($request->possesses))
            return $this->respondFailedValidation("تعداد داروخونه ها با موجودیت ها باید برار باشد");

        $body = $request->only('name');
        try {
            if($request->exists('drug_stores')) {
                $drugStores = DrugStore::findOrFail($request->drug_stores);
                $drug->drugStores()->detach();
                foreach($drugStores as $key => $drugStore)
                    $drug->drugStores()->attach($drugStore, ["possess" => $request->possesses[$key]]);

            }
            $drug->updateOrFail($body);
            $drug->load("diseases", "drugStores");
            return $this->respondWithSuccess($drug);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Drug $drug)
    {
        $drug->deleteOrFail();
        return $this->respondWithSuccess($drug);
    }
    public function attachDisease(AssignDiseasesRequest $request, Drug $drug){
        try {
            $disease = Disease::findOrFail($request->diseases);
            $drug->diseases()->attach($disease);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        $drug->load('diseases');
        return $this->respondWithSuccess($drug);
    }
    public function deAttachDisease(AssignDiseasesRequest $request, Drug $drug){
        $disease = Disease::find($request->diseases);
        $drug->diseases()->detach($disease);
        $drug->load("diseases");
        return $this->respondWithSuccess($drug);
    }

    public function attachDrugStore(AssignDrugStoresRequest $request, Drug $drug){
        try {
            if(($request->exists('drug_stores') && !$request->exists('possesses') ||
                !$request->exists('drug_stores') && $request->exists('possesses'))) {
                return $this->respondFailedValidation("اگر داروخانه مربوطه را میخواهید در این قسمت وارد کنید، باید موجود بودن یا نبودن را هم تعیین کنید.");
            }
            if(sizeof($request->drug_stores) != sizeof($request->possesses))
                return $this->respondFailedValidation("تعداد داروخونه ها با موجودیت ها باید برار باشد");
            $drugStores = DrugStore::findOrFail($request->drug_stores);
            foreach($drugStores as $key => $drugStore)
                $drug->drugStores()->attach($drugStore, ["possess" => $request->possesses[$key]]);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        $drug->load("drugStores");
        return $this->respondWithSuccess($drug);
    }
    public function deAttachDrugStore(DrugStoreExistenceRequest $request, Drug $drug){
        $drugStore = DrugStore::find($request->drug_stores);
        $drug->drugStores()->detach($drugStore);
        $drug->load("drugStores");
        return $this->respondWithSuccess($drug);

    }
    public function searchName($name){
        $drugs = Drug::whereName($name)->with("drugStores")->get();
        return $this->respondWithSuccess($drugs);
    }
}
