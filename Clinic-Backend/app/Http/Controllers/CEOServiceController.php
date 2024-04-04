<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCEOServicRequest;
use App\Http\Requests\UpdateCEOServicRequest;
use App\Models\CEOService;
use Illuminate\Http\Request;

class CEOServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->respondWithSuccess(
            CEOService::paginate(10)
    );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCEOServicRequest $request)
    {
        $body = $request->only('full_name', 'phone_number', "company_name", "address");
        $service = new CEOService;
        $service->full_name = $body['full_name'];
        $service->phone_number = $body['phone_number'];
        $service->company_name = $body['company_name'];
        $service->address = $body['address'];
        try {
            $service->saveOrFail();
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
        return $this->respondCreated($service);
    }

    /**
     * Display the specified resource.
     */
    public function show(CEOService $CEOService)
    {
        return $this->respondWithSuccess($CEOService);
    }


    /**
     *
     * Update the specified resource in storage.
     */
    public function update(UpdateCEOServicRequest $request, CEOService $CEOService)
    {
        if($request->exists('full_name'))
            $CEOService->full_name = $request->full_name;
        if($request->exists("phone_number"))
            $CEOService->phone_number = $request->phone_number;
        if($request->exists("company_name"))
            $CEOService->company_name = $request->company_name;
        if($request->exists("address"))
            $CEOService->address = $request->address;
        try {
            $CEOService->updateOrFail();
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($CEOService);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CEOService $CEOService)
    {
        $CEOService->deleteOrFail();
        return $this->respondWithSuccess($CEOService);
    }
}
