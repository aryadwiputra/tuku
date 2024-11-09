<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    
    public static function middleware()
    {
        return [
            new Middleware('permission:roles-access', only:['index']),
            new Middleware('permission:roles-create', only:['create','store']),
            new Middleware('permission:roles-update', only:['edit', 'update']),
            new Middleware('permission:roles-destroy', only:['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $roles = Role::with('permissions')->col();
        // Collect roles with permissions
        $roles = Role::with("permissions")->get();

        return Inertia::render('Dashboard/Role/Index', compact('roles'));
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();

        return Inertia::render('Dashboard/Role/Create', compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|unique:roles',
            'permissions'=> 'required',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        $role->permissions()->sync($request->permissions);

        return to_route('dashboard.roles.index')->with('success','Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);

        $permissions = Permission::all();
    
        return Inertia::render('Dashboard/Role/Edit', compact('role', 'permissions'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'=> 'required|unique:roles,name,'.$id,
            'permissions'=> 'required',
        ]);

        $role = Role::findOrFail($id);

        $role->update([
            'name' => $request->name,
        ]);

        $role->permissions()->sync($request->permissions);

        return to_route('dashboard.roles.index')->with('success','');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        
        if($role->name == 'Super Admin' || $role->name == 'User'){
            return to_route('dashboard.roles.index')->with('error','Cannot delete this role');
        }else{
   
            $role->delete();
            
            return to_route('dashboard.roles.index')->with('success','');
        }
    }
}