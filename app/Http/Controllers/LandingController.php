<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $categories = Category::all();  
        $products = Product::with(['category', 'user'])->get();

        return Inertia::render('Welcome', compact('categories','products'));
    }
}