<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::middleware('auth')->as('dashboard')->name('dashboard.')->prefix('dashboard')->group(function () {
    Route::get('/', \App\Http\Controllers\DashboardController::class)->name('index');
    Route::resource('categories', \App\Http\Controllers\CategoryController::class);
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::delete('products/{product}/delete-image/{id}', \App\Http\Controllers\ProductController::class.'@deleteImage')->name('products.delete-image');
    Route::post('products/{product}/add-image', \App\Http\Controllers\ProductController::class.'@addImage')->name('products.add-image');
    Route::resource('roles', \App\Http\Controllers\RoleController::class);
    // Invokable controller of permissions
    Route::get('permissions', \App\Http\Controllers\PermissionController::class)->name('permissions.index');
    Route::resource('users', \App\Http\Controllers\UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';