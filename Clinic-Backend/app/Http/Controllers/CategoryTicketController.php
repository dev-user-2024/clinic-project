<?php

namespace App\Http\Controllers;

use App\Models\CategoryTicket;
use Illuminate\Http\Request;

class CategoryTicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories = CategoryTicket::with("tickets")->get();
        }catch (\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $body = $request->only("content");
        try {
            $category = CategoryTicket::create($body);
            return $this->respondCreated($category);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryTicket $categoryTicket)
    {
        $categoryTicket->load("tickets");
        return $this->respondWithSuccess($categoryTicket);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategoryTicket $categoryTicket)
    {
        $body = $request->only("content");
        try {
            $categoryTicket->updateOrFail($body);
            return $this->respondCreated($categoryTicket);
        }catch (\Exception $e){
            $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryTicket $categoryTicket)
    {
        $categoryTicket->deleteOrFail();
        return $this->respondWithSuccess($categoryTicket);
    }
}
