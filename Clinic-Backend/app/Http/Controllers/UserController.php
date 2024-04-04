<?php

namespace App\Http\Controllers;

use App\Http\Consts\Consts;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\RoleExistenceRequest;
use App\Http\Requests\SetPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->respondWithSuccess(
            User::whereNotNull("password")->paginate(10)
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $body = $request->only('mobile', "full_name",
            "nationality_id", 'image',
            'sex', 'email',
            "birthDay");
        if($request->has("nationality_id"))
            $body["password"] = Hash::make($body['nationality_id']);
        try {
            if(!Role::whereName(Consts::DEFAULT_ROLE)->exists())
                return $this->respondError(Consts::DEFAULT_ROLE_DONT_EXISTED);
            $user = User::create($body);
            $user->role()->associate(
                Role::whereName(Consts::DEFAULT_ROLE)->first()
            )->save();
            return $this->respondCreated($user);
        }catch (\Exception $e){
           return $this->respondError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load("role.permissions");
        return $this->respondWithSuccess($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditUserRequest $request, User $user)
    {
        if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه تغییر  این کاربر را ندارید");
        $body = $request->only('mobile', "full_name",
            "nationality_id", 'image',
            'sex', 'email',
            "birthDay");
        try {
            $user->updateOrFail($body);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return $this->respondWithSuccess($user);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه حذف  این کاربر را ندارید");
        $user->deleteOrFail();
        return $this->respondWithSuccess($user);
    }

    public function assignRole(RoleExistenceRequest $request, User $user){
        if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما تغییر نقش این کاربر را ندارید");
        try{
            $user->role()->associate($request->role_id)->save();
            $user->load("role");
            return $this->respondWithSuccess($user);
        }catch(\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }
    public function removeRole(RoleExistenceRequest $request, User $user){
        if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما تغییر نقش این کاربر را ندارید");
        try{
            $user->role()->disassociate()->save();
            $user->load("role");
            return $this->respondWithSuccess($user);
        }catch(\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }
     public function toggleApprove(User $user){
         if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
             return $this->respondForbidden("شما تغییر تاییداین  کاربر را ندارید");
        try{
            $user->approved = !$user->approved;
            $user->updateOrFail();
            return $this->respondWithSuccess($user);
        }catch (\Exception $e){
            return $this->respondError($e->getMessage());
        }
     }

     public function setPassword(SetPasswordRequest $request, User $user){
         if($user->role->name == Consts::SUPPER_ADMIN_ROLE)
             return $this->respondForbidden("شما تغییر پسورد این  کاربر را ندارید");
        $body = $request->only('password');
        $body["password"] = Hash::make($body['password']);
        $user->updateOrFail($body);
        return $this->respondWithSuccess($user);
     }
}
