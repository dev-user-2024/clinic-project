<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditCategoryRequest;
use App\Http\Requests\ItemExistenceRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\CategoryLifeSkill;
use App\Models\Disease;
use App\Models\Item;
use Illuminate\Http\Request;

class CategoryLifeSkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $category = CategoryLifeSkill::with("items", "disease")->get();
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
    public function store(StoreCategoryRequest $request)
    {
        $body = $request->only('image', "title", "disease_id", "items");
        try {
            $category = CategoryLifeSkill::create($body);
            if($request->has("items")) {
                $items = Item::find($body['items']);
                $category->items()->saveMany($items);
            }
            $disease = Disease::find($body['disease_id']);
            $category->disease()->associate($disease)->save();
            $category->load("items", "disease");
            return $this->respondCreated($category);
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryLifeSkill $categoryLifeSkill)
    {
        $categoryLifeSkill->load("items", "disease");
        return $this->respondWithSuccess($categoryLifeSkill);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditCategoryRequest $request, CategoryLifeSkill $categoryLifeSkill)
    {
        $body = $request->only('image', "title", "disease_id", "items");
        try {
            $categoryLifeSkill->updateOrFail($body);
            if($request->has("items")) {
                foreach ($categoryLifeSkill->items as $item)
                    $item->categoryLifeSkill()->disassociate()->save();
                $categoryLifeSkill->items()->saveMany(
                    Item::findOrFail($body['items'])
                );
            }
            if($request->has("disease_id")) {
                $categoryLifeSkill->disease()->disassociate()->save();
                $categoryLifeSkill->disease()->associate(
                    Disease::find($body['disease_id'])
                );
            }
            $categoryLifeSkill->load("items", "disease");
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($categoryLifeSkill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryLifeSkill $categoryLifeSkill)
    {
        $categoryLifeSkill->deleteOrFail();
        return $this->respondWithSuccess($categoryLifeSkill);
    }
    public function assignItem(ItemExistenceRequest $request, CategoryLifeSkill $categoryLifeSkill){
        try {
            $item = Item::find($request->item_id);
            $item->categoryLifeSkill()->associate($categoryLifeSkill)->save();
            return $this->respondWithSuccess($categoryLifeSkill->with("items")->get());
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }
    public function removeItem(ItemExistenceRequest $request, CategoryLifeSkill $categoryLifeSkill){
        try {
            $item = Item::find($request->item_id);
            $item->categoryLifeSkill()->disassociate($categoryLifeSkill)->save();
            return $this->respondWithSuccess($categoryLifeSkill->with("items")->get());
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }
}
