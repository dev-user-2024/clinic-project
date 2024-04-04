<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditItemRequest;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $category = Item::with("categoryLifeSkill")->paginate(10);
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
            $item = Item::create($body);
            return $this->respondCreated($item);

        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $item->load('categoryLifeSkill');
        return $this->respondWithSuccess($item);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(EditItemRequest $request, Item $item)
    {
        $body = $request->only('image', "title", "description");
        try {
            $item->updateOrFail($body);
            return $this->respondWithSuccess($item);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->deleteOrFail();
        return $this->respondWithSuccess($item);
    }
}
