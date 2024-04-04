<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditMessageRequest;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use App\Models\Ticket;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $messages = Message::all();
            return $this->respondWithSuccess($messages);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        try {
            $user = auth()->user();
            $body = $request->only('file', "content", "ticket_id");
            $ticket = Ticket::find($body['ticket_id']);
            $message = Message::create($body);
            $message->ticket()->associate($ticket)->save();
            $message->user()->associate($user)->save();
            $status = ($ticket->user->id == $user->id) ? "in_progress" : "answered";
            $ticket->status = $status;
            $ticket->save();
            $message->load("user", "ticket");
            return $this->respondCreated($message);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $message->load("user", "ticket");
        return $this->respondWithSuccess($message);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(EditMessageRequest $request, Message $message)
    {
        $body = $request->only('file', "content", "ticket_id");
        try {
            $message->updateOrFail($body);
            if($request->has("ticket_id"))
                $message->ticket()->associate(
                    Ticket::find($body["ticket_id"])
                )->save();
            $message->load("ticket", "user");
            return $this->respondWithSuccess($message);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->deleteOrFail();
        return $this->respondWithSuccess($message);
    }
}
