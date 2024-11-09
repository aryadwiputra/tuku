<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:categories-access', only:['index']),
            new Middleware('permission:categories-create', only:['create','store']),
            new Middleware('permission:categories-update', only:['edit', 'update']),
            new Middleware('permission:categories-destroy', only:['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/Category/Index', ['categories'=> $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|unique:categories',
            'description'=> 'required',
            'icon'=> 'required',
        ]);

        // Move icon
        
        $file = $request->file('icon');

        $filename = time().'.'.$file->getClientOriginalExtension();

        $file->storeAs('category/icons', $filename, 'public');

        $category = Category::create([
            'name'=> $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'description'=> $request->description,
            'icon'=> $filename,
        ]);

        return to_route('dashboard.categories.index')->with('success','Category created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Dashboard/Category/Edit', ['category'=> $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'=> 'required|unique:categories,name,'.$category->id,
            'description'=> 'required',
        ]);

        $filename = $category->icon;
        
        if($request->hasFile('icon'))
        {
            // Delete old icon
            Storage::delete('public/category/icons/'.$category->icon);

            $file = $request->file('icon');

            $filename = time().'.'.$file->getClientOriginalExtension();
            
            $file->storeAs('category/icons', $filename, 'public');
        }

        $category->update([
            'name'=> $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->name),
            'description'=> $request->description,
            'icon'=> $filename,
        ]);

        return to_route('dashboard.categories.index')->with('success','Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Storage::delete('public/category/icons/'.$category->icon);

        $category->delete();

        return to_route('dashboard.categories.index')->with('success','Category deleted successfully');
    }
}