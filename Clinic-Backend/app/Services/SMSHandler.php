<?php

namespace App\Services;

use Ghasedak\Exceptions\ApiException;
use Ghasedak\GhasedakApi;
use Illuminate\Support\Facades\Log;

class SMSHandler
{
    static public function sendOTP($code, $mobile)
    {
        Log::channel('smsLog')->alert("the code $code sent to $mobile");
        $apiKey = env("SMS_KEY");
        try {

            $curl = curl_init();
            curl_setopt_array($curl,
                array(
                    CURLOPT_URL => "http://api.ghasedaksms.com/v2/send/verify",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "POST",
                    CURLOPT_POSTFIELDS => "type=1&receptor=$mobile&template=medical&param1=$code",
                    CURLOPT_HTTPHEADER => array(
                        "apikey: $apiKey",
                        "cache-control: no-cache",
                        "content-type: application/x-www-form-urlencoded",
                    )));
            curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);
            return ($err == null) ? true : false;
        }catch (\Exception $e ){
            dd($e->getMessage());
        }
    }

}
