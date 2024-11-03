<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;

class DashboardController extends Controller implements HasMiddleware 
{
    public static function middleware()
    {
        return [
            new Middleware('permission:dashboard-access')
        ];
    }
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $users = User::count();

        return Inertia::render("Dashboard", compact("users"));
    }
}