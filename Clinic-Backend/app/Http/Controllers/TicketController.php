<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditTicketRequest;
use App\Http\Requests\StoreTicketRequest;
use App\Models\CategoryTicket;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $ticket = Ticket::with("categoryTicket", "user")->paginate(10);
            return $this->respondWithSuccess($ticket);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        try {
            $user = auth()->user();
            $body = $request->only('title', "category_ticket_id");
            $category = CategoryTicket::find($body['category_ticket_id']);
            $ticket = Ticket::create($body);
            $ticket->categoryTicket()->associate($category)->save();
            $ticket->user()->associate($user)->save();
            $ticket->load(["categoryTicket", "user", "messages" => function($q){
                $q->orderBy("created_at",'asc');
            }]);
            return $this->respondCreated($ticket);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket->load(["categoryTicket", "user", "messages" => function($q){
            $q->orderBy("created_at",'asc');
        }]);
        return $this->respondWithSuccess($ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditTicketRequest $request, Ticket $ticket)
    {
        $body = $request->only('title', "category_ticket_id");
        try {
            $ticket->updateOrFail($body);
            if($request->has("category_ticket_id"))
                $ticket->categoryTicket()->associate(
                    CategoryTicket::find($body["category_ticket_id"])
                )->save();
            $ticket->load("categoryTicket", "user");
            return $this->respondWithSuccess($ticket);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->deleteOrFail();
        return $this->respondWithSuccess($ticket);
    }
    public function myTickets(){
        $user = auth()->user();
        return $this->respondWithSuccess($user->tickets);
    }
    public function inProgress(){
        return $this->respondWithSuccess(
            Ticket::whereStatus("in_progress")->get()
        );
    }
}
