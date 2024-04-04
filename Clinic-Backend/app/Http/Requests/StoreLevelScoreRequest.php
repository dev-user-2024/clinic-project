<?php

namespace App\Http\Requests;

use App\Http\Consts\Consts;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreLevelScoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 400));
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "file" => Consts::REQUIRED_VALIDATION . "|" . Consts::FILE_VALIDATION,
            "content" => Consts::REQUIRED_VALIDATION,
            "max_val" => Consts::REQUIRED_VALIDATION. "|" . Consts::POSITIVE_NUMBER_VALIDATION,
            "min_val" => Consts::REQUIRED_VALIDATION. "|" . Consts::POSITIVE_NUMBER_VALIDATION,
            "multi_choice_quiz_id" => Consts::REQUIRED_VALIDATION. "|" . Consts::MULTI_CHOICE_QUIZ_EXISTENCE_VALIDATION,
        ];
    }
}
