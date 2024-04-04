<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditItemRequest;
use App\Http\Requests\StoreItemRequest;
use App\Models\InformationItem;
use Illuminate\Http\Request;

class InformationItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $category = InformationItem::with("informationCategory")->paginate(10);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess(
            $category
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $body = $request->only('file', "title", "description");
        try {
            $item = InformationItem::create($body);
            return $this->respondCreated($item);
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InformationItem $informationItem)
    {
        $informationItem->load('informationCategory');
        return $this->respondWithSuccess($informationItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditItemRequest $request, InformationItem $informationItem)
    {
        $body = $request->only('image', "title", "description");
        try {
            $informationItem->updateOrFail($body);
            return $this->respondWithSuccess($informationItem);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InformationItem $informationItem)
    {
        $informationItem->deleteOrFail();
        return $this->respondWithSuccess($informationItem);
    }
}
