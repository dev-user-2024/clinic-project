<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditPotentialUserRequest;
use App\Http\Requests\StorePotentialUserRequest;
use App\Models\PotentialUser;
use Illuminate\Http\Request;

class PotentialUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $potentialUser = PotentialUser::all();
            return $this->respondWithSuccess($potentialUser);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePotentialUserRequest $request)
    {
        try {
            $body = $request->only('full_name', "nationality_id", "mobile");
            $potentialUser = PotentialUser::create($body);
            return $this->respondCreated($potentialUser);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PotentialUser $potentialUser)
    {
        return $this->respondWithSuccess($potentialUser);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditPotentialUserRequest $request, PotentialUser $potentialUser)
    {
        try {
            $body = $request->only('full_name', "nationality_id", "mobile");
            $potentialUser->updateOrFail($body);
            return $this->respondCreated($potentialUser);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PotentialUser $potentialUser)
    {
        $potentialUser->deleteOrFail();
        return $this->respondWithSuccess($potentialUser);

    }
}
