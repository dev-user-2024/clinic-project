<?php

namespace App\Http\Controllers;

use App\Http\Consts\Consts;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LoginWithPasswordRequest;
use App\Http\Requests\PreloginRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\SMSHandler;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthController extends Controller
{
    public function preLogin(PreloginRequest $request){
        $body = $request->only('mobile');
        $otp = rand(1000, 9999);
        $role = Role::whereName(Consts::DEFAULT_ROLE)->first();
        if($role == null)
            return $this->respondError(Consts::DEFAULT_ROLE_DONT_EXISTED);
        $user = User::firstOrNew(['mobile' => $body['mobile']]);
        if($user->OTP_created !== null && Carbon::now()->isBefore($user->OTP_created))
            return $this->respondError(Consts::OTP_NOT_EXPIRED);
        $user->OTP = $otp;
        $user->OTP_created = Carbon::now()->addMinutes(2)->format('Y-m-d H:i:s');
        $user->role()->associate($role)->save();
        return (SMSHandler::sendOTP($user->OTP, $user->mobile) && $user->saveOrFail()) ?
            $this->respondOk(Consts::OTP_SENT) :
            $this->respondError(Consts::OTP_NOT_SENT);
    }

    public function mobileCheck(LoginRequest $request){
        $body = $request->only("mobile", "otp");
        try {
            $user = User::whereMobile($body['mobile'])->firstOrFail();
        }catch(\Exception $e){
            dd($e->getMessage());
        }
        return ($user->OTP == $body['otp'] &&
            Carbon::now()->isBefore($user->OTP_created))?
//            $token = auth()->claims(["role" => $user->role->name])->login($user)) ?
            $this->respondWithSuccess([
                "message" => "شماره موبایل تایید شد",
                "data" => $user]) :
            $this->respondError(Consts::UN_SUCCESS_LOGIN);
    }

    public function loginWithPassword(LoginWithPasswordRequest $request){
        $user = User::whereMobile($request->mobile)->first();
        $attempts = $request->only("mobile", "password");
        if($token = Auth::claims(["role" => $user->role->name])->attempt($attempts))
            return $this->respondWithSuccess(["token" => $token]);
        return $this->respondError(Consts::WRONG_MOBILE_OR_PASSWORD);
    }

    public function whoAmI(){
        return $this->respondWithSuccess(
            auth()->user()->load("role.permissions", "visitsOfDoctor", "requestsOfPatients")
        );
    }

    public function refresh(){
        try{
            $token = Auth::refresh();
            return $this->respondWithSuccess(["token" => $token]);
        }catch(TokenExpiredException $e){
            return $this->respondError(Consts::REFRESH_TOKEN_EXPIRED);
        }
        catch(Exception $e){
            return $this->respondError($e->getMessage());
        }
    }
}
