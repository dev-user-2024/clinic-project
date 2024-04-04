<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'password',
        'nationality_id',
        'mobile',
        'full_name',
        'approved',
        'OTP',
        'OTP_created',
        'image',
        'sex',
        'email',
        "birthDay"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
//        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
//        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function visitsOfDoctor(){
        return $this->hasMany(FaceToFaceVisit::class, "doctor");
    }
    public function requestsOfPatients(){
        return $this->hasMany(FaceToFaceVisit::class, "patient");
    }
    public function multiChoiceAnswers(){
        return $this->belongsToMany(Choice::class, "multi_choice_answer");
    }
    public function multiChoiceQuizzes(){
        return $this->belongsToMany(MultiChoiceQuiz::class, "multi_choice_quiz_user");
    }
    public function descriptiveResults(){
        return $this->belongsToMany(DescriptiveQuiz::class, "descriptive_quiz_result")->withPivot(["file", "content"]);
    }
    public function descriptiveAnswer(){
        return $this->belongsToMany(DescriptiveQuestion::class, "descriptive_question_answer")->withPivot("content", "file");
    }
    public function multiSurveyChoiceAnswer(){
        return $this->belongsToMany(SurveyChoice::class, "survey_multi_choice_answer");
    }
    public function surveys(){
        return $this->belongsToMany(Survey::class, "user_survey");
    }
    public function role(){
        return $this->belongsTo(Role::class);
    }
    public function tickets(){
        return $this->hasMany(Ticket::class);
    }
    public function messages(){
        return $this->hasMany(Message::class);
    }
}
