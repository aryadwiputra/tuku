<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'user'])->get();

        return Inertia::render('Dashboard/Product/Index', ['products'=> $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Dashboard/Product/Create', ['categories'=> $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id'=> 'required',
            'name'=> 'required',
            'description'=> 'required',
            'price'=> 'required',
            'stock' => 'required',
            'thumbnail' => 'required',
        ]);

        $category = Category::where('name', $request->category_id)->first();

        $file = $request->file('thumbnail');

        $filename = time().'.'.$file->getClientOriginalExtension();

        $file->storeAs('product/thumbnails', $filename, 'public');

        // Generate a unique slug
        $slug = $request->name . '-' .  \Illuminate\Support\Str::random(6);

        // Check if the slug already exists
        while (Product::where('slug', $slug)->exists()) {
            // Generate a new random slug if it already exists
            $slug = $request->name . '-' . \Illuminate\Support\Str::random(6);
        }

        Product::create([
            'category_id'=> $category->id,
            'user_id' => Auth::user()->id,
            'name'=> $request->name,
            'slug' => \Illuminate\Support\Str::slug($slug),
            'description'=> $request->description,
            'price'=> $request->price,
            'stock' => $request->stock,
            'thumbnail' => $filename,
        ]);

        return to_route('dashboard.products.index')->with('success','Product created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Storage::disk('public')->delete('product/thumbnails/'.$product->thumbnail);

        $product->delete();

        return to_route('dashboard.products.index')->with('success','Product deleted successfully');
    }
}