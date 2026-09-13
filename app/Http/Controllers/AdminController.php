<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;



class AdminController extends Controller
{
    public function index(): Response{
        if (!Auth::user()->is_admin){
            abort(403);
        }
        return Inertia::render('Admin/Users', [
            'users' => User::all(),
        ]);
    }

    public function approve(User $user){
        if (!Auth::user()->is_admin){
            abort(403);
        }
        $user->update(['is_approved' => true,]);
        return back();
    }

    public function toggleActive(User $user){
        if (!Auth::user()->is_admin){
            abort(403);
        }
        $user->update(['is_active' => !$user->is_active,]);
        return back();
    }
    public function details(User $user): Response
    {
        if (!Auth::user()->is_admin) {
            abort(403);
        }

        return Inertia::render('Admin/UserDetails', [
            'user' => $user,
        ]);
    }

    //
}
