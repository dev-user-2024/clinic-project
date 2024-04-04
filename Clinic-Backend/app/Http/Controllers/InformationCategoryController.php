<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditCategoryRequest;
use App\Http\Requests\EditInformationCategoryRequest;
use App\Http\Requests\InformationItemExistenceRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\StoreInformationCategoryRequest;
use App\Http\Requests\StoreInformationRequest;
use App\Models\Disease;
use App\Models\InformationCategory;
use App\Models\InformationItem;
use Illuminate\Http\Request;

class InformationCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $category = InformationCategory::with("informationItems", "disease")->get();
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
    public function store(StoreInformationCategoryRequest $request)
    {
        $body = $request->only('image', "title", "disease_id", "information_items");
        try {
            $category = InformationCategory::create($body);
            if($request->has("information_items")){
                $items = InformationItem::findOrFail($body['information_items']);
                $category->informationItems()->saveMany($items);
            }

            $disease = Disease::find($body['disease_id']);
            $category->disease()->associate($disease)->save();
            $category->load("informationItems", "disease");
            return $this->respondCreated($category);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InformationCategory $informationCategory)
    {
        $informationCategory->load("informationItems", "disease");
        return $this->respondWithSuccess($informationCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditInformationCategoryRequest $request, InformationCategory $informationCategory)
    {
        $body = $request->only('image', "title", "disease_id", "information_items");
        try {
            $items = InformationItem::findOrFail($body['information_items']);
            $informationCategory->updateOrFail($body);
            if($request->has("information_items")) {
                foreach ($informationCategory->informationItems as $item)
                    $item->informationCategory()->disassociate()->save();
                $informationCategory->informationItems()->saveMany($items);
            }
            if($request->has("disease_id")) {
                $informationCategory->disease()->disassociate()->save();
                $informationCategory->disease()->associate(
                    Disease::find($body['disease_id'])
                );
            }
            $informationCategory->load("informationItems", "disease");
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($informationCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InformationCategory $informationCategory)
    {
        $informationCategory->deleteOrFail();
        return $this->respondWithSuccess($informationCategory);
    }
    public function assignItem(InformationItemExistenceRequest $request, InformationCategory $informationCategory){
        try {
            $item = InformationItem::find($request->item_id);
            $item->informationCategory()->associate($informationCategory)->save();
            return $this->respondWithSuccess($informationCategory->with("informationItems")->get());
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }
    public function removeItem(InformationItemExistenceRequest $request, InformationCategory $informationCategory){
        try {
            $item = InformationItem::find($request->item_id);
            $item->informationCategory()->disassociate($informationCategory)->save();
            return $this->respondWithSuccess($informationCategory->with("informationItems")->get());
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }
}
