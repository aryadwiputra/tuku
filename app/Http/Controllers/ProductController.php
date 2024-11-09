<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
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
            'images'=> 'required|array',
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

        $product = Product::create([
            'category_id'=> $category->id,
            'user_id' => Auth::user()->id,
            'name'=> $request->name,
            'slug' => \Illuminate\Support\Str::slug($slug),
            'description'=> $request->description,
            'price'=> $request->price,
            'stock' => $request->stock,
            'thumbnail' => $filename,
        ]);

        if($product)
        {
            $images = $request->images;

            foreach($images as $image)
            {
                $newImage = new ProductImage();

                $filename = time().'.'.$image->getClientOriginalExtension();

                $image->storeAs('product/images', $filename, 'public');

                $newImage->product_id = $product->id;
                $newImage->image = $filename;
                $newImage->save();
            }
        }

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
        $product = Product::where('id', $product->id)->with(['category', 'user', 'images'])->first();

        $categories = Category::all();

        return Inertia::render('Dashboard/Product/Edit', ['product'=> $product, 'categories'=> $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product = Product::where('id', $product->id)->with(['category','user'])->first();

        $request->validate([
            'category_id'=> 'required',
            'name'=> 'required',
            'description'=> 'required',
            'price'=> 'required',
            'stock' => 'required',
        ]);

        // Generate a unique slug
        $slug = $request->name . '-' .  \Illuminate\Support\Str::random(6);

        // Check if the slug already exists
        while (Product::where('slug', $slug)->exists()) {
            // Generate a new random slug if it already exists
            $slug = $request->name . '-' . \Illuminate\Support\Str::random(6);
        }

        $category = Category::where('name', $request->category_id)->first();

        $product->update([
            'category_id'=> $category->id,
            'name'=> $request->name,
            'slug' => \Illuminate\Support\Str::slug($slug),
            'description'=> $request->description,
            'price'=> $request->price,
            'stock' => $request->stock,
        ]);

        if( $request->hasFile('thumbnail') ) {
            Storage::disk('public')->delete('product/thumbnails/'.$product->thumbnail);

            $file = $request->file('thumbnail');

            $filename = time().'.'.$file->getClientOriginalExtension();
            
            $file->storeAs('product/thumbnails', $filename, 'public');

            $product->update([
                'thumbnail' => $filename,
            ]);
        }

        if ($request->hasFile('images')) {
            // Delete existing images
            foreach ($product->images as $image) {
                Storage::disk('public')->delete('product/images/' . $image->image);
                $image->delete();
            }
        
            // Store new images
            foreach ($request->images as $image) {
                $filename = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('product/images', $filename, 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $filename,
                ]);
            }
        }

        if($request->images){
            
            // Storage::disk('public')->delete('product/images/'.$product->thumbnail);

            // $image = $request->images;

            // $filename = time().'.'.$image->getClientOriginalExtension();

            // $image->storeAs('product/images', $filename, 'public');

            // $productImage = ProductImage::where('product_id', $product->id)->first();

            // foreach($request->images as $image){
            //     $productImage->update([
            //         'image' => $filename,
            //     ]);
            // }
        }

        return to_route('dashboard.products.index')->with('success','Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Storage::disk('public')->delete('product/thumbnails/'.$product->thumbnail);

        if( $product->images ){
            foreach($product->images as $image){
                Storage::disk('public')->delete('product/images/'.$image->image);
            }
        }
        
        $product->delete();
        

        return to_route('dashboard.products.index')->with('success','Product deleted successfully');
    }

    /**
     * Add image
     */
    public function addImage(Request $request, $id){
        $product = Product::find($id);

        if($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time().'.'.$request->image->getClientOriginalExtension();

            $image->storeAs('product/images', $filename, 'public');
            
            $image = ProductImage::create([
                'product_id' => $product->id,
                'image' => $filename,
            ]);
            
            return to_route('dashboard.products.edit', $id)->with('success','Product image added successfully');
        }
    }

    /**
     * Delete product image
     */
    public function deleteImage($id, $imageId)
    {
        $productImage = ProductImage::where('id', $imageId)->first();
    
        if ($productImage) {
            Storage::disk('public')->delete('product/images/' . $productImage->image);
            $productImage->delete();
        }
    
        return to_route('dashboard.products.edit', $id)->with('success', 'Product image deleted');
    }
}