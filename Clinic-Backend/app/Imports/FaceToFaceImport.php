<?php

namespace App\Imports;

use App\Http\Consts\Consts;
use App\Models\Disease;
use App\Models\FaceToFaceVisit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMappedCells;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use Throwable;

class FaceToFaceImport implements ToModel, WithHeadingRow, SkipsEmptyRows, WithValidation
{
    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $unixDateTIme = ($row['زمان ویزیت'] - 25569) * 86400;
        $carbon = Carbon::createFromTimestamp($unixDateTIme);
        $carbon = $carbon->subHours(3)->subMinutes(30);
        $doctor = User::whereMobile($row["موبایل دکتر"])->first()->id ?? null;
        $patient = User::whereMobile($row['موبایل بیمار'])->first()->id ?? null;
        $disease = Disease::whereName($row['نام بیماری'])->first()->id ?? null;
        return new FaceToFaceVisit([
            "full_name" => $row['نام و نام خانوادگی بیمار'],
            "address" => $row['آدرس'],
            "description" => $row['توضیحات'],
            "visit" => $carbon,
            "phone_number" => $row['موبایل بیمار'],
            "doctor" => $doctor,
            "patient" => $patient,
            "disease_id" => $disease
        ]);
    }

    public function rules(): array
    {
        return [
            "موبایل بیمار" => Consts::REQUIRED_VALIDATION ."|". Consts::MOBILE_VALIDATION,
            "موبایل دکتر" => Consts::MOBILE_VALIDATION,
            "نام بیماری" => Consts::REQUIRED_VALIDATION ."|". Consts::DISEASE_EXISTENCE_VALIDATION_NAME,
            "آدرس" => Consts::REQUIRED_VALIDATION ."|". Consts::STRING_VALIDATION,
            "توضیحات" => Consts::REQUIRED_VALIDATION ."|". Consts::STRING_VALIDATION,
            "زمان ویزیت" => Consts::REQUIRED_VALIDATION ,
        ];
    }
}
