<?php

use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\WebAuthn\WebAuthnLoginController;
use App\Http\Middleware\VerifyCsrfToken;
use App\Http\Controllers\WebAuthn\WebAuthnRegisterController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/webauthn/login/options', [WebAuthnLoginController::class, 'options'])
    ->name('webauthn.login.options');

Route::post('/webauthn/login', [WebAuthnLoginController::class, 'login'])
    ->name('webauthn.login');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/users', [AdminController::class, 'index'])->name('admin.users');
    Route::patch('admin/users/{user}/approve', [AdminController::class, 'approve'])->name('admin.users.approve');
    Route::patch('/admin/users/{user}/toggle-active', [AdminController::class, 'toggleActive'])->name('admin.users.toggle-active');
    Route::get('/admin/users/{user}/details', [AdminController::class, 'details'])
    ->name('admin.users.details');
    Route::get('/partner/profile', [PartnerController::class, 'edit'])->name('partner.profile');
    Route::patch('/partner/profile', [PartnerController::class, 'update'])->name('partner.profile.update');

    Route::post('/webauthn/register/options', [WebAuthnRegisterController::class, 'options'])
    ->withoutMiddleware(VerifyCsrfToken::class)
    ->name('webauthn.register.options');

    Route::post('/webauthn/register', [WebAuthnRegisterController::class, 'register'])
    ->withoutMiddleware(VerifyCsrfToken::class)
    ->name('webauthn.register');
});

require __DIR__.'/auth.php';
