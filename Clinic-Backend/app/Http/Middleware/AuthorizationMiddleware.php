<?php

namespace App\Http\Middleware;

use App\Http\Consts\Consts;
use App\Models\Role;
use App\Models\Route;
use Closure;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizationMiddleware
{
    use ApiResponseHelpers;

    private $hasToBeAuthenticated = ["auth.whoAmI", "choice.pickAnAnswer", "choice.removeAnAnswer", "choice.getAnswersOfQuiz", "descriptiveQuestion.storeAnswer", "descriptiveQuestion.removeAnswer", "descriptiveQuiz.theQuestionAndTheAnswers", "descriptiveQuiz.myResult", "message.store", "multiChoiceQuiz.myQuizzes", "multiChoiceQuiz.myMark", "multiChoiceQuiz.theQuestionAndThePickedChoices", "surveyChoice.pickAnAnswer", "surveyChoice.removeAnAnswer", "surveyChoice.getAnswersOfSurvey", "survey.mySurveys", "survey.theQuestionAndThePickedChoices", "ticket.store", "ticket.myTickets"];
    private $hasNotToBeAuthenticated = ['disease.index', 'disease.show', "informationItem.index", "informationItem.show", "categoryLifeSkills.index", "categoryLifeSkills.show", "item.index", "item.show", "informationCategory.index", "informationCategory.show", "entertainment.index", "entertainment.show", "information.index", "information.show", "meditation.index", "meditation.show", "meditation.getByType", "drugStore.index", "multiChoiceQuiz.index", "descriptiveQuiz.index", "survey.index", "drug.index", "auth.preLogin", "auth.mobileCheck", "auth.loginWithPassword", 'auth.refresh', "role.supperAdmin", "role.makeDefaultRole"];
    private $allUserCanAccess = ['auth.refresh', "auth.whoAmI"];

    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $feature = explode("/", $request->route()->uri)[1];
        $action = $request->route()->getActionMethod();
        $comingRoute = $feature .".". $action;
        if(in_array($comingRoute, $this->hasNotToBeAuthenticated))
            return $next($request);
        if(in_array($comingRoute, $this->hasToBeAuthenticated) && !auth()->check())
            return $this->respondUnAuthenticated(Consts::NOT_AUTHENTICATED);
        if(auth()->check()){
            if(in_array($comingRoute, $this->allUserCanAccess))
                return $next($request);
            if(!key_exists($comingRoute, config("route")))
            $this->respondForbidden(Consts::PERMISSION_NOT_FOUND);
            $role = Role::whereName(auth()->payload()->get("role"))->first();
            return (!$role->permissions()->whereRoute($comingRoute)->exists()) ?
                 $this->respondForbidden(Consts::AUTHORIZATION_NOT_PASS):
                $next($request);
        } else
            return $this->respondUnAuthenticated(Consts::NOT_AUTHENTICATED);
    }
}
