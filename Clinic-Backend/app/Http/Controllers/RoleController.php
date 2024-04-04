<?php

namespace App\Http\Controllers;

use App\Http\Consts\Consts;
use App\Http\Requests\EditRoleRequest;
use App\Http\Requests\RolesExistenceRequest;
use App\Http\Requests\RouteExistenceRequest;
use App\Http\Requests\StoreRoleRequest;
use App\Models\Permission;
use App\Models\Role;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $roles = Role::with("permissions")->get();
            return $this->respondWithSuccess($roles);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $body = $request->only('name');
        try {
            $role = new Role;
            $role->name = $body['name'];
            $role->saveOrFail();
            return $this->respondWithSuccess($role);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        $role->load("permissions");
        return $this->respondWithSuccess($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditRoleRequest $request, Role $role)
    {
        $roleName = $role->name;
        if($roleName == Consts::DEFAULT_ROLE || $roleName == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه تغییر این نقش را ندارید");
        $body = $request->only('name');
        try {
            $role->updateOrFail($body);
            return $this->respondWithSuccess($role);
        }catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $roleName = $role->name;
        if($roleName == Consts::DEFAULT_ROLE || $roleName == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه تغییر این نقش را ندارید");

        try {
            $role->deleteOrFail();
            return $this->respondWithSuccess($role);
        } catch (\Exception $e){
            dd($e->getMessage());
        }
    }

    public function makeDefaultRole(){
        try {
            if(!Role::whereName(Consts::DEFAULT_ROLE)->exists()) {
                $role = Role::create([
                    'name' => Consts::DEFAULT_ROLE
                ]);
                $permissions = array();
                foreach (array_keys(config('userRoute')) as $routeName)
                    $permissions[] = new Permission([
                        'route' => $routeName
                    ]);
                $role->permissions()->saveMany($permissions);
                $role->load("permissions");
                return $this->respondWithSuccess($role);
            }
            return $this->respondError(Consts::DEFAULT_ROLE_EXISTED);
        }catch(\Exception $e){
            return $this->respondError($e->getMessage());
        }
    }
    public function setPermissions(Request $request, Role $role){
        $roleName = $role->name;
        if($roleName == Consts::DEFAULT_ROLE || $roleName == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه تغییر این نقش را ندارید");
        $body = $request->only('routes');
        $routes = config('route');
        foreach ($body['routes'] as $route)
            if(!key_exists($route, $routes))
                return $this->respondFailedValidation("The routes not existed. use get all permission endpoint and use them.");
        $permissions = array();
        foreach ($body['routes'] as $route) {
            if (!Permission::where([["route" , $route], ["role_id", $role->id]])->exists()) {
                $permission = new Permission;
                $permission->route = $route;
            } else
                $permission = Permission::where([["route" , $route], ["role_id", $role->id]])->first();
            $permissions[] = $permission;
        }
        $role->permissions()->saveMany($permissions);
        $role->load("permissions");
        return $this->respondWithSuccess($role);
    }
    public function removePermissions(Request $request, Role $role){
        $roleName = $role->name;
        if($roleName == Consts::DEFAULT_ROLE || $roleName == Consts::SUPPER_ADMIN_ROLE)
            return $this->respondForbidden("شما اجازه تغییر این نقش را ندارید");
        $body = $request->only('routes');
        $routes = config('route');
        foreach ($body['routes'] as $route)
            if(!key_exists($route, $routes))
                return $this->respondFailedValidation("The routes not existed. use get all permission endpoint and use them.");
        Permission::whereIn("route" , $body['routes'])
            ->where("role_id", $role->id)->delete();
        return $this->respondWithSuccess($role->load('permissions'));
    }

    public function allPermissions(){
        return $this->respondWithSuccess(config('route'));
    }

    public function allUserPermission(){
        return $this->respondWithSuccess(config('userRoute'));
    }

    public function supperAdmin(){
        if(!Role::whereName(Consts::SUPPER_ADMIN_ROLE)->exists()) {
            $supperAdminRole = Role::create([
                "name" => Consts::SUPPER_ADMIN_ROLE
            ]);
            $user = User::create([
                "mobile" => "09000000000",
                "password" => Hash::make("admin"),
            ]);
            $permissions = array();
            foreach (array_keys(config('route')) as $routeName) {
                $permissions[] = new Permission([
                    'route' => $routeName
                ]);
            }
            $supperAdminRole->permissions()->saveMany($permissions);
            $user->role()->associate($supperAdminRole)->save();
            $user->load("role.permissions");
            return $this->respondWithSuccess($user);
        }
        return $this->respondFailedValidation("سوپر ادمین قبلا ایجاد شده است");
    }
}
