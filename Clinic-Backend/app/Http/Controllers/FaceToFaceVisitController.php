<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignDiseaseRequest;
use App\Http\Requests\EditVisitRequest;
use App\Http\Requests\ExcelUpload;
use App\Http\Requests\StoreVisitRequest;
use App\Imports\FaceToFaceImport;
use App\Models\Disease;
use App\Models\FaceToFaceVisit;
use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;
use function PHPUnit\Framework\isNull;

class FaceToFaceVisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $visits = FaceToFaceVisit::with("patients", "doctor")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $visits
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitRequest $request)
    {
        $body = $request->only('full_name', 'description', "phone_number", "visit", "address", "doctor");
        try {
//            $body['visit'] = Carbon::create($body['visit'])->format('Y-m-d H:i:s');
            $visit = FaceToFaceVisit::create($body);
            $patient = User::whereMobile($body['phone_number'])->first();
            if(!is_null($patient))
                $visit->patients()->associate($patient)->save();
            $visit->load("doctor", "patients");
            return $this->respondCreated($visit);
        }catch (\Exception $e){
           dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(FaceToFaceVisit $faceToFaceVisit)
    {
        $faceToFaceVisit->load("doctor", "patients", "disease");
        return $this->respondWithSuccess($faceToFaceVisit);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(EditVisitRequest $request, FaceToFaceVisit $faceToFaceVisit)
    {
        $body = $request->only('full_name', 'description', "phone_number", "visit", "address", "doctor");
        try {
            $patient = User::whereMobile($body['phone_number'])->first();
            $faceToFaceVisit->updateOrFail($body);
            if(!is_null($patient))
                $faceToFaceVisit->patients()->associate($patient)->save();
            if($request->has('doctor')) {
                $doctor = User::find($body['doctor']);
                $faceToFaceVisit->doctor()->associate($doctor)->save();
            }
            $faceToFaceVisit->load("doctor", "patients");
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($faceToFaceVisit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FaceToFaceVisit $faceToFaceVisit)
    {
        $faceToFaceVisit->deleteOrFail();
        return $this->respondWithSuccess($faceToFaceVisit);
    }
    public function saveDisease(AssignDiseaseRequest $request, FaceToFaceVisit $faceToFaceVisit){
        try {
            $disease = Disease::find($request->disease_id);
            $disease->visits()->save($faceToFaceVisit);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        $faceToFaceVisit->load("disease");
        return $this->respondWithSuccess($faceToFaceVisit);
    }
    public function unSaveDisease(FaceToFaceVisit $faceToFaceVisit){
        $faceToFaceVisit->disease()->disassociate()->save();
        $faceToFaceVisit->load("disease");
        return $this->respondWithSuccess($faceToFaceVisit);
    }
    public function uploadExcel(ExcelUpload $request){
        $body = $request->only('file');
        try {
            $visitImport = new FaceToFaceImport;
//            dd($visitImport);
            Excel::import($visitImport, $body['file']);
            return $this->respondWithSuccess(
                FaceToFaceVisit::all()
            );
        }
        catch (ValidationException $e){
            return $this->respondError($e->getMessage());
        }
        catch(\Exception $e){
            dd($e);
            return $this->respondError($e->getMessage());

        }
    }
}
