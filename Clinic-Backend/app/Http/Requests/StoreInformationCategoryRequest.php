<?php

namespace App\Http\Requests;

use App\Http\Consts\Consts;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreInformationCategoryRequest extends FormRequest
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
            "image" => Consts::REQUIRED_VALIDATION. "|" . Consts::IMAGE_VALIDATION,
            "title" => Consts::REQUIRED_VALIDATION. "|" . Consts::STRING_VALIDATION,
            "disease_id" => Consts::REQUIRED_VALIDATION. "|" . Consts::DISEASE_EXISTENCE_VALIDATION,
            "information_items" => Consts::ARRAY_VALIDATION,
            "information_items.*" => Consts::INFORMATION_ITEM_EXISTENCE_VALIDATION,
        ];
    }
}
